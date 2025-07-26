<%* const GEMINI_API_KEY = "AIzaSyCOzcUDtQ 8 HDdivhEWxUla 96 MNzekSSC 7 o";


Const processTags = async (file, newTags) => {
  const normalizeTags = tags => [... New Set (tags.Map (tag => tag.Trim (). Replace (/ #/g , '')))];
  
  Await tp.App.FileManager.ProcessFrontMatter (file, (frontmatter) => {
    Const existingTags = frontmatter?. Tags || [];
    const cleanedExistingTags = Array.IsArray (existingTags) ? ExistingTags.Map (t => t.replace (/ #/g , '')) : [];
    Const cleanedNewTags = normalizeTags (newTags);
    Frontmatter. Tags = [... New Set ([... CleanedExistingTags, ... CleanedNewTags])];
  });
};

Const fileContent = tp.File.Content;
Const existingTags = tp.File.Tags.Join (', ');

Const response = await tp.Obsidian.RequestUrl ({
    Method: "POST",
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=" + GEMINI_API_KEY,
    ContentType: "application/json",
    Body: JSON.Stringify ({
        Contents: [{
            Parts: [
                {text: tag_prompt},
                {text: `**Existing Tags:**\n${existingTags}\n\n**Document:**\n${fileContent}`}
            ]
        }]
    })
});

Const tags = response. Json. Candidates[0]. Content. Parts[0]. Text.Split (",");
Const file = tp. Config. Target_file;
Await processTags (file, tags);
%>