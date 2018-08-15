var Game = function() {
    this.balls = [];

    this.addBall = function(ball) {
        this.balls.push(ball);
    };

    this.start = function() {
        setInterval(
            function() {
                this.balls.forEach(function(ball) {
                    ball.move();
                });
            }.bind(this),
            // => perfect speed: 25
            500
        );
    };
};

var Ball = function(left = 1, top = 1, xRatio = 1, yRatio = 3.5) {
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
        console.log("SMALL DOT", {
            x: this.left - 5,
            y: this.top - 5
        });
        this.selector.css({
            top: this.top + "px",
            left: this.left + "px"
        });
    };
};

$(document).ready(function() {
    var game = new Game();

    var b = new Ball();
    // var bTwo = new Ball(50, 100, 0.4, 2.1);
    // game.addBall(new Ball(36, 500, 0.5, 1.3));
    // game.addBall(new Ball(100, 500, 0.7, 4.3));
    // game.addBall(new Ball(100, 100, 0.6, 2.2));
    game.addBall(b);

    game.start();

    // didn't work with clickerBool variable declaration within click function
    // right above if statement => WHY???
    var clickerBool = true;
    var ballCoordinates;
    var overlap;

    // If user clicks game area, make big explosive ball ("user-click") appear
    $("#game").click(function(event) {
        // console.log(event);
        // get mouse coordinate
        // console.log("pageX: " + event.offsetY + ", pageY: " + event.offsetX);
        // append div into html, only if no clicker exists, yet!

        var clickerDiv = $('<div class="user-click"></div>');
        // console.log("clickerBool before if else " + clickerBool);
        if (clickerBool === true) {
            // append div into html
            clickerDiv.css({
                // substract 10, because of the radius of the ball!
                // TODO - Access width/height of css to make it dynamic!
                top: event.offsetY - 10 + "px",
                left: event.offsetX - 10 + "px"
            });
            $("#game").append(clickerDiv);
            // set clickerBool to false, to prevent further creation of "user-clicks"
            clickerBool = false;
            // console.log("clickerBool within if else " + clickerBool);
        }
        clickerBool = false;
        // console.log("clickerBool after if else " + clickerBool);

        setInterval(function() {
            // inspect of clicker element shows, that element is growing - but not css values
            // console.log of clicker element to research which properties it has - offsetWidth might be what to look for
            // offsetWidth only returns defult values => use getBoundingClientRect
            ballCoordinates = document.getElementsByClassName("user-click")[0].getBoundingClientRect();
            console.log(ballCoordinates);
            // store circumference of clicker ball in real-time
            // var circumference = ((2) * (Math.PI) * (r)); => r = Radius
            var radius = ballCoordinates.width / 2;
            var absoluteX = ballCoordinates.left + radius;
            var absoluteY = ballCoordinates.top + radius;
            console.log("ABSOLUTE X", absoluteX);
            console.log("ABSOLUTE Y", absoluteY);
            console.log("Radius: " + radius);
            var circumference = 2 * Math.PI * radius;
            // console.log("Circumference: " + circumference);

            // check for overlapping circles
            var overlap = overlappingCirclesCheck(
                absoluteX,
                absoluteY,
                b.left - 5,
                b.top - 5,
                radius,
                5
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
            }
        }, 500);

        // All small balls are in the array game! console.log(game.balls);
        var gameBalls = game.balls;

        setInterval(function() {
            gameBalls.forEach(function(ball) {});
        });
        // TODO if statement that lets setInterval only check for width, if clicker ball exists!!!!
        // if it exists, check for coordinates and check if small ball collides
        // if yes, then make small ball grow
        // check if other ball collides...

        // Animate clicker ball to grow
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
    });
});

// check if small ball and clicked ball overlap
// https://www.geeksforgeeks.org/check-two-given-circles-touch-intersect/

function overlappingCirclesCheck(x1, y1, x2, y2, r1, r2) {
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
