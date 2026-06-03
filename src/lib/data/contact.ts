import type TString from "$lib/i18n/TString";
import { tString } from "$lib/i18n/TString";

interface Contact {
    name: string;
    icon: string;
    link: string;
}

interface ContactPageData {
    sectionTitle: TString;
    contacts: Contact[];
    invitation: {
        title: TString;
        description: TString;
    },
    terminal: {
        title: TString;
        command: TString;
        emailLabel: TString;
        subjectLabel: TString;
        messageLabel: TString;
        submitLabel: TString;
        printCmd: TString;
    }
    msgResult: {
        processing: TString;
        success: TString;
        error: TString;
    }
}

export const contacts: Contact[] = [
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/Wanes01',
    },
    {
        name: 'Linkedin',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/emir-wanes-aouioua-91a559219/'
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'emir.wanes.aouioua@gmail.com'
    },
]

export const contactData: ContactPageData = {
    sectionTitle: tString()
        .set('en', 'Contact')
        .set('it', 'Contatti'),
    contacts: contacts,
    invitation: {
        title: tString()
            .set('en', `Let's get in touch!`)
            .set('it', `Contattami!`),
        description: tString()
            .set('en', `You can contact me on these platforms, or use the this form to send me a message.`)
            .set('it', `Puoi contattarmi su queste piattaforme, oppure usare il questo form per mandarmi un messaggio.`)
    },
    terminal: {
        title: tString()
            .set('en', 'send me a message!')
            .set('it', 'mandami un messaggio!'),
        command: tString()
            .set('en', './send_message_to_emir.sh')
            .set('it', './manda_messaggio_a_emir.sh'),
        emailLabel: tString()
            .set('en', 'Your email')
            .set('it', 'La tua email'),
        subjectLabel: tString()
            .set('en', 'Subject')
            .set('it', 'Oggetto'),
        messageLabel: tString()
            .set('en', 'Message')
            .set('it', 'Messaggio'),
        submitLabel: tString()
            .set('en', 'send_message()')
            .set('it', 'invia_messaggio()'),
        printCmd: tString()
            .set('en', './print_operation_result.sh')
            .set('it', './stampa_risultato_operazione.sh'),
    },
    msgResult: {
        processing: tString()
            .set('en', 'Sending your message, please wait...')
            .set('it', 'Inviando il messaggio, aspetta perfavore...'),
        success: tString()
            .set('en', 'The message was sent successfully :D')
            .set('it', 'Il messaggio è stato inviato con successo :D'),
        error: tString()
            .set('en', 'Sending your message, please wait...')
            .set('it', `Qualcosa è andato storto durante l'invio del messaggio D:`)
    }
}