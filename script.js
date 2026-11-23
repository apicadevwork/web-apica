(() => {
  // Utilidades compartidas
  const $ = (selector) => document.querySelector(selector);
  const E = (value) => String(value).replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
  const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const G = {
    A: ["01110", "10001", "11111", "10001", "10001"],
    P: ["11110", "10001", "11110", "10000", "10000"],
    I: ["11111", "00100", "00100", "00100", "11111"],
    C: ["01111", "10000", "10000", "10000", "01111"],
    W: ["10001", "10001", "10101", "11011", "10001"],
    H: ["10001", "10001", "11111", "10001", "10001"],
    O: ["01110", "10001", "10001", "10001", "01110"],
    M: ["10001", "11011", "10101", "10001", "10001"]
  };
  function wm(t) {
    let x = 0, s = "";
    for (const ch of t) {
      G[ch].forEach((r, y) => [...r].forEach((c, i) => {
        if (c === "1") s += `<rect x="${x + i}" y="${y}" width="1" height="1"/>`;
      }));
      x += 6;
    }
    return [`-1 -1 ${x + 1} 7`, `<g fill="#333" transform="translate(.3 .3)">${s}</g><g fill="#f2f2f2">${s}</g>`];
  }
  function put(el, t) {
    const [v, h] = wm(t);
    el.setAttribute("viewBox", v);
    el.innerHTML = h;
  }
  const brandImg = (name, size) => `<img class="brand-logo ${size}" src="./assets/logos/${name}.svg" alt="${size === "header-logo" ? "" : `${E(name)} logo`}"${size === "header-logo" ? ' aria-hidden="true"' : ""} loading="lazy" decoding="async">`;
  function go(id) {
    document.getElementById(id).scrollIntoView({ behavior: RM ? "auto" : "smooth" });
  }

  // El contenido editable está en content.js y las traducciones en locales.js.
  const { whoami, skills, archive, socials, email } = window.APICA_CONTENT;
  const languages = window.APICA_LOCALES;
  const mailto = () => `mailto:${email}`;
  let language = "es";

  const text = (key) => languages[language][key] || key;
  function applyLanguage(nextLanguage) {
    language = languages[nextLanguage] ? nextLanguage : "es";
    const copy = languages[language];
    document.documentElement.lang = language;
    document.title = copy.title;
    $("meta[name='description']").content = copy.description;
    $("meta[property='og:title']").content = copy.title;
    $("meta[property='og:description']").content = copy.description;
    document.querySelectorAll("[data-i18n]").forEach((el) => el.textContent = copy[el.dataset.i18n] || el.textContent);
    document.querySelectorAll("[data-i18n-html]").forEach((el) => el.innerHTML = copy[el.dataset.i18nHtml] || el.innerHTML);
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", copy[el.dataset.i18nAria] || el.getAttribute("aria-label")));
    document.querySelectorAll("[data-i18n-title]").forEach((el) => el.setAttribute("title", copy[el.dataset.i18nTitle] || el.getAttribute("title")));
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => el.setAttribute("alt", copy[el.dataset.i18nAlt] || el.getAttribute("alt")));
    $("#language-current").textContent = copy.code;
    document.querySelectorAll("[data-language]").forEach((button) => {
      const selected = button.dataset.language === language;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", selected);
    });

    initHero();
    initAbout();
    initWhoami();
    initSkills();
    initCurrently();
    initJournal();
    initSocials();
    if ($("#to")) {
      $("#to").textContent = "";
      initTerminal();
    }
    document.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
    if (location.hash && !["#home", "#about", "#whoami", "#skills", "#currently", "#journal", "#socials", "#music", "#terminal"].includes(location.hash)) {
      dispatchEvent(new Event("hashchange"));
    }
    try { localStorage.setItem("apica-language", language); } catch (_) {}
  }

  // Sección principal
  function initHero() {
    const copy = languages[language];
    put($("#wm"), "APICA");
    $("#phrase").textContent = copy.phrase;
    $("#phrase").dataset.t = copy.phrase;
    {
      const n = Math.max(0, Math.ceil((Date.UTC(2027, 0, 1) - Date.now()) / 864e5));
      $("#cd").textContent = n ? "T-" + n + " " + copy.days : copy.releaseDay;
    }
    $("#idn").textContent = copy.identity;
    $("#intro").textContent = copy.intro;
    clearInterval(window.apicaClockTimer);
    window.apicaClockTimer = setInterval(() => {
      $("#clk").textContent = new Date().toLocaleTimeString([], { hour12: false });
    }, 1e3);
    (function() {
      clearInterval(window.apicaBootTimer);
      const L = copy.bootMessages, b = $("#boot");
      let i = 0;
      if (RM) {
        b.innerHTML = L.join("<br>") + '<span class="cur"></span>';
        return;
      }
      window.apicaBootTimer = setInterval(() => {
        b.innerHTML = L.slice(0, ++i).join("<br>") + '<span class="cur"></span>';
        if (i >= L.length) clearInterval(window.apicaBootTimer);
      }, 450);
    })();
    $("#hs").innerHTML = socials.filter((social) => social.url).map((social) => `<a class="btn social-shortcut" href="${social.url}" target="_blank" rel="noopener" aria-label="${E(social.platform)}">${brandImg(social.logo, "header-logo")}</a>`).join("") + `<a class="btn social-shortcut" href="#" data-mail aria-label="${E(text("email"))}">${brandImg("gmail", "header-logo")}</a>`;
  }

  // Sección «Sobre mí»
    function initAbout() {
    const copy = languages[language];
    $("#bio").innerHTML = copy.bio.map((p) => `<p style="margin:0 0 12px">${E(p)}</p>`).join("") + `<dl style="margin-top:16px">${Object.entries(copy.facts).map(([k, v]) => `<dt>${E(k)}</dt><dd>${E(v)}</dd>`).join("")}</dl>`;
  }

  // Sección del juego WHOAMI
  function initWhoami() {
    const copy = languages[language];
    $("#art").innerHTML = whoami.art ? `<img src="${E(whoami.art)}" alt="WHOAMI key art">` : whoami.logo ? `<img src="${E(whoami.logo)}" alt="WHOAMI logo">` : `<div><svg id="wl2" style="width:min(100%,300px)" role="img" aria-label="WHOAMI"></svg><div class="lab" style="margin-top:14px">LOGO / ARTWORK PLACEHOLDER<br>supply WhoAmI_logo_transparente_160px.gif</div></div>`;
    if ($("#wl2")) put($("#wl2"), "WHOAMI");
    $("#stt").textContent = `${copy.gameByStatus}: ${copy.status} · ${copy.release}: 01.01.2027`;
    $("#wd").textContent = copy.projectDesc;
    $("#wf").innerHTML = Object.entries(copy.projectFields).map(([k, v]) => `<dt>${E(k)}</dt><dd>${E(v)}</dd>`).join("");
    $("#wl").innerHTML = whoami.links.map((link) => link.url ? `<a class="btn" href="${E(link.url)}" target="_blank" rel="noopener">${E(link.label)} \u2197</a>` : `<span class="tag" title="${E(text("addLinkInScript"))}">${E(link.label)} · ${E(text("soon"))}</span>`).join("");
    const COVER = "assets/whoami-presents.gif";
    $("#tr").innerHTML = whoami.trailer ? `<div class="win"><div class="bar"><span>${E(copy.trailerBar)}</span><span>${E(copy.pressPlay)}</span></div><div id="tv"><button class="tcv" id="tp" aria-label="${E(text("playTrailer"))}"><img src="${COVER}" alt="WHOAMI"><span class="btn">${E(text("playTrailer"))}</span></button></div></div>` : `<div class="card"><div class="lab">${E(copy.trailer)} // —</div><p class="ph" style="margin-top:6px">${E(text("trailerUnavailable"))}</p></div>`;
    if (whoami.trailer) $("#tp").onclick = () => {
      const v = document.createElement("video");
      v.controls = true;
      v.playsInline = true;
      v.preload = "auto";
      v.src = whoami.trailer;
      v.setAttribute("aria-label", text("trailer"));
      v.style.cssText = "display:block;width:100%;background:#000;aspect-ratio:16/9";
      v.onerror = () => $("#tv").insertAdjacentHTML("beforeend", `<p class="ph" style="padding:12px;margin:0">${E(text("trailerError"))}</p>`);
      $("#tv").replaceChildren(v);
      v.play().catch(() => {
      });
    };
    $("#gal").innerHTML = whoami.gallery.length ? whoami.gallery.map((image, index) => `<button data-lb="${index}" aria-label="${E(image.caption || text("openImage"))}"><img src="${E(image.image)}" alt="${E(image.caption || "WHOAMI")}" loading="lazy"></button>`).join("") : [1, 2, 3, 4].map((n) => `<button disabled aria-label="${E(text("emptySlot"))} ${n}">${E(text("emptySlot"))} ${n}</button>`).join("") + `<p class="ph" style="grid-column:1/-1;margin:0">${E(copy.emptyGallery)}</p>`;
    $("#dd").innerHTML = whoami.updates.length ? whoami.updates.map((entry) => `<div class="card"><time class="lab">${E(entry.date)}</time><h3 style="margin-top:6px">${E(entry.title)}</h3><p>${E(entry.description)}</p>${(entry.tags || []).map((tag) => `<span class="tag">${E(tag)}</span>`).join("")}</div>`).join("") : `<div class="card"><p class="ph">${E(copy.emptyUpdates)}</p></div>`;
    $("#dn").innerHTML = `<p class="ph">${E(copy.projectNotes)}</p>`;
  }

  // Sección de herramientas
  function initSkills() {
    const copy = languages[language];
    $("#sk").innerHTML = skills.map((skill) => `<div class="card sk rv" tabindex="0">${brandImg(skill.icon, "skill-logo")}<span class="px">${E(skill.name)}</span><p>${E(copy.skillDescriptions[skill.description])}</p></div>`).join("");
  }

  // Sección de actividad actual
  function initCurrently() {
    $("#cu").innerHTML = languages[language].currently.map(({ label, value }, i) => `<div class="card rv" style="${i ? "" : "border-color:var(--hi)"}"><div class="lab">${i ? "" : '<span class="dot"></span>'}${E(label)}</div><p style="margin-top:6px;color:var(--hi)">${E(value)}</p></div>`).join("");
  }

  // Sección del diario
  function initJournal() {
    const copy = languages[language];
    const entries = copy.journalEntries;
    $("#jr").innerHTML = !entries.length ? `<div class="card"><div class="lab">${E(copy.emptyJournalTitle)}</div><p class="ph" style="margin-top:6px">${E(copy.emptyJournal)}</p></div>` : entries.map((entry) => `<article class="card rv"><time class="lab">${E(entry.date)}</time><h3 style="margin-top:6px">${E(entry.title)}</h3><p>${E(entry.description)}</p>${(entry.tags || []).map((tag) => `<span class="tag">#${E(tag)}</span>`).join("")}</article>`).join("");
  }

  // Sección de redes sociales
  function initSocials() {
    $("#so").innerHTML = socials.map((social) => `<div class="card so rv">${brandImg(social.logo, "social-logo")}<div class="bx"><b class="px" style="font-size:12px;color:var(--hi)">${E(social.platform)}</b><br>${E(social.handle)}</div>${social.url ? `<a class="btn cp" href="${social.url}" target="_blank" rel="noopener" aria-label="${E(text("open"))} ${E(social.platform)}">\u2197</a>` : ""}<button class="btn cp" data-copy="${E(social.copyText || social.handle)}">${E(text("copy"))}</button></div>`).join("") + `<div class="card so rv">${brandImg("gmail", "social-logo")}<div class="bx"><b class="px" style="font-size:12px;color:var(--hi)">${E(text("email"))}</b><br><span class="ph">${E(text("emailApp"))}</span></div><a class="btn cp" href="#" data-mail>${E(text("send"))} \u2197</a></div>`;
  }

  // Copiar datos, navegar y abrir la galería
  function initInteractions() {
    document.addEventListener("click", (e) => {
      const m = e.target.closest("[data-mail]");
      if (m) {
        e.preventDefault();
        location.href = mailto();
      }
      const c = e.target.closest("[data-copy]");
      if (c) {
        navigator.clipboard && navigator.clipboard.writeText(c.dataset.copy).then(() => {
          c.textContent = text("copied");
          setTimeout(() => c.textContent = text("copy"), 1200);
        }).catch(() => {
        });
      }
      const g = e.target.closest("[data-go]");
      if (g) go(g.dataset.go);
      const r = e.target.closest("[data-r]");
      if (r) location.hash = r.dataset.r;
      const l = e.target.closest("[data-lb]");
      if (l) lbOpen(+l.dataset.lb);
    });
    let li = 0;
    function lbOpen(i) {
      li = (i + whoami.gallery.length) % whoami.gallery.length;
      const image = whoami.gallery[li], b = $("#lb");
      b.style.display = "";
      b.hidden = false;
      b.innerHTML = `<div class="in"><div class="ctl"><button class="btn" data-lbn="-1" aria-label="${E(text("previousImage"))}">\u25C0</button><button class="btn" data-lbn="1" aria-label="${E(text("nextImage"))}">\u25B6</button><button class="btn" data-lbn="0">${E(text("close"))}</button></div><img src="${E(image.image)}" alt="${E(image.caption || "")}" style="width:100%;margin-top:12px;image-rendering:pixelated"><p class="lab">${E(image.caption || "")}</p></div>`;
    }
    $("#lb").addEventListener("click", (e) => {
      const b = e.target.closest("[data-lbn]");
      if (!b) return;
      const n = +b.dataset.lbn;
      if (!n) {
        $("#lb").hidden = true;
        $("#lb").style.display = "none";
      } else lbOpen(li + n);
    });
  }

  // Terminal interactiva simulada
  function initTerminal() {
    const out = $("#to");
    let H = [], hi = 0;
    let q = Promise.resolve();
    const showTrain = () => {
      q = q.then(() => new Promise((resolve) => {
        const train = document.createElement("pre");
        train.className = "terminal-train";
        train.setAttribute("role", "img");
        train.setAttribute("aria-label", "A steam train crosses the terminal.");
        train.textContent = [
          "       ====        ________                ___________",
          "   _D _|  |_______/        \\__I_I_____===__|_________|",
          "    |(_)---  |   H\\________/ |   |        =|___ ___||",
          "    /     |  |   H  |  |     |   |         ||_| |_||",
          "   |      |  |   H  |__--------------------| [___] ||",
          "   | ________|___H__/__|_____/[][]~\\_______|       ||",
          "   |/ |   |-----------I_____I [][] []  D    |=======|"
        ].join("\n");
        out.append(train);
        out.scrollTop = out.scrollHeight;
        setTimeout(() => {
          train.remove();
          resolve();
        }, 4600);
      }));
    };
    const say = (t) => {
      q = q.then(() => new Promise((r) => {
        if (RM || t.length > 90) {
          out.textContent += t + "\n";
          out.scrollTop = out.scrollHeight;
          return r();
        }
        let i = 0;
        const k = setInterval(() => {
          out.textContent += t[i++];
          if (i >= t.length) {
            clearInterval(k);
            out.textContent += "\n";
            r();
          }
          out.scrollTop = out.scrollHeight;
        }, 10);
      }));
    };
    say(text("terminalGreeting"));
    const C = {
      sl: () => {
        showTrain();
        return "";
      },
      help: () => text("terminalCommands"),
      whoami: () => language === "es" ? "USUARIO: APICA\nROL: DESARROLLADOR INDEPENDIENTE\nPROYECTO ACTUAL: WHOAMI\nIDENTIDAD: DESCONOCIDA" : language === "ca" ? "USUARI: APICA\nROL: DESENVOLUPADOR INDEPENDENT\nPROJECTE ACTUAL: WHOAMI\nIDENTITAT: DESCONEGUDA" : "USER: APICA\nROLE: INDEPENDENT DEVELOPER\nCURRENT PROJECT: WHOAMI\nIDENTITY: UNKNOWN",
      about: () => {
        go("about");
        return languages[language].intro;
      },
      projects: () => {
        go("whoami");
        return `WHOAMI — ${text("gameBy").toLowerCase()} [${languages[language].status}]`;
      },
      "whoami-game": () => {
        go("whoami");
        return `WHOAMI — ${languages[language].status}\n${languages[language].projectDesc}`;
      },
      skills: () => {
        go("skills");
        return skills.map((skill) => "- " + skill.name).join("\n");
      },
      socials: () => {
        go("socials");
        return socials.map((social) => "- " + social.platform + ": " + social.handle).join("\n");
      },
      journal: () => {
        go("journal");
        return languages[language].journalEntries.map((entry) => entry.date + "  " + entry.title).join("\n") || text("noEntries");
      },
      music: () => {
        go("music");
        return text("nowPlaying");
      },
      clear: () => {
        out.textContent = "";
        return "";
      },
      exit: () => {
        go("home");
        return text("sessionClosed");
      },
      archive: () => {
        location.hash = "archive";
        return "...";
      },
      unknown: () => {
        location.hash = "unknown";
        return "...";
      },
      system: () => {
        location.hash = "system";
        return "...";
      }
    };
    if (language === "es") {
      Object.assign(C, { ayuda: C.help, "quien-soy": C.whoami, sobre: C.about, proyectos: C.projects, juego: C["whoami-game"], habilidades: C.skills, redes: C.socials, diario: C.journal, "música": C.music, limpiar: C.clear, salir: C.exit });
    } else if (language === "ca") {
      Object.assign(C, { ajuda: C.help, "qui-soc": C.whoami, sobre: C.about, projectes: C.projects, joc: C["whoami-game"], eines: C.skills, xarxes: C.socials, diari: C.journal, "música": C.music, neteja: C.clear, surt: C.exit });
    }
    $("#tf").onsubmit = (e) => {
      e.preventDefault();
      const v = $("#ti").value.trim().toLowerCase();
      $("#ti").value = "";
      if (!v) return;
      H.push(v);
      hi = H.length;
      say("> " + v);
      const f = C[v];
      const r = f ? f() : text("commandNotFound") + v;
      if (r) say(r);
    };
    $("#ti").onkeydown = (e) => {
      if (e.key === "ArrowUp" && hi > 0) {
        e.preventDefault();
        $("#ti").value = H[--hi];
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        hi = Math.min(hi + 1, H.length);
        $("#ti").value = H[hi] || "";
      }
    };
  }

  // Páginas secretas por hash
  function initSecretPages() {
    const R = ["home", "about", "whoami", "skills", "currently", "journal", "socials", "music", "terminal"];
    function page(h) {
      const copy = languages[language];
      let content;

      if (h === "archive") {
        const entries = archive
          .map((entry) => `<div>▪ ${E(entry.name)} — ${E(entry.description)}</div>`)
          .join("");
        content = `<div class="win"><div class="bar"><span>C:\\APICA\\${E(copy.archive)}</span></div><div class="bd">${entries || `<p class="ph">${E(copy.archiveEmpty)}</p>`}</div></div>`;
      } else if (h === "unknown") {
        const message = language === "es"
          ? "no deberías estar aquí"
          : language === "ca"
            ? "no hauries de ser aquí"
            : "you are not supposed to be here";
        content = `<p class="unk">WHO·AM·I<br><b>${message}</b><br>01000001 01001001 01001101 01000101<br>A P I C A<br><b>${E(copy.phrase)}</b></p>`;
      } else if (h === "system") {
        content = `<div class="win"><div class="bar"><span>${E(copy.system)}</span></div><div class="bd"><pre style="margin:0;font:19px/1.3 var(--tm);white-space:pre-wrap">APICA.SYS .......... OK
${E(copy.identityLabel)} ........... ${E(copy.unknown)}
${E(copy.projectLabel)} ..... WHOAMI · ${E(copy.status)}
${E(copy.stabilityLabel)} .......... ${E(copy.stabilityValue)}
${E(copy.audioLabel)} .............. ${E(copy.audioValue)}</pre></div></div>`;
      } else {
        content = `<div class="win"><div class="bar"><span>${E(copy.error)}</span></div><div class="bd"><div class="px" style="font-size:40px;color:var(--hi)">404</div><p>${E(copy.pageNotFound)}</p></div></div>`;
      }

      const s = $("#sec");
      s.hidden = false;
      s.innerHTML = `<div class="in"><div class="ctl" style="margin-bottom:16px"><a class="btn" href="#home" id="sx">${E(copy.close)}</a><span class="lab">${E(copy[h] || copy.error)}</span></div>${content}<p class="lab" style="margin-top:18px">${E(copy.alsoTry)} <a href="#archive">${E(copy.archive.toLowerCase())}</a> · <a href="#unknown">${E(copy.unknown.toLowerCase())}</a> · <a href="#system">${E(copy.system.toLowerCase())}</a></p></div>`;
      $("#sx").focus();
    }
    function route() {
      const h = location.hash.slice(1);
      const s = $("#sec");
      if (!h || R.includes(h)) {
        s.hidden = true;
        return;
      }
      page(["archive", "unknown", "system"].includes(h) ? h : "404");
    }
    addEventListener("hashchange", route);
    route();
  }

  // Navegación, animación de entrada y botón superior
  function initScroll() {
    const nl = [...document.querySelectorAll("nav a")];
    function sc() {
      let c = "home";
      ["home", "about", "whoami", "skills", "journal", "socials"].forEach((i) => {
        if ($("#" + i).getBoundingClientRect().top < 150) c = i;
      });
      nl.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + c));
      $("#up").classList.toggle("show", scrollY > 600);
    }
    addEventListener("scroll", sc, { passive: true });
    sc();
    const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((x) => {
      if (x.isIntersecting) {
        x.target.classList.add("in");
        io.unobserve(x.target);
      }
    }), { threshold: 0.05 }) : null;
    document.querySelectorAll(".rv").forEach((el) => io ? io.observe(el) : el.classList.add("in"));
    $("#asc").textContent = " /\\_/\\\n( o.o )  am i me?\n > ^ <";
  }

  // Easter egg: escribe «apica»
  function initGlitch() {
    let buf = "", busy = false;
    function gx() {
      $("#gl").hidden = true;
      document.body.classList.remove("gl");
      busy = false;
    }
    addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !$("#gl").hidden) return gx();
      const t = e.target;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable || e.ctrlKey || e.metaKey || e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-5);
      if (buf === "apica" && !busy) {
        buf = "";
        glitch();
      }
    });
    function glitch() {
      busy = true;
      const o = $("#gl");
      const copy = languages[language];
      const L = ["A P I C A", copy.identityFound, copy.glitchUser, copy.accessGranted, copy.unstable, copy.welcomeBack, copy.phrase.toUpperCase(), copy.glitchMessage];
      const show = () => {
        o.hidden = false;
        o.innerHTML = '<div id="gi"></div>';
        const gi = $("#gi");
        let i = 0;
        const nx = () => {
          if (i >= L.length) {
            gi.insertAdjacentHTML("beforeend", `<p style="margin-top:28px"><a class="btn" href="#archive" id="ga">${E(copy.enterArchive)}</a> <button class="btn" id="gr">${E(copy.restore)}</button></p>`);
            $("#gr").onclick = gx;
            $("#ga").onclick = () => gx();
            $("#gr").focus();
            return;
          }
          gi.insertAdjacentHTML("beforeend", i === 0 ? `<div class="big">${L[i]}</div>` : `<div${i === 7 ? ' style="font-size:18px;color:#777;margin-top:16px"' : ""}>${E(L[i])}</div>`);
          i++;
          RM ? nx() : setTimeout(nx, i === 1 ? 600 : 420);
        };
        nx();
      };
      if (RM) {
        show();
        return;
      }
      document.body.classList.add("gl");
      setTimeout(show, 1500);
      setTimeout(() => document.body.classList.remove("gl"), 1600);
    }
  }

  // Inicio del sitio e idioma guardado.
  let savedLanguage = "es";
  try {
    const preference = localStorage.getItem("apica-language");
    if (languages[preference]) savedLanguage = preference;
  } catch (_) {}

  applyLanguage(savedLanguage);
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.language);
      $(".language-menu").open = false;
      $("#language-toggle").focus();
    });
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".language-menu")) $(".language-menu").open = false;
  });
  initInteractions();
  initSecretPages();
  initScroll();
  initGlitch();
})();
