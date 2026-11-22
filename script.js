(() => {
  // Utilidades compartidas
  var $ = (s) => document.querySelector(s);
  var E = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  var RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var G = {
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
  var BM = { moon: ["00111100", "01100110", "11000000", "11000000", "11000100", "01100110", "00111100", "00000000"], tags: ["00000000", "00100100", "01001010", "10010001", "01001010", "00100100", "00000000", "00000000"], hash: ["01001000", "01001000", "11111111", "01001000", "01001000", "11111111", "01001000", "01001000"], js: ["11111111", "10001000", "10001010", "10101010", "10101010", "10101010", "11100110", "11111111"], bot: ["01111110", "11111111", "11011011", "11111111", "11111111", "11011011", "01111110", "00100100"] };
  function bmp(rows) {
    let r = "";
    rows.forEach((row, y) => [...row].forEach((c, x) => {
      if (c === "1") r += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }));
    return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" fill="#f2f2f2" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
  }
  var svg = (i, c = "") => `<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true">${i}</svg>`;
  function go(id) {
    document.getElementById(id).scrollIntoView({ behavior: RM ? "auto" : "smooth" });
  }

  // Datos personales y presentación
  var profile = {
    phrase: "Am I me?",
    identity: "Independent Developer \xB7 Game Creator",
    intro: "Independent developer and game creator. Currently developing WHOAMI.",
    bio: ["Hi, I\u2019m Apica. I write code, make games and build little corners of the internet like this one.", "I started programming in 2024 and haven\u2019t stopped since. I like finding out how things work, then making my own version.", "Right now most of that energy goes into WHOAMI, a game about loneliness. The rest of it lives here.", "Am I me?"],
    facts: { Name: "APICA", Username: "@apica", Location: "Espa\xF1a", Coding: "Since 2024", Languages: "Espa\xF1ol \xB7 Catal\xE0 \xB7 English", OS: "Linux / CachyOS" }
  };

  // Información del juego WHOAMI
  var whoami = {
    status: "NEARLY FINISHED",
    release: "2027-01-01",
    desc: "A narrative adventure about loneliness, made to encourage empathy for the people who live it. The story stays secret: it is meant to be experienced, not explained.",
    logo: "assets/whoami-logo.gif",
    art: "",
    trailer: "assets/WhoAmI_trailer_web.mp4",
    fields: { Genre: "Narrative adventure", Engine: "Godot", Theme: "Loneliness \xB7 empathy", Release: "1 January 2027", Platforms: "PC" },
    links: [{ t: "Game page", u: "" }, { t: "Repository", u: "" }, { t: "Store page", u: "" }],
    gallery: [
      /* {src:"images/shot1.png",cap:"Caption"} */
    ],
    diary: [
      /* {d:"2026-12-01",t:"Title",x:"Description",g:"update"} */
    ],
    notes: "WHOAMI is built around a simple idea: make space for empathy. I keep the story close to the chest and focus on the details that make the world feel real."
  };

  // Herramientas y tecnologías
  var skills = [
    ["Lua", "Programming language.", "moon"],
    ["HTML", "Web structure and markup.", "tags"],
    ["CSS", "Web styling and visual design.", "hash"],
    ["JavaScript", "Web programming and interactivity.", "js"],
    ["Godot", "Game development engine.", "bot"]
  ];
  var dev = { "Operating system": "Linux / CachyOS", "Game engine": "Godot" };

  // Actividad actual
  var currently = [
    ["Developing", "WHOAMI — releasing 1 January 2027"],
    ["Learning", "Game development"],
    ["Interested in", "Games and technology"],
    ["Playing", "Indie games"],
    ["Listening to", "My playlist ↓"],
    ["Random thought", "Am I me?"]
  ];

  // Entradas del diario
  var journal = [
    /* {d:"2026-12-01",t:"Title",x:"Description",g:["tag"],img:""} */
  ];

  // Contenido del archivo secreto
  var archive = [
    /* {n:"experiment-01",d:"Older experiment"} */
  ];

  // Agrupación de los datos del sitio
  var data = { profile, whoami, skills, dev, currently, journal, archive };

  // Redes sociales y contacto
  var SOC = [
    { p: "Discord", u: "apica.dev", copy: "apica.dev", i: '<path d="M7 5c3-1.2 7-1.2 10 0 2 3 3 7 3 11-1.5 1.3-3 2-4.5 2.4l-1-1.6c-1 .3-2 .3-3 0l-1 1.6C9 18 7.5 17.3 6 16c0-4 1-8 3-11z"/><path d="M9 11h.01M15 11h.01"/>' },
    { p: "Instagram", u: "apicaig", url: "https://instagram.com/apicaig", i: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>' },
    { p: "GitHub", u: "apicadevwork", url: "https://github.com/apicadevwork", i: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>' },
    { p: "TikTok", u: "apicatk", url: "https://www.tiktok.com/@apicatk", i: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c0 2.5 2 4.5 5 4.5"/>' }
  ];
  var MAIL = '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>';
  var mailto = () => "mailto:" + ["apicadevwork", "gmail.com"].join("@");

  // Textos en los tres idiomas disponibles.
  var languages = {
    es: {
      code: "ES", title: "APICA — ¿Soy yo?", description: "APICA, desarrollador independiente y creador de WHOAMI, una aventura narrativa sobre la soledad.",
      mainNav: "Navegación principal", jumpToProject: "Ir al proyecto WHOAMI", avatarAlt: "Avatar de APICA: un signo de interrogación pixelado con efecto glitch", bootMessagesAria: "Mensajes del sistema", languageSettings: "Configuración de idioma", chooseLanguage: "Elegir idioma", openTerminal: "Abrir terminal", openMusic: "Abrir reproductor de música", secretAccess: "Acceso secreto", terminalInput: "Comando de terminal", systemPage: "Página del sistema", backToTop: "Volver arriba",
      navHome: "Inicio", navAbout: "Sobre mí", navProject: "WHOAMI", navSkills: "Habilidades", navJournal: "Diario", navSocials: "Redes",
      aboutTitle: "Sobre mí", aboutSubtitle: "// quién es apica", projectSubtitle: "// un juego de apica · aventura narrativa · godot", gameBy: "UN JUEGO DE APICA", trailer: "Tráiler", screenshots: "Imágenes", updates: "Novedades", developerNotes: "Notas de desarrollo",
      skillsTitle: "Herramientas y tecnologías", skillsSubtitle: "// herramientas de trabajo · sin niveles ni barras", currentlySubtitle: "// EN QUÉ ESTOY TRABAJANDO", journalTitle: "Diario digital", journalSubtitle: "// notas del proceso de desarrollo", socialsTitle: "Redes sociales", socialsSubtitle: "// puedes encontrarme en internet",
      musicTitle: "Sonando ahora", musicSubtitle: "// <span class=\"eq\" aria-hidden=\"true\"><i></i><i></i><i></i><i></i></span> spotify · pulsa reproducir para escuchar", playlist: "MI LISTA", playlistDescription: "Una colección de sonidos desde mi rincón de internet.", spotifyHelp: "¿No carga el reproductor? Puede que Spotify esté bloqueado. También puedes abrir la lista directamente.", openSpotify: "Abrir en Spotify ↗",
      playlistTitle: "Lista de reproducción de APICA en Spotify", terminalTitle: "Terminal", terminalSubtitle: "// simulada · no ejecuta acciones reales", terminalHelp: "ayuda", unstable: "SISTEMA: INESTABLE", developing: "Desarrollando WHOAMI", footerCopyright: "© 2026 APICA — ¿SOY YO?", footerMessage: "GRACIAS POR VISITAR · PRUEBA A ESCRIBIR UN NOMBRE",
      phrase: "¿Soy yo?", identity: "Desarrollador independiente · creador de videojuegos", intro: "Desarrollador independiente y creador de videojuegos. Ahora estoy desarrollando WHOAMI.",
      bio: ["Hola, soy Apica. Programo, hago videojuegos y creo pequeños rincones de internet como este.", "Empecé a programar en 2024 y todavía no he parado. Me gusta descubrir cómo funcionan las cosas y después crear mi propia versión.", "Ahora dedico casi toda esa energía a WHOAMI, un juego sobre la soledad. El resto vive aquí.", "¿Soy yo?"],
      facts: { Nombre: "APICA", Usuario: "@apica", Ubicación: "España", Programando: "Desde 2024", Idiomas: "Español · Català · English", Sistema: "Linux / CachyOS" },
      status: "CASI TERMINADO", projectDesc: "Una aventura narrativa sobre la soledad, creada para fomentar la empatía hacia quienes la viven. La historia se mantiene en secreto: está hecha para experimentarla, no para explicarla.",
      projectFields: { Género: "Aventura narrativa", Motor: "Godot", Tema: "Soledad · empatía", Lanzamiento: "1 de enero de 2027", Plataformas: "PC" }, projectNotes: "WHOAMI parte de una idea sencilla: abrir espacio para la empatía. La historia se mantiene en secreto mientras cuido los detalles que hacen que el mundo se sienta real.",
      skillDescriptions: ["Lenguaje de programación.", "Estructura y marcado web.", "Estilos y diseño web.", "Programación web e interactividad.", "Motor para crear videojuegos."],
      currently: [["Desarrollando", "WHOAMI — lanzamiento: 1 de enero de 2027"], ["Aprendiendo", "Desarrollo de videojuegos"], ["Me interesa", "Los videojuegos y la tecnología"], ["Jugando", "Videojuegos independientes"], ["Escuchando", "Mi lista de música ↓"], ["Una idea", "¿Soy yo?"]],
      days: "DÍAS", releaseDay: "DÍA DE LANZAMIENTO", bootMessages: ["> INICIANDO APICA.SYS...", "> CARGANDO IDENTIDAD...", "> PROYECTO WHOAMI DETECTADO.", "> SISTEMA LISTO."], gameBy: "juego de apica", gameByStatus: "ESTADO", release: "LANZAMIENTO", copy: "Copiar", copied: "Copiado", email: "Correo", emailApp: "desde tu aplicación de correo", send: "Enviar", open: "Abrir", soon: "próximamente", inProgress: "En curso", playTrailer: "▶ Ver tráiler", trailerBar: "TRÁILER DE WHOAMI", pressPlay: "pulsa para reproducir", trailerUnavailable: "Añade la ruta del vídeo del tráiler en script.js.", trailerError: "No se ha podido cargar el tráiler.", addLinkInScript: "Añade el enlace correspondiente en script.js", openImage: "Abrir imagen", previousImage: "Imagen anterior", nextImage: "Imagen siguiente", emptySlot: "Espacio vacío", emptyGallery: "Añade imágenes a la galería de WHOAMI en script.js.", emptyUpdates: "Todavía no hay novedades de desarrollo.", emptyJournalTitle: "DIARIO // VACÍO", emptyJournal: "Aún no hay entradas. Añádelas al diario en script.js.", notesPlaceholder: "Notas de desarrollo", archiveEmpty: "Vacío. Añade proyectos anteriores al archivo en script.js.", close: "✕ Cerrar", alsoTry: "También puedes visitar:", pageNotFound: "PÁGINA NO ENCONTRADA. Identidad sin resolver.", glitchUser: "USUARIO: APICA", identityLabel: "IDENTIDAD", projectLabel: "PROYECTO ACTUAL", stabilityLabel: "ESTABILIDAD", stabilityValue: "INESTABLE", audioLabel: "AUDIO", audioValue: "SPOTIFY INTEGRADO", identityFound: "IDENTIDAD ENCONTRADA", accessGranted: "ACCESO CONCEDIDO", welcomeBack: "BIENVENIDO DE NUEVO.", glitchMessage: "Has encontrado algo que no debía aparecer.", enterArchive: "Abrir archivo", restore: "Volver", terminalGreeting: "APICA TERMINAL v1.0 — escribe ayuda", terminalCommands: "ayuda quien-soy sobre proyectos juego habilidades redes diario música limpiar salir", noEntries: "Todavía no hay entradas.", nowPlaying: "REPRODUCIENDO: MI LISTA (Spotify). Pulsa reproducir en el reproductor.", sessionClosed: "Sesión cerrada.", commandNotFound: "comando no encontrado: ", archive: "ARCHIVO", unknown: "DESCONOCIDO", error: "ERROR", system: "SISTEMA", tryName: "PRUEBA A ESCRIBIR UN NOMBRE"
    },
    en: {
      code: "EN", title: "APICA — Am I me?", description: "APICA, independent developer and creator of WHOAMI, a narrative adventure about loneliness.",
      mainNav: "Main navigation", jumpToProject: "Go to the WHOAMI project", avatarAlt: "APICA avatar: a glitching pixel-art question mark", bootMessagesAria: "System messages", languageSettings: "Language settings", chooseLanguage: "Choose language", openTerminal: "Open terminal", openMusic: "Open music player", secretAccess: "Secret access", terminalInput: "Terminal command", systemPage: "System page", backToTop: "Back to top",
      navHome: "Home", navAbout: "About", navProject: "WhoAmI", navSkills: "Skills", navJournal: "Journal", navSocials: "Socials",
      aboutTitle: "About me", aboutSubtitle: "// who is apica?", projectSubtitle: "// a game by apica · narrative adventure · godot", gameBy: "A GAME BY APICA", trailer: "Trailer", screenshots: "Screenshots", updates: "News & updates", developerNotes: "Developer notes",
      skillsTitle: "Tools & technologies", skillsSubtitle: "// software library · no levels, no bars", currentlySubtitle: "// WHAT I’M WORKING ON", journalTitle: "Digital journal", journalSubtitle: "// NOTES FROM THE DEVELOPMENT PROCESS", socialsTitle: "Socials", socialsSubtitle: "// find me around the internet",
      musicTitle: "Now playing", musicSubtitle: "// <span class=\"eq\" aria-hidden=\"true\"><i></i><i></i><i></i><i></i></span> spotify · nothing plays until you press play", playlist: "MY PLAYLIST", playlistDescription: "A collection of sounds from my corner of the internet.", spotifyHelp: "Player not loading? Spotify may be blocked here. Open the playlist directly instead.", openSpotify: "Open in Spotify ↗", playlistTitle: "APICA’s playlist on Spotify",
      terminalTitle: "Terminal", terminalSubtitle: "// simulated · runs nothing real", terminalHelp: "help", unstable: "SYSTEM: UNSTABLE", developing: "Currently developing WHOAMI", footerCopyright: "© 2026 APICA — AM I ME?", footerMessage: "THANKS FOR VISITING · TRY TYPING A NAME",
      phrase: "Am I me?", identity: "Independent developer · game creator", intro: "Independent developer and game creator. Currently developing WHOAMI.",
      bio: ["Hi, I’m Apica. I write code, make games and build little corners of the internet like this one.", "I started programming in 2024 and haven’t stopped since. I like finding out how things work, then making my own version.", "Right now most of that energy goes into WHOAMI, a game about loneliness. The rest of it lives here.", "Am I me?"],
      facts: { Name: "APICA", Username: "@apica", Location: "Spain", Coding: "Since 2024", Languages: "Español · Català · English", System: "Linux / CachyOS" },
      status: "NEARLY FINISHED", projectDesc: "A narrative adventure about loneliness, made to encourage empathy for the people who live it. The story stays secret: it is meant to be experienced, not explained.",
      projectFields: { Genre: "Narrative adventure", Engine: "Godot", Theme: "Loneliness · empathy", Release: "1 January 2027", Platforms: "PC" }, projectNotes: "WHOAMI is built around a simple idea: make space for empathy. I keep the story close to the chest and focus on the details that make the world feel real.",
      skillDescriptions: ["Programming language.", "Web structure and markup.", "Web styling and visual design.", "Web programming and interactivity.", "Game development engine."],
      currently: [["Developing", "WHOAMI — releasing 1 January 2027"], ["Learning", "Game development"], ["Interested in", "Games and technology"], ["Playing", "Indie games"], ["Listening to", "My playlist ↓"], ["Random thought", "Am I me?"]],
      days: "DAYS", releaseDay: "RELEASE DAY", bootMessages: ["> INITIALIZING APICA.SYS...", "> LOADING PERSONAL IDENTITY...", "> WHOAMI PROJECT DETECTED.", "> SYSTEM READY."], gameBy: "a game by apica", gameByStatus: "STATUS", release: "RELEASE", copy: "Copy", copied: "Copied", email: "Email", emailApp: "via your mail app", send: "Send", open: "Open", soon: "soon", inProgress: "In progress", playTrailer: "▶ Play trailer", trailerBar: "WHOAMI TRAILER", pressPlay: "press play", trailerUnavailable: "Add the trailer video path in script.js.", trailerError: "The trailer could not be loaded.", addLinkInScript: "Add the corresponding link in script.js", openImage: "Open image", previousImage: "Previous image", nextImage: "Next image", emptySlot: "Empty slot", emptyGallery: "Add images to the WHOAMI gallery in script.js.", emptyUpdates: "No development updates yet.", emptyJournalTitle: "DEVLOG // EMPTY", emptyJournal: "No entries yet. Add them to the journal in script.js.", notesPlaceholder: "Developer notes", archiveEmpty: "Empty. Add past projects to the archive in script.js.", close: "✕ Close", alsoTry: "Also try:", pageNotFound: "PAGE NOT FOUND. Identity unresolved.", glitchUser: "USER: APICA", identityLabel: "IDENTITY", projectLabel: "CURRENT PROJECT", stabilityLabel: "STABILITY", stabilityValue: "UNSTABLE", audioLabel: "AUDIO", audioValue: "SPOTIFY EMBED", identityFound: "IDENTITY FOUND.", accessGranted: "ACCESS: GRANTED", welcomeBack: "WELCOME BACK.", glitchMessage: "You found something that wasn’t supposed to be found.", enterArchive: "Enter archive", restore: "Restore", terminalGreeting: "APICA TERMINAL v1.0 — type help", terminalCommands: "help whoami about projects whoami-game skills socials journal music clear exit", noEntries: "no entries yet.", nowPlaying: "NOW PLAYING: MY PLAYLIST (Spotify). Press play in the player.", sessionClosed: "session closed.", commandNotFound: "command not found: ", archive: "ARCHIVE", unknown: "UNKNOWN", error: "ERROR", system: "SYSTEM", tryName: "TRY TYPING A NAME"
    },
    ca: {
      code: "CA", title: "APICA — Soc jo?", description: "APICA, desenvolupador independent i creador de WHOAMI, una aventura narrativa sobre la solitud.",
      mainNav: "Navegació principal", jumpToProject: "Ves al projecte WHOAMI", avatarAlt: "Avatar de l’APICA: un signe d’interrogació pixelat amb efecte glitch", bootMessagesAria: "Missatges del sistema", languageSettings: "Configuració de l’idioma", chooseLanguage: "Tria l’idioma", openTerminal: "Obre el terminal", openMusic: "Obre el reproductor de música", secretAccess: "Accés secret", terminalInput: "Ordre del terminal", systemPage: "Pàgina del sistema", backToTop: "Torna a l’inici",
      navHome: "Inici", navAbout: "Sobre mi", navProject: "WHOAMI", navSkills: "Eines", navJournal: "Diari", navSocials: "Xarxes",
      aboutTitle: "Sobre mi", aboutSubtitle: "// qui és apica?", projectSubtitle: "// un joc d’apica · aventura narrativa · godot", gameBy: "UN JOC D’APICA", trailer: "Tràiler", screenshots: "Imatges", updates: "Novetats", developerNotes: "Notes de desenvolupament",
      skillsTitle: "Eines i tecnologies", skillsSubtitle: "// eines de treball · sense nivells ni barres", currentlySubtitle: "// EN QUÈ ESTIC TREBALLANT", journalTitle: "Diari digital", journalSubtitle: "// notes del procés de desenvolupament", socialsTitle: "Xarxes socials", socialsSubtitle: "// em pots trobar per internet",
      musicTitle: "Escoltant ara", musicSubtitle: "// <span class=\"eq\" aria-hidden=\"true\"><i></i><i></i><i></i><i></i></span> spotify · prem reproduir per escoltar", playlist: "LA MEVA LLISTA", playlistDescription: "Una col·lecció de sons des del meu racó d’internet.", spotifyHelp: "No es carrega el reproductor? Pot ser que Spotify estigui blocat. També pots obrir la llista directament.", openSpotify: "Obre a Spotify ↗", playlistTitle: "Llista de reproducció d’APICA a Spotify",
      terminalTitle: "Terminal", terminalSubtitle: "// simulada · no executa accions reals", terminalHelp: "ajuda", unstable: "SISTEMA: INESTABLE", developing: "Desenvolupant WHOAMI", footerCopyright: "© 2026 APICA — SOC JO?", footerMessage: "GRÀCIES PER LA VISITA · PROVA D’ESCRIURE UN NOM",
      phrase: "Soc jo?", identity: "Desenvolupador independent · creador de videojocs", intro: "Desenvolupador independent i creador de videojocs. Ara estic desenvolupant WHOAMI.",
      bio: ["Hola, soc l’Apica. Programo, faig videojocs i creo petits racons d’internet com aquest.", "Vaig començar a programar el 2024 i encara no he parat. M’agrada descobrir com funcionen les coses i després crear-ne la meva versió.", "Ara dedico gairebé tota aquesta energia a WHOAMI, un joc sobre la solitud. La resta viu aquí.", "Soc jo?"],
      facts: { Nom: "APICA", Usuari: "@apica", Ubicació: "Espanya", Programant: "Des del 2024", Idiomes: "Español · Català · English", Sistema: "Linux / CachyOS" },
      status: "GAIREBÉ ACABAT", projectDesc: "Una aventura narrativa sobre la solitud, creada per fomentar l’empatia cap a les persones que la viuen. La història es manté en secret: està feta per viure-la, no per explicar-la.",
      projectFields: { Gènere: "Aventura narrativa", Motor: "Godot", Tema: "Solitud · empatia", Llançament: "1 de gener de 2027", Plataformes: "PC" }, projectNotes: "WHOAMI parteix d’una idea senzilla: obrir espai per a l’empatia. La història es manté en secret mentre cuido els detalls que fan que el món sembli real.",
      skillDescriptions: ["Llenguatge de programació.", "Estructura i marcatge web.", "Estils i disseny web.", "Programació web i interactivitat.", "Motor per crear videojocs."],
      currently: [["Desenvolupant", "WHOAMI — llançament: 1 de gener de 2027"], ["Aprenent", "Desenvolupament de videojocs"], ["M’interessa", "Els videojocs i la tecnologia"], ["Jugant", "Videojocs independents"], ["Escoltant", "La meva llista de música ↓"], ["Una idea", "Soc jo?"]],
      days: "DIES", releaseDay: "DIA DE LLANÇAMENT", bootMessages: ["> INICIANT APICA.SYS...", "> CARREGANT LA IDENTITAT...", "> PROJECTE WHOAMI DETECTAT.", "> SISTEMA A PUNT."], gameBy: "un joc d’apica", gameByStatus: "ESTAT", release: "LLANÇAMENT", copy: "Copia", copied: "Copiat", email: "Correu", emailApp: "des de la teva aplicació de correu", send: "Envia", open: "Obre", soon: "aviat", inProgress: "En curs", playTrailer: "▶ Reprodueix el tràiler", trailerBar: "TRÀILER DE WHOAMI", pressPlay: "prem per reproduir", trailerUnavailable: "Afegeix la ruta del vídeo del tràiler a script.js.", trailerError: "No s’ha pogut carregar el tràiler.", addLinkInScript: "Afegeix l’enllaç corresponent a script.js", openImage: "Obre la imatge", previousImage: "Imatge anterior", nextImage: "Imatge següent", emptySlot: "Espai buit", emptyGallery: "Afegeix imatges a la galeria de WHOAMI a script.js.", emptyUpdates: "Encara no hi ha novetats de desenvolupament.", emptyJournalTitle: "DIARI // BUIT", emptyJournal: "Encara no hi ha entrades. Afegeix-les al diari a script.js.", notesPlaceholder: "Notes de desenvolupament", archiveEmpty: "Buit. Afegeix projectes anteriors a l’arxiu a script.js.", close: "✕ Tanca", alsoTry: "També pots visitar:", pageNotFound: "PÀGINA NO TROBADA. Identitat sense resoldre.", glitchUser: "USUARI: APICA", identityLabel: "IDENTITAT", projectLabel: "PROJECTE ACTUAL", stabilityLabel: "ESTABILITAT", stabilityValue: "INESTABLE", audioLabel: "ÀUDIO", audioValue: "SPOTIFY INTEGRAT", identityFound: "IDENTITAT TROBADA.", accessGranted: "ACCÉS: CONCEDIT", welcomeBack: "BENVINGUT DE NOU.", glitchMessage: "Has trobat una cosa que no havia d’aparèixer.", enterArchive: "Obre l’arxiu", restore: "Torna", terminalGreeting: "APICA TERMINAL v1.0 — escriu ajuda", terminalCommands: "ajuda qui-soc sobre projectes joc eines xarxes diari música neteja surt", noEntries: "Encara no hi ha entrades.", nowPlaying: "REPRODUINT: LA MEVA LLISTA (Spotify). Prem reproduir al reproductor.", sessionClosed: "Sessió tancada.", commandNotFound: "ordre no trobada: ", archive: "ARXIU", unknown: "DESCONEGUT", error: "ERROR", system: "SISTEMA", tryName: "PROVA D’ESCRIURE UN NOM"
    }
  };
  var language = "es";
  var text = (key) => languages[language][key] || key;
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
    $("#hs").innerHTML = SOC.filter((s) => s.url).map((s) => `<a class="btn" href="${s.url}" target="_blank" rel="noopener">${svg(s.i)}${s.p}</a>`).join("") + `<a class="btn" href="#" data-mail>${svg(MAIL)}${text("email")}</a>`;
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
    $("#wl").innerHTML = whoami.links.map((l) => l.u ? `<a class="btn" href="${E(l.u)}" target="_blank" rel="noopener">${E(l.t)} \u2197</a>` : `<span class="tag" title="${E(text("addLinkInScript"))}">${E(l.t)} · ${E(text("soon"))}</span>`).join("");
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
    $("#gal").innerHTML = whoami.gallery.length ? whoami.gallery.map((g, i) => `<button data-lb="${i}" aria-label="${E(g.cap || text("openImage"))}"><img src="${E(g.src)}" alt="${E(g.cap || "WHOAMI")}" loading="lazy"></button>`).join("") : [1, 2, 3, 4].map((n) => `<button disabled aria-label="${E(text("emptySlot"))} ${n}">${E(text("emptySlot"))} ${n}</button>`).join("") + `<p class="ph" style="grid-column:1/-1;margin:0">${E(copy.emptyGallery)}</p>`;
    $("#dd").innerHTML = whoami.diary.length ? whoami.diary.map((d) => `<div class="card"><time class="lab">${E(d.d)}</time><h3 style="margin-top:6px">${E(d.t)}</h3><p>${E(d.x)}</p>${d.g ? `<span class="tag">${E(d.g)}</span>` : ""}</div>`).join("") : `<div class="card"><p class="ph">${E(copy.emptyUpdates)}</p></div>`;
    $("#dn").innerHTML = `<p class="ph">${E(copy.projectNotes)}</p>`;
  }

  // Sección de herramientas
  function initSkills() {
    const copy = languages[language];
    $("#sk").innerHTML = data.skills.map((s, i) => `<div class="card sk rv" tabindex="0">${bmp(BM[s[2]])}<span class="px">${E(s[0])}</span><p>${E(copy.skillDescriptions[i])}</p></div>`).join("");
    const devFacts = language === "es" ? { "Sistema operativo": "Linux / CachyOS", "Motor de videojuegos": "Godot" } : language === "ca" ? { "Sistema operatiu": "Linux / CachyOS", "Motor de videojocs": "Godot" } : data.dev;
    $("#devf").innerHTML = Object.entries(devFacts).map(([k, v]) => `<dt>${E(k)}</dt><dd>${E(v || text("inProgress"))}</dd>`).join("");
  }

  // Sección de actividad actual
  function initCurrently() {
    $("#cu").innerHTML = languages[language].currently.map(([k, v], i) => `<div class="card rv" style="${i ? "" : "border-color:var(--hi)"}"><div class="lab">${i ? "" : '<span class="dot"></span>'}${E(k)}</div><p style="margin-top:6px;color:var(--hi)">${E(v)}</p></div>`).join("");
  }

  // Sección del diario
  function initJournal() {
    const copy = languages[language];
    $("#jr").innerHTML = !data.journal.length ? `<div class="card"><div class="lab">${E(copy.emptyJournalTitle)}</div><p class="ph" style="margin-top:6px">${E(copy.emptyJournal)}</p></div>` : data.journal.map((j) => `<article class="card rv"><time class="lab">${E(j.d)}</time><h3 style="margin-top:6px">${E(j.t)}</h3><p>${E(j.x)}</p>${(j.g || []).map((t) => `<span class="tag">#${E(t)}</span>`).join("")}</article>`).join("");
  }

  // Sección de redes sociales
  function initSocials() {
    $("#so").innerHTML = SOC.map((s) => `<div class="card so rv">${svg(s.i)}<div class="bx"><b class="px" style="font-size:12px;color:var(--hi)">${s.p}</b><br>${s.u}</div>${s.url ? `<a class="btn cp" href="${s.url}" target="_blank" rel="noopener" aria-label="${E(text("open"))} ${s.p}">\u2197</a>` : ""}<button class="btn cp" data-copy="${s.copy || s.u}">${E(text("copy"))}</button></div>`).join("") + `<div class="card so rv">${svg(MAIL)}<div class="bx"><b class="px" style="font-size:12px;color:var(--hi)">${E(text("email"))}</b><br><span class="ph">${E(text("emailApp"))}</span></div><a class="btn cp" href="#" data-mail>${E(text("send"))} \u2197</a></div>`;
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
      const g = whoami.gallery[li], b = $("#lb");
      b.style.display = "";
      b.hidden = false;
      b.innerHTML = `<div class="in"><div class="ctl"><button class="btn" data-lbn="-1" aria-label="${E(text("previousImage"))}">\u25C0</button><button class="btn" data-lbn="1" aria-label="${E(text("nextImage"))}">\u25B6</button><button class="btn" data-lbn="0">${E(text("close"))}</button></div><img src="${E(g.src)}" alt="${E(g.cap || "")}" style="width:100%;margin-top:12px;image-rendering:pixelated"><p class="lab">${E(g.cap || "")}</p></div>`;
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
        return data.skills.map((s) => "- " + s[0]).join("\n");
      },
      socials: () => {
        go("socials");
        return SOC.map((s) => "- " + s.p + ": " + s.u).join("\n");
      },
      journal: () => {
        go("journal");
        return data.journal.map((j) => j.d + "  " + j.t).join("\n") || text("noEntries");
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
        const entries = data.archive
          .map((entry) => `<div>▪ ${E(entry.n)} — ${E(entry.d)}</div>`)
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
