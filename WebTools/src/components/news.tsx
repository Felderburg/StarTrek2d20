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
            <b>v1.250302</b>
            <ul>
                <li>
                    A few more minor changes.
                </li>
            </ul>
            <b>v1.250228</b>
            <ul>
                <li>
                    Additional internal code improvements.
                </li>
                <li>
                    Bug fixes.
                </li>
            </ul>
            <b>v1.250218</b>
            <ul>
                <li>
                    Minor fixes to the Foundry export option.
                </li>
                <li>
                    Minor tokem adjustments.
                </li>
                <li>
                    A few bug fixes.
                </li>
            </ul>
            <b>v1.250209</b>
            <ul>
                <li>
                    A few bug fixes and internal changes.
                </li>
            </ul>
            <b>v1.250202</b>
            <ul>
                <li>
                    A few more tweaks to the Foundry VTT exporter.
                </li>
            </ul>
            <b>v1.250127</b>
            <ul>
                <li>
                    A minor fix for VTT exports.
                </li>
            </ul>
            <b>v1.250126</b>
            <ul>
                <li>
                    A number of new token assets.
                </li>
            </ul>
            <b>v1.250122</b>
            <ul>
                <li>
                    Downgraded a PDF library after some folks reported issues with filled-out
                    character sheets.
                </li>
            </ul>
            <b>v1.250121</b>
            <ul>
                <li>
                    A few more fixes and token stuff.
                </li>
            </ul>
            <b>v1.250120</b>
            <ul>
                <li>
                    A handful of bug fixes.
                </li>
                <li>
                    Some new token assets. (I just snagged a bunch
                    of <a href="https://www.patreon.com/posts/new-art-assets-120027524"  target="_blank" rel="noreferrer">new
                    items from my artist</a>, and you should see new options show up over the couple of weeks).
                </li>
            </ul>
            <b>v1.250102</b>
            <ul>
                <li>
                    New character sheet.
                </li>
            </ul>
            <b>v1.250101</b>
            <ul>
                <li>
                    Update the copyright year.
                </li>
                <li>
                    More bug fixes.
                </li>
                <li>
                    Initial version of random tables now available.
                </li>
            </ul>
            <b>v1.241227</b>
            <ul>
                <li>
                    Yet more bug fixes.
                </li>
                <li>
                    Minor Token tweaks.
                </li>
            </ul>
            <b>v1.241220</b>
            <ul>
                <li>
                    Some additional bug fixes.
                </li>
                <li>
                    An additional token uniform.
                </li>
            </ul>
            <b>v1.241207</b>
            <ul>
                <li>
                    Add civilian starship options (for 2nd edition).
                </li>
            </ul>
            <b>v1.241201</b>
            <ul>
                <li>
                    Some attention to some esoteric species.
                </li>
            </ul>
            <b>v1.241124</b>
            <ul>
                <li>
                    Very minor tweaks and bug fixes.
                </li>
            </ul>
            <b>v1.241122</b>
            <ul>
                <li>
                    Minor text changes.
                </li>
            </ul>
            <b>v1.241116</b>
            <ul>
                <li>
                    A few tweaks to tokens, and some typo fixes.
                </li>
            </ul>
            <b>v1.241115</b>
            <ul>
                <li>
                    More bug fixes. It's never-ending!
                </li>
            </ul>
            <b>v1.241111</b>
            <ul>
                <li>
                    Minor improvements and bug fixes, again.
                </li>
            </ul>
            <b>v1.241107</b>
            <ul>
                <li>
                    Minor bug fixes and clean-up.
                </li>
            </ul>
            <b>v1.241103</b>
            <ul>
                <li>
                    Minor starship updates.
                </li>
                <li>
                    Some additional support for the <cite>Federation-Klingon War</cite> book.
                </li>
            </ul>
            <b>v1.241027</b>
            <ul>
                <li>
                    A few minor improvements involving random starships.
                </li>
            </ul>
            <b>v1.241021</b>
            <ul>
                <li>
                    Quick bug fixes.
                </li>
            </ul>
            <b>v1.241019</b>
            <ul>
                <li>
                    Some bug fixes and starship sheet updates.
                </li>
            </ul>
            <b>v1.241017</b>
            <ul>
                <li>
                    Minor bug fix.
                </li>
            </ul>
            <b>v1.241013</b>
            <ul>
                <li>
                    Additional minor improvements.
                </li>
            </ul>

            <div className="text-center">
                <Button size="sm" onClick={ () => onClose() }>{t('Common.button.ok')}</Button>
            </div>
        </Modal>
    );
}

export default News;