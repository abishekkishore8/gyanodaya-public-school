import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext adapter configuration.
 *
 * No incremental cache override: every page on this site renders from the site
 * document at request time, so there is nothing worth caching between requests
 * that Cloudflare's own edge cache does not already handle.
 */
export default defineCloudflareConfig();
