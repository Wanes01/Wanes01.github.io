import type TString from "$lib/i18n/TString"
import type { Skill } from "./skills"
import { tString } from "$lib/i18n/TString"
import { skills } from "./skills"

interface Project {
    title: string,
    desc: TString,
    img: string,
    skills: Skill[],
    link?: string
}

export const projectsSectionTitle = tString()
    .set('en', 'Projects')
    .set('it', 'Progetti');

export const skillsText = tString()
    .set('en', 'some of the skills used:')
    .set('it', 'alcune delle competenze usate:')

export const projects: Project[] = [
    {
        title: 'ECMWF',
        desc: tString()
            .set('en', 'I helped port the Drupal modules for the official website of ECMWF, the European center responsible for receiving, processing, and transmitting international meteorological data.')
            .set('it', 'Ho collaborato al porting dei moduli Drupal del sito web ufficiale di ECMWF, centro europeo che si occupa di ricezione, elaborazione e trasmissione dati meteorologici internazionali.'),
        img: 'ecmwf',
        link: 'https://www.ecmwf.int/',
        skills: [skills.php, skills.js]
    },
    {
        title: 'Socratic C',
        desc: tString()
            .set('en', 'A containerized web-based IDE for learning the C language, featuring an LLM-powered tutor with multi-provider support, including local models via Ollama, that guides students through errors and concepts in real time.')
            .set('it', "Un IDE web containerizzato per l'apprendimento del linguaggio C, dotato di un tutor basato su LLM con supporto multi-provider, inclusi modelli locali tramite Ollama, che guida gli studenti attraverso errori e concetti in tempo reale."),
        img: 'socratic',
        link: 'https://github.com/Wanes01/socratic-c',
        skills: [skills.ts, skills.nodejs, skills.svelte, skills.tailwind, skills.docker]
    },
    {
        title: 'GraphSandbox',
        desc: tString()
            .set('en', 'An ongoing personal project: a web app for generating any type of graph on the fly and visualizing classical algorithms (BFS, DFS, Dijkstra, Bellman-Ford) as well as heuristic ones running on them.')
            .set('it', "Un progetto personale in corso: una web app per generare qualsiasi tipo di grafo al volo e visualizzare l'esecuzione di algoritmi classici (BFS, DFS, Dijkstra, Bellman-Ford) ed euristici su di essi."),
        img: 'graphsandbox',
        link: 'https://github.com/Wanes01/graph-sandbox',
        skills: [skills.svelte, skills.js, skills.tailwind]
    },
    {
        title: 'Savestate',
        desc: tString()
            .set('en', 'An Android app to search for video games, browse their details, build a personal library and track play sessions with statistics, all tied together by an XP-based gamification system.')
            .set('it', "Un'app Android per cercare videogiochi, consultarne i dettagli, costruire una libreria personale e tracciare le sessioni di gioco con statistiche, il tutto unito da un sistema di gamification basato sull'esperienza (XP)."),
        img: 'savestate',
        link: 'https://github.com/Wanes01/savestate',
        skills: [skills.kotlin, skills.android]
    },
    {
        title: 'UniUtils',
        desc: tString()
            .set('en', 'A full-stack mock e-commerce platform for buying and selling university supplies, targeting both students and academic institutions.')
            .set('it', "Una piattaforma e-commerce full-stack simulata per la compravendita di materiale universitario, rivolta sia agli studenti che alle istituzioni accademiche."),
        img: 'uniutils',
        link: 'https://github.com/Wanes01/uniutils',
        skills: [skills.js, skills.css, skills.tailwind, skills.html, skills.php]
    },
    {
        title: 'Jvmt',
        desc: tString()
            .set('en', 'Digital adaptation of the board game Diamant (group project). Software architecture designed with a strong focus on maintainability, actively applying GoF design patterns (Strategy, Factory, Builder, Template Method) to manage the game logic.')
            .set('it', "Transposizione digitale del gioco da tavolo Diamant (progetto di gruppo). Architettura software progettata con un forte focus sulla manutenibilità, applicando attivamente i design pattern GoF (Strategy, Factory, Builder, Template Method) per la gestione della logica di gioco."),
        img: 'jvmt',
        link: 'https://github.com/Wanes01/OOP24-jvmt',
        skills: [skills.java, skills.kotlin]
    },
    {
        title: 'Customer Churn Classifier',
        desc: tString()
            .set('en', 'A machine learning project trained on a fictional telecom dataset to predict, for each customer, the probability of churning in the current month based on their historical data. The study is accompanied by a simple web app.')
            .set('it', "Un progetto di machine learning addestrato su un dataset fittizio di telecomunicazioni per prevedere, per ogni cliente, la probabilità di abbandono (churn) nel mese corrente in base ai dati storici. Lo studio è accompagnato da una semplice web app."),
        img: 'churn',
        link: 'https://github.com/Wanes01/customer-churn-classifier',
        skills: [skills.python, skills.scikit]
    },
]