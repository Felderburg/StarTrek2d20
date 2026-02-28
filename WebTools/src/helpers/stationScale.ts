
class StationScale {
    private static _instance?: StationScale;

    private scales = {
        1: "Smaller than the International Space Station",
        3: "Scale of the International Space Station",
        4: "Larger than the International Space Station",
        6: "Scale of a Starfleet Construction Slip, K-class Border Outpost, or Regula-class",
        7: "Larger than a Starfleet Construction Slip, K-class Border Outpost, or Regula-class",
        8: "Scale of a Federation Border Listening Post",
        9: "Larger than a Federation Border Listening Post",
        12: "Scale of a Federation Starbase or DS9",
        13: "Scale of Narendra Station",
        14: "Larger than Narendra Station",
        16: "Scale of Earth's Spacedock",
        17: "Larger than Earth's Spacedock",
    }


    public static instance() {
        if (StationScale._instance == null) {
            StationScale._instance = new StationScale();
        }
        return StationScale._instance;
    }

    public getTextHint(scale: number) {
        let result = this.scales[scale];
        while (result == null && scale > 2063) {
            result = this.scales[--scale];
        }
        return result;
    }
}

export default StationScale;
