## Data layers

The rise of “Big RAM” and multicore utilization has started to eclipse “Big Data”, leading to the popularity of [simple, scalable data processing engines](https://georgheiler.com/post/making-bigdata-small-again/) like DuckDB, [DataFusion](https://github.com/apache/arrow-datafusion), and [Polars](https://pola.rs/). The [dbt extension for DuckDB](https://github.com/duckdb/dbt-duckdb) facilitates the implementation of complex pipelines and integration through a flexible plugin ecosystem. The accompanying diagram provides a blueprint for engineers to navigate data transformation, emphasizing crucial decisions within each layer. The diagram is a representation of a dbt project divided into three layers from left to right: source, transformations and serving layer.

![Stack layer overview](https://georgheiler.com/post/dbt-duckdb-production/ddb_external_hu15531910294354959369.webp)

**Source layer:** The starting point of data pipelines encompassing local and remote data sources. It is defined as [source definition](https://docs.getdbt.com/docs/build/sources).

**Transformation layer:** This stage sees data transformation within a DuckDB file, allowing the DuckDB engine to utilize the available resources and fully deliver optimal performance. It is defined as the [dbt models](https://docs.getdbt.com/docs/build/sql-models).

**Serving layer:** The final layer where data becomes accessible to the data consumers. The data can be exported in various formats or transferred to a database server. It is defined as the dbt models with an [external materialization](https://github.com/duckdb/dbt-duckdb#writing-to-external-files).

### Data partitioning challenge

Data naturally accumulates over time, presenting a unique set of challenges. In reality, data typically arrives in partitions (e.g., daily, monthly, or every five minutes). If partitions are processed independently, the need for complex “Big Data” tooling diminishes for most use cases.

> A good partitioning strategy ensures no data is processed twice and thus pivots the problem from RAM to compute time

Despite improvements in DuckDB’s [out-of-core processing](https://duckdb.org/2023/09/26/announcing-duckdb-090.html#core-system-improvements), memory constraints of a single machine persist. We must adopt strategies to reduce the memory footprint, such as:

**Columnar storage and data compression:** The [duckdb file format](https://www.youtube.com/watch?v=bZOvAKGkzpQ&t=2786s) is highly optimized for analytics, leveraging data pruning and late materialization techniques.

**Processing subsets of data:** To avoid redundant transformations, it’s essential to process subsets of data incrementally and idempotently.