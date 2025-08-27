const POPULAR_ARTICLES = [
    {
        id: 1,
        title: "React 19 ya está aquí: Las nuevas características que cambiarán tu desarrollo",
        description: "Descubre las nuevas funcionalidades de React 19, incluyendo Server Components, mejoras en el compilador y las APIs más esperadas por los desarrolladores.",
        author: "María González",
        date: "2025-08-25",
        tag: "REACT"
    },
    {
        id: 2,
        title: "TypeScript 5.5: Mejor inferencia de tipos y rendimiento optimizado",
        description: "Las últimas mejoras en TypeScript incluyen inferencia de tipos más inteligente, mejor soporte para decoradores y optimizaciones significativas de rendimiento.",
        author: "Carlos Ruiz",
        date: "2025-08-24",
        tag: "TYPESCRIPT"
    },
    {
        id: 3,
        title: "CSS Grid vs Flexbox: Cuándo usar cada uno en 2025",
        description: "Una guía completa sobre las diferencias entre CSS Grid y Flexbox, con ejemplos prácticos y casos de uso para ayudarte a elegir la mejor opción.",
        author: "Ana Martín",
        date: "2025-08-23",
        tag: "CSS"
    },
    {
        id: 4,
        title: "Next.js 15: App Router y las mejoras en el renderizado del servidor",
        description: "Explora las nuevas características de Next.js 15, incluyendo mejoras en el App Router, Turbopack y optimizaciones en Server-Side Rendering.",
        author: "David López",
        date: "2025-08-22",
        tag: "JAVASCRIPT"
    },
    {
        id: 5,
        title: "Inteligencia Artificial en el desarrollo web: Herramientas que debes conocer",
        description: "Descubre cómo la IA está transformando el desarrollo web con herramientas como GitHub Copilot, ChatGPT y nuevas soluciones para automatizar tareas.",
        author: "Laura Pérez",
        date: "2025-08-21",
        tag: "AI & ML"
    },
    {
        id: 6,
        title: "Node.js 22: Nuevas APIs nativas y mejoras en el ecosistema",
        description: "Las últimas actualizaciones de Node.js traen APIs nativas mejoradas, mejor soporte para ESM y optimizaciones importantes en el runtime.",
        author: "Miguel Santos",
        date: "2025-08-20",
        tag: "NODE.JS"
    },
    {
        id: 7,
        title: "Seguridad en aplicaciones web: Vulnerabilidades más comunes en 2025",
        description: "Aprende sobre las vulnerabilidades de seguridad más frecuentes en aplicaciones web modernas y cómo proteger tus proyectos efectivamente.",
        author: "Elena Vega",
        date: "2025-08-19",
        tag: "SECURITY"
    },
    {
        id: 8,
        title: "Performance Web: Optimizaciones que realmente importan",
        description: "Técnicas avanzadas de optimización web que pueden mejorar significativamente el rendimiento de tus aplicaciones y la experiencia del usuario.",
        author: "Roberto Díaz",
        date: "2025-08-18",
        tag: "PERFORMANCE"
    }
];

export function PopularArticles () {
    return (
        <div className="max-w-screen p-4 max-h-screen mx-10">
            <div className="border-y p-4 flex justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-4 font-display">Articulos Populares</h2>
                </div>
                <div className="space-x-4">
                    <button className="text-md font-semibold text-gray-600 hover:text-gray-800">
                        THIS TIME
                    </button>
                    <button className="text-md font-semibold text-gray-600 hover:text-gray-800">
                        ALL TIME
                    </button>
                </div>
            </div>
            <div className="max-h-96 grid grid-cols-3 gap-4">
                {POPULAR_ARTICLES.map((article) => (
                    <div key={article.id} className="border-b border-r border-gray-200/60  p-4">
                        <h3 className="text-lg font-semibold font-display">{article.title}</h3>
                        <p className="text-sm font-display">{article.description}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                                <span>{article.author}</span>
                                <span>{article.date}</span>
                                <span className="font-semibold">{article.tag}</span>
                            </div>
                        </div>
                    ))}
                </div>

        </div>
    )
}