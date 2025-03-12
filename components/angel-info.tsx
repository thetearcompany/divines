import { Angel } from "@/lib/types";
import mantras from "@/mantras";
import Image from "next/image";

export default function AngelInfo(angel: Angel) {
  return (
    <div className="relative p-6 text-center">
      <div className="relative p-6 text-center">
        <div className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-300 shadow-md overflow-hidden">
          <Image
            src={angel.image || "/placeholder.svg"}
            alt={angel.name!}
            width={101}
            height={101}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="text-2xl font-serif font-bold mt-4 text-indigo-400">
          {angel.name}
        </h3>
        {angel.symbol && (
          <p className="mt-2 text-lg font-semibold text-amber-300 italic">
            {angel.symbol}
          </p>
        )}

        <p className="mt-4 text-lg font-semibold text-amber-300 italic">
          "{mantras[angel.name as keyof typeof mantras]}"
        </p>

        {(angel.divineRealm || angel.celestialHierarchy) && (
          <div className="px-6 py-4 bg-indigo-900/10 border-t border-indigo-500/30">
            {angel.divineRealm && (
              <p className="text-sm text-indigo-300">
                <strong>Divine Realm:</strong> {angel.divineRealm}
              </p>
            )}
            {angel.celestialHierarchy && (
              <p className="text-sm text-indigo-300">
                <strong>Celestial Hierarchy:</strong> {angel.celestialHierarchy}
              </p>
            )}
          </div>
        )}

        {angel.sacredGeometry && (
          <div className="px-6 py-4 bg-indigo-900/10 border-t border-indigo-500/30">
            <p className="text-sm text-indigo-300">
              <strong>Sacred Geometry:</strong> {angel.sacredGeometry}
            </p>
          </div>
        )}

        {angel.associatedColors && angel.associatedColors.length > 0 && (
          <div className="px-6 py-4 bg-indigo-900/10 border-t border-indigo-500/30">
            <h5 className="font-medium mb-2 text-sm text-indigo-400">
              Associated Colors
            </h5>
            <div className="flex gap-2 items-center justify-center">
              {angel.associatedColors.map((color, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {(angel.associatedCrystals || angel.associatedHerbs) && (
          <div className="px-6 py-4 bg-indigo-900/10 border-t border-indigo-500/30 grid grid-cols-2 gap-4">
            {angel.associatedCrystals &&
              angel.associatedCrystals.length > 0 && (
                <div className="bg-indigo-400/20 p-4 rounded-lg border border-indigo-500/30">
                  <h5 className="font-medium mb-2 text-sm text-indigo-400">
                    Crystals
                  </h5>
                  <ul className="text-xs text-amber-100 space-y-1">
                    {angel.associatedCrystals.map((crystal, i) => (
                      <li key={i}>{crystal}</li>
                    ))}
                  </ul>
                </div>
              )}
            {angel.associatedHerbs && angel.associatedHerbs.length > 0 && (
              <div className="bg-indigo-400/20 p-4 rounded-lg border border-indigo-500/30">
                <h5 className="font-medium mb-2 text-sm text-indigo-400">
                  Herbs
                </h5>
                <ul className="text-xs text-amber-100 space-y-1">
                  {angel.associatedHerbs.map((herb, i) => (
                    <li key={i}>{herb}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-sm opacity-80 mt-2 px-4">{angel.description}</p>
    </div>
  );
}
