const progressBar = document.querySelector("#hilite-progress-bar-budget div");
const hiliteProgressBarBudget = document.querySelector(
  "#hilite-progress-bar-budget"
);
const hiliteProgressBarBudgetWidth = hiliteProgressBarBudget.offsetWidth;
const hiliteProgressBarBudgetGreenBar = document.querySelector(
  "#hilite-progress-bar-budget div.progress-bar"
);
const hiliteProgressBarBudgetMarkerImgContainer = document.querySelector(
  "#hilite-progress-bar-budget-marker"
);
const hiliteProgressBarBudgetMarkerImg = document.querySelector(
  "#hilite-progress-bar-budget-marker img "
);
const hiliteProgressBarBudgetMarkerGreenRightCircle = document.querySelector(
  ".hilite-progress-bar-budget-marker-green-circle.right-circle"
);
const resetButton = document.querySelector("#reset");

let currentWidthPercentHiliteProgressBarBudgetGreenBar;
let offsetHiliteProgressBarBudgetMarkerImg = [0];
let hiliteProgressBarBudgetMarkerImgLeft;
let isMouseDownHiliteProgressBarBudgetMarker = false;
let activeInMobileInMobile = false;
let currentXMobile;
let initialXMobile;
let xOffsetMobile = 0;

function setValueInProgressBar(newValue) {
  progressBar.style.width = newValue + "%";
}

//==============================
// start darg market on desktop

hiliteProgressBarBudgetMarkerImg.addEventListener(
  "mousedown",
  function (e) {
    e.preventDefault();
    isMouseDownHiliteProgressBarBudgetMarker = true;
    offsetHiliteProgressBarBudgetMarkerImg = [
      hiliteProgressBarBudgetMarkerImg.offsetLeft - e.clientX,
    ];
  },
  true
);

document.addEventListener(
  "mouseup",
  function () {
    isMouseDownHiliteProgressBarBudgetMarker = false;
  },
  true
);

document.addEventListener(
  "mousemove",
  function (e) {
    e.preventDefault();
    if (!isMouseDownHiliteProgressBarBudgetMarker) {
      return;
    }

    const hiliteProgressBarBudgetMarkerImgStyleLeft =
      e.clientX + offsetHiliteProgressBarBudgetMarkerImg[0];
    if (
      checkMarketWantsMoveFromBorderDesktop(
        hiliteProgressBarBudgetMarkerImgStyleLeft
      )
    ) {
      isMouseDownHiliteProgressBarBudgetMarker = false;
      return;
    }

    changeProgressBarValue(hiliteProgressBarBudgetMarkerImgStyleLeft);
    hiliteProgressBarBudgetMarkerImg.style.left =
      hiliteProgressBarBudgetMarkerImgStyleLeft + "px";
  },
  true
);

const checkMarketWantsMoveFromBorderDesktop = (
  hiliteProgressBarBudgetMarkerImgStyleLeft
) => {
  if (hiliteProgressBarBudgetMarkerImgStyleLeft <= -10) {
    return true;
  }
  if (
    hiliteProgressBarBudgetMarkerImgStyleLeft >=
    hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft + 5
  ) {
    return true;
  }
  return false;
};
// end darg market on desktop
//==============================

//==============================
// start darg market on mobile

hiliteProgressBarBudgetMarkerImgContainer.addEventListener(
  "touchstart",
  dragMobileStart,
  false
);
hiliteProgressBarBudgetMarkerImgContainer.addEventListener(
  "touchend",
  dragMobileEnd,
  false
);
hiliteProgressBarBudgetMarkerImgContainer.addEventListener(
  "touchmove",
  dragMobile,
  false
);

function dragMobileStart(e) {
  initialXMobile = e.touches[0].clientX - xOffsetMobile;
  if (e.target === hiliteProgressBarBudgetMarkerImg) {
    activeInMobile = true;
  }
}

function dragMobileEnd() {
  initialXMobile = currentXMobile;
  activeInMobile = false;
}

function dragMobile(e) {
  if (!activeInMobile) {
    return;
  }
  e.preventDefault();
  currentXMobile = e.touches[0].clientX - initialXMobile;

  xOffsetMobile = currentXMobile;

  if (checkMarketWantsMoveFromBorderMobile(currentXMobile)) {
    return;
  }

  changeProgressBarValue(currentXMobile);
  hiliteProgressBarBudgetMarkerImg.style.left = currentXMobile + "px";
}

const checkMarketWantsMoveFromBorderMobile = (currentXMobile) => {
  if (currentXMobile < -5) {
    return true;
  }

  if (
    hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft + 5 <
    currentXMobile
  ) {
    return true;
  }
  return false;
};

// end darg market on mobile
//==============================

const changeProgressBarValue = (newValue) => {
  const newValuePercent = (newValue * 100) / hiliteProgressBarBudgetWidth;
  currentWidthPercentHiliteProgressBarBudgetGreenBar =
    hiliteProgressBarBudgetGreenBar.style.width.replace("%", "");
  setValueInProgressBar(newValuePercent);
};

const setText = (id, text) => {
  document.querySelector("#" + id).textContent = text;
};
