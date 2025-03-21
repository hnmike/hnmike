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

# Workflow Orchestration with Airflow

### Table of contents

- [Airflow 2025](#airflow-2025)
    - [Module 1 recap](#module-1-recap)
    - [Data Lake vs Data Warehouse](#data-lake-vs-data-warehouse)
    - [ETL vs ELT](#etl-vs-elt)    
    - [Introduction to Workflow Orchestration](#introduction-to-workflow-orchestration)
    - [Airflow architecture](#airflow-architecture)
    - [Setting up Airflow 2.10.4 with Docker](#setting-up-airflow-2104-with-docker)
    - [Ingesting data to local Postgres](#ingesting-data-to-local-postgres)  
    - [Ingesting data to GCP](#ingesting-data-to-gcp)
- [Airflow and Kubernetes](#airflow-and-kubernetes)    
    - [Setting up Airflow with Kubernetes](#setting-up-airflow-with-kubernetes)
    - [Ingesting data to GCP with kubernetes](#ingesting-data-to-gcp-with-kubernetes)

    

# Airflow 2025


## Module 1 recap

_([Video source](https://www.youtube.com/watch?v=0yK7LXwYeD0))_

In the previous module we created a script that:

- Downloads a file and unzips it.
- Saves it locally as a CSV file.
- Loads and inserts the data into a PostgreSQL database.

This is what our "pipeline" looked like:

![pipeline1new](images/pipeline1new.jpg)


The script we created is an example of how **NOT** to create a pipeline, because it contains two steps that could be separated (downloading and inserting data). 

**Problems with the current pipeline:**

- If data download succeeds but insertion fails due to a database connection issue, the script needs to restart, including re-downloading the data.
- If we're simply testing the script, it will have to download the CSV file every single time that we run the script.
- Adding retry mechanisms and fail-safe logic for each stage becomes cumbersome.


**Improved pipeline structure**

To address these problems, we can split the script into two distinct steps or tasks:

![pipeline1modnew](images/pipeline1modnew.jpg)

This structure has dependencies between tasks, where one task's output is the next task's input and Task 2 is only performed if task 1 was executed successfully. 

*This is where the need for orchestrators arises*. Workflow orchestration tools help define, parameterize, and manage workflows. These tools provide:

- Ensuring tasks are executed in the right sequence or simultaneously, based on predefined rules or dependencies
- Retry mechanisms.
- Logging and execution history.
- Scheduling and monitoring.


This week we will work on a slightly more complex pipeline. This will involve extracting data from the web. Convert this CSV to a more effective format - parquet. We'll take this file and upload to Google Cloud Storage (data lake). Finally we'll create an external table in Google BigQuery (data warehouse):


![pipeline2new](images/pipeline2new.jpg) 


## Data Lake vs Data Warehouse

**Data Lake:**

- Purpose: Stores raw, unprocessed data from various sources, often for exploratory or advanced analytics.
- Data Format: Stores data in its original format (structured, semi-structured, or unstructured).
- Schema: Schema-on-read approach, meaning the schema is applied when the data is read, not when it is stored.
- Scalability: Highly scalable, designed for big data and low-cost storage.
- Users: Used by data scientists and engineers for machine learning, advanced analytics, and experimentation.
- Tools: Commonly associated with platforms like Google Cloud Storage, Amazon S 3, or Azure Data Lake.

**Data Warehouse:**

- Purpose: Stores structured and cleaned data optimized for querying and reporting.
- Data Format: Stores structured and pre-processed data.
- Schema: Schema-on-write approach, meaning the schema is defined when the data is loaded into the warehouse.
- Performance: Optimized for complex SQL queries and business intelligence (BI) tools.
- Users: Used by analysts and business users for reporting and decision-making.
- Tools: Examples include Snowflake, Amazon Redshift, Google BigQuery, or Microsoft Azure Synapse.


## ETL vs ELT

**ETL (Extract, Transform, Load):**

Process Order:

- Extract: Data is extracted from source systems.
- Transform: Data is processed and transformed into a desired format or schema.
- Load: The transformed data is loaded into the destination (e.g., a data warehouse).

When to Use:

Ideal for traditional data warehouses where structured data is required upfront.

Performance:

Transformation happens before loading, so processing can take longer.

**ELT (Extract, Load, Transform):**

Process Order:

- Extract: Data is extracted from source systems.
- Load: The raw data is loaded into the destination (e.g., a data lake).
- Transform: Transformation happens after loading, within the storage system using its compute resources.

When to Use:

Suitable for modern architectures (e.g., data lakes or cloud-native data warehouses) where raw data can be transformed as needed.

Performance:

Leverages the power of the destination system to perform transformations, which can scale better for large datasets.

Tools:

Cloud-native tools like Apache Spark, dbt, or Google Dataflow are common for ELT pipelines.


## Introduction to Workflow Orchestration

Workflow Orchestration refers to the process of organizing, managing, and automating complex workflows, where 
Multiple tasks are coordinated to achieve a specific outcome. It involves ensuring that tasks are 
Executed in the correct order, handling dependencies between them, and managing resources or systems involved 
In the workflow.

Key characteristics of workflow orchestration include:

- Task Coordination: Ensuring tasks are executed in the right sequence or simultaneously, based on predefined rules or dependencies.

- Automation: Automating repetitive or complex processes to reduce manual intervention and improve efficiency.

- Error Handling: Managing errors or failures in tasks, often with retry mechanisms or alternative execution paths.

- Resource Management: Allocating resources (e.g., computing power, APIs, or data) to tasks as needed.

- Monitoring and Reporting: Tracking the progress of workflows, identifying bottlenecks, and providing logs or reports for analysis.


Popular tools for workflow orchestration include Apache Airflow, Prefect and Kestra. These tools help streamline and standardize complex workflows across multiple systems or environments.

## Airflow architecture

Apache Airflow® is an open-source platform for developing, scheduling, and monitoring batch-oriented workflows

Airflow is a platform that lets you build and run workflows. A workflow is represented as a DAG (a Directed Acyclic Graph), and contains individual pieces of work called Tasks, arranged with dependencies and data flows taken into account.

A DAG specifies the dependencies between tasks, which defines the order in which to execute the tasks. Tasks describe what to do, be it fetching data, running analysis, triggering other systems, or more

#### Airflow components

A minimal Airflow installation consists of the following components:

- A scheduler, which handles both triggering scheduled workflows, and submitting Tasks to the executor to run. The executor, is a configuration property of the scheduler, not a separate component and runs within the scheduler process. There are several executors available out of the box, and you can also write your own.

- A webserver, which presents a handy user interface to inspect, trigger and debug the behaviour of DAGs and tasks.

- A folder of DAG files, which is read by the scheduler to figure out what tasks to run and when to run them.

- A metadata database, which airflow components use to store state of workflows and tasks. Setting up a metadata database is described in Set up a Database Backend and is required for Airflow to work

Optional components:

- Optional worker, which executes the tasks given to it by the scheduler. In the basic installation worker might be part of the scheduler not a separate component. It can be run as a long running process in the CeleryExecutor, or as a POD in the KubernetesExecutor.
- Optional folder of plugins. Plugins are a way to extend Airflow’s functionality (similar to installed packages). Plugins are read by the scheduler, dag processor, triggerer and webserver

#### DAGS

A DAG (Directed Acyclic Graph) is the core concept of Airflow, collecting Tasks together, organized with dependencies and relationships to say how they should run.

Here’s a basic example DAG:

![airflow5](images/airflow5.jpg)

It defines four Tasks - A, B, C, and D - and dictates the order in which they have to run, and which tasks depend on what others. It will also say how often to run the DAG - maybe “every 5 minutes starting tomorrow”, or “every day since January 1 st, 2020”.

The DAG itself doesn’t care about what is happening inside the tasks; it is merely concerned with how to execute them - the order to run them in, how many times to retry them, if they have timeouts, and so on

#### Declaring a DAG

There are three ways to declare a DAG.

**1: with statement** 

```python
 import datetime

 from airflow import DAG
 from airflow.operators.empty import EmptyOperator

 with DAG(
     dag_id="my_dag_name",
     start_date=datetime.datetime(2021, 1, 1),
     schedule="@daily",
 ):
     EmptyOperator(task_id="task")
```    

**2: standard constructor, passing the DAG into any operators you use**

```python
 import datetime

 from airflow import DAG
 from airflow.operators.empty import EmptyOperator

 my_dag = DAG(
     dag_id="my_dag_name",
     start_date=datetime.datetime(2021, 1, 1),
     schedule="@daily",
 )
 EmptyOperator(task_id="task", dag=my_dag)
 ```

 **3: @dag decorator to turn a function into a DAG generator**

 ```python
 import datetime

from airflow.decorators import dag
from airflow.operators.empty import EmptyOperator


@dag(start_date=datetime.datetime(2021, 1, 1), schedule="@daily")
def generate_dag():
    EmptyOperator(task_id="task")


generate_dag()
```

DAGs are nothing without Tasks to run, and those will usually come in the form of either Operators, Sensors or TaskFlow

#### Loading DAGs

Airflow loads DAGs from Python source files, which it looks for inside its configured DAG_FOLDER. It will take each file, execute it, and then load any DAG objects from that file.

This means you can define multiple DAGs per Python file, or even spread one very complex DAG across multiple Python files using imports.

#### Running DAGs

There are 2 main ways to run DAGs:

- **Triggering them manually via the web UI or programatically via API:** The Airflow web interface allows users to manually trigger the execution of a DAG. This is often used when you want to run a specific DAG outside of its scheduled time, for example, to run an ad-hoc task or for testing purposes. In the web UI, you can simply click the "Trigger Dag" button next to the DAG you want to execute, which will start its execution immediately.

- **Scheduling them:** Airflow allows you to schedule DAGs to run automatically at specific intervals. This is the most common way of running DAGs, as it enables them to execute regularly without manual intervention. You define the schedule using a cron expression or a predefined schedule like @daily, @hourly, etc., in the DAG definition. Once scheduled, Airflow's scheduler will monitor the DAG and trigger the tasks based on the defined schedule, ensuring that they run at the right times.

### DAG Runs

A DAG Run is an object representing an instantiation of the DAG in time. Any time the DAG is executed, a DAG Run is created and all tasks inside it are executed. The status of the DAG Run depends on the tasks states. Each DAG Run is run separately from one another, meaning that you can have many runs of a DAG at the same time.

A DAG Run status is determined when the execution of the DAG is finished. 

There are two possible terminal states for the DAG Run:

- Success if all of the leaf nodes states are either success or skipped,

- Failed if any of the leaf nodes state is either failed or upstream_failed.

#### Tasks

A Task is the basic unit of execution in Airflow. Tasks are arranged into DAGs, and then have upstream and downstream dependencies set between them in order to express the order they should run in.

There are three basic kinds of Task:

- Operators, predefined task templates that you can string together quickly to build most parts of your DAGs.

- Sensors, a special subclass of Operators which are entirely about waiting for an external event to happen.

- A TaskFlow-decorated @task, which is a custom Python function packaged up as a Task.

#### Operators

An Operator is conceptually a template for a predefined Task, that you can just define declaratively inside your DAG:

```python
with DAG("my-dag") as dag:
    ping = HttpOperator(endpoint="http://example.com/update/")
    email = EmailOperator(to="admin@example.com", subject="Update complete")

    ping >> email
```

Airflow has a very extensive set of operators available, with some built-in to the core or pre-installed providers. Some popular operators from core include:

- BashOperator - executes a bash command

- PythonOperator - calls an arbitrary Python function

- EmailOperator - sends an email

#### Executor

Executors are the mechanism by which task instances get run. Executors are set by the executor option in the [core] section of the configuration file.

There are two types of executors - those that run tasks locally (inside the scheduler process), and those that run their tasks remotely (usually via a pool of workers). 

**Local Executors**

Airflow tasks are run locally within the scheduler process.

Pros: Very easy to use, fast, very low latency, and few requirements for setup.

Cons: Limited in capabilities and shares resources with the Airflow scheduler.

Examples: Local Executor, Sequential Executor

**Remote Executors**

Remote executors can further be divided into two categories:

1. Queued/Batch Executors

Airflow tasks are sent to a central queue where remote workers pull tasks to execute. Often workers are persistent and run multiple tasks at once.

Pros: More robust since you’re decoupling workers from the scheduler process. Workers can be large hosts that can churn through many tasks (often in parallel) which is cost effective. Latency can be relatively low since workers can be provisioned to be running at all times to take tasks immediately from the queue.

Cons: Shared workers have the noisy neighbor problem with tasks competing for resources on the shared hosts or competing for how the environment/system is configured. They can also be expensive if your workload is not constant, you may have workers idle, overly scaled in resources, or you have to manage scaling them up and down.

Examples: CeleryExecutor, BatchExecutor

2. Containerized Executors

Airflow tasks are executed ad hoc inside containers/pods. Each task is isolated in its own containerized environment that is deployed when the Airflow task is queued.

Pros: Each Airflow task is isolated to one container so no noisy neighbor problem. The execution environment can be customized for specific tasks (system libs, binaries, dependencies, amount of resources, etc). Cost effective as the workers are only alive for the duration of the task.

Cons: There is latency on startup since the container or pod needs to deploy before the task can begin. Can be expensive if you’re running many short/small tasks. No workers to manage however you must manage something like a Kubernetes cluster.

Examples: KubernetesExecutor, EcsExecutor


#### References

For more info, check out official docs:

https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html



## Setting up Airflow 2.10.4 with Docker

This is a quick, simple & less memory-intensive setup of Airflow that works on a LocalExecutor.

Only runs the webserver and the scheduler and runs the DAGs in the scheduler rather than running them in external workers:


### 1: Create a new sub-directory called airflow in your project dir. 

Inside airflow create dags, google and logs folders.

The directory structure should look like this:

```

├── airflow
│   ├── dags
|   |
│   ├── google
|   |
│   └── logs

```


### 2:  Create a Dockerfile. 

Create a Dockerfile inside airflow folder. We are going to use this dockerfile:

```dockerfile

FROM apache/airflow:2.10.4-python3.8

ENV AIRFLOW_HOME=/opt/airflow

USER airflow
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR $AIRFLOW_HOME
COPY ./google /opt/airflow/google
```


This Dockerfile creates a Docker image for Apache Airflow, installs additional Python packages from a requirements. Txt file and copies google credentials into the container

### 3:  Create a Docker-compose. Yaml

Docker-compose. Yaml should look like this:

```yaml

version: '3.8'
services:
    postgres:
        image: postgres:13
        environment:
        - POSTGRES_USER=airflow
        - POSTGRES_PASSWORD=airflow
        - POSTGRES_DB=airflow
        volumes:
            - postgres-db-volume:/var/lib/postgresql/data
        healthcheck:
            test: ["CMD", "pg_isready", "-U", "airflow"]
            interval: 5s
            retries: 5

    init-airflow:
        build: .
        user: root
        depends_on:
        - postgres
        environment:
        - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow    
        command: >
          bash -c "
          until pg_isready -h postgres -U airflow; do
            echo 'Waiting for PostgreSQL to be ready...';
            sleep 2;
          done;
          airflow db migrate && airflow connections create-default-connections &&
          airflow users create -r Admin -u admin -p admin -e admin@example.com -f admin -l airflow &&
          airflow users create -r Admin -u airflow -p airflow -e airflow@example.com -f airflow -l airflow &&
          echo 'Initialization complete' &&
          touch /opt/airflow/shared/initialized
          "

        healthcheck:
            test: ["CMD-SHELL", "airflow db check && echo 'Database ready!'"]
            interval: 10s
            timeout: 10s
            retries: 5
            start_period: 10s

        volumes:
        - shared-data:/opt/airflow/shared            

    scheduler:
        build: .
        command: >
            bash -c "
            until [ -f /opt/airflow/shared/initialized ]; do
                echo 'Waiting for init-airflow to complete...';
                sleep 2;
            done;
            airflow scheduler
            "
        depends_on:
            - postgres
            - init-airflow
        environment:
        - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow
        - AIRFLOW_UID=50000
        - COMPOSE_PROJECT_NAME=airflow2025
        - AIRFLOW__CORE__EXECUTOR=LocalExecutor
        - AIRFLOW__SCHEDULER__SCHEDULER_HEARTBEAT_SEC=10
        - AIRFLOW_CONN_METADATA_DB=postgres+psycopg2://airflow:airflow@postgres:5432/airflow
        - AIRFLOW_VAR__METADATA_DB_SCHEMA=airflow
        - _AIRFLOW_WWW_USER_CREATE=True
        - _AIRFLOW_WWW_USER_USERNAME=airflow
        - _AIRFLOW_WWW_USER_PASSWORD=airflow
        - AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION=True
        - AIRFLOW__CORE__LOAD_EXAMPLES=False       
        volumes:
            - ./dags:/opt/airflow/dags
            - ./logs:/opt/airflow/logs
            - ./google:/opt/airflow/google:ro
            - shared-data:/opt/airflow/shared

    webserver:
        build: .
        command: >
            bash -c "
            until [ -f /opt/airflow/shared/initialized ]; do
                echo 'Waiting for init-airflow to complete...';
                sleep 2;
            done;
            airflow webserver
            "
        depends_on:
            - postgres
            - init-airflow
            - scheduler
        environment:
        - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow
        - AIRFLOW_UID=50000
        - COMPOSE_PROJECT_NAME=airflow2025
        - AIRFLOW__CORE__EXECUTOR=LocalExecutor
        - AIRFLOW__SCHEDULER__SCHEDULER_HEARTBEAT_SEC=10
        - AIRFLOW_CONN_METADATA_DB=postgres+psycopg2://airflow:airflow@postgres:5432/airflow
        - AIRFLOW_VAR__METADATA_DB_SCHEMA=airflow
        - _AIRFLOW_WWW_USER_CREATE=True
        - _AIRFLOW_WWW_USER_USERNAME=airflow
        - _AIRFLOW_WWW_USER_PASSWORD=airflow
        - AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION=True
        - AIRFLOW__CORE__LOAD_EXAMPLES=False   
        volumes:
            - ./dags:/opt/airflow/dags
            - ./logs:/opt/airflow/logs
            - ./google:/opt/airflow/google:ro
            - shared-data:/opt/airflow/shared            

        user: "50000:0"
        ports:
            - "8080:8080"
        healthcheck:
            test: [ "CMD-SHELL", "[ -f /home/airflow/airflow-webserver.pid ]" ]
            interval: 30s
            timeout: 30s
            retries: 3

volumes:
  postgres-db-volume:
  shared-data:
```  

Postgres:

- Runs PostgreSQL 13 and sets up the database with user airflow, password airflow, and database airflow.
- Persists data using a named volume (postgres-db-volume).

Init-airflow:

- Ensure PostgreSQL is ready (pg_isready).
- Migrate the Airflow database schema (airflow db migrate).
- Set up default Airflow connections and create default users (Admin and airflow).
- Marks initialization as complete by touching a file (/opt/airflow/shared/initialized).
- Shares data in a volume (shared-data) to be used by other services

Scheduler:

- Waits for init-airflow to finish initializing by checking the initialized file before starting the Airflow scheduler.
- Configures the Airflow scheduler with specific settings, such as the executor type and database connection.
- Maps directories for Airflow DAGs (./dags), logs (./logs), and Google credentials (./google) to the container's respective directories.

Webserver:

- Similar to the scheduler, it waits for the initialized file before starting the Airflow web server.
- Runs the Airflow web server, providing the web interface for managing DAGs, tasks, and users.
- Depends on postgres, init-airflow, and scheduler.
- Exposes port 8080 for access to the web UI.


Volumes:

- Postgres-db-volume: Stores PostgreSQL data persistently.
- Shared-data: Shared volume to store Airflow's initialization data that other services can use.


### 4:  Copy your google-credentials. Json inside the google folder. 

> [!WARNING]  
> Remember to add this json to the .gitignore file !

---

### 5:  Copy python files. 

Copy from this repo to your dags folder:

- Data_ingestion_local. Py 
- Data_ingestion_gcp_green. Py 
- Data_ingestion_gcp_yellow. Py 

### 6:  Create a requirements. Txt

Requirements. Txt, should look like:

```
apache-airflow-providers-google
pyarrow
pandas
sqlalchemy
psycopg2-binary
requests
```

The directory structure now should look like this:

```

└── airflow
    ├── dags
    |   ├── data_ingestion_local.py
    |   ├── data_ingestion_gcp_green.py
    |   └── data_ingestion_gcp_yellow.py
    |
    ├── google
    |   └── credentials.json
    |
    ├── logs
    |
    ├── docker-compose.yaml
    ├── Dockerfile
    └── requirements.txt
```


### 7:  Build the image. 

You only need to do this the first time you run Airflow or if you modified the Dockerfile or the requirements. Txt file:

```
    docker-compose build
```

First-time build can take up to 10 mins.

### 8: Run Airflow:    

```
    docker-compose -p airflow2025 up -d
```

The -p option specifies a custom project name (airflow 2025 in this case). By default, Docker Compose uses the directory name as the project name, but this flag allows you to override it.

The -d option stands for "detached mode," meaning the containers will run in the background, allowing you to continue using the terminal without being attached to the container logs.

The first time it is run, the airflow-init service may take a few minutes to prepare the database

In docker desktop if you want you can go to the logs section of airflow-init and see something like this:

```
2025-01-03 13:16:47 postgres:5432 - accepting connections
2025-01-03 13:16:53 DB: postgresql+psycopg2://airflow:***@postgres/airflow
2025-01-03 13:16:53 Performing upgrade to the metadata database postgresql+psycopg2://airflow:***@postgres/airflow
2025-01-03 13:17:14 Database migrating done!

2025-01-03 13:17:30 User "admin" created with role "Admin"
2025-01-03 13:17:35 User "airflow" created with role "Admin"
2025-01-03 13:17:36 Initialization complete
```

And webserver logs should look like this:

```
2025-01-03 13:17:34 Waiting for init-airflow to complete...
2025-01-03 13:17:36 Waiting for init-airflow to complete...

2025-01-03 13:20:34   ____________       _____________
2025-01-03 13:20:34  ____    |__( )_________  __/__  /________      __
2025-01-03 13:20:34 ____  /| |_  /__  ___/_  /_ __  /_  __ \_ | /| / /
2025-01-03 13:20:34 ___  ___ |  / _  /   _  __/ _  / / /_/ /_ |/ |/ /
2025-01-03 13:20:34  _/_/  |_/_/  /_/    /_/    /_/  \____/____/|__/
2025-01-03 13:20:34 Running the Gunicorn Server with:
2025-01-03 13:20:34 Workers: 4 sync
2025-01-03 13:20:34 Host: 0.0.0.0:8080
```

In the docker logs you can see how the webserver and the scheduler wait for the database to be ready to start.

### 8: Airflow GUI 

You may now access the Airflow GUI by browsing to localhost: 8080. It may take a few minutes to load the webApp

```
Username: airflow
Password: airflow 
```
<br>

![airflow8](images/airflow8.jpg)
<br><br>


## Ingesting data to local Postgres

This section focuses on setting up a local PostgreSQL database and using Apache Airflow to ingest NYC taxi trip
Data. The process involves creating a dedicated directory for the database and configuring a docker-compose 
File to define the PostgreSQL service. This service connects to Airflow's network, allowing seamless integration
For data ingestion workflows. 

For testing purposes, we will be ingesting Yellow Taxi data from January to March 2021. You can find all 
datasets in https://github.com/DataTalksClub/nyc-tlc-data/releases/tag/yellow



![airflowgcp9](images/airflowgcp9.jpg)
<br><br>



**1: Create a new sub-directory** 

Create a new sub-directory called database_ny_taxi at the same level as airflow folder. Inside database_ny_taxi
Create ny_taxi_postgres_data folder and docker-compose-lesson 1. Yaml file

The directory structure now should look like this:

```
├── airflow
|   ├── dags
|   |   ├── data_ingestion_local. Py
|   |   ├── data_ingestion_gcp_green. Py
|   |   └── data_ingestion_gcp_yellow. Py
|   |
|   ├── google
|   |   └── credentials. Json
|   |
|   ├── logs
|   |
|   ├── docker-compose. Yaml
|   ├── Dockerfile
|   └── requirements. Txt
│
└── database_ny_taxi
    ├── ny_taxi_postgres_data
    └── docker-compose-lesson 1. Yaml

```


**2: Find the airflow network**

In a separate terminal, let's find out which virtual network Airflow is running on using the following command:
 
 ```
Docker network ls
```

Make sure that you are running the containers for airflow services before running docker network ls

It should print something like this:

```
    NETWORK ID     NAME                  DRIVER    SCOPE
    690 b 4 b 59769 b   airflow 2025_default   bridge    local

```    



**3: Create docker-compose. Yaml file for the database** 

Modify the docker-compose. Yaml file from module 1 by adding the network (airflow 2025_default) info and removing
 Away the pgAdmin service. Docker-compose-lesson 1. Yaml should look like this:

```dockerfile

Services:
  Pgdatabase:
    Image: postgres:13
    Environment:
      - POSTGRES_USER=root 2
      - POSTGRES_PASSWORD=root 2
      - POSTGRES_DB=ny_taxi
    Volumes:
      - "./ny_taxi_postgres_data:/var/lib/postgresql/data: rw"
    Ports:
      - "5433:5432"
    Networks:
      - Airflow

    
Networks:
  Airflow:
    External: true
    Name: airflow 2025_default
```    

**4: Run Postgres:**

Make sure to execute the docker-compose command in the database_ny_taxi directory:

```
    Docker-compose -f docker-compose-lesson 1. Yaml up
```

**5: Check database with PGCLI** 

Once the container is running, we can log into our database with the following command:
```
    Pgcli -h localhost -p 5433 -u root 2 -d ny_taxi
```

**6: Prepare the DAG**

Inside your dags folder, create a data_ingestion_local. Py file. The DAG will have the following tasks:

- A PythonOperator task that will download the NYC taxi data.
- A PythonOperator task that will ingest data into our database

Two utility functions are defined:

- Download_and_unzip: Downloads a .csv. Gz file from a URL and extracts it into a .csv file. Makes a GET request to fetch the file from the given url. Saves the .gz file locally and unzips the file using the gzip library and writes it to a local .csv file.

- Process_and_insert_to_db: This is our script for module 1. Reads the .csv file in chunks, processes it, and inserts the data into the PostgreSQL database. Connects to the PostgreSQL database using sqlalchemy. Reads the .csv file in chunks of 100,000 rows using pandas. Creates the table in the database (or replaces it if it exists). Appends the data chunk by chunk into the database.

Dynamic Variables:

The following variables dynamically adapt based on the Airflow execution_date:

- table_name_template: Name of the database table (e.g., yellow_taxi_2021_02).
- csv_name_gz_template: Name of the .csv. Gz file (e.g., output_2021_02. Csv. Gz).
- csv_name_template: Name of the .csv file (e.g., output_2021_02. Csv).
- Url_template: URL to download the .csv. Gz

Observe how the names of the tables in the database and the URL are generated dynamically according to the execution date using JINJA template.

Data_ingestion_local. Py look like this:

```python

From datetime import datetime
From airflow import DAG
From airflow. Operators. Python import PythonOperator

Import pandas as pd
From sqlalchemy import create_engine
Import requests
Import gzip
Import shutil



# This info is from docker-compose-lesson 1. Yaml
User = "root 2"
Password = "root 2"
Host = "pgdatabase"
Port = "5432"
Db = "ny_taxi"


Def download_and_unzip (csv_name_gz, csv_name, url):

    # Download the CSV. GZ file
    Response = requests.Get (url)
    If response. Status_code == 200:
        With open (csv_name_gz, 'wb') as f_out:
            F_out.Write (response. Content)
    Else:
        Print (f"Error downloading file: {response. Status_code}")
        Return False

    # Unzip the CSV file
    With gzip.Open (csv_name_gz, 'rb') as f_in:
        With open (csv_name, 'wb') as f_out:
            Shutil.Copyfileobj (f_in, f_out)
    
    Return True


Def process_and_insert_to_db (csv_name, user, password, host, port, db, table_name):
    # Connect to PostgreSQL database
    Engine = create_engine (f'postgresql://{user}:{password}@{host}:{port}/{db}')
    Df_iter = pd. Read_csv (csv_name, iterator=True, chunksize=100000)

    # Process the first chunk
    Df = next (df_iter)
    Df. Tpep_pickup_datetime = pd. To_datetime (df. Tpep_pickup_datetime)
    Df. Tpep_dropoff_datetime = pd. To_datetime (df. Tpep_dropoff_datetime)

    # Insert the data into the database
    Df.Head (n=0). To_sql (name=table_name, con=engine, if_exists='replace')
    Df. To_sql (name=table_name, con=engine, if_exists='append')

    # Process the rest of the data
    While True:
        Try:
            Df = next (df_iter)
            Df. Tpep_pickup_datetime = pd. To_datetime (df. Tpep_pickup_datetime)
            Df. Tpep_dropoff_datetime = pd. To_datetime (df. Tpep_dropoff_datetime)
            Df. To_sql (name=table_name, con=engine, if_exists='append')
            Print ('inserted another chunk')

        Except StopIteration:
            Print ('completed')
            Break


# Defining the DAG
Dag = DAG (
    "yellow_taxi_ingestion",
    Schedule_interval="0 6 2 * *",
    Start_date=datetime (2021, 1, 1),
    End_date=datetime (2021, 3, 28),
    Catchup=True, # True means run past missed jobs
    Max_active_runs=1,
)

table_name_template = 'yellow_taxi_ {{ execution_date.strftime(\'%Y_%m\') }} '
csv_name_gz_template = 'output_ {{ execution_date.strftime(\'%Y_%m\') }} . csv. Gz'
csv_name_template = 'output_ {{ execution_date.strftime(\'%Y_%m\') }} . csv'

url_template = "https://github.com/DataTalksClub/nyc-tlc-data/releases/download/yellow/yellow_tripdata_{{ execution_date.strftime(\'%Y-%m\') }} . csv. Gz"

# Task 1
Download_task = PythonOperator (
    Task_id="download_and_unzip",
    Python_callable=download_and_unzip,
    Op_kwargs={
        'csv_name_gz': csv_name_gz_template,
        'csv_name': csv_name_template,
        'url': url_template
    },
    Dag=dag
)

# Task 2:
Process_task = PythonOperator (
    Task_id="process_and_insert_to_db",
    Python_callable=process_and_insert_to_db,
    Op_kwargs={
        'csv_name': csv_name_template,
        'user': user,
        'password': password,
        'host': host,
        'port': port,
        'db': db,
        'table_name': table_name_template
     
    },
    Dag=dag
)

# Establish the sequence of tasks
Download_task >> process_task
```

**Code Explanation:**

DAG Configuration:

- Schedule: Runs at 6:00 AM on the 2 nd day of each month (0 6 2 * *)
- Date Range: Starts on February 1, 2021, and ends on March 28, 2021.
- Catchup=True: This parameter ensures that if the DAG was paused or missed runs during the period between the start_date and end_date, Airflow will try to "catch up" and run all the missed executions, one for each scheduled date.
- Max_active_runs=1: This limits the DAG to only have one active run at any time, preventing overlapping executions of the DAG

Tasks:

- Download_task: Downloads and extracts the .csv. Gz file. Uses the download_and_unzip function. Passes the dynamic file names and URL as arguments

- Process_task: Processes the .csv file and uploads its content to the PostgreSQL database. Uses the process_and_insert_to_db function. Passes the database credentials, table name, and file name as arguments

Task Dependency:

The tasks are executed sequentially: download_task → process_task

The data is downloaded and extracted before being processed and ingested into the database.

**7: Unpause DAG** 

Open the Airflow dashboard and unpause the "yellow_taxi_ingestion" DAG from data_ingestion_local. Py.

While ingesting the data, you can check logs:

![airflow6](images/airflow6.jpg)

After executing all tasks for all dates, should look like this:

![airflow7](images/airflow7.jpg)


**8: Check tables** 

Check tables on your local Postgres database:

Type "\dt" in the pgcli terminal. It should print:

```
+--------+---------------------+-------+-------+
| Schema | Name                | Type  | Owner |
|--------+---------------------+-------+-------|
| public | yellow_taxi_2021_01 | table | root 2 |
| public | yellow_taxi_2021_02 | table | root 2 |
| public | yellow_taxi_2021_03 | table | root 2 |
+--------+---------------------+-------+-------+
```

Now you can query the tables:

```
root2@localhost :ny_taxi> select count (1) from yellow_taxi_2021_02;
+---------+
| count   |
|---------|
| 1371708 |
+---------+
```



## Ingesting data to GCP

You can find all datasets in https://github.com/DataTalksClub/nyc-tlc-data/releases/

### Introduction

We will now run a slightly more complex DAG that will:

- Download and unzip one file for each month
- Convert into parquet
- Upload it to GCS (bucket)
- Create the final table with a given schema in BigQuery
- Create a external table referencing the raw data in GCS in BigQuery
- Create a temporary native table in BigQuery for a given month by reading from the external table created earlier. Also adds two columns a unique unique_row_id for each record by hashing certain fields, and stores the file name for reference.
- Update the final table with data from the temporary table

<br>

![airflowgcp10](images/airflowgcp10.jpg)
<br><br>


**Tables explanation**

- External Table: Serves as the initial point of access to the raw data. The data in this table is not physically stored in BigQuery. There is a External table for each month

- Temporary table: This is a native table created in BigQuery using the data from the external table. Copies the entire dataset from the associated external table into this table, while enriching it with the additional columns unique_row_id and filename. There is a native table for each month.

- Final table: After processing the data and ensuring there are no duplicates or inconsistencies, the final data is merged into this table. It represents the cleaned, transformed, and de-duplicated dataset including data from all months.



### 1: Create connection with GCP:

To create a connection with Google Cloud Platform (GCP) from the Airflow UI go to the top menu and click on Admin, From the dropdown, select Connections. This will take you to the page where you can manage your Airflow connections.

On the Connections page, click the + button. 

Complete Connection id, Connection type, your project id and Keyfile Path (with your json name)

<br>

![gcpairflow](images/gcpairflow.jpg)




### 2: Prepare the DAG

As an example, we will download and process the green files from January 2019 to December 2019.

To process the Yellow Taxi data, the DAG is similar, slightly changing the schema of the tables and the utility function to convert to parquet is done in chunks to avoid overloading the PC.

Data_ingestion_gcp_green. Py looks like this:

```python

Import os
From datetime import datetime

From airflow import DAG
From airflow. Operators. Bash import BashOperator
From airflow. Operators. Python import PythonOperator
From airflow. Providers. Google. Cloud. Operators. Bigquery import BigQueryInsertJobOperator
From airflow. Providers. Google. Cloud. Hooks. Gcs import GCSHook
Import requests
Import gzip
Import shutil
Import pyarrow
Import pyarrow. Csv
Import pyarrow. Parquet 



# Make sure the values ​​match your gcp values
PROJECT_ID="zoomcamp-airflow-444903"
BUCKET="zoomcamp_datalake"
BIGQUERY_DATASET = "airflow 2025 b"
Path_to_local_home = os.Environ.Get ("AIRFLOW_HOME", "/opt/airflow/")


# Utility functions
Def download (file_gz, file_csv, url):

    # Download the CSV. GZ file
    Response = requests.Get (url)
    If response. Status_code == 200:
        With open (file_gz, 'wb') as f_out:
            F_out.Write (response. Content)
    Else:
        Print (f"Error downloading file: {response. Status_code}")
        Return False
    
    # Unzip the CSV file
    With gzip.Open (file_gz, 'rb') as f_in:
        With open (file_csv, 'wb') as f_out:
            Shutil.Copyfileobj (f_in, f_out)
    

Def format_to_parquet (src_file):

    Table = pyarrow. Csv. Read_csv (src_file)

    # change ehail_fee to float 64
    If 'ehail_fee' in table. Column_names:
        # Convertir la columna 'ehail_fee' a float (FLOAT 64)
        Table = table. Set_column (
            Table. Schema. Get_field_index ('ehail_fee'),
            'ehail_fee',
            Pyarrow.Array (table['ehail_fee']. To_pandas (). Astype ('float 64'))  
        )

    Pyarrow. Parquet. Write_table (table, src_file.Replace ('. Csv', '. Parquet'))



Def upload_to_gcs (bucket, object_name, local_file, gcp_conn_id="gcp-airflow"):
    Hook = GCSHook (gcp_conn_id)
    Hook.Upload (
        Bucket_name=bucket,
        Object_name=object_name,
        Filename=local_file,
        Timeout=600
    )


# Defining the DAG
Dag = DAG (
    "GCP_ingestion_green",
    Schedule_interval="0 6 2 * *",
    Start_date=datetime (2019, 1, 1),
    End_date=datetime (2019, 12, 31),
    Catchup=True, 
    Max_active_runs=1,
)

table_name_template = 'green_taxi_ {{ execution_date.strftime(\'%Y_%m\') }} '
file_template_csv_gz = 'output_ {{ execution_date.strftime(\'%Y_%m\') }} . csv. Gz'
file_template_csv = 'output_ {{ execution_date.strftime(\'%Y_%m\') }} . csv'
file_template_parquet = 'output_ {{ execution_date.strftime(\'%Y_%m\') }} . parquet'
consolidated_table_name = "green_ {{ execution_date.strftime(\'%Y\') }} "
url_template = "https://github.com/DataTalksClub/nyc-tlc-data/releases/download/green/green_tripdata_{{ execution_date.strftime(\'%Y-%m\') }} . csv. Gz"


# Task 1: Download and unzip file
Download_task = PythonOperator (
    Task_id="download",
    Python_callable=download,
    Op_kwargs={
        'file_gz': file_template_csv_gz,
        'file_csv': file_template_csv,
        'file_parquet': file_template_parquet,
        'url': url_template
    },
    Retries=10,
    Dag=dag
)

# Task 2: Format to parquet
Process_task = PythonOperator (
    Task_id="format_to_parquet",
    Python_callable=format_to_parquet,
    Op_kwargs={
        "src_file": f"{path_to_local_home}/{file_template_csv}"
    },
    Retries=10,
    Dag=dag
)


# Task 3: Upload file to google storage
Local_to_gcs_task = PythonOperator (
    Task_id="upload_to_gcs",
    Python_callable=upload_to_gcs,
    Op_kwargs={
        "bucket": BUCKET,
        "object_name": f"raw/{file_template_parquet}",
        "local_file": f"{path_to_local_home}/{file_template_parquet}",
        "gcp_conn_id": "gcp-airflow"
    },
    Retries=10,
    Dag=dag
)

# Task 4: Create final table
Create_final_table_task = BigQueryInsertJobOperator (
    Task_id="create_final_table",
    Gcp_conn_id="gcp-airflow",
    Configuration={
        "query": {
            "query": f"""
                CREATE TABLE IF NOT EXISTS `{PROJECT_ID}.{BIGQUERY_DATASET}.{consolidated_table_name}`
                (
                    Unique_row_id BYTES,
                    Filename STRING,      
                    VendorID INT 64,
                    Lpep_pickup_datetime TIMESTAMP,
                    Lpep_dropoff_datetime TIMESTAMP,
                    Store_and_fwd_flag STRING,
                    RatecodeID INT 64,
                    PULocationID INT 64,
                    DOLocationID INT 64,
                    Passenger_count INT 64,
                    Trip_distance FLOAT 64,
                    Fare_amount FLOAT 64,
                    Extra FLOAT 64,
                    Mta_tax FLOAT 64,
                    Tip_amount FLOAT 64,
                    Tolls_amount FLOAT 64,
                    Ehail_fee FLOAT 64,
                    Improvement_surcharge FLOAT 64,
                    Total_amount FLOAT 64,
                    Payment_type INT 64,
                    Trip_type INT 64,
                    Congestion_surcharge FLOAT 64
                )    
            """,
            "useLegacySql": False,
        }
    },
    Retries=3,
    Dag=dag,
)

# Task 5: Create external monthly table
Create_external_table_task = BigQueryInsertJobOperator (
    Task_id="create_external_table",
    Gcp_conn_id="gcp-airflow",
    Configuration={
        "query": {
            "query": f"""
                CREATE OR REPLACE EXTERNAL TABLE `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_ext`
                (
                    VendorID INT 64,
                    Lpep_pickup_datetime TIMESTAMP,
                    Lpep_dropoff_datetime TIMESTAMP,
                    Store_and_fwd_flag STRING,
                    RatecodeID INT 64,
                    PULocationID INT 64,
                    DOLocationID INT 64,
                    Passenger_count INT 64,
                    Trip_distance FLOAT 64,
                    Fare_amount FLOAT 64,
                    Extra FLOAT 64,
                    Mta_tax FLOAT 64,
                    Tip_amount FLOAT 64,
                    Tolls_amount FLOAT 64,
                    Ehail_fee FLOAT 64,
                    Improvement_surcharge FLOAT 64,
                    Total_amount FLOAT 64,
                    Payment_type INT 64,
                    Trip_type INT 64,
                    Congestion_surcharge FLOAT 64
                )
                OPTIONS (
                    Uris = ['gs://{BUCKET}/raw/{file_template_parquet}'],
                    Format = 'PARQUET'
                );
            """,
            "useLegacySql": False,
        }
    },
    Retries=3,
    Dag=dag
)

# Task 6: Create native monthly table
Create_temp_table_task = BigQueryInsertJobOperator (
    Task_id="create_temp_table",
    Gcp_conn_id="gcp-airflow",
    Configuration={
        "query": {
            "query": f"""
                CREATE OR REPLACE TABLE `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_tmp`
                AS
                SELECT
                    MD 5 (CONCAT (
                        COALESCE (CAST (VendorID AS STRING), ""),
                        COALESCE (CAST (lpep_pickup_datetime AS STRING), ""),
                        COALESCE (CAST (lpep_dropoff_datetime AS STRING), ""),
                        COALESCE (CAST (PULocationID AS STRING), ""),
                        COALESCE (CAST (DOLocationID AS STRING), "")
                    )) AS unique_row_id,
                    "{file_template_parquet}" AS filename,
                    *
                FROM `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_ext`;
            """,
            "useLegacySql": False,
        }
    },
    Retries=3,
    Dag=dag,
)


# Task 7: Merge
Merge_to_final_table_task = BigQueryInsertJobOperator (
    Task_id="merge_to_final_table",
    Gcp_conn_id="gcp-airflow",
    Configuration={
        "query": {
            "query": f"""
                MERGE INTO `{PROJECT_ID}.{BIGQUERY_DATASET}.{consolidated_table_name}` T
                USING `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_tmp` S
                ON T.unique_row_id = S.unique_row_id
                WHEN NOT MATCHED THEN
                    INSERT (unique_row_id, filename, VendorID, lpep_pickup_datetime, lpep_dropoff_datetime, store_and_fwd_flag, RatecodeID, PULocationID, DOLocationID, passenger_count, trip_distance, fare_amount, extra, mta_tax, tip_amount, tolls_amount, ehail_fee, improvement_surcharge, total_amount, payment_type, trip_type, congestion_surcharge)
                    VALUES (S.unique_row_id, S.filename, S.VendorID, S.lpep_pickup_datetime, S.lpep_dropoff_datetime, S.store_and_fwd_flag, S.RatecodeID, S.PULocationID, S.DOLocationID, S.passenger_count, S.trip_distance, S.fare_amount, S.extra, S.mta_tax, S.tip_amount, S.tolls_amount, S.ehail_fee, S.improvement_surcharge, S.total_amount, S.payment_type, S.trip_type, S.congestion_surcharge);
            """,
            "useLegacySql": False,
        }
    },
    Retries=3,
    Dag=dag,
)

# Task 8: Delete local files after upload
Cleanup_task = BashOperator (
    Task_id="cleanup_files",
    Bash_command=f"rm -f {path_to_local_home}/{file_template_csv_gz} {path_to_local_home}/{file_template_csv} {path_to_local_home}/{file_template_parquet}",
    Dag=dag,
)


Download_task >> process_task >> local_to_gcs_task >> create_final_table_task >> create_external_table_task >> create_temp_table_task >> merge_to_final_table_task >> cleanup_task

```

**Let's explain step by step what this code does:**

Modules:

- BigQueryInsertJobOperator: Executes SQL queries in Google BigQuery as tasks.
- GCSHook:  A helper class to interact with Google Cloud Storage (GCS). Uploads Parquet files to GCS.
- Requests: Makes HTTP requests to external APIs or URLs.
- Gzip: Handles reading and decompressing .gz files.
- pyarrow: Converts the CSV file into a Parquet file. Modifies the schema to handle specific data types (e.g., ehail_fee as float 64).


Configuration Variables:

- PROJECT_ID: The Google Cloud project ID.
- BUCKET: The Google Cloud Storage bucket name.
- BIGQUERY_DATASET: The BigQuery dataset name.
- Path_to_local_home: Local directory path for Airflow tasks.

Utility Functions:

- Download: Downloads a .csv. Gz file from a URL. Decompresses the file into a .csv format.

- Format_to_parquet: Converts a CSV file to a Parquet file using PyArrow. It also ensures that specific columns (like ehail_fee) have consistent data types.

- Upload_to_gcs: Uploads a local file to a specified GCS bucket. Uses the Airflow GCSHook for the connection.


Dynamic Variables:

- Table Name Template: This creates a template for the BigQuery table name. For example "yellow_taxi_2025_01"
- File_template_csv_gz: This template generates the file name for the compressed .csv. Gz file. For example "output_2019_01. Csv. Gz"
- File_template_csv: This template generates the file name for the decompressed .csv file. For example "output_2019_01. Csv"
- File_template_parquet: This template generates the file name for the .parquet file. For example "output_2019_01. Parquet"
- url_template: This template generates the download URL for the .csv. Gz file. The {{ execution_date.strftime('%Y-%m') }} dynamically inserts the YYYY-MM format of the execution date into the URL.

Task Definitions:

- Download_task: Uses the download function to download and unzip the .csv. Gz file for the specified month.

- Process_task: Converts the downloaded .csv file into Parquet format.

- Local_to_gcs_task: This task uploads the downloaded file from the local machine to Google Cloud Storage (GCS).
The upload_to_gcs utility function is used to upload the file to the specified bucket and path (raw/{file_template}).

- Create_final_table_task: This task creates a final BigQuery table (green_2019) if it doesn't already exist.
The table schema includes various fields related to the green taxi trip data (e.g., VendorID, pickup/dropoff datetime, fare amount, etc.). This task uses the BigQueryInsertJobOperator to execute a SQL query in BigQuery. The query creates the table green_2019 in the dataset specified (airflow 2025), if it doesn't already exist. The table is created using a CREATE TABLE IF NOT EXISTS statement to ensure it is only created once.

- Create_external_table_task: This task creates an external BigQuery table for a given month from the parquet file in GCS. The external table references the raw data in GCS, using parquet file and specifies the format as PARQUET. This task uses the BigQueryInsertJobOperator to run another SQL query

- Create_temp_table_task: This task creates a temporary native table in BigQuery for a given month by reading from the external table created earlier. It generates a unique unique_row_id for each record by hashing certain fields, and stores the file name for reference.

- Merge_to_final_table_task: This task performs a merge operation to update the final table (green_2022) with data from the temporary table. It inserts records into the final table where there is no match (based on the unique_row_id), ensuring that only new or updated data is added. This task uses the BigQueryInsertJobOperator to perform a MERGE SQL operation.

### 3: Unpause the DAG


Unpause the DAG and after a few minutes, should look like this:
<br>

![airflowgcp7](images/airflowgcp7.jpg)
<br><br>



### 4: Check GCP

Once the DAG finishes, you can go to your GCP project's dashboard and search for BigQuery. You should see your project ID; expand it and you should see the final 2019 table, the external tables and the temp tables:
<br>

![airflownew3](images/airflownew3.jpg)
<br><br>

And you can query the final table:

<br>

![airflownew4](images/airflownew4.jpg)
<br><br>

<br>

![airflownew5](images/airflownew5.jpg)
<br><br>


You can also see the uploaded parquet files by searching the Cloud Storage service, selecting your bucket and then clicking on the raw/ folder. 

<br>

![airflowgcp6](images/airflowgcp6.jpg)
<br><br>

You may now shutdown Airflow by running docker-compose down on the terminal where you run it.

# Airflow and Kubernetes

Kubernetes is an open-source platform for managing containerized applications. Its architecture is designed to provide scalability, reliability, and automation for deploying and running applications. Here’s a simple breakdown of its architecture:

**1. Cluster**

A Kubernetes cluster is the main unit, consisting of two types of components: Control Plane and Worker Nodes.

**2. Control Plane**

The control plane manages the cluster and decides where and how applications run

**3. Worker Nodes**

Worker nodes are where your applications (containers) actually run. Each node has a Kubelet: A small agent that communicates with the control plane and ensures containers are running as instructed.

**4. Pods**

A pod is the smallest unit in Kubernetes. Each pod contains one or more containers that share storage, network, and specifications. Kubernetes manages applications by managing pods.

**Kubernetes and Airflow**

Kubernetes can be used as the underlying infrastructure to run Airflow. Airflow’s components, like the web server, scheduler, and worker nodes, can be deployed on a Kubernetes cluster. Kubernetes takes care of scaling and managing these components.

**Google Kubernetes Engine (GKE)**

Google Kubernetes Engine (GKE) is a managed environment provided by Google Cloud for deploying, managing, and scaling containerized applications using Kubernetes. Kubernetes is an open-source platform for automating containerized application deployment, scaling, and operations. GKE takes care of the underlying infrastructure, including provisioning virtual machines, networking, and storage, so users can focus on building and running their applications.


## Setting up Airflow with Kubernetes

**1: Enable Kubernetes Engine API**

Enabling the API is the first step in using Google Kubernetes Engine, and it ensures that the required services and resources for managing Kubernetes clusters are available in your project. You can enable it from the Google Cloud Console or via the gcloud command-line tool. Once the API is enabled, you can use GKE to run and manage containerized workloads in a fully managed Kubernetes environment.

On the left hand side find Kubernetes Engine → Configurationand enable the Kubernetes Engine API 

![kubeapi](images/kubeapi.jpg)

**2: Install SDK, kubectl and helm**

Install SDK on linux/WSL 2:

```
curl https://sdk.cloud.google.com | bash
Exec -l $SHELL
```

Install plugin gcloud-auth-plugin:

```
Install plugin gcloud-auth-plugin
```

Install kubectl:

Kubectl is the command-line interface (CLI) tool used for interacting with Kubernetes clusters. It allows users to manage and deploy applications, inspect cluster resources, and perform various administrative tasks in a Kubernetes environment.

```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd 64/kubectl"
Sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Install helm:

Helm is a package manager for Kubernetes, which simplifies the process of deploying and managing applications on Kubernetes clusters. Helm packages applications into "charts," which are pre-configured Kubernetes resources bundled together.

```
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Add the official Apache Airflow Helm chart repository to your Helm client:

```
helm repo add apache-airflow https://airflow.apache.org
Helm repo update
```

By adding this repository, you can now use Helm to search for and install Apache Airflow charts from this source.

**3: Create a new Kubernetes cluster on Google Kubernetes Engine (GKE)**

This command creates a GKE cluster called airflow-cluster in the us-central 1 region, with a single node using the e 2-standard-4 machine type. This would be a minimal setup suitable for testing or development purposes.

```
Gcloud container clusters create airflow-cluster \
  --num-nodes=1 \
  --machine-type=e 2-standard-4 \
  --region=us-central 1
```  

Can take up to 5 mins

Then create a new namespace called airflow within a Kubernetes cluster.

In Kubernetes, namespaces are a way to organize and isolate resources within a cluster. They allow you to divide the cluster into multiple virtual clusters, each containing its own set of resources, such as pods, services, and deployments. This helps in managing and organizing resources for different projects, teams, or applications within the same physical Kubernetes cluster.

```
Kubectl create namespace airflow
```

Browse to the Clusters tab on Kubernetes Engine to view the newly created cluster:

![kube0](images/kube0.jpg)

**4: Values. Yaml**

The values. Yaml file in Helm is a configuration file used to customize the deployment of a Helm chart. Helm charts come with a set of default configuration values, but you can modify these values to suit your specific needs by creating and using a custom values. Yaml file.

Changes made:

```yaml
Executor: "LocalExecutor"
```

```yaml
Triggerer:
  Enabled: false
```  

Size of persistent volume for webserver, workers and logs from 100 Gi to 10 Gi:

```yaml
Size: 10 Gi
```

Default chart yaml:

-  [`default-values.yaml`](airflow-kubernetes/default-values.yaml)


Customized yaml with local executor, disabled triggerer and reduced volumes:

-  [`values.yaml`](airflow-kubernetes/values.yaml)


**5: Install airflow**

This command installs the Apache Airflow application to a Kubernetes cluster using the apache-airflow/airflow Helm chart, with custom settings specified in the values. Yaml file, and it installs the release into the airflow namespace of the cluster.

```
Helm install airflow apache-airflow/airflow -n airflow -f values. Yaml
```

It may take up to 5 minutes

**6: Check Pods**

This command will display details such as the names, statuses, and other information about the pods in the "airflow" namespace.

```
Kubectl get pods -n airflow
```

Should show something like this:

![kube1](images/kube1.jpg)


**7: Access the Airflow web interface**

This command forwards a local port to a port on a service in a Kubernetes cluster:

```
kubectl port-forward -n airflow svc/airflow-webserver 8080:8080
```

Go to localhost:8080

- Username: admin
- Password: admin

![kube2](images/kube2.jpg)


**8: Load DAGS**

This command copies all Python files from the local localdags directory to the dags directory of the specified Airflow pod.

Adjust with your local path:

```
Kubectl cp /mnt/c/users/nacho/desktop/localdags/*. Py airflow/airflow-scheduler-0:/opt/airflow/dags -n airflow
```

-  [`hello.py.yaml`](airflow-kubernetes/hello.py)

Once copied, you can access the pod.

This command opens an interactive Bash shell inside the airflow-scheduler-0 pod in the airflow namespace. It allows you to interact with the pod directly, similar to accessing a terminal on a local machine.

```
Kubectl exec -it -n airflow airflow-scheduler-0 -- bash
```

![kube3](images/kube3.jpg)

As you can see, the file was copied successfully inside de pod

After a few minutes the DAG should appear in the UI:

![kubedag0](images/kubedag0.jpg)

**9: Trigger DAG**

![kubedag](images/kubedag.jpg)


## Ingesting data to GCP with kubernetes

Before you begin, check the Permissions in GCS.
Confirm that the zoomcamp_datalake bucket exists and that your service key has permissions to write to it, as well as create tables in BigQuery.

**1: Copy the DAG**

Copy the DAG as in the previous example

-  [`data_ingestion_gcp.py`](airflow-kubernetes/data_ingestion_gcp.py)

**2: Create connection with GCP**

To create a connection with Google Cloud Platform (GCP) from the Airflow UI go to the top menu and click on Admin, From the dropdown, select Connections. This will take you to the page where you can manage your Airflow connections.

On the Connections page, click the + button.

Complete Connection id, Connection type, your project id and Keyfile Json (just copy and paste google json credentials)

![kubeconn](images/kubeconn.jpg)


**3: Install python dependencies**

Modify the values. Yaml to include the python dependencies. Add this line just above the executor variable:

```yaml

ExtraPipPackages:
  - Apache-airflow[google]
  - Google-cloud-storage
  - Pyarrow
  - Pandas
  - Requests  

# Airflow executor
# One of: LocalExecutor, LocalKubernetesExecutor, CeleryExecutor, KubernetesExecutor, CeleryKubernetesExecutor
Executor: "LocalExecutor"
```

Full custom code:

-  [`values-gcp.yaml`](airflow-kubernetes/values-gcp.yaml)


**4: Upgrade airflow deployment**

Update Airflow deployment with this command:

```
Helm upgrade airflow apache-airflow/airflow -n airflow -f values-gcp. Yaml
```


**5: Unpause DAG**

Unpause the DAG, it should automatically start to do the catch-up

![kubegcprun](images/kubegcprun.jpg)


Once the DAG finishes, you can go to your GCP project's dashboard and search for BigQuery. You should see your project ID; expand it and you should see a new external_table table:

![kubebq1](images/kubebq1.jpg)

And query it:

```embed
title: "Fetching"
image: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibGRzLW1pY3Jvc29mdCIgd2lkdGg9IjgwcHgiICBoZWlnaHQ9IjgwcHgiICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMCkiPjxjaXJjbGUgY3g9IjgxLjczNDEzMzYxMTY0OTQxIiBjeT0iNzQuMzUwNDU3MTYwMzQ4ODIiIGZpbGw9IiNlMTViNjQiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDM0MC4wMDEgNDkuOTk5OSA1MCkiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiB0aW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS41cyIgYmVnaW49IjBzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijc0LjM1MDQ1NzE2MDM0ODgyIiBjeT0iODEuNzM0MTMzNjExNjQ5NDEiIGZpbGw9IiNmNDdlNjAiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDM0OC4zNTIgNTAuMDAwMSA1MC4wMDAxKSI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIHRpbWVzPSIwOzEiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjVzIiBiZWdpbj0iLTAuMDYyNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+PGNpcmNsZSBjeD0iNjUuMzA3MzM3Mjk0NjAzNiIgY3k9Ijg2Ljk1NTE4MTMwMDQ1MTQ3IiBmaWxsPSIjZjhiMjZhIiByPSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzNTQuMjM2IDUwIDUwKSI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIHRpbWVzPSIwOzEiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjVzIiBiZWdpbj0iLTAuMTI1cyI+PC9hbmltYXRlVHJhbnNmb3JtPgo8L2NpcmNsZT48Y2lyY2xlIGN4PSI1NS4yMjEwNDc2ODg4MDIwNyIgY3k9Ijg5LjY1Nzc5NDQ1NDk1MjQxIiBmaWxsPSIjYWJiZDgxIiByPSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzNTcuOTU4IDUwLjAwMDIgNTAuMDAwMikiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiB0aW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS41cyIgYmVnaW49Ii0wLjE4NzVzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxjaXJjbGUgY3g9IjQ0Ljc3ODk1MjMxMTE5NzkzIiBjeT0iODkuNjU3Nzk0NDU0OTUyNDEiIGZpbGw9IiM4NDliODciIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDM1OS43NiA1MC4wMDY0IDUwLjAwNjQpIj4KICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIgdGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNXMiIGJlZ2luPSItMC4yNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+PGNpcmNsZSBjeD0iMzQuNjkyNjYyNzA1Mzk2NDE1IiBjeT0iODYuOTU1MTgxMzAwNDUxNDciIGZpbGw9IiNlMTViNjQiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDAuMTgzNTUyIDUwIDUwKSI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIHRpbWVzPSIwOzEiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjVzIiBiZWdpbj0iLTAuMzEyNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+PGNpcmNsZSBjeD0iMjUuNjQ5NTQyODM5NjUxMTc2IiBjeT0iODEuNzM0MTMzNjExNjQ5NDEiIGZpbGw9IiNmNDdlNjAiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDEuODY0NTcgNTAgNTApIj4KICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIgdGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNXMiIGJlZ2luPSItMC4zNzVzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxjaXJjbGUgY3g9IjE4LjI2NTg2NjM4ODM1MDYiIGN5PSI3NC4zNTA0NTcxNjAzNDg4NCIgZmlsbD0iI2Y4YjI2YSIgcj0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoNS40NTEyNiA1MCA1MCkiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiB0aW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS41cyIgYmVnaW49Ii0wLjQzNzVzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MCA1MCA1MCIgdGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2c+PC9zdmc+"
description: "Fetching # Workflow Orchestration with Airflow

### Table of contents

- [Airflow 2025](#airflow-2025)
    - [Module 1 recap](#module-1-recap)
    - [Data Lake vs Data Warehouse](#data-lake-vs-data-warehouse)
    - [ETL vs ELT](#etl-vs-elt)    
    - [Introduction to Workflow Orchestration](#introduction-to-workflow-orchestration)
    - [Airflow architecture](#airflow-architecture)
    - [Setting up Airflow 2.10.4 with Docker](#setting-up-airflow-2104-with-docker)
    - [Ingesting data to local Postgres](#ingesting-data-to-local-postgres)  
    - [Ingesting data to GCP](#ingesting-data-to-gcp)
- [Airflow and Kubernetes](#airflow-and-kubernetes)    
    - [Setting up Airflow with Kubernetes](#setting-up-airflow-with-kubernetes)
    - [Ingesting data to GCP with kubernetes](#ingesting-data-to-gcp-with-kubernetes)

    

# Airflow 2025


## Module 1 recap

_([Video source](https://www.youtube.com/watch?v=0yK7LXwYeD0))_

In the previous module we created a script that:

- Downloads a file and unzips it.
- Saves it locally as a CSV file.
- Loads and inserts the data into a PostgreSQL database.

This is what our "pipeline" looked like:

![pipeline1new](images/pipeline1new.jpg)


The script we created is an example of how **NOT** to create a pipeline, because it contains two steps that could be separated (downloading and inserting data). 

**Problems with the current pipeline:**

- If data download succeeds but insertion fails due to a database connection issue, the script needs to restart, including re-downloading the data.
- if we're simply testing the script, it will have to download the CSV file every single time that we run the script.
- Adding retry mechanisms and fail-safe logic for each stage becomes cumbersome.


**Improved pipeline structure**

To address these problems, we can split the script into two distinct steps or tasks:

![pipeline1modnew](images/pipeline1modnew.jpg)

This structure has dependencies between tasks, where one task's output is the next task's input and Task 2 is only performed if task 1 was executed successfully. 

*This is where the need for orchestrators arises*. Workflow orchestration tools help define, parameterize, and manage workflows. These tools provide:

- Ensuring tasks are executed in the right sequence or simultaneously, based on predefined rules or dependencies
- Retry mechanisms.
- Logging and execution history.
- Scheduling and monitoring.


This week we will work on a slightly more complex pipeline. This will involve extracting data from the web. Convert this CSV to a more effective format - parquet. We'll take this file and upload to Google Cloud Storage (data lake). Finally we'll create an external table in Google BigQuery(data warehouse):


![pipeline2new](images/pipeline2new.jpg) 


## Data Lake vs Data Warehouse

**Data Lake:**

- Purpose: Stores raw, unprocessed data from various sources, often for exploratory or advanced analytics.
- Data Format: Stores data in its original format (structured, semi-structured, or unstructured).
- Schema: Schema-on-read approach, meaning the schema is applied when the data is read, not when it is stored.
- Scalability: Highly scalable, designed for big data and low-cost storage.
- Users: Used by data scientists and engineers for machine learning, advanced analytics, and experimentation.
- Tools: Commonly associated with platforms like Google Cloud Storage, Amazon S3, or Azure Data Lake.

**Data Warehouse:**

- Purpose: Stores structured and cleaned data optimized for querying and reporting.
- Data Format: Stores structured and pre-processed data.
- Schema: Schema-on-write approach, meaning the schema is defined when the data is loaded into the warehouse.
- Performance: Optimized for complex SQL queries and business intelligence (BI) tools.
- Users: Used by analysts and business users for reporting and decision-making.
- Tools: Examples include Snowflake, Amazon Redshift, Google BigQuery, or Microsoft Azure Synapse.


## ETL vs ELT

**ETL (Extract, Transform, Load):**

Process Order:

- Extract: Data is extracted from source systems.
- Transform: Data is processed and transformed into a desired format or schema.
- Load: The transformed data is loaded into the destination (e.g., a data warehouse).

When to Use:

Ideal for traditional data warehouses where structured data is required upfront.

Performance:

Transformation happens before loading, so processing can take longer.

**ELT (Extract, Load, Transform):**

Process Order:

- Extract: Data is extracted from source systems.
- Load: The raw data is loaded into the destination (e.g., a data lake).
- Transform: Transformation happens after loading, within the storage system using its compute resources.

When to Use:

Suitable for modern architectures (e.g., data lakes or cloud-native data warehouses) where raw data can be transformed as needed.

Performance:

Leverages the power of the destination system to perform transformations, which can scale better for large datasets.

Tools:

Cloud-native tools like Apache Spark, dbt, or Google Dataflow are common for ELT pipelines.


## Introduction to Workflow Orchestration

Workflow Orchestration refers to the process of organizing, managing, and automating complex workflows, where 
multiple tasks are coordinated to achieve a specific outcome. It involves ensuring that tasks are 
executed in the correct order, handling dependencies between them, and managing resources or systems involved 
in the workflow.

Key characteristics of workflow orchestration include:

- Task Coordination: Ensuring tasks are executed in the right sequence or simultaneously, based on predefined rules or dependencies.

- Automation: Automating repetitive or complex processes to reduce manual intervention and improve efficiency.

- Error Handling: Managing errors or failures in tasks, often with retry mechanisms or alternative execution paths.

- Resource Management: Allocating resources (e.g., computing power, APIs, or data) to tasks as needed.

- Monitoring and Reporting: Tracking the progress of workflows, identifying bottlenecks, and providing logs or reports for analysis.


Popular tools for workflow orchestration include Apache Airflow, Prefect and Kestra. These tools help streamline and standardize complex workflows across multiple systems or environments.

## Airflow architecture

Apache Airflow® is an open-source platform for developing, scheduling, and monitoring batch-oriented workflows

Airflow is a platform that lets you build and run workflows. A workflow is represented as a DAG (a Directed Acyclic Graph), and contains individual pieces of work called Tasks, arranged with dependencies and data flows taken into account.

A DAG specifies the dependencies between tasks, which defines the order in which to execute the tasks. Tasks describe what to do, be it fetching data, running analysis, triggering other systems, or more

#### Airflow components

A minimal Airflow installation consists of the following components:

- A scheduler, which handles both triggering scheduled workflows, and submitting Tasks to the executor to run. The executor, is a configuration property of the scheduler, not a separate component and runs within the scheduler process. There are several executors available out of the box, and you can also write your own.

- A webserver, which presents a handy user interface to inspect, trigger and debug the behaviour of DAGs and tasks.

- A folder of DAG files, which is read by the scheduler to figure out what tasks to run and when to run them.

- A metadata database, which airflow components use to store state of workflows and tasks. Setting up a metadata database is described in Set up a Database Backend and is required for Airflow to work

Optional components:

- Optional worker, which executes the tasks given to it by the scheduler. In the basic installation worker might be part of the scheduler not a separate component. It can be run as a long running process in the CeleryExecutor, or as a POD in the KubernetesExecutor.
- Optional folder of plugins. Plugins are a way to extend Airflow’s functionality (similar to installed packages). Plugins are read by the scheduler, dag processor, triggerer and webserver

#### DAGS

A DAG (Directed Acyclic Graph) is the core concept of Airflow, collecting Tasks together, organized with dependencies and relationships to say how they should run.

Here’s a basic example DAG:

![airflow5](images/airflow5.jpg)

It defines four Tasks - A, B, C, and D - and dictates the order in which they have to run, and which tasks depend on what others. It will also say how often to run the DAG - maybe “every 5 minutes starting tomorrow”, or “every day since January 1st, 2020”.

The DAG itself doesn’t care about what is happening inside the tasks; it is merely concerned with how to execute them - the order to run them in, how many times to retry them, if they have timeouts, and so on

#### Declaring a DAG

There are three ways to declare a DAG.

**1: with statement** 

```python
 import datetime

 from airflow import DAG
 from airflow.operators.empty import EmptyOperator

 with DAG(
     dag_id="my_dag_name",
     start_date=datetime.datetime(2021, 1, 1),
     schedule="@daily",
 ):
     EmptyOperator(task_id="task")
```    

**2: standard constructor, passing the DAG into any operators you use**

```python
 import datetime

 from airflow import DAG
 from airflow.operators.empty import EmptyOperator

 my_dag = DAG(
     dag_id="my_dag_name",
     start_date=datetime.datetime(2021, 1, 1),
     schedule="@daily",
 )
 EmptyOperator(task_id="task", dag=my_dag)
 ```

 **3: @dag decorator to turn a function into a DAG generator**

 ```python
 import datetime

from airflow.decorators import dag
from airflow.operators.empty import EmptyOperator


@dag(start_date=datetime.datetime(2021, 1, 1), schedule="@daily")
def generate_dag():
    EmptyOperator(task_id="task")


generate_dag()
```

DAGs are nothing without Tasks to run, and those will usually come in the form of either Operators, Sensors or TaskFlow

#### Loading DAGs

Airflow loads DAGs from Python source files, which it looks for inside its configured DAG_FOLDER. It will take each file, execute it, and then load any DAG objects from that file.

This means you can define multiple DAGs per Python file, or even spread one very complex DAG across multiple Python files using imports.

#### Running DAGs

There are 2 main ways to run DAGs:

- **Triggering them manually via the web UI or programatically via API:** The Airflow web interface allows users to manually trigger the execution of a DAG. This is often used when you want to run a specific DAG outside of its scheduled time, for example, to run an ad-hoc task or for testing purposes. In the web UI, you can simply click the "Trigger Dag" button next to the DAG you want to execute, which will start its execution immediately.

- **Scheduling them:** Airflow allows you to schedule DAGs to run automatically at specific intervals. This is the most common way of running DAGs, as it enables them to execute regularly without manual intervention. You define the schedule using a cron expression or a predefined schedule like @daily, @hourly, etc., in the DAG definition. Once scheduled, Airflow's scheduler will monitor the DAG and trigger the tasks based on the defined schedule, ensuring that they run at the right times.

### DAG Runs

A DAG Run is an object representing an instantiation of the DAG in time. Any time the DAG is executed, a DAG Run is created and all tasks inside it are executed. The status of the DAG Run depends on the tasks states. Each DAG Run is run separately from one another, meaning that you can have many runs of a DAG at the same time.

A DAG Run status is determined when the execution of the DAG is finished. 

There are two possible terminal states for the DAG Run:

- success if all of the leaf nodes states are either success or skipped,

- failed if any of the leaf nodes state is either failed or upstream_failed.

#### Tasks

A Task is the basic unit of execution in Airflow. Tasks are arranged into DAGs, and then have upstream and downstream dependencies set between them in order to express the order they should run in.

There are three basic kinds of Task:

- Operators, predefined task templates that you can string together quickly to build most parts of your DAGs.

- Sensors, a special subclass of Operators which are entirely about waiting for an external event to happen.

- A TaskFlow-decorated @task, which is a custom Python function packaged up as a Task.

#### Operators

An Operator is conceptually a template for a predefined Task, that you can just define declaratively inside your DAG:

```python
with DAG("my-dag") as dag:
    ping = HttpOperator(endpoint="http://example.com/update/")
    email = EmailOperator(to="admin@example.com", subject="Update complete")

    ping >> email
```

Airflow has a very extensive set of operators available, with some built-in to the core or pre-installed providers. Some popular operators from core include:

- BashOperator - executes a bash command

- PythonOperator - calls an arbitrary Python function

- EmailOperator - sends an email

#### Executor

Executors are the mechanism by which task instances get run. Executors are set by the executor option in the [core] section of the configuration file.

There are two types of executors - those that run tasks locally (inside the scheduler process), and those that run their tasks remotely (usually via a pool of workers). 

**Local Executors**

Airflow tasks are run locally within the scheduler process.

Pros: Very easy to use, fast, very low latency, and few requirements for setup.

Cons: Limited in capabilities and shares resources with the Airflow scheduler.

Examples: Local Executor, Sequential Executor

**Remote Executors**

Remote executors can further be divided into two categories:

1. Queued/Batch Executors

Airflow tasks are sent to a central queue where remote workers pull tasks to execute. Often workers are persistent and run multiple tasks at once.

Pros: More robust since you’re decoupling workers from the scheduler process. Workers can be large hosts that can churn through many tasks (often in parallel) which is cost effective. Latency can be relatively low since workers can be provisioned to be running at all times to take tasks immediately from the queue.

Cons: Shared workers have the noisy neighbor problem with tasks competing for resources on the shared hosts or competing for how the environment/system is configured. They can also be expensive if your workload is not constant, you may have workers idle, overly scaled in resources, or you have to manage scaling them up and down.

Examples: CeleryExecutor, BatchExecutor

2. Containerized Executors

Airflow tasks are executed ad hoc inside containers/pods. Each task is isolated in its own containerized environment that is deployed when the Airflow task is queued.

Pros: Each Airflow task is isolated to one container so no noisy neighbor problem. The execution environment can be customized for specific tasks (system libs, binaries, dependencies, amount of resources, etc). Cost effective as the workers are only alive for the duration of the task.

Cons: There is latency on startup since the container or pod needs to deploy before the task can begin. Can be expensive if you’re running many short/small tasks. No workers to manage however you must manage something like a Kubernetes cluster.

Examples: KubernetesExecutor, EcsExecutor


#### References

For more info, check out official docs:

https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html



## Setting up Airflow 2.10.4 with Docker

This is a quick, simple & less memory-intensive setup of Airflow that works on a LocalExecutor.

Only runs the webserver and the scheduler and runs the DAGs in the scheduler rather than running them in external workers:


### 1: Create a new sub-directory called airflow in your project dir. 

Inside airflow create dags, google and logs folders.

The directory structure should look like this:

```

├── airflow
│   ├── dags
|   |
│   ├── google
|   |
│   └── logs

```


### 2:  Create a Dockerfile. 

Create a Dockerfile inside airflow folder. We are going to use this dockerfile:

```dockerfile

FROM apache/airflow:2.10.4-python3.8

ENV AIRFLOW_HOME=/opt/airflow

USER airflow
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR $AIRFLOW_HOME
COPY ./google /opt/airflow/google
```


This Dockerfile creates a Docker image for Apache Airflow, installs additional Python packages from a requirements.txt file and copies google credentials into the container

### 3:  Create a Docker-compose.yaml

Docker-compose.yaml should look like this:

```yaml

version: '3.8'
services:
    postgres:
        image: postgres:13
        environment:
        - POSTGRES_USER=airflow
        - POSTGRES_PASSWORD=airflow
        - POSTGRES_DB=airflow
        volumes:
            - postgres-db-volume:/var/lib/postgresql/data
        healthcheck:
            test: ["CMD", "pg_isready", "-U", "airflow"]
            interval: 5s
            retries: 5

    init-airflow:
        build: .
        user: root
        depends_on:
        - postgres
        environment:
        - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow    
        command: >
          bash -c "
          until pg_isready -h postgres -U airflow; do
            echo 'Waiting for PostgreSQL to be ready...';
            sleep 2;
          done;
          airflow db migrate && airflow connections create-default-connections &&
          airflow users create -r Admin -u admin -p admin -e admin@example.com -f admin -l airflow &&
          airflow users create -r Admin -u airflow -p airflow -e airflow@example.com -f airflow -l airflow &&
          echo 'Initialization complete' &&
          touch /opt/airflow/shared/initialized
          "

        healthcheck:
            test: ["CMD-SHELL", "airflow db check && echo 'Database ready!'"]
            interval: 10s
            timeout: 10s
            retries: 5
            start_period: 10s

        volumes:
        - shared-data:/opt/airflow/shared            

    scheduler:
        build: .
        command: >
            bash -c "
            until [ -f /opt/airflow/shared/initialized ]; do
                echo 'Waiting for init-airflow to complete...';
                sleep 2;
            done;
            airflow scheduler
            "
        depends_on:
            - postgres
            - init-airflow
        environment:
        - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow
        - AIRFLOW_UID=50000
        - COMPOSE_PROJECT_NAME=airflow2025
        - AIRFLOW__CORE__EXECUTOR=LocalExecutor
        - AIRFLOW__SCHEDULER__SCHEDULER_HEARTBEAT_SEC=10
        - AIRFLOW_CONN_METADATA_DB=postgres+psycopg2://airflow:airflow@postgres:5432/airflow
        - AIRFLOW_VAR__METADATA_DB_SCHEMA=airflow
        - _AIRFLOW_WWW_USER_CREATE=True
        - _AIRFLOW_WWW_USER_USERNAME=airflow
        - _AIRFLOW_WWW_USER_PASSWORD=airflow
        - AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION=True
        - AIRFLOW__CORE__LOAD_EXAMPLES=False       
        volumes:
            - ./dags:/opt/airflow/dags
            - ./logs:/opt/airflow/logs
            - ./google:/opt/airflow/google:ro
            - shared-data:/opt/airflow/shared

    webserver:
        build: .
        command: >
            bash -c "
            until [ -f /opt/airflow/shared/initialized ]; do
                echo 'Waiting for init-airflow to complete...';
                sleep 2;
            done;
            airflow webserver
            "
        depends_on:
            - postgres
            - init-airflow
            - scheduler
        environment:
        - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow
        - AIRFLOW_UID=50000
        - COMPOSE_PROJECT_NAME=airflow2025
        - AIRFLOW__CORE__EXECUTOR=LocalExecutor
        - AIRFLOW__SCHEDULER__SCHEDULER_HEARTBEAT_SEC=10
        - AIRFLOW_CONN_METADATA_DB=postgres+psycopg2://airflow:airflow@postgres:5432/airflow
        - AIRFLOW_VAR__METADATA_DB_SCHEMA=airflow
        - _AIRFLOW_WWW_USER_CREATE=True
        - _AIRFLOW_WWW_USER_USERNAME=airflow
        - _AIRFLOW_WWW_USER_PASSWORD=airflow
        - AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION=True
        - AIRFLOW__CORE__LOAD_EXAMPLES=False   
        volumes:
            - ./dags:/opt/airflow/dags
            - ./logs:/opt/airflow/logs
            - ./google:/opt/airflow/google:ro
            - shared-data:/opt/airflow/shared            

        user: "50000:0"
        ports:
            - "8080:8080"
        healthcheck:
            test: [ "CMD-SHELL", "[ -f /home/airflow/airflow-webserver.pid ]" ]
            interval: 30s
            timeout: 30s
            retries: 3

volumes:
  postgres-db-volume:
  shared-data:
```  

Postgres:

- Runs PostgreSQL 13 and sets up the database with user airflow, password airflow, and database airflow.
- Persists data using a named volume (postgres-db-volume).

Init-airflow:

- Ensure PostgreSQL is ready (pg_isready).
- Migrate the Airflow database schema (airflow db migrate).
- Set up default Airflow connections and create default users (Admin and airflow).
- Marks initialization as complete by touching a file (/opt/airflow/shared/initialized).
- Shares data in a volume (shared-data) to be used by other services

Scheduler:

- Waits for init-airflow to finish initializing by checking the initialized file before starting the Airflow scheduler.
- Configures the Airflow scheduler with specific settings, such as the executor type and database connection.
- Maps directories for Airflow DAGs (./dags), logs (./logs), and Google credentials (./google) to the container's respective directories.

Webserver:

- Similar to the scheduler, it waits for the initialized file before starting the Airflow web server.
- Runs the Airflow web server, providing the web interface for managing DAGs, tasks, and users.
- Depends on postgres, init-airflow, and scheduler.
- Exposes port 8080 for access to the web UI.


Volumes:

- postgres-db-volume: Stores PostgreSQL data persistently.
- shared-data: Shared volume to store Airflow's initialization data that other services can use.


### 4:  Copy your google-credentials.json inside the google folder. 

> [!WARNING]  
> Remember to add this json to the .gitignore file !

---

### 5:  Copy python files. 

Copy from this repo to your dags folder:

- data_ingestion_local.py 
- data_ingestion_gcp_green.py 
- data_ingestion_gcp_yellow.py 

### 6:  Create a requirements.txt

requirements.txt, should look like:

```
apache-airflow-providers-google
pyarrow
pandas
sqlalchemy
psycopg2-binary
requests
```

The directory structure now should look like this:

```

└── airflow
    ├── dags
    |   ├── data_ingestion_local.py
    |   ├── data_ingestion_gcp_green.py
    |   └── data_ingestion_gcp_yellow.py
    |
    ├── google
    |   └── credentials.json
    |
    ├── logs
    |
    ├── docker-compose.yaml
    ├── Dockerfile
    └── requirements.txt
```


### 7:  Build the image. 

You only need to do this the first time you run Airflow or if you modified the Dockerfile or the requirements.txt file:

```
    docker-compose build
```

First-time build can take up to 10 mins.

### 8: Run Airflow:    

```
    docker-compose -p airflow2025 up -d
```

The -p option specifies a custom project name (airflow2025 in this case). By default, Docker Compose uses the directory name as the project name, but this flag allows you to override it.

The -d option stands for "detached mode," meaning the containers will run in the background, allowing you to continue using the terminal without being attached to the container logs.

The first time it is run, the airflow-init service may take a few minutes to prepare the database

In docker desktop if you want you can go to the logs section of airflow-init and see something like this:

```
2025-01-03 13:16:47 postgres:5432 - accepting connections
2025-01-03 13:16:53 DB: postgresql+psycopg2://airflow:***@postgres/airflow
2025-01-03 13:16:53 Performing upgrade to the metadata database postgresql+psycopg2://airflow:***@postgres/airflow
2025-01-03 13:17:14 Database migrating done!

2025-01-03 13:17:30 User "admin" created with role "Admin"
2025-01-03 13:17:35 User "airflow" created with role "Admin"
2025-01-03 13:17:36 Initialization complete
```

and webserver logs should look like this:

```
2025-01-03 13:17:34 Waiting for init-airflow to complete...
2025-01-03 13:17:36 Waiting for init-airflow to complete...

2025-01-03 13:20:34   ____________       _____________
2025-01-03 13:20:34  ____    |__( )_________  __/__  /________      __
2025-01-03 13:20:34 ____  /| |_  /__  ___/_  /_ __  /_  __ \_ | /| / /
2025-01-03 13:20:34 ___  ___ |  / _  /   _  __/ _  / / /_/ /_ |/ |/ /
2025-01-03 13:20:34  _/_/  |_/_/  /_/    /_/    /_/  \____/____/|__/
2025-01-03 13:20:34 Running the Gunicorn Server with:
2025-01-03 13:20:34 Workers: 4 sync
2025-01-03 13:20:34 Host: 0.0.0.0:8080
```

In the docker logs you can see how the webserver and the scheduler wait for the database to be ready to start.

### 8: Airflow GUI 

You may now access the Airflow GUI by browsing to localhost:8080. It may take a few minutes to load the webApp

```
Username: airflow
Password: airflow 
```
<br>

![airflow8](images/airflow8.jpg)
<br><br>


## Ingesting data to local Postgres

This section focuses on setting up a local PostgreSQL database and using Apache Airflow to ingest NYC taxi trip
data. The process involves creating a dedicated directory for the database and configuring a docker-compose 
file to define the PostgreSQL service. This service connects to Airflow's network, allowing seamless integration
for data ingestion workflows. 

For testing purposes, we will be ingesting Yellow Taxi data from January to March 2021. You can find all 
datasets in https://github.com/DataTalksClub/nyc-tlc-data/releases/tag/yellow



![airflowgcp9](images/airflowgcp9.jpg)
<br><br>



**1: Create a new sub-directory** 

Create a new sub-directory called database_ny_taxi at the same level as airflow folder. Inside database_ny_taxi
create ny_taxi_postgres_data folder and docker-compose-lesson1.yaml file

The directory structure now should look like this:

```
├── airflow
|   ├── dags
|   |   ├── data_ingestion_local.py
|   |   ├── data_ingestion_gcp_green.py
|   |   └── data_ingestion_gcp_yellow.py
|   |
|   ├── google
|   |   └── credentials.json
|   |
|   ├── logs
|   |
|   ├── docker-compose.yaml
|   ├── Dockerfile
|   └── requirements.txt
│
└── database_ny_taxi
    ├── ny_taxi_postgres_data
    └── docker-compose-lesson1.yaml

```


**2: Find the airflow network**

In a separate terminal, let's find out which virtual network Airflow is running on using the following command:
 
 ```
docker network ls
```

Make sure that you are running the containers for airflow services before running docker network ls

It should print something like this:

```
    NETWORK ID     NAME                  DRIVER    SCOPE
    690b4b59769b   airflow2025_default   bridge    local

```    



**3: Create docker-compose.yaml file for the database** 

Modify the docker-compose.yaml file from module 1 by adding the network (airflow2025_default) info and removing
 away the pgAdmin service. docker-compose-lesson1.yaml should look like this:

```dockerfile

services:
  pgdatabase:
    image: postgres:13
    environment:
      - POSTGRES_USER=root2
      - POSTGRES_PASSWORD=root2
      - POSTGRES_DB=ny_taxi
    volumes:
      - "./ny_taxi_postgres_data:/var/lib/postgresql/data:rw"
    ports:
      - "5433:5432"
    networks:
      - airflow

    
networks:
  airflow:
    external: true
    name: airflow2025_default
```    

**4: Run Postgres:**

Make sure to execute the docker-compose command in the database_ny_taxi directory:

```
    docker-compose -f docker-compose-lesson1.yaml up
```

**5: Check database with PGCLI** 

Once the container is running, we can log into our database with the following command:
```
    pgcli -h localhost -p 5433 -u root2 -d ny_taxi
```

**6: Prepare the DAG**

Inside your dags folder, create a data_ingestion_local.py file. The DAG will have the following tasks:

- A PythonOperator task that will download the NYC taxi data.
- A PythonOperator task that will ingest data into our database

Two utility functions are defined:

- download_and_unzip: Downloads a .csv.gz file from a URL and extracts it into a .csv file. Makes a GET request to fetch the file from the given url. Saves the .gz file locally and unzips the file using the gzip library and writes it to a local .csv file.

- process_and_insert_to_db: This is our script for module 1. Reads the .csv file in chunks, processes it, and inserts the data into the PostgreSQL database. Connects to the PostgreSQL database using sqlalchemy. Reads the .csv file in chunks of 100,000 rows using pandas. Creates the table in the database (or replaces it if it exists). Appends the data chunk by chunk into the database.

Dynamic Variables:

The following variables dynamically adapt based on the Airflow execution_date:

- table_name_template: Name of the database table (e.g., yellow_taxi_2021_02).
- csv_name_gz_template: Name of the .csv.gz file (e.g., output_2021_02.csv.gz).
- csv_name_template: Name of the .csv file (e.g., output_2021_02.csv).
- url_template: URL to download the .csv.gz

Observe how the names of the tables in the database and the URL are generated dynamically according to the execution date using JINJA template.

data_ingestion_local.py look like this:

```python

from datetime import datetime
from airflow import DAG
from airflow.operators.python import PythonOperator

import pandas as pd
from sqlalchemy import create_engine
import requests
import gzip
import shutil



# This info is from docker-compose-lesson1.yaml
user = "root2"
password = "root2"
host = "pgdatabase"
port = "5432"
db = "ny_taxi"


def download_and_unzip(csv_name_gz, csv_name, url):

    # Download the CSV.GZ file
    response = requests.get(url)
    if response.status_code == 200:
        with open(csv_name_gz, 'wb') as f_out:
            f_out.write(response.content)
    else:
        print(f"Error downloading file: {response.status_code}")
        return False

    # Unzip the CSV file
    with gzip.open(csv_name_gz, 'rb') as f_in:
        with open(csv_name, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
    
    return True


def process_and_insert_to_db(csv_name, user, password, host, port, db, table_name):
    # Connect to PostgreSQL database
    engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{db}')
    df_iter = pd.read_csv(csv_name, iterator=True, chunksize=100000)

    # Process the first chunk
    df = next(df_iter)
    df.tpep_pickup_datetime = pd.to_datetime(df.tpep_pickup_datetime)
    df.tpep_dropoff_datetime = pd.to_datetime(df.tpep_dropoff_datetime)

    # Insert the data into the database
    df.head(n=0).to_sql(name=table_name, con=engine, if_exists='replace')
    df.to_sql(name=table_name, con=engine, if_exists='append')

    # Process the rest of the data
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


# Defining the DAG
dag = DAG(
    "yellow_taxi_ingestion",
    schedule_interval="0 6 2 * *",
    start_date=datetime(2021, 1, 1),
    end_date=datetime(2021, 3, 28),
    catchup=True, # True means run past missed jobs
    max_active_runs=1,
)

table_name_template = 'yellow_taxi_{{ execution_date.strftime(\'%Y_%m\') }}'
csv_name_gz_template = 'output_{{ execution_date.strftime(\'%Y_%m\') }}.csv.gz'
csv_name_template = 'output_{{ execution_date.strftime(\'%Y_%m\') }}.csv'

url_template = "https://github.com/DataTalksClub/nyc-tlc-data/releases/download/yellow/yellow_tripdata_{{ execution_date.strftime(\'%Y-%m\') }}.csv.gz"

# Task 1
download_task = PythonOperator(
    task_id="download_and_unzip",
    python_callable=download_and_unzip,
    op_kwargs={
        'csv_name_gz': csv_name_gz_template,
        'csv_name': csv_name_template,
        'url': url_template
    },
    dag=dag
)

# Task 2:
process_task = PythonOperator(
    task_id="process_and_insert_to_db",
    python_callable=process_and_insert_to_db,
    op_kwargs={
        'csv_name': csv_name_template,
        'user': user,
        'password': password,
        'host': host,
        'port': port,
        'db': db,
        'table_name': table_name_template
     
    },
    dag=dag
)

# Establish the sequence of tasks
download_task >> process_task
```

**Code Explanation:**

DAG Configuration:

- Schedule: Runs at 6:00 AM on the 2nd day of each month (0 6 2 * *)
- Date Range: Starts on February 1, 2021, and ends on March 28, 2021.
- catchup=True: This parameter ensures that if the DAG was paused or missed runs during the period between the start_date and end_date, Airflow will try to "catch up" and run all the missed executions, one for each scheduled date.
- max_active_runs=1: This limits the DAG to only have one active run at any time, preventing overlapping executions of the DAG

Tasks:

- download_task: Downloads and extracts the .csv.gz file. Uses the download_and_unzip function. Passes the dynamic file names and URL as arguments

- process_task: Processes the .csv file and uploads its content to the PostgreSQL database.Uses the process_and_insert_to_db function. Passes the database credentials, table name, and file name as arguments

Task Dependency:

The tasks are executed sequentially: download_task → process_task

The data is downloaded and extracted before being processed and ingested into the database.

**7: Unpause DAG** 

Open the Airflow dashboard and unpause the "yellow_taxi_ingestion" DAG from data_ingestion_local.py.

While ingesting the data, you can check logs:

![airflow6](images/airflow6.jpg)

After executing all tasks for all dates, should look like this:

![airflow7](images/airflow7.jpg)


**8: Check tables** 

Check tables on your local Postgres database:

Type "\dt" in the pgcli terminal. It should print:

```
+--------+---------------------+-------+-------+
| Schema | Name                | Type  | Owner |
|--------+---------------------+-------+-------|
| public | yellow_taxi_2021_01 | table | root2 |
| public | yellow_taxi_2021_02 | table | root2 |
| public | yellow_taxi_2021_03 | table | root2 |
+--------+---------------------+-------+-------+
```

Now you can query the tables:

```
root2@localhost:ny_taxi> select count(1) from yellow_taxi_2021_02;
+---------+
| count   |
|---------|
| 1371708 |
+---------+
```



## Ingesting data to GCP

You can find all datasets in https://github.com/DataTalksClub/nyc-tlc-data/releases/

### Introduction

We will now run a slightly more complex DAG that will:

- Download and unzip one file for each month
- Convert into parquet
- Upload it to GCS (bucket)
- Create the final table with a given schema in BigQuery
- Create a external table referencing the raw data in GCS in BigQuery
- Create a temporary native table in BigQuery for a given month by reading from the external table created earlier. Also adds two columns a unique unique_row_id for each record by hashing certain fields, and stores the file name for reference.
- Update the final table with data from the temporary table

<br>

![airflowgcp10](images/airflowgcp10.jpg)
<br><br>


**Tables explanation**

- External Table: Serves as the initial point of access to the raw data. The data in this table is not physically stored in BigQuery. There is a External table for each month

- Temporary table: This is a native table created in BigQuery using the data from the external table. Copies the entire dataset from the associated external table into this table, while enriching it with the additional columns unique_row_id and filename. There is a native table for each month.

- Final table: After processing the data and ensuring there are no duplicates or inconsistencies, the final data is merged into this table. It represents the cleaned, transformed, and de-duplicated dataset including data from all months.



### 1: Create connection with GCP:

To create a connection with Google Cloud Platform (GCP) from the Airflow UI go to the top menu and click on Admin, From the dropdown, select Connections. This will take you to the page where you can manage your Airflow connections.

On the Connections page, click the + button. 

Complete Connection id, Connection type, your project id and Keyfile Path (with your json name)

<br>

![gcpairflow](images/gcpairflow.jpg)




### 2: Prepare the DAG

As an example, we will download and process the green files from January 2019 to December 2019.

To process the Yellow Taxi data, the DAG is similar, slightly changing the schema of the tables and the utility function to convert to parquet is done in chunks to avoid overloading the PC.

data_ingestion_gcp_green.py looks like this:

```python

import os
from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator
from airflow.providers.google.cloud.hooks.gcs import GCSHook
import requests
import gzip
import shutil
import pyarrow
import pyarrow.csv
import pyarrow.parquet 



# Make sure the values ​​match your gcp values
PROJECT_ID="zoomcamp-airflow-444903"
BUCKET="zoomcamp_datalake"
BIGQUERY_DATASET = "airflow2025b"
path_to_local_home = os.environ.get("AIRFLOW_HOME", "/opt/airflow/")


# Utility functions
def download(file_gz, file_csv, url):

    # Download the CSV.GZ file
    response = requests.get(url)
    if response.status_code == 200:
        with open(file_gz, 'wb') as f_out:
            f_out.write(response.content)
    else:
        print(f"Error downloading file: {response.status_code}")
        return False
    
    # Unzip the CSV file
    with gzip.open(file_gz, 'rb') as f_in:
        with open(file_csv, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
    

def format_to_parquet(src_file):

    table = pyarrow.csv.read_csv(src_file)

    # change ehail_fee to float64
    if 'ehail_fee' in table.column_names:
        # Convertir la columna 'ehail_fee' a float (FLOAT64)
        table = table.set_column(
            table.schema.get_field_index('ehail_fee'),
            'ehail_fee',
            pyarrow.array(table['ehail_fee'].to_pandas().astype('float64'))  
        )

    pyarrow.parquet.write_table(table, src_file.replace('.csv', '.parquet'))



def upload_to_gcs(bucket, object_name, local_file, gcp_conn_id="gcp-airflow"):
    hook = GCSHook(gcp_conn_id)
    hook.upload(
        bucket_name=bucket,
        object_name=object_name,
        filename=local_file,
        timeout=600
    )


# Defining the DAG
dag = DAG(
    "GCP_ingestion_green",
    schedule_interval="0 6 2 * *",
    start_date=datetime(2019, 1, 1),
    end_date=datetime(2019, 12, 31),
    catchup=True, 
    max_active_runs=1,
)

table_name_template = 'green_taxi_{{ execution_date.strftime(\'%Y_%m\') }}'
file_template_csv_gz = 'output_{{ execution_date.strftime(\'%Y_%m\') }}.csv.gz'
file_template_csv = 'output_{{ execution_date.strftime(\'%Y_%m\') }}.csv'
file_template_parquet = 'output_{{ execution_date.strftime(\'%Y_%m\') }}.parquet'
consolidated_table_name = "green_{{ execution_date.strftime(\'%Y\') }}"
url_template = "https://github.com/DataTalksClub/nyc-tlc-data/releases/download/green/green_tripdata_{{ execution_date.strftime(\'%Y-%m\') }}.csv.gz"


# Task 1: Download and unzip file
download_task = PythonOperator(
    task_id="download",
    python_callable=download,
    op_kwargs={
        'file_gz': file_template_csv_gz,
        'file_csv': file_template_csv,
        'file_parquet': file_template_parquet,
        'url': url_template
    },
    retries=10,
    dag=dag
)

# Task 2: Format to parquet
process_task = PythonOperator(
    task_id="format_to_parquet",
    python_callable=format_to_parquet,
    op_kwargs={
        "src_file": f"{path_to_local_home}/{file_template_csv}"
    },
    retries=10,
    dag=dag
)


# Task 3: Upload file to google storage
local_to_gcs_task = PythonOperator(
    task_id="upload_to_gcs",
    python_callable=upload_to_gcs,
    op_kwargs={
        "bucket": BUCKET,
        "object_name": f"raw/{file_template_parquet}",
        "local_file": f"{path_to_local_home}/{file_template_parquet}",
        "gcp_conn_id": "gcp-airflow"
    },
    retries=10,
    dag=dag
)

# Task 4: Create final table
create_final_table_task = BigQueryInsertJobOperator(
    task_id="create_final_table",
    gcp_conn_id="gcp-airflow",
    configuration={
        "query": {
            "query": f"""
                CREATE TABLE IF NOT EXISTS `{PROJECT_ID}.{BIGQUERY_DATASET}.{consolidated_table_name}`
                (
                    unique_row_id BYTES,
                    filename STRING,      
                    VendorID INT64,
                    lpep_pickup_datetime TIMESTAMP,
                    lpep_dropoff_datetime TIMESTAMP,
                    store_and_fwd_flag STRING,
                    RatecodeID INT64,
                    PULocationID INT64,
                    DOLocationID INT64,
                    passenger_count INT64,
                    trip_distance FLOAT64,
                    fare_amount FLOAT64,
                    extra FLOAT64,
                    mta_tax FLOAT64,
                    tip_amount FLOAT64,
                    tolls_amount FLOAT64,
                    ehail_fee FLOAT64,
                    improvement_surcharge FLOAT64,
                    total_amount FLOAT64,
                    payment_type INT64,
                    trip_type INT64,
                    congestion_surcharge FLOAT64
                )    
            """,
            "useLegacySql": False,
        }
    },
    retries=3,
    dag=dag,
)

# Task 5: Create external monthly table
create_external_table_task = BigQueryInsertJobOperator(
    task_id="create_external_table",
    gcp_conn_id="gcp-airflow",
    configuration={
        "query": {
            "query": f"""
                CREATE OR REPLACE EXTERNAL TABLE `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_ext`
                (
                    VendorID INT64,
                    lpep_pickup_datetime TIMESTAMP,
                    lpep_dropoff_datetime TIMESTAMP,
                    store_and_fwd_flag STRING,
                    RatecodeID INT64,
                    PULocationID INT64,
                    DOLocationID INT64,
                    passenger_count INT64,
                    trip_distance FLOAT64,
                    fare_amount FLOAT64,
                    extra FLOAT64,
                    mta_tax FLOAT64,
                    tip_amount FLOAT64,
                    tolls_amount FLOAT64,
                    ehail_fee FLOAT64,
                    improvement_surcharge FLOAT64,
                    total_amount FLOAT64,
                    payment_type INT64,
                    trip_type INT64,
                    congestion_surcharge FLOAT64
                )
                OPTIONS (
                    uris = ['gs://{BUCKET}/raw/{file_template_parquet}'],
                    format = 'PARQUET'
                );
            """,
            "useLegacySql": False,
        }
    },
    retries=3,
    dag=dag
)

# Task 6: Create native monthly table
create_temp_table_task = BigQueryInsertJobOperator(
    task_id="create_temp_table",
    gcp_conn_id="gcp-airflow",
    configuration={
        "query": {
            "query": f"""
                CREATE OR REPLACE TABLE `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_tmp`
                AS
                SELECT
                    MD5(CONCAT(
                        COALESCE(CAST(VendorID AS STRING), ""),
                        COALESCE(CAST(lpep_pickup_datetime AS STRING), ""),
                        COALESCE(CAST(lpep_dropoff_datetime AS STRING), ""),
                        COALESCE(CAST(PULocationID AS STRING), ""),
                        COALESCE(CAST(DOLocationID AS STRING), "")
                    )) AS unique_row_id,
                    "{file_template_parquet}" AS filename,
                    *
                FROM `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_ext`;
            """,
            "useLegacySql": False,
        }
    },
    retries=3,
    dag=dag,
)


# Task 7: Merge
merge_to_final_table_task = BigQueryInsertJobOperator(
    task_id="merge_to_final_table",
    gcp_conn_id="gcp-airflow",
    configuration={
        "query": {
            "query": f"""
                MERGE INTO `{PROJECT_ID}.{BIGQUERY_DATASET}.{consolidated_table_name}` T
                USING `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_tmp` S
                ON T.unique_row_id = S.unique_row_id
                WHEN NOT MATCHED THEN
                    INSERT (unique_row_id, filename, VendorID, lpep_pickup_datetime, lpep_dropoff_datetime, store_and_fwd_flag, RatecodeID, PULocationID, DOLocationID, passenger_count, trip_distance, fare_amount, extra, mta_tax, tip_amount, tolls_amount, ehail_fee, improvement_surcharge, total_amount, payment_type, trip_type, congestion_surcharge)
                    VALUES (S.unique_row_id, S.filename, S.VendorID, S.lpep_pickup_datetime, S.lpep_dropoff_datetime, S.store_and_fwd_flag, S.RatecodeID, S.PULocationID, S.DOLocationID, S.passenger_count, S.trip_distance, S.fare_amount, S.extra, S.mta_tax, S.tip_amount, S.tolls_amount, S.ehail_fee, S.improvement_surcharge, S.total_amount, S.payment_type, S.trip_type, S.congestion_surcharge);
            """,
            "useLegacySql": False,
        }
    },
    retries=3,
    dag=dag,
)

# Task 8: Delete local files after upload
cleanup_task = BashOperator(
    task_id="cleanup_files",
    bash_command=f"rm -f {path_to_local_home}/{file_template_csv_gz} {path_to_local_home}/{file_template_csv} {path_to_local_home}/{file_template_parquet}",
    dag=dag,
)


download_task >> process_task >> local_to_gcs_task >> create_final_table_task >> create_external_table_task >> create_temp_table_task >> merge_to_final_table_task >> cleanup_task

```

**Let's explain step by step what this code does:**

Modules:

- BigQueryInsertJobOperator: Executes SQL queries in Google BigQuery as tasks.
- GCSHook:  A helper class to interact with Google Cloud Storage (GCS). Uploads Parquet files to GCS.
- requests: Makes HTTP requests to external APIs or URLs.
- gzip: Handles reading and decompressing .gz files.
- pyarrow: Converts the CSV file into a Parquet file. Modifies the schema to handle specific data types (e.g., ehail_fee as float64).


Configuration Variables:

- PROJECT_ID: The Google Cloud project ID.
- BUCKET: The Google Cloud Storage bucket name.
- BIGQUERY_DATASET: The BigQuery dataset name.
- path_to_local_home: Local directory path for Airflow tasks.

Utility Functions:

- download: Downloads a .csv.gz file from a URL. Decompresses the file into a .csv format.

- format_to_parquet: Converts a CSV file to a Parquet file using PyArrow. It also ensures that specific columns (like ehail_fee) have consistent data types.

- upload_to_gcs: Uploads a local file to a specified GCS bucket. Uses the Airflow GCSHook for the connection.


Dynamic Variables:

- Table Name Template: This creates a template for the BigQuery table name. For example "yellow_taxi_2025_01"
- file_template_csv_gz: This template generates the file name for the compressed .csv.gz file. For example "output_2019_01.csv.gz"
- file_template_csv: This template generates the file name for the decompressed .csv file. For example "output_2019_01.csv"
- file_template_parquet: This template generates the file name for the .parquet file. For example "output_2019_01.parquet"
- url_template: This template generates the download URL for the .csv.gz file. The {{ execution_date.strftime('%Y-%m') }} dynamically inserts the YYYY-MM format of the execution date into the URL.

Task Definitions:

- download_task: Uses the download function to download and unzip the .csv.gz file for the specified month.

- process_task: Converts the downloaded .csv file into Parquet format.

- local_to_gcs_task: This task uploads the downloaded file from the local machine to Google Cloud Storage (GCS).
The upload_to_gcs utility function is used to upload the file to the specified bucket and path (raw/{file_template}).

- create_final_table_task: This task creates a final BigQuery table (green_2019) if it doesn't already exist.
The table schema includes various fields related to the green taxi trip data (e.g., VendorID, pickup/dropoff datetime, fare amount, etc.). This task uses the BigQueryInsertJobOperator to execute a SQL query in BigQuery.The query creates the table green_2019 in the dataset specified (airflow2025), if it doesn't already exist.The table is created using a CREATE TABLE IF NOT EXISTS statement to ensure it is only created once.

- create_external_table_task: This task creates an external BigQuery table for a given month from the parquet file in GCS. The external table references the raw data in GCS, using parquet file and specifies the format as PARQUET. This task uses the BigQueryInsertJobOperator to run another SQL query

- create_temp_table_task: This task creates a temporary native table in BigQuery for a given month by reading from the external table created earlier. It generates a unique unique_row_id for each record by hashing certain fields, and stores the file name for reference.

- merge_to_final_table_task: This task performs a merge operation to update the final table (green_2022) with data from the temporary table. It inserts records into the final table where there is no match (based on the unique_row_id), ensuring that only new or updated data is added. This task uses the BigQueryInsertJobOperator to perform a MERGE SQL operation.

### 3: Unpause the DAG


Unpause the DAG and after a few minutes, should look like this:
<br>

![airflowgcp7](images/airflowgcp7.jpg)
<br><br>



### 4: Check GCP

Once the DAG finishes, you can go to your GCP project's dashboard and search for BigQuery. You should see your project ID; expand it and you should see the final 2019 table, the external tables and the temp tables:
<br>

![airflownew3](images/airflownew3.jpg)
<br><br>

And you can query the final table:

<br>

![airflownew4](images/airflownew4.jpg)
<br><br>

<br>

![airflownew5](images/airflownew5.jpg)
<br><br>


You can also see the uploaded parquet files by searching the Cloud Storage service, selecting your bucket and then clicking on the raw/ folder. 

<br>

![airflowgcp6](images/airflowgcp6.jpg)
<br><br>

You may now shutdown Airflow by running docker-compose down on the terminal where you run it.

# Airflow and Kubernetes

Kubernetes is an open-source platform for managing containerized applications. Its architecture is designed to provide scalability, reliability, and automation for deploying and running applications. Here’s a simple breakdown of its architecture:

**1. Cluster**

A Kubernetes cluster is the main unit, consisting of two types of components: Control Plane and Worker Nodes.

**2. Control Plane**

The control plane manages the cluster and decides where and how applications run

**3. Worker Nodes**

Worker nodes are where your applications (containers) actually run. Each node has a Kubelet: A small agent that communicates with the control plane and ensures containers are running as instructed.

**4. Pods**

A pod is the smallest unit in Kubernetes. Each pod contains one or more containers that share storage, network, and specifications. Kubernetes manages applications by managing pods.

**Kubernetes and Airflow**

Kubernetes can be used as the underlying infrastructure to run Airflow. Airflow’s components, like the web server, scheduler, and worker nodes, can be deployed on a Kubernetes cluster. Kubernetes takes care of scaling and managing these components.

**Google Kubernetes Engine (GKE)**

Google Kubernetes Engine (GKE) is a managed environment provided by Google Cloud for deploying, managing, and scaling containerized applications using Kubernetes. Kubernetes is an open-source platform for automating containerized application deployment, scaling, and operations. GKE takes care of the underlying infrastructure, including provisioning virtual machines, networking, and storage, so users can focus on building and running their applications.


## Setting up Airflow with Kubernetes

**1: Enable Kubernetes Engine API**

Enabling the API is the first step in using Google Kubernetes Engine, and it ensures that the required services and resources for managing Kubernetes clusters are available in your project. You can enable it from the Google Cloud Console or via the gcloud command-line tool. Once the API is enabled, you can use GKE to run and manage containerized workloads in a fully managed Kubernetes environment.

On the left hand side find Kubernetes Engine → Configurationand enable the Kubernetes Engine API 

![kubeapi](images/kubeapi.jpg)

**2: Install SDK, kubectl and helm**

Install SDK on linux/WSL2:

```
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

Install plugin gcloud-auth-plugin:

```
install plugin gcloud-auth-plugin
```

Install kubectl:

kubectl is the command-line interface (CLI) tool used for interacting with Kubernetes clusters. It allows users to manage and deploy applications, inspect cluster resources, and perform various administrative tasks in a Kubernetes environment.

```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Install helm:

Helm is a package manager for Kubernetes, which simplifies the process of deploying and managing applications on Kubernetes clusters. Helm packages applications into "charts," which are pre-configured Kubernetes resources bundled together.

```
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Add the official Apache Airflow Helm chart repository to your Helm client:

```
helm repo add apache-airflow https://airflow.apache.org
helm repo update
```

By adding this repository, you can now use Helm to search for and install Apache Airflow charts from this source.

**3: Create a new Kubernetes cluster on Google Kubernetes Engine (GKE)**

This command creates a GKE cluster called airflow-cluster in the us-central1 region, with a single node using the e2-standard-4 machine type. This would be a minimal setup suitable for testing or development purposes.

```
gcloud container clusters create airflow-cluster \
  --num-nodes=1 \
  --machine-type=e2-standard-4 \
  --region=us-central1
```  

Can take up to 5 mins

Then create a new namespace called airflow within a Kubernetes cluster.

In Kubernetes, namespaces are a way to organize and isolate resources within a cluster. They allow you to divide the cluster into multiple virtual clusters, each containing its own set of resources, such as pods, services, and deployments. This helps in managing and organizing resources for different projects, teams, or applications within the same physical Kubernetes cluster.

```
kubectl create namespace airflow
```

Browse to the Clusters tab on Kubernetes Engine to view the newly created cluster:

![kube0](images/kube0.jpg)

**4: Values.yaml**

The values.yaml file in Helm is a configuration file used to customize the deployment of a Helm chart. Helm charts come with a set of default configuration values, but you can modify these values to suit your specific needs by creating and using a custom values.yaml file.

Changes made:

```yaml
executor: "LocalExecutor"
```

```yaml
triggerer:
  enabled: false
```  

Size of persistent volume for webserver, workers and logs from 100Gi to 10Gi:

```yaml
size: 10Gi
```

Default chart yaml:

-  [`default-values.yaml`](airflow-kubernetes/default-values.yaml)


Customized yaml with local executor, disabled triggerer and reduced volumes:

-  [`values.yaml`](airflow-kubernetes/values.yaml)


**5: Install airflow**

This command installs the Apache Airflow application to a Kubernetes cluster using the apache-airflow/airflow Helm chart, with custom settings specified in the values.yaml file, and it installs the release into the airflow namespace of the cluster.

```
helm install airflow apache-airflow/airflow -n airflow -f values.yaml
```

It may take up to 5 minutes

**6: Check Pods**

This command will display details such as the names, statuses, and other information about the pods in the "airflow" namespace.

```
kubectl get pods -n airflow
```

should show something like this:

![kube1](images/kube1.jpg)


**7: Access the Airflow web interface**

This command forwards a local port to a port on a service in a Kubernetes cluster:

```
kubectl port-forward -n airflow svc/airflow-webserver 8080:8080
```

Go to localhost:8080

- Username: admin
- Password: admin

![kube2](images/kube2.jpg)


**8: Load DAGS**

This command copies all Python files from the local localdags directory to the dags directory of the specified Airflow pod.

Adjust with your local path:

```
kubectl cp /mnt/c/users/nacho/desktop/localdags/*.py airflow/airflow-scheduler-0:/opt/airflow/dags -n airflow
```

-  [`hello.py.yaml`](airflow-kubernetes/hello.py)

Once copied, you can access the pod.

This command opens an interactive Bash shell inside the airflow-scheduler-0 pod in the airflow namespace. It allows you to interact with the pod directly, similar to accessing a terminal on a local machine.

```
kubectl exec -it -n airflow airflow-scheduler-0 -- bash
```

![kube3](images/kube3.jpg)

As you can see, the file was copied successfully inside de pod

After a few minutes the DAG should appear in the UI:

![kubedag0](images/kubedag0.jpg)

**9: Trigger DAG**

![kubedag](images/kubedag.jpg)


## Ingesting data to GCP with kubernetes

Before you begin, check the Permissions in GCS.
Confirm that the zoomcamp_datalake bucket exists and that your service key has permissions to write to it, as well as create tables in BigQuery.

**1: Copy the DAG**

copy the DAG as in the previous example

-  [`data_ingestion_gcp.py`](airflow-kubernetes/data_ingestion_gcp.py)

**2: Create connection with GCP**

To create a connection with Google Cloud Platform (GCP) from the Airflow UI go to the top menu and click on Admin, From the dropdown, select Connections. This will take you to the page where you can manage your Airflow connections.

On the Connections page, click the + button.

Complete Connection id, Connection type, your project id and Keyfile Json (just copy and paste google json credentials)

![kubeconn](images/kubeconn.jpg)


**3: Install python dependencies**

Modify the values.yaml to include the python dependencies. Add this line just above the executor variable:

```yaml

extraPipPackages:
  - apache-airflow[google]
  - google-cloud-storage
  - pyarrow
  - pandas
  - requests  

# Airflow executor
# One of: LocalExecutor, LocalKubernetesExecutor, CeleryExecutor, KubernetesExecutor, CeleryKubernetesExecutor
executor: "LocalExecutor"
```

Full custom code:

-  [`values-gcp.yaml`](airflow-kubernetes/values-gcp.yaml)


**4: Upgrade airflow deployment**

Update Airflow deployment with this command:

```
helm upgrade airflow apache-airflow/airflow -n airflow -f values-gcp.yaml
```


**5: Unpause DAG**

Unpause the DAG, it should automatically start to do the catch-up

![kubegcprun](images/kubegcprun.jpg)


Once the DAG finishes, you can go to your GCP project's dashboard and search for BigQuery. You should see your project ID; expand it and you should see a new external_table table:

![kubebq1](images/kubebq1.jpg)

and query it:

![kubebq2](images/kubebq2.jpg)"
url: "# Workflow Orchestration with Airflow

### Table of contents

- [Airflow 2025](#airflow-2025)
    - [Module 1 recap](#module-1-recap)
    - [Data Lake vs Data Warehouse](#data-lake-vs-data-warehouse)
    - [ETL vs ELT](#etl-vs-elt)    
    - [Introduction to Workflow Orchestration](#introduction-to-workflow-orchestration)
    - [Airflow architecture](#airflow-architecture)
    - [Setting up Airflow 2.10.4 with Docker](#setting-up-airflow-2104-with-docker)
    - [Ingesting data to local Postgres](#ingesting-data-to-local-postgres)  
    - [Ingesting data to GCP](#ingesting-data-to-gcp)
- [Airflow and Kubernetes](#airflow-and-kubernetes)    
    - [Setting up Airflow with Kubernetes](#setting-up-airflow-with-kubernetes)
    - [Ingesting data to GCP with kubernetes](#ingesting-data-to-gcp-with-kubernetes)

    

# Airflow 2025


## Module 1 recap

_([Video source](https://www.youtube.com/watch?v=0yK7LXwYeD0))_

In the previous module we created a script that:

- Downloads a file and unzips it.
- Saves it locally as a CSV file.
- Loads and inserts the data into a PostgreSQL database.

This is what our "pipeline" looked like:

![pipeline1new](images/pipeline1new.jpg)


The script we created is an example of how **NOT** to create a pipeline, because it contains two steps that could be separated (downloading and inserting data). 

**Problems with the current pipeline:**

- If data download succeeds but insertion fails due to a database connection issue, the script needs to restart, including re-downloading the data.
- if we're simply testing the script, it will have to download the CSV file every single time that we run the script.
- Adding retry mechanisms and fail-safe logic for each stage becomes cumbersome.


**Improved pipeline structure**

To address these problems, we can split the script into two distinct steps or tasks:

![pipeline1modnew](images/pipeline1modnew.jpg)

This structure has dependencies between tasks, where one task's output is the next task's input and Task 2 is only performed if task 1 was executed successfully. 

*This is where the need for orchestrators arises*. Workflow orchestration tools help define, parameterize, and manage workflows. These tools provide:

- Ensuring tasks are executed in the right sequence or simultaneously, based on predefined rules or dependencies
- Retry mechanisms.
- Logging and execution history.
- Scheduling and monitoring.


This week we will work on a slightly more complex pipeline. This will involve extracting data from the web. Convert this CSV to a more effective format - parquet. We'll take this file and upload to Google Cloud Storage (data lake). Finally we'll create an external table in Google BigQuery(data warehouse):


![pipeline2new](images/pipeline2new.jpg) 


## Data Lake vs Data Warehouse

**Data Lake:**

- Purpose: Stores raw, unprocessed data from various sources, often for exploratory or advanced analytics.
- Data Format: Stores data in its original format (structured, semi-structured, or unstructured).
- Schema: Schema-on-read approach, meaning the schema is applied when the data is read, not when it is stored.
- Scalability: Highly scalable, designed for big data and low-cost storage.
- Users: Used by data scientists and engineers for machine learning, advanced analytics, and experimentation.
- Tools: Commonly associated with platforms like Google Cloud Storage, Amazon S3, or Azure Data Lake.

**Data Warehouse:**

- Purpose: Stores structured and cleaned data optimized for querying and reporting.
- Data Format: Stores structured and pre-processed data.
- Schema: Schema-on-write approach, meaning the schema is defined when the data is loaded into the warehouse.
- Performance: Optimized for complex SQL queries and business intelligence (BI) tools.
- Users: Used by analysts and business users for reporting and decision-making.
- Tools: Examples include Snowflake, Amazon Redshift, Google BigQuery, or Microsoft Azure Synapse.


## ETL vs ELT

**ETL (Extract, Transform, Load):**

Process Order:

- Extract: Data is extracted from source systems.
- Transform: Data is processed and transformed into a desired format or schema.
- Load: The transformed data is loaded into the destination (e.g., a data warehouse).

When to Use:

Ideal for traditional data warehouses where structured data is required upfront.

Performance:

Transformation happens before loading, so processing can take longer.

**ELT (Extract, Load, Transform):**

Process Order:

- Extract: Data is extracted from source systems.
- Load: The raw data is loaded into the destination (e.g., a data lake).
- Transform: Transformation happens after loading, within the storage system using its compute resources.

When to Use:

Suitable for modern architectures (e.g., data lakes or cloud-native data warehouses) where raw data can be transformed as needed.

Performance:

Leverages the power of the destination system to perform transformations, which can scale better for large datasets.

Tools:

Cloud-native tools like Apache Spark, dbt, or Google Dataflow are common for ELT pipelines.


## Introduction to Workflow Orchestration

Workflow Orchestration refers to the process of organizing, managing, and automating complex workflows, where 
multiple tasks are coordinated to achieve a specific outcome. It involves ensuring that tasks are 
executed in the correct order, handling dependencies between them, and managing resources or systems involved 
in the workflow.

Key characteristics of workflow orchestration include:

- Task Coordination: Ensuring tasks are executed in the right sequence or simultaneously, based on predefined rules or dependencies.

- Automation: Automating repetitive or complex processes to reduce manual intervention and improve efficiency.

- Error Handling: Managing errors or failures in tasks, often with retry mechanisms or alternative execution paths.

- Resource Management: Allocating resources (e.g., computing power, APIs, or data) to tasks as needed.

- Monitoring and Reporting: Tracking the progress of workflows, identifying bottlenecks, and providing logs or reports for analysis.


Popular tools for workflow orchestration include Apache Airflow, Prefect and Kestra. These tools help streamline and standardize complex workflows across multiple systems or environments.

## Airflow architecture

Apache Airflow® is an open-source platform for developing, scheduling, and monitoring batch-oriented workflows

Airflow is a platform that lets you build and run workflows. A workflow is represented as a DAG (a Directed Acyclic Graph), and contains individual pieces of work called Tasks, arranged with dependencies and data flows taken into account.

A DAG specifies the dependencies between tasks, which defines the order in which to execute the tasks. Tasks describe what to do, be it fetching data, running analysis, triggering other systems, or more

#### Airflow components

A minimal Airflow installation consists of the following components:

- A scheduler, which handles both triggering scheduled workflows, and submitting Tasks to the executor to run. The executor, is a configuration property of the scheduler, not a separate component and runs within the scheduler process. There are several executors available out of the box, and you can also write your own.

- A webserver, which presents a handy user interface to inspect, trigger and debug the behaviour of DAGs and tasks.

- A folder of DAG files, which is read by the scheduler to figure out what tasks to run and when to run them.

- A metadata database, which airflow components use to store state of workflows and tasks. Setting up a metadata database is described in Set up a Database Backend and is required for Airflow to work

Optional components:

- Optional worker, which executes the tasks given to it by the scheduler. In the basic installation worker might be part of the scheduler not a separate component. It can be run as a long running process in the CeleryExecutor, or as a POD in the KubernetesExecutor.
- Optional folder of plugins. Plugins are a way to extend Airflow’s functionality (similar to installed packages). Plugins are read by the scheduler, dag processor, triggerer and webserver

#### DAGS

A DAG (Directed Acyclic Graph) is the core concept of Airflow, collecting Tasks together, organized with dependencies and relationships to say how they should run.

Here’s a basic example DAG:

![airflow5](images/airflow5.jpg)

It defines four Tasks - A, B, C, and D - and dictates the order in which they have to run, and which tasks depend on what others. It will also say how often to run the DAG - maybe “every 5 minutes starting tomorrow”, or “every day since January 1st, 2020”.

The DAG itself doesn’t care about what is happening inside the tasks; it is merely concerned with how to execute them - the order to run them in, how many times to retry them, if they have timeouts, and so on

#### Declaring a DAG

There are three ways to declare a DAG.

**1: with statement** 

```python
 import datetime

 from airflow import DAG
 from airflow.operators.empty import EmptyOperator

 with DAG(
     dag_id="my_dag_name",
     start_date=datetime.datetime(2021, 1, 1),
     schedule="@daily",
 ):
     EmptyOperator(task_id="task")
```    

**2: standard constructor, passing the DAG into any operators you use**

```python
 import datetime

 from airflow import DAG
 from airflow.operators.empty import EmptyOperator

 my_dag = DAG(
     dag_id="my_dag_name",
     start_date=datetime.datetime(2021, 1, 1),
     schedule="@daily",
 )
 EmptyOperator(task_id="task", dag=my_dag)
 ```

 **3: @dag decorator to turn a function into a DAG generator**

 ```python
 import datetime

from airflow.decorators import dag
from airflow.operators.empty import EmptyOperator


@dag(start_date=datetime.datetime(2021, 1, 1), schedule="@daily")
def generate_dag():
    EmptyOperator(task_id="task")


generate_dag()
```

DAGs are nothing without Tasks to run, and those will usually come in the form of either Operators, Sensors or TaskFlow

#### Loading DAGs

Airflow loads DAGs from Python source files, which it looks for inside its configured DAG_FOLDER. It will take each file, execute it, and then load any DAG objects from that file.

This means you can define multiple DAGs per Python file, or even spread one very complex DAG across multiple Python files using imports.

#### Running DAGs

There are 2 main ways to run DAGs:

- **Triggering them manually via the web UI or programatically via API:** The Airflow web interface allows users to manually trigger the execution of a DAG. This is often used when you want to run a specific DAG outside of its scheduled time, for example, to run an ad-hoc task or for testing purposes. In the web UI, you can simply click the "Trigger Dag" button next to the DAG you want to execute, which will start its execution immediately.

- **Scheduling them:** Airflow allows you to schedule DAGs to run automatically at specific intervals. This is the most common way of running DAGs, as it enables them to execute regularly without manual intervention. You define the schedule using a cron expression or a predefined schedule like @daily, @hourly, etc., in the DAG definition. Once scheduled, Airflow's scheduler will monitor the DAG and trigger the tasks based on the defined schedule, ensuring that they run at the right times.

### DAG Runs

A DAG Run is an object representing an instantiation of the DAG in time. Any time the DAG is executed, a DAG Run is created and all tasks inside it are executed. The status of the DAG Run depends on the tasks states. Each DAG Run is run separately from one another, meaning that you can have many runs of a DAG at the same time.

A DAG Run status is determined when the execution of the DAG is finished. 

There are two possible terminal states for the DAG Run:

- success if all of the leaf nodes states are either success or skipped,

- failed if any of the leaf nodes state is either failed or upstream_failed.

#### Tasks

A Task is the basic unit of execution in Airflow. Tasks are arranged into DAGs, and then have upstream and downstream dependencies set between them in order to express the order they should run in.

There are three basic kinds of Task:

- Operators, predefined task templates that you can string together quickly to build most parts of your DAGs.

- Sensors, a special subclass of Operators which are entirely about waiting for an external event to happen.

- A TaskFlow-decorated @task, which is a custom Python function packaged up as a Task.

#### Operators

An Operator is conceptually a template for a predefined Task, that you can just define declaratively inside your DAG:

```python
with DAG("my-dag") as dag:
    ping = HttpOperator(endpoint="http://example.com/update/")
    email = EmailOperator(to="admin@example.com", subject="Update complete")

    ping >> email
```

Airflow has a very extensive set of operators available, with some built-in to the core or pre-installed providers. Some popular operators from core include:

- BashOperator - executes a bash command

- PythonOperator - calls an arbitrary Python function

- EmailOperator - sends an email

#### Executor

Executors are the mechanism by which task instances get run. Executors are set by the executor option in the [core] section of the configuration file.

There are two types of executors - those that run tasks locally (inside the scheduler process), and those that run their tasks remotely (usually via a pool of workers). 

**Local Executors**

Airflow tasks are run locally within the scheduler process.

Pros: Very easy to use, fast, very low latency, and few requirements for setup.

Cons: Limited in capabilities and shares resources with the Airflow scheduler.

Examples: Local Executor, Sequential Executor

**Remote Executors**

Remote executors can further be divided into two categories:

1. Queued/Batch Executors

Airflow tasks are sent to a central queue where remote workers pull tasks to execute. Often workers are persistent and run multiple tasks at once.

Pros: More robust since you’re decoupling workers from the scheduler process. Workers can be large hosts that can churn through many tasks (often in parallel) which is cost effective. Latency can be relatively low since workers can be provisioned to be running at all times to take tasks immediately from the queue.

Cons: Shared workers have the noisy neighbor problem with tasks competing for resources on the shared hosts or competing for how the environment/system is configured. They can also be expensive if your workload is not constant, you may have workers idle, overly scaled in resources, or you have to manage scaling them up and down.

Examples: CeleryExecutor, BatchExecutor

2. Containerized Executors

Airflow tasks are executed ad hoc inside containers/pods. Each task is isolated in its own containerized environment that is deployed when the Airflow task is queued.

Pros: Each Airflow task is isolated to one container so no noisy neighbor problem. The execution environment can be customized for specific tasks (system libs, binaries, dependencies, amount of resources, etc). Cost effective as the workers are only alive for the duration of the task.

Cons: There is latency on startup since the container or pod needs to deploy before the task can begin. Can be expensive if you’re running many short/small tasks. No workers to manage however you must manage something like a Kubernetes cluster.

Examples: KubernetesExecutor, EcsExecutor


#### References

For more info, check out official docs:

https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html



## Setting up Airflow 2.10.4 with Docker

This is a quick, simple & less memory-intensive setup of Airflow that works on a LocalExecutor.

Only runs the webserver and the scheduler and runs the DAGs in the scheduler rather than running them in external workers:


### 1: Create a new sub-directory called airflow in your project dir. 

Inside airflow create dags, google and logs folders.

The directory structure should look like this:

```

├── airflow
│   ├── dags
|   |
│   ├── google
|   |
│   └── logs

```


### 2:  Create a Dockerfile. 

Create a Dockerfile inside airflow folder. We are going to use this dockerfile:

```dockerfile

FROM apache/airflow:2.10.4-python3.8

ENV AIRFLOW_HOME=/opt/airflow

USER airflow
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR $AIRFLOW_HOME
COPY ./google /opt/airflow/google
```


This Dockerfile creates a Docker image for Apache Airflow, installs additional Python packages from a requirements.txt file and copies google credentials into the container

### 3:  Create a Docker-compose.yaml

Docker-compose.yaml should look like this:

```yaml

version: '3.8'
services:
    postgres:
        image: postgres:13
        environment:
        - POSTGRES_USER=airflow
        - POSTGRES_PASSWORD=airflow
        - POSTGRES_DB=airflow
        volumes:
            - postgres-db-volume:/var/lib/postgresql/data
        healthcheck:
            test: ["CMD", "pg_isready", "-U", "airflow"]
            interval: 5s
            retries: 5

    init-airflow:
        build: .
        user: root
        depends_on:
        - postgres
        environment:
        - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow    
        command: >
          bash -c "
          until pg_isready -h postgres -U airflow; do
            echo 'Waiting for PostgreSQL to be ready...';
            sleep 2;
          done;
          airflow db migrate && airflow connections create-default-connections &&
          airflow users create -r Admin -u admin -p admin -e admin@example.com -f admin -l airflow &&
          airflow users create -r Admin -u airflow -p airflow -e airflow@example.com -f airflow -l airflow &&
          echo 'Initialization complete' &&
          touch /opt/airflow/shared/initialized
          "

        healthcheck:
            test: ["CMD-SHELL", "airflow db check && echo 'Database ready!'"]
            interval: 10s
            timeout: 10s
            retries: 5
            start_period: 10s

        volumes:
        - shared-data:/opt/airflow/shared            

    scheduler:
        build: .
        command: >
            bash -c "
            until [ -f /opt/airflow/shared/initialized ]; do
                echo 'Waiting for init-airflow to complete...';
                sleep 2;
            done;
            airflow scheduler
            "
        depends_on:
            - postgres
            - init-airflow
        environment:
        - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow
        - AIRFLOW_UID=50000
        - COMPOSE_PROJECT_NAME=airflow2025
        - AIRFLOW__CORE__EXECUTOR=LocalExecutor
        - AIRFLOW__SCHEDULER__SCHEDULER_HEARTBEAT_SEC=10
        - AIRFLOW_CONN_METADATA_DB=postgres+psycopg2://airflow:airflow@postgres:5432/airflow
        - AIRFLOW_VAR__METADATA_DB_SCHEMA=airflow
        - _AIRFLOW_WWW_USER_CREATE=True
        - _AIRFLOW_WWW_USER_USERNAME=airflow
        - _AIRFLOW_WWW_USER_PASSWORD=airflow
        - AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION=True
        - AIRFLOW__CORE__LOAD_EXAMPLES=False       
        volumes:
            - ./dags:/opt/airflow/dags
            - ./logs:/opt/airflow/logs
            - ./google:/opt/airflow/google:ro
            - shared-data:/opt/airflow/shared

    webserver:
        build: .
        command: >
            bash -c "
            until [ -f /opt/airflow/shared/initialized ]; do
                echo 'Waiting for init-airflow to complete...';
                sleep 2;
            done;
            airflow webserver
            "
        depends_on:
            - postgres
            - init-airflow
            - scheduler
        environment:
        - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow
        - AIRFLOW_UID=50000
        - COMPOSE_PROJECT_NAME=airflow2025
        - AIRFLOW__CORE__EXECUTOR=LocalExecutor
        - AIRFLOW__SCHEDULER__SCHEDULER_HEARTBEAT_SEC=10
        - AIRFLOW_CONN_METADATA_DB=postgres+psycopg2://airflow:airflow@postgres:5432/airflow
        - AIRFLOW_VAR__METADATA_DB_SCHEMA=airflow
        - _AIRFLOW_WWW_USER_CREATE=True
        - _AIRFLOW_WWW_USER_USERNAME=airflow
        - _AIRFLOW_WWW_USER_PASSWORD=airflow
        - AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION=True
        - AIRFLOW__CORE__LOAD_EXAMPLES=False   
        volumes:
            - ./dags:/opt/airflow/dags
            - ./logs:/opt/airflow/logs
            - ./google:/opt/airflow/google:ro
            - shared-data:/opt/airflow/shared            

        user: "50000:0"
        ports:
            - "8080:8080"
        healthcheck:
            test: [ "CMD-SHELL", "[ -f /home/airflow/airflow-webserver.pid ]" ]
            interval: 30s
            timeout: 30s
            retries: 3

volumes:
  postgres-db-volume:
  shared-data:
```  

Postgres:

- Runs PostgreSQL 13 and sets up the database with user airflow, password airflow, and database airflow.
- Persists data using a named volume (postgres-db-volume).

Init-airflow:

- Ensure PostgreSQL is ready (pg_isready).
- Migrate the Airflow database schema (airflow db migrate).
- Set up default Airflow connections and create default users (Admin and airflow).
- Marks initialization as complete by touching a file (/opt/airflow/shared/initialized).
- Shares data in a volume (shared-data) to be used by other services

Scheduler:

- Waits for init-airflow to finish initializing by checking the initialized file before starting the Airflow scheduler.
- Configures the Airflow scheduler with specific settings, such as the executor type and database connection.
- Maps directories for Airflow DAGs (./dags), logs (./logs), and Google credentials (./google) to the container's respective directories.

Webserver:

- Similar to the scheduler, it waits for the initialized file before starting the Airflow web server.
- Runs the Airflow web server, providing the web interface for managing DAGs, tasks, and users.
- Depends on postgres, init-airflow, and scheduler.
- Exposes port 8080 for access to the web UI.


Volumes:

- postgres-db-volume: Stores PostgreSQL data persistently.
- shared-data: Shared volume to store Airflow's initialization data that other services can use.


### 4:  Copy your google-credentials.json inside the google folder. 

> [!WARNING]  
> Remember to add this json to the .gitignore file !

---

### 5:  Copy python files. 

Copy from this repo to your dags folder:

- data_ingestion_local.py 
- data_ingestion_gcp_green.py 
- data_ingestion_gcp_yellow.py 

### 6:  Create a requirements.txt

requirements.txt, should look like:

```
apache-airflow-providers-google
pyarrow
pandas
sqlalchemy
psycopg2-binary
requests
```

The directory structure now should look like this:

```

└── airflow
    ├── dags
    |   ├── data_ingestion_local.py
    |   ├── data_ingestion_gcp_green.py
    |   └── data_ingestion_gcp_yellow.py
    |
    ├── google
    |   └── credentials.json
    |
    ├── logs
    |
    ├── docker-compose.yaml
    ├── Dockerfile
    └── requirements.txt
```


### 7:  Build the image. 

You only need to do this the first time you run Airflow or if you modified the Dockerfile or the requirements.txt file:

```
    docker-compose build
```

First-time build can take up to 10 mins.

### 8: Run Airflow:    

```
    docker-compose -p airflow2025 up -d
```

The -p option specifies a custom project name (airflow2025 in this case). By default, Docker Compose uses the directory name as the project name, but this flag allows you to override it.

The -d option stands for "detached mode," meaning the containers will run in the background, allowing you to continue using the terminal without being attached to the container logs.

The first time it is run, the airflow-init service may take a few minutes to prepare the database

In docker desktop if you want you can go to the logs section of airflow-init and see something like this:

```
2025-01-03 13:16:47 postgres:5432 - accepting connections
2025-01-03 13:16:53 DB: postgresql+psycopg2://airflow:***@postgres/airflow
2025-01-03 13:16:53 Performing upgrade to the metadata database postgresql+psycopg2://airflow:***@postgres/airflow
2025-01-03 13:17:14 Database migrating done!

2025-01-03 13:17:30 User "admin" created with role "Admin"
2025-01-03 13:17:35 User "airflow" created with role "Admin"
2025-01-03 13:17:36 Initialization complete
```

and webserver logs should look like this:

```
2025-01-03 13:17:34 Waiting for init-airflow to complete...
2025-01-03 13:17:36 Waiting for init-airflow to complete...

2025-01-03 13:20:34   ____________       _____________
2025-01-03 13:20:34  ____    |__( )_________  __/__  /________      __
2025-01-03 13:20:34 ____  /| |_  /__  ___/_  /_ __  /_  __ \_ | /| / /
2025-01-03 13:20:34 ___  ___ |  / _  /   _  __/ _  / / /_/ /_ |/ |/ /
2025-01-03 13:20:34  _/_/  |_/_/  /_/    /_/    /_/  \____/____/|__/
2025-01-03 13:20:34 Running the Gunicorn Server with:
2025-01-03 13:20:34 Workers: 4 sync
2025-01-03 13:20:34 Host: 0.0.0.0:8080
```

In the docker logs you can see how the webserver and the scheduler wait for the database to be ready to start.

### 8: Airflow GUI 

You may now access the Airflow GUI by browsing to localhost:8080. It may take a few minutes to load the webApp

```
Username: airflow
Password: airflow 
```
<br>

![airflow8](images/airflow8.jpg)
<br><br>


## Ingesting data to local Postgres

This section focuses on setting up a local PostgreSQL database and using Apache Airflow to ingest NYC taxi trip
data. The process involves creating a dedicated directory for the database and configuring a docker-compose 
file to define the PostgreSQL service. This service connects to Airflow's network, allowing seamless integration
for data ingestion workflows. 

For testing purposes, we will be ingesting Yellow Taxi data from January to March 2021. You can find all 
datasets in https://github.com/DataTalksClub/nyc-tlc-data/releases/tag/yellow



![airflowgcp9](images/airflowgcp9.jpg)
<br><br>



**1: Create a new sub-directory** 

Create a new sub-directory called database_ny_taxi at the same level as airflow folder. Inside database_ny_taxi
create ny_taxi_postgres_data folder and docker-compose-lesson1.yaml file

The directory structure now should look like this:

```
├── airflow
|   ├── dags
|   |   ├── data_ingestion_local.py
|   |   ├── data_ingestion_gcp_green.py
|   |   └── data_ingestion_gcp_yellow.py
|   |
|   ├── google
|   |   └── credentials.json
|   |
|   ├── logs
|   |
|   ├── docker-compose.yaml
|   ├── Dockerfile
|   └── requirements.txt
│
└── database_ny_taxi
    ├── ny_taxi_postgres_data
    └── docker-compose-lesson1.yaml

```


**2: Find the airflow network**

In a separate terminal, let's find out which virtual network Airflow is running on using the following command:
 
 ```
docker network ls
```

Make sure that you are running the containers for airflow services before running docker network ls

It should print something like this:

```
    NETWORK ID     NAME                  DRIVER    SCOPE
    690b4b59769b   airflow2025_default   bridge    local

```    



**3: Create docker-compose.yaml file for the database** 

Modify the docker-compose.yaml file from module 1 by adding the network (airflow2025_default) info and removing
 away the pgAdmin service. docker-compose-lesson1.yaml should look like this:

```dockerfile

services:
  pgdatabase:
    image: postgres:13
    environment:
      - POSTGRES_USER=root2
      - POSTGRES_PASSWORD=root2
      - POSTGRES_DB=ny_taxi
    volumes:
      - "./ny_taxi_postgres_data:/var/lib/postgresql/data:rw"
    ports:
      - "5433:5432"
    networks:
      - airflow

    
networks:
  airflow:
    external: true
    name: airflow2025_default
```    

**4: Run Postgres:**

Make sure to execute the docker-compose command in the database_ny_taxi directory:

```
    docker-compose -f docker-compose-lesson1.yaml up
```

**5: Check database with PGCLI** 

Once the container is running, we can log into our database with the following command:
```
    pgcli -h localhost -p 5433 -u root2 -d ny_taxi
```

**6: Prepare the DAG**

Inside your dags folder, create a data_ingestion_local.py file. The DAG will have the following tasks:

- A PythonOperator task that will download the NYC taxi data.
- A PythonOperator task that will ingest data into our database

Two utility functions are defined:

- download_and_unzip: Downloads a .csv.gz file from a URL and extracts it into a .csv file. Makes a GET request to fetch the file from the given url. Saves the .gz file locally and unzips the file using the gzip library and writes it to a local .csv file.

- process_and_insert_to_db: This is our script for module 1. Reads the .csv file in chunks, processes it, and inserts the data into the PostgreSQL database. Connects to the PostgreSQL database using sqlalchemy. Reads the .csv file in chunks of 100,000 rows using pandas. Creates the table in the database (or replaces it if it exists). Appends the data chunk by chunk into the database.

Dynamic Variables:

The following variables dynamically adapt based on the Airflow execution_date:

- table_name_template: Name of the database table (e.g., yellow_taxi_2021_02).
- csv_name_gz_template: Name of the .csv.gz file (e.g., output_2021_02.csv.gz).
- csv_name_template: Name of the .csv file (e.g., output_2021_02.csv).
- url_template: URL to download the .csv.gz

Observe how the names of the tables in the database and the URL are generated dynamically according to the execution date using JINJA template.

data_ingestion_local.py look like this:

```python

from datetime import datetime
from airflow import DAG
from airflow.operators.python import PythonOperator

import pandas as pd
from sqlalchemy import create_engine
import requests
import gzip
import shutil



# This info is from docker-compose-lesson1.yaml
user = "root2"
password = "root2"
host = "pgdatabase"
port = "5432"
db = "ny_taxi"


def download_and_unzip(csv_name_gz, csv_name, url):

    # Download the CSV.GZ file
    response = requests.get(url)
    if response.status_code == 200:
        with open(csv_name_gz, 'wb') as f_out:
            f_out.write(response.content)
    else:
        print(f"Error downloading file: {response.status_code}")
        return False

    # Unzip the CSV file
    with gzip.open(csv_name_gz, 'rb') as f_in:
        with open(csv_name, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
    
    return True


def process_and_insert_to_db(csv_name, user, password, host, port, db, table_name):
    # Connect to PostgreSQL database
    engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{db}')
    df_iter = pd.read_csv(csv_name, iterator=True, chunksize=100000)

    # Process the first chunk
    df = next(df_iter)
    df.tpep_pickup_datetime = pd.to_datetime(df.tpep_pickup_datetime)
    df.tpep_dropoff_datetime = pd.to_datetime(df.tpep_dropoff_datetime)

    # Insert the data into the database
    df.head(n=0).to_sql(name=table_name, con=engine, if_exists='replace')
    df.to_sql(name=table_name, con=engine, if_exists='append')

    # Process the rest of the data
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


# Defining the DAG
dag = DAG(
    "yellow_taxi_ingestion",
    schedule_interval="0 6 2 * *",
    start_date=datetime(2021, 1, 1),
    end_date=datetime(2021, 3, 28),
    catchup=True, # True means run past missed jobs
    max_active_runs=1,
)

table_name_template = 'yellow_taxi_{{ execution_date.strftime(\'%Y_%m\') }}'
csv_name_gz_template = 'output_{{ execution_date.strftime(\'%Y_%m\') }}.csv.gz'
csv_name_template = 'output_{{ execution_date.strftime(\'%Y_%m\') }}.csv'

url_template = "https://github.com/DataTalksClub/nyc-tlc-data/releases/download/yellow/yellow_tripdata_{{ execution_date.strftime(\'%Y-%m\') }}.csv.gz"

# Task 1
download_task = PythonOperator(
    task_id="download_and_unzip",
    python_callable=download_and_unzip,
    op_kwargs={
        'csv_name_gz': csv_name_gz_template,
        'csv_name': csv_name_template,
        'url': url_template
    },
    dag=dag
)

# Task 2:
process_task = PythonOperator(
    task_id="process_and_insert_to_db",
    python_callable=process_and_insert_to_db,
    op_kwargs={
        'csv_name': csv_name_template,
        'user': user,
        'password': password,
        'host': host,
        'port': port,
        'db': db,
        'table_name': table_name_template
     
    },
    dag=dag
)

# Establish the sequence of tasks
download_task >> process_task
```

**Code Explanation:**

DAG Configuration:

- Schedule: Runs at 6:00 AM on the 2nd day of each month (0 6 2 * *)
- Date Range: Starts on February 1, 2021, and ends on March 28, 2021.
- catchup=True: This parameter ensures that if the DAG was paused or missed runs during the period between the start_date and end_date, Airflow will try to "catch up" and run all the missed executions, one for each scheduled date.
- max_active_runs=1: This limits the DAG to only have one active run at any time, preventing overlapping executions of the DAG

Tasks:

- download_task: Downloads and extracts the .csv.gz file. Uses the download_and_unzip function. Passes the dynamic file names and URL as arguments

- process_task: Processes the .csv file and uploads its content to the PostgreSQL database.Uses the process_and_insert_to_db function. Passes the database credentials, table name, and file name as arguments

Task Dependency:

The tasks are executed sequentially: download_task → process_task

The data is downloaded and extracted before being processed and ingested into the database.

**7: Unpause DAG** 

Open the Airflow dashboard and unpause the "yellow_taxi_ingestion" DAG from data_ingestion_local.py.

While ingesting the data, you can check logs:

![airflow6](images/airflow6.jpg)

After executing all tasks for all dates, should look like this:

![airflow7](images/airflow7.jpg)


**8: Check tables** 

Check tables on your local Postgres database:

Type "\dt" in the pgcli terminal. It should print:

```
+--------+---------------------+-------+-------+
| Schema | Name                | Type  | Owner |
|--------+---------------------+-------+-------|
| public | yellow_taxi_2021_01 | table | root2 |
| public | yellow_taxi_2021_02 | table | root2 |
| public | yellow_taxi_2021_03 | table | root2 |
+--------+---------------------+-------+-------+
```

Now you can query the tables:

```
root2@localhost:ny_taxi> select count(1) from yellow_taxi_2021_02;
+---------+
| count   |
|---------|
| 1371708 |
+---------+
```



## Ingesting data to GCP

You can find all datasets in https://github.com/DataTalksClub/nyc-tlc-data/releases/

### Introduction

We will now run a slightly more complex DAG that will:

- Download and unzip one file for each month
- Convert into parquet
- Upload it to GCS (bucket)
- Create the final table with a given schema in BigQuery
- Create a external table referencing the raw data in GCS in BigQuery
- Create a temporary native table in BigQuery for a given month by reading from the external table created earlier. Also adds two columns a unique unique_row_id for each record by hashing certain fields, and stores the file name for reference.
- Update the final table with data from the temporary table

<br>

![airflowgcp10](images/airflowgcp10.jpg)
<br><br>


**Tables explanation**

- External Table: Serves as the initial point of access to the raw data. The data in this table is not physically stored in BigQuery. There is a External table for each month

- Temporary table: This is a native table created in BigQuery using the data from the external table. Copies the entire dataset from the associated external table into this table, while enriching it with the additional columns unique_row_id and filename. There is a native table for each month.

- Final table: After processing the data and ensuring there are no duplicates or inconsistencies, the final data is merged into this table. It represents the cleaned, transformed, and de-duplicated dataset including data from all months.



### 1: Create connection with GCP:

To create a connection with Google Cloud Platform (GCP) from the Airflow UI go to the top menu and click on Admin, From the dropdown, select Connections. This will take you to the page where you can manage your Airflow connections.

On the Connections page, click the + button. 

Complete Connection id, Connection type, your project id and Keyfile Path (with your json name)

<br>

![gcpairflow](images/gcpairflow.jpg)




### 2: Prepare the DAG

As an example, we will download and process the green files from January 2019 to December 2019.

To process the Yellow Taxi data, the DAG is similar, slightly changing the schema of the tables and the utility function to convert to parquet is done in chunks to avoid overloading the PC.

data_ingestion_gcp_green.py looks like this:

```python

import os
from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator
from airflow.providers.google.cloud.hooks.gcs import GCSHook
import requests
import gzip
import shutil
import pyarrow
import pyarrow.csv
import pyarrow.parquet 



# Make sure the values ​​match your gcp values
PROJECT_ID="zoomcamp-airflow-444903"
BUCKET="zoomcamp_datalake"
BIGQUERY_DATASET = "airflow2025b"
path_to_local_home = os.environ.get("AIRFLOW_HOME", "/opt/airflow/")


# Utility functions
def download(file_gz, file_csv, url):

    # Download the CSV.GZ file
    response = requests.get(url)
    if response.status_code == 200:
        with open(file_gz, 'wb') as f_out:
            f_out.write(response.content)
    else:
        print(f"Error downloading file: {response.status_code}")
        return False
    
    # Unzip the CSV file
    with gzip.open(file_gz, 'rb') as f_in:
        with open(file_csv, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
    

def format_to_parquet(src_file):

    table = pyarrow.csv.read_csv(src_file)

    # change ehail_fee to float64
    if 'ehail_fee' in table.column_names:
        # Convertir la columna 'ehail_fee' a float (FLOAT64)
        table = table.set_column(
            table.schema.get_field_index('ehail_fee'),
            'ehail_fee',
            pyarrow.array(table['ehail_fee'].to_pandas().astype('float64'))  
        )

    pyarrow.parquet.write_table(table, src_file.replace('.csv', '.parquet'))



def upload_to_gcs(bucket, object_name, local_file, gcp_conn_id="gcp-airflow"):
    hook = GCSHook(gcp_conn_id)
    hook.upload(
        bucket_name=bucket,
        object_name=object_name,
        filename=local_file,
        timeout=600
    )


# Defining the DAG
dag = DAG(
    "GCP_ingestion_green",
    schedule_interval="0 6 2 * *",
    start_date=datetime(2019, 1, 1),
    end_date=datetime(2019, 12, 31),
    catchup=True, 
    max_active_runs=1,
)

table_name_template = 'green_taxi_{{ execution_date.strftime(\'%Y_%m\') }}'
file_template_csv_gz = 'output_{{ execution_date.strftime(\'%Y_%m\') }}.csv.gz'
file_template_csv = 'output_{{ execution_date.strftime(\'%Y_%m\') }}.csv'
file_template_parquet = 'output_{{ execution_date.strftime(\'%Y_%m\') }}.parquet'
consolidated_table_name = "green_{{ execution_date.strftime(\'%Y\') }}"
url_template = "https://github.com/DataTalksClub/nyc-tlc-data/releases/download/green/green_tripdata_{{ execution_date.strftime(\'%Y-%m\') }}.csv.gz"


# Task 1: Download and unzip file
download_task = PythonOperator(
    task_id="download",
    python_callable=download,
    op_kwargs={
        'file_gz': file_template_csv_gz,
        'file_csv': file_template_csv,
        'file_parquet': file_template_parquet,
        'url': url_template
    },
    retries=10,
    dag=dag
)

# Task 2: Format to parquet
process_task = PythonOperator(
    task_id="format_to_parquet",
    python_callable=format_to_parquet,
    op_kwargs={
        "src_file": f"{path_to_local_home}/{file_template_csv}"
    },
    retries=10,
    dag=dag
)


# Task 3: Upload file to google storage
local_to_gcs_task = PythonOperator(
    task_id="upload_to_gcs",
    python_callable=upload_to_gcs,
    op_kwargs={
        "bucket": BUCKET,
        "object_name": f"raw/{file_template_parquet}",
        "local_file": f"{path_to_local_home}/{file_template_parquet}",
        "gcp_conn_id": "gcp-airflow"
    },
    retries=10,
    dag=dag
)

# Task 4: Create final table
create_final_table_task = BigQueryInsertJobOperator(
    task_id="create_final_table",
    gcp_conn_id="gcp-airflow",
    configuration={
        "query": {
            "query": f"""
                CREATE TABLE IF NOT EXISTS `{PROJECT_ID}.{BIGQUERY_DATASET}.{consolidated_table_name}`
                (
                    unique_row_id BYTES,
                    filename STRING,      
                    VendorID INT64,
                    lpep_pickup_datetime TIMESTAMP,
                    lpep_dropoff_datetime TIMESTAMP,
                    store_and_fwd_flag STRING,
                    RatecodeID INT64,
                    PULocationID INT64,
                    DOLocationID INT64,
                    passenger_count INT64,
                    trip_distance FLOAT64,
                    fare_amount FLOAT64,
                    extra FLOAT64,
                    mta_tax FLOAT64,
                    tip_amount FLOAT64,
                    tolls_amount FLOAT64,
                    ehail_fee FLOAT64,
                    improvement_surcharge FLOAT64,
                    total_amount FLOAT64,
                    payment_type INT64,
                    trip_type INT64,
                    congestion_surcharge FLOAT64
                )    
            """,
            "useLegacySql": False,
        }
    },
    retries=3,
    dag=dag,
)

# Task 5: Create external monthly table
create_external_table_task = BigQueryInsertJobOperator(
    task_id="create_external_table",
    gcp_conn_id="gcp-airflow",
    configuration={
        "query": {
            "query": f"""
                CREATE OR REPLACE EXTERNAL TABLE `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_ext`
                (
                    VendorID INT64,
                    lpep_pickup_datetime TIMESTAMP,
                    lpep_dropoff_datetime TIMESTAMP,
                    store_and_fwd_flag STRING,
                    RatecodeID INT64,
                    PULocationID INT64,
                    DOLocationID INT64,
                    passenger_count INT64,
                    trip_distance FLOAT64,
                    fare_amount FLOAT64,
                    extra FLOAT64,
                    mta_tax FLOAT64,
                    tip_amount FLOAT64,
                    tolls_amount FLOAT64,
                    ehail_fee FLOAT64,
                    improvement_surcharge FLOAT64,
                    total_amount FLOAT64,
                    payment_type INT64,
                    trip_type INT64,
                    congestion_surcharge FLOAT64
                )
                OPTIONS (
                    uris = ['gs://{BUCKET}/raw/{file_template_parquet}'],
                    format = 'PARQUET'
                );
            """,
            "useLegacySql": False,
        }
    },
    retries=3,
    dag=dag
)

# Task 6: Create native monthly table
create_temp_table_task = BigQueryInsertJobOperator(
    task_id="create_temp_table",
    gcp_conn_id="gcp-airflow",
    configuration={
        "query": {
            "query": f"""
                CREATE OR REPLACE TABLE `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_tmp`
                AS
                SELECT
                    MD5(CONCAT(
                        COALESCE(CAST(VendorID AS STRING), ""),
                        COALESCE(CAST(lpep_pickup_datetime AS STRING), ""),
                        COALESCE(CAST(lpep_dropoff_datetime AS STRING), ""),
                        COALESCE(CAST(PULocationID AS STRING), ""),
                        COALESCE(CAST(DOLocationID AS STRING), "")
                    )) AS unique_row_id,
                    "{file_template_parquet}" AS filename,
                    *
                FROM `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_ext`;
            """,
            "useLegacySql": False,
        }
    },
    retries=3,
    dag=dag,
)


# Task 7: Merge
merge_to_final_table_task = BigQueryInsertJobOperator(
    task_id="merge_to_final_table",
    gcp_conn_id="gcp-airflow",
    configuration={
        "query": {
            "query": f"""
                MERGE INTO `{PROJECT_ID}.{BIGQUERY_DATASET}.{consolidated_table_name}` T
                USING `{PROJECT_ID}.{BIGQUERY_DATASET}.{table_name_template}_tmp` S
                ON T.unique_row_id = S.unique_row_id
                WHEN NOT MATCHED THEN
                    INSERT (unique_row_id, filename, VendorID, lpep_pickup_datetime, lpep_dropoff_datetime, store_and_fwd_flag, RatecodeID, PULocationID, DOLocationID, passenger_count, trip_distance, fare_amount, extra, mta_tax, tip_amount, tolls_amount, ehail_fee, improvement_surcharge, total_amount, payment_type, trip_type, congestion_surcharge)
                    VALUES (S.unique_row_id, S.filename, S.VendorID, S.lpep_pickup_datetime, S.lpep_dropoff_datetime, S.store_and_fwd_flag, S.RatecodeID, S.PULocationID, S.DOLocationID, S.passenger_count, S.trip_distance, S.fare_amount, S.extra, S.mta_tax, S.tip_amount, S.tolls_amount, S.ehail_fee, S.improvement_surcharge, S.total_amount, S.payment_type, S.trip_type, S.congestion_surcharge);
            """,
            "useLegacySql": False,
        }
    },
    retries=3,
    dag=dag,
)

# Task 8: Delete local files after upload
cleanup_task = BashOperator(
    task_id="cleanup_files",
    bash_command=f"rm -f {path_to_local_home}/{file_template_csv_gz} {path_to_local_home}/{file_template_csv} {path_to_local_home}/{file_template_parquet}",
    dag=dag,
)


download_task >> process_task >> local_to_gcs_task >> create_final_table_task >> create_external_table_task >> create_temp_table_task >> merge_to_final_table_task >> cleanup_task

```

**Let's explain step by step what this code does:**

Modules:

- BigQueryInsertJobOperator: Executes SQL queries in Google BigQuery as tasks.
- GCSHook:  A helper class to interact with Google Cloud Storage (GCS). Uploads Parquet files to GCS.
- requests: Makes HTTP requests to external APIs or URLs.
- gzip: Handles reading and decompressing .gz files.
- pyarrow: Converts the CSV file into a Parquet file. Modifies the schema to handle specific data types (e.g., ehail_fee as float64).


Configuration Variables:

- PROJECT_ID: The Google Cloud project ID.
- BUCKET: The Google Cloud Storage bucket name.
- BIGQUERY_DATASET: The BigQuery dataset name.
- path_to_local_home: Local directory path for Airflow tasks.

Utility Functions:

- download: Downloads a .csv.gz file from a URL. Decompresses the file into a .csv format.

- format_to_parquet: Converts a CSV file to a Parquet file using PyArrow. It also ensures that specific columns (like ehail_fee) have consistent data types.

- upload_to_gcs: Uploads a local file to a specified GCS bucket. Uses the Airflow GCSHook for the connection.


Dynamic Variables:

- Table Name Template: This creates a template for the BigQuery table name. For example "yellow_taxi_2025_01"
- file_template_csv_gz: This template generates the file name for the compressed .csv.gz file. For example "output_2019_01.csv.gz"
- file_template_csv: This template generates the file name for the decompressed .csv file. For example "output_2019_01.csv"
- file_template_parquet: This template generates the file name for the .parquet file. For example "output_2019_01.parquet"
- url_template: This template generates the download URL for the .csv.gz file. The {{ execution_date.strftime('%Y-%m') }} dynamically inserts the YYYY-MM format of the execution date into the URL.

Task Definitions:

- download_task: Uses the download function to download and unzip the .csv.gz file for the specified month.

- process_task: Converts the downloaded .csv file into Parquet format.

- local_to_gcs_task: This task uploads the downloaded file from the local machine to Google Cloud Storage (GCS).
The upload_to_gcs utility function is used to upload the file to the specified bucket and path (raw/{file_template}).

- create_final_table_task: This task creates a final BigQuery table (green_2019) if it doesn't already exist.
The table schema includes various fields related to the green taxi trip data (e.g., VendorID, pickup/dropoff datetime, fare amount, etc.). This task uses the BigQueryInsertJobOperator to execute a SQL query in BigQuery.The query creates the table green_2019 in the dataset specified (airflow2025), if it doesn't already exist.The table is created using a CREATE TABLE IF NOT EXISTS statement to ensure it is only created once.

- create_external_table_task: This task creates an external BigQuery table for a given month from the parquet file in GCS. The external table references the raw data in GCS, using parquet file and specifies the format as PARQUET. This task uses the BigQueryInsertJobOperator to run another SQL query

- create_temp_table_task: This task creates a temporary native table in BigQuery for a given month by reading from the external table created earlier. It generates a unique unique_row_id for each record by hashing certain fields, and stores the file name for reference.

- merge_to_final_table_task: This task performs a merge operation to update the final table (green_2022) with data from the temporary table. It inserts records into the final table where there is no match (based on the unique_row_id), ensuring that only new or updated data is added. This task uses the BigQueryInsertJobOperator to perform a MERGE SQL operation.

### 3: Unpause the DAG


Unpause the DAG and after a few minutes, should look like this:
<br>

![airflowgcp7](images/airflowgcp7.jpg)
<br><br>



### 4: Check GCP

Once the DAG finishes, you can go to your GCP project's dashboard and search for BigQuery. You should see your project ID; expand it and you should see the final 2019 table, the external tables and the temp tables:
<br>

![airflownew3](images/airflownew3.jpg)
<br><br>

And you can query the final table:

<br>

![airflownew4](images/airflownew4.jpg)
<br><br>

<br>

![airflownew5](images/airflownew5.jpg)
<br><br>


You can also see the uploaded parquet files by searching the Cloud Storage service, selecting your bucket and then clicking on the raw/ folder. 

<br>

![airflowgcp6](images/airflowgcp6.jpg)
<br><br>

You may now shutdown Airflow by running docker-compose down on the terminal where you run it.

# Airflow and Kubernetes

Kubernetes is an open-source platform for managing containerized applications. Its architecture is designed to provide scalability, reliability, and automation for deploying and running applications. Here’s a simple breakdown of its architecture:

**1. Cluster**

A Kubernetes cluster is the main unit, consisting of two types of components: Control Plane and Worker Nodes.

**2. Control Plane**

The control plane manages the cluster and decides where and how applications run

**3. Worker Nodes**

Worker nodes are where your applications (containers) actually run. Each node has a Kubelet: A small agent that communicates with the control plane and ensures containers are running as instructed.

**4. Pods**

A pod is the smallest unit in Kubernetes. Each pod contains one or more containers that share storage, network, and specifications. Kubernetes manages applications by managing pods.

**Kubernetes and Airflow**

Kubernetes can be used as the underlying infrastructure to run Airflow. Airflow’s components, like the web server, scheduler, and worker nodes, can be deployed on a Kubernetes cluster. Kubernetes takes care of scaling and managing these components.

**Google Kubernetes Engine (GKE)**

Google Kubernetes Engine (GKE) is a managed environment provided by Google Cloud for deploying, managing, and scaling containerized applications using Kubernetes. Kubernetes is an open-source platform for automating containerized application deployment, scaling, and operations. GKE takes care of the underlying infrastructure, including provisioning virtual machines, networking, and storage, so users can focus on building and running their applications.


## Setting up Airflow with Kubernetes

**1: Enable Kubernetes Engine API**

Enabling the API is the first step in using Google Kubernetes Engine, and it ensures that the required services and resources for managing Kubernetes clusters are available in your project. You can enable it from the Google Cloud Console or via the gcloud command-line tool. Once the API is enabled, you can use GKE to run and manage containerized workloads in a fully managed Kubernetes environment.

On the left hand side find Kubernetes Engine → Configurationand enable the Kubernetes Engine API 

![kubeapi](images/kubeapi.jpg)

**2: Install SDK, kubectl and helm**

Install SDK on linux/WSL2:

```
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

Install plugin gcloud-auth-plugin:

```
install plugin gcloud-auth-plugin
```

Install kubectl:

kubectl is the command-line interface (CLI) tool used for interacting with Kubernetes clusters. It allows users to manage and deploy applications, inspect cluster resources, and perform various administrative tasks in a Kubernetes environment.

```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Install helm:

Helm is a package manager for Kubernetes, which simplifies the process of deploying and managing applications on Kubernetes clusters. Helm packages applications into "charts," which are pre-configured Kubernetes resources bundled together.

```
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Add the official Apache Airflow Helm chart repository to your Helm client:

```
helm repo add apache-airflow https://airflow.apache.org
helm repo update
```

By adding this repository, you can now use Helm to search for and install Apache Airflow charts from this source.

**3: Create a new Kubernetes cluster on Google Kubernetes Engine (GKE)**

This command creates a GKE cluster called airflow-cluster in the us-central1 region, with a single node using the e2-standard-4 machine type. This would be a minimal setup suitable for testing or development purposes.

```
gcloud container clusters create airflow-cluster \
  --num-nodes=1 \
  --machine-type=e2-standard-4 \
  --region=us-central1
```  

Can take up to 5 mins

Then create a new namespace called airflow within a Kubernetes cluster.

In Kubernetes, namespaces are a way to organize and isolate resources within a cluster. They allow you to divide the cluster into multiple virtual clusters, each containing its own set of resources, such as pods, services, and deployments. This helps in managing and organizing resources for different projects, teams, or applications within the same physical Kubernetes cluster.

```
kubectl create namespace airflow
```

Browse to the Clusters tab on Kubernetes Engine to view the newly created cluster:

![kube0](images/kube0.jpg)

**4: Values.yaml**

The values.yaml file in Helm is a configuration file used to customize the deployment of a Helm chart. Helm charts come with a set of default configuration values, but you can modify these values to suit your specific needs by creating and using a custom values.yaml file.

Changes made:

```yaml
executor: "LocalExecutor"
```

```yaml
triggerer:
  enabled: false
```  

Size of persistent volume for webserver, workers and logs from 100Gi to 10Gi:

```yaml
size: 10Gi
```

Default chart yaml:

-  [`default-values.yaml`](airflow-kubernetes/default-values.yaml)


Customized yaml with local executor, disabled triggerer and reduced volumes:

-  [`values.yaml`](airflow-kubernetes/values.yaml)


**5: Install airflow**

This command installs the Apache Airflow application to a Kubernetes cluster using the apache-airflow/airflow Helm chart, with custom settings specified in the values.yaml file, and it installs the release into the airflow namespace of the cluster.

```
helm install airflow apache-airflow/airflow -n airflow -f values.yaml
```

It may take up to 5 minutes

**6: Check Pods**

This command will display details such as the names, statuses, and other information about the pods in the "airflow" namespace.

```
kubectl get pods -n airflow
```

should show something like this:

![kube1](images/kube1.jpg)


**7: Access the Airflow web interface**

This command forwards a local port to a port on a service in a Kubernetes cluster:

```
kubectl port-forward -n airflow svc/airflow-webserver 8080:8080
```

Go to localhost:8080

- Username: admin
- Password: admin

![kube2](images/kube2.jpg)


**8: Load DAGS**

This command copies all Python files from the local localdags directory to the dags directory of the specified Airflow pod.

Adjust with your local path:

```
kubectl cp /mnt/c/users/nacho/desktop/localdags/*.py airflow/airflow-scheduler-0:/opt/airflow/dags -n airflow
```

-  [`hello.py.yaml`](airflow-kubernetes/hello.py)

Once copied, you can access the pod.

This command opens an interactive Bash shell inside the airflow-scheduler-0 pod in the airflow namespace. It allows you to interact with the pod directly, similar to accessing a terminal on a local machine.

```
kubectl exec -it -n airflow airflow-scheduler-0 -- bash
```

![kube3](images/kube3.jpg)

As you can see, the file was copied successfully inside de pod

After a few minutes the DAG should appear in the UI:

![kubedag0](images/kubedag0.jpg)

**9: Trigger DAG**

![kubedag](images/kubedag.jpg)


## Ingesting data to GCP with kubernetes

Before you begin, check the Permissions in GCS.
Confirm that the zoomcamp_datalake bucket exists and that your service key has permissions to write to it, as well as create tables in BigQuery.

**1: Copy the DAG**

copy the DAG as in the previous example

-  [`data_ingestion_gcp.py`](airflow-kubernetes/data_ingestion_gcp.py)

**2: Create connection with GCP**

To create a connection with Google Cloud Platform (GCP) from the Airflow UI go to the top menu and click on Admin, From the dropdown, select Connections. This will take you to the page where you can manage your Airflow connections.

On the Connections page, click the + button.

Complete Connection id, Connection type, your project id and Keyfile Json (just copy and paste google json credentials)

![kubeconn](images/kubeconn.jpg)


**3: Install python dependencies**

Modify the values.yaml to include the python dependencies. Add this line just above the executor variable:

```yaml

extraPipPackages:
  - apache-airflow[google]
  - google-cloud-storage
  - pyarrow
  - pandas
  - requests  

# Airflow executor
# One of: LocalExecutor, LocalKubernetesExecutor, CeleryExecutor, KubernetesExecutor, CeleryKubernetesExecutor
executor: "LocalExecutor"
```

Full custom code:

-  [`values-gcp.yaml`](airflow-kubernetes/values-gcp.yaml)


**4: Upgrade airflow deployment**

Update Airflow deployment with this command:

```
helm upgrade airflow apache-airflow/airflow -n airflow -f values-gcp.yaml
```


**5: Unpause DAG**

Unpause the DAG, it should automatically start to do the catch-up

![kubegcprun](images/kubegcprun.jpg)


Once the DAG finishes, you can go to your GCP project's dashboard and search for BigQuery. You should see your project ID; expand it and you should see a new external_table table:

![kubebq1](images/kubebq1.jpg)

and query it:

![kubebq2](images/kubebq2.jpg)"
```


