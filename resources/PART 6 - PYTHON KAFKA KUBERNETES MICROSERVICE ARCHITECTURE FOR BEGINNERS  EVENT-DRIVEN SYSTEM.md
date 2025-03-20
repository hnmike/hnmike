---
title: "PART 6 - PYTHON KAFKA KUBERNETES MICROSERVICE ARCHITECTURE FOR BEGINNERS | EVENT-DRIVEN SYSTEM"
author:
  - "GoDataProf"
published: 2022-12-23
source: "https://www.youtube.com/watch?v=MgW15TDL34Y&list=LL&index=115"
image: "https://i.ytimg.com/vi/MgW15TDL34Y/maxresdefault.jpg"
created: 2025-03-20
tags:
  - "youtube"
  - "python_kafka_kubernetes"
  - "microservice_architecture"
  - "event_driven_system"
summary: "Learn how to build a Python, Kafka, and Kubernetes-based microservice architecture for beginners. This event-driven system tutorial covers deployment and more."
---
# PART 6 - PYTHON KAFKA KUBERNETES MICROSERVICE ARCHITECTURE FOR BEGINNERS | EVENT-DRIVEN SYSTEM

![PART 6 - PYTHON KAFKA KUBERNETES MICROSERVICE ARCHITECTURE FOR BEGINNERS | EVENT-DRIVEN SYSTEM](https://www.youtube.com/embed/MgW15TDL34Y&list=LL&index=115)

> [!summary]- Description
> PART 1 - PYTHON KAFKA KUBERNETES MICROSERVICE ARCHITECTURE FOR BEGINNERS | EVENT-DRIVEN SYSTEM | DEPLOYMENT SERVICE
> 
>     \#machinelearning
>     \#AI
>     \#deeplearning
>     \#neuralnetworks
>     \#data science
>     \#python
>     \#tensorflow
>     \#scikit-learn
>     \#nlp
>     \#datascience 
>     \#kafka 
>      \#apachepulsar
>      
> 
> Microservices - also known as the microservice architecture - is an architectural style that structures an application as a collection of services that are
> 
> Highly maintainable and testable
> Loosely coupled
> Independently deployable
> Organized around business capabilities
> Owned by a small team
> The microservice architecture enables the rapid, frequent and reliable delivery of large, complex applications. It also enables an organization to evolve its technology stack.
> 
> The microservice architecture is not a silver bullet. It has several drawbacks. Moreover, when using this architecture there are numerous issues that you must address.
> 
> The microservice architecture pattern language is a collection of patterns for applying the microservice architecture. It has two goals:
> 
> The pattern language enables you to decide whether microservices are a good fit for your application.
> The pattern language enables you to use the microservice architecture successfully.
> A good starting point is the Monolithic Architecture pattern, which is the traditional architectural style that is still a good choice for many applications. It does, however, have numerous limitations and issues and so a better choice for large/complex applications is the Microservice architecture pattern.
> 
> ⭐️ Course Contents ⭐️
>  🔎 (0:00:00​) Intro
> 🔎 (0:02:21​) Order Service
> 🔎 (0:09:50​) Transaction Service
> 🔎 (0:31:59​) Analytics Service
> 🔎 (0:52:38​) Notification Service
> 
> TECHNOLOGIES:
> 🔎 Helm
> 🔎 Kafka
> 🔎 Docker
> 🔎 Python
> 🔎 Minikube
> 🔎 Kubernetes
> 🔎 K9S
> 
> CODE HERE: https://github.com/donwany/python-kafka-microservice.git
> 
> REFERENCES:
> https://kafka-python.readthedocs.io/en/master/
> https://minikube.sigs.k8s.io/docs/start/
> https://helm.sh/docs/intro/quickstart/
> https://kubernetes.io/docs/tutorials/kubernetes-basics/
> https://www.docker.com/
> https://k9scli.io/topics/install/
> https://github.com/provectus/kafka-ui/tree/master/charts/kafka-ui
> https://github.com/obsidiandynamics/kafdrop
> 
> 
> ⚡ KUBERNETES ⚡
> Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available.
> 
> The name Kubernetes originates from Greek, meaning helmsman or pilot. K8s as an abbreviation results from counting the eight letters between the "K" and the "s". Google open-sourced the Kubernetes project in 2014. Kubernetes combines over 15 years of Google's experience running production workloads at scale with best-of-breed ideas and practices from the community
> 
> \#kubernetes \#ingress,\#ingress,\#kubernetes \#ingress tutorial,what is kubernetes ingress,kubernetes ingress controller,what is kubernetes ingress controller,ingress kubernetes,kubernetes ingress example,kubernetes ingress setup,kubernetes ingress
> 
>  ►Golang Website: https://golang.org/doc/install
>  ►Golang Install: https://golang.org/dl/
>  ►VS Code: https://code.visualstudio.com/
>  ►Fiber: https://github.com/gofiber/fiber
>  ►Kubernetes: https://kubernetes.io
>  ►Docker: https://docker.com
>  ►Github:https://github.com/donwany/python-kafka-microservice.git
> 
>  ►Subscribed Channel: https://www.youtube.com/channel/UC5tr3-suPn_Y6E9uDxRyKOA
>  ►Go Playlist : https://www.youtube.com/playlist?list=PLWO1vff-jJQ8G_5TbPF3_sE70oOLfbRWu
>  ►Kubernetes Playlist: https://youtube.com/playlist?list=PLWO1vff-jJQ-jMZOZs_BnvHYrtyPfzVyN
> 
> ⭐ Tags ⭐
> - Kubernetes
> - Pods
> - \#GoDataProf
> - Golang Tutorial
> - Golang For Beginners
> - Go Programming
> - Tutorial Go
> - Go Coding
> - Golang
> - Golang Setup
> - Go install
> - CKA exams,
> - CKAD exams,
> - kubernetes secrets
> - docker,yaml,pods
> - azure,aws pods,azure pods,azure deployment
> 
> 🔎 (0:52:38​) Docker Service
> 🔎 (0:52:38​) Deployment Service
> 🔎 (5:05:28​) End

> [!note]- Transcript (Youtube)
> ## Intro
> 
> yeah welcome back um so this um video we are going to prepare our kubernetes classes okay um this um tutorial we're gonna use a single note kubernetes classes which is the mini Cube okay so I'm going to document some few things here um I'm going to create a readme.md file okay so I'm gonna write um install Kafka Kafka um we are going to use their um this uh the helm to install it okay so um I'm gonna copy this command and then run it Okay so what I'm going to do first is to check if mini cube is started I'm going to say mini Cube if mini cube is installed let's do help hyphen hyphen help you see it's installed so you can see all this help info okay so start the mini Cube clusters is there something else I can help with no um so that is it so we if we say mini Cube probably say mini Cube start and then we want to use two CPUs that is fine the version that I'm using is v1.28.0 at the time of recording this video um once mini Cube starts um we are going to check also if him hem is installed
> 
> ## Order Service
> 
> and once hem is installed then we can just go ahead and run our commands and finally we also have to check if Cube CTL or cube cuddle CLI library or package is also installed so we can run kubernetes commands from the terminal so as we wait for it is preparing um starting the kubernetes so let's wait for it um so once you we install this hem repo then the next thing is to install this uh Kafka local using this repo and then we are going to set some parameters okay zookeeper persistence enable Force and then persistence.enable is also equal to force um thank you so running at the background so let's wait for it and um once we run these two hem commands it's going to print out this Cube CTL command for us to run so we're gonna do that and before we even start we need to create a namespace so I'm going to create a namespace called others hyphen microservice so which we're going to look at very soon so yeah so as you can see the cluster is ready um we can run some Cube CTL get all okay and we can also say Cube CTL get namespace NS so you can see we have some few namespaces now kubernetes clusters so I'm also going to check if hem is installed hyphen hyphen help let me check the version okay so this is the Hem version that I'm using at the time of recording this video um uh let me see the mini Cube version that I'm using uh version okay so this is the mini Cube version that I'm using um so now um I'm going to say ham report at bit tsunami if I run this it's already existing so it's going to skip it um so the next thing I'm going to do is to copy the next thing I'm going to do is to install this Kafka cluster into our kubernetes so I'm going to paste this and then um let me cancel this first um so I'm going to create a namespace first Cube CTL create namespace the name space we're going to call it orders micro service okay so I'm going to switch to this uh config set the namespace to others micro service okay so our current um Cube CTL gets NS okay so we are going to work with this namespace orders microservice so now I can install the Hem I'm gonna install this okay see so once we install this Kafka cluster in our kubernetes um it gives a lot of information okay it says what Kafka can be assessed by consumers via port 9092 on the following DNS name within your cluster okay so this is the DNS name and this is the port so you you remember in our python coding we were referencing this um DNS name okay so each broker Kafka broker broker can be assessed by producers via port 9092 on the following DNS names okay so you can use this as well with this DNS name and it also says well to create a port that you can use as a kapha Kafka client run the following commands so I'm going now to copy this foreign run that command okay you see the Pod is created okay so I'm gonna if I wanna as exec into it also I can run this command let's let's try it so I'm going to copy this and then run this you see now we have um we are inside that Kafka cluster container okay so um I don't think we need it now if we need it um we can exec into it and then probably you might want to produce some message through it okay if so this is the Kafka console producer and then this is the Kafka consumer okay so if you want to produce a message we can use this console command or if you want to consume a message we can use this once we SSH
> 
> ## Transaction Service
> 
> or exec into the Container okay but we are not going to do that at this point so I'm going to um exit the container um so that is all for now so remember we talked about the K9s um if we want to get a help you just put in K9 as hyphen hyphen help once you do this it's it's a CLI to view and manage your kubernetes clusters okay so once you do this help and you're able to see this information um then you are good to go okay so I'm going to clear the screen and say K9s and hit enter okay so now you can see that um you can see that these are Kafka local is running the local client is also running the Zookeeper is also running okay so we are all set on this one okay so what I'm going to do is um I'm going to partition the the screen okay \[Music\] um I'm going to partition the screen um you know partition the screen so that um the Kafka UI we can we can run that but I think we should do that later on so remember we are going to be running for services the other service transaction service the notification service and then the analytics service so we have like four different Services okay so I'm going to Partition the screen um let me partition this one vertically okay so partition this one also vertically so this one I'm going to use it for um let me see other service all the service okay and this one um let me copy up to this point and um I'm going to use this one for let's see transaction service foreign \[Music\] um where should I use this one for CD to this CD into um let's see analytics service okay and the last one I'm going to use it for notification service okay so we have four um I think we need the last one I think we'll need the last one for uh let me do it vertically okay so the top we have so let me clear this so our K9s will be here um okay so I think this is how I want it to be um okay so the K9 s is here so we can check the status and um the other services here and um the transaction Services here you can see it from the top other service transaction service um you can also see the notification service the analysis service okay I think this one looks good um so what we are going to do here is we are going to produce a message okay so we're gonna say Cube CTL um run order service so what is happening here is that we are running the other service giving this image okay so the version was 1.0.0 okay and we have the other service.py file in this current working directory okay so that is what we are doing at the moment so I'm going to uh hold on to that for now and then the transaction service also we are going to um run this command um I'm going to document all the commands so don't get worried for now I'm going to also change the the image version for now so that is also good so I'm gonna change it to transaction dot py file and um we are going to also work on the notification service the notification services this one um I'm also going to change the image version okay um so I'm gonna change this to v1.0.0 and that should be fine here and um the last one which is the analytics service we're gonna change that one two two foreign \[Music\] to 1.0.0 okay yeah so I think that is all for our services the four services so whenever I run so this hyphen hyphen rme that as soon as this service finish running we want to exit out of um the port okay we want to delete the port okay so once I run any of the service service look on the K9s part as well as looking at just look at all the screen okay so I'm going to run this we're going to run the transaction I'm gonna run the notification and then run the analytics see all the containers are creating okay you can see that we are having messages messages are being produced okay okay so I think we have some um image transaction service image pool issue so let's see what is happening I said this container is waiting so let's go I'm gonna fix it okay so I'm gonna fix it and then uh you see the message started sending out emails and then it stopped for some reason it stopped okay so then notification service is hanging the analytics is hanging but the transaction and other services out um so let's fix that and then um so I think in our image we made a mistake with a transaction we just said transaction so I just added S3 to make a transactions okay so that is what um we are expecting for the name of our image so I think that is that so I'm going to rerun this order service again as well as for the transaction service so the I'm creating the two Services again see the other services is producing images are producing others you see um this these are the total cost that I was talking about and it's sending uh emails to this the email sent so far is 12. and then the revenue is calculating the revenue for 12 orders and this is the total revenue so far you see um so once we run this again you see the other service is gone and then um the analytics the notification and transaction service are still pending so if I produce you see the messages that were being produced you see these are the message okay the other ID the username the first name last name email and the quantity the price the date created and the transaction service is going to compute um the total cost okay so I think if we multiply um let me see if we multiply 401 by 401 times process point five two we're gonna get 18 654.52 so that is the total cost for that um order so because we are multiple quantity by price so if we multiply this two numbers you're gonna get this total cost of this and with them with a with the Revenue Service or the analytics service it will keep adding up okay it will keep accumulating numbers or the total cost to keep adding uh cumulatively and this will be the total revenue for that particular day okay so basically that is it so if I produce a new message okay if I produce a new message see 13 14 16 see we keep producing message okay who do you want to message sorry sorry no need to apologize okay you see so you see the last um order that was produced so if we multiply 628 by 68.5 um we should get 43 000 and 18. okay and 18 that is what happened here and that will keep accumulating you see that that is what is happening here and we produce about 27 messages you see so it's it's actually sending 27 emails and then a process 27 orders so let me add another order to it so 27 plus um keep producing keep producing I think it's done so you produce about 42 so um 42 minus 27 so we're producing 15 messages in all okay just as we we stated in the other service where is it other you see we specify that we're going to produce the limit of uh 15 okay we can increase this number to any number that could be one million um transactions or others per day that we are expecting we can we can do that okay Kafka will be able to handle that okay so basically that is it for this tutorial this orders micro service architecture um if you have any issues any problems um just let me know comment in the comment section below I'm going to check out this code to GitHub repository um clone it work with it if you have any issue just contact or create an issue and I'm gonna respond um yeah so don't forget to like And subscribe and I'll be posting more videos like this the next video I'm going to work on um uh real-time machine learning um using Kafka um how to predict on transactions in real time using Kafka and other Technologies micro service technology so just watch out for the page share with your friends tell them something big is going to happen on the channel so they should come and subscribe I'll see you in the next one so once you are done you can terminate terminate it um you can control C to terminate Ctrl C to terminate okay yeah you could also build and manifest files for this uh commands but I chose to do it this way maybe in the future we can create manifest files for it you see once we terminated everything um you can see that the analytics there's an error the transaction service also there's an error so we can choose to delete get Cube um let me cancel this so that you can see the real you can choose to delete um delete port we're calling it Analytics and SVC you see we've deleted it I don't know what you mean by I see or deleted it uh it's okay sorry um I can also delay the transaction have in service okay can delete that as well that is also gone you can see it's gone it's only there with a Kafka cluster okay so that is how you delete ports once you are done you can shut down everything delete this close this and that is it um I'll see you in the next one thanks for watching goodbye foreign


 > [!info]
> - **Install Kafka using Helm:** The video demonstrates installing a Kafka cluster in Kubernetes using Helm. (0:37)
> - **Create a Kubernetes Namespace:**  A namespace called `orders-microservice` is created for the Kafka cluster. (3:59)
> - **Check Kubernetes and Helm Versions:** The presenter checks the versions of Minikube and Helm to ensure compatibility. (4:53)
> - **Run Microservices:** The video demonstrates running multiple microservices (order, transaction, analytics, notification) within the Kubernetes cluster. (16:09)
> - **Verify Message Production:** The presenter verifies that messages are being produced by the order service and consumed by the transaction service. (19:17)
> - **Address Image Pull Issues:** The video highlights and fixes an issue related to an incorrect image name for the transaction service. (20:10)
> - **Monitor with K9s:** The K9s CLI is used to monitor the status of the Kubernetes cluster and the running services. (10:13)
> - **Clean Up Resources:** The presenter demonstrates how to delete Kubernetes pods and services after use. (28:27)
> 
> **Actionable advice:**
> 
> - Use Helm to simplify Kafka installation on Kubernetes.
> - Verify image names and versions to avoid deployment issues.
> - Use K9s or similar tools to monitor the Kubernetes cluster and services.
> - Remember to delete resources after use to free up cluster resources.