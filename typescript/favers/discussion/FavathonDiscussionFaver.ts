class FavathonDiscussionFaver extends BaseDiscussionFaver {
  private itemFaver: ItemFaver;

  //inherited
  //protected discussion: DiscussionDTO;

  //setting: the rule of Favathon is to unfave any item that we have faved in the past, then refave it.
  private unfaveBeforeFave: boolean = true;

  constructor(protected taskDto: TaskDTO) {
    super(taskDto);
    this.itemFaver = new ItemFaver();
  }

  do(): Promise<boolean> {
    return this.favePage();
  }

  private favePage(): Promise<boolean> {
    let $undonePosts = this.getUndonePosts();

    if (this.unfaveBeforeFave) {
      return this.togglePosts($undonePosts, EFaveState.Unfaved).then(() => {
        return new Promise<boolean>((resolve, reject) => {
          console.info("[FavathonDiscussionFaver]:", Utils.timestamp(), "Will fave the unfaved buttons in few seconds.");
          setTimeout(() => {
            console.info("[FavathonDiscussionFaver]:", Utils.timestamp(), "Starting faving unfaved.");
            return this.togglePosts($undonePosts, EFaveState.Faved).then(resolve);
          }, Globals.delayAfterPageLoad);
        });
      });
    }
    else {
      return this.togglePosts($undonePosts, EFaveState.Faved);
    }
  }

  private togglePosts($posts: JQuery[], toState: EFaveState): Promise<boolean> {
    console.trace();
    return $posts.reduce((sequence, post) => {
      // Add these actions to the end of the sequence
      return sequence.then((res) => {
        if (res) {
          return this.togglePost($(post), toState);
        }
        else {
          return false;
        }
      });
    }, Promise.resolve(true));
  }

  private togglePost($post: JQuery, toState: EFaveState): Promise<boolean> {
    let state: EFaveState;
    state = toState == EFaveState.Unfaved ? EFaveState.Faved : EFaveState.Unfaved;

    let $buttons = this.getButtonsFromPost($post, state);
    if ($buttons.length == 0) {
      if (toState == EFaveState.Faved) {
        return this.saveLastPostToDb($post).then(() => {
          return true;
        })
      }
      return Promise.resolve(true);
    }
    else {
      return this.itemFaver.toggleButtons($buttons, toState == EFaveState.Faved).then((successfullyFavedAllButtons) => {
        if (successfullyFavedAllButtons) {
          //we were able to fave all the buttons in this post.
          //we save the post, and we return true, so upper cycle will know to coninue to next post
          if (toState == EFaveState.Faved) {
            return this.saveLastPostToDb($post).then(() => {
              return true;
            });
          }
          return true;
        }
        else {
          //we were not able to fave all the buttons in this post.
          //the post will not be saved, and we return false to break the cycle
          //(no worries, we will restart it later from last saved post)
          return false;
        }
      });
    }
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
