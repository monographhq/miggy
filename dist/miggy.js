var Miggy = (() => {
  var __defineProperty = Object.defineProperty;
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __markAsModule = (target) => {
    return __defineProperty(target, "__esModule", {value: true});
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defineProperty(target, name, {get: all[name], enumerable: true});
  };

  // src/index.js
  var require_src = __commonJS((exports) => {
    __export(exports, {
      default: () => src_default
    });
    const star = `
  <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.20805 13.942L3.51716 16.8142L4.60403 10.7307L0 6.42244L6.36261 5.53488L9.20805 0L12.0535 5.53488L18.4161 6.42244L13.8121 10.7307L14.8989 16.8142L9.20805 13.942Z" fill="white"/>
  </svg>
`;
    const left = document.querySelector(".left");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"];
    const datePos = document.querySelector(".mig-today").getBoundingClientRect().x;
    const today = new Date();
    let weekday = today.toLocaleString("default", {weekday: "short"});
    let mm = today.toLocaleString("default", {month: "short"});
    let dd = today.getDate();
    const setDate = () => {
      document.querySelector(".mig-today-date > span").innerHTML = weekday + ", " + mm + " " + dd;
    };
    const setOpacity = (e) => {
      const opacity = Math.min(Math.max((300 - parseInt(e.position.x)) / 300, 0), 1);
      const scale = opacity * (1 - 0.95) + 0.95;
      left.style.opacity = opacity;
      left.style.transform = `scale(${scale})`;
    };
    function src_default(options = {}) {
      let parent = null;
      const projects = [];
      let opts = {};
      const setup = () => {
        const defaults = {};
        opts = Object.assign(defaults, options);
        if (options.parent)
          init(options.parent);
      };
      const init = (newParent) => {
        parent = newParent;
        const projects2 = generateProjects();
        render4(projects2);
        addEventListeners();
        setDate();
        setMilestones();
        setPausePattern();
        milestoneHover();
      };
      const setMilestones = () => {
        const parent2 = document.querySelectorAll(".mig-time");
        for (let i = 0; i < parent2.length; ++i) {
          const width = parent2[i].offsetWidth;
          const starCount = Math.floor((width - 16 - 88) / 132);
          for (let j = 1; j < starCount; ++j) {
            let phaseText2 = parent2[i].querySelector("div").innerText;
            let tooltipText2 = "";
            if (phaseText2 === "SD") {
              tooltipText2 = "Preliminary drawings";
            } else if (phaseText2 === "DD") {
              tooltipText2 = "Outline specification";
            } else if (phaseText2 === "CD") {
              tooltipText2 = "Permit approval";
            } else if (phaseText2 === "BID") {
              tooltipText2 = "Drawings and specs";
            } else if (phaseText2 === "CA") {
              tooltipText2 = "Field observation report";
            }
            const midMarker = document.createElement("div");
            const leftPos = String(j * width / starCount - 22);
            midMarker.classList.add("mig-time-mid");
            midMarker.style.cssText = "display: flex; justify-content: end;";
            midMarker.style.left = leftPos + "px";
            midMarker.innerHTML = star;
            parent2[i].appendChild(midMarker);
            const toolTipPos2 = midMarker.getBoundingClientRect().x;
            const dist2 = toolTipPos2 - datePos;
            const subToday2 = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            const distRounded2 = parseInt((dist2 / 60).toFixed(0));
            let subDate2 = today.getDate() + distRounded2;
            let subMonth2 = months[today.getMonth()];
            let subYear2 = today.getFullYear();
            if (Math.sign(subDate2) === -1) {
              if (today.getMonth() !== 0) {
                subMonth2 = months[today.getMonth() - 1];
                subDate2 = new Date(today.getFullYear(), today.getMonth(), 0).getDate() + subDate2;
              } else {
                subDate2 = new Date(today.getFullYear(), today.getMonth(), 0).getDate() + subDate2;
                subYear2 = today.getFullYear() - 1;
                subMonth2 = months[11];
              }
            } else if (subDate2 > subToday2) {
              if (today.getMonth() !== 11) {
                subDate2 = subDate2 - new Date(today.getFullYear(), today.getMonth(), 0).getDate();
                subMonth2 = months[today.getMonth() + 1];
              } else {
                subDate2 = subDate2 - new Date(today.getFullYear(), today.getMonth(), 0).getDate();
                subMonth2 = months[0];
                subYear2 = today.getFullYear() + 1;
              }
            }
            let fullDate2 = subMonth2.toString() + " " + subDate2.toString() + ", " + subYear2.toString();
            const toolTip = document.createElement("div");
            toolTip.innerHTML = `<div class='mig-tooltip-tag'>${phaseText2}</div><div>${tooltipText2}</div><div class='mig-tooltip-date'>${fullDate2}</div>`;
            toolTip.classList.add("mig-tooltip");
            toolTip.style.display = "block";
            parent2[i].appendChild(toolTip);
            const toolTipWidth2 = toolTip.offsetWidth;
            parent2[i].removeChild(toolTip);
            toolTip.style.display = "none";
            toolTip.style.left = leftPos - toolTipWidth2 / 2 + 22 + "px";
            parent2[i].appendChild(toolTip);
          }
          let phaseText = parent2[i].querySelector("div").innerText;
          let tooltipText = "";
          if (phaseText === "SD") {
            tooltipText = "Drawings complete";
          } else if (phaseText === "DD") {
            tooltipText = "Specifications complete";
          } else if (phaseText === "CD") {
            tooltipText = "Contractor handoff";
          } else if (phaseText === "BID") {
            tooltipText = "Negotiation finish";
          } else if (phaseText === "CA") {
            tooltipText = "Field observation report";
          }
          const endMarker = document.createElement("div");
          endMarker.classList.add("mig-time-end");
          endMarker.style.cssText = "display: flex; justify-content: end;";
          endMarker.innerHTML = star;
          parent2[i].appendChild(endMarker);
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
              subDate = new Date(today.getFullYear(), today.getMonth(), 0).getDate() + subDate;
            } else {
              subDate = new Date(today.getFullYear(), today.getMonth(), 0).getDate() + subDate;
              subYear = today.getFullYear() - 1;
              subMonth = months[11];
            }
          } else if (subDate > subToday) {
            if (today.getMonth() !== 11) {
              subDate = subDate - new Date(today.getFullYear(), today.getMonth(), 0).getDate();
              subMonth = months[today.getMonth() + 1];
            } else {
              subDate = subDate - new Date(today.getFullYear(), today.getMonth(), 0).getDate();
              subMonth = months[0];
              subYear = today.getFullYear() + 1;
            }
          }
          let fullDate = subMonth.toString() + " " + subDate.toString() + ", " + subYear.toString();
          const endTooltip = document.createElement("div");
          endTooltip.innerHTML = `<div class='mig-tooltip-tag'>${phaseText}</div><div>${tooltipText}</div><div class='mig-tooltip-date'>${fullDate}</div>`;
          endTooltip.classList.add("mig-tooltip");
          endTooltip.style.display = "block";
          parent2[i].appendChild(endTooltip);
          const toolTipWidth = endTooltip.offsetWidth;
          parent2[i].removeChild(endTooltip);
          endTooltip.style.display = "none";
          endTooltip.style.left = width - 8 - 22 - toolTipWidth / 2 + "px";
          parent2[i].appendChild(endTooltip);
        }
      };
      const milestoneHover = () => {
        const allMilestones = Array.from(document.querySelectorAll(".mig-time-mid, .mig-time-end"));
        allMilestones.map((milestone) => {
          milestone.addEventListener("mouseenter", function(e) {
            e.target.nextSibling.style.display = "block";
          });
          milestone.addEventListener("mouseleave", function(e) {
            e.target.nextSibling.style.display = "none";
          });
        });
      };
      const setPausePattern = () => {
        const allRows = Array.from(document.querySelectorAll(".mig-row"));
        const randomRow = allRows[Math.floor(Math.random() * allRows.length)];
        const selectFirstChild = randomRow.querySelector(".mig-bar");
        const hatchColor = selectFirstChild.querySelector(".mig-time").style.backgroundColor;
        const barsInRow = Array.from(randomRow.querySelectorAll(".mig-time"));
        for (let k = 0; k < barsInRow.length; ++k) {
          const hatchPattern = document.createElement("div");
          hatchPattern.classList.add("mig-time-pause");
          hatchPattern.style.backgroundColor = hatchColor;
          barsInRow[k].appendChild(hatchPattern);
        }
        barsInRow[0].querySelector(".mig-time-pause").style.borderTopLeftRadius = "0px";
        barsInRow[0].querySelector(".mig-time-pause").style.borderBottomLeftRadius = "0px";
        barsInRow[0].querySelector(".mig-time-pause").style.width = "50%";
        barsInRow[0].querySelector(".mig-time-pause").style.left = "50%";
      };
      const generateProjects = () => {
        return Array.from({length: 5}, (x, i) => project_default(i, today));
      };
      const render4 = (projects2) => {
        projects2.map((project2) => row_default(parent, project2));
      };
      const addEventListeners = () => {
        new ScrollBooster({
          viewport: document.querySelector(".viewport"),
          content: parent,
          scrollMode: "native",
          onUpdate: (e) => setOpacity(e),
          emulateScroll: true
        });
      };
      setup();
      return {
        init
      };
    }
  });

  // src/render.js
  function render_default(relEl, template) {
    if (!relEl)
      return;
    const range = document.createRange();
    range.selectNode(relEl);
    const child = range.createContextualFragment(template);
    return relEl.appendChild(child);
  }

  // src/project.js
  const randomInt = (min = 2, max = 5) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  function project_default(i, date) {
    const COLORS = ["#ff0000", "#41EAD4", "#3182FB", "#FDBD2F", "#5541EA"];
    const PHASES = ["SD", "DD", "CD", "BID", "CA"];
    const setDate = () => {
      const ourDate = new Date();
      const pastDate = ourDate.getDate() - 21 - i * 3;
      ourDate.setDate(pastDate);
      return ourDate;
    };
    const spendMoney = (i2) => {
      const probability = randomInt(1, 6);
      if (probability > 4 || i2 > 2)
        return randomInt(50, 100);
      return 100;
    };
    const createPhase = (i2) => {
      return {
        abbr: PHASES[i2],
        width: randomInt(120, 600),
        money: spendMoney(i2)
      };
    };
    const setPhases = () => {
      return Array.from({length: randomInt()}, (x, i2) => createPhase(i2));
    };
    return {
      date: setDate(),
      color: COLORS[i],
      left: (5 - i) * 200 - randomInt(5, 50),
      phases: setPhases()
    };
  }

  // src/bar.js
  function bar_default(row, project, phase) {
    render_default(row, `
      <div class="mig-bar" style="flex: 0 0 ${phase.width}px;}">
        <div class="mig-money">
          <div class="mig-money-fill" style="background:${project.color};width:${phase.money}%"></div>
        </div>
        <div class="mig-time" style="background:${project.color}">
          <div class="mig-time-abbr">${phase.abbr}</div>
        </div>
        </div>
        </div>
      </div>
    `);
  }

  // src/row.js
  function row_default(parent, project) {
    const row = document.createElement("div");
    row.classList.add("mig-row");
    row.style.left = project.left + "px";
    parent.appendChild(row);
    project.phases.map((phase) => {
      bar_default(row, project, phase);
    });
  }

  // node_modules/scrollbooster/src/index.js
  const getFullWidth = (elem) => Math.max(elem.offsetWidth, elem.scrollWidth);
  const getFullHeight = (elem) => Math.max(elem.offsetHeight, elem.scrollHeight);
  const textNodeFromPoint = (element, x, y) => {
    const nodes = element.childNodes;
    const range = document.createRange();
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.nodeType !== 3) {
        continue;
      }
      range.selectNodeContents(node);
      const rect = range.getBoundingClientRect();
      if (x >= rect.left && y >= rect.top && x <= rect.right && y <= rect.bottom) {
        return node;
      }
    }
    return false;
  };
  const clearTextSelection = () => {
    const selection = window.getSelection ? window.getSelection() : document.selection;
    if (!selection) {
      return;
    }
    if (selection.removeAllRanges) {
      selection.removeAllRanges();
    } else if (selection.empty) {
      selection.empty();
    }
  };
  const CLICK_EVENT_THRESHOLD_PX = 5;
  class ScrollBooster {
    constructor(options = {}) {
      const defaults = {
        content: options.viewport.children[0],
        direction: "all",
        pointerMode: "all",
        scrollMode: void 0,
        bounce: true,
        bounceForce: 0.1,
        friction: 0.05,
        textSelection: false,
        inputsFocus: true,
        emulateScroll: false,
        preventDefaultOnEmulateScroll: false,
        preventPointerMoveDefault: true,
        lockScrollOnDragDirection: false,
        pointerDownPreventDefault: true,
        dragDirectionTolerance: 40,
        onPointerDown() {
        },
        onPointerUp() {
        },
        onPointerMove() {
        },
        onClick() {
        },
        onUpdate() {
        },
        onWheel() {
        },
        shouldScroll() {
          return true;
        }
      };
      this.props = {...defaults, ...options};
      if (!this.props.viewport || !(this.props.viewport instanceof Element)) {
        console.error(`ScrollBooster init error: "viewport" config property must be present and must be Element`);
        return;
      }
      if (!this.props.content) {
        console.error(`ScrollBooster init error: Viewport does not have any content`);
        return;
      }
      this.isDragging = false;
      this.isTargetScroll = false;
      this.isScrolling = false;
      this.isRunning = false;
      const START_COORDINATES = {x: 0, y: 0};
      this.position = {...START_COORDINATES};
      this.velocity = {...START_COORDINATES};
      this.dragStartPosition = {...START_COORDINATES};
      this.dragOffset = {...START_COORDINATES};
      this.clientOffset = {...START_COORDINATES};
      this.dragPosition = {...START_COORDINATES};
      this.targetPosition = {...START_COORDINATES};
      this.scrollOffset = {...START_COORDINATES};
      this.rafID = null;
      this.events = {};
      this.updateMetrics();
      this.handleEvents();
    }
    updateOptions(options = {}) {
      this.props = {...this.props, ...options};
      this.props.onUpdate(this.getState());
      this.startAnimationLoop();
    }
    updateMetrics() {
      this.viewport = {
        width: this.props.viewport.clientWidth,
        height: this.props.viewport.clientHeight
      };
      this.content = {
        width: getFullWidth(this.props.content),
        height: getFullHeight(this.props.content)
      };
      this.edgeX = {
        from: Math.min(-this.content.width + this.viewport.width, 0),
        to: 0
      };
      this.edgeY = {
        from: Math.min(-this.content.height + this.viewport.height, 0),
        to: 0
      };
      this.props.onUpdate(this.getState());
      this.startAnimationLoop();
    }
    startAnimationLoop() {
      this.isRunning = true;
      cancelAnimationFrame(this.rafID);
      this.rafID = requestAnimationFrame(() => this.animate());
    }
    animate() {
      if (!this.isRunning) {
        return;
      }
      this.updateScrollPosition();
      if (!this.isMoving()) {
        this.isRunning = false;
        this.isTargetScroll = false;
      }
      const state = this.getState();
      this.setContentPosition(state);
      this.props.onUpdate(state);
      this.rafID = requestAnimationFrame(() => this.animate());
    }
    updateScrollPosition() {
      this.applyEdgeForce();
      this.applyDragForce();
      this.applyScrollForce();
      this.applyTargetForce();
      const inverseFriction = 1 - this.props.friction;
      this.velocity.x *= inverseFriction;
      this.velocity.y *= inverseFriction;
      if (this.props.direction !== "vertical") {
        this.position.x += this.velocity.x;
      }
      if (this.props.direction !== "horizontal") {
        this.position.y += this.velocity.y;
      }
      if ((!this.props.bounce || this.isScrolling) && !this.isTargetScroll) {
        this.position.x = Math.max(Math.min(this.position.x, this.edgeX.to), this.edgeX.from);
        this.position.y = Math.max(Math.min(this.position.y, this.edgeY.to), this.edgeY.from);
      }
    }
    applyForce(force) {
      this.velocity.x += force.x;
      this.velocity.y += force.y;
    }
    applyEdgeForce() {
      if (!this.props.bounce || this.isDragging) {
        return;
      }
      const beyondXFrom = this.position.x < this.edgeX.from;
      const beyondXTo = this.position.x > this.edgeX.to;
      const beyondYFrom = this.position.y < this.edgeY.from;
      const beyondYTo = this.position.y > this.edgeY.to;
      const beyondX = beyondXFrom || beyondXTo;
      const beyondY = beyondYFrom || beyondYTo;
      if (!beyondX && !beyondY) {
        return;
      }
      const edge = {
        x: beyondXFrom ? this.edgeX.from : this.edgeX.to,
        y: beyondYFrom ? this.edgeY.from : this.edgeY.to
      };
      const distanceToEdge = {
        x: edge.x - this.position.x,
        y: edge.y - this.position.y
      };
      const force = {
        x: distanceToEdge.x * this.props.bounceForce,
        y: distanceToEdge.y * this.props.bounceForce
      };
      const restPosition = {
        x: this.position.x + (this.velocity.x + force.x) / this.props.friction,
        y: this.position.y + (this.velocity.y + force.y) / this.props.friction
      };
      if (beyondXFrom && restPosition.x >= this.edgeX.from || beyondXTo && restPosition.x <= this.edgeX.to) {
        force.x = distanceToEdge.x * this.props.bounceForce - this.velocity.x;
      }
      if (beyondYFrom && restPosition.y >= this.edgeY.from || beyondYTo && restPosition.y <= this.edgeY.to) {
        force.y = distanceToEdge.y * this.props.bounceForce - this.velocity.y;
      }
      this.applyForce({
        x: beyondX ? force.x : 0,
        y: beyondY ? force.y : 0
      });
    }
    applyDragForce() {
      if (!this.isDragging) {
        return;
      }
      const dragVelocity = {
        x: this.dragPosition.x - this.position.x,
        y: this.dragPosition.y - this.position.y
      };
      this.applyForce({
        x: dragVelocity.x - this.velocity.x,
        y: dragVelocity.y - this.velocity.y
      });
    }
    applyScrollForce() {
      if (!this.isScrolling) {
        return;
      }
      this.applyForce({
        x: this.scrollOffset.x - this.velocity.x,
        y: this.scrollOffset.y - this.velocity.y
      });
      this.scrollOffset.x = 0;
      this.scrollOffset.y = 0;
    }
    applyTargetForce() {
      if (!this.isTargetScroll) {
        return;
      }
      this.applyForce({
        x: (this.targetPosition.x - this.position.x) * 0.08 - this.velocity.x,
        y: (this.targetPosition.y - this.position.y) * 0.08 - this.velocity.y
      });
    }
    isMoving() {
      return this.isDragging || this.isScrolling || Math.abs(this.velocity.x) >= 0.01 || Math.abs(this.velocity.y) >= 0.01;
    }
    scrollTo(position = {}) {
      this.isTargetScroll = true;
      this.targetPosition.x = -position.x || 0;
      this.targetPosition.y = -position.y || 0;
      this.startAnimationLoop();
    }
    setPosition(position = {}) {
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.position.x = -position.x || 0;
      this.position.y = -position.y || 0;
      this.startAnimationLoop();
    }
    getState() {
      return {
        isMoving: this.isMoving(),
        isDragging: !!(this.dragOffset.x || this.dragOffset.y),
        position: {x: -this.position.x, y: -this.position.y},
        dragOffset: this.dragOffset,
        dragAngle: this.getDragAngle(this.clientOffset.x, this.clientOffset.y),
        borderCollision: {
          left: this.position.x >= this.edgeX.to,
          right: this.position.x <= this.edgeX.from,
          top: this.position.y >= this.edgeY.to,
          bottom: this.position.y <= this.edgeY.from
        }
      };
    }
    getDragAngle(x, y) {
      return Math.round(Math.atan2(x, y) * (180 / Math.PI));
    }
    getDragDirection(angle, tolerance) {
      const absAngle = Math.abs(90 - Math.abs(angle));
      if (absAngle <= 90 - tolerance) {
        return "horizontal";
      } else {
        return "vertical";
      }
    }
    setContentPosition(state) {
      if (this.props.scrollMode === "transform") {
        this.props.content.style.transform = `translate(${-state.position.x}px, ${-state.position.y}px)`;
      }
      if (this.props.scrollMode === "native") {
        this.props.viewport.scrollTop = state.position.y;
        this.props.viewport.scrollLeft = state.position.x;
      }
    }
    handleEvents() {
      const dragOrigin = {x: 0, y: 0};
      const clientOrigin = {x: 0, y: 0};
      let dragDirection = null;
      let wheelTimer = null;
      let isTouch = false;
      const setDragPosition = (event) => {
        if (!this.isDragging) {
          return;
        }
        const eventData = isTouch ? event.touches[0] : event;
        const {pageX, pageY, clientX, clientY} = eventData;
        this.dragOffset.x = pageX - dragOrigin.x;
        this.dragOffset.y = pageY - dragOrigin.y;
        this.clientOffset.x = clientX - clientOrigin.x;
        this.clientOffset.y = clientY - clientOrigin.y;
        if (Math.abs(this.clientOffset.x) > 5 && !dragDirection || Math.abs(this.clientOffset.y) > 5 && !dragDirection) {
          dragDirection = this.getDragDirection(this.getDragAngle(this.clientOffset.x, this.clientOffset.y), this.props.dragDirectionTolerance);
        }
        if (this.props.lockScrollOnDragDirection && this.props.lockScrollOnDragDirection !== "all") {
          if (dragDirection === this.props.lockScrollOnDragDirection && isTouch) {
            this.dragPosition.x = this.dragStartPosition.x + this.dragOffset.x;
            this.dragPosition.y = this.dragStartPosition.y + this.dragOffset.y;
          } else if (!isTouch) {
            this.dragPosition.x = this.dragStartPosition.x + this.dragOffset.x;
            this.dragPosition.y = this.dragStartPosition.y + this.dragOffset.y;
          } else {
            this.dragPosition.x = this.dragStartPosition.x;
            this.dragPosition.y = this.dragStartPosition.y;
          }
        } else {
          this.dragPosition.x = this.dragStartPosition.x + this.dragOffset.x;
          this.dragPosition.y = this.dragStartPosition.y + this.dragOffset.y;
        }
      };
      this.events.pointerdown = (event) => {
        isTouch = !!(event.touches && event.touches[0]);
        this.props.onPointerDown(this.getState(), event, isTouch);
        const eventData = isTouch ? event.touches[0] : event;
        const {pageX, pageY, clientX, clientY} = eventData;
        const {viewport} = this.props;
        const rect = viewport.getBoundingClientRect();
        if (clientX - rect.left >= viewport.clientLeft + viewport.clientWidth) {
          return;
        }
        if (clientY - rect.top >= viewport.clientTop + viewport.clientHeight) {
          return;
        }
        if (!this.props.shouldScroll(this.getState(), event)) {
          return;
        }
        if (event.button === 2) {
          return;
        }
        if (this.props.pointerMode === "mouse" && isTouch) {
          return;
        }
        if (this.props.pointerMode === "touch" && !isTouch) {
          return;
        }
        const formNodes = ["input", "textarea", "button", "select", "label"];
        if (this.props.inputsFocus && formNodes.indexOf(event.target.nodeName.toLowerCase()) > -1) {
          return;
        }
        if (this.props.textSelection) {
          const textNode = textNodeFromPoint(event.target, clientX, clientY);
          if (textNode) {
            return;
          }
          clearTextSelection();
        }
        this.isDragging = true;
        dragOrigin.x = pageX;
        dragOrigin.y = pageY;
        clientOrigin.x = clientX;
        clientOrigin.y = clientY;
        this.dragStartPosition.x = this.position.x;
        this.dragStartPosition.y = this.position.y;
        setDragPosition(event);
        this.startAnimationLoop();
        if (!isTouch && this.props.pointerDownPreventDefault) {
          event.preventDefault();
        }
      };
      this.events.pointermove = (event) => {
        if (event.cancelable && (this.props.lockScrollOnDragDirection === "all" || this.props.lockScrollOnDragDirection === dragDirection)) {
          event.preventDefault();
        }
        setDragPosition(event);
        this.props.onPointerMove(this.getState(), event, isTouch);
      };
      this.events.pointerup = (event) => {
        this.isDragging = false;
        dragDirection = null;
        this.props.onPointerUp(this.getState(), event, isTouch);
      };
      this.events.wheel = (event) => {
        const state = this.getState();
        if (!this.props.emulateScroll) {
          return;
        }
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.isScrolling = true;
        this.scrollOffset.x = -event.deltaX;
        this.scrollOffset.y = -event.deltaY;
        this.props.onWheel(state, event);
        this.startAnimationLoop();
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => this.isScrolling = false, 80);
        if (this.props.preventDefaultOnEmulateScroll && this.getDragDirection(this.getDragAngle(-event.deltaX, -event.deltaY), this.props.dragDirectionTolerance) === this.props.preventDefaultOnEmulateScroll) {
          event.preventDefault();
        }
      };
      this.events.scroll = () => {
        const {scrollLeft, scrollTop} = this.props.viewport;
        if (Math.abs(this.position.x + scrollLeft) > 3) {
          this.position.x = -scrollLeft;
          this.velocity.x = 0;
        }
        if (Math.abs(this.position.y + scrollTop) > 3) {
          this.position.y = -scrollTop;
          this.velocity.y = 0;
        }
      };
      this.events.click = (event) => {
        const state = this.getState();
        const dragOffsetX = this.props.direction !== "vertical" ? state.dragOffset.x : 0;
        const dragOffsetY = this.props.direction !== "horizontal" ? state.dragOffset.y : 0;
        if (Math.max(Math.abs(dragOffsetX), Math.abs(dragOffsetY)) > CLICK_EVENT_THRESHOLD_PX) {
          event.preventDefault();
          event.stopPropagation();
        }
        this.props.onClick(state, event, isTouch);
      };
      this.events.contentLoad = () => this.updateMetrics();
      this.events.resize = () => this.updateMetrics();
      this.props.viewport.addEventListener("mousedown", this.events.pointerdown);
      this.props.viewport.addEventListener("touchstart", this.events.pointerdown, {passive: false});
      this.props.viewport.addEventListener("click", this.events.click);
      this.props.viewport.addEventListener("wheel", this.events.wheel, {passive: false});
      this.props.viewport.addEventListener("scroll", this.events.scroll);
      this.props.content.addEventListener("load", this.events.contentLoad, true);
      window.addEventListener("mousemove", this.events.pointermove);
      window.addEventListener("touchmove", this.events.pointermove, {passive: false});
      window.addEventListener("mouseup", this.events.pointerup);
      window.addEventListener("touchend", this.events.pointerup);
      window.addEventListener("resize", this.events.resize);
    }
    destroy() {
      this.props.viewport.removeEventListener("mousedown", this.events.pointerdown);
      this.props.viewport.removeEventListener("touchstart", this.events.pointerdown);
      this.props.viewport.removeEventListener("click", this.events.click);
      this.props.viewport.removeEventListener("wheel", this.events.wheel);
      this.props.viewport.removeEventListener("scroll", this.events.scroll);
      this.props.content.removeEventListener("load", this.events.contentLoad);
      window.removeEventListener("mousemove", this.events.pointermove);
      window.removeEventListener("touchmove", this.events.pointermove);
      window.removeEventListener("mouseup", this.events.pointerup);
      window.removeEventListener("touchend", this.events.pointerup);
      window.removeEventListener("resize", this.events.resize);
    }
  }
  return require_src();
})();
