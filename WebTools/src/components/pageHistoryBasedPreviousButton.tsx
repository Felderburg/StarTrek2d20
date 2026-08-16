import { usePageHistory } from './pageHistoryContext';
import { PreviousButton } from './previousButton';

export const PageHistoryBasedPreviousButton: React.FC<{}> = () => {
  const { canGoBack, onBack } = usePageHistory();

  return <PreviousButton onClick={onBack} active={canGoBack} />;
};
