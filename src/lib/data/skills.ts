interface Skill {
    name: string,
    icon: string
}

interface SkillSection {
    section: string,
    entries: Skill[]
}

export const skillSections: SkillSection[] = [
    {
        section: 'languages',
        entries: [
            { name: 'Java', icon: 'java' },
            { name: 'Kotlin', icon: 'kotlin' },
            { name: 'Python', icon: 'python' },
            { name: 'C', icon: 'c' },
            { name: 'PHP', icon: 'php' },
            { name: 'JavaScript', icon: 'js' },
            { name: 'TypeScript', icon: 'ts' },
            { name: 'Bash', icon: 'bash' },
        ]
    },
    {
        section: 'frontend',
        entries: [
            { name: 'Svelte', icon: 'svelte' },
            { name: 'HTML', icon: 'html' },
            { name: 'CSS', icon: 'css' },
            { name: 'TailwindCSS', icon: 'tailwind' },
        ]
    },
    {
        section: 'backend',
        entries: [
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'Express.js', icon: 'expressjs' },
        ]
    },
    {
        section: 'data_&_AI',
        entries: [
            { name: 'SQL', icon: 'sql' },
            { name: 'MySQL', icon: 'mysql' },
            { name: 'scikit-learn', icon: 'scikit' },
        ]
    },
    {
        section: 'devOps_&_tools',
        entries: [
            { name: 'Docker', icon: 'docker' },
            { name: 'Docker compose', icon: 'dockercompose' },
            { name: 'git', icon: 'git' },
            { name: 'Linux', icon: 'linux' },
            { name: 'TPC/IP protocols & concepts', icon: 'networking' },
        ]
    }
]