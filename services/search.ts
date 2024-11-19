import { APIMetadata } from '../types.ts';

/**
 * Searches through the API registry for matching APIs based on search terms
 * @param query Search string to match against API metadata
 * @param registry Array of API metadata to search through
 * @returns Array of matching API metadata
 */
export function searchAPIs(query: string, registry: APIMetadata[]): APIMetadata[] {
    const searchTerms = query.toLowerCase().split(" ");
    
    return registry.filter(api => {
        const searchableText = [
            api.name,
            api.description,
            ...api.category,
            ...api.keywords
        ].join(" ").toLowerCase();

        return searchTerms.every(term => searchableText.includes(term));
    });
}