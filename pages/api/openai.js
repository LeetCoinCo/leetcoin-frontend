import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { text } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        text +
        '"""\n There\'s this many errors in the above Rust or Solidity smart contract code, this is what they are and and any potential optimizations:\n1.',
      temperature: 0,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['"""'],
    });

    res.status(200).json({ data: response.data.choices[0].text });
  } catch (error) {
    console.error("Error in openai API:", error); // Add this line to log the error
    res.status(500).json({ error: error.message });
  }
}
