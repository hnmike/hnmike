<%*

let apiKey = "AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o";

  

let titlePrompt = "You are a title generator. You will give a succinct and compelling title for the following text. The title must not contain invalid filename characters like backslashes, forward slashes, or colons. Generate only the title as your response. The response language is Vietnamese.";

  

let fileContent = tp.file.content;

  

let apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + apiKey;

  

let response = await requestUrl({

method: "POST",

url: apiUrl,

contentType: "application/json",

body: JSON.stringify({

contents: [{

parts: [

{text: titlePrompt},

{text: fileContent}]
}]

})

});

  

let title = response.json.candidates[0].content.parts[0].text.trim();

await tp.file.rename(title);

%>