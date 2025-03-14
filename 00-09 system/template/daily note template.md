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


## 📋 Tasks & Activities

> ````tabs
Tab: Due Today
```tasks
not done
due <% tp.file.title %>
sort by priority
hide due date
limit 10
```
Tab: Overdue
```tasks 
not done 
due before <% tp.file.title %>
sort by priority
hide due date
limit 10
```
Tab: Completed
```tasks
done <% tp.file.title %>
hide done date
hide due date
limit 10
```



## Daily Notes

<%tp.file.cursor()%>
## 📊 Project Updates

```dataview
TABLE 
    status as "Status",
    priority as "Priority",
    progress as "Progress"
FROM "20-30 PARA/Projects"
WHERE contains(due_date, this.file.name)
SORT priority DESC
```

## 🧠 Knowledge Management

### 📚 Technical Notes
```dataview
LIST
FROM "10-20 zettelkasten"
WHERE contains(created, this.file.name)
AND type = "technical"
```

### 💡 Zettelkasten Notes
```dataview
LIST
FROM "10-20 zettelkasten"
WHERE contains(created, this.file.name)
AND type = "permanent"
```

 > [!log ]+ 
> Contents Daily Log

### 🌅 Morning Review
- [ ] Review yesterday's notes
- [ ] Check calendar for today
- [ ] Set top 3 priorities
- [ ] Check email inbox

### 📝 Today's Notes & Activities


### 🌙 Evening Review
- [ ] Review completed tasks
- [ ] Update project status
- [ ] Plan for tomorrow
- [ ] Journal reflection

## 🤔 Daily Reflection

### What Went Well
- 

### Challenges Faced
- 

### Key Learnings
- 

### Tomorrow's Priorities
1. 
2. 
3. 

## 🔗 Related Notes
```dataview
TABLE 
    file.mtime as "Modified",
    summary as "Summary"
FROM ""
WHERE file.mtime = date(this.file.name)
SORT file.mtime DESC
```