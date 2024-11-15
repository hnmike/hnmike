---
created-date: 2024-08-27O 22:04
tags:"type/moc
summary:
---
```dataview
TABLE 
WITHOUT ID 
link(Source, dateformat(date(Source), "yyyy-MM-dd")) as "", 
rows.Details as "Details"
FROM !"Templates"
FLATTEN log as Details
WHERE contains(lower(Details), "#reading")
GROUP BY file.name as Source
SORT rows.file.day desc
```