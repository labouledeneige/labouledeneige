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
];

function legendeDepuisNomFichier(nomFichier) {
  var nom = nomFichier.replace(/\.[^/.]+$/, '');
  nom = nom.replace(/[-_]+/g, ' ').trim();
  return nom;
}

document.addEventListener('DOMContentLoaded', function () {
  if (photosAccueil.length === 0) return;

  var container = document.querySelector('.hero-photo');
  if (!container) return;

  var startOfYear = new Date(new Date().getFullYear(), 0, 0);
  var dayOfYear = Math.floor((Date.now() - startOfYear) / 86400000);
  var chosen = photosAccueil[dayOfYear % photosAccueil.length];

  var img = document.createElement('img');
  img.src = 'assets/img/photos-accueil/' + chosen;
  img.alt = 'Photo du terrain, Burkina Faso';
  img.className = 'hero-photo-img';

  var legende = document.createElement('p');
  legende.className = 'hero-photo-caption';
  legende.textContent = legendeDepuisNomFichier(chosen);

  container.innerHTML = '';
  container.appendChild(img);
  container.appendChild(legende);
});
