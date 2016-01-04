class Content extends MessageHandler {
  private messageHandler: MessageHandler;
  private task: ITask<any>;
  private repo = new Repo();

  constructor() {
    super();
    this.hookPageLoaded();
  }

  private hookPageLoaded() {
    $(document).ready(() => {
      let msg = <IMsg> { type: "event.documentReady" };
      chrome.runtime.sendMessage(msg);
    });
  }

  continue() {
    this.repo.tasks.getFirst().then((taskDto) => {
      if (taskDto) {
        switch (taskDto.type) {
          case ETaskType.Favathon:
            this.task = new Task(taskDto);

            break;

          default:
            console.log("[Content]: Unknown task type.");
        }
      }
      else {
        //there aren't any tasks
        //todo: HERE COMES THE TASK MAKING TASK!
      }
    });
  }

  private continueTask(task: ITask<any>) {
    this.task = task;
    if (this.task) {
      this.task.continue().then((res) => {
      });
    }
    else {
      //tell content to start new task
    }
  }

  public getType(): string {
    return "Content";
  }
}

var Env = "content";
console.log("[Content]: Content loaded");
var content = new Content();
