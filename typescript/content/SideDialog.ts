class SideDialog {

  repo = new Repo();

  constructor() {
    this.showMenu();
  }

  private showMenu(): void {
    $.get(chrome.extension.getURL('/views/content.html'), (data) => {
      $($.parseHTML(data)).appendTo('body');
      this.hookContentMenuEvents();
      this.repo.faves.getFavesCountThisHour().then((count) => {
        $("#lblFavesThisHour").text(Mustache.render("Faves this hour {{ count }}/{{ max }}", { count: count, max: Globals.maxFavesPerHour }));
      });
      this.updateTasksView();
      this.makeDatabaseButtons();
    });
  }

  private hookContentMenuEvents(): void {
    var $cm = $(".content-menu");
    $cm.find("#btn-start").click(() => {
      content.continue();
    });
    $cm.find("#btn-insert-test-task").click(() => {
      this.repo.tasks.insertTest().then(() => {
        $cm.find("#msg").text(Utils.timestamp() + " Inserted test task");
      })
    });
    this.hookStorageChanges();
  }

  public hookStorageChanges() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      var favesTrackChange = changes["favesTrack"];
      if (favesTrackChange) {
        let newValue: IFavesTrack = JSON.parse(favesTrackChange.newValue);
        $("#lblFavesThisHour").text(Mustache.render("Faves this hour {{ count }}/{{ max }}", { count: newValue.count, max: Globals.maxFavesPerHour }));
      }

      var tasksChange = changes["tasks"];
      if (tasksChange) {
        this.updateTasksView();
      }
    });
  }

  private updateTasksView() {
    this.repo.tasks.getAll().then((tasks) => {
      let $tasks = $("#tasks");
      $tasks.html("<br>");
      _.each(tasks, (t) => {
        $tasks.append("- " + ETaskType[t.type] + "<br>");
      });
      $tasks.append("<br>Total:" + tasks.length);
    })
  }

  private sendStart() {
    let msg = <IMsg> { type: "event.btnStartClicked" };
    chrome.runtime.sendMessage(msg);
  }

  private makeDatabaseButtons() {
    let repos = [] as any[];
    let index = 0;
    chrome.storage.local.get(null, (res) => {
      for (var key in res) {
        var repo = new BaseRepo(key);
        $("#db-buttons").append("<button> Show all " + key + "</button>");
        $("#db-buttons").find("button").last().click(() => {
          repo.getAll().then((res: any) => {
            console.log("All", key, "are", res);
          })
        });
        $("#db-buttons").append("<button> Delete all " + key + "</button>");
        $("#db-buttons").find("button").last().click(() => {
          repo.removeAll().then((res: any) => {
            console.log("All", key, "are", res);
          })
        });
        index++;
      }
    })
  }
}
