# Python Mastery - Functions and Testing

> **📚 Section**: 5 - Functions, Errors, and Testing  
> **🎯 Focus**: Advanced function design and comprehensive testing  
> **🧠 Memory ID**: 4530115  
> **🔧 Level**: Intermediate - Function design and testing patterns  
> **Tags**: #python #functions #testing #higher-order #closures #type-hints

---

## 🎯 Overview

Section 5 explores **advanced function design patterns**, error handling strategies, and comprehensive testing methodologies. Students learn to create flexible, robust functions using higher-order programming techniques, implement proper error handling and logging, and develop comprehensive test suites using Python's unittest framework.

## 🔧 Advanced Function Design

### **Type Hints and Documentation**
```python
from typing import List, Union, TextIO, Any, Callable, Optional
import csv

def csv_as_dicts(lines: Union[str, TextIO], 
                 types: List[Callable[[str], Any]], 
                 *, 
                 headers: Optional[List[str]] = None) -> List[dict]:
    """
    Convert CSV data to list of dictionaries with type conversion.
    
    Args:
        lines: Filename or file-like object
        types: List of conversion functions for each column
        headers: Optional list of column names
    
    Returns:
        List of dictionaries with converted values
    """
    if isinstance(lines, str):
        # Handle filename
        with open(lines) as f:
            return csv_as_dicts(f, types, headers=headers)
    
    # Handle file object
    records = []
    rows = csv.reader(lines)
    
    if headers is None:
        headers = next(rows)
    
    for row in rows:
        record = {name: func(val) for name, func, val in zip(headers, types, row)}
        records.append(record)
    
    return records
```

### **Higher-Order Functions**
```python
def typed_property(expected_type, *, min_value=None):
    """Create a typed property with validation."""
    
    def validator(value):
        if not isinstance(value, expected_type):
            raise TypeError(f'Expected {expected_type.__name__}')
        if min_value is not None and value < min_value:
            raise ValueError(f'Must be >= {min_value}')
        return value
    
    class TypedProperty:
        def __set_name__(self, owner, name):
            self.name = name
        
        def __set__(self, instance, value):
            validated = validator(value)  # Closure captures validator
            instance.__dict__[self.name] = validated
        
        def __get__(self, instance, owner):
            if instance is None:
                return self
            return instance.__dict__[self.name]
    
    return TypedProperty()

# Usage
class Stock:
    name = typed_property(str)
    shares = typed_property(int, min_value=0)
    price = typed_property(float, min_value=0.0)
    
    def __init__(self, name, shares, price):
        self.name = name
        self.shares = shares
        self.price = price
```

---

## 🔄 Closures and Data Encapsulation

### **Function Factory Pattern**
```python
def make_validator(expected_type, min_value=None, max_value=None):
    """Create a validation function with specific rules."""
    
    def validator(value):
        if not isinstance(value, expected_type):
            raise TypeError(f'Expected {expected_type.__name__}')
        if min_value is not None and value < min_value:
            raise ValueError(f'Must be >= {min_value}')
        if max_value is not None and value > max_value:
            raise ValueError(f'Must be <= {max_value}')
        return value
    
    return validator

# Create specific validators
int_validator = make_validator(int, min_value=0)
float_validator = make_validator(float, min_value=0.0)
str_validator = make_validator(str)

# Usage
try:
    int_validator(10)  # OK
    int_validator(-5)  # ValueError
except ValueError as e:
    print(f"Validation error: {e}")
```

### **Closure for State Management**
```python
def counter(initial=0):
    """Create a counter function with encapsulated state."""
    count = initial
    
    def increment(amount=1):
        nonlocal count
        count += amount
        return count
    
    def get_count():
        return count
    
    def reset():
        nonlocal count
        count = initial
    
    return increment, get_count, reset

# Usage
inc, get, reset = counter(10)
print(get())      # 10
print(inc())      # 11
print(inc(5))     # 16
reset()
print(get())      # 10
```

---

## ⚠️ Error Handling and Logging

### **Comprehensive Error Handling**
```python
import logging
from contextlib import contextmanager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@contextmanager
def error_handler(operation_name):
    """Context manager for consistent error handling."""
    try:
        yield
    except FileNotFoundError as e:
        logger.error(f"{operation_name}: File not found - {e}")
        raise
    except ValueError as e:
        logger.error(f"{operation_name}: Invalid data - {e}")
        raise
    except Exception as e:
        logger.error(f"{operation_name}: Unexpected error - {e}")
        raise

def read_portfolio_with_logging(filename):
    """Read portfolio with comprehensive error handling."""
    with error_handler("Portfolio reading"):
        portfolio = []
        with open(filename) as f:
            for line_num, line in enumerate(f, 1):
                try:
                    fields = line.split()
                    shares = int(fields[1])
                    price = float(fields[2])
                    portfolio.append({
                        'name': fields[0],
                        'shares': shares,
                        'price': price
                    })
                except (ValueError, IndexError) as e:
                    logger.warning(f"Line {line_num}: Skipping invalid data - {e}")
                    continue
        
        logger.info(f"Successfully read {len(portfolio)} records")
        return portfolio
```

### **Custom Exception Classes**
```python
class PortfolioError(Exception):
    """Base exception for portfolio operations."""
    pass

class InvalidDataError(PortfolioError):
    """Raised when data format is invalid."""
    pass

class InsufficientFundsError(PortfolioError):
    """Raised when trying to sell more shares than owned."""
    pass

def sell_stock(portfolio, name, shares):
    """Sell shares with custom exceptions."""
    for stock in portfolio:
        if stock['name'] == name:
            if stock['shares'] < shares:
                raise InsufficientFundsError(
                    f"Cannot sell {shares} shares of {name}, "
                    f"only {stock['shares']} available"
                )
            stock['shares'] -= shares
            return
    
    raise InvalidDataError(f"Stock {name} not found in portfolio")
```

---

## 🧪 Comprehensive Testing

### **Unit Testing with unittest**
```python
import unittest
from unittest.mock import patch, MagicMock

class TestStock(unittest.TestCase):
    """Comprehensive tests for Stock class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.stock = Stock('GOOG', 100, 490.1)
    
    def test_stock_creation(self):
        """Test basic stock creation."""
        self.assertEqual(self.stock.name, 'GOOG')
        self.assertEqual(self.stock.shares, 100)
        self.assertEqual(self.stock.price, 490.1)
    
    def test_cost_calculation(self):
        """Test cost calculation."""
        expected_cost = 100 * 490.1
        self.assertEqual(self.stock.cost(), expected_cost)
    
    def test_sell_shares(self):
        """Test selling shares."""
        self.stock.sell(25)
        self.assertEqual(self.stock.shares, 75)
    
    def test_sell_too_many_shares(self):
        """Test selling more shares than owned."""
        with self.assertRaises(InsufficientFundsError):
            self.stock.sell(150)
    
    def test_invalid_shares_type(self):
        """Test type validation for shares."""
        with self.assertRaises(TypeError):
            Stock('GOOG', '100', 490.1)
    
    def test_negative_shares(self):
        """Test validation of negative shares."""
        with self.assertRaises(ValueError):
            Stock('GOOG', -100, 490.1)
    
    @patch('builtins.open', create=True)
    def test_read_portfolio(self, mock_open):
        """Test portfolio reading with mocked file."""
        mock_file = MagicMock()
        mock_file.__iter__.return_value = [
            'GOOG 100 490.1\n',
            'IBM 50 91.23\n'
        ]
        mock_open.return_value.__enter__.return_value = mock_file
        
        portfolio = read_portfolio('test.csv')
        self.assertEqual(len(portfolio), 2)
        self.assertEqual(portfolio[0]['name'], 'GOOG')

class TestPortfolioOperations(unittest.TestCase):
    """Tests for portfolio-level operations."""
    
    def test_sell_stock_success(self):
        """Test successful stock sale."""
        portfolio = [
            {'name': 'GOOG', 'shares': 100, 'price': 490.1}
        ]
        sell_stock(portfolio, 'GOOG', 25)
        self.assertEqual(portfolio[0]['shares'], 75)
    
    def test_sell_nonexistent_stock(self):
        """Test selling stock that doesn't exist."""
        portfolio = [{'name': 'GOOG', 'shares': 100, 'price': 490.1}]
        with self.assertRaises(InvalidDataError):
            sell_stock(portfolio, 'IBM', 25)
```

### **Property-Based Testing**
```python
from hypothesis import given, strategies as st

class TestStockProperties(unittest.TestCase):
    """Property-based tests for Stock class."""
    
    @given(st.text(), st.integers(min_value=0), st.floats(min_value=0.0))
    def test_stock_creation_properties(self, name, shares, price):
        """Test that stock creation works for valid inputs."""
        stock = Stock(name, shares, price)
        self.assertEqual(stock.name, name)
        self.assertEqual(stock.shares, shares)
        self.assertEqual(stock.price, price)
    
    @given(st.integers(min_value=0, max_value=1000))
    def test_cost_always_positive(self, shares):
        """Test that cost is always positive for valid shares."""
        stock = Stock('TEST', shares, 100.0)
        self.assertGreaterEqual(stock.cost(), 0)
    
    @given(st.integers(min_value=0, max_value=100))
    def test_sell_shares_properties(self, shares_to_sell):
        """Test selling shares maintains invariants."""
        initial_shares = 100
        stock = Stock('TEST', initial_shares, 100.0)
        stock.sell(shares_to_sell)
        self.assertEqual(stock.shares, initial_shares - shares_to_sell)
        self.assertGreaterEqual(stock.shares, 0)
```

---

## 🧪 Best Practices

### ✅ **Do's**
- Use type hints for better documentation and tooling
- Implement comprehensive error handling with logging
- Write tests for both success and failure cases
- Use property-based testing for complex invariants
- Create custom exceptions for domain-specific errors
- Use context managers for resource management

### ❌ **Don'ts**
- Don't ignore error handling in production code
- Don't write tests that are too brittle
- Don't use bare except clauses
- Don't forget to test edge cases
- Don't mix business logic with error handling

---

## 🔗 Cross-References

### **Builds On**
- [[Python Mastery - Fundamentals]] - Basic functions and error handling
- [[Python Mastery - Object-Oriented Programming]] - Class testing

### **Leads To**
- [[Python Mastery - Code Structure]] - Advanced function patterns
- [[Python Mastery - Metaprogramming]] - Function generation

### **Related Concepts**
- [[Python Testing Strategies]]
- [[Type Hints Reference]]
- [[Error Handling Patterns]]
- [[Property-Based Testing]]

---

## 📋 Exercise Checklist

### **Exercise 5.1: Function Design**
- [ ] Implement flexible function parameters
- [ ] Add comprehensive type hints
- [ ] Handle both filenames and file objects
- [ ] Create reusable function patterns

### **Exercise 5.2: Higher-Order Functions**
- [ ] Create function factories
- [ ] Implement closures for state management
- [ ] Build validation systems
- [ ] Use functional programming patterns

### **Exercise 5.3: Error Handling**
- [ ] Implement comprehensive error handling
- [ ] Create custom exception classes
- [ ] Add logging to functions
- [ ] Use context managers for resources

### **Exercise 5.4: Testing**
- [ ] Write unit tests with unittest
- [ ] Use mocking for external dependencies
- [ ] Implement property-based testing
- [ ] Test both success and failure cases

---

## 💡 Key Takeaways

1. **Function Design**: Create flexible, well-documented functions
2. **Type Safety**: Use type hints for better code quality
3. **Error Handling**: Implement comprehensive error management
4. **Testing**: Write thorough tests for all code paths
5. **Closures**: Use for state management and code generation

**🎯 Mastery Goal**: Ability to design robust, testable functions with comprehensive error handling.