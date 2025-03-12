---
type: weekly_note
date: 0006-12-31
week: Untitled 7
aliases:
  - "0007 Week 01"
summary:
tags: 
  - type/weekly-note
  - journal/week
created: 2025-03-12 21:36
modified: 2025-03-12 21:36
journal-start-date: 0006-12-31
journal-end-date: 0007-01-06
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


# Summary of the Week


# Notes & Reflections

  
# Plan for Next Week