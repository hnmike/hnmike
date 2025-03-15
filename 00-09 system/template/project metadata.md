> [!todo]+ Project Families
>```dataviewjs
>function ProgressBar(note) {
>    // Lấy tất cả project notes trong thư mục của project family này
>    const folder = note.file.folder;
>    const projectNotes = dv.pages(`"${folder}"`)
>        .where(p => p.type === "project_note");
>
>    // Tính toán tiến độ dựa trên số project notes có trạng thái "4 Completed"
>    const totalProjects = projectNotes.length;
>    const completedProjects = projectNotes.filter(p => p.Status === "4 Completed").length;
>    const projectProgress = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
>    const remainingProjects = totalProjects - completedProjects;
>
>    // Tính toán tiến độ dựa trên tasks trong tất cả project notes
>    const allTasks = projectNotes.file.tasks; // Lấy tất cả tasks từ các project notes
>    const totalTasks = allTasks.length;
>    const completedTasks = allTasks.where(t => t.completed).length;
>    const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
>    const remainingTasks = totalTasks - completedTasks;
>
>    // Tính tiến độ tổng hợp (trung bình của projectProgress và taskProgress)
>    const overallProgress = totalProjects > 0 || totalTasks > 0 ? Math.round((projectProgress + taskProgress) / 2) : 0;
>
>    return `<div style="font-size:0.9em;">
>        ${overallProgress}% (Projects: ${completedProjects}/${totalProjects}, Tasks: ${completedTasks}/${totalTasks})
>        <progress value="${overallProgress}" max="100" style="width:100px;" class="nyan-cat"></progress>
>    </div>`;
>}
>
>dv.table(['Project Family', 'Status', 'Priority', 'Progress', 'Created', 'Due'],
> dv.pages()
> .where(p => p.type === "project_family")
> .sort(p => {
>    const statusOrder = {
>        "1 To Do": 1,
>        "2 In Progress": 2,
>        "3 Testing": 3,
>        "4 Completed": 4,
>        "5 Blocked": 5,
>        "": 6
>    };
>    return statusOrder[p.Status] || 999;
> })
> .map(p => [
>  p.file.link,
>  p.Status || "No Status",
>  p.Priority_Level || "-",
>  ProgressBar(p),
>  p.Date_Created ? dv.date(p.Date_Created).toFormat("dd-MM-yyyy") : "-",
>  p.Due_Date ? dv.date(p.Due_Date).toFormat("dd-MM-yyyy") : "-"
> ])
>)
>```