---
date: <% moment(tp.file.title,'YYYY[W]ww').startOf('week').add(0,'days').format("YYYY-MM-DD") %>
aliases:
summary:
tags: "#type/weekly-note"
journal: journal
journal-start-date: <% moment(tp.file.title,'YYYY[W]ww').startOf('week').format("YYYY-MM-DD") %>
journal-end-date: <% moment(tp.file.title,'YYYY[W]ww').endOf('week').format("YYYY-MM-DD") %>
journal-section: week
---

```calendar-timeline
mode: week
```

```tabs
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
```

# Weekly Goals
<%tp.file.cursor()%>

# Summary of the Week


# Notes & Reflections

  
# Plan for Next Week


# Overview
```tabs
tab: Meetings
```dataviewjs
let startDate = dv.current().file.frontmatter["journal-start-date"];
let endDate = dv.current().file.frontmatter["journal-end-date"];

let meetings = dv.pages('"PARA/RESOURCES/MEETINGS"')
    .where(m => m.meeting_status === false && m.type === "meeting" && m.scheduled_date >= dv.date(startDate) && m.scheduled_date <= dv.date(endDate));

let withDates = meetings.where(m => m.scheduled_date);
let withoutDates = meetings.where(m => !m.scheduled_date);

withDates = withDates.sort(m => m.scheduled_date);

let allMeetings = withDates.concat(withoutDates);

dv.table(
    ["Days", "Meeting", "Scheduled Date", "Start Time", "End Time"],
    allMeetings.map(m => [
        m.scheduled_date ? Math.floor(dv.date(m.scheduled_date).diff(dv.date("today"), 'days').days) : "-",
        m.file.link,
        m.scheduled_date ? dv.date(m.scheduled_date).toFormat("MM-dd") : "-",
        m.start_time || "-",
        m.end_time || "-"
    ])
);
```

tab: Projects
```dataviewjs
let startDate = dv.current().file.frontmatter["journal-start-date"];
let endDate = dv.current().file.frontmatter["journal-end-date"];

let pages = dv.pages('"PARA/PROJECTS"')
    .where(p => (p.type == "project_note" || p.type == "project_family") && 
                p.Status != "4 Completed" && 
                (p.Due_Date >= dv.date(startDate) || p.Due_Date == null) && 
                (p.Due_Date <= dv.date(endDate) || p.Due_Date == null));

// Separate pages with and without due dates
let withDueDates = pages.where(p => p.Due_Date != null);
let withoutDueDates = pages.where(p => p.Due_Date == null);

// Sort pages with due dates by: Due Date -> Priority Level (A-Z) -> Status (Z-A)
withDueDates = withDueDates.sort(p => p.Due_Date)
    .sort(p => p.Priority_Level)
    .sort(p => p.Status, 'desc');

// Sort pages without due dates by: Priority Level (A-Z) -> Status (Z-A)
withoutDueDates = withoutDueDates.sort(p => p.Priority_Level)
    .sort(p => p.Status, 'desc');

// Combine both lists
let allPages = withDueDates.concat(withoutDueDates);

// Render the table with clickable project links
dv.table(
    ["Days", "Project", "Priority Level", "Status", "Due Date"],
    allPages.map(p => [
        p.Due_Date ? Math.floor(dv.date(p.Due_Date).diff(dv.date("today"), 'days').days) : "-",
        p.file.link,
        p.Priority_Level || "-",
        p.Status || "-",
        p.Due_Date ? dv.date(p.Due_Date).toFormat("MM-dd") : "-"
    ])
);
```

tab: Areas
```dataview
table area_category as "Area Category", created as "Date Created" from "PARA/AREAS"
WHERE type = "area_family"
```