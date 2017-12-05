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

                    console.log (indices);
                    
                    lsa_reqs = split.slice(indices[0], indices[1]);
                    college_wide_reqs = split.slice(indices[3], indices[4]);
                    area_distribution = split.slice(indices[4], indices[5]);
                    cs_reqs = split.slice(indices[6], indices[7]);

                    // Save requirements to local storage
                    window.localStorage.setItem("lsa_reqs", lsa_reqs);
                    window.localStorage.setItem("college_wide_reqs", college_wide_reqs);
                    window.localStorage.setItem("area_distribution", area_distribution);
                    window.localStorage.setItem("cs_reqs", cs_reqs);

                    console.log("LSA Reqs:", lsa_reqs);
                    console.log("College-wide Reqs:",college_wide_reqs);
                    console.log("Area Distribution:", area_distribution);
                    console.log("CS Reqs:", cs_reqs);
                });

                // Change windows upon successful PDF parsing
                window.setTimeout(function() {
                    window.location.href = './overview.html';
                }, 2000);

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