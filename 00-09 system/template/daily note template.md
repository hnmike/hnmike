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

## Daily Notes

<%tp.file.cursor()%>


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

  

// Hiển thị danh sách ghi chú được tạo

if (notesToday.length > 0) {

    dv.header(3, "📝 Ghi chú được tạo hôm nay");

    dv.table(

        ["Ghi chú", "Thời gian tạo", "Loại"],

        notesToday.map(p => [

            p.file.link,

            dv.date(p.file.ctime).toFormat("HH:mm"),

            p.type || "-"

        ])

    );

} else {

    dv.paragraph("*Không có ghi chú nào được tạo hôm nay.*");

}

```
tab: New tab
New tab content
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