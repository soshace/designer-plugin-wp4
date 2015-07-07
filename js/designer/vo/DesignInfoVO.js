var DEJS;
(function (DEJS) {
    (function (VO) {
        var DesignInfoVO = (function () {
            function DesignInfoVO() {
                this.colors = [];
                this.prices = [];
                this.objectsCount = new ObjectsCountVO();
            }
            return DesignInfoVO;
        })();
        VO.DesignInfoVO = DesignInfoVO;

        var ColorsCountVO = (function () {
            function ColorsCountVO() {
            }
            return ColorsCountVO;
        })();
        VO.ColorsCountVO = ColorsCountVO;

        var PriceVO = (function () {
            function PriceVO() {
                this.isTotal = false;
            }
            return PriceVO;
        })();
        VO.PriceVO = PriceVO;

        var ObjectsCountVO = (function () {
            function ObjectsCountVO() {
                this.imagesCount = 0;
                this.letteringsCount = 0;
            }
            return ObjectsCountVO;
        })();
        VO.ObjectsCountVO = ObjectsCountVO;
    })(DEJS.VO || (DEJS.VO = {}));
    var VO = DEJS.VO;
})(DEJS || (DEJS = {}));