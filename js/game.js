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
                // if (this.removedArray.length === 0 && this.dots.length > 0) {
                //     console.log("gameover");
                //     //this.stopGame(startIt);
                // }

                // check if there are capturers left
                if (clicked === true) {
                    if (!Array.from($(".user-click")).length && this.dots.length > 0) {
                        console.log("You Lost!");
                        this.stopGameLost(startIt);
                        var gameLost = true;
                    } else if (!Array.from($(".user-click")) && this.dots.length === 0) {
                        console.log("You won!");
                        this.stopGame(startIt);
                        var gameWon = true;
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
