# Projet : Site web association La Boule de Neige

## Multilingue (fr/en/de)

- **2026-08-27** : Adrien a demandé une version anglaise et allemande du site. Décision : Claude
  traduit directement (pas de traducteur professionnel côté client pour l'instant), **mais ces
  traductions doivent être relues par un locuteur natif avant toute mise en ligne publique** —
  Claude n'est pas un traducteur certifié, et le ton très travaillé du site (voir "Principes
  d'écriture" plus bas) est plus difficile à garantir dans une langue non-source.
- Approche : un sous-dossier par langue (`en/`, `de/`), qui reproduit la structure des pages
  racine (françaises). Le français reste à la racine sans changement d'URL (`index.html`,
  `histoire.html`, etc.), pas de dossier `fr/` séparé.
- **Déploiement en deux phases**, pour ne pas devoir tout refaire si le style de traduction doit
  être ajusté après relecture :
  - **Phase 1 (faite le 2026-08-27)** : `index.html` et `histoire.html`, les deux pages dont le
    français venait d'être validé par Nicole/Gérald. Fichiers : `en/index.html`,
    `en/histoire.html`, `de/index.html`, `de/histoire.html`.
  - **Phase 2 (faite le 2026-08-30)** : `newsletter.html`, `rapports.html`, `contact.html`,
    `don.html` traduites en anglais et allemand (8 nouveaux fichiers). Décision d'Adrien de
    lancer la phase 2 sans attendre une relecture de la phase 1 : il a déjà prévenu Nicole/Gérald
    que les traductions ne sont pas certifiées et seront corrigées au fil de l'eau, donc pas
    besoin d'un point de blocage intermédiaire. Le site est maintenant intégralement traduit
    dans les 3 langues, plus de mélange FR/EN/DE dans la navigation
  - **Piège évité de justesse en phase 2** : `js/rapports.js` avait le même problème de chemin
    relatif que `photos-accueil.js`/`histoire-carousel.js` en phase 1 (`'assets/rapports/' +
    fichier`, qui aurait pointé vers `/en/assets/rapports/...` depuis `en/rapports.html`).
    Corrigé en chemin absolu avant même de publier la page anglaise, donc jamais cassé en
    pratique. Le libellé "Rapport annuel (PDF)" de chaque carte était aussi codé en dur en
    français ; rendu traduisible via un petit dictionnaire `rapportsLabelTextes` (même principe
    que les autres scripts partagés fr/en/de)
  - Formulaire newsletter sur `en/`/`de/` : poste vers la même liste Brevo unique ("Newsletter
    site web"), pas de liste séparée par langue. Le champ caché `locale` est bien mis à jour
    (`en`/`de`) pour refléter la langue de la page, mais **le contenu de l'e-mail de
    confirmation double opt-in reste en français** : le template Brevo sélectionné est unique,
    pas encore décliné par langue. Détail mineur, à améliorer plus tard si ça pose souci (créer
    des templates par langue dans Brevo et les faire correspondre à `locale`)
  - Formulaire contact sur `en/`/`de/` : garde le même `name="contact"` que la version française,
    volontairement, pour que toutes les soumissions (quelle que soit la langue de la page)
    atterrissent dans le même formulaire Netlify plutôt que d'en créer un par langue
- Sélecteur de langue : `<li class="lang-switch">` ajouté à la fin de la liste `.main-nav ul`
  sur chaque page (donc il s'affiche aussi dans le menu mobile, sans code supplémentaire). Trois
  liens FR/EN/DE, la langue courante marquée `aria-current="true"`. Chaque page doit lister ses
  propres liens en dur (site codé à la main, pas de génération dynamique) : depuis la racine,
  les liens vers `en/`/`de/` sont relatifs à ce sous-dossier ; depuis `en/`/`de/`, le lien FR
  remonte d'un niveau (`../index.html`).
- ~~Pages pas encore traduites~~ **Toutes les pages sont traduites depuis le 2026-08-30** (voir
  phase 2 ci-dessus). Les liens de nav depuis `en/`/`de/` pointent maintenant vers les versions
  traduites dans le même sous-dossier, plus vers la racine française.
- **Piège technique rencontré** : `js/photos-accueil.js` et `js/histoire-carousel.js`
  construisaient un chemin d'image relatif à la page HTML (`'assets/img/...'`). Depuis
  `en/index.html`, ce chemin relatif pointait vers `/en/assets/img/...` (inexistant) au lieu de
  `/assets/img/...`. Corrigé en chemins absolus (`'/assets/img/...'`), qui fonctionnent quelle
  que soit la profondeur de la page. Point à vérifier pour tout futur script JS partagé entre
  page racine et sous-dossiers de langue.
- Les textes injectés par ces deux scripts (légende alt de la photo tournante, "Photo à venir",
  libellés des flèches du carrousel) sont désormais choisis selon `document.documentElement.lang`
  de la page (objet de traductions `fr`/`en`/`de` en tête de chaque fichier JS), pour rester
  cohérents même si le site est en anglais ou en allemand.
- Le nom de l'association ("La Boule de Neige") n'est **pas traduit**, y compris dans les
  titres anglais/allemands ("A small gesture can snowball", "Eine kleine Geste kann einen
  Schneeball ins Rollen bringen") : c'est un nom propre, comme pour la plupart des associations
  locales sans nom de marque établi dans d'autres langues.
- Choix de traduction à noter pour la relecture : "association reconnue d'utilité publique" →
  EN "association recognized as being of public benefit", DE "als gemeinnützig anerkannter
  Verein" (équivalents du statut fiscal suisse, pas de traduction littérale mot à mot possible).
  "Le tô" (plat traditionnel burkinabè) volontairement non traduit, gardé tel quel avec une
  explication contextuelle ("their staple food" / "ihr wichtigstes Nahrungsmittel"), comme en
  français.

## Contexte

Site vitrine pour La Boule de Neige, association qui soutient des projets au Burkina Faso.
Client : Nicole Rossellat, avec son mari Gérald Rossellat-Aguet (comité de l'association,
tous deux signent les rapports annuels). Stack habituelle : HTML/CSS/JS codé à la main
(pas de CMS, pas de template), hébergement GitHub → Netlify, domaine Infomaniak.

Dépôt Git initialisé localement le 2026-08-09 (`git init`, pas encore poussé sur GitHub, voir
question "Infrastructure technique" plus bas pour la question du compte propriétaire). `node_modules/`
et `.claude/` sont dans `.gitignore` (résidus locaux, rien à voir avec le site statique). Habitude
prise avec Adrien : committer avant un changement visuel qui divise (ex. logo/drapeau), pour
pouvoir revenir en arrière facilement si le résultat ne plaît pas une fois vu en vrai.

Coordonnées officielles de l'association (confirmées via le rapport annuel 2025) :
- Adresse : Chemin des Cyprès 10, 1226 Thônex
- E-mail : contact@labouledeneige.ch (adresse dédiée créée le 2026-08-19 via kSuite Infomaniak,
  remplace l'ancienne adresse personnelle nicole.rossellat@starlac.ch utilisée jusque-là sur le
  site, cf. "Adresse e-mail dédiée" dans les questions résolues)
- Téléphone : 076 379 49 16 (portable), 022 349 49 16 (domicile)
- IBAN : CH05 0900 0000 1706 5225 3
- Association reconnue d'utilité publique (dons exonérés d'impôt)

## Structure du site

1. **Page de présentation de l'association** — mission, historique, actions concrètes au Burkina Faso
   - La frise "Notre histoire" renvoie vers une page dédiée (`histoire.html`, point 6) pour le récit complet
   - **2026-08-10** : photo du hero rotative, une par jour. Idée d'Adrien pour rendre le site
     vivant sans imposer un quota de photos au client. Les photos vont dans
     `assets/img/photos-accueil/`, la liste des fichiers actuellement disponibles est dans
     `js/photos-accueil.js` (même principe que `js/rapports.js` : déposer le fichier, ajouter une
     ligne, terminé, sans quantité minimum ou maximum). La photo affichée est choisie par
     `jour de l'année % nombre de photos`, pas par jour du mois : pas de gestion des mois à 28/30/31
     jours, juste un tas continu de photos qui tourne en boucle. Tant que le tableau est vide, le
     `placeholder-visual` d'origine reste affiché tel quel, donc rien ne casse en attendant les
     premières photos (Adrien doit en demander à Nicole/Gérald, même une ou deux pour commencer)
   - **2026-08-10** : légende sous la photo, ajoutée à la demande d'Adrien. Nicole/Gérald
     nomment leurs fichiers de façon descriptive (ex. `Puits creuse pres du village en 2019.jpg`),
     et la légende affichée est extraite directement du nom de fichier (`legendeDepuisNomFichier`
     dans `js/photos-accueil.js` : extension retirée, tirets/underscores remplacés par des
     espaces). Aucune saisie séparée à faire : la légende suit automatiquement la photo du jour
     puisqu'elle vient du même fichier. Testé et fonctionnel
   - **2026-08-27** : Nicole et Gérald ont renvoyé `Textes du site - accueil et histoire.docx`
     (dans `../La Boule de Neige - documents internes/`) avec leurs corrections. Changement
     majeur : la frise "Notre histoire" passe de 5 à 22 entrées (1986 à 2025, quasi une par
     année), rendant cette section de l'accueil beaucoup plus longue qu'avant. Autres
     corrections notables : date de fondation précisée (30 novembre, pas le 1er, voir aussi
     "Questions en attente"), "un thé" corrigé en "le tô" (plat traditionnel burkinabè, sur
     `histoire.html`), mission reformulée avec référence légale ("association, selon les
     articles 60 du Code Civil Suisse" au lieu de "association familiale"). Le texte français
     de `index.html` et `histoire.html` est maintenant aligné sur ce document ; l'ancienne
     version du fichier Word est gardée en référence sous `...-old.docx`
   - **2026-08-30** : premières vraies photos reçues et intégrées, depuis
     `../La Boule de Neige - documents internes/Photos/Photos pour le site/`. Dossier
     "Photos Accroche OK" (64 fichiers) → `assets/img/photos-accueil/`, tableau `photosAccueil`
     dans `js/photos-accueil.js` rempli. Comme la légende publique est extraite directement du
     nom de fichier, les coquilles manifestes du dossier source ont été corrigées en copiant
     (accents, doublons de lettres, espaces doubles : "enfanfs" → "enfants", "Madaga" →
     "Mahadaga", "avac" → "avec", "jusq'à" → "jusqu'à", etc.), mais le contenu n'a pas été
     réécrit. `legendeDepuisNomFichier()` a aussi été rendue capable de retirer automatiquement
     un suffixe de numérotation en fin de nom (` 2`, `-3`, ` (2)`), utile pour les prochaines
     photos que Nicole/Gérald ajouteront eux-mêmes et qui porteront probablement le même genre
     de suffixe de l'appareil photo/téléphone. Décision d'Adrien : les prénoms de partenaires
     burkinabè déjà présents dans certains noms de fichiers (Ezéchiel, familles Lompo, Fidèle,
     etc.) sont conservés tels quels dans la légende publique — ça répond dans les faits à la
     question longtemps restée ouverte "utilisation de vrais prénoms" (voir plus bas), la photo
     de couverture les diffusant maintenant chaque jour sur les 3 langues du site.
   - **2026-08-30** : nouvelle section carrousel sous la frise "Les grandes étapes", demandée par
     Adrien pour montrer des photos reliées à une année précise (pas de légende détaillée, juste
     l'année en incrustation). Nouveau fichier `js/grandes-etapes.js` (même logique de flèches
     manuelles que `js/histoire-carousel.js`, mais un seul carrousel séquentiel plutôt que des
     slots par section), tableau `grandesEtapesPhotos` de `{ annee, fichier }` dans l'ordre
     chronologique. Photos dans `assets/img/grandes-etapes/` (22 fichiers, dossier "Photos Les
     grandes étapes OK" du client). Toutes les années de la frise n'ont pas de photo (1986, 2001,
     2005, 2013, 2014, 2019, 2020 manquantes) et certaines en ont deux (2004, 2022, 2025) :
     confirmé avec Adrien, le carrousel affiche simplement toutes les photos disponibles dans
     l'ordre, années répétées comprises, sans chercher à en garder une seule par année
   - **Retour de Nicole/Gérald le 2026-08-30** (après avoir vu le lien d'aperçu Netlify), premiers
     retours de relecture reçus par WhatsApp et e-mail :
     - Recadrage : sur 3 photos (2003, 2010, 2024), le visage était coupé en haut du cadre à
       cause du recadrage automatique `object-fit: cover` centré. Ajout d'un champ optionnel
       `position` dans `grandesEtapesPhotos` (`js/grandes-etapes.js`), qui applique
       `object-position: top` à ces 3 entrées plutôt que le centrage par défaut. Vérifié au
       rendu : les 3 têtes sont maintenant entièrement visibles
     - **Suite le même jour** : même après ce correctif, la photo 2010 (Alain dans la neige,
       format carré 4000×4000) restait jugée "trop proche" une fois forcée dans le cadre large
       et bas du carrousel — `cover` zoome nécessairement fort sur un carré inséré dans un cadre
       très rectangulaire, quelle que soit la position choisie. Ajout d'un second champ optionnel
       `fit` (en plus de `position`) qui bascule cette photo en `object-fit: contain` : la photo
       entière est visible (cairn, montagne, contexte), avec des bandes latérales comblées par
       `--color-bg-alt` plutôt qu'une couleur criarde. `.etapes-carousel-img` a une couleur de
       fond en permanence pour cette raison, invisible sur toutes les photos en `cover` (qui
       remplissent tout le cadre) et utile uniquement pour celles en `contain`
     - Ordre des 2 photos de 2004 inversé : "le tracteur" passe avant "la charrue" (remarque de
       Gérald : on ne met pas la charrue avant les bœufs)
     - Texte 2010 (frise "Les grandes étapes", `index.html`) : "Achat de livres" → "Achat de
       livres **scolaires**" (mot manquant), répercuté sur les traductions en/de
     - Texte 2023 : reformulé selon le texte exact fourni par Nicole/Gérald, qui ajoute une
       précision importante absente jusque-là ("...grâce à leur courage, malgré l'insécurité qui
       règne à Kompienga"), répercuté sur les traductions en/de
     - ~~Question en suspens : "il manque l'onglet Notre histoire"~~ **Résolu le 2026-09-02** :
       Nicole/Gérald ont confirmé vouloir un accès direct depuis le menu malgré tout. Lien
       "Notre histoire" ajouté au menu principal (juste après "L'association", avant
       "Newsletter" — thématiquement un prolongement de la présentation de l'association) sur
       les 18 pages du site (6 pages × fr/en/de), plus dans le pied de page de chaque page. Sur
       `histoire.html` elle-même, le lien du pied de page est omis (même logique que
       "L'association" absent du pied de page de `index.html` : pas de lien vers soi-même)
   - **Nouveau passage sur le lien d'aperçu, même jour** : deux photos supplémentaires touchées
     par le même problème que 2010 malgré le premier correctif `position: top` : 2025
     (Maraîchage, tête totalement coupée cette fois, pas juste rognée) et 2024 (tête bien
     visible depuis le correctif, mais cadrage jugé "trop proche" comme 2010 l'avait été). Point
     commun aux 3 (2010, 2024, 2025) : ce sont des photos très hautes (portrait ou carrée)
     forcées dans un cadre large et bas, `cover` doit alors zoomer énormément quel que soit le
     point d'ancrage choisi. Les deux basculées en `fit: 'contain'` plutôt que `position: 'top'`
     (voir définition du champ `fit` plus haut) : photos entières visibles, plus aucun recadrage.
     `position: 'top'` reste correct pour 2003 (portrait mais moins extrême, jamais signalé comme
     trop serré) : à surveiller si un jour ça revient dans un retour
2. **Page newsletter** — inscription (formulaire simple email), éventuellement archive des newsletters passées
   - ~~Le formulaire capture les inscrits via Netlify Forms~~ **Remplacé le 2026-08-30** : le
     formulaire d'inscription poste maintenant directement vers Brevo, plus besoin d'export
     CSV manuel ni de Netlify Forms pour la newsletter (contact.html reste sur Netlify Forms,
     lui). Compte Brevo créé et connecté par Nicole/Gérald sur l'ordinateur d'Adrien, liste
     dédiée "Newsletter site web" (dossier "Your First Folder" par défaut du compte). Recette
     suivie : Marketing → Formulaires → Pleine page/intégré → conception (champ Captcha
     supprimé du formulaire Brevo, icône poubelle qui apparaît au survol en haut à droite du
     bloc sélectionné — pas évident à trouver) → Listes (nouvelle liste créée plutôt que
     réutiliser "Votre première liste" par défaut) → Paramètres : **double opt-in gardé**
     (template de confirmation par défaut, aucune case supplémentaire cochée), décision prise
     avec Adrien pour répondre à la question LPD suisse en attente (voir "Mentions légales /
     confidentialité" plus bas) plutôt que pour la conformité seule : le double opt-in donne une
     preuve de consentement explicite, et le coût en friction est faible (un clic, geste connu)
     vu le faible volume d'envois (2-3/an) → Partager → onglet "HTML simple", code récupéré et
     les éléments utiles branchés sur notre formulaire déjà stylé (action = URL unique
     `sibforms.com/serve/...`, champ `name="EMAIL"`, honeypot `name="email_address_check"`
     réutilisant notre `.form-honeypot` existant plutôt que le CSS de Brevo, champs cachés
     `locale`/`html_type`). Tout le reste du code généré par Brevo (styles, police Roboto,
     structure de formulaire) a été jeté
   - **Panne de délivrabilité découverte et corrigée le 2026-09-01** : premier test réel par
     Adrien (avant que le lien soit envoyé à Nicole/Gérald), aucun e-mail de confirmation reçu.
     Diagnostic : Brevo → Transactionnel → Statistiques montrait 100% de "soft bounce" sur
     l'e-mail "Valider votre inscription", malgré une réponse `success:true` du formulaire (donc
     la requête arrivait bien, seul l'envoi de l'e-mail échouait). Cause : Brevo → Expéditeurs,
     domaine, IP → Expéditeurs indiquait une signature DKIM "par défaut" (générique Brevo, pas
     propre au domaine), ce qui se heurtait à la politique DMARC stricte déjà en place sur
     `labouledeneige.ch` (`p=reject`, configurée par kSuite pour la messagerie). Résolu en
     authentifiant le domaine dans Brevo (Expéditeurs, domaine, IP → Domaines → Ajouter un
     domaine → méthode "Manuelle", Infomaniak n'étant pas dans la liste des fournisseurs pris en
     charge par la méthode automatique) : 3 enregistrements DNS ajoutés dans la zone
     `labouledeneige.ch` chez Infomaniak (TXT `@` de vérification + 2 CNAME `brevo1._domainkey`/
     `brevo2._domainkey`), propagation confirmée en quelques minutes (vérifiée via `nslookup`
     contre 8.8.8.8 avant même de retester dans Brevo). Le 4e enregistrement suggéré par Brevo
     (TXT `_dmarc`) a été volontairement ignoré : un `_dmarc` existait déjà (plus strict, `p=reject`
     vs `p=none` proposé par Brevo), le dupliquer aurait risqué de casser la validation DMARC
     existante — pas nécessaire de toute façon, l'alignement DKIM à lui seul suffit à satisfaire
     DMARC. Domaine authentifié avec succès dans Brevo. Test de confirmation reçu par Adrien
     (dans Chrome ; un essai précédent dans un autre navigateur/onglet n'avait rien redonné en
     logs, probablement une adresse déjà en attente de confirmation d'un essai antérieur plutôt
     qu'un vrai second problème). Le formulaire newsletter est donc validé de bout en bout,
     y compris la délivrabilité réelle, pas seulement le POST technique
   - **Vérification technique faite avant de coder** : les deux formulaires du site postent en
     AJAX (`fetch`) pour éviter un rechargement de page, mais Brevo est un domaine différent
     (`sibforms.com`) contrairement à Netlify (même origine). Risque de blocage CORS testé
     concrètement (petite page de test + Playwright, requête réelle vers l'URL Brevo) avant
     d'écrire le code définitif : Brevo répond avec un en-tête `Access-Control-Allow-Origin` qui
     reflète dynamiquement l'origine de la requête, donc `fetch()` fonctionne sans contournement
     particulier (pas besoin de la technique classique "form target=iframe caché" envisagée un
     temps en cas d'échec du test)
   - Formulaires newsletter et contact soumis en AJAX (`js/main.js`, sélecteur générique
     `form[data-ajax-form]` posé sur les deux formulaires) avec message de confirmation affiché
     à la place du formulaire, sans rechargement de page. Le formulaire contact garde en plus
     `data-netlify="true" netlify-honeypot="bot-field"` (nécessaire à Netlify pour détecter le
     formulaire au build) et ne fonctionne donc que sur un vrai déploiement Netlify ; le
     formulaire newsletter (Brevo) fonctionne lui même en local puisque le POST part
     directement vers un service externe
   - **2026-08-30** : première vraie newsletter reçue de Nicole/Gérald (`Newsletter Septembre
     2026.pdf`, déposée par Adrien dans un dossier `assets/newsletter/`). Renommé en chemin/nom
     cohérents avec le reste du site : `assets/newsletters/newsletter-2026-09.pdf` (dossier au
     pluriel comme `assets/rapports/`, nom en `AAAA-MM` pour trier chronologiquement et gérer
     plusieurs envois par an). Section "Newsletters précédentes" (jusque-là un texte de
     remplacement) remplacée par une vraie grille, même principe que la page rapports :
     `js/newsletters.js` (tableau `newsletters` de `{ annee, mois, fichier }`, dictionnaire de
     noms de mois par langue `moisTextes` pour afficher "Septembre 2026" / "September 2026" /
     "September 2026" selon fr/en/de). CSS `.newsletters-grid`/`.newsletter-card` factorisé avec
     `.rapports-grid`/`.rapport-card` (sélecteurs combinés, même style visuel), avec une taille de
     police réduite pour le libellé "mois année" qui est plus long qu'une simple année
   - **Visuel de la newsletter, même jour** : l'encart "Visuel ou capture d'une newsletter
     précédente à intégrer ici" (placeholder d'origine, à côté du formulaire d'inscription) laissé
     vide dans la version finale aurait été moins engageant. Remplacé par un vrai aperçu : première
     page du PDF reçu convertie en image (`assets/img/newsletter-apercu.jpg`, généré via PyMuPDF,
     zoom ×2.2 pour rester net), cliquable et ouvre le PDF complet comme les cartes de rapports.
     Pas automatisé : à chaque nouvelle newsletter, il faudra régénérer cette image à partir de la
     première page du nouveau PDF (petit script Python à une ligne, PyMuPDF déjà utilisé ailleurs
     dans ce projet pour la manipulation de PDF) — étape manuelle en plus du dépôt de fichier +
     ligne dans `js/newsletters.js`, mais reste un geste de quelques secondes pour 2-3 envois/an
   - **2026-09-02** : première mise à jour concrète de ce processus manuel. Nicole/Gérald ont
     corrigé une phrase en première page (`newsletter-2026-09.pdf` remplacé, même nom de
     fichier). Ancien fichier déplacé par Adrien vers `../La Boule de Neige - documents
     internes/Newsletters (anciennes versions)/newsletter-2026-09-old.pdf` plutôt que laissé
     dans les fichiers publics du site. Aperçu régénéré (`assets/img/newsletter-apercu.jpg`),
     rien à changer côté `js/newsletters.js` puisque le nom de fichier n'a pas changé
3. **Page rapports annuels** — rapports PDF fournis par le client, organisés par année
   - Grille de "cartes-année", du plus récent au plus ancien
   - Chaque carte = année en évidence + éventuellement vignette PDF + lien qui ouvre le PDF dans un nouvel onglet
   - Ne pas dupliquer le contenu des rapports en texte sur la page
   - Si plusieurs documents par année apparaissent un jour (rapport + annexes), passer à un accordéon par année plutôt qu'une simple carte
   - Convention de nommage des fichiers : `assets/rapports/rapport-AAAA.pdf` (minuscules, tiret, sans espace) ; le tableau qui pilote la grille est dans `js/rapports.js`
   - **Historique** : pour 2025, Nicole a fourni deux PDF, un rapport narratif (5 pages) et une version "_complet" avec annexe financière détaillée + bulletin de versement QR (IBAN, adresse, téléphone du domicile). D'abord gardée hors du site public par précaution. **Résolu le 2026-08-18** : Nicole/Gérald ont validé la publication de la version complète, `rapport-2025.pdf` est maintenant cette version à 6 pages (voir section "Questions en attente" pour le détail)
   - **2026-08-08** : Nicole/Adrien ont fourni les 24 rapports 2002-2025 (dans `assets/rapports/`). Pas de rapport 2001 : l'association a été fondée le 30 novembre 2001, donc pas d'exercice complet cette année-là. Le rapport 2015 était scanné en 3 fichiers recto-verso façon livret (pages 1+6, 2+5, 3+4) ; reconstitué en un seul PDF 6 pages dans l'ordre via un script Python (PyMuPDF + Pillow, découpage puis réassemblage des demi-pages). **Confirmé en réunion le 2026-08-10** : Nicole et Gérald n'ont que cette version scannée en 3 morceaux, il n'existe pas de meilleur original à demander. Notre reconstitution reste donc la version définitive
4. **Page de contact** — formulaire (Netlify Forms comme pour les autres projets), coordonnées de l'association
5. **Page de donation** — affichage du QR code fourni par le client, éventuellement lien IBAN/coordonnées bancaires en complément
   - QR code et IBAN récupérés depuis le bulletin de versement du rapport annuel 2025 (`assets/img/qr-don.png`), vérifié scannable (décodage QR Suisse SPC confirmé)
   - **2026-08-27** : IBAN/titulaire/adresse mis en `<strong>` dans `.iban-block` à la demande
     d'Adrien, pour rester lisible pour un public plus âgé. Ajout d'un bouton "Télécharger le
     bulletin de versement (PDF)" (`assets/documents/bulletin-versement.pdf`, fourni par le
     client) pour les donateurs qui préfèrent payer au guichet plutôt qu'en ligne
6. **Page histoire (`histoire.html`)** — le récit fondateur complet de l'association, pas dans le nav
   principal, accessible via un lien depuis la frise "Notre histoire" de la page d'accueil. Contenu
   basé sur `a Naissance de notre Association et buts.docx` (voir Notes diverses)
   - **2026-08-10** : idée d'Adrien, mise en page texte/photo alternée gauche-droite pour les 4
     sections narratives ("Une correspondance qui dure seize ans", "Le voyage de 2001", "Le
     premier pas", "Quatre axes d'action"), en réutilisant la grille `split-section` existante en
     alternant simplement l'ordre des blocs dans le HTML. Chaque section a un
     `<div class="photo-carousel" data-section="...">` rempli par `js/histoire-carousel.js`, qui
     lit le tableau `histoirePhotos` (photos dans `assets/img/histoire/`). Volontairement
     différent du système de photo tournante de l'accueil : ici chaque photo illustre un moment
     précis, donc Nicole/Gérald doivent désigner quelle photo va avec quelle section, pas de
     rotation automatique
     - 0 photo pour une section → `placeholder-visual` affiché, comme ailleurs sur le site
     - 1 photo → juste l'image, aucune flèche
     - Plusieurs photos → flèches précédent/suivant manuelles (rondes, semi-transparentes,
       inspirées d'un exemple qu'Adrien a montré). Défilement automatique volontairement écarté
       (mauvaise pratique d'accessibilité, distrait pendant la lecture du texte à côté)
     - Section "Quatre axes d'action" pensée pour accueillir 4 photos (une par axe : eau,
       éducation, développement rural, aide humanitaire) dans ce même carrousel, plutôt qu'une
       photo générique unique
     - Testé avec des images de remplacement dans les 3 configurations (0, 1, plusieurs), tableau
       remis à vide ensuite en attendant les vraies photos
     - **Correctif du même jour** : quand le texte d'une section est nettement plus long que la
       photo (cas de "Quatre axes d'action", 5 blocs de texte), la boîte photo gardait sa hauteur
       minimale et laissait un grand vide en dessous (repéré par Adrien sur une capture). Corrigé
       avec une classe `.split-photo` (ajoutée uniquement sur les 4 sections concernées de
       `histoire.html`, pas sur `.split-section` globalement pour ne pas affecter newsletter.html
       et contact.html qui l'utilisent aussi) : `align-items: stretch` plutôt que `start`, avec
       `.photo-carousel` et son placeholder en `height: 100%` pour remplir toute la hauteur de la
       colonne de texte en face
   - **2026-08-30** : intégration des vraies photos, depuis `../La Boule de Neige - documents
     internes/Photos/Photos pour le site/` (dans `assets/img/histoire/`, tableau `histoirePhotos`
     de `js/histoire-carousel.js`) :
     - `correspondance` ← "Notre histoire/02 Alain Correspondance.jpg", `voyage` ← "Notre
       histoire/01 Un âne et une charrette.jpg" (logique : le texte de cette section reparle
       justement de la charrette de 1986 qu'ils retrouvent en 2001, pas la section
       "correspondance" comme le nom du fichier le suggérerait au premier abord), `premierPas` ←
       "Notre histoire/03 Achat des boeufs...", mapping donné explicitement par Adrien
     - `axes` : finalement 3 photos et non 4 comme envisagé au départ (dossier "4 axes d'action"
       du client n'en contient que 3, rien pour "Aide humanitaire") : Forage 2023 → Eau,
       Éducation et scolarisation → Éducation, Maraîchage → Développement rural
     - **"Voir plus" ajouté sur cette section** : le bloc de texte "Quatre axes d'action" est de
       loin le plus long du site (intro + 4 sous-titres), et les 3 photos ont des ratios très
       variés (une notamment très haute et étroite, 2300×4100). Comme `.split-photo` étire déjà
       la colonne photo à la hauteur du texte (`object-fit: cover`), le risque n'était pas un
       vide visuel (déjà réglé) mais un recadrage trop agressif si la colonne devenait très
       haute. Les 2 derniers axes ("Développement rural", "Aide humanitaire") sont donc repliés
       par défaut derrière un bouton "Voir plus", classes génériques `.text-collapse` /
       `.text-collapse-content` / `.text-collapse-toggle` (CSS dans `css/style.css`, toggle JS
       dans `js/main.js`, réutilisable ailleurs si un cas similaire se présente — les libellés du
       bouton viennent des attributs `data-label-more`/`data-label-less` pour rester traduits sur
       en/de). Vérifié au rendu : le recadrage de la photo de forage reste correct même replié
     - Nouvelle photo pour la section "Notre façon de travailler" (jusque-là plein texte, sans
       photo) : "Photo pour le texte/Séance de travail pour de nouveaux projets à Kompienga
       2009.jpg" — photo qu'Adrien n'arrivait pas à situer au départ ("à voir où on la met, elle
       est importante"), mais elle correspondait aussi à un fichier identique déjà présent dans
       le dossier "Photos Accroche OK" (donc aussi utilisée dans la rotation de l'accueil).
       Placement choisi par Claude et validé par Adrien ("je te laisse gérer") : section convertie
       en `split-section split-photo` avec `<div class="photo-carousel" data-section="travail">`,
       cohérent thématiquement ("séance de travail" ↔ "notre façon de travailler")
   - **Retour d'Adrien le 2026-08-30** (après un nouveau passage sur l'aperçu) : les photos
     "voyage" et "premierPas" (au format paysage classique, ratio ~1.5) paraissaient incomplètes,
     recadrées trop serré sur les côtés — la femme partiellement coupée sur la photo de la
     charrette, par exemple. Cause : `.split-photo` étire la colonne photo à la hauteur exacte de
     la colonne de texte en face (voir correctif ci-dessus), et un texte de 3 paragraphes donne
     une colonne bien plus haute que large, forçant `object-fit: cover` à rogner fortement les
     bords d'une photo panoramique pour remplir ce format presque carré. Contrairement au cas
     "Quatre axes d'action" (déjà traité avec "voir plus"), ici pas besoin de replier du texte :
     un simple plafond `max-height: 30rem` sur `.photo-carousel`, son placeholder et
     `.carousel-img` suffit. Au-delà de ce plafond, la colonne photo s'arrête et le texte continue
     normalement dans sa propre colonne : pas de "trou" visible, rien ne matérialise cet espace
     (ni bordure ni fond différent). Résultat vérifié sur les 5 sections de la page : nettement
     plus de contexte visible sur "voyage" et "premierPas", aucune régression sur les 3 autres
   - **Suite le même jour** : le plafond fixe `max-height: 30rem` réglait bien le cas extrême
     (texte très long), mais pour "voyage" et "premierPas" spécifiquement (photos au format
     paysage classique ~3:2), il restait un problème sur une plage de largeurs d'écran entre le
     passage 1/2 colonnes et le plein desktop (~800-1100px, un format d'écran d'ordinateur
     courant) : à ces largeurs, la colonne photo devenait presque carrée voire plus haute que
     large (mesuré : ratio jusqu'à 0.73 à 801px, alors que la photo elle-même est à 1.5), recadrant
     une bonne partie des bords. Une personne sortait presque entièrement du cadre sur la photo
     "premierPas" à ces largeurs (repéré par Adrien sur une capture). Remplacé le modèle
     hauteur/plafond par `aspect-ratio: 3 / 2` pour ces 2 sections uniquement (`align-self: start`
     pour sortir de l'étirement de `.split-photo`) : la boîte garde exactement le ratio de la
     photo à n'importe quelle largeur d'écran, vérifié en scannant 9 largeurs de 375 à 1440px
     (ratio resté à 1.5 partout, recadrage minimal). Les autres sections (`correspondance`,
     `axes`, `travail`) gardent le modèle `max-height: 30rem` d'origine, non concernées par ce
     problème (photos plus proches d'un ratio carré/portrait, où le plafond fixe fonctionne bien) :
     à garder en tête si un jour elles montrent le même souci sur cette plage de largeurs
7. **Page d'attente (`bientot-disponible.html`)** — pas un vrai contenu du site, page autonome
   créée le 2026-08-10 en vue de l'enregistrement du domaine `labouledeneige.ch` prévu le
   2026-08-11. Inspirée d'une page similaire faite par Adrien pour un autre client
   (charbonade-acacia.ch) : logo, "Prochainement / Notre nouveau site arrive bientôt", message
   rassurant, coordonnées (adresse, e-mail, portable). Pas encore branchée nulle part ; l'idée est
   de la renommer en `index.html` (ou de faire une redirection Netlify) le temps que le vrai site
   soit prêt avec les photos et textes définitifs de Nicole/Gérald, à décider avec Adrien une fois
   les accès Netlify en main
   - **2026-08-19** : mise en place via un fichier `_redirects` à la racine (convention Netlify),
     plutôt que de renommer des fichiers à chaque bascule. Toutes les routes renvoient de force
     (`200!`) vers `bientot-disponible.html`, sauf `/css/*`, `/js/*` et `/assets/*` qui doivent
     rester accessibles normalement pour que la page d'attente s'affiche correctement (sinon elle
     perd son style et ses images). Pour repasser sur le vrai site une fois prêt : supprimer ou
     commenter uniquement la dernière ligne du fichier (`/*  /bientot-disponible.html  200!`),
     aucun renommage de fichier nécessaire. Comptes GitHub (`labouledeneige/labouledeneige`) et
     Netlify créés par Nicole/Gérald avec leur mail perso le 2026-08-19, Adrien ajouté comme
     collaborateur GitHub sous `a-am86`. Domaine `labouledeneige.ch` enregistré chez Infomaniak le
     même jour (kSuite inclus, 1 adresse mail partagée). DNS configurés : `A` sur `@` vers
     `75.2.60.5`, `CNAME` sur `www` vers `labouledeneige-2.netlify.app` (nom du site Netlify),
     propagation en cours au moment de l'écriture de cette note

## Palette de couleurs

- Logo de l'association reçu (`assets/img/logo.png`) : flocon stylisé au trait noir avec un
  sourire, fond transparent. Monochrome, donc rien à en extraire côté couleur — la palette
  ci-dessous reste la source de vérité, elle n'est pas dérivée du logo
- **Ne pas** utiliser les couleurs du drapeau du Burkina Faso en aplats saturés (rouge/vert/jaune)
  — rendu trop institutionnel/politique pour une petite association
- Base claire et fraîche plutôt que chaude, en écho au nom "Boule de Neige" et au flocon : blanc,
  gris très clair, éventuellement un soupçon de bleu pâle glacé — pas de sable/beige qui irait
  mal avec un logo blanc/glacé
- Couleurs du drapeau du Burkina Faso utilisées uniquement en accents (boutons, liens, petits
  détails graphiques), jamais en aplats
- **Décision du 2026-08-08** : à la demande de Nicole et Gérald (après test de plusieurs teintes,
  voir `../La Boule de Neige - documents internes/couleurs-fond-comparatif/`), le fond blanc de
  base est remplacé par un jaune pâle `#FFF9D2`. Le bleu glacé reste inchangé.
  **Validé en réunion le 2026-08-10** : Nicole et Gérald ont confirmé qu'ils aiment cette
  palette, rien à changer de ce côté
- **2026-08-10** : header et footer utilisaient tous les deux `--color-bg-alt` (`#EEF1F3`), comme
  les sections alternées au milieu des pages. Adrien a remarqué que le footer et la dernière
  section avant lui se confondaient (même gris, contiguës). Corrigé en donnant à chacun sa propre
  teinte : header très clair et aérien `--color-header-bg` (`#F1F4F7`), footer plus soutenu et
  légèrement bleuté `--color-footer-bg` (`#DCE6EC`, un clin d'oeil discret au dégradé bleu glacé
  de la page don sans réutiliser le dégradé lui-même). `--color-bg-alt` reste au milieu de page
  pour les sections alternées, inchangé. Bonus : ça règle aussi le problème de contiguïté, header
  et footer se détachent maintenant clairement de tout ce qui les entoure
- Palette de travail actuelle (implémentée dans `css/style.css`) : fond `#FFF9D2`, gris section
  alternée `#EEF1F3`, header `#F1F4F7`, footer `#DCE6EC`, bleu pâle glacé `#7FA8C9`, texte
  anthracite `#24282B`, rouge Burkina adouci `#C8232E` (CTA), vert Burkina `#009E49`
  (hover/accents), jaune/or `#FCD116` (touches ponctuelles)

## Logo animé et drapeau du Burkina Faso

- **2026-08-09** : Nicole et Gérald adorent le logo et ont demandé à le voir plus présent sur la
  page d'accueil, en plus du header. Idée d'Adrien, implémentée : le flocon apparaît en grand
  (9rem) centré en tête du hero (entre le header et le titre), avec une animation "boule de neige"
  au chargement de la page (`@keyframes roll-in-grow` dans `css/style.css`, classe `.hero-emblem`) :
  il part petit et décalé à gauche, tourne sur lui-même en grandissant, et s'arrête centré à sa
  taille finale, en écho au nom de l'association. Rotation finale fixée à `720deg` (2 tours pleins)
  et pas un multiple non-entier, sinon le logo termine tourné (bug rencontré et corrigé : `620deg`
  laissait le sourire de travers). Timing `2.2s ease-in-out`. Respecte `prefers-reduced-motion`.
  L'ancienne version statique du logo en bas de page a été retirée pour ne pas répéter le même
  élément deux fois
  - **Correctif du 2026-08-27** : la première version ajoutait un point d'arrêt intermédiaire à
    50% dans les keyframes pour étaler la croissance sur toute la durée (sinon tout se jouait
    dans les 200 premières ms avec une courbe `cubic-bezier(0.22, 1, 0.36, 1)` trop agressive).
    Repéré par Adrien : ce point intermédiaire créait une micro-pause perceptible au milieu de
    l'animation, car CSS applique la fonction de timing séparément à chaque segment entre deux
    keyframes qui redéfinissent une même propriété. Corrigé en ne gardant qu'un seul segment
    continu pour `transform` (uniquement 0% et 100%), avec `ease-in-out` appliqué une seule fois
    sur toute la durée : mouvement fluide sans à-coup, croissance toujours bien répartie (vérifié
    en échantillonnant la matrice de transformation à intervalles réguliers). Un point d'arrêt à
    8% reste pour l'opacité (fondu d'entrée rapide), mais ça ne crée pas de saccade visible car
    l'opacité est une propriété indépendante du mouvement
- **2026-08-09** : le drapeau du Burkina Faso a aussi été demandé explicitement par les clients.
  Petite tension avec la règle posée plus haut ("ne pas utiliser le drapeau en aplat, trop
  institutionnel/politique pour une petite association") : c'est leur demande directe, donc pas
  bloqué, mais implémenté à toute petite échelle plutôt qu'en bannière, pour rester dans l'esprit
  sobre du site. Un SVG fait main (`assets/img/burkina-faso.svg`, classe `.flag-icon`) inséré dans
  le texte d'intro de l'accueil après "Burkina Faso", et dans le footer de toutes les pages à côté
  du copyright. Piège rencontré : le reset CSS global (`img { display: block; }`) faisait sauter le
  drapeau à la ligne ; corrigé avec `display: inline-block` sur `.flag-icon` spécifiquement
- **2026-08-10** : signature du développeur ajoutée dans le footer des 6 pages ("Site développé
  par Arzabe Studio", lien vers https://arzabe-studio.ch, nouvel onglet). `.footer-bottom` passé
  en flexbox (`justify-content: space-between`) pour mettre le copyright à gauche et la signature
  à droite, plutôt que tout sur une seule ligne avec un séparateur texte. S'empile proprement sur
  mobile grâce à `flex-wrap`. Lien stylé en gris discret (`.footer-credit a`), passe à l'accent
  rouge au survol, pour ne pas concurrencer visuellement la marque de l'association
- **2026-08-10** : Adrien a repéré que les champs de formulaire (contact, newsletter) étaient
  presque invisibles depuis le passage au fond jaune, leur fond reprenait `--color-bg` (le même
  jaune) avec une bordure à peine plus foncée. Contraste vérifié : environ 1,1:1, très en dessous
  du minimum recommandé de 3:1 pour un élément d'interface. Corrigé : fond blanc `#FFFFFF` et
  bordure `#B7C4CC` (même teinte que la ligne de séparation du footer) sur `.form-field input` et
  `.form-field textarea` dans `css/style.css`. À garder en tête pour toute future couleur de fond
  très claire : vérifier le contraste des champs de formulaire, pas seulement le texte

## Principes de design — éviter le rendu "généré par IA"

Le piège classique d'un site généré avec un assistant IA : gradients violet/bleu par défaut,
cartes systématiquement en `rounded-2xl` + `shadow-lg`, icônes Lucide/Heroicons génériques
partout, hero section avec gros titre centré + bouton dégradé. Pour éviter ça :

- Choisir un parti pris typographique clair (une police de titre avec du caractère + une police
  de texte lisible), pas juste les fonts système par défaut
- Éviter les dégradés décoratifs gratuits ; si un dégradé est utilisé, qu'il serve une intention
  précise (photo, section don) et pas juste "pour faire joli"
- Varier les mises en page selon les pages plutôt que répéter le même bloc "titre + carte +
  ombre" partout
- Privilégier des photos réelles du terrain (Burkina Faso) plutôt que des illustrations
  vectorielles génériques
- Espacement généreux, hiérarchie visuelle nette, peu d'éléments décoratifs superflus
- S'inspirer de sites d'associations qui misent sur la sobriété et le contenu (Croix-Rouge,
  petites ONG locales) plutôt que sur l'esthétique "startup SaaS"

### Garde-fous concrets (à vérifier explicitement dans le code généré)

- Ne pas utiliser une seule police pour tout le site (souvent Inter par défaut) : choisir une
  police de titre distincte et vérifier qu'elle est bien chargée, pas juste citée en CSS
  sans être importée
- Éviter le triptyque "icône dans un cercle coloré + titre + phrase" répété 3 fois en colonnes
  — c'est le bloc "features" le plus reconnaissable d'un site généré par IA
- Éviter les boutons avec dégradé + ombre portée + coins très arrondis par défaut ; un bouton
  uni avec une bonne couleur d'accent est souvent plus fort visuellement
- Ne pas centrer systématiquement tout le contenu texte ; varier alignement gauche/centré selon
  les sections
- Éviter d'ajouter des animations au scroll "fade-in + slide-up" sur absolument chaque bloc —
  si tout bouge, rien n'attire l'attention ; les réserver à 1-2 endroits clés
- Vérifier que les images ne sont pas des placeholders génériques (Unsplash "hands holding
  globe" type) mais bien de vraies photos du terrain fournies par le client
- Demander explicitement à Claude Code de proposer une direction artistique avant de coder
  (moodboard textuel : police, 3-4 couleurs, style de bouton, style d'espacement) plutôt que
  de foncer directement dans le HTML/CSS

## Principes d'écriture — texte humanisé

Tout le texte du site (présentation, newsletter, contact) doit être rédigé de façon naturelle,
pas avec les tics d'écriture typiques des IA :

- Pas de tirets cadratins (—) utilisés comme des virgules ou pour créer un effet de style ;
  utiliser une virgule, un point, ou reformuler la phrase
- Éviter les formulations creuses ("dans un monde où...", "il est essentiel de...", "n'hésitez
  pas à...")
- Phrases de longueur variable, pas un rythme monocorde phrase courte / phrase courte
- Écrire comme une petite association suisse s'adresserait à ses membres et donateurs : direct,
  chaleureux, concret, pas de ton marketing/corporate
- Préférer les faits concrets (nombre de projets, exemples précis au Burkina Faso) aux formules
  générales

## Questions en attente pour Nicole et Gérald

Liste à compléter au fil de l'eau, pour un point à faire avec eux avant mise en ligne.
Réunion prévue le jeudi 2026-08-06.

### Contenu et design

- Style du logo (trait noir, sourire, assez enfantin) : c'est le logo officiel définitif,
  mais est-ce qu'une version simplifiée existe ou est envisageable pour un usage en petit
  format (favicon), où le dessin actuel devient flou ?
- ~~Année de création de l'association~~ **Résolu le 2026-08-08**, date précisée le 2026-08-27 :
  fondée le 30 novembre 2001 (et non le 1er comme indiqué au départ), au retour du premier
  voyage au Burkina Faso. Voir `histoire.html` pour le récit complet (origine : `a Naissance de
  notre Association et buts.docx`, fourni par le client)
- ~~Version "_complet" du rapport 2025~~ **Résolu le 2026-08-18** : Adrien confirme que Nicole
  et Gérald sont d'accord de la rendre publique. Simplifié au maximum : `assets/rapports/rapport-2025.pdf`
  contient maintenant directement la version complète (6 pages, annexe financière + QR code de
  don), à la place de l'ancienne version narrative de 5 pages. Aucun changement de code
  nécessaire (même nom de fichier), pas d'accordéon ni de double lien, une seule version comme
  pour toutes les autres années. L'ancien fichier complet reste aussi dans
  `../La Boule de Neige - documents internes/` en référence
- ~~Numéros de téléphone du domicile~~ **Résolu le 2026-08-18** : confirmé par Adrien, aucun
  souci à les publier tels quels, c'est leur domicile. Rien à changer sur `contact.html`
- ~~Utilisation de vrais prénoms et photos de partenaires burkinabè~~ **Tranché dans les faits le
  2026-08-30** : le lot de ~64 photos fourni pour la rotation quotidienne de l'accueil (Fidèle,
  Ezéchiel, familles Lompo, etc.) contenait déjà les prénoms directement dans les noms de
  fichiers, donc dans la légende publique. Adrien a confirmé les garder tels quels plutôt que de
  les faire disparaître à l'anonymisation. Ancien contexte, gardé pour mémoire :
  - **2026-08-10** : pas de réponse tranchée à la réunion. Nicole et Gérald ont adoré la façon
    dont les textes sont rédigés et vont reprendre ce qui existe pour y ajouter eux-mêmes ce
    qu'ils jugent important, plutôt que de répondre par oui/non à cette question. On verra donc
    ce qu'ils ajoutent (noms, détails) dans leurs propres modifications, à respecter tel quel
    une fois reçu plutôt qu'à décider nous-mêmes. Ils comptent aussi préciser eux-mêmes la date
    exacte de l'école (la nuance jardin d'enfants 2015 / école primaire 2017 relevée plus haut)
    et ajouter un ou deux jalons à la frise historique

### Infrastructure technique

- **GitHub** : créer le dépôt sous un compte qui appartient à l'association (ou à Nicole/Gérald),
  pas sous un compte personnel d'Adrien, pour qu'ils restent propriétaires de leur code sur le
  long terme. Ont-ils déjà un compte GitHub ? Sinon, avec quelle adresse e-mail le créer ?
  Montage prévu, confirmé par Adrien le 2026-08-11 : Nicole/Gérald propriétaires du dépôt, Adrien
  ajouté comme collaborateur avec son propre compte GitHub (adrien.arzabe@outlook.com, user
  `a-am86`). Même logique ensuite pour relier Netlify puis les DNS Infomaniak
- **Netlify** : même logique, compte à créer avec une adresse mail qu'ils contrôlent, connecté
  au GitHub ci-dessus, pour le déploiement automatique
- **Nom de domaine Infomaniak** : ont-ils déjà un domaine réservé ? Sinon, quel nom exactement.
  **2026-08-11** : `labouledeneige.ch` (sans tirets) recommandé par Adrien à Claude, disponibilité
  vérifiée et confirmée ce jour-là. Raisons du choix sans tirets : plus facile à dicter à voix
  haute, plus pro, se lit très bien même collé. `association-labouledeneige.ch` gardé en solution
  de repli seulement si jamais le premier choix devenait indisponible d'ici la réunion. Reste à
  faire valider ce nom par Nicole/Gérald puis l'enregistrer, et prévoir un accès (ou leur
  présence) pour configurer les DNS vers Netlify une fois le site prêt
- ~~Adresse e-mail dédiée~~ **Résolu le 2026-08-19** : `contact@labouledeneige.ch` créée via
  kSuite (Infomaniak) et remplace `nicole.rossellat@starlac.ch` partout sur le site
  (contact.html, footer, page d'attente). Création un peu confuse côté Infomaniak : l'action
  "Créer une adresse mail" renvoyait en boucle vers un écran de confirmation de commande plutôt
  que d'ouvrir un formulaire ; la finalisation s'est faite via un lien reçu par e-mail
  d'Infomaniak, pas entièrement dans l'interface web
- ~~Brevo (ou Mailchimp)~~ **Résolu le 2026-08-30** : compte Brevo créé par Nicole/Gérald,
  connecté sur l'ordinateur d'Adrien, formulaire branché directement sur `newsletter.html` (voir
  détail dans "Structure du site", point 2, page newsletter). Le compte de test personnel
  d'Adrien du 2026-08-11 (ci-dessous, gardé pour mémoire) n'est plus utilisé, à supprimer.
  - **2026-08-11** : Adrien a créé un compte Brevo gratuit personnel pour tester l'interface avant
    d'en parler à Nicole/Gérald. Ce compte de test doit être supprimé une fois l'exploration
    terminée, il ne doit pas devenir le compte définitif de l'association par facilité. Free plan
    Brevo vérifié le 2026-08-10 : 300 e-mails/jour, contacts illimités, aucune installation
    (100% web), mention "envoyé avec Brevo" dans les e-mails sauf plan payant. Largement
    suffisant pour 2-3 envois par an
- **Notifications des formulaires** : qui doit recevoir un e-mail à chaque nouvelle inscription
  newsletter ou message de contact reçu via Netlify Forms ? Nicole, Gérald, les deux ?
- **Mentions légales / confidentialité** : le site collecte des e-mails via les formulaires,
  une page ou un paragraphe sur l'usage de ces données est recommandé (LPD suisse). À rédiger
  une fois l'hébergement définitif connu

## Notes diverses

- Logo officiel reçu et intégré (`assets/img/logo.png`, header + favicon sur les 6 pages, et
  version animée en grand sur l'accueil, voir section dédiée plus haut). Le style du logo (trait
  noir, sourire, un peu enfantin) tranchait avec l'esprit "sobre, pas généré par IA" du moodboard
  de départ, mais Nicole et Gérald l'adorent tel quel : ce n'est plus un point d'inquiétude, garder
  ce style tel quel sauf avis contraire de leur part
- Réutiliser l'infra existante : GitHub → Netlify, domaine via Infomaniak, Netlify Forms pour
  le formulaire de contact
- **2026-08-08** : Adrien a transmis `a Naissance de notre Association et buts.docx`, le texte
  "à propos" officiel de l'association (origine, quatre axes d'action, valeurs, quelques
  statistiques sur le Burkina Faso). Utilisé pour `histoire.html` et pour compléter la section
  mission de `index.html`. Fichier source dans
  `C:\Users\Maintenant Prêt\Documents\Adri\Projet\Acomptes\La Boule de Neige\Fichiers\Rapports Association\`
  (hors du dossier du site)
- **2026-08-08** : digest des 24 rapports annuels (2002-2025) réalisé. Points utilisables pour
  enrichir le site plus tard (rien d'intégré pour l'instant, à valider avant d'écrire) :
  - Jalons datés et chiffrés : 2003 premier forage (nappe à 7m, plus de 100 personnes desservies,
    premier point d'eau potable du secteur) ; 2004 Alain et Philippe (partenaires historiques,
    voir ci-dessous) reçoivent une médaille présidentielle burkinabè pour leur travail agricole ;
    2009 ouverture du collège de Kompienga en octobre avec 105 élèves (53 filles, 52 garçons) ;
    évolution du taux de réussite au BEPC dans le temps (39,68% en 2010 jusqu'à 71% en 2012,
    rechute à 28% en 2013 suite à un changement de barème national)
  - **Nuance à vérifier avec Nicole** : le site affiche "2015, ouverture de l'école primaire avec
    une seule classe", repris de la légende du rapport 2025 ("l'école et la cour en 2015, 1
    classe"). Les rapports 2015-2017 eux-mêmes suggèrent que 2015 correspond plutôt à la première
    mention comptable du "jardin d'enfants" (créé par Pouguida), et que la première classe de
    l'école primaire à proprement parler aurait ouvert en 2017. Pas contredit frontalement par le
    rapport 2025, juste une imprécision possible de terminologie (jardin d'enfants → école
    primaire) à clarifier si on veut être rigoureux sur cette date précise
  - Microcrédits à taux zéro : présents dès 2002-2004 sous forme d'échanges/prêts de matériel
    agricole, mais formalisés comme dispositif à part (poissonnerie, poulailler, toiture, etc.)
    surtout à partir de 2022-2024
  - **Prénoms récurrents repérés sur 24 ans** (à ne pas publier sans accord, cf. question
    "utilisation de vrais prénoms" ci-dessus, qui prend plus d'ampleur avec cette liste) :
    Alain et Philippe (partenaires historiques depuis 2001, médaillés en 2004), Ezékiel
    (chauffeur, décédé en 2010, remplacé dans les mentions par sa veuve Marthe), Joseph, André,
    Fidèle, Daniel et Pouguida (école primaire), Pierre et Yempabou (association Moandi), Albert
    et Catherine/Cathy (école agropastorale de Niendouga), Norbert et Sandrine, Timothée et
    Esther, Foldoa, Madou, Bahanla et Emmanuel, Gilbert et Madeleine, Philibert et Ruth, Benjamin.
    Les rapports 2022 et 2024 introduisent même un format "galerie de portraits" nommés : le
    niveau de détail déjà publié par l'association elle-même dans ses rapports va donc plus loin
    que ce que le site public reprend actuellement (tout est anonymisé pour l'instant)
