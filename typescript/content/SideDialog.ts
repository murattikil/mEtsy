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
    });
  }

  private hookContentMenuEvents(): void {
    var $cm = $(".content-menu");
    $cm.find("#btn-start").click(() => {
      this.sendStart();
    });
    $cm.find("#btn-insert-test-task").click(() => {
      this.repo.tasks.insertTest().then(() => {
        $cm.find("#msg").text(Utils.timestamp() + " Inserted test task");
      })
    });
    this.hookFavesTrackChanged();
  }

  public hookFavesTrackChanged() {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      var favesTrackChange = changes["favesTrack"];
      if (favesTrackChange) {
        let newValue: IFavesTrack = JSON.parse(favesTrackChange.newValue);
        $("#lblFavesThisHour").text(Mustache.render("Faves this hour {{ count }}/{{ max }}", { count: newValue.count, max: Globals.maxFavesPerHour }));
      }
    });
  }

  private sendStart() {
    let msg = <IMsg> { type: "event.btnStartClicked" };
    chrome.runtime.sendMessage(msg);
  }
}
