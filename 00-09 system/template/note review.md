```dataviewjs
// Filter for which notes to query - "Note Review" is the
// name of the note containing this script
const filter = '-"Note Review" and -"Templates" and -"Archiv" and -#taskdone'
// Name of the metadata entry
const metaentry = "reviewed"
// How many results to show in the table
const nresults = 15

// get the metaedit API methods
const {update} = this.app.plugins.plugins["metaedit"].api;
const {createYamlProperty} = this.app.plugins.plugins["metaedit"].api;
const {getPropertiesInFile} = this.app.plugins.plugins["metaedit"].api;

// create a button
const buttonMaker = (pn, pv, fpath) => {
    const btn = this.container.createEl("button", {"text": "Rev. today!"});
    const file = this.app.vault.getAbstractFileByPath(fpath);
    btn.addEventListener("click", async (evt) => {
        evt.preventDefault();
        const props = await getPropertiesInFile(file);
        let is_in_props = false;
        for (const prop of props) {
	        if (prop["key"] === pn) {
		        is_in_props = true;
		    }
	    }
        if (is_in_props === true) {
	        await update(pn, pv, file);
        } else {
	        await createYamlProperty(pn, pv, file);
        }
    });
    return btn;
}

// create the table
dv.table(
	["Name", "Reviewed", ""],
	dv.pages(filter)
	.sort(t => t.file.ctime, "acs")
    .sort(t => t[metaentry], "asc").slice(0,nresults)
    .map(t => [
		t.file.link,
		t[metaentry], 
		buttonMaker(
			metaentry,
			new Date().toISOString().slice(0,10),
			t.file.path
		)]
	)
)
```