import express from "express";
import { ChronikClient } from "chronik-client";
// import { Script, TxBuilder, P2PKHSignatory } from "ecash-lib";
import { APIMetadata, ChronikInstance } from './types.ts';
import { apiRegistry } from './apiRegistry.ts';
import { searchAPIs } from './services/search.ts';
import { verifyMushroomPayment } from './services/tokenVerification.ts';
import { sendToken, sendMushroomToken } from './services/tokenSending.ts';
import { forwardRequest } from './services/requestForwarding.ts';

// Main API setup function
function createAPIRouter() {
    const app = express();
    app.use(express.json());

    const chronik = new ChronikClient([
        "https://chronik.be.cash/xec",
        "https://chronik.fabien.cash"
    ]);

    // Search endpoint
    app.post("/search", async (req: express.Request, res: express.Response) => {
        try {
            const {
                mushroomPaymentTxid,
                returnAddress,
                query
            } = req.body;

            if (!mushroomPaymentTxid || !returnAddress || !query) {
                return res.status(400).json({
                    error: "Missing required parameters"
                });
            }

            // Verify payment
            const isValidPayment = await verifyMushroomPayment(chronik, mushroomPaymentTxid);
            if (!isValidPayment) {
                return res.status(402).json({
                    error: "Invalid mushroom token payment"
                });
            }

            // Search APIs
            const matchingApis = searchAPIs(query, apiRegistry);

            if (matchingApis.length === 0) {
                return res.status(404).json({
                    error: "No matching APIs found"
                });
            }

            // Send return mushroom token
            const returnPaymentTxid = await sendMushroomToken(
                chronik,
                returnAddress
            );

            // Return matches and payment
            return res.json({
                apis: matchingApis.map(api => ({
                    name: api.name,
                    description: api.description,
                    category: api.category,
                    requiredToken: api.requiredToken,
                    endpoint: `/route/${encodeURIComponent(api.name)}`
                })),
                mushroomPaymentTxid: returnPaymentTxid
            });

        } catch (err) {
            console.error("Search request failed:", err);
            return res.status(500).json({
                error: err instanceof Error ? err.message : "Unknown error"
            });
        }
    });

    // Route endpoint
    app.post("/route/:apiName", async (req: express.Request, res: express.Response) => {
        try {
            const {
                mushroomPaymentTxid,
                returnAddress,
                request
            } = req.body;

            const apiName = decodeURIComponent(req.params.apiName);
            const api = apiRegistry.find(a => a.name === apiName);

            if (!api) {
                return res.status(404).json({ error: "API not found" });
            }

            // Verify mushroom payment
            const isValidPayment = await verifyMushroomPayment(chronik, mushroomPaymentTxid);
            if (!isValidPayment) {
                return res.status(402).json({
                    error: "Invalid mushroom token payment"
                });
            }

            // Send required token to API
            const apiPaymentTxid = await sendToken(
                chronik,
                api.ecashAddress,
                api.requiredToken.type,
                api.requiredToken.amount
            );

            // Forward request to API
            const apiResponse = await forwardRequest(
                api.url,
                request,
                apiPaymentTxid
            );

            // Send return mushroom token
            const returnPaymentTxid = await sendMushroomToken(
                chronik,
                returnAddress
            );

            return res.json({
                data: apiResponse,
                mushroomPaymentTxid: returnPaymentTxid
            });

        } catch (err) {
            console.error("Route request failed:", err);
            return res.status(500).json({
                error: err instanceof Error ? err.message : "Unknown error"
            });
        }
    });

    return app;
}

// Start server function
function startServer(port: number = 3000) {
    const app = createAPIRouter();
    app.listen(port, () => {
        console.log(`API Router listening on port ${port}`);
        console.log(`Registered APIs: ${apiRegistry.map(api => api.name).join(", ")}`);
    });
    return app;
}

// Start server if running directly
if (import.meta.main) {
    startServer();
}

export {
    createAPIRouter,
    startServer,
    type APIMetadata
};