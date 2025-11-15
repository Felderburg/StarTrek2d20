import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { SystemGenerationTable } from '../table/systemGenerator';
import { SpaceRegion, SpaceRegionModel, SpecialSectors, SpecialSectorTypeModel } from '../table/star';
import { DropDownElement, DropDownSelect } from '../../components/dropDownInput';
import { useNavigate } from 'react-router';
import { hasSource } from '../../state/contextFunctions';
import { Source } from '../../helpers/sources';
import LcarsFrame from '../../components/lcarsFrame';
import { PageIdentity } from '../../pages/pageIdentity';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SystemGenerationPage = () => {

    const [region, setRegion] = useState(SpaceRegionModel.allRegions()[0].id);
    const [sectorType, setSectorType] = useState(SpecialSectors.GeneralExpanse);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const renderSectorTypeSection = () => {
        if (region === SpaceRegion.ShackletonExpanse) {
            let options = SpecialSectorTypeModel.allSpecialSectorTypes().map(s => new DropDownElement(s.id, s.name));
            return (<div className="page-text mt-3">
                    <DropDownSelect onChange={(e) => selectSectorType(e as SpecialSectors)} defaultValue={sectorType} items={options} />
                </div>)
        } else {
            return null;
        }
    }

    const selectSectorType = (sectorType: SpecialSectors) => {
        setSectorType(sectorType);
    }

    const selectRegion = (region: SpaceRegion) => {
        setRegion(region);
    }

    const regionOptions = () => {
        return SpaceRegionModel
            .allRegions()
            .filter(r => r.id !== SpaceRegion.ShackletonExpanse || hasSource(Source.ShackletonExpanse))
            .map(r => { return new DropDownElement(r.id, r.name) });
    }

    const generateSystem = () => {
        SystemGenerationTable.generateSector(SpaceRegionModel.for(region), region === SpaceRegion.ShackletonExpanse ? sectorType : undefined);
        navigate("/tools/sector/details");
    }

    return (
        <LcarsFrame activePage={PageIdentity.SystemGeneration}>
            <div id="app">
                <div className="page container ms-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/tools">{t('Page.title.otherTools')}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">System Generation</li>
                        </ol>
                    </nav>

                    <main>
                        <div className="page-text mt-3">
                            Select tool.
                        </div>
                        <div className="page-text mt-3">
                        <DropDownSelect onChange={(e) => selectRegion(e as SpaceRegion)} defaultValue={region} items={regionOptions()} />
                        </div>
                        {renderSectorTypeSection()}
                        <div className="button-container mt-4">
                            <Button onClick={() => generateSystem()}>Generate Sector</Button>
                        </div>
                    </main>
                </div>
            </div>
        </LcarsFrame>
    );
}

export default SystemGenerationPage;