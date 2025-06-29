import { AddressSearch } from '@/components/AddressSearch';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Is your water safe to drink?
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Get the latest water quality report for your address.
        </p>
        <div className="mt-10">
          <AddressSearch />
        </div>
      </div>
    </main>
  );
}
