class FavathonDiscussionFaver extends BaseDiscussionFaver {
  private itemFaver: ItemFaver;
  private $containers: JQuery[];

  //setting: the rule of Favathon is to unfave any item that we have faved in the past, then refave it.
  private unfaveBeforeFave: boolean = true;

  constructor(protected team: TeamDTO, protected discussion: DiscussionDTO) {
    super(team, discussion);

    this.navigateToLastPost();
    this.$containers = this.getUndonePosts();

    if (this.unfaveBeforeFave) {
      this.itemFaver.toggleButtons(this.getFaveButtons(EFaveState.Faved), false).then((allOk) => {
        this.itemFaver.toggleButtons(this.getFaveButtons(EFaveState.Unfaved), true).then((allOk) => {
          if (!allOk) {
            this.done(false);
          }
          else if (!this.goNextPage()) {
            this.done(true);
          }
        })
      });
    }

    this.itemFaver.toggleButtons(this.getFaveButtons(EFaveState.Unfaved), true);


  }

  favePage() {

  }

  private getFaveButtons(state: EFaveState) {
    let $buttons: JQuery[] = [];
    if (state == EFaveState.Unfaved) {
      _.each(this.$containers, function($container: JQuery) {
        let few: JQuery[] = [];
        if (state == EFaveState.Unfaved) {
          few = $container.find(".button-fave.unfavorited-button").not(".favorited-button").get();
        }
        else if (state == EFaveState.Faved) {
          few = $container.find(".button-fave.favorited-button").get();
        }
        $buttons.concat(few);
      });
    }
    else if (state == EFaveState.Faved) {
      _.each(this.$containers, function($container: JQuery) {
        let few = $container.find(".button-fave.favorited-button").get();
        $buttons.concat(few);
      });
    }

    return $buttons;
  }

  private unfaveOnPage() {

  }
}
