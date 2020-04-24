//

document.getElementById("test").innerHTML = "Test!";

var canvas = document.getElementById("tetherball");
var ctx = canvas.getContext("2d");

// Current state values
var clockwise = true;
var collided = false;

// Line coordinates
var x1 = y1 = 0;
var x2 = y2 = 400;

// Ball coordinates and radius
var cx = 100;
var cy = 300;
var cr = 5;

// Initialize line and ball
drawLine(x1, y1, x2, y2);
drawBall(cx, cy, cr);

setInterval(refresh, 5);
setInterval(function() {
    if (checkForCollision(x1, y1, x2, y2, cx, cy, cr)) {
        if (!collided) {
            clockwise = !clockwise;
            collided = true;
        }
    } else {
        collided = false;
    }
}, 1);

/**
 * Draws the "tether" line.
 * 
 * @param {number} sx Start point x-coordinate
 * @param {number} sy Start point y-coordinate
 * @param {number} ex End point x-coordinate
 * @param {number} ey End point y-coordinate
 */
function drawLine(sx, sy, ex, ey) {
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
}

/**
 * Draws the "ball" arc.
 * 
 * @param {number} x Center point x-coordinate
 * @param {number} y Center point y-coordinate
 * @param {number} r Radius
 */
function drawBall(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.stroke();
}

/**
 * Takes the current position and path of the line and 
 * generates the next position to simulate a spin.
 * 
 */
function spin() {
    if (x1 == 0 && y1 == 0) {
        clockwise?x1++:y1++;
        clockwise?x2--:y2--;
    } else if (x1 == 0 && y1 == 400) {
        clockwise?y1--:x1++;
        clockwise?y2++:x2--;
    } else if (x1 == 400 && y1 == 400) {
        clockwise?x1--:y1--;
        clockwise?x2++:y2++;
    } else if (x1 == 400 && y1 == 0) {
        clockwise?y1++:x1--;
        clockwise?y2--:x2++;
    } else if (x1 < 400 && y1 == 0) {
        clockwise?x1++:x1--;
        clockwise?x2--:x2++;
    } else if (x1 == 400 && y1 > 0) {
        clockwise?y1++:y1--;
        clockwise?y2--:y2++;
    } else if (x1 > 0 && y1 == 400) {
        clockwise?x1--:x1++;
        clockwise?x2++:x2--;
    } else if (x1 == 0 && y1 < 400) {
        clockwise?y1--:y1++;
        clockwise?y2++:y2--;
    }
}

/**
 * Invokes spin(), drawBall(), and drawLine() to refresh the canvas.
 * 
 */
function refresh() {
    spin();
    drawBall(cx, cy, cr);
    drawLine(x1, y1, x2, y2);
}

/**
 * Returns whether the line is colliding with the ball.
 * 
 * @param {number} lx1 Line start point x-coordinate
 * @param {number} ly1 Line start point y-coordinate
 * @param {number} lx2 Line end point x-coordinate
 * @param {number} ly2 Line end point y-coordinate
 * @param {number} cx Ball center c-coodinate
 * @param {number} cy Ball center y-coordinate
 * @param {number} cr Ball radius
 */
function checkForCollision(lx1, ly1, lx2, ly2, cx, cy, cr) {
    var dAB = Math.sqrt(Math.pow(lx2 - lx1, 2) + Math.pow(ly2 - ly1, 2));
    var dAC = Math.sqrt(Math.pow(lx1 - cx, 2) + Math.pow(ly1 - cy, 2));
    var dBC = Math.sqrt(Math.pow(cx - lx2, 2) + Math.pow(cy - ly2, 2));
    var angleA = Math.acos(
        (Math.pow(dAC, 2) + Math.pow(dAB, 2) - Math.pow(dBC, 2)) 
        / (2 * dAC * dAB)
        );
    var dCT = dAC * Math.sin(angleA);
    return dCT <= cr ? true : false;
}

/**
 * Listens for key presses (WASD or arrow keys) to move current ball coordinates.
 * 
 */
document.addEventListener("keydown", function(event) {
        switch(event.keyCode) {
            case(65):case(37):
                cx -= 0.5;
                break;
            case(87):case(38):
                cy -= 0.5;
                break;
            case(68):case(39):
                cx += 0.5;
                break;
            case(83):case(40):
                cy += 0.5;
                break;
        }
})

/*
* TO-DO
*
* "Blocking" center axis needed to prevent ball from phasing through middle segment of
* the line/ray.
*/
