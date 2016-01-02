var listingsTest = {
  listings: [{
    id: "1",
    url: "http://test1.com"
  }, {
    id: "2",
    url: "http://test2.com"
  }]
}



var listingsTest = {
  listings: {
    a: {
      id: "5",
      url: "http://test1.com"
    },
    b: {
      id: "2",
      url: "http://test2.com"
    }
  }
}

chrome.storage.local.set(listingsTest, function() {});

chrome.storage.local.get("listings", function(result) {
  console.log("Listings:", result);
})
