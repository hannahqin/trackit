var app = angular.module('trackit', [])

app.controller('overview',[ '$scope', function($scope) {
    // Retrieve checklist info
    var fullname = window.localStorage.getItem("fullname");
    var totalcredits = window.localStorage.getItem("totalcredits");
    var college_wide_reqs = JSON.parse(window.localStorage.getItem("college_wide_reqs"));
    var area_distribution = JSON.parse(window.localStorage.getItem("area_distribution"));
    var cs_reqs = JSON.parse(window.localStorage.getItem("cs_reqs"));

    // debugger;

    console.log("Full name:", fullname);
    console.log("Total credits:", totalcredits);
    console.log("College-wide Reqs:", college_wide_reqs);
    console.log("Area Distribution:", area_distribution);
    console.log("CS Reqs:", cs_reqs);


    var firstname = window.localStorage.getItem("fullname");
    firstname = firstname.substr(0, firstname.indexOf(' '));
    $scope.name = firstname;
    $scope.data = window.localStorage.getItem("lsa_reqs").split(",");
    $scope.total_credits = parseInt(window.localStorage.getItem("totalcredits"));
    if (($scope.total_credits / 120) > 1) {
        $scope.percentage = "100%";
    } else {
        $scope.percentage = (($scope.total_credits / 120) * 100).toFixed(2).toString() + "%";
    }

    //core courses
    var stats = false;
    if(cs_reqs["probability"].length > 0) {
        stats = true;
    }
    var e281 = false;
    var e370 = false;
    var e376 = false;

    var cores = cs_reqs["core"].length;
    for(var i = 0; i < cores; ++i) {
        if(cs_reqs["core"][i].course == "EECS 281") {
            e281 = true;
        } else if(cs_reqs["core"][i].course == "EECS 370") {
            e370 = true;
        } else if(cs_reqs["core"][i].course == "EECS 376") {
            e376 = true;
        }
    }

    if(stats === true) {
        $('#sq1')[0].style.backgroundColor = "#4A90E2";
        $('#sq1')[0].style.color = "#FFFFFF";
    }

    if(e281 === true) {
        $('#sq2')[0].style.backgroundColor = "#4A90E2";
        $('#sq2')[0].style.color = "#FFFFFF";
    }

    if(e370 === true) {
        $('#sq3')[0].style.backgroundColor = "#4A90E2";
        $('#sq3')[0].style.color = "#FFFFFF";
    }

    if(e376 == true) {
        $('#sq4')[0].style.backgroundColor = "#4A90E2";
        $('#sq4')[0].style.color = "#FFFFFF";
    }

    if(cores == 3 && stats) {
        $('#coreComplete')[0].style.display = "inline-block";
    }

    //ULCS
    $scope.ulcs1 = "";
    $scope.ulcs2 = "";
    $scope.ulcs3 = "";
    $scope.ulcs4 = "";
    var uppers = cs_reqs["ul"].length;
    if(uppers > 0) {
        for(var i = 0; i < uppers; ++i) {
            if(i == 0) {
                $scope.ulcs1 = cs_reqs["ul"][i].course;
                $('#ulcs1')[0].style.backgroundColor = "#4A90E2";
                $('#ulcs1')[0].style.color = "#FFFFFF";
            }

            if(i == 1) {
                $scope.ulcs2 = cs_reqs["ul"][i].course;
                $('#ulcs2')[0].style.backgroundColor = "#4A90E2";
                $('#ulcs2')[0].style.color = "#FFFFFF";
            }

            if(i == 2) {
                $scope.ulcs3 = cs_reqs["ul"][i].course;
                $('#ulcs3')[0].style.backgroundColor = "#4A90E2";
                $('#ulcs3')[0].style.color = "#FFFFFF";
            }

            if(i == 3) {
                $scope.ulcs4 = cs_reqs["ul"][i].course;
                $('#ulcs4')[0].style.backgroundColor = "#4A90E2";
                $('#ulcs4')[0].style.color = "#FFFFFF";
            }
        }
    }

    var capstone = "Capstone"
    if(cs_reqs["capstone"].length > 0) {
        capstone = cs_reqs["capstone"][0].course + " (Capstone)";
        $('#capstn')[0].style.backgroundColor = "#4A90E2";
        $('#capstn')[0].style.color = "#FFFFFF";
    }

    if(cs_reqs["capstone"].length + uppers == 5) {
        $('#ulcsComplete').show();
    }

    $scope.capstone = capstone;

}]);