$(document).ready(function() {

    // Retrieve checklist info
    var lsa_reqs = window.localStorage.getItem("lsa_reqs").split(",");
    var college_wide_reqs = window.localStorage.getItem("college_wide_reqs").split(",");
    var area_distribution = window.localStorage.getItem("area_distribution").split(",");
    var cs_reqs = window.localStorage.getItem("cs_reqs").split(",");

    console.log("LSA Reqs:", lsa_reqs);
    console.log("College-wide Reqs:", college_wide_reqs);
    console.log("Area Distribution:", area_distribution);
    console.log("CS Reqs:", cs_reqs);

    $("#total-credits").text(lsa_reqs[2]);
});