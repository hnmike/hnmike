---

area: data

area_category:

summary:

tags:

type: area_family

created-date: 2025-03-18 17:46

id: 202503181746

---

# [[data]]

# Overview



---

````tabs

tab: Files

```dataview

table created AS "Created", summary AS "Summary"

from "20-30 PARA/Area/data"

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

where type = "resources/data"

sort type ASC

```

````

---
  

````tabs

tab: Ongoing Task

```tasks

not done

tags include #area/data

path does not include "00-09 system"

sort by due date

```

````

````tabs

tab: Completed Tasks

```tasks

done

tags include #area/data

path does not include "00-09 system"

sort by due date

```

````

  


