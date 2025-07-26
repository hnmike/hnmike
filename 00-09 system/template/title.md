<%*
Await tp.File.Rename (
    (await requestUrl ({
        Method: "POST",
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o",
        ContentType: "application/json",
        Body: JSON.Stringify ({
            Contents: [{
                Parts: [
                    {text: "You are a title generator. You will give a succinct and compelling title for the following text. The title must not contain invalid filename characters like backslashes, forward slashes, or colons. Generate only the title as your response. The response language is Vietnamese."},
                    {text: tp. File. Content}
                ]
            }]
        })
    })). Json. Candidates[0]. Content. Parts[0]. Text.Trim ()
);
%>