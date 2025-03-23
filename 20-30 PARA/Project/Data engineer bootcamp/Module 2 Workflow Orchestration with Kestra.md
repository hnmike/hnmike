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

# Workflow Orchestration

### Table of contents

- [0. Module 1 recap](#0-module-1-recap)
- [1. Conceptual Material: Introduction to Orchestration and Kestra](#1-conceptual-material-introduction-to-orchestration-and-kestra)
  - [Introduction to Workflow Orchestration](#introduction-to-workflow-orchestration)
  - [Introduction to Kestra](#introduction-to-kestra)
  - [Getting started pipeline](#getting-started-pipeline)
  - [Launch Kestra using Docker Compose](#launch-kestra-using-docker-compose)
- [2. Hands-On Coding Project: Build Data Pipelines with Kestra](#2-hands-on-coding-project-build-data-pipelines-with-kestra)
  - [Load Data to Local Postgres](#load-data-to-local-postgres)
  - [Load Data to Local Postgres with backfill](#load-data-to-local-postgres-with-backfill)
  - [Load Data to GCP](#load-data-to-gcp)
  - [Load Data to GCP with backfill](#load-data-to-gcp-with-backfill)



# 0. Module 1 recap

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


**Data Lake:**

- Purpose: Stores raw, unprocessed data from various sources, often for exploratory or advanced analytics.
- Data Format: Stores data in its original format (structured, semi-structured, or unstructured).
- Tools: Google Cloud Storage, Amazon S 3, or Azure Data Lake.

**Data Warehouse:**

- Purpose: Stores structured and cleaned data optimized for querying and reporting.
- Data Format: Stores structured and pre-processed data.
- Performance: Optimized for complex SQL queries and business intelligence (BI) tools.
- Tools: Google BigQuery, Snowflake, Amazon Redshift or Microsoft Azure Synapse.



# 1. Conceptual Material: Introduction to Orchestration and Kestra

## Introduction to Workflow Orchestration

_([Video source](https://www.youtube.com/watch?v=ZV6CPZDiJFA))_

Think of an orchestrator a bit like an orchestra where an orchestra has multiple different instruments and they all need to come together in unison. Now, instead of those instruments, think of those as maybe tasks, different pipelines, microservices, etc. That's where an orchestrator comes in to tie all of those together and make sure they can work in unison. 

You probably also wondering: what's the difference between orchestration and automation? They are very similar, but orchestration is all about the bigger picture. For example, maybe you have multiple tasks running, and maybe they depend on one another. So you can make sure that certain tasks only run when other tasks are finished. If there are any errors, it can cancel other tasks, especially let you know about those as well. While automation is fantastic for scheduling singular tasks, orchestration is where you tie all of that together to make one great system.

Workflow Orchestration refers to the process of organizing, managing, and automating complex workflows, where multiple tasks or processes are coordinated to achieve a specific outcome. It involves ensuring that tasks are executed in the correct order, handling dependencies between them, and managing resources or systems involved in the workflow.


- Task Coordination: Ensuring tasks are executed in the right sequence or simultaneously, based on predefined rules or dependencies.

- Automation: Automating repetitive or complex processes to reduce manual intervention.

- Error Handling: Managing errors or failures in tasks, often with retry mechanisms or alternative execution paths.

- Resource Management: Allocating resources (e.g., computing power, APIs, or data) to tasks as needed.

- Monitoring and Reporting: Tracking the progress of workflows, identifying bottlenecks, and providing logs or reports for analysis.


Now let's discuss a few common use cases for orchestrators so you can understand when you might want to use one in your scenario.

**Data-driven environments**

Orchestrators are key for being able to allow extract, transform, and load tasks, making sure you can load them from a variety of different sources as well as load those into a data warehouse. An orchestrator can make sure that each of these steps can happen successfully. If there are any errors, it can both retry steps as well as make sure that later steps do not happen.

![kestra1](images/kestra1.jpg)


**CI/CD pipelines**

In CI/CD pipelines, they can be super useful for being able to build, test, and publish your code to various different places at the same time and manage all of the different steps there to make sure they happen in unison.

![kestra2](images/kestra2.jpg)


**Provision Resources**

If your infrastructure is cloud-based, you can use your orchestrator to help provision resources too, allowing you to just press a button, and it will set up your cloud environment for you.


## Introduction to Kestra

_([Video source](https://www.youtube.com/watch?v=Np6QmmcgLCs))_

Kestra is an orchestration platform that’s highly flexible and well-equipped to manage all types of pipelines  Kestra provides a user-friendly interface and a YAML-based configuration format, making it easy to define, monitor, and manage workflows.

Kestra gives you the flexibility on how you control your workflows and gives you the option to do it in no code low code or full code.

Run the following command to start up your instance (bash/ubuntu wsl terminal):

```
docker run --pull=always --rm -it -p 8080:8080 --user=root \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /tmp:/tmp kestra/kestra:latest server local
```

First-time build can take up to 10 mins.

Head over to your browser and open https://localhost:8080 to launch the interface

![kestra3](images/kestra3.jpg)


**Properties**

Workflows are referenced as Flows and they are declared using YAML. Within each flow, there are 3 required properties you’ll need:

- Id: which is the name of your flow. 

- Namespace: which allows you to specify the environments you want your flow to execute in, e.g. production vs development.

- Tasks: which is a list of the tasks that will execute when the flow is executed, in the order they’re defined in. Tasks contain an id as well as a type with each different type having their own additional properties.

**Optional Properties**

- Inputs: Instead of hardcoding values into your flows, you can set them as constant values separately. Great if you plan to reuse them in multiple tasks. 

- Outputs: Tasks will often generate outputs that you’ll want to pass on to a later task. Outputs let you connect both variables as well as files to later tasks. 

- Triggers: Instead of manually executing your flow, you can setup triggers to execute it based on a set of conditions such as time schedule or a webhook.


## Getting started pipeline

_([Video source](https://www.youtube.com/watch?v=Np6QmmcgLCs))_


Flow: [`01_getting_started_data_pipeline.yaml`](flows/01_getting_started_data_pipeline.yaml)

This introductory flow is added just to demonstrate a simple data pipeline which extracts data via
 HTTP REST API, transforms that data in Python and then queries it using DuckDB.

Is going to run an extract task, a transform task, and a query task:

![pipeline0](images/pipeline0.jpg) 

**Declaring the flow**

Click on Create my first flow. Flows are declared using YAML. This YAML file describes a Kestra workflow configuration: 

```yaml

id: 01_getting_started_data_pipeline
namespace: zoomcamp

inputs:
  - id: columns_to_keep
    type: ARRAY
    itemType: STRING
    defaults:
      - brand
      - price

tasks:
  - id: extract
    type: io.kestra.plugin.core.http.Download
    uri: https://dummyjson.com/products

  - id: transform
    type: io.kestra.plugin.scripts.python.Script
    containerImage: python:3.11-alpine
    inputFiles:
      data.json: "{{outputs.extract.uri}}"
    outputFiles:
      - "*.json"
    env:
      COLUMNS_TO_KEEP: "{{inputs.columns_to_keep}}"
    script: |
      import json
      import os

      columns_to_keep_str = os.getenv("COLUMNS_TO_KEEP")
      columns_to_keep = json.loads(columns_to_keep_str)

      with open("data.json", "r") as file:
          data = json.load(file)

      filtered_data = [
          {column: product.get(column, "N/A") for column in columns_to_keep}
          for product in data["products"]
      ]

      with open("products.json", "w") as file:
          json.dump(filtered_data, file, indent=4)

  - id: query
    type: io.kestra.plugin.jdbc.duckdb.Query
    inputFiles:
      products.json: "{{outputs.transform.outputFiles['products.json']}}"
    sql: |
      INSTALL json;
      LOAD json;
      SELECT brand, round(avg(price), 2) as avg_price
      FROM read_json_auto('{{workingDir}}/products.json')
      GROUP BY brand
      ORDER BY avg_price DESC;
    fetchType: STORE
```    

Then click on save button


### Step-by-step explanation of the flow:


**Id and namespace**

To begin with, here we have the ID, which is the name of our workflow. Followed by that, we have the namespace, which is sort of like a folder where we're going to store this. 

```yaml

id: 01_getting_started_data_pipeline
namespace: zoomcamp
```

**Inputs**

Following that, we have inputs, which are values we can pass in at the start of our workflow execution to then be able to define what happens. Now this one's looking for an array with two values inside of it, in this case, brand and price, which are default. But if you press execution, you can actually change what these values will be so that we can get different results for different executions.

The flow accepts a single input, an array of strings that specifies which columns to retain when processing the data:

```yaml
inputs:
  - id: columns_to_keep
    type: ARRAY
    itemType: STRING
    defaults:
      - brand
      - price
```      

**Task 1: Extract**

Afterwards, we've got our tasks, and as you can see here, the first task is going to extract data.

Downloads a JSON dataset from the URL https://dummyjson.com/products

The downloaded file's URI is accessible in subsequent tasks using {{outputs.extract.uri}} .

```yaml
tasks:
  - id: extract
    type: io.kestra.plugin.core.http.Download
    uri: https://dummyjson.com/products

```  

**Task 2: Transform**

In the Python code we're starting to transform the data to produce a new file, which is called products. Json. Afterwards, we can then pass products. Json to our query task


Task 2:

```yaml
tasks:

  - id: transform
    type: io.kestra.plugin.scripts.python.Script
    containerImage: python:3.11-alpine
    inputFiles:
      data.json: "{{outputs.extract.uri}}"
    outputFiles:
      - "*.json"
    env:
      COLUMNS_TO_KEEP: "{{inputs.columns_to_keep}}"
    script: |
      import json
      import os

      columns_to_keep_str = os.getenv("COLUMNS_TO_KEEP")
      columns_to_keep = json.loads(columns_to_keep_str)

      with open("data.json", "r") as file:
          data = json.load(file)

      filtered_data = [
          {column: product.get(column, "N/A") for column in columns_to_keep}
          for product in data["products"]
      ]

      with open("products.json", "w") as file:
          json.dump(filtered_data, file, indent=4)
```     

- Environment: Runs a Python script in a container using the python: 3.11-alpine image
- Takes the JSON file downloaded in the previous task (data. Json).
- Sets COLUMNS_TO_KEEP from the input columns_to_keep
- Reads the data. Json file
- Extracts only the specified columns (brand and price by default) for each product.
- Saves the transformed data to products. Json.
- Outputs the filtered JSON file as products. Json.


Python code is directly inside of our workflow, but we can also use Python code in separate files using the command task 

Python script explanation:

```python
import json
import os

# Load the columns to keep from the environment variable
columns_to_keep_str = os.getenv("COLUMNS_TO_KEEP")
columns_to_keep = json.loads(columns_to_keep_str)

# Read the input JSON data
with open("data.json", "r") as file:
    data = json.load(file)

# Filter data to retain specified columns
filtered_data = [
    {column: product.get(column, "N/A") for column in columns_to_keep}
    for product in data["products"]
]

# Write the filtered data to a new JSON file
with open("products.json", "w") as file:
    json.dump(filtered_data, file, indent=4)

```



**Task 3: Query**

- Input Data: Reads the products. Json file output from the transform task.
- Installs and loads DuckDB's JSON extension (INSTALL json; LOAD json;).
- Reads the products. Json file and processes the data: Calculates the average price (avg_price) for 
Each brand. Groups the results by brand. Orders the results in descending order of avg_price.
- FetchType: STORE: It saves the results of the SQL query to a file. This allows the results to be used by subsequent tasks in the flow


```yaml
tasks:

  - id: query
    type: io.kestra.plugin.jdbc.duckdb.Query
    inputFiles:
      products.json: "{{outputs.transform.outputFiles['products.json']}}"
    sql: |
      INSTALL json;
      LOAD json;
      SELECT brand, round(avg(price), 2) as avg_price
      FROM read_json_auto('{{workingDir}}/products.json')
      GROUP BY brand
      ORDER BY avg_price DESC;
    fetchType: STORE
```    

### 2: Execute

Now let’s test this by saving our flow and executing it! 

We get this wonderful Gantt view that helps us visualize which task has run when and at what point the workflow is at. If I click into these, it gives me some log messages


![pipeline2](images/pipeline2.jpg) 


If you go to the outputs tab now, I will be able to view some of the data generated for the different tasks.

![pipeline4](images/pipeline4.jpg) 


Click on preview:

![pipeline5](images/pipeline5.jpg) 

We can see we’ve got the JSON that was extracted at the beginning. There’s a lot of data here that is not very useful to us in its current form

Then transform task also produced some data. I can see that we’ve got a JSON file here with products. Json and another one called data. Json. For example this is the preview from products. Json:


![pipeline6](images/pipeline6.jpg) 


Then finally, we have the query, and here is where we get a table with the data in a much more organized, sorted format. It’s much more useful to us than that original JSON value. We can then download this or pass it to another task

Tasks Query --> Outputs uri --> Preview :


![pipeline7](images/pipeline7.jpg) 



## Launch Kestra using Docker Compose


### 1: Create a Docker-compose. Yaml

Lets create a docker-compose. Yml file inside your 02-workflow-orchestration:

```yaml

volumes:
  postgres-data:
    driver: local
  kestra-data:
    driver: local

services:
  postgres:
    image: postgres
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: kestra
      POSTGRES_USER: kestra
      POSTGRES_PASSWORD: kestra
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -d $${POSTGRES_DB} -U $${POSTGRES_USER}"]
      interval: 30s
      timeout: 10s
      retries: 10
    ports:
      - "5432:5432"

  kestra:
    image: kestra/kestra:latest
    pull_policy: always
    user: "root"
    command: server standalone
    volumes:
      - kestra-data:/app/storage
      - /var/run/docker.sock:/var/run/docker.sock
      - /tmp/kestra-wd:/tmp/kestra-wd
    environment:
      KESTRA_CONFIGURATION: |
        datasources:
          postgres:
            url: jdbc:postgresql://postgres:5432/kestra
            driverClassName: org.postgresql.Driver
            username: kestra
            password: kestra
        kestra:
          server:
            basicAuth:
              enabled: false
              username: "admin@kestra.io" # it must be a valid email address
              password: kestra
          repository:
            type: postgres
          storage:
            type: local
            local:
              basePath: "/app/storage"
          queue:
            type: postgres
          tasks:
            tmpDir:
              path: /tmp/kestra-wd/tmp
          url: http://localhost:8080/
    ports:
      - "8080:8080"
      - "8081:8081"
    depends_on:
      postgres:
        condition: service_started


  pgdatabase:
    image: postgres
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
      - "8090:80"
    depends_on:
      - postgres       
```

This docker-compose. Yml file defines four services: postgres, kestra, pgdatabase, and pgadmin, along with two named volumes: postgres-data and kestra-data.

**Volumes:**

- Postgres-data: Stores PostgreSQL data persistently.
- Kestra-data: Stores Kestra-related metadata persistently.

**Services**

- Postgres: PostgreSQL Database for kestra metadata
- Kestra: Kestra Workflow Orchestrator
- Pgdatabase: Another PostgreSQL Database for NY Taxi Data
- Pgadmin: pgAdmin for Database Management

> [!NOTE]  
I added the pgadmin service myself, it is optional but recommended to interact with the database

---

### 2: Create ny_taxi_postgres_data folder

Create a ny_taxi_postgres_data folder in the same directory as the docker-compose. Yaml file.

The directory structure now should look like this:

```

├── Workflow-Orchestration
    ├── flows
    |
    ├── ny_taxi_postgres_data
    |
    └── docker-compose.yaml

```

### 3: Run Kestra and Postgres

In a new terminal, go to the path where the docker-compose file is and run the following command:

```
docker-compose up -p kestra-postgres up -d
```

The -p option specifies a custom project name (kestra-postgres in this case).

The -d option stands for "detached mode," meaning the containers will run in the background, allowing you to continue using the terminal without being attached to the container logs.

Once the container starts, you can access the Kestra UI at http://localhost:8080 and the pgadmin web 
in http://localhost:8090

To connect pgadmin with the postgress db: Right-click on Servers on the left sidebar --> Register--> Server

Under General give the Server a name: kestra taxi

Under Connection add:

- Host name: pgdatabase
- Port: 5432 
- User:root
- Password:root

<br>

![kestra17](images/kestra17.jpg)

<br><br>


# 2. Hands-On Coding Project: Build Data Pipelines with Kestra


## Load Data to Local Postgres

_([Video source](https://www.youtube.com/watch?v=OkfLX28Ecjg))_

- CSV files accessible here: https://github.com/DataTalksClub/nyc-tlc-data/releases
- Flow: [`02_postgres_taxi.yaml`](flows/02_postgres_taxi.yaml)



![local1](images/local1.jpg) 


### 1: Flow explanation step by step

#### Variables

```yaml
variables:
  file: "{{inputs.taxi}}_tripdata_{{inputs.year}}-{{inputs.month}}.csv"
  staging_table: "public.{{inputs.taxi}}_tripdata_staging"
  table: "public.{{inputs.taxi}}_tripdata"
  data: "{{outputs.extract.outputFiles[inputs.taxi ~ '_tripdata_' ~ inputs.year ~ '-' ~ inputs.month ~ '.csv']}}""
```  

- File: Constructs the filename of the CSV file to be processed based on the selected taxi type, year, and month. The result will be a string like "yellow_tripdata_2019-01. Csv"
- Staging_table: Temporary table for the given taxi, year, and month.
- Table: Specifies the final table name in PostgreSQL where the merged data will be stored for a specific taxi type. Example: public. Green_tripdata
- Data:  Refers to the output file generated by the extract task, used as input for the CopyIn tasks. Example: If inputs. Taxi = green, inputs. Year = 2020, and inputs. Month = 02, and the file was downloaded successfully: outputs. Extract. OutputFiles['green_tripdata_2020-02. Csv']




#### Task: Set Labels

Adds labels to the flow execution to track the selected file and taxi type.

Labels are metadata tags that help organize, identify, and track workflow executions. They can provide valuable contextual information during runtime or when reviewing logs and monitoring workflow executions.

Labels appear in the Kestra UI or logs, making it easier to understand the context of an execution. Useful for filtering or searching workflow executions by specific criteria

#### Task: Extract Data

```yaml
  - id: extract
    type: io.kestra.plugin.scripts.shell.Commands
    outputFiles:
      - "*.csv"
    taskRunner:
      type: io.kestra.plugin.core.runner.Process
    commands:
      - wget -qO- https://github.com/DataTalksClub/nyc-tlc-data/releases/download/{{inputs.taxi}}/{{render(vars.file)}}.gz | gunzip > {{render(vars.file)}}

```

Downloads the compressed CSV file using wget from the GitHub repository and decompresses it and saves it as a .csv file.

#### Task: yellow_table/green_table

```yaml
  - id: yellow_table
    runIf: "{{inputs.taxi == 'yellow'}}"
    type: io.kestra.plugin.jdbc.postgresql.Queries
    sql: |
      CREATE TABLE IF NOT EXISTS {{render(vars.table)}} (
          unique_row_id          text,
          filename                text,
          VendorID               text,

        ...
      );
```      

Creates a yellow/green taxi final table in PostgreSQL if it doesn't already exist, with specific schema columns.

The reason we have to use the render function inside of this expression:

```
CREATE TABLE IF NOT EXISTS {{render(vars.final_table)}}
```

Is because we need to be able to render the variable which has an expression in it so we get a string which will contain green or yellow and then we can use it otherwise we will just receive a string and it will not have the dynamic value.

Schema has two extra columns: unique grow ID and file name so we can see which file the data came and a unique ID generated based on the data in order to prevent adding duplicates later 


#### Task: yellow_create_staging_table/green_create_staging_table

```yaml
  - id: yellow_create_staging_table
    runIf: "{{inputs.taxi == 'yellow'}}"
    type: io.kestra.plugin.jdbc.postgresql.Queries
    sql: |
      CREATE TABLE IF NOT EXISTS {{render(vars.staging_table)}} (
          VendorID               text,
          tpep_pickup_datetime   timestamp,
          tpep_dropoff_datetime  timestamp,
          passenger_count        integer,

          ...
      );
```      

Creates a temporary table for monthly yellow/green taxi data with schema aligned to the CSV file.


#### Task: truncate_table

```yaml
  - id: truncate_table
    type: io.kestra.plugin.jdbc.postgresql.Queries
    sql: |
      TRUNCATE TABLE {{render(vars.staging_table)}};
```      

Ensures the staging table is empty before loading new data.

#### Task: green_copy_in_to_staging_table/yellow_copy_in_to_staging_table

```yaml
  - id: green_copy_in_to_staging_table
    runIf: "{{inputs.taxi == 'green'}}"
    type: io.kestra.plugin.jdbc.postgresql.CopyIn
    format: CSV
    from: "{{render(vars.data)}}"
    table: "{{render(vars.staging_table)}}"
    header: true
    columns: [VendorID,lpep_pickup_datetime, ...]

```

This task is responsible for copying data from the extracted CSV file into a temporary PostgreSQL table for processing

- runIf: " {{inputs.taxi == 'green'}} ": This ensures the task runs only when the user selects green as the taxi type
- Type: io. Kestra. Plugin. Jdbc. Postgresql. CopyIn: The task uses the CopyIn plugin, which supports PostgreSQL's COPY command for bulk data loading.
- Format: CSV: Indicates that the input file format is a CSV.
- from: " {{render(vars.data)}} ": Refers to the location of the extracted CSV file. The vars. Data variable resolves to the path of the downloaded green taxi data file, such as outputs. Extract. OutputFiles['green_tripdata_2020-02. Csv'].
- table: " {{render(vars.staging_table)}} ": Specifies the target temporary table where the data will be imported. The vars. Table variable dynamically generates the table name, for example "public. Green_tripdata_temp".
- header: true: Indicates that the first row of the CSV contains column headers (e.g., VendorID, lpep_pickup_datetime, etc.).
- Columns: Lists the columns in the PostgreSQL table that correspond to the data in the CSV file. These include fields like VendorID, lpep_pickup_datetime, trip_distance, etc., ensuring the data is mapped correctly during the import.


#### Task: yellow_add_unique_id_and_filename/green_add_unique_id_and_filename

```yaml
  - id: yellow_add_unique_id_and_filename
    runIf: "{{inputs.taxi == 'yellow'}}"
    type: io.kestra.plugin.jdbc.postgresql.Queries
    sql: |
      ALTER TABLE {{render(vars.staging_table)}}
      ADD COLUMN IF NOT EXISTS unique_row_id text,
      ADD COLUMN IF NOT EXISTS filename text;
  
      UPDATE {{render(vars.staging_table)}}
      SET 
        Unique_row_id = md 5 (
          COALESCE (CAST (VendorID AS text), '') ||
          COALESCE (CAST (tpep_pickup_datetime AS text), '') || 
          COALESCE (CAST (tpep_dropoff_datetime AS text), '') || 
          COALESCE (PULocationID, '') || 
          COALESCE (DOLocationID, '') || 
          COALESCE (CAST (fare_amount AS text), '') || 
          COALESCE (CAST (trip_distance AS text), '')      
        ),
        filename = ' {{render(vars.file)}} ';
```        

- Adds columns unique_row_id and filename if they don't exist in the temporary table
- Updates the table by generating a unique hash ID for each row and stores the file name.


#### Task: yellow_merge_data/green_merge_data

```yaml
  - Id: yellow_merge_data
    runIf: " {{inputs.taxi == 'yellow'}} "
    Type: io. Kestra. Plugin. Jdbc. Postgresql. Queries
    Sql: |
      MERGE INTO {{render(vars.table)}} AS T
      USING {{render(vars.staging_table)}} AS S
      ON T.unique_row_id = S.unique_row_id
      WHEN NOT MATCHED THEN
        INSERT (
          Unique_row_id, filename, VendorID, tpep_pickup_datetime, tpep_dropoff_datetime,
          Passenger_count, trip_distance, RatecodeID, store_and_fwd_flag, PULocationID,
          DOLocationID, payment_type, fare_amount, extra, mta_tax, tip_amount, tolls_amount,
          Improvement_surcharge, total_amount, congestion_surcharge
        )
        VALUES (
          S.unique_row_id, S.filename, S.VendorID, S.tpep_pickup_datetime, S.tpep_dropoff_datetime,
          S.passenger_count, S.trip_distance, S.RatecodeID, S.store_and_fwd_flag, S.PULocationID,
          S.DOLocationID, S.payment_type, S.fare_amount, S.extra, S.mta_tax, S.tip_amount, S.tolls_amount,
          S.improvement_surcharge, S.total_amount, S.congestion_surcharge
        );
```        

Merges monthly data from the temporary table into the yellow_table/green_table using the unique_row_id as the key

- Type: io. Kestra. Plugin. Jdbc. Postgresql. Queries: Executes SQL queries on a PostgreSQL database.
- SQL Query:

  ```sql
  MERGE INTO {{render(vars.table)}} AS T
  USING {{render(vars.staging_table)}} AS S
  ON T.unique_row_id = S.unique_row_id
  ```

  MERGE INTO {{render(vars.table)}} AS T: Combines data from the monthly table (S) into the final table (T).

  USING {{render(vars.staging_table)}} AS S: Refers to the source table (S), which is dynamically rendered from the variable vars. Table (e.g., public. Yellow_tripdata_2019_01).

  ON T.unique_row_id = S.unique_row_id: Matches rows from the source (S) and target (T) based on the unique_row_id column. If a record with the same unique_row_id exists in T, it is ignored.


- SQL Query:

  ```sql
  WHEN NOT MATCHED THEN
  INSERT (
    Unique_row_id, filename, VendorID, tpep_pickup_datetime, tpep_dropoff_datetime,
    Passenger_count, trip_distance, RatecodeID, store_and_fwd_flag, PULocationID,
    DOLocationID, payment_type, fare_amount, extra, mta_tax, tip_amount, tolls_amount,
    Improvement_surcharge, total_amount, congestion_surcharge
  )
  VALUES (
    S.unique_row_id, S.filename, S.VendorID, S.tpep_pickup_datetime, S.tpep_dropoff_datetime,
    S.passenger_count, S.trip_distance, S.RatecodeID, S.store_and_fwd_flag, S.PULocationID,
    S.DOLocationID, S.payment_type, S.fare_amount, S.extra, S.mta_tax, S.tip_amount, S.tolls_amount,
    S.improvement_surcharge, S.total_amount, S.congestion_surcharge
  );
  ```

  WHEN NOT MATCHED THEN: Ensures that only records that do not already exist in T are inserted.

  INSERT VALUES: Inserts all relevant columns from the monthly table,



#### Task: purge_files

This task ensures that any files downloaded or generated during the flow execution are deleted once they are no longer needed. Its purpose is to keep the storage clean and free of unnecessary clutter.


#### Plugin Defaults

All PostgreSQL tasks use a pre-configured connection:

URL: jdbc:postgresql://host. Docker. Internal: 5433/ny_taxi
Username: root
Password: root


### 2: Execute flow


Lets try with this example:

![local2](images/local2.jpg) 


### 3: Check PgAdmin

Head over to PgAdmin --> Servers --> kestra taxi --> Databases --> ny_taxi --> Schemas --> public --> Tables --> green_tripdata

Final table for green taxi looks like this:

![local2](images/kestra18.jpg) 


## Load Data to Local Postgres with backfill

_([Video source](https://www.youtube.com/watch?v=_-li_z97zog))_

- Flow: [`02_postgres_taxi_scheduled.yaml`](flows/02_postgres_taxi_scheduled.yaml)

Backfill is the process of running a workflow or data pipeline for historical data that wasn't processed when it originally occurred. It involves replaying or processing past data to ensure the dataset is complete and up to date.

Now we can start using schedules and backfills to automate our pipeline. All we need here is an input for the type of taxi. Previously, we had the month and the year to go with that too. We don't need that this time because we're going to use the trigger to automatically add that.

### 1: Flow explanation

**concurrency**

```yaml
Concurrency:
    Limit: 1
```

It's worth noting that we need to run these one at a time because we only have one staging table here meaning we can only run one execution of this workflow at a time to prevent multiple flows from writing different months to the same staging table. If we want to run multiple months at a time, we should create staging tables for each of the months. 


**Triggers: green_schedule**

- Cron Expression: "0 9 1 * *": Runs at 9:00 AM on the first day of every month.
-  Initiates the workflow to process monthly data for green taxis at the scheduled time.

**Triggers: yellow_schedule**

- Cron Expression: "0 10 1 * *": Runs at 10:00 AM on the first day of every month.
- Initiates the workflow to process monthly data for yellow taxis at the scheduled time.


### 2: Execute flow

Select triggers --> Backfill executions

Lets try with this example:

<br>

![local19](images/kestra19.jpg) 

<br>

Select executions:

<br>

![local20](images/kestra20.jpg) 

<br>

### 3: Check PgAdmin

After backfilling January and February and manually loading May 2019, you can now, for example, run queries on the table:

![local21](images/kestra21.jpg) 


## Load Data to GCP

_([Video source](https://www.youtube.com/watch?v=nKqjjLJ7YXs))_

Now that you've learned how to build ETL pipelines locally using Postgres, we are ready to move to the cloud. In this section, we'll load the same Yellow and Green Taxi data to Google Cloud Platform (GCP) using:

- Google Cloud Storage (GCS) as a data lake
- BigQuery as a data warehouse.



### 1: KV Store

Before we start loading data to GCP, we need to include your service account, GCP project ID, BigQuery dataset and GCS bucket name (along with their location) as KV Store values.

In Kestra, a KV Store (Key-Value Store) is a storage system used to persist data as key-value pairs making it ideal for storing and retrieving data efficiently during workflows. Data is stored in pairs, where:

- Key: Acts as a unique identifier.
- Value: Contains the data associated with the key.

KV Store its a great way for being able to store data that doesn't change very often but you want to access it between a number of different flows.

Adjust the following flow [`04_gcp_kv.yaml`](flows/04_gcp_kv.yaml), then execute it in kestra in order to include your service account, GCP project ID, BigQuery dataset and GCS bucket name as KV Store values.


> [!WARNING]  
> The `GCP_CREDS` service account contains sensitive information. Ensure you keep it secure and do not commit it to Git. Keep it as secure as your passwords.

---
> [!NOTE]  
>Make sure the location of your resources in GCP matches the location of the flow
>
>  ```yaml
>    - id: gcp_location
>    type: io. Kestra. Plugin. Core. Kv. Set
>    key: GCP_LOCATION
>    kvType: STRING
>    value: US
>  ```  

---


After the execution of 04_gcp_kv, go to Namespaces --> KV Store

Should look like this:

![kvstore](images/kvstore.jpg) 


### 2: Create GCP Resources

If you haven't already created the GCS bucket and BigQuery dataset in the first week with terraform, you can use this flow to create them: [`05_gcp_setup.yaml`](flows/05_gcp_setup.yaml)


### 3: Execute flow


Lets try [`06_gcp_taxi.yaml`](flows/06_gcp_taxi.yaml) with inputs green, year 2019 and month 07.

If the flow was executed correctly, the Gantt chart should look like this:

![gcp1](images/gcp1.jpg) 

<br>
Your bucket should look like this:

![gcp2](images/gcp2.jpg) 
<br>
And BigQuery should look like this:

![gcp3](images/gcp3.jpg) 
<br>


### Detailed explanation of the flow

#### > Variables

```yaml
Variables:
  file: " {{inputs.taxi}} _tripdata_ {{inputs.year}} - {{inputs.month}} .csv"
  gcs_file: "gs:// {{kv('GCP_BUCKET_NAME')}} / {{vars.file}} "
  table: " {{kv('GCP_DATASET')}} . {{inputs.taxi}} _tripdata_ {{inputs.year}} _ {{inputs.month}} "
  data: " {{outputs.extract.outputFiles[inputs.taxi ~ '_tripdata_' ~ inputs.year ~ '-' ~ inputs.month ~ '.csv']}} "
```  

- **file:** This variable creates a file name. The result will be a string like "yellow_tripdata_2024-12. Csv"

- **gcs_file:** This variable specifies the destination path in Google Cloud Storage (GCS) for the file. 
  - Kv ('GCP_BUCKET_NAME'): This fetches the name of the GCS bucket from a key-value store. 
  - Vars. File: This refers to the previously defined file variable, which contains the dynamically generated file name. 
  - The result will be a GCS path like "gs://my-bucket/yellow_tripdata_2024-12. Csv"

- **table:** This variable creates a reference to a dataset and table in Google BigQuery. 
  - Kv ('GCP_DATASET'): This fetches the dataset name from the key-value store. 
  - The result might look like "zoomcamp. Yellow_tripdata_2024_12", which points to a specific table in BigQuery.

- **data:**
  - Outputs. Extract. OutputFiles: This accesses the output of a task named extract and looks for the file that matches the name generated dynamically. 
  - The result is a reference to the actual file that was extracted, like "yellow_tripdata_2024-12. Csv".

<br><br>

#### > Task: upload_to_gcs

```yaml
  - Id: upload_to_gcs
    Type: io. Kestra. Plugin. Gcp. Gcs. Upload
    from: " {{render(vars.data)}} "
    to: " {{render(vars.gcs_file)}} "
```    

This part defines a task that uploads a file to Google Cloud Storage (GCS)

- **type:** This defines the type of task or plugin being used. This plugin facilitates uploading files from a source to a Google Cloud Storage bucket

- **from:** The data variable references the file extracted from the previous extract task in the workflow.

- **to:** This specifies the destination path in Google Cloud Storage (GCS) where the file will be uploaded.


#### > Task: bq_green_tripdata/bq_yellow_tripdata

The bq_green_tripdata/bq_yellow_tripdata task ensures that a BigQuery table with the correct schema and configurations is available to store green taxi trip data, forming the foundation for subsequent data processing and analysis. This is the final table

```yaml
  - Id: bq_green_tripdata
    runIf: " {{inputs.taxi == 'green'}} "
    Type: io. Kestra. Plugin. Gcp. Bigquery. Query
    Sql: |
      CREATE TABLE IF NOT EXISTS ` {{kv('GCP_PROJECT_ID')}} . {{kv('GCP_DATASET')}} . green_tripdata`
      (
          Unique_row_id BYTES OPTIONS, filename STRING OPTIONS, VendorID STRING OPTIONS,
          Lpep_pickup_datetime TIMESTAMP OPTIONS, lpep_dropoff_datetime TIMESTAMP OPTIONS,
          Store_and_fwd_flag STRING OPTIONS, RatecodeID STRING OPTIONS, PULocationID STRING OPTIONS,
          DOLocationID STRING OPTIONS, passenger_count INT 64 OPTIONS, trip_distance NUMERIC OPTIONS,
          Fare_amount NUMERIC OPTIONS, extra NUMERIC OPTIONS, mta_tax NUMERIC OPTIONS, tip_amount NUMERIC OPTIONS,
          Tolls_amount NUMERIC OPTIONS, ehail_fee NUMERIC, improvement_surcharge NUMERIC OPTIONS,
          Total_amount NUMERIC OPTIONS, payment_type INTEGER OPTIONS, trip_type STRING OPTIONS,
          Congestion_surcharge NUMERIC OPTIONS
      )
      PARTITION BY DATE (lpep_pickup_datetime);
```      

- **type: io. Kestra. Plugin. Gcp. Bigquery. Query:** type of task being used, which is the Google Cloud BigQuery query plugin. The task is designed to execute a SQL query on a BigQuery dataset. Specifically, it will create a table if it does not already exist.

- **sql:** 
  - CREATE TABLE IF NOT EXISTS ` {{kv('GCP_PROJECT_ID')}} . {{kv('GCP_DATASET')}} . green_tripdata`: This command creates a table named green_tripdata within a specified BigQuery project and dataset.
  - PARTITION BY DATE (lpep_pickup_datetime): This line defines how the table is partitioned in BigQuery. The table will be partitioned by the lpep_pickup_datetime field, meaning data will be grouped by the date on which each trip started. Partitioning helps optimize queries by limiting the amount of data scanned, especially when querying large datasets.


#### > Task: bq_green_table_ext/bq_yellow_table_ext

```yaml
  - Id: bq_green_table_ext
    runIf: " {{inputs.taxi == 'green'}} "
    Type: io. Kestra. Plugin. Gcp. Bigquery. Query
    Sql: |
      CREATE OR REPLACE EXTERNAL TABLE ` {{kv('GCP_PROJECT_ID')}} . {{render(vars.table)}} _ext`
      (
          VendorID STRING OPTIONS, lpep_pickup_datetime TIMESTAMP OPTIONS, lpep_dropoff_datetime TIMESTAMP OPTIONS,
          Store_and_fwd_flag STRING OPTIONS, RatecodeID STRING OPTIONS, PULocationID STRING OPTIONS,
          DOLocationID STRING OPTIONS, passenger_count INT 64 OPTIONS, trip_distance NUMERIC OPTIONS,
          Fare_amount NUMERIC OPTIONS, extra NUMERIC OPTIONS, mta_tax NUMERIC OPTIONS, tip_amount NUMERIC OPTIONS,
          Tolls_amount NUMERIC OPTIONS, ehail_fee NUMERIC, improvement_surcharge NUMERIC OPTIONS,
          Total_amount NUMERIC OPTIONS, payment_type INTEGER OPTIONS, trip_type STRING OPTIONS,
          Congestion_surcharge NUMERIC OPTIONS
      )
      OPTIONS (
          Format = 'CSV',
          uris = [' {{render(vars.gcs_file)}} '],
          Skip_leading_rows = 1,
          Ignore_unknown_values = TRUE
      );
```      

The bq_green_table_ext/bq_yellow_table_ext task is designed to load data stored in Google Cloud Storage (GCS) into BigQuery creating an external table in BigQuery, which means that the data does not reside directly in BigQuery, but rather, it is accessed externally. Provide a schema definition for the external table that matches the structure of the data in the CSV file for green taxi trips.

The external table is defined within the BigQuery dataset specified by the configuration variables (GCP_PROJECT_ID and GCP_DATASET). The table name is dynamically generated based on the taxi type, year, and month, using the vars. Table variable (e.g., green_tripdata_2019_01_ext).

- **type: io. Kestra. Plugin. Gcp. Bigquery. Query:**  Google Cloud BigQuery query plugin.

- **sql:** 
  - CREATE OR REPLACE EXTERNAL TABLE ` {{kv('GCP_PROJECT_ID')}} . {{render(vars.table)}} _ext`: This query is used to create an external table in BigQuery

  - OPTIONS: 

    - Format = 'CSV': Specifies that the external data source is in CSV format.
    - uris = [' {{render(vars.gcs_file)}} ']: The uris option points to the location of the external data. This should point to a file in Google Cloud Storage.
    - Skip_leading_rows = 1: Instructs BigQuery to skip the first row of the CSV files, which typically contains column headers.
    - Ignore_unknown_values = TRUE: Tells BigQuery to ignore any rows with unknown values


#### > Task: bq_green_table_tmp/bq_yellow_table_tmp

```yaml
  - Id: bq_green_table_tmp
    runIf: " {{inputs.taxi == 'green'}} "
    Type: io. Kestra. Plugin. Gcp. Bigquery. Query
    Sql: |
      CREATE OR REPLACE TABLE ` {{kv('GCP_PROJECT_ID')}} . {{render(vars.table)}} `
      AS
      SELECT
        MD 5 (CONCAT (
          COALESCE (CAST (VendorID AS STRING), ""),
          COALESCE (CAST (lpep_pickup_datetime AS STRING), ""),
          COALESCE (CAST (lpep_dropoff_datetime AS STRING), ""),
          COALESCE (CAST (PULocationID AS STRING), ""),
          COALESCE (CAST (DOLocationID AS STRING), "")
        )) AS unique_row_id,
        " {{render(vars.file)}} " AS filename,
        *
      FROM ` {{kv('GCP_PROJECT_ID')}} . {{render(vars.table)}} _ext`;
```      

This task creates or replaces a BigQuery table using data from external table previously created. Copies the entire dataset from the associated external table into this table, while enriching it with the additional columns. 

- The unique_row_id is generated by concatenating multiple fields and applying an MD 5 hash to create a unique identifier for each record. 

- A new column (filename) is added, which contains the name of the file that the data was sourced from. The query transforms and re-organizes the data from the external table into the new table, retaining all original columns along with the newly calculated unique_row_id and filename



SQL Query Breakdown:

- **CREATE OR REPLACE TABLE:** This command creates a new table in BigQuery or replaces an existing table with the same name. The table name is dynamically generated.

- **MD 5 (CONCAT (...)) AS unique_row_id:** This part creates a unique identifier (unique_row_id) for each row by combining (concatenating) multiple columns (VendorID, lpep_pickup_datetime, lpep_dropoff_datetime, PULocationID, and DOLocationID) and then applying the MD 5 hash function to the concatenated string.
- **COALESCE** function ensures that if any of these fields have NULL values, they are replaced with empty strings ("").
- **" {{render(vars.file)}} " AS filename:** This adds a new column named filename to the output table.
- **"*":** This selects all other columns from the external table without any changes. All the original columns (such as VendorID, lpep_pickup_datetime, fare_amount, etc.) are included in the output table.
- **FROM {{kv('GCP_PROJECT_ID')}} . {{render(vars.table)}} _ext:** The data is selected from the external table, which was created in a previous task.


#### > Task: bq_green_merge/bq_yellow_merge

The goal of this task is to merge data from a source table ( {{render(vars.table)}} ) (for example green_tripdata_2019_07) into a target table (green_tripdata), ensuring that only new records are inserted, while avoiding duplicate entries based on a unique identifier (unique_row_id).

SQL Query Breakdown:

The SQL query performs a MERGE operation, which is a combination of an UPDATE, INSERT, and DELETE operation. This allows for merging data from two tables based on a condition, usually the primary key or a unique identifier.

```sql
MERGE INTO ` {{kv('GCP_PROJECT_ID')}} . {{kv('GCP_DATASET')}} . green_tripdata` T
USING ` {{kv('GCP_PROJECT_ID')}} . {{render(vars.table)}} ` S
ON T.unique_row_id = S.unique_row_id
```

- **MERGE INTO:** This is the operation that merges data into the target table (green_tripdata)
- **USING:**  The source table (S) is the table where new data is coming from, defined by {{render(vars.table)}} for example green_tripdata_2019_07.
- **ON T.unique_row_id = S.unique_row_id:** This is the condition used to match rows between the target table (T) and the source table (S). The merge happens based on the unique_row_id column, which is the primary key that uniquely identifies each row in both tables.

```sql
WHEN NOT MATCHED THEN
  INSERT (unique_row_id, filename, VendorID, lpep_pickup_datetime, lpep_dropoff_datetime, store_and_fwd_flag, RatecodeID, PULocationID, DOLocationID, passenger_count, trip_distance, fare_amount, extra, mta_tax, tip_amount, tolls_amount, ehail_fee, improvement_surcharge, total_amount, payment_type, trip_type, congestion_surcharge)
  VALUES (S.unique_row_id, S.filename, S.VendorID, S.lpep_pickup_datetime, S.lpep_dropoff_datetime, S.store_and_fwd_flag, S.RatecodeID, S.PULocationID, S.DOLocationID, S.passenger_count, S.trip_distance, S.fare_amount, S.extra, S.mta_tax, S.tip_amount, S.tolls_amount, S.ehail_fee, S.improvement_surcharge, S.total_amount, S.payment_type, S.trip_type, S.congestion_surcharge);

```

- **WHEN NOT MATCHED THEN INSERT:** This part of the query specifies what to do when a record from the source table (S) does not already exist in the target table (T). If no matching unique_row_id is found in the target table, a new row from the source table will be inserted into the target table.

- **INSERT:** Specifies the columns that will be inserted into the target table (green_tripdata).

- **VALUES:** Specifies the values for each column from the source table (S). These values are dynamically pulled from the source table's columns for each record.


### Tables explanation

**External Table**

Example: green_tripdata_2019_07_ext

This table is created as an external table that links to the raw data stored in an external source, like a Google Cloud Storage (GCS) bucket. Serves as the initial point of access to the raw data. The data in this table is not physically stored in BigQuery.

![gcp4](images/gcp4.jpg) 

<br><br>

**Temporary Table**

Example: green_tripdata_2019_07

This is a native table created in BigQuery using the data from the external table. Copies the entire dataset from the associated external table into this table, while enriching it with the additional columns unique_row_id and filename

![gcp5](images/gcp5.jpg) 

<br><br>

**Final Table**

Example: green_tripdata

After processing the data and ensuring there are no duplicates or inconsistencies, the final data is merged into this table. It represents the cleaned, transformed, and de-duplicated dataset including data from all months.

External Table → Temporary Table → Final Table.



## Load Data to GCP with backfill

_([Video source](https://www.youtube.com/watch?v=DoaZ5JWEkH0))_

We can now schedule the same pipeline shown above to run at 9:00 AM on the first day of every month for the green dataset and to run at 10:00 AM on the first day of every month for the yellow dataset. You can backfill historical data directly from the Kestra UI.

- Flow: [`06_gcp_taxi_scheduled.yaml`](flows/06_gcp_taxi_scheduled.yaml)


Access the Kestra UI --> Select triggers --> Backfill executions

Lets load all data from Green Taxi:

- Start date: 2018-12-31 00:00:00
- End date: 2021-07-31 00:00:00

If everything was executed correctly, you should have all the 2019-2020-2021 data for Green Taxi loaded in BigQuery in the green_tripdata table

Head over to GCP, green_tripdata table should looks like this:
<br><br>

![gcp6](images/gcp6.jpg) 

