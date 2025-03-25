---
title: "step by step  guide Bring data from source & consume it in Python using Debezium, Schema Reg , Kafka"
author:
  - "Soumil Shah"
published: 2022-12-26
source: "https://www.youtube.com/watch?v=AwXSjIMUa1M&list=LL&index=151"
image: "https://i.ytimg.com/vi/AwXSjIMUa1M/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGE8gZSg3MA8=&rs=AOn4CLBOlpKbfipI3vd1LChDuaojAhfzjw"
created: 2025-03-20
tags:
  - "youtube"
  - "data_streaming"
  - "cdc_pipeline"
  - "debezium_kafka"
summary: "Learn how to build a data pipeline using Debezium, Schema Registry, and Kafka to capture database changes and consume them in Python. Step-by-step guide included!"
---
# step by step  guide Bring data from source & consume it in Python using Debezium, Schema Reg , Kafka

![step by step  guide Bring data from source & consume it in Python using Debezium, Schema Reg , Kafka](https://www.youtube.com/embed/AwXSjIMUa1M&list=LL&index=151)

> [!summary]- Description
> Step-by-Step Instructions Bring data from a source and consume it in Python using Debezium, Schema Registery, and Kafka.
> 
> Step by Step guide and Instruction
> 
> Code https://github.com/soumilshah1995/kafka-debezium-python/blob/main/README.md
> 
> Article 
> How Robinhood Built a Streaming Lake House to BringData Freshness from 24h to 15min
> 
> https://microsites.databricks.com/sites/default/files/2022-07/How-Robinhood-Built-a-Streaming-Lakehouse-to-Bring-Data-Freshness-from-24h-to-Less-Than-15%20Mins.pdf
> 
> I'm stuck with PySpark on Deserializxation of Avro Messages
> Link : https://stackoverflow.com/questions/74921510/kafka-pyspark-deserialization-for-avro-messages?noredirect=1\#comment132216774_74921510
> 
> \#aws \#cloud \#cloudcomputing \#azure \#devops \#technology \#python \#amazonwebservices \#linux \#amazon \#programming \#awscloud \#cybersecurity \#coding \#googlecloud \#developer \#kubernetes \#bigdata \#dataschttps://stackoverflow.com/questions/74921510/kafka-pyspark-deserialization-for-avro-messages?noredirect=1\#comment132216774_74921510ience \#microsoft \#machinelearning \#software \#java \#tech \#it \#gcp \#awstraining \#javascript \#security \#docker

> [!note]- Transcript (Youtube)
> ## Introduction
> 
> good morning everybody and welcome to the video in this video we are essentially going to uh capture the change changes in the database table we're going to capture all those records and essentially publish them into Kafka for this we're going to leverage deum connector which is going to basically bring all the changes on a particular table into a Kafka topic from there we will have a consumer which is going to consume those messages right and we'll use a schema registry to register the schema uh let me show you what we are about to build in this uh project and again it is super exciting as I said we have our database where insert update deletes are happening and we have a dbcm connector which is going to connect and essentially bring insert updates U into a Kafka topic we are going to use a schema registry to register the schema and a python consumer is going to consume the data after that the python consumer can again dump on the raw data into S3 from there we can run a bad job a glue bad job which is scheduled maybe on an interval of 1 hour 5 hours 6 hours and basically this process the raw files and essentially will dump into a transactional data link and perform an absurd operation so that is exactly what
> 
> ## Project setup
> 
> we are about to build in this project it is very very very exciting again an entire stepbystep guide is given here right Docker compos up everything is given right so so so let's let's let's do this project with you okay so I'm going to do this project with you so the first step is basically we got to spin up the entire stack all right part one if you go to the my giup repository we have to spin up the entire stack uh which I'm going to do so I'm going to say Docker compose up uh Docker compose up hyph iph bu so this should essentially spin up my entire stack this will spin up U dbcm schema registry Kafka zookeeper and a post database once this is ready I'm going to resume all
> 
> ## Connecting to PostgreSQL
> 
> right my inter stack is up and running and the next step is basically to open PG admin and basically we'll be connecting to that database so the way you can do that is pretty straightforward here you can say add server give it any name and then basically in the connection section you will say Local Host right and then the username is postest the password is post address and then click on the save I've already done that so I'm not going to do it again so here you can see it's my post address head over to the database called postgress in the public schema in the table section we are going to create our first table over here right click and click on query tool this should open up the window and here what we need to do is basically first we need to create a table called sales so I'm going to copy the Snippets from the GE up section and here you can see the table has been created I can refresh and I should see my sales table here great now we need to essentially give um um a replica identity we need to set that to full so I'm going to set that great that's done right so basically we have a sales table and now we do not have any data inside that now the next step that we need to do is we need to uh put a call command so basically we're going to register a dbcm connector observe here carefully uh the name is sales connector here we are essentially giving um the username the password and the database name and here I'm saying I want to listen on a table called sales public. sales right so I'm going to do this with you uh I'm going to open up Postman and here you can see I have the Cur copied and I'm going to make a post request okay it's a post request and now here you can see I get a 2011 which means everything was okay I can do a get request everything okay and if I go and hit this one I should get my connector so everything worked great my connector is now ready at this point what we have
> 
> ## Inserting data
> 
> done is basically spin up the entire stack which is Kafka zookeeper dbcm post and the next thing that we did is basically we created our table called sales and then we essentially created our division connector everything is given step by step here so you should be able to follow up pretty easily the next step is now pretty straightforward we are going to uh start inserting some data and then you're going to consume the data from the Kafka topic so now what we need to do is in the project directory you will have a file called python uh producer Post in the EnV make sure uh your host is Local Host your port and the username password everything is post now what I'm going to do is I'm going to insert some data right I do not have any data right now so I'm going to just quickly show you select everything from uh we do public do sales and here you can see everything is empty I will start this code this will insert messages at an interval of 6 seconds into my uh um postest database uh please observe on the right hand side uh here you can see we have inserted a record here and hopefully we can see here here we can see the record has started coming at um at this point what
> 
> ## Schema Reg
> 
> we have done is basically we have inserted just two records and now what would happen is the schema registry will essentially you know identify the schema I'll essentially show you that F now there is a python file uh here called python consumer come here and now you want to run the function called fed schema again I have already uh put the schema here but I just want to show you so when we inserted the first sample right if You observe carefully on my screen on the left hand side window we essentially have a schema so to show you uh a little bit here uh again really really quickly again this is basically the schema of my data right I have essential invoice ID item id etc etc so that's schema now what we need to do is basically uh since we have that right if you don't see that in the code uh actually I do have it here so I have the entire schema here again it's a big schema so I'm just going to collapse that okay so I have the schema over here now the next part is pretty straightforward we can basically start consuming messages so there's a python file called python producer post and python consumer uh right so I'm going to start them up quickly so I will start uh the prod user here which is again inserting messages into post dbm is going to capture that and we're going to basically bring uh that in the consumer site so now on the this file we want to run the function called name and basically we going to run that and now as soon as basically the messages are inserted as you can see we are capturing that near real time at this point you can insert into S3 publish to an event Bridge do whatever you want right uh this essentially opens up a lot of possibilities as you you can see real time we are inserting into post and we are getting the data on the console right so this is a great project right uh one small thing I'll will tell
> 
> ## Kafka
> 
> you I am actually stuck on a small part that is in spice part so I'm able to consume the messages from a Kafka topic using p part uh the only part where I'm stuck is essentially deserializing AO um deserializing the messages I did provide the AOS schema I'll leave the stack Overflow Post in case if you want to if you are C to you know see that so again at this point this is the entire project again pretty straightforward and pretty easy uh I have made it easy so that anybody can follow but again it's a pretty complex one right you have your changes happening in the database you're capturing that using dbcm you have a schema registry where the schema is registered your consumer are going to use that schema and your and then again your consumers can be python can be a Lambda function uh could be a glue uh could be essentially a spark streaming job right and here is the um again the issue that I was talking about I am not able to serialize in spark but you can take a look at it if in case if you want to again this architecture is very widely adopted and I wanted to try this because I saw this on the slides of data AI in Summit 2022 uh this is how robinot basically brought data from their um systems so here you can see on slide number nine here you can see there here there are Source database they are capturing that using the bgm publishing that into Kafka then they have a Delta streamer that's the part where I'm stuck a little bit on D serial uh since I'm using Kafka Confluence I'm not able to deserialize that properly but again um you know Delta streamer and then you can perform an upsurt into the data like etc etc so very widely adopted and here is the table uh here is the comparison why um you know Robinwood opted for devium instead of DMS uh they knew that the engineering time cost will be more in divisum because there's a learning curve while DMS it is straightforward you just have to select certain options um again uh uh deum is sort of an open source so you can tweak stuff you can tweak the source code etc etc hence I believe uh Robin opted for Dum I hope this video
> 
> ## Outro
> 
> was useful and I hope you learned some essential skills here about Kafka python deum postest right everything is given on the getup section uh step by step so if if you come to the GE up section you should be able to follow so first step spin up the container Second Step log into the postest create a table step three create a deism connector verify that uh step four run the producer code run the consumer code and then B basically happy learning uh with that being said if you have any more questions let me know your question in the comment section I'll be very very happy to assist you once again keep smiling keep programming keep learning and do try these Labs out okay and I'll see you guys in the upcoming next video


 > [!info]
> - **Spin up the entire stack (Kafka, Zookeeper, Debezium, PostgreSQL):**  Use Docker Compose (1:35)
> - **Create a sales table in PostgreSQL:** Use the provided SQL snippet. (2:36)
> - **Set replica identity to full:**  Required for Debezium to capture changes. (2:49)
> - **Register a Debezium connector:** Use a POST request with the connector configuration. (3:02)
> - **Configure Python producer:** Set host, port, username, and password in the environment variables. (4:07)
> - **Run Python producer to insert data:**  Messages will be inserted into the PostgreSQL database. (4:16)
> - **Run Python consumer to consume data:**  Messages are captured in near real-time. (5:46)
> - **Register the schema:** A python file is provided to feed the schema. (4:54)