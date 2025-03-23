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

function describeType(inputJson) {
    let prompt = "";
    if (inputJson.type === "Amphibian") {
        prompt = "It's an amphibian";
    } else if (inputJson.type === "Bird") {
        prompt = "It's a type of bird";
    } else if (inputJson.type === "Fish") {
        prompt = "It's a type of fish";
    } else if (inputJson.type === "Invertebrate") {
        prompt = "It's an invertibrate species";
    } else if (inputJson.type === "Mammal") {
        prompt = "It's a mammal";
    } else if (inputJson.type === "Plant") {
        prompt = "It's a species of plant";
    } else if (inputJson.type === "Reptile") {
        prompt = "It's a type of reptile";
    } else if (inputJson.type === "Energy") {
        prompt = "It's an unsual energy-based creature";
    }

    if (inputJson.form === "Unique") {
        prompt += " but it doesn't resemble anything we see on Earth."
    } else {
        prompt += " and it's approximately the form of a " + inputJson.form + "."
    }

    return prompt + " ";
}

function describeNameAndSize(inputJson) {
    let prompt = "The creature is called a " + inputJson.name;
    if (inputJson.size === "Swarm") {
        prompt += " and it is very small, but appears and acts as a group or swarm. "
    } else if (inputJson.size === "Small") {
        prompt += " and it is small. "
    } else if (inputJson.size === "Average") {
        prompt += " and it's of average size. "
    } else if (inputJson.size === "Large") {
        prompt += " and it is large. "
    } else if (inputJson.size === "Huge") {
        prompt += " and it is huge -- much bigger than a person. "
    } else if (inputJson.size === "Gigantic") {
        prompt += " and it is gigantic -- closer in size to dinosaurs or other megafauna than most modern-day animals. "
    }

    return prompt;
}

function describeHabitat(inputJson) {
    let prompt = "";
    if (inputJson.habitat === "Caves") {
        prompt = "The creature makes its home in caves and underground tunnels. "
    } else if (inputJson.habitat === "Desert") {
        prompt = "The creature lives and thrives in desert regions. "
    } else if (inputJson.habitat === "Forest") {
        prompt = "The creature's native habitat is in forested areas. "
    } else if (inputJson.habitat === "Hills") {
        prompt = "The creature's native environment is the hilly regions of its home planet. "
    } else if (inputJson.habitat === "Jungle") {
        prompt = "The creature's native habitat is in deep, lush jungle environments. "
    } else if (inputJson.habitat === "Mountains") {
        prompt = "The creature's native habitat is high up in mountainous areas. "
    } else if (inputJson.habitat === "Ocean") {
        prompt = "The creature can be found in the oceans of its home planet. "
    } else if (inputJson.habitat === "Plains") {
        prompt = "The creature can be found on the plains regions of its home planet. "
    } else if (inputJson.habitat === "River") {
        prompt = "The creature lives in or around rivers. "
    } else if (inputJson.habitat === "Space") {
        prompt = "The creature's native habitat is in deep space. "
    } else if (inputJson.habitat === "Swamp") {
        prompt = "The creature thrives in the swampy regions of its home planet. "
    } else if (inputJson.habitat === "UpperAtmosphere") {
        prompt = "The creature spends a good portion of its lifecycle in the upper atmosphere. "
    }
    return prompt + " ";
}

function describeLocomotion(inputJson) {
    let prompt = "";
    if (inputJson.locomotion?.length) {
        prompt = "It moves about with ";
        prompt += inputJson.locomotion.map((l,i) => {
            if (i === 0) {
                return l + (inputJson.locomotion.length === 1 ? ". " : " ");
            } else if (i === (inputJson.locomotion.length-1)) {
                return ", and " + l + "."
            } else {
                return ", " + l;
            }
        });
    }
    return prompt + " ";
}

function describeDiet(inputJson) {
    let prompt = "";
    if (inputJson.diet === "Herbivore") {
        prompt = "The creature is a herbivore. "
    } else if (inputJson.diet === "Carnivore") {
        prompt = "The creature is a carnivore. "
    } else if (inputJson.diet === "Omnivore") {
        prompt = "The creature is an omnivore. "
    } else if (inputJson.diet === "MineralsOrMetal") {
        prompt = "The creature consumes minerals of metals as its primary diet. "
    } else if (inputJson.diet === "Energy") {
        prompt = "The creature feeds on energy. "
    } else if (inputJson.diet === "PsychicEnergy") {
        prompt = "The creature feeds on psychic energy. "
    }
    return prompt += " ";
}

async function main(key, inputData) {
    const groq = new Groq({
        "apiKey": key.trim()
    });

    let inputJson = JSON.parse(inputData);
    let prompt = "Give me two paragraphs describing a fictional alien animal/creature. ";
    if (inputJson.type === "Plant") {
        prompt = "Give me two paragraphs describing a fictional alien plant creature. ";
    }

    prompt += describeNameAndSize(inputJson);
    prompt += describeType(inputJson);
    prompt += describeLocomotion(inputJson);
    prompt += describeDiet(inputJson);
    prompt += describeHabitat(inputJson);

    prompt += "Give me a description of the alien and describe its demeanor/personality. ";

    const chatCompletion = await groq.chat.completions.create({
        "messages": [{
            "role": "user",
            "content": prompt
        }],
        "model": "llama-3.3-70b-versatile",
        "temperature": 1,
        "max_completion_tokens": 2048,
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

let inputData = fs.readFileSync(0, "utf-8");

const key = getApiKey();
if (key == null || inputData == null || inputData.length == 0) {
    process.stdout.write("Content-Type: text/plain\n\n");
    process.stdout.write("Server configuration error");
} else {
    main(key, inputData);
}
