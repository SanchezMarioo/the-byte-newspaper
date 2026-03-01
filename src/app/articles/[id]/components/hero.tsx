import Link from "next/link";

type HeroSectionProps = {
  title: string;
  author: string;
  date: string;
  topic: string | string[];
};

export default function HeroSection({
  title,
  author,
  date,
  topic,
}: HeroSectionProps) {
  const topics = Array.isArray(topic)
    ? topic.filter(Boolean)
    : topic.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <section className="py-10 border-t border-black dark:border-white">
      {/* Tags */}
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {topics.map((tag, i) => (
            <span
              key={i}
              className="border border-black dark:border-white px-2 py-1 text-xs font-semibold uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Título */}
      <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-10">
        {title}
      </h1>

      {/* Metadatos + línea amarilla */}
      <div className="flex flex-wrap items-center gap-3 text-sm pb-8 border-b-4 border-yellow-400">
        <Link
          href={`/authors/${encodeURIComponent(author)}`}
          className="font-semibold italic hover:underline hover:decoration-yellow-400"
        >
          {author}
        </Link>
        <span className="text-gray-400 dark:text-gray-500">·</span>
        <span className="text-gray-600 dark:text-gray-400">{date}</span>
      </div>
    </section>
  );
}
