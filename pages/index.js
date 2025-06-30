import { useState } from 'react';

export default function Home() {
  const [category, setCategory] = useState('');
  const [audience, setAudience] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateIdeas = async () => {
    setLoading(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, audience })
    });
    const data = await response.json();
    setIdeas(data.ideas || []);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>One-Tweet Product Generator 🚀</h1>
      <input
        type="text"
        placeholder="Category (e.g., AI)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: '100%', padding: 8, marginTop: 10 }}
      />
      <input
        type="text"
        placeholder="Audience (e.g., Gen Z)"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        style={{ width: '100%', padding: 8, marginTop: 10 }}
      />
      <button onClick={generateIdeas} disabled={loading} style={{ padding: 10, marginTop: 10 }}>
        {loading ? 'Generating...' : 'Generate Ideas'}
      </button>
      <ul>
        {ideas.map((idea, idx) => (
          <li key={idx} style={{ marginTop: 10 }}>{idea}</li>
        ))}
      </ul>
    </div>
  );
}