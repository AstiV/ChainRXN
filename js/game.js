var Game = function() {
    this.dots = [];

    this.started = false;
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

    this.setLevel = function(level) {
        clicked = false;
        gameLost = false;
        gameWon = false;

        this.dots.forEach(function(dot) {
            dot.selector.remove();
        });
        this.dots = [];

        if (level === 0) {
            this.addDot(new Dot(0, 0, 1.0, 0.4));
            this.addDot(new Dot(0, 0, 0.5, 0.6));
            this.addDot(new Dot(0, 0, 1.0, 1.5));
            this.addDot(new Dot(5, 0, 0.3, 0.5));
            this.addDot(new Dot(2, 0, 0.2, 1.5));
        }
    };

    this.start = function() {
        return setInterval(
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
                // if (this.removedArray.length === 0 && this.dots.length > 0) {
                //     console.log("gameover");
                //     //this.stopGame(startIt);
                // }

                // check if there are capturers left
                if (clicked === true) {
                    if (!Array.from($(".user-click")).length && this.dots.length > 0) {
                        this.stopGameLost(startIt);
                        var gameLost = true;
                        LostScreen();
                    } else if (!Array.from($(".user-click")).length && this.dots.length === 0) {
                        console.log("You won!");
                        this.stopGameLost(startIt);
                        var gameWon = true;
                        WonScreen();
                    }
                }
            }.bind(this),
            // => perfect speed: 25
            13
        );
    };

    this.stopGameLost = function(startIt) {
        clearInterval(startIt);
    };
};
