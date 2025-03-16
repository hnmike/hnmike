# Components
**Select Connection:** `INPUT[inlineListSuggester(optionQuery(#area)):connections]` 
**Date Created:** `INPUT[dateTime(defaultValue(null)):Date_Created]`
**Due Date:** `INPUT[dateTime(defaultValue(null)):Due_Date]`
**Priority Level:** `INPUT[inlineSelect(option(1 Critical), option(2 High), option(3 Medium), option(4 Low)):Priority_Level]`
**Status:** `INPUT[inlineSelect(option(1 To Do), option(2 In Progress), option(3 Testing), option(4 Completed), option(5 Blocked)):Status]`
# Description

<% tp.file.cursor() %>

<%* 
// Lấy tên thư mục và chuyển đổi thành tag
Const folder_name = tp.File.Folder (). ToLowerCase (). Replace (/ /g, "_");

// Cập nhật frontmatter
Await app.FileManager.ProcessFrontMatter (tp.File.Path (true), (frontmatter) => {
    Frontmatter. Tags = [`project/${folder_name}`];
});
-%>