# Python Mastery - Metaprogramming

> **📚 Section**: 7 - Metaprogramming  
> **🎯 Focus**: Code that writes code  
> **🧠 Memory ID**: 4530102  
> **🚀 Level**: Expert - Pinnacle of Python sophistication  
> **Tags**: #python #metaprogramming #decorators #metaclasses #code-generation

---

## 🎯 Overview

Section 7 covers Python's **most advanced features** for writing code that writes code. Students learn to create decorators, class decorators, and metaclasses that can automatically generate functionality, validate code, and transform classes at definition time. This section represents the pinnacle of Python programming sophistication.

## 🎭 Decorator Fundamentals

### **Simple Function Decorator**
```python
import functools

def logged(func):
    """Simple decorator that logs function calls"""
    print(f'Adding logging to {func.__name__}')
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f'Calling {func.__name__}')
        return func(*args, **kwargs)
    
    return wrapper

@logged
def add(x, y):
    return x + y

# Usage
result = add(3, 4)  # Prints: "Calling add"
```

### **Decorator with Arguments**
```python
def repeat(times):
    """Decorator that repeats function execution"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f'Hello, {name}!')

# Usage
greet('Alice')  # Prints greeting 3 times
```

---

## 🔍 Advanced Decorator Patterns

### **Validation Decorator with Type Annotations**
```python
import inspect

def validated(func):
    """Decorator that validates function arguments using annotations"""
    sig = inspect.signature(func)
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Bind arguments to parameter names
        bound = sig.bind(*args, **kwargs)
        bound.apply_defaults()
        
        # Collect validation errors
        errors = []
        
        # Validate each argument
        for name, value in bound.arguments.items():
            param = sig.parameters[name]
            if param.annotation != inspect.Parameter.empty:
                validator = param.annotation
                try:
                    validator.check(value)
                except Exception as e:
                    errors.append(f'    {name}: {e}')
        
        if errors:
            raise TypeError('Bad Arguments\n' + '\n'.join(errors))
        
        # Call original function
        result = func(*args, **kwargs)
        
        # Validate return value
        if sig.return_annotation != inspect.Signature.empty:
            try:
                sig.return_annotation.check(result)
            except Exception as e:
                raise TypeError(f'Bad return: {e}') from None
        
        return result
    
    return wrapper

# Usage with validator classes
class Positive:
    @staticmethod
    def check(value):
        if value <= 0:
            raise ValueError('Must be positive')

@validated
def divide(x: Positive, y: Positive) -> Positive:
    return x / y
```

### **Caching Decorator**
```python
def cached(func):
    """Decorator that caches function results"""
    cache = {}
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Create cache key from arguments
        key = (args, tuple(sorted(kwargs.items())))
        
        if key not in cache:
            cache[key] = func(*args, **kwargs)
        
        return cache[key]
    
    return wrapper

@cached
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

---

## 🏗️ Class Decorators

### **Automatic Property Generation**
```python
def auto_properties(*names):
    """Class decorator that creates properties automatically"""
    def decorator(cls):
        for name in names:
            # Create private attribute name
            private_name = f'_{name}'
            
            # Create property getter
            def getter(self, name=name, private_name=private_name):
                return getattr(self, private_name)
            
            # Create property setter
            def setter(self, value, name=name, private_name=private_name):
                setattr(self, private_name, value)
            
            # Create property
            prop = property(getter, setter)
            setattr(cls, name, prop)
        
        return cls
    return decorator

@auto_properties('name', 'shares', 'price')
class Stock:
    def __init__(self, name, shares, price):
        self._name = name
        self._shares = shares
        self._price = price
```

### **Validation Class Decorator**
```python
def validated_class(*validators):
    """Class decorator that adds validation to all attributes"""
    def decorator(cls):
        original_init = cls.__init__
        
        @functools.wraps(original_init)
        def new_init(self, *args, **kwargs):
            original_init(self, *args, **kwargs)
            
            # Validate all attributes
            for validator in validators:
                validator.validate(self)
        
        cls.__init__ = new_init
        return cls
    return decorator

class StockValidator:
    @staticmethod
    def validate(obj):
        if obj.shares < 0:
            raise ValueError('Shares must be >= 0')
        if obj.price < 0:
            raise ValueError('Price must be >= 0')

@validated_class(StockValidator)
class Stock:
    def __init__(self, name, shares, price):
        self.name = name
        self.shares = shares
        self.price = price
```

---

## 🔮 Metaclasses

### **Basic Metaclass**
```python
class LoggedMeta(type):
    """Metaclass that logs class creation"""
    def __new__(cls, name, bases, namespace):
        print(f'Creating class: {name}')
        return super().__new__(cls, name, bases, namespace)
    
    def __init__(cls, name, bases, namespace):
        print(f'Initializing class: {name}')
        super().__init__(name, bases, namespace)

class Stock(metaclass=LoggedMeta):
    def __init__(self, name, shares, price):
        self.name = name
        self.shares = shares
        self.price = price
```

### **Automatic Method Generation**
```python
class StructureMeta(type):
    """Metaclass that automatically generates methods"""
    def __new__(cls, name, bases, namespace):
        # Get field names from _fields attribute
        fields = namespace.get('_fields', ())
        
        # Generate __init__ method
        init_code = f'def __init__(self, {", ".join(fields)}):\n'
        for field in fields:
            init_code += f'    self.{field} = {field}\n'
        
        # Execute the generated code
        exec(init_code, namespace)
        
        return super().__new__(cls, name, bases, namespace)

class Stock(metaclass=StructureMeta):
    _fields = ('name', 'shares', 'price')
```

---

## 🎨 Code Generation Patterns

### **Function Generation with exec()**
```python
def create_init_function(fields):
    """Generate __init__ function from field names"""
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
    """Factory function that creates Stock-like classes"""
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
```

---

## 🔧 Advanced Introspection

### **Function Signature Analysis**
```python
import inspect

def analyze_function(func):
    """Analyze function signature and annotations"""
    sig = inspect.signature(func)
    
    print(f'Function: {func.__name__}')
    print(f'Parameters:')
    
    for name, param in sig.parameters.items():
        print(f'  {name}: {param.annotation}')
        if param.default != inspect.Parameter.empty:
            print(f'    default: {param.default}')
    
    if sig.return_annotation != inspect.Signature.empty:
        print(f'Returns: {sig.return_annotation}')

# Usage
@analyze_function
def process_data(x: int, y: str = 'default') -> bool:
    return True
```

### **Class Introspection**
```python
def analyze_class(cls):
    """Analyze class structure and methods"""
    print(f'Class: {cls.__name__}')
    print(f'Bases: {[base.__name__ for base in cls.__bases__]}')
    print(f'Methods:')
    
    for name, value in cls.__dict__.items():
        if callable(value) and not name.startswith('_'):
            print(f'  {name}: {value}')
    
    print(f'Attributes:')
    for name, value in cls.__dict__.items():
        if not callable(value) and not name.startswith('_'):
            print(f'  {name}: {value}')
```

---

## 🧪 Best Practices

### ✅ **Do's**
- Use `functools.wraps` to preserve function metadata
- Implement validation at class boundaries
- Use metaclasses sparingly and document clearly
- Generate code for repetitive patterns
- Preserve function signatures and documentation

### ❌ **Don'ts**
- Don't overuse metaprogramming - prefer explicit code
- Don't create overly complex decorators
- Don't ignore error handling in generated code
- Don't forget to test generated code thoroughly
- Don't make code generation too opaque

---

## 🔗 Cross-References

### **Builds On**
- [[Python Mastery - Object-Oriented Programming]] - Class design
- [[Python Mastery - Functions and Testing]] - Function design
- [[Python Mastery - Code Structure]] - Decorator patterns

### **Leads To**
- [[Python Mastery - Generators and Iterators]] - Async patterns
- [[Python Mastery - Modules and Packages]] - Package architecture

### **Related Concepts**
- [[Python Decorator Patterns]]
- [[Metaclass Programming]]
- [[Code Generation Techniques]]
- [[Introspection and Reflection]]

---

## 📋 Exercise Checklist

### **Exercise 7.1: Decorator Fundamentals**
- [ ] Create simple logging decorator
- [ ] Implement decorator with arguments
- [ ] Preserve function metadata with wraps
- [ ] Understand decorator execution order

### **Exercise 7.2: Advanced Decorators**
- [ ] Build validation decorator
- [ ] Create caching decorator
- [ ] Implement retry decorator
- [ ] Design decorator composition

### **Exercise 7.3: Class Decorators**
- [ ] Create automatic property generator
- [ ] Implement validation class decorator
- [ ] Build method injection decorator
- [ ] Design class transformation patterns

### **Exercise 7.4: Metaclasses**
- [ ] Create basic metaclass
- [ ] Implement automatic method generation
- [ ] Build class factory pattern
- [ ] Design framework with metaclasses

---

## 💡 Key Takeaways

1. **Code Generation**: Generate repetitive code automatically
2. **Validation**: Implement validation at class/function boundaries
3. **Composition**: Use decorators for cross-cutting concerns
4. **Introspection**: Analyze code structure dynamically
5. **Framework Building**: Create frameworks that generate code

**🎯 Mastery Goal**: Ability to create sophisticated frameworks and tools that generate, validate, and transform code automatically.