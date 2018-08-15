var Game = function() {
    this.dots = [];

    this.addDot = function(dot) {
        this.dots.push(dot);
    };

    this.start = function() {
        var startIt = setInterval(
            function() {
                this.dots.forEach(function(dot) {
                    dot.move();
                });
            }.bind(this),
            // => perfect speed: 25
            250
        );
    };

    this.stop = function() {
        if (overlap === 0) {
            clearInterval(startIt);
        }
    };
};

var Dot = function(left = 1, top = 1, xRatio = 1, yRatio = 3.5) {
    this.left = left;
    this.top = top;

    this.selector = $('<div class="ball"></div>');
    $("#game").append(this.selector);

    this.changeTop = function() {
        this.top += yRatio;
    };

    this.changeLeft = function() {
        this.left += xRatio;
    };

    this.move = function() {
        var animate = true;
        if (this.top > 620) {
            this.changeTop = function() {
                this.top -= yRatio;
            };
        }
        if (this.top < 0) {
            this.changeTop = function() {
                this.top += yRatio;
            };
        }

        if (this.left > 620) {
            this.changeLeft = function() {
                this.left -= xRatio;
            };
        }

        if (this.left < 0) {
            this.changeLeft = function() {
                this.left += xRatio;
            };
        }

        // this.stopMoving = function() {
        //     this.left = dotCoordinates.dotX;
        //     this.top = dotCoordinates.dotY;
        // };

        this.changeLeft();
        this.changeTop();
        // console.log("SMALL DOT", {
        //     x: this.left - 5,
        //     y: this.top - 5
        // });
        this.selector.css({
            top: this.top + "px",
            left: this.left + "px"
        });
    };
};

var clickerBool = true;
var circleCoordinates;
var dotCoordinates;
var overlap;

$(document).ready(function() {
    var game = new Game();

    var b = new Dot();
    // var bTwo = new Dot(50, 100, 0.4, 2.1);
    // game.addDot(new Dot(36, 500, 0.5, 1.3));
    // game.addDot(new Dot(100, 500, 0.7, 4.3));
    // game.addDot(new Dot(100, 100, 0.6, 2.2));
    game.addDot(b);

    startIt = game.start();

    // If user clicks game area, make big explosive circle ("user-click") appear
    $("#game").click(function(event) {
        createClickCircle();
        animateCircle();

        setInterval(function() {
            circleCoordinates = getCircleCoordinates();
            dotCoordinates = getDotCoordinates(b);
            calculateIfOverlap();
            checkIfOverlap();
        }, 500);
    });
    game.stop();
});

function createClickCircle() {
    // append div into html, only if no clicker exists, yet!
    var clickerDiv = $('<div class="user-click"></div>');
    if (clickerBool === true) {
        // append div into html
        clickerDiv.css({
            // substract 10, because of the radius of the Circle!
            // TODO - Access width/height of css to make it dynamic!
            top: event.offsetY - 10 + "px",
            left: event.offsetX - 10 + "px"
        });
        $("#game").append(clickerDiv);
        // set clickerBool to false, to prevent further "user-clicks"
        clickerBool = false;
    }
    return (clickerBool = false);
}

function animateCircle() {
    // Animate clicker Circle to grow
    var clickerStyle = $(".user-click");
    setTimeout(function() {
        clickerStyle.toggleClass("grow");
    }, 20);
    setTimeout(function() {
        clickerStyle.toggleClass("grow");
    }, 8000);
    setTimeout(function() {
        clickerStyle.toggleClass("fade-out");
        // clickerStyle.remove();
    }, 10500);
}

function getCircleCoordinates() {
    // offsetWidth only returns defult values => use getBoundingClientRect
    circleCoordinates = document.getElementsByClassName("user-click")[0].getBoundingClientRect();
    // store coordinates of Circle in real-time
    var radius = circleCoordinates.width / 2;
    var absoluteX = circleCoordinates.left + radius;
    var absoluteY = circleCoordinates.top + radius;
    var circleCoordinates = {
        absoluteX: absoluteX,
        absoluteY: absoluteY,
        radius: radius
    };
    return circleCoordinates;
}

function getDotCoordinates(dot) {
    var dotX = dot.left - 5;
    var dotY = dot.top - 5;
    var radius = 5;
    var dotCoordinates = {
        dotX: dotX,
        dotY: dotY,
        radius: radius
    };
    return dotCoordinates;
}

// check if small ball and clicked circle overlap
// https://www.geeksforgeeks.org/check-two-given-circles-touch-intersect/

function calculateIfOverlap(x1, y1, x2, y2, r1, r2) {
    var distSq = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
    console.log("distSq " + distSq);
    // console.log("DistSq " + distSq);
    var radSumSq = (r1 + r2) * (r1 + r2);
    console.log("radSumSq " + radSumSq);
    // console.log("radSumSq: " + radSumSq);
    if (distSq === radSumSq) {
        return 1;
    } else if (distSq > radSumSq) {
        return -1;
    } else return 0;
}

function checkIfOverlap(circle, dot) {
    // check for overlapping circles
    var overlap = calculateIfOverlap(
        circleCoordinates.absoluteX,
        circleCoordinates.absoluteY,
        dotCoordinates.dotX,
        dotCoordinates.dotY,
        circleCoordinates.radius,
        dotCoordinates.radius
    );

    // console.log("Overlap " + overlap);
    if (overlap === 1) {
        console.log(overlap);
        console.log("Circles touch!");
    } else if (overlap < 0) {
        console.log(overlap);
        console.log("No touch, so far!");
    } else {
        console.log(overlap);
        console.log("Circles overlap!");
        console.log("STOP IT BITCH");
        // if overlap, clear interval for specific Dot!
        // var explodingDot = $(".ball");

        // setTimeout(function() {
        //     explodingDot.toggleClass("grow");
        // }, 20);
    }
}

// // All small dots are in the array game! console.log(game.dots);
// var gameBalls = game.balls;
// setInterval(function() {
//     gameBalls.forEach(function(ball) {});
// });
// // TODO if statement that lets setInterval only check for width, if clicker ball exists!!!!
// // if it exists, check for coordinates and check if small ball collides
// // if yes, then make small ball grow
// // check if other ball collides...
