var app = angular.module('trackit', []);

app.controller('details',[ '$scope', function($scope) {
    $scope.name = window.localStorage.getItem("fullname");
    //$scope.college_wide_reqs = window.localStorage.getItem("college_wide_reqs").split(",");
    $scope.college_wide_reqs = {"FYWR" : [{"course" : "ENG 125"}], "ULWR" : []};

    if ($scope.college_wide_reqs["FYWR"].length < 1) {
    	$scope.FYWR = "";
    } else {
    	$scope.FYWR = $scope.college_wide_reqs["FYWR"][0]["course"];
    }

    if ($scope.college_wide_reqs["ULWR"].length < 1) {
    	$scope.ULWR = "";
    } else {
    	$scope.ULWR = $scope.college_wide_reqs["ULWR"][0]["course"];
    }
    //$scope.ULWR = "SAC 376";
    $scope.QR = "";
    $scope.RE = "";
    $scope.language = "francais";
    $scope.NS_creds = 3;
    $scope.NS = "BIO 172, BIO 171, asdf, dsaf , asdf,a sdff,a dsf, ds, asd, asdf , adsf, afd, a,a dfs adfs,";
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