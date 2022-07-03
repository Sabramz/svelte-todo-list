import { i as is_function, a as assign, c as create_ssr_component, b as add_attribute, d as each, e as escape } from "../../../chunks/index-2ba0e0c3.js";
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function crossfade(_a) {
  var { fallback } = _a, defaults = __rest(_a, ["fallback"]);
  const to_receive = /* @__PURE__ */ new Map();
  const to_send = /* @__PURE__ */ new Map();
  function crossfade2(from, node, params) {
    const { delay = 0, duration = (d2) => Math.sqrt(d2) * 30, easing = cubicOut } = assign(assign({}, defaults), params);
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const dw = from.width / to.width;
    const dh = from.height / to.height;
    const d = Math.sqrt(dx * dx + dy * dy);
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const opacity = +style.opacity;
    return {
      delay,
      duration: is_function(duration) ? duration(d) : duration,
      easing,
      css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
    };
  }
  function transition(items, counterparts, intro) {
    return (node, params) => {
      items.set(params.key, {
        rect: node.getBoundingClientRect()
      });
      return () => {
        if (counterparts.has(params.key)) {
          const { rect } = counterparts.get(params.key);
          counterparts.delete(params.key);
          return crossfade2(rect, node, params);
        }
        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }
  return [
    transition(to_send, to_receive, false),
    transition(to_receive, to_send, true)
  ];
}
var TodoList_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".big-container.svelte-1keo0r9{display:grid;grid-template-columns:47.5% 5% 47.5%}.todo.svelte-1keo0r9{grid-column:1}.finished.svelte-1keo0r9{grid-column:3}.item.svelte-1keo0r9{display:grid;grid-template:100% / 90% 10%;border:1px solid black;border-radius:3px;overflow-wrap:break-word;margin-bottom:5px}.done-button.svelte-1keo0r9{justify-self:right;border-radius:0px;padding:2px;box-shadow:0px 0px;border:1px solid black}p.svelte-1keo0r9{margin:0px 0px;padding:3px}.input.svelte-1keo0r9{display:flex;align-items:center;justify-content:center;margin-bottom:20px}")();
const css = {
  code: ".big-container.svelte-1keo0r9{display:grid;grid-template-columns:47.5% 5% 47.5%}.todo.svelte-1keo0r9{grid-column:1}.finished.svelte-1keo0r9{grid-column:3}.item.svelte-1keo0r9{display:grid;grid-template:100% / 90% 10%;border:1px solid black;border-radius:3px;overflow-wrap:break-word;margin-bottom:5px}.done-button.svelte-1keo0r9{justify-self:right;border-radius:0px;padding:2px;box-shadow:0px 0px;border:1px solid black}p.svelte-1keo0r9{margin:0px 0px;padding:3px}.input.svelte-1keo0r9{display:flex;align-items:center;justify-content:center;margin-bottom:20px}",
  map: null
};
const TodoList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  crossfade({ easing: cubicOut, duration: 400 });
  let input = "";
  let todos = [];
  let finished = [];
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Scott&#39;s Portfolio</title>`, ""}`, ""}



<h1 style="${"text-align: center;"}">Ah yes, the hello world of frameworks</h1>
<div class="${"input svelte-1keo0r9"}"><input type="${"text"}"${add_attribute("value", input, 0)}>
    <button>Create</button></div>  
<div class="${"big-container svelte-1keo0r9"}"><div class="${"todo svelte-1keo0r9"}">${todos.length ? each(todos, (item) => {
    return `<div class="${"item svelte-1keo0r9"}"><p class="${"svelte-1keo0r9"}">${escape(item.text)}</p>
                <button${add_attribute("value", item.id, 0)} class="${"done-button svelte-1keo0r9"}">Done</button>
            </div>`;
  }) : `<div><p class="${"svelte-1keo0r9"}"></p>
            </div>`}</div>
    <div class="${"finished svelte-1keo0r9"}">${finished.length ? each(finished, (item) => {
    return `<div class="${"item svelte-1keo0r9"}"><p style="${"text-decoration: line-through;"}" class="${"svelte-1keo0r9"}">${escape(item.text)}</p>
                <button${add_attribute("value", item.id, 0)} class="${"done-button svelte-1keo0r9"}">Delete</button>
            </div>`;
  }) : `<div><p class="${"svelte-1keo0r9"}"></p>
            </div>`}</div>
</div>`;
});
export { TodoList as default };
