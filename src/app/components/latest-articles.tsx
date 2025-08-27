"use client";

export function LatestArticles() {
    const noticias = [
  {
    author: "Jane Smith",
    date: "2025-08-27",
    title: "AI Revolutionizes Web Development",
    description: "Artificial Intelligence tools are streamlining coding and design, opening new possibilities for developers worldwide.",
    tags: ["technology", "web development", "AI"]
  },
  {
    author: "Carlos García",
    date: "2025-08-27",
    title: "Next.js 15: What’s New",
    description: "The latest Next.js brings enhanced performance, native middleware, and simplified routing for modern web applications.",
    tags: ["Next.js", "frameworks", "performance"]
  },
  {
    author: "Akira Tanaka",
    date: "2025-08-26",
    title: "Strapi CMS: Going Headless Is Mainstream",
    description: "Strapi cements its position as a leading headless CMS, now with real-time content editing and multilingual support.",
    tags: ["Strapi"]
  },
  {
    author: "Sophie Dubois",
    date: "2025-08-26",
    title: "Freelancing: New Platforms On The Rise",
    description: "Emerging freelance platforms challenge established giants, offering better tools and more transparency for creatives.",
    tags: ["entrepreneurship"]
  },
  {
    author: "Mohamed El-Sayed",
    date: "2025-08-25",
    title: "Cybersecurity Trends 2025",
    description: "Privacy and data protection dominate this year’s cybersecurity scene, pushing new standards for users and organizations.",
    tags: ["cybersecurity"]
  },
  {
    author: "Laura Rossi",
    date: "2025-08-25",
    title: "Remote Work: Evolution Continues",
    description: "New tools and platforms make remote collaboration seamless, fueling productivity for global teams.",
    tags: ["remote work"]
  },
  {
    author: "David Miller",
    date: "2025-08-24",
    title: "Green Tech: Sustainability in Focus",
    description: "Sustainable solutions and green technologies are gaining traction, reshaping industries and consumer habits.",
    tags: ["sustainability"]
  }
];


    return (
        <section className="bg-stone-200 dark:bg-[#181617] text-black dark:text-white py-0 transition-colors duration-300 mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20" style={{maxWidth: '70%', margin: '0 auto'}}>
            {/* Header */}
            <div className="border-t border-b border-black dark:border-white py-4 sm:py-6">
                <h2 className="text-xl sm:text-2xl font-[800] dark:bg-stone-900 bg-yellow-300 dark:text-white text-black px-2 py-1 inline-block transform -rotate-1">
                    Latest Articles
                </h2>
            </div>

            {/* Articles */}
            <div className="border-b border-black dark:border-white">
                {noticias.map((article, index) => (
                    <div key={index} className="flex flex-col lg:flex-row border-t border-black dark:border-white">
                        {/* Left column - Author & Date */}
                        <div className="w-full lg:w-1/3 p-4 sm:p-6 lg:p-8 lg:border-r border-black dark:border-white">
                            <p className="text-sm italic mb-2 lg:mb-4">
                                By <span className="font-semibold">{article.author}</span>
                            </p>
                            <p className="text-sm mb-4 lg:mb-0">{article.date}</p>
                        </div>

                        {/* Right column - Content */}
                        <div className="w-full lg:w-2/3 p-4 sm:p-6 lg:p-8 border-t border-black dark:border-white lg:border-t-0">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-3 lg:mb-4 leading-tight">
                                {article.title}
                            </h3>
                            <p className="text-sm sm:text-base mb-4 lg:mb-6 leading-relaxed">
                                {article.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className="border border-black dark:border-white px-2 py-1 text-xs font-semibold uppercase">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
