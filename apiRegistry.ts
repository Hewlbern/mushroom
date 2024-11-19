import { APIRegistry } from "./types.ts";

export const apiRegistry: APIRegistry = [
    {
        name: "Music Recognition API",
        description: "Identifies songs from audio samples",
        category: ["music", "audio", "recognition"],
        url: "https://api.musicrecognition.example/v1",
        ecashAddress: "ecash:music_recognition_address",
        requiredToken: {
            type: "BIRD",
            amount: "1"
        },
        keywords: ["music", "song", "identify", "audio", "recognition"]
    },
    {
        name: "Lyrics API",
        description: "Provides song lyrics and metadata",
        category: ["music", "lyrics", "metadata"],
        url: "https://api.lyrics.example/v2",
        ecashAddress: "ecash:lyrics_api_address",
        requiredToken: {
            type: "BIRD",
            amount: "1"
        },
        keywords: ["lyrics", "songs", "music", "text", "metadata"]
    },
    {
        name: "AI Image Generation",
        description: "Generates images from text descriptions",
        category: ["ai", "images", "generation"],
        url: "https://api.aigen.example/v1",
        ecashAddress: "ecash:ai_image_address",
        requiredToken: {
            type: "PAINTBRUSH",
            amount: "2"
        },
        keywords: ["ai", "image", "generate", "art", "creative"]
    }
];
