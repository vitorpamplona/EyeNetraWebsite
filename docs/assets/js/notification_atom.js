$.notify.addStyle('happyblue', {
    html: "<div> <i class='fa fa-map-marker' aria-hidden='true'></i> <span data-notify-text/> </div>",
    classes: {
        base: {
        "white-space": "nowrap",
        "background-color": "lightblue",
        "padding": "10px 15px"
        },
        superblue: {
        "color": "#1b86b8",
        "background-color": "white"
        }
    }
    }
);

testCount=0;
lastCity="";
lastCountry="";

function processExamTotal(json) {
    // Initial load. Do not show notification.
    if (testCount == 0) {
        testCount = json.testCount;
    }

    if (json.testCount > testCount) {
        // New exam available, show it.
        testCount = json.testCount;
        lastCity= json.lastCity;
        lastCountry= json.lastCountry;

        if (json.lastCountry != "Unknown")
            $.notify("New eye exam from " + lastCity + ", " + lastCountry + "!", {
                style: 'happyblue',
                className: 'superblue'
            });
        else
            $.notify("New eye exam from an undisclosed location!",
                {
                style: 'happyblue',
                className: 'superblue'
                }
            );
    }
}

function loadLastExam()
{
    $.ajax({
        url: "https://debug.eyenetra.com/testCount.json?jsonp=processExamTotal",
        type: "GET",
        dataType: "jsonp",
        crossDomain:true,
        jsonpCallback: 'processExamTotal',
        error: function () {
            console.log("Cannot access debug server.");
        }
    });
}
setInterval( loadLastExam, 2000 );