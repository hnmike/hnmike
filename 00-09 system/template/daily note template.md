---
type: daily-note
date: <% moment(tp.file.title, 'YYYY-MM-DD').format("YYYY-MM-DD") %>
aliases: []
week: <% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>
month: <% tp.date.now("YYYY-MM", 0, tp.file.title, "YYYY-MM-DD") %>
summary: 
tags:
  - type/daily-note
cssclasses:
  - hide-properties_editing
  - hide-properties_reading
---

# Daily Overview

>[!meta]- Navigation
>**⬅️ Prev::** [[<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>]]
>**➡️ Next::** [[<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>]]
>**📅 Week::** [[<% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>]]
>**📆 Month::** [[<% tp.date.now("YYYY-MM", 0, tp.file.title, "YYYY-MM-DD") %>]]

---
## 📋 Tasks & Activity

```calendar-nav
```
````tabs
tab: Due Today
```tasks
not done
due <% tp.file.title %>
sort by priority
hide due date
limit 10
```
tab: Overdue
```tasks 
not done 
due before <% tp.file.title %>
sort by priority
hide due date
limit 10
```
tab: Completed
```tasks
done <% tp.file.title %>
hide done date
hide due date
limit 10
```
````


---
## Log
---

 Daily Notes

<%tp.file.cursor()%>

---
## 🍅 Flowmodoro Sessions
```dataviewjs
try {
    const pages = dv.pages('"00-09 system/Log/Flowmo Log.md"');
    if (pages.length === 0) {
        dv.paragraph("*Không tìm thấy Flowmo Log*");
    } else {
        const today = new Date().toISOString().split('T')[0];
        let sessions = [];

        // Lấy danh sách các mục từ file
        const lists = pages[0].file.lists;
        if (!lists) {
            dv.paragraph("*Không có dữ liệu Flowmodoro*");
        } else {
            for (const item of lists) {
                // Kiểm tra dòng Start
                const matchStart = item.text.match(
                    /\*\*(\d{4}-\d{2}-\d{2})\*\* \| \*\*Task:\*\* (.+?) \| \*\*Start:\*\* (\d{2}:\d{2})/
                );
                if (!matchStart) continue;

                const [_, date, task, startTime] = matchStart;
                if (date !== today) continue;

                let endTime = null;
                let duration = "—";
                let breakTime = "—";

                // Kiểm tra End time từ children
                if (item.children && item.children.length > 0) {
                    const matchEnd = item.children[0].text.match(/\*\*End:\*\* (\d{2}:\d{2})/);
                    if (matchEnd) {
                        endTime = matchEnd[1];
                        const startDateTime = new Date(`${today} ${startTime}`);
                        const endDateTime = new Date(`${today} ${endTime}`);
                        duration = Math.round((endDateTime - startDateTime) / (1000 * 60));
                        if (duration < 0) duration += 24 * 60;
                        breakTime = Math.round(duration / 5) + " phút";
                    }
                }

                sessions.push({
                    task,
                    start: startTime,
                    duration: duration !== "—" ? duration + " phút" : "—",
                    breakTime
                });
            }

            // Hiển thị kết quả
            if (sessions.length === 0) {
                dv.paragraph("*Chưa có phiên Flowmodoro nào hôm nay*");
            } else {
                dv.table(
                    ["Công việc", "Thời gian bắt đầu", "Thời gian làm việc", "Thời gian nghỉ"],
                    sessions.map(s => [s.task, s.start, s.duration, s.breakTime])
                );

                // Tính tổng thời gian
                const totalWork = sessions.reduce((sum, s) => {
                    const duration = s.duration === "—" ? 0 : parseInt(s.duration);
                    return sum + duration;
                }, 0);
                
                dv.paragraph(`**Tổng thời gian làm việc hôm nay:** ${totalWork} phút`);
                dv.paragraph(`**Tổng thời gian nghỉ đề xuất:** ${Math.round(totalWork / 5)} phút`);
            }
        }
    }
} catch (error) {
    dv.paragraph("Lỗi khi đọc Flowmo Log: " + error.message);
    console.error("Error details:", error);
}
```
---
````
tab: Today's Notes

```dataviewjs
// Lấy ngày từ tên file daily note
const today = dv.date(dv.current().file.name);
const todayStr = today.toFormat("yyyy-MM-dd");

// Lấy tất cả các trang từ vault
const pages = dv.pages();

// Lọc các ghi chú được tạo trong ngày hôm nay
const notesToday = pages.filter(p => {
    const creationDate = p.file.ctime;
    return dv.date(creationDate).toFormat("yyyy-MM-dd") === todayStr;
}).map(p => p.file.link);

dv.list(notesToday);
```
tab: Projects
```dataviewjs
// Hiển thị projects theo priority
const priorities = {
    "1 Critical": [],
    "2 High": [],
    "3 Medium": [],
    "4 Low": []
};

// Lấy tất cả projects
const projects = dv.pages('"20-30 PARA/Project"')
    .where(p => p.type === "project_family" || p.type === "project_note")
    .where(p => p.Status !== "4 Completed");

// Phân loại theo priority
for (const project of projects) {
    const priority = project.Priority_Level || "4 Low";
    if (priorities[priority]) {
        priorities[priority].push(project.file.link);
    }
}

// Hiển thị projects theo priority
for (const priority in priorities) {
    if (priorities[priority].length > 0) {
        dv.header(3, priority);
        dv.list(priorities[priority]);
    }
}
```
````


🔗 Related Notes
```dataview
TABLE 
    file.mtime as "Modified",
    summary as "Summary"
FROM ""
WHERE file.mtime = date(this.file.name)
SORT file.mtime DESC
``` 