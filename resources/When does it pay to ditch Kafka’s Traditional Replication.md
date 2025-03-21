---
source: "https://www.linkedin.com/feed/update/urn:li:activity:7302698997264052224/"
author:
published: <span class="update-components-actor__sub-description text-body-xsmall                t-black--light                                ">              <span aria-hidden="true"><!---->2w •<span class="white-space-pre"> </span><span><li-icon aria-hidden="true" type="globe-americas" class="v-align-bottom" size="small"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">      <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H7v-.19a.51.51 0 01.28-.45l.38-.19a.74.74 0 01.68 0L9 7.5l.38-.7a1 1 0 00.12-.48v-.85a.78.78 0 01.21-.53l1.07-1.09a5 5 0 01-1.54 9z"></path>    </svg></li-icon></span><span class="white-space-pre"> </span><!----><!----></span><span class="visually-hidden"><!---->2 weeks ago<!----></span>            </span>
created: 2025-03-21
image: "<img width=\"600\" src=\"https://media.licdn.com/dms/image/v2/D4D22AQGeU_RjQpd69g/feedshare-shrink_800/B4DZVhl5H1G8Ak-/0/1741099107345?e=1745452800&amp;v=beta&amp;t=PZzREzFbx8yL2t1Flw2ZZKkgyYTY_aPWNK0N8tY9kK4\" loading=\"lazy\" height=\"337\" alt=\"Image preview\" id=\"ember280\" class=\"ivm-view-attr__img--centered ivm-view-attr__img--aspect-fill update-components-image__image evi-image lazy-image ember-view\">"
tags:
  - "linkedin"
---
 When does it pay to ditch Kafka’s Traditional Replication?  
  
I built a tool to help you visualize just that.  
  
The tool compares the cost of Kafka's replication in all 3 major clouds (AWS, GCP, Azure) with the alternative design of writing directly to the object store that vendors like Warpstream and Bufstream have adopted.  
  
By all accounts, this new design is going to be the future of Kafka. The timeline of adoption was roughly the following:  
  
• August 2023 - Warpstream announced out of stealth  
• May 2024 - Confluent Freight announced  
• May 2024 - Ursa released in StreamNative cloud  
• July 2024 - Bufstream 0.0.1 released  
• September 2024 - Confluent buys Warpstream  
• September 2024 - RedPanda cloud topics anounced  
• February 2025 - I posted a napkin design on how to achieve this in Kafka  
  
lol. just kidding on the last one 😂  
  
With these direct-to-S3 designs, you have to be efficient at batching the S3 writes, otherwise it can end up being more expensive.  
  
In AWS, the cost of 10 S3 PUTs/s is equal to the cost of 1.28 MB/s of produce throughput with a replication factor of 3. 💡  
  
The number of PUTs/s depends massively on your configuration, and it heavily influences your expected latency.  
  
The end to end latency of these direct-to-S3 system is roughly:  
• the batch interval  
• one S3 PUT latency  
• one S3 GET latency  
• the centralized metadata store latency (e.g DynamoDB, Spanner)  
  
If you increase the batch interval, you reduce your PUT calls but increase your latency. And vice-versa.  
  
My tool shows you the expected e2e latency per batch interval config.  
It then shows you the break even producer throughput, after which it becomes financially worth it to deploy the new model. 🤑  
  
Note that it doesn't take into account the vendor's costs. Today, every direct-to-S3 solution is proprietary and requires some sort of license. 🔒  
  
From what I can tell, Bufstream is by far the cheapest solution so far. But that's neither here nor there. 🤷‍♂️  
  
The takeaway is that this new model is INCREDIBLY cost-effective.  
  
If your workload can relax its latency requirements ever-so-slightly, you're eligible to reduce your cost MASSIVELY.  
  
Check the tool out now and let me know what you think:  
  
✅ [https://lnkd.in/dFzt9ev6](https://www.linkedin.com/%22https://lnkd.in/dFzt9ev6/%22)\\n \\n

","

\\n On top of the direct savings in operational costs, the benefit of statelessness is a greatly simplified platform. You no longer need to manage your data that's present on the cluster, your brokers are stateless and all your data is on S3.  
  
One noteworthy approach that hasn't been mentioned here is WarpStream's S3 Experss One Zone approach, where the broker writes to 3 single-AZ S3 instances directly: [https://www.warpstream.com/blog/s3-express-is-all-you-need](https://www.linkedin.com/%22https://www.warpstream.com/blog/s3-express-is-all-you-need/%22)  
  
They claim it helped them reduce p99 write latency from 500ms to 150ms, however there are little cost savings there - just having low latency on a stateless broker.\\n

","

\\n I think you're spot on. With 2 fast zones, you get $0.016 per GiB of replication (versus $0.02/GiB regular Kafka). That's still discounted, and your producers are free too (usually 2/3rds will be at $0.02/GiB).  
  
I think 2 zones for short-term replication is really more than enoguh for 90%+ of use cases. It's really really rare for AWS to have two down at the same time, and if they do, chances are the 3rd one will be having a bad time too lol.  
  
And if you have some sort of guarantee that e.g within 15 minutes the data will be tiered out of S3 Express and into S3 Standard (safe in 3 zones), then that's pretty nice!  
  
You'd then get the great benefit of both fast Kafka and completely stateless (an operational breeze)\\n

","

\\n [Radek Grebski](https://www.linkedin.com/%22/in/radek-grebski//%22) FYI\\n

","

\\n Nice visualization indeed. I'm just wondering how much the costs would increase with the support of Iceberg that Bufstream implemented, have you looked into that?\\n

","

\\n It probably ought to be more costly, but the real question is whether it's significantly costlier. If you're writing e.g 100 MB/s and it's just 30 S3 PUTs that form the majority of that cost, a few compactions that PUT with 50 MB files (i.e 2 S3 PUTs of extra work for that second) - you probably won't see a significant difference  
  
The other big thing for their design is that if you're actually using this Iceberg data for your data lake, then your Kafka storage essentially becomes free. i.e you aren't paying for an extra copy, so that cost needs to get subtracted\\n

","

\\n This should be called \\"the choose your replication\\" tool 🤣\\n

","

\\n [Filip Yonov](https://www.linkedin.com/%22/in/filipyonov//%22) nice idea hah\\n

","

\\n Insightful as always 💪\\n

","

\\n nice that you can include latency, which is typically tricky to model and predict :-) Paul\\n

"\]
> ![](https://media.licdn.com/dms/image/v2/D4D22AQGeU_RjQpd69g/feedshare-shrink_800/B4DZVhl5H1G8Ak-/0/1741099107345?e=1745452800&v=beta&t=PZzREzFbx8yL2t1Flw2ZZKkgyYTY_aPWNK0N8tY9kK4)

> [!note]- Embed
><iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7302698996215521280" height="399" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>