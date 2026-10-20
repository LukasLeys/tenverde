import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'tenverde GmbH',
    short_name: 'tenverde',
    start_url: '/',
    display: 'browser',
    background_color: '#090f0b',
    theme_color: '#090f0b',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
