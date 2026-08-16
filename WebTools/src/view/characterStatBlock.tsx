import { useTranslation } from 'react-i18next';
import { Header } from '../components/header';
import { StatView } from '../components/StatView';
import { makeKey } from '../common/translationKey';
import { Attribute } from '../helpers/attributes';
import { Department } from '../helpers/department';
import type { ICharacterPageProperties } from '../common/iCharacterPageProperties';
import { DisciplinesOrDepartments } from './disciplinesOrDepartments';

const CharacterStatBlock: React.FC<ICharacterPageProperties> = ({
  character,
}) => {
  const { t } = useTranslation();

  if (character.version === 1) {
    return (
      <>
        <Header level={2}>{t('Construct.other.attributes')}</Header>

        <div className="row row-cols-1 row-cols-md-3 mt-3">
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Control]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Control]
                : undefined
            }
            className="col mb-2"
          />
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Fitness]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Fitness]
                : undefined
            }
            className="col mb-2"
          />
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Presence]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Presence]
                : undefined
            }
            className="col mb-2"
          />
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Daring]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Daring]
                : undefined
            }
            className="col mb-2"
          />
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Insight]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Insight]
                : undefined
            }
            className="col mb-2"
          />
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Reason]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Reason]
                : undefined
            }
            className="col mb-2"
          />
        </div>

        <Header level={2} className="mt-4">
          <DisciplinesOrDepartments character={character} />
        </Header>
        <div className="row row-cols-1 row-cols-md-3 mt-3">
          <StatView
            name={t(
              makeKey('Construct.discipline.', Department[Department.Command]),
            )}
            value={
              character.departments
                ? character.departments[Department.Command]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
          <StatView
            name={t(
              makeKey('Construct.discipline.', Department[Department.Security]),
            )}
            value={
              character.departments
                ? character.departments[Department.Security]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
          <StatView
            name={t(
              makeKey('Construct.discipline.', Department[Department.Science]),
            )}
            value={
              character.departments
                ? character.departments[Department.Science]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
          <StatView
            name={t(
              makeKey('Construct.discipline.', Department[Department.Conn]),
            )}
            value={
              character.departments
                ? character.departments[Department.Conn]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
          <StatView
            name={t(
              makeKey(
                'Construct.discipline.',
                Department[Department.Engineering],
              ),
            )}
            value={
              character.departments
                ? character.departments[Department.Engineering]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
          <StatView
            name={t(
              makeKey('Construct.discipline.', Department[Department.Medicine]),
            )}
            value={
              character.departments
                ? character.departments[Department.Medicine]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header level={2}>{t('Construct.other.attributes')}</Header>

        <div className="row row-cols-1 row-cols-md-3 mt-3">
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Control]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Control]
                : undefined
            }
            className="col mb-2"
          />
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Fitness]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Fitness]
                : undefined
            }
            className="col mb-2"
          />
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Presence]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Presence]
                : undefined
            }
            className="col mb-2"
          />
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Daring]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Daring]
                : undefined
            }
            className="col mb-2"
          />
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Insight]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Insight]
                : undefined
            }
            className="col mb-2"
          />
          <StatView
            name={t(
              makeKey('Construct.attribute.', Attribute[Attribute.Reason]),
            )}
            value={
              character.attributes
                ? character.attributes[Attribute.Reason]
                : undefined
            }
            className="col mb-2"
          />
        </div>

        <Header level={2} className="mt-4">
          <DisciplinesOrDepartments character={character} />
        </Header>
        <div className="row row-cols-1 row-cols-md-3 mt-3">
          <StatView
            name={t(
              makeKey('Construct.discipline.', Department[Department.Command]),
            )}
            value={
              character.departments
                ? character.departments[Department.Command]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
          <StatView
            name={t(
              makeKey(
                'Construct.discipline.',
                Department[Department.Engineering],
              ),
            )}
            value={
              character.departments
                ? character.departments[Department.Engineering]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
          <StatView
            name={t(
              makeKey('Construct.discipline.', Department[Department.Medicine]),
            )}
            value={
              character.departments
                ? character.departments[Department.Medicine]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
          <StatView
            name={t(
              makeKey('Construct.discipline.', Department[Department.Conn]),
            )}
            value={
              character.departments
                ? character.departments[Department.Conn]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
          <StatView
            name={t(
              makeKey('Construct.discipline.', Department[Department.Security]),
            )}
            value={
              character.departments
                ? character.departments[Department.Security]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
          <StatView
            name={t(
              makeKey('Construct.discipline.', Department[Department.Science]),
            )}
            value={
              character.departments
                ? character.departments[Department.Science]
                : undefined
            }
            className="col mb-2"
            showZero={true}
          />
        </div>
      </>
    );
  }
};

export default CharacterStatBlock;
