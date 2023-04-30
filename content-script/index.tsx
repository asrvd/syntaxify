import browser from "webextension-polyfill";
import "./index.css";

console.log("Syntaxify loaded! Copy a code snippet to get it's explanation.");

// document.addEventListener("mouseup", function (event) {
//   var sel = window.getSelection()?.toString();
//   console.log(sel);

//   if (sel?.length)
//     browser.runtime.sendMessage({
//       action: "Hi from content script 👋",
//       selection: sel,
//     });
// });

browser.runtime.onMessage.addListener(function (request) {
  console.log(request);
  if (request.method == "getSelection") {
    var sel = window.getSelection()?.toString();
    console.log(sel);

    if (sel?.length) browser.storage.local.set({ selection: sel });
  }
});
