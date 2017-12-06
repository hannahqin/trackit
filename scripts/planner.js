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
    $scope.collegeWideReqs = window.localStorage.getItem("college_wide_reqs");
    $scope.areaDistribution = window.localStorage.getItem("area_distribution");
    $scope.csReqs = window.localStorage.getItem("cs_reqs");

    console.log(JSON.stringify($scope.name));
    console.log($scope.collegeWideReqs);
    console.log($scope.areaDistribution);
    console.log($scope.csReqs);

    // if ($scope.college_wide_reqs["FYWR"].length < 1) {
    //     $scope.FYWR = "";
    // } else {
    //     $scope.FYWR = $scope.college_wide_reqs["FYWR"][0]["course"];
    // }

    // if ($scope.college_wide_reqs["ULWR"].length < 1) {
    //     $scope.ULWR = "";
    // } else {
    //     $scope.ULWR = $scope.college_wide_reqs["ULWR"][0]["course"];
    // }
    // //$scope.ULWR = "SAC 376";
    // $scope.QR = "";
    // $scope.RE = "";
    // $scope.language = "francais";
    // $scope.NS_creds = 3;
    // $scope.NS = "BIO 172, BIO 171, asdf, dsaf , asdf,a sdff,a dsf, ds, asd, asdf , adsf, afd, a,a dfs adfs,";
    // $scope.HU_creds = 0;
    // $scope.HU;
    // $scope.SS_creds;
    // $scope.SS
    // $scope.addtnl1_creds;
    // $scope.addtnl1;
    // $scope.addtnl2_creds;
    // $scope.addtnl2;
    // $scope.addtnl3_creds;
    // $scope.addtnl3;
    // $scope.ULCS_creds;
    // $scope.ULCS;
    // $scope.capstone;

}]);