import { useStore } from "@/hooks/use-store";
import { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { cn } from "@/lib/utils";

export default function Conversation() {
    const { messages } = useStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="px-6 py-4 max-h-60 overflow-y-auto bg-indigo-950/20 rounded-lg border border-indigo-500/30">
            {messages.map((msg, index) => (
                <MessageBubble key={index} text={msg.text} isUser={msg.isUser} />
            ))}
            <div ref={messagesEndRef} />
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
            className={`my-2 px-4 py-2 max-w-xs text-sm shadow-md ${cn(
                isUser && "bg-indigo-500 text-white self-end ml-auto",
                !isUser && "bg-indigo-800/40 text-amber-100 self-start"
            )}`}
        >
            {text}
        </animated.div>
    );
}