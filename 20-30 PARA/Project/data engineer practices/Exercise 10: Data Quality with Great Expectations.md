---
title: Exercise 10: Data Quality with Great Expectations
tags: [great-expectations, data-quality, data-validation, production-pipelines, data-testing]
---

# Exercise 10: Data Quality with Great Expectations

## Overview

Exercise 10 focuses on implementing data quality checks using Great Expectations for an existing PySpark data pipeline. This exercise represents the highest level of complexity in the repository and introduces production-ready data quality practices. Great Expectations is a Python library that helps data teams eliminate pipeline debt by testing data quality and documentation.

## Exercise Workflow

The exercise follows a comprehensive data quality workflow:

1. **Existing PySpark Pipeline**: Build upon previous PySpark exercises
2. **Great Expectations Setup**: Initialize GE environment and context
3. **Data Source Configuration**: Configure data sources for validation
4. **Expectation Suite Creation**: Define data quality expectations
5. **Data Validation**: Execute validation against datasets
6. **Validation Results**: Analyze and report on data quality
7. **Integration**: Embed validation into existing data pipeline

## Great Expectations Architecture

### Core Components

**Great Expectations Context**:
- **Data Context**: Central configuration and metadata management
- **Data Sources**: Connections to data stores (files, databases)
- **Expectation Suites**: Collections of data quality expectations
- **Validation Actions**: Automated responses to validation failures
- **Data Docs**: Generated documentation of data quality

**Validation Workflow**:
1. **Data Source**: CSV files, databases, or data pipelines
2. **Expectation Suite**: Predefined data quality rules
3. **Validator**: Executes expectations against data
4. **Validation Results**: Pass/fail status and detailed metrics
5. **Data Docs**: HTML reports of validation results

## Implementation Requirements

### 1. Great Expectations Setup

The first step involves setting up the Great Expectations environment:

```python
import great_expectations as ge
from great_expectations.core.batch import RuntimeBatchRequest

# Initialize Great Expectations context
context = ge.get_context()

# Configure data sources
datasource_config = {
    "name": "my_datasource",
    "class_name": "Datasource",
    "execution_engine": {"class_name": "SparkDFExecutionEngine"},
    "data_connectors": {
        "default_runtime_data_connector_name": {
            "class_name": "RuntimeDataConnector",
            "batch_identifiers": ["default_identifier_name"],
        }
    }
}
```

### 2. Data Source Configuration

Configure data sources for validation:

- **File-based sources**: CSV, Parquet, JSON files
- **Database connections**: PostgreSQL, MySQL, etc.
- **Pipeline integration**: Validate data at pipeline stages
- **Batch processing**: Process data in manageable chunks

### 3. Expectation Suite Creation

Create comprehensive expectation suites covering various data quality aspects:

#### Data Completeness Expectations
```python
# Check for null values
expectation_suite.add_expectation(
    ge.core.ExpectationConfiguration(
        expectation_type="expect_column_values_to_not_be_null",
        kwargs={"column": "user_id"}
    )
)

# Check for unique values
expectation_suite.add_expectation(
    ge.core.ExpectationConfiguration(
        expectation_type="expect_column_values_to_be_unique",
        kwargs={"column": "primary_key"}
    )
)
```

#### Data Type Expectations
```python
# Validate data types
expectation_suite.add_expectation(
    ge.core.ExpectationConfiguration(
        expectation_type="expect_column_values_to_be_in_type_list",
        kwargs={"column": "amount", "type_list": ["FLOAT", "INTEGER"]}
    )
)
```

#### Value Range Expectations
```python
# Check value ranges
expectation_suite.add_expectation(
    ge.core.ExpectationConfiguration(
        expectation_type="expect_column_values_to_be_between",
        kwargs={"column": "age", "min_value": 0, "max_value": 120}
    )
)
```

#### Statistical Expectations
```python
# Validate statistical properties
expectation_suite.add_expectation(
    ge.core.ExpectationConfiguration(
        expectation_type="expect_column_mean_to_be_between",
        kwargs={"column": "salary", "min_value": 30000, "max_value": 200000}
    )
)
```

### 4. Validation Execution

Execute validations against datasets:

```python
# Create batch request
batch_request = RuntimeBatchRequest(
    datasource_name="my_datasource",
    data_connector_name="default_runtime_data_connector_name",
    data_asset_name="my_data_asset",
    runtime_parameters={"batch_data": spark_df},
    batch_identifiers={"default_identifier_name": "default_identifier"}
)

# Run validation
results = context.run_validation_operator(
    "action_list_operator",
    assets_to_validate=[batch_request],
    expectation_suite_name="my_expectation_suite"
)
```

### 5. Integration with PySpark Pipeline

Integrate validation into existing PySpark workflows:

```python
def validate_data_quality(spark_df, expectation_suite_name):
    """Validate data quality using Great Expectations"""
    
    # Configure batch request
    batch_request = RuntimeBatchRequest(
        datasource_name="spark_datasource",
        data_connector_name="default_runtime_data_connector_name",
        data_asset_name="pipeline_data",
        runtime_parameters={"batch_data": spark_df},
        batch_identifiers={"default_identifier_name": "pipeline_batch"}
    )
    
    # Execute validation
    results = context.run_validation_operator(
        "action_list_operator",
        assets_to_validate=[batch_request],
        expectation_suite_name=expectation_suite_name
    )
    
    # Handle validation results
    if results.success:
        print("Data quality validation passed")
        return True
    else:
        print("Data quality validation failed")
        # Log failures and potentially halt pipeline
        return False
```

## Docker Environment

The exercise provides a Docker environment for consistent execution:

- **Build the Docker image**: `docker build --tag=exercise-10 .`
- **Run the code**: `docker-compose up run`
- **Run tests** (if implemented): `docker-compose up test`

The Docker setup includes:
- Ubuntu 18.04 base image
- Python 3.8
- Apache Spark
- Great Expectations library
- Required dependencies for data quality validation

## Data Quality Categories

### 1. Completeness Validation

- **Null value checks**: Ensure required fields are not null
- **Missing data detection**: Identify patterns in missing data
- **Data coverage**: Verify all expected records are present

### 2. Accuracy Validation

- **Data type validation**: Ensure correct data types
- **Value range checks**: Validate data falls within expected ranges
- **Format validation**: Check data format compliance
- **Business rule validation**: Enforce domain-specific rules

### 3. Consistency Validation

- **Cross-field validation**: Check relationships between fields
- **Referential integrity**: Validate foreign key relationships
- **Data consistency**: Ensure consistent data across sources

### 4. Timeliness Validation

- **Freshness checks**: Ensure data is up-to-date
- **Processing time validation**: Monitor pipeline performance
- **SLA compliance**: Verify data delivery within time constraints

## Advanced Features

### Custom Expectations

Create domain-specific expectations:

```python
# Custom expectation for business logic
def expect_user_age_to_be_reasonable(validator, column):
    """Custom expectation for user age validation"""
    return validator.expect_column_values_to_be_between(
        column=column,
        min_value=13,
        max_value=120,
        parse_strings_as_datetimes=False
    )
```

### Automated Actions

Configure automated responses to validation failures:

```python
# Action list configuration
action_list = [
    {
        "name": "store_validation_result",
        "action": {"class_name": "StoreValidationResultAction"}
    },
    {
        "name": "store_evaluation_params",
        "action": {"class_name": "StoreEvaluationParametersAction"}
    },
    {
        "name": "update_data_docs",
        "action": {"class_name": "UpdateDataDocsAction"}
    }
]
```

## Testing and Validation

### Unit Testing

Create comprehensive tests for data quality checks:

```python
def test_data_quality_validation():
    """Test data quality validation functionality"""
    
    # Create test data
    test_data = create_test_dataframe()
    
    # Run validation
    results = validate_data_quality(test_data, "test_expectation_suite")
    
    # Assert expected outcomes
    assert results.success == True
    assert len(results.run_results) > 0
```

### Integration Testing

Test validation integration with data pipelines:

```python
def test_pipeline_integration():
    """Test validation integration with PySpark pipeline"""
    
    # Simulate pipeline data
    pipeline_data = simulate_pipeline_output()
    
    # Validate pipeline output
    validation_result = validate_pipeline_data(pipeline_data)
    
    # Verify validation integration
    assert validation_result is not None
```

## Best Practices

### Data Quality Best Practices

- **Start simple**: Begin with basic expectations and expand
- **Document expectations**: Maintain clear documentation of data quality rules
- **Monitor trends**: Track validation results over time
- **Automate responses**: Configure automated actions for failures
- **Regular reviews**: Periodically review and update expectations

### Great Expectations Best Practices

- **Organize expectations**: Group related expectations in suites
- **Use descriptive names**: Name expectations clearly for documentation
- **Leverage built-in expectations**: Use GE's extensive library of expectations
- **Custom expectations**: Create domain-specific expectations when needed
- **Performance optimization**: Optimize validation for large datasets

## Key Learning Outcomes

Exercise 10 provides comprehensive experience with production-ready data quality practices:

- **Data Quality Framework**: Understanding Great Expectations architecture
- **Expectation Development**: Creating comprehensive data quality rules
- **Pipeline Integration**: Embedding validation into data pipelines
- **Automated Validation**: Implementing automated quality checks
- **Quality Monitoring**: Establishing ongoing quality monitoring processes

## Technical Skills Developed

- **Data Quality Engineering**: Implementing comprehensive quality frameworks
- **Great Expectations**: Mastering GE's validation capabilities
- **Pipeline Integration**: Embedding validation into data workflows
- **Quality Monitoring**: Establishing automated quality monitoring
- **Production Practices**: Implementing production-ready data quality

## Related Exercises

- **[[Exercise 7: Advanced PySpark Functions]]**: PySpark data processing
- **[[Exercise 9: Polars Lazy Computation]]**: Efficient data processing

## Conclusion

Exercise 10 represents the pinnacle of the data engineering practice repository, focusing on production-ready data quality practices. By implementing comprehensive data quality validation using Great Expectations, users gain practical experience with industry-standard data quality frameworks that are essential for maintaining reliable data pipelines in production environments.