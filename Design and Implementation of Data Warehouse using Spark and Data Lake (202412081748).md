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

## ## 1. MinIO Installation

bash

CopyInsert

`# Create storage directory mkdir -p .storage/minio # Pull and run MinIO docker pull minio/minio:latest docker run -d \   -p 9000:9000 \   -p 9001:9001 \   -e MINIO_ACCESS_KEY=root \   -e MINIO_SECRET_KEY=root12345 \   -v ./.storage/minio:/data \   minio/minio:latest server /data --console-address ":9001"`

## 2. Spark Installation

Spark requires both a master and worker nodes. The Dockerfile shows it uses:

- Python 3.7
- OpenJDK 8
- Spark 3.1.1 with Hadoop 3.2

bash

CopyInsert

`# Build Spark image cd spark docker build -t spark-base . # Run Spark Master docker run -d \   -p 4040:4040 \   -p 7077:7077 \   -p 8080:8080 \   -p 18080:18080 \   spark-base sh spark-master.sh # Run Spark Worker docker run -d \   -p 8081:8081 \   spark-base sh spark-worker.sh`

## 3. Airflow Installation

Airflow setup includes:

- Python 3.7
- Custom airflow.cfg
- DAGs directory mounted

bash

CopyInsert

`# Build Airflow image cd airflow docker build -t custom-airflow . # Run Airflow docker run -d \   -p 8000:8000 \   -e AIRFLOW__CORE__FERNET_KEY=PeszOD9t6wKNdNONTGh-k4qsYbsGHQ8CSqTQZlqPCDk= \   -e AIRFLOW_HOME=/opt/airflow \   -v ./dags:/opt/airflow/dags \   custom-airflow`

## 4. Hive Installation

Let me check the Hive configuration:

Analyzed

Dockerfile

bash

CopyInsert

`# Build Hive image cd hive docker build -t hive-metastore . # Run MariaDB (required for Hive) docker run -d \   -p 3306:3306 \   -e MYSQL_ROOT_PASSWORD=root \   -e MYSQL_USER=admin \   -e MYSQL_PASSWORD=admin \   -e MYSQL_DATABASE=metastore_db \   mariadb:latest  # Run Hive docker run -d \   -p 9083:9083 \   hive-metastore`

## 5. Presto Installation

Let me check the Presto configuration:

Analyzed

Dockerfile

bash

CopyInsert

`# Build Presto image cd presto docker build -t presto . # Run Presto Coordinator docker run -d \   -p 8888:8888 \   -v ./coordinator_config.properties:/opt/presto/etc/config.properties \   -v ./etc/catalog:/opt/presto/etc/catalog \   presto  # Run Presto Worker docker run -d \   -v ./worker_config.properties:/opt/presto/etc/config.properties \   -v ./etc/catalog:/opt/presto/etc/catalog \   presto`

## 6. Superset Installation

bash

CopyInsert

`# Pull and run Superset docker run -d \   -p 8088:8088 \   -e ADMIN_USERNAME=admin \   -e ADMIN_PWD=admin \   -v ./superset:/superset \   arezamoosavi/superset:latest`

## Using Docker Compose (Recommended Method)

Instead of running each container separately, you can use the provided docker-<mark class="hltr-pink">compose.yaml</mark> to start all services at once:

bash

CopyInsert

`# Build all images docker-compose build # Start all services docker-compose up -d # Check all running containers docker-compose ps # View logs docker-compose logs -f [service-name] # Stop all services docker-compose down`

# Resources 
[GitHub - arezamoosavi/AcidOnSpark-ETL: Delta-Lake, ETL, Spark, Airflow](https://github.com/arezamoosavi/AcidOnSpark-ETL) 