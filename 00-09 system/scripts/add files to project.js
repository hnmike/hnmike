const fs = require('fs');

module.exports = async (params) => {
    const { app, quickAddApi } = params;

    try {
        // Prompt the user to enter the project name
        let projectName = await quickAddApi.inputPrompt("Enter Project Name:");
        if (!projectName) {
            new Notice('File creation cancelled: Project name is required.');
            return;
        }

        // Prompt the user to enter the new file name
        let fileName = await quickAddApi.inputPrompt("Enter New File Name:");
        if (!fileName) {
            new Notice('File creation cancelled: File name is required.');
            return;
        }

        // Define the new project folder path
        const projectFolder = `00-09 system/project/${projectName}`;
        const newFilePath = `${projectFolder}/${fileName}.md`;

        // Ensure the project directory exists, create if it doesn't
        const fullPath = app.vault.adapter.getBasePath() + '/' + projectFolder;
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }

        // Define the initial content for the new file
        const initialContent = `# ${fileName}\n\n> [!summary]+ Files\n>\`\`\`dataview\n` +
                               `table this.file.ctime as "Created On", this.file.mtime as "Modified On"\n` +
                               `from "${projectFolder}"\n` +
                               `where file.name != this.file.name\n` +
                               `sort file.mtime DESC\n>\`\`\``;

        // Create the new file using Obsidian's API
        await app.vault.create(newFilePath, initialContent);
        new Notice(`File created: ${newFilePath}`);

    } catch (error) {
        console.error('Error in QuickAdd Script:', error);
        new Notice('Error in creating a new file. Check console for details.');
    }
};
