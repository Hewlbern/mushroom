/**
 * Forwards a request to the target API with payment verification
 * @param apiUrl The target API endpoint
 * @param request The request payload to forward
 * @param paymentTxid Transaction ID of the payment to verify
 * @returns Promise resolving to the API response
 * @throws Error if the request fails
 */
export async function forwardRequest(
    apiUrl: string,
    request: any,
    paymentTxid: string
): Promise<any> {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Payment-Txid": paymentTxid
        },
        body: JSON.stringify(request)
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
} 