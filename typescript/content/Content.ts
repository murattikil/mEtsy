class Content {
  private task: Task;

  private repo = new Repo();
  private sideDialog = new SideDialog();

  constructor() {
    this.hookPageLoaded();
  }

  private hookPageLoaded() {
    $(document).ready(() => {
      let msg = <IMsg> { type: "event.documentReady" };
      chrome.runtime.sendMessage(msg);

      // this.continue();
    });
  }

  continue() {
    // If you always get the first task, and it can not be removed, then you will get the same task over and over again, until it happens to be able to be removed.
    // todo: get eligible task, and if there are no eligible tasks at the moment, then insert new tasks.
    this.repo.tasks.getFirst().then((taskDto) => {
      if (taskDto) {
        switch (taskDto.type) {
          case ETaskType.Favathon:
            this.task = new Task(taskDto);
            this.task.continue();

            break;

          default:
            console.log("[Content]: Unknown task type.");
        }
      }
      else {
        console.log("[Content]: There are no tasks.");
        //there aren't any tasks
        //todo: HERE COMES THE TASK MAKING TASK!
      }
    });
  }

  public getType(): string {
    return "Content";
  }
}

var Env = "content";
console.log("[Content]: Content loaded");
var content = new Content();
