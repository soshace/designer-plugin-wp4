var DEJS;
(function (DEJS) {
    ///<reference path="DEModel.ts"/>
    ///<reference path="../event/Events.ts"/>
    (function (Model) {
        var AuthManager = (function () {
            function AuthManager(model) {
                this.isAuthorized = false;
                this.model = model;
            }
            AuthManager.prototype.authorize = function (email) {
                if (typeof email === "undefined") { email = ""; }
                DEJS.debug("authorize, email: " + email);
                if (email == "") {
                    Model.controlsManager.showAuthDialog();
                } else {
                    this.email = email;
                    this.isAuthorized = true;
                    this.model.dispatchEvent(new DEJS.Events.Event(DEEvents.AUTH_EVENT, this));
                }
            };
            return AuthManager;
        })();
        Model.AuthManager = AuthManager;
    })(DEJS.Model || (DEJS.Model = {}));
    var Model = DEJS.Model;
})(DEJS || (DEJS = {}));