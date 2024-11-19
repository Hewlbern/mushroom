import { ChronikInstance } from '../types.ts';

/**
 * Sends tokens to a specified address
 * @param chronik Chronik client instance
 * @param recipientAddress The recipient's eCash address
 * @param tokenType The type of token to send
 * @param amount The amount of tokens to send
 * @returns Promise resolving to the transaction ID
 */
export async function sendToken(
    chronik: ChronikInstance,
    recipientAddress: string,
    tokenType: string,
    amount: string
): Promise<string> {
    // Implementation of token sending using chronik
    // This would be implemented with actual token sending logic
    return "example_token_payment_txid";
}

/**
 * Convenience function for sending mushroom tokens
 * @param chronik Chronik client instance
 * @param recipientAddress The recipient's eCash address
 * @returns Promise resolving to the transaction ID
 */
export async function sendMushroomToken(
    chronik: ChronikInstance,
    recipientAddress: string
): Promise<string> {
    return sendToken(chronik, recipientAddress, "MUSHROOM", "1");
} 