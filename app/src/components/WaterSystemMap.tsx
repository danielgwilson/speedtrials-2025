"use client";

export function WaterSystemMap({ systems, onSelectSystem }: { systems: any[], onSelectSystem: (system: any) => void }) {
  return (
    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Map will be here</p>
      <ul>
        {systems.map((system) => (
          <li key={system.pwsid} onClick={() => onSelectSystem(system)} className="cursor-pointer hover:underline">
            {system.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
