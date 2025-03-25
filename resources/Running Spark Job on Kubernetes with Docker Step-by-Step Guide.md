---
title: "Running Spark Job on Kubernetes with Docker: Step-by-Step Guide"
author:
  - "UKAR BigData Solutions"
published: 2024-03-02
source: "https://www.youtube.com/watch?v=4YdfmbrGNUQ&list=LL&index=163"
image: "https://i.ytimg.com/vi/4YdfmbrGNUQ/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLBqgFETGnQsvwFrXKEEZe6di8FjvQ"
created: 2025-03-20
tags:
  - "youtube"
  - "spark_kubernetes"
  - "docker_deployment"
  - "pyspark_tutorial"
summary: "Deploy a PySpark job on Kubernetes using Docker. Create, tag, push the image to Docker Hub, and deploy it on Kubernetes. Learn to check the job status and logs."
---
# Running Spark Job on Kubernetes with Docker: Step-by-Step Guide

![Running Spark Job on Kubernetes with Docker: Step-by-Step Guide](https://www.youtube.com/embed/4YdfmbrGNUQ&list=LL&index=163)

> [!summary]- Description
> Link to my docker image in Dockerhub:
> https://hub.docker.com/r/uttamraj9/pysparkkube01
> Link for my github:
> https://github.com/uttamraj9/SparkKubernitiesDocker.git
> 
> Step 1: Create docker image and create docker image and run locally
> cd to dpyspark folder
> cd dpyspark
> docker build -t kubepyspark .
> docker run kubepyspark
> --Tag the docker image
> docker tag pysparkkube01 uttamraj9/pysparkkube01:pysparkkube
> --push docker image to docker hub
> docker push uttamraj9/pysparkkube01:pysparkkube
> --deploye docker image in kubernities
> kubectl apply -f deployment.yaml
> Check the status of the Job:
> kubectl get jobs
> View detailed information about the Job:
> kubectl describe job my-job-new
> Check the status of the pods created by the Job:
> kubectl get pods
> View logs of the pods:
> kubectl logs pod-name
> Monitor the progress of the Job:
> kubectl logs -f pod-name   
> 
> 
> In this YouTube tutorial, we'll walk through the process of deploying a PySpark job on Kubernetes using Docker. We'll start by creating a Docker image locally and running it to ensure everything works as expected. Then, we'll tag the Docker image and push it to Docker Hub for accessibility.
> 
> Next, we'll deploy the Docker image on Kubernetes using a deployment.yaml file. We'll demonstrate how to check the status of the Job, view detailed information about it, and monitor the progress of the pods created by the Job. Additionally, we'll show you how to view logs of the pods to troubleshoot any issues that may arise during deployment.
> 
> By following along with this step-by-step guide, you'll learn how to efficiently deploy PySpark jobs on Kubernetes, leveraging Docker for containerization and Kubernetes for orchestration.
> 
> Don't forget to like, share, and subscribe for more tutorials on Docker, Kubernetes, and PySpark!
> 
> \#PySpark \#Kubernetes \#Docker \#DataEngineering \#BigData \#DataProcessing \#DataScience \#DataAnalytics \#DevOps \#Containerization \#Deployment \#Tutorial \#DataJobs \#TechTutorial \#Programming \#OpenSource \#CloudComputing \#DataPipeline \#DockerHub \#K8s \#DataOps \#Analytics \#Python \#DataVisualization \#MachineLearning \#AI \#cloudnative 
> \#DataEngineering101 \#DataProcessing \#DockerImage \#KubernetesDeployment \#PySparkTutorial \#DevOps \#ContainerOrchestration \#DataPipeline \#TechHowTo \#DataAnalysis \#DataInfrastructure \#CloudNative \#BigDataAnalytics \#DataManagement \#CodingTutorial \#DataDriven \#TechnologyTutorial \#OpenSourceCommunity \#ProgrammingTips \#DataScienceCommunity \#CloudTech \#CodeWithMe \#LearnWithMe \#TechForGood

> [!note]- Transcript (Youtube)
> ## Introduction
> 
> Hello friends so in today's video I'm going to show you how to run a Docker image into kubernetes so in my past few previous video I've already shown you how to install Docker how to install kubernetes and how to run a sample Docker using uh like Docker compose so that you can run multiple Docker images from uh using Docker compose so today's uh video will be mainly focus on how to running how to run a Docker image using kubernetes so I'm using this uh uh spark code you can see it's a p spark so I'm just simply creating a data frame and showing it here uh so I'll be just uh creating a Docker image using this p park file and then I'll push that uh Docker image into dockerhub and from docker we'll use that kubernetes uh Docker like uh how we will we will use that Docker Hub to push that Docker image into kubernetes and I'll show you how to run it and exactly I'm going to show you all the process from beginning till the end so watch the full video so let's start the video so first
> 
> ## Create Docker image
> 
> I'm going to loging into to my uh kubernetes cluster uh so I'm going to log in into the master node so this is the way I'm going to log in so I'm using AWS instances You2 instances to where I have already created all the docker environment and all kubernetes setup that you can see in my previous video anyway so I'm just connecting it there and I have a Docker image I can show you in so uh I'm going to create the docker image so I'm going inside p park so this code is already there in the GitHub that you can I'll be sharing with you so I'm going to use this you can see this this so this is the python file which is p park I'm going to use in my Docker file so I will show you my Docker file so you can see I'm using this file so this is the toer image I'll be running so if you need this Docker file that which is already I have shown in my previous video but in this video I also I'm I'll be sharing you this uh GitHub uh link so that you'll be able to get the complete setup and you can you can be able to run in your environment HL so let's just create first uh the docker image so so using Docker image LS I can CH check the existing Docker thing so I want to create a new Docker image based on my this Docker file this is the docker file so for that you need to write the command docker build iph T and then you need to give the image name so I will name it P spark Cube 01 dot is your current directory so now you can see the docker image got created LS when I type so this is the doc ER image which got created so if I have to run this Docker image so I can simply use Docker run and the image name or image ID so this will run you can see this is running and it will print me the output So currently it's running on individual Docker as a image so I can see the result you can see here this is my result I will try to push the image into I will try to post the image into Docker Hub so I will create a repository so I'll give the repository in uh P spark \[Music\] Cube volume one something like that okay so I'm creating this public V1 okay this will take it Al so you need need to follow the constraint so let's just create this now let's see Docker image LS So currently my image is not tagged you can see it you can see it just latest so for that what I need to do I need to do Docker tag and I want to give the name like something like P SP Cube and then I can pass this so this is the command I'll be pasting you in the description okay now you will be able to to see I have this so I just got confused between this and this this was the old one the recent one is this one so let's try to push it \[Music\] so this will be Docker push and this is the tag name okay so now you can see this is pushing into my Docker have image so it will be reflected here so after some time the repository will be reflected here in my Docker Hub so this will be here in few minute it's still uploading you can see so once it's done so we will be trying to push our code uh we will try to run okay now you can see it's done so we'll try to run this dockerhub image using kubernetes so what we post first Park 01 so you can see this one is got created now okay so if someone want to pull they can pull pull this image you can see this is the docker image so now we'll try to run it in kubernetes okay so now let's just try to
> 
> ## Deploy Docker image to Kubernetes
> 
> run this uh Docker image into our kuties so for that I need to go back first from here and I have a directory for for kubernetes so there you need this deployment. yml so I will change this first to hour so you need this information API version kind job name so whatever name you want to put so I will put the name my P spark job and I will change this image so let just create this image from here so this is the tag name so I'll take this completely from there and I will pass it here here container name I'll put P spark okay so my deployment dot yeah yml is ready now one more thing I need to \[Music\] do so before I run this I just need to log to the kubernetes web UI for that I need to generate the token and then I need to run this command okay but now I need to open a new cell so that this dashboard will be running on port 8080 so this is my I need to go back again Docker dcbe and let's just log to this URL so I'll just type Local Host 8080 Advance proceed and it will take I need to paste the token here \[Music\] so this video I also have already
> 
> ## Demo
> 
> created I'll share you the link so how you can log to kubernetes web UI that one video I already made So currently I have no ports running okay so there was few jobs I run earlier but which was for python uh which was long back but now I'm going to recreate this job so now I'm using chat GPT so it gives you all the code whatever you need for kubernetes so I will use this code this command to deploy my uh deploy my Docker image into kubernetes so I'll just paste it so you can see my PP job created that I can check from here so you can see this got created and this is the job you can see this it's running you can see the timing you can see the container name everything you can monitor from here so I can see everything it's showing it's running right so if you want to see the log you can click here and you can see the log also from there so currently my job is running so this is how you run your job into kubernetes so you see it success it run successfully so you can you can monitor everything from here and you can see the output here whatever job I have run so this is the best way to run your spark code in kubernetes and everything you can monitor from here so this was just a sample creation so I'm still doing something by my own I'm a big data architect not more on devop side but I'm trying to learn kubernetes and Docker by myself so I'm I thought maybe I will be able to share my learning experience with you so this is how this is what I learned so far so how you can create a Docker image and how you can run your image into kuber nties so the more explore I will Explore More and if I get the more information I'll share more video on Docker and kubernetes so thanks for but before that uh let's see like what other code does so if you see we'll try to see all this command so these are the three you can see the cube CTL job command so these are are the three jobs I have so if you want to get what all job running on kubernetes you can get it from this command and then you can describe the job so for example my job was that is one thing which was already there it was like my P Park job something let me just reconfirm it here so this was my this one my PP job so it describes like it's running this is the image Port environment mounts all this information we just need to pass that I will check more so this is this commands are to monitor it this will check how many ports are there so you see this this is the port which is connected if you want to see the log so we can check the log with the p name so this is the P which is currently active so if you want to see the log for that P so we can see this is the log we get so in the command line also you can monitor and everything so so if you want to delete this is the command to delete so for example I'll delete this my job this job was already there so it got deleted and now if I try to get the jobs then I can see I have only two jobs so thanks for watching the video and hopefully I'll create more video and I'll share my own experience with you with you guys and from now I'll try to create more videos on Big Data related stuff like map produce hi Impala spark so there there will be more video which will be very helpful so be connected try to subscribe my channel and like the video so I'll see you in the next video


 > [!info]
> - **Create a Docker image:** Use the provided Dockerfile to build an image for your PySpark application. (1:27)
> - **Tag the Docker image:** Tag the image appropriately for Docker Hub. (5:18)
> - **Push the Docker image to Docker Hub:** Make the image accessible for Kubernetes deployment. (6:15)
> - **Deploy the Docker image in Kubernetes:** Use a deployment.yaml file. (8:18)
> - **Check the status of the Job:** Use `kubectl get jobs` to monitor the deployment. (11:56)
> - **View detailed information about the Job:** Use `kubectl describe job my-job-new`. (14:42)
> - **Check the status of the pods:** Use `kubectl get pods`. (15:18)
> - **View logs of the pods:** Use `kubectl logs pod-name` to troubleshoot issues. (15:34)
> - **Delete the Job**: Use `kubectl delete job job-name` to delete the deployment (16:04)
> 