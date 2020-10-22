import project from "./project.js";
import row from "./row.js";
import ScrollBooster from "../node_modules/scrollbooster/src/index.js";

const left = document.querySelector(".left");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"];
const datePos = document.querySelector(".mig-today").getBoundingClientRect().x;
const today = new Date();
let weekday = today.toLocaleString("default", { weekday: "short" });
let mm = today.toLocaleString("default", { month: "short" });
let dd = today.getDate();
const setDate = () => {
  document.querySelector('.mig-today-date > span').innerHTML = weekday + ', ' + mm + ' ' + dd;
}


const setOpacity = (e) => {
  const opacity = Math.min(
    Math.max((300 - parseInt(e.position.x)) / 300, 0),
    1
  );
  const scale = opacity * (1 - 0.95) + 0.95;

  left.style.opacity = opacity;
  left.style.transform = `scale(${scale})`;
};

export default function (options = {}) {
  let parent = null;
  const projects = [];
  let opts = {};

  const setup = () => {
    const defaults = {};
    opts = Object.assign(defaults, options);

    if (options.parent) init(options.parent);
  };

  const init = (newParent) => {
    parent = newParent;
    const projects = generateProjects();
    render(projects);
    addEventListeners();
    setDate();
    setMilestones();
    setPausePattern();
    milestoneHover();
  };

  const setMilestones = () => {
    const parent = document.querySelectorAll('.mig-time');

    //Loops through each bar that is created
    for (let i = 0; i < parent.length; ++i) {
      const width = parent[i].offsetWidth;
      const starCount = Math.floor((width - 16 - 88) / 132);

      //Creates the middle milestone markers
      for (let j = 1; j < starCount; ++j) {
        let phaseText = parent[i].querySelector("div").innerText;
        let tooltipText = "";
        if (phaseText === 'SD') {
          tooltipText = "Preliminary drawings";
        } else if (phaseText === 'DD') {
          tooltipText = "Outline specification"
        } else if (phaseText === 'CD') {
          tooltipText = "Permit approval"
        } else if (phaseText === 'BID') {
          tooltipText = "Drawings and specs"
        } else if (phaseText === 'CA') {
          tooltipText = "Field observation report"
        }
        const midMarker = document.createElement("div");
        const leftPos = String((j * width / starCount) - 22);
        midMarker.classList.add("mig-time-mid");
        midMarker.style.cssText = ("display: flex; justify-content: end;")
        midMarker.style.left = leftPos + 'px';
        midMarker.innerHTML = `<img src=${'../src/star.svg'} />`;
        parent[i].appendChild(midMarker);

        //Creates the tooltips
        const toolTipPos = midMarker.getBoundingClientRect().x;
        const dist = toolTipPos - datePos;
        const subToday = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const distRounded = parseInt((dist / 60).toFixed(0));
        let subDate = today.getDate() + distRounded;
        let subMonth = months[today.getMonth()];
        let subYear = today.getFullYear();
        if (Math.sign(subDate) === -1) {
          if (today.getMonth() !== 0) {
            subMonth = months[today.getMonth() - 1];
            subDate = (new Date(today.getFullYear(), today.getMonth(), 0).getDate()) + subDate;
          } else {
            subDate = (new Date(today.getFullYear(), today.getMonth(), 0).getDate()) + subDate;
            subYear = today.getFullYear() - 1;
            subMonth = months[11];
          }
        } else if (subDate > subToday) {
          if (today.getMonth() !== 11) {
            subDate = subDate - (new Date(today.getFullYear(), today.getMonth(), 0).getDate());
            subMonth = months[today.getMonth() + 1];
          } else {
            subDate = subDate - (new Date(today.getFullYear(), today.getMonth(), 0).getDate());
            subMonth = months[0];
            subYear = today.getFullYear() + 1;
          }
        }
        let fullDate = subMonth.toString() + ' ' + subDate.toString() + ', ' + subYear.toString();
        const toolTip = document.createElement("div");
        toolTip.innerHTML = `<div class='mig-tooltip-tag'>${phaseText}</div><div>${tooltipText}</div><div class='mig-tooltip-date'>${fullDate}</div>`;
        toolTip.classList.add("mig-tooltip");
        toolTip.style.display = 'block';
        parent[i].appendChild(toolTip);
        const toolTipWidth = toolTip.offsetWidth;
        parent[i].removeChild(toolTip);
        toolTip.style.display = 'none';
        toolTip.style.left = leftPos - (toolTipWidth / 2) + 22 + 'px';
        parent[i].appendChild(toolTip);
      }

      //Creates the end milestone markers
      let phaseText = parent[i].querySelector("div").innerText;
      let tooltipText = "";
      if (phaseText === 'SD') {
        tooltipText = "Drawings complete";
      } else if (phaseText === 'DD') {
        tooltipText = "Specifications complete"
      } else if (phaseText === 'CD') {
        tooltipText = "Contractor handoff"
      } else if (phaseText === 'BID') {
        tooltipText = "Negotiation finish"
      } else if (phaseText === 'CA') {
        tooltipText = "Field observation report"
      }
      const endMarker = document.createElement("div");
      endMarker.classList.add("mig-time-end");
      endMarker.style.cssText = ("display: flex; justify-content: end;")
      endMarker.innerHTML = `<img src=${'../src/star.svg'} />`;
      parent[i].appendChild(endMarker);
      //Creates the end tooltips
      const toolTipPos = endMarker.getBoundingClientRect().x;
      const dist = toolTipPos - datePos;
      const subToday = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      const distRounded = parseInt((dist / 60).toFixed(0));
      let subDate = today.getDate() + distRounded;
      let subMonth = months[today.getMonth()];
      let subYear = today.getFullYear();
      if (Math.sign(subDate) === -1) {
        if (today.getMonth() !== 0) {
          subMonth = months[today.getMonth() - 1];
          subDate = (new Date(today.getFullYear(), today.getMonth(), 0).getDate()) + subDate;
        } else {
          subDate = (new Date(today.getFullYear(), today.getMonth(), 0).getDate()) + subDate;
          subYear = today.getFullYear() - 1;
          subMonth = months[11];
        }
      } else if (subDate > subToday) {
        if (today.getMonth() !== 11) {
          subDate = subDate - (new Date(today.getFullYear(), today.getMonth(), 0).getDate());
          subMonth = months[today.getMonth() + 1];
        } else {
          subDate = subDate - (new Date(today.getFullYear(), today.getMonth(), 0).getDate());
          subMonth = months[0];
          subYear = today.getFullYear() + 1;
        }
      }
      let fullDate = subMonth.toString() + ' ' + subDate.toString() + ', ' + subYear.toString();
      const endTooltip = document.createElement("div");
      endTooltip.innerHTML = `<div class='mig-tooltip-tag'>${phaseText}</div><div>${tooltipText}</div><div class='mig-tooltip-date'>${fullDate}</div>`;
      endTooltip.classList.add("mig-tooltip");
      endTooltip.style.display = 'block';
      parent[i].appendChild(endTooltip);
      const toolTipWidth = endTooltip.offsetWidth;
      parent[i].removeChild(endTooltip);
      endTooltip.style.display = 'none';
      endTooltip.style.left = width - 8 - 22 - (toolTipWidth / 2) + 'px';
      parent[i].appendChild(endTooltip);
    }
  }

  const milestoneHover = () => {
    const allMilestones = Array.from(document.querySelectorAll('.mig-time-mid, .mig-time-end'));
    allMilestones.map((milestone) => {
      milestone.addEventListener('mouseenter', function (e) {
        e.target.nextSibling.style.display = 'block';
      });
      milestone.addEventListener('mouseleave', function (e) {
        e.target.nextSibling.style.display = 'none';
      })
    })
  }

  const setPausePattern = () => {
    const allRows = Array.from(document.querySelectorAll('.mig-row'));
    const randomRow = allRows[(Math.floor(Math.random() * allRows.length))];
    const selectFirstChild = randomRow.querySelector('.mig-bar');
    const hatchColor = selectFirstChild.querySelector('.mig-time').style.backgroundColor;

    //Set hatch pattern for all bars in the row
    const barsInRow = Array.from(randomRow.querySelectorAll('.mig-time'));
    for (let k = 0; k < barsInRow.length; ++k) {
      const hatchPattern = document.createElement("div");
      hatchPattern.classList.add("mig-time-pause")
      hatchPattern.style.backgroundColor = hatchColor;
      barsInRow[k].appendChild(hatchPattern)
    }

    //Adjust the 'left' and 'width' properties for the first bar in the random row
    barsInRow[0].querySelector('.mig-time-pause').style.borderTopLeftRadius = '0px';
    barsInRow[0].querySelector('.mig-time-pause').style.borderBottomLeftRadius = '0px';
    barsInRow[0].querySelector('.mig-time-pause').style.width = '50%';
    barsInRow[0].querySelector('.mig-time-pause').style.left = '50%';
  }


  const generateProjects = () => {
    return Array.from({ length: 5 }, (x, i) => project(i, today));
  };

  const render = (projects) => {
    projects.map((project) => row(parent, project));
  };

  const addEventListeners = () => {
    new ScrollBooster({
      viewport: document.querySelector(".viewport"),
      content: parent,
      scrollMode: "native",
      onUpdate: (e) => setOpacity(e),
      emulateScroll: true,
    });
  };

  // -------------------------------------------
  // Public methods
  // -------------------------------------------
  setup();
  return {
    init,
  };
}
