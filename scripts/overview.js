$(document).ready(function() {

    // Retrieve checklist info
    var fullname = window.localStorage.getItem("fullname");
    var lsa_reqs = window.localStorage.getItem("lsa_reqs").split(",");
    var college_wide_reqs = window.localStorage.getItem("college_wide_reqs").split(",");
    var area_distribution = window.localStorage.getItem("area_distribution").split(",");
    var cs_reqs = window.localStorage.getItem("cs_reqs").split(",");

    console.log("Full name:", fullname);
    console.log("LSA Reqs:", lsa_reqs);
    console.log("College-wide Reqs:", college_wide_reqs);
    console.log("Area Distribution:", area_distribution);
    console.log("CS Reqs:", cs_reqs);

    $("#total-credits").text(lsa_reqs[2]);

});

var app = angular.module('trackit', [])

app.controller('overview',[ '$scope', function($scope) {
    $scope.name = window.localStorage.getItem("fullname");
    $scope.data = window.localStorage.getItem("lsa_reqs").split(",");
    $scope.total_credits = parseInt($scope.data[2]);
    if (($scope.total_credits / 120) > 1) {
        $scope.percentage = "100%"
    } else {
        $scope.percentage = (($scope.total_credits / 120) * 100).toFixed(2).toString() + "%";
    }



}]);