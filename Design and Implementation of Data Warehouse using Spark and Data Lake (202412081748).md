---
created-date: 2024-12-08 17:48
id: 
url: https://www.youtube.com/watch?v=C4UiqIc_gWA&t=840s
related: 
aliases: 
tags: 
summary:
---
# Design and Implementation of Data Warehouse using Spark and Data Lake

## Introduction

## rchitecture Overview

- **MinIO**: Acts as the data lake storage
- **Spark**: Distributed data processing
- **Airflow**: Workflow orchestration
- **Hive**: Metadata store and SQL interface
- **Presto**: Distributed SQL query engine
- **Superset**: Data visualization and exploration
- **MariaDB**: Metadata storage for Hive

## Important Notes

1. The system uses Delta Lake format for data storage, which provides ACID transactions on Spark
2. All necessary JAR files for S3 and Delta Lake support are included in the Hive and Spark images
3. The system is configured to use MinIO as the S3-compatible storage
4. Presto is configured to work with both Hive tables and Delta Lake format

## Setting up MinIO

MinIO is an open-source object storage that allows us to store and manage large amounts of data. We can scale MinIO horizontally and create multiple buckets, each with its own replication policy. We can also create users and assign them read and write access to specific buckets.

## Creating a Spark Session

To create a Spark session, we need to set the Spark configuration and enable Hive support. We also need to set the MinIO access key and secret key.

`val spark = SparkSession.builder()   .appName("Data Warehouse")   .config("spark.hadoop.fs.s3a.endpoint", "http://localhost:9000")   .config("spark.hadoop.fs.s3a.access.key", "minio")   .config("spark.hadoop.fs.s3a.secret.key", "minio123")   .enableHiveSupport()   .getOrCreate()`

## Creating a Delta Table

We can create a Delta table using the `delta` format. We can specify the partitioning scheme and the data schema.

`val deltaTable = spark.read.format("delta")   .option("header", "true")   .option("inferSchema", "true")   .load("s3a://data-lake/raw-data/bitcoin.csv")   .write.format("delta")   .partitionBy("date")   .save("s3a://data-lake/delta-tables/bitcoin")`

## Creating an External Hive Table

We can create an external Hive table using the `hive` format. We can specify the data schema and the location of the data.

`val hiveTable = spark.sql("CREATE EXTERNAL TABLE hive_bitcoin (   date STRING,   value DOUBLE ) ROW FORMAT DELIMITED FIELDS TERMINATED BY ',' LOCATION 's3a://data-lake/raw-data/bitcoin.csv'")`

## Creating an Internal Delta Table

We can create an internal Delta table using the `delta` format. We can specify the data schema and the location of the data.

`val deltaTable = spark.read.format("delta")   .option("header", "true")   .option("inferSchema", "true")   .load("s3a://data-lake/raw-data/bitcoin.csv")   .write.format("delta")   .save("s3a://data-lake/delta-tables/bitcoin")`

## Running Queries on Delta Tables

# Resources 
[GitHub - arezamoosavi/AcidOnSpark-ETL: Delta-Lake, ETL, Spark, Airflow](https://github.com/arezamoosavi/AcidOnSpark-ETL) 