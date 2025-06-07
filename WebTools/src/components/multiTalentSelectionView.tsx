import { Construct } from "../common/construct";
import { SelectedTalent } from "../common/selectedTalent";
import { RankedTalent } from "../helpers/rankedTalent";
import { TalentSelectionRow } from "./singleTalentSelectionList";

interface IMultiTalentSelectionProperties {
    talents: RankedTalent[]
    construct: Construct;
    selections?: (SelectedTalent)[];
    onSelection: (rankedTalent: RankedTalent, talent?: SelectedTalent) => void;
}

const MultiTalentSelectionView: React.FC<IMultiTalentSelectionProperties> = ({talents, onSelection, selections, construct}) => {

    const findSelection = (talent: RankedTalent) => {
        const temp = selections.filter(s => s.name === talent.name);
        return temp[talent.rank ?? 0];
    }

    return (<table className="selection-list">
        <tbody>
            {talents.map((t,i) =>
                <TalentSelectionRow talent={t}
                    onSelection={(selection) => onSelection(t, selection)}
                    selection={findSelection(t)}
                    construct={construct}
                    key={"talent-" + i} />)}
        </tbody>
    </table>);
}

export default MultiTalentSelectionView;