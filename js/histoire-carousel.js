// Photos illustrant les sections de la page "Notre histoire".
// Contrairement à la photo tournante de l'accueil, ces photos sont choisies
// exprès pour illustrer un moment précis : pas de rotation automatique.
//
// Pour ajouter une photo : déposer le fichier dans assets/img/histoire/
// puis ajouter son nom dans le tableau de la section correspondante.
// Une section avec 1 seule photo l'affiche simplement. Une section avec
// plusieurs photos affiche des flèches pour naviguer manuellement (pas de
// défilement automatique). Une section sans photo affiche un placeholder.
//
// Textes traduits selon la langue de la page (<html lang="...">), car ce
// script est partagé entre les versions fr/en/de.
var histoirePhotos = {
  correspondance: ['02 Alain Correspondance.jpg'],
  voyage: ['01 Un âne et une charrette.jpg'],
  premierPas: ['03 Achat des boeufs pour les labours à Kompienga en 2002.jpg'],
  axes: [
    '01 Forage 2023.jpg',
    '02 Education et scolarisation.jpg',
    '03 Maraîchage.jpg'
  ],
  travail: ['Séance de travail pour de nouveaux projets à Kompienga 2009.jpg']
};

var histoireCarouselTextes = {
  fr: { placeholder: 'Photo à venir', prev: 'Photo précédente', next: 'Photo suivante' },
  en: { placeholder: 'Photo coming soon', prev: 'Previous photo', next: 'Next photo' },
  de: { placeholder: 'Foto folgt', prev: 'Vorheriges Foto', next: 'Nächstes Foto' },
  es: { placeholder: 'Foto próximamente', prev: 'Foto anterior', next: 'Foto siguiente' }
};

function texteCarousel() {
  var langue = document.documentElement.lang || 'fr';
  return histoireCarouselTextes[langue] || histoireCarouselTextes.fr;
}

function creerFlecheCarousel(direction, label) {
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

function rendreCarousel(container, photos) {
  var textes = texteCarousel();

  if (!photos || photos.length === 0) {
    container.innerHTML = '<div class="placeholder-visual">' + textes.placeholder + '</div>';
    return;
  }

  var index = 0;

  var img = document.createElement('img');
  img.className = 'carousel-img';
  img.alt = '';

  function afficher() {
    img.src = '/assets/img/histoire/' + photos[index];
  }
  afficher();

  container.innerHTML = '';
  container.appendChild(img);

  if (photos.length > 1) {
    var precedent = creerFlecheCarousel('prev', textes.prev);
    precedent.addEventListener('click', function () {
      index = (index - 1 + photos.length) % photos.length;
      afficher();
    });

    var suivant = creerFlecheCarousel('next', textes.next);
    suivant.addEventListener('click', function () {
      index = (index + 1) % photos.length;
      afficher();
    });

    container.appendChild(precedent);
    container.appendChild(suivant);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var slots = document.querySelectorAll('.photo-carousel[data-section]');
  slots.forEach(function (slot) {
    var cle = slot.getAttribute('data-section');
    rendreCarousel(slot, histoirePhotos[cle]);
  });
});
