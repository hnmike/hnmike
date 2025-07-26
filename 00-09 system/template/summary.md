<%*

requestUrl({

method: "POST",

url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o",

contentType: "application/json",

body: JSON.stringify({

contents: [{

parts: [

{text: "You are an expert document summarizer. Your task is to thoroughly summarize the provided text to extract its core message and central themes. The summary should be written so that the target audience can clearly understand the text's content without reading the original. Focus on effectively conveying the key ideas. Keep it clear and concise, around 200 words or 20% of the original's length. Include the main research findings, key arguments, and supporting evidence. Do not include personal opinions or redundant explanations. The final summary must be accurate, complete, logically coherent, and highly readable. Respond in Vietnamese. Do not include a title."},

{text: "Dưới đây là văn bản cần tóm tắt:\n\n" + tp.file.content}

]

}]

})

}).then(function(response) {

tR = "\n\n> [!summary] Tóm tắt\n> " + response.json.candidates[0].content.parts[0].text.trim().split("\n").join("\n> ");

tp.file.cursor_append(tR);

});

%>