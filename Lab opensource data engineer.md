#moc #structure_note 

---
# data engineer

### hadoop- >(HDFS,mapreduce,hive,sqoop,hbase,Flume)

HDFS-

1.Architecture  

2.hdfs features

3.read and write operations in hdfs

4.hdfs developer commands,hdfs admin commands

5. hdfs data blocks

6. rack awareness

7. high availability

8. Fault Tolerance

9.Name Node high Availability

10. hdfs Federation

### MapReduce-

1.Introduction

2.Architecture

3.Mapper ,shuffle and sort ,Reducer

4.Key-value pairs

5.input format,input split, Record reader,output format

6.Partitioner,Combiner

7.Map Side join ,Reduce side join,distributed Cache

8.Counter

9.performance tuning in mapreduce

### Hive-

1.Introduction

2.Architecture

3.Built-In-Function

4.UDFs(UDF,UDAF,UDTF)

5.DDL commands(CREATE,SHOW,DESCRIBE,USEDROP,ALTER,TRUNCATE)

6.DML Commands(LOAD,SELECT,INSERT,DELETE,UPDATE,EXPORT,IMPORT)7.Apache Hive View and Hive Index

8.Hive Metastore – Different Ways to Configure Hive Metastore

9.Hive Data Model – Table,Partition,Bucket

10.Hive Data Types – Primitive and Complex Data Types in Hive - Complex data types - Array ,Struct,Map

11.Hive Operators –Relational Operators,Arithmetic Operators,Logical Operators,String Operators,Operators on Complex Types

12.Hive SerDe – Custom & Built-in SerDe in Hive

JsonSerde,OpenCSVSerde,ParquetSerde,OrcSerde,XmlSerde,RegexSerde

13.Hive Partitions, Types of Hive Partitioning with Examples

Static Partitioning,Dynamic Partitioning

13.Bucketing in Hive – Creation of Bucketed Table in Hive

14.Hive Join | HiveQL Select Joins Query | Types of Join in Hive

Inner,Left Outer Join,Right Outer Join,Full Outer Join,Self join,Cross Join,Map Join,Bucket Map Join,Skew Join,Sort Merge Bucket Join

15. Internal vs External Table

16. configure Mysql metastore

17. HQL select statements,Group By,Having,Grouping Sets ,Rollup and Cube,Order By Query,Sort by ,clustered by

18. Windows function- Row_number,rank,dense_rank(),lead(),lag(),first_value(),last_value()

19.Hive Optimization Techniques – Hive Performance

20.hive Security - Authentication,Authorization,Encryption

21 Hive Transaction management

### Sqoop-

1.sqoop architecture

2.sqoop features

3.sqoop eval

4.sqoop import

5.sqoop import-all tables

6.sqoop validation

7.sqoop export

8.sqoop incremental jobs

9.sqoop jobs

10.sqoop codegen

11.sqoop merge

12.sqoop metastore

13.sqoop list-databases

14.sqoop list-tables

15.sqoop connectors & drivers

16.Import Mainframe

17.Hcatalog Integration

18.Troubleshooting issue in sqoop

19.sqoop performance tuning

### Hbase-

1.Hbase Architecture

2.Hbase features

3.Hbase Use Cases

4.Hbase operations

5.Hbase commands

6.Table Management Commands in HBase

7.Data Manipulation HBase Command – Create, Truncate, Scan

8.HBase Admin API – Class Descriptor & Class HBaseAdmin

9.HBase Client API – HTable, Put, Get, Delete, Result

10.HBase MemStore – Uses, Benefits & Configuration

11.HBase Security: Kerberos Authentication & Authorization

12.HBase vs RDBMS: Feature Wise Comparison

13.HBase vs Impala: Compare Which is Better

14.HBase Troubleshooting – Problem, Cause & Solution

15.HBase Performance Tuning | Ways For HBase Optimization

flume-

1.Apache Flume Tutorial – Flume Introduction, Features & Architecture

2.Apache Flume Architecture – Flume Agent, Event, Client

3.Apache Flume Features & Limitations of Apache Flume

4.Apache Flume Use Cases – Future Scope in Flume

5.Apache Flume Source – Types of Flume Source

6.Apache Flume Sink – Types of Sink in Flume

7.Apache Flume Sink Processors- Its Types

8.Flume Channel Selectors – Apache Flume

9.Apache Flume Channel | Types of Channels in Flume

10.Flume Event Serializers – Apache Flume

11.Apache Flume Interceptors | Types of Interceptors in Flume

12.Flume Data Flow – Types & Failure Handling in Apache Flume

13.Data Transfer from Flume to HDFS – Load Log Data Into HDFS

14.Flume Troubleshooting | Flume Known Issues & Its Compatibility

## spark ->(spark core ,sql,Streaming,mysql integration,Mongodb,Cassandra,snowflakes,ElasticSearch,Sparkkafka streaming,Hbase integration)

### Spark-Spark Core

1.Spark Introduction

2.Apache Spark Ecosystem – Complete Spark Component

3.Features of Apache Spark – Learn the benefits of using Spark

4.Apache Spark Use Cases in Real Time

5.Spark Shell Commands to Interact with Spark-Scala

6.Spark Shell Commands to Interact with Spark-python

7.Learn SparkContext,SparkSession – Introduction and Functions

8.Spark Stage,tasks- An Introduction to Physical Execution plan

9.Spark RDD – Introduction, Features & Operations of RDD

10.RDD Persistence and Caching Mechanism in Apache Spark

11.Shining Features of Spark RDD You Must Know

12.Introduction to Apache Spark Paired RDD

13.How to Overcome the Limitations of RDD in Apache Spark?

14.Spark RDD Operations-Transformation & Action with Example

15.RDD lineage in Spark: ToDebugString Method

16.Apache Spark Map vs FlatMap Operation

17.Spark In-Memory Computing – A Beginners Guide

18.Lazy Evaluation,Fault tolerance ,Directed Acyclic Graph DAG in Apache Spark

19.Apache Spark Cluster Managers – YARN, Mesos & Standalone , how it works

20.Spark Performance Tuning-Learn to Tune Apache Spark Job

### Spark-Spark SQL

1.Apache Spark SQL Tutorial – Quick Introduction Guide

2.Spark SQL Features

3.Spark SQL DataFrame

4.Spark Dataset

5.Spark SQL Optimization – Understanding the Catalyst Optimizer

6.Apache Spark RDD vs DataFrame vs DataSet

7.Spark Mysql integration

8.spark Hive Integration

9.Spark MongoDB integration(including MongoDB Hands on)

10.Spark Cassandra Integration(including Cassandra Hands On)

12.Spark Hbase Integration

13.Spark ElasticSearch Integration(including Elasticsearch Hands On)

14.Spark joining strategies,Spark joins(inner join,left outer ,right outer join,self join ,cross join,full outer join),skew join,broadcast join

15.Spark storage format(Parquet,avro and ORC)

16.Spark dataframe api for window function(row_number,rank,dense_rank,lead,lag,first_value and last_value)

17.spark sql api

### Spark-Spark Streaming

1.Spark streaming introduction

2.Apache Spark DStream (Discretized Streams)

3.Apache Spark Streaming Transformation Operations

4.Spark Streaming Checkpoint in Apache Spark

5.Spark Watermarking Checkpoint in Apache Spark

6.Spark Kafka Integration

  

## aws data engineer -> (lambda,glue,emr, kinesis,dynamodb,RDS,EC2,S3,Redshift)

### Aws big data engineer

=====================

1.Big Data on AWS Introduction

2.Cloud Computing Introduction, Advantages, and Types

Cloud Deployment Models

Cloud Service Categories

AWS Cloud Platform

AWS Cloud Architecture Design Principles - Part I

AWS Cloud Architecture Design Principles - Part II

Why AWS for Big Data - Reasons and Challenges

Databases in AWS

Data Warehousing in AWS

Redshift, Kinesis, and EMR

DynamoDB, Machine Learning, and Lambda

ElasticSearch Services and EC2

## .Big Data on AWS - Collection

Amazon Kinesis and Kinesis Stream

Kinesis Data Stream Architecture and Core Components

Data Producer

Data Consumer

Kinesis Stream Emitting Data to AWS Services and Kinesis Connector Library

Kinesis Firehose

Demo - Put and Get Records from Kinesis Data Stream

Transferring Data Using Lambda

Amazon SQS Lifecycle and Architecture

IoT and Big Data

IoT Framework

AWS Data Pipelines and Data Nodes

Activity, Pre-Condition, and Schedule

Demo - Importing Data from S3 into DynamoDB Using Data Pipeline

##   Big Data on AWS - Storage

Amazon Glacier and Big Data

DynamoDB Introduction

DynamoDB and EMR

DynamoDB Partitions and Distributions

DynamoDB GSI LSI

DynamoDB Stream and Cross-Region Replication

DynamoDB Performance and Partition Key Selection

Snowball and AWS Big Data

AWS DMS

AWS Aurora in Big Data

Demo - Amazon Athena Interactive SQL Queries for Data in Amazon S3 Part I

Demo - Amazon Athena Interactive SQL Queries for Data in Amazon S3 Part II

## Big Data on AWS - Processing

Amazon EMR

Demo - Analyzing Big Data with Amazon EMR

Apache Hadoop

EMR Architecture

EMR Operations - Releases and Cluster

EMR Operations - Choosing Instance and Monitoring

Demo - Advanced EMR Setting Options

Hive on EMR

HBase with EMR

Presto with EMR

Spark with EMR

EMR File Storage

Demo - Analyzing Large Datasets Using Hive and Spark

AWS Lambda

##   Big Data on AWS - Analysis

Redshift Intro and Use Cases

Redshift Architecture

MPP and Redshift in AWS Ecosystem

Columnar Databases

Redshift Table Design - Part I

Redshift Table Design - Part II

Demo - Generating Random Dataset in EC2 and Loading it in S3

Demo - Redshift Maintenance and Operations

Machine Learning Introduction

Machine Learning Algorithm

Amazon SageMaker

Amazon Elasticsearch

Amazon Elasticsearch Services

Demo - Loading Datasets into Elasticsearch

Logstash and RStudio

Demo - Fetching the File and Analyzing it using RStudio

Athena

Demo - Running Query on S3 using the Serverless Athena

Demo - Creating a Redshift Cluster and Loading the Datasets into it from S3 - Part I

Demo - Creating a Redshift Cluster and Loading the Datasets into it from S3 - Part II

## Big Data on AWS - Visualization

Amazon QuickSight

Demo - Creating an Analysis with a Single Visual using Sample Data

Demo - Creating an Analysis using Your Own Amazon S3 Data

Big Data Visualization

8.Big Data on AWS - Security

EMR Security and Security Group

Roles and Private Subnet

Encryption at Rest and In-Transit

Redshift Security

Encryption at Rest using CloudHSM

Cloud HSM versus AWS KMS

Limit Data Access

azure data engineer  -> (azure functions, azure blob storage, azure data factory ,azure databricks and azure synapse ,azure event hub)

## Azure Big Data engineer

======================

1.Working with Azure Blob Storage

2.Working with Relational Databases in Azure

Provisioning and connecting to an Azure SQL database using PowerShell

Provisioning and connecting to an Azure PostgreSQL database using the Azure CLI

Provisioning and connecting to an Azure MySQL database using the Azure CLI

Implementing active geo-replication for an Azure SQL database using PowerShell

Implementing an auto-failover group for an Azure SQL database using PowerShell

Implementing vertical scaling for an Azure SQL database using PowerShell

Implementing an Azure SQL database elastic pool using PowerShell

Monitoring an Azure SQL database using the Azure portal

3.Analyzing Data with Azure Synapse Analytics

Provisioning and connecting to an Azure Synapse SQL pool using PowerShell

Pausing or resuming a Synapse SQL pool using PowerShell

Scaling an Azure Synapse SQL pool instance using PowerShell

Loading data into a SQL pool using PolyBase with T-SQL

Loading data into a SQL pool using the COPY INTO statement

Implementing workload management in an Azure Synapse SQL pool

Optimizing queries using materialized views in Azure Synapse Analytics

4.Control Flow Activities in Azure Data Factory

Implementing control flow activities

Implementing control flow activities – Lookup and If activities

Triggering a pipeline in Azure Data Factory

5.Control Flow Transformation and the Copy Data Activity in Azure Data Factory

Implementing HDInsight Hive and Pig activities

Implementing an Azure Functions activity

Implementing a Data Lake Analytics U-SQL activity

Copying data from Azure Data Lake Gen2 to an Azure Synapse SQL pool using the copy activity

Copying data from Azure Data Lake Gen2 to Azure Cosmos DB using the copy activity

6.Data Flows in Azure Data Factory

Implementing incremental data loading with a mapping data flow

Implementing a wrangling data flow

7.Azure Data Factory Integration Runtime

Configuring a self-hosted IR

Configuring a shared self-hosted IR

Migrating an SSIS package to Azure Data Factory

Executing an SSIS package with an on-premises data store

8.Deploying Azure Data Factory Pipelines

Configuring the development, test, and production environments

Deploying Azure Data Factory pipelines using the Azure portal and ARM templates

Automating Azure Data Factory pipeline deployment using Azure DevOps

9.Batch and Streaming Data Processing with Azure Databricks

Configuring the Azure Databricks environment

Transforming data using Python

Transforming data using Scala

Working with Delta Lake

Processing structured streaming data with Azure Databricks

GCP data engineer  -> (Gcp data proc, pub sub, apache beam , composer,Gcp sql data storages, Big query and nosql database)

## GCP Big Data engineer

====================

  

1.Getting Started with Data Engineering with GCP

2.Big Data Capabilities on GCP

Understanding what the cloud is

Getting started with Google Cloud Platform

A quick overview of GCP services for data engineering

3.Building Solutions with GCP Components

4. Building a Data Warehouse in BigQuery

Introduction to Google Cloud Storage and BigQuery

Introduction to the BigQuery console

Preparing the prerequisites before developing our data warehouse

Practicing developing a data warehouse

5.Building Orchestration for Batch Data Loading Using Cloud Composer

Introduction to Cloud Composer

Understanding the working of Airflow

Exercise: Build data pipeline orchestration using Cloud Composer

6.Building a Data Lake Using Dataproc

Introduction to Dataproc

Exercise – Building a data lake on a Dataproc cluster

Exercise: Creating and running jobs on a Dataproc cluster

Understanding the concept of the ephemeral cluster

Building an ephemeral cluster using Dataproc and Cloud Composer

7.Processing Streaming Data with Pub/Sub and Dataflow

Processing streaming data

Exercise – Publishing event streams to cloud Pub/Sub

Exercise – Using Cloud Dataflow to stream data from Pub/Sub to GCS

8.Visualizing Data for Making Data-Driven Decisions with Data Studio

Unlocking the power of your data with Data Studio

From data to metrics in minutes with an illustrative use case

Understanding how Data Studio can impact the cost of BigQuery

How to create materialized views and understanding how BI Engine works

9.Key Strategies for Architecting Top-Notch Data Pipelines

10.User and Project Management in GCP

Understanding IAM in GCP

Planning a GCP project structure

Controlling user access to our data warehouse

Practicing the concept of IaC using Terraform

11.Cost Strategy in GCP

Estimating the cost of your end-to-end data solution in GCP

Tips for optimizing BigQuery using partitioned and clustered tables

12.CI/CD on Google Cloud Platform for Data Engineers

Introduction to CI/CD

Understanding CI/CD components with GCP services

Exercise – implementing continuous integration using Cloud Build

Exercise – deploying Cloud Composer jobs using Cloud Build

  
  

## snowflakes

===========

1. Getting Started with Snowflake

Creating a new Snowflake instance

Creating a tailored multi-cluster virtual warehouse

Using the Snowflake WebUI and executing a query

Using SnowSQL to connect to Snowflake

Connecting to Snowflake with JDBC

Creating a new account admin user and understanding built-in roles

2.Managing the Data Life Cycle

Managing a database

Managing a schema

Managing tables

Managing external tables and stages

Managing views in Snowflake

3.Loading and Extracting Data into and out of Snowflake

Configuring Snowflake access to private S3 buckets

Loading delimited bulk data into Snowflake from cloud storage

Loading delimited bulk data into Snowflake from your local machine

Loading Parquet files into Snowflake

Making sense of JSON semi-structured data and transforming to a relational view

Processing newline-delimited JSON (or NDJSON) into a Snowflake table

Processing near real-time data into a Snowflake table using Snowpipe

Extracting data from Snowflake

4.Building Data Pipelines in Snowflake

Creating and scheduling a task

Conjugating pipelines through a task tree

Querying and viewing the task history

Exploring the concept of streams to capture table-level changes

Combining the concept of streams and tasks to build pipelines that process changed data on a schedule

Converting data types and Snowflake's failure management

Managing context using different utility functions

5.Data Protection and Security in Snowflake

Setting up custom roles and completing the role hierarchy

Configuring and assigning a default role to a user

Delineating user management from security and role management

Configuring custom roles for managing access to highly secure data

Setting up development, testing, pre-production, and production database hierarchies and roles

Safeguarding the ACCOUNTADMIN role and users in the ACCOUNTADMIN role

6.Performance and Cost Optimization

Examining table schemas and deriving an optimal structure for a table

Identifying query plans and bottlenecks

Weeding out inefficient queries through analysis

Identifying and reducing unnecessary Fail-safe and Time Travel storage usage

Projections in Snowflake for performance

Reviewing query plans to modify table clustering

Optimizing virtual warehouse scale

7.Secure Data Sharing

Sharing a table with another Snowflake account

Sharing data through a view with another Snowflake account

Sharing a complete database with another Snowflake account and setting up future objects to be shareable

Creating reader accounts and configuring them for non-Snowflake sharing

Keeping costs in check when sharing data with non-Snowflake users

8.Back to the Future with Time Travel

Using Time Travel to return to the state of data at a particular time

Using Time Travel to recover from the accidental loss of table data

Identifying dropped databases, tables, and other objects and restoring them using Time Travel

Using Time Travel in conjunction with cloning to improve debugging

Using cloning to set up new environments based on the production environment rapidly

9.Advanced SQL Techniques

Managing timestamp data

Shredding date data to extract Calendar information

Unique counts and Snowflake

Managing transactions in Snowflake

Ordered analytics over window frames

Generating sequences in Snowflake

10.Extending Snowflake Capabilities

Creating a Scalar user-defined function using SQL

Creating a Table user-defined function using SQL

Creating a Scalar user-defined function using JavaScript

Creating a Table user-defined function using JavaScript

Connecting Snowflake with Apache Spark

Using Apache Spark to prepare data for storage on Snowflake

## airflow

==========

1.Building Data Pipelines – Extract Transform, and Load

2.Building Our Data Engineering Infrastructure

Installing and configuring Apache NiFi

Installing and configuring Apache Airflow

Installing and configuring Elasticsearch

Installing and configuring Kibana

Installing and configuring PostgreSQL

Installing pgAdmin 4

3.Reading and Writing Files

Writing and reading files in Python

Building data pipelines in Apache Airflow

Handling files using NiFi processors

4.Working with Databases

Inserting and extracting relational data in Python

Inserting and extracting NoSQL database data in Python

Building data pipelines in Apache Airflow

Handling databases with NiFi processors

5.Cleaning, Transforming, and Enriching Data

Performing exploratory data analysis in Python

Handling common data issues using pandas

Cleaning data using Airflow

6.Deploying Data Pipelines in Production

7.Features of a Production Pipeline

Staging and validating data

Building idempotent data pipelines

Building atomic data pipelines

8.Version Control with the NiFi Registry

Installing and configuring the NiFi Registry

Using the Registry in NiFi

Versioning your data pipelines

Using git-persistence with the NiFi Registry

9.Monitoring Data Pipelines

Monitoring NiFi using the GUI

Monitoring NiFi with processors

Using Python with the NiFi REST API

10.Deploying Data Pipelines

Finalizing your data pipelines for production

Using the NiFi variable registry

Deploying your data pipelines

11.Building a Production Data Pipeline

Creating a test and production environment

Building a production data pipeline

Deploying a data pipeline in production

12.Beyond Batch – Building Real-Time Data Pipelines

13.Streaming Data with Apache Kafka

Understanding logs

Understanding how Kafka uses logs

Building data pipelines with Kafka and NiFi

Differentiating stream processing from batch processing

Producing and consuming with Python

14.Data Processing with Apache Spark

Installing and running Spark

Installing and configuring PySpark

Processing data with PySpark

**






