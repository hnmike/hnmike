# PARA Templates

This note contains links to all PARA templates for quick access. The PARA method (Projects, Areas, Resources, Archives) helps organize your notes into a logical and actionable system.

## 📋 What is PARA?

PARA is an organizational system developed by Tiago Forte for digital information management:

- **Projects**: Short-term efforts with specific outcomes and deadlines
- **Areas**: Ongoing responsibilities with standards to maintain
- **Resources**: Topics or themes of ongoing interest
- **Archives**: Inactive items from the other categories

## 🧩 Available Templates

### Project Template
Use this for any effort with a defined outcome and deadline.
- [[para-project-template|PARA Project Template]]

### Area Template 
Use this for ongoing responsibilities that require maintenance.
- [[para-area-template|PARA Area Template]]

### Resource Template
Use this for topics of interest and reference materials.
- [[para-resource-template|PARA Resource Template]]

### Archive Template
Use this for completed or inactive projects, areas, or resources.
- [[para-archive-template|PARA Archive Template]]

## 📊 PARA Dashboard

```dataviewjs
// Count of items in each PARA category
const projects = dv.pages("#project").where(p => !p.Archived).length;
const areas = dv.pages("#area").length;
const resources = dv.pages("#resource").length;
const archives = dv.pages("#archive").length;

// Create a simple dashboard
dv.header(3, "Your PARA System at a Glance");

dv.table(["Category", "Count"], [
  ["🚀 Active Projects", projects],
  ["🔄 Maintained Areas", areas],
  ["📚 Resources", resources],
  ["🗄️ Archives", archives]
]);
```

## 🔄 Recent Project Updates

```dataviewjs
dv.table(["Project", "Status", "Last Modified"], 
  dv.pages("#project")
    .where(p => !p.Archived)
    .sort(p => p.file.mtime, "desc")
    .limit(5)
    .map(p => [
      p.file.link, 
      p.Status || "Not Set", 
      p.file.mtime
    ])
);
```

## 📌 Usage Tips

1. **For Projects**: Create a new note using the project template when you start a new project with a clear outcome and deadline.

2. **For Areas**: Create area notes for ongoing responsibilities in your life or work that need to be maintained over time.

3. **For Resources**: Use the resource template to capture knowledge, reference materials, and information you may need in the future.

4. **For Archives**: Move completed projects to archives to keep your active projects list clean and focused.

5. **Weekly Review**: Review all active projects weekly and update their status to maintain momentum.
