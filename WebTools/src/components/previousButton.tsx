import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface IPreviousButtonProperties {
  active?: boolean;
  onClick: () => void;
}

export const PreviousButton: React.FC<IPreviousButtonProperties> = ({
  active,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <Button
      variant="link"
      active={active}
      className="text-primary"
      onClick={onClick}
    >
      {t('Common.button.previous')}
    </Button>
  );
};
