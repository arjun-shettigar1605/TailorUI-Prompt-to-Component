// lingoui-backend/index.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 8000;

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the .env file");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

const cleanJsonString = (text) => {
  if (text.includes("```json")) {
    const startIndex = text.indexOf("```json") + 7;
    const endIndex = text.lastIndexOf("```");
    if (endIndex > startIndex) {
      text = text.substring(startIndex, endIndex);
    }
  }
  const startIndex = text.indexOf("{");
  const endIndex = text.lastIndexOf("}");
  if (startIndex === -1 || endIndex === -1) {
    throw new Error(
      "Fatal: Could not find any JSON object in the AI's response."
    );
  }
  return text.substring(startIndex, endIndex + 1).trim();
};

// Update buildElement function to handle self-closing tags and children
const buildElement = (element, indentationLevel = 0) => {
  const { type, props = {}, children } = element;
  const indent = "  ".repeat(indentationLevel);
  
  // Properly handle self-closing tags
  const selfClosingTags = ["input", "img", "br", "hr"];
  if (selfClosingTags.includes(type)) {
    const propsString = Object.entries(props)
      .filter(([key]) => key !== "children") // Exclude children prop
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
    return `${indent}<${type} ${propsString} />`;
  }

  const propsString = Object.entries(props)
    .filter(([key]) => key !== "children") // Exclude children prop
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  let childrenString = "";
  if (children) {
    if (typeof children === "string") {
      childrenString = children;
    } else if (Array.isArray(children)) {
      childrenString = `\n${children
        .map((child) => buildElement(child, indentationLevel + 1))
        .join("\n")}\n${indent}`;
    }
  }

  return `${indent}<${type} ${propsString}>${childrenString}</${type}>`;
};

const generateCode = (json) => {
  const { componentName, elements } = json;

  // Generate the raw JSX for the preview
  const previewCode = buildElement(elements[0], 0).trim();

  // Generate the full component file for display
  const displayCode = `import React from 'react';

const ${componentName} = () => {
  return (
${buildElement(elements[0], 4)}
  );
};

export default ${componentName};`;

  return { displayCode, previewCode };
};

app.post("/api/generate", async (req, res) => {
  console.log("Received request at /api/generate");
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: "Text description is required." });
  }

  let rawText = "";

  try {
    const masterPrompt = `
      You are a specialized API that converts user descriptions into a specific JSON format for a React UI generator. Your ONLY output must be a single, valid JSON object. Do not include any other text, explanations, apologies, or markdown formatting like \`\`\`json. Your response must begin with '{' and end with '}'.

      The JSON object you generate MUST strictly adhere to the following schema:
      {
        "componentName": "string (A PascalCase name for the component)",
        "elements": [
          {
            "type": "string (A valid HTML tag like 'div', 'h1', 'p', 'input', 'button', 'label')",
            "props": {
              "className": "string (Relevant TailwindCSS classes for modern styling)",
              "id": "string (unique id, especially for inputs)",
              "htmlFor": "string (for labels, matching an input id)",
              "type": "string (for inputs, e.g., 'text', 'password', 'email')",
              "placeholder": "string (for inputs)"
            },
            "children": "string (for text content)" OR [ /* an array of nested element objects */ ]
          }
        ]
      }

      CRITICAL RULES:
      1.  **JSON ONLY:** Output ONLY the JSON object. NO other text or wrappers.
      2.  **SCHEMA:** The root of the JSON must have 'componentName' and 'elements'. Do NOT invent other schemas.
      3.  **STYLING:** Use TailwindCSS classes within the "className" prop.
      4.  **NESTING:** The 'elements' property must be an array containing a single root element (usually a 'div'). All other elements are nested inside its 'children' array.
      5. Use ONLY standard HTML tags (div, span, h1-h6, p, input, button, label, form, img, a, etc.)
      6. For input elements, ALWAYS include: type, placeholder, and id
      7. For labels, ALWAYS include htmlFor that matches an input id
      8. DO NOT use any non-standard components or libraries
      9. For Tailwind classes:
          - Use spacing utilities (p-, m-, mt-, etc.)
          - Use flex/grid for layout (flex, flex-col, grid, gap)
          - Use color utilities (bg-, text-, border-)
          - Use shadow utilities (shadow, shadow-md)
      10. Use consistent casing for props (camelCase)
      11. ALWAYS include a root container element

      User Description: "{{USER_DESCRIPTION}}"
    `;

    const finalPrompt = masterPrompt.replace(
      "{{USER_DESCRIPTION}}",
      description
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    rawText = response.text();
    console.log("Raw AI Response:", rawText);

    const cleanedText = cleanJsonString(rawText);
    const jsonResponse = JSON.parse(cleanedText);

    // Get both code versions from the new function
    const codes = generateCode(jsonResponse);

    // Send both back to the frontend
    res.status(200).json(codes);
  } catch (error) {
    console.error("Error in generation process:", error);
    res.status(500).json({
      error: "Failed to process AI response.",
      details: error.message,
      aiResponse: rawText,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 LingoUI server is running on http://localhost:${PORT}`);
});
