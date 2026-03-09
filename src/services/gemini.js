// Foliomate Free AI Engine Integration
// Using a keyless API for out-of-the-box readiness

export const generateGeminiResponse = async (prompt, chatHistory = []) => {
  try {
    // We are using Pollinations AI, a free public text generation API. This allows 
    // Foliomate to work out of the box with zero API keys required for deployment.
    
    // Construct context from chat history
    let context = "You are Foliomate, a helpful, highly skilled web design AI assistant. Keep responses professional, helpful, and formatted nicely in markdown when relevant.\n\n";
    
    // Append recent history for context
    if (chatHistory.length > 0) {
      const recentHistory = chatHistory.slice(-4); // Last 4 interactions to keep it concise
      recentHistory.forEach(msg => {
        context += `${msg.role === 'assistant' ? 'Foliomate' : 'User'}: ${msg.text}\n`;
      });
    }
    
    const fullPrompt = `${context}\nUser: ${prompt}\nFoliomate:`;

    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are Foliomate, a highly skilled and professional web design AI assistant. You help users build portfolios, write bios, and pick templates. Do not mention Google Gemini or any other company." },
          { role: "user", content: fullPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return text || "I'm sorry, I couldn't generate a response at this time.";

  } catch (error) {
    console.error("Foliomate AI Error:", error);
    
    // Failsafe offline responses just in case the fast API is unreachable
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('bio') || lowerPrompt.includes('about me')) {
      return "Here's a professional bio you can use:\n\n*\"I am a passionate creative professional dedicated to building seamless and engaging digital experiences. With a strong eye for detail and a focus on user-centric design, I transform complex problems into elegant solutions.\"*";
    }
    return "I am currently experiencing high network traffic! But as Foliomate, I can tell you that using the **Split** template with the **Emerald** theme color is an excellent choice for a modern portfolio.";
  }
};
