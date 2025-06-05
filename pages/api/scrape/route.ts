import chromium from '@sparticuz/chromium';
import puppeteer, { Browser } from 'puppeteer-core';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let browser: Browser | null = null;

  const isCertifiedProvider = async (providerName: string) => {
    if (!browser) {
      throw new Error('Browser instance is not initialized');
    }
    const page = await browser.newPage();
    const url = `https://www.cfainstitute.org/programs/cfa-program/prep-providers#q=${encodeURIComponent(providerName)}&sortCriteria=%40titlebasic%20ascending`;

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 3000));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 1000));
    await page.waitForSelector('atomic-result-list');

    const linkText = await page.evaluate(() => {
      function getShadowRoot(el: Element | null) {
        return el?.shadowRoot ?? null;
      }

      const atomicResultList = document.querySelector('atomic-result-list');
      const resultListShadow = getShadowRoot(atomicResultList);
      if (!resultListShadow) return '';

      const firstResult = resultListShadow.querySelector('atomic-result:nth-child(1)');
      const firstResultShadow = getShadowRoot(firstResult);
      if (!firstResultShadow) return '';

      const item = firstResultShadow.querySelector('prep-providers-result-item');
      const itemShadow = getShadowRoot(item);
      if (!itemShadow) return '';

      const link = itemShadow.querySelector('div > div > div > div.content__title > a');
      return link?.textContent?.trim().toLowerCase() ?? '';
    });

    await page.close();
    return linkText === providerName.toLowerCase();
  };

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const providers = [
      { id: 1, name: 'kaplan schweser' },
      { id: 2, name: 'fitch learning' },
      { id: 3, name: 'analyst prep' },
    ];

    const results = [];
    for (const provider of providers) {
      const certified = await isCertifiedProvider(provider.name);
      results.push({
        id: provider.id,
        name: provider.name,
        certified: certified ? 'Certified' : 'Not Certified',
      });
    }

    await browser.close();

    res.status(200).json(results);
  } catch (err) {
    console.error('Scraping error:', err);
    if (browser) await browser.close();
    res.status(500).json({ error: 'Scraping failed' });
  }
}
