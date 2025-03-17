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
>> [!homepagetodoiston]+ Tasks from Todoist
>> ```todoist  
>> filter: "#Everyday"
>> project:Inbox limit: 4
>> sorting:
>>  - date
>>  - priority
>> ```
>
>> [!homepagetodoistoff]+ Goal
>> ```dataviewjs
>> dv.view("SYSTEM/TEMPLATE/CSS/Timeline", {
>>     pages: "", 
>>     inbox: "Inbox.md", 
>>     dailyNoteFolder: "DAILY/DAILY", 
>>     dailyNoteFormat: "YYYY-MM-DD",
>>     section: "# New Tasks",
>>     forward: true,
>>     options: "noYear todayFocus todoFilter noFile"
>> })
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





```toggl
SUMMARY
PAST 7 DAYS
```