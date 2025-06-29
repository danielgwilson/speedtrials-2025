"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function AddressSearch() {
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (address) {
      router.push(`/system?address=${address}`);
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button type="submit" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
