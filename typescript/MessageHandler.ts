class MessageHandler {
  tab: chrome.tabs.Tab;
  repo: Repo;

  constructor() {
    this.repo = new Repo();
    this.hookListener();
  }

  private hookListener(): void {
    chrome.runtime.onMessage.addListener((msg: any, sender: chrome.runtime.MessageSender) => {
      console.log("[MessageHandler]: Received message of type:", EMessageType[msg.type], "with payload", msg.payload, "sent by", sender);

      switch (msg.type) {
        case EMessageType.DocumentReady:
          //todo do stuff
          break;

        case EMessageType.DiscussionDone:
          let payload = msg.payload as IDiscussionDonePayload;
          if (payload.status == EDiscussionStatus.DoneForNow) {

          }
          else {

          }
          this.repo.discussions.saveById(payload.discussion.id, payload.discussion);
          break;
      }


      this.continue(msg, sender);
    });
  }

  protected sendMessage(msg: IMessage): void {
    console.log("[MessageHandler]: Sending message of type:", EMessageType[msg.type], msg.payload);
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


  switchToMessageHandler() {

  }





}
