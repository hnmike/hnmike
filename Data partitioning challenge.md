### Data partitioning challenge

Data naturally accumulates over time, presenting a unique set of challenges. In reality, data typically arrives in partitions (e.g., daily, monthly, or every five minutes). If partitions are processed independently, the need for complex “Big Data” tooling diminishes for most use cases.

> A good partitioning strategy ensures no data is processed twice and thus pivots the problem from RAM to compute time

Despite improvements in DuckDB’s [out-of-core processing](https://duckdb.org/2023/09/26/announcing-duckdb-090.html#core-system-improvements), memory constraints of a single machine persist. We must adopt strategies to reduce the memory footprint, such as:

**Columnar storage and data compression:** The [duckdb file format](https://www.youtube.com/watch?v=bZOvAKGkzpQ&t=2786s) is highly optimized for analytics, leveraging data pruning and late materialization techniques.

**Processing subsets of data:** To avoid redundant transformations, it’s essential to process subsets of data incrementally and idempotently.