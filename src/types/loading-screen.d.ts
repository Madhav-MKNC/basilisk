
import { ReactNode } from 'react';

export interface LoadingStep {
  text: string;
  icon: ReactNode;
}

export interface LoadingScreenProps {
  onLoadComplete?: () => void;
  showLoadingScreen: boolean;
}
