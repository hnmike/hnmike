- ? how to push the opensource project in local and push it to my main git repository without forking it  
	 Step 1: Clone the Open-Source Project
	
	Clone the open-source project from its original repository to your local machine using the command:
	
	`git clone <original-repo-url>`
	
	This will create a local copy of the project on your machine.
	
	### Step 2: Create a New Branch
	
	Create a new branch in your local repository to work on your changes. This will help you keep your changes separate from the original project's code:
	
	`git checkout -b my-feature-branch`
	
	### Step 3: Make Changes and Commit
	
	Make the necessary changes to the code in your local repository. Then, commit your changes:
	
	`git add . git commit -m "My changes to the project"`
	
	### Step 4: Create a New Repository
	
	Create a new repository on your own Git server (e.g., GitHub, GitLab, Bitbucket) to host your modified version of the project. Let's call this repository `my-repo`.
	
	### Step 5: Add Your New Repository as a Remote
	
	Add your new repository as a remote to your local repository:
	
	`git remote add my-repo <my-repo-url>`
	
	### Step 6: Push Changes to Your New Repository
	
	Push your changes to your new repository:
	
	`git push my-repo my-feature-branch`
	
	This will create a new branch in your `my-repo` repository with the same name as your local branch.
	
	### Step 7: Keep Your Local Repository in Sync
	
	To keep your local repository in sync with the original project, you can add the original repository as a remote to your local repository:
	
	`git remote add upstream <original-repo-url>`
	
	### Step 8: Fetch Latest Changes
	
	Fetch the latest changes from the original repository:
	
	`git fetch upstream`
	
	### Step 9: Merge Latest Changes
	
	Merge the latest changes from the original repository into your local branch:
	
	`git merge upstream/master`
	
	### Step 10: Push Updated Branch
	
	Push the updated branch to your `my-repo` repository:
	
	`git push my-repo my-feature-branch`