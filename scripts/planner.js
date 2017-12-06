$(document).ready(function() {
    $('#add-course-modal').on('click', '#plus-req-btn', function() {
        $(this).before('<input class="req-input body-input" type="text" size="8" name="req-1" placeholder="SS">');
    });

    $('#cancel-add-course-btn').click(resetReqInputsOnModal);
    $('#approve-add-course-btn').click(resetReqInputsOnModal);
    $('#cancel-add-sem-btn').click();
    $('#approve-add-sem-btn').click(addSemester);
});

function resetReqInputsOnModal() {
    $('#add-course-modal .reqs-section').empty();
    $('#add-course-modal .reqs-section').append('<input class="req-input body-input" type="text" size="8" name="req-1" placeholder="SS">');
    $('#add-course-modal .reqs-section').append('<span id="plus-req-btn" class="glyphicon glyphicon-plus"></span>');
}

function addSemester() {
    $('.header-row').append('<th class="col-md-3">' + $('#add-sem-text').val() + '</th>');
}


var app = angular.module('trackit', []);
app.controller('planner',[ '$scope', function($scope) {
    $scope.name = window.localStorage.getItem("fullname");
    $scope.collegeWideReqs = JSON.parse(window.localStorage.getItem("college_wide_reqs"));
    $scope.areaDist = JSON.parse(window.localStorage.getItem("area_distribution"));
    $scope.csReqs = JSON.parse(window.localStorage.getItem("cs_reqs"));

    console.log($scope.collegeWideReqs);
    console.log($scope.areaDist);
    console.log($scope.csReqs);


    // ------- COLLEGE WIDE DISTRIBUTION ------- //

    $scope.incompleteCommonReqs = [];

    if (! $scope.collegeWideReqs["FYWR"].length) {
        var req = {  name: 'First-Year Writing', abbreviation: 'FYWR' };
        $scope.incompleteCommonReqs.push(req);
    }

    if (! $scope.collegeWideReqs["ULWR"].length) {
        var req = {  name: 'Upper-Level Writing', abbreviation: 'ULWR' };
        $scope.incompleteCommonReqs.push(req);
    }

    if (! $scope.collegeWideReqs["QR"].length) {
        var req = {  name: 'Quantitative Reasoning', abbreviation: 'QR' };
        $scope.incompleteCommonReqs.push(req);
    }

    if (! $scope.collegeWideReqs["RE"].length) {
        var req = {  name: 'Race and Ethnicity', abbreviation: 'RE' };
        $scope.incompleteCommonReqs.push(req);
    }

    if (! $scope.collegeWideReqs["LANG"].length) {
        var req = {  name: 'Language Requirement', abbreviation: 'LANG' };
        $scope.incompleteCommonReqs.push(req);
    }


    // ------- AREA DISTRIBUTION ------- //

    $scope.incompleteAreaDistReqs = [];

    var huCredits = 0;
    var nsCredits = 0;
    var ssCredits = 0;

    // 7 Humanities
    if ($scope.areaDist["7HU"].length) {
        for (course in $scope.areaDist["7HU"]) {
            huCredits += course.credits;
        }
    }



    // 7 Humanities
    if ($scope.areaDist["7HU"].length) {
        for (course in $scope.areaDist["7HU"]) {
            huCreditsLeft -= course.credits;
        }
    }
    // 7 Social Science
    if ($scope.areaDist["7SS"].length) {
        for (course in $scope.areaDist["7SS"]) {
            ssCreditsLeft -= course.credits;
        }
    }
    // 7 Natural Science
    if (! $scope.areaDist["7NS"].length == 0) {
        for (course in $scope.areaDist["7NS"]) {
            nsCreditsLeft -= course.credits;
        }
    }

    if (huCreditsLeft) {
        var req = { req: 'HU', credits: huCreditsLeft };
        $scope.incompleteAreaDistReqs.push(req);
    }
    if (ssCreditsLeft) {
        var req = { req: 'SS', credits: ssCreditsLeft };
        $scope.incompleteAreaDistReqs.push(req);
    }
    if (nsCreditsLeft) {
        var req = { req: 'NS', credits: nsCreditsLeft };
        $scope.incompleteAreaDistReqs.push(req);
    }


    // ------- CS REQUIREMENTS ------- //

    $scope.incompleteCsReqs = [];

    if ($scope.csReqs['core'].length < 3) {
        var coreCourses = {};
        for (course in $scope.csReqs['core']) {
            coreCourses[course.course] = course;
        }

        for (coreReq in ['EECS 281', 'EESC 370', 'EECS 376']) {
            if (! coreReq in coreCourses) {
                var req = { courseName: coreReq, credits: 4 };
                $scope.incompleteCsReqs.push(req);
            }
        }
    }

    if ($scope.csReqs['probability'].length < 1) {
        var req = { courseName: 'STATS 250', credits: 4 };
        $scope.incompleteCsReqs.push(req);
    }

    if ($scope.csReqs['capstone'].length < 1) {
        var req = { courseName: 'Capstone', credits: 4 };
        $scope.incompleteCsReqs.push(req);
    }

    if ($scope.csReqs['ul'].length < 4) {
        var numLeft = 4 - $scope.csReqs['ul'].length;
        var req = { courseName: 'ULCS', credits: 4 };
        for (var i = 0; i < numLeft; i++) {
            $scope.incompleteCsReqs.push(req);
        }
    }


    // ------- CREATE SEMESTER DICTS ------- //

    var dict = {};
    for (var key in $scope.collegeWideReqs) {
        for (var i in $scope.collegeWideReqs[key]) {
            var sem = $scope.collegeWideReqs[key][i].sem;
            if (dict[sem] === undefined) {
                dict[sem] = {};
            }
            if (dict[sem][$scope.collegeWideReqs[key][i].course] === undefined) {
                dict[sem][$scope.collegeWideReqs[key][i].course] = $scope.collegeWideReqs[key][i];
            }
        }
    }
    for (var key in $scope.areaDist) {
        for (var i in $scope.areaDist[key]) {
            var sem = $scope.areaDist[key][i].sem;
            if (dict[sem] === undefined) {
                dict[sem] = {};
            }
            if (dict[sem][$scope.areaDist[key][i].course] === undefined) {
                dict[sem][$scope.areaDist[key][i].course] = $scope.areaDist[key][i];
            }
        }
    }
    for (var key in $scope.csReqs) {
        for (var i in $scope.csReqs[key]) {
            var sem = $scope.csReqs[key][i].sem;
            if (dict[sem] === undefined) {
                dict[sem] = {};
            }
            if (dict[sem][$scope.csReqs[key][i].course] === undefined) {
                dict[sem][$scope.csReqs[key][i].course] = $scope.csReqs[key][i];
            }
        }
    }

    for (var key in dict) {
        var top = 40;
        for (var key2 in dict[key]) {
            dict[key][key2]["top"] = top;
            top += parseInt(dict[key][key2]["credits"]) * 20;
        }
    }
    console.log(dict);
    $scope.courses = dict;



}]);


