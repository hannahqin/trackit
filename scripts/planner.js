$(document).ready(function() {
    $('#add-course-modal').on('click', '#plus-req-btn', function() {
        $(this).before('<input class="req-input body-input" type="text" size="8" name="req-1" placeholder="SS">');
    });

    $('#cancel-add-course-btn').click(resetReqInputsOnModal);
    $('#approve-add-course-btn').click(resetReqInputsOnModal);
});

function resetReqInputsOnModal() {
    $('#add-course-modal .reqs-section').empty();
    $('#add-course-modal .reqs-section').append('<input class="req-input body-input" type="text" size="8" name="req-1" placeholder="SS">');
    $('#add-course-modal .reqs-section').append('<span id="plus-req-btn" class="glyphicon glyphicon-plus"></span>');
}

var app = angular.module('trackit', []);
app.controller('planner',[ '$scope', function($scope) {
    $scope.name = window.localStorage.getItem("fullname");
    $scope.collegeWideReqs = JSON.parse(window.localStorage.getItem("college_wide_reqs"));
    $scope.areaDist = JSON.parse(window.localStorage.getItem("area_distribution"));
    $scope.csReqs = JSON.parse(window.localStorage.getItem("cs_reqs"));

    console.log(JSON.stringify($scope.name));
    console.log($scope.collegeWideReqs);
    console.log($scope.areaDist);
    console.log($scope.csReqs);


    // ----------- FUNCTIONS ----------- //

    $scope.checkCommonReqCredits = function(keyName, reqName, reqAbbreviation) {
        if (! $scope.collegeWideReqs[keyName].length) {
            var req = { name: reqName, abbreviation: reqAbbreviation };
            $scope.incompleteCommonReqs.push(req);
        }
    };

    $scope.checkAreaDistCredits = function(credits, keyName) {
        var numCreditsLeft = credits;
        if (! $scope.areaDist[keyName].length == 0) {
            for (course in $scope.areaDist[keyName]) {
                numCreditsLeft -= course.credits;
            }
        }
        if (numCreditsLeft) {
            var req = { req: keyName.substring(1), credits: numCreditsLeft };
            $scope.incompleteAreaDistReqs.push(req);
        }
    };

    $scope.showPrevSemester = function() {
        var startIndex = $scope.semesters.indexOf($scope.showingSemesters[0]) - 1;

        if (startIndex >= 0) {
            $scope.showingSemesters = [];
            for (var i = 0; i < 4; i ++) {
                $scope.showingSemesters.push($scope.semesters[startIndex+i]);
            }
        }
    }

    $scope.showNextSemester = function() {
        var startIndex = $scope.semesters.indexOf($scope.showingSemesters[0]) + 1;

        if (startIndex + 3 < $scope.semesters.length) {
            $scope.showingSemesters = []
            for (var i = 0; i < 4; i ++) {
                $scope.showingSemesters.push($scope.semesters[startIndex+i]);
            }
        }
    }


    // ------- COLLEGE WIDE DISTRIBUTION ------- //

    $scope.incompleteCommonReqs = [];

    $scope.checkCommonReqCredits("FYWR", "First-Year Writing", "FYWR");
    $scope.checkCommonReqCredits("ULWR", "Upper-Level Writing", "ULWR");
    $scope.checkCommonReqCredits("QR", "Quantitative Reasoning", "QR");
    $scope.checkCommonReqCredits("RE", "Race and Ethnicity", "RE");
    $scope.checkCommonReqCredits("LANG", "Language Requirement", "LANG");


    // ------- AREA DISTRIBUTION ------- //

    $scope.incompleteAreaDistReqs = [];


    // Core Area Dist: 7 credits each of HU, SS, and NS

    $scope.checkAreaDistCredits(7, "7HU");     // 7 Humanities
    $scope.checkAreaDistCredits(7, "7SS");     // 7 Social Science
    $scope.checkAreaDistCredits(7, "7NS");     // 7 Natural Science


    // Additional : 3 credits of 3/5 categories

    var additionalCredits = [];

    // figure out which 3 categories to display as incomplete
    var keys = ["3HU", "3NS", "3SS", "3MATH", "3ID", "3CE"];
    for (var i = 0; i < keys.length; i++) {
        if ($scope.areaDist[keys[i]].length > 0) {
            additionalCredits.push(keys[i]);
        }
    }

    for (var i = 0; i < additionalCredits.length; i++) {
        $scope.checkAreaDistCredits(3, additionalCredits[i]);
    }

    // if less than 3 categories started, add plain "Additional"
    var categoriesLeft = 3 - additionalCredits.length;
    for (var i = 0; i < categoriesLeft; i++) {
        var req = { req: "Additional", credits: 3 };
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
    
    $scope.courses = dict;

/******CREATE ARRAY FOR FIRST 4 SEMESTERS***************/    

    var earliest_sem;
    var earliest_year = 3000;
    for (var key in dict) {
        var year = parseInt(key.substring(3, 7));
        if (earliest_year > year) {
            earliest_year = year;
            earliest_sem = key;
        } else if (earliest_year === year) {
            if (key.substring(0, 2) === "WN") {
                earliest_sem = key;
            }
        }
    }
    var semesters = [];
    semesters.push(earliest_sem);
    var last = earliest_sem.substring(0,2);

    while (semesters.length < 8) {
        if (last === "WN") {
            last = "FA";
            semesters.push("FA " + earliest_year.toString());
        } else {
            last = "WN";
            earliest_year += 1;
            semesters.push("WN " + earliest_year.toString());
        }
    }
    $scope.semesters = semesters;

    $('#add-semester').click(function() {
        var last = $scope.semesters[$scope.semesters.length - 1];
        var year = parseInt(last.substring(3, 7))
        if (last.substring(0,2) == "FA") {
            year += 1;
            semesters.push("WN " + year.toString());
        } else {
            semesters.push("FA " + year.toString());
        }
        $scope.showNextSemester();
        //console.log($scope.semesters);
    });

    $scope.showingSemesters = [ semesters[4], semesters[5], semesters[6], semesters[7] ];

    console.log("Semesters:", semesters);
    console.log("Showing Semesters:", $scope.showingSemesters);
    console.log("Classes per sem:", dict);

    $("#approve-add-course-btn").on("click", function() {
        console.log(createClass());
    });
}]);

function createClass() {
    var courseName = $(".main-input").val();
    var semester = $(".form-control option:selected").val();
    var credits = $(".num-credits-input").val();
    var reqs = [];
    $(".req-input").each(function(index, input) {
        reqs.push($(input).val());
    });
    console.log(courseName, semester, credits, reqs);
    return {"course": courseName, "sem": semester, "credits": credits, "reqs": reqs, "taken": false}
}


