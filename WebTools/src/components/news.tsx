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
            <b>v1.260312</b>
            <ul>
                <li>
                    Bug fixes.
                </li>
            </ul>
            <b>v1.260311</b>
            <ul>
                <li>
                    A few improvements/fixes to station creation.
                </li>
                <li>
                    I neglected to mention that I also threw in 2nd Edition support for the
                    <cite>Alpha</cite> and <cite>Beta Quadrant</cite> 2nd Edition updates.
                </li>
            </ul>
            <b>v1.260309</b>
            <ul>
                <li>
                    Station creation!
                </li>
                <li>
                    More bug fixes.
                </li>
            </ul>
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

            <div className="text-center">
                <Button size="sm" onClick={ () => onClose() }>{t('Common.button.ok')}</Button>
            </div>
        </Modal>
    );
}

export default News;