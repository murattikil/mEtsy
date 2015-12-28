var MessageHandler = (function () {
    function MessageHandler() {
        this.hookListener();
    }
    MessageHandler.prototype.continue = function (msg, sender) {
    };
    MessageHandler.prototype.hookListener = function () {
        var _this = this;
        chrome.runtime.onMessage.addListener(function (msg, sender) {
            console.log("[MessageHandler]: Received message of type:", IRuntimeMessageType[msg.type], "with payload", msg.payload, "sent by", sender);
            _this.continue(msg, sender);
        });
    };
    MessageHandler.prototype.sendMessage = function (msg) {
        console.log("[MessageHandler]: Sending message of type:", IRuntimeMessageType[msg.type], msg.payload);
        if (this.getType() == "Content") {
            chrome.runtime.sendMessage(msg);
        }
        else if (this.getType() == "Background") {
            chrome.tabs.sendMessage(this.tab.id, msg);
        }
    };
    MessageHandler.prototype.getType = function () {
        return "MessageHandler";
    };
    return MessageHandler;
})();
