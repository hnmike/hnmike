---
title: Advanced Exercises
tags:
- advanced
- data-quality
- validation
- production-ready
- great-expectations
permalink: 20-30-para/project/data-engineer-practices/advanced-exercises
---

# Advanced Exercises

## Overview

The advanced exercises in the Data Engineering Practice repository focus on industry-standard tools and practices that are critical for production data pipelines. These exercises build upon the foundations established in the [[Beginner Exercises]] and [[Intermediate Exercises]], testing higher-level skills including data quality implementation, pipeline validation, and error detection in complex data systems.

Currently, the Advanced Exercises section contains [[Exercise 10: Data Quality with Great Expectations]], which focuses on data quality implementation using Great Expectations. Future exercises may include additional advanced topics such as orchestration, monitoring, and advanced data processing techniques.

## Advanced Exercises Overview

Advanced exercises are designed to challenge experienced data engineers and those who have completed the beginner and intermediate exercises. They represent real-world scenarios that data engineers encounter in production environments, where data reliability and integrity are paramount.

### Skill Progression Map

**Beginner Skills**: File Handling, Pandas, AWS, SQL, Data Modeling
**Intermediate Skills**: PySpark, DuckDB, Polars, Data Transformation  
**Advanced Skills**: Data Quality, Validation, Error Detection

## Exercise 10: Data Quality with Great Expectations

**Purpose**: Implement data quality checks using the Great Expectations library within an existing data pipeline to detect and document data quality issues.

### Key Components

- Working with CSV datasets
- Understanding an existing data pipeline
- Identifying data quality problems
- Implementing Great Expectations checks
- Generating validation reports

### System Architecture

The exercise builds upon a PySpark-based data pipeline that processes bike trip data. The task is to add data quality checks using Great Expectations to detect anomalies in trip durations.

**System Flow**:
1. CSV Input (202306-divvy-tripdata.csv)
2. PySpark Pipeline (main.py)
3. Great Expectations Data Quality Checks
4. Parquet Output (results/output_file.parquet)
5. Validation Results (Pass/Fail)

### Environment Setup

The exercise runs in a Docker-based environment with Apache Spark, providing a consistent execution context:

**Docker Environment**:
- Ubuntu 24.04 + Java + Python + Spark 3.5.0
- test service and run service
- Volume mounting for local directory access

### Data Description

The exercise uses a dataset of bike trips from the Divvy bike-sharing system in Chicago. The data includes:

**Data Schema**:
- ride_id: Unique identifier for each ride
- rideable_type: Type of bike (e.g., electric_bike)
- started_at, ended_at: Timestamps for ride start and end
- Location data (latitude/longitude coordinates)
- member_casual: User type (member or casual rider)

### Existing Pipeline

The existing pipeline performs these operations:
1. Read CSV with Schema using `spark.read.csv()`
2. Convert to Timestamps using `to_timestamp()`
3. Calculate Duration: `unix_timestamp(ended_at) - unix_timestamp(started_at)`
4. Extract Date using `date_format()`
5. Group By Date & Sum Durations using `groupBy().agg()`
6. Write to Parquet using `write.parquet()`

### Data Quality Issues

The dataset contains problematic records with erroneous trip durations. Specifically, some records have end dates far in the future (in the year 2099), resulting in unrealistically long trip durations.

**Example Problematic Records**:
- Line 88: End date is 76 years in the future
- Line 139: End date is 76 years in the future

### Great Expectations Overview

Great Expectations is a data validation framework that helps identify data quality issues by comparing actual data against defined expectations.

**Great Expectations Workflow**:
1. Data Source (Bike Trip Dataset)
2. Great Expectations Suite (Data Quality Rules)
3. Validation Process (Compare Data to Expectations)
4. Validation Results (Pass/Fail with Details)

### Implementation Requirements

The task is to implement Great Expectations checks in the existing pipeline to identify and flag erroneous trip durations. The key requirement is to detect trips that do not start and end on the same day, particularly those with extremely long durations caused by end dates in the far future.

**Implementation Steps**:
1. Initialize Great Expectations
2. Create Expectations for Trip Duration
3. Validate Data Against Expectations
4. Handle Validation Results
5. Integrate with PySpark Pipeline

### Key Integration Points

The data quality checks should be integrated between the data processing and aggregation steps:

**Integration Flow**:
1. Read CSV and Process
2. Validate with Great Expectations
3. Aggregate by Date
4. Report Quality Issues
5. Write to Parquet

### Expected Implementation Pattern

The main expectation should verify that bike trips start and end on the same day, or at least within a reasonable timeframe (e.g., less than 24 hours).

## Required Skills and Concepts

To successfully complete the advanced exercise, engineers should be familiar with:

| Skill Area | Specific Knowledge |
|------------|-------------------|
| Data Quality | Understanding common data quality dimensions (completeness, accuracy, consistency, etc.) |
| Python | Implementing quality checks programmatically |
| Great Expectations | Creating expectation suites, validation, and interpreting results |
| Data Analysis | Identifying potential quality issues in datasets |
| Documentation | Documenting quality checks and findings |

## Exercise Goals and Learning Objectives

Exercise 10 aims to develop the following key skills and knowledge:

- **Implementing data quality frameworks** in data pipelines
- **Understanding how to create robust validation checks**
- **Documenting data quality expectations**
- **Analyzing validation results** to identify issues
- **Integrating quality checks** into existing processes

## Relationship to Other Exercises

Exercise 10 builds upon skills developed in earlier exercises, particularly those involving data transformation and processing:

**Exercise Relationship to Exercise 10**:
- [[Exercise 2: Web Scraping and Pandas]] → Data Collection Skills
- [[Exercise 4: JSON to CSV Conversion]] → File Processing Skills  
- [[Exercise 9: Polars Lazy Computation]] → Advanced Processing Skills
- [[Exercise 10: Data Quality with Great Expectations]] → Data Quality Skills

## Practical Application

The skills gained from Exercise 10 directly translate to real-world data engineering challenges:

- **Data Pipeline Reliability**: Implementing quality checks ensures that data pipelines produce reliable outputs
- **Error Detection**: Automatically identifying issues before they impact downstream systems
- **Documentation**: Creating self-documenting data quality expectations
- **Compliance**: Supporting data governance and regulatory requirements through formal quality assurance

## Technology Stack

### Core Technologies
- **Apache Spark**: Distributed data processing framework
- **Great Expectations**: Data validation and quality framework
- **Python**: Programming language for implementation
- **Docker**: Containerization for consistent environments

### Data Formats
- **CSV**: Input data format
- **Parquet**: Output data format for optimized storage

### Validation Framework
- **Great Expectations**: Primary validation tool
- **Expectation Suites**: Collections of data quality rules
- **Validation Results**: Structured output of quality checks

## Best Practices

When implementing data quality checks:

1. **Start Simple**: Begin with basic expectations and add complexity
2. **Document Expectations**: Clearly document what each expectation validates
3. **Handle Failures Gracefully**: Implement proper error handling for validation failures
4. **Monitor Performance**: Ensure quality checks don't significantly impact pipeline performance
5. **Iterate and Improve**: Continuously refine expectations based on validation results

## Testing and Validation

The exercise includes comprehensive testing:

- **Unit Tests**: Validate individual quality check functions
- **Integration Tests**: Test quality checks within the pipeline
- **Validation Reports**: Generate detailed reports of quality issues
- **Error Handling**: Test scenarios with various data quality problems

## Conclusion

The Advanced Exercises section represents the culmination of the skills developed throughout the Data Engineering Practice repository. Exercise 10 specifically addresses the critical area of data quality, which is essential for production data engineering work. By implementing Great Expectations in a practical scenario, engineers can develop the skills needed to ensure data reliability in complex systems.

As the repository evolves, additional advanced exercises may be added to cover other high-level data engineering concepts and tools such as:

- **Data Orchestration**: Workflow management and scheduling
- **Monitoring and Alerting**: Pipeline monitoring and failure detection
- **Advanced Analytics**: Complex analytical processing techniques
- **Data Governance**: Compliance and regulatory requirements



**Related Exercises**: [[Intermediate Exercises]] - Foundation for advanced processing concepts

