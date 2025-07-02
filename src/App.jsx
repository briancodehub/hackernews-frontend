import { useEffect, useState } from 'react';
import axios from 'axios';

const HN_API_URL = 'https://hacker-news.firebaseio.com/v0';

function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopStories() {
      try {
        // Get top story IDs
        const { data: ids } = await axios.get(`${HN_API_URL}/topstories.json`);
        const top10 = ids.slice(0, 10);

        // Get details for each story
        const storyPromises = top10.map(id =>
          axios.get(`${HN_API_URL}/item/${id}.json`)
        );

        const results = await Promise.all(storyPromises);
        setStories(results.map(res => res.data));
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopStories();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Hacker News Top Stories</h1>
      {loading && <p>Loading...</p>}
      {!loading && stories.length === 0 && <p>No stories found.</p>}
      <ul>
        {stories.map(story => (
          <li key={story.id} style={{ marginBottom: '1rem' }}>
            <a href={story.url} target="_blank" rel="noopener noreferrer">
              {story.title}
            </a>
            <div style={{ fontSize: '0.9rem', color: '#555' }}>
              By {story.by} | Score: {story.score}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
