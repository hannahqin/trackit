$(document).ready(function() {
    $('.main-content').css('visibility', 'visible');
});

var app = angular.module('trackit', []);

app.controller('details',[ '$scope', function($scope) {
    $scope.name = window.localStorage.getItem("fullname");
    var totalcredits = window.localStorage.getItem("totalcredits");
    $scope.college_wide_reqs = JSON.parse(window.localStorage.getItem("college_wide_reqs"));
    $scope.area_distribution = JSON.parse(window.localStorage.getItem("area_distribution"));
    $scope.cs_reqs = JSON.parse(window.localStorage.getItem("cs_reqs"));

    console.log("Full name:", $scope.name);
    console.log("Total credits:", totalcredits);
    console.log("College-wide Reqs:", $scope.college_wide_reqs);
    console.log("Area Distribution:", $scope.area_distribution);
    console.log("CS Reqs:", $scope.cs_reqs);


    // ---- SCOPE VARIABLES ---- //

    $scope.incompleteCollegeWide = [];
    $scope.incompleteAreaDist = [];


    // ---- COLLEGE WIDE DISTRIBUTION ---- //

    var collegeWideDict = {
        FYWR: "First-Year Writing",
        ULWR: "Upper-Level Writing",
        QR: "Quantitative Reasoning",
        RE: "Race and Ethnicity",
        LANG: "Language Requirement",
    };

    for (key in collegeWideDict) {
        var details = {
            done: false,
            fullName: collegeWideDict[key],
            course: ""
        };
        if ($scope.college_wide_reqs[key].length > 0) {
            details.done = true;
            details.course = $scope.college_wide_reqs[key][0]["course"];
        }
        if ($scope.college_wide_reqs["placedOutLANG"]) {
            details.done = true;
        }
        $scope.incompleteCollegeWide.push(details);
    }


    // ---- AREA DISTRIBUTION ---- //

    var areaDistDict = {
        "7HU": "HU",
        "7NS": "NS",
        "7SS": "SS"
    };

    for (key in areaDistDict) {
        var details = {
            done: false,
            displayName: areaDistDict[key],
            creditsRequired: 7,
            creditsDone: 0.0,
            coursesTaken: ''
        };
        if ($scope.area_distribution[key].length > 0) {
            var courses = [];
            for (i = 0; i < $scope.area_distribution[key].length; ++i) {
                courses.push($scope.area_distribution[key][i]["course"]);
                details.creditsDone += parseFloat($scope.area_distribution[key][i]["credits"]);
            }
            details.done = true;
            details.coursesTaken = courses.join(", ");
        }
        $scope.incompleteAreaDist.push(details);
    }

    var areaDistAddtlDict = {
        "3HU": "Addtnl (HU)",
        "3NS": "Addtnl (NS)",
        "3SS": "Addtnl (SS)",
        "3ID": "Addtnl (ID)",
        "3CE": "Addtnl (CE)",
        "3MATH": "Addtnl (MATH)"
    };
    var addtlNotCompleted = [];

    var additional = 0;
    for (key in areaDistAddtlDict) {
        if (additional == 3) {
            break;
        }

        if ($scope.area_distribution[key].length > 0) {
            additional += 1;

            var courses = [];
            var credits = 0.0
            for (i = 0; i < $scope.area_distribution[key].length; ++i) {
                courses.push($scope.area_distribution[key][i]["course"]);
                credits += parseFloat($scope.area_distribution[key][i]["credits"]);
            }

            var details = {
                done: true,
                displayName: areaDistAddtlDict[key],
                creditsRequired: 3,
                creditsDone: credits,
                coursesTaken: courses.join(", ")
            };
            $scope.incompleteAreaDist.push(details);

        } else {
            addtlNotCompleted.push(key);
        }
    }

    if (additional < 3) {
        for (var i = 0; i < 3 - additional.length; i++) {
            var details = {
                done: false,
                displayName: areaDistAddtlDict[addtlNotCompleted[i]],
                creditsRequired: 3,
                creditsDone: 0,
                coursesTaken: ''
            }
            $scope.incompleteAreaDist.push(details);
        }
    }


    // ---- COMPUTER SCIENCE ---- //

    if ($scope.cs_reqs["ul"].length > 0) {
        var allULCS = [];
        var creditsULCS = 0;
        for (i = 0; i < $scope.cs_reqs["ul"].length; ++i) {
            allULCS.push($scope.cs_reqs["ul"][i]["course"]);
            creditsULCS += parseFloat($scope.cs_reqs["ul"][i]["credits"]);
        }
        $scope.ULCS = allULCS.join(", ");
        $scope.ULCS_creds = creditsULCS;
    }

    if ($scope.cs_reqs["capstone"].length > 0) {
    	$scope.capstone = $scope.cs_reqs["capstone"][0]["course"];
    }
}]);