<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="/rss">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title><xsl:value-of select="channel/title" /> RSS Feed</title>
        <link rel="stylesheet" href="/theme/style.css" />
        <link rel="stylesheet" href="/assets/poc3-legacy.css" />
        <link rel="icon" href="/theme/assets/toa.ico" sizes="any" />
        <style>
          .feed-note {
            margin: 0 0 1rem;
            color: var(--muted);
            font: 1rem/1.55 "Helvetica Neue", Arial, sans-serif;
          }
          .feed-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 1rem 0 0;
          }
          .feed-entry-list {
            display: grid;
            gap: 14px;
            margin-top: 1.2rem;
          }
          .feed-entry {
            padding: 1rem 1.1rem;
            border: 1px solid var(--line);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.62);
            box-shadow: var(--card-shadow);
          }
          .feed-entry h2 {
            margin: 0 0 0.35rem;
            font-size: 1.12rem;
          }
          .feed-entry p {
            max-width: 76ch;
            margin: 0.45rem 0;
          }
          .feed-entry time,
          .feed-entry .feed-link {
            color: var(--muted);
            font: 0.9rem/1.45 "Helvetica Neue", Arial, sans-serif;
          }
        </style>
      </head>
      <body class="theme-talkorigins-modern poc3-augmented">
        <a class="skip-link" href="#main">Skip to content</a>
        <div class="site-shell">
          <header class="site-header">
            <div class="brand-block">
              <div class="brand-row">
                <a class="brand-mark" href="/" aria-label="TalkOrigins Archive home">
                  <img src="/theme/assets/toa_logo_001_edit_001.png" alt="TalkOrigins Archive logo" />
                </a>
                <div class="brand-copy">
                  <p class="brand-kicker">public archive</p>
                  <a class="brand-title" href="/">TalkOrigins Archive</a>
                  <p class="brand-summary">Articles, FAQs, bibliographies, and claim responses on biological and physical origins and the creation/evolution controversy.</p>
                </div>
              </div>
            </div>
            <nav class="top-nav" aria-label="Primary navigation">
              <a href="/">Home</a>
              <a href="/origins/faqs-qa.html">FAQs</a>
              <a href="/origins/faqs.html">Browse</a>
              <a href="/indexcc/list.html">Claims Index</a>
              <a href="/timeline/">Timeline</a>
              <a href="/dossiers/">Dossiers</a>
              <a href="/search/">Search</a>
              <a href="/fb/">Feedback</a>
              <a href="/origins/other-links.html">Links</a>
              <a href="/workbench/">Workbench</a>
              <a href="/notebook/">Notebook</a>
              <a href="/downloads/toa-lite/">Downloads</a>
              <a href="/translation-status/">Translations</a>
            </nav>
          </header>
          <main id="main">
            <section class="article-header">
              <p class="eyebrow">RSS Feed</p>
              <h1><xsl:value-of select="channel/title" /></h1>
              <p class="article-meta"><xsl:value-of select="channel/description" /></p>
              <div class="feed-actions">
                <a class="button-link" href="/origins/rss.html">All feeds</a>
                <a class="button-link button-link-secondary">
                  <xsl:attribute name="href"><xsl:value-of select="channel/link" /></xsl:attribute>
                  Feed home
                </a>
              </div>
            </section>
            <article class="article-body">
              <p class="feed-note">This is an RSS feed for feed readers. Browsers show this styled preview so the feed can also be inspected directly.</p>
              <section class="feed-entry-list" aria-label="Feed entries">
                <xsl:for-each select="channel/item">
                  <article class="feed-entry">
                    <h2>
                      <a>
                        <xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute>
                        <xsl:value-of select="title" />
                      </a>
                    </h2>
                    <p><xsl:value-of select="description" /></p>
                    <p class="feed-link">
                      <time><xsl:value-of select="pubDate" /></time>
                    </p>
                  </article>
                </xsl:for-each>
              </section>
            </article>
          </main>
          <footer class="site-footer">
            <p class="footer-note"><strong>TalkOrigins Archive</strong></p>
            <p class="footer-note"><a href="/">Home</a> | <a href="/origins/faqs.html">Browse</a> | <a href="/search/">Search</a> | <a href="/fb/">Feedback</a> | <a href="/origins/other-links.html">Links</a> | <a href="/downloads/toa-lite/">Downloads</a> | <a href="/translation-status/">Translation Queue</a></p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
