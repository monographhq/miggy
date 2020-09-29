import render from "./render.js";

export default function(row, project, phase) {
  render(
    row,
    /*html*/ `
      <div class="mig-bar" style="flex: 0 0 ${phase.width}px;}">
        <div class="mig-money">
          <div class="mig-money-fill" style="background:${
            project.color
          };width:${phase.money}%"></div>
        </div>
        <div class="mig-time" style="background:${project.color}">
          <div class="mig-time-abbr">${phase.abbr}</div>
        </div>
      </div>
    `
  );
}
