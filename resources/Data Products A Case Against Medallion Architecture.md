---
source: https://www.linkedin.com/feed/
tags:
  - linkedin
---
🚀 Data Products: A Case Against Medallion Architecture🚀  
Understanding Medallion Architecture: Key Differences Between Two 3-Tiered Data Flow Models – A Visual Exploration!  
If this is going to be a case against the Medallion architecture, we need to lawyer up on both ends and make a case for Medallion first — its significance, reasons behind its emergence, impact, and why it worked or didn’t work. And don’t worry, we’ll keep the defence short so we have the stage for what’s coming.  
  
What is the Medallion Architecture?  
The name itself compactly holds a visual of the entire architecture. The  
Medallion Architecture was coined as a way to describe a structured approach to organising data lakes into layers of quality. The name is cleverly metaphorical, drawing from the idea of medals (like in sports) to represent increasing levels of data refinement and quality: Bronze, Silver, and Gold.  
  
Each layer is synonymised with a specific data quality expectation:  
Bronze: “raw data”  
Silver: “cleansed and conformed data” the data from the Bronze layer is matched, merged, conformed and cleansed “just-enough”  
Gold: “curated business-level tables”  
  
Medallion equated to a misdirected bait for many organisations who needed relief from the pressure of heavy data and heavy expectations from data. No doubt, it resolved the real problems to a few degrees but ended up as three layers of bottleneck in the long run.  
  
To understand how Medallion falls short of our data management expectations, we’ll use the Data Product architecture as a comparative map to dissect the case in perspective.  
  
The Medallion Architecture (Bronze-Silver-Gold) for data management, arguing it provides a false sense of ease by breaking down problems without truly solving them.  
  
Key points include:  
Pull vs. Push: Medallion uses a "pull" mechanism, forcing data consumers to do the "grunt work" of quality assessment, while Data Products advocate a "push" mechanism, embedding business context and quality early.  
  
Compounding Quality Issues: Errors propagate through Medallion's tiers, while Data Products "bake in" quality at the source.  
  
Unnecessary Data Movement: Medallion's ETL process adds cost and delays, unlike Data Products' purpose-driven approach.  
  
Lack of Business Context: Medallion's upstream tiers lack context, hindering decision-making, which Data Products address by embedding context early.  
  
Limited Consumption Options: Medallion's rigid structure limits consumption, while Data Products offer diverse options.  
  
Fragile Foundations: Medallion's hierarchical structure creates fragility, while Data Products prioritize self-sufficiency.  
  
The article advocates for model-driven Data Products, emphasizing context, semantic layers, and purpose-driven data storage over the Medallion Architecture's staged refinement.  
  
[hashtag#DataArchitecture](https://www.linkedin.com/feed/hashtag/?keywords=dataarchitecture&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904) [hashtag#MedallionArchitecture](https://www.linkedin.com/feed/hashtag/?keywords=medallionarchitecture&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904) [hashtag#DataLakehouse](https://www.linkedin.com/feed/hashtag/?keywords=datalakehouse&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904)  
[hashtag#DataEngineering](https://www.linkedin.com/feed/hashtag/?keywords=dataengineering&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904) [hashtag#DataProducts](https://www.linkedin.com/feed/hashtag/?keywords=dataproducts&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904) [hashtag#DataQuality](https://www.linkedin.com/feed/hashtag/?keywords=dataquality&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904)  
[hashtag#CloudData](https://www.linkedin.com/feed/hashtag/?keywords=clouddata&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904) [hashtag#DataGovernance](https://www.linkedin.com/feed/hashtag/?keywords=datagovernance&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904) [hashtag#BronzeSilverGold](https://www.linkedin.com/feed/hashtag/?keywords=bronzesilvergold&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904)  
[hashtag#DataOps](https://www.linkedin.com/feed/hashtag/?keywords=dataops&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904) [hashtag#DataMesh](https://www.linkedin.com/feed/hashtag/?keywords=datamesh&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904) [hashtag#ModelDrivenData](https://www.linkedin.com/feed/hashtag/?keywords=modeldrivendata&highlightedUpdateUrns=urn%3Ali%3Aactivity%3A7307006208421371904)
> [!post] 
> <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7307006207129489408?collapsed=1" height="399" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
