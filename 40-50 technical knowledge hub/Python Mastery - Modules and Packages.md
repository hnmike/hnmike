# Python Mastery - Modules and Packages

> **📚 Section**: 9 - Modules and Packages  
> **🎯 Focus**: Advanced code organization and distribution  
> **🧠 Memory ID**: 4530130  
> **📦 Level**: Expert - Professional package architecture  
> **Tags**: #python #modules #packages #import-system #architecture #distribution

---

## 🎯 Overview

Section 9 explores **advanced techniques for organizing and distributing Python code**. Students learn to create sophisticated package structures, manage symbol exports, handle circular imports, and implement dynamic loading systems. This section demonstrates how to build professional-grade Python libraries with clean APIs and flexible architectures.

## 📦 Module Loading Fundamentals

### **Module Caching and Loading**
```python
# simplemod.py - Example module for experimentation
x = 42        # Global variable

def foo():   
    """Simple function that uses global variable."""
    print('x is', x)

class Spam:
    """Simple class for testing."""
    def yow(self):
        print('Yow!')

# Module-level code (runs on import)
print('Loaded simplemod')

# Module loading experiments
import sys
import importlib

def demonstrate_module_loading():
    """Demonstrate various aspects of module loading."""
    
    # 1. Basic import
    print("=== Basic Import ===")
    import simplemod  # Prints: "Loaded simplemod"
    simplemod.foo()   # Prints: "x is 42"
    
    # 2. Repeated import (no reload)
    print("\n=== Repeated Import ===")
    import simplemod  # No output - already loaded
    
    # 3. Module caching in sys.modules
    print("\n=== Module Caching ===")
    print(f"Module in cache: {'simplemod' in sys.modules}")
    print(f"Module object: {sys.modules.get('simplemod')}")
    
    # 4. Modifying module state
    print("\n=== Module State Modification ===")
    print(f"Original x: {simplemod.x}")
    simplemod.x = 13
    print(f"Modified x: {simplemod.x}")
    
    # Import again - no change to modified state
    import simplemod
    print(f"After re-import: {simplemod.x}")  # Still 13
    
    # 5. Force reload
    print("\n=== Force Reload ===")
    importlib.reload(simplemod)  # Prints: "Loaded simplemod"
    print(f"After reload: {simplemod.x}")    # Back to 42
```

### **Import Variants and Namespace Management**
```python
def demonstrate_import_variants():
    """Show different import statement patterns."""
    
    # 1. Selective import
    print("=== Selective Import ===")
    from simplemod import foo, x
    print(f"Imported x: {x}")
    foo()  # Works
    
    # 2. Import with alias
    print("\n=== Import with Alias ===")
    import simplemod as sm
    sm.foo()
    
    # 3. From import with alias
    print("\n=== From Import with Alias ===")
    from simplemod import foo as my_foo
    my_foo()
    
    # 4. Import all (not recommended)
    print("\n=== Import All ===")
    from simplemod import *
    print(f"x from * import: {x}")
```

---

## 📦 Package Structure and Organization

### **Basic Package Structure**
```
mypackage/
├── __init__.py          # Package initialization
├── core.py              # Core functionality
├── utils.py             # Utility functions
├── config.py            # Configuration
└── tests/               # Test package
    ├── __init__.py
    ├── test_core.py
    └── test_utils.py
```

### **Package Initialization**
```python
# mypackage/__init__.py
"""
MyPackage - A professional Python package.

This package provides advanced functionality for data processing.
"""

__version__ = '1.0.0'
__author__ = 'Your Name'
__email__ = 'your.email@example.com'

# Import main functionality for easy access
from .core import main_function, MyClass
from .utils import helper_function

# Define what gets imported with "from mypackage import *"
__all__ = [
    'main_function',
    'MyClass', 
    'helper_function'
]

# Package-level configuration
DEFAULT_CONFIG = {
    'debug': False,
    'timeout': 30,
    'max_retries': 3
}

def get_config():
    """Get package configuration."""
    return DEFAULT_CONFIG.copy()
```

### **Subpackage Organization**
```python
# mypackage/core/__init__.py
from .processor import DataProcessor
from .validator import DataValidator

__all__ = ['DataProcessor', 'DataValidator']

# mypackage/core/processor.py
class DataProcessor:
    """Core data processing functionality."""
    
    def __init__(self, config=None):
        self.config = config or {}
    
    def process(self, data):
        """Process data according to configuration."""
        # Processing logic here
        return processed_data

# mypackage/core/validator.py
class DataValidator:
    """Data validation functionality."""
    
    def validate(self, data):
        """Validate data structure."""
        # Validation logic here
        return is_valid
```

---

## 🔧 Symbol Export Control

### **Using __all__ for Controlled Exports**
```python
# mypackage/__init__.py
from .core import DataProcessor, DataValidator
from .utils import helper_function, utility_class
from .config import get_config

# Control what gets imported with "from mypackage import *"
__all__ = [
    'DataProcessor',
    'DataValidator', 
    'helper_function',
    'get_config'
]

# Note: utility_class is not in __all__, so it won't be imported with *
```

### **Dynamic Import Management**
```python
def import_optional_dependencies():
    """Import optional dependencies dynamically."""
    try:
        import numpy as np
        HAS_NUMPY = True
    except ImportError:
        HAS_NUMPY = False
        np = None
    
    try:
        import pandas as pd
        HAS_PANDAS = True
    except ImportError:
        HAS_PANDAS = False
        pd = None
    
    return {
        'numpy': (np, HAS_NUMPY),
        'pandas': (pd, HAS_PANDAS)
    }

# Usage in package
OPTIONAL_DEPS = import_optional_dependencies()

def advanced_function(data):
    """Function that uses optional dependencies."""
    if not OPTIONAL_DEPS['numpy'][1]:
        raise ImportError("numpy is required for this function")
    
    np = OPTIONAL_DEPS['numpy'][0]
    return np.array(data)
```

---

## 🔄 Circular Import Handling

### **Lazy Import Pattern**
```python
# mypackage/core.py
class CoreClass:
    def __init__(self):
        self._utils = None
    
    @property
    def utils(self):
        """Lazy import of utils module."""
        if self._utils is None:
            from . import utils
            self._utils = utils
        return self._utils
    
    def process_with_utils(self, data):
        """Use utils functionality when needed."""
        return self.utils.helper_function(data)

# mypackage/utils.py
class UtilsClass:
    def __init__(self):
        self._core = None
    
    @property
    def core(self):
        """Lazy import of core module."""
        if self._core is None:
            from . import core
            self._core = core
        return self._core
    
    def helper_function(self, data):
        """Helper function that might need core functionality."""
        # Use core functionality if needed
        return processed_data
```

### **Dependency Injection Pattern**
```python
# mypackage/core.py
class CoreProcessor:
    def __init__(self, utils_provider=None):
        self.utils = utils_provider
    
    def process(self, data):
        if self.utils:
            return self.utils.helper_function(data)
        return self._basic_process(data)

# mypackage/utils.py
class UtilsProvider:
    def __init__(self, core_provider=None):
        self.core = core_provider
    
    def helper_function(self, data):
        if self.core:
            return self.core.process(data)
        return self._basic_helper(data)

# Usage - inject dependencies
core = CoreProcessor()
utils = UtilsProvider(core)
core.utils = utils
```

---

## 🔧 Dynamic Module Loading

### **Plugin Architecture**
```python
import os
import importlib
import importlib.util

class PluginManager:
    """Dynamic plugin loading system."""
    
    def __init__(self, plugin_dir):
        self.plugin_dir = plugin_dir
        self.plugins = {}
    
    def load_plugins(self):
        """Load all plugins from plugin directory."""
        for filename in os.listdir(self.plugin_dir):
            if filename.endswith('.py') and not filename.startswith('_'):
                plugin_name = filename[:-3]
                self.load_plugin(plugin_name)
    
    def load_plugin(self, plugin_name):
        """Load a specific plugin."""
        plugin_path = os.path.join(self.plugin_dir, f"{plugin_name}.py")
        
        # Load module from file
        spec = importlib.util.spec_from_file_location(plugin_name, plugin_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        # Register plugin
        if hasattr(module, 'Plugin'):
            self.plugins[plugin_name] = module.Plugin()
    
    def get_plugin(self, name):
        """Get loaded plugin by name."""
        return self.plugins.get(name)
    
    def list_plugins(self):
        """List all loaded plugins."""
        return list(self.plugins.keys())

# Usage
manager = PluginManager('./plugins')
manager.load_plugins()

# Use plugins
for plugin_name in manager.list_plugins():
    plugin = manager.get_plugin(plugin_name)
    result = plugin.process(data)
```

### **Configuration-Driven Loading**
```python
class ConfigurableLoader:
    """Load modules based on configuration."""
    
    def __init__(self, config):
        self.config = config
        self.loaded_modules = {}
    
    def load_configured_modules(self):
        """Load modules specified in configuration."""
        for module_name, module_config in self.config.items():
            if module_config.get('enabled', True):
                self.load_module(module_name, module_config)
    
    def load_module(self, name, config):
        """Load module with configuration."""
        try:
            module = importlib.import_module(name)
            
            # Apply configuration
            if 'setup' in config:
                config['setup'](module)
            
            self.loaded_modules[name] = module
            
        except ImportError as e:
            print(f"Failed to load {name}: {e}")
    
    def get_module(self, name):
        """Get loaded module by name."""
        return self.loaded_modules.get(name)

# Usage
config = {
    'mypackage.core': {'enabled': True},
    'mypackage.utils': {'enabled': True},
    'optional_module': {'enabled': False}
}

loader = ConfigurableLoader(config)
loader.load_configured_modules()
```

---

## 🧪 Best Practices

### ✅ **Do's**
- Use `__all__` to control symbol exports
- Implement lazy imports for circular dependencies
- Create clear package hierarchies
- Use relative imports within packages
- Handle optional dependencies gracefully

### ❌ **Don'ts**
- Don't use `from module import *` in production code
- Don't create deep package hierarchies
- Don't ignore circular import issues
- Don't forget to handle import errors
- Don't make packages too complex

---

## 🔗 Cross-References

### **Builds On**
- [[Python Mastery - Code Structure]] - Code organization
- [[Python Mastery - Functions and Testing]] - Testing packages

### **Leads To**
- [[Python Package Distribution]] - Publishing packages
- [[Professional Python Development]] - Best practices

### **Related Concepts**
- [[Python Import System]]
- [[Package Architecture Patterns]]
- [[Plugin Development]]
- [[Dynamic Module Loading]]

---

## 📋 Exercise Checklist

### **Exercise 9.1: Module Loading**
- [ ] Understand module caching mechanism
- [ ] Experiment with different import patterns
- [ ] Handle module state modifications
- [ ] Use importlib for dynamic loading

### **Exercise 9.2: Package Structure**
- [ ] Create well-organized package hierarchy
- [ ] Implement proper __init__.py files
- [ ] Control symbol exports with __all__
- [ ] Design clean package APIs

### **Exercise 9.3: Circular Imports**
- [ ] Implement lazy import patterns
- [ ] Use dependency injection
- [ ] Handle circular dependencies gracefully
- [ ] Design decoupled module interfaces

### **Exercise 9.4: Dynamic Loading**
- [ ] Create plugin architecture
- [ ] Implement configuration-driven loading
- [ ] Handle optional dependencies
- [ ] Build flexible module systems

---

## 💡 Key Takeaways

1. **Module Caching**: Python caches modules in sys.modules
2. **Symbol Control**: Use __all__ to control exports
3. **Circular Imports**: Use lazy imports or dependency injection
4. **Dynamic Loading**: Load modules based on configuration
5. **Package Design**: Create clean, maintainable package structures

**🎯 Mastery Goal**: Ability to design and implement professional-grade Python packages with clean APIs and flexible architectures.