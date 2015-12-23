// Your code here...

//RULES by Etsy:
//300 faves per hour



if (enabled === true) {

  //depending on what page we are at, do some work
  if (window.location.pathname.indexOf("/favorites/items-for-you") > 0) {
    console.log("CRAWLER: I am on [Items For You] page.");
    //wait and execute
    setTimeout(favThisPage, 3000);

    //after faving is complete, go to next page
    setTimeout(function() {
      var nextPage = getNextPage();
      if (nextPage > 0)
        window.location = recommendationsUrlFormat.format(username, nextPage);
    }, 6000);
  } else if (window.location.pathname.indexOf("/favorites/items-i-love") > 0) {

      //items on our page are already faved
      setTimeout(favThisPage, 3000);
      setTimeout(function() {

      }, 6000);
    }
  } else {
    console.debug("CRAWLER: Not implemented.");
  }
} else {
  console.log("CRAWLER: Extension is disabled.");
}

function favThisPage() {
  if (!online) return;
  var buttons = $("button.btn-fave").not(".done");
  console.log("CRAWLER: Found {0} not faved items. Faving them.".format(buttons.length));
  buttons.click();
}

function getNextPage() {

}
