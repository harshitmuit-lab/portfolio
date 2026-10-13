import { GALLERY_PROJECTS } from './src/components/canvas/rooms/Gallery/galleryData.js';
import { CONTENT_DATA } from './src/components/canvas/rooms/Studio/contentData.js';

const HARSHIT_INFO = {
    name: 'Harshit Sharma',
    siteTitle: 'Harshit Sharma | Creative 3D Portfolio',
    siteDescription: 'Interactive 3D developer portfolio of Harshit Sharma. Explore real-time AI audio forensics, modern web experiences, and creative engineering.',
    aboutMe: 'I am a dedicated developer specializing in modern frontend architectures, real-time AI systems, and interactive 3D WebGL experiences.',
    jobTitle: 'Creative Developer & AI Forensics Engineer',
    url: 'https://github.com/harshitmuit-lab',
    githubUrl: 'https://github.com/harshitmuit-lab',
    linkedinUrl: 'https://www.linkedin.com/in/harshit-sharma-596726383',
    instagramUrl: 'https://www.instagram.com/_harshit_sharma_52/?hl=en'
};

// Tech stack filename -> human-readable name mapping for JSON-LD
const TECH_STACK_NAMES = {
    'reactlogo.webp': 'React',
    'htmllogo.webp': 'HTML',
    'csslogo.webp': 'CSS',
    'jslogo.webp': 'JavaScript',
    'tailwindlogo.webp': 'Tailwind CSS',
    'firebaselogo.webp': 'Firebase',
    'netlifylogo.webp': 'Netlify',
    'wordpresslogo.webp': 'WordPress',
    'elementorlogo.webp': 'Elementor',
    'phplogo.webp': 'PHP',
};

/**
 * Build dynamic JSON-LD structured data.
 */
function buildJsonLd(globalInfo = HARSHIT_INFO, projects = GALLERY_PROJECTS, studio = CONTENT_DATA) {
    const graph = [];

    // --- 1. Person: Central node of the Knowledge Graph ---
    const person = {
        '@type': 'Person',
        '@id': `${globalInfo.url}#person`,
        name: globalInfo.name,
        url: globalInfo.url,
        jobTitle: globalInfo.jobTitle,
        description: globalInfo.aboutMe,
        knowsAbout: ['React', 'Three.js', 'JavaScript', 'Python', 'GSAP', 'WebGL', '3D Graphics', 'Web Development', 'AI Audio Forensics'],
        sameAs: [
            globalInfo.linkedinUrl,
            globalInfo.githubUrl,
            globalInfo.instagramUrl
        ].filter(Boolean)
    };
    graph.push(person);

    // --- 2. WebSite ---
    const website = {
        '@type': 'WebSite',
        '@id': `${globalInfo.url}#website`,
        url: globalInfo.url,
        name: globalInfo.siteTitle,
        description: globalInfo.siteDescription,
        publisher: { '@id': `${globalInfo.url}#person` }
    };
    graph.push(website);

    // --- 3. ProfilePage ---
    const profilePage = {
        '@type': 'ProfilePage',
        '@id': `${globalInfo.url}#profilepage`,
        url: globalInfo.url,
        mainEntity: { '@id': `${globalInfo.url}#person` },
        about: { '@id': `${globalInfo.url}#person` }
    };
    graph.push(profilePage);

    // --- 4. ItemList: Portfolio Projects ---
    const activeProjects = projects.filter(p => !p.isEmpty);
    if (activeProjects.length > 0) {
        graph.push({
            '@type': 'ItemList',
            '@id': `${globalInfo.url}#projectslist`,
            name: `Portfolio Projects by ${globalInfo.name}`,
            description: 'Selected web development and real-time AI audio forensics engineering projects.',
            numberOfItems: activeProjects.length,
            itemListElement: activeProjects.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                    '@type': 'CreativeWork',
                    name: p.title,
                    description: p.description || '',
                    url: p.url || globalInfo.url,
                    creator: { '@id': `${globalInfo.url}#person` }
                }
            }))
        });

        activeProjects.forEach(p => {
            const projectSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            graph.push({
                '@type': 'CreativeWork',
                '@id': `${globalInfo.url}#project-${projectSlug}`,
                name: p.title,
                description: p.description || '',
                url: p.url || globalInfo.url,
                creator: { '@id': `${globalInfo.url}#person` }
            });
        });
    }

    return {
        '@context': 'https://schema.org',
        '@graph': graph
    };
}

// Helper to generate the llms.txt content in clean Markdown
function buildLlmsTxt(globalInfo = HARSHIT_INFO, projects = GALLERY_PROJECTS, studio = CONTENT_DATA) {
    const siteTitle = globalInfo.siteTitle;
    const siteDescription = globalInfo.siteDescription;
    const aboutMe = globalInfo.aboutMe;

    let content = `# ${siteTitle}\n`;
    content += `> ${siteDescription}\n\n`;

    content += `## Biography / About Me\n`;
    content += `${aboutMe}\n\n`;

    content += `## Core Technologies & Skills\n`;
    content += `- React, Three.js, React Three Fiber (R3F), GSAP (GreenSock), JavaScript, TypeScript, WebGL, 3D Graphics, Web Development, Real-Time AI Audio Forensics.\n\n`;

    const activeProjects = projects.filter(p => !p.isEmpty);
    if (activeProjects.length > 0) {
        content += `## Selected Portfolio Projects\n`;
        activeProjects.forEach(p => {
            content += `- [${p.title}](${p.url || globalInfo.url}): ${p.description || ''}\n`;
        });
        content += `\n`;
    }

    if (studio && studio.length > 0) {
        content += `## Portfolio Technical Architecture\n`;
        studio.forEach(s => {
            content += `- **${s.title} (${s.platform})**: ${s.description || ''}\n`;
        });
        content += `\n`;
    }

    return content;
}

export function generateSeoHtml() {
    const globalInfo = HARSHIT_INFO;
    const projects = GALLERY_PROJECTS;
    const studio = CONTENT_DATA;
    const cachedLlmsContent = buildLlmsTxt(globalInfo, projects, studio);

    return {
        name: 'seo-plugin',

        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url === '/llms.txt') {
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end(cachedLlmsContent);
                } else {
                    next();
                }
            });
        },

        transformIndexHtml(html) {
            try {
                const siteTitle = globalInfo.siteTitle;
                const siteDescription = globalInfo.siteDescription;

                // Build dynamic JSON-LD
                const jsonLdSchemas = buildJsonLd(globalInfo, projects, studio);
                const jsonLdScript = `\n  <!-- Dynamic Structured Data (JSON-LD) -->\n  <script type="application/ld+json">\n${JSON.stringify(jsonLdSchemas, null, 2)}\n  </script>\n`;

                let transformedHtml = html.replace(
                    /<title>(.*?)<\/title>/,
                    `<title>${siteTitle}</title>`
                );

                if (transformedHtml.includes('<meta name="description"')) {
                    transformedHtml = transformedHtml.replace(
                        /<meta name="description" content="(.*?)"\s*\/?>/,
                        `<meta name="description" content="${siteDescription}" />`
                    );
                }

                transformedHtml = transformedHtml
                    .replace(
                        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
                        `<meta property="og:title" content="${siteTitle}" />`
                    )
                    .replace(
                        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
                        `<meta property="og:description" content="${siteDescription}" />`
                    )
                    .replace(
                        /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
                        `<meta name="twitter:title" content="${siteTitle}" />`
                    )
                    .replace(
                        /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
                        `<meta name="twitter:description" content="${siteDescription}" />`
                    );

                transformedHtml = transformedHtml.replace('</head>', `${jsonLdScript}</head>`);
                return transformedHtml;
            } catch (error) {
                console.error('SEO Plugin Error:', error);
                return html;
            }
        },

        generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: 'llms.txt',
                source: cachedLlmsContent
            });
        }
    };
}
