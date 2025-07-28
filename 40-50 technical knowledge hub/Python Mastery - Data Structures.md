# Python Mastery - Data Structures & Memory Efficiency

> **📚 Section**: 2 - Data Structures and Memory Efficiency  
> **🎯 Focus**: Memory-efficient data handling and analysis  
> **🧠 Memory ID**: 4530093  
> **📊 Dataset**: Chicago bus data (577k records)  
> **Tags**: #python #data-structures #memory #optimization #performance

---

## 🎯 Overview

Section 2 focuses on **memory-efficient data handling** and analysis techniques. Students learn to work with large datasets, understand memory trade-offs between different data representations, and implement custom containers. This section emphasizes practical data analysis skills using real-world datasets.

## 📊 Memory Comparison Results

### 🔍 **Data Structure Memory Usage**
```
Dictionaries:     ~220MB (most memory intensive)
Classes with __slots__: ~60MB (structured)
Named Tuples:    ~55MB (balanced approach)
Tuples:          ~45MB (most memory efficient)
```

### 💡 **Key Insight**
> **Memory vs Readability Trade-off**: Choose data structure based on use case requirements, not just memory efficiency.

---

## 🏗️ Core Techniques

### 1. **Memory Profiling with tracemalloc**
```python
import tracemalloc
tracemalloc.start()

# Your data processing code here
data = read_large_dataset()

current, peak = tracemalloc.get_traced_memory()
print(f'Current: {current / 1024 / 1024:.1f} MB')
print(f'Peak: {peak / 1024 / 1024:.1f} MB')
```

### 2. **Column-Oriented Storage**
```python
class RideData:
    def __init__(self):
        self.routes = []      # Column 1
        self.dates = []       # Column 2  
        self.daytypes = []    # Column 3
        self.rides = []       # Column 4
    
    def __getitem__(self, index):
        # Fake-out pattern: maintain dict interface
        return {
            'route': self.routes[index],
            'date': self.dates[index], 
            'daytype': self.daytypes[index],
            'rides': self.rides[index]
        }
```

### 3. **Generator Expressions for Memory Efficiency**
```python
# Memory-efficient processing
def process_large_file(filename):
    with open(filename) as f:
        # Generator: processes one line at a time
        for line in f:
            yield process_line(line)

# vs. Loading entire file
def process_entire_file(filename):
    with open(filename) as f:
        lines = f.readlines()  # Loads everything into memory
        return [process_line(line) for line in lines]
```

---

## 🔧 Implementation Patterns

### **Custom Container with Sequence Protocol**
```python
from collections.abc import Sequence

class ColumnData(Sequence):
    def __init__(self, columns):
        self.columns = columns
    
    def __getitem__(self, index):
        return {name: data[index] for name, data in self.columns.items()}
    
    def __len__(self):
        return len(next(iter(self.columns.values())))
    
    def __iter__(self):
        for i in range(len(self)):
            yield self[i]
```

### **String Interning for Memory Savings**
```python
import sys

# Without interning: many duplicate strings
routes = [row['route'] for row in data]  # 542,305 unique objects

# With interning: shared string objects  
routes = [sys.intern(row['route']) for row in data]  # 181 unique objects
```

### **Memory-Efficient Data Reading**
```python
def read_csv_as_columns(filename, types):
    """Read CSV into column-oriented storage"""
    columns = {name: [] for name in ['route', 'date', 'daytype', 'rides']}
    
    with open(filename) as f:
        rows = csv.reader(f)
        headers = next(rows)
        
        for row in rows:
            for i, (name, type_func) in enumerate(zip(headers, types)):
                columns[name].append(type_func(row[i]))
    
    return ColumnData(columns)
```

---

## 🎨 Design Patterns

### **The Fake-Out Pattern**
> **Problem**: Need memory efficiency but maintain familiar interface
> **Solution**: Store data efficiently internally, present familiar interface externally

```python
class MemoryEfficientContainer:
    def __init__(self):
        # Store data in most efficient format
        self._columns = {...}
    
    def __getitem__(self, index):
        # Present familiar dict interface
        return {name: self._columns[name][index] for name in self._columns}
    
    def __len__(self):
        return len(next(iter(self._columns.values())))
```

### **Generator Pipeline Pattern**
```python
def data_processing_pipeline(filename):
    """Memory-efficient data processing pipeline"""
    # Step 1: Read file as generator
    lines = (line.strip() for line in open(filename))
    
    # Step 2: Parse CSV as generator  
    rows = (csv.reader([line]) for line in lines)
    
    # Step 3: Convert types as generator
    records = (convert_row(row) for row in rows)
    
    # Step 4: Filter as generator
    valid_records = (record for record in records if is_valid(record))
    
    return valid_records
```

---

## 🧪 Best Practices

### ✅ **Do's**
- Use `tracemalloc` for accurate memory profiling
- Choose data structures based on use case requirements
- Convert data types during parsing, not later
- Use context managers for proper file handling
- Implement sequence protocol for custom containers
- Use generator expressions for large datasets

### ❌ **Don'ts**
- Don't guess memory usage - measure it
- Don't load entire files into memory unnecessarily
- Don't ignore memory implications of data structure choices
- Don't forget to close files (use context managers)
- Don't create unnecessary object copies

---

## 🔗 Cross-References

### **Builds On**
- [[Python Mastery - Fundamentals]] - File I/O, basic classes
- [[Error Handling Patterns]] - Graceful degradation

### **Leads To**
- [[Python Mastery - Object-Oriented Programming]] - Custom containers
- [[Python Mastery - Functions and Testing]] - Higher-order functions
- [[Python Mastery - Generators and Iterators]] - Advanced iteration

### **Related Concepts**
- [[Memory Optimization Techniques]]
- [[Python Performance Profiling]]
- [[Data Processing Patterns]]
- [[Custom Container Design]]

---

## 📋 Exercise Checklist

### **Exercise 2.1: Memory-Efficient Data Representation**
- [ ] Compare memory usage of different data structures
- [ ] Implement column-oriented storage
- [ ] Profile memory usage with tracemalloc
- [ ] Analyze trade-offs between memory and readability

### **Exercise 2.2: Data Analysis Techniques**
- [ ] Implement custom containers
- [ ] Use generator expressions for memory efficiency
- [ ] Apply string interning for memory savings
- [ ] Create data processing pipelines

### **Exercise 2.3: Custom Containers**
- [ ] Implement sequence protocol
- [ ] Create memory-efficient data structures
- [ ] Maintain familiar interfaces with efficient storage
- [ ] Build reusable container patterns

---

## 💡 Key Takeaways

1. **Memory Profiling**: Always measure, don't guess
2. **Trade-off Awareness**: Balance memory efficiency with code readability
3. **Generator Patterns**: Use generators for large datasets
4. **Interface Design**: Maintain familiar interfaces with efficient implementations
5. **Real-world Scale**: Design for actual data sizes, not toy examples

**🎯 Mastery Goal**: Ability to design memory-efficient data processing systems that scale to real-world datasets.