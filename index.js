var circleCoordinates;
var dotCoordinates;
var overlap;
var clicked = false;
var gameLost = false;
var gameWon = false;

$(document).ready(function() {
    var game = new Game();

    game.addDot(new Dot(0, 0, 1.0, 0.4));
    game.addDot(new Dot(0, 0, 0.5, 0.6));
    game.addDot(new Dot(0, 0, 1.0, 1.5));
    game.addDot(new Dot(5, 0, 0.3, 0.5));
    game.addDot(new Dot(2, 0, 0.2, 1.5));

    startIt = game.start();

    // If user clicks game area, make big explosive circle ("user-click") appear
    $("#game").click(function(event) {
        if (clicked) return;

        clicked = true;
        game.started = true;
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
    // append div into html
    clickerDiv.css({
        // substract 10, because of the radius of the Circle!
        // TODO - Access width/height of css to make it dynamic!
        top: event.offsetY - 10 + "px",
        left: event.offsetX - 10 + "px"
    });
    $("#game").append(clickerDiv);
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
    var coords = capturer.getBoundingClientRect();
    // store coordinates of Circle in real-time
    var radius = coords.width / 2;
    var absoluteX = coords.left + radius;
    var absoluteY = coords.top + radius;

    var circleCoordinates = {
        absoluteX: absoluteX,
        absoluteY: absoluteY,
        radius: radius
    };
    return circleCoordinates;
}

function getDotCoordinates(dot) {
    var coords = dot.selector[0].getBoundingClientRect();
    var radius = coords.width / 2;
    var absoluteX = coords.left + radius;
    var absoluteY = coords.top + radius;

    var dotCoordinates = {
        dotX: absoluteX,
        dotY: absoluteY,
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

///// Start Screen
$(".lost-headline").hide();
$(".won-headline").hide();
$(".lost-text").hide();
$(".won-text").hide();
$(".again-btn-text").hide();

//// End Screen
// if ((gameLost = true)) {
//     // $(".start-container").slideDown();
//     $(".start-headline").hide();
//     $(".won-headline").hide();
//     $(".start-text").hide();
//     $(".won-text").hide();
//     $(".start-btn-text").hide();
// } else if ((gameWon = true)) {
//     // $(".start-container").slideDown();
//     $(".start-headline").hide();
//     $(".lost-headline").hide();
//     $(".start-text").hide();
//     $(".lost-text").hide();
//     $(".start-btn-text").hide();
// } else {
//     $(".lost-headline").hide();
//     $(".won-headline").hide();
//     $(".lost-text").hide();
//     $(".won-text").hide();
//     $(".again-btn-text").hide();
// }

$(".start-container .btn").click(function() {
    $(".start-container").slideUp();
});
