---
title: Exercise 2: Web Scraping and Pandas
tags: [web-scraping, pandas, data-analysis, http-requests, url-construction]
---

# Exercise 2: Web Scraping and Pandas

## Overview

Exercise 2 focuses on web scraping, URL construction, file downloading, and data analysis using Pandas. This exercise builds upon the file downloading skills introduced in [[Exercise 1: Downloading Files]] but adds the complexity of web scraping to determine which file to download based on specific criteria.

## Exercise Architecture

Exercise 2 simulates a common data engineering task: retrieving specific climate data files based on metadata available only through web scraping. The exercise requires analyzing an HTML page to identify a file with a specific modification timestamp, constructing the correct download URL, retrieving the file, and performing basic data analysis using Pandas to find temperature extremes.

### Data Flow Process

1. **Web Scraping**: Find file with timestamp 2024-01-19 10:27
2. **URL Construction**: Build download URL for target file
3. **File Download**: Retrieve climate data file
4. **Pandas Analysis**: Find highest HourlyDryBulbTemperature
5. **Results Output**: Print target records to console

## Environment Setup

The exercise provides a Docker-based environment to ensure consistency and eliminate dependency issues.

### Setup Process

1. **Clone Repository**: Navigate to Exercise-2 Directory
2. **Build Docker Image**: `docker build --tag=exercise-2 .`
3. **Run Code**: `docker-compose up run`
4. **Test Solution**: `docker-compose up test`

The Docker environment includes:
- Python with required libraries
- A volume mount connecting the local directory to the container
- Commands for running the solution and tests

## Required Dependencies

The exercise depends on two main Python libraries:

| Library | Version | Purpose |
|---------|---------|---------|
| requests | 2.27.1 | Making HTTP requests for web scraping and file downloading |
| pandas | 2.2.3 | Data analysis and manipulation |

## Problem Statement

The exercise requires completing the following tasks:

1. **Scrape the webpage** at https://www.ncei.noaa.gov/data/local-climatological-data/access/2021/
2. **Parse the HTML** to find the file that was last modified on 2024-01-19 10:27
3. **Construct a URL** to download this specific file
4. **Download the file** to the local filesystem
5. **Use Pandas** to load the file and analyze it to find the record(s) with the highest HourlyDryBulbTemperature
6. **Print these records** to the console

## Technical Components

### Data Acquisition Flow

1. **HTTP GET requests.get()**: Make request to NCEI website
2. **Parse HTML**: Find timestamp in HTML content
3. **Build URL**: Construct complete download URL
4. **HTTP GET requests.get()**: Download target file
5. **pandas.read_csv()**: Load file into DataFrame
6. **Filter by HourlyDryBulbTemperature**: Find maximum values
7. **print()**: Output target records

### Web Scraping Component

The web scraping component requires:

- **Making an HTTP request** to the NCEI website
- **Parsing the returned HTML** to identify file listings
- **Finding the specific file** with the target timestamp (2024-01-19 10:27)
- **Extracting the filename** for subsequent download

Potential approaches include using:
- Regular expressions to parse the HTML
- HTML parsing libraries (though not explicitly included in requirements)
- String manipulation to extract relevant information

### File Download Component

Once the target filename is identified, the download component must:

- **Construct the complete URL** by combining the base URL with the target filename
- **Download the file** using the requests library
- **Save the file** to the local filesystem

### Data Analysis Component

The data analysis component uses Pandas to:

- **Read the downloaded file** into a DataFrame
- **Identify rows** with the maximum value in the HourlyDryBulbTemperature column
- **Extract these rows** for output

## Implementation Structure

The provided template in main.py follows a simple structure:

```python
import requests
import pandas

def main():
    # Implementation goes here
    pass

if __name__ == "__main__":
    main()
```

The solution should be implemented within the main() function, following the workflow outlined above.

## Running and Testing

To execute the solution:

```bash
docker-compose up run
```

This command runs the main.py script within the Docker container, connecting to the NCEI website, downloading the appropriate file, and analyzing it with Pandas.

## Relation to Data Engineering Skills

This exercise develops several key data engineering skills:

- **Web Scraping**: Extracting structured information from websites, a common technique for acquiring data from sources without formal APIs
- **URL Construction**: Dynamically building URLs based on extracted information
- **HTTP Requests**: Making network requests to download data
- **Data Analysis with Pandas**: Using the pandas library to manipulate and analyze structured data
- **Programmatic Problem Solving**: Breaking down a multi-step data problem into discrete components

These skills represent common tasks in data pipelines, especially those that need to acquire data from web sources that may lack formal APIs or automated download mechanisms.

## Exercise Position in Learning Progression

Exercise 2 builds upon the file downloading concepts from [[Exercise 1: Downloading Files]] but introduces web scraping and basic data analysis with Pandas. These skills provide a foundation for subsequent exercises that incorporate cloud services, file transformations, and database operations.

### Skill Progression

**Builds on**: File handling skills from [[Exercise 1: Downloading Files]]
**Leads to**: [[Exercise 3: AWS S3 and Boto3]], [[Exercise 4: JSON to CSV Conversion]], [[Exercise 5: PostgreSQL Data Modeling]]

## Key Learning Outcomes

- **Web Scraping Techniques**: Understanding how to extract data from HTML pages
- **Dynamic URL Construction**: Building URLs programmatically based on scraped data
- **Data Analysis with Pandas**: Using pandas for data manipulation and analysis
- **Multi-step Data Processing**: Combining multiple operations in a single pipeline
- **Error Handling**: Managing potential failures in web scraping and file downloads

## Technical Skills Developed

- **HTML parsing**: Extracting information from web pages
- **URL manipulation**: Constructing download URLs dynamically
- **HTTP request handling**: Making requests to web servers
- **Pandas DataFrame operations**: Loading and analyzing CSV data
- **Data filtering and aggregation**: Finding maximum values in datasets

## Best Practices

- **Robust error handling**: Handle network failures and parsing errors
- **Data validation**: Verify scraped data before processing
- **Efficient parsing**: Use appropriate methods for HTML parsing
- **Memory management**: Consider file size when loading data into pandas
- **Logging**: Provide feedback on scraping and download progress