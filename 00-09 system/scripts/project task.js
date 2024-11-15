module.exports = async (params) => {
    const { quickAddApi } = params; // Ensure QuickAdd API is accessible

    try {
        // Use QuickAdd's API to get inputs from the user
        let Description = await quickAddApi.inputPrompt("Enter Description:");
        if (!Description) {
            new Notice('Task creation cancelled: Description is required.');
            return;
        }

        let Tags = await quickAddApi.inputPrompt("Enter Tags (comma-separated):");
        let Priority = await quickAddApi.inputPrompt("Enter Priority:");
        let Due = await quickAddApi.inputPrompt("Enter Due Date (YYYY-MM-DD):");

        // Process the 'Due' date if provided
        if (Due && Due !== '') {
            Due = '📅 ' + Due;
        } else {
            Due = ' ';
        }

        let resultado = '';

        // Create the task string if the description is valid
        if (Description) {
            let resultado1 = '>- [ ] ' + Description.trimEnd() + 
                             ' #' + Tags.trimEnd() + 
                             ' ' + Priority.trimEnd() + 
                             ' ' + Due.trimEnd(); 

            // Get the current date
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy = today.getFullYear();
            const formattedDate = yyyy + '-' + mm + '-' + dd;

            // Combine the task details
            resultado = resultado1.trimEnd() + ' ➕ ' + formattedDate + '\n';

            // Log the final result for debugging
            console.log('Generated Task:', resultado);

            // Return the result to QuickAdd
            return resultado;
        }
    } catch (error) {
        console.error('Error in QuickAdd Script:', error);
        new Notice('Error in QuickAdd script. Check console for details.');
    }
};
