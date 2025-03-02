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

// Get dates from frontmatter instead of parsing filename

const startDate = dv.current().file.frontmatter["journal-start-date"];

const endDate = dv.current().file.frontmatter["journal-end-date"];

// Use the dates directly from frontmatter

dv.taskList(dv.pages().file.tasks

.where(t => !t.completed &&

t.due &&

t.due >= dv.date(startDate) &&

t.due <= dv.date(endDate))

.sort(t => t.priority)

.limit(10)

);
```
tab: Completed This Week
```dataviewjs
// Get dates from frontmatter instead of parsing filename

const startDate = dv.current().file.frontmatter["journal-start-date"];

const endDate = dv.current().file.frontmatter["journal-end-date"];

// Use the dates directly from frontmatter

dv.taskList(dv.pages().file.tasks

.where(t => t.completed &&

t.completion &&

t.completion >= dv.date(startDate) &&

t.completion <= dv.date(endDate))

.limit(10)

);
```
````

## Weekly Goals
<%tp.file.cursor()%>

## Summary of the Week


## Notes & Reflections

  
## Plan for Next Week



tabstab: Active Projectsdataviewjs
const startDate = dv.current().file.frontmatter["journal-start-date"];
const endDate = dv.current().file.frontmatter["journal-end-date"];
let projects = dv.pages('"20-30 PARA/Project"')
.where(p => p.type == "project" &&
p.status != "completed" &&
(p.due_date >= dv.date(startDate) || !p.due_date));
// Sort projects
projects = projects.sort(p => p.priority)
.sort(p => p.due_date);
dv.table(
["Project", "Status", "Priority", "Due Date", "Progress"],
projects.map(p => [
p.file.link,
p.status || "Active",
p.priority || "-",
p.due_date ? dv.date(p.due_date).toFormat("MM-dd") : "-",
p.progress ? p.progress + "%" : "-"
])
);
dataviewjs
let areas = dv.pages('"20-30 PARA/Area"')
.where(a => a.type == "area" && a.status == "active");
dv.table(
["Area", "Category", "Last Updated", "Related Notes"],
areas.map(a => [
a.file.link,
a.area_category || "-",
dv.date(a.file.mtime).toFormat("MM-dd"),
dv.pages(a.file.outlinks).length
])
);
dataviewjs
const startDate = dv.current().file.frontmatter["journal-start-date"];
const endDate = dv.current().file.frontmatter["journal-end-date"];
let notes = dv.pages('"10-20 zettelkasten/evergreen note"')
.where(n => n.created >= dv.date(startDate) && n.created <= dv.date(endDate));
dv.table(
["Note", "Type", "Created", "Connected Ideas"],
notes.map(n => [
n.file.link,
n.type || "permanent",
dv.date(n.created).toFormat("MM-dd"),
dv.pages(n.file.outlinks).length
])
);
tabstab: Meetingsdataviewjs
const startDate = dv.current().file.frontmatter["journal-start-date"];
const endDate = dv.current().file.frontmatter["journal-end-date"];
let meetings = dv.pages('"20-30 PARA/Resources/Meetings"')
.where(m => m.type == "meeting" &&
!m.meeting_status &&
m.scheduled_date >= dv.date(startDate) &&
m.scheduled_date <= dv.date(endDate))
.sort(m => m.scheduled_date);
dv.table(
["Meeting", "Date", "Time", "Status"],
meetings.map(m => [
m.file.link,
m.scheduled_date ? dv.date(m.scheduled_date).toFormat("MM-dd") : "-",
m.start_time ? m.start_time + "-" + m.end_time : "-",
m.status || "Scheduled"
])
);
dataviewjs
const startDate = dv.current().file.frontmatter["journal-start-date"];
const endDate = dv.current().file.frontmatter["journal-end-date"];
let deadlines = dv.pages('("10-20 zettelkasten" OR "20-30 PARA")')
.where(p => p.due_date &&
p.due_date >= dv.date(startDate) &&
p.due_date <= dv.date(endDate))
.sort(p => p.due_date);
dv.table(
["Item", "Type", "Due Date", "Status"],
deadlines.map(d => [
d.file.link,
d.type || "-",
dv.date(d.due_date).toFormat("MM-dd"),
d.status || "-"
])
);
dataview
LIST
FROM [[]]
WHERE type = "weekly-note"
SORT file.name DESC
LIMIT 5
