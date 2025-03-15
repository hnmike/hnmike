---
area: <% tp.file.folder() %>
Summary: 
Tags: 
Type: area_note
created: <% tp.file.creation_date() %>
---
# [[<%tp.file.folder() %>]] 
# Overview
<%tp.file.cursor()%>

<%* tp.hooks.on_all_templates_executed(async () => { const file = tp. File. Find_tfile (tp.File.Path (true)); const value 1 = tp.File.Folder (). Split (" "). Map (word => word.ToLowerCase ()). Join ("_"); const value 2 = tp.File.Title.Split (" "). Map (word => word.ToLowerCase ()). Join ("_"); await app.FileManager.ProcessFrontMatter (file, (frontmatter) => { frontmatter["tags"] = `area/${value 1}/${value 2}`; }); }); -%>