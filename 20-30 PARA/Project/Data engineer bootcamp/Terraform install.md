---
tags:
  - project/data_engineer_bootcamp
---
## Terraform install

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#terraform-install)

Steps to install Terraform on Ubuntu (WSL2)

Open your WSL2 terminal and run the following commands:

```
sudo apt update && sudo apt upgrade -y
```

Install required packages: Terraform requires curl to download the installer. If you don’t have it, install it with:

```
sudo apt install -y curl gnupg software-properties-common
```

Add the HashiCorp GPG key: Terraform is developed by HashiCorp. Add their official GPG key:

```
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
```

Add the official HashiCorp repository: Add the HashiCorp software repository to your system's sources:

```
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
```

Update the package index and install Terraform: Run the following commands:

```
sudo apt update
sudo apt install terraform
```

Verify the installation: After the installation is complete, verify that Terraform was installed correctly by running:

```
terraform --version
```

# Creating GCP infrastructure with Terraform

[](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes/tree/main/1_Containerization-and-Infrastructure-as-Code#creating-gcp-infrastructure-with-terraform)

Let's create a terraform folder and create a new main.tf file with all the blocks we will need for our project.

The infrastructure we will need consists of a Cloud Storage Bucket (google_storage-bucket) for our Data Lake and a BigQuery Dataset (google_bigquery_dataset).

In Terraform, the difference between using main.tf alone versus using main.tf and variables.tf lies in how you organize your configuration. Both approaches work, but separating configurations into multiple files is a best practice for clarity and maintainability.

- Using only main.tf: In this approach, all the Terraform configuration is written in a single file, including resources, providers, variables, and outputs.
    
- Using main.tf and variables.tf: In this approach, the configuration is divided into multiple files to improve organization. main.tf contains the main Terraform configuration, such as resources and providers and variables.tf defines variables that can be referenced in main.tf (or other configuration files).
    

We will use only main.tf approach

In main.tf we will configure the terraform file as follows:

This Terraform script configures the GCP provider and provisions the following resources:

- A Google Cloud Storage bucket with versioning and lifecycle management to delete objects older than 30 days.
- A BigQuery dataset for analytics or data storage in GCP.

```hcl
# Terraform Block: Specifies the required providers for the project

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

# Google Provider Configuration

provider "google" {
# Credentials only needs to be set if you do not have the GOOGLE_APPLICATION_CREDENTIALS set
#  credentials = 
  project = "<Your Project ID>"
  region  = "us-central1"
}


# Google Cloud Storage Bucket

resource "google_storage_bucket" "data-lake-bucket" {
  name          = "<Your Unique Bucket Name>"
  location      = "US"

  # Optional, but recommended settings:
  storage_class = "STANDARD"
  uniform_bucket_level_access = true

  versioning {
    enabled     = true
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      age = 30  // days
    }
  }

  force_destroy = true
}

# Google BigQuery Dataset

resource "google_bigquery_dataset" "dataset" {
  dataset_id = "<The Dataset Name You Want to Use>"
  project    = "<Your Project ID>"
  location   = "US"
}
```

**Terraform Block:** Specifies the required providers for the project. The google provider (maintained by HashiCorp) is used to interact with GCP. The version ensures compatibility with version 4.51.0 of the provider.

**Google Provider Configuration:**

- project: The GCP project ID to which the resources will belong.
- region: Sets the region for the resources. Here, it is us-central1.
- credentials can be specified directly in the code, but it is recommended to set the GOOGLE_APPLICATION_CREDENTIALS environment variable instead.

**Google Cloud Storage Bucket:**

- name: The unique name for the bucket.
- location: Sets the geographical location of the bucket (US).
- storage_class: Specifies the storage class (STANDARD for frequently accessed data).
- uniform_bucket_level_access: Enforces uniform access control across the bucket.
- Versioning: Enables versioning to retain multiple versions of objects.
- Lifecycle Rule: Deletes objects that are older than 30 days.
- force_destroy: Deletes the bucket and all its objects when the resource is destroyed.

**Google BigQuery Dataset:**

- dataset_id: The name of the dataset to be created.
- project: The GCP project ID where the dataset will reside.
- location: Specifies the geographical location (US).

The provider will not make use of the credentials field because when we set up GCP access we already created a GOOGLE_APPLICATION_CREDENTIALS env-var which Terraform can read in order to get our authentication keys.

Now run the following commands:

```
terraform init
```

This will download the necessary plugins to connect to GCP and download them to ./.terraform. Now let's plan the infrastructure:

```
terraform plan
```

The infrastructure plan will be printed on screen with all the planned changes marked with a + sign next to them.

Let's apply the changes:

```
terraform apply
```

You will need to confirm this step by typing yes when prompted. This will create all the necessary components in the infrastructure an return a terraform.tfstate with the current state of the infrastructure.

Terminal should print: Apply complete! Resources: 2 added, 0 changed.

After you've successfully created the infrastructure, you may destroy it so that it doesn't consume credit unnecessarily:

```
terraform destroy
```