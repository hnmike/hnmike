<%*
Async function generateTitle () {
    Const apiKey = "AIzaSyCOzcUDtQ 8 HDdivhEWxUla 96 MNzekSSC 7 o";
    Const titlePrompt = "You are a title generator. You will give a succinct and compelling title for the following text. The title must not contain invalid filename characters like backslashes, forward slashes, or colons. Generate only the title as your response. The response language is Vietnamese.";
    Const fileContent = tp. File. Content;
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + apiKey;

    Const response = await requestUrl ({
        Method: "POST",
        Url: apiUrl,
        ContentType: "application/json",
        Body: JSON.Stringify ({
            Contents: [{
                Parts: [
                    {text: titlePrompt},
                    {text: fileContent}
                ]
            }]
        })
    });

    Const title = response. Json. Candidates[0]. Content. Parts[0]. Text.Trim ();
    Await tp.File.Rename (title);
}

Await generateTitle ();
%> 