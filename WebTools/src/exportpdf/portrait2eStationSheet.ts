import i18next from 'i18next';
import { BaseNonForm2eSheet } from './generated2eBaseSheet';
import { makeKey } from '../common/translationKey';
import { PDFDocument, PDFForm, PDFPage } from '@cantoo/pdf-lib';
import { Construct } from '../common/construct';
import { Starship } from '../common/starship';
import { XYLocation } from '../common/xyLocation';
import { SheetTag } from './icharactersheet';
import { Paragraph } from './paragraph';
import { FontSpecification } from './fontSpecification';
import { SimpleColor } from '../common/colour';
import { System } from '../helpers/systems';
import { Department } from '../helpers/department';
import { TalentsHelper } from '../helpers/talents';
import { Column } from './column';
import { FontOptions } from './fontOptions';
import { FontType } from './fontLibrary';
import {
  cardassianBrownColour2e,
  ferengiOrangeColour2e,
  goldColour2e,
  greyColour2e,
  klingonRedColour2e,
  labelColourProvider,
  redColour2e,
  romulanGreenColour2e,
  tealColour2e,
} from './colourProvider2e';
import { CharacterType } from '../common/characterType';
import {
  politySymbolArrowHead,
  politySymbolArrowHeadCommand,
  politySymbolCardassianSymbolInner,
  politySymbolCardassianSymbolOutline,
  politySymbolFederationLaurels,
  politySymbolFederationStarfield,
  politySymbolFerengiSymbol,
  politySymbolKlingonSymbol,
  politySymbolKlingonSymbolCircle,
  politySymbolRomulanSymbolBackground,
  politySymbolRomulanSymbolBird,
} from './politySymbols';
import { TalentWriter } from './talentWriter';
import { bullet2EWriter } from './bullet2eWriter';
import { PortraitSheetDecorations } from './portraitSheetDecorations';
import { assembleStarshipTalents } from './generatedsheet';
import { PageArea } from './pageArea';
import { Station } from '../common/station';
import MissionProfiles from '../helpers/missionProfiles';
import { Generated2eStarshipSheet } from './generated2eStarshipSheet';
import { isKlingonWarriorType } from '../helpers/klingonWarrior';

export class Portrait2eStationSheet extends BaseNonForm2eSheet {
  static readonly starshipStatFrame =
    'M 2.835,0 C 1.269,0 0,1.269 0,2.835 V 9 c 0,1.565 1.269,2.835 2.835,2.835 h 66.567 c 1.565,0 2.835,-1.27 2.835,-2.835 V 2.835 C 72.237,1.269 70.967,0 69.402,0 Z';

  getName(): string {
    return i18next.t(makeKey('Sheet.', 'Portrait2eStationSheet'), {
      defaultValue: 'New 2nd Ed.-style Station Sheet (US Letter)',
    });
  }
  getThumbnailUrl(): string {
    return '/static/img/sheets/STA_2e_Station_Sheet.png';
  }
  getPdfUrl(type: CharacterType): string {
    return '/static/pdf/STA_2e_Portrait_Blank.pdf';
  }

  getTags(): SheetTag[] {
    return [
      SheetTag.Portrait,
      SheetTag.Style2e,
      SheetTag.LanguageSupport,
      SheetTag.TalentText,
      SheetTag.UsLetter,
    ];
  }

  get nameColumn() {
    return new Column(75, 48, 15, 550 - 75);
  }

  writeStationName(page: PDFPage, station: Station, colour: SimpleColor) {
    if (station.name?.length) {
      let name = station.name;
      this.writeName(page, name, colour, this.headingFont, this.nameColumn);
    } else {
      this.writeName(
        page,
        i18next.t('ViewPage.unnamedStation'),
        colour,
        this.headingFont,
        this.nameColumn,
      );
    }
  }

  // if we can stick the three stats together, then we should do so
  writeThreeColumnDerivedStats(
    page: PDFPage,
    station: Station,
    previousParagraph: Paragraph,
    colour: SimpleColor,
  ) {
    let resistanceParagraph = previousParagraph.nextParagraph(1);
    resistanceParagraph.append(
      i18next.t('Construct.other.protection').toLocaleUpperCase() + ': ',
      new FontSpecification(this.boldFont, 9),
      colour,
    );
    resistanceParagraph.append(
      station.resistance,
      new FontSpecification(this.textFont, 9),
    );

    let scaleParagraph = previousParagraph.nextParagraph(1);
    scaleParagraph.append(
      i18next.t('Construct.other.scale').toLocaleUpperCase() + ': ',
      new FontSpecification(this.boldFont, 9),
      colour,
    );
    scaleParagraph.append(
      station.scale,
      new FontSpecification(this.textFont, 9),
    );

    let crewParagraph = previousParagraph.nextParagraph(1);
    crewParagraph.append(
      i18next.t('Construct.other.crewSupport').toLocaleUpperCase() + ': ',
      new FontSpecification(this.boldFont, 9),
      colour,
    );
    crewParagraph.append(
      station.crewSupport,
      new FontSpecification(this.textFont, 9),
    );

    if (
      resistanceParagraph.lines.length === 1 &&
      scaleParagraph.lines.length === 1 &&
      crewParagraph.lines.length === 1 &&
      resistanceParagraph.lines[0].width +
        scaleParagraph.lines[0].width +
        crewParagraph.lines[0].width +
        30 <
        previousParagraph.column.width
    ) {
      let availableMiddleSpace =
        previousParagraph.column.width -
        resistanceParagraph.lines[0].width -
        crewParagraph.lines[0].width;
      let centreX =
        resistanceParagraph.lines[0].width +
        availableMiddleSpace / 2 -
        scaleParagraph.lines[0].width / 2;
      let endX = previousParagraph.column.width - crewParagraph.lines[0].width;

      resistanceParagraph.write();

      let x = scaleParagraph.lines[0].bottom().x + centreX;
      let y = scaleParagraph.lines[0].bottom().y;
      scaleParagraph.lines[0].blocks.forEach((textBlock) => {
        textBlock.writeToPage(x, y, page, SimpleColor.from('#000000'));
        x += textBlock.width;
      });

      x = crewParagraph.lines[0].bottom().x + endX;
      y = crewParagraph.lines[0].bottom().y;
      crewParagraph.lines[0].blocks.forEach((textBlock) => {
        textBlock.writeToPage(x, y, page, SimpleColor.from('#000000'));
        x += textBlock.width;
      });

      return crewParagraph.nextArea(page);
    } else {
      resistanceParagraph.write();

      scaleParagraph = resistanceParagraph.nextParagraph(0);
      scaleParagraph.append(
        i18next.t('Construct.other.scale').toLocaleUpperCase() + ': ',
        new FontSpecification(this.boldFont, 9),
        colour,
      );
      scaleParagraph.append(
        station.scale,
        new FontSpecification(this.textFont, 9),
      );
      scaleParagraph.write();

      let crewParagraph = scaleParagraph.nextParagraph(0);
      crewParagraph.append(
        i18next.t('Construct.other.crewSupport').toLocaleUpperCase() + ': ',
        new FontSpecification(this.boldFont, 9),
        colour,
      );
      crewParagraph.append(
        station.crewSupport,
        new FontSpecification(this.textFont, 9),
      );
      crewParagraph.write();

      return crewParagraph.nextArea(page);
    }
  }

  firstColumn(additionalPage: PDFPage, pdf: PDFDocument) {
    const column4 = new Column(
      538.5 - (284.7 - 56.7),
      78.5,
      715 - 78.5,
      284.7 - 56.7,
    );
    const column3 = new Column(56.7, 78.5, 715 - 78.5, 284.7 - 56.7, column4);

    const column2 = new Column(
      538.5 - (284.7 - 56.7),
      340,
      715 - 340,
      284.7 - 56.7,
      () => {
        const page = pdf.addPage(additionalPage);
        return new PageArea(column3, page);
      },
    );
    const column1 = new Column(56.7, 75, 715 - 75, 284.7 - 56.7, column2);

    return column1;
  }

  async populate(pdf: PDFDocument, construct: Construct) {
    await super.populate(pdf, construct);

    let station = construct as Station;
    let page = pdf.getPage(0);

    const colour = this.deriveSheetColour(construct);
    new PortraitSheetDecorations().drawSheetDecorations(page, colour);

    this.writeStationName(page, station, colour);

    const [secondPage] = await pdf.copyPages(pdf, [0]);
    const column = this.firstColumn(secondPage, pdf);

    const { SheetOutlineOptions, SpaceframeOutline } = await import(
      /* webpackChunkName: 'spaceframeOutline' */ '../helpers/spaceframeOutlineHelper'
    );
    SpaceframeOutline.draw(
      pdf,
      new SheetOutlineOptions(
        new XYLocation(322, 75),
        colour.asPdfRbg(),
        1.3,
        2.5,
      ),
      station,
    );
    this.drawArrowHead(page, construct, colour);

    let paragraph = new Paragraph(page, column, this.fonts);
    /*
        paragraph.append(i18next.t("Construct.other.launchYear").toLocaleUpperCase() + ": ", new FontSpecification(this.boldFont, 9),
            colour);
        paragraph.append("" + (starship.spaceframeModel?.serviceYear ?? (starship.serviceYear ?? "")), new FontSpecification(this.textFont, 9));
        paragraph.write();

        paragraph = paragraph.nextParagraph(1);

        paragraph.append(i18next.t("Construct.other.timeline").toLocaleUpperCase() + ": ", new FontOptions(9, FontType.Bold),
            colour);
        paragraph.append("" + (starship.serviceYear), new FontOptions(9));
        if (starship.spaceframeModel?.serviceYear != null && starship.serviceYear != null) {
            let yearsOfService = i18next.t("Construct.other.yearsOfService", {
                count: (Math.max(0, starship.serviceYear -  starship.spaceframeModel.serviceYear)),
                interpolation: { escapeValue: false }
            });
            let numberOfRefits = i18next.t("Construct.other.numberOfRefits", {
                count: starship.numberOfRefits,
                interpolation: { escapeValue: false }
            });

            paragraph.append("(" + yearsOfService + ", " + numberOfRefits + ")", new FontOptions(9));
        }
        paragraph.write();

        if (starship.className?.length && starship.version === 1) {
            paragraph = paragraph.nextParagraph(1);

            paragraph.append(i18next.t("Construct.other.spaceFrame").toLocaleUpperCase() + ": ", new FontOptions(9, FontType.Bold),
                colour);
            if (starship.spaceframeModel != null) {
                paragraph.append(starship.spaceframeModel?.localizedName, new FontOptions(9));
            } else {
                paragraph.append(starship.className, new FontOptions(9));
            }
            paragraph.write();
        }
        */
    if (station.missionProfileStep?.type != null) {
      paragraph = paragraph.nextParagraph(1);

      let profile = MissionProfiles.instance.getStationMissionProfileByType(
        station.missionProfileStep.type,
      );
      paragraph.append(
        i18next.t('Construct.other.missionProfile').toLocaleUpperCase() + ': ',
        new FontOptions(9, FontType.Bold),
        colour,
      );
      paragraph.append(profile?.localizedName ?? '', new FontOptions(9));
      paragraph.write();
    }

    paragraph = paragraph.nextParagraph(1);

    paragraph.append(
      i18next.t('Construct.other.traits').toLocaleUpperCase() + ': ',
      new FontOptions(9, FontType.Bold),
      colour,
    );
    paragraph.append(station.allTraitsAsString, new FontOptions(9));
    paragraph.write();

    let bottomArea = this.writeThreeColumnDerivedStats(
      page,
      station,
      paragraph,
      colour,
    );

    let dockingParagraph = new Paragraph(
      page,
      bottomArea.areaWithAtLeast(50).column,
      this.fonts,
    ).nextParagraph(1);
    dockingParagraph.append(
      i18next.t('Construct.other.dockingPorts').toLocaleUpperCase() + ': ',
      new FontSpecification(this.boldFont, 9),
      colour,
    );
    dockingParagraph.append(
      station.dockingPorts,
      new FontSpecification(this.textFont, 9),
    );
    dockingParagraph.write();

    let statFontSize = this.determineFontSizeForWidth(
      this.determineAllStatLabels(station),
      72.2 * 0.8 - 2,
    );

    let statsArea = dockingParagraph.endColumn.columnWithAtLeast(25, page);

    let statsColumn = statsArea.column.bottomAfter(16 + 4, page);
    this.writeSubTitle(page, i18next.t('Construct.other.systems'), statsColumn);

    let systemsBoxes = statsColumn.bottomAfter(13 + 4).start;
    // these sheets use an unusual order
    [
      System.Comms,
      System.Engines,
      System.Structure,
      System.Computer,
      System.Sensors,
      System.Weapons,
    ].forEach((s, i) => {
      let location = new XYLocation(
        systemsBoxes.x + (i % 3) * 77.9,
        systemsBoxes.y + Math.floor(i / 3) * 15.4,
      );
      let x = location.x;
      const y = page.getHeight() - location.y;
      page.moveTo(x, y);
      page.drawSvgPath(Generated2eStarshipSheet.starshipStatFrame, {
        borderColor: SimpleColor.from('#979696').asPdfRbg(),
        borderWidth: 0.5,
      });

      let column = new Column(x, location.y, 11.8, 72.2 * 0.8);
      this.writeLabel(
        page,
        i18next.t(makeKey('Construct.system.', System[s])),
        column,
        new FontSpecification(this.boldFont, statFontSize),
        tealColour2e,
      );

      this.writeLabel(
        page,
        '' + station.systems[s],
        this.valueBlock(column),
        new FontSpecification(this.boldFont, statFontSize),
        tealColour2e,
      );
    });

    this.writeSubTitle(
      page,
      i18next.t('Construct.other.departments'),
      new Column(
        systemsBoxes.x,
        systemsBoxes.y + 15.4 * 2 + 16,
        13,
        column.width,
      ),
    );
    let departmentBoxes = new XYLocation(
      systemsBoxes.x,
      systemsBoxes.y + 15.4 * 2 + 16 + 13 + 4,
    );

    // these sheets use an unusual order
    [
      Department.Command,
      Department.Engineering,
      Department.Medicine,
      Department.Conn,
      Department.Security,
      Department.Science,
    ].forEach((d, i) => {
      let location = new XYLocation(
        departmentBoxes.x + (i % 3) * 77.9,
        departmentBoxes.y + Math.floor(i / 3) * 15.4,
      );
      let x = location.x;
      const y = page.getHeight() - location.y;
      page.moveTo(x, y);
      page.drawSvgPath(Generated2eStarshipSheet.starshipStatFrame, {
        borderColor: SimpleColor.from('#979696').asPdfRbg(),
        borderWidth: 0.5,
      });

      let column = new Column(x, location.y, 11.8, 72.2 * 0.8);
      const key = makeKey('Construct.department.', Department[d]);
      this.writeLabel(
        page,
        i18next.t(key),
        column,
        new FontSpecification(this.boldFont, statFontSize),
        labelColourProvider(construct.era, key),
      );

      this.writeLabel(
        page,
        '' + station.departments[d],
        this.valueBlock(column),
        new FontSpecification(this.boldFont, statFontSize),
        labelColourProvider(construct.era, key),
      );
    });

    let attacksArea = new XYLocation(
      departmentBoxes.x,
      departmentBoxes.y + 15.4 * 2 + 16,
    );
    this.writeSubTitle(
      page,
      i18next.t('Construct.other.attacks'),
      new Column(attacksArea.x, attacksArea.y, 13, column.width),
    );

    let remainingColumn = this.writeAttacks(
      page,
      station,
      column.bottomAfter(attacksArea.y + 13 + 4 - column.start.y),
      colour,
    );

    this.writeSubTitle(
      page,
      i18next.t('Construct.other.shields'),
      remainingColumn.bottomAfter(16).topBefore(13),
    );
    remainingColumn = remainingColumn.bottomAfter(16 + 13 + 4);
    let bottomOfShields = this.writeShieldsBoxes(
      page,
      pdf.getForm(),
      station,
      remainingColumn,
    );

    remainingColumn = remainingColumn
      .bottomAfter(bottomOfShields.y - remainingColumn.start.y)
      .bottomAfter(16);
    this.writeSubTitle(
      page,
      i18next.t('Construct.other.talents'),
      remainingColumn,
    );

    let talentsColumn = remainingColumn.bottomAfter(13 + 4);

    //let finalColumn =
    await this.writeTalents(page, station, talentsColumn, colour);

    /*
        if (this.hasSpecialRules(station) && finalColumn) {
            if (finalColumn.height <= 50 && finalColumn.isNextColumnAvailable) {
                let newColumn = finalColumn.advanceToNextColumn(page);
                page = newColumn.page;
                finalColumn = newColumn.column;
            } else {
                finalColumn = finalColumn.bottomAfter(16);
            }
            if (finalColumn.height > 50) {
                this.writeSubTitle(page, i18next.t("Construct.other.specialRules"), finalColumn);
                await this.writeSpecialRules(page, starship, finalColumn.bottomAfter(13 + 4), colour);
            }
        }
        */
  }

  drawArrowHead(page: PDFPage, construct: Construct, colour: SimpleColor) {
    if (construct.type === CharacterType.Starfleet) {
      page.moveTo(513.5, page.getHeight() - 75);

      page.drawSvgPath(politySymbolArrowHead, {
        borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
        color: SimpleColor.from('#ffffff').asPdfRbg(),
        borderWidth: 1,
        scale: 0.6,
      });

      page.drawSvgPath(politySymbolArrowHeadCommand, {
        borderColor: colour.asPdfRbg(),
        color: colour.asPdfRbg(),
        borderWidth: 0,
        scale: 0.6,
      });
    } else if (
      isKlingonWarriorType(construct.type) ||
      isKlingonWarriorType((construct as Starship).spaceframeModel?.type)
    ) {
      page.moveTo(513.5, page.getHeight() - 75);

      page.drawSvgPath(politySymbolKlingonSymbolCircle, {
        borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
        color: SimpleColor.from('#ffffff').asPdfRbg(),
        borderWidth: 1,
        scale: 0.6,
      });

      page.drawSvgPath(politySymbolKlingonSymbol, {
        borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
        color: colour.asPdfRbg(),
        borderWidth: 0,
        scale: 0.6,
      });
    } else if (construct.type === CharacterType.Cardassian) {
      page.moveTo(513.5, page.getHeight() - 75);

      page.drawSvgPath(politySymbolCardassianSymbolInner, {
        borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
        color: colour.asPdfRbg(),
        borderWidth: 0,
        scale: 0.6,
      });

      page.drawSvgPath(politySymbolCardassianSymbolOutline, {
        borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
        color: Generated2eStarshipSheet.greyColour.asPdfRbg(),
        borderWidth: 0,
        scale: 0.6,
      });
    } else if (construct.type === CharacterType.Romulan) {
      page.moveTo(499.5, page.getHeight() - 75);

      page.drawSvgPath(politySymbolRomulanSymbolBackground, {
        borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
        color: colour.asPdfRbg(),
        borderWidth: 0,
        scale: 0.6,
      });

      page.drawSvgPath(politySymbolRomulanSymbolBird, {
        borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
        color: colour.asPdfRbg(),
        borderWidth: 0,
        scale: 0.6,
      });
    } else if (
      construct.type === CharacterType.Civilian ||
      construct.type === CharacterType.Federation
    ) {
      page.moveTo(499.5, page.getHeight() - 75);

      page.drawSvgPath(politySymbolFederationLaurels, {
        borderColor: greyColour2e.asPdfRbg(),
        color: greyColour2e.asPdfRbg(),
        borderWidth: 0,
        scale: 0.6,
      });

      page.drawSvgPath(politySymbolFederationStarfield, {
        borderColor: greyColour2e.asPdfRbg(),
        color: greyColour2e.asPdfRbg(),
        borderWidth: 0,
        scale: 0.6,
      });
    } else if (construct.type === CharacterType.Ferengi) {
      page.moveTo(509.5, page.getHeight() - 75);

      page.drawSvgPath(politySymbolFerengiSymbol, {
        borderColor: Generated2eStarshipSheet.greyColour.asPdfRbg(),
        color: colour.asPdfRbg(),
        borderWidth: 0,
        scale: 0.6,
      });
    }
  }

  deriveSheetColour(construct: Construct) {
    if (construct.type === CharacterType.Starfleet) {
      return tealColour2e;
    } else if (isKlingonWarriorType(construct.type)) {
      return klingonRedColour2e;
    } else if (construct.type === CharacterType.Romulan) {
      return romulanGreenColour2e;
    } else if (construct.type === CharacterType.Cardassian) {
      return cardassianBrownColour2e;
    } else if (construct.type === CharacterType.Ferengi) {
      return ferengiOrangeColour2e;
    } else {
      return tealColour2e;
    }
  }

  hasSpecialRules(starship: Station) {
    return (
      starship
        .getDistinctTalentNameList()
        .map((t) => TalentsHelper.getTalent(t))
        .filter((t) => t.isSpecialRule(starship.version)).length > 0
    );
  }

  writeShieldsBoxes(
    page: PDFPage,
    form: PDFForm,
    station: Station,
    column: Column,
  ) {
    let stressBox =
      'm 1,0 h 7.5 c 0.554,0 1,0.446 1,1 v 7.5 c 0,0.554 -0.446,1 -1,1 H 1 C 0.446,9.5 0,9.054 0,8.5 V 1 C 0,0.446 0.446,0 1,0 Z';

    let x = column.translatedStart(page).x;
    let y = column.translatedStart(page).y;

    const halfShields = Math.ceil((station.shields + 1) / 2);
    const quarterShields = Math.ceil((3 * (station.shields + 1)) / 4);

    for (let i = 0; i < station.shields; i++) {
      let borderColor = SimpleColor.from('#000000');
      let borderWidth = 0.5;
      if (i + 1 === halfShields) {
        borderColor = goldColour2e.blend(borderColor, 0.25);
        borderWidth = 1;
      } else if (i + 1 === quarterShields) {
        borderColor = redColour2e.blend(borderColor, 0.25);
        borderWidth = 1;
      }

      page.moveTo(x, y);
      page.drawSvgPath(stressBox, {
        borderColor: borderColor.asPdfRbg(),
        borderWidth: borderWidth,
      });

      let checkbox = form.createCheckBox('Shield ' + (i + 1));
      checkbox.addToPage(page, {
        x: x + 0.5,
        y: y - 9,
        width: 8.5,
        height: 8.5,
        textColor: SimpleColor.from('#000000').asPdfRbg(),
        borderWidth: 0,
      });

      x += 12;
      if (i % 15 === 14) {
        x = column.translatedStart(page).x;
        y -= 12;
      } else if (i % 5 === 4) {
        x += 10;
      }
    }

    return column.untranslateLocation(
      page,
      new XYLocation(column.translatedStart(page).x, (y -= 12)),
    );
  }

  async writeTalents(
    page: PDFPage,
    station: Station,
    column: Column,
    colour: SimpleColor,
  ) {
    let talents = assembleStarshipTalents(station, false);
    let writer = new TalentWriter(
      page,
      this.fonts,
      station.version,
      colour,
      true,
    );
    return await writer.writeTalents(talents, column, 9, 9, 15, (p) =>
      bullet2EWriter(p.page, p, colour),
    );
  }

  async writeSpecialRules(
    page: PDFPage,
    starship: Starship,
    column: Column,
    colour: SimpleColor,
  ) {
    let talents = assembleStarshipTalents(starship, true);
    let writer = new TalentWriter(
      page,
      this.fonts,
      starship.version,
      colour,
      true,
    );
    return await writer.writeTalents(talents, column, 9, 9, 15, (p) =>
      bullet2EWriter(p.page, p, colour),
    );
  }
}
