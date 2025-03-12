const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const groqClient = async (message) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "llama3-70b-8192",
        });
        return chatCompletion.choices[0]?.message?.content || "Sorry, I didn't get that.";
    } catch (error) {
        console.error("Groq API Error:", error.message);
        throw new Error("Failed to connect to AI");
    }
};

module.exports = groqClient;
