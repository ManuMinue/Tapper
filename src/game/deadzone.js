var placesDeadZone = [{ x: 100, y: 90 },
    { x: 68, y: 185 },
    { x: 36, y: 281 },
    { x: 4, y: 377 },
    { x: 335, y: 90 },
    { x: 367, y: 185 },
    { x: 399, y: 281 },
    { x: 431, y: 377 }
];

var DeadZone = function(place) {
    this.draw = function(ctx) {
        ctx.fillStyle = '#007D01';
        ctx.fillRect(placesDeadZone[place].x, placesDeadZone[place].y, 10, 65);
    }

    this.step = function() {
        var collision = this.board.collide(this, OBJECT_BEER);

        if (collision) {
            collision.hit();
        }
    }
}