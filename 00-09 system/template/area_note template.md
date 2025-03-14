---
area: "<% tp.file.folder() %>"
Area_category: ""
Summary: ""
Tags: []
Type: "area_note"
id: <%* const currentDate = tp.date.now("YYYYMMDDHHmm"); await tp.file.rename(`${currentDate}`); tR = currentDate; %>
---
 [[<%tp.file.folder() %>]] 
# Overview
<%tp.file.cursor()%>
 => { frontmatter["tags"] = `area/${value1}/${value2}`; }); }); -%><%* tp.hooks.on_all_templates_executed(async () => { const file = tp. File. Find_tfile (tp.File.Path (true)); const value 1 = tp.File.Folder (). Split (" "). Map (word => word.ToLowerCase ()). Join ("_"); const value 2 = tp.File.Title.Split (" "). Map (word => word.ToLowerCase ()). Join ("_"); await app.FileManager.ProcessFrontMatter (file, (frontmatter)