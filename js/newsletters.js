// Archive des newsletters envoyées, affichée sur newsletter.html.
// Même principe que js/rapports.js : déposer le PDF dans assets/newsletters/
// puis ajouter une ligne { annee: ..., mois: ..., fichier: '...' } ci-dessous
// (mois de 1 à 12), la plus récente en premier.
var newsletters = [
  { annee: 2026, mois: 9, fichier: 'newsletter-2026-09.pdf' }
];

var moisTextes = {
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
};

var newslettersLabelTextes = {
  fr: 'Newsletter (PDF)',
  en: 'Newsletter (PDF)',
  de: 'Newsletter (PDF)'
};

document.addEventListener('DOMContentLoaded', function () {
  var grid = document.querySelector('.newsletters-grid');
  if (!grid) return;

  var langue = document.documentElement.lang || 'fr';
  var noms = moisTextes[langue] || moisTextes.fr;
  var texteLabel = newslettersLabelTextes[langue] || newslettersLabelTextes.fr;

  newsletters.forEach(function (item) {
    var link = document.createElement('a');
    link.className = 'newsletter-card';
    link.href = '/assets/newsletters/' + item.fichier;
    link.target = '_blank';
    link.rel = 'noopener';

    var periode = document.createElement('span');
    periode.className = 'year';
    periode.textContent = noms[item.mois - 1] + ' ' + item.annee;

    var label = document.createElement('span');
    label.className = 'label';
    label.textContent = texteLabel;

    link.appendChild(periode);
    link.appendChild(label);
    grid.appendChild(link);
  });
});
