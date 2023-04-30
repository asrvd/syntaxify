import browser from "webextension-polyfill";

// browser.runtime.onMessage.addListener((msg) => {
//   console.log("message received from content script: ", msg.selection);
//   browser.storage.local.set({ selection: msg.selection });
// });

browser.contextMenus.create({
  id: "myContextMenu",
  title: "Explain this code",
  contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  browser.tabs.sendMessage(tab?.id as number, {
    method: "getSelection",
  });

  browser.tabs.create({
    url: browser.runtime.getURL("sty.html"),
  });
});
