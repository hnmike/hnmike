## Architecture

![Simple architecture diagram depicting compute and storage segregation](https://georgheiler.com/post/dbt-duckdb-production/simple-architecture_hu1158680292631202955.webp)

Dagster is the core of this architecture, managing the execution environment.

> Dagster: A gateway to infinite possibilities

As long as your use case can be expressed in Python, Dagster’s capabilities are limitless. Dagster also seamlessly integrates with other (open-source) tools or APIs, facilitating data ingestion with [airbyte](https://georgheiler.com/post/dagster-series-6-ingestion/) and transformations with [dbt](https://docs.getdbt.com/). The [dagster-dbt integration](https://georgheiler.com/post/dagster-new-dbt-api/) provides a robust method to manage and monitor dbt-driven data transformations. Nevertheless, dbt combined with Duckdb is the second most important part of our architecture, responsible for data transformation. It is important to recognize the independence between Dagster and dbt-duckdb.

In the blog we will cover:

- Structuring data layers
- Component utilization strategies
- Setup and discuss the development environment
- Architectural challenges and solutions

Cloud architectures benefit immensely from compute-storage segregation, bolstered by object storage cost-efficiency. Our proposed stack scales from a solo developer’s machine to cloud-based Kubernetes clusters. In particular, developer productivity and implementation quality are enhanced as each of the components is built with the best software engineering practices in mind.

This is different from the currently used PaaS data platforms, which are often closed-source and proprietary. We show a way how you can combine the best of both worlds for developer productivity with software engineering best practices by using the new local modern data stack and how this can be combined with PaaS platforms for a great data consumer experience.