Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var test_path = "../views/fast.html";
var survey_string = "sur1";

var json = {
    pages: [
     {
      elements: [
       {
        type: "radiogroup",
        isRequired: true,
        choices: [
         {
          value: "sex1",
          text: "Female"
         },
         {
          value: "sex2",
          text: "Male"
         }
        ],
        name: "sex",
        title: "What is your gender?"
       },
       {
        type: "radiogroup",
        isRequired: true,
        choices: [
         {
          value: "age1",
          text: "under 12 years old"
         },
         {
          value: "age2",
          text: "12 - 17 years old"
         },
         {
          value: "age3",
          text: "18 - 24 years old"
         },
         {
          value: "age4",
          text: "25 - 34 years old"
         },
         {
          value: "age5",
          text: "35 - 44 years old"
         },
         {
          value: "age6",
          text: "45 - 54 years old"
         },
         {
          value: "age7",
          text: "55 - 64 years old"
         },
         {
          value: "age8",
          text: "65 - 74 years old"
         },
         {
          value: "age9",
          text: "more than 75 years old"
         }
        ],
        name: "age",
        title: "What is your age?"
       }
      ],
      name: "page1",
      width: "6"
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