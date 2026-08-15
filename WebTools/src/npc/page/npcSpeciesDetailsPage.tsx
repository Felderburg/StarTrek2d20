import {
  characterMapStateToProperties,
  ICharacterProperties,
} from '../../solo/page/soloCharacterProperties';
import LcarsFrame from '../../components/lcarsFrame';
import { PageIdentity } from '../../pages/pageIdentity';
import SpeciesDetailsPage from '../../pages/speciesDetailsPage';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const NpcSpeciesDetailsPage: React.FC<ICharacterProperties> = ({
  character,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (character == null) {
      navigate('/npc');
    }
  }, [character, navigate]);

  return (
    <LcarsFrame activePage={PageIdentity.NpcSpeciesSelectionDetails}>
      <div id="app">
        <SpeciesDetailsPage />
      </div>
    </LcarsFrame>
  );
};

export default connect(characterMapStateToProperties)(NpcSpeciesDetailsPage);
