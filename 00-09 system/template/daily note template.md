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

## 🐣Nagivation🐣

>[!meta]- Navigation
>**⬅️ Prev::** [[<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>]]
>**➡️ Next::** [[<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>]]
>**📅 Week::** [[<% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>]]
>**📆 Month::** [[<% tp.date.now("YYYY-MM", 0, tp.file.title, "YYYY-MM-DD") %>]]

---
##  🌼Overview 🌼

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
## 🌱 Log
---

 🌠Daily Notes 🌠

<%tp.file.cursor()%>

---
## 🍅 Tasks
```dataviewjs
const file = app.vault.getAbstractFileByPath("00-09 system/Log/Flowmo Log.md");
if (!file) return dv.span("No Flowmo Log found.");

const content = await app.vault.read(file);
const lines = content.split("\n");

let sessions = [];
const today = moment().format("YYYY-MM-DD");

for (let i = 0; i < lines.length; i++) {
    const matchStart = lines[i].match(/\*\*(\d{4}-\d{2}-\d{2})\*\* \| \*\*Task:\*\* (.+?) \| \*\*Start:\*\* (\d{2}:\d{2})/);
    if (!matchStart) continue;

    let [_, date, task, startTime] = matchStart;
    if (date !== today) continue;

    let endTime = null;
    let duration = "—";
    let breakTime = "—";

    if (i + 1 < lines.length) {
        const matchEnd = lines[i + 1].match(/\*\*End:\*\* (\d{2}:\d{2})/);
        if (matchEnd) {
            endTime = matchEnd[1];
            const startMoment = moment(startTime, "HH:mm");
            const endMoment = moment(endTime, "HH:mm");
            duration = moment.duration(endMoment.diff(startMoment)).asMinutes();
            breakTime = Math.round(duration / 5) + " min"; // rounded to nearest minute
        }
    }

    sessions.push({
        task,
        start: startTime,
        duration: duration !== "—" ? duration + " min" : "—",
        breakTime
    });
}

dv.table(["Task", "Start Time", "Duration", "Break Time"],
    sessions.map(s => [s.task, s.start, s.duration, s.breakTime])
);
```
---

  
  

