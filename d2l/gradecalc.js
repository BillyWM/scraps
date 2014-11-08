// ==UserScript==
// @name	D2L grade calculator
// @match 	https://d2l.losrios.edu/d2l/lms/grades/my_grades/main.d2l*
// @require https://code.jquery.com/jquery-latest.js
// @require https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js
// ==/UserScript==

/*
	Assumptions:
		1. That labels for grade values and percentages start with z_
		2. That additional, decorative labels within the grade table will have no ID
		
	NOTE:
		Ignores 0% scores, assuming they're items not graded yet.
		If the user actually got 0% on an assignment, this will be inaccurate.
*/

$(document).ready(function() {
	grade_elements = $("table[summary='List of grade items and their values'] label[id]");
	grade_data = [], grade_points = [], grade_percents = [];
	grade_elements.each(
		function(i, el) {
			var $el = $(el);
			if (i % 2 == 0) {
				grade_points.push($el.text());
			} else {
				grade_percents.push($el.text());
			}
		}
	);
	
	grade_percents = _.map(grade_percents, function(str) {
		// chop " %" from the percentages, e.g. "100 %"
		return str.slice(0, -2);
	});
	
	grade_points = _.map(grade_points, function(str) {
		// turns "3 / 5" into {points: 3, total: 5}
		return _.object(['points', 'total'], str.split(" / "));
	});
	
	// Interleave the arrays, then get rid of entries with 0% grades
	grade_data = _.zip(grade_points, grade_percents);
	grade_data = _.filter(grade_data, function(arr) {
		return arr[1] > 0;
	});
	
	var sum = 0;
	var possible = 0;
	_.each(grade_data, function(el) {
		sum += parseInt(el[0].points);
		possible += parseInt(el[0].total);
	});
	console.log(sum, possible, (sum/possible * 100).toFixed(2) + "%" );
});