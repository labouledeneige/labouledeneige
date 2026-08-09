# Projet : Site web association La Boule de Neige

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
- E-mail : nicole.rossellat@starlac.ch
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
2. **Page newsletter** — inscription (formulaire simple email), éventuellement archive des newsletters passées
   - Le formulaire capture les inscrits via Netlify Forms (pas de vraie liste de diffusion). Décision de base : au moment du premier envoi, exporter le CSV des inscrits depuis Netlify et l'importer dans un outil d'e-mailing gratuit (Brevo ou Mailchimp), qui gère la désinscription et l'envoi en masse. Pas d'automatisation "détection de fichier → envoi automatique" : trop d'infrastructure à maintenir pour 2-3 envois par an, et pas d'étape de relecture avant envoi
   - **2026-08-10** : option discutée avec Adrien pour supprimer même cette étape d'export manuel :
     brancher directement le formulaire d'inscription du site sur le formulaire natif de Brevo, pour
     que les inscrits atterrissent tout de suite dans la liste Brevo, sans passer par Netlify Forms
     ni export CSV. Pas encore implémenté, en attente que Nicole/Gérald créent leur compte Brevo
     (voir question "Brevo" dans Infrastructure technique)
   - Formulaires newsletter et contact soumis en AJAX (`js/main.js`) avec message de confirmation affiché à la place du formulaire, sans rechargement de page. Ne fonctionne que sur un vrai déploiement Netlify (le POST est traité par Netlify au build, pas en local)
3. **Page rapports annuels** — rapports PDF fournis par le client, organisés par année
   - Grille de "cartes-année", du plus récent au plus ancien
   - Chaque carte = année en évidence + éventuellement vignette PDF + lien qui ouvre le PDF dans un nouvel onglet
   - Ne pas dupliquer le contenu des rapports en texte sur la page
   - Si plusieurs documents par année apparaissent un jour (rapport + annexes), passer à un accordéon par année plutôt qu'une simple carte
   - Convention de nommage des fichiers : `assets/rapports/rapport-AAAA.pdf` (minuscules, tiret, sans espace) ; le tableau qui pilote la grille est dans `js/rapports.js`
   - **Important** : pour 2025, Nicole a fourni deux PDF, un rapport narratif (5 pages) et une version "_complet" avec annexe financière détaillée + bulletin de versement QR (IBAN, adresse, téléphone du domicile). Décision pour l'instant : seul le rapport narratif est publié sur le site (`rapport-2025.pdf`) ; la version complète est stockée hors du dossier du site, dans `../La Boule de Neige - documents internes/`, pour ne pas être déployée sur Netlify. À reconfirmer avec Nicole si un jour elle veut que la version complète (avec le détail des comptes) soit aussi publique
   - **2026-08-08** : Nicole/Adrien ont fourni les 24 rapports 2002-2025 (dans `assets/rapports/`). Pas de rapport 2001 : l'association a été fondée le 1er novembre 2001, donc pas d'exercice complet cette année-là. Le rapport 2015 était scanné en 3 fichiers recto-verso façon livret (pages 1+6, 2+5, 3+4) ; reconstitué en un seul PDF 6 pages dans l'ordre via un script Python (PyMuPDF + Pillow, découpage puis réassemblage des demi-pages)
4. **Page de contact** — formulaire (Netlify Forms comme pour les autres projets), coordonnées de l'association
5. **Page de donation** — affichage du QR code fourni par le client, éventuellement lien IBAN/coordonnées bancaires en complément
   - QR code et IBAN récupérés depuis le bulletin de versement du rapport annuel 2025 (`assets/img/qr-don.png`), vérifié scannable (décodage QR Suisse SPC confirmé)
6. **Page histoire (`histoire.html`)** — le récit fondateur complet de l'association, pas dans le nav
   principal, accessible via un lien depuis la frise "Notre histoire" de la page d'accueil. Contenu
   basé sur `a Naissance de notre Association et buts.docx` (voir Notes diverses)

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
  base est remplacé par un jaune pâle `#FFF9D2`. Le bleu glacé reste inchangé
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
  laissait le sourire de travers). Timing `2.2s ease-in-out` avec des arrêts intermédiaires dans
  les keyframes (pas juste 0%/100%) pour que la croissance reste visible sur toute la durée, pas
  seulement dans les premières 200ms. Respecte `prefers-reduced-motion`. L'ancienne version statique
  du logo en bas de page a été retirée pour ne pas répéter le même élément deux fois
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
- ~~Année de création de l'association~~ **Résolu le 2026-08-08** : fondée le 1er novembre 2001,
  au retour du premier voyage au Burkina Faso. Voir `histoire.html` pour le récit complet
  (origine : `a Naissance de notre Association et buts.docx`, fourni par le client)
- Version "_complet" du rapport 2025 (annexe financière + bulletin de versement) : confirmer
  que ça doit rester hors du site public, ou si Nicole veut au contraire que le détail des
  comptes soit consultable en ligne
- Le rapport 2025 mentionne des numéros de téléphone du domicile de Nicole et Gérald : à
  confirmer qu'ils sont à l'aise de les voir publiés tels quels sur la page contact du site
  (pas seulement dans un rapport envoyé aux membres)
- Utilisation de vrais prénoms et photos de partenaires burkinabè (Fidèle, Catherine, Bouama,
  etc.) sur le site public : le rapport annuel les nomme et les montre en photo pour les
  membres, mais est-ce que Nicole veut le même niveau de détail sur un site accessible à tous ?
  Même question pour Alain et sa famille, au coeur du récit sur `histoire.html`

### Infrastructure technique

- **GitHub** : créer le dépôt sous un compte qui appartient à l'association (ou à Nicole/Gérald),
  pas sous un compte personnel d'Adrien, pour qu'ils restent propriétaires de leur code sur le
  long terme. Ont-ils déjà un compte GitHub ? Sinon, avec quelle adresse e-mail le créer ?
- **Netlify** : même logique, compte à créer avec une adresse mail qu'ils contrôlent, connecté
  au GitHub ci-dessus, pour le déploiement automatique
- **Nom de domaine Infomaniak** : ont-ils déjà un domaine réservé ? Sinon, quel nom exactement
  (laboudedeneige.ch ? .org ? .swiss ?), vérifier la disponibilité avant la réunion. Prévoir un
  accès (ou leur présence) pour configurer les DNS vers Netlify une fois le site prêt
- **Adresse e-mail dédiée** : veulent-ils une adresse du type contact@laboudedeneige.ch (via
  Infomaniak) plutôt que de publier l'adresse personnelle nicole.rossellat@starlac.ch partout
  sur le site ? Répond en partie à la question du numéro de domicile ci-dessus
- **Brevo (ou Mailchimp)** : même logique que GitHub/Netlify, le compte doit appartenir à
  Nicole/Gérald, pas à Adrien. Ont-ils une préférence entre les deux outils ? Une fois le compte
  créé de leur côté, il suffit qu'ils transmettent à Adrien le code d'intégration du formulaire
  (ou la clé API) pour brancher directement le formulaire newsletter du site dessus : les
  inscrits arrivent alors automatiquement dans leur liste, sans export CSV manuel à chaque envoi
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
