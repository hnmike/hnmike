>[!blank-container|no-margin]
> `BUTTON[open_moc]` `BUTTON[open_daily_note]` `BUTTON[create_new_note]` `BUTTON[quick_switcher]` `BUTTON[open_inbox]`  
```dataviewjs
// Configuration object for the progress bar
const config = {
    progressColor: "#4caf50", // Color of the progressed section
    unprogressedColor: "#d3d3d3", // Color of the unprogressed section
    fadeDuration: 1000 // Fade-in duration in milliseconds
};

// Function to get the current progress of the day
function getDayProgress() {
    const now = DateTime.now();
    return (now.hour / 24) * 100; // Calculate the percentage of the day that has passed
}

// Function to create a fade-in effect for elements
function fadeIn(element, duration) {
    element.style.opacity = 0;
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    element.style.display = 'block'; // Ensure visibility
    setTimeout(() => {
        element.style.opacity = 1; // Set opacity to 1 to fade in
    }, 50); // Slight delay to ensure transition takes effect
}

// Function to render the progress bar
function renderProgressBar() {
    // Create a container for the progress bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.id = 'progress-bar-container';
    progressBarContainer.style.width = '100%'; // Set container to full width
    progressBarContainer.style.maxWidth = '750px'; // Set a maximum width for larger screens
    progressBarContainer.style.margin = 'auto';
    progressBarContainer.style.textAlign = 'center';

    // Create the progress bar element
    const progressBar = document.createElement('progress');
    progressBar.id = 'daily-progress';
    progressBar.max = 100;
    progressBar.value = parseInt(getDayProgress());
    progressBar.style.width = '100%'; // Set progress bar to full width within container

    // Apply colors to the progress bar using CSS variables
    progressBar.style.setProperty('--progress-color', config.progressColor);
    progressBar.style.setProperty('--unprogressed-color', config.unprogressedColor);

    // Add the progress bar to the container
    progressBarContainer.appendChild(progressBar);
    dv.container.appendChild(progressBarContainer);

    // Apply the fade-in effect
    fadeIn(progressBarContainer, config.fadeDuration);
}

// Initial rendering of the progress bar
renderProgressBar();
```

> [!multi-column]
>> [!todo]+ Project Tracking 🦊
>> ```dataviewjs
>> function ProgressBar(note) {
>>     // Lấy tất cả project notes trong thư mục của project family này
>>     const folder = note.file.folder;
>>     const projectNotes = dv.pages(`"${folder}"`)
>>         .where(p => p.type === "project_note");
>> 
>>     // Tính toán tiến độ dựa trên số project notes có trạng thái "4 Completed"
>>     const totalProjects = projectNotes.length;
>>     const completedProjects = projectNotes.filter(p => p.Status === "4 Completed").length;
>>     const projectProgress = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
>>     const remainingProjects = totalProjects - completedProjects;
>> 
>>     // Tính toán tiến độ dựa trên tasks trong tất cả project notes
>>     const allTasks = projectNotes.file.tasks; // Lấy tất cả tasks từ các project notes
>>     const totalTasks = allTasks.length;
>>     const completedTasks = allTasks.where(t => t.completed).length;
>>     const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
>>     const remainingTasks = totalTasks - completedTasks;
>> 
>>     // Tính tiến độ tổng hợp (trung bình của projectProgress và taskProgress)
>>     const overallProgress = totalProjects > 0 || totalTasks > 0 ? Math.round((projectProgress + taskProgress) / 2) : 0;
>> 
>>     return `<div style="font-size:0.9em;">
>>         ${overallProgress}% (Projects: ${completedProjects}/${totalProjects}, Tasks: ${completedTasks}/${totalTasks})
>>         <progress value="${overallProgress}" max="100" style="width:100px;" class="nyan-cat"></progress>
>>     </div>`;
>> }
>> 
>> dv.table(['Project Family', 'Status', 'Priority', 'Progress', 'Created', 'Due'],
>>  dv.pages()
>>  .where(p => p.type === "project_family")
>>  .where(p => !p.file.path.includes('00-09')) // Loại trừ các file trong thư mục 00-09
>>  .sort(p => {
>>     const statusOrder = {
>>         "1 To Do": 1,
>>         "2 In Progress": 2,
>>         "3 Testing": 3,
>>         "4 Completed": 4,
>>         "5 Blocked": 5,
>>         "": 6
>>     };
>>     return statusOrder[p.Status] || 999;
>>  })
>>  .map(p => [
>>   p.file.link,
>>   p.Status || "No Status",
>>   p.Priority_Level || "-",
>>   ProgressBar(p),
>>   p.Date_Created ? dv.date(p.Date_Created).toFormat("dd-MM-yyyy") : "-",
>>   p.Due_Date ? dv.date(p.Due_Date).toFormat("dd-MM-yyyy") : "-"
>>  ])
>> )
>> ```
>
>> [!Goal]+ Goal 🦊
>> ```dataviewjs
>> // Get all #goal tags from pages
>> let goalTags = dv.pages()
>>     .file.tags
>>     .distinct()
>>     .filter(tag => tag.startsWith('#goal'))
>>     .sort();
>>
>> dv.table(
>>     ["Goals"],
>>     goalTags.map(tag => [tag])
>> )
>> ```



`````````````tabs
tab: .................................................................
tab: Development
````tabs
tab: Project
```dataviewjs
let pages = dv.pages('"PARA/PROJECTS"')
    .where(p => (p.type == "project_note" || p.type == "project_family") && p.Status != "4 Completed");

// Separate pages with and without due dates
let withDueDates = pages.where(p => p.Due_Date != null);
let withoutDueDates = pages.where(p => p.Due_Date == null);

// Sort pages with due dates by: Due Date -> Priority Level (A-Z) -> Status (Z-A)
withDueDates = withDueDates.sort(p => p.Due_Date)
    .sort(p => p.Priority_Level)
    .sort(p => p.Status, 'desc');

// Sort pages without due dates by: Priority Level (A-Z) -> Status (Z-A)
withoutDueDates = withoutDueDates.sort(p => p.Priority_Level)
    .sort(p => p.Status, 'desc');

// Combine both lists
let allPages = withDueDates.concat(withoutDueDates);

// Render the table with clickable project links
dv.table(
    ["Days", "Project", "Priority Level", "Status", "Due Date"],
    allPages.map(p => [
        p.Due_Date ? Math.floor(dv.date(p.Due_Date).diff(dv.date("today"), 'days').days) : "-", // Display whole number of days
        p.file.link, // Use p.file.link to render the project name as a clickable link
        p.Priority_Level || "-",
        p.Status || "-",
        p.Due_Date ? dv.date(p.Due_Date).toFormat("MM-dd") : "-"
    ])
);
```
tab: Area
```dataview
table area_category as "Area Category", dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified" 
from "PARA/AREAS"
WHERE type = "area_family"
sort file.mtime desc
tab: Documentation
```dataview
table dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified", connections as "Connections"
from "PARA/RESOURCES/DOCUMENTATIONS"
WHERE type = "documentation_note"
sort file.mtime desc
limit 15
```
tab: Workstation
```dataview
table dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified", connections as "Connections"
from "PARA/WORKSTATION"
WHERE type = "workstation_note"
sort file.mtime desc
limit 15
```
````
tab: Self
````tabs
tab: Permanent Note
```dataview
table dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified", connections as "Connections"
from "ZETA/PERMANENT"
WHERE type = "permanent_note"
sort file.mtime desc
limit 15
```
tab: Literature Note
```dataview
table dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified", connections as "Connections"
from "ZETA/LITERATURE"
WHERE type = "literature_note"
sort file.mtime desc
limit 15
tab: Fleeting Note
```dataview
table dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified", connections as "Connections"
from "ZETA/FLEETING"
WHERE type = "fleeting_note"
sort file.mtime desc
limit 15
```
````
tab: Components
````tabs
tab: Open Meetings
```dataviewjs
let meetings = dv.pages('"PARA/RESOURCES/MEETINGS"')
    .where(m => m.meeting_status === false && m.type === "meeting");

// Separate meetings with and without scheduled dates
let withDates = meetings.where(m => m.scheduled_date);
let withoutDates = meetings.where(m => !m.scheduled_date);

// Sort meetings with dates by scheduled date
withDates = withDates.sort(m => m.scheduled_date);

// Combine both lists, with meetings having dates first
let allMeetings = withDates.concat(withoutDates);

// Render the table with clickable meeting links
dv.table(
    ["Days", "Meeting", "Scheduled Date", "Start Time", "End Time"],
    allMeetings.map(m => [
        m.scheduled_date ? Math.floor(dv.date(m.scheduled_date).diff(dv.date("today"), 'days').days) : "-", // Calculate days until the meeting
        m.file.link, // Use m.file.link to render the meeting name as a clickable link
        m.scheduled_date ? dv.date(m.scheduled_date).toFormat("MM-dd") : "-",
        m.start_time || "-",
        m.end_time || "-"
    ])
);
```
tab: Contacts
```dataview
table company as "Company", title as "Title"
from "PARA/RESOURCES/CONTACTS"
WHERE type = "contact"
SORT file.path ASC
```
tab: Concept Maps
```dataview
table dateformat(file.cday, "yyyy-MM-dd") as "Created", dateformat(file.mtime, "yyyy-MM-dd") as "Last Modified", file.size as "File Size" 
from "PARA/RESOURCES/CONCEPT MAP" 
sort file.mtime desc
limit 15
```
````

tab: New tab
New tab content
`````````````

---

```toggl
SUMMARY
PAST 7 DAYS
```
---









````
```meta-bind-button
label: Map of Contents
icon: lucide-map-pinned
hidden: true
class: ""
tooltip: Open Map of Content
id: open_moc
style: primary
actions:
  - type: command
    command: obsidian-hotkeys-for-specific-files:HUB/Map of Content.md

```
```meta-bind-button
label: Daily Note
icon: lucide-calendar
hidden: true
class: ""
tooltip: Open Daily Note
id: open_daily_note
style: primary
actions:
  - type: command
    command: journals:journal:calendar:open-day

```
```meta-bind-button
label: Create a Note
icon: lucide-plus-circle
hidden: true
class: ""
tooltip: Create a New Note
id: create_new_note
style: primary
actions:
  - type: command
    command: quickadd:choice:a019f4b7-7f8e-4937-8069-7a9ad8c4b10e

```
```meta-bind-button
label: Recent Files
icon: lucide-navigation
hidden: true
class: ""
tooltip: Open Quick Switcher
id: quick_switcher
style: primary
actions:
  - type: command
    command: switcher:open

```
```meta-bind-button
label: Mail Box
icon: lucide-inbox
hidden: true
class: ""
tooltip: Open Inbox
id: open_inbox
style: primary
actions:
  - type: command
    command: obsidian-hotkeys-for-specific-files:HUB/Mail Box.md

```
```meta-bind-button
label: Switch to Light Mode
hidden: true
id: light_mode
style: destructive
actions:
  - type: command
    command: theme:use-light
tooltip: Switch to Light Mode
```
```meta-bind-button
label: Switch to Dark Mode
hidden: true
id: dark_mode
style: primary
actions:
  - type: command
    command: theme:use-dark
tooltip: Switch to Dark Mode
```
