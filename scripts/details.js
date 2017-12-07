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
        $scope.incompleteCollegeWide.push(details);
    }


    // ---- AREA DISTRIBUTION ---- //

    if ($scope.area_distribution["7HU"].length > 0) {
        var allHU = [];
        var creditsHU = 0;
        for (i = 0; i < $scope.area_distribution["7HU"].length; ++i) {
            allHU.push($scope.area_distribution["7HU"][i]["course"]);
            creditsHU += parseFloat($scope.area_distribution["7HU"][i]["credits"]);
        }
        $scope.HU = allHU.join(", ");
        $scope.HU_creds = creditsHU;
    }

    if ($scope.area_distribution["7NS"].length > 0) {
        var allNS = [];
        var creditsNS = 0;
        for (i = 0; i < $scope.area_distribution["7NS"].length; ++i) {
            allNS.push($scope.area_distribution["7NS"][i]["course"]);
            creditsNS += parseFloat($scope.area_distribution["7NS"][i]["credits"]);
        }
        $scope.NS = allNS.join(", ");
        $scope.NS_creds = creditsNS;
    }
    
    if ($scope.area_distribution["7SS"].length > 0) {
        var allSS = [];
        var creditsSS = 0;
        for (i = 0; i < $scope.area_distribution["7SS"].length; ++i) {
            allSS.push($scope.area_distribution["7SS"][i]["course"]);
            creditsSS += parseFloat($scope.area_distribution["7SS"][i]["credits"]);
        }
        $scope.SS = allSS.join(", ");
        $scope.SS_creds = creditsSS;
    }

    var addtnl = 0;
    if ($scope.area_distribution["3HU"].length > 0) {
        var allHU = [];
        var creditsHU = 0;
        for (i = 0; i < $scope.area_distribution["3HU"].length; ++i) {
            allHU.push($scope.area_distribution["3HU"][i]["course"]);
            creditsHU += parseFloat($scope.area_distribution["3HU"][i]["credits"]);
        }
        if (addtnl == 0) {
            $scope.category1 = "(HU)";
            $scope.addtnl1 = allHU.join(", ");
            $scope.addtnl1_creds = creditsHU;
        } else if (addtnl == 1) {
            $scope.category2 = "(HU)";
            $scope.addtnl2 = allHU.join(", ");
            $scope.addtnl2_creds = creditsHU;
        } else {
            $scope.category3 = "(HU)";
            $scope.addtnl3 = allHU.join(", ");
            $scope.addtnl3_creds = creditsHU;
        }
        addtnl += 1;
    }

    if ($scope.area_distribution["3NS"].length > 0) {
        var allNS = [];
        var creditsNS = 0;
        for (i = 0; i < $scope.area_distribution["3NS"].length; ++i) {
            allNS.push($scope.area_distribution["3NS"][i]["course"]);
            creditsNS += parseFloat($scope.area_distribution["3NS"][i]["credits"]);
        }
        if (addtnl == 0) {
            $scope.category1 = "(NS)";
            $scope.addtnl1 = allNS.join(", ");
            $scope.addtnl1_creds = creditsNS;
        } else if (addtnl == 1) {
            $scope.category2 = "(NS)";
            $scope.addtnl2 = allNS.join(", ");
            $scope.addtnl2_creds = creditsNS;
        } else {
            $scope.category3 = "(NS)";
            $scope.addtnl3 = allNS.join(", ");
            $scope.addtnl3_creds = creditsNS;
        }
        addtnl += 1;
    }

    if ($scope.area_distribution["3SS"].length > 0) {
        var allSS = [];
        var creditsSS = 0;
        for (i = 0; i < $scope.area_distribution["3SS"].length; ++i) {
            allSS.push($scope.area_distribution["3SS"][i]["course"]);
            creditsSS += parseFloat($scope.area_distribution["3SS"][i]["credits"]);
        }
        if (addtnl == 0) {
            $scope.category1 = "(SS)";
            $scope.addtnl1 = allSS.join(", ");
            $scope.addtnl1_creds = creditsSS;
        } else if (addtnl == 1) {
            $scope.category2 = "(SS)";
            $scope.addtnl2 = allSS.join(", ");
            $scope.addtnl2_creds = creditsSS;
        } else {
            $scope.category3 = "(SS)";
            $scope.addtnl3 = allSS.join(", ");
            $scope.addtnl3_creds = creditsSS;
        }
        addtnl += 1;
    }

    if ($scope.area_distribution["3ID"].length > 0) {
        var allID = [];
        var creditsID = 0;
        for (i = 0; i < $scope.area_distribution["3ID"].length; ++i) {
            allID.push($scope.area_distribution["3ID"][i]["course"]);
            creditsID += parseFloat($scope.area_distribution["3ID"][i]["credits"]);
        }
        if (addtnl == 0) {
            $scope.category1 = "(ID)";
            $scope.addtnl1 = allID.join(", ");
            $scope.addtnl1_creds = creditsID;
        } else if (addtnl == 1) {
            $scope.category2 = "(ID)";
            $scope.addtnl2 = allID.join(", ");
            $scope.addtnl2_creds = creditsID;
        } else {
            $scope.category3 = "(ID)";
            $scope.addtnl3 = allID.join(", ");
            $scope.addtnl3_creds = creditsID;
        }
        addtnl += 1;
    }

    if ($scope.area_distribution["3CE"].length > 0) {
        var allCE = [];
        var creditsCE = 0;
        for (i = 0; i < $scope.area_distribution["3CE"].length; ++i) {
            allCE.push($scope.area_distribution["3CE"][i]["course"]);
            creditsCE += parseFloat($scope.area_distribution["3CE"][i]["credits"]);
        }
        if (addtnl == 0) {
            $scope.category1 = "(CE)";
            $scope.addtnl1 = allCE.join(", ");
            $scope.addtnl1_creds = creditsCE;
        } else if (addtnl == 1) {
            $scope.category2 = "(CE)";
            $scope.addtnl2 = allCE.join(", ");
            $scope.addtnl2_creds = creditsCE;
        } else {
            $scope.category3 = "(CE)";
            $scope.addtnl3 = allCE.join(", ");
            $scope.addtnl3_creds = creditsCE;
        }
        addtnl += 1;
    }

    if ($scope.area_distribution["3MATH"].length > 0) {
        var allMATH = [];
        var creditsMATH = 0;
        for (i = 0; i < $scope.area_distribution["3MATH"].length; ++i) {
            allMATH.push($scope.area_distribution["3MATH"][i]["course"]);
            creditsMATH += parseFloat($scope.area_distribution["3MATH"][i]["credits"]);
        }
        if (addtnl == 0) {
            $scope.category1 = "(MATH)";
            $scope.addtnl1 = allMATH.join(", ");
            $scope.addtnl1_creds = creditsMATH;
        } else if (addtnl == 1) {
            $scope.category2 = "(MATH)";
            $scope.addtnl2 = allMATH.join(", ");
            $scope.addtnl2_creds = creditsMATH;
        } else {
            $scope.category3 = "(MATH)";
            $scope.addtnl3 = allMATH.join(", ");
            $scope.addtnl3_creds = creditsMATH;
        }
        addtnl += 1;
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