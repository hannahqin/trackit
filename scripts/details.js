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



    // ---- COLLEGE WIDE DISTRIBUTION ---- //

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



    // ---- AREA DISTRIBUTION ---- //

    if ($scope.area_distribution["7HU"].length > 0) {
        var allHU = [];
        var creditsHU = 0;
        for (i = 0; i < $scope.area_distribution["7HU"].length; ++i) {
            allHU.push($scope.area_distribution["7HU"][i]["course"]);
            creditsHU += parseInt($scope.area_distribution["7HU"][i]["credits"]);
        }
        $scope.HU = allHU.join(", ");
        $scope.HU_creds = creditsHU;
    }

    if ($scope.area_distribution["7NS"].length > 0) {
        var allNS = [];
        var creditsNS = 0;
        for (i = 0; i < $scope.area_distribution["7NS"].length; ++i) {
            allNS.push($scope.area_distribution["7NS"][i]["course"]);
            creditsNS += parseInt($scope.area_distribution["7NS"][i]["credits"]);
        }
        $scope.NS = allNS.join(", ");
        $scope.NS_creds = creditsNS;
    }
    
    if ($scope.area_distribution["7SS"].length > 0) {
        var allSS = [];
        var creditsSS = 0;
        for (i = 0; i < $scope.area_distribution["7SS"].length; ++i) {
            allSS.push($scope.area_distribution["7SS"][i]["course"]);
            creditsSS += parseInt($scope.area_distribution["7SS"][i]["credits"]);
        }
        $scope.SS = allSS.join(", ");
        $scope.SS_creds = creditsSS;
    }

    



    // ---- COMPUTER SCIENCE ---- //

    if ($scope.cs_reqs["ul"].length > 0) {
        var allULCS = [];
        var creditsULCS = 0;
        for (i = 0; i < $scope.cs_reqs["ul"].length; ++i) {
            allULCS.push($scope.cs_reqs["ul"][i]["course"]);
            creditsULCS += parseInt($scope.cs_reqs["ul"][i]["credits"]);
        }
        $scope.ULCS = allULCS.join(", ");
        $scope.ULCS_creds = creditsULCS;
    }

    if ($scope.cs_reqs["capstone"].length > 0) {
    	$scope.capstone = $scope.cs_reqs["capstone"][0]["course"];
    }
}]);