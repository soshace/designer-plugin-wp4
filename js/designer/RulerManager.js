
///<reference path="DEDesigner.ts"/>
///<reference path="../Util.ts"/>

var DEJS;
(function (DEJS) {
    var RulerManager = (function () {
        function RulerManager(designer) {
            this.printAreaCoord = [0, 0, 0, 0];
            this.printAreaUnits = [0, 0];
            this.locPrintAreaCoord = [0, 0, 0, 0];
            this.locPrintAreaUnits = [0, 0];
            this.locUnit = "";
            this.width = 0;
            this.height = 0;
            this.viewPort = { x: 0, y: 0, zoom: 100 };
            this.rulerSize = 17;
            this.designer = designer;
        }
        RulerManager.prototype.showRuler = function () {
            //calculating marks step - same for both
            this.calcLocValues();
            if (this.locPrintAreaUnits[0] >= this.locPrintAreaUnits[1]) {
                var marksIntervals = calculateMarksSpacing(this.locPrintAreaCoord[0], this.locPrintAreaCoord[2], this.locPrintAreaUnits[0]);
            } else {
                var marksIntervals = calculateMarksSpacing(this.locPrintAreaCoord[1], this.locPrintAreaCoord[3], this.locPrintAreaUnits[1]);
            }

            //draw vertical ruler
            var verticalRuler = jQuery('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" ></svg>').attr({ width: "15", height: this.height });
            var verticalBar = drawRulerBar(this.height, this.locPrintAreaCoord[1], this.locPrintAreaCoord[3], this.locPrintAreaUnits[1], marksIntervals);

            //'rotating' horizontal bar
            verticalBar.attr({ transform: "rotate(90, 7.5, 7.5) translate(0.5, -0.5)" });
            verticalBar.find("path").attr({ transform: "scale(1, -1) translate(0, -15)" });
            verticalBar.find("text").attr({ transform: "rotate(180) translate(5, 5)" });
            verticalBar.find("text").last().attr({ transform: "rotate(180) translate(4, 5)" }).css("text-anchor", "start");
            verticalBar.appendTo(verticalRuler);
            verticalRuler.appendTo(this.rulerHolder);

            //draw horizontal ruler
            var horizontalRuler = jQuery('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" ></svg>').attr({ width: this.width, height: "15" }).css({ "position": "absolute", "left": "0", "top": "0" });
            var horizontalBar = drawRulerBar(this.width, this.locPrintAreaCoord[0], this.locPrintAreaCoord[2], this.locPrintAreaUnits[0], marksIntervals, this.locUnit);
            horizontalBar.appendTo(horizontalRuler);
            horizontalRuler.appendTo(this.rulerHolder);

            //Hack - http://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
            jQuery(this.rulerHolder).html(jQuery(this.rulerHolder).html());

            //
            function calculateMarksSpacing(rulerStart, rulerEnd, widthUnit) {
                //ruler width in px
                var widthPx = rulerEnd - rulerStart;

                //quantity of main marks with labels
                var majorMarksCount = Math.floor(widthPx / 80);

                //delta of main marks labels
                var majorMarksIntervalUnits = Math.round(widthUnit / majorMarksCount);

                //correcting majorMarksIntervalUnits
                var p = majorMarksIntervalUnits.toString().length;
                var k = Math.pow(10, p - 1);
                var m = Math.round(majorMarksIntervalUnits / k);
                if (m >= 8) {
                    m = 8;
                } else if (m < 8 && m >= 5) {
                    m = 5;
                } else if (m < 5 && m >= 4) {
                    m = 4;
                } else if (m < 4 && m >= 2) {
                    m = 2;
                } else {
                    m = 1;
                }
                majorMarksIntervalUnits = m * k;

                //interval between marks
                var majorMarksIntervalPx = (widthPx / widthUnit) * majorMarksIntervalUnits;
                var minorMarksIntervalPx = majorMarksIntervalPx / 4;

                return {
                    majorPx: majorMarksIntervalPx,
                    minorPx: minorMarksIntervalPx,
                    majorUnits: majorMarksIntervalUnits
                };
            }

            function drawRulerBar(barWidth, rulerStart, rulerEnd, widthUnit, marksIntervals, unitLabel) {
                //1. create parent node
                //2. draw bg
                //3. calculate labels and marks position in loop
                //4. calculate last label and mark position
                //5. draw marks
                //6. draw labels
                //1. create g for ruler
                var g = jQuery('<g></g>');

                //2. background
                var hbg = jQuery('<rect x="0" y="0" height="15" fill="#ffffff"></rect>');
                hbg.attr({ width: barWidth });
                g.append(hbg);

                //3. marks + labels calculations
                //path data, main bottom line
                var d = "M" + rulerStart + ",14.5H" + rulerEnd;

                //labels
                var labels = new Array();

                var position = rulerStart;
                var counter = 0;
                while (position < rulerEnd) {
                    //major mark line
                    d += "M" + position + ",0V15";

                    for (var j = 1; j <= 3; j++) {
                        var nextMinorMark = position + marksIntervals.minorPx * j;
                        if (nextMinorMark < rulerEnd) {
                            //middle submark - higher
                            var ystart = j == 2 ? 9 : 11;
                            d += "M" + nextMinorMark + "," + ystart + "V15";
                        }
                    }

                    //label and it's pos
                    labels.push(new RulerMarkLabelVO(position + 3, marksIntervals.majorUnits * counter));

                    //remove mark if it overlaps the last mark
                    if (position + 3 + marksIntervals.minorPx >= rulerEnd) {
                        labels.pop();
                    }

                    position += marksIntervals.majorPx;
                    counter++;
                }

                //4. add final mark and label
                d += "M" + rulerEnd + ",0V15";
                labels.push(new RulerMarkLabelVO(rulerEnd + 3, widthUnit));

                //add units label
                if (unitLabel && unitLabel.length > 0) {
                    if (rulerEnd + marksIntervals.majorPx > barWidth) {
                        labels[0].label += " " + unitLabel;
                    } else {
                        labels[labels.length - 1].label += " " + unitLabel;
                    }
                }

                //5. svg marks node
                var hmarks = jQuery('<path fill="none" stroke="#a9a9a9" shape-rendering="crispEdges"></path>');
                hmarks.attr({ d: d });
                g.append(hmarks);

                //6. svg labels group
                var group = jQuery('<g transform="translate(0,11)" style="font-size: 10px; font-family: Arial; fill: #222;"></g>');
                for (var i = 0; i < labels.length; i++) {
                    //wrap text in g for easy rotation
                    var tg = jQuery('<g></g>').attr({ transform: "translate(" + labels[i].x + ",0)" });
                    var t = jQuery('<text></text>').text(labels[i].label);
                    tg.append(t);
                    group.append(tg);

                    //detecting label is out of canvas
                    if (labels[i].x + marksIntervals.minorPx > barWidth) {
                        tg.attr({ transform: "translate(" + (labels[i].x - 6) + ",0)" });
                        t.css("text-anchor", "end");
                    }
                }
                g.append(group);

                return g;
            }
        };

        RulerManager.prototype.setViewPort = function (viewPort) {
            this.viewPort = viewPort;
            if (this.rulerHolder)
                this.rulerHolder.children().remove();
            this.showRuler();
        };

        RulerManager.prototype.calcLocValues = function () {
            var dx = this.rulerSize / (this.viewPort.zoom / 100);
            var width = (this.width + this.rulerSize) / (this.viewPort.zoom / 100);
            var trueZoom = this.width / width * 100;
            var mult = this.designer.options.unitConversionMult;
            this.locPrintAreaCoord[0] = (this.printAreaCoord[0] - this.viewPort.x + dx) * trueZoom / 100;
            this.locPrintAreaCoord[1] = (this.printAreaCoord[1] - this.viewPort.y + dx) * trueZoom / 100;
            this.locPrintAreaCoord[2] = (this.printAreaCoord[2] - this.viewPort.x + dx) * trueZoom / 100;
            this.locPrintAreaCoord[3] = (this.printAreaCoord[3] - this.viewPort.y + dx) * trueZoom / 100;
            if (this.designer.options.unit2 && this.printAreaUnits[0] >= 30 && this.printAreaUnits[1] >= 30) {
                this.locPrintAreaUnits[0] = parseFloat((this.printAreaUnits[0] / mult).toFixed(2));
                this.locPrintAreaUnits[1] = parseFloat((this.printAreaUnits[1] / mult).toFixed(2));
                this.locUnit = this.designer.options.unit2;
            } else {
                this.locPrintAreaUnits[0] = this.printAreaUnits[0];
                this.locPrintAreaUnits[1] = this.printAreaUnits[1];
                this.locUnit = this.designer.options.unit;
            }
        };
        return RulerManager;
    })();
    DEJS.RulerManager = RulerManager;

    var RulerMarkLabelVO = (function () {
        function RulerMarkLabelVO(x, label) {
            this.x = x;
            this.label = label.toString();
        }
        return RulerMarkLabelVO;
    })();
    DEJS.RulerMarkLabelVO = RulerMarkLabelVO;
})(DEJS || (DEJS = {}));