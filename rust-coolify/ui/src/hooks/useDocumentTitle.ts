import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `MD | ${title}`;
    return () => {
      document.title = 'MasterDeploy';
    };
  }, [title]);
}
