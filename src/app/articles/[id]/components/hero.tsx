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
  const firstTopic = Array.isArray(topic)
    ? topic[0]
    : topic.split(",")[0]?.trim();

  return (
    <section className="hero-section">
      <div className="hero-content w-3/4">
        <h1 className="text-8xl font-black">{title}</h1>
        <div className="hero-meta py-5 flex gap-3">
          <p className="italic text-lg underline">{author},</p>
          <p className="text-lg italic">Date: {date}</p>
          <div className="ml-5">
            <span className="topic capitalize italic">Topics: <span className="underline cursor-pointer">{firstTopic}</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
