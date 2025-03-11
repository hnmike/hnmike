---
StartDate: 
DueDate: 
Priority: ⏺️ Normal
Status: 🔴 Not Started
Archived: false
tags: project
---

# {{title}}

## 📋 Project Overview
<!-- Describe the project purpose, goals, and expected outcomes -->
**Purpose**: 

**Main Goals**:
- 
-
- 

**Expected Outcomes**:
- 
- 

## 📊 Project Details

|--|--|
|Start Date | `INPUT[datePicker():StartDate]`|
|Due Date   | `INPUT[datePicker():DueDate]`|
|Priority   | `INPUT[inlineSelect(option(🔽 Low),option(⏺️ Normal),option(🔼 High),option(⏫ Very High),option(🚩 Urgent),defaultValue(⏺️ Normal), showcase):Priority]`|
|Status     | `INPUT[inlineSelect(option(🟢 Done),option(🟡 In Progress),option(🟠 Standby),option(🔴 Not Started),defaultValue(🔴 Not Started), showcase):Status]`  `$= const setPage = dv.current().file.name; const value = Math.round(((dv.page(setPage).file.tasks.where(t => t.completed).length) / (dv.page(setPage).file.tasks).length) * 100); "" + "" + value + "%   " + (dv.page(setPage).file.tasks.length - dv.page(setPage).file.tasks.where(t => t.completed).length) + " left"` | <progress value ="0" max="100" class="nyan-cat" ></progress>
|Archived   | `INPUT[toggle:Archived]`|

## 🛠️ Quick Actions

```meta-bind-button
style: primary
id: addTask
hidden: false
label: ✅ New Task
actions:
  - type: command
    command: quickadd:choice:7a26a750-d8b3-441f-97b2-de6c14049fc7
```
```meta-bind-button
style: primary
id: addActivity
hidden: false
label: 🏃‍♂️ New Activity
actions:
  - type: command
    command: quickadd:choice:785625a3-b068-4b7b-9b32-876b271d7997
```
```meta-bind-button
style: primary
id: addFile
hidden: false
label: 📂 New File
actions:
  - type: command
    command: quickadd:choice:2316970e-6918-411e-9ad0-385b55b01942
```

## 📈 Progress Tracking

>[!kanban]+
> - 📝 To Do
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
> - 🔄 Doing
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
> - ✅ Done
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

## 📁 Project Files

>[!summary]+ Related Files
>```dataview
table this.file.ctime as "Created On", this.file.mtime as "Modified On"
from "10-PARA/11-Projects/11.01 Active Projects/{{title}}"
where file.name != this.file.name
sort file.mtime DESC
>```

## 🔄 Project Areas
<!-- Link to related Areas from your PARA system -->
**Related Areas**:
- [[]]
- [[]]

## 📚 Resources
<!-- Reference materials, research, and other resources for this project -->
**Key Resources**:
- 
- 
- 

## 📝 Notes & Ideas
<!-- Space for project-related thoughts, brainstorming, and ideas -->

## 🤝 Collaborators & Stakeholders
<!-- People involved in or affected by the project -->
- 

## ⏱️ Project Timeline
<!-- Key milestones and deadlines -->
- [ ] Milestone 1: 
- [ ] Milestone 2:
- [ ] Milestone 3:

## 📌 Action Items
<!-- Concrete next steps -->
- [ ] #task 
- [ ] #task 

## 🔍 Review Notes
<!-- For periodic reviews of project progress -->

