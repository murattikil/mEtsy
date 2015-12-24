var Background = (function () {
    function Background() {
        this.db = new Database();
        this.init();
    }
    Background.prototype.init = function () {
        chrome.runtime.onMessage.addListener(this.msgHandler);
    };
    Background.prototype.msgHandler = function (message, sender, sendResponse) {
        var p = new Promise(function (resolve, reject) {
            switch (message.type) {
                case "itemFave":
                    this.handleItemFave(message.payload, resolve);
                    break;
                default:
                    break;
            }
        });
        p.then(sendResponse("success"));
    };
    Background.prototype.handleItemFave = function (payload, resolve) {
    };
    return Background;
})();
