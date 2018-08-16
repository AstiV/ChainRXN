var Dot = function(left = 1, top = 1, xRatio = 0.2, yRatio = 0.3) {
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
