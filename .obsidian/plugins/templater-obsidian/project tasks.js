module.exports = async (params) => {
    const modalForm = app.plugins.plugins.modalforms.api;
    const result = await modalForm.openForm('New-Task');
    
    let Description = result.asString('{{Description}}');
    let Tags = result.asString('{{Tags}}');
    let Priority = result.asString('{{Priority}}');
    let Due = result.asString('{{Due}}');
    
    if (Due !== '' && Due !== null && Due !== '{{Due}}') {
        Due = '📅 ' + Due;
    } else {
        Due = ' ';
    }

    let resultado = '';

    if (Description !== '' && Description !== null && Description !== '{{Description}}') {
        let resultado1 = '>- [ ] ' + Description.trimEnd() + 
                         ' #' + Tags.trimEnd() + 
                         ' ' + Priority.trimEnd() + 
                         ' ' + Due.trimEnd(); 

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        resultado = resultado1.trimEnd() + ' ➕ ' + today + '\n';
    } 

    return resultado;
}
