// Photo du hero sur la page d'accueil, une par jour, tournante.
// Pour ajouter une photo : déposer le fichier dans assets/img/photos-accueil/
// puis ajouter son nom ci-dessous. Pour en retirer une, faire l'inverse.
// Tant que ce tableau est vide, le placeholder reste affiché.
var photosAccueil = [
];

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

  container.innerHTML = '';
  container.appendChild(img);
});
