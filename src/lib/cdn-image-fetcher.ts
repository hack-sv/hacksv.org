/**
 * CDN Image System - Lightweight, scalable solution for managing and displaying collections of images
 * Uses a two-tier JSON-based architecture for dynamic image loading and shuffling
 */

export interface CDNConfig {
    baseUrl: string;
    indexEndpoint: string;
    collectionEndpointTemplate: string;
}

export interface ShuffleOptions {
    algorithm?: "fisher-yates" | "sort-random";
    seed?: number;
}

/**
 * Basic API functions for simple use cases
 */
export async function fetchCollectionList(
    baseUrl: string = "https://cdn.hack.sv"
): Promise<string[]> {
    try {
        const response = await fetch(`${baseUrl}/ls.json`);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch collection list: ${response.statusText}`
            );
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching collection list:", error);
        return [];
    }
}

export async function fetchCollectionImages(
    collectionName: string,
    baseUrl: string = "https://cdn.hack.sv"
): Promise<string[]> {
    try {
        const response = await fetch(`${baseUrl}/${collectionName}.json`);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch images for collection ${collectionName}: ${response.statusText}`
            );
        }
        const images = await response.json();
        return images.map((img: string) => `${baseUrl}${img}`);
    } catch (error) {
        console.error(
            `Error fetching images for collection ${collectionName}:`,
            error
        );
        return [];
    }
}

export async function fetchAllImages(
    baseUrl: string = "https://cdn.hack.sv"
): Promise<string[]> {
    try {
        const collections = await fetchCollectionList(baseUrl);
        if (collections.length === 0) {
            return [];
        }

        const allImagePromises = collections.map((collection) =>
            fetchCollectionImages(collection, baseUrl)
        );
        const allImageArrays = await Promise.all(allImagePromises);

        // Flatten and shuffle
        const allImages = allImageArrays.flat();
        const shuffled = [...allImages].sort(() => Math.random() - 0.5);

        return shuffled;
    } catch (error) {
        console.error("Error fetching all images:", error);
        return [];
    }
}

/**
 * Advanced reusable class for more complex use cases
 */
export class ImageCDNFetcher {
    private config: CDNConfig;

    constructor(config: CDNConfig) {
        this.config = config;
    }

    async fetchCollectionList(): Promise<string[]> {
        try {
            const response = await fetch(
                `${this.config.baseUrl}/${this.config.indexEndpoint}`
            );
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch collection list: ${response.statusText}`
                );
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching collection list:", error);
            return [];
        }
    }

    async fetchCollectionImages(collectionName: string): Promise<string[]> {
        try {
            const endpoint = this.config.collectionEndpointTemplate.replace(
                "{collection}",
                collectionName
            );
            const response = await fetch(`${this.config.baseUrl}/${endpoint}`);
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch images for collection ${collectionName}: ${response.statusText}`
                );
            }
            const images = await response.json();
            return images.map((img: string) => `${this.config.baseUrl}${img}`);
        } catch (error) {
            console.error(
                `Error fetching images for collection ${collectionName}:`,
                error
            );
            return [];
        }
    }

    async fetchAllImages(options?: ShuffleOptions): Promise<string[]> {
        try {
            const collections = await this.fetchCollectionList();
            if (collections.length === 0) {
                return [];
            }

            const allImagePromises = collections.map((collection) =>
                this.fetchCollectionImages(collection)
            );
            const allImageArrays = await Promise.all(allImagePromises);

            const allImages = allImageArrays.flat();
            return this.shuffleArray(allImages, options);
        } catch (error) {
            console.error("Failed to fetch all images:", error);
            return [];
        }
    }

    private shuffleArray<T>(array: T[], options?: ShuffleOptions): T[] {
        const shuffled = [...array];
        const algorithm = options?.algorithm || "sort-random";

        if (algorithm === "fisher-yates") {
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
        } else {
            shuffled.sort(() => Math.random() - 0.5);
        }

        return shuffled;
    }

    async fetchImagesInBatches(batchSize: number = 5): Promise<string[]> {
        try {
            const collections = await this.fetchCollectionList();
            const allImages: string[] = [];

            for (let i = 0; i < collections.length; i += batchSize) {
                const batch = collections.slice(i, i + batchSize);
                const batchPromises = batch.map((collection) =>
                    this.fetchCollectionImages(collection)
                );
                const batchResults = await Promise.all(batchPromises);
                allImages.push(...batchResults.flat());
            }

            return this.shuffleArray(allImages);
        } catch (error) {
            console.error("Error fetching images in batches:", error);
            return [];
        }
    }
}

/**
 * Default configuration for hack.sv CDN
 */
export const defaultCDNConfig: CDNConfig = {
    baseUrl: "https://cdn.hack.sv",
    indexEndpoint: "ls.json",
    collectionEndpointTemplate: "{collection}.json",
};

/**
 * Pre-configured fetcher instance for hacksv.org
 */
export const hacksvCDNFetcher = new ImageCDNFetcher(defaultCDNConfig);
