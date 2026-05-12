export const terms = `
## Conditions générales d'utilisation

**Dernière mise à jour : 2 mai 2026**

Veuillez lire attentivement ces Conditions générales avant d'utiliser Kara. En accédant ou en utilisant l'application, vous acceptez d'être lié par ces conditions. Si vous n'êtes pas d'accord avec l'une d'entre elles, vous ne devez pas utiliser le service.

## 1. Acceptation des conditions

En installant, accédant ou utilisant Kara (« l'Application », « le Service »), vous confirmez avoir au moins 16 ans, avoir lu et compris ces Conditions et accepter d'y être légalement lié. Si vous utilisez Kara au nom d'une organisation, vous déclarez avoir le pouvoir d'engager cette organisation.

## 2. Description du service

Kara est un **assistant IA local-first** qui fonctionne principalement sur votre appareil. Vos conversations, le contexte appris et votre configuration sont stockés localement. Kara peut optionnellement se connecter à des fournisseurs d'IA tiers (comme Anthropic ou OpenAI) uniquement lorsque vous configurez explicitement une clé API pour ces services.

## 3. Licence et utilisation autorisée

Sous réserve de ces Conditions, nous vous accordons une licence limitée, non exclusive, non transférable et révocable pour utiliser Kara à des fins personnelles ou professionnelles internes.

Vous acceptez de **ne pas** :

- Procéder à de la rétro-ingénierie, décompiler ou désassembler une partie de l'Application
- Utiliser le Service à des fins illégales, frauduleuses ou malveillantes
- Tenter d'accéder sans autorisation à tout système ou réseau
- Redistribuer, sous-licencier ou vendre l'Application sans autorisation écrite expresse
- Utiliser des outils automatisés pour extraire des données du Service

## 4. Comptes utilisateurs et sécurité

Vous êtes seul responsable de la confidentialité de vos identifiants et de toute activité effectuée depuis votre compte. Vous devez nous informer immédiatement de toute violation de sécurité ou utilisation non autorisée.

Kara stocke les informations d'identification sensibles (clés API, jetons) exclusivement dans le trousseau natif de votre système d'exploitation (Keychain macOS, Secret Service Linux, Gestionnaire de credentials Windows). Nous ne stockons jamais de secrets en clair.

## 5. Fournisseurs d'IA tiers

Lorsque vous configurez un fournisseur d'IA cloud (Anthropic, OpenAI, Google, etc.), vos messages et le contexte pertinent sont transmis à ce fournisseur pour générer des réponses. Cette transmission est soumise à la **politique de confidentialité et aux conditions du fournisseur concerné**, non à celles de Kara.

Vous reconnaissez que Kara n'est pas responsable des pratiques en matière de données des fournisseurs d'IA tiers. Si vous préférez qu'aucune donnée ne quitte votre appareil, vous pouvez configurer Kara pour utiliser exclusivement un modèle IA local.

## 6. Propriété intellectuelle

Tous les droits, titres et intérêts sur le Service (à l'exclusion du contenu généré par l'utilisateur) sont et resteront la propriété exclusive de Kara et de ses concédants. Ces Conditions ne vous accordent aucun droit d'utiliser une marque, un logo ou un nom commercial.

## 7. Exclusion de garanties

Le Service est fourni **« en l'état »** et **« selon disponibilité »**, sans garantie d'aucune sorte, expresse ou implicite, y compris les garanties implicites de qualité marchande, d'adéquation à un usage particulier ou de non-contrefaçon.

Nous ne garantissons pas que le Service sera ininterrompu, exempt d'erreurs ou de composants nuisibles.

## 8. Limitation de responsabilité

Dans toute la mesure permise par le droit applicable, Kara et ses affiliés ne seront pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs découlant de votre utilisation ou de votre impossibilité d'utiliser le Service.

En aucun cas notre responsabilité totale envers vous ne dépassera le montant que vous avez payé pour le Service au cours des douze (12) mois précédant la réclamation.

## 9. Résiliation

Nous nous réservons le droit de suspendre ou de résilier votre accès au Service à tout moment, avec ou sans préavis, pour des comportements que nous estimons contraires à ces Conditions ou préjudiciables.

À la résiliation, la licence accordée expirera automatiquement. Les dispositions qui, par leur nature, doivent survivre à la résiliation, continueront à s'appliquer.

## 10. Droit applicable

Ces Conditions sont régies et interprétées conformément au droit applicable. Tout litige découlant de ces Conditions sera résolu de bonne foi avant tout recours judiciaire formel.

## 11. Modifications des conditions

Nous pouvons réviser ces Conditions à tout moment en publiant une version mise à jour dans l'Application. Les modifications importantes seront notifiées via une notification in-app. L'utilisation continue du Service après l'entrée en vigueur des modifications vaut acceptation des Conditions révisées.

## 12. Contact

Pour toute question concernant ces Conditions, contactez-nous via les canaux de support officiels de Kara.
`;

export const privacy = `
## Politique d'utilisation des données

**Dernière mise à jour : 2 mai 2026**

Votre vie privée est un principe fondamental de Kara, pas une fonctionnalité accessoire. Kara est conçu en **local-first** : vos données résident sur votre appareil par défaut. Cette politique explique exactement quelles données nous traitons, comment et pourquoi.

## 1. Notre principe fondamental

Kara fonctionne sur un modèle strictement **opt-in**. Rien n'est partagé avec des services externes sans votre autorisation explicite et préalable. Nous collectons le minimum de données nécessaires au fonctionnement du Service.

## 2. Données stockées localement sur votre appareil

Les données suivantes sont stockées **exclusivement sur votre appareil** et ne sont jamais transmises aux serveurs de Kara :

- **Historique des conversations** — tous les messages et contexte, stockés dans une base SQLite locale
- **Mémoire et faits appris** — informations contextuelles que l'assistant apprend sur vous
- **Configuration utilisateur** — préférences, paramètres et état de l'application
- **Clés API et jetons** — stockés dans le trousseau natif de votre système (chiffré)
- **Modèles IA locaux** — binaires téléchargés dans votre stockage local
- **Skills et plugins** — installés localement sous votre contrôle

## 3. Données pouvant quitter votre appareil

Kara ne peut transmettre des données hors de votre appareil que dans les scénarios opt-in suivants :

**3.1 Requêtes aux fournisseurs d'IA cloud**

Si vous configurez un fournisseur d'IA cloud (Anthropic, OpenAI, Google, etc.), le contenu de vos messages et une fenêtre de contexte minimale seront envoyés à ce fournisseur pour générer des réponses. Ces données sont soumises à la **politique de confidentialité du fournisseur concerné**.

**3.2 Intégrations de skills avec des services externes**

Si vous installez une skill se connectant à un service externe (ex. Telegram, GitHub, Notion), seules les données strictement nécessaires à la fonction de cette skill seront transmises. Vous devez installer et configurer chaque skill explicitement.

**3.3 Vérifications anonymes des mises à jour**

Si activé (désactivé par défaut), Kara peut contacter des serveurs de mise à jour. Cette requête contient uniquement votre version de Kara et votre plateforme. Aucune donnée personnelle ou conversation n'est incluse.

## 4. Données que nous ne collectons pas

Kara **ne collecte ni ne transmet** :

- Votre historique complet de conversations vers nos serveurs
- Les fichiers ou le code avec lesquels vous interagissez
- Votre localisation
- Des analyses comportementales ou de télémétrie (sauf opt-in explicite)
- Des données à des fins publicitaires

## 5. Sécurité

Nous appliquons les meilleures pratiques de sécurité :

- **Les secrets (clés API, jetons)** sont stockés exclusivement dans le trousseau natif du système, jamais en clair
- **La base de données locale** n'est accessible que par le processus daemon de Kara (permissions 600)
- **La communication réseau** avec le daemon local s'effectue uniquement via loopback (localhost)
- **Le chiffrement au repos** pour la configuration sensible est disponible en option opt-in

## 6. Conservation et suppression des données

Les données locales sont conservées indéfiniment sauf si vous choisissez de les supprimer. Vous avez le contrôle total :

- Supprimer des sessions individuelles depuis les paramètres du compte
- Purger toutes les données locales à tout moment
- Exporter vos données avant suppression

Les données transmises aux fournisseurs d'IA tiers sont soumises à **leurs** politiques de conservation.

## 7. Vos droits

Selon votre juridiction, vous pouvez avoir des droits d'accès, de rectification, de suppression et de portabilité. La majorité des données étant stockées localement, vous pouvez exercer ces droits directement depuis l'application.

## 8. Modifications de cette politique

En cas de modifications importantes, nous vous en informerons via une notification in-app avant leur entrée en vigueur. L'utilisation continue vaut acceptation.

## 9. Contact

Pour toute question relative à la confidentialité, contactez-nous via les canaux de support officiels de Kara.
`;
