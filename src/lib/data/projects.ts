import type { Skill } from "./skills"
import { skills } from "./skills"

interface Project {
    title: string,
    desc: string,
    img: string,
    skills: Skill[],
    link?: string
}

export const projects: Project[] = [
    {
        title: 'Socratic C',
        desc: 'A containerized web-based IDE for learning the C language, featuring an LLM-powered tutor with multi-provider support, including local models via Ollma, that guides students through errors and concepts in real time.',
        img: 'socratic',
        link: 'https://github.com/Wanes01/socratic-c',
        skills: [skills.ts, skills.nodejs, skills.svelte, skills.tailwind, skills.docker]
    },
    {
        title: 'GraphSandbox',
        desc: 'An ongoing personal project: a web app for generating any type of graph on the fly and visualizing classical algorithms (BFS, DFS, Dijkstra, Bellman-Ford) as well as heuristic ones running on them.',
        img: 'graphsandbox',
        link: 'https://github.com/Wanes01/graph-sandbox',
        skills: [skills.svelte, skills.js, skills.tailwind]
    },
    {
        title: 'Savestate',
        desc: 'An Android app to search for video games, browse their details, build a personal library and track play sessions with statistics, all tied together by an XP-based gamification system.',
        img: 'savestate',
        link: 'https://github.com/Wanes01/savestate',
        skills: [skills.kotlin, skills.android]
    },
    {
        title: 'UniUtils',
        desc: 'A full-stack mock e-commerce platform for buying and selling university supplies, targeting both students and academic institutions.',
        img: 'uniutils',
        link: 'https://github.com/Wanes01/uniutils',
        skills: [skills.js, skills.css, skills.tailwind, skills.html, skills.php]
    },
    {
        title: 'Jvmt',
        desc: 'A group project in Java, a digital implementation of the Diamant board game.',
        img: 'jvmt',
        link: 'https://github.com/Wanes01/OOP24-jvmt',
        skills: [skills.java, skills.kotlin]
    },
    {
        title: 'Customer Churn Classifier',
        desc: 'A machine learning project trained on a fictional telecom dataset to predict, for each customer, the probability of churning in the current month based on their historical data. The study is accompanied by a simple web app.',
        img: 'churn',
        link: 'https://github.com/Wanes01/customer-churn-classifier',
        skills: [skills.python, skills.scikit]
    },
]