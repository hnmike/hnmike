---
title: Exercise 8: DuckDB Analytics
tags: [duckdb, sql-analytics, data-transformation, analytical-database, parquet]
---

# Exercise 8: DuckDB Analytics

## Overview

Exercise 8 focuses on using DuckDB for analytics and data transformations. DuckDB is an in-process SQL OLAP database management system designed for analytical query workloads. The exercise demonstrates how to load CSV data, create proper data models, perform various analytical operations, and output partitioned Parquet files.

## Exercise Workflow

The following diagram illustrates the workflow of Exercise 8:

1. **data/electric-cars.csv**: Input data file
2. **create_duckdb_table()**: Initialize database schema
3. **load_data()**: Import CSV data into DuckDB
4. **perform_analytics()**: Execute analytical queries
   - count_cars_by_city()
   - find_top_vehicles()
   - popular_by_postal()
   - count_by_year()
5. **write_parquet_output()**: Export results to partitioned Parquet files

## Data Description

The exercise uses an electric vehicles dataset from Washington state, provided as electric-cars.csv in the data directory. The data includes:

- **VIN (Vehicle Identification Number)**
- **Location information** (County, City, State, Postal Code)
- **Vehicle details** (Model Year, Make, Model, Electric Vehicle Type)
- **Technical specifications** (Electric Range, Base MSRP)
- **Other metadata** (Legislative District, DOL Vehicle ID, Vehicle Location, etc.)

### Sample Data Format

```
VIN (1-10),County,City,State,Postal Code,Model Year,Make,Model,Electric Vehicle Type,Clean Alternative Fuel Vehicle (CAFV) Eligibility,Electric Range,Base MSRP,Legislative District,DOL Vehicle ID,Vehicle Location,Electric Utility,2020 Census Tract
5YJ3E1EB4L,Yakima,Yakima,WA,98908,2020,TESLA,MODEL 3,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,322,0,14,127175366,POINT (-120.56916 46.58514),PACIFICORP,53077000904
```

## DuckDB Operations Flow

The diagram below shows the key DuckDB operations required for this exercise:

1. **data/electric-cars.csv**: Input CSV file
2. **duckdb.connect(':memory:')**: Create in-memory database connection
3. **CREATE TABLE electric_cars (...)**: Define table schema
4. **COPY electric_cars FROM 'data/electric-cars.csv'**: Load data from CSV
5. **Analytics SQL Queries**: Perform analytical operations
   - COUNT(*) GROUP BY City
   - Top 3 Vehicles by Count
   - Popular Vehicle by Postal Code
   - COUNT(*) GROUP BY Model Year
6. **COPY TO (PARTITION_BY year)**: Export to partitioned Parquet files

## Implementation Requirements

### 1. Table Creation and Schema Design

The first task involves creating a DuckDB table with appropriate data types:

- **Inspect the CSV data** to determine appropriate column types
- **Create a schema** with proper data types (avoiding generic STRING types for everything)
- **Use DDL (Data Definition Language)** statements to create the table

This requires understanding the data and making appropriate decisions about which data types will best represent each field (integers, floats, strings, dates, etc.).

### 2. Data Loading

After creating the table, you need to load the data from the CSV file:

- **Use DuckDB's COPY statement** or similar functionality to efficiently load the CSV data
- **Handle any necessary data type conversions**
- **Address any potential data quality issues** (like nulls or malformed records)

### 3. Analytical Queries

The exercise requires performing several analytical queries:

| Query Type | Description |
|------------|-------------|
| Count by City | Calculate the number of electric cars in each city |
| Popular Vehicles | Identify the top 3 most popular electric vehicle models overall |
| Popularity by Postal Code | Find the most popular electric vehicle model in each postal code |
| Count by Model Year | Count electric cars by model year |

These queries will require various SQL operations including GROUP BY, ORDER BY, LIMIT, and potentially window functions.

### 4. Partitioned Parquet Output

The final task involves writing the results from the year-based analysis to partitioned Parquet files:

- **Use DuckDB's capability** to write Parquet files
- **Implement partitioning by year** (directory structure organization)
- **Ensure proper column encoding** in the Parquet format

This demonstrates DuckDB's integration with columnar file formats commonly used in data engineering.

## Code Organization

The implementation should follow a structured approach with modular functions:

### Function Structure

- **main()**: Entry point and orchestration
- **DuckDBOperations**: Encapsulated database operations
  - create_duckdb_table()
  - load_data()
  - count_cars_by_city()
  - find_top_vehicles()
  - popular_by_postal()
  - count_by_year()
  - write_parquet_output()

All DuckDB operations should be encapsulated in functions or methods rather than using inline code, making the solution more maintainable and testable.

## Docker Environment

The exercise provides a Docker environment to ensure consistent execution:

- **Build the Docker image**: `docker build --tag=exercise-8 .`
- **Run the code**: `docker-compose up run`
- **Run tests** (if implemented): `docker-compose up test`

The Docker setup includes:
- Ubuntu 18.04 base image
- Python 3.8
- Required dependencies (DuckDB package)
- Volume mounting for local directory access

## DuckDB Key Features Relevant to This Exercise

DuckDB offers several features that are particularly useful for this exercise:

- **In-memory processing**: Fast analytical queries without requiring a server setup
- **SQL interface**: Familiar SQL syntax for data operations
- **CSV and Parquet support**: Native handling of common data engineering file formats
- **Data type inference**: Can help with schema creation
- **Partitioned output**: Supports data partitioning for organizational and performance benefits

## Testing

The exercise suggests adding unit tests for the DuckDB code as an extra credit task:

- **Test table creation** and schema correctness
- **Verify data loading** process
- **Validate analytical query** results
- **Check Parquet file generation** and partitioning

## Best Practices

When implementing this exercise, consider these best practices:

- **Data inspection**: Examine the CSV data carefully to determine appropriate types
- **Error handling**: Include proper error handling for file operations and SQL queries
- **Query optimization**: Structure queries efficiently for best performance
- **Memory management**: Be aware of the dataset size relative to available memory
- **Code documentation**: Document functions and SQL queries for clarity

## Key Learning Outcomes

Exercise 8 provides hands-on experience with DuckDB, an emerging tool in the data engineering ecosystem. By completing this exercise, you'll gain practical skills in:

- **Working with SQL** in a modern, analytical database system
- **Creating appropriate data models** with correct data types
- **Performing common analytical operations** on real-world data
- **Using partitioned Parquet files** for optimized data storage

These skills are directly applicable to real-world data engineering tasks where efficient analysis of moderate-sized datasets is required.

## Related Exercises

- **[[Exercise 7: Advanced PySpark Functions]]**: PySpark-based data processing
- **[[Exercise 9: Polars Lazy Computation]]**: Memory-efficient processing

## Technical Skills Developed

- **Analytical SQL**: Complex queries and aggregations
- **Data Modeling**: Schema design for analytical workloads
- **Parquet Integration**: Working with columnar file formats
- **Performance Optimization**: Efficient analytical processing
- **Data Partitioning**: Organizing data for optimal access patterns

## Best Practices

- **Choose appropriate data types**: Optimize for analytical queries
- **Use efficient SQL patterns**: Leverage DuckDB's query optimizer
- **Handle large datasets**: Consider memory usage and partitioning
- **Validate data quality**: Check for data integrity issues
- **Document analytical logic**: Maintain clear query documentation