import React from 'react';
import {
  AlliedMilitaryDetails,
  Character,
  GovernmentDetails,
} from '../common/character';
import { CharacterType, CharacterTypeModel } from '../common/characterType';
import { Navigation } from '../common/navigator';
import { PageIdentity } from './pageIdentity';
import Button from 'react-bootstrap/Button';
import { AllyHelper, AlliedMilitaryType } from '../helpers/alliedMilitary';
import { Source } from '../helpers/sources';
import { Governments, Polity } from '../helpers/governments';
import { CharacterCreationBreadcrumbs } from '../components/characterCreationBreadcrumbs';
import { store } from '../state/store';
import { hasSource } from '../state/contextFunctions';
import { Header } from '../components/header';
import type { WithTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import { setCharacter } from '../state/characterActions';
import { DropDownElement, DropDownSelect } from '../components/dropDownInput';
import type { Era } from '../helpers/erasEnum';
import { connect } from 'react-redux';
import { PageHistoryBasedPreviousButton } from '../components/pageHistoryBasedPreviousButton';

interface ICharacterTypeProperties extends WithTranslation {
  era: Era;
}

interface ICharacterTypePageState {
  type: CharacterType;
  alliedMilitary?: AlliedMilitaryType;
  polity?: Polity;
  otherName: string;
}

class CharacterTypePageBase extends React.Component<
  ICharacterTypeProperties,
  ICharacterTypePageState
> {
  constructor(props) {
    super(props);
    this.state = {
      type: CharacterType.Starfleet,
      otherName: '',
    };
  }

  renderAlliedMilitaryList() {
    const { t } = this.props;
    if (this.state.type === CharacterType.AlliedMilitary) {
      const types = AllyHelper.instance
        .selectOptions(
          store.getState().context.era,
          !hasSource(Source.KlingonCore),
        )
        .map((t) => {
          return (
            <option value={t.type} key={'type-' + t.type}>
              {t.localizedName}
            </option>
          );
        });

      const other =
        this.state.alliedMilitary === AlliedMilitaryType.Other ? (
          <>
            <p className="mt-4">{t('CharacterTypePage.otherMilitaryName')}</p>
            <input
              value={this.state.otherName}
              onChange={(e) => {
                const value = e.target.value;
                this.setState((state) => ({ ...state, otherName: value }));
              }}
            />
          </>
        ) : null;

      return (
        <>
          <p className="mt-4">{t('CharacterTypePage.whatMilitary')}</p>
          <select
            onChange={(e) => this.selectAlliedMilitaryType(e.target.value)}
            value={this.state.alliedMilitary}
          >
            <option>{t('Common.select.choose')}</option>
            {types}
          </select>
          {other}
        </>
      );
    } else {
      return null;
    }
  }

  renderGovernmentsList() {
    const { t } = this.props;
    if (this.state.type === CharacterType.AmbassadorDiplomat) {
      const polityValues = Governments.selectOptions(
        store.getState().context.era,
      ).map((t) => {
        return new DropDownElement(t.type, t.localizedName);
      });
      polityValues.unshift(new DropDownElement('', t('Common.select.choose')));

      const other =
        this.state.polity === Polity.Other ? (
          <>
            <p className="mt-4">{t('CharacterTypePage.otherGovernmentName')}</p>
            <input
              value={this.state.otherName}
              onChange={(e) => {
                const value = e.target.value;
                this.setState((state) => ({ ...state, otherName: value }));
              }}
            />
          </>
        ) : null;

      return (
        <>
          <p className="mt-4">{t('CharacterTypePage.whatGovernment')}</p>
          <DropDownSelect
            onChange={(val) =>
              this.selectPolity(val === '' ? undefined : (val as Polity))
            }
            defaultValue={this.state.polity}
            items={polityValues}
          />
          {other}
        </>
      );
    } else {
      return null;
    }
  }

  render() {
    const { t } = this.props;
    const alliedMilitary = this.renderAlliedMilitaryList();
    const governments = this.renderGovernmentsList();

    const types = CharacterTypeModel.getCharacterTypesForCharacter(
      store.getState().context.sources,
    ).map((t) => {
      return (
        <option value={t.type} key={'type-' + t.type}>
          {t.localizedName}
        </option>
      );
    });

    return (
      <div className="page container ms-0">
        <CharacterCreationBreadcrumbs
          pageIdentity={PageIdentity.CharacterType}
        />
        <Header level={1}>{t('Page.title.characterType')}</Header>
        <p>{t('CharacterTypePage.whatType')}</p>
        <select
          onChange={(e) => this.selectType(e.target.value)}
          value={this.state.type}
        >
          {types}
        </select>

        {alliedMilitary}
        {governments}

        <div className="mt-4 d-flex justify-content-end">
          <PageHistoryBasedPreviousButton />
          <Button onClick={() => this.startWorkflow()}>
            {t('Common.button.create')}
          </Button>
        </div>
      </div>
    );
  }

  private selectType(typeAsString: string) {
    const type = Number(typeAsString) as CharacterType;
    this.setState((state) => ({
      ...state,
      type: type,
    }));
  }

  private selectAlliedMilitaryType(typeAsString: string) {
    const type = Number(typeAsString) as AlliedMilitaryType;
    this.setState((state) => ({
      ...state,
      alliedMilitary: type,
    }));
  }

  private selectPolity(polity: Polity) {
    this.setState((state) => ({
      ...state,
      polity: polity,
    }));
  }

  private startWorkflow() {
    const { era } = this.props;
    const character = Character.createMainCharacter(
      this.state.type,
      era,
      hasSource(Source.Core2ndEdition) ? 2 : 1,
    );
    if (character.type === CharacterType.AlliedMilitary) {
      character.typeDetails = new AlliedMilitaryDetails(
        AllyHelper.instance.findOption(this.state.alliedMilitary),
        this.state.otherName,
      );
    } else if (character.type === CharacterType.AmbassadorDiplomat) {
      character.typeDetails = new GovernmentDetails(
        Governments.findOption(this.state.polity),
        this.state.otherName,
      );
    }
    store.dispatch(setCharacter(character));
    Navigation.navigateToPage(PageIdentity.Species);
  }
}

const mapStateToProperties = (state, ownProps) => {
  return {
    era: state.context?.era,
  };
};

export const CharacterTypePage = withTranslation()(
  connect(mapStateToProperties)(CharacterTypePageBase),
);
