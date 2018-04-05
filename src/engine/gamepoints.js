var GamePoints = function() {
    Game.points = 0;
    Game.maxPoints = 0;
    this.activate = true;

    var pointsLength = 8;

    this.draw = function(ctx) {
        ctx.save();
        ctx.font = "bold 18px arial";
        ctx.fillStyle = "#FFFFFF";
        var maxtxt = "" + Game.maxPoints;
        var txt = "" + Game.points;
        var i = pointsLength - maxtxt.length,
            zerosMax = "";
        while (i-- > 0) { zerosMax += "0"; }

        var i = pointsLength - txt.length,
            zeros = "";
        while (i-- > 0) { zeros += "0"; }
        ctx.fillText('Max Points: ' + zerosMax + maxtxt, 10, 20);
        ctx.fillText('Cur Points: ' + zeros + txt, 10, 40);

        ctx.restore();

    };

    this.step = function(dt) {
        if (Game.points > Game.maxPoints) {
            Game.maxPoints = Game.points;
        }
    };

    this.deactivate = function() {
        this.activate = false;
    }

    this.activate = function() {
        this.activate = true;
    }
};