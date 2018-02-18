Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var test_path = "../views/result.php";
var survey_string = "sur3";
var data_string = "";

var interval = 500;
var beep_length = 50.25;

var intrvlsFast = [];
var intrvlsSlow = [];

var storedSteady = [];
var storedFast = [];
var storedSlow = [];

var storedSurvey1 = [];
var storedSurvey2 = [];
var storedSurvey3 = [];

var storedSteadyStart = 0;
var storedFastStart = 0;
var storedSlowStart = 0;

var storedSteadyOffset = 0;
var storedFastOffset = 0;
var storedSlowOffset = 0;

var trueSteady = [];
var trueFast = [];
var trueSlow = [];

var errorASteady = [];
var errorAFast = [];
var errorASlow = [];

var errorRSteady = [];
var errorRFast = [];
var errorRSlow = [];

var json = {
    pages: [
     {
      elements: [
       {
        type: "radiogroup",
        choices: [
         {
          value: "count1",
          text: "Yes"
         },
         {
          value: "count2",
          text: "No"
         }
        ],
        isRequired: true,
        name: "counting",
        title: "Have you been counting during the tests?"
       }
      ],
      name: "page1",
     }
    ]
   };

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        localStorage.setItem(survey_string, JSON.stringify(result.data));
        finalize();
        redirect();
    });

function onAngularComponentInit() {
    Survey
        .SurveyNG
        .render("surveyElement", {model: survey});
}

var HelloApp = ng
    .core
    .Component({selector: 'ng-app', template: '<div id="surveyContainer" class="survey-container contentcontainer codecontainer"><div id="surveyElement"></div></div> '})
    .Class({
        constructor: function () {},
        ngOnInit: function () {
            onAngularComponentInit();
        }
    });
document.addEventListener('DOMContentLoaded', function () {
    ng
        .platformBrowserDynamic
        .bootstrap(HelloApp);
});

function finalize() {
   readMem();
   TrueTimes();
   ErrorA();
   Intervals()
   ErrorR();
   createDataString();
   storeDataToCookie();
   storeRelativeError();
}

function readMem() {
    storedSteady = JSON.parse(localStorage.getItem("steady"));
    storedFast = JSON.parse(localStorage.getItem("fast"));
    storedSlow = JSON.parse(localStorage.getItem("slow"));

    storedSurvey1 = JSON.parse(localStorage.getItem("sur1"));
    storedSurvey2 = JSON.parse(localStorage.getItem("sur2"));
    storedSurvey3 = JSON.parse(localStorage.getItem("sur3"));

    storedSteadyStart = JSON.parse(localStorage.getItem("steadyStart"));
    storedFastStart = JSON.parse(localStorage.getItem("fastStart"));
    storedSlowStart = JSON.parse(localStorage.getItem("slowStart"));
}

function Intervals() {
    var intrvlsFastAll = [];   
    var intrvlsSlowAll = [];

    for (i = 0; i < 52; i++) {
        intrvlsFastAll.push(interval - (i * 5));
        intrvlsSlowAll.push(interval + (i * 5));
    }
    for (i = 12; i <= 52; i++){
        intrvlsFast.push(intrvlsFastAll[i]);
        intrvlsSlow.push(intrvlsSlowAll[i]);
        }
}

function TrueSteady() {
    var trueSteadyAll = [];
    var mem = storedSteadyStart;
    var intrvl = interval;
    for (i = 0; i < 52; i++) {
        trueSteadyAll.push(Math.round(mem));
        mem = mem + intrvl + beep_length;
    }
    for (i = 12; i <= 52; i++){
        trueSteady.push(trueSteadyAll[i]);
    }
}

function TrueFast() {
    var trueFastAll = [];
    var mem = storedFastStart;
    var intrvl = interval;
    for (i = 0; i < 52; i++) {
        trueFastAll.push(Math.round(mem));
        mem = mem + intrvl + beep_length;
        intrvl = intrvl - 5;
    }
    for (i = 12; i <= 52; i++){
        trueFast.push(trueFastAll[i]);
    }
}

function TrueSlow() {
    var trueSlowAll = [];
    var mem = storedSlowStart;
    var intrvl = interval;
    for (i = 0; i < 52; i++) {
        trueSlowAll.push(Math.round(mem));
        mem = mem + intrvl + beep_length;
        intrvl = intrvl + 5;
    }
    for (i = 12; i <= 52; i++){
        trueSlow.push(trueSlowAll[i]);
    }
}

function TrueTimes() {
    TrueSteady();
    TrueFast();
    TrueSlow();
}

function ErrorA() {
    for (i = 0; i < storedSteady.length; i++) {
        errorASteady.push(storedSteady[i] - trueSteady[i]);
        errorAFast.push(storedFast[i] - trueFast[i]);
        errorASlow.push(storedSlow[i] - trueSlow[i]);
    }
}


function ErrorR() {
    for (i = 0; i < errorASteady.length; i++) {
        errorRSteady.push(Math.round((errorASteady[i] / interval)*100));
        if (i == 0) {
            errorRFast.push(Math.round((errorAFast[i] / (intrvlsFast[i] - 5))*100));
            errorRSlow.push(Math.round((errorASlow[i] / (intrvlsSlow[i] + 5))*100));
        }
        else {
            errorRFast.push(Math.round((errorAFast[i] / intrvlsFast[i-1])*100));
            errorRSlow.push(Math.round((errorASlow[i] / intrvlsSlow[i-1])*100));
        }
    }
}

function createDataString() {
    data_string = errorASteady.toString() + "," + storedSurvey1.sex + "," + storedSurvey1.age 
                + "," + errorAFast.toString() + "," + storedSurvey2.instrument + "," 
                + storedSurvey2.education + "," + errorASlow.toString() + "," 
                + storedSurvey3.counting;
}

function storeDataToCookie() {
    if (localStorage.getItem("tempo_already") === null) {
    document.cookie = "test_data="+ data_string +"; expires=Thu, 4 Dec 2070 12:00:00 UTC; path=../";
    localStorage.setItem("tempo_already", "yes");
    }
    else {
        document.cookie = "test_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
}

function storeRelativeError() {
    localStorage.setItem("steadyErr", JSON.stringify(errorRSteady));
    localStorage.setItem("fastErr", JSON.stringify(errorRFast));
    localStorage.setItem("slowErr", JSON.stringify(errorRSlow));
}

function redirect() {
    window.location = test_path;
}

