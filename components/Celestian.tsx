import { useEffect, useState } from "react";
import { useStore } from "@/hooks/use-store";
import { useSpring, animated } from "@react-spring/web";

interface CelestianProps {
    id: string;
}

export default function Celestian({ id }: CelestianProps) {
    const { messagesByAngel } = useStore();
    const messages = messagesByAngel[id] || [];
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
    
        if (lastMessage && !lastMessage.isUser) {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 2000);
        }
    }, [messages]);

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
                <animated.pre style={typingAnimation} className="text-sm italic text-gray-400 mt-2">
                    <span>Celestian pisze...</span>
                </animated.pre>
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