---
created-date: 2024-11-12 20:55
url: https://www.startdataengineering.com/post/data-engineering-projects-with-free-template/#set-up-data-infrastructure
related: 
aliases:
  - data engineer
tags:
  - data_engineer
  - "#project"
  - project_note
summary:
---
# Building data project template 
- Define some [[requirements for data engineer project (202411121714)]]
	![[IMG-20241113171737544.png]]
## Set up data infrastructure
---
-  The setup environment for DE project, development workflow 
	1. `Airflow`: To schedule and orchestrate DAGs
	1. `postgres`: To store Airflow’s details (which you can see via Airflow UI) and also has a schema to represent upstream databases.
	2. `DuckDB` To act as our warehouse
	
	1. `Quarto with Plotly`: To convert code in markdown format to html files that can be embedded in your app or servered as is.
	2. `cuallee`: To run data quality checks on the data we extracted from CoinCap API.
	3. `minio`: To provide an S3 compatible open source storage system.
> Learn how to run all this in one container 
## Running projects on codespaces
---
- ?  The code availabe at **[data_engineering_project_template](https://github.com/josephmachado/data_engineering_project_template/tree/main?tab=readme-ov-file#data-engineering-project-template)**  git repository
	1. Create codespaces by going to the repository, cloning it(or click `Use this template` button) and then clicking on `Create codespaces on main` button.
	2. Wait for codespaces to start, then in the terminal type `make up`.
	 
	3. Wait for `make up` to complete, and then wait for 30s (for Airflow to start).
	4. After 30s go to the `ports` tab and click on the link exposing port `8080` to access Airflow UI (username and password is `airflow`).
> See more instructions to run locally 

- ~ The coincap_etl DAG in the Airflow UI
	![[IMG-20241114090914865.png]]
- The file structure
	[[IMG-20241114090915849.png]]
## CI/CD setup
- [[workflow for CI/CD]]
		git for version control
	    EGitHub for hosting our repository, **[GitHub-flow](https://docs.github.com/en/get-started/quickstart/github-flow)** for developing new features, and
	    **[Github Actions](https://github.com/features/actions)** for CI/CD
	
- mg 
	- JFJFJNF
			- FFD
				- VFDVVDV







## References 
[Build Data Engineering Projects, with Free Template · Start Data Engineering](https://www.startdataengineering.com/post/data-engineering-projects-with-free-template/#set-up-data-infrastructure) data engineer project template
[de\_project/setup-data-project.ipynb at main · josephmachado/de\_project · GitHub](https://github.com/josephmachado/de_project/blob/main/setup-data-project.ipynb)
## See also
