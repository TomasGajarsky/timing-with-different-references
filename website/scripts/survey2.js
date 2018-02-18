Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var test_path = "../views/slow.html";
var survey_string = "sur2";

var json = {
    pages: [
     {
      name: "page1",
      elements: [
       {
        type: "radiogroup",
        choices: [
         {
          value: "inst1",
          text: "No."
         },
         {
          value: "inst2",
          text: "Yes, from the group of percussion instruments."
         },
         {
          value: "inst3",
          text: "Yes, from the group of wind instruments."
         },
         {
          value: "inst4",
          text: "Yes, from the group of stringed instruments."
         },
         {
          value: "inst5",
          text: "Yes, from multiple instrument groups."
         }
        ],
        isRequired: true,
        name: "instrument",
        title: "Do you play any musical instruments?"
       },
       {
        type: "radiogroup",
        choices: [
         {
          value: "train1",
          text: "No."
         },
         {
          value: "train2",
          text: "Yes, less than 1 year."
         },
         {
          value: "train3",
          text: "Yes, from 1 to 3 years."
         },
         {
          value: "train4",
          text: "Yes, from 3 to 5 years."
         },
         {
          value: "train5",
          text: "Yes, more than 5 years."
         }
        ],
        isRequired: true,
        name: "education",
        title: "Do you have any formal musical training?",
        width: "6"
       }
      ],
     }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        localStorage.setItem(survey_string, JSON.stringify(result.data));
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

function redirect() {
    window.location = test_path;
}