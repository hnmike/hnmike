# Templates và Metadata

## 1. PARA Note Templates

### 1.1 Project Note
---
type: project
id: PRJ-{{date:YYMMDD}}-{{title}}
status: active/pending/completed
created: {{date}}
modified: {{date}}
due: YYYY-MM-DD
tags:
  - project
  - {{project_category}}
related_zettels: []
---

### 1.2 Area Note
---
type: area
id: ARE-{{category}}-{{title}}
status: active
created: {{date}}
modified: {{date}}
tags:
  - area
  - {{area_category}}
related_zettels: []
---

### 1.3 Resource Note
---
type: resource
id: RES-{{type}}-{{title}}
created: {{date}}
modified: {{date}}
tags:
  - resource
  - {{resource_category}}
related_zettels: []
---

## 2. Zettelkasten Templates

### 2.1 Permanent Note
---
type: permanent
id: {{date:YYYYMMDDHHmm}}
created: {{date}}
modified: {{date}}
tags:
  - permanent
  - {{topic}}
related_para: []
references: []
---

### 2.2 Literature Note
---
type: literature
id: LIT-{{date:YYYYMMDD}}-{{source}}
created: {{date}}
modified: {{date}}
source: {{source_title}}
author: {{author}}
tags:
  - literature
  - {{topic}}
related_permanent_notes: []
related_para: []
---

### 2.3 MOC (Map of Content)
---
type: moc
id: MOC-{{category}}-{{title}}
created: {{date}}
modified: {{date}}
tags:
  - moc
  - {{category}}
---

## 3. Quy Tắc Liên Kết

1. Trong PARA Notes:
   - Liên kết đến Zettel: [[YYYYMMDDHHNN-title]]
   - Liên kết đến MOC: [[MOC-category-title]]

2. Trong Zettel Notes:
   - Liên kết đến PARA: [[PRJ/ARE/RES-ID-title]]
   - Liên kết đến MOC: [[MOC-category-title]]

3. Trong MOC:
   - Index của cả PARA và Zettel notes
   - Sử dụng Dataview để tự động cập nhật

## 4. Workflow

1. Capture (00-INBOX)
   - Quick notes
   - Daily logs
   - Fleeting thoughts

2. Process
   - PARA: Phân loại theo dự án/lĩnh vực
   - Zettel: Chuyển thành permanent notes
   - Tạo/Cập nhật MOC

3. Connect
   - Thêm backlinks
   - Cập nhật metadata
   - Liên kết với notes liên quan

4. Review
   - Daily: Inbox processing
   - Weekly: Project updates
   - Monthly: Knowledge review 