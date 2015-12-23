/// <reference path="../typings/chrome/chrome.d.ts"/>

class Content {
  db: Database;
  constructor() {
    this.db = new Database();


    this.init();
  }

  init() {
    chrome.runtime.onMessage.addListener(this.msgHandler);
  }

  msgHandler(message: any, sender: chrome.runtime.MessageSender, sendResponse: () => any) {

  }

  sendMessage(type, payload) {
    chrome.runtime.sendMessage({ type, payload }, function(response) {
      console.log(response.farewell);
    });
  }
}

console.log("Loaded Contents");

var crawler: Crawler = new Crawler();
crawler.start();
