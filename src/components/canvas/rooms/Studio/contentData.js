/**
 * Studio Content Data
 * 
 * Contains all content items for the Studio monitor tower.
 * Phones display the key features of this portfolio.
 * TVs display technical architecture and engineering highlights.
 * Monitors display creative coding and design case studies.
 */

export const PLATFORM_CONFIG = {
    features: {
        color: '#10B981',
        accentColor: '#059669',
        icon: '📱',
        label: 'Key Feature',
        shape: 'phone', // Vertical phone
    },
    tech: {
        color: '#6366F1',
        accentColor: '#4F46E5',
        icon: '📺',
        label: 'Architecture',
        shape: 'tv', // Wide CRT style
    },
    blog: {
        color: '#3B82F6',
        accentColor: '#1D4ED8',
        icon: '🖥️',
        label: 'Engineering',
        shape: 'monitor', // Thin desktop monitor
    },
    youtube: {
        color: '#6366F1',
        accentColor: '#4F46E5',
        icon: '📺',
        label: 'Architecture',
        shape: 'tv',
    },
    tiktok: {
        color: '#10B981',
        accentColor: '#059669',
        icon: '📱',
        label: 'Key Feature',
        shape: 'phone',
    },
    instagram: {
        color: '#EC4899',
        accentColor: '#DB2777',
        icon: '📱',
        label: 'Key Feature',
        shape: 'phone',
    },
    linkedin: {
        color: '#0077B5',
        accentColor: '#005E93',
        icon: '💼',
        label: 'Engineering',
        shape: 'monitor',
    },
    codrops: {
        color: '#0099FF',
        accentColor: '#0077CC',
        icon: '💧',
        label: 'Engineering',
        shape: 'monitor',
    },
    x: {
        color: '#000000',
        accentColor: '#14171A',
        icon: '𝕏',
        label: 'Engineering',
        shape: 'monitor',
    },
};

const RAW_CONTENT_DATA = [
    // ============ PHONES (Key Features of the Portfolio) ============
    {
        id: 'feat-001',
        platform: 'features',
        device: 'phone',
        title: 'Spatial 3D Corridor Navigation',
        description: 'An infinite hand-drawn 3D hallway powered by React Three Fiber and Three.js. Features momentum-based camera inertia, dynamic room portals, and an interactive dodging avatar that reacts to user proximity.',
        date: 'Core Experience',
        views: 'WebGL',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'feat-002',
        platform: 'features',
        device: 'phone',
        title: 'Infinite Flight & Story Milestones',
        description: 'A paper airplane flight simulation looping infinitely through procedural sky chunks. Story milestone sections gracefully fade in and spread apart with banking and pitch physics driven by scroll velocity.',
        date: 'About Room',
        views: 'Three.js',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'feat-003',
        platform: 'features',
        device: 'phone',
        title: 'Realistic Paper Tear Project Gallery',
        description: 'Exhibition room showcasing projects as textured paper cards floating in 3D space. Features dynamic paper-tearing screen transitions, hover brush reveals, and interactive project inspection modals.',
        date: 'Showcase Room',
        views: 'GSAP',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'feat-004',
        platform: 'features',
        device: 'phone',
        title: 'Infinite Cylindrical Monitor Tower',
        description: 'A dynamic 3D cylinder composed of retro CRT televisions, desktop monitors, and smartphones falling and looping endlessly in space with drag-to-spin physics and smooth click-to-zoom focus.',
        date: 'Studio Room',
        views: 'Physics',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'feat-005',
        platform: 'features',
        device: 'phone',
        title: 'Ocean Pier & Floating Social Barrels',
        description: 'A shoreline pier extending into procedural animated water waves. Social media channels are represented as 3D barrels bobbing asynchronously with wave physics, alongside a direct mail redirect.',
        date: 'Contact Room',
        views: 'Shaders',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'feat-006',
        platform: 'features',
        device: 'phone',
        title: 'Custom Shaders & Zero 3D Models',
        description: '100% of the visual depth is created without heavy 3D GLTF models. Custom GLSL brush-reveal shaders and transparent texture planes deliver a distinctive hand-drawn aesthetic at 60+ FPS.',
        date: 'Graphics Pipeline',
        views: 'GLSL',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'feat-007',
        platform: 'features',
        device: 'phone',
        title: 'Positional 3D Audio & Soundscapes',
        description: 'Three.js PositionalAudio soundscapes with exponential distance falloff: whistling wind in the sky, ocean waves at the pier, monitor hums in the studio, and atmospheric background music.',
        date: 'Audio Engine',
        views: 'Spatial Audio',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'feat-008',
        platform: 'features',
        device: 'phone',
        title: 'Accessible Screen Reader & Navigation',
        description: 'Comprehensive accessibility layer pairing the 3D canvas with an ARIA-compliant HTML semantic hierarchy, keyboard teleportation controls, and noscript fallbacks for assistive devices.',
        date: 'Accessibility',
        views: 'A11y',
        url: 'https://github.com/harshitmuit-lab',
    },

    // ============ CRT TVs (Architecture & Technical Highlights) ============
    {
        id: 'tv-001',
        platform: 'tech',
        device: 'tv',
        title: 'WebGL & Three.js Architecture',
        description: 'Built using React Three Fiber, Three.js, and Vite. Utilizes frustum culling, texture atlasing, instancing, and memory cleanup to maintain 60fps on mobile and desktop devices without GPU bottlenecks.',
        date: 'Architecture',
        views: '60 FPS',
        duration: 'WebGL 2.0',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'tv-002',
        platform: 'tech',
        device: 'tv',
        title: 'GSAP Animation Engine',
        description: 'Complex motion choreography combining GSAP timelines, inertia scrolling, camera rotation lerps, and procedural physics for fluid, tactile interactions throughout every room.',
        date: 'Motion Design',
        views: 'GSAP 3',
        duration: 'Physics',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'tv-003',
        platform: 'tech',
        device: 'tv',
        title: 'Dynamic Scene & Teleport System',
        description: 'Custom React Context architecture managing seamless camera teleportation between 5 distinct 3D environments, achievement triggers, audio mixing, and global HUD overlays.',
        date: 'State Management',
        views: 'React 19',
        duration: 'Context API',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'tv-004',
        platform: 'tech',
        device: 'tv',
        title: 'Cross-Device Responsive Scaling',
        description: 'Dynamic camera FOV and aspect calculation ensuring that all 3D rooms, text elements, and touch gestures feel natural on smartphones, tablets, and ultra-wide desktop monitors.',
        date: 'System Design',
        views: 'Responsive',
        duration: 'Adaptive',
        url: 'https://github.com/harshitmuit-lab',
    },

    // ============ MONITORS (Engineering Deep Dives) ============
    {
        id: 'mon-001',
        platform: 'blog',
        device: 'monitor',
        title: 'Engineering the Hand-Drawn 3D Aesthetic',
        description: 'Deep-dive into combining flat 2D pen-and-paper illustration with 3D spatial coordinate systems to achieve a cohesive, playful sketchbook aesthetic.',
        date: 'Case Study',
        readTime: '5 min',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'mon-002',
        platform: 'blog',
        device: 'monitor',
        title: 'Lightweight 3D Without Heavy GLTF Assets',
        description: 'How utilizing planes, billboarding, procedural repetition, and alpha-tested textures keeps initial bundle sizes tiny and load times instantaneous.',
        date: 'Performance',
        readTime: '6 min',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'mon-003',
        platform: 'blog',
        device: 'monitor',
        title: 'Custom GLSL Fragment Shader Transitions',
        description: 'Implementing procedural noise threshold discard shaders in GLSL to simulate black-and-white sketch lines coloring in with pencil shading on pointer hover.',
        date: 'Shader Notes',
        readTime: '4 min',
        url: 'https://github.com/harshitmuit-lab',
    },
    {
        id: 'mon-004',
        platform: 'blog',
        device: 'monitor',
        title: 'Spatial UI & Immersive Navigation Patterns',
        description: 'Designing UI overlays and spatial navigation cues that enhance the 3D experience without cluttering the screen or overwhelming the visitor.',
        date: 'UX Patterns',
        readTime: '5 min',
        url: 'https://github.com/harshitmuit-lab',
    },
];

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => ({
    ...item,
    frontTexture: null,
    paintedFrontTexture: null,
}));

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return CONTENT_DATA[0];
};
