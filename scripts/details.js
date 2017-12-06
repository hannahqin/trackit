var app = angular.module('trackit', []);

app.controller('details',[ '$scope', function($scope) {
    $scope.name = window.localStorage.getItem("fullname");
    var totalcredits = window.localStorage.getItem("totalcredits");
    $scope.college_wide_reqs = JSON.parse(window.localStorage.getItem("college_wide_reqs"));
    var area_distribution = JSON.parse(window.localStorage.getItem("area_distribution"));
    var cs_reqs = JSON.parse(window.localStorage.getItem("cs_reqs"));

    console.log("Full name:", $scope.name);
    console.log("Total credits:", totalcredits);
    console.log("College-wide Reqs:", $scope.college_wide_reqs);
    console.log("Area Distribution:", area_distribution);
    console.log("CS Reqs:", cs_reqs);

    if ($scope.college_wide_reqs["FYWR"].length > 0) {
    	$scope.FYWR = $scope.college_wide_reqs["FYWR"][0]["course"];
    }

    if ($scope.college_wide_reqs["ULWR"].length > 0) {
    	$scope.ULWR = $scope.college_wide_reqs["ULWR"][0]["course"];
    }

    if ($scope.college_wide_reqs["QR"].length > 0) {
    	$scope.QR = $scope.college_wide_reqs["QR"][0]["course"];
    }

    if ($scope.college_wide_reqs["RE"].length > 0) {
    	$scope.RE = $scope.college_wide_reqs["RE"][0]["course"];
    }

    if ($scope.college_wide_reqs["LANG"].length > 0) {
    	$scope.LANG = $scope.college_wide_reqs["LANG"][0]["course"];
    }

    $scope.NS_creds = 3;
    $scope.NS = "";
    $scope.HU_creds = 0;
    $scope.HU;
    $scope.SS_creds;
    $scope.SS
    $scope.addtnl1_creds;
    $scope.addtnl1;
    $scope.addtnl2_creds;
    $scope.addtnl2;
    $scope.addtnl3_creds;
    $scope.addtnl3;
    $scope.ULCS_creds;
    $scope.ULCS;
    $scope.capstone;

}]);