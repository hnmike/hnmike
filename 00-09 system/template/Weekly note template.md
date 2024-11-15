---
date: <% moment(tp.file.title,'YYYY[W]ww').startOf('week').add(0,'days').format("YYYY-MM-DD") %>
aliases:
summary:
tags: "#type/weekly-note"
---
---
```calender-nav
```
---

## Week 
<%*
let start_of_week = moment(tp.file.title, 'YYYY-[W]WW'.startOf('week');
let days_in_week = 7;
tR += `> [! picture]- Picture\n`;
tR += Array(days_in_week).fill(null).map((x,i) => `> !
[[${moment(start_of_week).add(i, 'd').format('YYYY-MM-DD[]#YYYY-MM-DD')}]]`).join("\n") + '\n';
%>

>[!highlilght]- Highlights!
>```dataview
TASK
FROM ""
WHERE icontains(text, "#log/highlight")
AND (date <= (date(this.date)+dur(6 days))) and (date >= (date(this.date)))
GROUP BY file.name as filename


>[!Calender]- Daily Reviews
>```dataview
TASK
WHERE icontains(text,"#log/day-review")
AND (date <= (date(this.date)+dur(6 days))) and (date >= (date(this.date)))
GROUP BY file.name DESC

### Created 
```dataview 
TABLE dateformat(file.cday, "EEE, dd.MM") AS "🗓️", note-type AS "📝", file.folder AS "📂", dateformat(file.mday, "EEE, dd.MM") AS "⏳"
WHERE dateformat(file.cday, "yyyy-WW") = dateformat(date(today), "yyyy-WW")
SORT file.cday DESC
```





### Edited
```dataview TABLE (dateformat(file.cday, "EEE, dd.MM")) AS "🗓️", note-type AS "📝", file.folder AS "📂", (dateformat(file.mday, "EEE, dd.MM")) AS "⏳" WHERE dateformat(file.mday, "yyyy-WW") = dateformat(this.file.cday, "yyyy-WW") WHERE dateformat(file.cday, "yyyy-WW") != dateformat(this.file.cday, "yyyy-WW") SORT file.mday DESC
```
