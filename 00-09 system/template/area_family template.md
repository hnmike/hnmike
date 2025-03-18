---

area: <% tp.file.folder() %>

area_category:

summary:

tags:

type: area_family

created-date: <% tp.date.now("YYYY-MM-DD HH:mm") %>

id: <% tp.date.now("YYYYMMDDHHmm") %>

---

# [[<% tp.file.folder() %>]]

# Overview

<%tp.file.cursor()%>

---

````tabs

tab: Files

```dataview

table created AS "Created", summary AS "Summary"

from "20-30 PARA/Area/<% tp.file.folder() %>"

where type != "area"

where type = "area_note"

where type != "area_note_sub"

sort created DESC

```

tab: Projects

```dataview

table type AS "Type", Status AS "Status", Priority_Level AS "Priority_Level"

from "20-30 PARA/Project"

where contains(connections, this.file.link)

where type = "project_family" OR type = "project_note"

sort Status ASC

```

tab: Other

```dataview

table type AS "Type"

from "20-30 PARA/Resources" OR "resources"

where contains(connections, this.file.link)

where tags = "resources/<% tp.file.folder() %>"

sort type ASC

```

````

---
  

````tabs

tab: Ongoing Task

```tasks

not done

tags include #area/<% tp.file.folder().toLowerCase().split(" ").join("_") %>

path does not include "00-09 system"

sort by due date

```

````

````tabs

tab: Completed Tasks

```tasks

done

tags include #area/<% tp.file.folder().toLowerCase().split(" ").join("_") %>

path does not include "00-09 system"

sort by due date

```

````

  

<%* 
let task_tag_value = tp.file.folder().toLowerCase().split(" ").join("_");
await app.fileManager.processFrontMatter(tp.file.path(true), (frontmatter) => {
    frontmatter.tags = [`area/${task_tag_value}`];
});
-%>

