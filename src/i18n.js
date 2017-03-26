import jQuery from 'jquery';

/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood{at}iinet.com.au),
			  Stéphane Nahmani (sholby@sholby.net),
			  Stéphane Raimbault <stephane.raimbault@gmail.com> */
(function (datepicker) {

    datepicker.regional.fr = {
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
        ],
        monthNamesShort: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
            'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'
        ],
        dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    //datepicker.setDefaults( datepicker.regional.fr );

    return datepicker.regional.fr;

})(jQuery.datepicker);

/* Dutch (Belgium) initialisation for the jQuery UI date picker plugin. */
/* David De Sloovere @DavidDeSloovere */
(function (datepicker) {

    datepicker.regional.nl = {
        closeText: 'Sluiten',
        prevText: '←',
        nextText: '→',
        currentText: 'Vandaag',
        monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
            'juli', 'augustus', 'september', 'oktober', 'november', 'december'
        ],
        monthNamesShort: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
            'jul', 'aug', 'sep', 'okt', 'nov', 'dec'
        ],
        dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
        dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
        dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
        weekHeader: 'Wk',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    //datepicker.setDefaults( datepicker.regional.nl );

    return datepicker.regional.nl;

})(jQuery.datepicker);


/* English/UK initialisation for the jQuery UI date picker plugin. */
/* Written by Stuart. */
(function (datepicker) {

    datepicker.regional.en = {
	closeText: "Done",
	prevText: "Prev",
	nextText: "Next",
	currentText: "Today",
	monthNames: [ "January","February","March","April","May","June",
	"July","August","September","October","November","December" ],
	monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
	dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
	dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
	dayNamesMin: [ "Su","Mo","Tu","We","Th","Fr","Sa" ],
	weekHeader: "Wk",
	dateFormat: "dd/mm/yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: "" };
    //datepicker.setDefaults( datepicker.regional.en );

    return datepicker.regional.en;

})(jQuery.datepicker);


(function (datepicker) {

    datepicker.setLanguage = function (lang) {
        datepicker.setDefaults(datepicker.regional[lang]);
    }

})(jQuery.datepicker);