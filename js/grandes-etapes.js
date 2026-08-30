// Carrousel de photos sous "Les grandes étapes" (page d'accueil), une photo
// à la fois avec son année en légende, navigation manuelle (pas d'autoplay,
// même logique que js/histoire-carousel.js).
//
// Pour ajouter une photo : déposer le fichier dans assets/img/grandes-etapes/
// puis ajouter une ligne au tableau ci-dessous, dans l'ordre chronologique.
// Plusieurs photos pour la même année sont possibles, elles s'affichent
// simplement l'une après l'autre.
var grandesEtapesPhotos = [
  { annee: 2002, fichier: '2002 Achat des boeufs pour les labours à Kompienga en 2002.jpg' },
  { annee: 2003, fichier: '2003 André Fidel et Esther 1er jour d\'école à Mahadaga.jpg' },
  { annee: 2004, fichier: '2004 Charrue à Kompienga 2005.jpg' },
  { annee: 2004, fichier: '2004 Le tracteur en 2005 laboure plus de 250 hectares pour tout le village.jpg' },
  { annee: 2006, fichier: '2006 Tracteur avec sa remorque à Kompienga 2007.jpg' },
  { annee: 2007, fichier: '2007 Studio d\'enregistermrnt à Fada N\'Gourma.jpg' },
  { annee: 2008, fichier: '2008 Décortiqueuse.jpg' },
  { annee: 2009, fichier: '2009 Collége  4 salles de classe.jpg' },
  { annee: 2010, fichier: '2010 Lors de son voyage en Suisse, Alain découvre la neige.jpg' },
  { annee: 2011, fichier: '2011 Scolarisation de 85 enfants dans la région de l\'est.jpg' },
  { annee: 2012, fichier: '2012 Les élèves peuvent faire leurs devoirs au collège le soir jusq\'à 22h00.jpg' },
  { annee: 2015, fichier: '2015 Envoi du container au Burkina Faso.jpg' },
  { annee: 2016, fichier: '2016 1ère salle de classe jardi d\'enfants à Ouagadougou.jpg' },
  { annee: 2017, fichier: '2017 Tissage à Niendouga.jpg' },
  { annee: 2018, fichier: '2018 Suite de la construction de sallle de classe Ouagadougou 1.jpg' },
  { annee: 2021, fichier: '2021 Début de la construction d\'un magasin de stockage.jpg' },
  { annee: 2022, fichier: '2022 Distribution de vivres suite à une famine.jpg' },
  { annee: 2022, fichier: '2022 Don du riz suite à la famine.jpg' },
  { annee: 2023, fichier: '2023 Des études qui continuent malgré l\'insécurité.jpg' },
  { annee: 2024, fichier: '2024 Riz pour élèves scolarisés.jpg' },
  { annee: 2025, fichier: '2025 Formation en coupe-couture.jpg' },
  { annee: 2025, fichier: '2025 Maraîchage.jpeg' }
];

var grandesEtapesTextes = {
  fr: { prev: 'Photo précédente', next: 'Photo suivante' },
  en: { prev: 'Previous photo', next: 'Next photo' },
  de: { prev: 'Vorheriges Foto', next: 'Nächstes Foto' }
};

function creerFlecheEtapes(direction, label) {
  var bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.className = 'carousel-arrow carousel-arrow-' + direction;
  bouton.setAttribute('aria-label', label);

  var points = direction === 'prev' ? '15 18 9 12 15 6' : '9 18 15 12 9 6';
  bouton.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"><polyline points="' + points + '"></polyline></svg>';

  return bouton;
}

document.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('.etapes-carousel');
  if (!container || grandesEtapesPhotos.length === 0) return;

  var langue = document.documentElement.lang || 'fr';
  var textes = grandesEtapesTextes[langue] || grandesEtapesTextes.fr;

  var index = 0;

  var img = document.createElement('img');
  img.className = 'etapes-carousel-img';
  img.alt = '';

  var annee = document.createElement('span');
  annee.className = 'etapes-carousel-annee';

  function afficher() {
    var photo = grandesEtapesPhotos[index];
    img.src = '/assets/img/grandes-etapes/' + photo.fichier;
    annee.textContent = photo.annee;
  }
  afficher();

  container.appendChild(img);
  container.appendChild(annee);

  var precedent = creerFlecheEtapes('prev', textes.prev);
  precedent.addEventListener('click', function () {
    index = (index - 1 + grandesEtapesPhotos.length) % grandesEtapesPhotos.length;
    afficher();
  });

  var suivant = creerFlecheEtapes('next', textes.next);
  suivant.addEventListener('click', function () {
    index = (index + 1) % grandesEtapesPhotos.length;
    afficher();
  });

  container.appendChild(precedent);
  container.appendChild(suivant);
});
