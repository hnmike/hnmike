---
type: weekly_note
date: <% moment(tp.file.title,'YYYY[W]ww').startOf('week').add(0,'days').format("YYYY-MM-DD") %>
week: <% tp.file.title %>
aliases:
  - "<% moment(tp.file.title,'YYYY[W]ww').format('YYYY [Week] ww') %>"
summary:
tags: 
  - type/weekly-note
  - journal/week
created: <% tp.file.creation_date() %>
modified: <% tp.file.last_modified_date() %>
journal-start-date: <% moment(tp.file.title,'YYYY[W]ww').startOf('week').format("YYYY-MM-DD") %>
journal-end-date: <% moment(tp.file.title,'YYYY[W]ww').endOf('week').format("YYYY-MM-DD") %>
---

calendar-timeline
```calendar-timeline
mode: week
```
````tabs
tab: Due This Week
```dataviewjs
// Extract year and week number from the note title
const title = dv.current().file.name;
const [year, monthName, weekLabel] = title.split('-');
const weekNumber = parseInt(weekLabel.replace('W', ''), 10);

// Calculate start and end dates for the week
const startDate = moment().year(year).week(weekNumber).startOf('week').format('YYYY-MM-DD');
const endDate = moment().year(year).week(weekNumber).endOf('week').format('YYYY-MM-DD');

dv.taskList(dv.pages().file.tasks
    .where(t => !t.completed && t.due && t.due >= dv.date(startDate) && t.due <= dv.date(endDate))
    .sort(t => t.priority)
    .limit(10)
);
```
tab: Completed This Week
```dataviewjs
// Extract year and week number from the note title
const title = dv.current().file.name;
const [year, monthName, weekLabel] = title.split('-');
const weekNumber = parseInt(weekLabel.replace('W', ''), 10);

// Calculate start and end dates for the week
const startDate = moment().year(year).week(weekNumber).startOf('week').format('YYYY-MM-DD');
const endDate = moment().year(year).week(weekNumber).endOf('week').format('YYYY-MM-DD');

dv.taskList(dv.pages().file.tasks
    .where(t => t.completed && t.completion && t.completion >= dv.date(startDate) && t.completion <= dv.date(endDate))
    .limit(10)
);
```
````
# Weekly Goals
<%tp.file.cursor()%>

# Summary of the Week


# Notes & Reflections

  
# Plan for Next Week