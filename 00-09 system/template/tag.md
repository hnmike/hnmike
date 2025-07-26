<%*

const GEMINI_API_KEY = "AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o";

  

const tag_prompt = `You are an Information Architecture expert. Your role is to analyze the provided document and generate tags based on its content. Your goal is to create tags that accurately reflect the core content to improve document classification and search efficiency.

  

## Analysis Process

1. Read and analyze the document carefully.

2. Consider the following:

- Core topics and sub-topics.

- Main concepts and themes.

- The document's context and domain.

- Potential target audience.

- Document type and purpose.

  

## Tagging Rules

1. **From Existing Tags:**

- From the provided list of existing tags, select 1-5 tags that best represent the document's main theme or frequently mentioned concepts.

- Only use tags that are an **exact match** from the existing tag list.

2. **New Tags:**

- Generate 1-3 new tags.

- Format: #<category> (e.g., #machine-learning, #natural-language-processing)

- The new tag's category should reflect the document's main topic, type, or purpose.

- It should capture unique aspects of the document not covered by existing tags.

- Avoid duplicating existing tags.

  

## Important:

- All tags must include the # prefix.

- Use specific tags, avoid generic ones.

- **Output Format: Display all generated tags on a single line, separated by commas. ONLY output the tags.**`;

  

const processTags = async (file, newTags) => {

const normalizeTags = tags => [...new Set(tags.map(tag => tag.trim().replace(/#/g, '')))];

await app.fileManager.processFrontMatter(file, (frontmatter) => {

const existingTags = frontmatter?.tags || [];

const cleanedExistingTags = Array.isArray(existingTags) ? existingTags.map(t => t.replace(/#/g, '')) : [];

const cleanedNewTags = normalizeTags(newTags);

frontmatter.tags = [...new Set([...cleanedExistingTags, ...cleanedNewTags])];

});

};

  

const fileContent = tp.file.content;

const existingTags = tp.file.tags.join(', ');

  

const response = await requestUrl({

method: "POST",

url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + "AIzaSyCOzcUDtQ8HDdivhEWxUla96MNzekSSC7o",

contentType: "application/json",

body: JSON.stringify({

contents: [{

parts: [

{text: tag_prompt},

{text: `**Existing Tags:**\n${existingTags}\n\n**Document:**\n${fileContent}`}

]

}]

})

});

  

const tags = response.json.candidates[0].content.parts[0].text.split(",");

const file = tp.config.target_file;

await processTags(file, tags);

%>