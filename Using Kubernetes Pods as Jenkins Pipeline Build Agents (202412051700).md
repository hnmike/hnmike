---
created-date: 2024-12-05 17:00
id: 
url: https://www.youtube.com/watch?v=wQxahZUwYoM&list=LL&index=6&t=1546s
related: 
aliases: 
tags:
  - todoproject
summary:
---
# **Using Kubernetes Pods as Jenkins Pipeline Build Agents**

## **Takeaway Notes**

### 1. Create an instance on AWS

- Create an instance on AWS with a suitable instance type (e.g., T3 medium) and a key pair.

### 2. Install Docker

- Install Docker on the instance using the APT repository.

### 3. Create a Kubernetes cluster

- Create a Kubernetes cluster using Minikube with Docker as the driver.

### 4. Install kubectl

- Install kubectl on the instance to interact with the Kubernetes cluster.

### 5. Create a Jenkins container

- Create a Jenkins container using the Jenkins LTS image and expose ports 8080 and 50000.

### 6. Configure Jenkins

- Configure Jenkins to use the Kubernetes cluster as a build agent.

### 7. Create a service account

- Create a service account in the Kubernetes cluster to use as credentials for Jenkins.

### 8. Create a token

- Create a token for the service account to use as a secret text in Jenkins.

### 9. Configure the Kubernetes cloud

- Configure the Kubernetes cloud in Jenkins to use the service account and token.

### 10. Create a pipeline job

- Create a pipeline job in Jenkins to test the integration with the Kubernetes cluster.

## **Instructions**

### Step 1: Create an instance on AWS

1. Go to the AWS Management Console and create a new instance.
2. Choose a suitable instance type (e.g., T3 medium) and a key pair.
3. Launch the instance and wait for it to become available.

### Step 2: Install Docker

1. Connect to the instance using SSH.
2. Install Docker using the APT repository: `sudo apt-get update && sudo apt-get install docker.io`
3. Start the Docker service: `sudo systemctl start docker`

### Step 3: Create a Kubernetes cluster

1. Install Minikube: `curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube`
2. Start Minikube: `minikube start --driver=docker`
3. Verify the cluster is running: `kubectl get nodes`

### Step 4: Install kubectl

1. Install kubectl: `sudo apt-get update && sudo apt-get install kubectl`
2. Verify kubectl is working: `kubectl version`

### Step 5: Create a Jenkins container

1. Pull the Jenkins LTS image: `docker pull jenkins/jenkins:lts`
2. Create a Jenkins container: `docker run -d -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts`
3. Verify the container is running: `docker ps`

### Step 6: Configure Jenkins

1. Access the Jenkins UI: `http://<instance-ip>:8080`
2. Configure Jenkins to use the Kubernetes cluster as a build agent.

### Step 7: Create a service account

1. Create a service account: `kubectl create sa jenkins`
2. Verify the service account is created: `kubectl get sa`

### Step 8: Create a token

1. Create a token for the service account: `kubectl create token jenkins`
2. Verify the token is created: `kubectl get secret`

### Step 9: Configure the Kubernetes cloud

1. Configure the Kubernetes cloud in Jenkins to use the service account and token.
2. Verify the cloud is configured correctly.

### Step 10: Create a pipeline job

1. Create a pipeline job in Jenkins to test the integration with the Kubernetes cluster.
2. Verify the job is running correctly.

## **Relevant Links**

- Minikube installation instructions
- kubectl installation instructions
- Jenkins installation instructions
- Kubernetes cluster creation instructions