import React from 'react';
import { Button } from './button';
import Modal from './modal';

interface INewsProperties {
    showModal: boolean;
    onClose: () => void;
}

class News extends React.Component<INewsProperties, {}> {

    render() {
        return (
            <Modal size="lg" show={this.props.showModal} onClose={() => this.props.onClose()} header="What's New?">
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
                <b>v1.240825</b>
                <ul>
                    <li>Minor improvements and fixes to some of the PDF sheets.</li>
                </ul>
                <b>v1.240824</b>
                <ul>
                    <li>Some bug fixes.</li>
                    <li>Better 2nd edition support for Fantasy Grounds and Foundry exports.</li>
                </ul>
                <b>v1.240821</b>
                <ul>
                    <li>A few more minor fixes.</li>
                </ul>
                <b>v1.240820</b>
                <ul>
                    <li>More minor fixes.</li>
                </ul>
                <b>v1.240819</b>
                <ul>
                    <li>A small number of minor fixes.</li>
                    <li>An A4 character sheet.</li>
                </ul>
                <b>v1.240818</b>
                <ul>
                    <li>A very preliminary version of character creation for 2nd Edition. Fuller and better support still
                        to come.
                    </li>
                    <li>Importantly, starship creation has not yet been updated. So there's that.</li>
                </ul>
                <b>v1.240706</b>
                <ul>
                    <li>A bit more work on the random starship generator.</li>
                    <li>A few new spaceframes from <cite>Continuing Mission</cite>.</li>
                </ul>

                <div className="text-center">
                    <Button className="btn btn-primary" onClick={ () => this.props.onClose() }>OK</Button>
                </div>
            </Modal>
        );
    }

    showNews() {
        this.setState({
            showModal: true
        })
    }
}

export default News;