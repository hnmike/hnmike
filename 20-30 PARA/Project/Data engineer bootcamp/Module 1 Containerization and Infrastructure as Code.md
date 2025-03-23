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


**Data Engineering** is the discipline of designing, building, and maintaining the systems and infrastructure needed to collect, process, store, and analyze large volumes of data. It focuses on creating the foundation that enables data scientists, analysts, and other stakeholders to work with clean, organized, and reliable data. Key Responsibilities:

- Data Pipelines: Building pipelines to move data from various sources (e.g., databases, APIs, IoT devices) to centralized storage systems like data warehouses or data lakes.
    
- Data Transformation: Cleaning, transforming, and structuring raw data into formats suitable for analysis or machine learning.
    
- Data Storage: Designing scalable and efficient storage solutions, often using cloud services like AWS, Google Cloud, or Azure
    

A **data pipeline** is a series of processes and tools that automate the movement, transformation, and processing of data from one system to another. It allows raw data to be collected from various sources, cleaned, transformed, and made ready for analysis or storage in a target destination like a database, data warehouse, or data lake. For example, reading a CSV file, transforming the data somehow and storing it as a table in a PostgreSQL database.

[![pipeline](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/raw/main/1_Containerization-and-Infrastructure-as-Code/images/pipeline.jpg)](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/blob/main/1_Containerization-and-Infrastructure-as-Code/images/pipeline.jpg)

## Docker

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

[[Creating a simple data pipeline in Docker]]