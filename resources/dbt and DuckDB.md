## dbt and DuckDB

### DuckDB’s concurrency model

DuckDB breaks from the [server-based concurrency model](https://www.tele-task.de/lecture/video/10304/), offering an in-process OLAP system that slashes latency. The current era of ample RAM and advancements in single-machine performance make DuckDB’s approach increasingly relevant for most data use cases. DuckDB’s approach to concurrency—supporting a single writer or [multiple readers](https://github.com/duckdb/duckdb/issues/77)—is detailed [here](https://duckdb.org/faq.html#how-does-duckdb-handle-concurrency).

### dbt + DuckDB execution model

Dbt is a transformation juggernaut in data engineering, traditionally executing SQL queries on remote servers. Integrating with DuckDB, however, shifts the paradigm, placing the transformation process directly in the dbt process rather than a distant server. This fundamental change in the runtime impacts the development and data engineering workflow significantly. We will tackle its impact and explain more in the following development section.

![Server-client vs. client architecture diagram](https://georgheiler.com/post/dbt-duckdb-production/server-clivet-vs-cliet-architecture_hu141748986439757280.webp)

The integration of dbt with DuckDB presents many benefits from both tools:

- **Analytics-friendly SQL:** DuckDB’s [SQL dialect](https://duckdb.org/2022/05/04/friendlier-sql.html) is tailored for analysts, streamlining the SQL experience to resemble data frame operations.
- **Duckdb extensions:** For example, [geospatial extensions](https://duckdb.org/2023/04/28/spatial.html) for executing spatial joins and [many more](https://duckdb.org/docs/extensions/official_extensions)
- **dbt adapter plugins:** [Out of the box plugins](https://github.com/duckdb/dbt-duckdb#configuring-dbt-duckdb-plugins) working with Excel, open table formats, databases as source, and target
- **dbt’s versatility:** dbt’s compatibility with various SQL dialects and templating allows for DRY SQL code and excellent data documentation — easy migration from other SQL dialects