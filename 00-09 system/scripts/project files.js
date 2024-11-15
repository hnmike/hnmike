module.exports = async (params) => {
    const { quickAddApi } = params;

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

        // Define the file path using the project name
        const projectFolder = `02 Action/02 Projects/${projectName}`;
        const newFilePath = `${projectFolder}/${fileName}.md`;

        // Create the new file with an initial template content
        const initialContent = `# ${fileName}\n\n> [!summary]+ Files\n>\`\`\`dataview\n` +
                               `table this.file.ctime as "Created On", this.file.mtime as "Modified On"\n` +
                               `from "${projectFolder}"\n` +
                               `where file.name != this.file.name\n` +
                               `sort file.mtime DESC\n>\`\`\``;

        await quickAddApi.createNewMarkdownFile(newFilePath, initialContent);
        new Notice(`File created: ${newFilePath}`);

    } catch (error) {
        console.error('Error in QuickAdd Script:', error);
        new Notice('Error in creating a new file. Check console for details.');
    }
};