/*
 * Referenced http://ourcodeworld.com/articles/read/405/how-to-convert-pdf-to-text-extract-text-from-pdf-with-javascript
 */

// The workerSrc property shall be specified.
PDFJS.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.169/pdf.worker.min.js';

$(document).ready(function() {
    var fileInput = document.getElementById('file-input');

    // TODO: Error checking (correct pdf)
    $(".generate-button").click(function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {

            PDFJS.getDocument(reader.result).then(function (pdf) {
                var pdfDocument = pdf;
                var pagesPromises = [];

                for (var i = 0; i < pdf.pdfInfo.numPages; i++) {
                    // Required to prevent that i is always the total of pages
                    (function (pageNumber) {
                        pagesPromises.push(getPageText(pageNumber, pdfDocument));
                    })(i + 1);
                }

                Promise.all(pagesPromises).then(function (pagesText) {
                    
                    var whole = pagesText.join("<br>");
                    var split = whole.split("<br>");
                    
                    var indices = [];
                    var lsa_reqs;
                    var college_wide_reqs;
                    var area_distribution;
                    var cs_reqs;

                    for (var i = 0; i < split.length; ++i) {
                        if (split[i].includes("REQUIREMENTS") || split[i].includes("AREA DISTRIBUTION") || split[i].includes("COMPUTER SCIENCE PREREQUISITES")
                            || split[i].includes("COMPUTER SCIENCE TOTAL CREDITS")){
                            indices.push(i);
                        }
                    }
                    
                    // Remove leading and trailing whitespace
                    lsa_reqs = split.slice(indices[0], indices[1]).map(s => s.trim());
                    college_wide_reqs = split.slice(indices[3], indices[4]).map(s => s.trim());
                    area_distribution = split.slice(indices[4], indices[5]).map(s => s.trim());
                    cs_reqs = split.slice(indices[6], indices[7]).map(s => s.trim());

                    // Convert to the format of a dict of arrays of dicts...
                    // Only grab total credits from lsa_reqs
                    var college_wide_reqs_dict = getDictFormCollege(college_wide_reqs);
                    var area_distribution_dict = getDictFormArea(area_distribution);
                    var cs_reqs_dict = getDictFormCS(cs_reqs);

                    // Save requirements to local storage
                    window.localStorage.setItem("fullname", split[2].trim());
                    window.localStorage.setItem("totalcredits", lsa_reqs[2]);
                    window.localStorage.setItem("college_wide_reqs", JSON.stringify(college_wide_reqs_dict));
                    window.localStorage.setItem("area_distribution", JSON.stringify(area_distribution_dict));
                    window.localStorage.setItem("cs_reqs", JSON.stringify(cs_reqs_dict));

                    console.log("LSA Reqs:", lsa_reqs);
                    console.log("College-wide Reqs:",college_wide_reqs);
                    console.log("Area Distribution:", area_distribution);
                    console.log("CS Reqs:", cs_reqs);

                    console.log("fullname", split[2].trim());
                    console.log("totalcredits", lsa_reqs[2]);
                    console.log("College-wide Reqs Dict:",college_wide_reqs_dict);
                    console.log("Area Distribution Dict:", area_distribution_dict);
                    console.log("CS Reqs Dict:", cs_reqs_dict);
                });

                // Change windows upon successful PDF parsing
                window.setTimeout(function() {
                    window.location.href = './overview.html';
                }, 1000);

            }, function (reason) {
                // PDF loading error
                console.error(reason);
            });
        }

        reader.readAsArrayBuffer(file);
    });

});


/**
 * Retrieves the text of a specif page within a PDF Document obtained through pdf.js 
 * 
 * @param {Integer} pageNum Specifies the number of the page 
 * @param {PDFDocument} PDFDocumentInstance The PDF document obtained 
 **/
function getPageText(pageNum, PDFDocumentInstance) {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise(function (resolve, reject) {
        PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
            // The main trick to obtain the text of the PDF page, use the getTextContent method
            pdfPage.getTextContent().then(function (textContent) {
                var textItems = textContent.items;
                var finalString = "";

                // Concatenate the string of the item to the final string
                for (var i = 0; i < textItems.length; i++) {
                    var item = textItems[i];

                    finalString += item.str + "<br>";

                }
                // Solve promise with the text retrieven from the page
                resolve(finalString);
            });
        });
    });
}

function getDictFormCollege(college_wide_reqs) {
    // Initialize dict
    var dict = {};
    var category = ["FYWR", "ULWR", "RE", "QR", "LANG"];
    var k = 0;
    for (i = 0; i < category.length; ++i) {
        dict[category[i]] = [];
    }

    // Add class information to all category dicts
    for (k = 0, i = 0; i < college_wide_reqs.length; ++i) {
        if (college_wide_reqs[i].indexOf("Upper Level Writing Requirement - one course required - C- or") >= 0 ||
            college_wide_reqs[i].indexOf("Race and Ethnicity Requirement - one course required") >= 0 ||
            college_wide_reqs[i].indexOf("Quantitative Reasoning Requirement - 1 QR1 or 2 QR2 courses") >= 0 ||
            college_wide_reqs[i].indexOf("Language Requirement - one 4th term course required - C- or") >= 0) {
                k += 1;
        }
        if (isClass(college_wide_reqs, i)) {
            dict[category[k]].push(getClassDict(college_wide_reqs, i));
        }
    }

    return dict;
}

function getDictFormArea(area_distribution) {
    // Initialize dict
    var dict = {};
    var category = ["7HU", "7NS", "7SS", "3HU", "3NS", "3SS", "3MATH", "3ID", "3CE"];
    var k = 0;
    for (i = 0; i < category.length; ++i) {
        dict[category[i]] = [];
    }

    // Add class information to all category dicts
    for (k = 0, i = 0; i < area_distribution.length; ++i) {
        if (area_distribution[i].indexOf("7 Credits in Natural Sciences") >= 0 ||
            area_distribution[i].indexOf("7 Credits in Social Sciences") >= 0) {
            k += 1;
        }
        if (area_distribution[i].indexOf("3 Additional Credits in Humanities") >= 0) {
            k = 3;
        } else if (area_distribution[i].indexOf("3 Additional Credits in Social Sciences") >= 0) {
            k = 4;
        } else if (area_distribution[i].indexOf("3 Additional Credits in Natural Sciences") >= 0) {
            k = 5;
        } else if (area_distribution[i].indexOf("3 Credits in Mathematical and Symbolic Analysis") >= 0) {
            k = 6;
        } else if (area_distribution[i].indexOf("3 Credits in Interdisciplinary") >= 0) {
            k = 7;
        } else if (area_distribution[i].indexOf("3 Additional Creative Expression") >= 0) {
            k = 8;
        }
        if (isClass(area_distribution, i)) {
            dict[category[k]].push(getClassDict(area_distribution, i));
        }
    }

    return dict;
}

function getDictFormCS(cs_reqs) {
    // Initialize dict
    var dict = {};
    var category = ["core", "probability", "capstone", "ul"];
    var k = 0;
    for (i = 0; i < category.length; ++i) {
        dict[category[i]] = [];
    }

    // Add class information to all category dicts
    for (k = 0, i = 0; i < cs_reqs.length; ++i) {
        if (cs_reqs[i].indexOf("Probability and Statistics: IOE 265, STATS 250 (Fall 2010 or later)") >= 0 ||
            cs_reqs[i].indexOf("Capstone Course - minimum 1 course - C or better per course") >= 0 ||
            cs_reqs[i].indexOf("Technical Electives for Computer Science") >= 0) {
            k += 1;
        }
        if (isClass(cs_reqs, i)) {
            dict[category[k]].push(getClassDict(cs_reqs, i));
        }
    }

    return dict;
}

function isClass(reqArray, index) {
    return reqArray[i].indexOf("FA ") >= 0 ||
        reqArray[i].indexOf("WN ") >= 0 ||
        reqArray[i].indexOf("SP ") >= 0 ||
        reqArray[i].indexOf("SU ") >= 0;
}

function getClassDict(reqArray, index) {
    var classInfo = {};
    classInfo['sem'] = reqArray[index];
    classInfo['course'] = reqArray[index+1] + " " + reqArray[index+2];
    classInfo['desc'] = reqArray[index+3];
    // Avoid edge case where the desc takes up two indices
    if (isNaN(reqArray[index+4])) {
        index +=1;
    }
    classInfo['credits'] = reqArray[index+4];
    classInfo['grade'] = reqArray[index+5];
    console.log("classInfo:", classInfo);
    return classInfo;
}
