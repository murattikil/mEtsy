class Utils {

  constructor(private globals: Globals) {

  }

  static gotoUrl(url: string) {
    window.location.href = url;
  }

  static getUserFromPageUrl() {
    var re = /[^\/]+\/([^\/]+)/;
    var user = window.location.pathname.match(re)[1];
    return user;
  }

  static whereAreWe(url?: string) {
    url = url || window.location.href;
    if (url.indexOf("/favorites/items-for-you") > 0) {
      return "items-for-you";
    }
    else if (url.indexOf("/favorites/items-i-love") > 0) {
      //example: https://www.etsy.com/people/apocketofposies/favorites/items-i-love
      //someone's favorites
      //Items I Love is the default list of faves. User can add more lists like this.
      return "items-i-love";
    }
    else if (url.indexOf("/teams/") > 0) {
      return "teams";
    }
    else {
      //not implemented
      return "not implemented";
    }
  }

  static randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static newId(): string {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static timestamp(): string {
    return moment().format("HH:mm:ss");
  }
}
