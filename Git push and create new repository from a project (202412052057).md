---
created-date: 2024-12-05 20:57
id: 
url: 
related: 
aliases: 
tags: 
summary:
---
## Steps to Create and Push the MMT 3 Project to a New GitHub Repository

1. **Initialize the Git Repository:**
   ```sh
   git init
   ```

2. **Add All Files to the Repository:**
   ```sh
   git add .
   ```

3. **Commit the Files:**
   ```sh
   git commit -m "Initial commit"
   ```

4. **Create a New GitHub Repository:**
   ```sh
   gh repo create MMT3 --source=. --public --push
   ```

5. **Check the Remote URL:**
   ```sh
   git remote get-url origin
   ```

6. **Update the Remote URL if Necessary:**
   ```sh
   git remote set-url origin https://github.com/hnmike/MMT3.git
   ```

7. **Push the Files to the Remote Repository:**
   ```sh
   git push -u origin main
   ```

## Final Repository URL
The files have been successfully pushed to the new repository at:
https://github.com/hnmike/MMT3


# Cloning and Pushing the Project to a New GitHub Repository

  

1. **Initialize the Git Repository:**

   ```sh

   git init

   ```

  

2. **Add All Files to the Staging Area:**

   ```sh

   git add .

   ```

  

3. **Commit the Changes:**

   ```sh

   git commit -m "Initial commit"

   ```

  

4. **Remove the Existing Remote (if it exists):**

   ```sh

   git remote remove origin

   ```

  

5. **Add the New Remote Repository:**

   ```sh

   git remote add origin https://github.com/nn0026/CICD-.git

   ```

  

6. **Push the Changes to the New Repository:**

   ```sh

   git push -u origin main

   ```

  

7. **Handle Authentication:**

   - If you encounter a permission error, ensure you are authenticated with GitHub using a personal access token or SSH key.

   - For a personal access token:

     1. Generate a personal access token on GitHub:

        - Go to GitHub settings.

        - Click on "Developer settings" and then "Personal access tokens".

        - Generate a new token with the necessary permissions (e.g., repo).

     2. Use the token to push to the repository:

        ```sh

        git push https://<YOUR_TOKEN>@github.com/nn0026/CICD-.git -u origin main

        ```

   - For SSH:

     - Ensure your SSH key is added to your GitHub account.

     - Use the SSH URL for the repository:

       ```sh

       git remote set-url origin git@github.com:nn0026/CICD-.git

       git push -u origin main

       ```