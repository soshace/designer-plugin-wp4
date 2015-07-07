var DEJS;
(function (DEJS) {
    (function (Effects) {
        function isVector(effectName) {
            return (effectName in Effects.VectorEffects);
        }
        Effects.isVector = isVector;

        var ArcUp = (function (_super) {
            __extends(ArcUp, _super);
            function ArcUp() {
                _super.apply(this, arguments);
            }
            ArcUp.prototype.prepare = function () {
                this.value = this.values[0];
                this.value = Math.min(this.value, 360);
                this.value = Math.max(this.value, 0.05);
                this.r = this.bbox.width * 180 / (Math.PI * this.value);
                this.a1 = 90 - (this.value / 2);
                this.a2 = 90 + (this.value / 2);
            };

            ArcUp.prototype.transformLetter = function (path) {
                var pBBox = Raphael.pathBBox(path);
                var sx = (pBBox.x + pBBox.x2) / 2;
                var sy = this.pathMetric.bbox.height;

                var a = (this.a2 - this.a1) * sx / this.bbox.width + this.a1;
                var tx = 0 - this.r * Math.cos(DEJS.Util.toRad(a));
                var ty = 0 - this.r * Math.sin(DEJS.Util.toRad(a));
                path = Raphael.transformPath(path, ["R", "" + (a - 90), "" + sx, "" + sy]);
                path = Raphael.transformPath(path, ["t", "" + (tx - sx), "" + (ty - sy)]);
                return path;
            };
            return ArcUp;
        })(Effects.LettersEffect);

        var ArcDown = (function (_super) {
            __extends(ArcDown, _super);
            function ArcDown() {
                _super.apply(this, arguments);
            }
            ArcDown.prototype.prepare = function () {
                this.value = this.values[0];
                this.value = Math.max(this.value, -360);
                this.value = Math.min(this.value, -0.05);
                this.value = Math.abs(this.value);
                this.r = this.bbox.width * 180 / (Math.PI * this.value);
                this.a1 = 90 - (this.value / 2);
                this.a2 = 90 + (this.value / 2);
            };

            ArcDown.prototype.transformLetter = function (path) {
                var pBBox = Raphael.pathBBox(path);
                var sx = (pBBox.x + pBBox.x2) / 2;
                var sy = 0;

                var a = (this.a2 - this.a1) * sx / this.bbox.width + this.a1;
                var tx = 0 - this.r * Math.cos(DEJS.Util.toRad(a));
                var ty = this.r * Math.sin(DEJS.Util.toRad(a));
                path = Raphael.transformPath(path, ["R", "" + (90 - a), "" + sx, "" + sy]);
                path = Raphael.transformPath(path, ["t", "" + (tx - sx), "" + (ty - sy)]);
                return path;
            };
            return ArcDown;
        })(Effects.LettersEffect);

        var SimpleWave = (function (_super) {
            __extends(SimpleWave, _super);
            function SimpleWave() {
                _super.apply(this, arguments);
            }
            SimpleWave.prototype.transformPoint = function (x, y) {
                var newY = y + this.pathMetric.bbox.height * Math.sin(2 * Math.PI * (x - this.pathMetric.bbox.x) / this.pathMetric.bbox.width + this.values[0] * 2 * Math.PI);
                return [x, newY];
            };
            return SimpleWave;
        })(Effects.PointsEffect);

        Effects.VectorEffects = {
            "arcUp": ArcUp,
            "arcDown": ArcDown,
            "simpleWave": SimpleWave
        };
    })(DEJS.Effects || (DEJS.Effects = {}));
    var Effects = DEJS.Effects;
})(DEJS || (DEJS = {}));