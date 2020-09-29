export default function(relEl, template) {
  if (!relEl) return;
  const range = document.createRange();
  range.selectNode(relEl);
  const child = range.createContextualFragment(template);
  return relEl.appendChild(child);
}
