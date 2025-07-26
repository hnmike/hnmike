<%*
// IMPORTANT: Replace with your actual API key!
Const GEMINI_API_KEY="AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o";

// --- English Tag Generation Prompt ---
Const tag_prompt = `You are an Information Architecture expert. Your role is to analyze the provided document and generate tags based on its content. Your goal is to create tags that accurately reflect the core content to improve document classification and search efficiency.

## Analysis Process
1.  Read and analyze the document carefully.
2.  Consider the following:
    - Core topics and sub-topics.
    - Main concepts and themes.
    - The document's context and domain.
    - Potential target audience.
    - Document type and purpose.

## Tagging Rules
1.  **From Existing Tags:**
    - From the provided list of existing tags, select 1-5 tags that best represent the document's main theme or frequently mentioned concepts.
    - Only use tags that are an **exact match** from the existing tag list.
2.  **New Tags:**
    - Generate 1-3 new tags.
    - Format: #<category> (e.g., #machine-learning , #natural-language-processing )
    - The new tag's category should reflect the document's main topic, type, or purpose.
    - It should capture unique aspects of the document not covered by existing tags.
    - Avoid duplicating existing tags.

## Important:
- All tags must include the # prefix.
- Use specific tags, avoid generic ones.
- **Output Format: Display all generated tags on a single line, separated by commas. ONLY output the tags.**`;

// Function to process and add tags to frontmatter
Const processTags = async (file, newTags) => {
  const normalizeTags = tags => [... New Set (tags.Map (tag => tag.Trim (). Replace (/ #/g , '')))];
  
  Await tp.App.FileManager.ProcessFrontMatter (file, (frontmatter) => {
    Const existingTags = frontmatter?. Tags || [];
    const cleanedExistingTags = Array.IsArray (existingTags) ? ExistingTags.Map (t => t.replace (/ #/g , '')) : [];
    Const cleanedNewTags = normalizeTags (newTags);
    Frontmatter. Tags = [... New Set ([... CleanedExistingTags, ... CleanedNewTags])];
  });
};

// Get current note's content and existing tags
Const fileContent = tp. File. Content;
Const existingTags = tp.File.Tags.Join (', ');

// Send request to Gemini API
Const response = await tp.Obsidian.RequestUrl ({
    Method: "POST",
    // MODIFIED URL FOR GEMINI 2.5 PRO
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

// Extract tags and update the file
Const tags = response. Json. Candidates[0]. Content. Parts[0]. Text.Split (",");
Const file = tp. Config. Target_file;
Await processTags (file, tags);
%>