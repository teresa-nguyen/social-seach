import React, { useState } from 'react';
import "./App.css";
import moment from 'moment';
import { Button, Input, Grid, Card, Image, Text } from "@mantine/core";


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`https://www.reddit.com/search.json?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data.children);
        setResult(data.data.children);
      });
  };

  return (
    <div className="App">
      <h1 className="header">The Reddit Search</h1>
      <form className="form" onSubmit={onSubmit}>
        <Input className="input" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <Button type="submit" color="orange" radius="md">
          Search
        </Button>
      </form>
      <Grid>
        {result.map((child) => {
          return <Grid.Col span={4}>
            <Card
              shadow="sm"
              p="xl"
              component="a"
              href={`https://www.reddit.com${child.data.permalink}`}
              target="_blank"
              withBorder="true"
            >
              <Grid style={{ height: 275 }}>
                <Grid.Col span={12}>
                  <Text component="span" weight={500} style={{ marginRight: 8 }}>
                    {child.data.subreddit_name_prefixed}
                  </Text>
                  <Text component="span" size="xs" color="gray" style={{ marginRight: 8 }}>
                    • posted by {child.data.author}
                  </Text>
                  <Text component="span" size="xs" color="gray">
                    {moment.unix(child.data.created).fromNow()}
                  </Text>
                </Grid.Col>
                <Grid.Col span={child.data.thumbnail !== 'self' ? 8 : 12}>
                  <Text weight={500} size="lg" lineClamp={6} style={{ minHeight: 183 }}>
                    {child.data.title}
                  </Text>
                </Grid.Col>
                {child.data.thumbnail !== 'self' &&
                  <Grid.Col span={4}>
                    <Image src={child.data.thumbnail} height={160} />
                  </Grid.Col>
                }
                <Grid.Col span={12} style={{ alignSelf: 'flex-end' }}>
                  <Text component="span" size="sm" style={{ marginRight: 12 }}>
                    {child.data.ups} upvote
                  </Text>
                  <Text component="span" size="sm" style={{ marginRight: 12 }}>
                    {child.data.num_comments} comments
                  </Text>
                  <Text component="span" size="sm">
                    {child.data.total_awards_received} awards
                  </Text>
                </Grid.Col>


              </Grid>
            </Card>
          </Grid.Col>;
        })}
      </Grid>
    </div>
  );
}

export default App;
