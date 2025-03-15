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

<%* tp.hooks.on_all_templates_executed(async () => { const file = tp.file.find_tfile(tp.file.path(true)); const value1 = tp.file.folder().split(" ").map(word => word.toLowerCase()).join("_"); const value2 = tp.file.title.split(" ").map(word => word.toLowerCase()).join("_"); await app.fileManager.processFrontMatter(file, (frontmatter) => { frontmatter["tags"] = `area/${value1}/${value2}`; }); }); -%>