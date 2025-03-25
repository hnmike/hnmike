# PARA System Setup Guide

## 📋 Overview

The PARA method is a simple and effective way to organize your digital information. This guide will help you set up the PARA system in your Obsidian vault.

## 🗂️ Folder Structure

Create the following folder structure in your vault:

```
10-PARA/
├── 11-Projects/
│   ├── 11.01 Active Projects/
│   └── 11.02 Pending Projects/
├── 12-Areas/
│   ├── 12.01 Health/
│   ├── 12.02 Career/
│   ├── 12.03 Personal Development/
│   └── ... (other areas of responsibility)
├── 13-Resources/
│   ├── 13.01 Technical Knowledge/
│   ├── 13.02 Research Papers/
│   ├── 13.03 Learning Materials/
│   └── ... (other resource categories)
└── 14-Archives/
    ├── 14.01 Completed Projects/
    ├── 14.02 Reference Archives/
    └── ... (other archive categories)
```

## 📝 Using PARA Templates

1. **Projects**: 
   - Use the [[para-project-template]] for new projects
   - Store in `10-PARA/11-Projects/11.01 Active Projects/`
   - Move to `11.02 Pending Projects` when on hold
   - Move to `14-Archives/14.01 Completed Projects` when done

2. **Areas**: 
   - Use the [[para-area-template]] for areas of responsibility
   - Store in appropriate subfolder of `10-PARA/12-Areas/`

3. **Resources**: 
   - Use the [[para-resource-template]] for resources and reference materials
   - Store in appropriate subfolder of `10-PARA/13-Resources/`

4. **Archives**: 
   - Use the [[para-archive-template]] for completed projects
   - Store in appropriate subfolder of `10-PARA/14-Archives/`

## 🔄 PARA Workflow

1. **Weekly Review**: Review all active projects and update their status
2. **Monthly Review**: Review areas to ensure they meet your standards
3. **Quarterly Review**: Review resources and archives for relevance and organization

## 🧠 PARA Integration with Zettelkasten

PARA and Zettelkasten complement each other well:
- PARA provides actionable organization for projects and areas
- Zettelkasten connects ideas and builds knowledge over time

**Connection Points**:
- Link Zettelkasten notes to relevant Projects and Areas
- Use MOCs (Maps of Content) to bridge between systems
- Tag notes appropriately to enable cross-system search

## 🔧 Setting Up Queries

Use queries to keep track of your PARA system:

1. **Active Projects Dashboard**:
```dataview
TABLE Status, Priority, StartDate, DueDate
FROM #project
WHERE !Archived
SORT Status DESC, Priority DESC
```

2. **Area Maintenance**:
```dataview
TABLE file.mtime as "Last Updated"
FROM #area
SORT file.mtime DESC
```

3. **Resource Browser**:
```dataview
TABLE tags as "Topics", file.mtime as "Last Updated"
FROM #resource
SORT file.mtime DESC
```

## 💡 Tips for Success

1. **Be Selective**: Not everything deserves a note; focus on what's important
2. **Regular Reviews**: The system works best with consistent maintenance
3. **Progressive Organization**: Start simple and expand as needed
4. **Link Liberally**: Create connections between notes across categories
5. **Keep Projects Current**: Archive completed projects promptly
