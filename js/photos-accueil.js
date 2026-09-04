// Photo du hero sur la page d'accueil, une par jour, tournante.
// Pour ajouter une photo : déposer le fichier dans assets/img/photos-accueil/
// puis ajouter son nom ci-dessous. Pour en retirer une, faire l'inverse.
// Tant que ce tableau est vide, le placeholder reste affiché.
//
// La légende affichée sous la photo est extraite directement du nom du
// fichier (tirets/underscores remplacés par des espaces, extension
// retirée). Nommer le fichier de façon lisible sert donc aussi de légende,
// par exemple "Puits creuse pres du village en 2019.jpg".
var photosAccueil = [
  '2022 Distribution de vivres suite à une famine.jpg',
  'André Fidèle et Esther 1er jour d\'école Mahadaga 2003.jpg',
  'Association avec qui nous collaborons pour la scolarisation des enfants.jpg',
  'Baptême dans un marigot de nos 3 premiers enfants scolarisés Mahadaga 2005 2.jpg',
  'Baptême dans un marigot de nos 3 premiers enfants scolarisés Mahadaga 2005.jpg',
  'Battage du riz à Kompienga 2005.jpg',
  'Battage du riz à Kompienga 2007.jpg',
  'Cadeau d\'une chèvre par les agriculteurs de Kompienga 2007.jpg',
  'Case en brousse à Mahadaga.jpg',
  'Cases au champ à Kompienga 2005 2.jpg',
  'Cases au champ à Kompienga 2005.jpg',
  'Champ de coton à Kompienga en 2003.jpg',
  'Champ de riz à Kompienga 2.jpg',
  'Champ de riz à Kompienga.jpg',
  'Charrue à Kompienga 2005.jpg',
  'Chef du village de Mahadaga et sa griote 2005.jpg',
  'Collège Gédéon à Kompienga.jpg',
  'Construction de puits au champ à Kompienga 2004.jpg',
  'Corvée d\'eau à Kompienga 2003-2.jpg',
  'Corvée d\'eau à Kompienga 2003-3.jpg',
  'Corvée d\'eau à Kompienga 2003.jpg',
  'Cuisine scolaire à Mahadaga 2005.jpg',
  'Culture de pastèques à Kompienga 2005.jpg',
  'Culture du maïs à Kompienga 2007.jpg',
  'Discussion des futurs projets pour Kompienga 2007.jpg',
  'Distribution de crayons offert par Caran d\'Ache à Mahadaga 2005.jpg',
  'En route pour l\'école à Mahadaga 2003.jpg',
  'Ezéchiel notre chauffeur et sa femme 2005.jpg',
  'Famille Lompo de Mahadaga scolarisation de nos 3 premiers élèves.jpg',
  'Familles de nos 2 premiers partenaires à Kompienga 2005.jpg',
  'Fosse à compost à Kompienga 2005.jpg',
  'Gamelles en attente du repas de midi à Mahadaga 2005.jpg',
  'Hôtel de Fada N\'Gourma 2005.jpg',
  'La remorque est utilisée pour transporter les récoltes à Kompienga 2007.jpg',
  'Le tracteur en 2005 laboure plus de 250 hectares pour tout le village.jpg',
  'Les bancs de l\'église de Mahadaga 2005.jpg',
  'Les baptisés du jour à Mahadaga 2005.jpg',
  'Les élèves peuvent faire leurs devoirs le soir jusqu\'à 22h00, car ils n\'ont pas l\'électricité chez eux.jpg',
  'Maraîchage.jpg',
  'Marché de Fada N\'Gourma 2005.jpg',
  'Moulin à céréales à Kompienga 2005.jpg',
  'Nos partenaires avec la représentante de la FAO.jpg',
  'Nos trois premiers enfants scolarisés et leurs mamans à Mahadaga 2003.jpg',
  'Notre logement à Kompienga 2007.jpg',
  'Notre voiture pour aller en brousse 2005.jpg',
  'Notre véhicule pour nous rendre au champ à Kompienga 2003.jpg',
  'Ordre du mérite du développement rural à Kompienga 2005 (2).jpg',
  'Poulailler de Fidèle.jpg',
  'Puits pour le collège Gédéon 2009.jpg',
  'Retour en voiture de nos écoliers qui habitent à 7 km de l\'école de Mahadaga 2005.jpg',
  'Récolte de riz à Kompienga 2005.jpg',
  'Récolte du maïs à Kompienga 2007.jpg',
  'Récolte du riz à Kompienga 2005.jpg',
  'Récolte du riz à Kompienga 2007.jpg',
  'Salle de classe à Mahadaga 108 élèves.jpg',
  'Studio d\'enregistrement à Fada N\'Gourma 2007.jpg',
  'Séance de travail pour de nouveaux projets à Kompienga 2009.jpg',
  'Tissage à Niendouga.jpg',
  'Tracteur avec sa remorque à Kompienga 2007.jpg',
  'Tracteur à Kompienga 2005.jpg',
  'Un âne et une charrette pareils à ceux de nos parrainages.jpg',
  'Âne et Charrette.jpg',
  'Électrification du collège Gédéon à Kompienga.jpg',
  'Élèves du collège de Kompienga.jpg'
];

function legendeDepuisNomFichier(nomFichier) {
  var nom = nomFichier.replace(/\.[^/.]+$/, '');
  nom = nom.replace(/[-_]+/g, ' ').trim();
  // Retire un suffixe de numérotation en fin de nom (ex. "... 2005 2",
  // "... 2005-2", "... 2005 (2)"), utilisé pour distinguer plusieurs photos
  // du même évènement sans forcément vouloir un chiffre visible en légende.
  // Un chiffre à 1-2 positions seulement, jamais une année à 4 chiffres.
  nom = nom.replace(/\s+\(?\d{1,2}\)?$/, '').trim();
  return nom;
}

var photosAccueilAlt = {
  fr: 'Photo du terrain, Burkina Faso',
  en: 'Photo from the field, Burkina Faso',
  de: 'Foto vor Ort, Burkina Faso',
  es: 'Foto del terreno, Burkina Faso'
};

document.addEventListener('DOMContentLoaded', function () {
  if (photosAccueil.length === 0) return;

  var container = document.querySelector('.hero-photo');
  if (!container) return;

  var startOfYear = new Date(new Date().getFullYear(), 0, 0);
  var dayOfYear = Math.floor((Date.now() - startOfYear) / 86400000);
  var chosen = photosAccueil[dayOfYear % photosAccueil.length];

  var langue = document.documentElement.lang || 'fr';

  var img = document.createElement('img');
  img.src = '/assets/img/photos-accueil/' + chosen;
  img.alt = photosAccueilAlt[langue] || photosAccueilAlt.fr;
  img.className = 'hero-photo-img';

  var legende = document.createElement('p');
  legende.className = 'hero-photo-caption';
  legende.textContent = legendeDepuisNomFichier(chosen);

  container.innerHTML = '';
  container.appendChild(img);
  container.appendChild(legende);
});
