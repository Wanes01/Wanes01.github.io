export interface LifeEvent {
    year: string,
    title: string,
    desc: string
}

export const education: LifeEvent[] = [
    {
        year: '2015',
        title: 'First line of code',
        desc: 'Started programming at 14, curiosity-driven.'
    },
    {
        year: '2021',
        title: 'Diploma: ISS Blaise Pascal',
        desc: 'Computer science technical high school, 99/100.'
    },
    {
        year: '2021',
        title: 'University begins',
        desc: 'B.Sc. Computer Science and Engineering, Bologna.'
    },
    {
        year: '10/2026',
        title: 'Thesis defense',
        desc: 'Rebuilding the data layer of Alchemist to support GeoTIFF and Copernicus EU datasets.'
    }
];

export const work: LifeEvent[] = [
    {
        year: '03/2022 - 09/2022',
        title: 'Full Stack Developer ~ Trust IT-services',
        desc: 'Porting Drupal 7 → 9 modules in PHP. Built an internal data aggregation portal. JS frontend and backend.',
    },
    {
        year: '04/2026 - 07/2026',
        title: 'Curricular internship ~ University of Bologna',
        desc: 'Built a containerized web-based IDE for teaching C with a Socratic AI tutor supporting cloud and local models (Ollama). Stack: Svelte, TypeScript, Node.js, Express, Docker.',
    }
];

export interface TimelineEvent {
    year: string;
    title: string;
    desc: string;
    type: 'edu' | 'work'
}

function parseDateString(dateStr: string): Date {
    if (dateStr.includes('/')) {
        const [month, year] = dateStr.split('/');
        return new Date(parseInt(year), parseInt(month) - 1, 1);
    } else {
        return new Date(parseInt(dateStr), 0, 1);
    }
}

export const allEvents: TimelineEvent[] = [
    ...education.map(item => ({ ...item, type: 'edu' as const })),
    ...work.map(item => ({ ...item, type: 'work' as const }))
].sort((a, b) => {
    const dateA = parseDateString(a.year);
    const dateB = parseDateString(b.year);

    return dateA.getTime() - dateB.getTime();
});