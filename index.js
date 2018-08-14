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
            25
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

        this.selector.css({
            top: this.top + "px",
            left: this.left + "px"
        });
    };
};

$(document).ready(function() {
    var game = new Game();

    var b = new Ball();
    var bTwo = new Ball(50, 100, 0.4, 2.1);
    game.addBall(new Ball(36, 500, 0.5, 1.3));
    game.addBall(new Ball(100, 500, 0.7, 4.3));
    game.addBall(new Ball(100, 100, 0.6, 2.2));
    game.addBall(b);
    game.addBall(bTwo);

    game.start();

    // didn't work with clickerBool variable declaration within click function
    // right above if statement => WHY???
    var clickerBool = true;

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
            var nextVar = document.getElementsByClassName("user-click")[0].getBoundingClientRect();
            console.log(nextVar);
        }, 200);
        console.log(game.balls);
        // remember to do if statement and let setInterval only check for width, if clicker ball exists!!!!
        // if it exists, check for coordinates and check if small ball collides
        // if yes, then make small ball grow
        // check if other ball collides...
        // All small balls are in the array game!
        //

        // var nextVar = clickerDiv.getBoundingClientRect();

        // Animate clicker ball to grow
        var clickerStyle = $(".user-click");
        setTimeout(function() {
            clickerStyle.toggleClass("grow");
            // clickerDiv.getBoundingClientRect();
            // var rect = clicker.getBBox();
            // console.log(rect);
        }, 20);
        setTimeout(function() {
            clickerStyle.toggleClass("grow");
            // clickerDiv.getBoundingClientRect();
            // var rect = clicker.getBBox();
            // console.log(rect);
        }, 8000);
        setTimeout(function() {
            clickerStyle.toggleClass("fade-out");
            // clickerStyle.remove();
            // clickerDiv.getBoundingClientRect();
            // var rect = clicker.getBBox();
            // console.log(rect);
        }, 10500);
        // clickerDiv.getBoundingClientRect();

        // inspect of clicker element shows, that element is growing - but not css values
        // console.log of clicker element to research which properties it has - offsetWidth might be what to look for

        // store circumference of clicker in real-time, to check if ball hits it. If it does => explode
        // var circumference = ((2) * (Math.PI) * (r)); => r = Radius
        // radius = width/2
        // How to get dynamic width? => getBoundingClientRect() => does not work
        // console.log(clicker.getBoundingClientRect());
    });
});
