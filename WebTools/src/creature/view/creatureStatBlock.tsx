import { useTranslation } from 'react-i18next';
import { Header } from '../../components/header';
import { StatView } from '../../components/StatView';
import { makeKey } from '../../common/translationKey';
import { Attribute } from '../../helpers/attributes';
import { Department } from '../../helpers/department';
import { Creature } from '../model/creature';

interface ICreatureStatBlockProperties {
  creature: Creature;
}

const CreatureStatBlock: React.FC<ICreatureStatBlockProperties> = ({
  creature,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Header level={2}>{t('Construct.other.attributes')}</Header>

      <div className="row row-cols-1 row-cols-md-3 mt-3">
        <StatView
          name={t(
            makeKey('Construct.attribute.', Attribute[Attribute.Control]),
          )}
          value={
            creature.attributes
              ? creature.attributes[Attribute.Control]
              : undefined
          }
          className="col mb-2"
        />
        <StatView
          name={t(
            makeKey('Construct.attribute.', Attribute[Attribute.Fitness]),
          )}
          value={
            creature.attributes
              ? creature.attributes[Attribute.Fitness]
              : undefined
          }
          className="col mb-2"
        />
        <StatView
          name={t(
            makeKey('Construct.attribute.', Attribute[Attribute.Presence]),
          )}
          value={
            creature.attributes
              ? creature.attributes[Attribute.Presence]
              : undefined
          }
          className="col mb-2"
        />
        <StatView
          name={t(makeKey('Construct.attribute.', Attribute[Attribute.Daring]))}
          value={
            creature.attributes
              ? creature.attributes[Attribute.Daring]
              : undefined
          }
          className="col mb-2"
        />
        <StatView
          name={t(
            makeKey('Construct.attribute.', Attribute[Attribute.Insight]),
          )}
          value={
            creature.attributes
              ? creature.attributes[Attribute.Insight]
              : undefined
          }
          className="col mb-2"
        />
        <StatView
          name={t(makeKey('Construct.attribute.', Attribute[Attribute.Reason]))}
          value={
            creature.attributes
              ? creature.attributes[Attribute.Reason]
              : undefined
          }
          className="col mb-2"
        />
      </div>

      <Header level={2} className="mt-4">
        {t('Construct.other.departments')}
      </Header>
      <div className="row row-cols-1 row-cols-md-3 mt-3">
        <StatView
          name={t(
            makeKey('Construct.discipline.', Department[Department.Command]),
          )}
          value={
            creature.departments
              ? creature.departments[Department.Command]
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
            creature.departments
              ? creature.departments[Department.Engineering]
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
            creature.departments
              ? creature.departments[Department.Medicine]
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
            creature.departments
              ? creature.departments[Department.Conn]
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
            creature.departments
              ? creature.departments[Department.Security]
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
            creature.departments
              ? creature.departments[Department.Science]
              : undefined
          }
          className="col mb-2"
          showZero={true}
        />
      </div>
    </>
  );
};

export default CreatureStatBlock;
