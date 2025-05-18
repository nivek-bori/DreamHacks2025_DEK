import AIResponse from "@/lib/explanation/ai";

export async function POST(request) {
    try {
        const { userMessage } = await request.json();

        if (!userMessage) {
            return new Response(JSON.stringify({ error: "Missing userMessage" }), { status: 400, headers: { "Content-Type": "application/json" } });
        }

        const aiResponse = await AIResponse(userMessage);
        return new Response(JSON.stringify({ response: aiResponse.data }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("API Route Error:", error);
        return new Response(JSON.stringify({ error: "Failed to get AI response" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}
