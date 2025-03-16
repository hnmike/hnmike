---
area: <% tp.file.folder() %>
Summary: 
Tags: 
Type: area_note
created: <% tp.file.creation_date() %>
---
# [[<% tp.file.folder() %>]] 
# Overview
<% tp.file.cursor() %>

<%* 
tp.hooks.on_all_templates_executed(async () => { 
    const file = tp.file.find_tfile(tp.file.path(true)); 
    const value1 = tp.file.folder().split(" ").map(word => word.toLowerCase()).join("_"); 
    const value2 = tp.file.title.split(" ").map(word => word.toLowerCase()).join("_"); 
    await app.fileManager.processFrontMatter(file, (frontmatter) => { 
        frontmatter["Tags"] = `area/${value1}`; 
    }); 
});
%>