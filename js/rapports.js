// Liste des rapports annuels.
// Pas de rapport 2001 : l'association a été fondée le 1er novembre 2001,
// le premier rapport annuel complet date de 2002.
// Pour ajouter un rapport : déposer le PDF dans assets/rapports/
// puis ajouter une ligne { year: ..., file: '...' } ci-dessous.
var rapports = [
  { year: 2025, file: 'rapport-2025.pdf' },
  { year: 2024, file: 'rapport-2024.pdf' },
  { year: 2023, file: 'rapport-2023.pdf' },
  { year: 2022, file: 'rapport-2022.pdf' },
  { year: 2021, file: 'rapport-2021.pdf' },
  { year: 2020, file: 'rapport-2020.pdf' },
  { year: 2019, file: 'rapport-2019.pdf' },
  { year: 2018, file: 'rapport-2018.pdf' },
  { year: 2017, file: 'rapport-2017.pdf' },
  { year: 2016, file: 'rapport-2016.pdf' },
  { year: 2015, file: 'rapport-2015.pdf' },
  { year: 2014, file: 'rapport-2014.pdf' },
  { year: 2013, file: 'rapport-2013.pdf' },
  { year: 2012, file: 'rapport-2012.pdf' },
  { year: 2011, file: 'rapport-2011.pdf' },
  { year: 2010, file: 'rapport-2010.pdf' },
  { year: 2009, file: 'rapport-2009.pdf' },
  { year: 2008, file: 'rapport-2008.pdf' },
  { year: 2007, file: 'rapport-2007.pdf' },
  { year: 2006, file: 'rapport-2006.pdf' },
  { year: 2005, file: 'rapport-2005.pdf' },
  { year: 2004, file: 'rapport-2004.pdf' },
  { year: 2003, file: 'rapport-2003.pdf' },
  { year: 2002, file: 'rapport-2002.pdf' }
];

document.addEventListener('DOMContentLoaded', function () {
  var grid = document.querySelector('.rapports-grid');
  if (!grid) return;

  rapports.forEach(function (rapport) {
    var link = document.createElement('a');
    link.className = 'rapport-card';
    link.href = 'assets/rapports/' + rapport.file;
    link.target = '_blank';
    link.rel = 'noopener';

    var year = document.createElement('span');
    year.className = 'year';
    year.textContent = rapport.year;

    var label = document.createElement('span');
    label.className = 'label';
    label.textContent = 'Rapport annuel (PDF)';

    link.appendChild(year);
    link.appendChild(label);
    grid.appendChild(link);
  });
});
