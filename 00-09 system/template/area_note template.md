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
Tp. Hooks. On_all_templates_executed (async () => { 
    Const file = tp. File. Find_tfile (tp.File.Path (true)); 
    Const value 1 = tp.File.Folder (). Split (" "). Map (word => word.ToLowerCase ()). Join ("_"); 
    Const value 2 = tp.File.Title.Split (" "). Map (word => word.ToLowerCase ()). Join ("_"); 
    Await app.FileManager.ProcessFrontMatter (file, (frontmatter) => { 
        Frontmatter["Tags"] = `area/${value 1}/${value 2}`; 
    }); 
}); 
%>