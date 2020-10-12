import render from "./render.js";
import bar from "./bar.js";

export default function (parent, project) {
  const row = document.createElement("div");
  row.classList.add("mig-row");
  row.style.left = project.left + "px";
  parent.appendChild(row);

  project.phases.map((phase) => {
    bar(row, project, phase);
  });
}