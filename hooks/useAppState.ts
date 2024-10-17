import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { toast } from 'sonner-native';

export default function useAppState() {
  const appState = useRef(AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        toast('Velkommen tilbage!', { position: 'top-center', id: 'welcome' });
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return appStateVisible;
}
