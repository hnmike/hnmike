---
title: Exercise 1: Downloading Files
tags: [file-downloads, http-requests, python, zip-processing, data-acquisition]
---


> [!summary] Tóm tắt
> Exercise 1 focuses on establishing fundamental data acquisition skills essential for data engineering pipelines. The core task involves implementing Python code to automate the download of multiple ZIP files from HTTP sources, manage potential errors, extract their contents, and store the processed data locally.
> 
> The exercise outlines a detailed process: iterating through a list of download URIs (e.g., Divvy trip data), using the `requests` library for HTTP GET requests, validating HTTP response status codes, efficiently streaming and saving downloaded ZIP files to disk, and then utilizing the `zipfile` module to extract and organize the compressed data. Key technical components required include `requests` for HTTP client functionality, built-in file I/O operations, `zipfile` for archive handling, and `try/except` blocks for comprehensive error management.
> 
> A significant challenge highlighted is gracefully handling invalid URLs within the provided list and optimizing memory usage for large files via streaming downloads (`requests.get(uri, stream=True)`). The exercise emphasizes robust error handling, logical data organization, and ensuring the extracted files are correctly verified. Successful completion demonstrates proficiency in automating network data acquisition, processing compressed file formats, managing system errors, and structuring acquired data for subsequent use in more complex data pipelines.
> 
> **Related Topics for Further Exploration:**
> 
> 1.  **Advanced Web Scraping and Parsing**: Extending beyond simple file downloads to extract data from HTML content using libraries like Beautiful Soup or Scrapy.
> 2.  **Cloud Storage Integration**: Learning to interact with cloud object storage services (e.g., AWS S3, Google Cloud Storage) for scalable data acquisition and storage.
> 3.  **Data Transformation with Pandas**: Integrating the downloaded raw data with Python's Pandas library for cleaning, manipulating, and preparing it for analysis or loading into databases.
> 4.  **ETL Pipeline Orchestration**: Exploring tools like Apache Airflow or Prefect to schedule, monitor, and manage complex data extraction, transformation, and loading (ETL) workflows.
> 5.  **Data Quality and Validation**: Implementing checks and assertions to ensure the integrity, completeness, and accuracy of data post-download and extraction.
# Exercise 1: Downloading Files

## Overview

Exercise 1 focuses on implementing file downloads from HTTP sources using Python, handling errors, extracting ZIP file contents, and storing data locally. This represents a fundamental data acquisition skill for data engineering pipelines.

De thuc hien bai 1 ta can biet [[http ]]
## System Overview

The exercise tests your ability to write Python code that can download multiple ZIP files from an HTTP source, process them, and store their contents locally. This functionality serves as a foundation for more complex data pipelines covered in later exercises.

### Data Flow Process

1. **HTTP Request Loop**: Process download_uris list
2. **requests.get() Operation**: Make HTTP requests to download files
3. **HTTP Response Check**: Verify response status (200 OK vs Error Codes)
4. **Write ZIP to Disk**: Save downloaded content to filesystem
5. **zipfile.ZipFile Extraction**: Extract compressed file contents
6. **Store Extracted Files**: Organize extracted files logically
7. **Cleanup Operations**: Handle temporary files and errors

## Implementation Requirements

### Data Sources

The exercise provides a list of download URIs in the main.py file pointing to Divvy trip data ZIP files stored in an Amazon S3 bucket:

**Download URIs List**:
- Divvy_Trips_2018_Q4.zip
- Divvy_Trips_2019_Q1.zip
- Divvy_Trips_2019_Q2.zip
- Divvy_Trips_2019_Q3.zip
- Divvy_Trips_2019_Q4.zip
- Divvy_Trips_2020_Q1.zip
- Divvy_Trips_2220_Q1.zip (Invalid URL)

### Technical Components

Your implementation must utilize several key Python libraries and techniques:

| Component | Description | Python Module |
|-----------|-------------|---------------|
| HTTP Client | Fetches remote files via HTTP requests | requests |
| Response Handling | Processes HTTP responses and status codes | requests |
| File I/O | Writes downloaded content to the filesystem | built-in open() |
| ZIP Processing | Extracts compressed file contents | zipfile |
| Error Management | Handles exceptions during download and extraction | try/except |
| Path Operations | Manages file paths and directories | os.path or pathlib |

## Implementation Steps

Your task is to implement the main() function that:

1. **Iterates through URIs**: Process each URI in the download_uris list
2. **Downloads Files**: Use the requests library to download each ZIP file
3. **Handles Errors**: Implement error handling for HTTP errors (invalid URLs, server errors)
4. **Saves Content**: Write successfully downloaded content to disk
5. **Extracts Files**: Use the zipfile module to extract the contents
6. **Organizes Data**: Store extracted files in a logical directory structure

## Technical Patterns

### HTTP Download Pattern

When implementing the download functionality, consider using a streaming approach for memory efficiency:

1. **requests.get(uri, stream=True)**: Stream response content
2. **Response Status Check**: Verify 200 OK vs 404/500/etc.
3. **Stream Response Content**: Handle HTTP errors gracefully
4. **Write Chunks to File System**: Log errors and continue to next URI

### ZIP Extraction Pattern

For handling the ZIP files after download:

1. **zipfile.ZipFile(path)**: Open ZIP file
2. **Extract All Contents**: Process extracted files
3. **Organize by Date/Quarter**: Verify file integrity

## Testing Your Implementation

To test your solution:

1. Build the Docker container using the instructions in the exercise README
2. Run the container to execute your implemented main.py
3. Verify that:
   - All accessible files are downloaded successfully
   - The invalid URL (containing 2220 instead of 2020) is handled appropriately
   - ZIP files are extracted correctly
   - Extracted files are organized logically

## Common Challenges and Considerations

- **Invalid URLs**: The download_uris list contains at least one invalid URL that must be handled gracefully
- **Memory Management**: Consider using streaming downloads (stream=True) for large files
- **Error Handling Strategy**: Decide when to fail completely versus continuing after an error
- **Cross-platform Compatibility**: Ensure path handling works across different operating systems
- **Progress Reporting**: Consider implementing progress indicators for long downloads

## Related Exercises

This exercise serves as the foundation for more complex data acquisition tasks in later exercises:

- **[[Exercise 2: Web Scraping and Pandas]]**: Web scraping tasks
- **[[Exercise 3: AWS S3 and Boto3]]**: AWS S3 data acquisition
- **[[Exercise 4: JSON to CSV Conversion]]**: File format processing

## Key Learning Outcomes

- **HTTP Request Handling**: Understanding how to make and process HTTP requests
- **File Download Automation**: Automating the download of multiple files
- **Error Handling**: Implementing robust error handling for network operations
- **File Processing**: Working with compressed file formats
- **Data Organization**: Structuring downloaded data logically

## Technical Skills Developed

- **Python requests library**: Making HTTP requests and handling responses
- **File system operations**: Writing files and managing directories
- **ZIP file processing**: Extracting compressed archives
- **Exception handling**: Managing errors in network and file operations
- **Streaming downloads**: Memory-efficient file downloading

## Best Practices

- **Use streaming downloads**: Implement `stream=True` for memory efficiency
- **Implement proper error handling**: Catch and handle HTTP errors gracefully
- **Validate file integrity**: Check downloaded files before processing
- **Organize output logically**: Create meaningful directory structures
- **Log operations**: Provide feedback on download progress and errors