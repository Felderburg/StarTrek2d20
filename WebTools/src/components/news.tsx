import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from './modal';
import { useTranslation } from 'react-i18next';

interface INewsProperties {
    showModal: boolean;
    onClose: () => void;
}

const News: React.FC<INewsProperties> = ({showModal, onClose}) => {

    const { t } = useTranslation();

    return (
        <Modal size="lg" show={showModal} onClose={() => onClose()} header="What's New?">
            <b>v1.260217</b>
            <ul>
                <li>
                    Some initial work supporting the <cite>23rd Centry Campaign Guide</cite>.
                </li>
                <li>
                    Some bug fixes.
                </li>
            </ul>
            <b>v1.260201</b>
            <ul>
                <li>
                    New Russian translations, thanks to Hanzo.
                </li>
            </ul>
            <b>v1.260103</b>
            <ul>
                <li>
                    More bug fixes.
                </li>
            </ul>
            <b>v1.251122</b>
            <ul>
                <li>
                    More bug fixes.
                </li>
            </ul>
            <b>v1.251116</b>
            <ul>
                <li>
                    More tweaks and bug fixes.
                </li>
            </ul>
            <b>v1.251115</b>
            <ul>
                <li>
                    Some underlying technology upgrades.
                </li>
                <li>
                    A few bug fixes.
                </li>
            </ul>
            <b>v1.251019</b>
            <ul>
                <li>
                    Additional work on log entries.
                </li>
                <li>
                    Bug fix on the Warrior's Spirit talent.
                </li>
            </ul>
            <b>v1.251005</b>
            <ul>
                <li>
                    Now that the <cite>Exploration Guide</cite> is fully launched, I've
                    made that source selectable. Many (but not yet all) of the new rules
                    are now available. Some outstanding work remains on things like secret
                    values / focuses / etc. and some of the planetary rules such as biomes.
                </li>
                <li>
                    Some initial work is ready for support of Log Entries. There's still
                    more to do with respect to tying advancement with log entries; that
                    part is still in progress.
                </li>
            </ul>
            <b>v1.250919</b>
            <ul>
                <li>
                    Minor content revisions.
                </li>
            </ul>
            <b>v1.250917</b>
            <ul>
                <li>
                    Some quick fixes.
                </li>
            </ul>
            <b>v1.250906</b>
            <ul>
                <li>
                    Some costmetic and internal updates. Importantly, the option for
                    choosing <cite>Captain's Log</cite> characters is selected in the
                    "editions" drop down on the sources page.
                </li>
            </ul>
            <b>v1.250904</b>
            <ul>
                <li>
                    More bug fixes.
                </li>
            </ul>
            <b>v1.250830</b>
            <ul>
                <li>
                    A few bug fixes and other cosmetic improvements.
                </li>
            </ul>
            <b>v1.250823</b>
            <ul>
                <li>
                    Minor revisions to some starship sheets.
                </li>
            </ul>
            <b>v1.250822</b>
            <ul>
                <li>
                    Finish up some partially-implemented features.
                </li>
            </ul>
            <b>v1.250821</b>
            <ul>
                <li>
                    A few bug fixes.
                </li>
                <li>
                    Support for the 2nd edition update to the <cite>Science Division</cite> Sourcebook.
                </li>
            </ul>
            <b>v1.250815</b>
            <ul>
                <li>
                    Minor improvements.
                </li>
                <li>
                    Custom talent support (at the moment, for NPCs and starships).
                </li>
            </ul>
            <b>v1.250809</b>
            <ul>
                <li>
                    Minor bug fixes.
                </li>
            </ul>
            <b>v1.250719</b>
            <ul>
                <li>
                    Correct version misnumbering.
                </li>
            </ul>
            <b>v1.250719</b>
            <ul>
                <li>
                    More bug fixes.
                </li>
                <li>
                    Initial version of tracker.
                </li>
            </ul>
            <b>v1.250718</b>
            <ul>
                <li>
                    Minor bug fixes.
                </li>
            </ul>

            <div className="text-center">
                <Button size="sm" onClick={ () => onClose() }>{t('Common.button.ok')}</Button>
            </div>
        </Modal>
    );
}

export default News;