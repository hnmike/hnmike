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
```dataviewjs
Const file = app.Vault.GetAbstractFileByPath ("00-09 system/Log/Flowmo Log. Md");
If (! File) {
    Dv.Span ("Không tìm thấy Flowmo Log.");
} else {
    Const content = await app.Vault.Read (file);
    Const lines = content.Split ("\n");

    let sessions = [];
    const today = moment().format("YYYY-MM-DD");

    for (let i = 0; i < lines.length; i++) {
        const matchStart = lines[i].match(/\*\*(\d{4}-\d{2}-\d{2})\*\* \| \*\*Công việc:\*\* (.+?) \| \*\*Bắt đầu:\*\* (\d{2}:\d{2})/);
        if (!matchStart) continue;

        let [_, date, task, startTime] = matchStart;
        if (date !== today) continue;

        let endTime = null;
        let duration = "—";
        let breakTime = "—";

        if (i + 1 < lines.length) {
            const matchEnd = lines[i + 1].match(/\s*- \*\*Kết thúc:\*\* (\d{2}:\d{2})/);
            if (matchEnd) {
                endTime = matchEnd[1];
                const startMoment = moment(startTime, "HH:mm");
                const endMoment = moment(endTime, "HH:mm");
                duration = moment.duration(endMoment.diff(startMoment)).asMinutes();
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

    dv.table(["Công việc", "Thời gian bắt đầu", "Thời gian làm việc", "Thời gian nghỉ"],
        sessions.map(s => [s.task, s.start, s.duration, s.breakTime])
    );
}
```
---
````tabs

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

});
```
tab: Projects
```dataviewjs
// Hiển thị projects theo priority
Const priorities = {
    "1 Critical": [],
    "2 High": [],
    "3 Medium": [],
    "4 Low": []
};

// Lấy tất cả projects
Const projects = dv.Pages ('"20-30 PARA/Project"')
    .where (p => p.type == "project_family" || p.type == "project_note")
    .where (p => p.Status != "4 Completed");

// Phân loại theo priority
Projects.ForEach (project => {
    Const priority = project. Priority_Level || "4 Low";
    If (priorities[priority]) {
        Priorities[priority]. Push (project);
    }
});
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