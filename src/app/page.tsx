import Image from "next/image";
import { fetchFeed } from "./actions";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Card, Divider, Typography } from "@mui/material";

export default async function Home() {
  const rss = await fetchFeed()
  return (
    <div>
      <div>
      {rss['news'].map((topic) => (
        <div key="{topic.title}">
              <Divider key="{topic.title}">{topic.title}</Divider>
              <List key="{topic.title}">

                  {topic.headlines.map((headline) => (
                      <ListItem key="{headline.url}"><a href={headline.url}>{headline.title}</a></ListItem>
                  )
                )}
                </List>
                </div>
            ))
            }
      </div>

            <Card variant="outlined" sx={{ m: 1.5, p: 1.5 }}>
            <Typography variant="body2">{JSON.stringify(rss, null, 3)}</Typography>
            </Card>
            
        </div>
  );
}
