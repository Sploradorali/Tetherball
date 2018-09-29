# Tetherball
Core JS test of basic 2D collision detection.

<h2>Concept</h2>

The ray/line rotates on the center point of the canvas by incrementing/decrementing the x- and y-coordinates of both ends. Coordinates between the start of the line, the end of the line, and the center point of the circle are used with trigonometric functions to detect whether the distance between the point of the line closest to the circle and the circle's center are smaller than the circle's radius, which indicates that the line has collided with the "ball."
