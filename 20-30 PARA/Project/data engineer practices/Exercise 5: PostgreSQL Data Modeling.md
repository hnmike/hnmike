---
title: Exercise 5: PostgreSQL Data Modeling
tags: [postgresql, data-modeling, database-design, etl, psycopg2]
---

# Exercise 5: PostgreSQL Data Modeling

## Overview

Exercise 5 focuses on data modeling for PostgreSQL and using Python to create database tables and load data. This exercise bridges file-based data processing with relational database concepts, introducing SQL schema design principles and programmatic database interaction.

The exercise requires analyzing CSV files, designing an appropriate data model with proper relationships, and implementing this model in PostgreSQL using Python's psycopg2 library. This builds upon skills from previous exercises while introducing database modeling concepts.

## System Architecture

This exercise implements a typical ETL pattern (Extract, Transform, Load) where CSV data is loaded into a properly designed PostgreSQL database through Python.

### Architecture Components

- **PostgreSQL Database**: Target database for data storage
- **Python Application**: ETL processing logic
- **Data Sources**: CSV files (accounts.csv, products.csv, transactions.csv)
- **main.py**: Entry point for solution code
- **psycopg2 Library**: Database connection and operations
- **Database Tables**: Proper data types, primary keys, foreign keys, indexes

## Docker Environment

The exercise runs within a containerized environment managed by Docker Compose, which includes:

- **A PostgreSQL 10.5 database service** with persistent storage
- **A test service** for running automated tests
- **A run service** that executes the Python application

### Docker Compose Environment

- **postgres:10.5 Service**: Port 5432, User: postgres, Password: postgres
- **run Service**: Executes main.py, mounts local directory
- **test Service**: Runs pytest, mounts local directory
- **Persistent Volume**: ./postgres-data for data persistence

## Data Model

The exercise involves three CSV files that need to be modeled as related database tables.

### Data Files Overview

| File | Description | Key Fields |
|------|-------------|------------|
| accounts.csv | Customer account information | customer_id, personal details, address information |
| products.csv | Product catalog | product_id, product_code, product_description |
| transactions.csv | Sales transactions | transaction_id, links to products and accounts |

### Entity-Relationship Diagram

**ACCOUNTS Table**:
- customer_id (int, PK)
- first_name (string)
- last_name (string)
- address_1 (string)
- address_2 (string)
- city (string)
- state (string)
- zip_code (string)
- join_date (date)

**PRODUCTS Table**:
- product_id (int, PK)
- product_code (string)
- product_description (string)

**TRANSACTIONS Table**:
- transaction_id (string, PK)
- transaction_date (date)
- product_id (int, FK)
- product_code (string)
- product_description (string)
- quantity (int)
- account_id (int, FK)

**Relationships**:
- ACCOUNTS has many TRANSACTIONS
- PRODUCTS appears in many TRANSACTIONS

## Implementation Guide

The implementation requires connecting to PostgreSQL using psycopg2, creating the appropriate schema, and loading data from CSV files.

### Python Database Connection

The starter code already provides the base connection to PostgreSQL:

```python
# Connection established
# Ready for SQL operations
# Connect(host=postgres, database=postgres, user=postgres, password=postgres)
# Establish connection
# Create cursor
```

### Database Schema Design Considerations

When designing the schema, the following aspects must be considered:

- **Appropriate data types**: Choose PostgreSQL types that match the data (VARCHAR, INTEGER, DATE, etc.)
- **Primary keys**: Define unique identifiers for each table
- **Foreign keys**: Establish relationships between tables
- **Indexes**: Create indexes for frequently queried columns

### Data Loading Process

The required steps for loading data include:

1. **Reading CSV files**
2. **Creating prepared statements** for data insertion
3. **Executing SQL statements** to insert data
4. **Handling transaction management** (commits/rollbacks)

### Complete Data Processing Pipeline

1. **Start**: Connect to PostgreSQL
2. **Create database schema**
3. **Open CSV files**
4. **Parse CSV data**
5. **Prepare SQL insert statements**
6. **Execute inserts with cursor**
7. **Commit transaction**
8. **Close connection**
9. **End**

## Example Schema Design

Below is a sample of how the table creation statements might be structured:

```sql
-- Accounts table
CREATE TABLE accounts (
    customer_id INTEGER PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    address_1 VARCHAR(200),
    address_2 VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    join_date DATE
);

-- Products table
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    product_code VARCHAR(10),
    product_description VARCHAR(200)
);

-- Transactions table
CREATE TABLE transactions (
    transaction_id VARCHAR(100) PRIMARY KEY,
    transaction_date DATE,
    product_id INTEGER REFERENCES products(product_id),
    product_code VARCHAR(10),
    product_description VARCHAR(200),
    quantity INTEGER,
    account_id INTEGER REFERENCES accounts(customer_id)
);

-- Indexes
CREATE INDEX idx_transactions_product ON transactions(product_id);
CREATE INDEX idx_transactions_account ON transactions(account_id);
```

## Best Practices

When working with this exercise, consider these best practices:

- **Schema validation**: Verify the schema matches the actual data before bulk loading
- **Transaction management**: Use transactions to ensure data integrity
- **Error handling**: Implement proper exception handling for database operations
- **Parameterized queries**: Use parameterized queries to prevent SQL injection
- **Index planning**: Create indexes based on anticipated query patterns

## Common Challenges

The exercise may present several common challenges:

- **Data type mismatches**: Ensuring CSV data types align with PostgreSQL column types
- **Referential integrity**: Managing foreign key relationships during data loading
- **Duplicate handling**: Deciding how to handle duplicate records
- **Performance optimization**: Efficient bulk loading of data

## Key Learning Outcomes

This exercise integrates file processing skills with database modeling concepts, providing practical experience with:

- **Designing normalized database schemas**
- **Creating appropriate constraints and indexes**
- **Connecting to databases programmatically**
- **Loading data from files to relational databases**

This serves as a foundation for more advanced data processing exercises that follow, such as PySpark and DuckDB, covered in [[Intermediate Exercises]].

## Related Exercises

- **[[Exercise 4: JSON to CSV Conversion]]**: File format processing
- **[[Exercise 6: PySpark Aggregation]]**: Distributed data processing
- **[[Exercise 8: DuckDB Analytics]]**: SQL-based analytics

## Technical Skills Developed

- **Database Design**: Creating normalized relational schemas
- **SQL Operations**: Writing DDL and DML statements
- **ETL Processes**: Extract, Transform, Load workflows
- **Data Modeling**: Understanding entity relationships
- **Database Connectivity**: Using Python with PostgreSQL

## Best Practices

- **Normalize data appropriately**: Balance normalization with query performance
- **Use appropriate data types**: Choose PostgreSQL types that match your data
- **Create meaningful indexes**: Index columns used in WHERE clauses and JOINs
- **Handle transactions properly**: Use commits and rollbacks for data integrity
- **Validate data before loading**: Check data quality and types