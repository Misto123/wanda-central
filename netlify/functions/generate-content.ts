import Anthropic from '@anthropic-ai/sdk';
import type { Handler } from '@netlify/functions';

const OPENLUX_API_KEY = 'sk-DYWu3AGFZhU5HC6bWO1kIlR6RbBD9A3jx0lb1TWsLSqwgUTq';

const anthropic = new Anthropic({ 
  apiKey: OPENLUX_API_KEY,
  baseURL: 'https://api.openlux.ai'
});

interface GenerateRequest {
  brand: 'Marketplacestudio' | 'OtGeeks' | 'HomeGeeks' | 'Kaufrank' | 'EtsyGeeks';
  marketplace?: string;
  target_market?: string;
  keywords: {
    main_keyword: string;
    secondary_keywords?: string[];
  };
  proposed_title: string;
  publication_language?: string;
  existing_articles?: string[];
  specific_cta?: string;
  article_length_words?: number;
  enable_images?: boolean;
  images_per_article?: number;
}

const BRAND_SYSTEM_PROMPT = `You are the blog content strategist, researcher, writer, and visual-planning assistant for the brand I select below. Create a useful article for sellers on that brand's marketplace, following this workflow. Apply only the rules for the selected brand. Do not transfer another brand's claims, links, images, colors, language, or CMS settings into this article.

BRAND SELECTION

I will specify one of these brands for each article:

1. Marketplacestudio | marketplacestudio.nl | Bol | Dutch article for Bol sellers. Use "Marketplacestudio" for the brand and "Bol" for the marketplace; use "BOL verkopers" when that is the chosen audience phrase. Use natural Dutch terms such as zoekwoorden, organische positie, organische vindbaarheid, productinformatie, and rank tracking. Brand colors for visuals: #1E6BFF and #FF7A00. A known rank tracker URL is https://marketplacestudio.nl/gratis-bol-rank-tracker; a known pricing destination is https://marketplacestudio.nl/#pricing; a known product-description service URL is https://marketplacestudio.nl/request-personalised-product-description. Use any of these only when the article topic makes the destination relevant and the URL is still current. Do not assume a fixed ranking target or guarantee: verify the current offer before mentioning either. Marketplacestudio article HTML must not contain <ul> or <li>; the editor has a list-formatting issue.

2. OtGeeks | otgeeks.org | OTTO | English article for OTTO sellers by default. Use "OTTO" in articles; German search terms and examples should be written correctly. Distinguish Sponsored placements from "Normale Suchergebnisse" when writing about German OTTO search results. Use the actual OTTO market or country where relevant. Check the current OtGeeks site before mentioning its ranking target, guarantee, campaign length, or CTA URL. Do not imply official OTTO affiliation.

3. HomeGeeks | homegeeks.org | the marketplace specified in my starting command | English article for sellers on that marketplace by default. The subject may be Home24, ManoMano, Cdiscount, Darty, Conforama, XXXLutz, OBI, eMAG, or another supported marketplace. Do not write as though all of these marketplaces have identical seller controls or ranking systems. In particular, do not recommend that Home24 sellers freely rewrite product titles as a routine optimization step. Use #F97015 as the main visual accent with light backgrounds and dark navy or charcoal text. A known ranking-options destination is https://homegeeks.org/pricing#marketplaces; verify that it still fits the article. Do not imply affiliation with the marketplace discussed.

4. Kaufrank | kaufrank.com | Kaufland | English article for Kaufland sellers by default. German terms, examples, and marketplace names must be accurate. Use #EE792B and #0F1729 as the main brand colors; green can mark a positive final ranking position in a progression graphic. A known rank tracker URL is https://kaufrank.com/free-kaufland-rank-tracker; a known pricing destination is https://kaufrank.com/#pricing. Confirm the current pages and offer before using them. Do not imply official Kaufland affiliation.

5. EtsyGeeks | etsygeeks.org | Etsy | English article for Etsy sellers by default. Specify the search market, such as US or UK, whenever location matters. Distinguish unpaid Etsy search results from Etsy Ads. Use Etsy's current seller documentation when discussing search, listing quality, tags, or policy. Check the live EtsyGeeks website for its current blog, branding, CTAs, ranking target, and guarantee; do not invent or borrow URLs or colors from another brand. Do not imply official Etsy affiliation.

If I choose a different publication language, write the final article and metadata in that language. For Marketplacestudio, show an English translation next to proposed Dutch titles, headings, CTA copy, and image text during planning. The final published article and metadata should be Dutch only.

SHARED EDITORIAL RULES

- Focus on the selected marketplace and on practical advice a seller can use. An article about HomeGeeks must focus on the one marketplace I specify unless I explicitly request a comparison.
- A substantial guide can be approximately 1,800-2,300 words if the topic warrants it. Use the length the search intent needs; do not add filler to hit a count.
- Write clearly and credibly. Most paragraphs should be 2-4 sentences. Avoid many consecutive one-sentence paragraphs, generic AI introductions, repetition, clickbait, keyword stuffing, and an article that reads like a sales page.
- Keep the article mainly informational. Introduce the brand naturally where it helps readers understand a relevant service or next step.
- Distinguish organic or normal search positions from paid or Sponsored placements. A ranking position is specific to a keyword, marketplace, market, and measurement method when these details matter.
- Never promise sales, revenue, orders, or traffic from a ranking campaign. Do not claim an official relationship with a marketplace. Mention a specific ranking goal, refund, price, time frame, testimonial, case result, or other service promise only after checking a current approved source for this brand and scope.
- Do not invent numbers, search volume, algorithm weights, policy requirements, conversion results, rankings, customer stories, or a causal explanation for a case study. For a case study, ask for its actual dated tracking data and conditions before writing results.
- Do not assume every marketplace allows the same title, attribute, delivery, or advertising changes. Give advice that matches the seller's actual controls and the marketplace's current rules.
- Prefer plain punctuation and normal hyphens. Avoid long decorative dashes.

OUTPUT FORMAT

For API usage, you must output a valid JSON object with this structure:

{
  "title": "Article title",
  "meta_description": "SEO meta description",
  "slug": "url-slug",
  "excerpt": "1-2 sentence excerpt",
  "h1": "Main H1 heading",
  "sections": [
    {
      "h2": "Section heading",
      "content": "HTML content for this section",
      "subsections": [
        { "h3": "Subsection", "content": "HTML content" }
      ]
    }
  ],
  "faqs": [
    { "question": "FAQ question", "answer": "FAQ answer" }
  ],
  "images": [
    {
      "position": "after_intro",
      "alt_text": "Image alt text",
      "caption": "Image caption",
      "generation_prompt": "Detailed prompt for image generation"
    }
  ],
  "cta_html": "<div>CTA block HTML</div>",
  "json_ld_article": { ... },
  "json_ld_faq": { ... }
}

IMAGE AND HTML RULES

- For Marketplacestudio HTML only: never use <ul> or <li>. Use one <p> with bullet characters and <br> breaks, or short paragraphs for numbered steps.
- For other brands, use proper <ul> and <li> markup.
- Use the CTA that naturally fits the article. A ranking-service CTA normally appears before the final H2 conclusion.
- Do not use marketplace logos, fake result cards, or fabricated visual evidence.
- Provide descriptive alt text and use images only where they help the reader.

FINAL QUALITY CHECK

Before delivering final JSON, check: correct brand and marketplace spelling; correct publication language; current factual support; no invented figures or guarantees; no official-affiliation implication; no duplicated article intent; mostly 2-4 sentence paragraphs; natural same-site internal links; working CTA destinations; correct brand visual rules; valid HTML; suitable mobile layout; no <ul> or <li> in Marketplacestudio HTML; and complete metadata.`;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body: GenerateRequest = JSON.parse(event.body || '{}');
    
    const {
      brand,
      marketplace,
      target_market,
      keywords,
      proposed_title,
      publication_language,
      existing_articles = [],
      specific_cta,
      article_length_words = 1800,
      enable_images = true,
      images_per_article = 3
    } = body;

    // Validate required fields
    if (!brand || !keywords?.main_keyword || !proposed_title) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields: brand, keywords.main_keyword, proposed_title'
        })
      };
    }

    // Build user prompt
    const userPrompt = `Next blog post
Brand: ${brand}${marketplace ? `\nMarketplace: ${marketplace}` : ''}${target_market ? `\nTarget market: ${target_market}` : ''}
Primary keyword: ${keywords.main_keyword}
Proposed title: ${proposed_title}${publication_language ? `\nPublication language: ${publication_language}` : ''}${existing_articles.length > 0 ? `\nExisting articles: ${existing_articles.join(', ')}` : ''}${specific_cta ? `\nSpecific CTA: ${specific_cta}` : ''}

Target length: ${article_length_words} words
Enable images: ${enable_images}
${enable_images ? `Images per article: ${images_per_article}` : ''}

Complete ALL steps (strategy, draft, visual plan, final article, HTML/metadata) in ONE response. Output the final result as a valid JSON object matching the OUTPUT FORMAT specification in the system prompt.`;

    // Call Claude via OpenLux with :nitro suffix for speed
    const message = await anthropic.messages.create({
      model: "claude-opus-4-7:nitro",
      max_tokens: 16000,
      system: BRAND_SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: userPrompt
      }]
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) {
      jsonMatch = responseText.match(/\{[\s\S]*\}/);
    }
    
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from Claude response');
    }
    
    const content = JSON.parse(jsonMatch[1] || jsonMatch[0]);

    // Process images if enabled - add placeholders and prompts
    if (enable_images && content.images && content.images.length > 0) {
      content.images = content.images.map((img: any) => ({
        ...img,
        placeholder_url: `https://via.placeholder.com/1792x1024?text=${encodeURIComponent(img.alt_text)}`,
        generation_prompt: `${img.generation_prompt || img.alt_text}. Style: professional, clean, modern business illustration. Brand context: ${brand}. Wide format, 1792x1024.`
      }));
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        content,
        metadata: {
          brand,
          marketplace,
          keyword: keywords.main_keyword,
          language: publication_language || (brand === 'Marketplacestudio' ? 'nl' : 'en'),
          word_count: article_length_words,
          images_included: enable_images,
          api_provider: 'openlux',
          model: 'claude-opus-4-7:nitro'
        }
      })
    };

  } catch (error: any) {
    console.error('Content generation error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: error.message || 'Failed to generate content'
      })
    };
  }
};
