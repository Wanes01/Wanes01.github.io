import { tString } from "$lib/i18n/TString";

export const welcome = {
    introductionHTML: tString()
        .set('en', `My name is <span class="font-bold text-ocean">Emir</span>, I'm a`)
        .set('it', `Mi chiamo <span class="font-bold text-ocean">Emir</span>, sono un`),
    caption: tString()
        .set('en', 'I will have completed my Bachelor of Science (B.Sc.) in Computer Science and Engineering by October!')
        .set('it', 'A ottobre avrò completato la laurea triennale in Ingegneria e Scienze Informatiche!'),
    echo: tString()
        .set('en', 'This is me:')
        .set('it', 'Questo sono io:')
}