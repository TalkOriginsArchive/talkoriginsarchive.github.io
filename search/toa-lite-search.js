(function () {
  const documents = window.TOAPortableSearchDocuments || [];
  const form = document.querySelector("[data-portable-search-form]");
  const input = document.querySelector("[data-portable-search-input]");
  const results = document.querySelector("[data-portable-search-results]");
  const summary = document.querySelector("[data-portable-search-summary]");
  if (!form || !input || !results || !window.MiniSearch) return;

  const search = new MiniSearch({
    fields: ["title", "text", "corpusLabel"],
    storeFields: ["title", "url", "route", "corpusLabel", "excerpt"],
    searchOptions: {
      boost: { title: 4, corpusLabel: 1.4, text: 1 },
      prefix: true,
      fuzzy: 0.15
    }
  });
  search.addAll(documents);

  function render(query) {
    const clean = query.trim();
    results.textContent = "";
    if (clean.length < 2) {
      summary.textContent = "Enter at least two characters.";
      return;
    }
    const hits = search.search(clean).slice(0, 40);
    summary.textContent = `${hits.length} result${hits.length === 1 ? "" : "s"} shown for "${clean}".`;
    if (!hits.length) {
      results.innerHTML = "<p>No matching public Lite pages were found.</p>";
      return;
    }
    const list = document.createElement("ol");
    list.className = "portable-search-results";
    for (const hit of hits) {
      const item = document.createElement("li");
      item.className = "portable-search-result";
      const title = document.createElement("a");
      title.href = hit.url;
      title.textContent = hit.title || hit.route;
      const meta = document.createElement("p");
      meta.className = "portable-search-meta";
      meta.textContent = `${hit.corpusLabel || "Archive"} · ${hit.route || ""}`;
      const excerpt = document.createElement("p");
      excerpt.textContent = hit.excerpt || "";
      item.append(title, meta, excerpt);
      list.append(item);
    }
    results.append(list);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    params.set("q", input.value.trim());
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
    render(input.value);
  });

  const params = new URLSearchParams(window.location.search);
  const initial = params.get("q") || "";
  if (initial) {
    input.value = initial;
    render(initial);
  } else {
    summary.textContent = `${documents.length} public Lite records are indexed.`;
  }
}());
