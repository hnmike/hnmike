## Dagster

### Dagster as a platform backbone

Dagster should be treated as a primary component due to its:

- Role in orchestrating processing runtimes
- Operational definition of execution order and dependencies
- Governance through data lineage visualization
- Support for backfilling and reprocessing data assets
- Making the DAG as a graph of data depencies explicit and working in your favour
- Scalability across an organization through event-based lazy data asset coupling
- Dockerizaton, local execution and testing

Dagster’s built-in features support these orchestration needs, enabling rapid development and integration of new data assets within your data platform. We would recommend taking a look into great reference projects from the Dagster team:

- [https://github.com/dagster-io/dagster-open-platform](https://github.com/dagster-io/dagster-open-platform)
- [https://github.com/dagster-io/hooli-data-eng-pipelines](https://github.com/dagster-io/hooli-data-eng-pipelines)

### Dagster as partition manager

Thinking of the data partitioning challenge, Dagster’s [partitioning feature](https://docs.dagster.io/concepts/partitions-schedules-sensors/partitions) enables efficient processing of data subsets. Dagster supplies partition parameters to dbt run command and offers a comprehensive view of partitioned jobs and facilitates easy backfilling - even for dependent data assets. This is even the case for nested partitions or dynamically created ones.

### Dagster and dbt

The integration between Dagster and dbt is seamless, offering an orchestration layer and a metadata context for dbt projects. This integration shines when using dbt’s [project variables](https://docs.getdbt.com/docs/build/project-variables) for data partitioning.

> The good Dagster-dbt integration makes partitioning very intuitive

Although the dbt project can operate standalone, Dagster’s orchestration complements dbt’s terminal-based execution. Developers can efficiently run and repeat multiple pipelines with different partitions, simulating the same behavior as in the production environment. Small and very large data volumes can easily be processed by applying this pattern of a good partitioning strategy.