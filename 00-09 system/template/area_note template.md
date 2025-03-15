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

<%* tp.hooks.on_all_templates_executed(async () => { 
    Const file = tp. File. Find_tfile (tp.File.Path (true)); 
    Const task_tag_value = tp.File.Folder (). ToLowerCase (). Split (" "). Join ("_");
    Await app.FileManager.ProcessFrontMatter (file, (frontmatter) => { 
        Frontmatter["tags"] = `area/${task_tag_value}`; 
    }); 
}); -%>