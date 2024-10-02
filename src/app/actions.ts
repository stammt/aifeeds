'use server'

import parse from "rss-to-json"
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function fetchFeed() {
    // console.log('fetching...')
    const vergeHeadlines = await getHeadlines('https://www.theverge.com/rss/index.xml');
    const arsHeadlines: string[] = await getHeadlines('https://feeds.arstechnica.com/arstechnica/index');
    const ignHeadlines: string[] = await getHeadlines('https://feeds.feedburner.com/ign/news');
    // console.log(`headlines = ${headlines.join('\n')}`)

    const allHeadlines =[...vergeHeadlines, ...arsHeadlines, ...ignHeadlines]

    const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // // const prompt = "Write a story about a magic backpack.";
    const prompt = `I will give you a list of headlines with URLs to the article.
    Group the headlines by topic, and return a summary of topics using this JSON schema:
    
    headline = {'title': string, 'url': string}
    topic = {'title': string, 'headlines': Array<headline>}
    summary = {'news': Array<topic>}

    These are the headlines: ${allHeadlines.join('\n')}`;

    const result = await model.generateContent(prompt);
    let json = result.response.text();
    json = json.replace('\`\`\`json', '')
    json = json.replace('\`\`\`', '')

    return JSON.parse(json);
}

async function getHeadlines(url: string) : Promise<string[]> {
    const rss = await parse(url);
    return rss.items.map((i) => `${i['title']}: ${i['link']}`);
}