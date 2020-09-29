import project from "./project.js";
import row from "./row.js";
import ScrollBooster from "../node_modules/scrollbooster/src/index.js";

const left = document.querySelector(".left");

const setOpacity = (e) => {
  const opacity = Math.min(
    Math.max((300 - parseInt(e.position.x)) / 300, 0),
    1
  );
  const scale = opacity * (1 - 0.95) + 0.95;

  left.style.opacity = opacity;
  left.style.transform = `scale(${scale})`;
};

export default function(options = {}) {
  let parent = null;
  const today = new Date();
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
  };

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
