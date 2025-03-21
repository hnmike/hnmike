---
Priority_Level: 1 Critical
Status: 3 Testing
Date_Created: 
Due_Date: 
Connections: 
tags:
Type: project_family
---

Tags: #project/data_engineer_bootcamp

---

  


```dataviewjs
// Lấy thông tin thư mục hiện tại (dùng Templater trong file, không trực tiếp trong DataviewJS)
// Giả sử Templater đã thay thế trước khi Dataview chạy
const currentFolder = "Data engineer bootcamp"; // Phải được thay thế bởi Templater khi tạo file

// Lấy tất cả project notes trong thư mục này
const projectNotes = dv.pages(`"20-30 PARA/Project/${currentFolder}"`)
    .where(p => p.type === "project_note");

// Tính toán tiến độ dựa trên số project notes có trạng thái "4 Completed"
const totalProjects = projectNotes.length;
const completedProjects = projectNotes.filter(p => p.Status === "4 Completed").length;
const projectProgress = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
const remainingProjects = totalProjects - completedProjects;

// Tính toán tiến độ dựa trên tasks trong tất cả project notes
const allTasks = projectNotes.file.tasks; // Lấy tất cả tasks từ các project notes
const totalTasks = allTasks.length;
const completedTasks = allTasks.where(t => t.completed).length;
const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
const remainingTasks = totalTasks - completedTasks;

// Tính tiến độ tổng hợp (trung bình của projectProgress và taskProgress)
const overallProgress = totalProjects > 0 || totalTasks > 0 ? Math.round((projectProgress + taskProgress) / 2) : 0;

// Hiển thị progress bar và thông tin gộp trong một ô
dv.paragraph(
    `**Tiến độ tổng hợp:** ${overallProgress}% ` +
    `(Projects: ${completedProjects}/${totalProjects} hoàn thành, ${remainingProjects} còn lại | ` +
    `Tasks: ${completedTasks}/${totalTasks} hoàn thành, ${remainingTasks} còn lại)` +
    `<br><progress value="${overallProgress}" max="100" style="width: 100%; height: 20px;" class="nyan-cat"></progress>`
);
```

  

---

Description Goal

  
[GitHub - ManuelGuerra1987/data-engineering-zoomcamp-notes: Detailed notes and homeworks from 2025 Data Engineering Zoomcamp by Datatalks.Club](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes)
```embed
title: "Fetching"
image: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibGRzLW1pY3Jvc29mdCIgd2lkdGg9IjgwcHgiICBoZWlnaHQ9IjgwcHgiICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMCkiPjxjaXJjbGUgY3g9IjgxLjczNDEzMzYxMTY0OTQxIiBjeT0iNzQuMzUwNDU3MTYwMzQ4ODIiIGZpbGw9IiNlMTViNjQiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDM0MC4wMDEgNDkuOTk5OSA1MCkiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiB0aW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS41cyIgYmVnaW49IjBzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijc0LjM1MDQ1NzE2MDM0ODgyIiBjeT0iODEuNzM0MTMzNjExNjQ5NDEiIGZpbGw9IiNmNDdlNjAiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDM0OC4zNTIgNTAuMDAwMSA1MC4wMDAxKSI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIHRpbWVzPSIwOzEiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjVzIiBiZWdpbj0iLTAuMDYyNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+PGNpcmNsZSBjeD0iNjUuMzA3MzM3Mjk0NjAzNiIgY3k9Ijg2Ljk1NTE4MTMwMDQ1MTQ3IiBmaWxsPSIjZjhiMjZhIiByPSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzNTQuMjM2IDUwIDUwKSI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIHRpbWVzPSIwOzEiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjVzIiBiZWdpbj0iLTAuMTI1cyI+PC9hbmltYXRlVHJhbnNmb3JtPgo8L2NpcmNsZT48Y2lyY2xlIGN4PSI1NS4yMjEwNDc2ODg4MDIwNyIgY3k9Ijg5LjY1Nzc5NDQ1NDk1MjQxIiBmaWxsPSIjYWJiZDgxIiByPSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzNTcuOTU4IDUwLjAwMDIgNTAuMDAwMikiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiB0aW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS41cyIgYmVnaW49Ii0wLjE4NzVzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxjaXJjbGUgY3g9IjQ0Ljc3ODk1MjMxMTE5NzkzIiBjeT0iODkuNjU3Nzk0NDU0OTUyNDEiIGZpbGw9IiM4NDliODciIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDM1OS43NiA1MC4wMDY0IDUwLjAwNjQpIj4KICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIgdGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNXMiIGJlZ2luPSItMC4yNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+PGNpcmNsZSBjeD0iMzQuNjkyNjYyNzA1Mzk2NDE1IiBjeT0iODYuOTU1MTgxMzAwNDUxNDciIGZpbGw9IiNlMTViNjQiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDAuMTgzNTUyIDUwIDUwKSI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIHRpbWVzPSIwOzEiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjVzIiBiZWdpbj0iLTAuMzEyNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+PGNpcmNsZSBjeD0iMjUuNjQ5NTQyODM5NjUxMTc2IiBjeT0iODEuNzM0MTMzNjExNjQ5NDEiIGZpbGw9IiNmNDdlNjAiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDEuODY0NTcgNTAgNTApIj4KICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIgdGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNXMiIGJlZ2luPSItMC4zNzVzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxjaXJjbGUgY3g9IjE4LjI2NTg2NjM4ODM1MDYiIGN5PSI3NC4zNTA0NTcxNjAzNDg4NCIgZmlsbD0iI2Y4YjI2YSIgcj0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoNS40NTEyNiA1MCA1MCkiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiB0aW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS41cyIgYmVnaW49Ii0wLjQzNzVzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MCA1MCA1MCIgdGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2c+PC9zdmc+"
description: "Fetching [GitHub - ManuelGuerra1987/data-engineering-zoomcamp-notes: Detailed notes and homeworks from 2025 Data Engineering Zoomcamp by Datatalks.Club](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes)"
url: "[GitHub - ManuelGuerra1987/data-engineering-zoomcamp-notes: Detailed notes and homeworks from 2025 Data Engineering Zoomcamp by Datatalks.Club](https://github.com/ManuelGuerra1987/data-engineering-zoomcamp-notes)"
```
---



  
---
````tabs  

tab: In Progress

```dataviewjs

// Lấy thông tin thư mục hiện tại

const currentFolder = "Data engineer bootcamp";

  

// Lấy project notes có status là "2 In Progress"

const projectNotes = dv.pages(`"20-30 PARA/Project/${currentFolder}"`)

    .where(p => p.type === "project_note" && p.file.name !== dv.current().file.name && p.Status === "2 In Progress");

  

// Sắp xếp notes theo priority và due date

const sortedNotes = projectNotes.sort(n => {

    const priorityOrder = {"1 Critical": 1, "2 High": 2, "3 Medium": 3, "4 Low": 4};

    const priority = priorityOrder[n.Priority_Level] || 999;

    return [priority, n.Due_Date || "9999-12-31"];

});

  

// Tạo danh sách các notes

const listItems = sortedNotes.map(note => {

    const priority = note.Priority_Level ? `(${note.Priority_Level})` : "";

    const dueDate = note.Due_Date ? `- Due: ${dv.date(note.Due_Date).toFormat("dd-MM-yyyy")}` : "";

    return `[[${note.file.name}]] ${priority} ${dueDate}`;

});

  

// Hiển thị danh sách

if (listItems.length > 0) {

    dv.list(listItems);

} else {

    dv.paragraph("*Không có project notes nào có trạng thái In Progress*");

}

  

// Hiển thị tổng số

dv.paragraph(`**Tổng số:** ${projectNotes.length}`);

```

tab: To Do

```dataviewjs

// Lấy thông tin thư mục hiện tại

const currentFolder = "Data engineer bootcamp";

  

// Lấy project notes có status là "1 To Do"

const projectNotes = dv.pages(`"20-30 PARA/Project/${currentFolder}"`)

    .where(p => p.type === "project_note" && p.file.name !== dv.current().file.name && p.Status === "1 To Do");

  

// Sắp xếp notes theo priority và due date

const sortedNotes = projectNotes.sort(n => {

    const priorityOrder = {"1 Critical": 1, "2 High": 2, "3 Medium": 3, "4 Low": 4};

    const priority = priorityOrder[n.Priority_Level] || 999;

    return [priority, n.Due_Date || "9999-12-31"];

});

  

// Tạo danh sách các notes

const listItems = sortedNotes.map(note => {

    const priority = note.Priority_Level ? `(${note.Priority_Level})` : "";

    const dueDate = note.Due_Date ? `- Due: ${dv.date(note.Due_Date).toFormat("dd-MM-yyyy")}` : "";

    return `[[${note.file.name}]] ${priority} ${dueDate}`;

});

  

// Hiển thị danh sách

if (listItems.length > 0) {

    dv.list(listItems);

} else {

    dv.paragraph("*Không có project notes nào có trạng thái To Do*");

}

  

// Hiển thị tổng số

dv.paragraph(`**Tổng số:** ${projectNotes.length}`);

```

  

tab: Testing

```dataviewjs

// Lấy thông tin thư mục hiện tại

const currentFolder = "Data engineer bootcamp";

  

// Lấy project notes có status là "3 Testing"

const projectNotes = dv.pages(`"20-30 PARA/Project/${currentFolder}"`)

    .where(p => p.type === "project_note" && p.file.name !== dv.current().file.name && p.Status === "3 Testing");

  

// Sắp xếp notes theo priority và due date

const sortedNotes = projectNotes.sort(n => {

    const priorityOrder = {"1 Critical": 1, "2 High": 2, "3 Medium": 3, "4 Low": 4};

    const priority = priorityOrder[n.Priority_Level] || 999;

    return [priority, n.Due_Date || "9999-12-31"];

});

  

// Tạo danh sách các notes

const listItems = sortedNotes.map(note => {

    const priority = note.Priority_Level ? `(${note.Priority_Level})` : "";

    const dueDate = note.Due_Date ? `- Due: ${dv.date(note.Due_Date).toFormat("dd-MM-yyyy")}` : "";

    return `[[${note.file.name}]] ${priority} ${dueDate}`;

});

  

// Hiển thị danh sách

if (listItems.length > 0) {

    dv.list(listItems);

} else {

    dv.paragraph("*Không có project notes nào có trạng thái Testing*");

}

  

// Hiển thị tổng số

dv.paragraph(`**Tổng số:** ${projectNotes.length}`);

```

  

tab: Completed

```dataviewjs

// Lấy thông tin thư mục hiện tại

const currentFolder = "Data engineer bootcamp";

  

// Lấy project notes có status là "4 Completed"

const projectNotes = dv.pages(`"20-30 PARA/Project/${currentFolder}"`)

    .where(p => p.type === "project_note" && p.file.name !== dv.current().file.name && p.Status === "4 Completed");

  

// Sắp xếp notes theo priority và due date

const sortedNotes = projectNotes.sort(n => {

    const priorityOrder = {"1 Critical": 1, "2 High": 2, "3 Medium": 3, "4 Low": 4};

    const priority = priorityOrder[n.Priority_Level] || 999;

    return [priority, n.Due_Date || "9999-12-31"];

});

  

// Tạo danh sách các notes

const listItems = sortedNotes.map(note => {

    const priority = note.Priority_Level ? `(${note.Priority_Level})` : "";

    const dueDate = note.Due_Date ? `- Due: ${dv.date(note.Due_Date).toFormat("dd-MM-yyyy")}` : "";

    return `[[${note.file.name}]] ${priority} ${dueDate}`;

});

  

// Hiển thị danh sách

if (listItems.length > 0) {

    dv.list(listItems);

} else {

    dv.paragraph("*Không có project notes nào có trạng thái Completed*");

}

  

// Hiển thị tổng số

dv.paragraph(`**Tổng số:** ${projectNotes.length}`);

```

  

tab: Blocked

```dataviewjs

// Lấy thông tin thư mục hiện tại

const currentFolder = "Data engineer bootcamp";

  

// Lấy project notes có status là "5 Blocked"

const projectNotes = dv.pages(`"20-30 PARA/Project/${currentFolder}"`)

    .where(p => p.type === "project_note" && p.file.name !== dv.current().file.name && p.Status === "5 Blocked");

  

// Sắp xếp notes theo priority và due date

const sortedNotes = projectNotes.sort(n => {

    const priorityOrder = {"1 Critical": 1, "2 High": 2, "3 Medium": 3, "4 Low": 4};

    const priority = priorityOrder[n.Priority_Level] || 999;

    return [priority, n.Due_Date || "9999-12-31"];

});

  

// Tạo danh sách các notes

const listItems = sortedNotes.map(note => {

    const priority = note.Priority_Level ? `(${note.Priority_Level})` : "";

    const dueDate = note.Due_Date ? `- Due: ${dv.date(note.Due_Date).toFormat("dd-MM-yyyy")}` : "";

    return `[[${note.file.name}]] ${priority} ${dueDate}`;

});

  

// Hiển thị danh sách

if (listItems.length > 0) {

    dv.list(listItems);

} else {

    dv.paragraph("*Không có project notes nào có trạng thái Blocked*");

}

  

// Hiển thị tổng số

dv.paragraph(`**Tổng số:** ${projectNotes.length}`);

```

  

tab: No Status

```dataviewjs

// Lấy thông tin thư mục hiện tại

const currentFolder = "Data engineer bootcamp";

  

// Lấy project notes không có status

const projectNotes = dv.pages(`"20-30 PARA/Project/${currentFolder}"`)

    .where(p => p.type === "project_note" && p.file.name !== dv.current().file.name && (!p.Status || p.Status === ""));

  

// Sắp xếp notes theo priority và due date

const sortedNotes = projectNotes.sort(n => {

    const priorityOrder = {"1 Critical": 1, "2 High": 2, "3 Medium": 3, "4 Low": 4};

    const priority = priorityOrder[n.Priority_Level] || 999;

    return [priority, n.Due_Date || "9999-12-31"];

});

  

// Tạo danh sách các notes

const listItems = sortedNotes.map(note => {

    const priority = note.Priority_Level ? `(${note.Priority_Level})` : "";

    const dueDate = note.Due_Date ? `- Due: ${dv.date(note.Due_Date).toFormat("dd-MM-yyyy")}` : "";

    return `[[${note.file.name}]] ${priority} ${dueDate}`;

});

  

// Hiển thị danh sách

if (listItems.length > 0) {

    dv.list(listItems);

} else {

    dv.paragraph("*Không có project notes nào không có trạng thái*");

}

  

// Hiển thị tổng số

dv.paragraph(`**Tổng số:** ${projectNotes.length}`);

```

````

---

# Components

  

**Select Connection:** `INPUT[inlineListSuggester(optionQuery(#area),optionQuery(#resource), optionQuery(#project)):connections]` 

  

**Date Created:** `INPUT[dateTime(defaultValue(null)):Date_Created]`

  

**Due Date:** `INPUT[dateTime(defaultValue(null)):Due_Date]`

  

**Priority Level:** `INPUT[inlineSelect(option(1 Critical), option(2 High), option(3 Medium), option(4 Low)):Priority_Level]`

  

**Status:** `INPUT[inlineSelect(option(1 To Do), option(2 In Progress), option(3 Testing), option(4 Completed), option(5 Blocked)):Status]`

  

---

  
  
  

  

````tabs

```

tab: Tasks To Do  

```dataviewjs  
// Lấy thông tin thư mục hiện tại  
const currentFolder = "Data engineer bootcamp";  
const folderName = currentFolder.split("/").pop().toLowerCase().replace(/ /g, "_");  
const projectTag = `#project/${folderName}`;  
  
// Lấy tasks từ các file trong thư mục  
const folderTasks = dv.pages(`"20-30 PARA/Project/${currentFolder}"`).file.tasks;  
  
// Lấy tasks có tag của project này từ toàn bộ vault  
const taggedTasks = dv.pages().file.tasks.where(t => t.text.includes(projectTag));  
  
// Kết hợp tất cả tasks  
const allTasksArray = [...folderTasks, ...taggedTasks];  
  
// Lọc chỉ các task chưa hoàn thành  
const pendingTasks = allTasksArray.filter(t => !t.completed);  
  
// Hiển thị danh sách tasks chưa hoàn thành  
dv.taskList(pendingTasks.map(t => ({  
...t,  
text: `${t.text} (from [[${t.path.split('/').pop().replace('.md', '')}]])`  
})), false);  
```  

tab: Completed Tasks  

```dataviewjs  

// Lấy thông tin thư mục hiện tại  

const currentFolder = "Data engineer bootcamp";  

const folderName = currentFolder.split("/").pop().toLowerCase().replace(/ /g, "_");  

const projectTag = `#project/${folderName}`;  

// Lấy tasks từ các file trong thư mục  

const folderTasks = dv.pages(`"20-30 PARA/Project/${currentFolder}"`).file.tasks;  

// Lấy tasks có tag của project này từ toàn bộ vault  

const taggedTasks = dv.pages().file.tasks.where(t => t.text.includes(projectTag));  

// Kết hợp tất cả tasks  

const allTasksArray = [...folderTasks, ...taggedTasks];  

// Lọc chỉ các task đã hoàn thành  

const completedTasks = allTasksArray.filter(t => t.completed);  

// Hiển thị danh sách tasks đã hoàn thành  

dv.taskList(completedTasks.map(t => ({  

...t,  

text: `${t.text} (from [[${t.path.split('/').pop().replace('.md', '')}]])`  

})), false);  

```
tab: Other

```dataview

table type AS "Resource"

from "20-30 PARA/Resources" OR "resources"

where contains(connections, this.file.link)

where tags = "resources/Data engineer bootcamp"

sort type ASC

```
```dataview
TABLE 
    file.link as "Resource",
    type as "Type"
FROM "resources"
WHERE contains(file.tags, "#project/data_engineer_bootcamp")
SORT file.name ASC
```

````
  
  