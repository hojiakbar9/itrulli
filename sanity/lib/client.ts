import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export async function fetchSanityData(query: string, params: Record<string, any> = {}) {
  try {
    const data = await client.fetch(query, params);
    return { data, error: null };
  } catch (error: any) {
    console.error("Sanity fetch error:", error);
    return { data: null, error: error.message || "An unknown error occurred during data fetching." };
  }
}

