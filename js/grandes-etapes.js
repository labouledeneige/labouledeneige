// Galerie "Les grandes étapes" (page d'accueil) : bande de photos en
// scroll-snap, une année à la fois au centre, avec flèches, clavier, et
// une lightbox (<dialog> natif) pour voir la photo en entier. Remplace
// l'ancien carrousel simple (une photo + 2 flèches).
//
// Pour ajouter une photo : déposer le fichier dans assets/img/grandes-etapes/
// puis ajouter une entrée au tableau ci-dessous, dans l'ordre chronologique,
// avec sa légende dans les 4 langues. Plusieurs photos pour la même année
// sont possibles, elles s'affichent simplement l'une après l'autre.
//
// `position` (optionnel) : ajuste le recadrage vertical de la photo dans le
// cadre (object-position CSS). Utile quand le cadrage automatique par défaut
// ("center") coupe une tête en haut de l'image ; "top" garde le haut intact.
//
// `fit` (optionnel) : "contain" au lieu du recadrage "cover" par défaut,
// pour montrer la photo entière sans rien couper (bandes vides comblées par
// la couleur de fond du cadre). Utile pour une photo au format très
// différent du cadre 3:2 (portrait ou carré) : sans ça, "cover" zoome trop
// fort et donne une impression de photo "trop proche" une fois recadrée.
var grandesEtapesPhotos = [
  {
    annee: 2002,
    fichier: '2002 Achat des boeufs pour les labours à Kompienga en 2002.jpg',
    texte: {
      fr: 'Deux bœufs achetés pour les labours à Kompienga',
      en: 'Two oxen bought to plough the fields in Kompienga',
      de: 'Zwei Ochsen für die Feldarbeit in Kompienga gekauft',
      es: 'Dos bueyes comprados para arar los campos en Kompienga'
    }
  },
  {
    annee: 2003,
    fichier: '2003 André Fidel et Esther 1er jour d\'école à Mahadaga.jpg',
    position: 'top',
    texte: {
      fr: 'André, Fidèle et Esther, premier jour d\'école',
      en: 'André, Fidèle and Esther\'s first day at school',
      de: 'André, Fidèle und Esthers erster Schultag',
      es: 'André, Fidèle y Esther, primer día de escuela'
    }
  },
  {
    annee: 2004,
    fichier: '2004 Le tracteur en 2005 laboure plus de 250 hectares pour tout le village.jpg',
    texte: {
      fr: 'Le tracteur laboure plus de 250 hectares pour le village',
      en: 'The tractor ploughs over 250 hectares for the village',
      de: 'Der Traktor pflügt über 250 Hektar für das Dorf',
      es: 'El tractor ara más de 250 hectáreas para el pueblo'
    }
  },
  {
    annee: 2004,
    fichier: '2004 Charrue à Kompienga 2005.jpg',
    texte: {
      fr: 'La charrue, achetée avec le tracteur',
      en: 'The plough, bought along with the tractor',
      de: 'Der Pflug, zusammen mit dem Traktor gekauft',
      es: 'El arado, comprado junto con el tractor'
    }
  },
  {
    annee: 2006,
    fichier: '2006 Tracteur avec sa remorque à Kompienga 2007.jpg',
    texte: {
      fr: 'Une remorque pour transporter les récoltes',
      en: 'A trailer to transport the harvests',
      de: 'Ein Anhänger für den Erntetransport',
      es: 'Un remolque para transportar las cosechas'
    }
  },
  {
    annee: 2007,
    fichier: '2007 Studio d\'enregistermrnt à Fada N\'Gourma.jpg',
    texte: {
      fr: 'Le studio d\'enregistrement de Fada N\'Gourma',
      en: 'The recording studio in Fada N\'Gourma',
      de: 'Das Tonstudio in Fada N\'Gourma',
      es: 'El estudio de grabación de Fada N\'Gourma'
    }
  },
  {
    annee: 2008,
    fichier: '2008 Décortiqueuse.jpg',
    texte: {
      fr: 'La décortiqueuse de riz',
      en: 'The rice husking machine',
      de: 'Die Reisschälmaschine',
      es: 'La descascaradora de arroz'
    }
  },
  {
    annee: 2009,
    fichier: '2009 Collége  4 salles de classe.jpg',
    texte: {
      fr: 'Les quatre premières salles du Collège Gédéon',
      en: 'The first four classrooms of Collège Gédéon',
      de: 'Die ersten vier Klassenzimmer des Collège Gédéon',
      es: 'Las primeras cuatro aulas del Collège Gédéon'
    }
  },
  {
    annee: 2010,
    fichier: '2010 Lors de son voyage en Suisse, Alain découvre la neige.jpg',
    fit: 'contain',
    texte: {
      fr: 'Alain découvre la neige lors de son voyage en Suisse',
      en: 'Alain discovers snow on his trip to Switzerland',
      de: 'Alain entdeckt den Schnee bei seiner Reise in die Schweiz',
      es: 'Alain descubre la nieve en su viaje a Suiza'
    }
  },
  {
    annee: 2011,
    fichier: '2011 Scolarisation de 85 enfants dans la région de l\'est.jpg',
    texte: {
      fr: '85 enfants scolarisés dans la région de l\'Est',
      en: '85 children enrolled in school in the eastern region',
      de: '85 eingeschulte Kinder in der Ostregion',
      es: '85 niños escolarizados en la región este'
    }
  },
  {
    annee: 2012,
    fichier: '2012 Les élèves peuvent faire leurs devoirs au collège le soir jusq\'à 22h00.jpg',
    texte: {
      fr: 'Les élèves étudient le soir grâce à l\'électricité',
      en: 'Students study in the evening thanks to electricity',
      de: 'Schüler lernen abends dank Strom',
      es: 'Los alumnos estudian de noche gracias a la electricidad'
    }
  },
  {
    annee: 2015,
    fichier: '2015 Envoi du container au Burkina Faso.jpg',
    texte: {
      fr: 'Un container de livres et de mobilier envoyé au Burkina Faso',
      en: 'A container of books and furniture sent to Burkina Faso',
      de: 'Ein Container mit Büchern und Möbeln für Burkina Faso',
      es: 'Un contenedor de libros y mobiliario enviado a Burkina Faso'
    }
  },
  {
    annee: 2016,
    fichier: '2016 1ère salle de classe jardi d\'enfants à Ouagadougou.jpg',
    texte: {
      fr: 'Première salle du jardin d\'enfants à Ouagadougou',
      en: 'The kindergarten\'s first classroom in Ouagadougou',
      de: 'Das erste Klassenzimmer des Kindergartens in Ouagadougou',
      es: 'La primera aula del jardín de infancia en Ouagadougou'
    }
  },
  {
    annee: 2017,
    fichier: '2017 Tissage à Niendouga.jpg',
    texte: {
      fr: 'Le tissage à Niendouga',
      en: 'Weaving in Niendouga',
      de: 'Weben in Niendouga',
      es: 'El tejido en Niendouga'
    }
  },
  {
    annee: 2018,
    fichier: '2018 Suite de la construction de sallle de classe Ouagadougou 1.jpg',
    texte: {
      fr: 'Une nouvelle salle de classe chaque année',
      en: 'A new classroom every year',
      de: 'Jedes Jahr ein neues Klassenzimmer',
      es: 'Un aula nueva cada año'
    }
  },
  {
    annee: 2021,
    fichier: '2021 Début de la construction d\'un magasin de stockage.jpg',
    texte: {
      fr: 'Construction d\'un magasin de stockage pour le riz',
      en: 'Building a storage warehouse for rice',
      de: 'Bau eines Lagerhauses für Reis',
      es: 'Construcción de un almacén de arroz'
    }
  },
  {
    annee: 2022,
    fichier: '2022 Distribution de vivres suite à une famine.jpg',
    texte: {
      fr: 'Distribution de vivres suite à une famine',
      en: 'Distributing food after a famine',
      de: 'Verteilung von Nahrungsmitteln nach einer Hungersnot',
      es: 'Distribución de víveres tras una hambruna'
    }
  },
  {
    annee: 2022,
    fichier: '2022 Don du riz suite à la famine.jpg',
    texte: {
      fr: 'Don de riz aux familles touchées par la famine',
      en: 'Rice donated to families affected by the famine',
      de: 'Reis für die von der Hungersnot betroffenen Familien',
      es: 'Donación de arroz a las familias afectadas por la hambruna'
    }
  },
  {
    annee: 2023,
    fichier: '2023 Des études qui continuent malgré l\'insécurité.jpg',
    texte: {
      fr: 'Le Collège Gédéon reste ouvert malgré l\'insécurité',
      en: 'Collège Gédéon stays open despite insecurity',
      de: 'Das Collège Gédéon bleibt trotz Unsicherheit geöffnet',
      es: 'El Collège Gédéon sigue abierto pese a la inseguridad'
    }
  },
  {
    annee: 2024,
    fichier: '2024 Riz pour élèves scolarisés.jpg',
    fit: 'contain',
    texte: {
      fr: 'Du riz pour les élèves scolarisés',
      en: 'Rice for schoolchildren',
      de: 'Reis für die schulpflichtigen Kinder',
      es: 'Arroz para los niños escolarizados'
    }
  },
  {
    annee: 2025,
    fichier: '2025 Formation en coupe-couture.jpg',
    texte: {
      fr: 'Formation en coupe-couture à Fada N\'Gourma',
      en: 'Sewing training in Fada N\'Gourma',
      de: 'Schneiderei-Ausbildung in Fada N\'Gourma',
      es: 'Formación en costura en Fada N\'Gourma'
    }
  },
  {
    annee: 2025,
    fichier: '2025 Maraîchage.jpeg',
    fit: 'contain',
    texte: {
      fr: 'Le maraîchage des femmes près de Koupela',
      en: 'Market gardening by women near Koupela',
      de: 'Gemüseanbau der Frauen bei Koupela',
      es: 'La horticultura de las mujeres cerca de Koupela'
    }
  }
];

var grandesEtapesTextes = {
  fr: {
    prev: 'Photo précédente',
    next: 'Photo suivante',
    agrandir: 'agrandir la photo',
    fermer: 'Fermer',
    lightboxLabel: 'Photo agrandie',
    photosDe: function (a, b) { return 'Photos de ' + a + ' à ' + b; }
  },
  en: {
    prev: 'Previous photo',
    next: 'Next photo',
    agrandir: 'enlarge photo',
    fermer: 'Close',
    lightboxLabel: 'Enlarged photo',
    photosDe: function (a, b) { return 'Photos from ' + a + ' to ' + b; }
  },
  de: {
    prev: 'Vorheriges Foto',
    next: 'Nächstes Foto',
    agrandir: 'Foto vergrößern',
    fermer: 'Schließen',
    lightboxLabel: 'Vergrößertes Foto',
    photosDe: function (a, b) { return 'Fotos von ' + a + ' bis ' + b; }
  },
  es: {
    prev: 'Foto anterior',
    next: 'Foto siguiente',
    agrandir: 'ampliar la foto',
    fermer: 'Cerrar',
    lightboxLabel: 'Foto ampliada',
    photosDe: function (a, b) { return 'Fotos de ' + a + ' a ' + b; }
  }
};

function urlPhotoEtape(photo) {
  return '/assets/img/grandes-etapes/' + photo.fichier;
}

function creerFlecheFilmstrip(direction, label, classe) {
  var bouton = document.createElement('button');
  bouton.type = 'button';
  // Les classes de position (.fs-prev à gauche, .fs-next à droite) sont
  // définies dans le CSS sans le préfixe "fs-arrow-" : garder ce format
  // exact, sinon aucune des deux flèches n'est positionnée.
  bouton.className = classe + ' fs-' + direction;
  bouton.setAttribute('aria-label', label);
  bouton.textContent = direction === 'prev' ? '‹' : '›';
  return bouton;
}

function creerSlideEtape(photo, index, langue, textes) {
  var li = document.createElement('li');
  li.className = 'fs-slide';

  var figure = document.createElement('figure');

  var bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.className = 'fs-photo';
  bouton.setAttribute('aria-label', photo.annee + ' : ' + textes.agrandir);

  var legende = photo.texte[langue] || photo.texte.fr;

  var img = document.createElement('img');
  img.src = urlPhotoEtape(photo);
  img.alt = legende;
  img.width = 1200;
  img.height = 800;
  img.loading = index < 2 ? 'eager' : 'lazy';
  img.decoding = 'async';
  img.style.objectPosition = photo.position ? photo.position : 'center';
  img.style.objectFit = photo.fit ? photo.fit : 'cover';

  bouton.appendChild(img);
  figure.appendChild(bouton);

  var figcaption = document.createElement('figcaption');
  var spanAnnee = document.createElement('span');
  spanAnnee.className = 'fs-year';
  spanAnnee.textContent = photo.annee;
  var spanTexte = document.createElement('span');
  spanTexte.className = 'fs-text';
  spanTexte.textContent = legende;
  figcaption.appendChild(spanAnnee);
  figcaption.appendChild(document.createTextNode(' '));
  figcaption.appendChild(spanTexte);
  figure.appendChild(figcaption);

  li.appendChild(figure);
  return { li: li, bouton: bouton, img: img };
}

function creerLightboxEtapes(textes) {
  var dialog = document.createElement('dialog');
  dialog.className = 'fs-lightbox';
  dialog.setAttribute('aria-label', textes.lightboxLabel);

  var inner = document.createElement('div');
  inner.className = 'fs-lb-inner';

  var boutonFermer = document.createElement('button');
  boutonFermer.type = 'button';
  boutonFermer.className = 'fs-lb-close';
  boutonFermer.setAttribute('aria-label', textes.fermer);
  boutonFermer.textContent = '✕';

  var img = document.createElement('img');
  img.alt = '';

  var foot = document.createElement('div');
  foot.className = 'fs-lb-foot';

  var caption = document.createElement('p');
  caption.className = 'fs-lb-caption';

  var nav = document.createElement('div');
  nav.className = 'fs-lb-nav';
  var boutonPrecedent = document.createElement('button');
  boutonPrecedent.type = 'button';
  boutonPrecedent.setAttribute('aria-label', textes.prev);
  boutonPrecedent.textContent = '‹';
  var boutonSuivant = document.createElement('button');
  boutonSuivant.type = 'button';
  boutonSuivant.setAttribute('aria-label', textes.next);
  boutonSuivant.textContent = '›';
  nav.appendChild(boutonPrecedent);
  nav.appendChild(boutonSuivant);

  foot.appendChild(caption);
  foot.appendChild(nav);

  inner.appendChild(boutonFermer);
  inner.appendChild(img);
  inner.appendChild(foot);
  dialog.appendChild(inner);

  return {
    dialog: dialog,
    img: img,
    caption: caption,
    boutonFermer: boutonFermer,
    boutonPrecedent: boutonPrecedent,
    boutonSuivant: boutonSuivant
  };
}

document.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('.filmstrip');
  if (!container || grandesEtapesPhotos.length === 0) return;

  var langue = document.documentElement.lang || 'fr';
  var textes = grandesEtapesTextes[langue] || grandesEtapesTextes.fr;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var viewport = document.createElement('div');
  viewport.className = 'fs-viewport';

  var boutonPrecedent = creerFlecheFilmstrip('prev', textes.prev, 'fs-arrow');
  var boutonSuivant = creerFlecheFilmstrip('next', textes.next, 'fs-arrow');

  var track = document.createElement('ul');
  track.className = 'fs-track';
  track.setAttribute('aria-label', textes.photosDe(
    grandesEtapesPhotos[0].annee,
    grandesEtapesPhotos[grandesEtapesPhotos.length - 1].annee
  ));

  var slides = grandesEtapesPhotos.map(function (photo, i) {
    return creerSlideEtape(photo, i, langue, textes);
  });
  slides.forEach(function (slide) { track.appendChild(slide.li); });

  viewport.appendChild(boutonPrecedent);
  viewport.appendChild(track);
  viewport.appendChild(boutonSuivant);

  var compteur = document.createElement('p');
  compteur.className = 'fs-counter';
  compteur.setAttribute('aria-live', 'polite');

  var lightbox = creerLightboxEtapes(textes);

  container.appendChild(viewport);
  container.appendChild(compteur);
  container.appendChild(lightbox.dialog);

  var active = -1;
  var lbIndex = 0;

  // Précharge la photo voisine pour qu'un déplacement affiche la photo
  // immédiatement (déjà en cache navigateur) plutôt que d'attendre son
  // téléchargement à ce moment-là.
  function precharger(i) {
    var image = new Image();
    image.src = urlPhotoEtape(grandesEtapesPhotos[i]);
  }

  function centerOn(i, smooth) {
    if (smooth === undefined) smooth = true;
    var s = slides[i].li;
    var left = s.offsetLeft - (track.clientWidth - s.clientWidth) / 2;
    track.scrollTo({ left: left, behavior: smooth && !reduceMotion ? 'smooth' : 'auto' });
  }

  function updateActive() {
    var mid = track.scrollLeft + track.clientWidth / 2;
    var best = 0;
    var bestDist = Infinity;
    slides.forEach(function (slide, i) {
      var d = Math.abs(slide.li.offsetLeft + slide.li.clientWidth / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (best === active) return;
    active = best;
    slides.forEach(function (slide, i) {
      slide.li.classList.toggle('is-active', i === active);
      slide.li.setAttribute('aria-current', i === active ? 'true' : 'false');
    });
    compteur.textContent = (active + 1) + ' / ' + slides.length;
    boutonPrecedent.disabled = active === 0;
    boutonSuivant.disabled = active === slides.length - 1;
    precharger(Math.min(active + 1, slides.length - 1));
    precharger(Math.max(active - 1, 0));
  }

  var ticking = false;
  track.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { updateActive(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', function () { centerOn(active, false); updateActive(); });

  boutonPrecedent.addEventListener('click', function () { centerOn(Math.max(active - 1, 0)); });
  boutonSuivant.addEventListener('click', function () { centerOn(Math.min(active + 1, slides.length - 1)); });

  container.addEventListener('keydown', function (e) {
    if (lightbox.dialog.open) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); centerOn(Math.max(active - 1, 0)); }
    if (e.key === 'ArrowRight') { e.preventDefault(); centerOn(Math.min(active + 1, slides.length - 1)); }
  });

  slides.forEach(function (slide, i) {
    slide.bouton.addEventListener('click', function () {
      if (i === active) openLightbox(i); else centerOn(i);
    });
    slide.bouton.addEventListener('focus', function () {
      if (i !== active) centerOn(i);
    });
  });

  function rendreLightbox() {
    var photo = grandesEtapesPhotos[lbIndex];
    var legende = photo.texte[langue] || photo.texte.fr;
    lightbox.img.src = urlPhotoEtape(photo);
    lightbox.img.alt = legende;

    lightbox.caption.textContent = '';
    var fort = document.createElement('strong');
    fort.textContent = photo.annee;
    lightbox.caption.appendChild(fort);
    lightbox.caption.appendChild(document.createTextNode(' · ' + legende));
  }
  function openLightbox(i) {
    lbIndex = i;
    rendreLightbox();
    lightbox.dialog.showModal();
  }
  function stepLightbox(dir) {
    lbIndex = (lbIndex + dir + slides.length) % slides.length;
    rendreLightbox();
  }

  lightbox.boutonPrecedent.addEventListener('click', function () { stepLightbox(-1); });
  lightbox.boutonSuivant.addEventListener('click', function () { stepLightbox(1); });
  lightbox.boutonFermer.addEventListener('click', function () { lightbox.dialog.close(); });
  lightbox.dialog.addEventListener('click', function (e) {
    if (e.target === lightbox.dialog) lightbox.dialog.close();
  });
  lightbox.dialog.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });
  // En fermant, la bande se cale sur la dernière photo vue dans la lightbox
  lightbox.dialog.addEventListener('close', function () { centerOn(lbIndex, false); });

  updateActive();
});
