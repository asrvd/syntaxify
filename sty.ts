import browser from "webextension-polyfill";

const selection = browser.storage.local.get("selection").then((result) => {
  console.log(result);

  const paraEl = document.querySelector(".selected-text");
  const resultEl = document.querySelector(".result-text");

  if (paraEl && resultEl) {
    paraEl.textContent = result.selection;
    console.log(result.selection);
    fetch(
      `https://stx-backend.onrender.com?code=${encodeURIComponent(
        result.selection
      )}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        res.text().then((text) => {
          resultEl.textContent = text;
        });
      })
      .catch((err) => {
        resultEl.textContent = "Error: " + err;
      });
  }
});
