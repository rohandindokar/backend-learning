// utils/groqClient.js

const Groq = require("groq-sdk");

// Initialize Groq client with API Key (stored securely in .env)
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, // Make sure to set this in your .env file
});

/**
 * Function to send message to Groq LLM and get AI response
 * @param {string} message - User's message input for chatbot
 * @returns {Promise<string>} - AI-generated reply from Groq
 */
const groqClient = async (message) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama3-70b-8192", // You can replace this with exact Groq model name, e.g., llama-3.3-70b-versatile
        });

        // Extract and return the AI's message content
        return chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't understand. Can you rephrase?";
    } catch (error) {
        console.error("Groq API Error:", error.message);
        throw new Error("Failed to connect with AI assistant. Please try again later.");
    }
};

module.exports = groqClient;
