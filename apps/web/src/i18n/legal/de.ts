export const terms = `
## Nutzungsbedingungen

**Letzte Aktualisierung: 2. Mai 2026**

Bitte lies diese Nutzungsbedingungen sorgfältig durch, bevor du Kara verwendest. Durch den Zugriff auf oder die Nutzung der Anwendung stimmst du zu, an diese Bedingungen gebunden zu sein. Wenn du nicht einverstanden bist, darfst du den Dienst nicht nutzen.

## 1. Annahme der Bedingungen

Durch die Installation, den Zugriff auf oder die Nutzung von Kara („die Anwendung", „der Dienst") bestätigst du, dass du mindestens 16 Jahre alt bist, diese Bedingungen gelesen und verstanden hast und rechtlich daran gebunden sein möchtest. Nutzt du Kara im Namen einer Organisation, erklärst du, befugt zu sein, diese Organisation zu verpflichten.

## 2. Beschreibung des Dienstes

Kara ist ein **local-first KI-Assistent**, der hauptsächlich auf deinem Gerät läuft. Deine Gespräche, der erlernte Kontext und deine Konfiguration werden lokal gespeichert. Kara kann sich optional mit KI-Drittanbietern (wie Anthropic oder OpenAI) verbinden, jedoch nur wenn du explizit einen API-Schlüssel für diese Dienste konfigurierst.

## 3. Lizenz und erlaubte Nutzung

Vorbehaltlich dieser Bedingungen gewähren wir dir eine eingeschränkte, nicht exklusive, nicht übertragbare und widerrufliche Lizenz zur Nutzung von Kara für persönliche oder interne Geschäftszwecke.

Du stimmst zu, **Folgendes nicht zu tun**:

- Reverse Engineering, Dekompilierung oder Disassemblierung der Anwendung
- Nutzung des Dienstes für illegale, betrügerische oder schädliche Zwecke
- Versuche, unbefugten Zugang zu Systemen oder Netzwerken zu erlangen
- Weiterverteilung, Unterlizenzierung oder Verkauf der Anwendung ohne ausdrückliche schriftliche Genehmigung
- Nutzung automatisierter Tools zur Datenextraktion aus dem Dienst

## 4. Benutzerkonten und Sicherheit

Du bist allein verantwortlich für die Vertraulichkeit deiner Zugangsdaten und alle Aktivitäten unter deinem Konto. Du musst uns unverzüglich über Sicherheitsverletzungen oder unbefugte Nutzung informieren.

Kara speichert sensible Zugangsdaten (API-Schlüssel, Tokens) ausschließlich im nativen Schlüsselbund deines Betriebssystems (macOS Keychain, Linux Secret Service, Windows Credential Manager). Wir speichern niemals Geheimnisse im Klartext.

## 5. KI-Drittanbieter

Wenn du einen Cloud-KI-Anbieter (Anthropic, OpenAI, Google usw.) konfigurierst, werden deine Nachrichten und relevanter Kontext zur Antwortgenerierung an diesen Anbieter übertragen. Diese Übertragung unterliegt der **Datenschutzrichtlinie und den Bedingungen des jeweiligen Anbieters**, nicht denen von Kara.

Du erkennst an, dass Kara nicht für die Datenpraktiken von KI-Drittanbietern verantwortlich ist. Wenn du möchtest, dass keine Daten dein Gerät verlassen, kannst du Kara so konfigurieren, dass ausschließlich ein lokales KI-Modell verwendet wird.

## 6. Geistiges Eigentum

Alle Rechte, Titel und Interessen am Dienst (ausgenommen benutzergenerierte Inhalte) sind und bleiben ausschließliches Eigentum von Kara und seinen Lizenzgebern. Diese Bedingungen gewähren dir kein Recht, Marken, Logos oder Handelsnamen zu verwenden.

## 7. Haftungsausschluss

Der Dienst wird **„wie besehen"** und **„nach Verfügbarkeit"** ohne jegliche Garantien bereitgestellt, weder ausdrücklich noch stillschweigend, einschließlich stillschweigender Garantien der Marktgängigkeit, Eignung für einen bestimmten Zweck oder Nichtverletzung.

Wir garantieren nicht, dass der Dienst ununterbrochen, fehlerfrei oder frei von schädlichen Komponenten ist.

## 8. Haftungsbeschränkung

Im größtmöglichen gesetzlich zulässigen Umfang haften Kara und seine verbundenen Unternehmen nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, die aus der Nutzung oder Nichtnutzbarkeit des Dienstes entstehen.

Unsere Gesamthaftung übersteigt in keinem Fall den Betrag, den du für den Dienst in den zwölf (12) Monaten vor dem Anspruch bezahlt hast.

## 9. Kündigung

Wir behalten uns das Recht vor, deinen Zugang zum Dienst jederzeit mit oder ohne Vorankündigung auszusetzen oder zu beenden, wenn wir Verhaltensweisen für einen Verstoß gegen diese Bedingungen oder als schädlich erachten.

Bei Kündigung erlischt die gewährte Lizenz automatisch. Bestimmungen, die ihrem Wesen nach die Kündigung überdauern sollen, bleiben in Kraft.

## 10. Anwendbares Recht

Diese Bedingungen unterliegen dem anwendbaren Recht und sind entsprechend auszulegen. Streitigkeiten werden in gutem Glauben gelöst, bevor formale Rechtsverfahren eingeleitet werden.

## 11. Änderungen der Bedingungen

Wir können diese Bedingungen jederzeit durch Veröffentlichung einer aktualisierten Version in der Anwendung überarbeiten. Wesentliche Änderungen werden per In-App-Benachrichtigung mitgeteilt. Die weitere Nutzung des Dienstes nach Inkrafttreten der Änderungen gilt als Zustimmung.

## 12. Kontakt

Bei Fragen zu diesen Bedingungen wende dich über die offiziellen Kara-Supportkanäle an uns.
`;

export const privacy = `
## Datenschutzrichtlinie

**Letzte Aktualisierung: 2. Mai 2026**

Deine Privatsphäre ist ein Grundprinzip von Kara, kein nachträglicher Gedanke. Kara ist **local-first** aufgebaut: Deine Daten befinden sich standardmäßig auf deinem Gerät. Diese Richtlinie erklärt genau, welche Daten wir verarbeiten, wie und warum.

## 1. Unser Grundprinzip

Kara arbeitet nach einem strikten **Opt-in**-Modell. Nichts wird ohne deine ausdrückliche und vorherige Genehmigung mit externen Diensten geteilt. Wir erfassen das Minimum an Daten, das für den Betrieb des Dienstes notwendig ist.

## 2. Lokal auf deinem Gerät gespeicherte Daten

Die folgenden Daten werden **ausschließlich auf deinem Gerät** gespeichert und niemals an Karas Server übertragen:

- **Gesprächsverlauf** — alle Nachrichten und Kontext in einer lokalen SQLite-Datenbank
- **Erlernte Erinnerungen und Fakten** — kontextuelle Informationen, die der Assistent über dich lernt
- **Benutzerkonfiguration** — Einstellungen, Präferenzen und Anwendungszustand
- **API-Schlüssel und Tokens** — im nativen Schlüsselbund des Betriebssystems gespeichert (verschlüsselt)
- **Lokale KI-Modelle** — Modell-Binärdateien in deinem lokalen Speicher
- **Skills und Plugins** — lokal unter deiner Kontrolle installiert

## 3. Daten, die dein Gerät verlassen können

Kara kann Daten nur in den folgenden expliziten Opt-in-Szenarien außerhalb deines Geräts übertragen:

**3.1 Anfragen an Cloud-KI-Anbieter**

Wenn du einen Cloud-KI-Anbieter (Anthropic, OpenAI, Google usw.) konfigurierst, werden deine Nachrichten und ein minimales Kontextfenster zur Antwortgenerierung an diesen Anbieter gesendet. Diese Daten unterliegen der **Datenschutzrichtlinie des jeweiligen Anbieters**.

**3.2 Skill-Integrationen mit externen Diensten**

Wenn du eine Skill installierst, die sich mit einem externen Dienst verbindet (z. B. Telegram, GitHub, Notion), werden nur die für die Funktion der Skill unbedingt erforderlichen Daten übertragen. Du musst jede Skill explizit installieren und konfigurieren.

**3.3 Anonyme Update-Prüfungen**

Wenn aktiviert (standardmäßig deaktiviert), kann Kara Update-Server kontaktieren. Die Anfrage enthält nur deine aktuelle Kara-Version und Plattform. Keine persönlichen Daten oder Gespräche sind enthalten.

## 4. Daten, die wir nicht erfassen

Kara **erfasst oder überträgt nicht**:

- Deinen vollständigen Gesprächsverlauf an unsere Server
- Dateien oder Code, mit denen du interagierst
- Deinen Standort
- Verhaltensanalysen oder Nutzungstelemetrie (außer bei explizitem Opt-in)
- Daten für Werbezwecke

## 5. Sicherheit

Wir wenden branchenübliche Sicherheitspraktiken an:

- **Geheimnisse (API-Schlüssel, Tokens)** werden ausschließlich im nativen Schlüsselbund des Systems gespeichert — niemals im Klartext
- **Die lokale Datenbank** ist nur für den Kara-Daemon-Prozess zugänglich (Dateiberechtigungen 600)
- **Die Netzwerkkommunikation** mit dem lokalen Daemon erfolgt ausschließlich über Loopback (localhost)
- **Verschlüsselung im Ruhezustand** für sensible Konfigurationen ist als Opt-in-Einstellung verfügbar

## 6. Datenspeicherung und -löschung

Lokale Daten werden unbegrenzt aufbewahrt, bis du sie löschst. Du hast die volle Kontrolle:

- Einzelne Sitzungen in den Kontoeinstellungen löschen
- Alle lokalen Daten jederzeit löschen
- Daten vor der Löschung exportieren

An KI-Drittanbieter übertragene Daten unterliegen **deren** Aufbewahrungsrichtlinien.

## 7. Deine Rechte

Abhängig von deiner Gerichtsbarkeit kannst du Rechte auf Auskunft, Berichtigung, Löschung und Datenportabilität haben. Da die meisten Daten lokal gespeichert sind, kannst du diese Rechte jederzeit direkt in der Anwendung ausüben.

## 8. Änderungen dieser Richtlinie

Bei wesentlichen Änderungen benachrichtigen wir dich über eine In-App-Benachrichtigung, bevor die Änderungen in Kraft treten. Die weitere Nutzung gilt als Zustimmung.

## 9. Kontakt

Bei datenschutzbezogenen Fragen wende dich über die offiziellen Kara-Supportkanäle an uns.
`;
