---
source: "https://www.linkedin.com/feed/"
created: {[date}}
tags:
  - "linkedin"
  - "Kafka"
  - "Data Engineering"
  - "Tiered Storage"
---
Knowing Kafka internals gets you ahead of 94% of Kafka admins.  
  
But reading the code takes a lot of effort. Thankfully? I read it so you don't have to. 😇  
  
👉 I just published a deep dive on how Tiered Storage (KIP-405) writes and metadata work in Kafka.  
  
✅ [https://lnkd.in/dAfqQUaD](https://lnkd.in/dAfqQUaD)  
  
The article covers:  
  
💡 how the only production-grade, Apache-licensed plugin that supports all 3 cloud object stores works ☁️  
💡 how brokers keep themselves up to date with the latest KIP-405 state (what's in S3 vs. what's not, and where is it)  
💡 the internal tiered storage topic and why it's there  
💡 how Kafka uses plugins to upload data asynchronously to the tiered store  
  
And lots more.  
  
It's a meaty deep dive into KIP-405 internals... the only one out there on the web right now!  
  
See it here 👇  
✅ [https://lnkd.in/dAfqQUaD](https://lnkd.in/dAfqQUaD)  
  
\--  
  
I could do a part two that dives into reads, caching and pre-fetching.  
  
If you like this type of deep internals content and want to see more of it - share this post ♻️
> [! post] +
> <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7308846783068082177?collapsed=1" height="399" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
