const { Deepgram } = require("@deepgram/sdk");
const OpenAI = require("openai");
const asyncHandler = require("express-async-handler");
const openai = new OpenAI({ apiKey: process.env.GPT_KEY });
const deepgram = new Deepgram(process.env.DEEPGRRM_KEY);

const analyze = asyncHandler(async (req, res) => {

    try {
        // Use the Deepgram SDK to transcribe the audio
        const response = await deepgram.transcription.preRecorded(
            {
                buffer: req.file.buffer,
                mimetype: req.file.mimetype,
            },
            {
                smart_format: true,
                model: "nova",
            }
        );

        const data = JSON.parse(JSON.stringify(response));
        const lyrics = data.results.channels[0].alternatives[0].transcript;
        // Use the OpenAI API to generate a response based on the transcripts
        const openai_res = await openai.chat.completions.create({
            model: "gpt-4-0613",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful technical assist.",
                },
                {
                    role: "user",
                    content: `
            Given the song lyrics provided below, can you utilize your expertise to distinguish and separate the verses and choruses?
            Here are the lyrics:

            "
            ${lyrics}
            "

            Usually, the chorus is defined as a phrase that is repeated multiple times, and a typical song contains two or three verses.
            I'd appreciate the correct interpretation based on your experience.
            Plz give me only the result without additional explaination.
          `,
                },
            ],
        });

        // Send the generated response back as JSON
        console.log(openai_res.choices);
        res.status(200).json(openai_res.choices[0].message.content);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }

});

module.exports = analyze;