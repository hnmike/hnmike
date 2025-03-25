---
title: "End-to-End Data Engineering Project using AWS + Apache Iceberg + Snowflake"
summary: "Build an automated weather data pipeline using WeatherAPI, AWS, Apache Iceberg, & Snowflake. Ingest, process, store & analyze data for BI & reporting."
source: "https://medium.com/@claudiofilho22/end-to-end-data-engineering-project-using-aws-apache-iceberg-snowflake-90b76e7a1082"
author:
  - "Claudiocmm"
published: 2025-03-14
created: 2025-03-20
description: "This article demonstrates building an automated weather data pipeline using WeatherAPI, AWS services, and Snowflake. You’ll see how this system collects and processes both real-time and forecast data…"
tags:
  - "aws_data_pipeline"
  - "apache_iceberg"
  - "snowflake_integration"
type :
---
>[!summary]+ This article describes an end-to-end data engineering project using AWS services, Apache Iceberg, and Snowflake to build an automated weather data pipeline. It covers data ingestion from WeatherAPI, processing with AWS Glue, storage in S3 with Apache Iceberg, orchestration with Airflow, and analysis in Snowflake, including infrastructure setup with Terraform and data visualization with Tableau.
![](https://miro.medium.com/v2/resize:fit:875/1*F0T-aMeF01XugCOor2qkAg.png)

## **Introduction**

This article demonstrates building an automated weather data pipeline using **WeatherAPI**, **AWS** services, and **Snowflake**. You’ll see how this system collects and processes both real-time and forecast data from global locations through a scalable, production-ready architecture.

This project is part of my GitHub portfolio showcasing various data engineering architectures to help both experienced and new data software engineers with practical examples. The complete code is available in the repository linked below.

[

## data\_engineering\_projects/AWS/pipeline-weather-data at main · claudiocmm/data\_engineering\_projects

### A collection of Data Engineering projects using different cloud providers. Explore real-world implementations of data…

github.com

](https://github.com/claudiocmm/data_engineering_projects/tree/main/AWS/pipeline-weather-data?source=post_page-----90b76e7a1082---------------------------------------)

I’ve designed this modular pipeline to handle data efficiently while maintaining the scalability needed for production environments.

## Project Overview

The project sources real-time and forecasted weather data from [**WeatherAPI**](https://www.weatherapi.com/). This data is extracted, processed, and stored using a modular pipeline designed for scalability and reliability in AWS. Key components include:

- **Amazon Lambda**: Fetches weather data from WeatherAPI at scheduled intervals, handling batch requests efficiently.
- **AWS Glue** processes and transforms the collected data into a structured format in [Apache Iceberg](https://iceberg.apache.org/) format for further analysis.
- **Amazon S3 & Athena**: Stores raw and processed data, allowing on-demand querying and exploration.
- **Apache Airflow DAG** defines the workflow, managing dependencies between tasks and ensuring execution in the right order.
- **Snowflake** serves as the final data warehouse, enabling efficient BI analysis and reporting.

![](https://miro.medium.com/v2/resize:fit:875/1*c88svTaMyGQPBHMGHYW-QA.png)

Architecture Diagram

The final result will be data visualization analysis using these four tables in Tableau:

- `**dim_locations**`**:**  
This table contains metadata about locations such as names, time zones, and other geographical attributes.  
**It allows users to separate dimensional location data from the fact tables, supporting better data organization and more efficient querying.**
- `**weather_actual_data_timeseries**` **:**  
This table contains detailed time-series data with granular metrics such as temperature, wind speed, humidity, and precipitation. It is primarily used for training forecasting models or conducting in-depth analyses of specific timeframes.  
**For example, it allows users to examine how weather conditions fluctuated hour-by-hour over a particular day or week.**
- `**weather_actual_data_timeseries_agg**` **:**This table aggregates the actual weather data by **year, month, and hour**, providing a higher-level view of weather patterns. Its purpose is to enable analysis of how weather behaves during the same hour across different months.  
**For instance, it can reveal trends such as solar radiation peaking during daylight hours and dropping at night, helping to identify seasonal or hourly patterns.**
- `**weather_forecast_data_timeseries**` **:**  
This table stores forecasted weather data with detailed time-series metrics. It is designed to support decision-making by providing predictions for upcoming days.  
**For example, businesses or individuals can use this data to plan activities, optimize operations, or take preventive actions based on expected weather conditions.**

In the image below we have the data model diagram of this project:

![](https://miro.medium.com/v2/resize:fit:875/1*UjJ833LF_IWIm0iVjD_yow.png)

Data Model Diagram

## Architecture Decisions: Why These Technologies?

## Apache Iceberg: Scalable Data Lake with ACID Guarantees

[**Apache Iceberg**](https://iceberg.apache.org/) was chosen as the table format for structured storage in Amazon S3 due to its ability to handle large-scale data efficiently while maintaining strong consistency. Unlike traditional Hive tables, Iceberg provides:

- **ACID transactions**, ensuring reliable updates and deletions.
- **Schema evolution**, allowing flexibility as data changes over time.
- **Partition pruning**, improving query performance by reading only relevant data.

This makes Iceberg an excellent choice for storing and processing raw and transformed weather data in a cost-effective, high-performance manner. Following a[**Data Lakehouse**](https://www.databricks.com/glossary/data-lakehouse) architecture.

## Snowflake: A Cloud Data Warehouse for BI and Analytics

Snowflake acts as the final destination for analytics due to its scalability, performance, ease of use and integration with the Glue Data Catalog using Apache Iceberg tables. Key benefits include:

- **Separation of storage and compute**, allowing for cost-efficient query execution.
- **Automatic scaling**, adapting to different workloads without manual tuning.
- **Built-in time travel and data sharing**, enabling historical analysis and seamless collaboration.

With Snowflake, weather data can be efficiently aggregated, analyzed, and visualized for decision-making.

## AWS Glue: Serverless ETL for Transformations

AWS Glue simplifies data processing with its serverless architecture, making it ideal for ETL workflows. It supports:

- **Integration with Apache Iceberg**, allowing seamless schema evolution.
- **Automatic schema inference**, reducing manual effort in defining data structures.
- **Parallel processing**, enabling faster transformations at scale.

Glue processes the ingested weather data, converting it into a structured format suitable for analytics.

## Amazon S3 & Athena: Cost-Effective Data Storage & Querying

Amazon S3 stores both raw and processed data, ensuring durability and low-cost storage. Athena enables SQL-based exploration of this data without requiring infrastructure management.

- **Decoupled storage and compute**, optimizing cost and performance.
- **On-demand querying**, avoiding the need for an always-on database for ad-hoc analysis.
- **Seamless integration with Apache Iceberg**, improving query efficiency.

## Apache Airflow: Orchestrating the Data Pipeline

Airflow coordinates the entire pipeline, ensuring reliable execution of data extraction, transformation, and loading (ETL) tasks. It was chosen because of:

- **Flexible DAG-based workflows**, making it easy to manage dependencies.
- **Extensive AWS integration**, simplifying connections to Lambda, Glue, and S3.
- **Scalability**, allowing for future expansion as data volume grows.

In the following sections, we will dive deeper into the infrastructure and how each of these services is utilized within the pipeline.

## Infrastructure Overview

In this section, we will explore the infrastructure setup for our project. The infrastructure is provisioned using [**Terraform**](https://www.terraform.io/), ensuring a scalable and reproducible deployment. Below, we break down the key components and their configurations.

## 1\. Provider Configuration

The `provider.tf` file defines AWS as our cloud provider, setting the region to `us-east-1`. This file also retrieves the current AWS caller identity to reference account-related information dynamically.

```c
provider "aws" {
  region  = "us-east-1" # Change this to your desired region
}
```

## 2\. IAM Roles and Policies

We define several IAM roles and policies to grant appropriate permissions for AWS Glue, Lambda, CodeBuild, and Snowflake. Below is a breakdown of these configurations:

## AWS Glue Role and Policy

- The `glue_role` is created to run Glue jobs, this service role allows Glue to assume the role. Furthermore, this role has an attached policy that grants access to S3, Glue, CloudWatch and logs.

## Lambda Execution Role and Policy

- The `lambda_role` is created to run Lambda jobs, this service role allows Lambda functions to assume the role. Furthermore, this role has an attached policy that grants permissions to read/write S3, interact with Athena, create logs, and use Glue services.

## CodeBuild Role and Policy

- The `codebuild-deploy-pipeline-weather-data-role` is created to run CodeBuild jobs, this service role allows [**CodeBuild**](https://aws.amazon.com/pt/codebuild/)to assume the role. Furthermore, this role has an attached policy that grants permission to use Lambda, Glue, IAM, and S3 resources. With that, is possible to use it to run the deploy of services (Glue and Lambda) for the project.

## Snowflake IAM Role and Policy

To run queries in snowflake and connect to AWS is necessary to create an IAM role to be assumed by the snowflake external IAM user. With that, this role will be created.

- The `snowflake_service_role` allows Snowflake to assume the role with external IDs for authentication. Furthermore, this role has an attached policy that grants Snowflake access to Glue tables and S3 objects.

## 3\. Variables and Locals

The `variables.tf` file defines various input parameters used throughout the infrastructure, such as:

- `region` (AWS region)
- `account_id` (AWS account ID)
- `lambda_function_name` (Name of the Lambda function)
- `pipeline_name` (Name of the data pipeline)
- Snowflake-specific variables for IAM integration
- Github informations to use CI/CD in CodeBuild

The `locals.tf` file defines computed values based on variables, helping maintain consistency across Terraform resources.

## 4\. S3 Buckets for Data Storage

We provision multiple S3 buckets for storing raw and processed data, scripts, and auxiliary datasets. There is two buckets:

**Main Data Lake Bucket**

- `weather-datalake-projects`stores the raw and transformed data.
- A lifecycle policy automatically cleans up temporary files after one day in `/tmp`.
- Ownership and ACL settings ensure proper access control.

**Scripts Storage Bucket**

- `weather-datalake-projects-scripts` stores Glue and Lambda scripts to use for backup and in CI/CD.
- Ownership and ACL settings ensure restricted access.

## 5\. CodeBuild for CI/CD

The [**AWS CodeBuild**](https://aws.amazon.com/en/codebuild/) is an AWS service which automates the deployment of Lambda functions and Glue scripts, ensuring an efficient CI/CD pipeline connected to the github. In lambda and glue folders you can see the `buildspec.yml` file used to make the build happens.

## 6\. AWS Glue

For AWS Glue, the terraform was created to get the file `dim_locations.json` and create an external table, `dim_locations`, using the Iceberg table format. This table’s data resides in an S3 bucket, with its schema defined to include columns like `country`, `name`, `lat`, `lon`, and `location_id`.

This setup enables us to catalog location data, query it directly from S3 using services like Athena, and benefit from Iceberg’s advanced data management features. Furthermore, this table will be used for the pipeline to get data only for the locations defined in it.

## Running this environment

If you want to run this environment in your cloud. First set all the personal variables in `variables.tf`such as **account\_id**, **github**, and **external\_ids from snowflake** (*later in this article I will show how to get them*). After that, you can use this commands:

```c
## Go to the terraform directory
cd AWS/pipeline-weather-data/terraform
## Init your project
terraform init
#Run plan to check all the changes.
terraform plan
#Apply all the changes when you want.
terraform apply
```

Now that we understand how the infrastructure will be created, we will deep dive into the pipeline itself.

## Data Pipeline in Apache Airflow

## Introduction

First, we will walk through the Airflow pipeline process used to orchestrate an end-to-end ETL workflow in AWS and after that we will dive into each step of this pipeline. This pipeline automates data ingestion, transformation, and storage for weather data using various AWS services, including S3, Glue, Athena, and Lambda.

## Setting Up Apache Airflow with Docker

To get started with Apache Airflow using Docker, follow these simple steps:

**1\. Go to the airflow directory**  
First, go to the airflow directory where all the config files are stored.

```c
cd AWS/pipeline-weather-data/airflow
```

**2\. Set Up the Airflow User ID**  
Generate the `AIRFLOW_UID` value and save it to a `.env` file:

```c
echo -e "AIRFLOW_UID=$(id -u)" > .env
```

**3\. Initialize Airflow**  
Run the initialization command to set up the Airflow database and admin user:

```c
docker-compose up airflow-init
```

**4\. Start Airflow**  
Once initialized, start the Airflow containers in detached mode:

```c
docker-compose up - build -d
```

**5\. Clean Up (Optional)**  
To stop and delete all containers, volumes, and networks, run:

```c
docker-compose down
```

Now, your Airflow instance should be up and running! Access the Airflow UI at `http://localhost:8080` and log in with the default credentials (`airflow` for both username and password).

## Airflow DAG Overview

The Directed Acyclic Graph (DAG) defines the sequence of tasks required to extract, transform, and load (ETL) weather data efficiently. The pipeline will do these 4 tasks:

1. **Update** `**dim_locations**` **Table:** Ensures location data is available.
2. **Generate Date Ranges:** Computes which locations and dates require data retrieval.
3. **Invoke Lambda Functions:** Fetches weather data from the API in batches.
4. **Run Glue Jobs:** Processes and aggregates the raw weather data to apache icerbeg tables for further analysis.

## 1\. Update `dim_locations Table`

In this step, we’ll determine if there’s new data available to update the `dim_locations` table. We'll utilize Athena queries, as this table was provisioned via Terraform and get the data from the `dim_locations.json`in bucket. Each pipeline run will perform a check for new data to be inserted or updated. This step is important in case this file be updated.

## 2\. Generating the List of Locations and Dates to process

The `generate_list_location_dates_to_collect` function dynamically determines the dates and locations that need data collection. To avoid reprocessing, it will delete all the files inside the `staging` folder in the project bucket. After that, it queries AWS Athena to check the latest collected date per location and generates batches for incremental data retrieval. Each one of these batches will have the format below, and each task of lambda will process your specific batch file.

```c
{
  "start_date": "<Start Date to collect data in YYYY-mm-dd format>", 
  "end_date": "<End Date to collect data in YYYY-mm-dd format>", 
  "location_ids": "[list of all locations ids to collect in 
this start/end date timeframe]"
}
```

## 3\. Extract the raw data using Lambda

This step employs AWS Lambda functions to retrieve both current and forecasted weather data. To optimize API requests and prevent timeouts when handling large datasets, the process is divided into manageable batches.

## 4\. Transform the data using Glue

This step involves using AWS Glue to transform the raw data retrieved by the Lambda function. Following the successful data extraction, Glue processes the data and creates Apache Iceberg tables, which are then used for further analysis.

With a clear understanding of the pipeline’s steps, we can now delve into the core services.

## Lambda Process

This section dives into the Lambda function responsible for fetching weather data from the WeatherAPI and storing it in our data lake on Amazon S3. The function is triggered by an event containing two essential parameters.

- **api\_token**: The authentication token required to make requests to the WeatherAPI.
- **batch\_id**: A unique identifier for the batch being processed. This ID is used to locate the corresponding metadata file in S3, which contains the list of locations and dates to process.

The metadata file follows a standardized naming convention:

```c
f"list_locations_dates_to_process_actual_data_batch_{batch_id}.json"
```
![](https://miro.medium.com/v2/resize:fit:875/1*9NW86_-h25Pi0i4-mrcATg.png)

## Understanding the Code

The core logic resides in the `_async_lambda_handler` function. Here's a breakdown of what it does:

1. **Initialization**: It sets up variables like the S3 bucket name, pipeline name, and database name.
2. **Retrieving Location and Date Data**: It fetches a list of location IDs and date ranges from an S3 object — batch metadata file generated by airflow. This list determines which locations and dates to fetch weather data for.
3. **Asynchronous Fetching**: It uses `aiohttp` to send concurrent requests to the WeatherAPI for each location and date. The fetched data is aggregated into a single file per `location_id`, avoiding the creation of thousands small files which would lead to performance issues in Spark Glue transformations.
4. **Data Storage**: The fetched weather data is stored as JSON files in the designated S3 bucket.

## **Async Processing in Action: Scaling data collection without overloading the infrastructure**

The asynchronous approach became essential to accelerate data collection while maintaining system reliability. While async operations enable concurrent processing of multiple requests (dramatically improving speed), we needed to balance this with two critical constraints:

1. API server rate limits
2. AWS Lambda’s 15-minute timeout threshold

Through rigorous testing, we determined 30 concurrent requests to be the optimal balance — maximizing throughput without overwhelming external systems or triggering Lambda timeouts.

**Our Batch Processing Strategy**  
We process data in optimized batches (generated as json files in bucket by airflow calculated) using:  
`Number of Points = Days × Locations`

**Example Implementation**  
For a batch spanning:

- Start Date: 2024–01–01
- End Date: 2024–01–10 (10 days)
- 300 locations

`10 days × 300 locations = 3,000 data points`

We configured Airflow to enforce an 8,000-point maximum per batch through dynamic task generation. This threshold:  
*✓ Prevents Lambda timeout triggers  
✓ Respects API rate limits  
✓ Allows headroom for unexpected delays  
✓ Enables predictable resource allocation*

By combining asynchronous processing with intelligent batching, we achieved faster data collection and reduced costs compared to synchronous methods. This approach enables handling more processes with fewer machines while maintaining system stability.

## Glue Process

In this section, we’ll dive into the AWS Glue process, which serves as the backbone of our data transformation and loading pipeline. AWS Glue is a fully managed ETL (Extract, Transform, Load) service that simplifies the process of preparing and loading data for analytics.

Our Glue process is designed to handle two types of weather data: **actual** and **forecast**. The process involves reading raw JSON data from S3, transforming it into a structured format, and loading it into S3 using [Apache Iceberg](https://iceberg.apache.org/) formats and integrate with the [Data Catalog](https://aws.amazon.com/pt/solutions/analytics/data-catalog/). At the end of the process, three tables are created:

- `**weather_actual_data_timeseries**`
- `**weather_actual_data_timeseries_agg**`
- `**weather_forecast_data_timeseries**`

![](https://miro.medium.com/v2/resize:fit:875/1*sQi_Gz-KFnHDua1dGLE58Q.png)

## Overview of the Process

The Glue process is divided into several key stages, each designed to handle specific tasks in the data pipeline:

**1\. Schema Parsing and Table Creation:**

- The process begins by reading the schema of the data from a JSON file stored in S3. This schema defines the structure of the data, including column names, data types, and partitioning keys.
- Using this schema, the Glue job creates Iceberg tables in the AWS Glue Data Catalog if they don’t already exist. These tables are partitioned to optimize query performance and storage efficiency.

**2\. Data Ingestion:**

- The Glue job reads raw JSON data from S3. Depending on the type of data (`actual` or `forecast`), it selects the appropriate S3 path where the data is stored.
- The data is ingested into a [**DynamicFrame**](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-crawler-pyspark-extensions-dynamic-frame.html), a flexible data structure provided by AWS Glue that can handle semi-structured data like JSON.

**3\. Data Transformation**:

- For **actual weather data**, the process involves:  
\- Flattening nested JSON structures to create a tabular format.  
\- Extracting relevant fields such as temperature, wind speed, humidity, and precipitation.  
\- Adding partition columns (e.g., `year`, `month`, `day`) to facilitate efficient querying and storage.  
\- Aggregating hourly data into year, month, hour summaries for analytical purposes.
- For **forecast weather data**, the process includes:  
\- Flattening nested JSON structures to create a tabular format.  
\- Extracting forecasted weather metrics (e.g., temperature, wind speed, humidity) from the JSON data.  
\- Adding reference columns (e.g., `ref_year`, `ref_month`, `ref_day`) to track the date when the forecast was generated.

**4\. Data Loading**:

- The transformed data is written to intermediate staging tables in the Iceberg format. These staging tables act as a temporary storage layer before the data is merged into the final tables.
- A [**merge operation**](https://docs.aws.amazon.com/prescriptive-guidance/latest/apache-iceberg-on-aws/iceberg-spark.html#spark-upsert-data) is performed to update the main Iceberg tables with new data while avoiding duplicates. This ensures that the tables always contain the latest and most accurate information.

## Snowflake connection

Most of these connection steps are based on the [**Snowflake Quickstart Tutorial**](https://quickstarts.snowflake.com/guide/data_lake_using_apache_iceberg_with_snowflake_and_aws_glue) . Feel free to check it out if you need more details.

## 1\. Creating a Snowflake Trial Account

Before setting up the integration, ensure you have a Snowflake trial account. You can sign up at [Snowflake’s official website](https://www.snowflake.com/) and select the cloud provider as AWS.

## 2\. Creating the Warehouse and Database in Snowflake

To store and process weather data, we first create a database and a warehouse in Snowflake:

```c
CREATE OR REPLACE DATABASE WAREHOUSE_WEATHER_DATA_DB;

CREATE OR REPLACE WAREHOUSE WAREHOUSE_WEATHER_DATA_DB
  WITH WAREHOUSE_SIZE = 'XSMALL'
  INITIALLY_SUSPENDED = TRUE;
```

This step ensures we have a designated compute resource and a database ready to handle our data processing tasks.

## 3\. Setting Up a Catalog Integration with AWS Glue

To integrate Snowflake with AWS Glue, we need to create a catalog integration. This allows Snowflake to access metadata from the AWS Glue Data Catalog:

```c
CREATE OR REPLACE CATALOG INTEGRATION glueCatalog_WarehouseWeatherData
  CATALOG_SOURCE = GLUE
  CATALOG_NAMESPACE = 'warehouse_weather_data'
  TABLE_FORMAT = ICEBERG
  GLUE_AWS_ROLE_ARN = 'arn:aws:iam::xxxxxxxxx:role/snowflake_service_role'
  GLUE_CATALOG_ID = 'xxxxxxxxxxxxx'
  GLUE_REGION = 'us-east-1'
  ENABLED = TRUE
  REFRESH_INTERVAL_SECONDS = 600;
```

## 4\. Creating an External Volume for S3

Since the data is stored in Amazon S3, we define an external volume in Snowflake that references the S3 bucket:

```c
CREATE OR REPLACE EXTERNAL VOLUME warehouse_weather_data_vol
   STORAGE_LOCATIONS =
        (
            (
               NAME = 's3_warehouse_weather_data.db'
               STORAGE_PROVIDER= 'S3'
               STORAGE_BASE_URL = 's3://weather-datalake-projects/pipeline-weather-data/warehouse/warehouse_weather_data.db/'
               STORAGE_AWS_ROLE_ARN='arn:aws:iam::xxxxxxxxxxx:role/snowflake_service_role'
            )
        )
    ALLOW_WRITES=FALSE;
```

## 5\. Setting up IAM permissions Snowflake and AWS

After creating the resources (S3 and Catalog Integration), proper IAM permissions configuration is necessary. The following steps will guide you through setting up all required permissions to ensure secure access and operations.

> **Catalog Integration with AWS Glue**

To enable Snowflake to interact with AWS Glue, we first create a **catalog integration**. This integration allows Snowflake to access metadata stored in Glue. After creating the integration, we need to retrieve two critical pieces of information:

1. **GLUE\_AWS\_IAM\_USER\_ARN**: The ARN of the IAM user created by Snowflake for Glue integration.
2. **GLUE\_AWS\_EXTERNAL\_ID**: A unique identifier used to secure the trust relationship between Snowflake and AWS.

To retrieve these values, run the following command in Snowflake:

```c
DESCRIBE CATALOG INTEGRATION glueCatalog_WarehouseWeatherData;
```

The output will include the `GLUE_AWS_IAM_USER_ARN` and `GLUE_AWS_EXTERNAL_ID` properties. Make a note of these values, as they will be used later in the Terraform configuration.

> **External Volume Integration with S3**

Next, we need to configure an **external volume** in Snowflake to access data stored in an S3 bucket. This setup allows Snowflake to read and write data directly to S3. To retrieve the necessary details, describe the external volume:

```c
DESC EXTERNAL VOLUME warehouse_weather_data_vol;
```

In the output, look for the `STORAGE_LOCATIONS` row. It will contain a JSON object similar to this:

```c
{
  "NAME": "my-s3-ice-ext-vol",
  "STORAGE_PROVIDER": "S3",
  "STORAGE_BASE_URL": "s3://glue-snowflake-devday-lab-6546xxxxxxxx/iceberg/",
  "STORAGE_ALLOWED_LOCATIONS": ["s3://glue-snowflake-lab-6546xxxxxxxx/iceberg/*"],
  "STORAGE_AWS_ROLE_ARN": "arn:aws:iam::65465xxxxxxx:role/glue-snowflake-GluesnowflakedevdayLabRole-crOqCT36mDB4",
  "STORAGE_AWS_IAM_USER_ARN": "arn:aws:iam::90541xxxxxxxxxx:user/vvyk0000-s",
  "STORAGE_AWS_EXTERNAL_ID": "YJB50193_SFCRole=2_f1IsD5b8/DAFxxxxxxxxxxxx",
  "ENCRYPTION_TYPE": "NONE",
  "ENCRYPTION_KMS_KEY_ID": ""
}
```

From this JSON, extract the following values:

- **STORAGE\_AWS\_IAM\_USER\_ARN**: The ARN of the IAM user created by Snowflake for S3 access.
- **STORAGE\_AWS\_EXTERNAL\_ID**: A unique identifier used to secure the trust relationship between Snowflake and AWS.

> **Configuring Terraform Variables**

With the values retrieved from the previous steps, we can now define the necessary Terraform variables. These variables will be used to configure the IAM roles and permissions required for Snowflake to assume the role and access AWS resources.

Here’s an example of how to define these variables in your Terraform configuration `variables.tf`:

```c
variable "aws_iam_user_arn_by_snowflake" {
  type        = string
  description = "IAM user ARN created by Snowflake for Glue or S3 integration"
  default     = "GLUE_AWS_IAM_USER_ARN or STORAGE_AWS_IAM_USER_ARN"
}
variable "glue_aws_external_id_by_snowflake" {
  type        = string
  description = "External ID for Glue integration"
  default     = "GLUE_AWS_EXTERNAL_ID"
}
variable "storage_aws_external_id_by_snowflake" {
  type        = string
  description = "External ID for S3 external volume integration"
  default     = "STORAGE_AWS_EXTERNAL_ID"
}
```

Replace the placeholders (`GLUE_AWS_IAM_USER_ARN`, `GLUE_AWS_EXTERNAL_ID`, etc.) with the actual values retrieved from Snowflake.

> **Assuming the Snowflake Role in AWS**

Once the Terraform variables are configured, the IAM role specified in your Terraform configuration will be able to be assumed by the Snowflake user. This ensures that Snowflake has the necessary permissions to access Glue and S3 resources securely.

## 6\. Creating Iceberg Tables in Snowflake

Using the Iceberg table format, we link Snowflake to the external tables stored in AWS Glue and S3:

First, we configure our Snowflake environment by selecting the appropriate database and warehouse:

```c
USE WAREHOUSE_WEATHER_DATA_DB;
USE WAREHOUSE_WEATHER_DATA_DB.PUBLIC;
USE WAREHOUSE WAREHOUSE_WEATHER_DATA_DB;
```

Next, we create external Iceberg tables that map to our AWS Glue catalog tables. Each table is configured with:

- External volume reference
- AWS Glue catalog connection
- Auto-refresh for data consistency

```c
CREATE OR REPLACE ICEBERG TABLE dim_locations
    EXTERNAL_VOLUME='warehouse_weather_data_vol'
    CATALOG='glueCatalog_WarehouseWeatherData'
    CATALOG_TABLE_NAME='dim_locations'
    AUTO_REFRESH = TRUE;

CREATE OR REPLACE ICEBERG TABLE weather_actual_data_timeseries
    EXTERNAL_VOLUME='warehouse_weather_data_vol'
    CATALOG='glueCatalog_WarehouseWeatherData'
    CATALOG_TABLE_NAME='weather_actual_data_timeseries'
    AUTO_REFRESH = TRUE;

CREATE OR REPLACE ICEBERG TABLE weather_actual_data_timeseries_agg
    EXTERNAL_VOLUME='warehouse_weather_data_vol'
    CATALOG='glueCatalog_WarehouseWeatherData'
    CATALOG_TABLE_NAME='weather_actual_data_timeseries_agg'
    AUTO_REFRESH = TRUE;

CREATE OR REPLACE ICEBERG TABLE weather_forecast_data_timeseries
    EXTERNAL_VOLUME='warehouse_weather_data_vol'
    CATALOG='glueCatalog_WarehouseWeatherData'
    CATALOG_TABLE_NAME='weather_forecast_data_timeseries'
    AUTO_REFRESH = TRUE;
```

With these tables established, Snowflake users can now query weather data directly from S3 storage through the AWS Glue catalog, enabling unified data access across cloud platforms.

## 7\. Querying Data in Snowflake

Once everything is set up, you can query the data directly from Snowflake:

```c
SELECT * FROM dim_locations LIMIT 10;
SELECT * FROM weather_actual_data_timeseries LIMIT 10;
SELECT * FROM weather_actual_data_timeseries_agg LIMIT 10;
SELECT * FROM weather_forecast_data_timeseries LIMIT 10;
```

## Data Visualization Insights

After connecting Snowflake to our Apache Iceberg Tables in S3, we integrated [**Tableau**](https://www.tableau.com/)as our business intelligence visualization tool. This integration provides powerful analytical capabilities that transform the data into actionable insights. Let me walk you through the key visualization features we’ve implemented.

## Historical Data Analysis

Our interactive visualization dashboard allows users to select specific geographic locations directly from the map interface. For example, when selecting Madrid, Spain, users can choose metrics such as temperature in Celsius to analyze. The system then displays comprehensive historical data through line charts, enabling trend identification and pattern recognition across different time periods.

![](https://miro.medium.com/v2/resize:fit:875/1*yt4JBa-o0Emdh6wsCeQEgw.png)

## Forecast Visualization

The forecast functionality provides a 14-day predictive view based on the reference date selection. This forward-looking capability helps users make informed decisions by anticipating future conditions for their selected metrics and locations.

![](https://miro.medium.com/v2/resize:fit:875/1*LY6P1FmE-LRKhxd-xyBRWg.png)

## Pattern Analysis Using Aggregated Data

The aggregated data visualization offers analysis based on metric selection, year of analysis, and location parameters. Users can visualize monthly and hourly time series views, revealing temporal patterns and regional variations in weather data.

The monthly analysis demonstrates clear seasonal trends — for instance, in the example below, temperatures in Fortaleza, Brazil are consistently lower in the early months of the year compared to later months, aligning with expected seasonal variations.

The hourly pattern analysis reveals daily temperature cycles with remarkable clarity. The visualization shows temperature drops during early morning and night hours, with peak temperatures occurring between 12:00 and 15:00 hours. This confirms expected diurnal temperature patterns.

![](https://miro.medium.com/v2/resize:fit:875/1*XvbjvSxPe-0San4ViLhYEQ.png)

## Conclusion

This end-to-end data engineering solution demonstrates the power of combining AWS services, Apache Iceberg, and Snowflake in a modern data architecture. Our pipeline efficiently handles weather data from collection to visualization. The resulting architecture is scalable, cost-efficient, and adaptable to changing requirements.