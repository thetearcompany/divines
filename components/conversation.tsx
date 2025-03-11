'use client'

import { Message } from "@/hooks/use-store";
import { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { cn } from "@/lib/utils";

interface ConversationProps {
    messages: Message[]
}

export default function Conversation({ messages }: ConversationProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return (
        <div className="px-6 py-4 max-h-60 overflow-y-scroll bg-indigo-950/20 border border-indigo-500/30">
            {messages.map((msg, index) => (
                <MessageBubble key={index} text={msg.text} isUser={msg.isUser} angelName={msg.angelName} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

function MessageBubble({ text, isUser }: Message) {
    const animation = useSpring({
        // from: { opacity: 0, transform: "translateY(10px)" },
        // to: { opacity: 1, transform: "translateY(0)" },
        // config: { tension: 200, friction: 20 },
    });

    return (
<animated.div
    key={text} // 👈 Zapewnia, że każda wiadomość ma unikalny klucz, wymuszając animację
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