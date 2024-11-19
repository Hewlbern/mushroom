import { ChronikClient } from "chronik-client";

export type APIMetadata = {
    name: string;
    description: string;
    category: string[];
    url: string;
    ecashAddress: string;
    requiredToken: {
        type: string;
        amount: string;
    };
    keywords: string[];
};

export type ChronikInstance = ChronikClient;
export type APIRegistry = APIMetadata[];
