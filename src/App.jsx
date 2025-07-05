import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        // Get top story IDs
        const idsResponse = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const topIds = idsResponse.data.slice(0, 10); // limit to 10 stories

        // Fetch details for each
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
    <div>
      <h1>Hacker News</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {stories.map(story => (
            <li key={story.id}>
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                {story.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
