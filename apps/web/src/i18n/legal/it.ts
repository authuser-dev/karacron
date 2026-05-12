export const terms = `
## Termini e condizioni

**Ultimo aggiornamento: 2 maggio 2026**

Leggi attentamente questi Termini e condizioni prima di utilizzare Kara. Accedendo o utilizzando l'applicazione, accetti di essere vincolato da questi termini. Se non sei d'accordo con una qualsiasi parte, non devi utilizzare il servizio.

## 1. Accettazione dei termini

Installando, accedendo o utilizzando Kara ("l'Applicazione", "il Servizio"), confermi di avere almeno 16 anni, di aver letto e compreso questi Termini e di accettare di essere legalmente vincolato da essi. Se utilizzi Kara per conto di un'organizzazione, dichiari di avere l'autorità di vincolare tale organizzazione.

## 2. Descrizione del servizio

Kara è un **assistente AI local-first** che funziona principalmente sul tuo dispositivo. Le conversazioni, il contesto appreso e la configurazione sono memorizzati localmente. Kara può connettersi opzionalmente a provider AI di terze parti (come Anthropic o OpenAI) solo quando configuri esplicitamente una chiave API per tali servizi.

## 3. Licenza e uso consentito

Subordinatamente a questi Termini, ti concediamo una licenza limitata, non esclusiva, non trasferibile e revocabile per utilizzare Kara per scopi personali o aziendali interni.

Accetti di **non**:

- Eseguire reverse engineering, decompilare o disassemblare qualsiasi parte dell'Applicazione
- Utilizzare il Servizio per scopi illegali, fraudolenti o dannosi
- Tentare di accedere senza autorizzazione a qualsiasi sistema o rete
- Ridistribuire, sublicenziare o vendere l'Applicazione senza autorizzazione scritta
- Utilizzare strumenti automatizzati per estrarre dati dal Servizio

## 4. Account utente e sicurezza

Sei l'unico responsabile della riservatezza delle tue credenziali e di tutte le attività svolte con il tuo account. Devi notificarci immediatamente qualsiasi violazione della sicurezza o uso non autorizzato.

Kara memorizza le credenziali sensibili (chiavi API, token) esclusivamente nel portachiavi nativo del tuo sistema operativo (macOS Keychain, Linux Secret Service, Windows Credential Manager). Non memorizziamo mai segreti in testo normale.

## 5. Provider AI di terze parti

Quando configuri un provider AI cloud (Anthropic, OpenAI, Google, ecc.), i tuoi messaggi e il contesto rilevante vengono trasmessi a tale provider per generare risposte. Questa trasmissione è soggetta alla **politica sulla privacy e ai termini del provider in questione**, non a quelli di Kara.

Riconosci che Kara non è responsabile delle pratiche sui dati dei provider AI di terze parti. Se preferisci che nessun dato lasci il tuo dispositivo, puoi configurare Kara per utilizzare esclusivamente un modello AI locale.

## 6. Proprietà intellettuale

Tutti i diritti, titoli e interessi sul Servizio (escluso il contenuto generato dall'utente) sono e rimarranno di proprietà esclusiva di Kara e dei suoi licenzianti. Niente in questi Termini ti concede il diritto di usare marchi, loghi o nomi commerciali.

## 7. Esclusione di garanzie

Il Servizio è fornito **"così com'è"** e **"secondo disponibilità"**, senza garanzie di alcun tipo, espresse o implicite, incluse le garanzie implicite di commerciabilità, idoneità per uno scopo particolare o non violazione.

Non garantiamo che il Servizio sarà ininterrotto, privo di errori o di componenti dannosi.

## 8. Limitazione di responsabilità

Nella misura massima consentita dalla legge applicabile, Kara e i suoi affiliati non saranno responsabili per danni indiretti, incidentali, speciali, consequenziali o punitivi derivanti dall'uso o dall'impossibilità di utilizzare il Servizio.

In nessun caso la nostra responsabilità totale nei tuoi confronti supererà l'importo pagato per il Servizio nei dodici (12) mesi precedenti la richiesta.

## 9. Risoluzione

Ci riserviamo il diritto di sospendere o terminare il tuo accesso al Servizio in qualsiasi momento, con o senza preavviso, per comportamenti che riteniamo violino questi Termini o siano dannosi.

In caso di risoluzione, la licenza concessa scadrà automaticamente. Le disposizioni che per loro natura devono sopravvivere alla risoluzione continueranno ad applicarsi.

## 10. Legge applicabile

Questi Termini sono regolati e interpretati in conformità con la legge applicabile. Qualsiasi controversia sarà risolta in buona fede prima di ricorrere a procedimenti legali formali.

## 11. Modifiche ai termini

Possiamo rivedere questi Termini in qualsiasi momento pubblicando una versione aggiornata nell'Applicazione. Le modifiche sostanziali saranno notificate tramite notifica in-app. L'uso continuato del Servizio dopo l'entrata in vigore delle modifiche costituisce accettazione dei Termini rivisti.

## 12. Contatti

Per qualsiasi domanda su questi Termini, contattaci tramite i canali di supporto ufficiali di Kara.
`;

export const privacy = `
## Informativa sull'uso dei dati

**Ultimo aggiornamento: 2 maggio 2026**

La tua privacy è un principio fondamentale di Kara, non una funzionalità accessoria. Kara è costruito **local-first**: i tuoi dati risiedono sul tuo dispositivo per impostazione predefinita. Questa informativa spiega esattamente quali dati gestiamo, come e perché.

## 1. Il nostro principio fondamentale

Kara opera secondo un modello rigoroso di **opt-in**. Nulla viene condiviso con servizi esterni senza la tua autorizzazione esplicita e preventiva. Raccogliamo il minimo indispensabile di dati per il funzionamento del Servizio.

## 2. Dati memorizzati localmente sul tuo dispositivo

I seguenti dati sono memorizzati **esclusivamente sul tuo dispositivo** e non vengono mai trasmessi ai server di Kara:

- **Cronologia delle conversazioni** — tutti i messaggi e il contesto, in un database SQLite locale
- **Memoria e fatti appresi** — informazioni contestuali che l'assistente impara su di te
- **Configurazione utente** — preferenze, impostazioni e stato dell'applicazione
- **Chiavi API e token** — memorizzati nel portachiavi nativo del sistema operativo (cifrato)
- **Modelli AI locali** — binari scaricati nel tuo storage locale
- **Skill e plugin** — installati localmente sotto il tuo controllo

## 3. Dati che possono lasciare il tuo dispositivo

Kara può trasmettere dati fuori dal tuo dispositivo solo nei seguenti scenari esplicitamente opt-in:

**3.1 Richieste ai provider AI cloud**

Se configuri un provider AI cloud (Anthropic, OpenAI, Google, ecc.), il contenuto dei tuoi messaggi e una finestra di contesto minima verranno inviati a tale provider per generare risposte. Questi dati sono soggetti alla **politica sulla privacy del provider in questione**.

**3.2 Integrazioni di skill con servizi esterni**

Se installi una skill che si connette a un servizio esterno (es. Telegram, GitHub, Notion), solo i dati strettamente necessari per la funzione di quella skill verranno trasmessi. Devi installare e configurare ogni skill esplicitamente.

**3.3 Verifiche anonime degli aggiornamenti**

Se abilitato (disabilitato per impostazione predefinita), Kara può contattare server di aggiornamento. La richiesta contiene solo la tua versione di Kara e la piattaforma. Nessun dato personale o conversazione è incluso.

## 4. Dati che non raccogliamo

Kara **non raccoglie né trasmette**:

- La tua cronologia completa delle conversazioni ai nostri server
- File o codice con cui interagisci
- La tua posizione
- Analisi comportamentali o telemetria (salvo opt-in esplicito)
- Dati a fini pubblicitari

## 5. Sicurezza

Applichiamo le migliori pratiche di sicurezza del settore:

- **I segreti (chiavi API, token)** sono memorizzati esclusivamente nel portachiavi nativo del sistema, mai in testo normale
- **Il database locale** è accessibile solo dal processo daemon di Kara (permessi file 600)
- **La comunicazione di rete** con il daemon locale avviene solo tramite loopback (localhost)
- **La crittografia a riposo** per la configurazione sensibile è disponibile come impostazione opt-in

## 6. Conservazione ed eliminazione dei dati

I dati locali vengono conservati indefinitamente a meno che tu non scelga di eliminarli. Hai il pieno controllo:

- Eliminare singole sessioni dalle impostazioni dell'account
- Eliminare tutti i dati locali in qualsiasi momento
- Esportare i tuoi dati prima dell'eliminazione

I dati trasmessi a provider AI di terze parti sono soggetti alle **loro** politiche di conservazione.

## 7. I tuoi diritti

A seconda della tua giurisdizione, potresti avere diritti di accesso, rettifica, cancellazione e portabilità. Poiché la maggior parte dei dati è memorizzata localmente, puoi esercitare questi diritti direttamente dall'applicazione in qualsiasi momento.

## 8. Modifiche a questa informativa

In caso di modifiche sostanziali, ti informeremo tramite notifica in-app prima che entrino in vigore. L'uso continuato costituisce accettazione.

## 9. Contatti

Per domande relative alla privacy, contattaci tramite i canali di supporto ufficiali di Kara.
`;
