(function () {
  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    var documents = window.TOAPagesSearchDocuments || [];
    var form = document.querySelector("[data-toa-search-form]");
    var input = document.querySelector("[data-toa-search-input]");
    var summary = document.querySelector("[data-toa-search-summary]");
    var results = document.querySelector("[data-toa-search-results]");

    if (!form || !input || !summary || !results) return;
    if (!window.MiniSearch || !documents.length) {
      summary.textContent = "The static search index could not be loaded.";
      return;
    }

    var search = new MiniSearch({
      fields: ["title", "text", "corpusLabel"],
      storeFields: ["title", "url", "route", "corpusLabel", "excerpt"],
      searchOptions: {
        boost: { title: 5, corpusLabel: 1.4, text: 1 },
        prefix: true,
        fuzzy: 0.15
      }
    });
    search.addAll(documents);

    function clearResults() {
      while (results.firstChild) results.removeChild(results.firstChild);
    }

    function render(query) {
      var clean = query.trim();
      clearResults();
      if (clean.length < 2) {
        summary.textContent = documents.length + " public records are indexed. Enter at least two characters.";
        return;
      }

      var hits = search.search(clean).slice(0, 50);
      summary.textContent = hits.length + " result" + (hits.length === 1 ? "" : "s") + " shown for \"" + clean + "\".";
      if (!hits.length) {
        var empty = document.createElement("p");
        empty.textContent = "No matching public archive pages were found.";
        results.appendChild(empty);
        return;
      }

      var list = document.createElement("ol");
      list.className = "archive-list";
      hits.forEach(function (hit) {
        var item = document.createElement("li");
        var link = document.createElement("a");
        var meta = document.createElement("p");
        var excerpt = document.createElement("p");

        link.href = hit.url || hit.route || "/";
        link.textContent = hit.title || hit.route || "Untitled page";
        meta.className = "article-meta";
        meta.textContent = (hit.corpusLabel || "Archive") + " - " + (hit.route || "");
        excerpt.textContent = hit.excerpt || "";

        item.appendChild(link);
        item.appendChild(meta);
        if (hit.excerpt) item.appendChild(excerpt);
        list.appendChild(item);
      });
      results.appendChild(list);
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var params = new URLSearchParams(window.location.search);
      params.set("q", input.value.trim());
      window.history.replaceState(null, "", window.location.pathname + "?" + params.toString());
      render(input.value);
    });

    var initial = new URLSearchParams(window.location.search).get("q") || "";
    if (initial) {
      input.value = initial;
      render(initial);
    } else {
      render("");
    }
  });
}());
