import { useEffect, useState } from "react";
import { useStore } from "@/hooks/use-store";
import { useSpring, animated } from "@react-spring/web";
import { openai } from "@/lib/openai"; // Import OpenAI API

export default function Celestian() {
    const { messages, updateMessages, newMessage } = useStore();
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (newMessage) {
            setIsTyping(true);
            fetchCelestianResponse(newMessage.text);
        }
    }, [newMessage]);

    const fetchCelestianResponse = async (userMessage: string) => {
        try {
            const response = await openai.createChatCompletion({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "Jesteś Celestianem, aniołem światła i mądrości. Odpowiadaj duchowo i inspirująco." },
                    ...messages.map(msg => ({ role: msg.isUser ? "user" : "assistant", content: msg.text })),
                    { role: "user", content: userMessage },
                ],
                temperature: 0.7,
                max_tokens: 100,
            });

            const botMessage = response.data.choices[0]?.message?.content || "Nie rozumiem, spróbuj inaczej.";
            updateMessages({ text: botMessage, isUser: false });
        } catch (error) {
            console.error("Błąd OpenAI:", error);
            updateMessages({ text: "Przepraszam, nie mogę teraz odpowiedzieć.", isUser: false });
        } finally {
            setIsTyping(false);
        }
    };

    const typingAnimation = useSpring({
        opacity: isTyping ? 1 : 0,
        transform: isTyping ? "translateY(0px)" : "translateY(5px)",
        config: { tension: 180, friction: 12 },
    });

    return (
        <div className="p-6 bg-indigo-950/20 rounded-lg border border-indigo-500/30 max-h-64 overflow-y-auto">
            {messages.map((msg, index) => (
                <MessageBubble key={index} text={msg.text} isUser={msg.isUser} />
            ))}

            {isTyping && (
                <animated.p style={typingAnimation} className="text-sm italic text-gray-400 mt-2">
                    Celestian pisze...
                </animated.p>
            )}
        </div>
    );
}

function MessageBubble({ text, isUser }: { text: string; isUser: boolean }) {
    const animation = useSpring({
        opacity: 1,
        transform: "translateY(0px)",
        from: { opacity: 0, transform: "translateY(10px)" },
        config: { tension: 200, friction: 20 },
    });

    return (
        <animated.div
            style={animation}
            className={`my-2 px-4 py-2 max-w-xs text-sm rounded-lg shadow-md ${
                isUser ? "bg-indigo-500 text-white self-end ml-auto" : "bg-indigo-800/40 text-amber-100 self-start"
            }`}
        >
            {text}
        </animated.div>
    );
}