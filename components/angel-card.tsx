import { Angel } from "@/lib/types";
import Image from "next/image";
import { Button } from "./ui/button";
import mantras from "@/mantras";
import { useStore } from "@/hooks/use-store";
import { Input } from "./ui/input";
import { useCallback, useEffect } from "react";
import {useForm} from 'react-hook-form';

interface AngelCard {
    angel: Partial<Angel>
}

export default function AngelCard({ angel }: AngelCard) {

    const {message, messages, setMessage, updateMessages} = useStore();
    const { register, handleSubmit, formState: { errors , isSubmitSuccessful} } = useForm();

    const onSubmit = (query: string) => {
        setMessage(query);
    }

    useEffect(() => {
        if(isSubmitSuccessful) {
            updateMessages(message);
        }
    }, [isSubmitSuccessful]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value), [message]);
    return <div
        className="bg-white/10 max-w-lg w-full rounded-2xl shadow-2xl border border-indigo-500/30 relative"
    >
        {/* Header with Image */}
        <div className="relative p-6 text-center">
            <div className="relative p-6 text-center">
                <div className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-300 shadow-md">
                    <Image
                        src={angel.image || "/placeholder.svg"}
                        alt={angel.name!}
                        width={101}
                        height={101}
                        className="object-cover w-full h-full"
                    />
                </div>
            <h3 className="text-2xl font-serif font-bold mt-4 text-indigo-400">{angel.name}</h3>
                <p className="mt-4 text-lg font-semibold text-amber-300 italic">
                    "{mantras[angel.name as keyof typeof mantras]}"
                </p>
            </div>
            <p className="text-sm opacity-80 mt-2 px-4">{angel.description}</p>
        </div>


        <div className="px-6 py-4 bg-indigo-400/30 border-t border-indigo-500/30">
            <h5 className="font-medium mb-2 text-sm text-indigo-400">How to Connect</h5>
            <p className="text-xs text-amber-100 opacity-80">{angel.how_to_connect}</p>
        </div>

        {/* Attributes & Problems */}
        <div className="px-6 py-4 bg-indigo-900/10 border-t border-indigo-500/30">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-400/20 p-4 rounded-lg border border-indigo-500/30">
                    <h5 className="font-medium mb-2 text-sm text-indigo-400">Attributes</h5>
                    {Array.isArray(angel.attributes) && (
                        <ul className="space-y-2">
                            {angel.attributes.map((attr, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-amber-100">
                                    <span className="w-1.5 h-1.5 bg-amber-400/80 rounded-full"></span>
                                    <span>{attr}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="bg-indigo-400/20 p-4 rounded-lg border border-indigo-500/30">
                    <h5 className="font-medium mb-2 text-sm text-indigo-400">Solves Problems</h5>
                    <ul className="space-y-2">
                        {angel.problems?.map((prob, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-amber-100">
                                <span className="w-1.5 h-1.5 bg-amber-400/60 rounded-full mt-1"></span>
                                <span>{prob}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        {/* Sekcja wpisywania wiadomości */}
        <form className="flex items-center p-6 border-t border-indigo-500/30" {...register} onSubmit={handleSubmit(onSubmit)}>
            <Input
                value={message}
                onChange={handleInputChange}
                type="text"
                placeholder=""
                className="flex-1 p-2 bg-indigo-400/30 text-amber-100 border border-indigo-500/30 rounded-lg focus:ring focus:ring-indigo-400"
            />
            <Button size="sm" className="ml-3 bg-indigo-600 hover:bg-indigo-700">
                Send
            </Button>
        </form>
        {/* Dynamic Background Glow */}
        <div className="divine-light left-0 right-0 bottom-0 top-0 absolute to-indigo-950 z-[-1]" />
    </div>
}