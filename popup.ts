import browser from "webextension-polyfill";

browser.runtime.onMessage.addListener((msg) => {
  let text = document.querySelector(".selected-text");

  if (text) {
    text.innerHTML = msg.selection;
  }
});
