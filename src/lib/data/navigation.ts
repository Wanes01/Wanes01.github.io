import TString, { tString } from "$lib/i18n/TString";

interface NavLink {
    title: TString;
    id: string;
}

export const langToggle = tString()
    .set('en', 'language')
    .set('it', 'lingua');

export const themeToggle = tString()
    .set('en', 'theme')
    .set('it', 'tema');

export const sections: NavLink[] = [
    {
        title: tString().set('en', 'About').set('it', 'Chi sono'),
        id: 'about'
    },
    {
        title: tString().set('en', 'Experience').set('it', 'Esperienza'),
        id: 'experience'
    },
    {
        title: tString().set('en', 'Skills').set('it', 'Competenze'),
        id: 'skills'
    },
    {
        title: tString().set('en', 'Projects').set('it', 'Progetti'),
        id: 'projects'
    },
    {
        title: tString().set('en', 'Contact').set('it', 'Contatti'),
        id: 'contact'
    }
]
