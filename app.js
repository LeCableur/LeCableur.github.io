(function () {
  "use strict";
  var KEY = "qcm_cableur_v1";
  var LABEL = { tip: "TIP (technicien)", dev: "Développeur web / IA" };
  var GOOD = ["Bien joué frérot !", "Propre, c'est ça !", "Tranquille, t'es chaud !", "Bonne réponse, continue comme ça !", "Validé bro !"];
  var BAD = ["Pas grave frérot, c'est comme ça qu'on apprend.", "Raté, mais lis bien l'explication.", "T'inquiète, tu la reverras dans « Révise mes erreurs »."];
  var app = document.getElementById("app");

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(stats)); } catch (e) {} }
  function shuffle(a) { var b = a.slice(); for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = b[i]; b[i] = b[j]; b[j] = t; } return b; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function button(cls, text, fn) { var b = el("button", cls, text); b.type = "button"; b.addEventListener("click", fn); return b; }

  var stats = load();
  var st = { track: "tip", theme: "all", items: [], idx: 0, chosen: null, score: 0, streak: 0, best: 0, missed: [], msg: "", review: false };

  function trackQs() { return QS.filter(function (q) { return q[1] === st.track; }); }
  function themes() { var s = []; trackQs().forEach(function (q) { if (s.indexOf(q[2]) < 0) s.push(q[2]); }); return s; }
  function errors() { return trackQs().filter(function (q) { return stats[q[0]] && !stats[q[0]].last; }); }
  function mastered(list) { return list.filter(function (q) { return stats[q[0]] && stats[q[0]].last; }).length; }

  function start(list, review) {
    if (!list.length) return;
    st.items = shuffle(list).slice(0, 10).map(function (q) { return { q: q, order: shuffle([0, 1, 2, 3]) }; });
    st.idx = 0; st.chosen = null; st.score = 0; st.streak = 0; st.best = 0; st.missed = []; st.msg = ""; st.review = review;
    quiz();
  }
  function startNormal() { start(st.theme === "all" ? trackQs() : trackQs().filter(function (q) { return q[2] === st.theme; }), false); }
  function startReview() { start(errors(), true); }

  function header(sub) {
    var h = el("header"); var img = el("img"); img.src = "icons/icon-192.png"; img.alt = "";
    var t = el("div"); t.appendChild(el("h1", null, "QCM du Câbleur")); t.appendChild(el("div", "sub", sub));
    h.appendChild(img); h.appendChild(t); return h;
  }

  function home() {
    app.innerHTML = ""; window.scrollTo(0, 0);
    app.appendChild(header("Formation TIP et développeur web / IA · " + QS.length + " questions"));
    app.appendChild(el("h2", null, "Choisis ta formation"));
    var seg = el("div", "seg");
    [["tip", "TIP"], ["dev", "Dév web / IA"]].forEach(function (o) {
      seg.appendChild(button("chip" + (st.track === o[0] ? " on" : ""), o[1], function () { st.track = o[0]; st.theme = "all"; home(); }));
    });
    app.appendChild(seg);
    app.appendChild(el("h2", null, "Choisis le thème"));
    var th = el("div", "seg themes");
    ["all"].concat(themes()).forEach(function (t) {
      th.appendChild(button("chip" + (st.theme === t ? " on" : ""), t === "all" ? "Tout mélanger" : t, function () { st.theme = t; home(); }));
    });
    app.appendChild(th);
    app.appendChild(button("btn primary", "Lancer 10 questions", startNormal));
    var errs = errors().length;
    if (errs) app.appendChild(button("btn", "Révise mes erreurs (" + errs + ")", startReview));

    var all = trackQs();
    app.appendChild(el("h2", null, "Ta progression : " + mastered(all) + " / " + all.length + " réussies"));
    themes().forEach(function (t) {
      var qs = all.filter(function (q) { return q[2] === t; }); var m = mastered(qs); var pct = Math.round(m / qs.length * 100);
      var c = el("div", "card"); var r = el("div", "row"); r.appendChild(el("span", null, t)); r.appendChild(el("span", "muted", m + " / " + qs.length + " (" + pct + " %)"));
      var bar = el("div", "bar"); var fill = el("i"); fill.style.width = pct + "%"; bar.appendChild(fill);
      c.appendChild(r); c.appendChild(bar); app.appendChild(c);
    });
    app.appendChild(el("p", "muted", "Une question compte comme réussie si ta dernière réponse était juste. Tout reste sur ton téléphone, rien n'est envoyé."));
    if (Object.keys(stats).length) app.appendChild(button("btn ghost", "Remettre ma progression à zéro", function () {
      if (confirm("Effacer toute ta progression ?")) { stats = {}; save(); home(); }
    }));
  }

  function answer(ci) {
    if (st.chosen !== null) return;
    var q = st.items[st.idx].q; var ok = ci === 0; st.chosen = ci;
    var p = stats[q[0]] || { ok: 0, ko: 0, last: false };
    stats[q[0]] = { ok: p.ok + (ok ? 1 : 0), ko: p.ko + (ok ? 0 : 1), last: ok }; save();
    if (ok) { st.score++; st.streak++; if (st.streak > st.best) st.best = st.streak;
      st.msg = st.streak >= 3 ? st.streak + " bonnes réponses d'affilée, t'es en feu frérot ! 🔥" : pick(GOOD);
    } else { st.streak = 0; st.missed.push(q); st.msg = pick(BAD); }
    quiz();
  }

  function quiz() {
    app.innerHTML = "";
    var it = st.items[st.idx], q = it.q;
    app.appendChild(header(LABEL[st.track] + (st.review ? " · Révise mes erreurs" : "")));
    var bar = el("div", "bar"); var f = el("i"); f.style.width = Math.round((st.idx + (st.chosen !== null ? 1 : 0)) / st.items.length * 100) + "%"; bar.appendChild(f); app.appendChild(bar);
    app.appendChild(el("div", "meta", "Question " + (st.idx + 1) + " / " + st.items.length + " · " + q[2] + " · " + (q[3] === "d" ? "débutant" : "intermédiaire") + " · score " + st.score));
    app.appendChild(el("div", "q", q[4]));
    it.order.forEach(function (ci) {
      var cls = "ans", pre = "";
      if (st.chosen !== null) {
        if (ci === 0) { cls += " good"; pre = "✓ "; } else if (ci === st.chosen) { cls += " bad"; pre = "✗ "; } else cls += " dim";
      }
      app.appendChild(button(cls, pre + q[5][ci], function () { answer(ci); }));
    });
    if (st.chosen !== null) {
      var ok = st.chosen === 0; var fb = el("div", "fb " + (ok ? "good" : "bad"));
      fb.appendChild(el("b", null, st.msg));
      if (!ok) fb.appendChild(el("div", null, "La bonne réponse : " + q[5][0]));
      fb.appendChild(el("div", "muted", q[6]));
      app.appendChild(fb);
      var last = st.idx + 1 >= st.items.length;
      var nb = button("btn primary", last ? "Voir mon score" : "Question suivante", function () {
        if (last) end(); else { st.idx++; st.chosen = null; st.msg = ""; quiz(); window.scrollTo(0, 0); }
      });
      app.appendChild(nb); nb.scrollIntoView({ behavior: "smooth", block: "end" });
    } else window.scrollTo(0, 0);
    app.appendChild(button("btn ghost", "Arrêter et revenir à l'accueil", home));
  }

  function end() {
    app.innerHTML = ""; window.scrollTo(0, 0);
    var n = st.items.length, r = st.score / n;
    app.appendChild(header(LABEL[st.track] + " · série terminée"));
    app.appendChild(el("div", "big", st.score + " / " + n));
    app.appendChild(el("p", "center", r === 1 ? "Sans faute frérot, respect ! 🏆" : r >= 0.8 ? "Très bien joué frérot, t'es solide !" : r >= 0.5 ? "Pas mal du tout, encore un peu d'entraînement et c'est carré." : "On lâche rien bro : relis les explications et refais une série. 💪"));
    app.appendChild(el("p", "center muted", "Meilleure série d'affilée : " + st.best));
    app.appendChild(button("btn primary", "Nouvelle série", function () { st.review ? startReview() : startNormal(); }));
    var errs = errors().length;
    if (errs) app.appendChild(button("btn", "Révise mes erreurs (" + errs + ")", startReview));
    app.appendChild(button("btn ghost", "Accueil", home));
    if (st.missed.length) {
      app.appendChild(el("h2", null, "Les questions à revoir"));
      st.missed.forEach(function (q) { var c = el("div", "card"); c.appendChild(el("div", null, q[4])); c.appendChild(el("div", "muted", "Réponse : " + q[5][0])); app.appendChild(c); });
    }
  }

  home();
})();
