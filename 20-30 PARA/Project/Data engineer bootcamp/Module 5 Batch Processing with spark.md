---
Priority_Level: 
Status: 1 To Do
Date_Created: 
Due_Date: 
Connections: 
tags: 
Type: project_note
cssclasses:
---
# Components
**Select Connection:** `INPUT[inlineListSuggester(optionQuery(#area),optionQuery(#resource), optionQuery(#project)):connections]`  
**Date Created:** `INPUT[dateTime(defaultValue(null)):Date_Created]`
**Due Date:** `INPUT[dateTime(defaultValue(null)):Due_Date]`
**Priority Level:** `INPUT[inlineSelect(option(1 Critical), option(2 High), option(3 Medium), option(4 Low)):Priority_Level]`
**Status:** `INPUT[inlineSelect(option(1 To Do), option(2 In Progress), option(3 Testing), option(4 Completed), option(5 Blocked)):Status]`
# Description


# Batch Processing

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#batch-processing)

### Table of contents

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#table-of-contents)

- [Introduction to Batch Processing](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#introduction-to-batch-processing)
- [Introduction to Spark](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#introduction-to-spark)
- [Installation](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#installation)
- [Spark SQL and DataFrames](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#spark-sql-and-dataframes)
    - [First Look at PySpark](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#first-look-at-pyspark)
    - [Spark DataFrames](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#spark-dataframes)
    - [Preparing Taxi Data](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#preparing-taxi-data)
    - [SQL with Spark](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#sql-with-spark)
- [Spark Internals](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#spark-internals)
    - [Anatomy of a Spark Cluster](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#anatomy-of-a-spark-cluster)
    - [GroupBy in Spark](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#groupby-in-spark)
- [Running Spark in the Cloud](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#running-spark-in-the-cloud)
    - [Connecting to Google Cloud Storage](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#connecting-to-google-cloud-storage)
    - [Creating a Local Spark Cluster](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#creating-a-local-spark-cluster)
    - [Setting up a Dataproc Cluster](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#setting-up-a-dataproc-cluster)
    - [Connecting Spark to Big Query](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#connecting-spark-to-big-query)

## Introduction

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#introduction)

In this week we will first talk about what batch processing is. One of the tools that we can use for batch processing is Spark, and we will spend most of the time this week talking about Spark.

We'll use PySpark for that, meaning we will use Python, not Scala. Then, we will look at different features of Spark like DataFrames, SQL, how we do joins in Spark, and then we will talk about a relatively old concept from Spark called RDDs (Resilient Distributed Datasets).

We will discuss what they are and the difference between DataFrames and RDDs. We will spend some time talking about internals and how we can use Docker to run Spark jobs. All that we will do locally, but then at the end, in the last two lessons, we will talk about deploying, actually going to the cloud, and running Spark jobs there, then connecting this to a data warehouse.

## Introduction to Batch Processing

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#introduction-to-batch-processing)

_[Video source](https://www.youtube.com/watch?v=dcHe5Fl3MF8)_

**Batch vs Streaming**

There are multiple ways of processing data. One is called batch, and the other one is called streaming.

**Batch:**

Let's say you have a database, and this is our taxi trip dataset. We have some data for January 15, for example. Then we take all the data we have for January 15 and there is one single job that takes all this data for January 15 and then produces something else, some other dataset.

This particular job reads the data for the entire day from 00:00 January 15th to 23:59 January 15th, takes all the data, processes it, and does something.

  

[![b1](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b1.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b1.jpg)

  
  

**Streaming:**

Imagine a taxi service where every time a user requests a ride, trip information (location, estimated time of arrival, fare, etc.) is sent and processed in real time. Each event that is generated (ride start, stops, arrival at the destination) is part of the data stream.

A data stream is a continuous sequence of data that is generated and processed in real time or near real time. Instead of waiting for large amounts of data to accumulate before processing them (as in batch processing), data streams allow information to be handled as it arrives. This week, we will not talk about this. This week, we will focus on things that process huge chunks of data in one go.

**Batch jobs**

Batch jobs typically run on a scheduled basis, processing accumulated data over a set period. The most common intervals are daily and hourly.

- Daily batch jobs collect data throughout the day and process it once the day is over.
    
- Hourly batch jobs process everything that happened in the previous hour.
    
- Less common intervals include running batch jobs multiple times per hour, such as every five minutes, but these are not as typical.
    

**Technologies for Batch Jobs**

Batch jobs often use Python scripts to handle data ingestion and transformation. For example, a script might retrieve a CSV file and load it into a database. These scripts can run at various intervals, including monthly.

SQL is another common choice for defining transformations. In week four, we saw how SQL can process large chunks of data at once, making it well-suited for batch processing.

Apache Spark is a widely used technology for batch jobs, along with alternatives like Apache Flink.

**Execution and Orchestration**

Python scripts can run on various platforms, including Kubernetes and AWS Batch. To manage and orchestrate batch workflows, Airflow is commonly used.

A typical workflow might look like this:

- Data ingestion: CSV files are stored in a data lake.
    
- Python processing: A script processes the CSVs and moves the data to a warehouse.
    
- SQL transformations: Using tools like dbt, the data is transformed.
    
- Further processing: Spark or additional Python jobs refine the data.
    

Each of these steps represents a batch job, and Airflow helps coordinate them within a data pipeline.

**Advantages and Disadvantages of Batch Jobs**

Batch jobs offer several advantages:

- Ease of management: Workflow tools allow us to define steps, parameterize scripts, and easily retry failed executions.
    
- Retry: Since batch jobs are not real-time, retries are safer and more controlled.
    
- Scalability: If a Python script encounters a larger file, we can scale up by using a more powerful machine. Similarly, if a Spark job requires more resources, we can add machines to the cluster. This flexibility makes batch processing highly adaptable.
    

However, batch processing has a key disadvantage:

- Delay: Since batch jobs run at scheduled intervals, data is not available in real time.

While streaming can solve this issue, real-time processing is not always necessary. In many cases, it's acceptable to wait an hour, a day, or even a week before using the data in reports or dashboards. Many metrics are not time-sensitive, making batch processing a practical choice.

Due to these advantages, batch jobs remain the dominant approach in most data processing workflows

## Introduction to Spark

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#introduction-to-spark)

_[Video source](https://www.youtube.com/watch?v=FhaqbEOuQ8U)_

Apache Spark is an open-source, distributed computing system designed for big data processing and analytics. It provides a fast and general-purpose engine for large-scale data processing by leveraging in-memory computing and efficient data processing techniques.

For example, if we have data stored in a database or a data lake, Spark pulls this data into its machines (executors), processes it, and then writes the output back to a data lake or a data warehouse. This distributed processing is what makes Spark powerful. It can run on clusters with tens or even thousands of machines, all working together to transform and store data efficiently.

  

[![b2](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b2.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b2.jpg)

  
  

While Spark is written in Scala, it supports multiple languages. Scala is the native way to interact with Spark, but there are also wrappers for other languages. The Python wrapper, known as PySpark, is especially popular.

Spark is primarily used for executing batch jobs but also supports streaming. In a streaming context, incoming data is processed as a sequence of small batches, applying similar techniques as in batch processing. However, here we will focus only on batch jobs.

**When to use Spark?**

Typically Spark is used when your data is in a data lake. Usually, this is just some location in S3 or Google Cloud Storage, and then we have a bunch of Parquet files there. Spark would pull this data from a data lake, do some processing, and then put this data back into the data lake.

You would typically use it for the same things where you would use SQL. Since we have a data lake here and not a data warehouse, in a data warehouse, we would just go with BigQuery and use SQL. But when you just have a bunch of files lying in your S3 or Google Cloud Storage, using SQL is not always easy. In that case, you would go with Spark.

These days, you can actually run SQL on your data lake using things like Hive, Presto, or even Spark. In AWS, there is a managed version of Presto called Athena. You can also use these tools to execute SQL on your data in a data lake and then write the results back to the lake.

If you can express your job as an SQL query, you should go with Presto, Athena, or even BigQuery with external tables. However, sometimes you cannot express your jobs with SQL. You may need more flexibility, your code might become too difficult to manage, or you may want to split it into different modules with unit tests. Some functionality might not be possible to implement in SQL. This is exactly when you want to use Spark.

**Example workflow for machine learning**

A typical workflow at work involves handling raw data, which is first stored in a data lake. We then perform a series of transformations on this data, such as aggregations and joins, using SQL tools like Athena or Presto. Once the data is prepared, there may be cases where SQL is not sufficient for more complex transformations. In such instances, we introduce another step using Spark, which allows us to run Python jobs or train machine learning models.

Another common workflow involves utilizing a trained machine learning model. For example, we can take the model generated by our Python script and apply it using Spark. The output can then be stored back in the data lake and subsequently moved to a data warehouse or another destination.

This is a typical scenario where multiple components are involved, with most preprocessing occurring in the data lake. Therefore, my recommendation is to use SQL whenever possible, but for tasks that go beyond SQL's capabilities, Spark is the better choice.

## Installation

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#installation)

_[Video source](https://www.youtube.com/watch?v=hqUbB9c8sKg)_

Install instructions for:

- [`Linux`](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/install/linux.md)
- [`MacOs`](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/install/macos.md)
- [`Windows`](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/install/windows.md)

If it was installed correctly and after configuring JAVA_HOME and SPARK_HOME, in the terminal (ubuntu WSL2 in this case) run this command:

```
spark-shell
```

And you should see something like this:

  

[![b3](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b3.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b3.jpg)

  
  

And follow this to run PySpark

- [`PySpark`](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/install/pyspark.md)

To test that pyspark works correctly, let's create a file called test.py, in this case in opt/spark:

```
touch test.py
```

And then open vscode:

```
code test.py
```

copy the file "taxi_zone_lookup.csv" inside the opt/spark folder and copy this code in test.py:

```python
import pyspark
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .master("local[*]") \
    .appName('test') \
    .getOrCreate()

df = spark.read \
    .option("header", "true") \
    .csv('taxi_zone_lookup.csv')

df.show()
```

and run test.py in the ubuntu terminal:

```
python3 test.py
```

you should look something like this:

```

+----------+-------------+--------------------+------------+                    
|LocationID|      Borough|                Zone|service_zone|
+----------+-------------+--------------------+------------+
|         1|          EWR|      Newark Airport|         EWR|
|         2|       Queens|         Jamaica Bay|   Boro Zone|
|         3|        Bronx|Allerton/Pelham G...|   Boro Zone|
|         4|    Manhattan|       Alphabet City| Yellow Zone|
|         5|Staten Island|       Arden Heights|   Boro Zone|
|         6|Staten Island|Arrochar/Fort Wad...|   Boro Zone|
|         7|       Queens|             Astoria|   Boro Zone|
|         8|       Queens|        Astoria Park|   Boro Zone|
|         9|       Queens|          Auburndale|   Boro Zone|
|        10|       Queens|        Baisley Park|   Boro Zone|
|        11|     Brooklyn|          Bath Beach|   Boro Zone|
|        12|    Manhattan|        Battery Park| Yellow Zone|
|        13|    Manhattan|   Battery Park City| Yellow Zone|
|        14|     Brooklyn|           Bay Ridge|   Boro Zone|
|        15|       Queens|Bay Terrace/Fort ...|   Boro Zone|
|        16|       Queens|             Bayside|   Boro Zone|
|        17|     Brooklyn|             Bedford|   Boro Zone|
|        18|        Bronx|        Bedford Park|   Boro Zone|
|        19|       Queens|           Bellerose|   Boro Zone|
|        20|        Bronx|             Belmont|   Boro Zone|
+----------+-------------+--------------------+------------+
only showing top 20 rows
```

## Spark SQL and DataFrames

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#spark-sql-and-dataframes)

### First Look at PySpark

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#first-look-at-pyspark)

_[Video source](https://www.youtube.com/watch?v=r_Sf6fCB40c)_

In this section, we will take a first look at PySpark, load some data, and save it using PySpark:

- We will see how to read a CSV file.
- We will talk about partitions. What they are and why they matter.
- We will save this data to Parquet.
- We will explore the Spark Master UI.

SparkSession is the main entry point for interacting with Spark. We use it to read data and perform operations:

```python
import pyspark
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .master("local[*]") \
    .appName('test') \
    .getOrCreate()
```

Rather than using yellow or green taxi records, we will work with high-volume for-hire vehicle trip records. Download the file:

```
wget https://github.com/DataTalksClub/nyc-tlc-data/releases/download/fhvhv/fhvhv_tripdata_2021-01.csv.gz

```

Unzip it:

```
gunzip fhvhv_tripdata_2021-01.csv.gz
```

Next, I want to use the same approach as last time to read the CSV file into Spark. We specify the header, then run show(). It correctly detects the column names.

```python
df = spark.read \
    .option("header", "true") \
    .csv('fhvhv_tripdata_2021-01.csv')

df.show()
```

**Run pyspark in the terminal**

Note

Instead of using a jupyter notebook, I'm going to use the ubuntu terminal and the pyspark interactive shell

---

When you type pyspark in the Ubuntu terminal, it launches an interactive PySpark shell. This shell allows you to interact with Apache Spark using Python.

- It initializes a Spark session (SparkSession) with default configurations.
- You can run PySpark commands interactively, which is useful for testing and debugging Spark code.

Paste this code in the interactive PySpark shell:

```python
import pyspark
from pyspark.sql import SparkSession

spark = SparkSession.builder.master("local[*]").appName('test').getOrCreate()

df = spark.read.option("header", "true").csv('fhvhv_tripdata_2021-01.csv')

df.show()
```

You should look something like this:

  

[![b4](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b4.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b4.jpg)

  
  

If we check the Spark cluster UI and refresh it, we see new entries appear. Each time we execute an operation, a new job is logged. If I run the command again, another job will appear in the UI.

  

[![b5](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b5.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b5.jpg)

  
  

Now, instead of using show(), I will use df.head(5), which returns the first five records.

  

[![b6](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b6.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b6.jpg)

  
  

We can see that Spark is reading the data as strings instead of timestamps or numbers. Unlike Pandas, Spark does not infer data types automatically, so everything is treated as a string by default.

We can confirm this by checking the schema. It’s not well formatted, but we can see that all fields are classified as string type. I will use df.schema:

  

[![b7](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b7.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b7.jpg)

  
  

**Defining the schema**

To properly define a schema for our DataFrame, I will format the inferred schema in Visual Studio Code. Spark schemas use StructType, which is a Scala construct, so I need to convert it into Python code.

```python
schema = types.StructType([
    types.StructField('hvfhs_license_num', types.StringType(), True),
    types.StructField('dispatching_base_num', types.StringType(), True),
    types.StructField('pickup_datetime', types.TimestampType(), True),
    types.StructField('dropoff_datetime', types.TimestampType(), True),
    types.StructField('PULocationID', types.IntegerType(), True),
    types.StructField('DOLocationID', types.IntegerType(), True),
    types.StructField('SR_Flag', types.StringType(), True)
])
```

After defining the schema, I need to specify it when reading the CSV file. Adding the schema parameter ensures that Spark correctly interprets the data types.

```python
df = spark.read \
    .option("header", "true") \
    .schema(schema) \
    .csv('fhvhv_tripdata_2021-01.csv')
```

Running df.head(10) on the loaded data confirms that timestamps are parsed correctly, location IDs are treated as numbers without quotes, and SR_Flag remains a nullable string:

  

[![b8](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b8.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b8.jpg)

  
  

This is how we define and apply a schema in Spark.

**Partitions**

So here we have one huge CSV file, and actually, having just one file is not good. I want to tell you a bit about the internals of Spark. We will cover that in more detail later.

Imagine that this is our Spark cluster, and inside the Spark cluster, we have a bunch of executors. These are computers that are actually doing computational work. They pull the files from our data lake and perform computations.

If we have only one large file, only one executor can process it, while the others remain idle. This is inefficient, so we want multiple smaller files instead of one large file.

  

[![b9](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b9.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b9.jpg)

  
  

Now, let's say we have fewer executors than files. Each file will be assigned to an executor. One executor will get one file, another will get another file, and so on. When an executor finishes processing its file, it will pick the next available one. This way, all files will eventually be processed.

  

[![b10](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b10.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b10.jpg)

  
  

In Spark, these subdivisions are called partitions. Instead of having one large partition, which only one executor can handle, we want multiple partitions. If we take one large file and split it into, say, 24 partitions, each executor can process a smaller part of the file in parallel.

To achieve this, Spark has a special command called df.repartition(), which takes the number of partitions as a parameter. When we read a file into a DataFrame, Spark creates as many partitions as there are files in the folder.

Executing df.repartition(24) does not immediately change the DataFrame because repartitioning is lazy. The change is applied only when we perform an action, such as saving the DataFrame.

**Saves as Parquet file**

Now, let's write the DataFrame to Parquet:

```python
df = df.repartition(24)
df.write.parquet('fhvhv/2021/01')
```

When we execute this, Spark starts processing. We can see the job in the Spark UI under "Parquet." Clicking on it reveals the partitioning process. The operation is quite expensive, so it takes some time to complete.

  

[![b11](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b11.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b11.jpg)

  
  

Now, if I look at this folder, I can see that there's a bunch of files. Each file follows a naming pattern: the part number of the partition, a long name, snappy (which is the compression algorithm used in Parquet), and then .parquet.

We see multiple files—there should be 24, as we requested, or 26, because we also have a SUCCESS file. This SUCCESS file is empty (size zero) and simply indicates that the job finished successfully. If this file is missing, we can't be sure that the files are complete or not corrupted. Once the flag is there, we know the job has finished. This acts like a commit message at the end of a Spark job.

  

[![b12](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b12.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b12.jpg)

  
  

### Spark DataFrames

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#spark-dataframes)

_[Video source](https://www.youtube.com/watch?v=ti3aC1m3rE8)_

In this section, we will talk more about Spark DataFrames. We already saw DataFrames, these are what we call df, where df is short for DataFrame.Now, I want to use the Parquet files that we created in the previous section. I will read them using:

```python
df = spark.read.parquet('fhvhv/2021/01/')
```

Since Parquet files contain schema information, they remember the types for each column. We don’t need to specify the schema explicitly because it is already stored in the file. We can print the schema using:

```python
df.printSchema()
```

You should look something like this:

```
root
 |-- hvfhs_license_num: string (nullable = true)
 |-- dispatching_base_num: string (nullable = true)
 |-- pickup_datetime: timestamp (nullable = true)
 |-- dropoff_datetime: timestamp (nullable = true)
 |-- PULocationID: integer (nullable = true)
 |-- DOLocationID: integer (nullable = true)
 |-- SR_Flag: string (nullable = true)
```

One advantage of Parquet files is that they are smaller. They store the schema and use more efficient ways of compressing the data. For example, instead of using multiple bytes like a CSV file with plain text, Parquet can store an integer in just four bytes per value.

**Select and filter**

So we have this DataFrame. What can we do with it? We can perform the usual operations we do with Pandas. If we only want to select a few columns, we use dataframe.select(), providing a list of the columns we want. For example, if we want to select pickup_datetime, off_datetime, pickup_location_id, and dropoff_location_id, we do it like this:

```python
df.select("pickup_datetime", "dropoff_datetime", "PULocationID", "DOLocationID")
```

We can also filter data. For example, we can use a filter statement to get only the records where a specific license number matches a given value:

```python
df.select("pickup_datetime", "dropoff_datetime", "PULocationID", "DOLocationID")\
    .filter(df.hvfhs_license_num == 'HV003')
```

At first, when executing this, nothing appears to happen. However, this is because Spark operates lazily. The computation isn’t executed immediately.

But now if we add show(), then spark will do something. Lets execute this:

```python
df.select("pickup_datetime", "dropoff_datetime", "PULocationID", "DOLocationID") \
    .filter(df.hvfhs_license_num == 'HV0003') \
    .show()
```

And you should see something like this:

  

[![b13](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b13.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b13.jpg)

  
  

In Spark, there is a distinction between operations that are executed right away and those that are deferred. These are called actions and transformations.

**Actions and Transformations**

Transformations are operations that do not execute right away. These operations create a sequence of transformations that Spark tracks internally. Spark does not execute anything immediately. Instead, it builds a logical plan of transformations. For example:

- Selecting columns
- Filtering data
- Applying functions to each column

However, when we call an action like .show(), Spark evaluates the entire transformation sequence and executes the computation. At this point, Spark processes all previous transformations and returns the result. Actions are eager and trigger execution. Examples of actions include:

- show(): Displays the DataFrame.
- take(5): Retrieves the first five records. Similar to head()
- write.csv() or write.parquet() – Triggers execution to write results to storage.

**Built-in functions available in Spark**

You might be wondering if this is the same as using SQL

```python
df.select("pickup_datetime", "dropoff_datetime", "PULocationID", "DOLocationID") \
    .filter(df.hvfhs_license_num == 'HV0003') 
```

In SQL, we can simply write:

```sql
SELECT pickup_datetime, dropoff_datetime, PULocationID, DOLocationID
FROM df
WHERE hvfhs_license_num == HV0003;
```

So why use Spark instead? Spark is more flexible and provides additional functionality, such as User-Defined Functions (UDFs).

Before diving into UDFs, let's first look at the built-in functions available in Spark.

In Spark, we have pyspark.sql.functions, a collection of functions that Spark provides. To use them, we typically import them as follows:

```python
from pyspark.sql import functions as F
```

Using F, we can explore available functions by typing F. and pressing Tab. There are many built-in functions.

One useful function is to_date(), which extracts only the date from a datetime column, discarding hours, minutes, and seconds.

We can also use withColumn() to create new columns. For example:

```python
df \
    .withColumn("pickup_date", F.to_date(df.pickup_datetime)) \
    .withColumn("dropoff_date", F.to_date(df.dropoff_datetime)) \
    .show()    
```

This code performs the following operations:

- Creates a new column named "pickup_date". Converts the "pickup_datetime" column into a date format using F.to_date().
    
- Creates another new column named "dropoff_date". Converts the "dropoff_datetime" column to a date format, similar to the previous step.
    

And you should see something like this:

  

[![b14](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b14.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b14.jpg)

  
  

If we use a column name that already exists, Spark overwrites it.

Finally, we can add a select():

```python
df \
    .withColumn("pickup_date", F.to_date(df.pickup_datetime)) \
    .withColumn("dropoff_date", F.to_date(df.dropoff_datetime)) \
    .select("pickup_date","dropoff_date","PULocationID","DOLocationID") \
    .show()    
```

And you should see something like this:

  

[![b15](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b15.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b15.jpg)

  
  

**User-Defined Functions**

Let's say we have a function that performs complex logic, something not easy to express with SQL. I'll call this function crazy_stuff.

For example, suppose it processes a column called dispatching_base_number. The logic could be:

- Extracts the numeric part of the string by removing the first character (base_num[1:]) and converts it to an integer (num).
    
- If the number is divisible by 7, return an ID starting with "S" followed by the number in hexadecimal format.
    
- If the number is divisible by 3, return an ID starting with "A" followed by the number in hexadecimal format.
    
- Otherwise, return an ID starting with "E" followed by the number in hexadecimal format.
    

```python
def crazy_stuff(base_num):

    num = int(base_num[1:])
    if num % 7 == 0:
        return f's/{num:03x}'
    elif num % 3 == 0:
        return f'a/{num:03x}'
    else:
        return f'e/{num:03x}'
```

Expressing this in SQL would be cumbersome, especially as the logic grows more complex with multiple conditions. The advantage of implementing this logic in Python is that it can live in a separate module and it can be unit-tested.

Now, to turn this Python function into a User-Defined Function (UDF) in PySpark:

```python
crazy_stuff_udf = F.udf(crazy_stuff, returnType=types.StringType())
```

Now we can use this udf:

```python
df \
    .withColumn('pickup_date', F.to_date(df.pickup_datetime)) \
    .withColumn('dropoff_date', F.to_date(df.dropoff_datetime)) \
    .withColumn('base_id', crazy_stuff_udf(df.dispatching_base_num)) \
    .select('base_id', 'pickup_date', 'dropoff_date', 'PULocationID', 'DOLocationID') \
    .show()
```

And you should see something like this:

  

[![b16](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b16.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b16.jpg)

  
  

Although this example is artificial, some business rules can be quite complex. SQL queries with multiple CASE statements can become unreadable. While SQL-based tools like dbt allow testing, Python makes it much easier.

This is how you perform transformations in PySpark using DataFrames. While many operations resemble SQL, the ability to define custom UDFs gives Spark an edge.

In the next section, we'll explore how to use SQL in Spark, but the key takeaway is that Spark allows you to combine SQL with complex Python logic, offering the best of both worlds. This flexibility is especially useful in machine learning workflows, where logic often resembles this crazy_stuff function.

### Preparing Taxi Data

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#preparing-taxi-data)

_[Video source](https://www.youtube.com/watch?v=CI3P4tAtru4)_

**1: Downloading the data**

We are going to use this bash script to download Yellow and Green Taxi Data. We save the code in a file called script.sh

```shell
set -e

TAXI_TYPE=$1 # "yellow"
YEAR=$2 # 2020

URL_PREFIX="https://github.com/DataTalksClub/nyc-tlc-data/releases/download"

for MONTH in {1..12}; do
  FMONTH=`printf "%02d" ${MONTH}`

  URL="${URL_PREFIX}/${TAXI_TYPE}/${TAXI_TYPE}_tripdata_${YEAR}-${FMONTH}.csv.gz"

  LOCAL_PREFIX="data/raw/${TAXI_TYPE}/${YEAR}/${FMONTH}"
  LOCAL_FILE="${TAXI_TYPE}_tripdata_${YEAR}_${FMONTH}.csv.gz"
  LOCAL_PATH="${LOCAL_PREFIX}/${LOCAL_FILE}"

  echo "downloading ${URL} to ${LOCAL_PATH}"
  mkdir -p ${LOCAL_PREFIX}
  wget ${URL} -O ${LOCAL_PATH}

done
```

The script automates the process of downloading NYC taxi trip data for a given taxi type and year, saving each month’s data in an organized folder structure.

Then we run the script in the terminal, for example :

```
bash script.sh yellow 2020
```

**2: Reading CSVs and converting to parquet**

- Green taxi code: [`green_taxi_data.py`](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/code/green_taxi_data.py)
- Yellow taxi code: [`yellow_taxi_data.py`](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/code/yellow_taxi_data.py)

To read the csv and convert them to parquet, we will use "green_taxi_data.py" script:

```python
import pyspark
from pyspark.sql import SparkSession
from pyspark.sql import types

spark = SparkSession.builder.master("local[*]").appName('test').getOrCreate()

green_schema = types.StructType([
    types.StructField("VendorID", types.IntegerType(), True),
    types.StructField("lpep_pickup_datetime", types.TimestampType(), True),
    types.StructField("lpep_dropoff_datetime", types.TimestampType(), True),
    types.StructField("store_and_fwd_flag", types.StringType(), True),
    types.StructField("RatecodeID", types.IntegerType(), True),
    types.StructField("PULocationID", types.IntegerType(), True),
    types.StructField("DOLocationID", types.IntegerType(), True),
    types.StructField("passenger_count", types.IntegerType(), True),
    types.StructField("trip_distance", types.DoubleType(), True),
    types.StructField("fare_amount", types.DoubleType(), True),
    types.StructField("extra", types.DoubleType(), True),
    types.StructField("mta_tax", types.DoubleType(), True),
    types.StructField("tip_amount", types.DoubleType(), True),
    types.StructField("tolls_amount", types.DoubleType(), True),
    types.StructField("ehail_fee", types.DoubleType(), True),
    types.StructField("improvement_surcharge", types.DoubleType(), True),
    types.StructField("total_amount", types.DoubleType(), True),
    types.StructField("payment_type", types.IntegerType(), True),
    types.StructField("trip_type", types.IntegerType(), True),
    types.StructField("congestion_surcharge", types.DoubleType(), True)
])


years = [2020,2021]

for year in years:
    for month in range(1, 13):
        print(f'processing data for {year}/{month}')

        input_path = f'data/raw/green/{year}/{month:02d}/'
        output_path = f'data/pq/green/{year}/{month:02d}/'

        df_green = spark.read.option("header", "true").schema(green_schema).csv(input_path)

        df_green.repartition(4).write.parquet(output_path)
```

This script uses PySpark to process and transform raw CSV files containing green taxi trip data into Parquet format. It creates a StructType schema (green_schema) that defines the expected structure of the dataset, including column names and data types. Loop through Years and Months. Constructs input (input_path) and output (output_path) file paths.

Reads the CSV file from the input_path, applying the green_schema and writes the transformed data to Parquet format in output_path

We can run the script in the /opt/spark directory, for example :

```
spark-submit green_taxi_data.py
```

After a couple of minutes, you should see something like this:

  

[![b17](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b17.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b17.jpg)

  

Finally, we can run the script for yellow taxi data:

```
spark-submit yellow_taxi_data.py
```

**3: Reading parquet with pyspark**

Now open a new PySpark Shell:

```
pyspark
```

and type for example:

```python
df_green = spark.read.parquet('data/pq/green/*/*')

df_green \
    .select('lpep_pickup_datetime', 'lpep_dropoff_datetime', 'PULocationID', 'DOLocationID', 'trip_distance') \
    .show()
```

You should see something like this:

  

[![b18](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b18.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b18.jpg)

  

### SQL with Spark

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#sql-with-spark)

_[Video source](https://www.youtube.com/watch?v=uAlp2VuZZPY)_

In this section, we will talk about Spark SQL. What we will do is take the query from module 4 about revenue calculation and use Spark to execute it. We will use the data prepared in the previous section.

**1: Loading the data**

We want to load the green and yellow taxi datasets, which contain taxi trip data for 2020 and 2021. We will use spark.read.parquet since the data is already stored in Parquet format. To load both 2020 and 2021 datasets, we can use a wildcard (*). Since the data has a nested structure (organized by year and month),For example:

```python
df_green = spark.read.parquet('data/pq/green/*/*')

df_yellow = spark.read.parquet('data/pq/yellow/*/*')
```

**2: Finding common columns**

To unify the data, we will select only the common columns between both datasets.

First, we will rename the pickup and drop-off time columns in each dataset so they match:

```python
df_green = df_green \
    .withColumnRenamed('lpep_pickup_datetime', 'pickup_datetime') \
    .withColumnRenamed('lpep_dropoff_datetime', 'dropoff_datetime')

df_yellow = df_yellow \
    .withColumnRenamed('tpep_pickup_datetime', 'pickup_datetime') \
    .withColumnRenamed('tpep_dropoff_datetime', 'dropoff_datetime')    
```

Then we will find the common columns:

```python
common_colums = []

yellow_columns = set(df_yellow.columns)

for col in df_green.columns:
    if col in yellow_columns:
        common_colums.append(col)
```

**3: Combining yellow and green data**

Next, we will add a new column, service_type, to distinguish records from green and yellow taxi data:

```python
from pyspark.sql import functions as F

df_green_sel = df_green \
    .select(common_colums) \
    .withColumn('service_type', F.lit('green'))

df_yellow_sel = df_yellow \
    .select(common_colums) \
    .withColumn('service_type', F.lit('yellow'))
```

Now, we can combine both datasets using unionAll:

```python
df_trips_data = df_green_sel.unionAll(df_yellow_sel)
```

To verify the merge, we can perform a simple groupBy operation:

```python
df_trips_data.groupBy('service_type').count().show()
```

You should see something like this:

  

[![b19](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b19.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b19.jpg)

  

**4: Querying with SQL**

Now we can see how to use SQL for querying this data. First, we need to tell Spark that this DataFrame is a table. For that, we use:

```python
df_trips_data.registerTempTable('trips_data')
```

For example, let's count records by service type:

```python
spark.sql("""
SELECT
    service_type,
    count(1)
FROM
    trips_data
GROUP BY 
    service_type
""").show()
```

The result should be exactly the same as we had before:

  

[![b20](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b20.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b20.jpg)

  

Now let's execute this query from module 4:

```python
df_result = spark.sql("""
SELECT 
    -- Reveneue grouping 
    PULocationID AS revenue_zone,
    date_trunc('month', pickup_datetime) AS revenue_month, 
    service_type, 

    -- Revenue calculation 
    SUM(fare_amount) AS revenue_monthly_fare,
    SUM(extra) AS revenue_monthly_extra,
    SUM(mta_tax) AS revenue_monthly_mta_tax,
    SUM(tip_amount) AS revenue_monthly_tip_amount,
    SUM(tolls_amount) AS revenue_monthly_tolls_amount,
    SUM(improvement_surcharge) AS revenue_monthly_improvement_surcharge,
    SUM(total_amount) AS revenue_monthly_total_amount,
    SUM(congestion_surcharge) AS revenue_monthly_congestion_surcharge,

    -- Additional calculations
    AVG(passenger_count) AS avg_montly_passenger_count,
    AVG(trip_distance) AS avg_montly_trip_distance
FROM
    trips_data
GROUP BY
    1, 2, 3
""")
```

We can show the results with:

```python
df_result \
    .select('revenue_zone', 'revenue_month', 'service_type', 'revenue_monthly_total_amount', 'avg_montly_passenger_count') \
    .show()
```

  

[![b21](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b21.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b21.jpg)

  

**5: Saving the result**

Finally we can save the result:

```python
df_result.coalesce(1).write.parquet('data/report/revenue/', mode='overwrite')
```

## Spark Internals

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#spark-internals)

### Anatomy of a Spark Cluster

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#anatomy-of-a-spark-cluster)

_[Video source](https://www.youtube.com/watch?v=68CipcZt7ZA)_

So far, we've been running everything locally. In this setup, we have a local environment where the executor, responsible for running Spark jobs, operates on a single machine. This is known as a local setup.

When configuring a Spark context, we specify the master node. For example, we set:

```python
spark = SparkSession.builder.master("local[*]").appName('test').getOrCreate()
```

This creates a local Spark cluster. However, in this section, we will discuss how Spark works in a real distributed cluster setup and introduce some concepts we haven’t covered yet.

**Submitting Jobs to a Spark Cluster**

Typically, you write a Spark script in Python, Scala, or Java. This script can be executed from your laptop or submitted through a scheduler like Airflow. Let’s consider the case where you submit a job from your laptop.

Your script contains Spark code, which needs to be executed on a Spark cluster. In a cluster setup, there is a central machine called the Spark Master, responsible for coordinating jobs. When you submit a Spark job, it is sent to the Spark Master using the `spark-submit` command.

The Spark Master has a web UI, usually accessible on port `4040`, which allows you to monitor job execution. Once a job is submitted, the Spark Master assigns tasks to executors, which are the machines that perform the actual computation.

  

[![b22](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b22.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b22.jpg)

  

**How Executors Process Data**

Executors first pull data, process it, and then save the results. Imagine a Spark DataFrame consisting of multiple partitions—each partition corresponds to a file (e.g., Parquet files).

When a job is submitted, the Spark Master assigns partitions to different executors:

- Each executor processes its assigned partition.
    
- If an executor fails, the Spark Master reassigns its tasks to another executor.
    

Previously, Hadoop’s HDFS was widely used for storing data. In HDFS, files are distributed across multiple machines with redundancy, ensuring data availability even if some nodes fail.

However, with cloud-based storage solutions like AWS S3 and Google Cloud Storage, HDFS has become less popular. Since cloud storage and Spark clusters are usually located in the same data center, pulling data from storage is fast, making HDFS less necessary.

To summarize, a Spark cluster consists of:

- Driver: The entity that submits a job. It could be your laptop, an Airflow task, or another system running spark-submit.
    
- Master: Coordinates job execution, assigns tasks to executors, and monitors their status.
    
- Executors: Perform actual computations, processing partitions of data and writing results back to storage.
    

### GroupBy in Spark

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#groupby-in-spark)

In this section, we will dive into the `GROUP BY` operation and we will show how Spark implements it. A few sections ago, we executed a query that grouped data by revenue zone, revenue month, and service type while performing various calculations. Let's take a closer look at that query and explain how it works internally in Spark.

```sql
df_green_revenue = spark.sql("""
SELECT 
    date_trunc('hour', lpep_pickup_datetime) AS hour, 
    PULocationID AS zone,

    SUM(total_amount) AS amount,
    COUNT(1) AS number_records
FROM
    green
WHERE
    lpep_pickup_datetime >= '2020-01-01 00:00:00'
GROUP BY
    1, 2  
""")
```

This query will output the total revenue and amount of trips per hour per zone.

**Understanding Spark’s GROUP BY Execution**

Let’s assume we have multiple partitions. Each executor processes one partition at a time.

1. Initial Grouping: Each executor groups data within its partition by hour (HOUR) and zone (ZONE).
    
2. Intermediate Results: After grouping, each partition produces temporary results. At this point, each partition has grouped its own data, but Spark needs to combine these results into a final grouped dataset.
    
3. Reshuffling and Merging: The next step is reshuffling, where Spark redistributes records so that all data with the same key (HOUR, ZONE) ends up in the same partition. Internally, this reshuffling is implemented using External Merge Sort, which sorts records across distributed partitions. Once reshuffled, Spark performs a final aggregation within each partition
    

  

[![b23](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b23.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b23.jpg)

  

## Running Spark in the Cloud

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#running-spark-in-the-cloud)

### Connecting to Google Cloud Storage

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#connecting-to-google-cloud-storage)

_[Video source](https://www.youtube.com/watch?v=Yyz293hBVcQ)_

In this section, we are going to run spark locally and read the files from a bucket in google cloud storage.

**Uploading the files to GCS**

To upload the pq/ folder, make sure to use the following command in spark/data directory:

```
gsutil -m cp -r pq/ gs://your-bucket-name/pq   
```

- gsutil: is a command-line tool for interacting with Google Cloud Storage and manage storage bucket
    
- -r: (recursive) ensures all files in the folder are uploaded
    
- -m: (multi-threaded) enables parallel uploads for efficiency
    
- your-bucket-name: Name of the bucket. Make sure to use your bucket name
    

After a few minutes, you can check GCP:

  

[![b24](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b24.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b24.jpg)

  

**Downloading the Cloud Storage Connector for Hadoop**

To enable Spark to read from Google Cloud Storage, we need to download the Cloud Storage Connector for Hadoop. Even though we're not directly using Hadoop, Spark requires this library to establish a connection.

We need the Cloud Storage Connector for Hadoop 3. The required library is hosted on Google Cloud Storage, so we can download it using gsutil. Create a lib folder in your spark directory and run the following command from it:

```
gsutil cp gs://hadoop-lib/gcs/gcs-connector-hadoop3-2.2.5.jar gcs-connector-hadoop3-2.2.5.jar
```

- gsutil cp copies the file from the remote Google Cloud Storage location to our local system.

**Configuring Spark to Use the Cloud Storage Connector**

To read the files stored in the bucket, we will use "spark_bucket.py" script. We can run the script in the /opt/spark directory, for example :

```
spark-submit --jars /opt/spark/lib/gcs-connector-hadoop3-2.2.5.jar spark_bucket.py    
```

spark_bucket.py:

```python
from pyspark.sql import SparkSession
from pyspark.conf import SparkConf
from pyspark.context import SparkContext

credentials_location = '/opt/spark/google/google_credentials.json'

conf = SparkConf() \
    .setMaster('local[*]') \
    .setAppName('test') \
    .set("spark.jars", "/opt/spark/lib/gcs-connector-hadoop3-2.2.5.jar") \
    .set("spark.hadoop.google.cloud.auth.service.account.enable", "true") \
    .set("spark.hadoop.google.cloud.auth.service.account.json.keyfile", credentials_location)


sc = SparkContext(conf=conf)

hadoop_conf = sc._jsc.hadoopConfiguration()

hadoop_conf.set("fs.AbstractFileSystem.gs.impl",  "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFS")
hadoop_conf.set("fs.gs.impl", "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem")
hadoop_conf.set("fs.gs.auth.service.account.json.keyfile", credentials_location)
hadoop_conf.set("fs.gs.auth.service.account.enable", "true")

spark = SparkSession.builder \
    .config(conf=sc.getConf()) \
    .getOrCreate()

df_green = spark.read.parquet('gs://444903_spark_bucket/pq/green/*/*')

print(df_green.count())
```

**Setting Up the Spark Configuration**

```python
    .set("spark.jars", "/opt/spark/lib/gcs-connector-hadoop3-2.2.5.jar") \
    .set("spark.hadoop.google.cloud.auth.service.account.enable", "true") \
    .set("spark.hadoop.google.cloud.auth.service.account.json.keyfile", credentials_location)
```

We still run Spark in local mode, and the application name remains test. However, we now need to specify:

- spark.jars: Points to the JAR file containing the Cloud Storage Connector.
    
- spark.hadoop.google.cloud.auth.service.account.enable: Enables service account authentication.
    
- spark.hadoop.google.cloud.auth.service.account.json.keyfile: Specifies the path to the credentials file.
    

**Creating a Spark Context**

```python
sc = SparkContext(conf=conf)
```

**Configure Hadoop for Google Cloud Storage**

```python
hadoop_conf = sc._jsc.hadoopConfiguration()
hadoop_conf.set("fs.AbstractFileSystem.gs.impl",  "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFS")
hadoop_conf.set("fs.gs.impl", "com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem")
hadoop_conf.set("fs.gs.auth.service.account.json.keyfile", credentials_location)
hadoop_conf.set("fs.gs.auth.service.account.enable", "true")
```

- Hadoop needs to be configured to understand Google Cloud Storage (gs:// paths).
    
- These settings tell Hadoop to use the GoogleHadoopFileSystem implementation and authenticate using the service account.
    

**Create a Spark Session**

```python
spark = SparkSession.builder \
    .config(conf=sc.getConf()) \
    .getOrCreate()
```

- Initializes a SparkSession, which allows working with DataFrames.
    
- It inherits the configuration from the previously created SparkContext.
    

**Read Data from Google Cloud Storage**

```python
df_green = spark.read.parquet('gs://444903_spark_bucket/pq/green/*/*')
```

**Count the Rows**

```python
print(df_green.count())
```

Counts the number of records in the Parquet dataset and prints the result:

```
2304517   
```

### Creating a Local Spark Cluster

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#creating-a-local-spark-cluster)

_[Video source](https://www.youtube.com/watch?v=HXBwSlXo5IA)_

Previously, we covered how to connect a local Spark instance to Google Cloud Storage. Now, we’ll focus on setting up a local Spark cluster, even though the main goal is to run Spark in the cloud.

**Spark standalone master and workers**

At the beginning of this lesson we saw how to create a Spark session from a notebook, like so:

```python
spark = SparkSession.builder \
   .master("local[*]") \
   .appName('test') \
   .getOrCreate()
```

This code will create a local cluster, but once the notebook kernel is shut down, the cluster will disappear. We will now see how to create a Spark cluster in Standalone Mode so that the cluster can remain running even after we stop running our notebooks.

Simply go to your Spark install directory from a terminal and run the following command:

```
./sbin/start-master.sh
```

You should now be able to open the main Spark dashboard by browsing to localhost:8080. At the very top of the dashboard the URL for the dashboard should appear:

  

[![b25](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b25.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b25.jpg)

  

You may note that in the Spark dashboard there aren't any workers listed. Similarly to how we created the Spark master, we can run a worker from the command line by running the following command:

```
./sbin/start-worker.sh spark://DESKTOP-GDVELUL.:7077     
```

Or more generally:

```
./sbin/start-worker.sh <master-spark-URL>
```

Now you should see the worker in the spark UI:

  

[![b26](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b26.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b26.jpg)

  

**Parameterizing our script for Spark**

So far we've hard-coded many of the values such as folders and dates in our code, but with a little bit of tweaking we can make our code so that it can receive parameters from Spark

code: [`pyspark_sql2.py`](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/code/pyspark_sql2.py)

```python
import argparse
from pyspark.sql import SparkSession
from pyspark.sql import functions as F


parser = argparse.ArgumentParser()

parser.add_argument('--input_green', required=True)
parser.add_argument('--input_yellow', required=True)
parser.add_argument('--output', required=True)

args = parser.parse_args()

input_green = args.input_green
input_yellow = args.input_yellow
output = args.output


spark = SparkSession.builder \
    .appName('test') \
    .getOrCreate()

df_green = spark.read.parquet(input_green)

df_green = df_green \
    .withColumnRenamed('lpep_pickup_datetime', 'pickup_datetime') \
    .withColumnRenamed('lpep_dropoff_datetime', 'dropoff_datetime')

df_yellow = spark.read.parquet(input_yellow)


df_yellow = df_yellow \
    .withColumnRenamed('tpep_pickup_datetime', 'pickup_datetime') \
    .withColumnRenamed('tpep_dropoff_datetime', 'dropoff_datetime')


common_colums = [
    'VendorID',
    'pickup_datetime',
    'dropoff_datetime',
    'store_and_fwd_flag',
    'RatecodeID',
    'PULocationID',
    'DOLocationID',
    'passenger_count',
    'trip_distance',
    'fare_amount',
    'extra',
    'mta_tax',
    'tip_amount',
    'tolls_amount',
    'improvement_surcharge',
    'total_amount',
    'payment_type',
    'congestion_surcharge'
]



df_green_sel = df_green \
    .select(common_colums) \
    .withColumn('service_type', F.lit('green'))

df_yellow_sel = df_yellow \
    .select(common_colums) \
    .withColumn('service_type', F.lit('yellow'))


df_trips_data = df_green_sel.unionAll(df_yellow_sel)

df_trips_data.registerTempTable('trips_data')


df_result = spark.sql("""
SELECT 
    -- Reveneue grouping 
    PULocationID AS revenue_zone,
    date_trunc('month', pickup_datetime) AS revenue_month, 
    service_type, 

    -- Revenue calculation 
    SUM(fare_amount) AS revenue_monthly_fare,
    SUM(extra) AS revenue_monthly_extra,
    SUM(mta_tax) AS revenue_monthly_mta_tax,
    SUM(tip_amount) AS revenue_monthly_tip_amount,
    SUM(tolls_amount) AS revenue_monthly_tolls_amount,
    SUM(improvement_surcharge) AS revenue_monthly_improvement_surcharge,
    SUM(total_amount) AS revenue_monthly_total_amount,
    SUM(congestion_surcharge) AS revenue_monthly_congestion_surcharge,

    -- Additional calculations
    AVG(passenger_count) AS avg_montly_passenger_count,
    AVG(trip_distance) AS avg_montly_trip_distance
FROM
    trips_data
GROUP BY
    1, 2, 3
""")


df_result.coalesce(1) \
    .write.parquet(output, mode='overwrite')
```

**Submitting Spark jobs with Spark submit**

spark-submit is a command-line tool used to submit Apache Spark applications to a cluster. It allows you to configure various parameters, such as the deployment mode, memory allocation, and dependencies, making it the standard way to run Spark jobs.

The basic usage is as follows:

```
spark-submit \
    --master="spark://<URL>" \
    my_script.py \
        --input_green=data/pq/green/2020/*/ \
        --input_yellow=data/pq/yellow/2020/*/ \
        --output=data/report-2020
```

In this case for example:

```

spark-submit \
    --master="spark://DESKTOP-GDVELUL.:7077" \
    pyspark_sql2.py \
        --input_green=data/pq/green/2021/*/ \
        --input_yellow=data/pq/yellow/2021/*/ \
        --output=data/report/report-2021
```

After a few minutes, you can check the report:

```
root@DESKTOP-GDVELUL:/opt/spark/data/report# ls

report-2021  revenue
```

**Shutting down worker and master**

After you're done running Spark in standalone mode, you will need to manually shut it down. Simply run:

```
./sbin/stop-worker.sh
```

and:

```
./sbin/stop-master.sh
```

### Setting up a Dataproc Cluster

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#setting-up-a-dataproc-cluster)

_[Video source](https://www.youtube.com/watch?v=osAiAYahvh8)_

Google Cloud Dataproc is a managed service for running Apache Spark, Apache Hadoop, Apache Flink, and other open-source big data frameworks on Google Cloud. It allows you to process and analyze large datasets efficiently by leveraging Google Cloud’s infrastructure.

Google handles cluster provisioning, scaling, and management, so you don't need to manually configure or maintain Hadoop/Spark clusters.

You may access Dataproc from the GCP dashboard and typing dataproc on the search bar. The first time you access it you will have to enable the API.

- Click on CREATE CLUSTER --> Cluster on Computer Engine
- Give it a name
- Choose the same region as your bucket.
- Select cluster type
- Click on CREATE

You may leave all other optional settings with their default values. After you click on Create, it will take a few seconds to create the cluster.

In the image below you may find some example values for creating a simple cluster.

  

[![b27](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b27.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b27.jpg)

  

**Running a job with the web UI**

In Dataproc's Clusters page, choose your cluster and on the Cluster details page, click on Submit job.

- Under Job type choose PySpark
- Under Main Python file write the path to your script (you may upload the script to your bucket and then copy the URL).
- Under Arguments we must specify where the data comes from and where to save the report:
    - --input_green=gs://444903_spark_bucket/pq/green/2021/*/
    - --input_yellow=gs://444903_spark_bucket/pq/yellow/2021/*/
    - --output=gs://444903_spark_bucket/report/report-2021

  

[![b28](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b28.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b28.jpg)

  

Make sure that your script does not specify the master cluster! Your script should take the connection details from Dataproc; make sure it looks something like this:

```python
spark = SparkSession.builder \
    .appName('test') \
    .getOrCreate()
```

After a few minutes, head over to the bucket and check the report:

  

[![b29](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b29.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b29.jpg)

  

We successfully submitted our job to the cluster we created on Google Cloud Platform. It computed something and saved the result to this location. We did it through the web interface, which is not convenient. We wouldn't do this from Airflow, for example. That's why there is a different way of doing this, and you can do it through Google SDK.

**Running a job with the gcloud SDK**

Before you can submit jobs with the SDK, you will need to grant permissions to the Service Account we've been using so far. Go to IAM & Admin and edit your Service Account so that the Dataproc Administrator role is added to it.

We can now submit a job from the command line, like this:

```
gcloud dataproc jobs submit pyspark \
    --cluster=<your-cluster-name> \
    --region=europe-west6 \
    gs://<url-of-your-script> \
    -- \
        --param1=<your-param-value> \
        --param2=<your-param-value>
```

For example:

```
gcloud dataproc jobs submit pyspark \
    --cluster=zoomcamp-spark \
    --region=us-central1 \
    gs://444903_spark_bucket/code/pyspark_sql2.py \
    -- \
        --input_green=gs://444903_spark_bucket/pq/green/2020/*/ \
        --input_yellow=gs://444903_spark_bucket/pq/yellow/2020/*/ \
        --output=gs://444903_spark_bucket/report/report-2020
```

  

[![b30](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b30.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b30.jpg)

  

After a few minutes, head over to the bucket and check the report:

  

[![b31](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b31.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b31.jpg)

  

You may now stop the cluster on the Cluster details page

### Connecting Spark to Big Query

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/README.md#connecting-spark-to-big-query)

_[Video source](https://www.youtube.com/watch?v=HIm2BOj8C0Q)_

In the previous section, we covered how to create a Spark cluster on GCP using Dataproc. We successfully set up a cluster, submitted a job, and viewed the results in Google Cloud Storage. However, storing results in Cloud Storage isn't always the most convenient option. Sometimes, we need to write data directly to BigQuery, our data warehouse.

**Preparing the python file**

Upload pyspark_sql_bigquery.py to your bucket

- code: [`pyspark_sql_bigquery.py`](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/code/pyspark_sql_bigquery.py)
    
- Replace 'dataproc-temp-us-central1-228363371131-am2fgpcj' with your dataproc temp bucket
    

```python
import argparse
from pyspark.sql import SparkSession
from pyspark.sql import functions as F


parser = argparse.ArgumentParser()

parser.add_argument('--input_green', required=True)
parser.add_argument('--input_yellow', required=True)
parser.add_argument('--output', required=True)

args = parser.parse_args()

input_green = args.input_green
input_yellow = args.input_yellow
output = args.output


spark = SparkSession.builder \
    .appName('test') \
    .getOrCreate()

spark.conf.set('temporaryGcsBucket', 'dataproc-temp-us-central1-228363371131-am2fgpcj')

df_green = spark.read.parquet(input_green)

df_green = df_green \
    .withColumnRenamed('lpep_pickup_datetime', 'pickup_datetime') \
    .withColumnRenamed('lpep_dropoff_datetime', 'dropoff_datetime')

df_yellow = spark.read.parquet(input_yellow)


df_yellow = df_yellow \
    .withColumnRenamed('tpep_pickup_datetime', 'pickup_datetime') \
    .withColumnRenamed('tpep_dropoff_datetime', 'dropoff_datetime')


common_colums = [
    'VendorID',
    'pickup_datetime',
    'dropoff_datetime',
    'store_and_fwd_flag',
    'RatecodeID',
    'PULocationID',
    'DOLocationID',
    'passenger_count',
    'trip_distance',
    'fare_amount',
    'extra',
    'mta_tax',
    'tip_amount',
    'tolls_amount',
    'improvement_surcharge',
    'total_amount',
    'payment_type',
    'congestion_surcharge'
]



df_green_sel = df_green \
    .select(common_colums) \
    .withColumn('service_type', F.lit('green'))

df_yellow_sel = df_yellow \
    .select(common_colums) \
    .withColumn('service_type', F.lit('yellow'))


df_trips_data = df_green_sel.unionAll(df_yellow_sel)

df_trips_data.registerTempTable('trips_data')


df_result = spark.sql("""
SELECT 
    -- Reveneue grouping 
    PULocationID AS revenue_zone,
    date_trunc('month', pickup_datetime) AS revenue_month, 
    service_type, 

    -- Revenue calculation 
    SUM(fare_amount) AS revenue_monthly_fare,
    SUM(extra) AS revenue_monthly_extra,
    SUM(mta_tax) AS revenue_monthly_mta_tax,
    SUM(tip_amount) AS revenue_monthly_tip_amount,
    SUM(tolls_amount) AS revenue_monthly_tolls_amount,
    SUM(improvement_surcharge) AS revenue_monthly_improvement_surcharge,
    SUM(total_amount) AS revenue_monthly_total_amount,
    SUM(congestion_surcharge) AS revenue_monthly_congestion_surcharge,

    -- Additional calculations
    AVG(passenger_count) AS avg_montly_passenger_count,
    AVG(trip_distance) AS avg_montly_trip_distance
FROM
    trips_data
GROUP BY
    1, 2, 3
""")


df_result.write.format('bigquery') \
    .option('table', output) \
    .save()
```

**Submitting Spark job with Spark submit**

First make sure you have created a new dataset in bigquery, for example in my case "spark_trips"

We can now submit a job from the command line, like this:

```
gcloud dataproc jobs submit pyspark \
    --cluster=zoomcamp-spark \
    --region=<your-region> \
    gs://<your-bucket>/code/pyspark_sql_bigquery.py \
    -- \
        --input_green=gs://<your-bucket>/pq/green/2020/*/ \
        --input_yellow=gs://<your-bucket>/pq/yellow/2020/*/ \
        --output=<your-dataset>.reports-2020
```

For example:

```
gcloud dataproc jobs submit pyspark \
    --cluster=zoomcamp-spark \
    --region=us-central1 \
    gs://444903_spark_bucket/code/pyspark_sql_bigquery.py \
    -- \
        --input_green=gs://444903_spark_bucket/pq/green/2020/*/ \
        --input_yellow=gs://444903_spark_bucket/pq/yellow/2020/*/ \
        --output=spark_trips.reports-2020
```

**Check BigQuery**

Head over to BigQuery and now you can query the table generated:

  

[![b32](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/5_Batch-Processing-Spark/images/b32.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/5_Batch-Processing-Spark/images/b32.jpg)
