# Python Mastery - Generators and Iterators

> **📚 Section**: 8 - Iterators, Generators, and Coroutines  
> **🎯 Focus**: Memory-efficient data processing and streaming  
> **🧠 Memory ID**: 4530125  
> **⚡ Level**: Advanced - Data streaming and async patterns  
> **Tags**: #python #generators #iterators #coroutines #data-streaming #memory-efficiency

---

## 🎯 Overview

Section 8 explores Python's **powerful iteration and data streaming capabilities**. Students learn to create custom iteration patterns, build data processing pipelines, and implement coroutine-based systems for real-time data processing. This section demonstrates how generators can transform complex data processing tasks into elegant, memory-efficient solutions.

## 🔄 Generator Fundamentals

### **Custom Iteration Patterns**
```python
import os
import time

def frange(start, stop, step):
    """
    Generator for floating-point ranges.
    
    Unlike built-in range(), supports fractional steps.
    Demonstrates basic generator pattern with yield.
    """
    current = start
    while current < stop:
        yield current
        current += step

# Usage examples
for x in frange(0, 2, 0.25):
    print(x, end=' ')  # 0 0.25 0.5 0.75 1.0 1.25 1.5 1.75

# Reusable generator class
class FRange:
    """
    Reusable floating-point range generator.
    
    Unlike generator functions, this can be iterated multiple times.
    """
    def __init__(self, start, stop, step):
        self.start = start
        self.stop = stop
        self.step = step
    
    def __iter__(self):
        """Return generator for iteration."""
        current = self.start
        while current < self.stop:
            yield current
            current += self.step

# Multiple iterations possible
fr = FRange(0, 1, 0.1)
list1 = list(fr)  # [0, 0.1, 0.2, ...]
list2 = list(fr)  # Same values again
```

### **Real-time File Monitoring**
```python
def follow(filename):
    """
    Generator that monitors a file for new lines.
    
    Similar to Unix 'tail -f' command. Continuously yields
    new lines as they are written to the file.
    """
    with open(filename) as f:
        # Seek to end of file
        f.seek(0, 2)  # 2 = SEEK_END
        
        while True:
            line = f.readline()
            if line:
                yield line.strip()
            else:
                time.sleep(0.1)  # Sleep briefly

# Usage
for line in follow('logfile.txt'):
    print(f"New log entry: {line}")
```

---

## 🔄 Data Processing Pipelines

### **Generator Pipeline Pattern**
```python
def data_processing_pipeline(filename):
    """Memory-efficient data processing pipeline."""
    # Step 1: Read file as generator
    lines = (line.strip() for line in open(filename))
    
    # Step 2: Parse CSV as generator  
    rows = (csv.reader([line]) for line in lines)
    
    # Step 3: Convert types as generator
    records = (convert_row(row) for row in rows)
    
    # Step 4: Filter as generator
    valid_records = (record for record in records if is_valid(record))
    
    return valid_records

def convert_row(row):
    """Convert CSV row to dictionary with type conversion."""
    return {
        'name': row[0],
        'shares': int(row[1]),
        'price': float(row[2])
    }

def is_valid(record):
    """Validate record."""
    return record['shares'] > 0 and record['price'] > 0

# Usage
for record in data_processing_pipeline('portfolio.csv'):
    print(f"Processing: {record}")
```

### **Generator Composition with yield from**
```python
def read_csv(filename):
    """Read CSV file as generator."""
    import csv
    with open(filename) as f:
        reader = csv.reader(f)
        headers = next(reader)
        for row in reader:
            yield dict(zip(headers, row))

def filter_records(records, condition):
    """Filter records based on condition."""
    for record in records:
        if condition(record):
            yield record

def transform_records(records, transformer):
    """Transform records using function."""
    for record in records:
        yield transformer(record)

# Compose generators
def process_portfolio(filename):
    """Process portfolio using generator composition."""
    records = read_csv(filename)
    valid_records = filter_records(records, lambda r: r['shares'] > 0)
    transformed = transform_records(valid_records, 
                                  lambda r: {**r, 'cost': r['shares'] * r['price']})
    return transformed

# Usage
for record in process_portfolio('portfolio.csv'):
    print(f"Stock: {record['name']}, Cost: ${record['cost']:.2f}")
```

---

## ⚡ Coroutines and Push-Based Processing

### **Basic Coroutine Pattern**
```python
def coroutine(func):
    """Decorator to prime coroutines."""
    def start(*args, **kwargs):
        cr = func(*args, **kwargs)
        next(cr)  # Prime the coroutine
        return cr
    return start

@coroutine
def printer():
    """Simple coroutine that prints received data."""
    while True:
        data = yield
        print(f"Received: {data}")

@coroutine
def filter_coroutine(condition):
    """Coroutine that filters data based on condition."""
    while True:
        data = yield
        if condition(data):
            yield data

# Usage
p = printer()
p.send("Hello")  # Prints: "Received: Hello"

f = filter_coroutine(lambda x: x > 0)
next(f)  # Prime the coroutine
f.send(5)   # Yields: 5
f.send(-3)  # No output (filtered out)
```

### **Real-time Data Processing**
```python
@coroutine
def stock_monitor(target):
    """Monitor stock prices and send alerts."""
    while True:
        data = yield
        if data['price'] > data.get('threshold', 100):
            target.send(f"ALERT: {data['symbol']} at ${data['price']:.2f}")

@coroutine
def portfolio_tracker():
    """Track portfolio value changes."""
    total_value = 0
    while True:
        data = yield
        old_value = total_value
        total_value += data['value']
        if total_value != old_value:
            print(f"Portfolio value: ${total_value:.2f}")

# Connect coroutines
monitor = stock_monitor(portfolio_tracker())
next(monitor)  # Prime the pipeline

# Simulate data stream
monitor.send({'symbol': 'GOOG', 'price': 1500.0, 'value': 1000})
monitor.send({'symbol': 'IBM', 'price': 120.0, 'value': 500})
```

---

## 🔄 Advanced Generator Patterns

### **Generator Delegation with yield from**
```python
def sub_gen():
    """Sub-generator."""
    yield 1
    yield 2
    yield 3

def delegating_gen():
    """Generator that delegates to sub-generator."""
    yield 'a'
    yield from sub_gen()  # Delegate to sub-generator
    yield 'b'

# Usage
for item in delegating_gen():
    print(item)  # a, 1, 2, 3, b
```

### **Context Manager Generators**
```python
from contextlib import contextmanager

@contextmanager
def managed_resource():
    """Context manager using generator."""
    print("Setting up resource")
    try:
        yield "resource"
    finally:
        print("Cleaning up resource")

# Usage
with managed_resource() as resource:
    print(f"Using {resource}")
```

### **Generator Expressions**
```python
# Memory-efficient processing
def process_large_file(filename):
    with open(filename) as f:
        # Generator expression: processes one line at a time
        return (process_line(line) for line in f)

# vs. Loading entire file
def process_entire_file(filename):
    with open(filename) as f:
        lines = f.readlines()  # Loads everything into memory
        return [process_line(line) for line in lines]
```

---

## 🔄 Iterator Protocol Implementation

### **Custom Iterator Classes**
```python
class PortfolioIterator:
    """Iterator for portfolio data."""
    
    def __init__(self, portfolio):
        self.portfolio = portfolio
        self.index = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index >= len(self.portfolio):
            raise StopIteration
        item = self.portfolio[self.index]
        self.index += 1
        return item

class Portfolio:
    """Portfolio with iterator support."""
    
    def __init__(self):
        self.holdings = []
    
    def add(self, stock):
        self.holdings.append(stock)
    
    def __iter__(self):
        return PortfolioIterator(self.holdings)

# Usage
portfolio = Portfolio()
portfolio.add(Stock('GOOG', 100, 490.1))
portfolio.add(Stock('IBM', 50, 91.23))

for stock in portfolio:
    print(f"{stock.name}: {stock.cost()}")
```

### **Generator-Based Iterators**
```python
class Portfolio:
    """Portfolio with generator-based iteration."""
    
    def __init__(self):
        self.holdings = []
    
    def add(self, stock):
        self.holdings.append(stock)
    
    def __iter__(self):
        """Generator-based iterator."""
        for stock in self.holdings:
            yield stock
    
    def filter_by_price(self, min_price=0):
        """Generator that filters by price."""
        for stock in self:
            if stock.price >= min_price:
                yield stock
    
    def total_cost(self):
        """Calculate total portfolio cost."""
        return sum(stock.cost() for stock in self)
```

---

## 🧪 Best Practices

### ✅ **Do's**
- Use generators for memory-efficient processing
- Build data processing pipelines with generators
- Use coroutines for real-time data processing
- Implement iterator protocol for custom objects
- Use generator expressions for simple transformations

### ❌ **Don'ts**
- Don't iterate over generators multiple times
- Don't forget to prime coroutines before use
- Don't use generators for small datasets
- Don't ignore generator lifecycle management
- Don't create infinite generators without exit conditions

---

## 🔗 Cross-References

### **Builds On**
- [[Python Mastery - Data Structures]] - Memory efficiency
- [[Python Mastery - Functions and Testing]] - Function design

### **Leads To**
- [[Python Mastery - Modules and Packages]] - Package architecture
- [[Async Programming Patterns]] - Advanced coroutines

### **Related Concepts**
- [[Python Generator Patterns]]
- [[Iterator Protocol Reference]]
- [[Coroutine Programming]]
- [[Data Processing Pipelines]]

---

## 📋 Exercise Checklist

### **Exercise 8.1: Generator Fundamentals**
- [ ] Create custom iteration patterns
- [ ] Implement floating-point range generator
- [ ] Build reusable generator classes
- [ ] Add iteration to custom objects

### **Exercise 8.2: Data Processing Pipelines**
- [ ] Create generator pipelines
- [ ] Implement data filtering and transformation
- [ ] Use yield from for generator composition
- [ ] Build memory-efficient processing systems

### **Exercise 8.3: Coroutines**
- [ ] Implement basic coroutines
- [ ] Create push-based data processing
- [ ] Build real-time monitoring systems
- [ ] Connect coroutines in pipelines

### **Exercise 8.4: Advanced Patterns**
- [ ] Use yield from for delegation
- [ ] Create context manager generators
- [ ] Implement custom iterators
- [ ] Build generator-based data structures

---

## 💡 Key Takeaways

1. **Memory Efficiency**: Generators process data on-demand
2. **Pipeline Composition**: Build complex processing with simple generators
3. **Real-time Processing**: Coroutines enable push-based data flow
4. **Iterator Protocol**: Implement for custom iteration behavior
5. **Generator Delegation**: Use yield from for complex patterns

**🎯 Mastery Goal**: Ability to design memory-efficient data processing systems using generators and coroutines.