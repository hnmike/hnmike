
<%* const GEMINI_API_KEY="AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o";
// Get the content of the current note
Const fileContent = tp. File. Content;

// Send request to Gemini API
Const response = await tp.Obsidian.RequestUrl ({
    Method: "POST",
    // MODIFIED URL FOR GEMINI 2.5 PRO
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" + "AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o" ,
    ContentType: "application/json",
    Body: JSON.Stringify ({
        Contents: [{
            Parts: [
                {text: summary_prompt},
                {text: "Dưới đây là văn bản cần tóm tắt:\n\n" + fileContent}
            ]
        }]
    })
});

// Extract and format the summary
Const summary = response. Json. Candidates[0]. Content. Parts[0]. Text;
tR = `> [!summary] Tóm tắt
> ${summary.Split ("\n"). Join ("\n> ")}`;
%>