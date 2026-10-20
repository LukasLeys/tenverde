import { NextResponse, type NextRequest } from 'next/server';
import { EN_ZU_INTERN, INTERN_ZU_EN } from '@/lib/routen';

// Deutsch: /strategie → intern /de/strategie. Englisch: /en/strategy → intern /en/strategie.
// /de/... und deutsche Slugs unter /en werden auf die öffentliche Adresse umgeleitet.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  if (pathname === '/de' || pathname.startsWith('/de/')) {
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const rest = pathname.slice(4).replace(/\/$/, '');
    if (!rest) return NextResponse.next();
    const [erster, ...weitere] = rest.split('/');
    if (INTERN_ZU_EN[erster] && !EN_ZU_INTERN[erster]) {
      url.pathname = ['/en', INTERN_ZU_EN[erster], ...weitere].join('/');
      return NextResponse.redirect(url, 308);
    }
    const intern = EN_ZU_INTERN[erster];
    url.pathname = ['/en', intern ?? erster, ...weitere].join('/');
    return NextResponse.rewrite(url);
  }

  url.pathname = `/de${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Alles außer Next-Interna, Metadaten-Routen und Dateien mit Endung.
  matcher: ['/((?!_next/|api/|favicon|icon|apple-icon|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.[a-zA-Z0-9]+$).*)'],
};
