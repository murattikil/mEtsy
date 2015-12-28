class MessageHandler {
  tab: chrome.tabs.Tab;

  constructor() {
    this.hookListener();
  }

  continue(msg: IRuntimeMessage, sender: chrome.runtime.MessageSender) {

  }

  private hookListener(): void {
    chrome.runtime.onMessage.addListener((msg: any, sender: chrome.runtime.MessageSender) => {
      console.log("[MessageHandler]: Received message of type:", IRuntimeMessageType[msg.type], "with payload", msg.payload, "sent by", sender);
      this.continue(msg, sender);
    });
  }

  protected sendMessage(msg: IRuntimeMessage): void {
    console.log("[MessageHandler]: Sending message of type:", IRuntimeMessageType[msg.type], msg.payload);
    if (this.getType() == "Content") {
      chrome.runtime.sendMessage(msg);
    }
    else if (this.getType() == "Background") {
      chrome.tabs.sendMessage(this.tab.id, msg);
    }
  }

  protected getType(): string {
    return "MessageHandler";
  }
}
