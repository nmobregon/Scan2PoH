function addPoHLink() {
  const ethUrl = "https://etherscan.io/address/";
  const pohUrl = "https://app.proofofhumanity.id/profile/";
  const etherScanUrl = "https://etherscan.io";
  const isEtherScanLocation = window.location.href.startsWith(etherScanUrl);
  const replaceable = ethUrl.replace(
    isEtherScanLocation ? etherScanUrl : "",
    ""
  );

  (document.querySelectorAll("a") ?? []).forEach((el) => {
    const link = el.getAttribute("href");
    if (
      link?.startsWith(ethUrl) ||
      (isEtherScanLocation && link?.startsWith("/address/"))
    ) {
      const pohImg = document.createElement("IMG");
      pohImg.setAttribute(
        "src",
        "https://app.proofofhumanity.id/images/governance.png"
      );
      pohImg.setAttribute("style", "width: 32px;height:32px;");
      const pohElement = document.createElement("A");
      pohElement.setAttribute("target", "_blank");
      pohElement.setAttribute(
        "title",
        "Check for this address in Proof of Humanity"
      );
      pohElement.setAttribute("href", link.replace(replaceable, pohUrl));
      pohElement.appendChild(pohImg);
      el.parentElement.insertBefore(pohElement, el.nextSibling);
    }
  });
}

// Init Chrome extension
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addPoHLink,
  });
});
