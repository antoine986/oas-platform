export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      content: [{ type: 'text', text: '❌ Clé API absente. Va dans Vercel → Settings → Environment Variables et vérifie que ANTHROPIC_API_KEY existe.' }]
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: req.body.max_tokens || 600,
        system: req.body.system,
        messages: req.body.messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({
        content: [{ type: 'text', text: `❌ Erreur Anthropic ${response.status}: ${data?.error?.message || JSON.stringify(data)}` }]
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      content: [{ type: 'text', text: `❌ Erreur serveur: ${error.message}` }]
    });
  }
}
