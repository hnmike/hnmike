---
title: Exercise 3: AWS S3 and Boto3
tags: [aws-s3, boto3, cloud-storage, streaming, multi-step-processing]
---

# Exercise 3: AWS S3 and Boto3

## Overview

Exercise 3 focuses on using Python's boto3 package to interact with AWS S3 cloud storage. This exercise builds upon the file downloading skills from previous exercises while introducing cloud-based data retrieval and multi-step data processing. The exercise specifically teaches how to access public S3 buckets, work with compressed files, and implement efficient file streaming techniques.

## Problem Statement

This exercise requires accessing the Common Crawl dataset available on AWS S3, a public repository of web crawl data. The task involves two sequential data retrieval operations:

1. **Download a compressed file** from the Common Crawl S3 bucket
2. **Extract this file** and read it to find a URI pointing to another file
3. **Download the second file** using the URI from the first file
4. **Process and print** the contents of the second file

The exercise requires no special AWS credentials as it uses publicly accessible data.

### Exercise 3 Data Flow Process

1. **START**: Download .gz file from S3 Bucket: commoncrawl, Key: crawl-data/CC-MAIN-2022-05/wet.paths.gz
2. **Extract .gz file** in memory
3. **Read first line** of extracted file (contains URI to second file)
4. **Download second file** from S3 using extracted URI
5. **Stream and print contents** of second file line by line
6. **END**

## Technical Requirements

### Required Libraries

The exercise requires boto3, which is the AWS SDK for Python. This library allows Python applications to interact with various AWS services, including S3. The specific version used in this exercise is boto3 version 1.21.2.

### Extra Credit Challenges

The exercise includes two additional performance-focused challenges:

1. **Implement streaming** for the final file to avoid loading it entirely into memory
2. **Process the initial .gz file** in memory without saving it to disk

These challenges test understanding of memory-efficient file handling, which is crucial for working with large datasets in production environments.

## Implementation Approach

### S3 Access Pattern

The implementation requires using boto3's S3 client to:

- **Connect to the S3 service**
- **Perform GET operations** to retrieve objects from buckets
- **Handle streaming responses** from S3

For this exercise, the implementation needs to follow these key steps:

1. **Create an S3 client** using boto3
2. **Download the gzipped file** from the specified location
3. **Extract the gzipped content** in memory
4. **Parse the first line** to get the URI for the second file
5. **Download the second file** using the extracted URI
6. **Stream and process** the second file line by line

### Sequence of API Calls for S3 Interaction

1. **Create S3 client**: `boto3.client('s3')`
2. **Request object**: `get_object(Bucket="commoncrawl", Key="crawl-data/CC-MAIN-2022-05/wet.paths.gz")`
3. **Return StreamingBody**: Handle response with Body
4. **Pass StreamingBody to GzipFile**: Return decompressed content
5. **Extract first line (URI)**: Parse for second file location
6. **Second get_object() call**: Download second file
7. **Read and print lines**: Stream content line by line

### Key boto3 Methods

To successfully complete this exercise, the implementation will need to use these boto3 methods:

- **boto3.client('s3')**: Creates an S3 client
- **s3_client.get_object()**: Retrieves an object from S3
- **The response's ['Body'] attribute**: Contains a StreamingBody object that can be read

For memory efficiency (extra credit):
- **Use the streaming response** from S3 directly, without downloading to disk
- **Process the StreamingBody** using appropriate file-like interfaces

## Docker Environment

The exercise is packaged with a Docker environment to ensure consistent execution regardless of the local setup. This is in line with the repository's approach to standardize environments across all exercises.

### Docker Setup

The Docker environment includes:

- **Base Python image**
- **boto3 package installation**
- **Volume mounting** for code access
- **Services** for running the main code and tests

### Component Overview

| Component | Purpose |
|-----------|---------|
| Dockerfile | Defines the Python environment with boto3 installed |
| docker-compose.yml | Configures services for running and testing the code |
| main.py | Entry point where the solution code should be written |
| requirements.txt | Specifies the boto3 dependency |

### Running the Exercise

To work on this exercise:

1. **Navigate to the Exercise-3 directory**
2. **Build the Docker image**: `docker build --tag=exercise-3 .`
3. **Implement your solution** in main.py
4. **Run your code**: `docker-compose up run`

## Best Practices for Implementation

### Memory-Efficient File Handling

When working with potentially large files from S3, memory efficiency is crucial:

- **Stream direct from S3**: Use the StreamingBody object returned by get_object() without storing the entire file in memory
- **Process incrementally**: Read and process files line by line rather than loading everything at once
- **Use context managers**: Ensure proper resource cleanup with context managers (with statements)

### Error Handling

Robust S3 operations should include error handling for:

- **Network connectivity issues**
- **S3 service unavailability**
- **Permission errors** (though not applicable in this example with public data)
- **Malformed or unexpected file content**

### Type Management for Stream Processing

The exercise requires attention to different types of stream-like objects:

- **StreamingBody** from boto3 responses
- **GzipFile** for decompression
- **Text streams** for line-by-line processing

### Memory Efficient Implementation Pattern

1. **boto3.client('s3')**: Create S3 client
2. **get_object()**: Request first file
3. **response['Body'] (StreamingBody)**: Handle streaming response
4. **gzip.GzipFile(fileobj=response['Body'])**: Decompress in memory
5. **Read first line**: Parse URI
6. **Second get_object() call**: Download second file
7. **for line in response['Body']...**: Stream content line by line

## Key Learning Outcomes

Exercise 3 builds upon previous file downloading exercises by introducing cloud storage integration with boto3 and AWS S3. The multi-step nature of retrieving and processing files mimics real-world data engineering workflows where data often needs to be accessed from cloud storage and processed efficiently.

Completing this exercise successfully demonstrates understanding of:

- **Basic AWS S3 operations** using boto3
- **Memory-efficient file handling**
- **Multi-step data retrieval processes**
- **Working with compressed files**

These skills are fundamental for data engineers who frequently need to access and process data from cloud storage systems.

## Related Exercises

- **[[Exercise 1: Downloading Files]]**: Basic file downloading concepts
- **[[Exercise 2: Web Scraping and Pandas]]**: Data acquisition from web sources
- **[[Exercise 4: JSON to CSV Conversion]]**: File format processing

## Technical Skills Developed

- **AWS S3 Integration**: Understanding cloud storage operations
- **Streaming Data Processing**: Efficient handling of large files
- **Multi-step Data Pipelines**: Sequential data processing operations
- **Compressed File Handling**: Working with gzipped files
- **Error Handling**: Managing cloud service interactions

## Best Practices

- **Use streaming operations**: Avoid loading entire files into memory
- **Implement proper error handling**: Handle network and service failures
- **Process data incrementally**: Work with data in chunks when possible
- **Validate data integrity**: Check file contents before processing
- **Monitor resource usage**: Be aware of memory and network consumption