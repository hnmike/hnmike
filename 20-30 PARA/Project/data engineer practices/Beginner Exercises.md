---
title: Beginner Exercises
tags:
- beginner
- fundamentals
- python
- data-acquisition
- file-processing
permalink: 20-30-para/project/data-engineer-practices/beginner-exercises
---

# Beginner Exercises

## Overview

The beginner exercises in the Data Engineering Practice repository provide a comprehensive foundation for essential data engineering skills. These five foundational exercises are designed to build essential data engineering skills through hands-on practice with common tools and techniques. Each exercise progressively introduces new concepts while reinforcing previously learned skills.

## Exercises Overview

The beginner exercises follow a logical progression of increasing complexity, introducing new technologies while building on previously learned skills:

### Skills Progression

| Exercise | Primary Skills | Tools/Technologies | Input Data | Output Data |
|----------|---------------|-------------------|------------|-------------|
| [[Exercise 1: Downloading Files]] | File downloads | Python, HTTP, zip | Remote files | Local files |
| [[Exercise 2: Web Scraping and Pandas]] | Web scraping | Python, requests, BeautifulSoup, Pandas | Web pages, HTML | Processed data |
| [[Exercise 3: AWS S3 and Boto3]] | Cloud storage | Python, boto3, AWS S3 | S3 buckets | Local files |
| [[Exercise 4: JSON to CSV Conversion]] | Format conversion | Python, JSON, CSV | JSON files | CSV files |
| [[Exercise 5: PostgreSQL Data Modeling]] | Data modeling | Python, PostgreSQL, SQL | CSV files | Database tables |

## Working Environment

All beginner exercises use Docker to provide consistent, isolated environments with all required dependencies. This approach ensures reproducibility and eliminates environment setup issues.

### Standard Exercise Workflow

1. Navigate to exercise directory (`cd Exercises/Exercise-X`)
2. Read README instructions
3. Build Docker image (`docker build -t exercise-X .`)
4. Run solution (`docker-compose up run`)
5. Run tests (`docker-compose up test`)

## Exercise Details

### Exercise 1: Downloading Files

**Purpose**: Download multiple files from HTTP sources, unzip them, and store them locally using Python.

**Skills Tested**:
- Making HTTP requests
- File download automation
- Working with zip archives
- Basic Python file handling

**Implementation Pattern**:
1. Process download_uris list
2. HTTP request loop with requests.get()
3. HTTP response check and error handling
4. Write ZIP to disk
5. Extract files using zipfile.ZipFile
6. Store extracted files and cleanup

**Related Exercises**: [[Exercise 2: Web Scraping and Pandas]], [[Exercise 3: AWS S3 and Boto3]]

### Exercise 2: Web Scraping and Pandas

**Purpose**: Scrape web pages to find specific files, download them, and perform data analysis using Pandas.

**Skills Tested**:
- Web page scraping
- Dynamic URL construction
- Downloading files from web sources
- Data manipulation with Pandas
- Cumulative calculations

**Implementation Pattern**:
1. Web scraping to extract data from HTML
2. URI building to construct download URLs
3. File downloads to retrieve data files
4. Pandas processing to load and transform data
5. Cumulative analysis to calculate aggregated metrics

**Related Exercises**: [[Exercise 1: Downloading Files]], [[Exercise 4: JSON to CSV Conversion]]

### Exercise 3: AWS S3 and Boto3

**Purpose**: Access public S3 buckets, work with compressed files, and implement efficient file streaming techniques.

**Skills Tested**:
- AWS S3 interactions
- Using Boto3 Python library
- Multi-step cloud operations
- Working with public datasets

**Implementation Pattern**:
1. Create S3 client using boto3
2. Download gzipped file from specified location
3. Extract gzipped content in memory
4. Parse first line to get URI for second file
5. Download second file using extracted URI
6. Stream and process second file line by line

**Related Exercises**: [[Exercise 1: Downloading Files]], [[Exercise 4: JSON to CSV Conversion]]

### Exercise 4: JSON to CSV Conversion

**Purpose**: Traverse complex directory structures, locate JSON files, and convert them to CSV format.

**Skills Tested**:
- Working with JSON data
- Converting between file formats
- Recursive directory traversal
- Handling irregular directory structures

**Implementation Pattern**:
1. Directory traversal to find all JSON files
2. JSON file processing to parse JSON structure
3. Convert to CSV format
4. Save CSV files

**Related Exercises**: [[Exercise 2: Web Scraping and Pandas]], [[Exercise 5: PostgreSQL Data Modeling]]

### Exercise 5: PostgreSQL Data Modeling

**Purpose**: Design database schemas, create data models, and load data into PostgreSQL using Python.

**Skills Tested**:
- Database schema design
- Data model creation
- Index optimization
- Python-PostgreSQL connection
- Table creation and data insertion

**Implementation Pattern**:
1. Connect to PostgreSQL using psycopg2
2. Create database schema with appropriate data types
3. Open CSV files and parse data
4. Prepare SQL insert statements
5. Execute inserts with cursor
6. Commit transaction and close connection

**Related Exercises**: [[Exercise 4: JSON to CSV Conversion]], [[Exercise 6: PySpark Aggregation]]

## Exercise Dependencies and Technologies

The beginner exercises introduce a variety of technologies and tools that form the foundation for more advanced data engineering work:

### Core Technologies
- **Python**: Primary programming language for all exercises
- **Docker**: Containerization for consistent environments
- **HTTP**: Network communication for data acquisition
- **HTML/Web**: Web scraping and data extraction
- **AWS S3**: Cloud storage integration
- **JSON**: Semi-structured data format
- **CSV**: Structured data format

### Libraries & Tools
- **Requests**: HTTP client library
- **BeautifulSoup**: HTML parsing
- **Pandas**: Data manipulation and analysis
- **Boto3**: AWS SDK for Python
- **PostgreSQL**: Relational database system

### Data Sources
- HTTP APIs and web services
- Web pages and HTML content
- Cloud storage (AWS S3)
- Local file systems
- Structured and semi-structured data files

## Completion Path

Each beginner exercise builds essential skills that prepare you for the intermediate exercises. Once you've completed these five foundational exercises, you'll have developed a solid understanding of key data engineering concepts and be ready to tackle more complex challenges with distributed processing frameworks like PySpark, analytical engines like DuckDB, and memory-efficient tools like Polars.

**Next Steps**: [[Intermediate Exercises]] - Advanced data processing frameworks and techniques

## Key Learning Outcomes

- **Data Acquisition**: Understanding various methods of obtaining data from different sources
- **File Processing**: Working with different file formats and conversion techniques
- **Data Storage**: Database design and relational data modeling
- **Cloud Integration**: Working with cloud storage and services
- **Data Analysis**: Basic data manipulation and analysis techniques
- **Error Handling**: Robust error handling and exception management
- **Environment Management**: Using Docker for reproducible development environments