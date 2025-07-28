---
title: Docker-based Workflow
tags:
- docker
- workflow
- environment
- containerization
- development
permalink: 20-30-para/project/data-engineer-practices/docker-based-workflow
---

# Docker-based Workflow

## Overview

The Data Engineering Practice repository uses a standardized Docker-based workflow across all exercises to provide reproducible environments and eliminate "works on my machine" issues. This approach allows learners to focus on data engineering concepts rather than environment setup.

## Standard Container Configuration

### Common Docker Compose Structure

Each exercise follows a similar docker-compose pattern with at minimum two services:

- **run**: Executes the main application code
- **test**: Runs the test suite using pytest

More complex exercises may include additional services like databases.

### Basic Docker Compose Configuration

The simplest Docker Compose configuration used in most exercises:

```yaml
version: "3.9"
services:
  test:
    image: "exercise-X"
    volumes:
      - .:/app
    command: python3 -m pytest
  run:
    image: "exercise-X"
    volumes:
      - .:/app
    command: python3 main.py
```

## Docker Configuration Variations

### Database-Enabled Configuration

Exercises that require a database (like [[Exercise 5: PostgreSQL Data Modeling]]) include additional services and dependency configurations:

| Service | Purpose | Key Configurations |
|---------|---------|-------------------|
| postgres | Database service | Environment variables for credentials, Port mapping (5432:5432), Data volume for persistence, Health checks |
| run | Main application | Depends on postgres service, Waits for database to be healthy |
| test | Test suite | Uses the same Docker image as run |

### Specialized Framework Configuration

Exercises that utilize specialized data processing frameworks (like PySpark in [[Exercise 7: Advanced PySpark Functions]]) have more complex Dockerfiles with additional dependencies:

- Base Image: ubuntu:18.04
- System Dependencies: Java, Python, etc.
- Install Apache Spark 3.5.0
- AWS SDK and Hadoop-AWS Dependencies
- Set Working Directory to /app
- Copy Application Code
- Install Python Dependencies
- Configure PySpark Environment

## Volume Mounting

A critical aspect of the Docker-based workflow is how volumes are mounted:

- **Code Volume**: Each service mounts the local directory to /app in the container, allowing changes to be reflected immediately without rebuilding the image
- **Data Volume**: In database exercises, a persistent volume is configured to store database data (e.g., ./postgres-data:/var/lib/postgresql/data in [[Exercise 5: PostgreSQL Data Modeling]])

## Workflow Steps

The typical workflow for each exercise follows these steps:

1. **Build the Docker image**:
   ```bash
   docker build --tag=exercise-X .
   ```

2. **Run the application**:
   ```bash
   docker-compose up run
   ```

3. **Run the tests**:
   ```bash
   docker-compose up test
   ```

## Benefits of the Standardized Docker Workflow

| Benefit | Description |
|---------|-------------|
| Reproducibility | Ensures consistent behavior across different environments |
| Isolation | Each exercise runs in its own contained environment |
| Dependency Management | All required libraries and tools are packaged within the container |
| Incremental Learning | Same workflow pattern across all exercises reduces cognitive load |
| Real-world Practice | Docker is widely used in actual data engineering workflows |
| Testing Integration | Built-in test service encourages test-driven development |

## Container Architecture Comparison

Different exercise types utilize different containerization strategies while maintaining the same basic workflow:

### Big Data Exercise (e.g., [[Exercise 7: Advanced PySpark Functions]])
- PySpark-enabled Docker image
- run service with Spark environment
- test service with Spark environment

### Database Exercise (e.g., [[Exercise 5: PostgreSQL Data Modeling]])
- postgres service
- run service (depends on postgres)
- test service

### Basic Exercise (e.g., [[Exercise 4: JSON to CSV Conversion]], [[Exercise 9: Polars Lazy Computation]])
- run service
- test service

## Data Persistence Considerations

- **Regular exercises** with simple file-based data store and process data within the mounted /app directory
- **Database exercises** like [[Exercise 5: PostgreSQL Data Modeling]] persist data in a separate volume (postgres-data) that is excluded from git tracking

## Integration with Exercise Progression

The Docker workflow supports the progressive skill development across exercises:

- **Beginner Exercises**: Simple Python environments with basic dependencies
- **Intermediate Exercises**: Specialized frameworks like PySpark, DuckDB, Polars
- **Advanced Exercises**: Complex environments with multiple services and dependencies

## Best Practices

When working with the Docker-based workflow:

1. **Environment Consistency**: Always use the provided Docker configurations
2. **Volume Management**: Understand how local code is mounted and synchronized
3. **Service Dependencies**: Be aware of service dependencies in complex exercises
4. **Resource Management**: Monitor container resource usage for memory-intensive operations
5. **Testing Integration**: Utilize the built-in test services for validation

## Related Exercises

- [[Exercise 1: Downloading Files]] - Basic Docker setup with Python environment
- [[Exercise 5: PostgreSQL Data Modeling]] - Database-enabled Docker configuration
- [[Exercise 7: Advanced PySpark Functions]] - Specialized framework configuration
- [[Exercise 10: Data Quality with Great Expectations]] - Advanced multi-service setup