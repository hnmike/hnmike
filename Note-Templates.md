# Templates và Metadata

## 1. PARA Note Templates

### 1.1 Project Note
|--|--|
|Start Date | `INPUT[datePicker():StartDate]`|
|Due Date   | `INPUT[datePicker():DueDate]`|
|Priority   | `INPUT[inlineSelect(option(🔽 Low),option(⏺️ Normal),option(🔼 High),option(⏫ Very High),option(🚩 Urgent),defaultValue(⏺️ Normal), showcase):Priority]`|
|Status     | `INPUT[inlineSelect(option(🟢 Done),option(🟡 In Progress),option(🟠 Standby),option(🔴 Not Started),defaultValue(🔴 Not Started), showcase):Status]`  `$= const setPage = dv.current().file.name; const value = Math.round(((dv.page(setPage).file.tasks.where(t => t.completed).length) / (dv.page(setPage).file.tasks).length) * 100); "" + "" + value + "%   " + (dv.page(setPage).file.tasks.length - dv.page(setPage).file.tasks.where(t => t.completed).length) + " left"` | <progress value ="20" max="100" class="nyan-cat" ></progress>
|Archived   | `INPUT[toggle:Archived]`|
>[!summary]+ Files
>```dataview
table this.file.ctime as "Created On", this.file.mtime as "Modified On"
from "02 Action/02 Projects/test"
where file.name != this.file.name
sort file.mtime DESC
>```>[!kanban]+
> - Todo
>  - ```tasks
>   not done
>   path includes {{query.file.path}}
>   (status.type is not IN_PROGRESS)
>   short mode
>   hide due date
>   hide start date
>   hide scheduled date
>   hide recurrence rule
>   sort by urgency, scheduled```
> - Doing
>  - ```tasks
>  not done
>  path includes {{query.file.path}}
>  (status.type is IN_PROGRESS)
>  short mode
>  hide due date
>  hide start date
>  hide scheduled date
>  hide recurrence rule
>  sort by urgency, due ```
> - Done
>  - ```tasks
>  done
>  path includes {{query.file.path}}
>  short mode
>  hide due date
>  hide start date
>  hide scheduled date
>  hide recurrence rule
>  hide priority
>  sort by done reverse```
>  

### 1.2 project management

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

## 2. Zettelkasten Templates

### 2.1 knowledge Note
---
created-date: <% tp.date.now("YYYY-MM-DD HH:mm") %>
id: <%* const currentDate = tp.date.now("YYYYMMDDHHmm")
await tp.file.rename(`(${currentDate})`) %>
url: 
related: 
aliases: 
tags: 
summary:
---


### 2.2 zettelks Note
<%*
let alpha_keyword = await tp.system.prompt("Enter the alpha keyword for this note:");
let unique_id = alpha_keyword + tp.date.now("YYYYMMDDHHmm");
let user_title = await tp.system.prompt("Enter the title for this note:");
-%>
---
id: <%* tR += unique_id %>
title: <%* tR += unique_id %> <%* tR += user_title %>
reference-section-title: References
tags:

---

# <%* tR += user_title %>

## SEE ALSO

## References

<%* tp.file.rename(unique_id); %>


