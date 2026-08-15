import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ICharacterProperties,
  characterMapStateToProperties,
} from '../solo/page/soloCharacterProperties';
import { Environment, EnvironmentsHelper } from '../helpers/environments';
import { setCharacterEnvironment } from '../state/characterActions';
import store from '../state/store';
import { Navigation } from '../common/navigator';
import { PageIdentity } from './pageIdentity';
import { Stereotype } from '../common/construct';
import { makeKey } from '../common/translationKey';
import { Attribute } from '../helpers/attributes';
import { Window } from '../common/window';
import Button from 'react-bootstrap/Button';
import CharacterCreationBreadcrumbs from '../components/characterCreationBreadcrumbs';
import SoloCharacterBreadcrumbs from '../solo/component/soloCharacterBreadcrumbs';
import { Header } from '../components/header';
import InstructionText from '../components/instructionText';
import { connect } from 'react-redux';
import { Department } from '../helpers/department';
import { DisciplinesOrDepartments } from '../view/disciplinesOrDepartments';

const EnvironmentPage: React.FC<ICharacterProperties> = ({ character }) => {
  const { t } = useTranslation();
  const [randomEnvironment, setRandomEnvironment] = useState(
    character?.environmentStep &&
      EnvironmentsHelper.isSetting(character?.environmentStep?.environment)
      ? character?.environmentStep?.environment
      : null,
  );

  const selectEnvironment = (environment: Environment) => {
    if (environment === Environment.AnotherSpeciesWorld) {
      store.dispatch(
        setCharacterEnvironment(
          environment,
          character.environmentStep?.otherSpecies,
        ),
      );
    } else {
      store.dispatch(setCharacterEnvironment(environment));
    }

    if (character.stereotype === Stereotype.SoloCharacter) {
      Navigation.navigateToPage(PageIdentity.EnvironmentDetails);
    } else {
      Navigation.navigateToPage(PageIdentity.EnvironmentDetails);
    }
  };

  const toTableRow = (e, i) => {
    let attributes = e.getAttributesForCharacter(character).map((a, i) => {
      return (
        <div key={'attr-' + i}>
          {t(makeKey('Construct.attribute.', Attribute[a]))}
        </div>
      );
    });

    if (e.id === Environment.AnotherSpeciesWorld) {
      attributes = (
        <div key={'attr-' + i}>
          {t('SoloEnvironmentPage.anotherSpeciesWorld.attributeText')}
        </div>
      );
    }

    const disciplines = e.disciplines.map((d, i) => {
      return (
        <div key={'skill-' + i}>
          {t(makeKey('Construct.discipline.', Department[d]))}
        </div>
      );
    });

    return (
      <tr
        key={i}
        onClick={() => {
          if (Window.isCompact()) selectEnvironment(e.id);
        }}
      >
        <td className="selection-header">{e.localizedName}</td>
        <td>{attributes}</td>
        <td>{disciplines}</td>
        <td className="text-end">
          <Button
            size="sm"
            onClick={() => {
              selectEnvironment(e.id);
            }}
          >
            {t('Common.button.select')}
          </Button>
        </td>
      </tr>
    );
  };

  const chooseRandomEnvironment = () => {
    const environments = EnvironmentsHelper.getEnvironmentOptions(character);

    return environments[Math.floor(Math.random() * environments.length)].id;
  };

  const renderTable = () => {
    let environments = EnvironmentsHelper.getEnvironmentOptions(character);
    if (randomEnvironment != null) {
      environments = [
        EnvironmentsHelper.getEnvironment(randomEnvironment, character),
      ];
    }

    const settings = environments.filter((e) =>
      EnvironmentsHelper.isSetting(e.id),
    );
    const conditions = environments.filter((e) =>
      EnvironmentsHelper.isCondition(e.id),
    );
    const homeworlds = environments.filter((e) =>
      EnvironmentsHelper.isHomeworld(e.id),
    );

    return (
      <>
        <div className="my-4">
          <Button
            size="sm"
            className="me-3"
            onClick={() => setRandomEnvironment(chooseRandomEnvironment())}
          >
            <img
              src="/static/img/d20.svg"
              style={{ height: '24px', aspectRatio: '1' }}
              className="me-1"
              alt={t('Common.button.random')}
            />{' '}
            {t('Common.button.random')}
          </Button>
          {randomEnvironment != null ? (
            <Button
              className="btn btn-primary btn-sm me-3"
              onClick={() => setRandomEnvironment(null)}
            >
              {t('Common.button.showAll')}
            </Button>
          ) : undefined}
        </div>

        <table className="selection-list">
          <thead>
            <tr>
              <th>
                <p>
                  {randomEnvironment != null &&
                  !EnvironmentsHelper.isSetting(randomEnvironment)
                    ? undefined
                    : t('SoloEnvironmentPage.settings')}
                </p>
              </th>
              <th>
                <b>{t('Construct.other.attributes')}</b>
              </th>
              <th>
                <b>
                  <DisciplinesOrDepartments character={character} />
                </b>
              </th>
              <th></th>
            </tr>
          </thead>
          {settings?.length ? (
            <tbody>{settings.map((e, i) => toTableRow(e, i))}</tbody>
          ) : undefined}
          {homeworlds?.length ? (
            <tbody>
              <tr>
                <th colSpan={4} className="pt-4">
                  <p>{t('SoloEnvironmentPage.worlds')}</p>
                </th>
              </tr>
              {homeworlds.map((e, i) => toTableRow(e, i))}
            </tbody>
          ) : undefined}
          {conditions?.length ? (
            <tbody>
              <tr>
                <th colSpan={4} className="pt-4">
                  <p>{t('SoloEnvironmentPage.conditions')}</p>
                </th>
              </tr>
              {conditions.map((e, i) => toTableRow(e, i))}
            </tbody>
          ) : undefined}
        </table>
      </>
    );
  };

  return (
    <div className="page container ms-0">
      {character.stereotype === Stereotype.SoloCharacter ? (
        <SoloCharacterBreadcrumbs pageIdentity={PageIdentity.Environment} />
      ) : (
        <CharacterCreationBreadcrumbs pageIdentity={PageIdentity.Environment} />
      )}
      ;
      <main>
        <Header>{t('Page.title.environment')}</Header>

        <InstructionText text={t('SoloEnvironmentPage.instruction')} />

        {renderTable()}
      </main>
    </div>
  );
};

export default connect(characterMapStateToProperties)(EnvironmentPage);
