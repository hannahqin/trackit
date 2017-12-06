$(document).ready(function() {

    // Retrieve checklist info
    var fullname = window.localStorage.getItem("fullname");
    var totalcredits = window.localStorage.getItem("totalcredits");
    var college_wide_reqs = JSON.parse(window.localStorage.getItem("college_wide_reqs"));
    var area_distribution = JSON.parse(window.localStorage.getItem("area_distribution"));
    var cs_reqs = JSON.parse(window.localStorage.getItem("cs_reqs"));

    console.log("Full name:", fullname);
    console.log("Total credits:", totalcredits);
    console.log("College-wide Reqs:", college_wide_reqs);
    console.log("Area Distribution:", area_distribution);
    console.log("CS Reqs:", cs_reqs);
});

var app = angular.module('trackit', [])

app.controller('overview',[ '$scope', function($scope) {
    var firstname = window.localStorage.getItem("fullname");
    firstname = firstname.substr(0, firstname.indexOf(' '));
    $scope.name = firstname;
    $scope.data = window.localStorage.getItem("lsa_reqs").split(",");
    $scope.total_credits = parseInt(window.localStorage.getItem("totalcredits"));
    if (($scope.total_credits / 120) > 1) {
        $scope.percentage = "100%"
    } else {
        $scope.percentage = (($scope.total_credits / 120) * 100).toFixed(2).toString() + "%";
    }

    //core courses
    var stats = true;
    var e281 = true;
    var e370 = false;
    var e376 = false;

    if(stats === true) {
        // debugger;
        $('#sq1')[0].style.backgroundColor = "#4A90E2";
        $('#sq1')[0].style.color = "#FFFFFF";
    }

    if(e281 === true) {
        // debugger;
        $('#sq2')[0].style.backgroundColor = "#4A90E2";
        $('#sq2')[0].style.color = "#FFFFFF";
    }

    if(e370 === true) {
        // debugger;
        $('#sq3')[0].style.backgroundColor = "#4A90E2";
        $('#sq3')[0].style.color = "#FFFFFF";
    }

    if(e376 == true) {
        // debugger;
        $('#sq4')[0].style.backgroundColor = "#4A90E2";
        $('#sq4')[0].style.color = "#FFFFFF";
    }

    //ULCS
    var ulcs1 = "";
    $scope.ulcs1 = ulcs1;

    var ulcs2 = "";
    $scope.ulcs2 = ulcs2;

    var ulcs3 = "";
    $scope.ulcs3 = ulcs3;

    var ulcs4 = "";
    $scope.ulcs4 = ulcs4;

    var capstone = "EECS 441";
    $scope.capstone = capstone;

}]);