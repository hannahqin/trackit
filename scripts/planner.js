$(document).ready(function() {
    $('#add-course-modal').on('click', '#plus-req-btn', function() {
        $(this).before('<input class="req-input body-input" type="text" size="8" name="req-1" placeholder="SS">');
    });

    $('#cancel-add-course-btn').click(resetReqInputsOnModal);
    $('#approve-add-course-btn').click(resetReqInputsOnModal);
    $('#cancel-add-sem-btn').click();
    $('#approve-add-sem-btn').click(addSemester);
});

function resetReqInputsOnModal() {
    $('#add-course-modal .reqs-section').empty();
    $('#add-course-modal .reqs-section').append('<input class="req-input body-input" type="text" size="8" name="req-1" placeholder="SS">');
    $('#add-course-modal .reqs-section').append('<span id="plus-req-btn" class="glyphicon glyphicon-plus"></span>');
}

function addSemester() {
    $('.header-row').append('<th class="col-md-3">' + $('#add-sem-text').val() + '</th>');
}



var app = angular.module('trackit', []);
app.controller('planner',[ '$scope', function($scope) {
    $scope.name = window.localStorage.getItem("fullname");
    $scope.collegeWideReqs =JSON.parse(window.localStorage.getItem("college_wide_reqs"));
    $scope.areaDistribution = JSON.parse(window.localStorage.getItem("area_distribution"));
    $scope.csReqs = JSON.parse(window.localStorage.getItem("cs_reqs"));

    console.log(JSON.stringify($scope.name));
    console.log($scope.collegeWideReqs);
    console.log($scope.areaDistribution);
    console.log($scope.csReqs);

    var dict = {};
    for (var key in $scope.collegeWideReqs){
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
    for (var key in $scope.areaDistribution){
        for (var i in $scope.areaDistribution[key]) {
            var sem = $scope.areaDistribution[key][i].sem;
            if (dict[sem] === undefined) {
                dict[sem] = {};
            }
            if (dict[sem][$scope.areaDistribution[key][i].course] === undefined) {
                dict[sem][$scope.areaDistribution[key][i].course] = $scope.areaDistribution[key][i];
            }
        }
    }
    for (var key in $scope.csReqs){
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

    console.log(dict);


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