---
type: daily-note
date: <% moment(tp.file.title, 'YYYY-MM-DD').format("YYYY-MM-DD") %>
aliases:
  - "<% moment(tp.file.title, 'YYYY-MM-DD').format("DD/MM/YYYY") %>"
week: <% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>
month: <% tp.date.now("YYYY-MM", 0, tp.file.title, "YYYY-MM-DD") %>
summary: 
tags: [type/daily-note, journal/daily, area]
---

# Daily Overview

>[!meta]- Navigation
>**⬅️ Prev::** [[<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>]]
>**➡️ Next::** [[<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>]]
>**📅 Week::** [[<% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>]]
>**📆 Month::** [[<% tp.date.now("YYYY-MM", 0, tp.file.title, "YYYY-MM-DD") %>]]


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




## Daily Notes

<%tp.file.cursor()%>

```` tabs
tab: Projects
```dataviewjs
let pages = dv.pages('"PARA/PROJECTS"')
    .where(p => (p.type == "project_note" || p.type == "project_family") && p.Status != "4 Completed");

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
        p.Due_Date ? Math.floor(dv.date(p.Due_Date).diff(dv.date("today"), 'days').days) : "-", // Display whole number of days
        p.file.link, // Use p.file.link to render the project name as a clickable link
        p.Priority_Level || "-",
        p.Status || "-",
        p.Due_Date ? dv.date(p.Due_Date).toFormat("MM-dd") : "-"
    ])
);
```
tab: Areas
```dataview
table area_category as "Area Category", created as "Date Created" from "PARA/AREAS"
WHERE type = "area_family
````



```` tabs

tab: Today's Notes

```dataviewjs

// Query tất cả các note được tạo hoặc chỉnh sửa hôm nay

const today = dv.date(dv.current().file.name);

const todayStr = today.toFormat("yyyy-MM-dd");

  

// Lấy các note được tạo hôm nay

const createdToday = dv.pages()

    .where(p => p.created && dv.date(p.created).toFormat("yyyy-MM-dd") === todayStr)

    .sort(p => p.created, "desc");

  

// Lấy các note được chỉnh sửa hôm nay (nhưng không được tạo hôm nay)

const modifiedToday = dv.pages()

    .where(p =>

        dv.date(p.file.mtime).toFormat("yyyy-MM-dd") === todayStr &&

        (!p.created || dv.date(p.created).toFormat("yyyy-MM-dd") !== todayStr)

    )

    .sort(p => p.file.mtime, "desc");

  

// Hiển thị các note được tạo hôm nay

if (createdToday.length > 0) {

    dv.header(3, "📝 Created Today");

    dv.table(

        ["Note", "Type", "Time", "Summary"],

        createdToday.map(p => [

            p.file.link,

            p.type || "-",

            dv.date(p.created).toFormat("HH:mm"),

            p.summary || "-"

        ])

    );

} else {

    dv.paragraph("*No notes created today*");

}

  

// Hiển thị các note được chỉnh sửa hôm nay

if (modifiedToday.length > 0) {

    dv.header(3, "✏️ Modified Today");

    dv.table(

        ["Note", "Type", "Time", "Summary"],

        modifiedToday.map(p => [

            p.file.link,

            p.type || "-",

            dv.date(p.file.mtime).toFormat("HH:mm"),

            p.summary || "-"

        ])

    );

}

```

  

tab: Projects

```dataviewjs

let pages = dv.pages('"PARA/PROJECTS"')

    .where(p => (p.type == "project_note" || p.type == "project_family") && p.Status != "4 Completed");

  

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

        p.Due_Date ? Math.floor(dv.date(p.Due_Date).diff(dv.date("today"), 'days').days) : "-", // Display whole number of days

        p.file.link, // Use p.file.link to render the project name as a clickable link

        p.Priority_Level || "-",

        p.Status || "-",

        p.Due_Date ? dv.date(p.Due_Date).toFormat("MM-dd") : "-"

    ])

);

```

  

tab: Areas

```dataview

TABLE

    area_category as "Area Category",

    summary as "Summary",

    created as "Date Created"

FROM "PARA/AREAS"

WHERE type = "area_family" OR type = "area_note"

SORT area_category ASC

```




🔗 Related Notes
```dataview
TABLE 
    file.mtime as "Modified",
    summary as "Summary"
FROM ""
WHERE file.mtime = date(this.file.name)
SORT file.mtime DESC
```