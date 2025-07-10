## Serving layer

The last layer in our transformation process is the serving layer. The dbt process exports the data to the storage; from there on, it is served and further integrated:

### Serving with an API server

Three options for serving the data as an API server:

- [Delta Sharing](https://delta.io/sharing/): Provides an API server layer on top of the delta tables
- [ROAPI](https://github.com/roapi/roapi): Generic API server that can be used to serve data from various formats
- [Cube.dev](https://cube.dev/): Offers caching and a semantic-layer functionality but doesn’t work with the files directly

### Dagster integration

Having Dagster as a core part of the pipeline, arbitrary connections and integrations can be easily added. For example:

- Export data to Excel and send the file by email.
- Pushing data to a BI tool like Tableau Server for advanced visualization and analytics.

### Using PaaS as a serving layer

The PaaS platforms have outstanding data analytics integration and data-consumer interaction features. They also offer great BI integrations such as:

- PowerBI connects natively to Fabric, providing [state-of-the-art integration](https://learn.microsoft.com/en-us/power-bi/enterprise/directlake-overview) and access control
- Almost every enterprise BI tool has good integration with big PaaS data platforms such as Databricks and Snowflake

By combining the best of both worlds developer productivity and data consumer experience can be great.