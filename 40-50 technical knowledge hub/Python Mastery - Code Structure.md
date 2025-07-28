# Python Mastery - Code Structure and Organization

> **📚 Section**: 6 - Working with Code  
> **🎯 Focus**: Advanced code organization and dynamic programming  
> **🧠 Memory ID**: 4530120  
> **🔧 Level**: Advanced - Framework building and introspection  
> **Tags**: #python #code-structure #introspection #frameworks #dynamic-programming

---

## 🎯 Overview

Section 6 explores **advanced techniques for code organization**, dynamic code generation, and creating flexible programming interfaces. Students learn to build reusable frameworks, implement advanced argument patterns, and use Python's introspection capabilities to create self-modifying code. This section bridges the gap between traditional programming and metaprogramming.

## 🏗️ Structure Base Class and Argument Patterns

### **Automated Data Structure Creation**
```python
class Structure:
    """Base class for creating simple data structures."""
    _fields = ()
    
    def __init__(self, *args):
        """Initialize structure with positional arguments."""
        if len(args) != len(self._fields):
            raise TypeError(f'Expected {len(self._fields)} arguments')
        
        # Set attributes from _fields and args
        for name, value in zip(self._fields, args):
            setattr(self, name, value)
    
    def __repr__(self):
        """Create useful string representation."""
        args = ', '.join(repr(getattr(self, name)) for name in self._fields)
        return f'{type(self).__name__}({args})'
    
    def __setattr__(self, name, value):
        """Restrict attribute assignment to _fields and private attributes."""
        if name.startswith('_') or name in self._fields:
            super().__setattr__(name, value)
        else:
            raise AttributeError(f'No attribute {name}')

# Usage example
class Stock(Structure):
    _fields = ('name', 'shares', 'price')
    
    @property
    def cost(self):
        return self.shares * self.price
    
    def sell(self, nshares):
        self.shares -= nshares

class Date(Structure):
    _fields = ('year', 'month', 'day')

# Testing the implementation
s = Stock('GOOG', 100, 490.1)
print(s)  # Stock('GOOG', 100, 490.1)
print(s.cost)  # 49010.0

# Error handling
try:
    s.share = 50  # Typo - should be 'shares'
except AttributeError as e:
    print(f"Error: {e}")  # Error: No attribute share
```

### **Advanced Argument Patterns**
```python
def flexible_function(*args, **kwargs):
    """Demonstrate advanced argument patterns."""
    
    # Handle positional arguments
    if len(args) == 1:
        # Single argument - treat as filename
        filename = args[0]
        return process_file(filename)
    elif len(args) > 1:
        # Multiple arguments - treat as data
        return process_data(args)
    
    # Handle keyword arguments
    if 'filename' in kwargs:
        return process_file(kwargs['filename'])
    elif 'data' in kwargs:
        return process_data(kwargs['data'])
    
    raise ValueError("No valid arguments provided")

def process_file(filename):
    """Process data from file."""
    with open(filename) as f:
        return process_data(f.readlines())

def process_data(data):
    """Process data directly."""
    return [item.strip() for item in data]
```

---

## 🔍 Introspection and Dynamic Programming

### **Function Signature Analysis**
```python
import inspect

def analyze_function(func):
    """Analyze function signature and metadata."""
    sig = inspect.signature(func)
    
    print(f"Function: {func.__name__}")
    print(f"Module: {func.__module__}")
    print(f"Docstring: {func.__doc__}")
    print(f"Parameters:")
    
    for name, param in sig.parameters.items():
        print(f"  {name}: {param.annotation}")
        if param.default != inspect.Parameter.empty:
            print(f"    default: {param.default}")
        if param.kind == inspect.Parameter.VAR_POSITIONAL:
            print(f"    *args")
        elif param.kind == inspect.Parameter.VAR_KEYWORD:
            print(f"    **kwargs")
    
    if sig.return_annotation != inspect.Signature.empty:
        print(f"Returns: {sig.return_annotation}")

# Usage
@analyze_function
def example_func(x: int, y: str = 'default', *args, **kwargs) -> bool:
    """Example function for analysis."""
    return True
```

### **Class Introspection**
```python
def analyze_class(cls):
    """Analyze class structure and methods."""
    print(f"Class: {cls.__name__}")
    print(f"Bases: {[base.__name__ for base in cls.__bases__]}")
    print(f"Methods:")
    
    for name, value in cls.__dict__.items():
        if callable(value) and not name.startswith('_'):
            print(f"  {name}: {value}")
    
    print(f"Attributes:")
    for name, value in cls.__dict__.items():
        if not callable(value) and not name.startswith('_'):
            print(f"  {name}: {value}")

# Usage
analyze_class(Stock)
```

---

## 🔧 Dynamic Code Generation

### **Function Generation with exec()**
```python
def create_init_function(fields):
    """Generate __init__ function from field names."""
    args = ','.join(fields)
    code = f'def __init__(self, {args}):\n'
    for field in fields:
        code += f'    self.{field} = {field}\n'
    
    # Execute in new namespace
    namespace = {}
    exec(code, namespace)
    return namespace['__init__']

# Usage
init_func = create_init_function(['name', 'shares', 'price'])
Stock.__init__ = init_func
```

### **Class Factory Pattern**
```python
def create_stock_class(name, fields):
    """Factory function that creates Stock-like classes."""
    # Create namespace for new class
    namespace = {
        '__init__': create_init_function(fields),
        '__repr__': lambda self: f'{name}({", ".join(f"{f}={getattr(self, f)!r}" for f in fields)})',
        '_fields': fields
    }
    
    # Create and return the class
    return type(name, (), namespace)

# Usage
Bond = create_stock_class('Bond', ['name', 'face_value', 'coupon'])
bond = Bond('Treasury', 1000, 0.05)
print(bond)  # Bond(name='Treasury', face_value=1000, coupon=0.05)
```

---

## 🎨 Callable Objects

### **Function-Like Objects**
```python
class CSVReader:
    """Callable object that reads CSV files."""
    
    def __init__(self, filename):
        self.filename = filename
    
    def __call__(self, *args, **kwargs):
        """Make object callable like a function."""
        import csv
        with open(self.filename) as f:
            return list(csv.reader(f))

# Usage
reader = CSVReader('portfolio.csv')
data = reader()  # Call object like a function
```

### **Configurable Callables**
```python
class DataProcessor:
    """Configurable data processing callable."""
    
    def __init__(self, processor_func, validator=None):
        self.processor_func = processor_func
        self.validator = validator
    
    def __call__(self, data):
        """Process data with optional validation."""
        if self.validator:
            data = self.validator(data)
        return self.processor_func(data)

# Usage
def double_numbers(data):
    return [x * 2 for x in data]

def validate_numbers(data):
    return [x for x in data if isinstance(x, (int, float))]

processor = DataProcessor(double_numbers, validate_numbers)
result = processor([1, 2, 'three', 4, 5])  # [2, 4, 8, 10]
```

---

## 🔄 Advanced Argument Patterns

### **Keyword-Only Parameters**
```python
def process_data(data, *, encoding='utf-8', validate=True):
    """
    Process data with keyword-only parameters.
    
    Args:
        data: Input data to process
        encoding: File encoding (keyword-only)
        validate: Whether to validate data (keyword-only)
    """
    if validate:
        data = validate_data(data)
    
    return process_validated_data(data, encoding=encoding)

# Usage - must use keyword arguments for encoding and validate
result = process_data(['a', 'b', 'c'], encoding='latin-1', validate=False)
```

### **Variable Argument Patterns**
```python
def flexible_reader(*filenames, **options):
    """
    Read multiple files with flexible options.
    
    Args:
        *filenames: Variable number of filenames
        **options: Processing options (encoding, delimiter, etc.)
    """
    results = []
    
    for filename in filenames:
        with open(filename, encoding=options.get('encoding', 'utf-8')) as f:
            data = f.read()
            if options.get('strip', False):
                data = data.strip()
            results.append(data)
    
    return results

# Usage
data = flexible_reader('file1.txt', 'file2.txt', 
                      encoding='latin-1', strip=True)
```

---

## 🧪 Best Practices

### ✅ **Do's**
- Use introspection for framework building
- Generate code for repetitive patterns
- Create callable objects for complex behavior
- Use keyword-only parameters for clarity
- Implement proper error handling in generated code

### ❌ **Don'ts**
- Don't overuse dynamic code generation
- Don't create overly complex callable objects
- Don't ignore error handling in generated code
- Don't make code generation too opaque
- Don't forget to test generated code thoroughly

---

## 🔗 Cross-References

### **Builds On**
- [[Python Mastery - Object-Oriented Programming]] - Class design
- [[Python Mastery - Functions and Testing]] - Function design

### **Leads To**
- [[Python Mastery - Metaprogramming]] - Advanced code generation
- [[Python Mastery - Modules and Packages]] - Package architecture

### **Related Concepts**
- [[Python Introspection Techniques]]
- [[Code Generation Patterns]]
- [[Callable Object Design]]
- [[Framework Building]]

---

## 📋 Exercise Checklist

### **Exercise 6.1: Structure Base Class**
- [ ] Create automated data structure base class
- [ ] Implement argument validation
- [ ] Add attribute restriction
- [ ] Create useful string representation

### **Exercise 6.2: Advanced Arguments**
- [ ] Implement keyword-only parameters
- [ ] Create variable argument patterns
- [ ] Build flexible function interfaces
- [ ] Handle multiple argument types

### **Exercise 6.3: Introspection**
- [ ] Analyze function signatures
- [ ] Inspect class structures
- [ ] Use metadata for framework building
- [ ] Create dynamic interfaces

### **Exercise 6.4: Code Generation**
- [ ] Generate functions with exec()
- [ ] Create class factories
- [ ] Build configurable callables
- [ ] Implement dynamic code patterns

---

## 💡 Key Takeaways

1. **Framework Building**: Create reusable base classes and patterns
2. **Introspection**: Use Python's reflection capabilities
3. **Code Generation**: Generate repetitive code automatically
4. **Callable Objects**: Create objects that behave like functions
5. **Argument Patterns**: Design flexible function interfaces

**🎯 Mastery Goal**: Ability to build sophisticated frameworks and tools using advanced code organization techniques.