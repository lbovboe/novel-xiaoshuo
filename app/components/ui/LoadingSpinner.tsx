import { useSettings } from '@/app/context/SettingsContext';

interface LoadingSpinnerProps {
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({ text, fullScreen = false }: LoadingSpinnerProps) {
  const { convertText } = useSettings();
  const defaultText = '加载中...';
  const displayText = text || defaultText;

  const spinnerContent = (
    <div className="flex flex-col items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-solid border-current border-t-transparent text-light-primary dark:text-dark-primary"></div>
      <p className="mt-4 text-light-text-primary dark:text-dark-text-primary">
        {convertText ? convertText(displayText) : displayText}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded-lg bg-light-paper p-6 dark:bg-dark-paper">{spinnerContent}</div>
      </div>
    );
  }

  return <div className="flex items-center justify-center p-6">{spinnerContent}</div>;
}
