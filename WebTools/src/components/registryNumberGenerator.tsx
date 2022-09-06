import { CharacterType } from "../common/characterType";
import { Spaceframe, SpaceframeModel } from "../helpers/spaceframes";


class RegistryNumberGenerator {

    static NUMBERS: string = "0123456789";

    importantRegistryNumbers: { [registry: number]: string } = {
        638: "Grissom",
        1031: "Discovery",
        1017: "Constellation", 
        1227: "Shenzhou",
        1672: "Exeter",
        1701: "Enterprise",
        1703: "Hood",
        1764: "Defiant",
        1864: "Reliant",
        2000: "Excelsior",
        42296: "Hood",
        71807: "Yamato",
        71832: "Odyssey",
        71201: "Prometheus",
        74205: "Defiant",
        74656: "Voyager",
        74913: "Prometheus"

    }

    generate(serviceYear: number, type: CharacterType, spaceframe: SpaceframeModel) {
        let numberOfDigits = 5;
        if (serviceYear < 2220) {
            numberOfDigits = 3;
        } else if (serviceYear < 2300) {
            numberOfDigits = 4;
        }

        let result = null;
        while (result == null) {
            let temp = this.generateRandom(numberOfDigits);
            if (this.importantRegistryNumbers[parseInt(temp)] == null) {
                result = temp;
            }
        }

        if (type === CharacterType.Starfleet) {
            return "NCC-" + result;
        } else {
            return result;
        }

    }

    generateRandom(numberOfDigits: number) {
        let result = "";
        while (result.length < numberOfDigits) {
            let random = Math.floor(Math.random() * 10);
            if (!(random === 0 && result.length === 0)) {
                let digit = RegistryNumberGenerator.NUMBERS.substring(random, random+1);
                result += digit;
            }
        }
        return result;
    }
}

const RegistryNumber = new RegistryNumberGenerator();

export default RegistryNumber;