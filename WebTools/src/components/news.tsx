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
            <b>v1.260516</b>
            <ul>
                <li>
                    Minor improvements to tokens.
                </li>
            </ul>
            <b>v1.260515</b>
            <ul>
                <li>
                    A handful of minor updates and bug fixes.
                </li>
                <li>
                    Added a 32nd-century uniform, with important commbadge contributions
                    from Felderburg.
                </li>
            </ul>
            <b>v1.260508</b>
            <ul>
                <li>
                    Support for the 2nd edition updates for the <cite>Gamma Quadrant</cite> and
                    <cite>Delta Quadrant</cite> sourcebooks.
                </li>
            </ul>
            <b>v1.260507</b>
            <ul>
                <li>
                    Tweaks to the Talent list.
                </li>
                <li>
                    More work on spaceframe appearances and other bug fixes.
                </li>
            </ul>
            <b>v1.260502</b>
            <ul>
                <li>
                    At Modiphius/Paramount's request, I've removed key text that
                    originated in the <cite>Species Sourcebook</cite>.
                </li>
                <li>
                    Other minor improvements.
                </li>
            </ul>
            <b>v1.260429</b>
            <ul>
                <li>
                    Small bug fixes.
                </li>
            </ul>
            <b>v1.260425</b>
            <ul>
                <li>
                    A few straggling updates from the <cite>Species Sourcebook</cite>.
                </li>
                <li>
                    Other minor updates.
                </li>
            </ul>
            <b>v1.260423</b>
            <ul>
                <li>
                    Support for most of the new material for the <cite>Species Sourcebook</cite>.
                    There are certain features &mdash; like additional rules around custom
                    species &mdash; that haven't yet been implemented. They'll come soon enough.
                </li>
                <li>
                    There may be certain rules that still need to be implemented (such as species
                    abilities that change things like Protection). I'll work on cleaning that up, soon.
                </li>
            </ul>
            <b>v1.260412</b>
            <ul>
                <li>
                    More minor improvements and fixes.
                </li>
            </ul>
            <b>v1.260411</b>
            <ul>
                <li>
                    Minor improvements and fixes.
                </li>
            </ul>
            <b>v1.260410</b>
            <ul>
                <li>
                    Tweaks to the handling of custom spaceframes.
                </li>
            </ul>
            <b>v1.260331</b>
            <ul>
                <li>
                    Additional minor improvements.
                </li>
            </ul>
            <b>v1.260327</b>
            <ul>
                <li>
                    Minor improvements. Prep for the new <cite>Species</cite> book.
                </li>
            </ul>
            <b>v1.260320</b>
            <ul>
                <li>
                    Additional bug fixes.
                </li>
            </ul>
            <b>v1.260315</b>
            <ul>
                <li>
                    Additional enhancements to station creation.
                </li>
            </ul>
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

            <div className="text-center">
                <Button size="sm" onClick={ () => onClose() }>{t('Common.button.ok')}</Button>
            </div>
        </Modal>
    );
}

export default News;