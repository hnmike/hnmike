---
created-date: <% moment(tp.file.title, 'YYYY-MM-DD').format("YYYY-MM-DD") %>
aliases: 
summary: 
tags:
  - "#type/daily-note"
---

>**Prev::** [[<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>]]
>**Next::** [[<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>]]
>**week::** [[<% tp.date.now("YYYY-MM", 0, tp.file.title, "YYYY-MM-DD") %>]], [[<% tp.date.now("YYYY-[W]ww", 0, tp.file.title, "YYYY-MM-DD")  %>]]


## Tasks

> [!multi-column]
> 
>> [!TODO]
>> - **Todo**
>>   - ```tasks
>>    not done
>> (status. Type is not IN_PROGRESS)
>> Short mode
>>      hide due date
>>    hide start date
>>      hide scheduled date
>>    hide recurrence rule
>>    sort by urgency, scheduled```
>
>> [!DOING]
>> - **Doing**
>>   - ```tasks
>>      not done
>>    (status. Type is IN_PROGRESS)
>>      short mode
>>    hide due date
>>      hide start date
>>    hide scheduled date
>>      hide recurrence rule
>>    sort by urgency, due```
>
>> [!DONE]
>> - **Done**
>>   - ```tasks
>>      done
>>    short mode
>>      hide due date
>>    hide start date
>>    hide scheduled date



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



