---
title: Exercise 4: JSON to CSV Conversion
tags: [json-csv-conversion, file-format-transformation, directory-traversal, data-transformation]
---

# Exercise 4: JSON to CSV Conversion

## Overview

Exercise 4 focuses on file format conversion from JSON to CSV using Python. The exercise specifically tests a developer's ability to traverse ragged directory structures, locate JSON files, and convert them to CSV format. This represents a common data engineering task where data needs to be transformed from semi-structured (JSON) to structured (CSV) format for further processing.

## System Overview

Exercise 4 simulates a real-world data engineering scenario where unstructured JSON data must be converted to a structured, tabular CSV format. This type of conversion is frequently required when preparing data for analysis or database insertion.

### Technical Objectives

The exercise tests several key technical skills:

- **Directory traversal**: Navigating through nested and irregular directory structures
- **File type detection**: Identifying JSON files among other file types
- **JSON parsing**: Reading and interpreting JSON data structures
- **Data transformation**: Converting JSON objects to flat, tabular structures
- **CSV creation**: Writing processed data to CSV files with proper formatting

## Implementation Architecture

The implementation for this exercise follows a modular approach where the main logic is implemented in the main.py file. The exercise infrastructure uses Docker to ensure consistent execution environments.

### Runtime Flow

1. **Exercise-4 Directory**: Contains solution code and test files
2. **main.py**: Implements main() function with conversion logic
3. **docker-compose.yml**: Configures Docker services
4. **Dockerfile**: Builds Docker image
5. **Directory Structure**: Contains JSON files to process
6. **JSON Content**: Semi-structured data to transform
7. **Tabular Data**: Structured data for CSV output
8. **CSV Files**: Final output files

## Directory Structure

The implementation must handle ragged directory structures - directories that have varying depth and organization without a consistent pattern. The algorithm needs to recursively traverse all subdirectories to locate any JSON files regardless of their location in the directory tree.

## Docker Environment

The exercise uses Docker to provide a consistent execution environment. The Docker configuration is defined in the docker-compose.yml file and includes two services: test and run.

### Docker Services

- **test service**: Runs pytest for validation
- **run service**: Executes main.py for solution
- **Volume mounting**: Local directory mounted to /app in container

### Running the Exercise

To run this exercise, you need to:

1. **Build the Docker image** using:
   ```bash
   docker build --tag=exercise-4 .
   ```

2. **Run the solution**:
   ```bash
   docker-compose up run
   ```

3. **Run the tests**:
   ```bash
   docker-compose up test
   ```

Both the test and run services mount the current directory to /app in the container, allowing for real-time code changes to be reflected when running the containers.

## Code Implementation Guidelines

### JSON Processing

For JSON processing, the implementation should utilize Python's built-in json module to parse JSON files. Key considerations include:

- **Handling nested JSON structures**
- **Dealing with different data types** within JSON objects
- **Managing potential encoding issues**
- **Processing arrays/lists of objects**

Example approach:
```python
import json

def read_json_file(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)
```

### Directory Traversal

The Python os and pathlib modules provide the necessary tools for directory traversal. Implementation should consider:

- **Recursive directory traversal**
- **File extension filtering**
- **Path handling across operating systems**

Example approach:
```python
import os
import pathlib

def find_json_files(root_dir):
    json_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.json'):
                json_files.append(os.path.join(root, file))
    return json_files
```

### CSV Conversion

For CSV conversion, Python's csv module or pandas library can be used to write data to CSV format. The implementation should handle:

- **Flattening nested JSON structures**
- **Determining appropriate column headers**
- **Managing data type conversions**
- **Handling missing values**

## Testing Approach

The test service defined in the Docker configuration runs pytest on the codebase. While the specific test requirements may vary, the testing should validate:

- **Correct JSON file discovery** in directory structures
- **Proper JSON parsing** and error handling
- **Accurate CSV conversion** with appropriate formatting
- **Handling of various JSON structures** (nested objects, arrays, etc.)
- **Error handling** for malformed JSON files

## Common Challenges

### Nested JSON Structures

One of the primary challenges is handling nested JSON objects and converting them to flat CSV format. This may require:

- **Recursive flattening algorithms**
- **Column naming strategies** for nested fields
- **Handling arrays and complex data types**

### Directory Structure Complexity

Ragged directory structures can present challenges:

- **Varying directory depths**
- **Inconsistent naming patterns**
- **Mixed file types** in the same directories
- **Performance considerations** for large directory trees

### Data Type Handling

JSON supports various data types that need to be converted to CSV-compatible formats:

- **Nested objects** → Flattened columns
- **Arrays** → Multiple rows or concatenated strings
- **Null values** → Empty strings or special markers
- **Mixed data types** → Consistent type conversion

## Best Practices

### Implementation Best Practices

- **Modular design**: Separate concerns into distinct functions
- **Error handling**: Robust error handling for file operations
- **Memory efficiency**: Process files incrementally for large datasets
- **Logging**: Provide feedback on processing progress
- **Validation**: Verify output format and data integrity

### Performance Considerations

- **Batch processing**: Process multiple files efficiently
- **Memory management**: Avoid loading entire directories into memory
- **I/O optimization**: Minimize disk operations
- **Progress tracking**: Provide feedback for long-running operations

## Key Learning Outcomes

- **File format conversion**: Understanding JSON to CSV transformation
- **Directory traversal**: Navigating complex file structures
- **Data transformation**: Converting between data formats
- **Error handling**: Managing file processing errors
- **Modular programming**: Organizing code for maintainability

## Related Exercises

- **[[Exercise 2: Web Scraping and Pandas]]**: Data acquisition and processing
- **[[Exercise 3: AWS S3 and Boto3]]**: Cloud storage integration
- **[[Exercise 5: PostgreSQL Data Modeling]]**: Database operations and data loading

## Technical Skills Developed

- **JSON processing**: Parsing and manipulating JSON data
- **CSV generation**: Creating properly formatted CSV files
- **Directory operations**: Traversing complex file structures
- **Data transformation**: Converting between data formats
- **Error handling**: Managing file processing exceptions