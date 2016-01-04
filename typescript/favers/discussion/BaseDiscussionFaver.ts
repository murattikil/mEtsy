class BaseDiscussionFaver {
  constructor(protected discussion: DiscussionDTO) {

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

  getDiscussionCreationMoment() : moment.Moment {
    let text = $(".first-post .foot.last a").first().text();

    //return moment(text, "HH:mm a MMM D, YYYY Z");

    return moment(text);
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
}
