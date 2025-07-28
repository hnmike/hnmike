# Python Mastery - Object-Oriented Programming

> **📚 Section**: 3 - Object-Oriented Programming  
> **🎯 Focus**: Advanced class design and polymorphism  
> **🧠 Memory ID**: 4530100  
> **🏗️ Central Example**: Stock class evolution  
> **Tags**: #python #oop #class-design #polymorphism #inheritance

---

## 🎯 Overview

Section 3 teaches **advanced class design patterns**, inheritance hierarchies, and object behavior customization. Students learn to create robust, extensible class systems using Python's object model, special methods, and inheritance patterns. This section emphasizes practical OOP design principles and real-world application patterns.

## 🏗️ Core Design Principles

### **Single Responsibility Principle**
```python
class Stock:
    def __init__(self, name, shares, price):
        self.name = name
        self.shares = shares
        self.price = price
    
    def cost(self):
        """Calculate total cost - single responsibility"""
        return self.shares * self.price
    
    def sell(self, nshares):
        """Sell shares - single responsibility"""
        self.shares -= nshares
```

### **Data Abstraction**
```python
def read_portfolio(filename):
    """Hide CSV parsing details from users"""
    import csv
    portfolio = []
    with open(filename) as f:
        rows = csv.reader(f)
        headers = next(rows)  # Skip headers
        for row in rows:
            stock = Stock(row[0], int(row[1]), float(row[2]))
            portfolio.append(stock)
    return portfolio
```

---

## 🎨 Polymorphic Table Formatting System

### **Abstract Base Class Pattern**
```python
from abc import ABC, abstractmethod

class TableFormatter(ABC):
    @abstractmethod
    def headings(self, headers):
        """Print table headers"""
        pass
    
    @abstractmethod
    def row(self, rowdata):
        """Print a single row"""
        pass

class TextTableFormatter(TableFormatter):
    def headings(self, headers):
        print(' '.join('%10s' % h for h in headers))
        print('-' * 10 * len(headers))
    
    def row(self, rowdata):
        print(' '.join('%10s' % d for d in rowdata))

class CSVTableFormatter(TableFormatter):
    def headings(self, headers):
        print(','.join(headers))
    
    def row(self, rowdata):
        print(','.join(str(d) for d in rowdata))
```

### **Strategy Pattern Implementation**
```python
def print_table(portfolio, formatter):
    """Use any formatter that implements TableFormatter interface"""
    formatter.headings(['Name', 'Shares', 'Price'])
    for stock in portfolio:
        formatter.row([stock.name, stock.shares, stock.price])

# Usage with different formatters
print_table(portfolio, TextTableFormatter())
print_table(portfolio, CSVTableFormatter())
```

---

## 🔧 Advanced Class Patterns

### **Mixin Pattern for Composition**
```python
class UpperHeadersMixin:
    """Mixin to convert headers to uppercase"""
    def headings(self, headers):
        upper_headers = [h.upper() for h in headers]
        super().headings(upper_headers)

class ColumnFormatMixin:
    """Mixin to format specific columns"""
    def __init__(self, formats):
        self.formats = formats
    
    def row(self, rowdata):
        formatted = []
        for i, (value, fmt) in enumerate(zip(rowdata, self.formats)):
            formatted.append(fmt % value)
        super().row(formatted)

# Composition through multiple inheritance
class PortfolioFormatter(ColumnFormatMixin, UpperHeadersMixin, TextTableFormatter):
    def __init__(self):
        super().__init__(formats=['%s', '%d', '%.2f'])
```

### **Property Pattern for Computed Attributes**
```python
class Stock:
    def __init__(self, name, shares, price):
        self._name = name
        self._shares = shares
        self._price = price
    
    @property
    def name(self):
        return self._name
    
    @property
    def shares(self):
        return self._shares
    
    @shares.setter
    def shares(self, value):
        if not isinstance(value, int):
            raise TypeError('Expected integer')
        if value < 0:
            raise ValueError('Shares must be >= 0')
        self._shares = value
    
    @property
    def cost(self):
        """Computed property - no parentheses needed"""
        return self.shares * self.price
```

---

## 🎭 Special Methods and Operator Overloading

### **Comparison Methods**
```python
class Stock:
    def __init__(self, name, shares, price):
        self.name = name
        self.shares = shares
        self.price = price
    
    def __eq__(self, other):
        if not isinstance(other, Stock):
            return NotImplemented
        return (self.name == other.name and 
                self.shares == other.shares and 
                self.price == other.price)
    
    def __lt__(self, other):
        if not isinstance(other, Stock):
            return NotImplemented
        return self.price < other.price
    
    def __repr__(self):
        return f'Stock({self.name!r}, {self.shares}, {self.price})'
```

### **Container Methods**
```python
class Portfolio:
    def __init__(self):
        self.holdings = []
    
    def __len__(self):
        return len(self.holdings)
    
    def __getitem__(self, index):
        return self.holdings[index]
    
    def __contains__(self, item):
        return any(stock.name == item for stock in self.holdings)
    
    def append(self, stock):
        self.holdings.append(stock)
```

---

## 🔄 Inheritance Hierarchies

### **Abstract Base Classes**
```python
from abc import ABC, abstractmethod

class Asset(ABC):
    @abstractmethod
    def cost(self):
        """Calculate total cost"""
        pass
    
    @abstractmethod
    def sell(self, amount):
        """Sell some amount"""
        pass

class Stock(Asset):
    def cost(self):
        return self.shares * self.price
    
    def sell(self, nshares):
        self.shares -= nshares

class Bond(Asset):
    def cost(self):
        return self.face_value * self.price / 100
    
    def sell(self, amount):
        # Bond selling logic
        pass
```

### **Multiple Inheritance and MRO**
```python
class LoggedMixin:
    def __init__(self, *args, **kwargs):
        print(f'Creating {self.__class__.__name__}')
        super().__init__(*args, **kwargs)

class ValidatedMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.validate()
    
    def validate(self):
        # Validation logic
        pass

class LoggedValidatedStock(LoggedMixin, ValidatedMixin, Stock):
    pass
```

---

## 🧪 Best Practices

### ✅ **Do's**
- Design classes with single responsibility
- Use abstract base classes for interfaces
- Implement special methods for natural syntax
- Use properties for computed attributes
- Apply mixin patterns for code reuse
- Maintain consistent interfaces

### ❌ **Don'ts**
- Don't create classes for everything
- Don't use inheritance for code reuse only
- Don't ignore the MRO in multiple inheritance
- Don't forget to implement `__repr__` and `__eq__`
- Don't make classes too complex

---

## 🔗 Cross-References

### **Builds On**
- [[Python Mastery - Fundamentals]] - Basic classes
- [[Python Mastery - Data Structures]] - Custom containers

### **Leads To**
- [[Python Mastery - Inheritance]] - Advanced inheritance patterns
- [[Python Mastery - Functions and Testing]] - Testing OOP code
- [[Python Mastery - Metaprogramming]] - Class creation and modification

### **Related Concepts**
- [[Python Design Patterns]]
- [[Object-Oriented Best Practices]]
- [[Polymorphism in Python]]
- [[Special Methods Reference]]

---

## 📋 Exercise Checklist

### **Exercise 3.1: Basic Class Design**
- [ ] Extend Stock class with new methods
- [ ] Implement portfolio reading and printing
- [ ] Separate data and presentation concerns
- [ ] Design for single responsibility

### **Exercise 3.2: Generic Programming**
- [ ] Create polymorphic table formatters
- [ ] Implement strategy pattern
- [ ] Design abstract base classes
- [ ] Use composition over inheritance

### **Exercise 3.3: Alternative Constructors**
- [ ] Implement class methods for construction
- [ ] Create factory methods
- [ ] Design flexible object creation
- [ ] Use `@classmethod` decorator

### **Exercise 3.4: Properties and Validation**
- [ ] Convert methods to properties
- [ ] Implement attribute validation
- [ ] Use descriptors for validation
- [ ] Design robust data validation

---

## 💡 Key Takeaways

1. **Single Responsibility**: Each class has one reason to change
2. **Polymorphism**: Design interfaces, not implementations
3. **Composition**: Prefer composition over inheritance
4. **Special Methods**: Implement for natural syntax
5. **Validation**: Validate at object boundaries

**🎯 Mastery Goal**: Ability to design robust, extensible class hierarchies that solve real-world problems.