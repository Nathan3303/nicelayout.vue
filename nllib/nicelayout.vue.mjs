import { ref as f, computed as g, openBlock as o, createElementBlock as i, normalizeClass as _, normalizeStyle as w, renderSlot as $, Fragment as T, renderList as A, createBlock as L, createCommentVNode as b, createVNode as X, withModifiers as O, toDisplayString as k, watch as Y, createTextVNode as W, createElementVNode as S, withDirectives as F, vShow as D, nextTick as M, resolveDynamicComponent as Z, withCtx as ee, reactive as te, provide as ne, onMounted as le, unref as H } from "vue";
function B(e) {
  return (typeof e == "string" || e instanceof String) && Object.prototype.toString.call(e) === "[object String]";
}
function C(e) {
  return (typeof e == "number" || e instanceof Number) && Number(e) !== NaN && Object.prototype.toString.call(e) === "[object Number]";
}
function ae(e) {
  return e instanceof Array && e.constructor === Array && e.__proto__ === Array.prototype && Object.prototype.toString.call(e) === "[object Array]";
}
function R(e) {
  return B(e) ? e.includes("px") : !1;
}
function U(e) {
  return B(e) ? e.includes("%") : !1;
}
function N(e) {
  return e.install = (n) => n.component(e.name, e), e;
}
function V(e) {
  return C(e) || U(e) || R(e) ? e : ["auto", "max-content", "min-content"].includes(e);
}
function re(e) {
  return C(e) || U(e) || R(e) ? e : !1;
}
function J(e) {
  if (C(e))
    return !0;
  if (B(e))
    return ["small", "normal", "medium", "large"].includes(e) ? !0 : re(e);
}
function E(e) {
  return ["square", "round", "no-border", "round-no-border", "no-shape"].includes(e);
}
function oe(e) {
  return ["fill", "cover", "contain", "none", "scale-down"].includes(e);
}
const se = {
  /**
   * @description Image source address of avatar
   */
  src: String,
  /**
   * @description Avatar icon (Only iconfont)
   */
  icon: String,
  /**
   * @description Size of avatar
   */
  size: {
    type: [String, Number],
    default: "normal",
    validator: (e) => J(e)
  },
  /**
   * @description Theme of avatar
   */
  theme: [String, Array],
  /**
   * @description Shape of avatar
   */
  shape: {
    type: String,
    default: "square",
    validator: (e) => ["square", "round"].includes(e)
  },
  /**
   * @description Border width of avatar
   */
  borderWidth: {
    type: Number,
    default: 0
  },
  /**
   * @description Border color of avatar
   */
  borderColor: {
    type: String,
    default: "white"
  },
  /**
   * @description Alternating text of Avatar's image
   */
  alt: String,
  /**
   * @description Title of avata
   */
  title: {
    type: String,
    default: "nl-avatar"
  },
  /**
   * @description Fit mode of avatar (Effetivating when avatar is image type)
   */
  fit: {
    type: String,
    default: "cover",
    validator: (e) => oe(e)
  }
}, ie = [
  /**
   * @description when image load failed
   */
  "error"
];
function ue(e) {
  let n = null;
  return n = B(e) && { small: 24, normal: 32, medium: 40, large: 48 }[e], n && (e = n), j(e);
}
function G(e, n = !1) {
  return n ? parseInt(e) : C(e) ? `${e}px` : e;
}
function I(e, n = "") {
  let l = [];
  return B(e) && e !== "" ? l.push(n + "--" + e) : ae(e) && e.forEach((t) => B(t) && t !== "" && l.push(n + "--" + t)), l;
}
function j(e) {
  return C(e) ? `${e}px` : e;
}
const ce = ["src", "alt"], K = /* @__PURE__ */ Object.assign({ name: "NlAvatar" }, {
  __name: "avatar",
  props: se,
  emits: ie,
  setup(e, { emit: n }) {
    const l = e, t = f(!1), a = g(() => ue(l.size)), d = g(() => ({ "--size": a.value })), u = g(() => ({ objectFit: l.fit })), h = g(() => ({ fontSize: `calc(${a.value} / 2.5)` })), v = g(() => {
      const { theme: s, shape: p } = l;
      let y = [];
      return y = ["nl-avatar", ...I(s, "nl-avatar")], y.push("nl-avatar--" + p), y;
    });
    function m(s) {
      t.value = !0, n("error", s);
    }
    return (s, p) => (o(), i("div", {
      class: _(v.value),
      onClick: p[0] || (p[0] = (...y) => s.clickHandler && s.clickHandler(...y)),
      style: w(d.value)
    }, [
      s.src && !t.value ? (o(), i("img", {
        key: 0,
        src: s.src,
        alt: s.alt,
        onError: m,
        style: w(u.value)
      }, null, 44, ce)) : s.icon ? (o(), i("i", {
        key: 1,
        class: _(["iconfont", s.icon]),
        style: w(h.value)
      }, null, 6)) : $(s.$slots, "default", { key: 2 })
    ], 6));
  }
}), de = {
  /**
   * @description avatar group data (avatars)
   */
  avatars: Array,
  /**
   * @description avatar size
   */
  size: {
    type: [String, Number],
    default: "normal",
    validator: (e) => J(e)
  },
  /**
   * @description avatar shape
   */
  shape: {
    type: String,
    default: "round",
    validator: (e) => E(e)
  },
  /**
   * @description Border width of avatar (Avatar prop mapping)
   */
  borderWidth: {
    type: Number,
    default: 3
  },
  /**
   * @description Border color of avatar (Avatar prop mapping)
   */
  borderColor: {
    type: String,
    default: "white"
  },
  /**
   * @description Direction of avatar group
   */
  direction: {
    type: String,
    default: "horizontal",
    validator: (e) => ["horizontal", "vertical"].includes(e)
  },
  /**
   * @description avatar group is addable or not
   */
  addable: Boolean
}, pe = [
  /**
   * @description when add button clicked
   */
  "add"
];
const fe = { class: "nl-avatar-group" }, he = /* @__PURE__ */ Object.assign({ name: "NlAvatarGroup" }, {
  __name: "avatar-group",
  props: de,
  emits: pe,
  setup(e, { emit: n }) {
    const l = f(null);
    function t(a) {
      l.value || (n("add", a), l.value = setTimeout(function() {
        l.value = null;
      }, 1e3));
    }
    return (a, d) => (o(), i("div", fe, [
      (o(!0), i(T, null, A(a.avatars, (u, h) => (o(), i(T, null, [
        u ? (o(), L(u, {
          key: 0,
          shape: "round",
          size: a.size,
          icon: u.icon,
          src: u.src,
          alt: u.alt,
          fit: u.fit,
          style: w({ zIndex: a.avatars.length - h })
        }, null, 8, ["size", "icon", "src", "alt", "fit", "style"])) : b("", !0)
      ], 64))), 256)),
      X(K, {
        theme: "add",
        size: a.size,
        icon: "icon-plus",
        shape: "round",
        style: { cursor: "pointer" },
        onClick: O(t, ["stop"])
      }, null, 8, ["size", "onClick"])
    ]));
  }
}), me = N(K), ge = N(he), ve = {
  /**
   * @description Vertical state of the div
   */
  vertical: Boolean,
  /**
   * @description div flex attribute: align-items
   */
  alignItems: String,
  /**
   * @description div flex attribute: justify-content
   */
  justifyContent: String,
  /**
   * @description div flex attribute: flex
   */
  flex: String,
  /**
   * @description div flex attribute: flex-wrap
   */
  flexWrap: String,
  /**
   * @description div flex attribute: gap
   */
  gap: Number,
  /**
   * @description div width
   */
  width: {
    type: [String, Number],
    validator: (e) => V(e)
  },
  /**
   * @description div height
   */
  height: {
    type: [String, Number],
    validator: (e) => V(e)
  }
};
const ye = /* @__PURE__ */ Object.assign({ name: "NlDiv" }, {
  __name: "div",
  props: ve,
  setup(e) {
    const n = e, l = g(() => ({
      "--flex-direction": n.vertical ? "column" : void 0,
      "--align-items": n.alignItems,
      "--justify-content": n.justifyContent,
      "--flex-wrap": n.flexWrap,
      "--gap": j(n.gap),
      "--flex": n.flex,
      "--width": j(n.width),
      "--height": j(n.height)
    }));
    return (t, a) => (o(), i("div", {
      class: "nl-div",
      style: w(l.value)
    }, [
      $(t.$slots, "default")
    ], 4));
  }
}), be = N(ye), Se = {
  /**
   * @description Theme of button
   */
  theme: {
    type: [Array, String],
    default: "default"
  },
  /**
   * @description Shape of button
   */
  shape: {
    type: String,
    default: "square",
    validator: (e) => E(e)
  },
  /**
   * @description Button icon (Only iconfont was supported so far)
   */
  icon: String,
  /**
   * @description Button disable state
   */
  disabled: Boolean,
  /**
   * @description Button loading state
   */
  loading: Boolean,
  /**
   * @description Button loading icon (Only iconfont so far)
   */
  loadingIcon: {
    type: String,
    default: "icon-loading"
  }
}, _e = ["disabled"], ke = {
  key: 2,
  class: "nl-button__text"
}, we = /* @__PURE__ */ Object.assign({ name: "NlButton" }, {
  __name: "button",
  props: Se,
  setup(e) {
    const n = e, l = g(() => {
      let t = [];
      return t = ["nl-button", ...I(n.theme, "nl-button")], t.push(`nl-button--${n.shape}`), n.disabled && t.push("nl-button--disabled"), t;
    });
    return (t, a) => (o(), i("button", {
      class: _(l.value),
      disabled: t.disabled
    }, [
      t.loading ? (o(), i("i", {
        key: 0,
        class: _(["nl-button__loading-icon iconfont", t.loadingIcon])
      }, null, 2)) : t.icon ? (o(), i("i", {
        key: 1,
        class: _(["iconfont", t.icon])
      }, null, 2)) : b("", !0),
      t.$slots.default ? (o(), i("span", ke, [
        $(t.$slots, "default")
      ])) : b("", !0)
    ], 10, _e));
  }
}), Ne = {
  /**
   * @description badge theme
   */
  theme: {
    type: [String, Array],
    default: "default"
  },
  /**
   * @description badge value
   */
  value: {
    type: [String, Number],
    default: ""
  },
  /**
   * @description badge max value (Only effective when value is type of number)
   */
  max: {
    type: Number,
    default: 99
  },
  /**
   * @description if is hide badge
   */
  hidden: Boolean,
  /**
   * @description display dot instead value
   */
  dot: Boolean
};
const $e = ["textContent"], xe = /* @__PURE__ */ Object.assign({ name: "NlBadge" }, {
  __name: "badge",
  props: Ne,
  setup(e) {
    const n = e, l = g(() => {
      let a = [];
      return a = ["nl-badge", ...I(n.theme)], n.dot && a.push("nl-badge--dot"), a;
    }), t = g(() => n.dot ? "" : B(n.value) ? n.value : n.value > n.max ? `${n.max}+` : n.value);
    return (a, d) => (o(), i("div", {
      class: _(l.value)
    }, [
      $(a.$slots, "default"),
      !a.hidden && (t.value || a.dot) ? (o(), i("sup", {
        key: 0,
        textContent: k(t.value)
      }, null, 8, $e)) : b("", !0)
    ], 2));
  }
}), Te = N(we), Be = N(xe), Pe = {
  /**
   * @description Type of input (Native attribute mapping)
   */
  type: {
    type: String,
    default: "text",
    validator: (e) => ["text", "password", "number"].includes(e)
  },
  /**
   * @description Model-value of input (two-way value mapping)
   */
  modelValue: [String, Number],
  /**
   * @description Input value formatter (Format value when updated)
   */
  formatter: {
    type: Function,
    default: (e) => e
  },
  /**
   * @description Input value parser (Parse value when updated)
   */
  parser: {
    type: Function,
    default: (e) => e
  },
  /**
   * @description Theme(s) of input (Allow custom style)
   */
  theme: {
    type: [Array, String],
    default: "default"
  },
  /**
   * @description Border shape of input (circle, square or no-border)
   */
  shape: {
    type: String,
    default: "square",
    validator: (e) => E(e)
  },
  /**
   * @description Prefix icon of input (Only iconfont so far)
   */
  icon: String,
  /**
   * @description Prefix text of input
   */
  prefix: String,
  /**
   * @description Suffix text of input
   */
  suffix: String,
  /**
   * @description Input placeholder
   */
  placeholder: String,
  /**
   * @description Max length of input value (Native attribute mapping)
   */
  maxlength: {
    type: [String, Number],
    default: -1
  },
  /**
   * @description Autocomplete state (Native attribute mapping)
   */
  autocomplete: {
    type: String,
    default: "off"
  },
  /**
   * @description Disabled state (Native attribute mapping)
   */
  disabled: Boolean,
  /**
   * @description Readonly state (Native attribute mapping)
   */
  readonly: Boolean,
  /**
   * @description Clearable state (Control delete button)
   */
  clearable: Boolean,
  /**
   * @description Allow show password state (Effective when input type is password)
   */
  allowShowPassword: Boolean,
  /**
   * @description Word counter controller (show word limit)
   */
  counter: {
    type: String,
    default: "off",
    validator: (e) => ["off", "word-limit", "word-left", "both"].includes(e)
  },
  /**
   * @description Input width (Quick set)
   */
  width: {
    type: String,
    default: "auto",
    validator: (e) => V(e)
  },
  /**
   * @description Input height (Quick set)
   */
  height: {
    type: String,
    default: "36px",
    validator: (e) => V(e)
  }
}, Le = [
  /**
   * @description Calling when input value is changed (Model-value)
   */
  "update:modelValue",
  /**
   * @description Calling when input was focused
   */
  "focused",
  /**
   * @description Calling when input was blured
   */
  "blured",
  /**
   * @description Calling when input value was inputed
   */
  "inputted",
  /**
   * @description Calling when input value was changed
   */
  "changed",
  /**
   * @description Calling when input was cleared
   */
  "cleared"
], Ie = { class: "word-counter" }, Q = /* @__PURE__ */ Object.assign({ name: "WordCounter" }, {
  __name: "word-counter",
  props: {
    /**
     * @description display mode of word counter
     */
    mode: {
      type: String,
      default: "word-limit",
      validator: (e) => ["word-limit", "word-left", "both"].includes(e)
    },
    /**
     * @description text length
     */
    length: Number,
    /**
     * @description max length
     */
    maxlength: [String, Number]
  },
  setup(e) {
    const n = e, l = g(() => {
      const { mode: t, maxlength: a, length: d } = n;
      if (t === "off")
        return !1;
      let u = "";
      const h = a !== -1 && parseInt(a);
      return t !== "word-left" && (u += `${d} / ${h || "-"}`), t === "both" && (u += " , "), t !== "word-limit" && (u += h ? h - d : "-"), u;
    });
    return (t, a) => (o(), i("div", Ie, k(l.value), 1));
  }
});
const Ae = ["type", "value", "placeholder", "maxlength", "autocomplete", "disabled", "readonly"], je = { class: "button-group" }, Ce = ["onClick"], Ve = ["onClick"], ze = /* @__PURE__ */ Object.assign({ name: "NlInput" }, {
  __name: "input",
  props: Pe,
  emits: Le,
  setup(e, { emit: n }) {
    var x;
    const l = e, t = f(), a = f(!1), d = f(!1), u = f(((x = l.modelValue) == null ? void 0 : x.length) || 0), h = g(() => {
      let r = ["nl-input"];
      return r = [...r, ...I(l.theme, "nl-input")], r.push("nl-input--" + l.shape), l.disabled && r.push("nl-input--disabled"), a.value && r.push("nl-input--focused"), r;
    }), v = g(() => ({
      "--input-width": G(l.width),
      "--input-height": G(l.height)
    }));
    function m(r) {
      a.value = !l.disabled && !l.readonly, n("focused", r);
    }
    function s(r) {
      a.value = !1, n("blured", r);
    }
    function p(r) {
      const z = l.parser(r.target.value);
      n("update:modelValue", z), u.value = z.length, n("inputted", r);
    }
    function y(r) {
      n("changed", r);
    }
    function P() {
      const r = t.value.value;
      n("update:modelValue", ""), u.value = 0, M(() => t.value.focus()), n("cleared", r);
    }
    function c() {
      d.value = !d.value;
    }
    return Y(
      () => l.modelValue,
      () => u.value = l.modelValue.length
    ), (r, z) => (o(), i("div", {
      class: _(h.value),
      style: w(v.value)
    }, [
      r.icon ? (o(), i("i", {
        key: 0,
        class: _(["iconfont", r.icon])
      }, null, 2)) : b("", !0),
      $(r.$slots, "prefix", {}, () => [
        W(k(r.prefix), 1)
      ]),
      S("input", {
        ref_key: "input",
        ref: t,
        type: d.value ? "text" : r.type,
        value: r.formatter(r.modelValue),
        placeholder: r.placeholder,
        maxlength: r.maxlength,
        autocomplete: r.autocomplete,
        disabled: r.disabled,
        readonly: !r.disabled && r.readonly,
        onFocus: m,
        onBlur: s,
        onInput: p,
        onChange: y
      }, null, 40, Ae),
      $(r.$slots, "suffix", {}, () => [
        W(k(r.suffix), 1)
      ]),
      S("div", je, [
        r.type === "password" && r.allowShowPassword ? F((o(), i("i", {
          key: 0,
          class: _(["iconfont", d.value ? "icon-eye" : "icon-eye-off"]),
          onClick: O(c, ["stop"])
        }, null, 10, Ce)), [
          [D, r.modelValue]
        ]) : b("", !0),
        r.type !== "file" && r.clearable ? F((o(), i("i", {
          key: 1,
          class: "iconfont icon-clear",
          onClick: O(P, ["stop"])
        }, null, 8, Ve)), [
          [D, r.modelValue]
        ]) : b("", !0)
      ]),
      r.counter !== "off" ? (o(), L(Q, {
        key: 1,
        mode: r.counter,
        length: u.value,
        maxlength: r.maxlength
      }, null, 8, ["mode", "length", "maxlength"])) : b("", !0)
    ], 6));
  }
}), He = {
  /**
   * @description Model-value of textarea (two-way value mapping)
   */
  modelValue: [String, Number],
  /**
   * @description input placeholder
   */
  placeholder: String,
  /**
   * @description Textarea rows (Native attribute mapping)
   */
  rows: {
    type: [String, Number],
    default: 1
  },
  /**
   * @description Theme of textarea
   */
  theme: {
    type: [Array, String],
    default: "default"
  },
  /**
   * @description Shape of textarea
   */
  shape: {
    type: String,
    default: "square",
    validator: (e) => ["square", "no-border"].includes(e)
  },
  /**
   * @description Textarea diable state (Native attribute mapping)
   */
  disabled: Boolean,
  /**
   * @description Textarea readonly state (Native attribute mapping)
   */
  readonly: Boolean,
  /**
   * @description Textarea resize state
   */
  resize: Boolean,
  /**
   * @description Textarea autosize state
   */
  autosize: {
    type: [Boolean, Object],
    default: !1
  },
  /**
   * @description Max length of textarea value
   */
  maxlength: [String, Number],
  /**
   * @description Word counter controller (show word limit)
   */
  counter: {
    type: String,
    default: "off",
    validator: (e) => ["off", "word-limit", "word-left", "both"].includes(e)
  }
}, Oe = [
  /**
   * @description Calling when textarea value is changed (Model-value)
   */
  "update:modelValue",
  /**
   * @description Calling when textarea was focused
   */
  "focused",
  /**
   * @description Calling when textarea was blured
   */
  "blured",
  /**
   * @description Calling when textarea value was inputed
   */
  "inputted",
  /**
   * @description Calling when textarea value was changed
   */
  "changed"
];
const Ee = ["rows", "value", "placeholder", "readonly", "disabled", "maxlength"], We = ["value"], Fe = /* @__PURE__ */ Object.assign({ name: "NlTextarea" }, {
  __name: "textarea",
  props: He,
  emits: Oe,
  setup(e, { emit: n }) {
    var P;
    const l = e, t = f(), a = f(), d = f(!1), u = f(((P = l.modelValue) == null ? void 0 : P.length) || 0), h = g(() => {
      let c = [];
      return c = ["nl-textarea", ...I(l.theme, "nl-textarea")], c.push("nl-textarea--" + l.shape), l.disabled && c.push("nl-textarea--disabled"), d.value && c.push("nl-textarea--focused"), c;
    }), v = g(() => {
      const { autosize: c, resize: x, rows: r } = l;
      return {
        "--rows": r,
        "--overflow": c ? "hidden" : "auto",
        "--resize": x ? "vertical" : "none"
      };
    });
    function m(c) {
      d.value = !l.disabled && !l.readonly, n("focused", c);
    }
    function s(c) {
      d.value = !1, n("blured", c);
    }
    function p(c) {
      n("update:modelValue", c.target.value), u.value = c.target.textLength, l.autosize && M(() => {
        t.value.style.height = a.value.scrollHeight + "px";
      }), n("inputted", c);
    }
    function y(c) {
      n("changed", c);
    }
    return (c, x) => (o(), i("div", {
      class: _(h.value),
      style: w(v.value)
    }, [
      S("textarea", {
        ref_key: "textarea",
        ref: t,
        rows: c.rows,
        value: c.modelValue,
        placeholder: c.placeholder,
        readonly: c.readonly,
        disabled: c.disabled,
        maxlength: c.maxlength,
        onFocus: m,
        onBlur: s,
        onInput: p,
        onChange: y
      }, null, 40, Ee),
      c.autosize && !l.disabled && !l.readonly ? (o(), i("textarea", {
        key: 0,
        class: "backend-textarea",
        ref_key: "backendTextarea",
        ref: a,
        value: c.modelValue
      }, null, 8, We)) : b("", !0),
      c.counter !== "off" ? (o(), L(Q, {
        key: 1,
        mode: c.counter,
        maxlength: c.maxlength,
        length: u.value
      }, null, 8, ["mode", "maxlength", "length"])) : b("", !0)
    ], 6));
  }
}), De = N(ze), Ge = N(Fe), qe = {
  /**
   * @description Element tag of link
   */
  tag: {
    type: String,
    default: "a",
    validator: (e) => ["a", "router-link"].includes(e)
  },
  /**
   * @description Theme of the link
   */
  theme: {
    type: [String, Array],
    default: "default"
  },
  /**
   * @description Href attribute of the link (Native attribute mapping)
   */
  href: String,
  /**
   * @description Active state of the link
   */
  actived: Boolean,
  /**
   * @description Disable state of the link
   */
  disabled: Boolean,
  /**
   * @description Link icon (only iconfont)
   */
  icon: String,
  /**
   * @description Attribute to on link whose tag is router-link
   */
  to: [String, Object]
};
const Me = /* @__PURE__ */ Object.assign({ name: "NlLink" }, {
  __name: "link",
  props: qe,
  setup(e) {
    const n = e, l = g(() => {
      let t = [];
      return t = ["nl-link", ...I(n.theme, "nl-link")], n.actived && t.push("nl-link--actived"), n.disabled && t.push("nl-link--disabled"), t;
    });
    return (t, a) => (o(), L(Z(t.disabled ? "a" : t.tag), {
      class: _(l.value),
      href: t.disabled || !t.href ? void 0 : t.href,
      to: t.to || t.href || void 0,
      "active-class": "nl-link--actived"
    }, {
      default: ee(() => [
        t.icon ? (o(), i("i", {
          key: 0,
          class: _(["nl-link__icon", t.icon && `iconfont ${t.icon}`])
        }, null, 2)) : $(t.$slots, "icon", { key: 1 }),
        $(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["class", "href", "to"]));
  }
}), Re = N(Me), Ue = {
  /**
   * @description Type of progress bar
   */
  type: {
    type: String,
    default: "line",
    validator: (e) => ["line", "circle", "dashboard"].includes(e)
  },
  /**
   * @description Percentage of progress
   */
  percentage: {
    type: Number,
    default: 0,
    validator: (e) => e >= 0 && e <= 100
  },
  /**
   * @description Color of inner bar
   */
  color: {
    type: [Array, String]
  },
  /**
   * @description Progress bar width
   */
  strokeWidth: {
    type: Number,
    default: 6
  },
  /**
   * @description Progress text formatter
   */
  formatter: {
    type: Function,
    default: (e) => e
  },
  /**
   * @description Inner text display state
   */
  showInnerText: Boolean,
  /**
   * @description SVG size scale (Effective when props.type is circle or dashboard)
   */
  scale: {
    type: Number,
    default: 1,
    validator: (e) => e >= 0.6 && e <= 2
  }
}, Je = [
  /**
   * @description Call when progress was hundred percent
   */
  "full"
];
const Ke = {
  key: 0,
  class: "nl-progress--line"
}, Qe = { class: "nl-progress__outer-bar" }, Xe = { key: 0 }, Ye = /* @__PURE__ */ S("circle", {
  class: "nl-progress__outer-path",
  r: "50",
  cx: "50",
  cy: "50"
}, null, -1), Ze = /* @__PURE__ */ S("circle", {
  class: "nl-progress__inner-path",
  r: "50",
  cx: "50",
  cy: "50"
}, null, -1), et = [
  Ye,
  Ze
], tt = { class: "nl-progress__text" }, nt = /* @__PURE__ */ Object.assign({ name: "NlProgress" }, {
  __name: "progress",
  props: Ue,
  emits: Je,
  setup(e, { emit: n }) {
    const l = e, t = g(() => l.percentage < 0 ? "0%" : (l.percentage === 100 && n("full"), l.percentage > 100 ? "100%" : l.percentage + "%")), a = g(() => j(l.strokeWidth / l.scale)), d = g(() => ({
      "--stroke-width": a.value,
      "--flex": l.type === "line" ? "auto" : "none"
    })), u = g(() => Math.ceil(2 * Math.PI * 50)), h = g(() => ({
      "--circle-size": `${l.scale * 100}px`,
      "--stroke-dash-array": u.value,
      "--stroke-dash-offset": Math.ceil((1 - parseInt(t.value) / 100) * u.value)
    }));
    return (v, m) => (o(), i("div", {
      class: "nl-progress",
      style: w(d.value)
    }, [
      v.type === "line" ? (o(), i("div", Ke, [
        S("div", Qe, [
          S("div", {
            class: "nl-progress__inner-bar",
            style: w({ width: t.value })
          }, [
            v.showInnerText ? (o(), i("span", Xe, k(t.value), 1)) : b("", !0)
          ], 4)
        ])
      ])) : v.type === "circle" ? (o(), i("svg", {
        key: 1,
        class: "nl-progress--circle",
        viewBox: "0 0 100 100",
        style: w(h.value)
      }, et, 4)) : b("", !0),
      v.showInnerText ? b("", !0) : $(v.$slots, "default", { key: 2 }, () => [
        S("span", tt, k(v.formatter(t.value)), 1)
      ])
    ], 4));
  }
}), lt = N(nt), at = {
  /**
   * @description Data of timeline
   */
  lines: Array,
  /**
   * @description Scale of timeline
   */
  scale: {
    type: Number,
    default: 2,
    validator: (e) => e >= 1 && e <= 6
  },
  /**
   * @description Update time (second)
   */
  updateTime: {
    type: Number,
    default: 0,
    validator: (e) => e >= 0 && e <= 60
  },
  /**
   * @description Pointer text display state
   */
  showPointerText: Boolean
}, rt = (e = 1) => {
  const n = f(e * 60), l = f(n.value * 24), t = f(parseInt(e / 3) + 1), a = f(n.value / t.value), d = f(parseInt(60 / e)), u = f(1e3 * d.value), h = te({ left: 0, text: "0:00" });
  function v(p) {
    if (typeof p != "string")
      return;
    const y = p.split(":"), P = y[0] * n.value, c = y[1] * (n.value / 60), x = (y[2] || 0) / d.value;
    return parseInt(P + c + x + 24);
  }
  function m(p) {
    h.left = v(p) - 2;
  }
  function s(p) {
    h.text = p;
  }
  return {
    width: l,
    scaleLevel: t,
    timeScaleGap: a,
    updateTime: u,
    pointer: h,
    calcLeftValueByTimeString: v,
    updatePointerLeft: m,
    updatePointerText: s
  };
}, ot = () => {
  const e = f(null), n = f(!1), l = f(!1), t = f(!1), a = (m) => e.value = m;
  function d(m, s = -0.3, p = !1) {
    if (!e.value)
      return;
    const { clientWidth: y } = e.value;
    s = Math.floor(s * y), e.value.scrollLeft = m + s, v(m), n.value = p;
  }
  function u(m = 0.5) {
    if (!e.value || l.value)
      return;
    const { scrollLeft: s, clientWidth: p } = e.value, y = s - parseInt(p * m);
    d(y, 0, !0);
  }
  function h(m = 0.5) {
    if (!e.value || t.value)
      return;
    const { scrollLeft: s, clientWidth: p } = e.value, y = s + parseInt(p * m);
    d(y, 0, !0);
  }
  function v(m) {
    const { clientWidth: s, scrollWidth: p } = e.value;
    t.value = s + m >= p, l.value = m <= 0;
  }
  return { freeMode: n, onStart: l, onEnd: t, setTarget: a, moveTo: d, moveLeft: u, moveRight: h };
};
const st = { class: "line" }, it = { class: "line__title" }, ut = { class: "line__cards" }, ct = {
  __name: "line",
  props: { lines: Object },
  setup(e) {
    return (n, l) => (o(), i("div", st, [
      S("div", it, [
        S("p", null, k(e.lines.title), 1)
      ]),
      S("div", ut, [
        (o(!0), i(T, null, A(e.lines.cards, (t) => (o(), L(t, { card: t }, null, 8, ["card"]))), 256))
      ])
    ]));
  }
};
const dt = { class: "timeline__scale-bar" }, pt = { key: 0 }, ft = { key: 1 }, ht = { class: "pointer" }, mt = { key: 0 }, gt = { class: "timeline__lines-container" }, vt = /* @__PURE__ */ Object.assign({ name: "NlTimeline" }, {
  __name: "timeline",
  props: at,
  setup(e, { expose: n }) {
    const l = e, t = rt(l.scale), a = ot(), d = f(), u = f((/* @__PURE__ */ new Date()).toLocaleTimeString());
    ne("timeline", t), n({
      findPointer: () => a.moveTo(t.pointer.left),
      moveRight: a.moveRight,
      moveLeft: a.moveLeft
    });
    const h = g(() => ({
      "--width": t.width.value + "px",
      "--scale-bar-gap": t.timeScaleGap.value + "px",
      "--scale-bar-pointer-left": t.pointer.left + "px",
      "--scale-bar-pointer-height": l.lines.length * 71 + "px"
    }));
    return le(() => {
      a.setTarget(d.value), t.updatePointerLeft(u.value), a.moveTo(t.pointer.left), setInterval(() => {
        t.updatePointerLeft(u.value), a.moveTo(t.pointer.left);
      }, t.updateTime.value), setInterval(() => {
        u.value = (/* @__PURE__ */ new Date()).toLocaleTimeString(), t.pointer.text = u.value;
      }, 1e3);
    }), (v, m) => (o(), i("div", {
      class: "timeline",
      ref_key: "timelineElement",
      ref: d,
      style: w(h.value)
    }, [
      S("div", dt, [
        (o(), i(T, null, A(25, (s) => (o(), i(T, null, [
          s === 1 || s === 25 ? (o(), i("span", pt, "|")) : (o(), i("span", ft, k(s - 1) + ":00", 1)),
          s !== 25 ? (o(!0), i(T, { key: 2 }, A(H(t).scaleLevel.value - 1, (p) => (o(), i("span", null, k(s - 1) + ":" + k(60 / H(t).scaleLevel.value * p), 1))), 256)) : b("", !0)
        ], 64))), 64)),
        S("div", ht, [
          v.showPointerText ? (o(), i("span", mt, " < " + k(H(t).pointer.text), 1)) : b("", !0)
        ])
      ]),
      S("div", gt, [
        (o(!0), i(T, null, A(v.lines, (s, p) => (o(), L(ct, {
          key: p,
          lines: s
        }, null, 8, ["lines"]))), 128))
      ])
    ], 4));
  }
}), yt = N(vt), q = [
  me,
  ge,
  be,
  Te,
  Be,
  De,
  Ge,
  Re,
  lt,
  yt
];
const St = {
  install(e) {
    console.log("Install global components", q), q.forEach((n) => {
      e.component(n.name, n);
    });
  }
};
export {
  St as default
};
