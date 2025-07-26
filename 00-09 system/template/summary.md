<%*

async function generateTitle() {

const apiKey = "AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o";

const titlePrompt = "You are a title generator. You will give a succinct and compelling title for the following text. The title must not contain invalid filename characters like backslashes, forward slashes, or colons. Generate only the title as your response. The response language is Vietnamese.";

const fileContent = tp.file.content;

const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + apiKey;

  

const response = await requestUrl({

method: "POST",

url: apiUrl,

contentType: "application/json",

body: JSON.stringify({

contents: [{

parts: [

{text: titlePrompt},

{text: fileContent}

]

}]

})

});

  

const title = response.json.candidates[0].content.parts[0].text.trim();

await tp.file.rename(title);

}

  

await generateTitle();

%>