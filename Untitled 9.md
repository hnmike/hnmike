---

Priority_Level:

Status:

Date_Created:

Due_Date:

connections:

tags:

  - project

type: project_family

cssclasses:

  - hide-properties_editing

  - hide-properties_reading

---

# Components

**Select Connection:** `INPUT[inlineListSuggester(optionQuery(#area,#project)):connections]`

**Date Created:** `INPUT[dateTime(defaultValue(null)):Date_Created]`

**Due Date:** `INPUT[dateTime(defaultValue(null)):Due_Date]`

**Priority Level:** `INPUT[inlineSelect(option(1 Critical), option(2 High), option(3 Medium), option(4 Low)):Priority_Level]`

**Status:** `INPUT[inlineSelect(option(1 To Do), option(2 In Progress), option(3 Testing), option(4 Completed), option(5 Blocked)):Status]`

# Description

  

````tabs

tab: Components

```dataview

table created AS "Created", summary AS "Summary"

from "20-30 PARA/Project/"

where type = "project_note"

sort created DESC

```

tab: Tasks

```dataview

table type AS "Type", Status AS "Status", Priority_Level AS "Priority_Level"

from "20-30 PARA/Project/"

where contains(connections, this.file.link)

where type = "project/task/"

sort Status ASC

```

tab: Other

```dataview

table type AS "Type"

from "20-30 PARA/Resources" OR "resources"

where contains(connections, this.file.link)

where type = "resources/"

sort type ASC

```

````

  
  

````tabs

tab: All Tasks

```dataviewjs

// Lấy thông tin thư mục hiện tại

const currentFolder = "";

const folderName = currentFolder.split("/").pop().toLowerCase().replace(/ /g, "_");

const projectTag = `#project/${folderName}`;

  

// Lấy tasks từ nhiều nguồn

// 1. Tasks từ các files trong cùng thư mục

const folderTasks = dv.pages()

    .where(p => p.file.folder.includes(currentFolder))

    .file.tasks;

  

// 2. Tasks có tag của project này

const taggedTasks = dv.pages()

    .file.tasks

    .where(t => t.text.includes(projectTag));

  

// Kết hợp tất cả tasks và loại bỏ trùng lặp

const allTasksArray = [...folderTasks, ...taggedTasks];

const uniqueTasks = Array.from(new Set(allTasksArray.map(t => t.text)))

    .map(text => allTasksArray.find(t => t.text === text));

  

// Hiển thị tasks

dv.taskList(uniqueTasks, false);

```

  

tab: Pending Tasks

```tasks

not done

path includes 

OR tag includes #project/

sort by due date

```

  

tab: Completed Tasks

```tasks

done

path includes 

OR tag includes #project/

sort by completion date

```

````

  
  
  

