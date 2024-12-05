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
