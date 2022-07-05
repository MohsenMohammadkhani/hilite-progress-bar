const progressBar = document.querySelector("#hilite-progress-bar-budget div");
const hiliteProgressBarBudget = document.querySelector(
  "#hilite-progress-bar-budget"
);
const hiliteProgressBarBudgetWidth = hiliteProgressBarBudget.offsetWidth;

const hiliteProgressBarBudgetGreenBar = document.querySelector(
  "#hilite-progress-bar-budget div.progress-bar"
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
let pointXClickWidthPercent;
let interval;
let startPositionXMarket;
let offsetHiliteProgressBarBudgetMarkerImg = [0];

function increaseProgressBar(newValue) {
  if (newValue > pointXClickWidthPercent) {
    clearInterval(interval);
    return;
  }

  setValueInProgressBar(newValue);
}

function decreaseProgressBar(newValue) {
  if (newValue < pointXClickWidthPercent) {
    clearInterval(interval);
    return;
  }
  setValueInProgressBar(newValue);
}

function setValueInProgressBar(newValue) {
  progressBar.style.width = newValue + "%";
}

hiliteProgressBarBudget.addEventListener("click", hiliteProgressBarBudgetClick);
function setPointXClickWidthPercent(e) {
  const pointXClick = e.clientX - e.target.offsetLeft;
  pointXClickWidthPercent = Math.floor(
    (pointXClick * 100) / hiliteProgressBarBudgetWidth
  );
}
function hiliteProgressBarBudgetClick(e) {
  setPointXClickWidthPercent(e);
  currentWidthPercentHiliteProgressBarBudgetGreenBar =
    hiliteProgressBarBudgetGreenBar.style.width.replace("%", "");
  interval = setInterval(() => {
    if (
      pointXClickWidthPercent <
      currentWidthPercentHiliteProgressBarBudgetGreenBar
    ) {
      currentWidthPercentHiliteProgressBarBudgetGreenBar--;
      decreaseProgressBar(currentWidthPercentHiliteProgressBarBudgetGreenBar);
      return;
    }
    currentWidthPercentHiliteProgressBarBudgetGreenBar++;
    increaseProgressBar(currentWidthPercentHiliteProgressBarBudgetGreenBar);
  }, 25);
}

resetButton.addEventListener("click", () => {
  hiliteProgressBarBudgetMarkerImg.style.left = "200px";
});

//==============================
// start darg market
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
      setText(
        "current-market",
        " = " + hiliteProgressBarBudgetMarkerImgStyleLeft + "px"
      );
      setText(
        "right-circle",
        " = " + hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft + "px"
      );
      if (hiliteProgressBarBudgetMarkerImgStyleLeft <= -10) {
        isMouseDownHiliteProgressBarBudgetMarker = false;
        return;
      }
      if (
        hiliteProgressBarBudgetMarkerImgStyleLeft >=
        hiliteProgressBarBudgetMarkerGreenRightCircle.offsetLeft + 5
      ) {
        isMouseDownHiliteProgressBarBudgetMarker = false;
        return;
      }
      increaseProgressBar(hiliteProgressBarBudgetMarkerImgStyleLeft);
      hiliteProgressBarBudgetMarkerImg.style.left =
        hiliteProgressBarBudgetMarkerImgStyleLeft + "px";
    }
  },
  true
);
// end darg market
//==============================

const setText = (id, text) => {
  document.querySelector("#" + id).textContent = text;
};
