<%*
// IMPORTANT: Replace with your actual API key!
Const GEMINI_API_KEY="AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o";

// --- English Title Generation Prompt ---
Const title_prompt = `You are a title generator.
You will give a succinct and compelling title for the following text.
The title must not contain invalid filename characters like backslashes (\), forward slashes (/), or colons (:).
Generate only the title as your response.
The response language is Vietnamese.`;

// Get the content of the current note
Const fileContent = tp. File. Content;

// Send request to Gemini API
Const response = await tp.Obsidian.RequestUrl ({
    Method: "POST",
    // MODIFIED URL FOR GEMINI 2.5 PRO
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" + "AIzaSyCOzcUDtQ 8 HDdivhEWxUla 96 MNzekSSC 7 o",
    ContentType: "application/json",
    Body: JSON.Stringify ({
        Contents: [{
            Parts: [
                {text: title_prompt},
                {text: fileContent}
            ]
        }]
    })
});

// Extract title and rename the file
Const title = response. Json. Candidates[0]. Content. Parts[0]. Text.Trim ();
Await tp.File.Rename (title);
%>