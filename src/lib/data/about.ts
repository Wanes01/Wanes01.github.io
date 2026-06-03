import laurel from '$lib/imgs/doodles/laurel.svg';
import creating from '$lib/imgs/doodles/creating.svg';
import world from '$lib/imgs/doodles/world.svg';
import arch from '$lib/imgs/doodles/arch.svg';
import freeTime from '$lib/imgs/doodles/free_time.svg';
import type TString from '$lib/i18n/TString';
import { tString } from '$lib/i18n/TString';

interface AboutItem {
    img: string;
    cls: string;
    desc: TString;
}

export const aboutTitle = tString()
    .set('en', 'About')
    .set('it', 'Chi sono');

export const aboutItems: AboutItem[] = [
    { // general info
        img: laurel, cls: 'lg:w-50 w-50', desc: tString()
            .set('en', `My name is <span class="text-ocean font-bold">Emir Wanes Aouioua</span>. I'm 24, and I've just finished all my exams for my B.Sc. in
				Computer Science and Engineering. I'll defend my thesis in October and finally call it
				done.`)
            .set('it', `Mi chiamo <span class="text-ocean font-bold">Emir Wanes Aouioua</span>. Ho 24 anni e ho appena finito tutti gli esami del corso di laurea triennale in
                Ingegneria e Scienze Informatiche. A ottobre discuterò la mia tesi e potrò finalmente dire di aver concluso il percorso.`)
    },
    { // why CS
        img: creating, cls: 'lg:w-60 w-60', desc: tString()
            .set('en', `I've always been driven by a simple curiosity: understanding how things work, and then
				building something with that knowledge. Computer science turned out to be the perfect outlet
				for that. It's one of the few disciplines where you can start from nothing and end up with
				something that actually works, in an afternoon.`)
            .set('it', `Sono sempre stato spinto da una semplice curiosità: capire come funzionano le cose e poi
                costruire qualcosa grazie a quelle conoscenze. L'informatica si è rivelata il campo perfetto
                per questo. È una delle poche discipline in cui si può partire dal nulla e arrivare a
                creare qualcosa che funzioni davvero, nel giro di un pomeriggio.`)
    },
    { // thesis
        img: world, cls: 'lg:w-50 w-50', desc: tString()
            .set('en', `My thesis involves rebuilding the data layer of <a href="https://alchemistsimulator.github.io/" target="_blank" class="underline text-ocean hover:text-blaze">Alchemist</a>, an open source physical
				simulator developed at the University of Bologna, to support GeoTIFF and Copernicus EU datasets.
				It's a project I'm genuinely looking forward to.`)
            .set('it', `La mia tesi prevede la riorganizzazione del livello dati di <a href="https://alchemistsimulator.github.io/" target="_blank" class="underline text-ocean hover:text-blaze">Alchemist</a>, un simulatore fisico open source
                sviluppato dall'Università di Bologna, al fine di supportare i tipi GeoTIFF estratti dal programma Copernicus dell'Unione Europea.
				È un progetto davvero entusiasmante.`)
    },
    { // area of interests
        img: arch, cls: 'w-full lg:w-130', desc: tString()
            .set('en', `I don't really have a single area I focus on. Distributed systems, security,
				containerization, simulations... I find most of it interesting, and I like that the field is
				broad enough to never get boring.`)
            .set('it', `Non ho un ambito specifico su cui mi concentro. Sistemi distribuiti, sicurezza,
                containerizzazione, simulazioni... Trovo che quasi tutto sia interessante, e mi piace che questo settore sia
                abbastanza vasto da non diventare mai noioso.`)
    },
    { // free time
        img: freeTime, cls: 'lg:w-45 w-40', desc: tString()
            .set('en', `Outside of code I game, read, watch series, work out, and follow way too many rabbit holes about
				science and tech.`)
            .set('it', `Oltre a programmare, gioco, leggo, guardo serie TV, mi alleno e mi perdo in fin troppi rabbit hole su
                scienza e tecnologia.`)
    },
];