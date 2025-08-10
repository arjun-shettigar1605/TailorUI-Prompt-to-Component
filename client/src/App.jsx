// src/App.jsx
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { LiveProvider, LivePreview, LiveError } from "react-live";

// A list of prompt templates for users to try.
const promptTemplates = [
  {
    title: "Login Form",
    prompt: `Build a React functional component named LoginCard with a modern, eye-catching UI using Tailwind CSS.
        Container & Layout:
        Center the card both vertically and horizontally.
        Card background: glassmorphism style (bg-white/30 backdrop-blur-md) with a soft shadow (shadow-xl) and large rounded corners (rounded-2xl).
        Add smooth scale animation on hover (hover:scale-105 transition-transform duration-300).
        Padding: generous (px-10 py-8).
        Optional gradient border using bg-gradient-to-r from blue to purple.
        Header:
        Title: "Welcome Back!" in gradient text (bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text), large (text-3xl font-extrabold mb-2).
        Subtitle: "Log in to continue" in muted gray (text-gray-300 mb-6).
        Form Fields:
        Email label: small caps style, muted gray, slight letter spacing.
        Email input:
        Full width, rounded-xl, soft shadow, transparent background with subtle border.
        Placeholder text in light gray.
        Focus effect: glowing border in blue/purple gradient.
        Password label and input: same style as email.
        "Forgot Password?" link: aligned right, text-sm, gradient hover underline.
        Button:
        Text "Log In", bold white font.
        Full width, rounded-xl.
        Background: animated gradient from blue → purple → pink (bg-gradient-to-r animate-gradient-x).
        Hover: glow + shadow effect.
        Slight press animation (active:scale-95).
        Extras:
        Social login buttons (Google, Facebook) with icons, outlined style, hover background change.
        Divider with text "OR" using thin horizontal lines on both sides.
        Subtext: "Don't have an account? Sign Up" with "Sign Up" as a clickable gradient link.
        No logic or state — just JSX and Tailwind classes for styling.`,
  },
  {
    title: "Registration Card",
    prompt: `Build a React functional component named RegistrationCard with a clean, modern UI using Tailwind CSS.
        Container & Layout:
        Center the card both vertically and horizontally.
        Card background: glassmorphism style (bg-white/30 backdrop-blur-md) with shadow-2xl and large rounded corners (rounded-2xl).
        Smooth hover animation (hover:scale-105 transition-transform duration-300).
        Padding: generous (px-10 py-8).
        Header:
        Title: "Create Your Account" in gradient text (bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text), large (text-3xl font-extrabold mb-4).
        Step indicator at the top: three connected circles, active step highlighted with glow.
        Form Fields:
        Four labeled inputs: Name, Email, Password, Confirm Password.
        Inputs: full width, rounded-xl, transparent background, subtle border, glowing gradient focus.
        "Show Password" toggle icon inside password fields.
        Progress Bar:
        Thin, rounded progress bar at the bottom showing completion percentage.
        Button:
        Text "Next", white bold font.
        Full width, rounded-xl.
        Gradient background (from-green-400 to-blue-500), hover glow and shadow.
        Press animation (active:scale-95).
        Footer:
        Text: "Already have an account? Log In" with clickable gradient link.
        No logic — purely JSX and Tailwind styling.`,
  },
  {
    title: "Pricing Card",
    prompt: `Build a React functional component named PricingCard with an elegant pricing layout using Tailwind CSS.
        Container & Layout:
        White background card, shadow-xl, rounded-2xl, centered alignment.
        Hover effect: subtle scale-up and shadow glow.
        Padding: (p-8).
        Header:
        Plan name (e.g., "Pro") in bold uppercase.
        Optional badge "Most Popular" with gradient background (from-pink-500 to-yellow-500).
        Price Section:
        Price in large font (text-4xl font-extrabold) with gradient text (from-pink-500 to-orange-500).
        Smaller subtext for “per month” or “per year”.
        Features List:
        Bullet list with green check icons, spaced apart.
        Muted gray text for features.
        Button:
        Text "Choose Plan" in bold white.
        Full width, rounded-xl.
        Gradient background (from-pink-500 to-orange-500), hover shadow and glow.
        Footer:
        Small note "Billed annually, cancel anytime" in muted gray text.
        No logic or state — just JSX and Tailwind classes for styling.`,
  },
  {
    title: "Profle Card",
    prompt: `Build a React functional component named ProfileCard with a clean, modern design using Tailwind CSS.
        Container & Layout:
        Centered card with white background (bg-white) and shadow (shadow-lg) plus rounded-2xl corners.
        Padding: (px-8 py-6), max width 350px.
        Subtle hover effect (hover:shadow-xl hover:scale-105 transition duration-300).
        Header:
        Name in bold large font (text-xl font-bold mb-1).
        Role or title in muted gray (text-gray-500 mb-4).
        Content:
        Short bio paragraph with text-gray-600 text-sm leading-relaxed.
        List of skills as small pill-shaped tags (bg-gray-200 px-3 py-1 rounded-full text-sm).
        Footer:
        Two buttons: "Contact" (blue gradient) and "View Profile" (outlined with hover background).
        Full width, rounded-md, hover glow effects.
        No logic or state — just JSX and Tailwind classes for styling.`,
  },
  {
    title: "Stats Card",
    prompt: `Build a React functional component named StatsCard with a clean, modern metrics display using Tailwind CSS.
Container & Layout
Card width: w-64 (~256px) with fixed height to match design balance.
Background: solid white (bg-white).
Rounded corners: extra-large (rounded-xl).
Shadow: large soft shadow (shadow-lg).
Padding: comfortable (p-6).
Layout: vertical flex (flex flex-col items-start gap-4).
Hover: slight lift and shadow deepening (hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out).
Header (Label)
Text: uppercase label such as "Monthly Revenue" or "Active Users".
Font: small size (text-sm), bold (font-semibold).
Color: muted gray (text-gray-500).
Letter spacing: slight (tracking-wide).
Main Stat
Large, bold number in gradient text (text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent).
Optional trend indicator:
Up arrow: ▲ in green (text-green-500).
Down arrow: ▼ in red (text-red-500).
Percentage change: small (text-sm font-medium), aligned next to arrow with slight left margin (ml-1).
Footer (Additional Info)
Text: small secondary detail like "Compared to last month" or "Updated 5 mins ago".
Font: extra small (text-xs), medium weight (font-medium).
Color: lighter gray (text-gray-400).
Optional subtle icon (e.g., clock for “updated recently”) in muted gray before the text.
Extras
Entire card clickable (optional) with cursor-pointer and focus ring effect (focus:outline-none focus:ring-2 focus:ring-blue-400).
Can optionally stack multiple StatsCard components in a grid (grid grid-cols-3 gap-6).`,
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const initialDisplayCode =
    "// Your generated component code will appear here.";
  const [displayCode, setDisplayCode] = useState(initialDisplayCode);
  const [previewCode, setPreviewCode] = useState(
    "<div>Your live preview will appear here.</div>"
  );

  const handleGenerate = async () => {
    if (!description) {
      alert("Please enter a description for the UI component.");
      return;
    }
    setIsLoading(true);
    setDisplayCode("// Generating...");
    setPreviewCode("<div>...</div>");

    try {
      const response = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = `// Backend Error: ${
          data.details || "Unknown error"
        }\n\n// AI Raw Response:\n/*\n${
          data.aiResponse || "Not available."
        }\n*/`;
        throw new Error(errorMessage);
      }

      setDisplayCode(data.displayCode);
      setPreviewCode(data.previewCode);
    } catch (error) {
      console.error("An error occurred:", error);
      setDisplayCode(error.message);
      setPreviewCode("<div>Error</div>");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for the "Copy Code" button
  const handleCopyCode = () => {
    navigator.clipboard.writeText(displayCode);
    setCopyButtonText("Copied!");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000); // Reset text after 2 seconds
  };

  // Handler for clicking a prompt template
  const handleTemplateClick = (prompt) => {
    setDescription(prompt);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <header className="bg-gray-800/70 backdrop-blur-lg border-b border-gray-700 p-4 sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
          LingoUI ✨
        </h1>
        <p className="text-center text-gray-400 mt-1">
          Describe a UI component, get live code and a preview.
        </p>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {/* Input Section */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 ring-1 ring-white/10">
          <textarea
            rows="4"
            className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300"
            placeholder="e.g., a login form with email, password, and a submit button"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Or try a template...
            </h3>
            <div className="flex flex-wrap gap-2">
              {promptTemplates.map((template) => (
                <button
                  key={template.title}
                  onClick={() => handleTemplateClick(template.prompt)}
                  className="px-3 py-1 bg-gray-700 hover:bg-cyan-800/50 text-gray-300 hover:text-cyan-300 rounded-full text-sm transition-all duration-200"
                >
                  {template.title}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out disabled:bg-gray-600/50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </>
            ) : (
              "Generate Component"
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Panel uses previewCode */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 ring-1 ring-white/10">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Preview
            </h2>
            <div className="bg-white rounded-md p-4 min-h-[300px] w-full flex items-center justify-center">
              <LiveProvider code={previewCode} scope={{}}>
                <LivePreview className="w-full" />
                <LiveError className="text-red-500 mt-2 text-sm" />
              </LiveProvider>
            </div>
          </div>

          {/* Code Panel uses displayCode */}
          <div className="bg-gray-800 rounded-lg shadow-lg ring-1 ring-white/10 relative">
            <div className="flex justify-between items-center border-b border-gray-700 p-6 pb-2">
              <h2 className="text-2xl font-semibold mb-2">Code</h2>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md text-sm transition-all duration-200"
              >
                {copyButtonText}
              </button>
            </div>
            <div className="h-auto overflow-auto p-2">
              <SyntaxHighlighter
                language="jsx"
                style={atomOneDark}
                customStyle={{ margin: 0, background: "transparent" }}
              >
                {displayCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
