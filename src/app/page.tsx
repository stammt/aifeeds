import Image from "next/image";
import { fetchFeed } from "./actions";
import Button from '@mui/material/Button';

export default async function Home() {
  const rss = await fetchFeed()
  return (
    <div>
    <Button variant="contained">Hello world</Button>
          <div>{JSON.stringify(rss, null, 3)}</div>
          <div>
            <ol>
            {rss['news'].map((topic) => (
              <li key="{topic.title}">{topic.title}
                <ul>
                  {topic.headlines.map((headline) => (
                      <li key="{headline.title}"><a href={headline.url}>{headline.title}</a></li>
                  )
                )}
                </ul>
              </li>
            ))
            }
            </ol>
          </div>
        </div>
  );
}
