<!doctype html>
<?php
$cookie_name = "test_data";
if(isset($_COOKIE[$cookie_name])) {
    $myfile = fopen("../data/data.txt", "a") or die("Unable to open file!");
    $txt = $_COOKIE[$cookie_name] . "\n";
    fwrite($myfile, $txt);
    fclose($myfile);
}
?>
<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
        <link href="../css/app.css" rel="stylesheet"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.js"></script>
        <script src="../scripts/app.js" type="application/javascript"></script>
        <script src="../scripts/MainController.js" type="application/javascript"></script>
    </head>

    <body onload="onLoad2()" ng-app="angularApp">
        <div ng-controller="MainController">
            <header class="container-fluid">
                <h1>Results</h1>
            </header>

            <div class="container-fluid">
                <div class="row">

                    
                    <section class="col-sm-12">

                        <div class="row">
                            <article>
                                <h2>Performance graph</h2>
                                    <div class="col-sm-12">
                                        <canvas id="mySteadyChart" width="1000" height="400"></canvas>
                                    </div>     
                            </article>

                            <article>
                                    <div class="col-sm-12">
                                        <p>The error is expressed relatively to the length of the intervals between metronome clicks. 200% would mean that you have been delayed 2 clicks and -100% would mean that you have been faster by 1 click.</p>
                                        <p>The first twenty values were taken while the metronome was on and the second twenty values while metronome was quiet.</p>
                                    </div>    
                            </article>

                            
                            <article>
                                <h2>Thank You!</h2>
                            </article>

                        </div>
                        
                        
                    </section>
                </div>
            </div>
                <footer class="container-fluid">
                    author: Tomas Gajarsky
                    <p>{{ timestamp }}</p>
                </footer>
        </div>
        
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    </body>
</html>
