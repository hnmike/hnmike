
> [!todo]+ Running Projects
>```dataviewjs
>const {fieldModifier: f} =
>this.app.plugins.plugins["metadata-menu"].api;
>
>function ProgressBar(note) {
>    const setPage = note; 
>    const value = Math.round(((dv.page(setPage).file.tasks.where(t => t.completed).length) / (dv.page(setPage).file.tasks).length) * 100); 
>    return "<progress value='" + value + "' max='100' class='nyan-cat'></progress>" + "<span style='font-size:smaller;color:var(--text-muted)'>" + value + "%&nbsp;| &nbsp;" + (dv.page(setPage).file.tasks.length - dv.page(setPage).file.tasks.where(t => t.completed).length) + " left</span>"
>}
>
>dv.table(['Name', 'Status', 'Priority', 'Progress', 'Started', 'Due'],
> dv.pages("#project")
> .where(p => p.Archived != true)
> .sort(p => p.file.name, 'asc')
> .filter(p => !p.file.path.includes('04 Templates'))
> .filter(p => !p.file.path.includes('fileClass'))
> .map(p => [
>  p.file.link,
>  f(dv,p,"Status"),
>  f(dv,p,"Priority"),
>  ProgressBar(p.file.name),
>  f(dv,p,"StartDate"),
>  f(dv,p,"DueDate"),
> ])
>)
>````