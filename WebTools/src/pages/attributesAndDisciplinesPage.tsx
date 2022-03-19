﻿import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties} from './iPageProperties';
import {PageIdentity} from './pageIdentity';
import {Skill} from '../helpers/skills';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {SkillImprovementCollection} from '../components/skillImprovement';
import {ElectiveSkillList} from '../components/electiveSkillList';
import { TalentsHelper, TalentViewModel } from '../helpers/talents';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {ValueInput, Value} from '../components/valueInput';
import { TalentSelection } from '../components/talentSelection';
import { CharacterCreationBreadcrumbs } from '../components/characterCreationBreadcrumbs';

interface IPageState {
    showExcessAttrDistribution: boolean;
    showExcessSkillDistribution: boolean;
}

export class AttributesAndDisciplinesPage extends React.Component<IPageProperties, IPageState> {
    private _selectedTalent: TalentViewModel;
    private _attrPoints: number;
    private _excessAttrPoints: number;
    private _skillPoints: number;
    private _excessSkillPoints: number;
    private _attributesDone: boolean;
    private _skillsDone: boolean;

    constructor(props: IPageProperties) {
        super(props);

        this._attrPoints = 2;
        this._skillPoints = 2;

        let attrSum = 0;
        let discSum = 0;

        character.attributes.forEach(a => {
            attrSum += a.value;
        });

        character.skills.forEach(s => {
            discSum += s.expertise;
        });

        this._excessAttrPoints = character.age.attributeSum - this._attrPoints - attrSum;
        this._excessSkillPoints = character.age.disciplineSum - this._skillPoints - discSum;

        this.state = {
            showExcessAttrDistribution: this._excessAttrPoints > 0,
            showExcessSkillDistribution: this._excessSkillPoints > 0
        };
    }

    render() {
        const attributes = 
                (<AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Customization} 
                    points={this._excessAttrPoints + this._attrPoints} onDone={(done) => { this.attributesDone(done); } } />)

        const disciplines = !this.state.showExcessSkillDistribution
            ? <ElectiveSkillList points={this._skillPoints} skills={character.skills.map(s => { return s.skill; }) } 
                onUpdated={(skills) => { this._skillsDone = skills.length === this._skillPoints; } } />
            : <SkillImprovementCollection points={this._excessSkillPoints + this._skillPoints} 
                skills={character.skills.map(s => s.skill) } onDone={(done) => { this._skillsDone = done; }} />;

        const description = "At this stage, your character is almost complete, and needs only a few final elements and adjustments. This serves as a last chance to customize the character before play.";

        let talents = [];
        talents.push(...TalentsHelper.getTalentsForSkills(character.skills.map(s => { return s.skill; })), ...TalentsHelper.getTalentsForSkills([Skill.None]));

        const talentSelection = character.workflow.currentStep().options.talentSelection
            ? (<div className="panel">
                <div className="header-small">TALENTS</div>
                <TalentSelection talents={talents} onSelection={talents => { this._selectedTalent = talents.length > 0 ? talents[0] : undefined; }} />
            </div>)
            : undefined;


        const attributeText = this._excessAttrPoints > 0 ? (
            <div className="page-text">
                The point total includes {this._excessAttrPoints} excess {this._excessAttrPoints > 1 ? ' Points ' : ' Point '} that could not 
                be automatically added to your attributes without exceeding maximum values.
            </div>
        ) : undefined;

        const disciplinesText = this._excessSkillPoints > 0 ? (
            <div className="page-text">
                The point total includes {this._excessSkillPoints} excess {this._excessSkillPoints > 1 ? ' Points ' : ' Point '} that could not 
                be automatically added to your dsciplines without exceeding maximum values.
            </div>
        ) : undefined;


        let value = (character.workflow.currentStep().options.valueSelection) 
            ? (<div className="panel">
                    <div className="header-small">VALUE</div>
                    <ValueInput value={Value.Finish}/>
                </div>)
            : undefined;


        return (
            <div className="page">
                <CharacterCreationBreadcrumbs />
                <div className="page-text">
                    {description}
                </div>
                <div className="panel">
                    <div className="header-small">{`ATTRIBUTES (POINTS: ${this._excessAttrPoints + this._attrPoints})`}</div>
                    {attributeText}
                    {attributes}
                </div>
                <div className="panel">
                    <div className="header-small">{`DISCIPLINES (POINTS: ${this._excessSkillPoints + this._skillPoints})`}</div>
                    {disciplinesText}
                    {disciplines}
                </div>
                {value}
                {talentSelection}
                <Button text="FINISH" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private attributesDone(done: boolean) {
        this._attributesDone = done;
    }

    private onNext() {
        if (!this._attributesDone) {
            Dialog.show("You have not distributed all Attribute points.");
            return;
        }

        if (!this._skillsDone) {
            Dialog.show("You have not distributed all Discipline points.");
            return;
        }

        if (character.workflow.currentStep().talentPrompt) {
            if (!this._selectedTalent) {
                Dialog.show("You have not selected a talent.");
                return;
            }

            character.addTalent(this._selectedTalent);

            if (this._selectedTalent.name === "The Ushaan") {
                character.addEquipment("Ushaan-tor ice pick");
            }
        }

        if (character.hasTalent("Borg Implants")) {
            Navigation.navigateToPage(PageIdentity.BorgImplants);
        }
        else {
            Navigation.navigateToPage(PageIdentity.Finish);
        }
    }
}
