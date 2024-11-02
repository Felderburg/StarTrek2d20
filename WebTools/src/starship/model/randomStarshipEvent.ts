import { IServiceYearProvider } from "../../common/serviceYearProvider";

const majorEvents = {
    2160: ["Earth-Romulan War"],
    2245: ["The Battle of Donatu V"],
    2256: [
            "Battle of the Binary Stars",
            "Federation-Klingon War"
        ],
    2257: ["The Battle of Axanar", "The Attack on Starbase 12", "The Attack on Starbase 19", "The Attack on Starbase 22"],
    2263: ["The Battle of Caleb IV"],
    2267: ["Second Federation-Klingon War", "Altair Sector Conflicts"],
    2301: ["Destruction of Pollyea's World"],
    2311: ["Tomed Incident"],
    2331: ["The Attack on Station Salem-One"],
    2340: ["The Battle of Sarnia Prime"],
    2347: ["Cardassian Attack on Minos Korva"],
    2353: ["Federation-Tholian Conflict"],
    2359: ["Mordan IV Civil War"],
    2362: ["Setlik III massacre"],
    2366: ["Federation-Cardassian War"],
    2367: ["The Battle of Wolf 359"],
    2368: ["Klingon-Romulan Blockade"],
    2370: ["Feira Incident"],
    2373: ["The Battle of Ajilon Prime", "The Battle of Sector 001", "The Battle of Torros III"],
    2374: ["The Battle of Betazed", "Operation Return", "The Bolian Operation"],
    2375: ["The Second Battle of Chin'toka", "Invasion of Cardassia", "The Battle of Ricktor Prime", "The Breen attack on Earth"],
    2384: ["Vau N'Akat Construct Infection"],
    2385: ["Attack on Mars"],
}

export const randomStarshipEvent = (spaceframe: IServiceYearProvider, currentYear: number) => {

    const events = [];
    Object.keys(majorEvents)
        .filter(year => parseInt(year) <= currentYear)
        .filter(year => parseInt(year) >= spaceframe.serviceYear)
        .forEach(year => events.push(...majorEvents[year]));

    return events?.length ? events[Math.floor(Math.random() * events.length)] : undefined;
}
