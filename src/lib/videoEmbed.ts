/** Muted, looping YouTube playback shared by portfolio previews and lightboxes. */
export const buildPortfolioEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&playsinline=1&iv_load_policy=3&disablekb=1`;