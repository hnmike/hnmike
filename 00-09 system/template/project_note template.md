---
Priority_Level: 
Status: 1 To Do
Date_Created: <% tp.date.now("YYYY-MM-DD HH:mm") %>
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

## 🎯 Task
- 

## 📋 Key Deliverables
- 

## 📈 Progress Tracking

## 🍅 Flowmodoro Sessions
```dataviewjs
// Đọc file Flowmo Log
const logContent = await dv.io.load("Logs/Flowmo Log.md");
if (!logContent) {
    dv.paragraph("Không tìm thấy Flowmo Log");
    return;
}

const today = dv.date("today").toFormat("yyyy-MM-dd");
const lines = logContent.split("\n");
const sessions = [];

for (let i = 0; i < lines.length; i++) {
    const startMatch = lines[i].match(/\*\*(\d{4}-\d{2}-\d{2})\*\* \| \*\*Công việc:\*\* (.+?) \| \*\*Bắt đầu:\*\* (\d{2}:\d{2})/);
    if (!startMatch || startMatch[1] !== today) continue;
    
    const [_, date, task, start] = startMatch;
    
    // Tìm thời gian kết thúc trong dòng tiếp theo
    const endMatch = (lines[i + 1] || "").match(/\s*- \*\*Kết thúc:\*\* (\d{2}:\d{2})/);
    if (!endMatch) continue;
    
    const end = endMatch[1];
    const duration = moment.duration(
        moment(end, "HH:mm").diff(moment(start, "HH:mm"))
    ).asMinutes();
    
    sessions.push({
        task,
        start,
        end,
        duration,
        break: Math.round(duration / 5)
    });
}

if (sessions.length === 0) {
    dv.paragraph("*Chưa có phiên Flowmodoro nào hôm nay*");
    return;
}

dv.table(
    ["Công việc", "Bắt đầu", "Kết thúc", "Thời gian làm việc", "Nghỉ đề xuất"],
    sessions.map(s => [
        s.task,
        s.start,
        s.end,
        `${s.duration} phút`,
        `${s.break} phút`
    ])
);

const totalWork = sessions.reduce((sum, s) => sum + s.duration, 0);
const totalBreak = sessions.reduce((sum, s) => sum + s.break, 0);

dv.paragraph(`**Tổng thời gian làm việc:** ${totalWork} phút`);
dv.paragraph(`**Tổng thời gian nghỉ đề xuất:** ${totalBreak} phút`);
```

<%*
// Lấy tên thư mục và tạo project tag
const folderName = tp.file.folder().toLowerCase().replace(/ /g, "_");
const projectTag = `project/${folderName}`;
// Cập nhật frontmatter
const file = tp.file.find_tfile(tp.file.path(true));
if (file) {
    await app.fileManager.processFrontMatter(file, (frontmatter) => {
        frontmatter.tags = [projectTag];
    });
}
-%>