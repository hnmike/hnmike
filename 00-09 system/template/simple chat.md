<%_*

// --- Configuration ---

// Set your Dify environment variables here.

  

// 1. Dify Host URL

// For Dify Cloud, use "https://api.dify.ai". For self-hosted, use your own URL.

const HOST_URL = "https://api.dify.ai";

  

// 2. Your Dify API Key

// Get this from your Dify account: Settings -> API Keys

const DIFY_API_KEY = "app-1GVkq0ZbOz19WCxBsL3fGr3e";

  

// 3. Dify Application Type

// Choose one: "chat", "agent", "workflow", or "completion"

const DIFY_TYPE = "chat";

  

// 4. Dify Application Name

// This name will be used in the output title (e.g., in the callout header).

const DIFY_APP_NAME = "Dify Assistant";

  

// 5. (Advanced) Additional User Inputs

// Use this for workflows that require multiple input variables. For simple chats, leave it empty: {}

const USER_INPUTS = {};

  

// --- End of Configuration ---

  
  

// Select the output option

const user_output_option = await tp.system.suggester(

["Callout", "Markdown"],

["Callout", "Markdown"],

true,

"Select an output format:");

const USE_CALLOUT = user_output_option === "Callout";

  

// Function to create the correct API URL based on the application type

function createApiUrl() {

switch(DIFY_TYPE) {

case "workflow": return `${HOST_URL}/v1/workflows/run`;

case "agent":

case "chat": return `${HOST_URL}/v1/chat-messages`;

case "completion": return `${HOST_URL}/v1/completion-messages`;

default: throw new Error(`Invalid Dify type: ${DIFY_TYPE}`);

}

}

  

// Function to call the Dify API and get the generated content

async function generateWithDify(content) {

try {

const data = {

query: content,

inputs: USER_INPUTS,

response_mode: "streaming",

user: "obsidian_user", // You can change this user identifier

conversation_id: "",

};

  

console.log("Sending data to Dify:", JSON.stringify(data));

console.log("API URL:", createApiUrl());

  

const response = await tp.obsidian.requestUrl({

method: "POST",

url: createApiUrl(),

contentType: "application/json",

headers: {

"Authorization": `Bearer ${DIFY_API_KEY}`,

},

body: JSON.stringify(data)

});

  

// Handle the streaming response from Dify

const lines = response.text.split('\n');

let result = '';

  

for (const line of lines) {

if (line.startsWith('data: ')) {

try {

const parsedData = JSON.parse(line.replace('data: ', ''));

// This logic handles different event types from the Dify streaming API

if (parsedData.event === 'text_chunk') {

result += parsedData.data.text;

} else if (['agent_message', 'message', 'completion'].includes(parsedData.event)) {

if (parsedData.answer) {

result += parsedData.answer;

} else if (parsedData.data?.text) {

result += parsedData.data.text;

}

} else if (parsedData.event === 'workflow_finished') {

result += parsedData.data.outputs.output;

}

} catch (e) {

console.error('Error parsing streaming data:', e);

}

}

}

return result || null;

  

} catch (error) {

console.error('Error calling Dify API:', error);

new Notice("Error calling Dify API. Check console for details.");

return null;

}

}

  

// Function to separate frontmatter from the main content of the note

function separateFrontmatterAndContent(fullContent) {

const match = fullContent.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)/);

if (!match) {

return { frontmatter: '', content: fullContent };

}

return {

frontmatter: match[1],

content: match[2]

};

}

  

// Main execution block

async function main() {

const file = tp.config.target_file;

const fileContent = await tp.file.content;

try {

new Notice("Sending content to Dify...");

const response = await generateWithDify(fileContent);

if (!response) {

throw new Error('Dify API call failed or returned empty response.');

}

new Notice("Dify response received. Updating note...");

console.log('Dify API call completed successfully.');

  

// Separate the existing frontmatter and content

const { frontmatter, content } = separateFrontmatterAndContent(fileContent);

  

let newContent;

if (USE_CALLOUT) {

// Format the output as a callout block

const difyCallout = `> [!${DIFY_APP_NAME}]\n${response.split('\n').map(line => `> ${line}`).join('\n')}\n\n`;

if (frontmatter) {

newContent = `---\n${frontmatter}\n---\n\n${difyCallout}${content.trimStart()}`;

} else {

newContent = `${difyCallout}${content.trimStart()}`;

}

} else {

// Format the output as standard Markdown

const markdownResponse = `\n---\n## ✅ ${DIFY_APP_NAME}\n\n${response}\n\n---\n`;

if (frontmatter) {

newContent = `---\n${frontmatter}\n---\n\n${markdownResponse}${content.trimStart()}`;

} else {

newContent = `${markdownResponse}${content.trimStart()}`;

}

}

  

// IMPORTANT: This replaces the entire content of the current note

await app.vault.modify(file, newContent);

return true;

  

} catch (error) {

console.error('Error during main execution:', error);

new Notice("An error occurred. Check the developer console.");

return false;

}

}

  

// Run the main function

main();

_%>