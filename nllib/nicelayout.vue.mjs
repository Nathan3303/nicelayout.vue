function ue(e) {
  return (typeof e == "string" || e instanceof String) && Object.prototype.toString.call(e) === "[object String]";
}
function Ie(e) {
  return (typeof e == "number" || e instanceof Number) && Number(e) !== NaN && Object.prototype.toString.call(e) === "[object Number]";
}
function Yn(e) {
  return e instanceof Array && e.constructor === Array && e.__proto__ === Array.prototype && Object.prototype.toString.call(e) === "[object Array]";
}
function nn(e) {
  return ue(e) ? e.includes("px") : !1;
}
function rn(e) {
  return ue(e) ? e.includes("%") : !1;
}
function G(e) {
  return e.install = (t) => t.component(e.name, e), e;
}
function Qn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let o = 0; o < r.length; o++)
    n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const H = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Xn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], pt = () => {
}, Zn = /^on[^a-z]/, er = (e) => Zn.test(e), k = Object.assign, tr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, nr = Object.prototype.hasOwnProperty, O = (e, t) => nr.call(e, t), y = Array.isArray, se = (e) => Ye(e) === "[object Map]", on = (e) => Ye(e) === "[object Set]", $ = (e) => typeof e == "function", j = (e) => typeof e == "string", ht = (e) => typeof e == "symbol", x = (e) => e !== null && typeof e == "object", rr = (e) => x(e) && $(e.then) && $(e.catch), sn = Object.prototype.toString, Ye = (e) => sn.call(e), ln = (e) => Ye(e).slice(8, -1), cn = (e) => Ye(e) === "[object Object]", gt = (e) => j(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, mt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, or = /-(\w)/g, He = mt((e) => e.replace(or, (t, n) => n ? n.toUpperCase() : "")), Ee = mt(
  (e) => e.charAt(0).toUpperCase() + e.slice(1)
), sr = mt(
  (e) => e ? `on${Ee(e)}` : ""
), Se = (e, t) => !Object.is(e, t), ir = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let Dt;
const tt = () => Dt || (Dt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function M(e) {
  if (y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = j(r) ? ur(r) : M(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else {
    if (j(e))
      return e;
    if (x(e))
      return e;
  }
}
const lr = /;(?![^(]*\))/g, cr = /:([^]+)/, ar = /\/\*[^]*?\*\//g;
function ur(e) {
  const t = {};
  return e.replace(ar, "").split(lr).forEach((n) => {
    if (n) {
      const r = n.split(cr);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function R(e) {
  let t = "";
  if (j(e))
    t = e;
  else if (y(e))
    for (let n = 0; n < e.length; n++) {
      const r = R(e[n]);
      r && (t += r + " ");
    }
  else if (x(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const L = (e) => j(e) ? e : e == null ? "" : y(e) || x(e) && (e.toString === sn || !$(e.toString)) ? JSON.stringify(e, an, 2) : String(e), an = (e, t) => t && t.__v_isRef ? an(e, t.value) : se(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o]) => (n[`${r} =>`] = o, n), {})
} : on(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : x(t) && !y(t) && !cn(t) ? String(t) : t;
function Rt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let un;
function fr(e, t = un) {
  t && t.active && t.effects.push(e);
}
function dr() {
  return un;
}
const Oe = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, fn = (e) => (e.w & ee) > 0, dn = (e) => (e.n & ee) > 0, pr = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= ee;
}, hr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      fn(o) && !dn(o) ? o.delete(e) : t[n++] = o, o.w &= ~ee, o.n &= ~ee;
    }
    t.length = n;
  }
}, nt = /* @__PURE__ */ new WeakMap();
let _e = 0, ee = 1;
const rt = 30;
let T;
const ie = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), ot = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class pn {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, fr(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = T, n = Z;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = T, T = this, Z = !0, ee = 1 << ++_e, _e <= rt ? pr(this) : At(this), this.fn();
    } finally {
      _e <= rt && hr(this), ee = 1 << --_e, T = this.parent, Z = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    T === this ? this.deferStop = !0 : this.active && (At(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function At(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Z = !0;
const hn = [];
function _t() {
  hn.push(Z), Z = !1;
}
function vt() {
  const e = hn.pop();
  Z = e === void 0 ? !0 : e;
}
function F(e, t, n) {
  if (Z && T) {
    let r = nt.get(e);
    r || nt.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || r.set(n, o = Oe());
    const s = process.env.NODE_ENV !== "production" ? { effect: T, target: e, type: t, key: n } : void 0;
    st(o, s);
  }
}
function st(e, t) {
  let n = !1;
  _e <= rt ? dn(e) || (e.n |= ee, n = !fn(e)) : n = !e.has(T), n && (e.add(T), T.deps.push(e), process.env.NODE_ENV !== "production" && T.onTrack && T.onTrack(
    k(
      {
        effect: T
      },
      t
    )
  ));
}
function te(e, t, n, r, o, s) {
  const i = nt.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && y(e)) {
    const u = Number(r);
    i.forEach((f, c) => {
      (c === "length" || c >= u) && l.push(f);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        y(e) ? gt(n) && l.push(i.get("length")) : (l.push(i.get(ie)), se(e) && l.push(i.get(ot)));
        break;
      case "delete":
        y(e) || (l.push(i.get(ie)), se(e) && l.push(i.get(ot)));
        break;
      case "set":
        se(e) && l.push(i.get(ie));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: r, oldValue: o, oldTarget: s } : void 0;
  if (l.length === 1)
    l[0] && (process.env.NODE_ENV !== "production" ? de(l[0], a) : de(l[0]));
  else {
    const u = [];
    for (const f of l)
      f && u.push(...f);
    process.env.NODE_ENV !== "production" ? de(Oe(u), a) : de(Oe(u));
  }
}
function de(e, t) {
  const n = y(e) ? e : [...e];
  for (const r of n)
    r.computed && Mt(r, t);
  for (const r of n)
    r.computed || Mt(r, t);
}
function Mt(e, t) {
  (e !== T || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(k({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const gr = /* @__PURE__ */ Qn("__proto__,__v_isRef,__isVue"), gn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ht)
), mr = /* @__PURE__ */ yt(), _r = /* @__PURE__ */ yt(!0), vr = /* @__PURE__ */ yt(!0, !0), jt = /* @__PURE__ */ yr();
function yr() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = _(this);
      for (let s = 0, i = this.length; s < i; s++)
        F(r, "get", s + "");
      const o = r[t](...n);
      return o === -1 || o === !1 ? r[t](...n.map(_)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      _t();
      const r = _(this)[t].apply(this, n);
      return vt(), r;
    };
  }), e;
}
function br(e) {
  const t = _(this);
  return F(t, "has", e), t.hasOwnProperty(e);
}
function yt(e = !1, t = !1) {
  return function(r, o, s) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && s === (e ? t ? bn : yn : t ? Mr : vn).get(r))
      return r;
    const i = y(r);
    if (!e) {
      if (i && O(jt, o))
        return Reflect.get(jt, o, s);
      if (o === "hasOwnProperty")
        return br;
    }
    const l = Reflect.get(r, o, s);
    return (ht(o) ? gn.has(o) : gr(o)) || (e || F(r, "get", o), t) ? l : P(l) ? i && gt(o) ? l : l.value : x(l) ? e ? wn(l) : Nt(l) : l;
  };
}
const wr = /* @__PURE__ */ Nr();
function Nr(e = !1) {
  return function(n, r, o, s) {
    let i = n[r];
    if (ne(i) && P(i) && !P(o))
      return !1;
    if (!e && (!Be(o) && !ne(o) && (i = _(i), o = _(o)), !y(n) && P(i) && !P(o)))
      return i.value = o, !0;
    const l = y(n) && gt(r) ? Number(r) < n.length : O(n, r), a = Reflect.set(n, r, o, s);
    return n === _(s) && (l ? Se(o, i) && te(n, "set", r, o, i) : te(n, "add", r, o)), a;
  };
}
function Er(e, t) {
  const n = O(e, t), r = e[t], o = Reflect.deleteProperty(e, t);
  return o && n && te(e, "delete", t, void 0, r), o;
}
function Sr(e, t) {
  const n = Reflect.has(e, t);
  return (!ht(t) || !gn.has(t)) && F(e, "has", t), n;
}
function Or(e) {
  return F(e, "iterate", y(e) ? "length" : ie), Reflect.ownKeys(e);
}
const $r = {
  get: mr,
  set: wr,
  deleteProperty: Er,
  has: Sr,
  ownKeys: Or
}, mn = {
  get: _r,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && Rt(
      `Set operation on key "${String(t)}" failed: target is readonly.`,
      e
    ), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && Rt(
      `Delete operation on key "${String(t)}" failed: target is readonly.`,
      e
    ), !0;
  }
}, Vr = /* @__PURE__ */ k(
  {},
  mn,
  {
    get: vr
  }
), bt = (e) => e, Qe = (e) => Reflect.getPrototypeOf(e);
function Te(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = _(e), s = _(t);
  n || (t !== s && F(o, "get", t), F(o, "get", s));
  const { has: i } = Qe(o), l = r ? bt : n ? St : $e;
  if (i.call(o, t))
    return l(e.get(t));
  if (i.call(o, s))
    return l(e.get(s));
  e !== o && e.get(t);
}
function Pe(e, t = !1) {
  const n = this.__v_raw, r = _(n), o = _(e);
  return t || (e !== o && F(r, "has", e), F(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function De(e, t = !1) {
  return e = e.__v_raw, !t && F(_(e), "iterate", ie), Reflect.get(e, "size", e);
}
function Ft(e) {
  e = _(e);
  const t = _(this);
  return Qe(t).has.call(t, e) || (t.add(e), te(t, "add", e, e)), this;
}
function zt(e, t) {
  t = _(t);
  const n = _(this), { has: r, get: o } = Qe(n);
  let s = r.call(n, e);
  s ? process.env.NODE_ENV !== "production" && _n(n, r, e) : (e = _(e), s = r.call(n, e));
  const i = o.call(n, e);
  return n.set(e, t), s ? Se(t, i) && te(n, "set", e, t, i) : te(n, "add", e, t), this;
}
function kt(e) {
  const t = _(this), { has: n, get: r } = Qe(t);
  let o = n.call(t, e);
  o ? process.env.NODE_ENV !== "production" && _n(t, n, e) : (e = _(e), o = n.call(t, e));
  const s = r ? r.call(t, e) : void 0, i = t.delete(e);
  return o && te(t, "delete", e, void 0, s), i;
}
function Ht() {
  const e = _(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? se(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && te(e, "clear", void 0, void 0, n), r;
}
function Re(e, t) {
  return function(r, o) {
    const s = this, i = s.__v_raw, l = _(i), a = t ? bt : e ? St : $e;
    return !e && F(l, "iterate", ie), i.forEach((u, f) => r.call(o, a(u), a(f), s));
  };
}
function Ae(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = _(o), i = se(s), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = o[e](...r), f = n ? bt : t ? St : $e;
    return !t && F(
      s,
      "iterate",
      a ? ot : ie
    ), {
      // iterator protocol
      next() {
        const { value: c, done: d } = u.next();
        return d ? { value: c, done: d } : {
          value: l ? [f(c[0]), f(c[1])] : f(c),
          done: d
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Y(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${Ee(e)} operation ${n}failed: target is readonly.`,
        _(this)
      );
    }
    return e === "delete" ? !1 : this;
  };
}
function xr() {
  const e = {
    get(s) {
      return Te(this, s);
    },
    get size() {
      return De(this);
    },
    has: Pe,
    add: Ft,
    set: zt,
    delete: kt,
    clear: Ht,
    forEach: Re(!1, !1)
  }, t = {
    get(s) {
      return Te(this, s, !1, !0);
    },
    get size() {
      return De(this);
    },
    has: Pe,
    add: Ft,
    set: zt,
    delete: kt,
    clear: Ht,
    forEach: Re(!1, !0)
  }, n = {
    get(s) {
      return Te(this, s, !0);
    },
    get size() {
      return De(this, !0);
    },
    has(s) {
      return Pe.call(this, s, !0);
    },
    add: Y("add"),
    set: Y("set"),
    delete: Y("delete"),
    clear: Y("clear"),
    forEach: Re(!0, !1)
  }, r = {
    get(s) {
      return Te(this, s, !0, !0);
    },
    get size() {
      return De(this, !0);
    },
    has(s) {
      return Pe.call(this, s, !0);
    },
    add: Y("add"),
    set: Y("set"),
    delete: Y("delete"),
    clear: Y("clear"),
    forEach: Re(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = Ae(
      s,
      !1,
      !1
    ), n[s] = Ae(
      s,
      !0,
      !1
    ), t[s] = Ae(
      s,
      !1,
      !0
    ), r[s] = Ae(
      s,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  Ir,
  Cr,
  Tr,
  Pr
] = /* @__PURE__ */ xr();
function wt(e, t) {
  const n = t ? e ? Pr : Tr : e ? Cr : Ir;
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(
    O(n, o) && o in r ? n : r,
    o,
    s
  );
}
const Dr = {
  get: /* @__PURE__ */ wt(!1, !1)
}, Rr = {
  get: /* @__PURE__ */ wt(!0, !1)
}, Ar = {
  get: /* @__PURE__ */ wt(!0, !0)
};
function _n(e, t, n) {
  const r = _(n);
  if (r !== n && t.call(e, r)) {
    const o = ln(e);
    console.warn(
      `Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const vn = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakMap(), yn = /* @__PURE__ */ new WeakMap(), bn = /* @__PURE__ */ new WeakMap();
function jr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Fr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : jr(ln(e));
}
function Nt(e) {
  return ne(e) ? e : Et(
    e,
    !1,
    $r,
    Dr,
    vn
  );
}
function wn(e) {
  return Et(
    e,
    !0,
    mn,
    Rr,
    yn
  );
}
function Me(e) {
  return Et(
    e,
    !0,
    Vr,
    Ar,
    bn
  );
}
function Et(e, t, n, r, o) {
  if (!x(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const i = Fr(e);
  if (i === 0)
    return e;
  const l = new Proxy(
    e,
    i === 2 ? r : n
  );
  return o.set(e, l), l;
}
function le(e) {
  return ne(e) ? le(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ne(e) {
  return !!(e && e.__v_isReadonly);
}
function Be(e) {
  return !!(e && e.__v_isShallow);
}
function it(e) {
  return le(e) || ne(e);
}
function _(e) {
  const t = e && e.__v_raw;
  return t ? _(t) : e;
}
function zr(e) {
  return ir(e, "__v_skip", !0), e;
}
const $e = (e) => x(e) ? Nt(e) : e, St = (e) => x(e) ? wn(e) : e;
function Nn(e) {
  Z && T && (e = _(e), process.env.NODE_ENV !== "production" ? st(e.dep || (e.dep = Oe()), {
    target: e,
    type: "get",
    key: "value"
  }) : st(e.dep || (e.dep = Oe())));
}
function En(e, t) {
  e = _(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? de(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : de(n));
}
function P(e) {
  return !!(e && e.__v_isRef === !0);
}
function w(e) {
  return kr(e, !1);
}
function kr(e, t) {
  return P(e) ? e : new Hr(e, t);
}
class Hr {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : _(t), this._value = n ? t : $e(t);
  }
  get value() {
    return Nn(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Be(t) || ne(t);
    t = n ? t : _(t), Se(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : $e(t), En(this, t));
  }
}
function Fe(e) {
  return P(e) ? e.value : e;
}
const Br = {
  get: (e, t, n) => Fe(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return P(o) && !P(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function Lr(e) {
  return le(e) ? e : new Proxy(e, Br);
}
class Wr {
  constructor(t, n, r, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new pn(t, () => {
      this._dirty || (this._dirty = !0, En(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r;
  }
  get value() {
    const t = _(this);
    return Nn(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function Kr(e, t, n = !1) {
  let r, o;
  const s = $(e);
  s ? (r = e, o = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : pt) : (r = e.get, o = e.set);
  const i = new Wr(r, o, s || !o, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const ce = [];
function Ur(e) {
  ce.push(e);
}
function Gr() {
  ce.pop();
}
function b(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  _t();
  const n = ce.length ? ce[ce.length - 1].component : null, r = n && n.appContext.config.warnHandler, o = qr();
  if (r)
    ae(
      r,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        o.map(
          ({ vnode: s }) => `at <${Ln(n, s.type)}>`
        ).join(`
`),
        o
      ]
    );
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    o.length && s.push(`
`, ...Jr(o)), console.warn(...s);
  }
  vt();
}
function qr() {
  let e = ce[ce.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function Jr(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Yr(n));
  }), t;
}
function Yr({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, o = ` at <${Ln(
    e.component,
    e.type,
    r
  )}`, s = ">" + n;
  return e.props ? [o, ...Qr(e.props), s] : [o + s];
}
function Qr(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...Sn(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Sn(e, t, n) {
  return j(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : P(t) ? (t = Sn(e, _(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : $(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = _(t), n ? t : [`${e}=`, t]);
}
const Ot = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function ae(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (s) {
    On(s, t, n);
  }
  return o;
}
function Le(e, t, n, r) {
  if ($(e)) {
    const s = ae(e, t, n, r);
    return s && rr(s) && s.catch((i) => {
      On(i, t, n);
    }), s;
  }
  const o = [];
  for (let s = 0; s < e.length; s++)
    o.push(Le(e[s], t, n, r));
  return o;
}
function On(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy, l = process.env.NODE_ENV !== "production" ? Ot[n] : n;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let f = 0; f < u.length; f++)
          if (u[f](e, i, l) === !1)
            return;
      }
      s = s.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      ae(
        a,
        null,
        10,
        [e, i, l]
      );
      return;
    }
  }
  Xr(e, n, o, r);
}
function Xr(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const o = Ot[t];
    if (n && Ur(n), b(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && Gr(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let We = !1, lt = !1;
const B = [];
let X = 0;
const pe = [];
let U = null, Q = 0;
const $n = /* @__PURE__ */ Promise.resolve();
let $t = null;
const Zr = 100;
function Vt(e) {
  const t = $t || $n;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function eo(e) {
  let t = X + 1, n = B.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    Ve(B[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function xt(e) {
  (!B.length || !B.includes(
    e,
    We && e.allowRecurse ? X + 1 : X
  )) && (e.id == null ? B.push(e) : B.splice(eo(e.id), 0, e), Vn());
}
function Vn() {
  !We && !lt && (lt = !0, $t = $n.then(In));
}
function xn(e) {
  y(e) ? pe.push(...e) : (!U || !U.includes(
    e,
    e.allowRecurse ? Q + 1 : Q
  )) && pe.push(e), Vn();
}
function to(e) {
  if (pe.length) {
    const t = [...new Set(pe)];
    if (pe.length = 0, U) {
      U.push(...t);
      return;
    }
    for (U = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), U.sort((n, r) => Ve(n) - Ve(r)), Q = 0; Q < U.length; Q++)
      process.env.NODE_ENV !== "production" && Cn(e, U[Q]) || U[Q]();
    U = null, Q = 0;
  }
}
const Ve = (e) => e.id == null ? 1 / 0 : e.id, no = (e, t) => {
  const n = Ve(e) - Ve(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function In(e) {
  lt = !1, We = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), B.sort(no);
  const t = process.env.NODE_ENV !== "production" ? (n) => Cn(e, n) : pt;
  try {
    for (X = 0; X < B.length; X++) {
      const n = B[X];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        ae(n, null, 14);
      }
    }
  } finally {
    X = 0, B.length = 0, to(e), We = !1, $t = null, (B.length || pe.length) && In(e);
  }
}
function Cn(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Zr) {
      const r = t.ownerInstance, o = r && Tt(r.type);
      return b(
        `Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const ge = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (tt().__VUE_HMR_RUNTIME__ = {
  createRecord: Xe(ro),
  rerender: Xe(oo),
  reload: Xe(so)
});
const Ke = /* @__PURE__ */ new Map();
function ro(e, t) {
  return Ke.has(e) ? !1 : (Ke.set(e, {
    initialDef: ye(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ye(e) {
  return Wn(e) ? e.__vccOpts : e;
}
function oo(e, t) {
  const n = Ke.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, ye(r.type).render = t), r.renderCache = [], r.update();
  }));
}
function so(e, t) {
  const n = Ke.get(e);
  if (!n)
    return;
  t = ye(t), Bt(n.initialDef, t);
  const r = [...n.instances];
  for (const o of r) {
    const s = ye(o.type);
    ge.has(s) || (s !== n.initialDef && Bt(s, t), ge.add(s)), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (ge.add(s), o.ceReload(t.styles), ge.delete(s)) : o.parent ? xt(o.parent.update) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  xn(() => {
    for (const o of r)
      ge.delete(
        ye(o.type)
      );
  });
}
function Bt(e, t) {
  k(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Xe(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
function io(e, ...t) {
}
const lo = /* @__PURE__ */ co(
  "component:updated"
  /* COMPONENT_UPDATED */
);
function co(e) {
  return (t) => {
    io(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
let V = null, Tn = null;
function Lt(e) {
  const t = V;
  return V = e, Tn = e && e.type.__scopeId || null, t;
}
function ao(e, t = V, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && Qt(-1);
    const s = Lt(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Lt(s), r._d && Qt(1);
    }
    return process.env.NODE_ENV !== "production" && lo(t), i;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
const uo = (e) => e.__isSuspense;
function fo(e, t) {
  t && t.pendingBranch ? y(e) ? t.effects.push(...e) : t.effects.push(e) : xn(e);
}
const je = {};
function po(e, t, n) {
  return process.env.NODE_ENV !== "production" && !$(t) && b(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), Pn(e, t, n);
}
function Pn(e, t, { immediate: n, deep: r, flush: o, onTrack: s, onTrigger: i } = H) {
  var l;
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && b(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && b(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (E) => {
    b(
      "Invalid watch source: ",
      E,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = dr() === ((l = A) == null ? void 0 : l.scope) ? A : null;
  let f, c = !1, d = !1;
  if (P(e) ? (f = () => e.value, c = Be(e)) : le(e) ? (f = () => e, r = !0) : y(e) ? (d = !0, c = e.some((E) => le(E) || Be(E)), f = () => e.map((E) => {
    if (P(E))
      return E.value;
    if (le(E))
      return oe(E);
    if ($(E))
      return ae(E, u, 2);
    process.env.NODE_ENV !== "production" && a(E);
  })) : $(e) ? t ? f = () => ae(e, u, 2) : f = () => {
    if (!(u && u.isUnmounted))
      return v && v(), Le(
        e,
        u,
        3,
        [h]
      );
  } : (f = pt, process.env.NODE_ENV !== "production" && a(e)), t && r) {
    const E = f;
    f = () => oe(E());
  }
  let v, h = (E) => {
    v = z.onStop = () => {
      ae(E, u, 4);
    };
  }, N = d ? new Array(e.length).fill(je) : je;
  const p = () => {
    if (z.active)
      if (t) {
        const E = z.run();
        (r || c || (d ? E.some(
          (qn, Jn) => Se(qn, N[Jn])
        ) : Se(E, N))) && (v && v(), Le(t, u, 3, [
          E,
          // pass undefined as the old value when it's changed for the first time
          N === je ? void 0 : d && N[0] === je ? [] : N,
          h
        ]), N = E);
      } else
        z.run();
  };
  p.allowRecurse = !!t;
  let J;
  o === "sync" ? J = p : o === "post" ? J = () => Yt(p, u && u.suspense) : (p.pre = !0, u && (p.id = u.uid), J = () => xt(p));
  const z = new pn(f, J);
  return process.env.NODE_ENV !== "production" && (z.onTrack = s, z.onTrigger = i), t ? n ? p() : N = z.run() : o === "post" ? Yt(
    z.run.bind(z),
    u && u.suspense
  ) : z.run(), () => {
    z.stop(), u && u.scope && tr(u.scope.effects, z);
  };
}
function ho(e, t, n) {
  const r = this.proxy, o = j(e) ? e.includes(".") ? go(r, e) : () => r[e] : e.bind(r, r);
  let s;
  $(t) ? s = t : (s = t.handler, n = t);
  const i = A;
  ft(this);
  const l = Pn(o, s.bind(r), n);
  return i ? ft(i) : Hn(), l;
}
function go(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
function oe(e, t) {
  if (!x(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), P(e))
    oe(e.value, t);
  else if (y(e))
    for (let n = 0; n < e.length; n++)
      oe(e[n], t);
  else if (on(e) || se(e))
    e.forEach((n) => {
      oe(n, t);
    });
  else if (cn(e))
    for (const n in e)
      oe(e[n], t);
  return e;
}
function Wt(e, t) {
  const n = V;
  if (n === null)
    return process.env.NODE_ENV !== "production" && b("withDirectives can only be used inside render functions."), e;
  const r = Bn(n) || n.proxy, o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, l, a, u = H] = t[s];
    i && ($(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && oe(l), o.push({
      dir: i,
      instance: r,
      value: l,
      oldValue: void 0,
      arg: a,
      modifiers: u
    }));
  }
  return e;
}
const mo = (e) => !!e.type.__asyncLoader;
function _o(e, t, n = A, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      _t(), ft(n);
      const l = Le(t, n, e, i);
      return Hn(), vt(), l;
    });
    return r ? o.unshift(s) : o.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const o = sr(Ot[e].replace(/ hook$/, ""));
    b(
      `${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const vo = (e) => (t, n = A) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  _o(e, (...r) => t(...r), n)
), yo = vo("m"), ct = "components", Dn = Symbol.for("v-ndc");
function bo(e) {
  return j(e) ? wo(ct, e, !1) || e : e || Dn;
}
function wo(e, t, n = !0, r = !1) {
  const o = V || A;
  if (o) {
    const s = o.type;
    if (e === ct) {
      const l = Tt(
        s,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (l && (l === t || l === He(t) || l === Ee(He(t))))
        return s;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Kt(o[e] || s[e], t) || // global registration
      Kt(o.appContext[e], t)
    );
    if (!i && r)
      return s;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const l = e === ct ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      b(`Failed to resolve ${e.slice(0, -1)}: ${t}${l}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && b(
      `resolve${Ee(e.slice(0, -1))} can only be used in render() or setup().`
    );
}
function Kt(e, t) {
  return e && (e[t] || e[He(t)] || e[Ee(He(t))]);
}
function be(e, t, n, r) {
  let o;
  const s = n && n[r];
  if (y(e) || j(e)) {
    o = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      o[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && b(`The v-for range expect an integer value but got ${e}.`), o = new Array(e);
    for (let i = 0; i < e; i++)
      o[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (x(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (i, l) => t(i, l, void 0, s && s[l])
      );
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let l = 0, a = i.length; l < a; l++) {
        const u = i[l];
        o[l] = t(e[u], u, l, s && s[l]);
      }
    }
  else
    o = [];
  return n && (n[r] = o), o;
}
function q(e, t, n = {}, r, o) {
  if (V.isCE || V.parent && mo(V.parent) && V.parent.isCE)
    return t !== "default" && (n.name = t), Ce("slot", n, r && r());
  let s = e[t];
  process.env.NODE_ENV !== "production" && s && s.length > 1 && (b(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), s = () => []), s && s._c && (s._d = !1), g();
  const i = s && Rn(s(n)), l = re(
    W,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (r ? r() : []),
    i && e._ === 1 ? 64 : -2
  );
  return !o && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), s && s._c && (s._d = !0), l;
}
function Rn(e) {
  return e.some((t) => Mn(t) ? !(t.type === Ge || t.type === W && !Rn(t.children)) : !0) ? e : null;
}
const at = (e) => e ? Ao(e) ? Bn(e) || e.proxy : at(e.parent) : null, we = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ k(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? Me(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? Me(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? Me(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? Me(e.refs) : e.refs,
    $parent: (e) => at(e.parent),
    $root: (e) => at(e.root),
    $emit: (e) => e.emit,
    $options: (e) => So(e),
    $forceUpdate: (e) => e.f || (e.f = () => xt(e.update)),
    $nextTick: (e) => e.n || (e.n = Vt.bind(e.proxy)),
    $watch: (e) => ho.bind(e)
  })
), No = (e) => e === "_" || e === "$", Ze = (e, t) => e !== H && !e.__isScriptSetup && O(e, t), Eo = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: l, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const v = i[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (Ze(r, t))
          return i[t] = 1, r[t];
        if (o !== H && O(o, t))
          return i[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && O(u, t)
        )
          return i[t] = 3, s[t];
        if (n !== H && O(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const f = we[t];
    let c, d;
    if (f)
      return t === "$attrs" ? (F(e, "get", t), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && F(e, "get", t), f(e);
    if (
      // css module (injected by vue-loader)
      (c = l.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== H && O(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      d = a.config.globalProperties, O(d, t)
    )
      return d[t];
    process.env.NODE_ENV !== "production" && V && (!j(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (o !== H && No(t[0]) && O(o, t) ? b(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === V && b(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return Ze(o, t) ? (o[t] = n, !0) : process.env.NODE_ENV !== "production" && o.__isScriptSetup && O(o, t) ? (b(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== H && O(r, t) ? (r[t] = n, !0) : O(e.props, t) ? (process.env.NODE_ENV !== "production" && b(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && b(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s }
  }, i) {
    let l;
    return !!n[i] || e !== H && O(e, i) || Ze(t, i) || (l = s[0]) && O(l, i) || O(r, i) || O(we, i) || O(o.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : O(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Eo.ownKeys = (e) => (b(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function Ut(e) {
  return y(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function So(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: o,
    optionsCache: s,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = s.get(t);
  let a;
  return l ? a = l : !o.length && !n && !r ? a = t : (a = {}, o.length && o.forEach(
    (u) => Ue(a, u, i, !0)
  ), Ue(a, t, i)), x(t) && s.set(t, a), a;
}
function Ue(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && Ue(e, s, n, !0), o && o.forEach(
    (i) => Ue(e, i, n, !0)
  );
  for (const i in t)
    if (r && i === "expose")
      process.env.NODE_ENV !== "production" && b(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = Oo[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Oo = {
  data: Gt,
  props: Jt,
  emits: Jt,
  // objects
  methods: ve,
  computed: ve,
  // lifecycle
  beforeCreate: C,
  created: C,
  beforeMount: C,
  mounted: C,
  beforeUpdate: C,
  updated: C,
  beforeDestroy: C,
  beforeUnmount: C,
  destroyed: C,
  unmounted: C,
  activated: C,
  deactivated: C,
  errorCaptured: C,
  serverPrefetch: C,
  // assets
  components: ve,
  directives: ve,
  // watch
  watch: Vo,
  // provide / inject
  provide: Gt,
  inject: $o
};
function Gt(e, t) {
  return t ? e ? function() {
    return k(
      $(e) ? e.call(this, this) : e,
      $(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function $o(e, t) {
  return ve(qt(e), qt(t));
}
function qt(e) {
  if (y(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function C(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ve(e, t) {
  return e ? k(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Jt(e, t) {
  return e ? y(e) && y(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : k(
    /* @__PURE__ */ Object.create(null),
    Ut(e),
    Ut(t ?? {})
  ) : t;
}
function Vo(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = k(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = C(e[r], t[r]);
  return n;
}
function xo(e, t) {
  if (!A)
    process.env.NODE_ENV !== "production" && b("provide() can only be used inside setup().");
  else {
    let n = A.provides;
    const r = A.parent && A.parent.provides;
    r === n && (n = A.provides = Object.create(r)), n[e] = t;
  }
}
const Yt = fo, Io = (e) => e.__isTeleport, W = Symbol.for("v-fgt"), Co = Symbol.for("v-txt"), Ge = Symbol.for("v-cmt"), ze = [];
let K = null;
function g(e = !1) {
  ze.push(K = e ? null : []);
}
function To() {
  ze.pop(), K = ze[ze.length - 1] || null;
}
let xe = 1;
function Qt(e) {
  xe += e;
}
function An(e) {
  return e.dynamicChildren = xe > 0 ? K || Xn : null, To(), xe > 0 && K && K.push(e), e;
}
function m(e, t, n, r, o, s) {
  return An(
    I(
      e,
      t,
      n,
      r,
      o,
      s,
      !0
      /* isBlock */
    )
  );
}
function re(e, t, n, r, o) {
  return An(
    Ce(
      e,
      t,
      n,
      r,
      o,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Mn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Po = (...e) => zn(
  ...e
), jn = "__vInternal", Fn = ({ key: e }) => e ?? null, ke = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? j(e) || P(e) || $(e) ? { i: V, r: e, k: t, f: !!n } : e : null);
function I(e, t = null, n = null, r = 0, o = null, s = e === W ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Fn(t),
    ref: t && ke(t),
    scopeId: Tn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: V
  };
  return l ? (It(a, n), s & 128 && e.normalize(a)) : n && (a.shapeFlag |= j(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && b("VNode created with invalid key (NaN). VNode type:", a.type), xe > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  K && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && K.push(a), a;
}
const Ce = process.env.NODE_ENV !== "production" ? Po : zn;
function zn(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === Dn) && (process.env.NODE_ENV !== "production" && !e && b(`Invalid vnode type when creating vnode: ${e}.`), e = Ge), Mn(e)) {
    const l = qe(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && It(l, n), xe > 0 && !s && K && (l.shapeFlag & 6 ? K[K.indexOf(e)] = l : K.push(l)), l.patchFlag |= -2, l;
  }
  if (Wn(e) && (e = e.__vccOpts), t) {
    t = Do(t);
    let { class: l, style: a } = t;
    l && !j(l) && (t.class = R(l)), x(a) && (it(a) && !y(a) && (a = k({}, a)), t.style = M(a));
  }
  const i = j(e) ? 1 : uo(e) ? 128 : Io(e) ? 64 : x(e) ? 4 : $(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && it(e) && (e = _(e), b(
    "Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), I(
    e,
    t,
    n,
    r,
    o,
    i,
    s,
    !0
  );
}
function Do(e) {
  return e ? it(e) || jn in e ? k({}, e) : e : null;
}
function qe(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: s, children: i } = e, l = t ? Ro(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Fn(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? y(o) ? o.concat(ke(t)) : [o, ke(t)] : ke(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && y(i) ? i.map(kn) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== W ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && qe(e.ssContent),
    ssFallback: e.ssFallback && qe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function kn(e) {
  const t = qe(e);
  return y(e.children) && (t.children = e.children.map(kn)), t;
}
function ut(e = " ", t = 0) {
  return Ce(Co, null, e, t);
}
function D(e = "", t = !1) {
  return t ? (g(), re(Ge, null, e)) : Ce(Ge, null, e);
}
function It(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (y(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), It(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(jn in t) ? t._ctx = V : o === 3 && V && (V.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    $(t) ? (t = { default: t, _ctx: V }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [ut(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Ro(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = R([t.class, r.class]));
      else if (o === "style")
        t.style = M([t.style, r.style]);
      else if (er(o)) {
        const s = t[o], i = r[o];
        i && s !== i && !(y(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i);
      } else
        o !== "" && (t[o] = r[o]);
  }
  return t;
}
let A = null, Ct, fe, Xt = "__VUE_INSTANCE_SETTERS__";
(fe = tt()[Xt]) || (fe = tt()[Xt] = []), fe.push((e) => A = e), Ct = (e) => {
  fe.length > 1 ? fe.forEach((t) => t(e)) : fe[0](e);
};
const ft = (e) => {
  Ct(e), e.scope.on();
}, Hn = () => {
  A && A.scope.off(), Ct(null);
};
function Ao(e) {
  return e.vnode.shapeFlag & 4;
}
let Mo = !1;
function Bn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Lr(zr(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in we)
          return we[n](e);
      },
      has(t, n) {
        return n in t || n in we;
      }
    }));
}
const jo = /(?:^|[-_])(\w)/g, Fo = (e) => e.replace(jo, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Tt(e, t = !0) {
  return $(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Ln(e, t, n = !1) {
  let r = Tt(t);
  if (!r && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (r = o[1]);
  }
  if (!r && e && e.parent) {
    const o = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    r = o(
      e.components || e.parent.type.components
    ) || o(e.appContext.components);
  }
  return r ? Fo(r) : n ? "App" : "Anonymous";
}
function Wn(e) {
  return $(e) && "__vccOpts" in e;
}
const S = (e, t) => Kr(e, t, Mo);
function et(e) {
  return !!(e && e.__v_isShallow);
}
function zo() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, o = {
    header(c) {
      return x(c) ? c.__isVue ? ["div", e, "VueInstance"] : P(c) ? [
        "div",
        {},
        ["span", e, f(c)],
        "<",
        l(c.value),
        ">"
      ] : le(c) ? [
        "div",
        {},
        ["span", e, et(c) ? "ShallowReactive" : "Reactive"],
        "<",
        l(c),
        `>${ne(c) ? " (readonly)" : ""}`
      ] : ne(c) ? [
        "div",
        {},
        ["span", e, et(c) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(c),
        ">"
      ] : null : null;
    },
    hasBody(c) {
      return c && c.__isVue;
    },
    body(c) {
      if (c && c.__isVue)
        return [
          "div",
          {},
          ...s(c.$)
        ];
    }
  };
  function s(c) {
    const d = [];
    c.type.props && c.props && d.push(i("props", _(c.props))), c.setupState !== H && d.push(i("setup", c.setupState)), c.data !== H && d.push(i("data", _(c.data)));
    const v = a(c, "computed");
    v && d.push(i("computed", v));
    const h = a(c, "inject");
    return h && d.push(i("injected", h)), d.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: c }]
    ]), d;
  }
  function i(c, d) {
    return d = k({}, d), Object.keys(d).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        c
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(d).map((v) => [
          "div",
          {},
          ["span", r, v + ": "],
          l(d[v], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(c, d = !0) {
    return typeof c == "number" ? ["span", t, c] : typeof c == "string" ? ["span", n, JSON.stringify(c)] : typeof c == "boolean" ? ["span", r, c] : x(c) ? ["object", { object: d ? _(c) : c }] : ["span", n, String(c)];
  }
  function a(c, d) {
    const v = c.type;
    if ($(v))
      return;
    const h = {};
    for (const N in c.ctx)
      u(v, N, d) && (h[N] = c.ctx[N]);
    return h;
  }
  function u(c, d, v) {
    const h = c[v];
    if (y(h) && h.includes(d) || x(h) && d in h || c.extends && u(c.extends, d, v) || c.mixins && c.mixins.some((N) => u(N, d, v)))
      return !0;
  }
  function f(c) {
    return et(c) ? "ShallowRef" : c.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
const ko = ["ctrl", "shift", "alt", "meta"], Ho = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => ko.some((n) => e[`${n}Key`] && !t.includes(n))
}, dt = (e, t) => (n, ...r) => {
  for (let o = 0; o < t.length; o++) {
    const s = Ho[t[o]];
    if (s && s(n, t))
      return;
  }
  return e(n, ...r);
}, Zt = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : me(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), me(e, !0), r.enter(e)) : r.leave(e, () => {
      me(e, !1);
    }) : me(e, t));
  },
  beforeUnmount(e, { value: t }) {
    me(e, t);
  }
};
function me(e, t) {
  e.style.display = t ? e._vod : "none";
}
function Bo() {
  zo();
}
process.env.NODE_ENV !== "production" && Bo();
function Je(e) {
  return Ie(e) || rn(e) || nn(e) ? e : ["auto", "max-content", "min-content"].includes(e);
}
function Lo(e) {
  return Ie(e) || rn(e) || nn(e) ? e : !1;
}
function Kn(e) {
  if (Ie(e))
    return !0;
  if (ue(e))
    return ["small", "normal", "medium", "large"].includes(e) ? !0 : Lo(e);
}
function Pt(e) {
  return ["square", "round", "no-border", "round-no-border", "no-shape"].includes(e);
}
function Wo(e) {
  return ["fill", "cover", "contain", "none", "scale-down"].includes(e);
}
const Ko = {
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
    validator: (e) => Kn(e)
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
    validator: (e) => Wo(e)
  }
}, Uo = [
  /**
   * @description when image load failed
   */
  "error"
];
function Go(e) {
  let t = null;
  return t = ue(e) && { small: 24, normal: 32, medium: 40, large: 48 }[e], t && (e = t), Ne(e);
}
function en(e, t = !1) {
  return t ? parseInt(e) : Ie(e) ? `${e}px` : e;
}
function he(e, t = "") {
  let n = [];
  return ue(e) && e !== "" ? n.push(t + "--" + e) : Yn(e) && e.forEach((r) => ue(r) && r !== "" && n.push(t + "--" + r)), n;
}
function Ne(e) {
  return Ie(e) ? `${e}px` : e;
}
const qo = ["src", "alt"], Un = /* @__PURE__ */ Object.assign({ name: "NlAvatar" }, {
  __name: "avatar",
  props: Ko,
  emits: Uo,
  setup(e, { emit: t }) {
    const n = e, r = w(!1), o = S(() => Go(n.size)), s = S(() => ({ "--size": o.value })), i = S(() => ({ objectFit: n.fit })), l = S(() => ({ fontSize: `calc(${o.value} / 2.5)` })), a = S(() => {
      const { theme: f, shape: c } = n;
      let d = [];
      return d = ["nl-avatar", ...he(f, "nl-avatar")], d.push("nl-avatar--" + c), d;
    });
    function u(f) {
      r.value = !0, t("error", f);
    }
    return (f, c) => (g(), m("div", {
      class: R(a.value),
      onClick: c[0] || (c[0] = (...d) => f.clickHandler && f.clickHandler(...d)),
      style: M(s.value)
    }, [
      f.src && !r.value ? (g(), m("img", {
        key: 0,
        src: f.src,
        alt: f.alt,
        onError: u,
        style: M(i.value)
      }, null, 44, qo)) : f.icon ? (g(), m("i", {
        key: 1,
        class: R(["iconfont", f.icon]),
        style: M(l.value)
      }, null, 6)) : q(f.$slots, "default", { key: 2 })
    ], 6));
  }
}), Jo = {
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
    validator: (e) => Kn(e)
  },
  /**
   * @description avatar shape
   */
  shape: {
    type: String,
    default: "round",
    validator: (e) => Pt(e)
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
}, Yo = [
  /**
   * @description when add button clicked
   */
  "add"
];
const Qo = { class: "nl-avatar-group" }, Xo = /* @__PURE__ */ Object.assign({ name: "NlAvatarGroup" }, {
  __name: "avatar-group",
  props: Jo,
  emits: Yo,
  setup(e, { emit: t }) {
    const n = w(null);
    function r(o) {
      n.value || (t("add", o), n.value = setTimeout(function() {
        n.value = null;
      }, 1e3));
    }
    return (o, s) => (g(), m("div", Qo, [
      (g(!0), m(W, null, be(o.avatars, (i, l) => (g(), m(W, null, [
        i ? (g(), re(i, {
          key: 0,
          shape: "round",
          size: o.size,
          icon: i.icon,
          src: i.src,
          alt: i.alt,
          fit: i.fit,
          style: M({ zIndex: o.avatars.length - l })
        }, null, 8, ["size", "icon", "src", "alt", "fit", "style"])) : D("", !0)
      ], 64))), 256)),
      Ce(Un, {
        theme: "add",
        size: o.size,
        icon: "icon-plus",
        shape: "round",
        style: { cursor: "pointer" },
        onClick: dt(r, ["stop"])
      }, null, 8, ["size", "onClick"])
    ]));
  }
}), Zo = G(Un), es = G(Xo), ts = {
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
    validator: (e) => Je(e)
  },
  /**
   * @description div height
   */
  height: {
    type: [String, Number],
    validator: (e) => Je(e)
  }
};
const ns = /* @__PURE__ */ Object.assign({ name: "NlDiv" }, {
  __name: "div",
  props: ts,
  setup(e) {
    const t = e, n = S(() => ({
      "--flex-direction": t.vertical ? "column" : void 0,
      "--align-items": t.alignItems,
      "--justify-content": t.justifyContent,
      "--flex-wrap": t.flexWrap,
      "--gap": Ne(t.gap),
      "--flex": t.flex,
      "--width": Ne(t.width),
      "--height": Ne(t.height)
    }));
    return (r, o) => (g(), m("div", {
      class: "nl-div",
      style: M(n.value)
    }, [
      q(r.$slots, "default")
    ], 4));
  }
}), rs = G(ns), os = {
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
    validator: (e) => Pt(e)
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
};
const ss = ["disabled"], is = {
  key: 2,
  class: "nl-button__text"
}, ls = /* @__PURE__ */ Object.assign({ name: "NlButton" }, {
  __name: "button",
  props: os,
  setup(e) {
    const t = e, n = S(() => {
      let r = [];
      return r = ["nl-button", ...he(t.theme, "nl-button")], r.push(`nl-button--${t.shape}`), t.disabled && r.push("nl-button--disabled"), r;
    });
    return (r, o) => (g(), m("button", {
      class: R(n.value),
      disabled: r.disabled
    }, [
      r.loading ? (g(), m("i", {
        key: 0,
        class: R(["nl-button__loading-icon iconfont", r.loadingIcon])
      }, null, 2)) : r.icon ? (g(), m("i", {
        key: 1,
        class: R(["iconfont", r.icon])
      }, null, 2)) : D("", !0),
      r.$slots.default ? (g(), m("span", is, [
        q(r.$slots, "default")
      ])) : D("", !0)
    ], 10, ss));
  }
}), cs = {
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
const as = ["textContent"], us = /* @__PURE__ */ Object.assign({ name: "NlBadge" }, {
  __name: "badge",
  props: cs,
  setup(e) {
    const t = e, n = S(() => {
      let o = [];
      return o = ["nl-badge", ...he(t.theme)], t.dot && o.push("nl-badge--dot"), o;
    }), r = S(() => t.dot ? "" : ue(t.value) ? t.value : t.value > t.max ? `${t.max}+` : t.value);
    return (o, s) => (g(), m("div", {
      class: R(n.value)
    }, [
      q(o.$slots, "default"),
      !o.hidden && (r.value || o.dot) ? (g(), m("sup", {
        key: 0,
        textContent: L(r.value)
      }, null, 8, as)) : D("", !0)
    ], 2));
  }
}), fs = G(ls), ds = G(us), ps = {
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
    validator: (e) => Pt(e)
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
    validator: (e) => Je(e)
  },
  /**
   * @description Input height (Quick set)
   */
  height: {
    type: String,
    default: "36px",
    validator: (e) => Je(e)
  }
}, hs = [
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
], gs = { class: "word-counter" }, Gn = /* @__PURE__ */ Object.assign({ name: "WordCounter" }, {
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
    const t = e, n = S(() => {
      const { mode: r, maxlength: o, length: s } = t;
      if (r === "off")
        return !1;
      let i = "";
      const l = o !== -1 && parseInt(o);
      return r !== "word-left" && (i += `${s} / ${l || "-"}`), r === "both" && (i += " , "), r !== "word-limit" && (i += l ? l - s : "-"), i;
    });
    return (r, o) => (g(), m("div", gs, L(n.value), 1));
  }
});
const ms = ["type", "value", "placeholder", "maxlength", "autocomplete", "disabled", "readonly"], _s = { class: "button-group" }, vs = ["onClick"], ys = ["onClick"], bs = /* @__PURE__ */ Object.assign({ name: "NlInput" }, {
  __name: "input",
  props: ps,
  emits: hs,
  setup(e, { emit: t }) {
    var N;
    const n = e, r = w(), o = w(!1), s = w(!1), i = w(((N = n.modelValue) == null ? void 0 : N.length) || 0), l = S(() => {
      let p = ["nl-input"];
      return p = [...p, ...he(n.theme, "nl-input")], p.push("nl-input--" + n.shape), n.disabled && p.push("nl-input--disabled"), o.value && p.push("nl-input--focused"), p;
    }), a = S(() => ({
      "--input-width": en(n.width),
      "--input-height": en(n.height)
    }));
    function u(p) {
      o.value = !n.disabled && !n.readonly, t("focused", p);
    }
    function f(p) {
      o.value = !1, t("blured", p);
    }
    function c(p) {
      const J = n.parser(p.target.value);
      t("update:modelValue", J), i.value = J.length, t("inputted", p);
    }
    function d(p) {
      t("changed", p);
    }
    function v() {
      const p = r.value.value;
      t("update:modelValue", ""), i.value = 0, Vt(() => r.value.focus()), t("cleared", p);
    }
    function h() {
      s.value = !s.value;
    }
    return po(
      () => n.modelValue,
      () => i.value = n.modelValue.length
    ), (p, J) => (g(), m("div", {
      class: R(l.value),
      style: M(a.value)
    }, [
      p.icon ? (g(), m("i", {
        key: 0,
        class: R(["iconfont", p.icon])
      }, null, 2)) : D("", !0),
      q(p.$slots, "prefix", {}, () => [
        ut(L(p.prefix), 1)
      ]),
      I("input", {
        ref_key: "input",
        ref: r,
        type: s.value ? "text" : p.type,
        value: p.formatter(p.modelValue),
        placeholder: p.placeholder,
        maxlength: p.maxlength,
        autocomplete: p.autocomplete,
        disabled: p.disabled,
        readonly: !p.disabled && p.readonly,
        onFocus: u,
        onBlur: f,
        onInput: c,
        onChange: d
      }, null, 40, ms),
      q(p.$slots, "suffix", {}, () => [
        ut(L(p.suffix), 1)
      ]),
      I("div", _s, [
        p.type === "password" && p.allowShowPassword ? Wt((g(), m("i", {
          key: 0,
          class: R(["iconfont", s.value ? "icon-eye" : "icon-eye-off"]),
          onClick: dt(h, ["stop"])
        }, null, 10, vs)), [
          [Zt, p.modelValue]
        ]) : D("", !0),
        p.type !== "file" && p.clearable ? Wt((g(), m("i", {
          key: 1,
          class: "iconfont icon-clear",
          onClick: dt(v, ["stop"])
        }, null, 8, ys)), [
          [Zt, p.modelValue]
        ]) : D("", !0)
      ]),
      p.counter !== "off" ? (g(), re(Gn, {
        key: 1,
        mode: p.counter,
        length: i.value,
        maxlength: p.maxlength
      }, null, 8, ["mode", "length", "maxlength"])) : D("", !0)
    ], 6));
  }
}), ws = {
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
}, Ns = [
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
const Es = ["rows", "value", "placeholder", "readonly", "disabled", "maxlength"], Ss = ["value"], Os = /* @__PURE__ */ Object.assign({ name: "NlTextarea" }, {
  __name: "textarea",
  props: ws,
  emits: Ns,
  setup(e, { emit: t }) {
    var v;
    const n = e, r = w(), o = w(), s = w(!1), i = w(((v = n.modelValue) == null ? void 0 : v.length) || 0), l = S(() => {
      let h = [];
      return h = ["nl-textarea", ...he(n.theme, "nl-textarea")], h.push("nl-textarea--" + n.shape), n.disabled && h.push("nl-textarea--disabled"), s.value && h.push("nl-textarea--focused"), h;
    }), a = S(() => {
      const { autosize: h, resize: N, rows: p } = n;
      return {
        "--rows": p,
        "--overflow": h ? "hidden" : "auto",
        "--resize": N ? "vertical" : "none"
      };
    });
    function u(h) {
      s.value = !n.disabled && !n.readonly, t("focused", h);
    }
    function f(h) {
      s.value = !1, t("blured", h);
    }
    function c(h) {
      t("update:modelValue", h.target.value), i.value = h.target.textLength, n.autosize && Vt(() => {
        r.value.style.height = o.value.scrollHeight + "px";
      }), t("inputted", h);
    }
    function d(h) {
      t("changed", h);
    }
    return (h, N) => (g(), m("div", {
      class: R(l.value),
      style: M(a.value)
    }, [
      I("textarea", {
        ref_key: "textarea",
        ref: r,
        rows: h.rows,
        value: h.modelValue,
        placeholder: h.placeholder,
        readonly: h.readonly,
        disabled: h.disabled,
        maxlength: h.maxlength,
        onFocus: u,
        onBlur: f,
        onInput: c,
        onChange: d
      }, null, 40, Es),
      h.autosize && !n.disabled && !n.readonly ? (g(), m("textarea", {
        key: 0,
        class: "backend-textarea",
        ref_key: "backendTextarea",
        ref: o,
        value: h.modelValue
      }, null, 8, Ss)) : D("", !0),
      h.counter !== "off" ? (g(), re(Gn, {
        key: 1,
        mode: h.counter,
        maxlength: h.maxlength,
        length: i.value
      }, null, 8, ["mode", "maxlength", "length"])) : D("", !0)
    ], 6));
  }
}), $s = G(bs), Vs = G(Os), xs = {
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
const Is = /* @__PURE__ */ Object.assign({ name: "NlLink" }, {
  __name: "link",
  props: xs,
  setup(e) {
    const t = e, n = S(() => {
      let r = [];
      return r = ["nl-link", ...he(t.theme, "nl-link")], t.actived && r.push("nl-link--actived"), t.disabled && r.push("nl-link--disabled"), r;
    });
    return (r, o) => (g(), re(bo(r.disabled ? "a" : r.tag), {
      class: R(n.value),
      href: r.disabled || !r.href ? void 0 : r.href,
      to: r.to || r.href || void 0,
      "active-class": "nl-link--actived"
    }, {
      default: ao(() => [
        r.icon ? (g(), m("i", {
          key: 0,
          class: R(["nl-link__icon", r.icon && `iconfont ${r.icon}`])
        }, null, 2)) : q(r.$slots, "icon", { key: 1 }),
        q(r.$slots, "default")
      ]),
      _: 3
    }, 8, ["class", "href", "to"]));
  }
}), Cs = G(Is), Ts = {
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
}, Ps = [
  /**
   * @description Call when progress was hundred percent
   */
  "full"
];
const Ds = {
  key: 0,
  class: "nl-progress--line"
}, Rs = { class: "nl-progress__outer-bar" }, As = { key: 0 }, Ms = /* @__PURE__ */ I("circle", {
  class: "nl-progress__outer-path",
  r: "50",
  cx: "50",
  cy: "50"
}, null, -1), js = /* @__PURE__ */ I("circle", {
  class: "nl-progress__inner-path",
  r: "50",
  cx: "50",
  cy: "50"
}, null, -1), Fs = [
  Ms,
  js
], zs = { class: "nl-progress__text" }, ks = /* @__PURE__ */ Object.assign({ name: "NlProgress" }, {
  __name: "progress",
  props: Ts,
  emits: Ps,
  setup(e, { emit: t }) {
    const n = e, r = S(() => n.percentage < 0 ? "0%" : (n.percentage === 100 && t("full"), n.percentage > 100 ? "100%" : n.percentage + "%")), o = S(() => Ne(n.strokeWidth / n.scale)), s = S(() => ({
      "--stroke-width": o.value,
      "--flex": n.type === "line" ? "auto" : "none"
    })), i = S(() => Math.ceil(2 * Math.PI * 50)), l = S(() => ({
      "--circle-size": `${n.scale * 100}px`,
      "--stroke-dash-array": i.value,
      "--stroke-dash-offset": Math.ceil((1 - parseInt(r.value) / 100) * i.value)
    }));
    return (a, u) => (g(), m("div", {
      class: "nl-progress",
      style: M(s.value)
    }, [
      a.type === "line" ? (g(), m("div", Ds, [
        I("div", Rs, [
          I("div", {
            class: "nl-progress__inner-bar",
            style: M({ width: r.value })
          }, [
            a.showInnerText ? (g(), m("span", As, L(r.value), 1)) : D("", !0)
          ], 4)
        ])
      ])) : a.type === "circle" ? (g(), m("svg", {
        key: 1,
        class: "nl-progress--circle",
        viewBox: "0 0 100 100",
        style: M(l.value)
      }, Fs, 4)) : D("", !0),
      a.showInnerText ? D("", !0) : q(a.$slots, "default", { key: 2 }, () => [
        I("span", zs, L(a.formatter(r.value)), 1)
      ])
    ], 4));
  }
}), Hs = G(ks), Bs = {
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
}, Ls = (e = 1) => {
  const t = w(e * 60), n = w(t.value * 24), r = w(parseInt(e / 3) + 1), o = w(t.value / r.value), s = w(parseInt(60 / e)), i = w(1e3 * s.value), l = Nt({ left: 0, text: "0:00" });
  function a(c) {
    if (typeof c != "string")
      return;
    const d = c.split(":"), v = d[0] * t.value, h = d[1] * (t.value / 60), N = (d[2] || 0) / s.value;
    return parseInt(v + h + N + 24);
  }
  function u(c) {
    l.left = a(c) - 2;
  }
  function f(c) {
    l.text = c;
  }
  return {
    width: n,
    scaleLevel: r,
    timeScaleGap: o,
    updateTime: i,
    pointer: l,
    calcLeftValueByTimeString: a,
    updatePointerLeft: u,
    updatePointerText: f
  };
}, Ws = () => {
  const e = w(null), t = w(!1), n = w(!1), r = w(!1), o = (u) => e.value = u;
  function s(u, f = -0.3, c = !1) {
    if (!e.value)
      return;
    const { clientWidth: d } = e.value;
    f = Math.floor(f * d), e.value.scrollLeft = u + f, a(u), t.value = c;
  }
  function i(u = 0.5) {
    if (!e.value || n.value)
      return;
    const { scrollLeft: f, clientWidth: c } = e.value, d = f - parseInt(c * u);
    s(d, 0, !0);
  }
  function l(u = 0.5) {
    if (!e.value || r.value)
      return;
    const { scrollLeft: f, clientWidth: c } = e.value, d = f + parseInt(c * u);
    s(d, 0, !0);
  }
  function a(u) {
    const { clientWidth: f, scrollWidth: c } = e.value;
    r.value = f + u >= c, n.value = u <= 0;
  }
  return { freeMode: t, onStart: n, onEnd: r, setTarget: o, moveTo: s, moveLeft: i, moveRight: l };
};
const Ks = { class: "line" }, Us = { class: "line__title" }, Gs = { class: "line__cards" }, qs = {
  __name: "line",
  props: { lines: Object },
  setup(e) {
    return (t, n) => (g(), m("div", Ks, [
      I("div", Us, [
        I("p", null, L(e.lines.title), 1)
      ]),
      I("div", Gs, [
        (g(!0), m(W, null, be(e.lines.cards, (r) => (g(), re(r, { card: r }, null, 8, ["card"]))), 256))
      ])
    ]));
  }
};
const Js = { class: "timeline__scale-bar" }, Ys = { key: 0 }, Qs = { key: 1 }, Xs = { class: "pointer" }, Zs = { key: 0 }, ei = { class: "timeline__lines-container" }, ti = /* @__PURE__ */ Object.assign({ name: "NlTimeline" }, {
  __name: "timeline",
  props: Bs,
  setup(e, { expose: t }) {
    const n = e, r = Ls(n.scale), o = Ws(), s = w(), i = w((/* @__PURE__ */ new Date()).toLocaleTimeString());
    xo("timeline", r), t({
      findPointer: () => o.moveTo(r.pointer.left),
      moveRight: o.moveRight,
      moveLeft: o.moveLeft
    });
    const l = S(() => ({
      "--width": r.width.value + "px",
      "--scale-bar-gap": r.timeScaleGap.value + "px",
      "--scale-bar-pointer-left": r.pointer.left + "px",
      "--scale-bar-pointer-height": n.lines.length * 71 + "px"
    }));
    return yo(() => {
      o.setTarget(s.value), r.updatePointerLeft(i.value), o.moveTo(r.pointer.left), setInterval(() => {
        r.updatePointerLeft(i.value), o.moveTo(r.pointer.left);
      }, r.updateTime.value), setInterval(() => {
        i.value = (/* @__PURE__ */ new Date()).toLocaleTimeString(), r.pointer.text = i.value;
      }, 1e3);
    }), (a, u) => (g(), m("div", {
      class: "timeline",
      ref_key: "timelineElement",
      ref: s,
      style: M(l.value)
    }, [
      I("div", Js, [
        (g(), m(W, null, be(25, (f) => (g(), m(W, null, [
          f === 1 || f === 25 ? (g(), m("span", Ys, "|")) : (g(), m("span", Qs, L(f - 1) + ":00", 1)),
          f !== 25 ? (g(!0), m(W, { key: 2 }, be(Fe(r).scaleLevel.value - 1, (c) => (g(), m("span", null, L(f - 1) + ":" + L(60 / Fe(r).scaleLevel.value * c), 1))), 256)) : D("", !0)
        ], 64))), 64)),
        I("div", Xs, [
          a.showPointerText ? (g(), m("span", Zs, " < " + L(Fe(r).pointer.text), 1)) : D("", !0)
        ])
      ]),
      I("div", ei, [
        (g(!0), m(W, null, be(a.lines, (f, c) => (g(), re(qs, {
          key: c,
          lines: f
        }, null, 8, ["lines"]))), 128))
      ])
    ], 4));
  }
}), ni = G(ti), tn = [
  Zo,
  es,
  rs,
  fs,
  ds,
  $s,
  Vs,
  Cs,
  Hs,
  ni
];
const oi = {
  install(e) {
    console.log("Install global components", tn), tn.forEach((t) => {
      e.component(t.name, t);
    });
  }
};
export {
  Zo as NlAvatar,
  es as NlAvatarGroup,
  ds as NlBadge,
  fs as NlButton,
  rs as NlDiv,
  $s as NlInput,
  Cs as NlLink,
  Hs as NlProgress,
  Vs as NlTextarea,
  ni as NlTimeline,
  oi as default,
  rn as hasPercentageSign,
  nn as hasPixelSign,
  Yn as isArray,
  Ie as isNumber,
  ue as isString,
  G as withInstall
};
