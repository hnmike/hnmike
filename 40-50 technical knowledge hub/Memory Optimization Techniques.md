# Memory Optimization Techniques

> **📊 Focus**: Memory-efficient data handling and analysis  
> **🔗 Related**: Data structures, performance, profiling  
> **Tags**: #python #memory #optimization #performance #profiling

---

## 📈 Memory Usage Comparison

### **Data Structure Memory Hierarchy**
```
Dictionaries:     ~220MB (most memory intensive)
Classes with __slots__: ~60MB (structured)
Named Tuples:    ~55MB (balanced approach)
Tuples:          ~45MB (most memory efficient)
```

### **Key Insight**
> **Memory vs Readability Trade-off**: Choose data structure based on use case requirements, not just memory efficiency.

---

## 🔧 Core Techniques

### **1. Memory Profiling with tracemalloc**
```python
import tracemalloc
tracemalloc.start()

# Your data processing code here
data = read_large_dataset()

current, peak = tracemalloc.get_traced_memory()
print(f'Current: {current / 1024 / 1024:.1f} MB')
print(f'Peak: {peak / 1024 / 1024:.1f} MB')
```

### **2. String Interning**
```python
import sys

# Without interning: many duplicate strings
routes = [row['route'] for row in data]  # 542,305 unique objects

# With interning: shared string objects  
routes = [sys.intern(row['route']) for row in data]  # 181 unique objects
```

### **3. Column-Oriented Storage**
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

### **4. Generator Expressions**
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

## 🎯 Implementation Patterns

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

## 🔗 Semantic Relations

### **Implements**
- **implements** [[Python Mastery - Data Structures]] - Core memory optimization techniques
- **extends** [[Python Performance Profiling]] - tracemalloc and memory analysis
- **enhances** [[Data Processing Patterns]] - Column-oriented storage patterns

### **Requires**
- **requires** [[Python Environment Setup]] - tracemalloc module availability
- **requires** [[Large Dataset Handling]] - Real-world data processing scenarios

### **Part Of**
- **part_of** [[Data Engineering Workflow]] - Memory-efficient data processing pipeline
- **part_of** [[Performance Optimization]] - Overall system optimization strategy

### **Pairs With**
- **pairs_with** [[Chicago Bus Dataset]] - Real-world memory optimization example
- **pairs_with** [[Generator Patterns]] - Memory-efficient iteration techniques
- **pairs_with** [[Custom Container Design]] - Sequence protocol implementation

---

## 📊 Best Practices

### **✅ Do's**
- Use `tracemalloc` for accurate memory profiling
- Choose data structures based on use case requirements
- Convert data types during parsing, not later
- Use context managers for proper file handling
- Implement sequence protocol for custom containers
- Use generator expressions for large datasets

### **❌ Don'ts**
- Don't guess memory usage - measure it
- Don't load entire files into memory unnecessarily
- Don't ignore memory implications of data structure choices
- Don't forget to close files (use context managers)
- Don't create unnecessary object copies

---

## 🎯 Key Takeaways

1. **Memory Profiling**: Always measure, don't guess
2. **Trade-off Awareness**: Balance memory efficiency with code readability
3. **Generator Patterns**: Use generators for large datasets
4. **Interface Design**: Maintain familiar interfaces with efficient implementations
5. **Real-world Scale**: Design for actual data sizes, not toy examples

**🎯 Mastery Goal**: Ability to design memory-efficient data processing systems that scale to real-world datasets.