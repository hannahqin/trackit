var app = angular.module('trackit', []);

app.controller('progressDetails',[ '$scope', function($scope) {
    $scope.fullname = window.localStorage.getItem("fullname");
    $scope.lsa_reqs = window.localStorage.getItem("lsa_reqs").split(",");
    $scope.college_wide_reqs = window.localStorage.getItem("college_wide_reqs").split(",");
    $scope.area_distribution = window.localStorage.getItem("area_distribution").split(",");
    $scope.cs_reqs = window.localStorage.getItem("cs_reqs").split(",");

    console.log("Full name:", $scope.fullname);
    console.log("LSA Reqs:", $scope.lsa_reqs);
    console.log("College-wide Reqs:", $scope.college_wide_reqs);
    console.log("Area Distribution:", $scope.area_distribution);
    console.log("CS Reqs:", $scope.cs_reqs);

    $("#total-credits").text($scope.lsa_reqs[2]);
}]);