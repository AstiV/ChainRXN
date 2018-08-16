var Game = function() {
    this.dots = [];

    this.addDot = function(dot) {
        this.dots.push(dot);
    };

    this.transformToCapture = function(index) {
        var removedArray = this.dots.splice(index, 1);
        removedArray.forEach(function(dot) {
            dot.selector.removeClass("ball");
            dot.selector.addClass("user-click");

            animateCircle(dot.selector);
        });
    };

    this.start = function() {
        var startIt = setInterval(
            function() {
                this.dots.forEach(
                    function(dot, index) {
                        if (dot.hit === false) {
                            dot.move();
                        } else {
                            this.transformToCapture(index);
                        }
                    }.bind(this)
                );

                // check if there are capturers left
                // if(!Array.from($('.user-click')).length)
            }.bind(this),
            // => perfect speed: 25
            100
        );
    };
};

var Dot = function(left = 1, top = 1, xRatio = 1, yRatio = 3.5) {
    this.left = left;
    this.top = top;
    this.hit = false;

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

        this.changeLeft();
        this.changeTop();

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
var clicked = false;

$(document).ready(function() {
    var game = new Game();

    game.addDot(new Dot());
    game.addDot(new Dot(36, 500, 0.5, 1.3));
    game.addDot(new Dot(100, 500, 0.7, 4.3));
    game.addDot(new Dot(100, 100, 0.6, 2.2));

    startIt = game.start();

    // If user clicks game area, make big explosive circle ("user-click") appear
    $("#game").click(function(event) {
        if (clicked) return;

        clicked = true;

        createClickCircle();
        animateCircle($(".user-click"));

        setInterval(function() {
            game.dots.forEach(function(dot) {
                checkIfOverlap(dot);
            });
        }, 50);
    });
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

function animateCircle(selector) {
    // Animate clicker Circle to grow

    setTimeout(function() {
        selector.toggleClass("grow");
    }, 20);

    setTimeout(function() {
        selector.toggleClass("grow");
    }, 8000);

    setTimeout(function() {
        selector.toggleClass("fade-out");
    }, 10500);

    setTimeout(function() {
        selector.remove();
    }, 12500);
}

function getCircleCoordinates(capturer) {
    // offsetWidth only returns defult values => use getBoundingClientRect
    circleCoordinates = capturer.getBoundingClientRect();
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
    // console.log("DistSq " + distSq);
    var radSumSq = (r1 + r2) * (r1 + r2);
    // console.log("radSumSq: " + radSumSq);
    if (distSq === radSumSq) {
        return 1;
    } else if (distSq > radSumSq) {
        return -1;
    } else return 0;
}

function checkIfOverlap(dot) {
    var dotCoordinates = getDotCoordinates(dot);

    Array.from($(".user-click")).forEach(function(capturer) {
        var circleCoordinates = getCircleCoordinates(capturer);

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
            // console.log(overlap);
            // console.log("Circles touch!");
        } else if (overlap < 0) {
            // console.log(overlap);
            // console.log("No touch, so far!");
        } else {
            // console.log(overlap);
            // console.log("Circles overlap!");
            dot.hit = true;
        }
    });
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
