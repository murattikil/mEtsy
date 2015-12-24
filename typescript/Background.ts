declare var globals: any;

class Background {
  db: Database;
  constructor() {
    this.db = new Database();
    this.init();
  }

  private init() {
    chrome.runtime.onMessage.addListener(this.msgHandler);
  }

  private msgHandler(message: any, sender: chrome.runtime.MessageSender, sendResponse) {
    var p = new Promise(function(resolve, reject) {
      switch (message.type) {
        case "itemFave":
          this.handleItemFave(message.payload, resolve);
          break;
        default:
          break;
      }
    });

    p.then(sendResponse("success"));
  }

  private handleItemFave(payload: any, resolve: any): void {
  }


}
