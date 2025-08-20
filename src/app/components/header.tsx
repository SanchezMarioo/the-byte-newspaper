import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4">
      <div className="grid grid-cols-3 h-32 border-b border-white">
        {/* Columna 1: Título principal */}
        <div className="border-r border-white flex items-center justify-center">
          <h1 className="text-8xl font-bold font-display">The Byte</h1>
        </div>
        
        {/* Columna 2: Descripción */}
        <div className="border-r border-white flex flex-col justify-center px-6 font-display">
          <h2 className="text-lg font-semibold mb-1">Front-end education</h2>
          <p className="text-lg">for the real world.</p>
          <p className="text-sm italic mt-2">Since 2018.</p>
        </div>
        
        {/* Columna 3: Información adicional */}
        <div className="flex items-end justify-start font-display p-5">
          <p className="text-mds">
            From <a href="https://mariosanchez.store" className="underline font-semibold">mariosanchez.store</a>
          </p>
        </div>
      </div>
      <nav className="mt-4 p-4">
        <ul className="flex space-x-4 font-display text-stone-400 text-md">
          <li><Link href="/" className="text-stone-400 hover:underline">Articles</Link></li>
          <li><Link href="/about" className="text-stone-400 hover:underline">Links</Link></li>
          <li><Link href="/contact" className="text-stone-400 hover:underline">Courses</Link></li>
          <li><Link href="/contact" className="text-stone-400 hover:underline">Newsletter</Link></li>
        </ul>
      </nav>
    </header>
  );
}
