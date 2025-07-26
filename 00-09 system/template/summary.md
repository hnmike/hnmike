<%*
Function generateSummary () {
    Var apiKey = "AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o";
    Var summaryPrompt = "You are a content summarizer. Create a concise Vietnamese summary of the following text. Focus on key points and main ideas.";
    Var fileContent = tp. File. Content;
    var apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + apiKey;

    RequestUrl ({
        Method: "POST",
        Url: apiUrl,
        ContentType: "application/json",
        Body: JSON.Stringify ({
            Contents: [{
                Parts: [
                    {text: summaryPrompt},
                    {text: fileContent}
                ]
            }]
        })
    }). Then (function (response) {
        Var summary = response. Json. Candidates[0]. Content. Parts[0]. Text.Trim ();
        // Thêm tóm tắt vào cuối file thay vì rename
        Tp. File. Cursor_append ("\n\n## Tóm tắt\n" + summary);
    });
}

GenerateSummary ();
%> 