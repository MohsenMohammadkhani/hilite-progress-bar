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
let hiliteProgressBarBudgetMarkerImgLeft;
let isMouseDownHiliteProgressBarBudgetMarker = false;

const hiliteProgressBarBudgetMarkerGreenRightCircle = document.querySelector(
  ".hilite-progress-bar-budget-marker-green-circle.right-circle"
);
const resetButton = document.querySelector("#reset");

let currentWidthPercentHiliteProgressBarBudgetGreenBar;
let offsetHiliteProgressBarBudgetMarkerImg = [0];

function setValueInProgressBar(newValue) {
  progressBar.style.width = newValue + "%";
}

resetButton.addEventListener("click", () => {
  hiliteProgressBarBudgetMarkerImg.style.left = "200px";
});

//==============================
// start darg market on desktop

hiliteProgressBarBudgetMarkerImg.addEventListener(
  "mousedown",
  function (e) {
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
    if (isMouseDownHiliteProgressBarBudgetMarker) {
      const hiliteProgressBarBudgetMarkerImgStyleLeft =
        e.clientX + offsetHiliteProgressBarBudgetMarkerImg[0];
      // setText(
      //   "current-market",
      //   " = " + hiliteProgressBarBudgetMarkerImgStyleLeft + "px"
      // );
      // setText(
      //   "right-circle",
      //   " = " + hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft + "px"
      // );

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
    }
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

let active = false;
let currentX;
let initialX;
let xOffset = 0;

function dragMobileStart(e) {
  initialX = e.touches[0].clientX - xOffset;
  if (e.target === hiliteProgressBarBudgetMarkerImg) {
    active = true;
  }
}

function dragMobileEnd() {
  initialX = currentX;
  active = false;
}

function dragMobile(e) {
  if (!active) {
    return;
  }
  e.preventDefault();
  currentX = e.touches[0].clientX - initialX;

  xOffset = currentX;

  if (checkMarketWantsMoveFromBorderMobile(currentX)) {
    return;
  }

  setText("current-market", " = " + currentX + "px");
  changeProgressBarValue(currentX);
  hiliteProgressBarBudgetMarkerImg.style.left = currentX + "px";
}

const checkMarketWantsMoveFromBorderMobile = (currentX) => {
  if (currentX < -5) {
    return true;
  }

  if (hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft + 5 < currentX) {
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
