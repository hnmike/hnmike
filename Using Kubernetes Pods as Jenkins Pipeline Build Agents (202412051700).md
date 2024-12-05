---
created-date: 2024-12-05 17:00
id: 
url: https://www.youtube.com/watch?v=wQxahZUwYoM&list=LL&index=6&t=1546s
related: 
aliases: 
tags: 
summary:
---
### Key Highlights from the Transcript:

1. **Objective and Setup:**
    
    - This video updates a previous guide on using Kubernetes clusters as Jenkins build agents. The setup starts by creating an AWS EC2 instance with Ubuntu and configuring it for Kubernetes and Jenkins integration.
2. **Installing Docker:**
    
    - Docker is installed and configured to run without `sudo` by adding the user to the Docker group. Docker is also set to start on boot to ensure availability.
3. **Setting up Minikube:**
    
    - Minikube is installed as a Kubernetes cluster with Docker as the driver. Commands are provided to verify Minikube's status and Kubernetes cluster information.
4. **Jenkins Container Setup:**
    
    - A Jenkins container is deployed on the Minikube network using the Jenkins LTS Docker image. Ports for Jenkins UI (8080) and agents (50000) are exposed.
5. **Jenkins UI Configuration:**
    
    - The Jenkins UI is set up by copying the initial password from Docker logs. Plugins for Docker, Docker Pipeline, and Kubernetes are installed.
6. **Kubernetes Integration:**
    
    - A service account and a cluster role binding are created in Kubernetes for Jenkins. A token is generated to securely authenticate Jenkins with Kubernetes.
7. **Configuring Jenkins Agents:**
    
    - A Kubernetes cloud is configured in Jenkins. A pod template using the `jenkins/inbound-agent` image is set up to serve as a Jenkins build agent.
8. **Freestyle Project Demonstration:**
    
    - A freestyle Jenkins job is created and demonstrated. Initially, it uses the default executors, but after adjustments, it deploys pods dynamically on Kubernetes.
9. **Pipeline Job Demonstration:**
    
    - A pipeline job is created using a simple pipeline script. The script demonstrates how to reference the configured Kubernetes cloud and dynamically spin up agents.
10. **Key Observations:**
    
    - Jenkins agents run as containers in Kubernetes, with logs and events visible in both Jenkins UI and the Kubernetes cluster. Adjustments are made to ensure optimal configuration for agent usage.