(function () {
  "use strict";
  var DATA = null;
  var periode = localStorage.getItem("mr_periode") || "jour";
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  function eur(v, signe) {
    if (v == null) return "—";
    var s = Math.abs(v).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
    if (!signe) return (v < 0 ? "−" : "") + s;
    return (v > 0.004 ? "+" : v < -0.004 ? "−" : "") + s;
  }
  function pct(v) {
    if (v == null) return "—";
    return (v > 0.004 ? "+" : v < -0.004 ? "−" : "") + Math.abs(v).toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " %";
  }
  function cls(v) { return v == null || Math.abs(v) < 0.005 ? "zero" : v > 0 ? "pos" : "neg"; }
  function cell(val, lab) { return '<div class="cell"><b>' + val + "</b><span>" + esc(lab) + "</span></div>"; }

  function tabs() {
    var h = "";
    (DATA.periodes || []).forEach(function (p) {
      h += '<button class="tab' + (p.id === periode ? " on" : "") + '" data-p="' + p.id + '">' + esc(p.label) + "</button>";
    });
    $("tabs").innerHTML = h;
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (b) {
      b.onclick = function () { periode = b.getAttribute("data-p"); localStorage.setItem("mr_periode", periode); render(); };
    });
  }

  function mt5Card(r) {
    var h = '<div class="card"><div class="top"><div><div class="name">' + esc(r.nom) +
      (r.simulation ? '<span class="tag">SIMULATION</span>' : "") + '</div><div class="desc">' + esc(r.desc) + "</div></div>";
    if (!r.ok) return h + '</div><div class="empty">Pas encore de données' + (r.raison && r.raison !== "pas encore de données" ? " (" + esc(r.raison) + ")" : "") + "</div></div>";
    var s = r.stats[periode] || {};
    h += '<div class="big ' + cls(s.pnl) + '">' + eur(s.pnl, true) + "<small>" + pct(s.pct) + "</small></div></div>";
    h += '<div class="grid">' +
      cell(s.trades != null ? s.trades : "—", "trades") +
      cell(s.winrate != null ? s.winrate + " %" : "—", "réussite") +
      cell((s.gagnes || 0) + " / " + (s.perdus || 0), "gagnés / perdus") +
      cell(eur(r.solde), "solde") +
      cell(eur(r.equite), "équité") +
      cell('<span class="' + cls(r.depuis_debut) + '" style="font-size:16px;color:inherit">' + eur(r.depuis_debut, true) + "</span>", "depuis le départ") +
      "</div>";
    if (r.positions) h += '<div class="desc" style="margin-top:6px">' + r.positions + " position(s) ouverte(s)</div>";
    if (r.simulation) h += '<div class="desc" style="margin-top:6px">Mode simulation : le robot ne passe pas encore de vrais ordres sur son compte démo.</div>';
    return h + "</div>";
  }

  function parisCard(r, rang) {
    var h = '<div class="card"><div class="top"><div><div class="name">' + (rang ? '<span class="rank">' + rang + "</span>" : "") + esc(r.nom) +
      '</div><div class="desc">' + esc(r.desc) + "</div></div>";
    if (!r.ok) return h + '</div><div class="empty">Pas encore de données' + (r.raison && r.raison !== "pas encore de données" ? " (" + esc(r.raison) + ")" : "") + "</div></div>";
    var s = r.stats[periode] || {};
    var t = r.stats.total || {};
    h += '<div class="big ' + cls(s.roi) + '">' + (s.roi == null ? "—" : pct(s.roi)) + '<small class="' + cls(s.net) + '">' + (s.mise_reglee ? eur(s.net, true) : "ROI") + "</small></div></div>";
    if (!s.paris) return h + '<div class="empty">Aucun pari sur cette période</div></div>';
    h += '<div class="grid">' +
      cell(s.paris, "paris") +
      cell((s.gagnes || 0) + " / " + (s.perdus || 0), "gagnés / perdus") +
      cell(s.attente || 0, "en attente") +
      cell(eur(s.mise), "misé") +
      cell('<span class="' + cls(s.net) + '" style="font-size:16px;color:inherit">' + eur(s.net, true) + "</span>", "net") +
      cell(pct(t.roi), "ROI depuis le début") +
      "</div>";
    return h + "</div>";
  }

  function render() {
    if (!DATA) return;
    tabs();
    var lab = ((DATA.periodes || []).filter(function (p) { return p.id === periode; })[0] || {}).label || "";
    var h = "";
    var mt5 = DATA.mt5 || [];
    var totPnl = 0, n = 0;
    mt5.forEach(function (r) { if (r.ok && r.stats[periode]) { totPnl += r.stats[periode].pnl || 0; n++; } });
    h += "<h2>Robots MT5 (démo)" + (n ? '<small class="' + cls(totPnl) + '">' + eur(totPnl, true) + " · " + esc(lab) + "</small>" : "") + "</h2>";
    mt5.forEach(function (r) { h += mt5Card(r); });

    var paris = (DATA.paris || []).slice();
    paris.sort(function (a, b) {
      var ra = a.ok && a.stats[periode] ? a.stats[periode].roi : null, rb = b.ok && b.stats[periode] ? b.stats[periode].roi : null;
      if (ra == null && rb == null) return 0; if (ra == null) return 1; if (rb == null) return -1; return rb - ra;
    });
    h += "<h2>Robots de paris (fictifs)<small>classés par ROI</small></h2>";
    var rang = 0;
    paris.forEach(function (r) {
      var ok = r.ok && r.stats[periode] && r.stats[periode].roi != null;
      h += parisCard(r, ok ? ++rang : 0);
    });
    $("app").innerHTML = h;
  }

  function load() {
    $("maj").textContent = "Chargement…";
    fetch("/robots/data.json?t=" + Date.now(), { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error(r.status); return r.json();
    }).then(function (d) {
      DATA = d;
      if (!(d.periodes || []).some(function (p) { return p.id === periode; })) periode = "jour";
      $("maj").textContent = "Mis à jour le " + (d.updated_label || "?");
      render();
    }).catch(function () {
      $("maj").textContent = "Pas de connexion et rien en mémoire";
      $("app").innerHTML = '<div class="warn">Impossible de charger les données. Réessaie avec du réseau.</div>';
    });
  }
  $("refresh").onclick = load;
  load();
})();
