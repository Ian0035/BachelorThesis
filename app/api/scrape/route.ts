const puppeteer = require('puppeteer');

export async function GET() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  async function isCertifiedProvider(providerName: string | number | boolean) {
    const url = `https://www.cfainstitute.org/programs/cfa-program/prep-providers#q=${encodeURIComponent(providerName)}&sortCriteria=%40titlebasic%20ascending`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait a bit for the dynamic content to render
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Scroll down to trigger lazy loading
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    await page.waitForSelector('atomic-result-list'); // wait for the top-level component


    const LinkText = await page.evaluate(() => {
      // Helper function to safely access shadow roots
      function getShadowRoot(el: Element | null) {
        return el ? el.shadowRoot : null;
      }
      const atomicResultList = document.querySelector('atomic-result-list');
      const resultListShadow = getShadowRoot(atomicResultList);
      if (!resultListShadow) return 'atomic-result-list shadowRoot missing';

      const firstResult = resultListShadow.querySelector('atomic-result:nth-child(1)');
      const firstResultShadow = getShadowRoot(firstResult);
      if (!firstResultShadow) return 'atomic-result shadowRoot missing';

      const item = firstResultShadow.querySelector('prep-providers-result-item');
      const itemShadow = getShadowRoot(item);
      if (!itemShadow) return 'prep-providers-result-item shadowRoot missing';

      const link = itemShadow.querySelector('div > div > div > div.content__title > a');
      if (!link) return 'link not found';

      return link.textContent ? link.textContent.trim().toLowerCase() : ''; // Get the text content of the link and convert to lowercase, or return an empty string if null
    });
    if (typeof providerName === 'string' && LinkText === providerName.toLowerCase()) {
        return true; // Provider is certified
    }
      return false; // Provider is not certified')       
    }

  try {
    const providers = [
      { id: 1, name: 'kaplan' },
      { id: 2, name: 'fitch learning' },
      { id: 3, name: 'analyst prep' },
    ];

    const results = [];

    for (const provider of providers) {
      const certified = await isCertifiedProvider(provider.name);
      results.push({
        id: provider.id,
        certified: certified ? 'Certified' : 'Not Certified',
      });
    }

    await browser.close();

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error('Scraping error:', err);
    await browser.close();
    return new Response(JSON.stringify({ error: 'Scraping failed' }), { status: 500 });
  }
}
