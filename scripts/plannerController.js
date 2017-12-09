var app = angular.module('trackit', []);

app.controller('planner',[ '$scope', function($scope) {
    $scope.name = window.localStorage.getItem("fullname");
    $scope.collegeWideReqs = JSON.parse(window.localStorage.getItem("college_wide_reqs"));
    $scope.areaDist = JSON.parse(window.localStorage.getItem("area_distribution"));
    $scope.csReqs = JSON.parse(window.localStorage.getItem("cs_reqs"));

    console.log("Hi " + $scope.name + "!");
    console.log("College-Wide Reqs Dictionary", $scope.collegeWideReqs);
    console.log("Area Dist Reqs Dictionary", $scope.areaDist);
    console.log("CS Reqs Dictionary", $scope.csReqs);

    var badgeKeyDict = {
        "7HU": "HU",
        "7SS": "SS",
        "7NS": "NS",
        "3CE": "CE",
        "3HU": "HU",
        "3SS": "SS",
        "3NS": "NS",
        "3ID": "ID",
        "3MATH": "MATH",
        "capstone": "CAPSTONE",
        "core": "CS CORE",
        "probability": "STATS",
        "ul": "ULCS"
    };


    // ----------- SCOPE VARIABLES ----------- //

    $scope.incompleteCommonReqs = [];
    $scope.incompleteAreaDistReqs = [];
    $scope.incompleteCsReqs = [];

    $scope.courses = {};
    $scope.semesters = [];
    $scope.showingSemesters = [];
    $scope.futureSemesters = ['Semester'];


    // ----------- FUNCTIONS ----------- //

    $scope.checkCommonReqCredits = function(keyName, reqName, reqAbbreviation) {
        if (! $scope.collegeWideReqs[keyName].length) {
            if (reqAbbreviation == "LANG" && !$scope.collegeWideReqs["placedOutLANG"]) {
                var req = { name: reqName, abbreviation: reqAbbreviation };
                $scope.incompleteCommonReqs.push(req);
            }
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

    // reqDict is one of the 3 we got from localstorage
    $scope.createSemesterDicts = function(reqDict, tempSemDict) {
        for (var key in reqDict) {
            for (var i in reqDict[key]) {
                var sem = reqDict[key][i].sem;

                // if this semester hasn't been created before, initialize it
                if (tempSemDict[sem] === undefined) {
                    tempSemDict[sem] = {};
                }

                var badgeString = badgeKeyDict[key] ? badgeKeyDict[key] : key;
                // if this course hasn't been created before for this semester, initialize it
                if (tempSemDict[sem][reqDict[key][i].course] === undefined) {
                    tempSemDict[sem][reqDict[key][i].course] = reqDict[key][i];
                    tempSemDict[sem][reqDict[key][i].course]["reqs"] = [ badgeString ];

                // otherwise, add this requirement to the existing course
                } else {
                    tempSemDict[sem][reqDict[key][i].course]["reqs"].push(badgeString);
                }
            }
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

    $scope.addSemester = function() {
        var last = $scope.semesters[$scope.semesters.length - 1];
        var year = parseInt(last.substring(3, 7))
        var newSem = "";

        if (last.substring(0,2) == "FA") {
            year += 1;
            newSem = "WN " + year.toString();
        } else {
            newSem = "FA " + year.toString();
        }

        $scope.futureSemesters.push(newSem);
        $scope.semesters.push(newSem);
        $scope.showNextSemester();
    }

    $scope.addCourse = function() {
        // get input and clear form so it's blank the next time it's clicked
        var newCourse = getClassInput();
        $('#add-course-form')[0].reset();
        $('#semester-selection').val('');

        if ($scope.courses[newCourse["sem"]] === undefined) {
            $scope.courses[newCourse["sem"]] = {}
        }
        $scope.courses[newCourse["sem"]][newCourse["course"]] = newCourse; 

        // Set top value
        for (var key in $scope.courses) {
            var top = 40;
            for (var key2 in $scope.courses[key]) {
                $scope.courses[key][key2]["top"] = top;
                top += parseInt($scope.courses[key][key2]["credits"]) * 20;
            }
        }

        for (var i = 0; i < newCourse["reqs"].length; i++) {
            var req = newCourse["reqs"][i];

            for (var j = 0; j < $scope.incompleteCommonReqs.length; j++) {
                var incomplete = $scope.incompleteCommonReqs[j];
                if (req == incomplete.abbreviation) {
                    $scope.incompleteCommonReqs.splice(j, 1);
                }
            }

            for (var j = 0; j < $scope.incompleteAreaDistReqs.length; j++) {
                var incomplete = $scope.incompleteAreaDistReqs[j];
                if (req == incomplete.req) {
                    $scope.incompleteAreaDistReqs.splice(j, 1);
                }
            }

            for (var j = 0; j < $scope.incompleteCsReqs.length; j++) {
                var incomplete = $scope.incompleteCsReqs[j];
                if (req == incomplete.courseName) {
                    $scope.incompleteCsReqs.splice(j, 1);
                }
            }

        };
    }

    $scope.mouseoverCourse = function($event) {
        $($event.currentTarget).css('height', '80px');
        $($event.currentTarget).css('z-index', '100');
    }

    $scope.mouseleaveCourse = function($event) {
        var originalHeight = $($event.currentTarget).data('origHeight');
        $($event.currentTarget).css('height', originalHeight);
        $($event.currentTarget).css('z-index', '');
    }


    // ------- COLLEGE WIDE DISTRIBUTION ------- //

    $scope.checkCommonReqCredits("FYWR", "First-Year Writing", "FYWR");
    $scope.checkCommonReqCredits("ULWR", "Upper-Level Writing", "ULWR");
    $scope.checkCommonReqCredits("QR", "Quantitative Reasoning", "QR");
    $scope.checkCommonReqCredits("RE", "Race and Ethnicity", "RE");
    $scope.checkCommonReqCredits("LANG", "Language Requirement", "LANG");


    // ------- AREA DISTRIBUTION ------- //

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
        var req = { courseName: 'ULCS', credits: numLeft * 4 };
        $scope.incompleteCsReqs.push(req);
    }


    // ------- CREATE SEMESTER DICTS ------- //

    // create dictionary of semesters
    var tempSemDict = {};
    var reqDicts = [ $scope.collegeWideReqs, $scope.areaDist, $scope.csReqs ];
    for (var i = 0; i < reqDicts.length; i++) {
        $scope.createSemesterDicts(reqDicts[i], tempSemDict);
    };

    // add positioning to each course
    for (var key in tempSemDict) {
        var top = 40;

        for (var key2 in tempSemDict[key]) {
            tempSemDict[key][key2]["top"] = top;
            top += parseInt(tempSemDict[key][key2]["credits"]) * 20;
        }
    }
    
    $scope.courses = tempSemDict;


    // Order semesters by earliest to latest
    var earliest_sem;
    var earliest_year = 3000;
    for (var key in tempSemDict) {
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
    var year = earliest_year;

    while (semesters.length < 8) {
        if (last === "WN") {
            last = "FA";
        } else {
            last = "WN";
            year += 1;
        }
        var sem = last + " " +  year.toString();
        semesters.push(sem);

        if (!(sem in tempSemDict)) {
            $scope.futureSemesters.push(sem);
        }
    }

    $scope.semesters = semesters;
    $scope.showingSemesters = [ semesters[4], semesters[5], semesters[6], semesters[7] ];
}]);

function getClassInput() {
    // Retrieve data from modal
    var courseName = $(".main-input").val();
    var semester = $(".form-control option:selected").val();
    var credits = $(".num-credits-input").val();
    var reqs = [];
    $(".req-input").each(function(index, input) {
        reqs.push($(input).val());
    });

    return {
        "course": courseName,
        "sem": semester,
        "credits": credits,
        "reqs": reqs,
        "taken": false,
        "top": 40,
    };
}




