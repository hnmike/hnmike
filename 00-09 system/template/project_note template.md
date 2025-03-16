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
const file = dv.page("Logs/Flowmo Log.md");
if (!file) {
    dv.paragraph("Không tìm thấy Flowmo Log");
    return;
}

const today = dv.date("today").toFormat("yyyy-MM-dd");
const sessions = file.file.lists
    .filter(t => t.text.includes(today))
    .map(t => {
        const match = t.text.match(/\*\*(\d{4}-\d{2}-\d{2})\*\* \| \*\*Công việc:\*\* (.+?) \| \*\*Bắt đầu:\*\* (\d{2}:\d{2})/);
        if (!match) return null;
        
        const [_, date, task, start] = match;
        const end = t.children?.[0]?.text.match(/\*\*Kết thúc:\*\* (\d{2}:\d{2})/)?.[1];
        
        if (!end) return null;
        
        const duration = moment.duration(
            moment(end, "HH:mm").diff(moment(start, "HH:mm"))
        ).asMinutes();
        
        return {
            task,
            start,
            end,
            duration,
            break: Math.round(duration / 5)
        };
    })
    .filter(s => s !== null);

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