import type TString from "$lib/i18n/TString";
import { tString } from "$lib/i18n/TString";

export interface LifeEvent {
    year: string,
    title: TString,
    desc: TString
}

interface TimelineEvent {
    year: string;
    title: TString;
    desc: TString;
    type: 'edu' | 'work'
}

const education: LifeEvent[] = [
    {
        year: '2015',
        title: tString()
            .set('en', 'First line of code')
            .set('it', 'Prima riga di codice'),
        desc: tString()
            .set('en', 'Started programming at 14, curiosity-driven.')
            .set('it', 'Inizio a programmare a 14 anni, spinto dalla curiosità.')
    },
    {
        year: '2021',
        title: tString()
            .set('en', 'Diploma: ITT Blaise Pascal (Cesena)'),
        desc: tString()
            .set('en', 'Computer science technical high school, 99/100.')
            .set('it', 'Diploma da perito informatico, votazione 99/100.')
    },
    {
        year: '2021',
        title: tString()
            .set('en', 'University begins')
            .set('it', `Inizio dell'università`),
        desc: tString()
            .set('en', 'B.Sc. Computer Science and Engineering, Bologna.')
            .set('it', 'Laurea Triennale in Ingegneria e Scienze Informatiche, Bologna.')
    },
    {
        year: '10/2026',
        title: tString()
            .set('en', 'Thesis defense')
            .set('it', 'Discussione della tesi'),
        desc: tString()
            .set('en', 'Rebuilding the data layer of Alchemist to support GeoTIFF and Copernicus EU datasets.')
            .set('it', 'Rifondazione del data layer di Alchemist per supportare i dataset GeoTIFF e il dataset Copernicus EU.')
    }
];

const work: LifeEvent[] = [
    {
        year: '03/2022 - 09/2022',
        title: tString()
            .set('en', 'Full Stack Developer ~ Trust IT-services'),
        desc: tString()
            .set('en', `Ported Drupal 7 to 9 modules in PHP for the <a href="https://www.ecmwf.int/en/about" target="_blank" class="text-ocean dark:text-ocean-dark hover:text-blaze dark:hover:text-blaze-dark transition-colors duration-200 underline underline-offset-4">ECMWF</a> (<span class="italic">European Centre for Medium-Range Weather Forecasts</span>) website. Built an internal data aggregation portal using a JS frontend and backend.`)
            .set('it', `Porting di moduli da Drupal 7 a 9 in PHP per il sito web di <a href="https://www.ecmwf.int/en/about" target="_blank" class="text-ocean dark:text-ocean-dark hover:text-blaze dark:hover:text-blaze-dark transition-colors duration-200 underline underline-offset-4">ECMWF</a> (<span class="italic">European Centre for Medium-Range Weather Forecasts</span>). Sviluppo di un portale interno di aggregazione dati con frontend e backend in JS.`)
    },
    {
        year: '04/2026 - 07/2026',
        title: tString()
            .set('en', 'Curricular internship ~ University of Bologna')
            .set('it', 'Tirocinio curriculare ~ Università di Bologna'),
        desc: tString()
            .set('en', 'Built a modular, containerized web-based IDE for teaching C, featuring an integrated terminal for code compilation and execution, alongside a Socratic AI tutor supporting cloud and local models (Ollama).')
            .set('it', `Sviluppo di un IDE web modulare e containerizzato per l'insegnamento del C, dotato di un terminale integrato per la compilazione ed esecuzione del codice e di un tutor AI socratico a supporto di modelli locali (Ollama) e in cloud.`)
    }
];

function parseDateString(dateStr: string): Date {
    if (dateStr.includes('/')) {
        const [month, year] = dateStr.split('/');
        return new Date(parseInt(year), parseInt(month) - 1, 1);
    } else {
        return new Date(parseInt(dateStr), 0, 1);
    }
}

const allLifeEvents: TimelineEvent[] = [
    ...education.map(item => ({ ...item, type: 'edu' as const })),
    ...work.map(item => ({ ...item, type: 'work' as const }))
].sort((a, b) => {
    const dateA = parseDateString(a.year);
    const dateB = parseDateString(b.year);

    return dateA.getTime() - dateB.getTime();
});

interface ExperienceData {
    sectionTitle: TString;
    eduTitle: TString;
    workTitle: TString;
    education: LifeEvent[];
    work: LifeEvent[];
    allLifeEvents: TimelineEvent[];
}

export const experienceData: ExperienceData = {
    sectionTitle: tString()
        .set('en', 'Education & Experience')
        .set('it', 'Educazione & Esperienze'),
    eduTitle: tString()
        .set('en', 'education')
        .set('it', 'educazione'),
    workTitle: tString()
        .set('en', 'work')
        .set('it', 'lavoro'),
    education: education,
    work: work,
    allLifeEvents: allLifeEvents
}
