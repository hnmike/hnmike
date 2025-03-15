---
area: <% tp.file.folder() %>
Area_category: 
Summary: 
Tags: 
Type: area_note
Id: <%* const currentDate = tp.date.now("YYYYMMDDHHmm"); await tp.file.rename(`${currentDate}`); tR = currentDate; %>
---
[[<% tp.file.folder() %>]] 
# Overview
<% tp.file.cursor() %>

<%* 
let task_tag_value = tp.file.folder().toLowerCase().split(" ").join("_");
await app.fileManager.processFrontMatter(tp.file.path(true), (frontmatter) => {
    frontmatter.tags = [`area/${task_tag_value}`];
});
-%>