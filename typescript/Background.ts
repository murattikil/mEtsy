class Background  extends MessageHandler {
  private db: Database;
  private mode: WorkingMode;

  private teamFaver: TeamFaver;
  tab: chrome.tabs.Tab;

  constructor() {
    super();
  }

  public start() {
    console.log("[Background]: Starting.");
    console.trace();
    switch (this.mode) {
      case WorkingMode.TeamFaving:
        // this.teamFaver = new TeamFaver();
        // this.teamFaver.start();
        break;

      case WorkingMode.ItemsForYou:
        //todo;
        break;

      case WorkingMode.ItemsILove:
        //todo;
        break;

      default:
        this.decideWorkingMode().then((workingMode) => {
          this.mode = workingMode;
          this.start();
        })
        break;
    }
  }

  public continue(msg: IRuntimeMessage, sender: chrome.runtime.MessageSender) {
    this.tab = sender.tab;
    switch (this.mode) {
      case WorkingMode.TeamFaving:
        if (this.teamFaver) {
          // this.teamFaver.start();
        }
        else {
          this.teamFaver = new TeamFaver();
          // this.teamFaver.start();
        }
        let reply: IRuntimeMessage = {
          type: IRuntimeMessageType.TeamFaver,
          payload: {
            teamFaver: this.teamFaver
          }
        };
        this.sendMessage(reply);
        break;

      case WorkingMode.TeamGathering:
        //todo
        break;

      case WorkingMode.ItemsForYou:
        //todo
        break;

      case WorkingMode.ItemsILove:
        //todo
        break;

      default:
        this.decideWorkingMode().then((workingMode) => {
          this.mode = workingMode;
          this.start();
        });
        break;
    }
  }

  // private setWorkingMode(mode: CrawlingMode) {
  //   Database.setCrawlingMode(mode).then<WorkingMode>(() => {
  //     //don't have to do anything
  //   });
  // }

  public decideWorkingMode(): Promise<WorkingMode> {
    return new Promise<WorkingMode>((resolve, reject) => {
      Database.canFaveMoreItems().then((result) => {
        //todo: Add more constraints when we can be in teams mode
        if (result) {
          resolve(WorkingMode.TeamFaving);
          return;
        }
      });
      Database.canFaveItemsForYou().then((result) => {
        if (result) {
          resolve(WorkingMode.ItemsForYou)
          return;
        }
      });
      Database.canFaveMoreItems().then((result) => {
        if (result) {
          resolve(WorkingMode.ItemsILove)
          return;
        }
      });
    });
  }

  public getType() : string{
    return "Background";
  }
}

console.log("[Background]: Background loaded");
var bg = new Background();
