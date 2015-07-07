var DEJS;
(function (DEJS) {
    (function (Effects) {
        var VectorEffect = (function () {
            function VectorEffect() {
                this.paths = [];
                this.pathMetric = new PathsMetric();
            }
            /**
             * Applies a vector effect to paths
             *
             * @param paths A paths array to process
             */
            VectorEffect.prototype.processPaths = function (paths) {
                var values = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    values[_i] = arguments[_i + 1];
                }
                this.paths = paths;
                this.values = values;
                this.pathMetric = DEJS.Util.calcPathsMetric(paths);
                this.bbox = this.pathMetric.bbox;
                this.prepare();
                this.transform();
            };

            VectorEffect.prototype.prepare = function () {
            };

            VectorEffect.prototype.transform = function () {
            };
            return VectorEffect;
        })();
        Effects.VectorEffect = VectorEffect;

        var LettersEffect = (function (_super) {
            __extends(LettersEffect, _super);
            function LettersEffect() {
                _super.apply(this, arguments);
            }
            LettersEffect.prototype.prepare = function () {
            };

            LettersEffect.prototype.transform = function () {
                for (var i = 0; i < this.paths.length; i++) {
                    this.paths[i] = this.transformLetter(this.paths[i]);
                }
            };

            LettersEffect.prototype.transformLetter = function (path) {
                return path;
            };
            return LettersEffect;
        })(VectorEffect);
        Effects.LettersEffect = LettersEffect;

        var PointsEffect = (function (_super) {
            __extends(PointsEffect, _super);
            function PointsEffect() {
                _super.apply(this, arguments);
            }
            PointsEffect.prototype.prepare = function () {
            };

            PointsEffect.prototype.transform = function () {
                for (var i = 0; i < this.paths.length; i++) {
                    var curPath = (this.paths[i]);
                    for (var j = 0; j < curPath.length; j++) {
                        var curve = curPath[j];
                        for (var k = 1; k < curve.length - 1; k += 2) {
                            var x = curve[k];
                            var y = curve[k + 1];
                            var newXY = this.transformPoint(x, y);
                            curve[k] = newXY[0];
                            curve[k + 1] = newXY[1];
                        }
                    }
                }
            };

            PointsEffect.prototype.transformPoint = function (x, y) {
                return [x, y];
            };
            return PointsEffect;
        })(VectorEffect);
        Effects.PointsEffect = PointsEffect;

        var PathsMetric = (function () {
            function PathsMetric() {
                this.bboxes = [];
            }
            return PathsMetric;
        })();
        Effects.PathsMetric = PathsMetric;
    })(DEJS.Effects || (DEJS.Effects = {}));
    var Effects = DEJS.Effects;
})(DEJS || (DEJS = {}));