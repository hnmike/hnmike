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
// Đảm bảo frontmatter được khởi tạo đúng
const timestamp = tp.date.now("YYYYMMDDHHmm");
await tp.file.rename(timestamp);

// Đợi file system cập nhật
await new Promise(resolve => setTimeout(resolve, 500));

// Lấy thông tin thư mục
const folderName = tp.file.folder().toLowerCase().replace(/ /g, "_");
const projectTag = `project/${folderName}`;

// Lấy file hiện tại
const file = tp.file.find_tfile(tp.file.path(true));
if (!file) {
    console.error("Không tìm thấy tệp hiện tại!");
    return;
}

// Cập nhật frontmatter với try-catch
try {
    await app.fileManager.processFrontMatter(file, (frontmatter) => {
        // Đảm bảo các trường cơ bản tồn tại
        frontmatter.type = frontmatter.type || "project_note";
        frontmatter.tags = frontmatter.tags || [];
        frontmatter.status = frontmatter.status || "1 To Do";
        frontmatter.date_created = frontmatter.date_created || tp.date.now("YYYY-MM-DD HH:mm");
        
        // Thêm project tag
        if (Array.isArray(frontmatter.tags)) {
            if (!frontmatter.tags.includes(projectTag)) {
                frontmatter.tags.push(projectTag);
            }
        } else {
            frontmatter.tags = [projectTag];
        }
    });
    
    console.log("Đã cập nhật frontmatter thành công");
} catch (error) {
    console.error("Lỗi khi cập nhật frontmatter:", error);
}

// Đợi thêm để đảm bảo cập nhật hoàn tất
await new Promise(resolve => setTimeout(resolve, 500));
-%>