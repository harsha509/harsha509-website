import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type SectionId = 'home' | 'about' | 'projects' | 'contact';

export function useSectionNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (section: SectionId) => {
      const scrollTo = () =>
        document
          .getElementById(section)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (location.pathname === '/') {
        scrollTo();
      } else {
        navigate('/', { state: { scrollTo: section } });
      }
    },
    [location.pathname, navigate],
  );
}
