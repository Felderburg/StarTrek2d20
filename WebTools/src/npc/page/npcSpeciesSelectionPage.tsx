import { LcarsFrame } from '../../components/lcarsFrame';
import { PageIdentity } from '../../pages/pageIdentity';
import { SpeciesPage } from '../../pages/speciesPage';
import type { ICharacterProperties } from '../../solo/page/soloCharacterProperties';
import { characterMapStateToProperties } from '../../solo/page/soloCharacterProperties';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const NpcSpeciesSelectionPageBase: React.FC<ICharacterProperties> = ({
  character,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (character == null) {
      navigate('/npc');
    }
  }, [character, navigate]);

  if (character) {
    return (
      <LcarsFrame activePage={PageIdentity.NpcSpeciesSelection}>
        <div id="app">
          <SpeciesPage />
        </div>
      </LcarsFrame>
    );
  } else {
    return undefined;
  }
};

export const NpcSpeciesSelectionPage = connect(characterMapStateToProperties)(
  NpcSpeciesSelectionPageBase,
);
