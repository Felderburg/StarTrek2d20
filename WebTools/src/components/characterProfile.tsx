import React from 'react';
import i18n from 'i18next';
import {Character} from '../common/character';
import {Attribute} from '../helpers/attributes';
import {Department} from '../helpers/department';
import {EnvironmentsHelper, Environment} from '../helpers/environments';
import {TracksHelper} from '../helpers/tracks';
import {CareersHelper} from '../helpers/careers';
import {CareerEventsHelper} from '../helpers/careerEvents';
import {Era, ErasHelper} from '../helpers/eras';
import store from '../state/store';
import { withTranslation, WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { CharacterType, CharacterTypeModel } from '../common/characterType';
import { Stereotype } from '../common/construct';
import { CharacterSerializer } from '../common/characterSerializer';
import { isSecondEdition } from '../state/contextFunctions';
import { Implant } from '../helpers/borgImplant';

interface ICharacterSheetProperties extends WithTranslation {
    era?: Era;
    showProfile: boolean;
    storeBased?: boolean;
    close: () => void;
}

class CharacterProfile extends React.Component<ICharacterSheetProperties, {}> {

    render() {
        const { t } = this.props;
        let c = Character.createMainCharacter(CharacterType.Starfleet, Era.NextGeneration, isSecondEdition() ? 2 : 1);
        if (store.getState().character.currentCharacter) {
            c = store.getState().character.currentCharacter;
        }

        const getEnvironmentString = () => {
            let env = c.environmentStep ? EnvironmentsHelper.getEnvironment(c.environmentStep.environment, c).localizedName : i18n.t('Common.text.none');

            if (c.environmentStep?.environment === Environment.AnotherSpeciesWorld && c.environmentStep?.otherSpecies != null) {
                env = CharacterSerializer.serializeEnvironment(c.environmentStep.environment, c.environmentStep.otherSpecies, c);
            }

            return env;
        }

        const characterValues = c.values;

        const values = characterValues.map((v, i) => {
            return (<div key={i}>{v}</div>);
        });

        const focuses = c.focuses.map((f, i) => {
            return (<div key={i}>{f}</div>);
        });

        const talents = c.talents.map((st, i) => {
            return (<div key={i}>{st.displayName}</div>)
        });

        let equipment = c.equipmentAndImplants.map((e, i) => {
            if (c.version > 1 && e instanceof Implant) {
                return (<div key={i}>{e.localizedName2e}</div>)
            } else {
                return (<div key={i}>{e.localizedName}</div>)
            }
        });

        if (c.careerStep?.career !== undefined) {
            if (store.getState().context.era === Era.Enterprise) {
                equipment.push(<div key={999}>Phase pistol</div>);
            } else {
                if (c.isSecurityOrSeniorOfficer()) {
                    equipment.push(<div key={999}>Phaser type -2</div>);
                }
                else {
                    equipment.push(<div key={999}>Phaser type -1</div>);
                }
            }
        }

        let careerEvents = c.careerEvents.map((e, i) => {
            return (<div key={i}>{CareerEventsHelper.getCareerEvent(e.id, c.type, c.version).localizedName}</div>)
        });

        let containerClass = this.props.showProfile ? "sheet-container sheet-container-visible pe-3" :  "sheet-container sheet-container-hidden pe-3";
        const era = c.era == null ? null : ErasHelper.getEra(c.era);

        return (
            <div id="character-sheet">
                <div id="character-sheet" className={this.props.showProfile ? 'sheet-visible' : 'sheet-hidden'}>
                    <div className="sheet-bg" id="sheet-bg" style={{ display: this.props.showProfile ? '' : "none" }} onClick={() => this.props.close()}></div>
                    <div className={containerClass} id="sheet-container">
                        <div className="row">
                            {c.name?.length
                                ? (<>
                                    <div className="col-md-6 mb-2">
                                        <div className="sheet-panel d-flex">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.other.name')}</div>
                                            <div className="sheet-data">
                                                {c.name ?? ""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="sheet-panel d-flex">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.other.pronouns')}</div>
                                            <div className="sheet-data">
                                                {c.pronouns ?? ""}
                                            </div>
                                        </div>
                                    </div>
                                </>)
                            : undefined}


                            <div className="col-md-6 mb-2">
                                <div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.characterType')}</div>
                                    <div className="sheet-data">
                                        {
                                            c.type === CharacterType.Other
                                            ? c.typeDetails?.name
                                            : CharacterTypeModel.getByType(c.type)?.localizedName}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-2">
                                <div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.era')}</div>
                                    <div className="sheet-data">
                                        {era?.localizedName ?? ""}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-2">
                                <div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.rank')}</div>
                                    <div className="sheet-data">
                                        {c.rank?.localizedName ?? ""}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-2">
                                <div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.assignment')}</div>
                                    <div className="sheet-data">
                                        {c.assignment ?? ""}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-2">
                                <div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.species')}</div>
                                    <div className="sheet-data">
                                        {c.localizedSpeciesName ?? i18n.t('Common.text.none')}
                                    </div>
                                </div>

                            {c.version > 1 ?
                            (<div className="sheet-panel d-flex">
                                <div className="sheet-label-purple text-uppercase">{t('Construct.other.speciesAbility')}</div>
                                <div className="sheet-data">
                                    {c.speciesStep?.abilityDisplayName ?? ""}
                                </div>
                            </div>)
                            : undefined}
                                {c.stereotype === Stereotype.Npc
                                    ? undefined
                                    : (<>
                                        <div className="sheet-panel d-flex">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.other.environment')}</div>
                                            <div className="sheet-data">
                                                { getEnvironmentString() ?? i18n.t('Common.text.none')}
                                            </div>
                                        </div>
                                        <div className="sheet-panel d-flex">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.other.training')}</div>
                                            <div className="sheet-data">
                                                {c.educationStep?.track != null
                                                    ? (c.version === 1
                                                        ? TracksHelper.instance.getTrack(c.educationStep?.track, c.type, c.version)?.localizedName
                                                        : TracksHelper.instance.getTrack(c.educationStep?.track, c.type, c.version)?.localizedName2e)
                                                    : i18n.t('Common.text.none')}
                                            </div>
                                        </div>
                                    </>)}
                            </div>

                            <div className="col-md-6 mb-2">
                                <div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.traits')}</div>
                                    <div className="sheet-data">
                                        {c.getAllTraits()}
                                    </div>
                                </div>
                                {c.stereotype === Stereotype.Npc
                                    ? undefined
                                    : (<>
                                        <div className="sheet-panel d-flex">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.other.upbringing')}</div>
                                            <div className="sheet-data">
                                                { c.upbringingStep?.localizedDescription ?? i18n.t('Common.text.none')}
                                            </div>
                                        </div>
                                        <div className="sheet-panel d-flex">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.other.career')}</div>
                                            <div className="sheet-data">
                                                { c.careerStep?.career != null
                                                    ? (c.stereotype === Stereotype.SoloCharacter
                                                        ? CareersHelper.instance.getSoloCareerLength(c.careerStep?.career).localizedName
                                                        : CareersHelper.instance.getCareer(c.careerStep?.career, c).localizedName)
                                                    : i18n.t('Common.text.none')}
                                            </div>
                                        </div>
                                    </>)}
                            </div>

                            <div className="col-md-6 mb-2">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.attribute.control')}</div>
                                            <div className="sheet-data text-center">
                                                {c.attributes[Attribute.Control]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.attribute.daring')}</div>
                                            <div className="sheet-data text-center">
                                                {c.attributes[Attribute.Daring]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.attribute.fitness')}</div>
                                            <div className="sheet-data text-center">
                                                {c.attributes[Attribute.Fitness]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.attribute.insight')}</div>
                                            <div className="sheet-data text-center">
                                                {c.attributes[Attribute.Insight]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.attribute.presence')}</div>
                                            <div className="sheet-data text-center">
                                                {c.attributes[Attribute.Presence]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-purple text-uppercase">{t('Construct.attribute.reason')}</div>
                                            <div className="sheet-data text-center">
                                                {c.attributes[Attribute.Reason]}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-2">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-orange text-uppercase">{t('Construct.discipline.command')}</div>
                                            <div className="sheet-data text-center">
                                                {c.departments[Department.Command]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-orange text-uppercase">{t('Construct.discipline.conn')}</div>
                                            <div className="sheet-data text-center">
                                                {c.departments[Department.Conn]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-orange text-uppercase">{t('Construct.discipline.security')}</div>
                                            <div className="sheet-data text-center">
                                                {c.departments[Department.Security]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-orange text-uppercase">{t('Construct.discipline.engineering')}</div>
                                            <div className="sheet-data text-center">
                                                {c.departments[Department.Engineering]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-orange text-uppercase">{t('Construct.discipline.science')}</div>
                                            <div className="sheet-data text-center">
                                                {c.departments[Department.Science]}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="sheet-panel d-flex mw-100">
                                            <div className="sheet-label-orange text-uppercase">{t('Construct.discipline.medicine')}</div>
                                            <div className="sheet-data text-center">
                                                {c.departments[Department.Medicine]}
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className="col-md-6 mb-2">
                                <div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.values')}</div>
                                    <div className="sheet-data">
                                        {values}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 mb-2">
                                <div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.focuses')}</div>
                                    <div className="sheet-data">
                                        {focuses}
                                    </div>
                                </div>

                            {(c.version > 1 && c.stereotype !== Stereotype.Npc) ?
                                (<div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.pastimes')}</div>
                                    <div className="sheet-data">
                                        {c.pastime?.join(", ") ?? ""}
                                    </div>
                                </div>)
                                : undefined}
                            </div>

                            {c.stereotype === Stereotype.SoloCharacter ? undefined :
                                (<div className="col-md-6 mb-2">
                                    <div className="sheet-panel d-flex">
                                        <div className="sheet-label-purple text-uppercase">{t('Construct.other.talents')}</div>
                                        <div className="sheet-data">
                                        {talents}
                                        </div>
                                    </div>
                                </div>)}

                            <div className="col-md-6 mb-2">
                                <div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.equipment')}</div>
                                    <div className="sheet-data">
                                        {equipment}
                                    </div>
                                </div>
                            </div>

                            {c.stereotype !== Stereotype.Npc
                            ? (<div className="col-md-6 mb-2">
                                <div className="sheet-panel d-flex">
                                    <div className="sheet-label-purple text-uppercase">{t('Construct.other.careerEvents')}</div>
                                    <div className="sheet-data">
                                        {careerEvents}
                                    </div>
                                </div>
                            </div>)
                            : undefined}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        era: state.context.era,
    };
}

export default withTranslation()(connect(mapStateToProps)(CharacterProfile));