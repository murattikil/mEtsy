/// <reference path="../../../typings/purl/purl-jquery.d.ts"/>

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
    if (window.location.href != this.discussion.lastPost.url) {
      window.location.href = this.discussion.lastPost.url;
    }
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

  protected done(hitEndOfPages: boolean) {
    let now = moment();
    if (hitEndOfPages && now.hour() >= 23) {
      this.fireDoneForever();
    }
    else {
      this.fireDoneForNow();
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
