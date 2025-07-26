
<%*

// Generate Vietnamese title and rename note

tp.obsidian.requestUrl({

method: "POST",

url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o",

contentType: "application/json",

body: JSON.stringify({

contents: [{

parts: [

{text: "You are a title generator. You will give a succinct and compelling title for the following text. The title must not contain invalid filename characters like backslashes, forward slashes, or colons. Generate only the title as your response. "},

{text: tp.file.content}

]

}]

})

}).then(function(r){

// Add date prefix

tp.file.rename(

tp.date.now("YYYYMMDDHHmm") + " " +

r.json.candidates[0].content.parts[0].text

.trim()

.replace(/[\/\\:]/g, " - ")

);

});

%>