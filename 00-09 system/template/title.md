<%*
ApiKey = "AIzaSyCOzcUDtQ 8 HDdivhEWxUla 96 MNzekSSC 7 o";
FileContent = tp. File. Content;
apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + apiKey;

RequestBody = '{"contents":[{"parts":[{"text": "Generate a Vietnamese title for this text"},{"text": "' + fileContent.Replace (/"/g, '\\"') + '"}]}]}';

RequestUrl ({
  Method: "POST",
  Url: apiUrl,
  ContentType: "application/json",
  Body: requestBody
}). Then (function (response) {
  Title = response. Json. Candidates[0]. Content. Parts[0]. Text;
  Tp.File.Rename (title);
});
%> 