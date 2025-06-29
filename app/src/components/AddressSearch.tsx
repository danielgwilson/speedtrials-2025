'use client';

import { useState } from 'react';
import { findWaterSystems } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function AddressSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    const systems = await findWaterSystems(query);
    setResults(systems);
  };

  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter your address..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" onClick={handleSearch}>Search</Button>
      </div>
      <div className="mt-4">
        {results.map((system) => (
          <div key={system.pwsid}>
            <a href={`/system/${system.pwsid}`}>
              {system.name} - {system.city}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
