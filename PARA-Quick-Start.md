# PARA Quick Start Guide

## 📋 Templates
Click on a template to create a new note based on that template type:

| Type | Template Link | Description |
|------|--------------|-------------|
| 🚀 **Project** | [[para-project-template\|Project Template]] | For efforts with specific outcomes and deadlines |
| 🔄 **Area** | [[para-area-template\|Area Template]] | For ongoing responsibilities requiring maintenance |
| 📚 **Resource** | [[para-resource-template\|Resource Template]] | For topics of interest and reference materials |
| 🗄️ **Archive** | [[para-archive-template\|Archive Template]] | For completed projects and inactive items |

## 🧩 PARA Overview

**P**rojects, **A**reas, **R**esources, **A**rchives: A simple system to organize your digital life.

- **Projects**: Have a deadline and a defined outcome
- **Areas**: Ongoing responsibilities with standards to maintain
- **Resources**: Topics of interest you want to reference later
- **Archives**: Inactive items from the other three categories

## 🚀 Quick Links

- [[PARA-Templates]] - All templates with usage examples
- [[PARA-Setup-Guide]] - Detailed guide for setting up your PARA system

## 📊 Your PARA Dashboard

```dataviewjs
// Count of items in each PARA category
const projects = dv.pages("#project").where(p => !p.Archived).length;
const areas = dv.pages("#area").length;
const resources = dv.pages("#resource").length;
const archives = dv.pages("#archive").length;

// Create a simple dashboard
dv.table(["Category", "Count"], [
  ["🚀 Active Projects", projects],
  ["🔄 Maintained Areas", areas],
  ["📚 Resources", resources],
  ["🗄️ Archives", archives]
]);
```

## 📈 Recent Activity

```dataviewjs
// Display recently modified PARA notes
dv.table(["Note", "Type", "Last Modified"], 
  dv.pages("#project OR #area OR #resource OR #archive")
    .sort(p => p.file.mtime, "desc")
    .limit(5)
    .map(p => [
      p.file.link, 
      p.file.tags[0], 
      p.file.mtime
    ])
);
```
