var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        _super.call(this);
    }
    Background.prototype.start = function () {
        var _this = this;
        console.log("[Background]: Starting.");
        console.trace();
        switch (this.mode) {
            case WorkingMode.TeamFaving:
                break;
            case WorkingMode.ItemsForYou:
                break;
            case WorkingMode.ItemsILove:
                break;
            default:
                this.decideWorkingMode().then(function (workingMode) {
                    _this.mode = workingMode;
                    _this.start();
                });
                break;
        }
    };
    Background.prototype.continue = function (msg, sender) {
        var _this = this;
        this.tab = sender.tab;
        switch (this.mode) {
            case WorkingMode.TeamFaving:
                if (this.teamFaver) {
                }
                else {
                    this.teamFaver = new TeamFaver();
                }
                var reply = {
                    type: IRuntimeMessageType.TeamFaver,
                    payload: {
                        teamFaver: this.teamFaver
                    }
                };
                this.sendMessage(reply);
                break;
            case WorkingMode.TeamGathering:
                break;
            case WorkingMode.ItemsForYou:
                break;
            case WorkingMode.ItemsILove:
                break;
            default:
                this.decideWorkingMode().then(function (workingMode) {
                    _this.mode = workingMode;
                    _this.start();
                });
                break;
        }
    };
    Background.prototype.decideWorkingMode = function () {
        return new Promise(function (resolve, reject) {
            Database.canFaveMoreItems().then(function (result) {
                if (result) {
                    resolve(WorkingMode.TeamFaving);
                    return;
                }
            });
            Database.canFaveItemsForYou().then(function (result) {
                if (result) {
                    resolve(WorkingMode.ItemsForYou);
                    return;
                }
            });
            Database.canFaveMoreItems().then(function (result) {
                if (result) {
                    resolve(WorkingMode.ItemsILove);
                    return;
                }
            });
        });
    };
    Background.prototype.getType = function () {
        return "Background";
    };
    return Background;
})(MessageHandler);
console.log("[Background]: Background loaded");
var bg = new Background();
