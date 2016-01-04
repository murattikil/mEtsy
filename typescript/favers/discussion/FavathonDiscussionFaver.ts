class FavathonDiscussionFaver extends BaseDiscussionFaver {
  private itemFaver: ItemFaver;
  private $containers: JQuery[];

  //inherited
  //protected discussion: DiscussionDTO;

  //setting: the rule of Favathon is to unfave any item that we have faved in the past, then refave it.
  private unfaveBeforeFave: boolean = true;

  private repo = new Repo();

  constructor(protected discussion: DiscussionDTO) {
    super(discussion);
    this.itemFaver = new ItemFaver();

    this.navigateToLastPost();
  }

  do(): Promise<void> {
    return this.favePage().then((status) => {

    });
  }

  favePage(): Promise<boolean> {
    this.$containers = this.getUndonePosts();

    if (this.unfaveBeforeFave) {
      return this.itemFaver.toggleButtons(this.getFaveButtons(EFaveState.Faved), false).then(() => {
        return this.faveUnfaved();
      });
    }
    else {
      return this.faveUnfaved();
    }
  }

  private faveUnfaved(): Promise<boolean> {
    return this.itemFaver.toggleButtons(this.getFaveButtons(EFaveState.Unfaved), true).then((allOk) => {
      if (!allOk) {
        return false;
      }
      else if (!this.goNextPage()) {
        return true;
      }
      else {
        return false;
      }
    });
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

  public submitMyPost() {
    let $textbox = $("#new-post-form").find("textarea");
    let $submit = $("#new-post-form").find("input[type='submit']");

    if ($textbox.length > 1) {
      let content = "";
      this.repo.listings.getRandom(3).then((items: ListingDTO[]) => {
        _.each(items, (item: ListingDTO) => {
          content += item.url + "\n\n";
        });
        $textbox.val(content);
        if (confirm("Should I submit my post now?")) {
          $submit.click();
        }
        //todo: page will refresh? if it doesn't wrap this ode in a promise and return success.
      });
    }

  }
}
