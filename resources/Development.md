## Development

### The power of local development

Software engineering has used the local environment for decades for various good reasons:

#### Cost-effective

Capitalized computers are cheap for companies and are there to be used. The cloud introduces development costs as operative expenses due to the consumption of rented computing time, storage, or services.

Running programs locally makes development much faster, and the feedback loop is shorter. Do you remember the last time you were waiting for one of the PaaS providers to spin up some compute nodes? Often this takes 5-10 minutes.

#### Testing environment

The developer can quickly test changes locally before contributing the code to the shared repositories.

#### Isolated and self-contained environment

The environment can be containerized and, therefore standardized for each stage or developer.

However, different trends and new developments in the data ecosystem have changed how data pipelines are created over time. We will tackle the history of those trends and explain why the modern data stack allows us to set up the local environment again.

### Before dbt

IT projects handling data have existed a long time before dbt was created. Usually, a monolithic appliance database (Oracle, SQL Server) was where developers executed their code and ran the data pipelines. Local deployments and testing were easy because each database had a light version that could run locally on the developer’s machine, enjoying all the benefits of local productivity. However, other problems, such as observability, lineage and version control for data assets were paramount. These could be solved later with the introduction of dbt.

### What changed over time?

#### Separation of compute and storage

The development of the Hadoop ecosystem and later Spark and cheap remote storage popularised scaling compute and storage separately to best fit individual needs. As a result, teams can quickly spin up new compute instances query and transform the data on the remote storage.

#### Remote storage and open table formats

Advances in analytical file formats and the proliferation of cloud storage solutions, such as S3 and similar services, have revolutionized data storage. Open table formats like Delta and Iceberg have risen, logically grouping files into a single table and pushing table metadata toward remote storage. Delta’s [whitepaper](https://www.cidrdb.org/cidr2021/papers/cidr2021_paper17.pdf) and T-Mobile’s blog: [Why we migrated to a Data Lakehouse on Delta Lake](https://delta.io/blog/2022-09-14-why-migrate-lakehouse-delta-lake-tmo-dsna/) elucidate the shift toward remote storage and open table formats. The industry trend is evident with Microsoft Fabric’s adoption of Delta and the support of modern query engines for Iceberg.

#### PaaS data platform

Modern data platforms are usually fully featured distributed environments that make a living of providing one uniform data platform that automates complex infrastructure management.

> Complexity of the PaaS platform. What if it was simpler locally?

They bring a lot of good out-of-the-box features like RBAC, notebook experience, and integration of visualization tools. But at the same time add an unnecessary overhead for the data transformation.

### Current dbt development practice

Platforms like Snowflake and Databricks have shifted development from local environments to a cloud-based model. As a result, the need emerged to develop a transformation framework (dbt) that allows for remote execution, providing the best software engineering practices.

The following diagram illustrates the current dbt development process. Imagine that we have the data in the remote storage with names and salaries. This data can be either ingested as the managed table or we can create an external table definition. Either way, the table is defined as the source definition in the source.yaml file depicted with the orange color. The developer’s task is to change the calculation for the new salary. Each developer has their own unique environment. It is their own branch and implementation for the dbt project depicted in an individual color per developer. The **model1.sql** contains the current changes on the respective branch and **model1 execution** represents the code that would be sent and executed on the transformation engine. Note that the execution code contains SQL code change from the current branch and the developer-specific schema which is defined in the profiles.yaml file

![](https://georgheiler.com/post/dbt-duckdb-production/current-development-flow_hu12161400381430599696.webp)

### PaaS problems for data transformation pipelines

Normally, the server-side component of the PaaS data platform (their big data engine and custom extensions) are closed-source. Therefore, a local (possibly neatly containerized) replication and simulation of the production environment is not possible. As a result, the code has to be tested and executed in a remote environment. Due to the forced remote development, the feedback loop is reasonably slower and introduces additional development costs.

> A developer machine has more power than the smallest development cluster in a PaaS. It is already capitalized - no extra cost needs to be paid for using it.

Developers often copy the code from a source package into a remote notebook for debugging purposes or have to deploy code to the platform to test an E2E data pipeline with the orchestrator.

### Changes towards new development

#### Computer improvements

Over time, computers got better in each aspect. Nowadays, computers can efficiently process gigabytes of data and run multiple docker images at a time.

#### In memory OLAP systems

The incredible development of the in-memory OLAP system in the last few years and the introduction of the [Apache Arrow](https://arrow.apache.org/) format changed the data landscape and interoperability between different engines.

> Duckdb: TCPH S100 ~ 600 million rows in 152 seconds with 32 cores

This doesn’t mean that we can run everything at once. But with smart partitioning and processing a chunk at a time, we can reasonably quickly achieve the desired data transformation

#### Open file format library independent of big data engines

Generally, open table formats such as [delta](https://github.com/delta-io/delta) or [iceberg](https://github.com/apache/iceberg) were developed to serve the big data engines, such as spark or flink. Parts of their codebase are closely coupled with their execution engines. Because of that, developers would be forced to use spark and run JVM to interact with the open table formats.

This has changed recently: The open file format is [a protocol](https://github.com/delta-io/delta/blob/master/PROTOCOL.md) and not a specific implementation. This means that you can implement an interface in a native library - often written in Rust - that can be used to interact with the open table format without the need for a clunky big data framework. The [delta-rs](https://github.com/delta-io/delta-rs) serves as such an implementation, making Python bindings very easy to implement. It eliminates the need for the JVM or the strong coupling to a distributed execution engine. It was born with the need to read [kafka topics and write the data directly to delta tables](https://github.com/delta-io/kafka-delta-ingest) in S3. Employing that approach was making this process more cost-effective and reliable than a big data engine (Spark).

> A spark cluster is not needed anymore to copy data from kafka topic to S3 delta table

Iceberg is offering a native implementation as well: [iceberg-python](https://github.com/apache/iceberg-python).

### New “old” Dagster + dbt + DuckDB development practice

The reasons above and the convergence of dbt and DuckDB transforms data processing and recalibrates the development practices for data. It brings software engineering best practices back to the domain of data processing and makes local development possible again - and easy.

In this setup, our goal is to have:

- **Uniform data sources for developers**: Ensuring every developer can access the same data as the source of the transformation.
- **Isolated local development**: Each developer has its isolated development environment integrated with the git branching
- **Streamlined staging and deployment processes:** Implementing common branches for staging and deployment best practices.

#### Uniform data source for developers

Each developer should be able to pull the same data into the transformation process quickly. This means the dbt-duckdb has to be able to pull the data automatically from the remote storage. With dbt-duckdb, there are several great out-of-box possibilities to access remote data:

**Duckdb and remote files:** DuckDB has a native way to access remote files with the [httpfs](https://duckdb.org/docs/extensions/httpfs.html) or [filesystem](https://duckdb.org/docs/guides/python/filesystems.html) extension. You can define it easily in the [dbt-duckdb](https://github.com/duckdb/dbt-duckdb#duckdb-extensions-settings-and-filesystems) source configuration.

**dbt-duckdb plugins:** Plugins in the [dbt-duckdb](https://github.com/duckdb/dbt-duckdb#configuring-dbt-duckdb-plugins) are an extension to the dbt adapter, which allows us to extend the reading and writing capabilities of the dbt-duckdb process. There is a plugin to read Excel files or open table formats, such as iceberg or delta.

> Gobally accessible URIs for data (i.e. S3 buckets) allow to run transformation locally

For instance, the delta plugin uses the [delta-rs](https://github.com/delta-io/delta-rs) package, which enables reading directly from different [cloud object stores](https://github.com/delta-io/delta-rs#cloud-integrations). Using delta and dbt-duckdb is simple. You can find an example project with a sample configuration [here](https://github.com/milicevica23/dbt-duckdb-delta-plugin-demo).

Further new plugins can be [implemented](https://github.com/duckdb/dbt-duckdb#writing-your-own-plugins) easily. In case one is missing, feel free to open an issue and connect in the [dbt Slack](https://docs.getdbt.com/community/join).

#### Isolated local development

The problem of working isolated on a database server was complicated. A solution was introduced with dbt - as we showed before in the visualization about the current state of data development. Being able to develop independently from others and knowing that changes do not interfere with each other is very important for developer productivity. One main idea of the new local stack is to introduce changes in the local environment. Once each developer has tested locally in their own environment changes move up to shared and closer to production environment.

#### Streamlined staging and deployment processes

A cookbook recipe to define an environment, including its state, is crucial for smooth transitions from development to production. This is the basis of ensuring that a development and production environment are the same and will not introduce problems due to different environments. With the same environment, you can test and ensure the same behavior across different deployment pipeline stages.

> Containerized pipelines streamline deployment & testability

We can easily containerize the whole orchestration and transformation pipeline. which means that the developer can easily ensure the exact runtime for the various development, test, and prod environments.

### The new better development practice

Considering the above points, we suggest a potential implementation of the current state-of-the-art development guidelines for data transformation pipelines.

![](https://georgheiler.com/post/dbt-duckdb-production/new-development-flow_hu1105773917078170340.webp)

The diagram shows each developer has a local containerized instance of the entire stack. The developer can start the process using the Dagster UI or the dbt CLI. The running process pulls the data from the source definition model and transforms it to the desired state. The source definition is defined in the source.yaml file. If the model is an external materialization, the process pushes the data to remote storage, further serving the data consumers. The model is defined in the **model1.sql** and the code which runs is illustrated in the **model execution**. When the transformation code lands in the main branch, the CI/CD agent can first run the tests and push the code to the production environment.

We use the newly developed and experimental delta plugin in the diagram, but the concept is the same for all plugins.

### Cost reduction

As the business evolves and moves from strategic reporting (refresh 1x/Day) towards near real-time products (15 minutes, 5 minutes, streaming) the PaaS products can get very expensive. Moving the transformation logic into a containerized environment can reduce operational costs which are introduced due to the PaaS platform and resolve the vendor lock-in problem.