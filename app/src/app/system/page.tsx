"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SystemSearchPage() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const router = useRouter();
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    if (address) {
      fetch(`/api/v1/systems?address=${address}`)
        .then((res) => res.json())
        .then((data) => {
          setSystems(data);
          if (data.length > 0) {
            router.push(`/system/${data[0].pwsid}`);
          }
        });
    }
  }, [address, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center mb-10">
        Searching for water systems...
      </h1>
    </main>
  );
}
