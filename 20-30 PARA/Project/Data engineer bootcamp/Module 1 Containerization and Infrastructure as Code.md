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


[data-engineering-zoomcamp-notes/1\_Containerization-and-Infrastructure-as-Code at main · ManuelGuerra1987/data-engineering-zoomcamp-notes · GitHub](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code)

```embed
title: "data-engineering-zoomcamp-notes/1_Containerization-and-Infrastructure-as-Code at main · ManuelGuerra1987/data-engineering-zoomcamp-notes"
image: "https://opengraph.githubassets.com/1429e8b6c45605b84f9cefd26df6796346617de46fbd0e0e01af83fcc4d953b4/ManuelGuerra1987/data-engineering-zoomcamp-notes"
description: "Detailed notes and homeworks from 2025 Data Engineering Zoomcamp by Datatalks.Club - ManuelGuerra1987/data-engineering-zoomcamp-notes"
url: "https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code"
```

# Containerization and Infrastructure as Code



### Table of contents

- [Introduction](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#introduction)
- [Docker](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#docker)
- [Creating a simple data pipeline in Docker](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#creating-a-simple-data-pipeline-in-docker)
- [Running Postgres in a container](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#running-postgres-in-a-container)
- [Docker Networking and Port Mapping](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#docker-networking-and-port-mapping)
- [Generating postgres schema](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#generating-postgres-schema)
- [Ingesting data to Postgres with Python](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#ingesting-data-to-postgres-with-python)
- [Connecting pgAdmin and Postgres with Docker networking](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#connecting-pgAdmin-and-postgres-with-docker-networking)
- [Parameterizing the script](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#parameterizing-the-script)
- [Dockerizing the ingestion script](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#dockerizing-the-ingestion-script)
- [Running Postgres and pgAdmin with Docker-compose](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#running-postgres-and-pgAdmin-with-docker-compose)
- [Google Cloud Platform](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#google-cloud-platform)
- [Terraform](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#terraform)
- [Creating GCP infrastructure with Terraform](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#creating-GCP-infrastructure-with-terraform)

## Introduction

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#introduction)

**Data Engineering** is the discipline of designing, building, and maintaining the systems and infrastructure needed to collect, process, store, and analyze large volumes of data. It focuses on creating the foundation that enables data scientists, analysts, and other stakeholders to work with clean, organized, and reliable data. Key Responsibilities:

- Data Pipelines: Building pipelines to move data from various sources (e.g., databases, APIs, IoT devices) to centralized storage systems like data warehouses or data lakes.
    
- Data Transformation: Cleaning, transforming, and structuring raw data into formats suitable for analysis or machine learning.
    
- Data Storage: Designing scalable and efficient storage solutions, often using cloud services like AWS, Google Cloud, or Azure
    

A **data pipeline** is a series of processes and tools that automate the movement, transformation, and processing of data from one system to another. It allows raw data to be collected from various sources, cleaned, transformed, and made ready for analysis or storage in a target destination like a database, data warehouse, or data lake. For example, reading a CSV file, transforming the data somehow and storing it as a table in a PostgreSQL database.

[![pipeline](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/1_Containerization-and-Infrastructure-as-Code/images/pipeline.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/1_Containerization-and-Infrastructure-as-Code/images/pipeline.jpg)

## Docker

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#docker)

**Docker** is an open-source platform that allows developers to build, package, and deploy applications in isolated environments called containers. It simplifies application deployment by ensuring consistency across different environments (e.g., development, testing, production). With Docker, you can run applications and all their dependencies in a lightweight and portable environment.

A **Docker image** is a lightweight, standalone, and executable software package that includes everything needed to run an application: Code, Runtime, Libraries, Environment variables, Configuration files.

Docker images are immutable and serve as blueprints for creating Docker containers. For example, you can use an image to run a web server or database.

A **Dockerfile** is a text file that contains a set of instructions to build a Docker image. Each line in a Dockerfile represents a step in the process of creating the image, such as:

- Specifying a base image (e.g., FROM ubuntu:latest)
- Copying files into the image
- Installing dependencies
- Configuring environment variables

A **Docker container** is a running instance of a Docker image. It is an isolated and portable unit that runs the application defined in the image. Containers share the host system's kernel but have their own filesystem, network, and process space.

Containers are lightweight compared to virtual machines, as they do not require an entire operating system to run.

Summary:

- Docker: The platform for containerizing applications.
- Docker Image: The blueprint for a container (read-only).
- Dockerfile: The recipe to build a Docker image.
- Docker Container: A running instance of a Docker image (isolated environment for the app).

Docker provides the following advantages:

- Reproducibility
- Local experimentation
- Integration tests (CI/CD)
- Running pipelines on the cloud (AWS Batch, Kubernetes jobs)
- Spark (analytics engine for large-scale data processing)
- Serverless (AWS Lambda, Google functions)

## Creating first container

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#creating-first-container)

Lets create an interactive container using the Python 3.9 image, providing a terminal where you can run Python commands

In a new terminal run the following command:

```
docker run -it python:3.9
```

**docker run:** This creates and starts a new Docker container from the specified image.

**-i (interactive):** Keeps the standard input (stdin) of the container open, allowing you to interact with it.

**-t:** Allocates a pseudo-TTY (a terminal), making the interaction more user-friendly

**python:3.9:** Specifies the Docker image to use, in this case, the official Python image with version 3.9

You should get the python prompt:

```
>>>
```

and write any python code inside the container

When you run this command, Docker will:

Pull the python:3.9 image from Docker Hub if it's not already available locally. Start a container using this image. Launch an interactive Python 3.9 shell (REPL) inside the container, allowing you to execute Python commands directly. This is commonly used for testing or experimenting with Python in an isolated environment.

## Creating a simple data pipeline in Docker


Let's create an example pipeline. We will create a dummy pipeline.py Python script that receives an argument and prints it.

```python
import sys
import pandas 

day = sys.argv[1]

print(f'job finished successfully for day {day}')
```

We can run this script for example with 'python pipeline.py 5' and it should print:

```
job finished successfully for day 5
```

Let's containerize it by creating a Docker image. Create the following Dockerfile file:

```dockerfile
# base Docker image that we will build on
FROM python:3.9.1

# set up our image by installing prerequisites; pandas in this case
RUN pip install pandas

# set up the working directory inside the container
WORKDIR /app

# copy the script to the container. 1st name is source file, 2nd is destination
COPY pipeline.py pipeline.py

# define what to do first when the container runs in this example, we will just run the script
ENTRYPOINT ["python", "pipeline.py"]
```

**WORKDIR /app :** This sets the default directory where all subsequent commands will be executed. Inside the container, this directory will be /app

**ENTRYPOINT ["python", "pipeline.py"]:** This defines the default action the container will perform when it starts. In this case, it runs the pipeline.py script using Python.

Let's build the image:

```
docker build -t zoomcampw1 
```

We can now run the container and pass an argument to it, so that our pipeline will receive it:

```
docker run -it zoomcampw1 some_number
```

You should get the same output you did when you ran the pipeline script by itself:

```
job finished successfully for day = <some_number>
```

## Running Postgres in a container



You can run a containerized version of Postgres that doesn't require any installation steps. You only need to provide a few environment variables to it as well as a volume for storing data.

Create a folder anywhere you'd like for Postgres to store data in. We will use the example folder ny_taxi_postgres_data.

Run the following command to start up your instance (bash/ubuntu wsl terminal):

```
 docker run -it \
  -e POSTGRES_USER="root" \
  -e POSTGRES_PASSWORD="root" \
  -e POSTGRES_DB="ny_taxi" \
  -v "C:\Users\nacho\Desktop\data-engineering-zoomcamp\1_Containerization-and Infrastructure-as-Code\ny_taxi_postgres_data:/var/lib/postgresql/data" \
  -p 5433:5432 \
  postgres:13
```

Note

Since I already have postgresql installed locally, I already have port 5432 occupied. That's why i use for port mapping 5433:5432 instead of 5432:5432

---

#### Environment variables

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#environment-variables)

The container needs 3 environment variables:

POSTGRES_USER is the username for logging into the database POSTGRES_PASSWORD is the password for the database POSTGRES_DB is the name that we will give the database.

#### Volume

-v points to the volume directory. The colon : separates the first part (path to the folder in the host computer) from the second part (path to the folder inside the container).

The -v is used to mount a volume, which allows a folder on the host file system to be shared with the container. By mounting the volume this way, the data PostgreSQL stores in the container will be persistent and saved in the folder on your local machine. This is useful so that the data isn't lost when the container stops or is removed, as containers, by default, do not retain data once they are deleted.

On linux and MacOs would be: -v $(pwd)/ny_taxi_postgres_data:/var/lib/postgresql/data \

#### Port mapping

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#port-mapping)

The -p is for port mapping. Maps port 5432 on the container (default PostgreSQL port) to port 5433 on the host machine. So, when you try to connect to PostgreSQL running in the container, you'll need to use port 5433 on your host. For example, you would connect to localhost:5433 instead of localhost:5432 on your local machine. This allows you to avoid port conflicts if you have other services using port 5432

The last argument is the image name and tag. We run the official postgres image on its version 13.

## CLI for Postgres

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#cli-for-postgres)

pgcli is used to interact with a PostgreSQL database from the command line, with a focus on improving usability with features like autocompletion, syntax highlighting, and an enhanced user experience.

Installing pgcli

```
pip install pgcli
```

Once the container is running, open up another terminal and log into our database with the following command:

```
pgcli -h localhost -p 5433 -u root -d ny_taxi
```

Lets test the db for example with "SELECT 1;", and it should print:

```
    ny_taxi=# select 1;
    ?column?
    ----------
            1
    (1 row)
```

Of course we haven't loaded data into the DB yet.

## Docker Networking and Port Mapping

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#docker-networking-and-port-mapping)

Since I already have postgresql installed on the host machine, I already have port 5432 occupied. That's why we use port 5433.

If you want to connect to PostgreSQL inside the container from the host machine, you will need to use port 5433. You must use the port you have exposed on the host using the -p option: 5433:5432, which means:

- Port on the host machine: 5433
- Port inside the container: 5432

If you want to connect to PostgreSQL inside the container from another container, you will need to use port 5432, which is the internal port of the PostgreSQL container. In this case, you don't need to worry about port 5433, as this is only relevant for external connections to the container (from the host or outside the Docker network).

## Generating postgres schema

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#generating-postgres-schema)

We will use data from the NYC TLC Trip Record Data website. Specifically, we will use yellow_tripdata_2021-01.csv from: [https://github.com/DataTalksClub/nyc-tlc-data/releases/tag/yellow](https://github.com/DataTalksClub/nyc-tlc-data/releases/tag/yellow)

**1.** Download it, unzip it and move the csv file to the working directory, for this repo would be: 1_Containerization-and-Infrastructure-as-Code

**2.** Create an ingest_data.py file that reads the csv file and generates the schema for the Postgres database:

Install Pandas and SQLalchemy with:

```
pip install pandas
pip install sqlalchemy
```

Open Vs code and write the following code in ingest_data.py:

```python
import pandas as pd
from sqlalchemy import create_engine

df = pd.read_csv('yellow_tripdata_2021-01.csv', nrows=100)
df.tpep_pickup_datetime = pd.to_datetime(df.tpep_pickup_datetime)
df.tpep_dropoff_datetime = pd.to_datetime(df.tpep_dropoff_datetime)

engine = create_engine('postgresql://root:root@localhost:5433/ny_taxi')

print(pd.io.sql.get_schema(df, name='yellow_taxi_data', con=engine))
```

**pandas** is used for data manipulation and **sqlalchemy** provides tools for database interaction, including creating connections to databases.

The code reads the first 100 rows of yellow_tripdata_2021-01.csv into a Pandas DataFrame called df. The columns tpep_pickup_datetime and tpep_dropoff_datetime in the DataFrame are converted from string format to Pandas datetime objects for easier time-based operations.

_engine = create_engine('postgresql://root:root@localhost:5433/ny_taxi')_ creates a connection to the database we created in the previous section and since we are accessing from the host machine, we use port 5433.

The code prints the SQL schema that would represent the df DataFrame if it were stored in the database table yellow_taxi_data. This includes the structure of the table, column names, and data types.

In a new terminal, run python ingest_data.py. It should print:

```
    CREATE TABLE yellow_taxi_data (
            "VendorID" BIGINT, 
            tpep_pickup_datetime TIMESTAMP WITHOUT TIME ZONE,  
            tpep_dropoff_datetime TIMESTAMP WITHOUT TIME ZONE, 
            passenger_count BIGINT,
            trip_distance FLOAT(53),
            "RatecodeID" BIGINT,
            store_and_fwd_flag TEXT,
            "PULocationID" BIGINT,
            "DOLocationID" BIGINT,
            payment_type BIGINT,
            fare_amount FLOAT(53),
            store_and_fwd_flag TEXT,
            "PULocationID" BIGINT,
            "DOLocationID" BIGINT,
            payment_type BIGINT,
            fare_amount FLOAT(53),
            "PULocationID" BIGINT,
            "DOLocationID" BIGINT,
            payment_type BIGINT,
            fare_amount FLOAT(53),
            "DOLocationID" BIGINT,
            payment_type BIGINT,
            fare_amount FLOAT(53),
            payment_type BIGINT,
            fare_amount FLOAT(53),
            fare_amount FLOAT(53),
            extra FLOAT(53),
            mta_tax FLOAT(53),
            extra FLOAT(53),
            mta_tax FLOAT(53),
            tip_amount FLOAT(53),
            mta_tax FLOAT(53),
            tip_amount FLOAT(53),
            tip_amount FLOAT(53),
            tolls_amount FLOAT(53),
            tolls_amount FLOAT(53),
            improvement_surcharge FLOAT(53),
            total_amount FLOAT(53),
            congestion_surcharge FLOAT(53)
    )
```

## Ingesting data to Postgres with Python

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#ingesting-data-to-postgres-with-python)

Lets modify ingest_data with the following code and we will explain each section of the code step by step.

```python
import pandas as pd
from sqlalchemy import create_engine

df_iter = pd.read_csv('yellow_tripdata_2021-01.csv', iterator=True, chunksize=100000)

df = next(df_iter)
df.tpep_pickup_datetime = pd.to_datetime(df.tpep_pickup_datetime)
df.tpep_dropoff_datetime = pd.to_datetime(df.tpep_dropoff_datetime)

engine = create_engine('postgresql://root:root@localhost:5433/ny_taxi')

# Create table
df.head(n=0).to_sql(name='yellow_taxi_data', con=engine, if_exists='replace')

# Insert first chunk
df.to_sql(name='yellow_taxi_data', con=engine, if_exists='append')

# Insert remaining data
while True: 
    try:
       
        df = next(df_iter)
        df.tpep_pickup_datetime = pd.to_datetime(df.tpep_pickup_datetime)
        df.tpep_dropoff_datetime = pd.to_datetime(df.tpep_dropoff_datetime)    
        df.to_sql(name='yellow_taxi_data', con=engine, if_exists='append')

        print('inserted another chunk')
    except StopIteration:
        print('completed')
        break
```

**1.** create the table:

```python
df.head(n=0).to_sql(name='yellow_taxi_data', con=engine, if_exists='replace')
```

This operation is used to create an empty table with the same column names and data types as the DataFrame df. No actual data from the DataFrame is inserted into the table.

The method df.head(n=0) creates a DataFrame that contains only the column headers from the df DataFrame without any row data.

- The to_sql method writes the DataFrame to a table in the database.
- name='yellow_taxi_data': Specifies the name of the table to be created in the database.
- con=engine: Specifies the database connection (created using sqlalchemy earlier).
- if_exists='replace': If a table named yellow_taxi_data already exists, it will be replaced with this new table structure.

**2.** Insert first chunk of data:

Reading and processing the file in chunks prevents memory overload when working with large datasets.

```python
df_iter = pd.read_csv('yellow_tripdata_2021-01.csv', iterator=True, chunksize=100000)

df = next(df_iter)
df.tpep_pickup_datetime = pd.to_datetime(df.tpep_pickup_datetime)
df.tpep_dropoff_datetime = pd.to_datetime(df.tpep_dropoff_datetime)
df.to_sql(name='yellow_taxi_data', con=engine, if_exists='append')
```

- The pd.read_csv method is used to create an iterator for the file yellow_tripdata_2021-01.csv.
- The iterator=True parameter allows the file to be read in chunks rather than loading the entire file into memory.
- The chunksize=100000 parameter specifies that each chunk contains 100,000 rows.
- The next(df_iter) function retrieves the first chunk from the iterator and stores it in the variable df.
- The to_sql method appends the chunk df to a table named yellow_taxi_data in the connected database. if_exists='append': Appends the data to the table if it already exists; if not, the table is created.

**3.** Loop to write all the remaining data to the database:

```python
while True: 
    try:
       
        df = next(df_iter)
        df.tpep_pickup_datetime = pd.to_datetime(df.tpep_pickup_datetime)
        df.tpep_dropoff_datetime = pd.to_datetime(df.tpep_dropoff_datetime)    
        df.to_sql(name='yellow_taxi_data', con=engine, if_exists='append')

        print('inserted another chunk')
    except StopIteration:
        print('completed')
        break
```

In a new terminal we run the script:

```
python ingest_data.py
```

and after a few minutes the database should be there with all the rows inserted.

Back on the database terminal, we can check this query:

```sql
SELECT count(1) FROM yellow_taxi_data;
```

It should print:

```
ny_taxi=# select count(1) FROM yellow_taxi_data;
count  
---------
1369765
(1 row)
```

## Connecting pgAdmin and Postgres with Docker networking

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#connecting-pgadmin-and-postgres-with-docker-networking)

pgAdmin is a graphical user interface (GUI) tool for managing PostgreSQL databases. It provides a visual way to interact with databases, visual exploration of database schemas, perform queries, and administer database objects like tables, schemas, users, and permissions.

Use pgAdmin if you prefer a visual interface or need to perform advanced database management tasks with a GUI. Use pgcli if you prefer working in the terminal and executing SQL commands.

It's possible to run pgAdmin as as container along with the Postgres container, but both containers will have to be in the same virtual network so that they can find each other.

Let's create a virtual Docker network called pg-network:

```
docker network create pg-network
```

We will now re-run our Postgres container with the added network name and the container network name, so that the pgAdmin container can find it (we'll use pg-database for the container name).

Run the following command on a bash/ubuntu wsl terminal:

```
 docker run -it \
  -e POSTGRES_USER="root" \
  -e POSTGRES_PASSWORD="root" \
  -e POSTGRES_DB="ny_taxi" \
  -v "C:\Users\nacho\Desktop\data-engineering-zoomcamp\1_Containerization-and Infrastructure-as-Code\ny_taxi_postgres_data:/var/lib/postgresql/data" \
  -p 5433:5432 \
  --network=pg-network \
  --name pg-database \
  postgres:13
```

We will now run the pgAdmin container on another terminal:

```
docker run -it \
    -e PGADMIN_DEFAULT_EMAIL="admin@admin.com" \
    -e PGADMIN_DEFAULT_PASSWORD="root" \
    -p 8080:80 \
    --network=pg-network \
    --name pgadmin \
    dpage/pgadmin4
```

You should now be able to load pgAdmin on a web browser by browsing to localhost:8080. Use the same email and password you used for running the container to log in.

Right-click on Servers on the left sidebar --> Register--> Server

Under General give the Server a name: Docker localhost

Under Connection add the same host name: pg-database, port:5432 user:root and password:root

We use port 5432 because we are accessing from a docker container. If it were the case of accessing from the host machine, it would be port 5433.

In the pgadmin webpp now we can explore the table:

Docker localhost --> Databases --> ny_taxi --> Schemas --> Tables --> View first 100 rows

[![pgamin](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/1_Containerization-and-Infrastructure-as-Code/images/pgadmin.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/1_Containerization-and-Infrastructure-as-Code/images/pgadmin.jpg)

Now lets try a query:

Tools --> Query tool

[![pgamin](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/1_Containerization-and-Infrastructure-as-Code/images/pgadmin2.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/1_Containerization-and-Infrastructure-as-Code/images/pgadmin2.jpg)

## Parameterizing the script

- CSV files accessible here: [https://github.com/DataTalksClub/nyc-tlc-data/releases](https://github.com/DataTalksClub/nyc-tlc-data/releases)

We will use argparse to handle command line arguments. The engine we created for connecting to Postgres will be tweaked so that we pass the parameters and build the URL from them, like this:

```python
engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{db}')
```

You can check the final version of the script:

```python
import pandas as pd
import argparse
from sqlalchemy import create_engine
import requests
import gzip
import shutil


def main(params):
    user = params.user
    password = params.password
    host = params.host 
    port = params.port 
    db = params.db
    table_name = params.table_name
    url = params.url


    # Download the CSV.GZ file using requests
    response = requests.get(url)
    if response.status_code == 200:
        with open('output.csv.gz', 'wb') as f_out:
            f_out.write(response.content)
    else:
        print(f"Error al descargar el archivo: {response.status_code}")
        return

    # Unzip the CSV file
    with gzip.open('output.csv.gz', 'rb') as f_in:
        with open('output.csv', 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)

    # Connect to PostgreSQL database
    engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{db}')
    df_iter = pd.read_csv('output.csv', iterator=True, chunksize=100000)

    # Process the first chunk
    df = next(df_iter)
    df.tpep_pickup_datetime = pd.to_datetime(df.tpep_pickup_datetime)
    df.tpep_dropoff_datetime = pd.to_datetime(df.tpep_dropoff_datetime)

    # Insert the data into the database
    df.head(n=0).to_sql(name=table_name, con=engine, if_exists='replace')
    df.to_sql(name=table_name, con=engine, if_exists='append')

    # Process the rest of the chunks
    while True:
        try:
            
            df = next(df_iter)
            df.tpep_pickup_datetime = pd.to_datetime(df.tpep_pickup_datetime)
            df.tpep_dropoff_datetime = pd.to_datetime(df.tpep_dropoff_datetime)
            df.to_sql(name=table_name, con=engine, if_exists='append')
            print('inserted another chunk')

        except StopIteration:

            print('completed')
            break


if __name__ == '__main__':
    
    parser = argparse.ArgumentParser(description='Ingest CSV data to Postgres')
    parser.add_argument('--user', help='user name for postgres')
    parser.add_argument('--password', help='password for postgres')
    parser.add_argument('--host', help='host for postgres')
    parser.add_argument('--port', help='port for postgres')
    parser.add_argument('--db', help='database name for postgres')
    parser.add_argument('--table_name', help='name of the table where we will write the results to')
    parser.add_argument('--url', help='url of the csv file')

    args = parser.parse_args()

    main(args)   
```

Note

To download the csv.gz, instead of using wget I use the requests library, but the idea is the same

---

- It uses the requests library to send a GET request to the URL (url). If the request is successful, the response content is written to a file named output.csv.gz.
- It uses the gzip library to open the compressed file (output.csv.gz).
- The shutil.copyfileobj function is used to copy the decompressed content to a new file (output.csv)

In order to test the script we will have to drop the table we previously created. In pgAdmin, in the sidebar navigate to Servers > Docker localhost > Databases > ny_taxi > Schemas > public > Tables > yellow_taxi_data, right click on yellow_taxi_data and select Query tool.

Run the following command:

```sql
DROP TABLE yellow_taxi_data;
```

We are now ready to test the script with the following command:

```
python ingest_data.py \
    --user=root \
    --password=root \
    --host=localhost \
    --port=5433 \
    --db=ny_taxi \
    --table_name=yellow_taxi_trips \
    --url="https://github.com/DataTalksClub/nyc-tlc-data/releases/download/yellow/yellow_tripdata_2021-01.csv.gz"
```

We use port 5433 because we are accessing from the host machine.

## Dockerizing the ingestion script

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#dockerizing-the-ingestion-script)

Let's modify the Dockerfile we created before to include our ingest_data.py script and create a new image:

```dockerfile
FROM python:3.9.1


RUN pip install pandas sqlalchemy psycopg2 requests

WORKDIR /app
COPY ingest_data.py ingest_data.py 

ENTRYPOINT [ "python", "ingest_data.py" ]
```

Build the image:

```
docker build -t taxi_ingest:v001 .
```

And run it:

```
    docker run -it \
        --network=pg-network \
        taxi_ingest:v001 \
        --user=root \
        --password=root \
        --host=pg-database \
        --port=5432 \
        --db=ny_taxi \
        --table_name=yellow_taxi_trips \
        --url="https://github.com/DataTalksClub/nyc-tlc-data/releases/download/yellow/yellow_tripdata_2021-01.csv.gz"
```

- We need to provide the network for Docker to find the Postgres container
- Now we use port 5432 because we are accessing from a docker container
- You can drop the table in pgAdmin beforehand if you want, but the script will automatically replace the pre-existing table

## Running Postgres and pgAdmin with Docker-compose

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#running-postgres-and-pgadmin-with-docker-compose)

Docker Compose is a tool for defining and managing multi-container Docker applications. It simplifies the process of running and coordinating multiple containers that work together as part of an application. Automatically creates networks to allow containers to communicate with each other. Instead of running individual docker run commands for each container, you define all the services, networks, and volumes in a single YAML file, typically named docker-compose.yaml

Here's the docker-compose.yaml file for running the Postgres and pgAdmin containers:

```yaml
services:
  pgdatabase:
    image: postgres:13
    environment:
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=root
      - POSTGRES_DB=ny_taxi
    volumes:
      - "./ny_taxi_postgres_data:/var/lib/postgresql/data:rw"
    ports:
      - "5433:5432"
  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@admin.com
      - PGADMIN_DEFAULT_PASSWORD=root
    volumes:
      - "./data_pgadmin:/var/lib/pgadmin"
    ports:
      - "8080:80"
    depends_on:
      - pgdatabase  
```

We don't have to specify a network because docker-compose takes care of it: every single container (or "service", as the file states) will run withing the same network and will be able to find each other according to their names (pgdatabase and pgadmin in this example).

We've added a volume for pgAdmin to save its settings, so that you don't have to keep re-creating the connection to Postgres every time ypu rerun the container.

We can now run Docker compose by running the following command from the same directory where docker-compose.yaml is found. Make sure that all previous containers aren't running anymore:

```
    docker-compose up
```

Since the settings for pgAdmin were stored within the container and we have killed the previous onem you will have to re-create the connection by following the steps

- Under General give the Server a name: Docker localhost
    
- Under Connection add the same host name: pgdatabase, port:5432 user:root and password:root
    

The proper way of shutting down the containers is with this command:

```
docker-compose down
```

If you just want to stop the containers without deleting resources like volumes or images, you can use the command:

```
docker-compose stop
```

This command will stop all containers defined in your docker-compose.yml file, but will not remove containers, volumes, networks, or images. You can restart containers later with the command:

```
docker-compose start
```

If you want to re-run the dockerized ingest script when you run Postgres and pgAdmin with docker-compose, you will have to find the name of the virtual network that Docker compose created for the containers. You can use the command docker network ls to find it and then change the docker run command for the dockerized script to include the network name.

# Google Cloud Platform

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#google-cloud-platform)

During this course we will use Google Cloud Platform (GCP) as our cloud services provider. GCP is organized around projects. You may create a project and access all available GCP resources and services from the project dashboard.

We will now create a project and a service account, and we will download the authentication keys to our computer. A service account is like a user account but for apps and workloads; you may authorize or limit what resources are available to your apps with service accounts.

**1:** Create an account on GCP with your Google email. You should receive $300 in credit when signing up on GCP for the first time with an account.

**2:** Setup a new project and write down the Project ID (we'll use this later when deploying infra with TF)

From the GCP Dashboard, click on the drop down menu next to the Google Cloud Platform title to show the project list and click on New project.

Give the project a name. We will use "zoomcamp-airflow" in this example.

**3:** Setup a service account for this project and download the JSON authentication key files.

IAM & Admin > Service accounts > Create service account

Provide a service account name. We will use "zoomcamp-airflow-service". Leave all other fields with the default values. Click on Create and continue.

Grant the Viewer role (Basic > Viewer) to the service account and click on Continue. There is no need to grant users access to this service account at the moment. Click on Done.

With the service account created, click on the 3 dots below Actions and select Manage keys.

Add key -> Create new key. Select JSON and click Create. The files will be downloaded to your computer. Save them to a folder and write down the path.

**4:** Download the GCP SDK for local setup.

The Google Cloud SDK (GCP SDK) is a set of tools that allows devs to interact with GCP services programmatically. It provides command-line tools, libraries, and APIs for managing and automating GCP resources. Create, configure, and manage GCP services like Cloud Storage and BigQuery.

On windows using WSL2, run the following command on ubuntu terminal:

```
sudo snap install google-cloud-cli --classic
```

Check:

```
gcloud --version
```

**5:** Set the environment variable to point to the auth keys

In your terminal run(adjust with your path):

```
export GOOGLE_APPLICATION_CREDENTIALS=/mnt/c/Users/nacho/Desktop/data-engineering-zoomcamp/google_keys/zoomcamp-airflow-444903-33738e1bcf7e.json
```

Refresh the token and verify the authentication with the GCP SDK:

```
gcloud auth application-default login
```

Follow the generated link, choose your google account, then click on allow. You should now be ready to work with GCP.

# GCP setup for access

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#gcp-setup-for-access)

In the following chapters we will setup a Data Lake (Google Cloud Storage) and a Data Warehouse in BigQuery. We will explore these concepts in future lessons but a Data Lake is where we would usually store data and a Data Warehouse provides a more structured way to access this data.

We need to setup access first by assigning the Storage Admin, Storage Object Admin, BigQuery Admin and Viewer IAM roles to the Service Account, and then enable the iam and iamcredentials APIs for our project

**1:** Assign the following IAM Roles to the Service Account: Storage Admin, Storage Object Admin, BigQuery Admin and Viewer. On the GCP Project dashboard, go to IAM & Admin -> IAM. Select the previously created Service Account and edit the permissions by clicking on the pencil shaped icon

- `Storage Admin`: for creating and managing _buckets_.
- `Storage Object Admin`: for creating and managing _objects_ within the buckets.
- `BigQuery Admin`: for managing BigQuery resources and data.
- `Viewer` should already be present as a role.

**2:** Enable APIs for the project (these are needed so that Terraform can interact with GCP):

Go to [https://console.cloud.google.com/apis/library/iam.googleapis.com](https://console.cloud.google.com/apis/library/iam.googleapis.com)

Click on ENABLE

Go to [https://console.cloud.google.com/apis/library/iamcredentials.googleapis.com](https://console.cloud.google.com/apis/library/iamcredentials.googleapis.com)

Click on ENABLE

# Terraform

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#terraform)

You may find yourself using the graphical user interface of your favorite cloud provider clicking thousand different buttons to get your infrastructure configured properly but what happens when you need to reproduce the same thing again in the future. Terraform provides a way to represent your infrastructure and all that settings with the hashicorp configuration language. Think of it like a human readable blueprint that can execute and automate everything you do in the cloud.

Terraform is an open-source Infrastructure as Code (IaC) tool developed by HashiCorp. It allows you to define, provision, and manage infrastructure resources in a declarative manner. These resources can include virtual machines, databases, networks, and much more across various cloud providers, on-premises data centers, or hybrid environments.

You describe the desired state of your infrastructure in .tf configuration files, and Terraform handles the provisioning and management. Terraform supports a wide range of cloud providers (e.g., AWS, Google Cloud Platform, Azure) and on-premises solutions.

When used with Google Cloud Platform (GCP), Terraform simplifies and automates the provisioning and management of GCP resources, such as:

- Compute Resources: Virtual machines (VMs) with Compute Engine.
- Networking: VPCs, subnets, firewalls, and load balancers.
- Storage: Buckets and Cloud SQL databases.
- Kubernetes: GKE (Google Kubernetes Engine) clusters.
- IAM: Managing users, roles, and permissions.

Why Use Terraform with GCP?

- Automation: Automatically provision and configure GCP resources using .tf files.
- Scalability: Easily manage large-scale infrastructure with consistent configurations.
- Reproducibility: Share the same configuration files across environments (e.g., dev, staging, prod).
- Version Control: Store .tf files in a version control system (e.g., Git) to track changes over time.

# Terraform install

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#terraform-install)

Steps to install Terraform on Ubuntu (WSL2)

Open your WSL2 terminal and run the following commands:

```
sudo apt update && sudo apt upgrade -y
```

Install required packages: Terraform requires curl to download the installer. If you don’t have it, install it with:

```
sudo apt install -y curl gnupg software-properties-common
```

Add the HashiCorp GPG key: Terraform is developed by HashiCorp. Add their official GPG key:

```
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
```

Add the official HashiCorp repository: Add the HashiCorp software repository to your system's sources:

```
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
```

Update the package index and install Terraform: Run the following commands:

```
sudo apt update
sudo apt install terraform
```

Verify the installation: After the installation is complete, verify that Terraform was installed correctly by running:

```
terraform --version
```

# Creating GCP infrastructure with Terraform

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#creating-gcp-infrastructure-with-terraform)

Let's create a terraform folder and create a new main.tf file with all the blocks we will need for our project.

The infrastructure we will need consists of a Cloud Storage Bucket (google_storage-bucket) for our Data Lake and a BigQuery Dataset (google_bigquery_dataset).

In Terraform, the difference between using main.tf alone versus using main.tf and variables.tf lies in how you organize your configuration. Both approaches work, but separating configurations into multiple files is a best practice for clarity and maintainability.

- Using only main.tf: In this approach, all the Terraform configuration is written in a single file, including resources, providers, variables, and outputs.
    
- Using main.tf and variables.tf: In this approach, the configuration is divided into multiple files to improve organization. main.tf contains the main Terraform configuration, such as resources and providers and variables.tf defines variables that can be referenced in main.tf (or other configuration files).
    

We will use only main.tf approach

In main.tf we will configure the terraform file as follows:

This Terraform script configures the GCP provider and provisions the following resources:

- A Google Cloud Storage bucket with versioning and lifecycle management to delete objects older than 30 days.
- A BigQuery dataset for analytics or data storage in GCP.

```hcl
# Terraform Block: Specifies the required providers for the project

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

# Google Provider Configuration

provider "google" {
# Credentials only needs to be set if you do not have the GOOGLE_APPLICATION_CREDENTIALS set
#  credentials = 
  project = "<Your Project ID>"
  region  = "us-central1"
}


# Google Cloud Storage Bucket

resource "google_storage_bucket" "data-lake-bucket" {
  name          = "<Your Unique Bucket Name>"
  location      = "US"

  # Optional, but recommended settings:
  storage_class = "STANDARD"
  uniform_bucket_level_access = true

  versioning {
    enabled     = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      age = 30  // days
    }
  }

  force_destroy = true
}

# Google BigQuery Dataset

resource "google_bigquery_dataset" "dataset" {
  dataset_id = "<The Dataset Name You Want to Use>"
  project    = "<Your Project ID>"
  location   = "US"
}
```

**Terraform Block:** Specifies the required providers for the project. The google provider (maintained by HashiCorp) is used to interact with GCP. The version ensures compatibility with version 4.51.0 of the provider.

**Google Provider Configuration:**

- project: The GCP project ID to which the resources will belong.
- region: Sets the region for the resources. Here, it is us-central1.
- credentials can be specified directly in the code, but it is recommended to set the GOOGLE_APPLICATION_CREDENTIALS environment variable instead.

**Google Cloud Storage Bucket:**

- name: The unique name for the bucket.
- location: Sets the geographical location of the bucket (US).
- storage_class: Specifies the storage class (STANDARD for frequently accessed data).
- uniform_bucket_level_access: Enforces uniform access control across the bucket.
- Versioning: Enables versioning to retain multiple versions of objects.
- Lifecycle Rule: Deletes objects that are older than 30 days.
- force_destroy: Deletes the bucket and all its objects when the resource is destroyed.

**Google BigQuery Dataset:**

- dataset_id: The name of the dataset to be created.
- project: The GCP project ID where the dataset will reside.
- location: Specifies the geographical location (US).

The provider will not make use of the credentials field because when we set up GCP access we already created a GOOGLE_APPLICATION_CREDENTIALS env-var which Terraform can read in order to get our authentication keys.

Now run the following commands:

```
terraform init
```

This will download the necessary plugins to connect to GCP and download them to ./.terraform. Now let's plan the infrastructure:

```
terraform plan
```

The infrastructure plan will be printed on screen with all the planned changes marked with a + sign next to them.

Let's apply the changes:

```
terraform apply
```

You will need to confirm this step by typing yes when prompted. This will create all the necessary components in the infrastructure an return a terraform.tfstate with the current state of the infrastructure.

Terminal should print: Apply complete! Resources: 2 added, 0 changed.

After you've successfully created the infrastructure, you may destroy it so that it doesn't consume credit unnecessarily:

```
terraform destroy
```