(function () {
  const I18N = {
    en: {
      title: "Translation unavailable:",
      body: "this page is not yet available in the selected language.",
      viewing: "You are viewing the English page.",
      queue: "Open translation queue"
    },
    es: {
      title: "Traducción no disponible:",
      body: "esta página aún no está disponible en el idioma seleccionado.",
      viewing: "Está viendo la página en inglés.",
      queue: "Abrir cola de traducción"
    },
    fr: {
      title: "Traduction non disponible :",
      body: "cette page n'est pas encore disponible dans la langue sélectionnée.",
      viewing: "Vous consultez la page anglaise.",
      queue: "Ouvrir la file de traduction"
    },
    de: {
      title: "Übersetzung nicht verfügbar:",
      body: "diese Seite ist in der ausgewählten Sprache noch nicht verfügbar.",
      viewing: "Sie sehen die englische Seite.",
      queue: "Übersetzungswarteschlange öffnen"
    },
    pt: {
      title: "Tradução indisponível:",
      body: "esta página ainda não está disponível no idioma selecionado.",
      viewing: "Você está vendo a página em inglês.",
      queue: "Abrir fila de tradução"
    }
  };
  function meta(name) {
    return document.querySelector(`meta[name="${name}"]`)?.getAttribute("content") || "";
  }
  function rootPrefix() {
    return meta("scisiteforge:portable-root") || ".";
  }
  function routeToFile(route) {
    const clean = (route || "/").replace(/^\//, "");
    if (!clean) return "index.html";
    if (clean.endsWith("/")) return clean + "index.html";
    if (!clean.split("/").pop().includes(".")) return clean + "/index.html";
    return clean;
  }
  window.localizedPathFor = function localizedPortablePathFor(lang) {
    const sourceRoute = meta("toa:legacy-route") || "/";
    const currentLang = (document.documentElement.lang || "en").split("-")[0];
    let route = sourceRoute;
    if (/^\/(es|fr|de|pt)\//.test(route)) {
      route = route.replace(/^\/(es|fr|de|pt)/, "");
    }
    const targetRoute = lang && lang !== "en" ? `/${lang}${route}` : route;
    return `${rootPrefix()}/${routeToFile(targetRoute)}`.replace(/\/\.\//g, "/");
  };
  window.updateTranslationBanner = function updatePortableTranslationBanner(lang, covered) {
    const banner = document.querySelector(".translation-fallback-banner") || document.createElement("div");
    if (!banner.parentElement) {
      banner.className = "translation-fallback-banner";
      document.querySelector(".site-header")?.insertAdjacentElement("afterend", banner);
    }
    if (!lang || lang === "en" || covered) {
      banner.hidden = true;
      banner.textContent = "";
      return;
    }
    banner.hidden = false;
    const text = I18N[lang] || I18N.en;
    banner.innerHTML = `<strong>${text.title}</strong> ${text.body} ${text.viewing} <a href="${rootPrefix()}/translation-status/index.html">${text.queue}</a>.`;
  };
}());
