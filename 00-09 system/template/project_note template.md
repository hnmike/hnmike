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
**Select Connection:** `INPUT[inlineListSuggester(optionQuery(#area),(optionQuery(#reference), optionQuery(#project)):connections]`  
**Date Created:** `INPUT[dateTime(defaultValue(null)):Date_Created]`
**Due Date:** `INPUT[dateTime(defaultValue(null)):Due_Date]`
**Priority Level:** `INPUT[inlineSelect(option(1 Critical), option(2 High), option(3 Medium), option(4 Low)):Priority_Level]`
**Status:** `INPUT[inlineSelect(option(1 To Do), option(2 In Progress), option(3 Testing), option(4 Completed), option(5 Blocked)):Status]`
# Description

<% tp.file.cursor() %>

<%*
// Lấy tên thư mục và tạo project tag
const folderName = tp.file.folder().toLowerCase().replace(/ /g, "_");
const projectTag = `project/${folderName}`;
// Cập nhật frontmatter
const file = tp.file.find_tfile(tp.file.path(true));
if (file) {
    await app.fileManager.processFrontMatter(file, (frontmatter) => {
        frontmatter.tags = [projectTag];
    });
}
-%>