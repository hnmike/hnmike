<%*
Const content = tp. File. Content;
Const prompt = "You are a title generator. Generate a Vietnamese title for this text without special characters";

RequestUrl ({
    Method: "POST",
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o",
    ContentType: "application/json",
    Body: JSON.Stringify ({
        Contents: [{
            Parts: [{text: prompt}, {text: content}]
        }]
    })
}). Then (response => {
    Const title = response. Json. Candidates[0]. Content. Parts[0]. Text.Trim ();
    Tp.File.Rename (title);
});
%> 