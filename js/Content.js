var Content = (function () {
    function Content() {
        this.db = new Database();
        this.init();
    }
    Content.prototype.init = function () {
        chrome.runtime.onMessage.addListener(this.msgHandler);
    };
    Content.prototype.msgHandler = function (message, sender, sendResponse) {
    };
    Content.prototype.sendMessage = function (type, payload) {
        chrome.runtime.sendMessage({ type: type, payload: payload }, function (response) {
            console.log(response.farewell);
        });
    };
    return Content;
})();
console.log("Loaded Contents");
var crawler = new Crawler();
crawler.start();
