import { ChronikInstance } from '../types.ts';

/**
 * Verifies that a valid mushroom token payment was made in the given transaction
 * @param chronik Chronik client instance
 * @param txid Transaction ID to verify
 * @returns Promise resolving to boolean indicating if payment is valid
 * @throws Error if verification fails
 */
export async function verifyMushroomPayment(
    chronik: ChronikInstance, 
    txid: string
): Promise<boolean> {
    try {
        const tx = await chronik.tx(txid);
        
        return tx.tokenEntries.some(entry => 
            entry.tokenId === process.env.MUSHROOM_TOKEN_ID &&
            entry.outputs.some(output => 
                output.address === process.env.API_WALLET_ADDRESS &&
                BigInt(output.amount) >= BigInt("1")
            )
        );
    } catch (err) {
        throw new Error(`Payment verification failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
}
