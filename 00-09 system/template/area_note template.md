---

area: <% tp.file.folder() %>

Summary:

tags:

Type: area_note

created: <% tp.file.creation_date() %>

id: <% tp.date.now("YYYYMMDDHHmm") %>

---

# [[<% tp.file.folder() %>]]

# Overview

<% tp.file.cursor() %>

  

<%*

// Tạo ID từ timestamp
const timestamp = tp.date.now("YYYYMMDDHHmm");


// Lấy tên thư mục và tạo tag
const folder_name = tp.file.folder().split("/").pop().toLowerCase().replace(/ /g, "_");
const areaTag = `area/${folder_name}`;

// Cập nhật frontmatter sau khi đã đổi tên file
const currentFile = app.workspace.getActiveFile();
if (currentFile) {
    await app.fileManager.processFrontMatter(currentFile, (frontmatter) => {
        // Cập nhật các trường cần thiết
        frontmatter.id = timestamp;
        frontmatter.tags = [areaTag];
        frontmatter["created-date"] = tp.date.now("YYYY-MM-DD HH:mm");
    });
}

%>