var DEJS;

(function (DEJS) {
    (function (Events) {
        var Event = (function () {
            function Event(type, targetObj) {
                this._type = type;
                this._target = targetObj;
            }
            Event.prototype.getTarget = function () {
                return this._target;
            };

            Event.prototype.getType = function () {
                return this._type;
            };
            return Event;
        })();
        Events.Event = Event;

        var A = (function () {
            function A() {
                this._listeners = [];
            }
            return A;
        })();
        Events.A = A;

        var EventDispatcher = (function () {
            function EventDispatcher() {
                this._listeners = [];
            }
            EventDispatcher.prototype.hasEventListener = function (type, listener) {
                var exists = false;
                for (var i = 0; i < this._listeners.length; i++) {
                    if (this._listeners[i].type === type && this._listeners[i].listener === listener) {
                        exists = true;
                    }
                }

                return exists;
            };

            EventDispatcher.prototype.addEventListener = function (typeStr, listenerFunc) {
                if (this.hasEventListener(typeStr, listenerFunc)) {
                    return;
                }

                this._listeners.push({ type: typeStr, listener: listenerFunc });
            };

            EventDispatcher.prototype.removeEventListener = function (typeStr, listenerFunc) {
                for (var i = 0; i < this._listeners.length; i++) {
                    if (this._listeners[i].type === typeStr && this._listeners[i].listener === listenerFunc) {
                        this._listeners.splice(i, 1);
                    }
                }
            };

            EventDispatcher.prototype.dispatchEvent = function (evt) {
                for (var i = 0; i < this._listeners.length; i++) {
                    if (this._listeners[i].type === evt.getType()) {
                        this._listeners[i].listener.call(this, evt);
                        //this._listeners[i].listener(evt);
                    }
                }
            };
            return EventDispatcher;
        })();
        Events.EventDispatcher = EventDispatcher;
    })(DEJS.Events || (DEJS.Events = {}));
    var Events = DEJS.Events;
})(DEJS || (DEJS = {}));