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
            <b>v1.241005</b>
            <ul>
                <li>
                    Various bug fixes and internal structure improvements.
                </li>
                <li>
                    Improvements to the handling of Supporting Characters. That lead to some structural changes to some
                    sheets -- especially the half-page sheet.
                </li>
                <li>
                    Tweaks to the Fantasy Grounds exporter. Someone mentioned wanting NPC exports handled as NPCs.
                </li>
            </ul>
            <b>v1.240929</b>
            <ul>
                <li>
                    A number of cosmetic changes and internal improvements.
                </li>
            </ul>
            <b>v1.240928</b>
            <ul>
                <li>
                    Tweaks and bug fixes.
                </li>
            </ul>
            <b>v1.240922</b>
            <ul>
                <li>
                    More bug fixes and tweaks.
                </li>
            </ul>
            <b>v1.240921</b>
            <ul>
                <li>
                    My awkward truth is that I just like tinkering with character sheets. So, I made a new one.
                </li>
            </ul>
            <b>v1.240920</b>
            <ul>
                <li>
                    More bug fixes.
                </li>
            </ul>
            <b>v1.240918</b>
            <ul>
                <li>
                    A handful of bug fixes.
                </li>
            </ul>
            <b>v1.240906</b>
            <ul>
                <li>
                    Additional support for 2nd edition starships.
                </li>
                <li>
                    Minor bug fixes.
                </li>
            </ul>
            <b>v1.240905</b>
            <ul>
                <li>
                    I think I have all the Starship support from the 2nd edition core rulebook (but have not
                    yet integrated the additional bits from the GM's tookit).
                </li>
                <li>
                    I've added some extra 2nd edition support for supporting characters.
                </li>
            </ul>
            <b>v1.240904</b>
            <ul>
                <li>More work on 2nd edition starship support.</li>
            </ul>
            <b>v1.240903</b>
            <ul>
                <li>Minor updates and bug fixes.</li>
            </ul>
            <b>v1.240902</b>
            <ul>
                <li>Preliminary support for 2nd-edition starships. There's still a bit of work to do on
                    weapons and mission profiles, and I don't yet support Service Records.
                </li>
            </ul>
            <b>v1.240831</b>
            <ul>
                <li>Support for the new character sheet. I've had to make some tweaks to the original
                    character sheet, both to support internationalization and to deal with some features
                    (like rich text) that my PDF library does not support.
                </li>
            </ul>

            <div className="text-center">
                <Button size="sm" onClick={ () => onClose() }>{t('Common.button.ok')}</Button>
            </div>
        </Modal>
    );
}

export default News;