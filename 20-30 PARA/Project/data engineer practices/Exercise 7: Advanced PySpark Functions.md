---
title: Exercise 7: Advanced PySpark Functions
tags: [pyspark, advanced-functions, data-transformation, spark-sql-functions, complex-processing]
---

# Exercise 7: Advanced PySpark Functions

## Overview

Exercise 7 focuses on using various built-in PySpark functions to perform data transformations on hard drive failure data. This exercise builds upon the basic PySpark aggregation concepts covered in [[Exercise 6: PySpark Aggregation]] but elevates the complexity by requiring the use of multiple PySpark SQL functions to solve real-world data transformation problems.

The exercise specifically focuses on using functions from `pyspark.sql.functions` to manipulate, transform, and enrich hard drive failure datasets without resorting to UDFs (User Defined Functions) or regular Python methods.

## System Overview

Exercise 7 follows the standard docker-based workflow used throughout the data engineering practice repository. The exercise requires reading hard drive failure data from a zipped CSV file, performing multiple transformations using PySpark functions, and producing an enriched dataset.

### Exercise 7 System Overview

**PySpark Transformations**:
1. **Read with spark.read.csv**: Load zipped CSV file
2. **PySpark SQL Functions**: Apply various transformation functions
3. **Add source_file column**: Extract file information
4. **Zipped CSV File**: hard-drive-2022-01-01-failures.csv.zip
5. **SparkSession (Exercise7)**: Configured PySpark environment
6. **Raw DataFrame**: Initial data structure
7. **Transformed DataFrame**: Enriched with new columns
8. **Extract file_date**: Parse date from filename
9. **Derive brand from model**: Extract brand information
10. **Create storage_ranking**: Generate ranking system
11. **Generate primary_key hash**: Create unique identifiers

## Environment Setup

The exercise runs in a Docker container that includes:

- **Ubuntu 18.04 base image**
- **Java, Scala, and Python 3.8**
- **Apache Spark 3.5.0**
- **AWS connectivity components**

### Docker Environment

- **docker build --tag=exercise-7 .**: Build Docker image
- **Docker Image (exercise-7)**: Configured environment
- **docker-compose up run**: Execute main application
- **docker-compose up test**: Run validation tests
- **Run Service**: Executes main.py with spark-submit
- **Test Service**: Executes pytest
- **Volume Mount**: ./:/app for local development

## Data Description

The exercise uses hard drive failure data from BackBlaze. The data comes in a zipped CSV file containing detailed SMART (Self-Monitoring, Analysis, and Reporting Technology) attributes for various hard drives.

### Data Structure

The dataset contains the following key columns:

- **date**: The date of the record
- **serial_number**: Unique identifier for each hard drive
- **model**: The model name of the hard drive
- **capacity_bytes**: Storage capacity in bytes
- **failure**: Indicates if the drive failed (1) or not (0)
- **Multiple smart_X_normalized and smart_X_raw columns**: Various SMART attributes providing health information about the drives

## Required Transformations

The exercise requires implementing five specific data transformations:

### Data Transformation Flow

**Raw DataFrame** → **Transformed DataFrame**

1. **Source File Column**: Add the file name as a column using PySpark's `input_file_name()` function, naming it source_file.

2. **File Date Extraction**: Extract the date embedded in the source file name and convert it to a proper date/timestamp data type using string manipulation functions and date conversion functions.

3. **Brand Derivation**: Create a brand column based on the model column:
   - If the model contains a space, split on that space and use the first part as the brand
   - If no space exists, use "unknown" as the brand value

4. **Storage Ranking**: Create a ranking system for hard drive models based on their storage capacity:
   - Create a secondary DataFrame grouping by model and capacity
   - Apply ranking logic using window functions
   - Join this ranking back to the main DataFrame

5. **Primary Key Generation**: Create a unique identifier for each record by hashing columns that make a record unique using hash functions.

## Implementation Structure

The implementation should be structured within the provided main.py file, following these guidelines:

### Code Organization

- **main() function**: Initializes SparkSession and calls transformation functions
- **TransformationFunctions**: Modular functions for each transformation
  - add_source_file(df)
  - extract_file_date(df)
  - derive_brand(df)
  - create_storage_ranking(df)
  - generate_primary_key(df)

The main function initializes a SparkSession and then should call various transformation functions to implement the required data processing steps. All transformations should use PySpark SQL functions rather than Python methods or UDFs.

## PySpark SQL Functions Reference

The following table outlines key PySpark SQL functions that are relevant to this exercise:

| Function | Purpose | Potential Use |
|----------|---------|---------------|
| input_file_name() | Gets the name of the input file | Adding source_file column |
| regexp_extract() | Extracts pattern from string | Extracting date from filename |
| to_date() | Converts string to date | Converting extracted date string |
| split() | Splits string by delimiter | Separating brand from model |
| when(), otherwise() | Conditional expressions | Handling brand extraction logic |
| lit() | Creates a literal value | Setting "unknown" for brand |
| dense_rank(), rank() | Window ranking functions | Creating storage capacity rankings |
| sha2(), md5() | Hashing functions | Creating a primary key |
| concat() | Combines strings | Combining fields for hashing |

## Running and Testing

The exercise can be executed using Docker:

1. **Build the Docker image**:
   ```bash
   docker build --tag=exercise-7 .
   ```

2. **Run the application**:
   ```bash
   docker-compose up run
   ```

3. **Run tests** (if implemented):
   ```bash
   docker-compose up test
   ```

The README encourages unit testing of the PySpark code as an extra credit activity, which would validate that each transformation correctly produces the expected output.

## Key Learning Outcomes

- **Advanced PySpark Functions**: Mastery of built-in transformation functions
- **Data Enrichment**: Adding derived columns to existing datasets
- **Window Functions**: Using ranking and analytical functions
- **String Manipulation**: Complex string processing with PySpark
- **Hash Functions**: Creating unique identifiers for data records

## Technical Skills Developed

- **Function Composition**: Combining multiple PySpark functions
- **Data Transformation**: Complex data manipulation workflows
- **Performance Optimization**: Efficient PySpark operations
- **Error Handling**: Managing transformation failures
- **Testing**: Validating transformation logic

## Best Practices

### PySpark Function Best Practices

- **Use built-in functions**: Leverage PySpark's optimized functions over UDFs
- **Chain operations efficiently**: Minimize DataFrame shuffles
- **Handle null values**: Use appropriate null handling functions
- **Optimize string operations**: Use efficient string manipulation functions
- **Test transformations**: Validate each transformation step

### Performance Considerations

- **Minimize shuffles**: Reduce data movement between partitions
- **Use appropriate data types**: Choose efficient column types
- **Cache intermediate results**: Persist frequently used DataFrames
- **Monitor execution plans**: Understand query optimization

## Related Exercises

- **[[Exercise 6: PySpark Aggregation]]**: Basic PySpark operations
- **[[Exercise 8: DuckDB Analytics]]**: SQL-based analytics
- **[[Exercise 9: Polars Lazy Computation]]**: Memory-efficient processing

## Conclusion

Exercise 7 provides practical experience with advanced PySpark functions by requiring the implementation of common data transformation patterns. By working through the required transformations, users will gain familiarity with PySpark's functional programming model and its built-in transformation capabilities, preparing them for real-world data engineering tasks.