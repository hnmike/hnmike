---
created-date: <% moment(tp.file.title, 'YYYY-MM-DD').format("YYYY-MM-DD") %>
aliases: 
summary: 
tags:
  - "#type/daily-note"
---

# Daily Overview

>[!meta]- Navigation
>**⬅️ Prev::** [[<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>]]
>**➡️ Next::** [[<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>]]
>**📅 Week::** [[<% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD") %>]]
>**📆 Month::** [[<% tp.date.now("YYYY-MM", 0, tp.file.title, "YYYY-MM-DD") %>]]

## 🎯 Today's Focus
<%tp.file.cursor()%>

## 📋 Tasks & Activities

> [!multi-column]
> 
>> [!todo]+ To Do
>> ```tasks
>> not done
>> path does not include Daily
>> (status.type is not IN_PROGRESS)
>> due on <% moment(tp.file.title, 'YYYY-MM-DD').format("YYYY-MM-DD") %>
>> short mode
>> hide task count
>> hide backlink
>> hide edit button
>> ```
>
>> [!doing]+ In Progress
>> ```tasks
>> not done
>> path does not include Daily
>> (status.type is IN_PROGRESS)
>> due on <% moment(tp.file.title, 'YYYY-MM-DD').format("YYYY-MM-DD") %>
>> short mode
>> hide task count
>> hide backlink
>> hide edit button
>> ```
>
>> [!done]+ Completed Today
>> ```tasks
>> done on <% moment(tp.file.title, 'YYYY-MM-DD').format("YYYY-MM-DD") %>
>> path does not include Daily
>> short mode
>> hide task count
>> hide backlink
>> hide edit button
>> ```

## Morning pages

>[!journal]- On this day...
>```dataview
>LIST
FROM "Journal/ Daily"
WHERE dataformat(file.day,"MM-DD")= dateformat(this.file.day, "MM-dd")

>[!calender]- Note Created This Day
>```dataview
TABLE created, file.mtime AS modified, tags, summary
FROM ""
WHERE !contains(file.folder, "journal") 
AND !contains(file.folder, "template")
AND dateformat(file.ctime, "YYYY-MM-DD") = dateformat(this.file.day, "YYYY-MM-DD")

>[!task]- Tasks
>```dataview
TASK
WHERE !completed
AND contains(text, "[[" + date(today).format("YYYY-MM-DD") + "-") 
AND contains(text, "#task")
GROUP BY file.name AS filename
SORT file.ctime DESC
>```

task
```dataview
Task
Where !completed
AND icontains(text, "[[<% moment (tp.file.title, 'YYYY-MM-DD').format("YYYY-MM") %>")
AND icontains(text, "#task")
GROUP BY file.name as filename
SORT rows.file.ctime DESC
```
```dataviewjs 
```



** Morning brain dump **

## LOG



