var DEJS;

(function (DEJS) {
    ///<reference path="EventDispatcher.ts"/>
    (function (Events) {
        var ObjectSelectedEvent = (function (_super) {
            __extends(ObjectSelectedEvent, _super);
            function ObjectSelectedEvent(targetObj) {
                _super.call(this, DEEvents.OBJECT_SELECTED_EVENT, targetObj);
                this.obj = targetObj;
            }
            return ObjectSelectedEvent;
        })(Events.Event);
        Events.ObjectSelectedEvent = ObjectSelectedEvent;
        var ObjectDClickedEvent = (function (_super) {
            __extends(ObjectDClickedEvent, _super);
            function ObjectDClickedEvent(targetObj) {
                _super.call(this, DEEvents.OBJECT_DCLICK_EVENT, targetObj);
                this.obj = targetObj;
            }
            return ObjectDClickedEvent;
        })(Events.Event);
        Events.ObjectDClickedEvent = ObjectDClickedEvent;
        var ConfigLoadedEvent = (function (_super) {
            __extends(ConfigLoadedEvent, _super);
            function ConfigLoadedEvent(options) {
                _super.call(this, DEEvents.CONFIG_LOADED_EVENT, null);
                this.options = options;
            }
            return ConfigLoadedEvent;
        })(Events.Event);
        Events.ConfigLoadedEvent = ConfigLoadedEvent;
        var LoadStatusEvent = (function (_super) {
            __extends(LoadStatusEvent, _super);
            function LoadStatusEvent(message, completed, percentCompleted) {
                if (typeof completed === "undefined") { completed = true; }
                if (typeof percentCompleted === "undefined") { percentCompleted = 100; }
                _super.call(this, DEEvents.LOAD_STATUS_EVENT, null);
                this.message = message;
                this.completed = completed;
                this.percentCompleted = percentCompleted;
            }
            return LoadStatusEvent;
        })(Events.Event);
        Events.LoadStatusEvent = LoadStatusEvent;
        var BackgroundColorizeParsedEvent = (function (_super) {
            __extends(BackgroundColorizeParsedEvent, _super);
            function BackgroundColorizeParsedEvent(colorizeArray) {
                _super.call(this, DEEvents.BACKGROUND_COLORIZE_PARSED_EVENT, null);
                this.colorizeArray = colorizeArray;
            }
            return BackgroundColorizeParsedEvent;
        })(Events.Event);
        Events.BackgroundColorizeParsedEvent = BackgroundColorizeParsedEvent;
        var ViewPortChangedEvent = (function (_super) {
            __extends(ViewPortChangedEvent, _super);
            function ViewPortChangedEvent(viewPort, designer) {
                _super.call(this, DEEvents.VIEWPORT_UPDATE_EVENT, null);
                this.designer = designer;
                this.viewPort = viewPort;
            }
            return ViewPortChangedEvent;
        })(Events.Event);
        Events.ViewPortChangedEvent = ViewPortChangedEvent;
        var DesignerChangedEvent = (function (_super) {
            __extends(DesignerChangedEvent, _super);
            function DesignerChangedEvent(targetObj, dispatchHistory) {
                if (typeof dispatchHistory === "undefined") { dispatchHistory = true; }
                _super.call(this, DEEvents.DESIGNER_CHANGED_EVENT, targetObj);
                this.dispatchHistory = true;
                this.objectSizeChanged = false;
                this.obj = targetObj;
                this.dispatchHistory = dispatchHistory;
            }
            return DesignerChangedEvent;
        })(Events.Event);
        Events.DesignerChangedEvent = DesignerChangedEvent;
    })(DEJS.Events || (DEJS.Events = {}));
    var Events = DEJS.Events;
})(DEJS || (DEJS = {}));