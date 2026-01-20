import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
            // OpenAI GPTBot (ChatGPT)
            {
                userAgent: 'GPTBot',
                allow: '/',
            },
            // OpenAI ChatGPT-User
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            // Google Gemini
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
            // Anthropic Claude
            {
                userAgent: 'anthropic-ai',
                allow: '/',
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
            },
            // Perplexity AI
            {
                userAgent: 'PerplexityBot',
                allow: '/',
            },
            // Cohere
            {
                userAgent: 'cohere-ai',
                allow: '/',
            },
            // Meta AI
            {
                userAgent: 'FacebookBot',
                allow: '/',
            },
            // Common Crawl (used by many AI models)
            {
                userAgent: 'CCBot',
                allow: '/',
            },
        ],
        sitemap: 'https://kallix.in/sitemap.xml',
    }
}