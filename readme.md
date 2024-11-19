# Mushroom API Router

A decentralized API router service that manages token-based API access and discovery using eCash.

## Overview

The Mushroom API Router enables discovery and secure access to various APIs through token-based payments. It provides a searchable registry of APIs with rich metadata and handles all token payment verification.

## Key Features

- **API Discovery**: Search through available APIs by name, description, or category
- **Token Management**: Handles MUSHROOM and BIRD token payment verification
- **Secure Routing**: Safe forwarding of authenticated requests to target APIs
- **Rich Metadata**: Detailed API information including requirements and pricing

## Installation

```bash
npm install
npm run build
```

## Usage

### Searching Available APIs

```typescript
const searchResponse = await fetch("http://api:3000/search", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        mushroomPaymentTxid: "your_mushroom_payment_txid",
        returnAddress: "ecash:your_return_address",
        query: "music recognition"
    })
});

// Example Response:
{
    "apis": [
        {
            "name": "Shazam-like API",
            "description": "Music recognition service",
            "category": ["music", "audio", "recognition"],
            "requiredToken": {
                "type": "BIRD",
                "amount": "1.0"
            },
            "endpoint": "/route/music-recognition",
            "walletAddress": "ecash:qr..."
        }
    ],
    "mushroomPaymentTxid": "txid_for_return_payment"
}
```

### Using an API

```typescript
const apiResponse = await fetch("http://api:3000/route/music-recognition", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        mushroomPaymentTxid: "your_mushroom_payment_txid",
        returnAddress: "ecash:your_return_address",
        request: {
            audioUrl: "https://example.com/audio.mp3",
            duration: "30"
        }
    })
});

// Example Response:
{
    "data": {
        "songName": "Never Gonna Give You Up",
        "artist": "Rick Astley",
        "confidence": 0.95
    },
    "mushroomPaymentTxid": "txid_for_return_payment"
}
```

## Token Flow

1. **Client → Router**
   - Sends MUSHROOM token payment
   - Includes return address and request

2. **Router → Service**
   - Verifies MUSHROOM token
   - Sends BIRD token payment
   - Forwards request

3. **Service → Router**
   - Processes request
   - Returns response

4. **Router → Client**
   - Returns response with new MUSHROOM token

## API Registry Schema

```typescript
type APIEntry = {
    name: string;
    description: string;
    category: string[];
    requiredToken: {
        type: "BIRD";
        amount: string;
    };
    endpoint: string;
    walletAddress: string;
};
```

## Environment Variables

```bash
CHRONIK_URL=your_chronik_url
PRIVATE_KEY=your_private_key
PORT=3000
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT