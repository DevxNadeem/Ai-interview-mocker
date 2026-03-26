import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content;

    return Response.json({ text });

  } catch (error) {
    console.error("🔥 Groq Error:", error);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}