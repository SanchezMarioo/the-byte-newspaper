const POPULAR_ARTICLES = [
    {
        id: 1,
        title: "Another article about centering in CSS",
        description: "This one is different, I promise. It's my advice on approaching the options we have to center an element with CSS now and what pragmatic choices we should make.",
        author: "Andy Bell",
        date: "14 August 2025",
        tag: "CSS"
    },
    {
        id: 2,
        title: "A (more) Modern CSS Reset",
        description: "I wrote \"A Modern CSS Reset\" almost 4 years ago and, yeh, it's not aged overly well. I spotted it being linked up again a few days ago and thought it's probably a good idea to publish an updated version.",
        author: "Andy Bell",
        date: "18 September 2023",
        tag: "CSS"
    },
    {
        id: 3,
        title: "Pico CSS",
        description: "A fantastic CSS framework, built to style semantic HTML at a global level.",
        author: "Andy Bell",
        date: "19 August 2025",
        tag: "LINK"
    },
    {
        id: 4,
        title: "Building a typed fetch in TypeScript with conditional types and infer",
        description: "Sophie Koonin uses a handy context — a bird watching site — to explain some complex, but handy features of TypeScript that will definitely improve your API-based functionality.",
        author: "Sophie Koonin",
        date: "07 August 2025",
        tag: "TYPESCRIPT"
    },
    {
        id: 5,
        title: "A handy use of subgrid to enhance a simple layout",
        description: "Subgrid in CSS is really handy for getting a nice level of design detail in place, especially in terms of maintaining a nice reading line, as Andy shows in this article.",
        author: "Andy Bell",
        date: "17 July 2025",
        tag: "CSS"
    },
    {
        id: 6,
        title: "Styling Tables the Modern CSS Way",
        description: "Modern CSS makes styling HTML tables in a considered, responsive nature a breeze. Michelle Barker breaks it all down for you in this deep dive.",
        author: "Michelle Barker",
        date: "18 July 2024",
        tag: "CSS"
    }
];

export function PopularArticles() {
    return (
        <section className="bg-stone-200 dark:bg-[#181617] mx-4 sm:mx-6 md:mx-8 lg:mx-10 p-4">
            <div className="w-[79%] mx-auto">
                {/* Header con título y filtros */}
                <div className="border-t border-b border-black dark:border-white py-6 flex justify-between items-center">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display ml-2 -rotate-1 inline-block bg-yellow-300 dark:bg-gray-950">
                        Popular Articles
                    </h2>
                    <div className="flex gap-0">
                        <button className="bg-gray-900 text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">
                            THIS MONTH
                        </button>
                        <button className="border-2 border-gray-900 text-gray-900 dark:border-white dark:text-white px-4 py-2 text-sm font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                            ALL TIME
                        </button>
                    </div>
                </div>

                {/* Grid de artículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {POPULAR_ARTICLES.slice(0, 6).map((article, index) => (
                            <article 
                                key={article.id} 
                                className={`group p-6 lg:p-8 border-black/80 dark:border-white flex flex-col ${
                                    (index % 3) < 2 ? 'lg:border-r' : ''
                                } ${index < 3 ? 'lg:border-b' : ''} cursor-pointer transition-all`}>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight font-display group-hover:underline group-hover:decoration-yellow-400 group-hover:underline-offset-4">
                                    {article.title}
                                </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-display flex-grow">
                                {article.description}
                            </p>
                            <div className="flex items-center justify-between text-sm mt-auto font-display">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 dark:text-white font-medium">By <span className="italic">{article.author}</span></span>
                                    <span className="text-gray-500 dark:text-gray-400">{article.date}</span>
                                </div>
                                <span className="border border-gray-900 dark:border-white text-gray-900 dark:text-white px-2 py-1 text-xs font-semibold">
                                    {article.tag}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}