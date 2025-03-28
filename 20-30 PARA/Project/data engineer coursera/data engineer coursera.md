---
Priority_Level: 1 Critical
Status: 3 Testing
Date_Created: 
Due_Date: 
Connections: 
tags:
Type: project_family
---

Tags: #project/data_engineer_coursera

---

  


```dataviewjs
// Lấy thông tin thư mục hiện tại (dùng Templater trong file, không trực tiếp trong DataviewJS)
// Giả sử Templater đã thay thế trước khi Dataview chạy
const currentFolder = "data engineer coursera"; // Phải được thay thế bởi Templater khi tạo file

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

  

---




  
---
````tabs  

tab: In Progress

```dataviewjs

// Lấy thông tin thư mục hiện tại

const currentFolder = "data engineer coursera";

  

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

const currentFolder = "data engineer coursera";

  

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

const currentFolder = "data engineer coursera";

  

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

const currentFolder = "data engineer coursera";

  

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

const currentFolder = "data engineer coursera";

  

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

const currentFolder = "data engineer coursera";

  

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
const currentFolder = "data engineer coursera";  
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

const currentFolder = "data engineer coursera";  

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

where tags = "resources/data engineer coursera"

sort type ASC

```

````
  
  