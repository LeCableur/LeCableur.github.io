(function () {
  "use strict";
  var DATA = null;
  var periode = localStorage.getItem("mr_periode") || "jour";
  var $ = function (id) { return document.getElementById(id); };
  var ND = '<span class="nd">non dispo</span>';
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  function num(v, dec) { return Number(v).toLocaleString("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec }); }
  function eur(v, signe) {
    if (v == null) return ND;
    var s = num(Math.abs(v), 2) + " €";
    if (!signe) return (v < 0 ? "−" : "") + s;
    return (v > 0.004 ? "+" : v < -0.004 ? "−" : "") + s;
  }
  function pct(v) {
    if (v == null) return ND;
    return (v > 0.004 ? "+" : v < -0.004 ? "−" : "") + Number(Math.abs(v)).toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " %";
  }
  function cls(v) { return v == null || Math.abs(v) < 0.005 ? "zero" : v > 0 ? "pos" : "neg"; }
  function col(v, txt) { return '<span class="' + cls(v) + '">' + txt + "</span>"; }
  function cell(val, lab) { return '<div class="cell"><b>' + val + "</b><span>" + esc(lab) + "</span></div>"; }
  function txt(v) { return v == null || v === "" ? ND : esc(v); }
  function jour(s) { if (!s) return ND; var m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}:\d{2}))?/); return m ? m[3] + "/" + m[2] + (m[4] ? " " + m[4] : "") : esc(s); }
  function cote(v) { return v == null ? ND : num(v, 2); }
  function prix(v) { return v == null ? ND : Number(v).toLocaleString("fr-FR", { maximumFractionDigits: 5 }); }
  function badge(st) {
    var c = { "Gagné": "b-ok", "Perdu": "b-ko", "Annulé": "b-mu", "En attente": "b-wa" }[st] || "b-mu";
    return '<span class="badge ' + c + '">' + esc(st || "non dispo") + "</span>";
  }
  function serieTxt(s, unite) {
    if (!s) return ND;
    var t = s.type === "Gagné" ? "gagné" : s.type === "Perdu" ? "perdu" : s.type;
    var c = (t === "gagné" || t === "positif") ? "pos" : (t === "perdu" || t === "négatif") ? "neg" : "zero";
    return '<span class="' + c + '">' + s.n + " " + unite + (s.n > 1 ? "s" : "") + " " + t + (s.n > 1 ? "s" : "") + "</span>";
  }

  // ---- petit graphique SVG (courbe) ----
  function chart(points, label, ref) {
    if (!points || points.length < 2) return '<div class="chart-t">' + esc(label) + '</div><div class="empty">Pas encore assez de données pour la courbe (il faut au moins 2 jours réglés ou 2 relevés).</div>';
    var W = 320, H = 120, P = 6;
    var vs = points.map(function (p) { return p.v; });
    if (ref != null) vs.push(ref);
    var mn = Math.min.apply(null, vs), mx = Math.max.apply(null, vs);
    if (mx - mn < 1e-6) { mx += 1; mn -= 1; }
    var x = function (i) { return P + i * (W - 2 * P) / (points.length - 1); };
    var y = function (v) { return H - P - (v - mn) * (H - 2 * P) / (mx - mn); };
    var d = points.map(function (p, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(p.v).toFixed(1); }).join(" ");
    var last = points[points.length - 1].v, first = ref != null ? ref : points[0].v;
    var c = last >= first ? "#22c55e" : "#ef4444";
    var refLine = ref != null ? '<line x1="0" x2="' + W + '" y1="' + y(ref).toFixed(1) + '" y2="' + y(ref).toFixed(1) + '" stroke="#566" stroke-dasharray="4 4"/>' : "";
    return '<div class="chart"><div class="chart-t">' + esc(label) + '</div><svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none">' + refLine +
      '<path d="' + d + '" fill="none" stroke="' + c + '" stroke-width="2.5" stroke-linejoin="round"/></svg>' +
      '<div class="chart-l"><span>' + jour(points[0].t) + " : " + eur(points[0].v) + "</span><span>" + jour(points[points.length - 1].t) + " : " + eur(last) + "</span></div></div>";
  }

  function tabs(show) {
    if (!show) { $("tabs").innerHTML = ""; $("tabs").style.display = "none"; return; }
    $("tabs").style.display = "";
    var h = "";
    (DATA.periodes || []).forEach(function (p) {
      h += '<button class="tab' + (p.id === periode ? " on" : "") + '" data-p="' + p.id + '">' + esc(p.label) + "</button>";
    });
    $("tabs").innerHTML = h;
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (b) {
      b.onclick = function () { periode = b.getAttribute("data-p"); localStorage.setItem("mr_periode", periode); render(); };
    });
  }

  function saisonOn() { return !!(DATA.saison && DATA.saison.actif); }
  function saisonBandeau() {
    var S = DATA.saison;
    if (!S) return "";
    if (!S.actif) return '<div class="card info">🏁 <b>Saison 1</b> : le samedi 31/10 au soir, tous les robots de paris repartent à 0 (saison du dimanche ' + jour(S.debut) + ' 00:01 au 30/11 inclus). L\'historique actuel sera gardé dans « Archive saison 0 ».</div>';
    return '<div class="card info">🏁 <b>Saison 1</b> depuis le ' + jour(S.debut) + ' : tout le monde est reparti à 0. <a href="#/archive">Voir l\'archive saison 0 ›</a></div>';
  }

  function nomD(r) { return r.nom + (r.disciplines ? " (" + r.disciplines + ")" : ""); }
  function nd(r) { return '<div class="empty">Pas encore de données' + (r.raison && r.raison !== "pas encore de données" ? " (" + esc(r.raison) + ")" : "") + "</div>"; }

  // ---- liste ----
  function mt5Card(r) {
    var h = '<a class="card tap" href="#/mt5/' + encodeURIComponent(r.nom) + '"><div class="top"><div><div class="name">' + esc(nomD(r)) +
      '<span class="tag demo">DÉMO</span>' + (r.simulation ? '<span class="tag">SIMULATION</span>' : "") + '</div><div class="desc">' + esc(r.desc) + "</div></div>";
    if (!r.ok) return h + '<div class="chev">›</div></div>' + nd(r) + "</a>";
    var s = r.stats[periode] || {};
    h += '<div class="big ' + cls(s.pnl) + '">' + eur(s.pnl, true) + "<small>" + pct(s.pct) + '</small></div><div class="chev">›</div></div>';
    h += '<div class="grid">' +
      cell(s.trades != null ? s.trades : ND, "trades") +
      cell(s.winrate != null ? s.winrate + " %" : ND, "réussite") +
      cell((s.gagnes || 0) + " / " + (s.perdus || 0), "gagnés / perdus") +
      cell(eur(r.solde), "solde") + cell(eur(r.equite), "équité") +
      cell(col(r.depuis_debut, eur(r.depuis_debut, true)), "depuis le départ") + "</div>";
    if (r.positions) h += '<div class="desc" style="margin-top:6px">' + r.positions + " position(s) ouverte(s)</div>";
    return h + '<div class="more">Voir le détail ›</div></a>';
  }

  function parisCard(r, rang, idx, arch) {
    var per = arch ? "total" : periode;
    var h = '<a class="card tap" href="' + (arch ? "#/archive/" : "#/paris/") + idx + '"><div class="top"><div><div class="name">' + (rang ? '<span class="rank">' + rang + "</span>" : "") + esc(nomD(r)) +
      '<span class="tag fictif">FICTIF</span></div><div class="desc">' + esc(r.desc) + "</div></div>";
    if (!r.ok) return h + '<div class="chev">›</div></div>' + nd(r) + "</a>";
    var s = r.stats[per] || {}, t = r.stats.total || {};
    h += '<div class="big ' + cls(s.roi) + '">' + (s.roi == null ? "—" : pct(s.roi)) + '<small class="' + cls(s.net) + '">' + (s.mise_reglee ? eur(s.net, true) : "ROI") + '</small></div><div class="chev">›</div></div>';
    if (!s.paris) return h + '<div class="empty">Aucun pari sur cette période</div><div class="more">Voir le détail ›</div></a>';
    h += '<div class="grid">' + cell(s.paris, "paris") + cell((s.gagnes || 0) + " / " + (s.perdus || 0), "gagnés / perdus") +
      cell(s.attente || 0, "en attente") + cell(eur(s.mise), "misé") + cell(col(s.net, eur(s.net, true)), "net") +
      cell(pct(t.roi), arch ? "ROI saison 0" : (saisonOn() ? "ROI saison 1" : "ROI depuis le début")) + "</div>";
    return h + '<div class="more">Voir le détail ›</div></a>';
  }

  function liste() {
    tabs(true);
    var lab = ((DATA.periodes || []).filter(function (p) { return p.id === periode; })[0] || {}).label || "";
    var h = "";
    var paris = (DATA.paris || []).map(function (r, i) { return { r: r, i: i }; });
    paris.sort(function (a, b) {
      var ra = a.r.ok && a.r.stats[periode] ? a.r.stats[periode].roi : null, rb = b.r.ok && b.r.stats[periode] ? b.r.stats[periode].roi : null;
      if (ra == null && rb == null) return 0; if (ra == null) return 1; if (rb == null) return -1; return rb - ra;
    });
    h += saisonBandeau();
    h += "<h2>Robots de paris (fictifs)" + (saisonOn() ? " · Saison 1" : "") + "<small>classés par ROI</small></h2>";
    var rang = 0;
    paris.forEach(function (o) {
      var ok = o.r.ok && o.r.stats[periode] && o.r.stats[periode].roi != null;
      h += parisCard(o.r, ok ? ++rang : 0, o.i);
    });
    var mt5 = DATA.mt5 || [], totPnl = 0, n = 0;
    mt5.forEach(function (r) { if (r.ok && r.stats[periode]) { totPnl += r.stats[periode].pnl || 0; n++; } });
    h += "<h2>Robots de trading (MT5 démo)" + (n ? '<small class="' + cls(totPnl) + '">' + eur(totPnl, true) + " · " + esc(lab) + "</small>" : "") + "</h2>";
    mt5.forEach(function (r) { h += mt5Card(r); });
    $("app").innerHTML = h;
  }

  // ---- archive saison 0 (figée, tout l'historique jusqu'au 31/10) ----
  function archive() {
    tabs(false);
    var A = DATA.archive_saison0;
    if (!A) { location.hash = "#/"; return; }
    var h = back("Archive saison 0", "Tous les paris jusqu'au " + jour(DATA.saison.archive_jusqu_au) + " inclus (avant la remise à 0)", '<span class="tag fictif">FICTIF</span>');
    var L = A.map(function (r, i) { return { r: r, i: i }; });
    L.sort(function (a, b) {
      var ra = a.r.ok ? a.r.stats.total.roi : null, rb = b.r.ok ? b.r.stats.total.roi : null;
      if (ra == null && rb == null) return 0; if (ra == null) return 1; if (rb == null) return -1; return rb - ra;
    });
    h += "<h2>Classement final saison 0<small>par ROI</small></h2>";
    var rang = 0;
    L.forEach(function (o) { h += parisCard(o.r, o.r.ok && o.r.stats.total.roi != null ? ++rang : 0, o.i, true); });
    $("app").innerHTML = h;
  }

  function back(titre, sous, tag, href) {
    return '<a class="back" href="' + (href || "#/") + '">‹ Retour</a><div class="dhead"><div class="name dn">' + esc(titre) + tag + '</div><div class="desc">' + esc(sous) + "</div></div>";
  }

  // ---- détail paris ----
  function detailParis(idx, arch) {
    tabs(false);
    var r = ((arch ? DATA.archive_saison0 : DATA.paris) || [])[idx];
    if (!r) { location.hash = arch ? "#/archive" : "#/"; return; }
    var h = back(nomD(r), (arch ? "Archive saison 0 · " : saisonOn() ? "Saison 1 · " : "") + r.desc, '<span class="tag fictif">FICTIF</span>', arch ? "#/archive" : "#/");
    if (!r.ok) { $("app").innerHTML = h + '<div class="card">' + nd(r) + (r.depart ? '<div class="desc">Cagnotte de départ : ' + eur(r.depart) + "</div>" : "") + "</div>"; return; }
    var d = r.detail, s = d.resume;
    h += '<div class="card"><div class="grid">' +
      cell(eur(s.mise), "total misé") + cell(col(s.net, eur(s.net, true)), "net (réglés)") + cell(col(s.roi, pct(s.roi)), "ROI") +
      cell(s.winrate != null ? s.winrate + " %" : ND, "réussite") + cell(s.nb, "paris") + cell(s.gagnes + " / " + s.perdus, "gagnés / perdus") +
      cell(s.attente, "en attente") + cell(s.annules, "annulés") + cell(serieTxt(d.serie, "pari"), "série en cours") +
      (d.depart ? cell(eur(d.depart), "cagnotte départ") + cell(col((d.cagnotte || 0) - d.depart, eur(d.cagnotte)), "cagnotte actuelle") : "") +
      cell(serieTxt(d.serie_jours, "jour"), "série de jours") +
      "</div>" + (r.dernier_passage ? '<div class="desc" style="margin-top:6px">Dernier passage du robot : ' + esc(r.dernier_passage) + "</div>" : "") + "</div>";
    h += '<div class="card">' + chart(d.courbe, d.courbe_type === "cagnotte" ? "Évolution de la cagnotte" : "Évolution du net cumulé (paris réglés)", d.depart || 0) + "</div>";
    if (d.par_sport && (r.multisport || d.par_sport.length > 1)) {
      h += "<h2>Par sport</h2><div class=\"card\"><table><tr><th>Sport</th><th>Paris</th><th>Misé</th><th>Net</th><th>ROI</th><th>Réussite</th></tr>";
      d.par_sport.forEach(function (x) {
        h += "<tr><td>" + esc(x.sport) + "</td><td>" + x.nb + "</td><td>" + eur(x.mise) + "</td><td>" + col(x.net, eur(x.net, true)) + "</td><td>" + col(x.roi, pct(x.roi)) + "</td><td>" + (x.winrate != null ? x.winrate + " %" : ND) + "</td></tr>";
      });
      h += "</table></div>";
    }
    h += "<h2>Jour par jour</h2><div class=\"card\"><table><tr><th>Jour</th><th>Paris</th><th>Misé</th><th>Net</th></tr>";
    d.par_jour.forEach(function (j) {
      h += "<tr><td>" + jour(j.jour) + "</td><td>" + j.nb + "</td><td>" + eur(j.mise) + "</td><td>" + (j.regles ? col(j.net, eur(j.net, true)) : "") + (j.attente ? ' <span class="badge b-wa">' + j.attente + " en attente</span>" : "") + "</td></tr>";
    });
    h += "</table></div>";
    h += "<h2>Tous les paris<small>" + d.paris.length + "</small></h2>";
    d.paris.forEach(function (b) {
      h += '<div class="bet"><div class="top"><div class="bm"><div class="bt">' + txt(b.match) + '</div><div class="desc">' + jour(b.date) + " · " + txt(b.sport) + (b.competition ? " · " + esc(b.competition) : "") + "</div></div>" + badge(b.statut) + "</div>" +
        '<div class="bp">' + txt(b.pari) + "</div>" +
        '<div class="bl"><span>Cote <b>' + cote(b.cote) + "</b></span><span>Mise <b>" + eur(b.mise) + "</b></span><span>" + (b.statut === "En attente" ? "Gain/perte <b>en attente</b>" : "Gain/perte <b>" + col(b.net, eur(b.net, true)) + "</b>") + "</span></div>" +
        (b.resultat ? '<div class="desc">Résultat : ' + esc(b.resultat) + "</div>" : "") + "</div>";
    });
    $("app").innerHTML = h;
  }

  // ---- détail MT5 ----
  function detailMt5(nom) {
    tabs(false);
    var r = (DATA.mt5 || []).filter(function (x) { return x.nom === nom; })[0];
    if (!r) { location.hash = "#/"; return; }
    var h = back("Robot " + nomD(r), r.desc, '<span class="tag demo">DÉMO</span>' + (r.simulation ? '<span class="tag">SIMULATION</span>' : ""));
    if (!r.ok) { $("app").innerHTML = h + '<div class="card">' + nd(r) + "</div>"; return; }
    var d = r.detail;
    h += '<div class="card"><div class="grid">' +
      cell(eur(r.solde), "solde") + cell(eur(r.equite), "équité") + cell(eur(r.depart), "départ") +
      cell(col(d.net, eur(d.net, true)), "profit net (fermés)") + cell(col(r.depuis_debut, pct(r.depuis_debut_pct)), "depuis le départ") +
      cell(d.winrate != null ? d.winrate + " %" : ND, "réussite") +
      cell(d.nb, "trades fermés") + cell(d.gagnes + " / " + d.perdus, "gagnés / perdus") +
      cell(d.profit_factor != null ? num(d.profit_factor, 2) : (d.profit_factor_info ? esc(d.profit_factor_info) : ND), "profit factor") +
      cell(d.max_dd != null ? '<span class="neg">' + eur(-d.max_dd) + "</span>" : ND, "drawdown max" + (d.max_dd_pct ? " (" + num(d.max_dd_pct, 1) + " %)" : "")) +
      cell(d.meilleur ? col(d.meilleur.net, eur(d.meilleur.net, true)) : ND, "meilleur trade") +
      cell(d.pire ? col(d.pire.net, eur(d.pire.net, true)) : ND, "pire trade") +
      "</div>" + (r.simulation ? '<div class="desc" style="margin-top:6px">Mode simulation : le robot ne passe pas encore de vrais ordres sur son compte démo.</div>' : "") +
      (r.dernier_passage ? '<div class="desc">Dernier passage du robot : ' + esc(r.dernier_passage) + "</div>" : "") + "</div>";
    h += '<div class="card">' + chart(d.courbe_solde, "Évolution du solde (trades fermés)", r.depart) + "</div>";
    var hist = (d.historique || []).map(function (x) { return { t: x.jour, v: x.equite }; }).filter(function (p) { return p.v != null; });
    h += '<div class="card">' + chart(hist, "Équité relevée chaque nuit", r.depart) + "</div>";
    var pos = r.positions_detail || [];
    h += "<h2>Positions ouvertes<small>" + (r.positions != null ? r.positions : "non dispo") + "</small></h2>";
    if (pos.length) {
      pos.forEach(function (p) {
        h += '<div class="bet"><div class="top"><div class="bt">' + esc(p.symbole) + " · " + esc(p.sens) + "</div>" + col(p.flottant, eur(p.flottant, true)) + "</div>" +
          '<div class="bl"><span>Volume <b>' + num(p.volume, 2) + "</b></span><span>Ouvert à <b>" + prix(p.prix_entree) + "</b></span><span>Actuel <b>" + prix(p.prix_actuel) + "</b></span></div>" +
          '<div class="desc">Depuis le ' + jour(p.ouverture) + "</div></div>";
      });
    } else if (r.positions) { h += '<div class="empty">Détail des positions non dispo</div>'; }
    else { h += '<div class="empty">Aucune position ouverte</div>'; }
    h += "<h2>Historique des trades<small>" + d.trades.length + "</small></h2>";
    if (!d.trades.length) h += '<div class="empty">Aucun trade fermé pour l\'instant</div>';
    d.trades.forEach(function (t) {
      h += '<div class="bet"><div class="top"><div class="bm"><div class="bt">' + txt(t.symbole) + " · " + txt(t.sens) + '</div><div class="desc">' +
        (t.ouverture ? jour(t.ouverture) + " → " : "") + jour(t.fermeture) + "</div></div><b>" + col(t.net, eur(t.net, true)) + "</b></div>" +
        '<div class="bl"><span>Volume <b>' + (t.volume != null ? num(t.volume, 2) : ND) + "</b></span><span>Ouverture <b>" + prix(t.prix_entree) + "</b></span><span>Clôture <b>" + prix(t.prix_sortie) + "</b></span></div>" +
        (t.frais ? '<div class="desc">Profit ' + eur(t.profit, true) + " · frais/swap " + eur(t.frais, true) + "</div>" : "") + "</div>";
    });
    $("app").innerHTML = h;
  }

  function render() {
    if (!DATA) return;
    var hsh = location.hash || "#/", m;
    if ((m = hsh.match(/^#\/paris\/(\d+)/))) detailParis(+m[1]);
    else if ((m = hsh.match(/^#\/archive\/(\d+)/))) detailParis(+m[1], true);
    else if (/^#\/archive\/?$/.test(hsh)) archive();
    else if ((m = hsh.match(/^#\/mt5\/(.+)$/))) detailMt5(decodeURIComponent(m[1]));
    else liste();
  }
  window.addEventListener("hashchange", function () { render(); window.scrollTo(0, 0); });

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
