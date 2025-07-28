---
title: Intermediate Exercises
tags:
- intermediate
- distributed-processing
- analytics
- memory-efficiency
- advanced-frameworks
permalink: 20-30-para/project/data-engineer-practices/intermediate-exercises
---

# Intermediate Exercises

## Overview

The intermediate exercises in the Data Engineering Practice repository build upon the foundational skills established in the [[Beginner Exercises]] and introduce more advanced data processing frameworks, analytical engines, and memory optimization techniques that are essential for professional data engineering work.

The intermediate section consists of exercises 6 through 9, covering PySpark, DuckDB, and Polars - technologies commonly used for processing larger datasets and performing complex transformations.

## Exercises Overview

The intermediate exercises represent a progression in technical complexity and introduce distributed and memory-efficient processing paradigms:

| Exercise | Focus Technology | Primary Skills |
|----------|------------------|----------------|
| [[Exercise 6: PySpark Aggregation]] | PySpark | Basic data ingestion and aggregation |
| [[Exercise 7: Advanced PySpark Functions]] | PySpark | Advanced transformation functions |
| [[Exercise 8: DuckDB Analytics]] | DuckDB | SQL analytics and transformations |
| [[Exercise 9: Polars Lazy Computation]] | Polars | Lazy computation for memory efficiency |

These exercises maintain the consistent [[Docker-based Workflow]] established in the beginner exercises while introducing more specialized data processing tools.

## Skill Progression and Dependencies

The intermediate exercises build upon the beginner exercises and lead into advanced topics:

### Skill Areas Progression

1. **SQL & Data Modeling** (from [[Exercise 5: PostgreSQL Data Modeling]])
2. **Distributed Processing** ([[Exercise 6: PySpark Aggregation]])
3. **Advanced Transformations** ([[Exercise 7: Advanced PySpark Functions]])
4. **Analytical SQL** ([[Exercise 8: DuckDB Analytics]])
5. **Memory-Efficient Processing** ([[Exercise 9: Polars Lazy Computation]])
6. **Data Quality** ([[Exercise 10: Data Quality with Great Expectations]])

## Common Architecture Pattern

All intermediate exercises follow the same [[Docker-based Workflow]] pattern established in the beginner exercises:

### Standard Workflow
1. Navigate to exercise directory
2. Build Docker image: `docker build --tag=exercise-X .`
3. Run solution: `docker-compose up run`
4. Run tests: `docker-compose up test`

## Exercise Details

### Exercise 6: PySpark Aggregation

**Purpose**: Introduce Apache Spark's Python API (PySpark) for distributed data processing, focusing on basic data ingestion and aggregation operations.

**Key Skills**:
- PySpark environment setup and SparkSession initialization
- Data ingestion from files into PySpark DataFrames
- Basic aggregation operations (count, sum, avg, min, max)
- GroupBy operations and distributed computing concepts
- Understanding lazy evaluation nature of PySpark

**Technical Components**:
- **SparkSession**: Entry point for PySpark functionality
- **DataFrame API**: Structured data processing
- **Aggregation Functions**: count(), sum(), avg(), min(), max(), agg()
- **GroupBy Operations**: Essential for data summarization

**Data Flow**:
1. Read CSV with `spark.read.csv()`
2. Transform data with DataFrame operations
3. Group data with `groupBy()`
4. Apply aggregations with `agg()`
5. Analyze results

**Related Exercises**: [[Exercise 5: PostgreSQL Data Modeling]], [[Exercise 7: Advanced PySpark Functions]]

### Exercise 7: Advanced PySpark Functions

**Purpose**: Build on PySpark foundation with complex data transformations using built-in PySpark functions from pyspark.sql.functions module.

**Key Skills**:
- Using PySpark's built-in functions for complex transformations
- Function composition and chaining transformations
- Working with SQL functions and expression APIs
- Memory-efficient file handling and streaming
- Multi-step data processing workflows

**Required Transformations**:
1. **Source File Column**: Add file name using `input_file_name()`
2. **File Date Extraction**: Extract date from filename using string manipulation
3. **Brand Derivation**: Create brand column from model using conditional logic
4. **Storage Ranking**: Create ranking system using window functions
5. **Primary Key Generation**: Create unique identifiers using hash functions

**Key PySpark Functions**:
- `input_file_name()`: Gets input file name
- `regexp_extract()`: Extracts patterns from strings
- `to_date()`: Converts strings to dates
- `split()`: Splits strings by delimiter
- `when()`, `otherwise()`: Conditional expressions
- `dense_rank()`, `rank()`: Window ranking functions
- `sha2()`, `md5()`: Hashing functions

**Related Exercises**: [[Exercise 6: PySpark Aggregation]], [[Exercise 8: DuckDB Analytics]]

### Exercise 8: DuckDB Analytics

**Purpose**: Use DuckDB for analytics and data transformations, demonstrating SQL-based analytical processing on moderate-sized datasets.

**Key Skills**:
- Working with SQL in modern analytical database systems
- Creating appropriate data models with correct data types
- Performing common analytical operations on real-world data
- Using partitioned Parquet files for optimized data storage
- Understanding in-process analytical database concepts

**Implementation Requirements**:
1. **Table Creation**: Design schema with appropriate data types
2. **Data Loading**: Efficiently load CSV data into DuckDB
3. **Analytical Queries**: Perform various analytical operations
4. **Partitioned Output**: Write results to partitioned Parquet files

**Required Analytical Queries**:
- Count cars by city
- Find top 3 most popular vehicles
- Identify most popular vehicle by postal code
- Count electric cars by model year

**DuckDB Key Features**:
- In-memory processing for fast analytical queries
- SQL interface with familiar syntax
- Native CSV and Parquet support
- Data type inference capabilities
- Partitioned output support

**Related Exercises**: [[Exercise 7: Advanced PySpark Functions]], [[Exercise 9: Polars Lazy Computation]]

### Exercise 9: Polars Lazy Computation

**Purpose**: Use Polars' lazy computation functionality to efficiently process datasets that may be larger than available memory through query optimization.

**Key Skills**:
- Understanding lazy evaluation and deferred execution
- Query optimization through Polars' query engine
- Memory efficiency through predicate pushdown
- Working with LazyFrames and query planning
- Temporal data analysis and aggregations

**Lazy Computation Concept**:
- **Traditional (Eager)**: Read CSV → Convert Types → Filter Data → Aggregate Data → Final Result
- **Lazy (Polars)**: Create LazyDataFrame → Define Query Pipeline → Optimize Query Plan → Execute Only Necessary Steps → Final Result

**Implementation Workflow**:
1. Read CSV as LazyFrame with `pl.scan_csv()`
2. Convert data types with `with_columns()`
3. Parse timestamps and extract date components
4. Group by day and week for aggregations
5. Compare with previous week using joins and expressions
6. Collect results with `collect()`

**Key Polars Functions**:
- `pl.scan_csv()`: Lazily read CSV files
- `with_columns()`: Add or modify columns
- `select()`: Choose columns for output
- `filter()`: Filter rows based on conditions
- `group_by()`: Group data for aggregation
- `agg()`: Perform aggregations
- `collect()`: Execute lazy query and return DataFrame

**Related Exercises**: [[Exercise 8: DuckDB Analytics]], [[Exercise 10: Data Quality with Great Expectations]]

## Technology Comparison Across Intermediate Exercises

The intermediate exercises showcase different modern data processing frameworks, each with distinct advantages:

### Processing Frameworks Comparison

| Feature | PySpark (Ex 6-7) | DuckDB (Ex 8) | Polars (Ex 9) |
|---------|------------------|----------------|----------------|
| Processing Model | Distributed | In-process analytical DB | Single-node parallel |
| Memory Handling | Distributed across nodes | In-memory with spill-to-disk | Efficient memory usage |
| Query Optimization | Catalyst optimizer | SQL optimizer | Query plan optimization |
| Best For | Large-scale data processing | OLAP-style analytics | Memory-constrained environments |
| API Style | DataFrame API | SQL | DataFrame API with SQL context |

### Execution Models
- **Eager Execution**: PySpark, DuckDB
- **Lazy Execution**: Polars

## Key Learning Objectives

- **Distributed Processing**: Understanding PySpark's distributed computing model
- **Advanced Transformations**: Complex data manipulation using built-in functions
- **SQL Analytics**: Analytical processing using modern SQL engines
- **Memory Efficiency**: Optimizing memory usage for large datasets
- **Query Optimization**: Understanding how different engines optimize queries
- **Framework Selection**: Choosing appropriate tools for different scenarios

## Performance Considerations

### PySpark Performance
- Proper data partitioning affects groupBy performance
- Select only necessary columns before grouping
- Cache intermediate results when reusing DataFrames
- Understand execution plans to identify bottlenecks

### DuckDB Performance
- In-memory processing for fast analytical queries
- Efficient data type selection for better performance
- Proper indexing for frequently queried columns
- Memory management for large datasets

### Polars Performance
- Lazy evaluation reduces memory usage
- Query optimization through predicate pushdown
- Column pruning for efficient data loading
- Parallel execution for improved performance

## Common Challenges

### PySpark Challenges
- Understanding lazy evaluation nature
- Handling data skew during groupBy operations
- Managing memory effectively during large aggregations
- Interpreting and optimizing physical execution plans

### DuckDB Challenges
- Choosing appropriate data types for schema design
- Managing memory for large datasets
- Optimizing SQL queries for analytical workloads
- Understanding in-process vs. distributed processing trade-offs

### Polars Challenges
- Understanding lazy vs. eager execution differences
- Optimizing query plans for complex operations
- Managing memory for very large datasets
- Debugging lazy evaluation issues

## Conclusion

The intermediate exercises provide hands-on experience with modern data processing frameworks that are essential for professional data engineering work. By completing these exercises, you'll gain practical skills in distributed processing, analytical SQL, and memory-efficient data manipulation.

**Next Steps**: [[Advanced Exercises]] - Data quality and validation practices