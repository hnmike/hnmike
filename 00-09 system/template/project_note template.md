---
Priority_Level: 
Status: 1 To Do
Date_Created: 
Due_Date: 
Connections: 
Tags: 
Type: project_note
Cssclasses: 
---
# Components
**Select Connection:** `INPUT[inlineListSuggester(optionQuery(#area)):connections]` 
**Date Created:** `INPUT[dateTime(defaultValue(null)):Date_Created]`
**Due Date:** `INPUT[dateTime(defaultValue(null)):Due_Date]`
**Priority Level:** `INPUT[inlineSelect(option(1 Critical), option(2 High), option(3 Medium), option(4 Low)):Priority_Level]`
**Status:** `INPUT[inlineSelect(option(1 To Do), option(2 In Progress), option(3 Testing), option(4 Completed), option(5 Blocked)):Status]`
# Description

<%* tp.hooks.on_all_templates_executed(async () => { const file = tp. File. Find_tfile (tp.File.Path (true)); const folder_name = tp.File.Folder (). ToLowerCase (). Replace (/ /g, "_"); await app.FileManager.ProcessFrontMatter (file, (frontmatter) => { frontmatter["tags"] = [` #project/ ${folder_name}`]; }); }); -%>