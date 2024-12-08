---
created-date: 2024-12-08 15:57
id: 
url: https://youtu.be/jrv7J40Qs9A?si=Je1Lm4LKLE2YyBd8
related: 
aliases: 
tags:
  - "#reference_note"
summary:
---
# Install Apache Spark Using Docker

## Step 1: Download Docker Image

- Go to spark.apache.org and click on "Convenient Docker images"
- Search for "bitnami Apache Spark" and select the verified publisher image
- Copy the Docker Compose YAML file link and paste it in your terminal to download the file

## Step 2: Edit Docker Compose YAML File

- Open the downloaded YAML file in a code editor
- Add a volume to map the current working directory to the container: `volume: .:/opt/spark`
- Save the file

## Step 3: Run Docker Compose

- Run the command `docker-compose up -d` to start the container in the background
- Wait for the container to start and install Apache Spark

## Step 4: Exec into Container

- Run the command `docker ps` to find the container ID
- Run the command `docker exec -it <container_id> bash` to exec into the container

## Step 5: Verify Apache Spark Installation

- Check the file system to verify that Apache Spark is installed
- Run the command `spark-shell` to start the Spark shell
- Read in a CSV file using the command `val df = spark.read.format("csv").option("header", "true").load("/opt/spark/<csv_file>")`
- Verify that the data frame is created and print the schema using the command `df.printSchema()`

## **Example Use Cases**

- Select specific fields from the data frame using the command `df.select("field1", "field2", "field3").show()`
- Filter the data frame using the command `df.filter(df("age") > 30).show()`

## **Troubleshooting**

- If you encounter any issues, leave a comment in the comment section below and the author will help you resolve the issue.