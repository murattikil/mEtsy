class Background {

  tasks: ITask<any>[];
  task: ITask<any>;

  private discussionFaver: FavathonDiscussionFaver; //todo make this interface
  tab: chrome.tabs.Tab;

  constructor() {
  }

  public start() {
    console.log("[Background]: Starting.");
    console.trace();

    //todo: retrieve saved tasks from db
    //start the periodical task number checker
    //if tasks.length == 0, add the task for gathering discussions
    //when done this task should fill up this.tasks array
  }

  public receive(msg: IMsg, sender: chrome.runtime.MessageSender) {
    this.tab = sender.tab;
    var prefix = msg.type.substring(0, msg.type.indexOf("."));

    switch (prefix) {
      case "task":
        this.continueTask(msg.payload.taskId);
        break;
      case "other":
        break;
    }

  }

  private continueTask(taskId: string) {
    this.task = _.find(this.tasks, (t) => {
      return t.id == taskId;
    });
    if (this.task) {
      this.task.continue().then((res) => {
        if (res == false) {
          this.removeTask(this.task.id);
          this.startNextTask();
        }
        else {
          //nothing, tasks has sent message to content
        }
      });
    }
    else {
      //tell content to start new task
    }
  }

  removeTask(taskId: string) {
    this.tasks = _.filter(this.tasks, (t) => {
      return t.id != taskId;
    });
  }

  addTask(task: ITask<any>) {

  }

  startNextTask() {
    this.continueTask(this.tasks[0].id);
  }
}

console.log("[Background]: Background loaded");
var bg = new Background();
var Env = "background";
