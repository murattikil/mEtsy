class Helpers {
  globals = new Globals();

  gotoUrl(url: string) {
    window.location.href = url;
  }

  getUserFromPageUrl() {
    var re = /[^\/]+\/([^\/]+)/;
    var user = window.location.pathname.match(re)[1];
    return user;
  }
}
