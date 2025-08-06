import {DepartmentsHelper, Department} from './department';
import {Attribute, AttributesHelper} from './attributes';
import { CharacterType } from '../common/characterType';
import i18next from 'i18next';
import { hasSource } from '../state/contextFunctions';
import { Source } from './sources';

export class CareerEventModel {
    private name: string;
    private description: string;
    attributes: Attribute[];
    disciplines: Department[];
    focusSuggestions: string;
    private traitDescription: string;
    roll: number;
    special?: string;
    private prefix: string;
    focuses: string[];
    source?: Source;

    constructor(name: string, description: string, attributes: Attribute[], disciplines: Department[], focusSuggestions: string,
        traitDescription: string, roll: number, special: string = undefined, prefix: string = "common.",
        focuses: string[] = [], source?: Source) {
        this.name = name;
        this.description = description;
        this.attributes = attributes;
        this.disciplines = disciplines;
        this.focusSuggestions = focusSuggestions?.length ? focusSuggestions : focuses.join(", ");
        this.traitDescription = traitDescription;
        this.roll = roll;
        this.special = special;
        this.prefix = prefix;
        this.focuses = focuses;
        this.source = source;
    }

    get localizedName() {
        const key = 'CareerEvent.' + this.prefix + this.roll + '.name';
        let result = i18next.t(key);
        return result === key ? this.name : result;
    }

    get localizedDescription() {
        const key = 'CareerEvent.' + this.prefix + this.roll + '.description';
        let result = i18next.t(key);
        return result === key ? this.description : result;
    }

    get localizedFocusSuggestion() {
        const key = 'CareerEvent.' + this.prefix + this.roll + '.focusSuggestion';
        let result = i18next.t(key);
        return result === key ? this.focusSuggestions : result;
    }

    get localizedTraitDescription() {
        const key = 'CareerEvent.' + this.prefix + this.roll + '.traitDescription';
        let result = i18next.t(key);
        return result === key ? this.traitDescription : result;
    }
}

class CareerEvents {
    private _events: CareerEventModel[] = [
        new CareerEventModel(
            "Ship Destroyed",
            "The ship the character was serving on was lost, destroyed during a mission, and the character was one of the few who survived.\n\n- What was the ship’s mission? Was it something routine that went horribly wrong, or was it something perilous? What destroyed the ship?\n- How many survivors were there? How long did it take before they were recovered?",
            [Attribute.Daring],
            [Department.Security],
            "The character gains a Focus, which should reflect the character’s experiences. Examples include: Extra Vehicular Operations, Small Craft, or Survival.",
            null,
            1,
            undefined,
            "common.",
            ["Extra Vehicular Operations", "Small Craft", "Survival"]
        ),
        new CareerEventModel(
            "Death of a Friend",
            "During an important mission, one of the character’s friends was killed in action.\n\n- Who was the friend? How did the character know them?\n- What was the mission? How did the friend die? Who was to blame?",
            [Attribute.Insight],
            [Department.Medicine],
            "The character gains a Focus, which should reflect the character’s experiences. Examples include: Counselling, but it may also represent a skill or pursuit the character takes up in their fallen friend’s memory or to prevent the same thing happening in the future.",
            null,
            2,
            undefined,
            "common.",
            ["Counselling", "Cultural Grief Practices"]
        ),
        new CareerEventModel(
            "Lauded by Another Culture",
            "The character was involved in a mission that earned the official praise of a non-Federation culture; they are now considered to be a friend to that people.\n\n- What culture was aided by this mission? What was the mission? Why was it particularly praiseworthy?\n- Does the character have any friends or contacts in that culture who can be contacted for help?",
            [Attribute.Presence],
            [Department.Science],
            "The character gains a Focus, which should reflect the character’s experience with that culture. A Focus of X Culture, replacing the X with the name of that culture, is a good example, as would any that represent skills or techniques specific to that culture.",
            "The character may gain a Trait, which should reflect this event. A good example might be Friend to the X, replacing the X with the name of the culture. This reflects the character’s renown amongst that culture, and the benefits and problems such status brings.",
            3,
            undefined,
            "common.",
            ["X Culture"]
        ),
        new CareerEventModel(
            "Negotiate a Treaty",
            "The character was part of a delegation that helped negotiate a treaty, agreement, or alliance with a culture outside the Federation. What culture was the treaty with? What was it for?",
            [Attribute.Control],
            [Department.Command],
            "The character gains a Focus, which should reflect the character’s experience with the negotiations. Examples include: Diplomacy, Negotiation, or Galactic Politics.",
            null,
            4,
            undefined,
            "common.",
            ["Diplomacy", "Negotiation", "Galactic Politics"]
        ),
        new CareerEventModel(
            "Required to Take Command",
            "During a mission, a crisis left the mission’s leader unable to lead. This required the character to take command, something they may not have been prepared for.\n\n- What was the mission? What went wrong?\n- Was the mission successful despite the loss of the leader?",
            [Attribute.Daring],
            [Department.Command],
            "The character gains a Focus, which should reflect the character’s experiences during the crisis. Examples include: Lead by Example, Inspiration, or Composure.",
            null,
            5,
            undefined,
            "common.",
            ["Lead by Example", "Inspiration", "Composure"]
        ),
        new CareerEventModel(
            "Encounter with a Truly Alien Being",
            "The character encountered a life-form which is truly alien, something barely within the comprehension of humanoid life. It might have been some godlike entity, or a creature that swims through space, but whatever it was, it was not life as we know it.\n\n- What kind of creature was it? What did the character learn from the experience?\n- What happened to the creature afterwards? Has it been seen again?",
            [Attribute.Reason],
            [Department.Science],
            "The character gains a Focus, which should reflect the character’s experiences with the entity. Examples include: Empathy, Philosophy, Xenobiology.",
            null,
            6,
            undefined,
            "common.",
            ["Empathy", "Philosophy", "Xenobiology"]
        ),
        new CareerEventModel(
            "Serious Injury",
            "The character was seriously hurt, and needed to spend a considerable amount of time recovering.\n\n- What was happening when the character was injured? Who was responsible?\n- What did the recovery entail? Did the character need a prosthesis or cybernetic afterwards?",
            [Attribute.Fitness],
            [Department.Medicine],
            "The character gains a Focus, which should reflect the circumstances of the character’s injury, something that helped them through recovery, or something they took up after recovering. Examples include: Athletics, Art, or Philosophy.",
            "The character may gain a Trait, which should reflect some lasting effect of the character’s injury or the way they recovered. Examples include: Prosthetic Implant, or some form of disability.",
            7,
            undefined,
            "common.",
            ["Athletics", "Art", "Philosophy"]
        ),
        new CareerEventModel(
            "Conflict with a Hostile Culture",
            "The character was involved in a major battle with a hostile force, and is unlikely to forget the experience.\n\n- Who was the enemy in this battle? Why did the battle occur? Was it fought in space, on the ground, or both?\n- What did the character have to do to survive? Was the battle won or lost?",
            [Attribute.Fitness],
            [Department.Security],
            "The character gains a Focus, which should reflect skills they honed during the fighting. Examples include: Hand Phasers, Hand-to-Hand Combat, or Shipboard Tactical Systems.",
            null,
            8,
            undefined,
            "common.",
            ["Hand Phasers", "Hand-to-Hand Combat", "Shipboard Tactical Systems"]
        ),
        new CareerEventModel(
            "Mentored",
            "A highly-respected officer took notice of the character’s career. For a time, the character served as the officer’s pilot and aide, gaining the benefit of the officer’s experiences and lessons. Who was the officer? Does the officer remain a contact or even friend of the character?",
            [Attribute.Control, Attribute.Daring, Attribute.Fitness, Attribute.Insight, Attribute.Presence, Attribute.Reason],
            [Department.Conn],
            "The character gains a Focus, reflecting the lessons learned. Examples include: Composure or Etiquette, though any Focus reflecting the officer’s specialities would be fitting.",
            null,
            9,
            undefined,
            "common.",
            ["Composure", "Etiquette"]
        ),
        new CareerEventModel(
            "Transporter Accident",
            "The character suffered some manner of strange accident while using a Transporter.\n\n- What happened to the character during the accident? Were there any lasting repercussions?\n- How does the character feel about Transporters now?",
            [Attribute.Control],
            [Department.Conn],
            "The character gains a Focus, which should reflect something they learned either because of the accident, or in the aftermath. Examples include: Transporters & Replicators, Small Craft, or Quantum Mechanics.",
            null,
            10,
            undefined,
            "common.",
            ["Transporters & Replicators", "Small Craft", "Quantum Mechanics"]
        ),
        new CareerEventModel(
            "Dealing with a Plague",
            "The character’s starship was assigned to provide aid to a world deal with an epidemic.\n\n- What was the disease that was running rampant? What planet it was affecting?\n- Did the character deal directly with the sick? How was the character involved?",
            [Attribute.Insight],
            [Department.Medicine],
            "The character gains a Focus, which should reflect how they helped during the crisis. Examples include: Infectious Diseases, Emergency Medicine, or Triage.",
            null,
            11,
            undefined,
            "common.",
            ["Infectious Diseases", "Emergency Medicine", "Triage"]
        ),
        new CareerEventModel(
            "Betrayed Ideals for a Superior",
            "The character was placed in a situation where they had to choose between a trusted superior and their own ideals, and chose to follow the superior.\n\n- Who was the superior? What did they ask the character to do? How does the character feel now?\n- What were the repercussions of this? Are the details of this event on record? Was the character right?",
            [Attribute.Presence],
            [Department.Command],
            "The character gains a Focus, reflecting the event and its aftermath. Examples include: Persuasion, Inspiration, Investigation.",
            null,
            12,
            undefined,
            "common.",
            ["Persuasion", "Inspiration", "Investigation"]
        ),
        new CareerEventModel(
            "Called Out a Superior",
            "The character was placed in a situation where they had to choose between a trusted superior and their own ideals, and chose to follow their ideals.\n\n- Who was the superior? What did they ask the character to do? How does the character feel now?\n- What were the repercussions of this? Are the details of this event on record? Was the character right?",
            [Attribute.Reason],
            [Department.Conn],
            "The character gains a Focus, reflecting the event and its aftermath. Examples include: Uniform Code of Justice, History, or Starfleet Protocol.",
            null,
            13,
            undefined,
            "common.",
            ["Uniform Code of Justice", "History", "Starfleet Protocol"]
        ),
        new CareerEventModel(
            "New Battle Strategy",
            "In combat with a hostile force, the character devised a new strategy or tactic.\n\n- Who was the battle against?\n- Was it in space or on the ground? What was the strategy devised?",
            [Attribute.Daring],
            [Department.Security],
            "The character gains a Focus, reflecting their decisive battlefield leadership. Examples include: Combat Tactics, Hazard Awareness, or Lead by Example.",
            null,
            14,
            undefined,
            "common.",
            ["Combat Tactics", "Hazard Awareness", "Lead by Example"]
        ),
        new CareerEventModel(
            "Learns Unique Language",
            "The character encounters a species with an unusual form of communication, and learns to communicate with them.\n\n- Who were the aliens the character encountered? Was the encounter tense, or peaceful?\n- What method of communication do the aliens use? How did the character learn it?",
            [Attribute.Insight],
            [Department.Science],
            "The character gains a Focus, reflecting what the character learned from the event. Examples include: Linguistics, Cultural Studies, or Negotiations.",
            null,
            15,
            undefined,
            "common.",
            ["Linguistics", "Cultural Studies", "Negotiation"]
        ),
        new CareerEventModel(
            "Discovers an Artifact",
            "During a survey mission, the character discovered a device or fragment of technology from a now-extinct civilization.\n\n- What did this piece of technology do? Does it still function now?\n- What is known about the civilization that made it?",
            [Attribute.Reason],
            [Department.Engineering],
            "The character gains a Focus, reflecting the event and its aftermath. Examples include: Ancient Technology, Computers, Reverse Engineering.",
            null,
            16,
            undefined,
            "common.",
            ["Ancient Technology", "Computers", "Reverse Engineering"]
        ),
        new CareerEventModel(
            "Special Commendation",
            "During a crisis, the character saved the lives of several colleagues, helping them to safety.This earned the character a special commendation.\n\n- What was the crisis? Why was the mission in danger?\n- What were the repercussions of this? Are the details of this event on record?",
            [Attribute.Fitness],
            DepartmentsHelper.instance.getDepartments(),
            "The character gains a Focus, reflecting the event and its aftermath. Examples include: Athletics, Survival, or Emergency Medicine.",
            null,
            17,
            undefined,
            "common.",
            ["Athletics", "Survival", "Emergency Medicine"]
        ),
        new CareerEventModel(
            "Solved an Engineering Crisis",
            "The character was instrumental in ending a crisis caused by malfunctioning technology, and saved many lives in the process. What technology had malfunctioned, and why was it dangerous? How did the character solve the problem?",
            [Attribute.Control],
            [Department.Engineering],
            "The character gains a Focus, reflecting the technology involved in the event. Examples include: Electro-Plasma Power Systems, Fusion Reactors, or Warp Engines.",
            null,
            18,
            undefined,
            "common.",
            ["Electro-Plasma Power Systems", "Fusion Reactors", "Warp Engines"]
        ),
        new CareerEventModel(
            "Breakthrough or Invention",
            "The character made an important technological discovery, devised a new way of using a particular technology, or invented some new technology that will be invaluable in the future. What was the discovery, breakthrough, or invention? How will it be useful?",
            [Attribute.Control, Attribute.Daring, Attribute.Fitness, Attribute.Insight, Attribute.Presence, Attribute.Reason],
            [Department.Engineering],
            "The character gains a Focus, reflecting the character’s achievement. Examples include: Experimental Technology, Invention, or Improvisation.",
            null,
            19,
            undefined,
            "common.",
            ["Experimental Technology", "Invention", "Improvisation"]
        ),
        new CareerEventModel(
            "First Contact",
            "The character was chosen to be involved in one of the most important of Starfleet’s missions: first contact with another culture. What culture did the character make first contact with? Did the mission go well?",
            [Attribute.Presence],
            DepartmentsHelper.instance.getDepartments(),
            "The character gains a Focus, reflecting the nature of the mission. Examples include: Cultural Studies, Diplomacy, or Infiltration.",
            null,
            20,
            undefined,
            "common.",
            ["Cultural Studies", "Diplomacy", "Infiltration"]
        ),
        // Federation-Klingon War
        new CareerEventModel(
            "Behind Enemy Lines",
            "When conflict broke out, you were trapped on a planet which was claimed by the Klingons and had to help your colleagues escape.\n\n- What lasting bonds were made?\n- What did you leave behind?",
            [Attribute.Daring],
            [Department.Security],
            "",
            null,
            51,
            undefined,
            "common.",
            [],
            Source.FederationKlingonWar
        ),
        new CareerEventModel(
            "Emergency Responder",
            "When the war began, your ship was sent to aid victims of a bombing run on a devastated planet.\n\n- How did you cope with the suffering you witnessed?\n- How many did you save?",
            [Attribute.Insight],
            [Department.Medicine],
            "",
            null,
            52,
            undefined,
            "common.",
            [],
            Source.FederationKlingonWar
        ),
        new CareerEventModel(
            "Battlefield Improvisation",
            "You gained skill by using a regular piece of technology or your environment in a new way which aided in victory during a battle.\n\n- What did you invent?\n- What did you have to break to create your new tool?",
            [Attribute.Presence],
            [Department.Engineering],
            "",
            null,
            53,
            undefined,
            "common.",
            [],
            Source.FederationKlingonWar
        ),
        new CareerEventModel(
            "Thrust into Command",
            "At the outbreak of the war, you were serving on a ship whose captain was injured. You were forced to lead the crew to safety.\n\n- How do you feel?\n- What lingering effects has this had for you?",
            [Attribute.Control],
            [Department.Command],
            "",
            null,
            54,
            undefined,
            "common.",
            [],
            Source.FederationKlingonWar
        ),
        new CareerEventModel(
            "Narrow Escape",
            "Your ship was caught in a trap by Klingon battle cruisers. You convinced your captain to trust in a reckless plan you’d devised to escape.\n\n- What injuries were sustained?\n- How did your captain feel?",
            [Attribute.Daring],
            [Department.Command],
            "",
            null,
            55,
            undefined,
            "common.",
            [],
            Source.FederationKlingonWar
        ),
        new CareerEventModel(
            "Found a Weak Spot",
            "During a battle against enemy forces, you were able to analyze their tactics or weapons and devise a way to neutralize them.\n\n- Did this win the day?\n- How do people feel about your achievement?",
            [Attribute.Reason],
            [Department.Science],
            "",
            null,
            56,
            undefined,
            "common.",
            [],
            Source.FederationKlingonWar
        ),
        // Technical Manual
        new CareerEventModel(
            "",
            "",
            [Attribute.Control, Attribute.Reason],
            [Department.Command, Department.Science],
            "",
            null,
            57,
            undefined,
            "common.",
            ["Computing", "Cybernetics", "Holo-Programming"],
            Source.TechnicalManual
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Daring, Attribute.Control],
            [Department.Conn, Department.Science],
            "",
            null,
            58,
            undefined,
            "common.",
            ["Anomalous Physics", "Quantum Mechanics", "Subspace Dynamics"],
            Source.TechnicalManual
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Daring, Attribute.Control],
            [Department.Science, Department.Engineering],
            "",
            null,
            59,
            undefined,
            "common.",
            ["Archaeotechnology", "History", "Temporal Mechanics"],
            Source.TechnicalManual
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Reason, Attribute.Fitness],
            [Department.Science, Department.Security],
            "",
            null,
            60,
            undefined,
            "common.",
            ["Alternate Histories", "Multi-Dimensional Physics", "Subspace Dynamics"],
            Source.TechnicalManual
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Presence, Attribute.Reason],
            [Department.Science, Department.Medicine],
            "",
            null,
            61,
            undefined,
            "common.",
            ["Archaeological Medicine", "Cybernetics", "Theoretical Physics"],
            Source.TechnicalManual
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Control, Attribute.Reason],
            [Department.Engineering, Department.Medicine],
            "",
            null,
            62,
            undefined,
            "common.",
            ["Archaeotechnology", "Electronics", "History"],
            Source.TechnicalManual
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Control, Attribute.Reason],
            [Department.Engineering, Department.Science],
            "",
            null,
            63,
            undefined,
            "common.",
            ["EPS Power Systems", "Matter/Antimatter Reactors", "Plasma Physics"],
            Source.TechnicalManual
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Daring, Attribute.Fitness],
            [Department.Command, Department.Medicine],
            "",
            null,
            64,
            undefined,
            "common.",
            ["Damage Control", "Procedures", "First Aid", "Nuclear Physics"],
            Source.TechnicalManual
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Control, Attribute.Reason],
            [Department.Engineering, Department.Medicine],
            "",
            null,
            65,
            undefined,
            "common.",
            ["Molecular Synthesis", "Sensor Operations", "Transporters & Replicators"],
            Source.TechnicalManual
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Reason, Attribute.Insight],
            [Department.Conn, Department.Engineering],
            "",
            null,
            66,
            undefined,
            "common.",
            ["Astromycology, Quantum", "Mechanics", "Subspace Theory"],
            Source.TechnicalManual
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Daring, Attribute.Reason],
            [Department.Conn, Department.Science],
            "",
            null,
            67,
            undefined,
            "common.",
            ["Astrophysics", "Geology", "Stellar Cartography"],
            Source.ExplorationGuide
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Presence, Attribute.Insight],
            [Department.Command, Department.Conn],
            "",
            null,
            68,
            undefined,
            "common.",
            [],
            Source.ExplorationGuide
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Daring, Attribute.Insight],
            [Department.Command, Department.Science],
            "",
            null,
            69,
            undefined,
            "common.",
            ["Anthropology", "Composure", "Linguistics"],
            Source.ExplorationGuide
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Reason, Attribute.Insight],
            [Department.Conn, Department.Medicine],
            "",
            null,
            70,
            undefined,
            "common.",
            ["Astronavigation", "Extra-Vehicular Activity", "Xenobiology"],
            Source.ExplorationGuide
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Insight, Attribute.Reason],
            DepartmentsHelper.instance.getDepartments(),
            "",
            null,
            71,
            undefined,
            "common.",
            ["Hazardous Environments", "Myths and Legends", "Unified Field Theory"],
            Source.ExplorationGuide
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Control, Attribute.Reason],
            [Department.Security, Department.Science],
            "",
            null,
            72,
            undefined,
            "common.",
            ["Covert Operations", "History", "Temporal Mechanics"],
            Source.ExplorationGuide
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Insight, Attribute.Presence],
            [Department.Command, Department.Science],
            "",
            null,
            73,
            undefined,
            "common.",
            ["Anthropology", "Cultural Expert", "Etiquette"],
            Source.ExplorationGuide
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Presence, Attribute.Fitness],
            [Department.Command, Department.Conn],
            "",
            null,
            74,
            undefined,
            "common.",
            ["Astronavigation", "Crisis Management", "Diplomacy"],
            Source.ExplorationGuide
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Control, Attribute.Reason],
            [Department.Science, Department.Engineering],
            "",
            null,
            75,
            undefined,
            "common.",
            ["Ecology", "Geology", "Mining Operations"],
            Source.ExplorationGuide
        ),
        new CareerEventModel(
            "",
            "",
            [Attribute.Insight, Attribute.Fitness],
            [Department.Command, Department.Science],
            "",
            null,
            76,
            undefined,
            "common.",
            ["Anthropology", "Linguistics", "Xenobiology"],
            Source.ExplorationGuide
        ),
        // Operations
        new CareerEventModel(
            "Recruited to Starfleet Intelligence",
            "On a quiet day while you were on shore leave, you were approached by a member of Starfleet Intelligence and offered a position as a covert agent. It seems they had been watching you for some time and decided you had the right skills and attitude they required. You were assigned a small mission as a test, and if you passed they promised to take you on as an agent, but one that maintained your Starfleet career.  Did you pass the test and accept their offer?  What did you have to do on the mission? Did you have to make any moral choices? If you did decide to join, what convinced you? Was it the excitement, the desire to learn more secrets, or just because you were frightened of what might happen if you refused?",
            [Attribute.Daring],
            [Department.Security],
            "Depending on the mission the character might have learned covert skills. Examples include: Composure, Infiltration  or Persuasion.",
            null,
            99,
            undefined,
            "common.",
            ["Composure", "Infiltration", "Persuasion"],
            Source.OperationsDivision
        )
    ];

    private _klingonEvents: CareerEventModel[] = [
        new CareerEventModel(
            "Ship Destroyed",
            "The ship you were serving on was lost, destroyed during a mission, and you were one of the few who survived. What was the ship’s mission? Was it something routine that went horribly wrong, or was it something perilous? What destroyed the ship? How many survivors were there? How long did it take before they were recovered?",
            [Attribute.Daring],
            [Department.Security],
            "The character gains a Focus, which should reflect the character’s experiences. Examples include: Extra Vehicular Operations, Small Craft, or Survival.",
            null,
            1,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Death of a Friend",
            "During an important mission, one your friends was killed in action. Who was the friend? How did you know them? How did the friend die? Was it an honorable death? If not, who is responsible?",
            [Attribute.Insight],
            [Department.Medicine],
            "The character gains a focus, which should reflect the character’s experiences. Examples include: Counselling, but it may also represent a skill or pursuit the character takes up in their fallen friend’s memory or to prevent the same thing happening in the future.",
            null,
            2,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Lauded by Another Culture",
            "You were involved in a mission or action that earned the official praise of a foreign nation, such as a world within the Federation; you’re now considered to be a friend to that people. What culture was aided by this mission? What was the mission? Why was it particularly praiseworthy? Does the character have any friends or contacts in that culture who can be contacted for help?",
            [Attribute.Presence],
            [Department.Science],
            "The character gains a focus, which should reflect the character’s experience with that culture. A focus of X Culture, replacing the X with the name of that culture, is a good example (e.g., Pakled Culture)",
            "The character may gain a Trait, which should reflect this event. A good example might be Friend to the X, replacing the X with the name of the culture. This reflects the character’s renown amongst that culture, and the benefits and problems such status brings.",
            3,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Negotiate a Treaty",
            "You were part of a delegation that helped negotiate a treaty, agreement, or alliance with a culture outside the Empire. What culture was the treaty with? What was it for? Why was the culture not simply conquered by the Empire?",
            [Attribute.Control],
            [Department.Command],
            "The character gains a Focus, which should reflect the character’s experience with the negotiations. Examples include: Diplomacy, Negotiation, or Galactic Politics.",
            null,
            4,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Required to Take Command",
            "During a mission, a crisis left the mission’s leader unable to lead. This required you to take command, something you may not have been prepared for. What was the mission? What went wrong? Were you forced to assassinate your leader to take command? Was the mission successful despite the loss of the leader",
            [Attribute.Daring],
            [Department.Command],
            "The character gains a Focus, which should reflect the character’s experiences during the crisis. Examples include: Lead by Example, Inspiration, or Composure.",
            null,
            5,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Encounter with a Truly Alien Being",
            "You encountered a lifeform which is truly alien, something barely within the comprehension of humanoid life. It might have been some godlike entity, or a creature that swims through space, but whatever it was, it was not life as we know it. What kind of creature was it? What did the character learn from the experience? What happened to the creature afterwards? Did you kill it? If not, has it been seen again?",
            [Attribute.Reason],
            [Department.Science],
            // I'm pretty sure that this part is incorrect, and has been inaccurately copied over from the event, above.
            "The character gains a Focus, which should reflect the character’s experiences during the crisis. Examples include: Lead by Example, Inspiration, or Composure.",
            null,
            6,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Serious Injury",
            "You were seriously hurt and needed to spend a considerable amount of time recovering. What was happening when you were injured? Who was responsible? Why did you not die? What did the recovery entail? Do you need a prosthesis or cybernetic as a result?",
            [Attribute.Fitness],
            [Department.Medicine],
            "The character gains a Focus, which should reflect the circumstances of the character’s injury, something that helped them through recovery, or something they took up after recovering. Examples include: Athletics, Art, or Philosophy.",
            "The character may gain a Trait, which should reflect some lasting effect of the character’s injury or the way they recovered. Examples include: Prosthetic Implant, or some form of disability.",
            7,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Glorious Battle!",
            "You fought in a major battle with a hostile force and spilled much blood. Who was the enemy in this battle? Why did the battle occur? Was it fought in space, on the ground, or both? What did you have to do to survive? Was the battle won or lost?",
            [Attribute.Fitness],
            [Department.Security],
            "The character gains a Focus, which should reflect skills they honed during the fighting. Examples include: Hand Phasers, Hand-to-Hand Combat, or Shipboard Tactical Systems.",
            null,
            8,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Mentored",
            "A highly-respected officer took notice of your career. For a time, you served as the officer’s aide-de-camp or as third officer on their ship, gaining the benefit of the officer’s experiences and lessons. Who was the officer? Does the officer remain a contact or even friend of the character?",
            [Attribute.Control, Attribute.Daring, Attribute.Fitness, Attribute.Insight, Attribute.Presence, Attribute.Reason],
            [Department.Conn],
            // again, I think this is wrong...
            "TThe character gains a focus, reflecting the event and its aftermath. Examples include: Persuasion, Inspiration, or Investigation.",
            null,
            9,
            "If your character was an Enlisted Warrior or Laborer, you gain a field commission and become an officer."
        ),
        new CareerEventModel(
            "Transporter Accident",
            "You suffered some manner of strange accident while using a transporter. What happened to you during the accident? Were there any lasting repercussions? How do you feel about transporters now?",
            [Attribute.Control],
            [Department.Conn],
            "The character gains a Focus, which should reflect something they learned either because of the accident, or in the aftermath. Examples include: Transporters & Replicators, Small Craft, or Quantum Mechanics.",
            null,
            10,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Dealing with a Plague",
            "Your ship was assigned to provide aid a world dealing with an epidemic. What was the disease that was running rampant? What planet it was affecting? Did the character deal directly with the sick? How was the character involved?",
            [Attribute.Insight],
            [Department.Medicine],
            "The character gains a Focus, which should reflect how they helped during the crisis. Examples include: Infectious Diseases, Emergency Medicine, or Triage.",
            null,
            11,
        ),
        new CareerEventModel(
            "Dishonored Self for a Superior",
            "You were placed in a situation where you had to choose between a superior officer and your own honor, and you chose to follow the superior. You dishonored yourself in the process. Who was the superior? What did they order you to do? How do you feel now? What were the repercussions of this? Are the details of this event on record? Were you right to do this?",
            [Attribute.Presence],
            [Department.Command],
            "The character gains a Focus, reflecting the event and its aftermath. Examples include: Persuasion, Inspiration, Investigation.",
            null,
            12,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Challenged a Superior",
            "You were placed in a situation where you had to choose between a trusted superior and your own honor, and you chose to disobey their superior, challenging them to a duel for the affront. Who was the superior? What did they order you to do? How do you feel now? What were the repercussions of this? Did you slay your superior? If not, how did you survive?",
            [Attribute.Reason],
            [Department.Conn],
            "The character gains a focus, reflecting the event and its aftermath. Examples include: Law and Justice, Hand-to-Hand Combat, or Blades.",
            null,
            13,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "New Battle Strategy",
            "In combat with a hostile force, you devised a new strategy or tactic. Who was the battle against? Was it in space or on the ground? What strategy did you devise?",
            [Attribute.Daring],
            [Department.Security],
            "The character gains a Focus, reflecting their decisive battlefield leadership. Examples include: Combat Tactics, Hazard Awareness, or Lead by Example.",
            null,
            14,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Employed Dishonorable Means to Triumph",
            "Desperate to achieve victory and gain glory at any cost, you resorted to shameful methods. Who did you defeat? What method did you employ to defeat them? Have you managed to keep your shameful tactics secret? If not, what consequences did you face? Would you do it again?",
            [Attribute.Insight],
            [Department.Science],
            "The character gains a focus, reflecting what the character learned from the event. Examples include: Toxicology, Stealth, or Deception.",
            null,
            15,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Discovers an Artifact",
            "During a survey mission, the character discovered a device or fragment of technology from a now-extinct civilization. What did this piece of technology do? Does it still function now? What is known about the civilization that made it?",
            [Attribute.Reason],
            [Department.Engineering],
            "The character gains a focus, reflecting the event and its aftermath. Examples include: Ancient Technology, Reverse Engineering, Computers.",
            null,
            16,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Honor and Glory",
            "You have been commended by your superiors, and even by those higher up in the Empire, or the House you fight for, for your deeds during a crisis. What was the crisis? Why was the mission in danger? What were the repercussions of this? Are the details of this event on record?",
            [Attribute.Fitness],
            DepartmentsHelper.instance.getDepartments(),
            "The character gains a Focus, reflecting the event and its aftermath. Examples include: Athletics, Survival, or Emergency Medicine.",
            null,
            17,
            "If your character was an Enlisted Warrior or Laborer, you gain a field commission and become an officer.",
            "klingon."
        ),
        new CareerEventModel(
            "Solved an Engineering Crisis",
            "You were instrumental in ending a crisis caused by malfunctioning technology and achieved a great victory in the process. What technology had malfunctioned, and why was it dangerous? How did you solve the problem? What victory did you achieve because of this?",
            [Attribute.Control],
            [Department.Engineering],
            "The character gains a focus, reflecting the technology involved in the event. Examples include: Electro-Plasma Power Systems, Cloaking Devices, or Warp Engines.",
            null,
            18,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Breakthrough or Invention",
            "You made an important technological discovery, devised a new way of using a particular technology, or invented some new technology that will be invaluable in the future. What was the discovery, breakthrough, or invention? How will it be useful?",
            [Attribute.Control, Attribute.Daring, Attribute.Fitness, Attribute.Insight, Attribute.Presence, Attribute.Reason],
            [Department.Engineering],
            "The character gains a Focus, reflecting the character’s achievement. Examples include: Experimental Technology, Invention, or Improvisation.",
            null,
            19,
            undefined,
            "klingon."
        ),
        new CareerEventModel(
            "Conquest",
            "You were chosen to be involved in conquering another world to bring it under the rule of the Klingon Empire. What culture did you help conquer? Did the conquest go well?",
            [Attribute.Presence],
            DepartmentsHelper.instance.getDepartments(),
            "The character gains a focus, reflecting the nature of the mission. Examples include: Strategy, Tactics, or Infiltration.",
            null,
            20,
            undefined,
            "klingon."
        ),
    ];

    private _unofficialEvents: CareerEventModel[] = [
        new CareerEventModel(
            "Advanced Tactical Training",
            "The character took a specialized course in advanced tactical and intelligence techniques.\n\n- Where was the course taught? Who recommended the character for the course?\n- Did the character pass the course? How did the character rank in the various subjects?",
            [Attribute.Control],
            [Department.Security],
            "The character gains a focus, which should reflect the special training they received. Examples include: Guerilla Tactics, Strategic Defense, or Combat Maneuvers.",
            null,
            21,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Protoype Testing",
            "",
            [Attribute.Control],
            [Department.Science],
            "",
            null,
            22,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Colonization Effort",
            "",
            [Attribute.Control],
            [Department.Science],
            "",
            null,
            23,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Exchange Program",
            "",
            [Attribute.Control],
            DepartmentsHelper.instance.getDepartments(),
            "",
            null,
            24,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Lucky Streak",
            "",
            [Attribute.Daring],
            [Department.Conn],
            "",
            null,
            25,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Learned from Significant Blunder",
            "",
            [Attribute.Daring],
            [Department.Engineering],
            "",
            null,
            26,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Cultural Observation Post",
            "",
            [Attribute.Daring],
            [Department.Science],
            "",
            null,
            27,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Struggle with Addiction",
            "",
            [Attribute.Daring],
            [Department.Medicine],
            "",
            null,
            28,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Rivalry",
            "",
            [Attribute.Daring],
            DepartmentsHelper.instance.getDepartments(),
            "",
            null,
            29,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Off-Duty Endeavour",
            "",
            [Attribute.Fitness],
            [Department.Command],
            "",
            null,
            30,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Starbase Posting",
            "",
            [Attribute.Fitness],
            [Department.Conn],
            "",
            null,
            31,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Planetary Posting",
            "",
            [Attribute.Fitness],
            [Department.Engineering],
            "",
            null,
            32,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Left Behind",
            "",
            [Attribute.Fitness],
            [Department.Science],
            "",
            null,
            33,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Family Crisis",
            "",
            [Attribute.Insight],
            [Department.Command],
            "",
            null,
            34,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Satisfactory Performance",
            "",
            [Attribute.Insight],
            [Department.Conn],
            "",
            null,
            35,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Confinement",
            "",
            [Attribute.Insight],
            [Department.Security],
            "",
            null,
            36,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Terraforming Mission",
            "",
            [Attribute.Insight],
            [Department.Engineering],
            "",
            null,
            37,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Leave of Absence",
            "",
            [Attribute.Insight],
            DepartmentsHelper.instance.getDepartments(),
            "",
            null,
            38,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Media Exposure",
            "",
            [Attribute.Presence],
            [Department.Conn],
            "",
            null,
            39,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Clandestine Operation",
            "",
            [Attribute.Presence],
            [Department.Security],
            "",
            null,
            40,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Fleet Yard Posting",
            "",
            [Attribute.Presence],
            [Department.Engineering],
            "",
            null,
            41,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Missing Memories",
            "",
            [Attribute.Presence],
            [Department.Medicine],
            "",
            null,
            42,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Teaching Opportunity",
            "",
            [Attribute.Reason],
            [Department.Command],
            "",
            null,
            43,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Legal Entanglement",
            "",
            [Attribute.Reason],
            [Department.Security],
            "",
            null,
            44,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Victim of Mind Control",
            "",
            [Attribute.Reason],
            [Department.Medicine],
            "",
            null,
            45,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Not Fitting In",
            "",
            [Attribute.Reason],
            DepartmentsHelper.instance.getDepartments(),
            "",
            null,
            46,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Meaningful Memento",
            "",
            AttributesHelper.getAllAttributes(),
            [Department.Command],
            "",
            null,
            47,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Deep Space Assignment",
            "",
            AttributesHelper.getAllAttributes(),
            [Department.Security],
            "",
            null,
            48,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Brush with Temporal Anomaly",
            "",
            AttributesHelper.getAllAttributes(),
            [Department.Science],
            "",
            null,
            49,
            undefined,
            "unofficial."
        ),
        new CareerEventModel(
            "Medical Facility Posting",
            "",
            AttributesHelper.getAllAttributes(),
            [Department.Medicine],
            "",
            null,
            50,
            undefined,
            "unofficial."
        ),
    ];


    getSoloCareerEvents() {
        let result = [];
        for (let i = 0; i < 20; i++) {
            result.push(this._events[i]);
        }
        return result;
    }

    getCareerEvents(type: CharacterType, version: number) {
        let list = (type === CharacterType.KlingonWarrior && version === 1) ? this._klingonEvents : this._events;
        list = list.filter(e => e.source == null || hasSource(e.source));
        return [...list].sort((e1, e2) => {
            return e1.localizedName.localeCompare(e2.localizedName);
        })
    }

    getCareerEventsIncludingUnofficial(type: CharacterType, version: number) {
        let list = this.getCareerEvents(type, version);
        this._unofficialEvents.forEach(e => list.push(e));
        return list.sort((e1, e2) => {
            return e1.localizedName.localeCompare(e2.localizedName);
        })
    }

    getCareerEvent(id: number, type: CharacterType, version: number): CareerEventModel {
        let event = undefined;

        let list = (type === CharacterType.KlingonWarrior && version === 1) ? this._klingonEvents : this._events;
        list.forEach(ev => {
            if (ev.roll === id) {
                event = ev;
            }
        });

        if (event == null) {
            const items = this._unofficialEvents.filter(e => e.roll === id);
            if (items.length === 1) {
                event = items[0];
            }
        }

        return event;
    }

    generateEvent(type: CharacterType, version: number): CareerEventModel {
        if (version === 1 || type === CharacterType.KlingonWarrior) {
            let roll = Math.floor(Math.random() * 20) + 1;
            let event = undefined;

            let list = type === CharacterType.KlingonWarrior ? this._klingonEvents : this._events;
            list.forEach(ev => {
                if (ev.roll === roll) {
                    event = ev;
                    return;
                }
            });
            return event;
        } else {
            let events = this.getCareerEvents(type, version);
            let roll = Math.floor(Math.random() * events.length);
            return events[roll];
        }
    }
}

export const CareerEventsHelper = new CareerEvents();
