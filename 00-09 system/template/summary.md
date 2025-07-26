<%*
// IMPORTANT: Replace with your actual API key!
Const GEMINI_API_KEY="AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o";

// --- English Summary Prompt ---
Const summary_prompt = `You are an expert document summarizer. Your task is to thoroughly summarize the provided text to extract its core message and central themes. The summary should be written so that the target audience can clearly understand the text's content without reading the original.

- **Focus:** Concentrate on effectively conveying the key ideas.
- **Length:** Keep it clear and concise, around 200 words or 20% of the original's length.
- **Include:** You must include the main research findings, key arguments, and supporting evidence.
- **Exclude:** Do not include personal opinions or redundant explanations.
- **Quality:** The final summary must be accurate, complete, logically coherent, and highly readable.
- **Language:** Respond in Vietnamese. Do not include a title.`;

// Get the content of the current note
Const fileContent = tp. File. Content;

// Send request to Gemini API
Const response = await tp.Obsidian.RequestUrl ({
    Method: "POST",
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o,
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