import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { category, audience } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a startup idea machine. Generate 5 fun, quirky, one-tweet generative AI product ideas in the category provided for the audience provided. Each should be a single tweet length and catchy.'
        },
        {
          role: 'user',
          content: `Category: ${category}, Audience: ${audience}`
        }
      ]
    });

    const ideasText = completion.choices[0].message.content;
    const ideas = ideasText.split('\n').filter((line) => line.trim() !== '');

    res.status(200).json({ ideas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}