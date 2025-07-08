## Challenges of DuckDB + dbt

### Debugging and analyzing production DuckDB files

One critical area is establishing effective methods for debugging and analyzing DuckDB files in a production environment. Troubleshooting and understanding production data is vital for maintaining system reliability and performance.

The problem is the absence of a built-in server that facilitates access control and handles concurrency for multiple users. This problem can be compensated with specific tooling, which we will discuss in the next section, but the overall duckdb concurrency problem still holds. We want to explore and discuss better solutions to this problem in the future.

### Missing RBAC

We proposed above to use DuckDB in a stateless (transformation only) mode. There is not neccessarily a need for access control directly on the side of DuckDB. However, the adjacent layers of the stack then need implement these control measures:

**Object store:** File-based permission management from the storage layer.

**Serving layer:** The serving layer can implement fine-grained data access control means (row/column) masking and filtering.

The usage patterns can also be divided into groups:

**Creators (Developers):** The only way to control the access is on the source side with the Object store permissions.

**Data consumers:** As outlined above, this problem can be the source of great synergy with the PaaS if used correctly. For example, we can push ready data to Microsoft Fabric or use a [delta share](https://delta.io/sharing/) server to control RBAC.

### Tooling

Accessing remote DuckDB files and debugging is part of the developer workflow. The tooling is not as mature as traditional workflows but is improving daily. We have explored the following options:

- [dbt power user](https://marketplace.visualstudio.com/items?itemName=innoverio.vscode-dbt-power-user) VSCode extension
- ✅ Locks the file only during the execution of queries.
- ❌ Has difficulty refreshing environment variables.
- ❌ It is not intuitive for the nondevelopers.
- [DuckDB CLI](https://duckdb.org/docs/api/cli.html)
- ✅ Offers quick setup and supports tab completion.
- ❌ Lacks a graphical interface, operating solely as a terminal application.
- [Buenavista](https://github.com/jwills/buenavista) server, compatible with Presto and PostgreSQL dialects, enables server-side DuckDB management
- ✅ which is particularly advantageous for concurrency control. Moreover, conventional JDBC tools like DBeaver or Jetbrains DataGrip can connect to this server setup.
- ❌ It is still a very new software project