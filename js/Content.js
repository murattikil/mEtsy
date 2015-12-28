var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Content = (function (_super) {
    __extends(Content, _super);
    function Content() {
        _super.call(this);
        this.showMenu();
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
    Content.prototype.sendDocumentReady = function () {
        this.sendMessage({
            type: IRuntimeMessageType.DocumentReady,
            payload: {}
        });
    };
    Content.prototype.showMenu = function () {
        var _this = this;
        $.get(chrome.extension.getURL('/views/content.html'), function (data) {
            $($.parseHTML(data)).appendTo('body');
            _this.hookContentMenuEvents();
        });
    };
    Content.prototype.hookContentMenuEvents = function () {
        var _this = this;
        var $cm = $(".content-menu");
        $cm.find("#btn-start").click(function () {
            _this.sendDocumentReady();
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
