---

---

Priority_Level:
Status:
Date_Created: <% tp.date.now("YYYY-MM-DD") %>
Due_Date:
connections:
tags:
type: project_note

cssclasses:

  - hide-properties_editing

  - hide-properties_reading
---
---

  
  

**Select Connection:** `INPUT[inlineListSuggester(optionQuery(#area)):connections]`

**Date Created:** `INPUT[dateTime(defaultValue(<%"'" + tp.date.now("YYYY-MM-DD") + "'"-%>)):Date_Created]`

**Due Date:** `INPUT[dateTime(defaultValue(null)):Due_Date]`

**Priority Level:** `INPUT[inlineSelect(option(1 Critical), option(2 High), option(3 Medium), option(4 Low)):Priority_Level]`

**Status:** `INPUT[inlineSelect(option(1 To Do), option(2 In Progress), option(3 Testing), option(4 Completed), option(5 Blocked)):Status]`

  
  
  

## 📝 Description

<%tp.file.cursor()%>

  

## 🎯 task

-

-

  

## 📋 Key Deliverables

-

-

-

  

## 📈 Progress Tracking

<%* tp.hooks.on_all_templates_executed(async () => { const file = tp.file.find_tfile(tp.file.path(true)); const folder_name = tp.file.folder().toLowerCase().replace(/ /g, "_"); await app.fileManager.processFrontMatter(file, (frontmatter) => { frontmatter["tags"] = [`#project/${folder_name}`]; }); }); -%>