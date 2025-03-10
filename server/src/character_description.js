
#!/usr/bin/node

const Groq = require('groq-sdk');
const fs = require('node:fs');

const getApiKey = () => {
    try {
        return fs.readFileSync('../../groq.ini', 'utf8');
    } catch (e) {
        return undefined;
    }
}

function describeSpecialization(inputJson, pronoun) {

    let prompt = "";
    pronoun = pronoun.substring(0, 1).toLocaleUpperCase() + pronoun.substring(1);
    let pronounPhrase = pronoun + " is ";
    let serves = " serves ";
    if (pronoun === "They") {
        pronounPhrase = "They are "
        serves = " serve "
    }

    if (inputJson.npcCharacterType === "Starfleet") {

        prompt += pronounPhrase + " a member of Starfleet at the rank of " + inputJson.rank + "; ";

        if (inputJson.specialization === "Admiral") {
            prompt += pronoun + serves + " as an admiral at Starfleet Command."
        } else if (inputJson.specialization === "Admin") {
            prompt += pronoun + serves + " as an administrator/yeoman on a Starfleet ship."
        } else if (inputJson.specialization === "Counselor") {
            prompt += pronoun + serves + " as a counselor/therapist for a ship's crew."
        } else if (inputJson.specialization === "FirstContactSpecialist") {
            prompt += pronoun + serves + " as a first contact specialist, studying and meeting new alien species."
        } else if (inputJson.specialization === "Jag") {
            prompt += pronoun + serves + " as a legal expert for Starfleet's Judge Advocate General's office."
        } else if (inputJson.specialization === "Security") {
            prompt += pronoun + serves + " in Starfleet's the security department."
        } else if (inputJson.specialization === "MedicalDoctor") {
            prompt += pronoun + serves + " as a medical doctor."
        } else if (inputJson.specialization === "Nurse") {
            prompt += pronoun + serves + " as a nurse, tending to the sick and wounded."
        } else if (inputJson.specialization === "HangarDeck") {
            prompt += pronoun + serves + " on the flight deck/hanger deck, keeping shuttles ready for use."
        } else if (inputJson.specialization === "Conn") {
            prompt += pronoun + serves + " as a pilot/helmsman."
        } else if (inputJson.specialization === "ScienceTech") {
            prompt += pronoun + serves + " as a lab technician in a science department."
        } else if (inputJson.specialization === "StarfleetScientist") {
            prompt += pronoun + serves + " as a science officer for Starfleet."
        } else if (inputJson.specialization === "Engineer") {
            prompt += pronoun + serves + " in the engineering department."
        } else if (inputJson.specialization === "IntelligenceOfficer") {
            prompt += pronoun + serves + " in Starfleet Intelligence, as an intelligence officer."
        } else if (inputJson.specialization === "Captain") {
            prompt += pronoun + serves + " as the captain of a starship."
        } else if (inputJson.specialization === "StationCommander") {
            prompt += pronoun + serves + " as the commander of a Starfleet space station."
        }

    }

    return prompt + " ";
}

function speciesAndGender(inputJson, pronoun) {

    let prompt = "The character's name is " + inputJson.name;

    prompt += " and " + (pronoun === "they" ? "they are " : (pronoun + " is ") + "a ");
    if (pronoun === "they") {
        prompt += "non-binary " + inputJson.species;
    } else if (pronoun === "she") {
        prompt += inputJson.species + " woman";
    } else if (pronoun === "he") {
        prompt += inputJson.species + " male";
    } else {
        prompt += inputJson.species;
    }

    if (inputJson.species === "Human" && inputJson.nameOrigin != null) {
        prompt += " of " + inputJson.nameOrigin + " descent";
    }

    return prompt + ". ";
}

async function main(key, inputData) {
    const groq = new Groq({
        "apiKey": key.trim()
    });

    let inputJson = JSON.parse(inputData);
    let prompt = "Give me two paragraphs describing an original character in the Star Trek universe. ";
    let subjectPronoun = inputJson.pronouns;
    if (subjectPronoun != null && subjectPronoun.indexOf('/') >= 0) {
        subjectPronoun = subjectPronoun.substring(0, subjectPronoun.indexOf('/'));
    }
    let possessivePronoun = "";
    if (subjectPronoun === "she") {
        possessivePronoun = "her";
    } else if (subjectPronoun === "he") {
        possessivePronoun = "his";
    } else if (subjectPronoun === "they") {
        possessivePronoun = "their";
    }

    prompt += speciesAndGender(inputJson, subjectPronoun);
    prompt += describeSpecialization(inputJson, subjectPronoun);

    prompt += "Include a description and personality.  Also include other interesting aspects of " + possessivePronoun + " character. ";

    const chatCompletion = await groq.chat.completions.create({
        "messages": [{
            "role": "user",
            "content": prompt
        }],
        "model": "llama-3.3-70b-versatile",
        "temperature": 1,
        "max_completion_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
    });

    let text = "";

    for await (const chunk of chatCompletion) {
        text += (chunk.choices[0]?.delta?.content || '');
    }

    const json = {
        description: text
    };
    process.stdout.write("Content-Type: application/json\n\n");
    process.stdout.write(JSON.stringify(json));
}

let inputData = "";
process.stdin.on("data", data => {
    inputData = data.toString();
});

const key = getApiKey();
if (key == null || inputData == null || inputData.length == 0) {
    process.stdout.write("Content-Type: text/plain\n\n");
    process.stdout.write("Server configuration error");
} else {
    main(key, inputData);
}
