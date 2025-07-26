
<%*
FileText = tp.File.Content;
ApiKey = "AIzaSyCOzcUDtQ 8 HDdivhEWxUla 96 MNzekSSC 7 o";
Prompt = "Generate Vietnamese title for this text";

fetch ("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey, {
  Method: "POST",
  Headers: {"Content-Type": "application/json"},
  Body: '{"contents":[{"parts":[{"text": "' + prompt + '"},{"text": "' + fileText + '"}]}]}'
})
.then (res => res.Json ())
.then (data => tp.File.Rename (data. Candidates[0]. Content. Parts[0]. Text));
%> 