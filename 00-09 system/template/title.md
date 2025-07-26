<%*

// IMPORTANT: Replace with your actual API key!

const GEMINI_API_KEY = "AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o";

  

// --- English Title Generation Prompt ---

const title_prompt = `You are a title generator.

You will give a succinct and compelling title for the following text.

The title must not contain invalid filename characters like backslashes (\), forward slashes (/), or colons (:).

Generate only the title as your response.

The response language is Vietnamese.`;

  

// Get the content of the current note

const fileContent = tp.file.content;

  

// Send request to Gemini API

const response = await requestUrl({

method: "POST",

// MODIFIED URL FOR GEMINI 2.0 FLASH

url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + GEMINI_API_KEY,

contentType: "application/json",

body: JSON.stringify({

contents: [{

parts: [

{text: title_prompt},

{text: fileContent}

]

}]

})

});

  

// Extract title and rename the file

const title = response.json.candidates[0].content.parts[0].text.trim();

await tp.file.rename(title);

%>