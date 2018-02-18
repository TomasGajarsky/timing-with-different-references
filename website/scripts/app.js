var app = angular.module("angularApp", []);

var h = 0;
var metronome_length = 0;
var prepare_length = 0;
var offset = 0;
var times_string = "";
var start_string = "";
var offset_string = "";
var survey_path = "";

var start_time = 0;
var times = [];


var storedSteady = [];
var storedSurvey = [];
var storedSteadyStart = 0;

var steady_length = 17608;
var fast_length = 15128;
var slow_length = 20088;

function onLoad() {
    var pathArray = window.location.pathname.split( '/' );
    lenPath = pathArray.length;

    switch(pathArray[lenPath-1]) {
        case "steady.html":
            start_time = new Date().getTime();
            document.getElementById("steadyAudio").play();
            metronome_length = 6603;
            prepare_length = metronome_length - 250;
            times_string = "steady";
            start_string = "steadyStart";
            offset_string = "steadyOff";
            survey_path = "../views/survey1.html";
            setTimeout(showInst, steady_length/8-200);
            break;

        case "fast.html":
            start_time = new Date().getTime();
            document.getElementById("fastAudio").play();
            metronome_length = 6273;
            prepare_length = metronome_length - 190;
            times_string = "fast";
            start_string = "fastStart";
            offset_string = "fastOff";
            survey_path = "../views/survey2.html";
            setTimeout(showInst, fast_length/8-160);
            break;

        case "slow.html":
            start_time = new Date().getTime();
            document.getElementById("slowAudio").play();
            metronome_length = 6933;
            prepare_length = metronome_length - 290;
            times_string = "slow";
            start_string = "slowStart";
            offset_string = "slowOff";
            survey_path = "../views/survey3.html";
            setTimeout(showInst, slow_length/8-240);
            break;
    }
}

function onLoad2() {
     drawSteadyChart();
     releaseLocalStorage();
}

function showInst() {
    document.getElementById("instruct").innerHTML = "Tap Now!";
}

function trackTaps() {
    current_time = new Date().getTime();

    if (times.length < 40 && current_time > start_time + prepare_length) {
        times.push(current_time);

        if (times.length >= 40) {
            document.getElementById("instruct").innerHTML = "Stop tapping";
            storeTimes();
            setTimeout(redirect, 1000);
        }
    }
}

function storeTimes() {
    localStorage.setItem(times_string, JSON.stringify(times));
    localStorage.setItem(start_string, JSON.stringify(start_time));
    localStorage.setItem(offset_string, JSON.stringify(offset));
}

function redirect() {
    window.location=survey_path;
 }

 function drawSteadyChart() {
    var xAxis = [];
    for (i = 1; i <= 40; i++){
        xAxis.push(i);
    }
    var steadyData = JSON.parse(localStorage.getItem("steadyErr"));
    var fastData = JSON.parse(localStorage.getItem("fastErr"));
    var slowData = JSON.parse(localStorage.getItem("slowErr"));

    var ctx = document.getElementById("mySteadyChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: 'Isochronous',
                data: steadyData,
                backgroundColor: [
                    'rgba(0, 0, 0, 0)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Going faster',
                data: fastData,
                backgroundColor: [
                    'rgba(0, 0, 0, 0)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Going slower',
                data: slowData,
                backgroundColor: [
                    'rgba(0, 0, 0, 0)'
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        callback: function(value, index, values) {
                            return value + '%';
                        }
                    }
                }]
            }
        }
    });
 }

 function releaseLocalStorage() {
    localStorage.removeItem("steady");
    localStorage.removeItem("fast");
    localStorage.removeItem("slow");

    localStorage.removeItem("sur1");
    localStorage.removeItem("sur2");
    localStorage.removeItem("sur3");

    localStorage.removeItem("steadyStart");
    localStorage.removeItem("fastStart");
    localStorage.removeItem("slowStart");

    localStorage.removeItem("steadyErr");
    localStorage.removeItem("fastErr");
    localStorage.removeItem("slowErr");
 }
