import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method should be POST' });
  } else {
    try {
      const { body } = req;
      const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      };
// OPENAI_API_KEY="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"
      const response = await axios.post(url, body, { headers: headers });
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
