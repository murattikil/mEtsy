var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Content = (function (_super) {
    __extends(Content, _super);
    function Content() {
        this.hookPageLoaded();
        _super.call(this);
    }
    Content.prototype.hookPageLoaded = function () {
        var _this = this;
        $(document).ready(function () {
            _this.sendMessage({
                type: IRuntimeMessageType.DocumentReady,
                payload: {}
            });
        });
    };
    Content.prototype.continue = function (msg, sender) {
        switch (msg.type) {
            case IRuntimeMessageType.TeamFaver:
                var teamFaver = new TeamFaver();
                teamFaver.start();
                break;
            default:
                break;
        }
    };
    Content.prototype.getType = function () {
        return "Content";
    };
    return Content;
})(MessageHandler);
console.log("[Content]: Content loaded");
var content = new Content();
