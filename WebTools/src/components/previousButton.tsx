import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface IPreviousButtonProperties {
  onClick: () => void;
}

export const PreviousButton: React.FC<IPreviousButtonProperties> = ({
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <Button variant="outline-primary" className="text-start" onClick={onClick}>
      {t('Common.button.previous')}
    </Button>
  );
};
