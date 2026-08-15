import React, { useState } from 'react';
import { Source, SourcesHelper } from '../helpers/sources';
import { Character } from '../common/character';
import { Navigation, navigateTo } from '../common/navigator';
import { PageIdentity } from './pageIdentity';
import store from '../state/store';
import { addSource, removeSource, setSources } from '../state/contextActions';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageFactory } from './pageFactory';
import { LoadingButton } from '../common/loadingButton';
import { setCharacter } from '../state/characterActions';
import { Header } from '../components/header';
import Markdown from 'react-markdown';
import { DropDownElement, DropDownSelect } from '../components/dropDownInput';
import { isSecondEdition } from '../state/contextFunctions';

interface ISourceSelectionPageProperties {
  sources: Source[];
}

const SourceSelectionPage: React.FC<ISourceSelectionPageProperties> = ({
  sources,
}) => {
  let initialValue = sources.includes(Source.Core) ? 1 : 2;
  if (window.localStorage.getItem('rules.captainsLog') === 'true') {
    initialValue = 3;
  }

  const [rulesType, setRulesType] = useState<number>(initialValue);
  const [soloLoading, setSoloLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const setEdition = (edition: number) => {
    if (edition === 3) {
      setRulesType(3);
      window.localStorage.setItem('rules.captainsLog', 'true');
      store.dispatch(addSource(Source.CaptainsLog));
    } else if (edition === 1) {
      setRulesType(1);
      window.localStorage.setItem('rules.captainsLog', 'false');
      store.dispatch(addSource(Source.Core));
      store.dispatch(removeSource(Source.CaptainsLog));
    } else {
      setRulesType(2);
      window.localStorage.setItem('rules.captainsLog', 'false');
      store.dispatch(addSource(Source.Core2ndEdition));
      store.dispatch(removeSource(Source.CaptainsLog));
    }
  };

  const renderEdition = () => {
    return (
      <div className="my-3">
        <Markdown>{t('SourceSelectionPage.editionInstruction')}</Markdown>
        <DropDownSelect
          items={[
            new DropDownElement(1, t('Common.edition.1')),
            new DropDownElement(2, t('Common.edition.2')),
            new DropDownElement(3, t('Source.book.captainsLog')),
          ]}
          defaultValue={rulesType}
          onChange={(v) => setEdition(v as number)}
        />
      </div>
    );
  };

  const renderSources = () => {
    let hasUnavailableSources = false;

    const sources = SourcesHelper.getTypes().map((t) => {
      const list = SourcesHelper.getSourcesByType(t.type)
        .filter(
          (s) =>
            ![Source.Core, Source.Core2ndEdition, Source.CaptainsLog].includes(
              s.id,
            ),
        )
        .map((s, i) => {
          hasUnavailableSources = hasUnavailableSources || !s.available;
          const className =
            s.available && (s.version === 1 || isSecondEdition())
              ? hasSource(s.id)
                ? 'source source-selected'
                : 'source'
              : 'source unavailable';
          return (
            <div
              key={s.id}
              className={className}
              onClick={() => {
                if (s.available) {
                  sourceChanged(s.id);
                }
              }}
              title={s.localizedName}
              role="button"
            >
              {s.localizedName}
            </div>
          );
        });
      return (
        <div key={'source-type-' + t.type}>
          <div
            className="text-white small text-center"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            role="button"
          >
            {t.localizedName}
          </div>
          {list}
        </div>
      );
    });

    const note = hasUnavailableSources ? (
      <p>{t('SourceSelectionPage.sourceNote')}</p>
    ) : undefined;

    return (
      <div className="mt-5">
        <p>{t('SourceSelectionPage.sourceInstruction')}</p>
        {note}
        <div className="d-flex flex-wrap">
          <div
            className="source source-emphasis"
            onClick={() => {
              toggleSources(true);
            }}
            role="button"
          >
            {t('Common.button.selectAll')}
          </div>
          <div
            className="source source-emphasis"
            onClick={() => {
              toggleSources(false);
            }}
            role="button"
          >
            {t('Common.button.selectNone')}
          </div>
        </div>
        <div className="d-flex flex-wrap mt-3 mb-3">{sources}</div>
      </div>
    );
  };

  const next = () => {
    if (rulesType !== 3) {
      Navigation.navigateToPage(PageIdentity.Era);
    } else {
      setSoloLoading(true);
      store.dispatch(
        setCharacter(
          Character.createSoloCharacter(store.getState().context.era),
        ),
      );
      PageFactory.instance.loadCaptainsLogFactory(() => {
        setSoloLoading(false);
        Navigation.navigateToPage(PageIdentity.SoloConstructType);
      });
    }
  };

  const sourceChanged = (source: Source) => {
    if (source === Source.Core && sources.indexOf(Source.Core2ndEdition) < 0) {
      // do nothing
    } else if (hasSource(source)) {
      store.dispatch(removeSource(source));
    } else {
      store.dispatch(addSource(source));
    }
  };

  const toggleSources = (selectAll: boolean) => {
    if (selectAll) {
      let version = isSecondEdition() ? 2 : 1;
      let sources = SourcesHelper.getSources()
        .filter((s) => s.available && (s.version === 1 || version === 2))
        .filter((s) => {
          if (s.id === Source.Core) {
            return version === 1;
          } else if (s.id === Source.Core2ndEdition) {
            return version === 2;
          } else {
            return true;
          }
        })
        .map((s) => s.id);
      store.dispatch(setSources(sources));
    } else {
      if (sources.indexOf(Source.Core2ndEdition) >= 0) {
        store.dispatch(setSources([Source.Core2ndEdition]));
      } else {
        store.dispatch(setSources([Source.Core]));
      }
    }
  };

  const hasSource = (source: Source) => {
    return sources.indexOf(source) > -1;
  };

  return (
    <div className="page container ms-0">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a
              href="/index.html"
              onClick={(e) => navigateTo(e, PageIdentity.Home)}
            >
              {t('Page.title.home')}
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t('Page.title.sourceSelection')}
          </li>
        </ol>
      </nav>
      <main>
        <Header className="mb-4">{t('Page.title.sourceSelection')}</Header>
        {renderEdition()}
        {renderSources()}
        <div className="text-end mt-5">
          <LoadingButton
            loading={soloLoading}
            size="sm"
            onClick={() => {
              next();
            }}
          >
            {t('Common.button.next')}
          </LoadingButton>
        </div>
      </main>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    sources: state.context.sources,
  };
}

export default connect(mapStateToProps)(SourceSelectionPage);
