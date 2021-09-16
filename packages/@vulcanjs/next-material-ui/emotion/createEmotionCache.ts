/**
 * For SSR with Emotion, cache contains the styles
 */

import createCache from "@emotion/cache";

export function createEmotionCache() {
  return createCache({ key: "css" });
}
