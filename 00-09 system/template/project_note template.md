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

<% tp.file.cursor() %>

<%*

// Đợi một chút để file được tạo hoàn chỉnh

await new Promise(resolve => setTimeout(resolve, 500));

  

// Lấy thông tin file và thư mục

const currentFile = app.workspace.getActiveFile();

const folder_name = tp.file.folder().split("/").pop().toLowerCase().replace(/ /g, "_");

const projectTag = `project/${folder_name}`;

  

// Cập nhật frontmatter

if (currentFile) {

    try {

        await app.fileManager.processFrontMatter(currentFile, (frontmatter) => {

            // Đảm bảo tags là một mảng

            frontmatter.tags = [projectTag];

            // Cập nhật Date_Created nếu trống

            if (!frontmatter.Date_Created) {

                frontmatter.Date_Created = tp.date.now("YYYY-MM-DD HH:mm");

            }

        });

        console.log("Tags updated successfully:", projectTag);

    } catch (error) {

        console.error("Error updating frontmatter:", error);

    }

}

-%>