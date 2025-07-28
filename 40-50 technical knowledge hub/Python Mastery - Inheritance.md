# Python Mastery - Inheritance and Object Internals

> **📚 Section**: 4 - Inheritance and Object Internals  
> **🎯 Focus**: Python's object model and advanced inheritance  
> **🧠 Memory ID**: 4530110  
> **🔍 Level**: Advanced - Deep dive into object internals  
> **Tags**: #python #inheritance #object-model #descriptors #mro

---

## 🎯 Overview

Section 4 provides a **deep dive into Python's object model**, exploring how objects are represented internally, how inheritance works at the implementation level, and advanced patterns like descriptors and delegation. Students learn the fundamental mechanisms that power Python's object-oriented features.

## 🏗️ Object Representation and Attribute Lookup

### **Instance vs Class Attributes**
```python
class SimpleStock:
    def __init__(self, name, shares, price):
        self.name = name      # Instance attribute
        self.shares = shares  # Instance attribute
        self.price = price    # Instance attribute
    
    def cost(self):           # Class attribute (method)
        return self.shares * self.price

# Create instances
goog = SimpleStock('GOOG', 100, 490.10)
ibm = SimpleStock('IBM', 50, 91.23)

# Examine instance dictionaries
print(goog.__dict__)  # {'name': 'GOOG', 'shares': 100, 'price': 490.10}
print(ibm.__dict__)   # {'name': 'IBM', 'shares': 50, 'price': 91.23}

# Dynamic attribute addition
goog.date = "6/11/2007"  # Added to goog.__dict__ only
goog.__dict__['time'] = '9:45am'  # Direct dictionary manipulation

# Class attributes are shared
SimpleStock.spam = 42
print(goog.spam)  # 42 (from class)
print(ibm.spam)   # 42 (from class)
```

### **Attribute Lookup Process**
```python
# Attribute lookup follows this order:
# 1. Instance dictionary (obj.__dict__)
# 2. Class dictionary (obj.__class__.__dict__)
# 3. Parent class dictionaries (inheritance chain)
# 4. AttributeError if not found

def attribute_lookup_demo():
    """Demonstrate attribute lookup mechanism."""
    
    class Parent:
        class_attr = "Parent class attribute"
        
        def __init__(self):
            self.instance_attr = "Parent instance attribute"
    
    class Child(Parent):
        child_class_attr = "Child class attribute"
        
        def __init__(self):
            super().__init__()
            self.child_instance_attr = "Child instance attribute"
    
    obj = Child()
    
    # Lookup order demonstration
    print(f"Instance attr: {obj.child_instance_attr}")  # Instance dict
    print(f"Parent instance attr: {obj.instance_attr}")  # Parent instance dict
    print(f"Child class attr: {obj.child_class_attr}")  # Child class dict
    print(f"Parent class attr: {obj.class_attr}")  # Parent class dict
```

---

## 🔄 Method Resolution Order (MRO)

### **Understanding MRO**
```python
class A:
    def method(self):
        return "A.method"

class B(A):
    def method(self):
        return "B.method"

class C(A):
    def method(self):
        return "C.method"

class D(B, C):
    pass

# MRO for class D
print(D.__mro__)  # (<class '__main__.D'>, <class '__main__.B'>, 
                   #  <class '__main__.C'>, <class '__main__.A'>, 
                   #  <class 'object'>)

# Method resolution follows MRO
d = D()
print(d.method())  # "B.method" (first in MRO)
```

### **Cooperative Multiple Inheritance**
```python
class Base:
    def __init__(self):
        print("Base.__init__")
        super().__init__()

class A(Base):
    def __init__(self):
        print("A.__init__")
        super().__init__()

class B(Base):
    def __init__(self):
        print("B.__init__")
        super().__init__()

class C(A, B):
    def __init__(self):
        print("C.__init__")
        super().__init__()

# Cooperative inheritance ensures all __init__ methods are called
c = C()
# Output:
# C.__init__
# A.__init__
# B.__init__
# Base.__init__
```

---

## 🎭 Descriptor Protocol

### **Basic Descriptor**
```python
class TypedAttribute:
    """Descriptor for type-checked attributes."""
    
    def __init__(self, expected_type):
        self.expected_type = expected_type
        self.name = None  # Will be set by __set_name__
    
    def __set_name__(self, owner, name):
        """Called when descriptor is assigned to a class."""
        self.name = name
    
    def __get__(self, instance, owner):
        """Get attribute value."""
        if instance is None:
            return self
        return instance.__dict__[self.name]
    
    def __set__(self, instance, value):
        """Set attribute value with type checking."""
        if not isinstance(value, self.expected_type):
            raise TypeError(f'Expected {self.expected_type.__name__}')
        instance.__dict__[self.name] = value

class Stock:
    name = TypedAttribute(str)
    shares = TypedAttribute(int)
    price = TypedAttribute(float)
    
    def __init__(self, name, shares, price):
        self.name = name
        self.shares = shares
        self.price = price

# Usage with validation
s = Stock('GOOG', 100, 490.1)  # OK
try:
    s.shares = '50'  # TypeError: Expected int
except TypeError as e:
    print(f"Error: {e}")
```

### **Advanced Descriptor with Validation**
```python
class ValidatedAttribute:
    """Descriptor with custom validation logic."""
    
    def __init__(self, validator=None, min_value=None, max_value=None):
        self.validator = validator
        self.min_value = min_value
        self.max_value = max_value
        self.name = None
    
    def __set_name__(self, owner, name):
        self.name = name
    
    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dict__[self.name]
    
    def __set__(self, instance, value):
        # Apply custom validator if provided
        if self.validator:
            value = self.validator(value)
        
        # Apply range validation
        if self.min_value is not None and value < self.min_value:
            raise ValueError(f'Value must be >= {self.min_value}')
        if self.max_value is not None and value > self.max_value:
            raise ValueError(f'Value must be <= {self.max_value}')
        
        instance.__dict__[self.name] = value

class Stock:
    name = ValidatedAttribute()
    shares = ValidatedAttribute(min_value=0)
    price = ValidatedAttribute(min_value=0.0)
    
    def __init__(self, name, shares, price):
        self.name = name
        self.shares = shares
        self.price = price
```

---

## 🔄 Delegation Patterns

### **Composition over Inheritance**
```python
class Logger:
    """Simple logging functionality."""
    
    def __init__(self, name):
        self.name = name
    
    def log(self, message):
        print(f"[{self.name}] {message}")

class Validator:
    """Simple validation functionality."""
    
    def __init__(self, rules):
        self.rules = rules
    
    def validate(self, data):
        errors = []
        for field, rule in self.rules.items():
            if field in data:
                try:
                    rule(data[field])
                except Exception as e:
                    errors.append(f"{field}: {e}")
        return errors

# Delegation-based Stock class
class Stock:
    def __init__(self, name, shares, price):
        self._logger = Logger("Stock")
        self._validator = Validator({
            'shares': lambda x: int(x) if x >= 0 else ValueError("Shares must be >= 0"),
            'price': lambda x: float(x) if x >= 0 else ValueError("Price must be >= 0")
        })
        
        # Validate and set attributes
        data = {'shares': shares, 'price': price}
        errors = self._validator.validate(data)
        if errors:
            raise ValueError(f"Validation errors: {errors}")
        
        self.name = name
        self.shares = shares
        self.price = price
        self._logger.log(f"Created stock: {name}")
    
    def sell(self, nshares):
        self._logger.log(f"Selling {nshares} shares")
        self.shares -= nshares
    
    def cost(self):
        return self.shares * self.price
```

---

## 🧪 Best Practices

### ✅ **Do's**
- Use `super()` for cooperative multiple inheritance
- Implement descriptors for reusable validation logic
- Use composition for complex behavior
- Understand MRO for complex inheritance hierarchies
- Validate data at object boundaries

### ❌ **Don'ts**
- Don't use inheritance just for code reuse
- Don't ignore the descriptor protocol
- Don't create deep inheritance hierarchies
- Don't forget to call `super().__init__()` in cooperative inheritance
- Don't mix inheritance and composition without clear design

---

## 🔗 Cross-References

### **Builds On**
- [[Python Mastery - Object-Oriented Programming]] - Basic class design
- [[Python Mastery - Data Structures]] - Custom containers

### **Leads To**
- [[Python Mastery - Functions and Testing]] - Testing inheritance
- [[Python Mastery - Metaprogramming]] - Metaclasses and class creation

### **Related Concepts**
- [[Python Object Model]]
- [[Descriptor Protocol Reference]]
- [[Method Resolution Order]]
- [[Inheritance Best Practices]]

---

## 📋 Exercise Checklist

### **Exercise 4.1: Object Representation**
- [ ] Understand instance vs class attributes
- [ ] Explore attribute lookup mechanism
- [ ] Use `__dict__` for introspection
- [ ] Understand method call mechanism

### **Exercise 4.2: Method Resolution Order**
- [ ] Analyze MRO for complex inheritance
- [ ] Implement cooperative multiple inheritance
- [ ] Use `super()` correctly
- [ ] Understand diamond inheritance

### **Exercise 4.3: Descriptors**
- [ ] Create basic descriptors
- [ ] Implement validation descriptors
- [ ] Use `__set_name__` for automatic naming
- [ ] Build reusable validation patterns

### **Exercise 4.4: Delegation**
- [ ] Implement composition patterns
- [ ] Create delegation-based classes
- [ ] Compare inheritance vs composition
- [ ] Design flexible architectures

---

## 💡 Key Takeaways

1. **Object Model**: Understand how Python represents objects internally
2. **Attribute Lookup**: Know the lookup order (instance → class → parent)
3. **MRO**: Method Resolution Order determines inheritance behavior
4. **Descriptors**: Powerful mechanism for attribute control
5. **Delegation**: Often better than inheritance for code reuse

**🎯 Mastery Goal**: Deep understanding of Python's object model and ability to design sophisticated inheritance hierarchies.