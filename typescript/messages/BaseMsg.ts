class BaseMsg {
  send() {
    chrome.runtime.sendMessage(this);
  }
}
