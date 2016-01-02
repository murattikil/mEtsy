class BaseDiscussionFaver {
  constructor(protected team: TeamDTO, protected discussion: DiscussionDTO) {

  }

  protected navigateToThisDiscussion() {
    if (window.location.href.indexOf(this.discussion.url) == -1) {
      let url = this.discussion.lastPost.url;
      Utils.gotoUrl(url);
    }
  }

  protected navigateToLastPost() {
    let url = "";
    if (this.discussion.lastPost && this.discussion.lastPost.url) {
      url = this.discussion.lastPost.url;
    }
    else {
      url = this.discussion.url;
    }

    if (window.location.href != url) {
      Utils.gotoUrl(url);
    }

    //todo: What if the post does not exist? What url we get in window.location? The extension will cycle indefinitely then.
  }

  protected updateLastPostBookmark() {
    let $post = $(".forum-post").last();
    let $a = $post.find(".foot a");
    let url = $a.url();

    let lastPost: IPost = {
      id: url.param("post_id"),
      url: url.attr("source")
    };

    //fix post url to be absolute
    if (lastPost.url[0] = "/") {
      lastPost.url = $.url().attr("base") + lastPost.url;
    }

    this.discussion.lastPost = lastPost;
  }

  protected getUndonePosts(): JQuery[] {
    let $posts = $(".forum-post").get();
    let $result = [] as JQuery[];

    let $undone: JQuery[];
    $undone = _.takeRightWhile($posts, (item) => {
      return $(item).attr("rel") != this.discussion.lastPost.id;
    });

    debugger
    return $undone;
  }

  protected goNextPage(): boolean {
    var $current = $(".pager .pages a.current-page");
    let $next = $current.parent().next().find("a");

    if ($next.length > 0) {
      window.location.href = $next.attr("href");
      return true;
    }
    else {
      return false;
    }
  }

  protected done(hitEndOfPages: boolean): EDiscussionDoneStatus {
    let now = moment();
    if (hitEndOfPages && !this.discussion.dateStarted.isSame(moment(), "day")) {
      return EDiscussionDoneStatus.DoneForever;
    }
    // else if (hitEndOfPages && now.hour() >= 23) {
    //   return EDiscussionDoneStatus.DoneForever;
    // }
    else {
      return EDiscussionDoneStatus.DoneForNow;
    }
  }

  protected fireDoneForever() {
    //this should fire event or inform background
    //todo
  }

  protected fireDoneForNow() {
    //this should fire event or inform background
    //todo
  }
}
