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
            <b>v1.250713</b>
            <ul>
                <li>
                    Implemented process for starship advancement (for version 2 starships).
                </li>
                <li>
                    Minor bug fixes.
                </li>
                <li>
                    Very preliminary prep for the new <cite>Exploration Guide</cite>.
                </li>
            </ul>
            <b>v1.250701</b>
            <ul>
                <li>
                    Quick bug fix.
                </li>
            </ul>
            <b>v1.250628</b>
            <ul>
                <li>
                    A few additional tweaks to the Starship creation process, particularly around
                    talent handling.
                </li>
                <li>
                    A few tweaks to the NPC generation, and (particularly) handling of Personal Threat.
                </li>
            </ul>
            <b>v1.250622</b>
            <ul>
                <li>
                    Opening up support for the Technical Manual. There's one service record that's
                    not currently available (because the implementation is complicated), but it
                    should come shortly.
                </li>
            </ul>
            <b>v1.250621</b>
            <ul>
                <li>
                    A few minor tweaks to the NPC support.
                </li>
                <li>
                    Some minor revisions to starship creation.
                </li>
                <li>
                    More work on support for the <cite>Technical Manual</cite>.
                </li>
            </ul>
            <b>v1.250608</b>
            <ul>
                <li>
                    The latest update implements a feature voted on over at my Patreon:
                    support for NPC creation.
                </li>
            </ul>
            <b>v1.250518</b>
            <ul>
                <li>
                    More prep for the <cite>Technical Manual</cite>.
                </li>
                <li>
                    Some additional minor token work.
                </li>
            </ul>
            <b>v1.250511</b>
            <ul>
                <li>
                    Minor fixes and improvements.
                </li>
            </ul>
            <b>v1.250509</b>
            <ul>
                <li>
                    A few bug fixes.
                </li>
                <li>
                    Some minor additional token options.
                </li>
            </ul>
            <b>v1.250423</b>
            <ul>
                <li>
                    I've recently been tweaking the handling of some talents: increasingly,
                    talents are requiring selections of things, and I've decided to revise
                    the way I handle that. Some of the types of talents that this affects
                    includes old stand-bys like Bold and Cautious. Sadly my revision probably
                    impacts some of the translations to other languages.
                </li>
                <li>
                    Other bug fixes.
                </li>
            </ul>
            <b>v1.250417</b>
            <ul>
                <li>
                    More tweaks.
                </li>
                <li>
                    Minor adjustments to some token options.
                </li>
                <li>
                    Fix a bug with starship talents.
                </li>
            </ul>
            <b>v1.250415</b>
            <ul>
                <li>
                    Additional minor revisions.
                </li>
            </ul>
            <b>v1.250410</b>
            <ul>
                <li>
                    Some fixes for Foundry exports.
                </li>
                <li>
                    Minor changes to the handling of some talents.
                </li>
            </ul>
            <b>v1.250406</b>
            <ul>
                <li>
                    I've made some adjustments to the handling of some Talents.
                </li>
                <li>
                    I've updated the PDF export for the safety checklist.
                </li>
            </ul>
            <b>v1.250405</b>
            <ul>
                <li>
                    Minor tweaks to the tokens.
                </li>
            </ul>
            <b>v1.250404</b>
            <ul>
                <li>
                    A few tweaks to the modification flow.
                </li>
                <li>
                    A few more spaceframe outlines.
                </li>
            </ul>
            <b>v1.250330</b>
            <ul>
                <li>
                    A few more tweaks to character advancement.
                </li>
                <li>
                    PDF export for creatures.
                </li>
            </ul>
            <b>v1.250329</b>
            <ul>
                <li>
                    Minor tweaks to Ferengi tokens
                </li>
                <li>
                    Preliminary support for character advancement (for 2nd edition characters).
                </li>
            </ul>
            <b>v1.250324</b>
            <ul>
                <li>
                    Some bug fixes on weapon qualities.
                </li>
                <li>
                    Creatures.
                </li>
            </ul>
            <b>v1.250316</b>
            <ul>
                <li>
                    Still tweaking the NPC generator.
                </li>
                <li>
                    A few minor bug fixes.
                </li>
            </ul>
            <b>v1.250315</b>
            <ul>
                <li>
                    Some additional tweaks to the NPC generator.
                </li>
                <li>
                    Additional spaceframe outlines.
                </li>
            </ul>
            <b>v1.250311</b>
            <ul>
                <li>
                    And more tweaks, including adding a couple of spaceframe outlines that
                    I'd not previously supported before.
                </li>
            </ul>
            <b>v1.250310</b>
            <ul>
                <li>
                    More tweaks.
                </li>
            </ul>
            <b>v1.250309</b>
            <ul>
                <li>
                    A few new tweaks.
                </li>
            </ul>

            <div className="text-center">
                <Button size="sm" onClick={ () => onClose() }>{t('Common.button.ok')}</Button>
            </div>
        </Modal>
    );
}

export default News;