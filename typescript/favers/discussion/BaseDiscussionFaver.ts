class BaseDiscussionFaver {
  discussion: DiscussionDTO;
  task: TaskDTO;
  repo = new Repo();

  constructor(taskDto: TaskDTO) {
    this.task = taskDto;
    this.discussion = this.task.discussion;
  }

  isLastPage(): boolean {
    return !this.goNextPage(true);
  }

  goNextPage(onlyTest?: boolean): boolean {
    //onlyTest return false if there are no more pages to go to, otherwise true, but won't change the page
    var $current = $(".pager .pages a.current-page");
    let $next = $current.parent().next().find("a");

    if ($next.length > 0) {
      if (!onlyTest) {
        window.location.href = $next.attr("href");
      }
      return true;
    }
    else {
      return false;
    }
  }

  getDiscussionCreationMoment(): moment.Moment {
    let text = $(".first-post .foot.last a").first().text();

    //return moment(text, "HH:mm a MMM D, YYYY Z");

    return moment(text);
  }

  public navigateToThisDiscussion() {
    if (window.location.href.indexOf(this.discussion.url) == -1) {
      let url = this.discussion.lastPost.url;
      Utils.gotoUrl(url);
      return true;
    }
    return false;
  }

  public navigateToLastPost(): boolean {
    let url = "";
    if (this.discussion.lastPost && this.discussion.lastPost.url) {
      url = this.discussion.lastPost.url;
    }
    else {
      url = this.discussion.url;
    }

    if (window.location.href != url) {
      Utils.gotoUrl(url);
      return true;
    }
    return false;

    //todo: What if the post does not exist? What url we get in window.location? The extension will cycle indefinitely then.
  }

  protected getPostDto($post: JQuery): DiscussionPostDTO {
    let $a = $post.find(".foot a");
    let purl = $a.url();

    let postId = purl.param("post_id");
    let postUrl = purl.attr("source");

    if (postId == "" || postId == null || (typeof postId == 'undefined')) {
      return null;
    }

    if (postUrl[0] == "/") {
      postUrl = purl.attr("base") + purl.attr("source")
    }

    let lastPost = new DiscussionPostDTO(postId, postUrl);
    return lastPost;
  }

  protected saveLastPostToDb($post: JQuery): Promise<void> {
    let postDto = this.getPostDto($post);

    debugger
    if (postDto) {
      this.task.discussion.lastPost = postDto;
    }
    return this.repo.tasks.saveById(this.task.id, this.task);
  }

  protected getButtonsFromPost($post: JQuery, state: EFaveState): JQuery[] {
    let $buttons: JQuery[] = [];
    if (state == EFaveState.Unfaved) {
      $buttons = $post.find(".button-fave").not(".favorited-button").get();
      console.log("[BaseDiscussionFaver]: Found", $buttons.length, "unfaved in post", $post);
    }
    else if (state == EFaveState.Faved) {
      $buttons = $post.find(".button-fave.favorited-button").get();
      console.log("[BaseDiscussionFaver]: Found", $buttons.length, "faved in post", $post);
    }
    return $buttons;
  }

  protected getUndonePosts(): JQuery[] {
    let $posts = $(".forum-post").get() as HTMLElement[];
    let $result = [] as JQuery[];

    let $undone: HTMLElement[];

    if (this.discussion.lastPost && this.discussion.lastPost.id) {
      $undone = _.takeRightWhile($posts, (post) => {
        return $(post).attr("rel") != this.discussion.lastPost.id;
      });
      $undone.push(_.find($posts, (post) => {
        return post.id == this.discussion.lastPost.id;
      }));
    }
    else {
      $undone = $posts;
    }

    return _.map($undone, (htmlElement) => {
      return $(htmlElement);
    })
  }
}
