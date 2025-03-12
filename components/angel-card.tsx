import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { useAssistant, useChat } from "@ai-sdk/react";

import { Angel } from "@/lib/types";
import mantras from "@/mantras";
import { useStore } from "@/hooks/use-store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Conversation from "./conversation";

import { angels } from "@/lib/data";
import AngelInfo from "./angel-info";

interface AngelCard {
  angel: Partial<Angel> & {
    name: string;
    symbol?: string;
    divineRealm?: string;
    celestialHierarchy?: string;
    sacredGeometry?: string;
    associatedColors?: string[];
    associatedCrystals?: string[];
    associatedHerbs?: string[];
  };
}

const assistantMap: Record<string, string> = angels.reduce((acc, angel) => {
  acc[angel.name] = angel.id || angel.name; // Upewnienie się, że ID asystenta jest poprawnie przypisane
  return acc;
}, {} as Record<string, string>);

export default function AngelCard({ angel }: AngelCard) {
  const { register, handleSubmit, reset } = useForm({});
  const selectedAssistant =
    assistantMap[angel.name as string] || "default-assistant";

  const X = Math.floor(Math.random() * Math.PI * 74);

  const assistant = useAssistant({
    api: `/api/assistant/${selectedAssistant}`,
  });

  const { messagesByAngel, updateMessages } = useStore();
  const messages = messagesByAngel[angel.name] ?? [];

  const [hasStarted, setHasStarted] = useState(false);

  // submit message
  const onSubmit = async (data: FieldValues) => {
    const text = data.message.trim();

    await updateMessages(angel.name!, {
      text,
      isUser: true,
      angelName: angel.name!,
    });
    assistant.submitMessage(text).then(() => {
      console.log("message has been sent");
    });
    setHasStarted(true);
    reset();
  };

  // if conversation has started
  useEffect(() => {
    if (messages.some((msg) => msg.isUser)) {
      setHasStarted(true);
    }
  }, [messages]);

  return (
    <div className="bg-white/10 max-w-lg w-full rounded-2xl shadow-2xl border border-indigo-500/30 relative select-none">
      <AngelInfo {...angel} />

      <div className="px-6 py-4 bg-indigo-400/30 border-t border-indigo-500/30">
        <h5 className="font-medium mb-2 text-sm text-indigo-400">
          How to Connect
        </h5>
        <p className="text-xs text-amber-100 opacity-80">
          {angel.how_to_connect}
        </p>
      </div>

      {/* Attributes & Problems */}
      <div className="px-6 py-4 bg-indigo-900/10 border-t border-indigo-500/30">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-400/20 p-4 rounded-lg border border-indigo-500/30">
            <h5 className="font-medium mb-2 text-sm text-indigo-400">
              Attributes
            </h5>
            {Array.isArray(angel.attributes) && (
              <ul className="space-y-2">
                {angel.attributes.map((attr, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-amber-100"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400/80 rounded-full"></span>
                    <span>{attr}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-indigo-400/20 p-4 rounded-lg border border-indigo-500/30">
            <h5 className="font-medium mb-2 text-sm text-indigo-400">
              Solves Problems
            </h5>
            <ul className="space-y-2">
              {angel.problems?.map((prob, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-amber-100"
                >
                  <span className="w-1.5 h-1.5 bg-amber-400/60 rounded-full mt-1"></span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {hasStarted && <Conversation messages={messages} />}
      {/* Sekcja wpisywania wiadomości */}
      <form
        className="flex items-center p-6 border-t border-indigo-500/30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("message")}
          type="text"
          placeholder=""
          className="flex-1 p-2 bg-indigo-400/30 text-amber-100 border border-indigo-500/30 rounded-lg focus:ring focus:ring-indigo-400"
        />
        <Button
          size="sm"
          className="ml-3 bg-indigo-600 hover:bg-indigo-700"
          type="submit"
        >
          Send
        </Button>
      </form>
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-950 opacity-30 z-[-1]" />
    </div>
  );
}
