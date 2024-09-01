﻿import React from 'react';
import { PageIdentity } from '../pages/pageIdentity';
import { withTranslation, WithTranslation } from 'react-i18next';
import { makeKey } from '../common/translationKey';

interface IPageHeaderProperties extends WithTranslation {
    page: PageIdentity;
}

export const getPageTitle = (t, page) => {
    let key = makeKey('Page.title.', PageIdentity[page]);

    if (key !== t(key)) {
        return t(key);
    } else if (page === PageIdentity.SoloCharacterEra) {
        return t('Page.title.era');
    } else if (page === PageIdentity.SoloCareerEvent1) {
        return t('Page.title.careerEvent1');
    } else if (page === PageIdentity.SoloCareerEvent2) {
        return t('Page.title.careerEvent2');
    } else if (page === PageIdentity.SoloCareerEventDetails1) {
        return t('Page.title.careerEventDetails1');
    } else if (page === PageIdentity.SoloCareerEventDetails2) {
        return t('Page.title.careerEventDetails2');
    } else if (page === PageIdentity.Environment) {
        return t('Page.title.environment');
    } else if (page === PageIdentity.EnvironmentDetails) {
        return t('Page.title.environmentDetails');
    } else if (page === PageIdentity.SoloSpecies) {
        return t('Page.title.species');
    } else if (page === PageIdentity.SoloSpeciesDetails) {
        return t('Page.title.speciesDetails');
    } else if (page === PageIdentity.SupportingCharacter) {
        return "Supporting Character";
    } else if (page === PageIdentity.SoloStarshipSpaceframe) {
        return t('Page.title.spaceframeSelection');
    } else if (page === PageIdentity.SoloStarshipTalents) {
        return t('Page.title.starshipTalentSelection');
    } else if (page === PageIdentity.SoloStarshipFinish) {
        return t('Page.title.finalStarshipDetails');
    } else if (page === PageIdentity.StarshipToolSelection) {
        return "Starship Tools";
    } else if (page === PageIdentity.StarshipTypeSelection) {
        return "Starship Type";
    } else if (page === PageIdentity.StarshipTalentSelection) {
        return "Starship Talents";
    } else if (page === PageIdentity.SimpleStarship) {
        return "Starship Stats";
    } else if (page === PageIdentity.SmallCraftStats) {
        return "Small Craft Stats";
    } else if (page === PageIdentity.StarshipWeaponsSelection) {
        return "Starship Weapons";
    } else if (page === PageIdentity.ToolSelection) {
        return "Registry";
    } else if (page === PageIdentity.CharacterType) {
        return "Character Type";
    } else if (page === PageIdentity.Species
            || page === PageIdentity.SpeciesDetails
            || page === PageIdentity.KobaliExtraSpeciesDetails
            || page === PageIdentity.LiberatedBorgSpeciesExtraDetails
            || page === PageIdentity.BorgSpeciesExtraDetails
            || page === PageIdentity.CyberneticallyEnhancedSpeciesExtraDetails
            || page === PageIdentity.ExtraTalentDetails
            || page === PageIdentity.Environment
            || page === PageIdentity.EnvironmentDetails
            || page === PageIdentity.Upbringing
            || page === PageIdentity.UpbringingDetails
            || page === PageIdentity.Career
            || page === PageIdentity.CareerDetails
            || page === PageIdentity.ChildCareer
            || page === PageIdentity.NoviceOrCadetExperience
            || page === PageIdentity.CadetSeniority
            || page === PageIdentity.ChildEducationPage
            || page === PageIdentity.ChildEducationDetailsPage
            || page === PageIdentity.CareerEvent1
            || page === PageIdentity.CareerLengthDetails
            || page === PageIdentity.CareerEvent1Details
            || page === PageIdentity.CareerEvent2
            || page === PageIdentity.CareerEvent2Details
            || page === PageIdentity.AttributesAndDisciplines
            || page === PageIdentity.Finish) {
        return "";
    } else if (page === PageIdentity.SystemGeneration) {
        return "System Generation";
    } else if (page === PageIdentity.SectorDetails) {
        return "Sector Details";
    } else if (page === PageIdentity.SpaceframeOption) {
        return "Spaceframe Choice";
    } else if (page === PageIdentity.SpaceframeSelection) {
        return "Spaceframe Selection";
    } else if (page === PageIdentity.CustomSpaceframe) {
        return "Custom Spaceframe";
    } else if (page === PageIdentity.MissionProfileSelection) {
        return "Mission Profile";
    } else if (page === PageIdentity.MissionPodSelection) {
        return "Mission Pod";
    } else if (page === PageIdentity.StarshipRefits) {
        return "Starship Refits";
    } else if (page === PageIdentity.StarSystemDetails) {
        return "Star System Details";
    } else {
        return "";
    }
}

class PageHeader extends React.Component<IPageHeaderProperties, {}> {
    render() {
        const title = getPageTitle(this.props.t, this.props.page);

        return (
            <div className="page-header">{title}</div>
        );
    }


}

export default withTranslation()(PageHeader);