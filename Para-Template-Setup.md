# Setting Up PARA Templates in Obsidian

This guide explains how to set up and use the PARA templates with Obsidian.

## 📋 Step 1: Configure Templates Plugin

1. Enable the **Templates** core plugin in Obsidian:
   - Go to Settings → Core plugins
   - Enable "Templates"
   - Click on the gear icon to configure

2. Set your template folder location:
   - Set template folder location to "30-TEMPLATES" (or wherever you've stored the templates)
   - Optionally, set a default location for new notes

## 📋 Step 2: Create Template Hotkeys (Optional)

For faster access, set up hotkeys for your templates:

1. Go to Settings → Hotkeys
2. Search for "Templates: Insert template"
3. Create hotkeys for frequently used templates

## 📋 Step 3: Using Templates

### Method 1: Template Command
1. Create a new note where you want it
2. Use CMD/CTRL+P to open the command palette
3. Type "Templates: Insert template"
4. Select the desired template from the list

### Method 2: Template Ribbon Icon
1. Create a new note
2. Click the template icon in the ribbon (if enabled)
3. Select your template

### Method 3: Template Folder Browser
1. Open the template folder in the file explorer
2. Right-click on a template and choose "Create new note from template"

## 📋 Step 4: Template Placeholders

The templates use several placeholders:

- `{{title}}` - Replaced with the note title
- `{{date}}` - Replaced with current date
- `{{time}}` - Replaced with current time

## 🔧 PARA Integration with Quickadd (Recommended)

For a more seamless workflow, consider using the Quickadd community plugin:

1. Install the Quickadd plugin from Community plugins
2. Create a new "Template" choice for each PARA category
3. Set the template file and folder location
4. Create a "Macro" to combine choices into a PARA workflow

Example Quickadd setup:

```
Choices:
- New Project (Template)
  Template file: para-project-template.md
  Folder: 10-PARA/11-Projects/11.01 Active Projects
  Filename format: {{VALUE:Project name}}

- New Area (Template)
  Template file: para-area-template.md
  Folder: 10-PARA/12-Areas
  Filename format: {{VALUE:Area name}}

- New Resource (Template)
  Template file: para-resource-template.md
  Folder: 10-PARA/13-Resources
  Filename format: {{VALUE:Resource name}}
```

## 💡 Tips for Using Templates

1. **Consistent Naming**: Use a consistent naming convention for all notes
2. **Always Tag**: Ensure all notes have the appropriate PARA tag (#project, #area, etc.)
3. **Link Notes**: Create links between related notes across categories
4. **Use Dataview**: The templates include dataview queries to show related content

## 🔄 Customizing Templates

Feel free to customize these templates to better fit your workflow:

1. Open any template file in edit mode
2. Modify the frontmatter, sections, or queries as needed
3. Save the template for future use

Remember that good templates evolve with your workflow—revisit and refine them regularly!
