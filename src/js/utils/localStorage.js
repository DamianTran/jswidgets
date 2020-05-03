
/* Local storage update script */

const jswFirstVisit = localStorage.getItem('jsw-first-visit') ? false : true;
var jswNumVisits = Number(localStorage.getItem('jsw-num-visits'));

export {
    jswFirstVisit,
    jswNumVisits
};

++jswNumVisits;

localStorage.setItem('jsw-first-visit', false);
localStorage.setItem('jsw-num-visits', jswNumVisits);