import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);

        // Fetch top story IDs
        const idsResponse = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const topIds = idsResponse.data.slice(0, 10); // just first 10 for now

        // Fetch details for each story
        const storyPromises = topIds.map(id =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        );

        const storyResponses = await Promise.all(storyPromises);
        const storiesData = storyResponses.map(res => res.data);

        setStories(storiesData);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Hacker News</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {stories.map(story => (
            <li key={story.id} style={{ marginBottom: '1rem' }}>
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                {story.title}
              </a>
              <div style={{ fontSize: '0.8rem', color: '#555' }}>
                by {story.by} | {new Date(story.time * 1000).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
