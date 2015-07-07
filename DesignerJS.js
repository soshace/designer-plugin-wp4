var designer = new DEJS.DesignerJS();

var NNViewModel = (function () {
    function NNViewModel() {
    }
    // add properties requerd for nnSynhronizer
    NNViewModel.extend = function (model) {
        var extendedModel = model;

        extendedModel.namesNumberSizeQuantities = ko.computed(function () {
            var results = new Array();

            ko.utils.arrayForEach(model.namesNumbers(), function (nameNumber) {
                var sizeName = nameNumber.size();

                //try find exists SizeQuantityVO in results;
                var sizeQuantity = ko.utils.arrayFirst(results, function (sq) {
                    return sq.size() == sizeName;
                });
                if (sizeQuantity == null) {
                    sizeQuantity = new SizeQuantityVO(nameNumber.size(), 0);
                    results.push(sizeQuantity);
                }

                sizeQuantity.quantity(sizeQuantity.quantity() + 1);
            });

            return results;
        }); // end of namesNumberSizeQuantities

        return extendedModel;
    };
    return NNViewModel;
})();

/** Helper to work with NameNumbers lines and Quantity Lines in */
var NNHelper = (function () {
    function NNHelper(model) {
        this.model = model;
    }
    NNHelper.prototype.findSizeLineByName = function (sizeName, addIfNotExists) {
        if (typeof addIfNotExists === "undefined") { addIfNotExists = false; }
        var sizeLine = ko.utils.arrayFirst(this.model.quantities(), function (l) {
            return l.size() == sizeName;
        });
        if (sizeLine == null && addIfNotExists)
            sizeLine = this.model.addQuantityBaseOnSize(sizeName);
        return sizeLine;
    };

    NNHelper.prototype.findNameNumberQuantityByName = function (sizeName) {
        return ko.utils.arrayFirst(this.model.namesNumberSizeQuantities(), function (q) {
            return q.size() == sizeName;
        });
    };
    return NNHelper;
})();

var NNQuantitySynchronizer = (function () {
    function NNQuantitySynchronizer(model) {
        this.model = NNViewModel.extend(controlsModel); // add additional properties request for NNQuantitySynchronizer
        this.nnHelper = new NNHelper(this.model);
    }
    /***************************  Public ********************************************/
    NNQuantitySynchronizer.prototype.onNameNumberSizeChanged = function (changeNameNumberSize) {
        this.model.namesNumbers.valueHasMutated(); // force update NameNamerQuantity
        var newSizeExist = ("size" in changeNameNumberSize) && changeNameNumberSize.size != null;
        var prevSizeExist = ("prevSize" in changeNameNumberSize) && changeNameNumberSize.prevSize != null;

        //decrease prev quantity
        if (prevSizeExist)
            this.decreasePrevQuantityLine(changeNameNumberSize.prevSize, newSizeExist); // total restriction ignored only on change(newSizeExists), on delete - worked

        if (!newSizeExist)
            return;
        this.increaseOrCreateNewQuantityLine(changeNameNumberSize.size);
    };

    NNQuantitySynchronizer.prototype.onRemovedNameNumberLine = function (removedNNLine) {
        var eventArgs = {
            prevSize: removedNNLine.size(),
            size: null
        };

        this.onNameNumberSizeChanged(eventArgs);
    };

    NNQuantitySynchronizer.prototype.onAddNameNumberLine = function (addedLine) {
        var eventArgs = {
            prevSize: null,
            size: addedLine.size()
        };
        this.onNameNumberSizeChanged(eventArgs);
    };

    NNQuantitySynchronizer.prototype.getMinQuantity = function (quantityLine) {
        var nameNumberMin = 0;
        var nameNumber = this.nnHelper.findNameNumberQuantityByName(quantityLine.size());
        if (nameNumber != null)
            nameNumberMin = nameNumber.quantity();
        return nameNumberMin;
    };

    /**************************   Private ******************************************/
    NNQuantitySynchronizer.prototype.decreasePrevQuantityLine = function (prevNNSizeName, ignoreTotal) {
        var oldLine = this.nnHelper.findSizeLineByName(prevNNSizeName);
        if (oldLine != null)
            this.model.decreaseQuantity(oldLine, null, { ignoreTotal: ignoreTotal, removeZero: true }); // total restriction ignored only on change, on delete - worked
    };

    NNQuantitySynchronizer.prototype.increaseOrCreateNewQuantityLine = function (newSizeName) {
        //find or create new size line
        var newLine = this.nnHelper.findSizeLineByName(newSizeName, true);

        // check if increare required by nameNambers minimum
        var requireIncreaseByNameNambers = this.requireIncreaseByNameNumbers(newSizeName, newLine);
        var requireIncreaseByTotal = this.requireIncreaseByTotal();
        if (requireIncreaseByNameNambers || requireIncreaseByTotal) {
            this.model.increaseQuantity(newLine);
        }
    };

    NNQuantitySynchronizer.prototype.requireIncreaseByNameNumbers = function (newSizeName, quantityLine) {
        var numberSizeQuantity = this.nnHelper.findNameNumberQuantityByName(newSizeName);
        var nnQuantity = numberSizeQuantity.quantity();

        var lineQuantity = quantityLine.quantity();

        return nnQuantity > lineQuantity;
    };

    NNQuantitySynchronizer.prototype.requireIncreaseByTotal = function () {
        var totalQuantity = this.model.totalQuantity();
        var minQuantity = this.model.restrictions().minQuantity();
        return totalQuantity < minQuantity;
    };
    return NNQuantitySynchronizer;
})();