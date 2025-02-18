import { Rank } from "../../helpers/ranks";
import { BaseNeckProvider } from "./baseNeckProvider";
import RankIndicatorCatalog from "./rankIndicatorCatalog";
import Swatch from "./swatch";
import { Token } from "./token";
import { UniformEra } from "./uniformEra";
import UniformVariantRestrictions from "./uniformVariantRestrictions";

const DominionWarCommbadge = `<g id="g6426">
    <path id="path882_1_" fill="#ffffff" d="m 328.76833,314.91763 c -15.72989,0.062 -31.06633,1.08076 -39.00882,3.49535 -1.32402,0.34773 -1.83501,0.94526 -2.65783,2.39172 -2.2301,5.49689 -3.92635,13.13572 -4.14838,20.14438 0.43426,1.94766 -0.13551,3.10026 2.38683,3.27985 31.89893,6.34583 82.19702,3.20965 95.26744,-1.32239 1.93787,-0.67589 1.46442,-0.74935 1.46605,-2.8766 -0.20243,-8.91877 -2.23826,-14.45648 -5.71075,-20.64558 -1.05465,-1.21301 -1.33055,-1.21464 -2.77702,-1.62605 -8.65592,-1.75339 -26.98977,-2.91252 -44.81752,-2.84068 z m -34.48984,12.44187 h 75.76793 c 1.48402,0 2.67906,1.19505 2.67906,2.67906 0,1.48402 -1.19504,2.67906 -2.67906,2.67906 h -75.76793 c -1.48401,0 -2.67906,-1.19504 -2.67906,-2.67906 0,-1.48401 1.19505,-2.67906 2.67906,-2.67906 z" style="fill:#d9a14b;fill-opacity:1;stroke:#000000;stroke-width:1.63258;stroke-opacity:1"/>
    <path id="path878_1_" fill="#ffffff" d="m 347.54134,313.03853 c -4.27082,-11.30397 -11.8117,-30.16514 -14.74871,-30.16514 -0.72976,0 -1.96889,0 -7.1915,11.70068 -2.31826,5.1916 -4.88957,11.54233 -7.47721,18.38446 l -1.49218,4.07982 c -0.5714,1.53952 -1.12647,3.11169 -1.68318,4.68386 -3.28638,9.27141 -9.90649,29.03866 -13.54224,46.93008 l -0.72976,3.74677 c -0.82608,4.5255 -1.41218,8.87469 -1.66686,12.82879 -0.0163,0.23836 0.08,0.52406 0.23836,0.69875 0.17468,0.19101 0.44406,0.2857 0.69874,0.2857 0.55508,0 0.6514,-0.08 4.42918,-4.57285 1.2228,-1.44483 2.76232,-3.27005 4.52551,-5.31894 l 2.57131,-2.92068 c 9.30406,-10.54156 22.84629,-24.49683 30.67287,-24.83151 2.65131,0 10.14484,13.63856 15.24175,23.46504 l 1.63584,3.19169 c 0.84078,1.65054 1.57217,3.09537 2.12725,4.20715 3.3027,6.55644 3.3027,6.55644 4.01614,6.55644 0.23836,0 0.49141,-0.0947 0.6514,-0.28571 0.17468,-0.17468 0.26937,-0.46038 0.25468,-0.69874 -0.19101,-3.90512 -0.71507,-8.17595 -1.44483,-12.62146 l -0.66609,-3.77778 c -3.46107,-18.09876 -10.0975,-37.99172 -13.38388,-47.27946 -0.031,-0.08 -0.60405,-1.68318 -1.52482,-4.19082 z" style="fill:#d9a14b;fill-opacity:1;stroke:#000000;stroke-width:1.63258;stroke-opacity:1"/>
    <path id="path976" style="fill:#999999;fill-opacity:1;stroke:none;stroke-width:1.63258;stroke-opacity:1" d="m 332.75299,287.45308 c -3.88135,7.01826 -6.78377,14.52407 -9.76291,21.95549 -5.47225,14.13746 -10.30774,28.54566 -14.34631,43.17543 -1.7114,6.25454 -3.314,12.83267 -4.54284,19.31058 -0.32502,1.66038 -0.63465,3.54427 -0.86023,4.97614 -0.49116,1.77811 0.2285,0.87849 0.97702,-0.0849 7.63774,-8.88123 15.44151,-17.7415 24.61118,-25.08874 3.94579,-2.98948 8.29507,-6.09402 13.40388,-6.41499 3.04332,0.23874 4.87846,3.05622 6.55015,5.27635 4.80319,6.97695 8.64977,14.55255 12.56567,22.04702 -2.75569,-15.8786 -7.44479,-31.34893 -12.59713,-46.59453 -3.99852,-11.35508 -8.17923,-22.67407 -13.29654,-33.58006 -0.83045,-1.67514 -1.69171,-3.49537 -2.70194,-4.97773 z"/>
</g>`;


const TngMasterChiefPettyOfficer: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#a1b7cc;stroke-width:0.400393;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 228.24801,242.35683 12.71512,6.86982 1.01368,3.47707 -3.03947,5.62565 -3.37082,0.88569 -12.71512,-6.86983 z" id="path132489"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.177902px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 228.45618,243.05431 11.94505,6.45377 0.98918,3.19822 -2.76388,5.11557 -3.1326,0.76896 -11.94505,-6.45377 z" id="path132497"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 229.80202,244.21616 1.2629,0.68234 -0.97698,1.80823 1.19447,3.76016 -3.86175,1.17664 -0.89945,1.66473 -1.26289,-0.68233 1.07002,-1.98045 3.38633,-0.91439 -1.07572,-3.36225 z" id="path132517"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 232.50003,245.67387 1.2629,0.68233 -0.97697,1.80824 1.19447,3.76015 -3.86176,1.17665 -0.89944,1.66473 -1.2629,-0.68233 1.07002,-1.98046 3.38633,-0.91439 -1.07571,-3.36224 z" id="path132519"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 235.39896,247.24012 1.2629,0.68234 -0.97697,1.80824 1.19447,3.76014 -3.86176,1.17665 -0.89944,1.66473 -1.2629,-0.68232 1.07002,-1.98046 3.38633,-0.91439 -1.07571,-3.36226 z" id="path132521"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="path132523" cx="329.21188" cy="107.73019" r="0.86615855" transform="rotate(28.381823)"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle132525" cx="331.18564" cy="110.47058" r="0.86615855" transform="rotate(28.381823)"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle132527" cx="329.21188" cy="113.37409" r="0.86615855" transform="rotate(28.381823)"/>
</g>`;

const TngMasterChiefPettyOfficerBorder: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:1.27689;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 86.671255,327.06801 37.848765,26.30097 1.97385,11.38044 -11.63655,16.74572 -10.99812,1.60609 -37.848761,-26.30101 z" id="path146349"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.567347px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.082511,329.35258 35.556519,24.70813 1.99554,10.48799 -10.58146,15.22738 -10.20158,1.32101 -35.55652,-24.70813 z" id="path146351"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 90.93378,333.51408 3.759237,2.61232 -3.740338,5.3825 2.445953,12.34199 -12.657591,2.35326 -3.443515,4.95535 -3.75921,-2.61228 4.096546,-5.89515 11.057496,-1.69151 -2.211367,-11.03865 z" id="path146353"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 98.964873,339.09489 3.759237,2.61229 -3.740307,5.38254 2.445957,12.34195 -12.657626,2.35329 -3.443484,4.95536 -3.759241,-2.61229 4.096549,-5.89518 11.057496,-1.69151 -2.211338,-11.03862 z" id="path146355"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 107.59404,345.09125 3.75924,2.61232 -3.74031,5.38254 2.44596,12.34193 -12.657625,2.35328 -3.443484,4.95536 -3.759244,-2.61226 4.096549,-5.89518 11.057494,-1.69151 -2.21133,-11.03868 z" id="path146357"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle146359" cx="299.89856" cy="228.69986" r="2.7622666" transform="rotate(34.795326)"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle146361" cx="306.19308" cy="237.43925" r="2.7622666" transform="rotate(34.795326)"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle146363" cx="299.89856" cy="246.69885" r="2.7622666" transform="rotate(34.795326)"/>
</g>`;

const TngSeniorChiefPettyOfficer: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#a1b7cc;stroke-width:0.400393;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 228.24801,242.35683 12.71512,6.86982 1.01368,3.47707 -3.03947,5.62565 -3.37082,0.88569 -12.71512,-6.86983 z" id="path132489"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.177902px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 228.45618,243.05431 11.94505,6.45377 0.98918,3.19822 -2.76388,5.11557 -3.1326,0.76896 -11.94505,-6.45377 z" id="path132497"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 229.80202,244.21616 1.2629,0.68234 -0.97698,1.80823 1.19447,3.76016 -3.86175,1.17664 -0.89945,1.66473 -1.26289,-0.68233 1.07002,-1.98045 3.38633,-0.91439 -1.07572,-3.36225 z" id="path132517"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 232.50003,245.67387 1.2629,0.68233 -0.97697,1.80824 1.19447,3.76015 -3.86176,1.17665 -0.89944,1.66473 -1.2629,-0.68233 1.07002,-1.98046 3.38633,-0.91439 -1.07571,-3.36224 z" id="path132519"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 235.39896,247.24012 1.2629,0.68234 -0.97697,1.80824 1.19447,3.76014 -3.86176,1.17665 -0.89944,1.66473 -1.2629,-0.68232 1.07002,-1.98046 3.38633,-0.91439 -1.07571,-3.36226 z" id="path132521"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="path132523" cx="329.21188" cy="107.73019" r="0.86615855" transform="rotate(28.381823)"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle132525" cx="331.18564" cy="110.47058" r="0.86615855" transform="rotate(28.381823)"/>
</g>`;

const TngSeniorChiefPettyOfficerBorder: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:1.27689;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 86.671255,327.06801 37.848765,26.30097 1.97385,11.38044 -11.63655,16.74572 -10.99812,1.60609 -37.848761,-26.30101 z" id="path146349"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.567347px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.082511,329.35258 35.556519,24.70813 1.99554,10.48799 -10.58146,15.22738 -10.20158,1.32101 -35.55652,-24.70813 z" id="path146351"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 90.93378,333.51408 3.759237,2.61232 -3.740338,5.3825 2.445953,12.34199 -12.657591,2.35326 -3.443515,4.95535 -3.75921,-2.61228 4.096546,-5.89515 11.057496,-1.69151 -2.211367,-11.03865 z" id="path146353"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 98.964873,339.09489 3.759237,2.61229 -3.740307,5.38254 2.445957,12.34195 -12.657626,2.35329 -3.443484,4.95536 -3.759241,-2.61229 4.096549,-5.89518 11.057496,-1.69151 -2.211338,-11.03862 z" id="path146355"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 107.59404,345.09125 3.75924,2.61232 -3.74031,5.38254 2.44596,12.34193 -12.657625,2.35328 -3.443484,4.95536 -3.759244,-2.61226 4.096549,-5.89518 11.057494,-1.69151 -2.21133,-11.03868 z" id="path146357"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle146359" cx="299.89856" cy="228.69986" r="2.7622666" transform="rotate(34.795326)"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle146361" cx="306.19308" cy="237.43925" r="2.7622666" transform="rotate(34.795326)"/>
</g>`;

const TngChiefPettyOfficer: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#a1b7cc;stroke-width:0.400393;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 228.24801,242.35683 12.71512,6.86982 1.01368,3.47707 -3.03947,5.62565 -3.37082,0.88569 -12.71512,-6.86983 z" id="path132489"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.177902px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 228.45618,243.05431 11.94505,6.45377 0.98918,3.19822 -2.76388,5.11557 -3.1326,0.76896 -11.94505,-6.45377 z" id="path132497"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 229.80202,244.21616 1.2629,0.68234 -0.97698,1.80823 1.19447,3.76016 -3.86175,1.17664 -0.89945,1.66473 -1.26289,-0.68233 1.07002,-1.98045 3.38633,-0.91439 -1.07572,-3.36225 z" id="path132517"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 232.50003,245.67387 1.2629,0.68233 -0.97697,1.80824 1.19447,3.76015 -3.86176,1.17665 -0.89944,1.66473 -1.2629,-0.68233 1.07002,-1.98046 3.38633,-0.91439 -1.07571,-3.36224 z" id="path132519"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 235.39896,247.24012 1.2629,0.68234 -0.97697,1.80824 1.19447,3.76014 -3.86176,1.17665 -0.89944,1.66473 -1.2629,-0.68232 1.07002,-1.98046 3.38633,-0.91439 -1.07571,-3.36226 z" id="path132521"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="path132523" cx="329.21188" cy="107.73019" r="0.86615855" transform="rotate(28.381823)"/>
</g>`;

const TngChiefPettyOfficerBorder: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:1.27689;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 86.671255,327.06801 37.848765,26.30097 1.97385,11.38044 -11.63655,16.74572 -10.99812,1.60609 -37.848761,-26.30101 z" id="path146349"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.567347px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.082511,329.35258 35.556519,24.70813 1.99554,10.48799 -10.58146,15.22738 -10.20158,1.32101 -35.55652,-24.70813 z" id="path146351"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 90.93378,333.51408 3.759237,2.61232 -3.740338,5.3825 2.445953,12.34199 -12.657591,2.35326 -3.443515,4.95535 -3.75921,-2.61228 4.096546,-5.89515 11.057496,-1.69151 -2.211367,-11.03865 z" id="path146353"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 98.964873,339.09489 3.759237,2.61229 -3.740307,5.38254 2.445957,12.34195 -12.657626,2.35329 -3.443484,4.95536 -3.759241,-2.61229 4.096549,-5.89518 11.057496,-1.69151 -2.211338,-11.03862 z" id="path146355"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 107.59404,345.09125 3.75924,2.61232 -3.74031,5.38254 2.44596,12.34193 -12.657625,2.35328 -3.443484,4.95536 -3.759244,-2.61226 4.096549,-5.89518 11.057494,-1.69151 -2.21133,-11.03868 z" id="path146357"/>
    <circle style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle146359" cx="299.89856" cy="228.69986" r="2.7622666" transform="rotate(34.795326)"/>
</g>`;

const TngPettyOfficer1stClass: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#a1b7cc;stroke-width:0.400393;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 228.24801,242.35683 12.71512,6.86982 1.01368,3.47707 -3.03947,5.62565 -3.37082,0.88569 -12.71512,-6.86983 z" id="path132489"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.177902px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 228.45618,243.05431 11.94505,6.45377 0.98918,3.19822 -2.76388,5.11557 -3.1326,0.76896 -11.94505,-6.45377 z" id="path132497"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 229.80202,244.21616 1.2629,0.68234 -0.97698,1.80823 1.19447,3.76016 -3.86175,1.17664 -0.89945,1.66473 -1.26289,-0.68233 1.07002,-1.98045 3.38633,-0.91439 -1.07572,-3.36225 z" id="path132517"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 232.50003,245.67387 1.2629,0.68233 -0.97697,1.80824 1.19447,3.76015 -3.86176,1.17665 -0.89944,1.66473 -1.2629,-0.68233 1.07002,-1.98046 3.38633,-0.91439 -1.07571,-3.36224 z" id="path132519"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 235.39896,247.24012 1.2629,0.68234 -0.97697,1.80824 1.19447,3.76014 -3.86176,1.17665 -0.89944,1.66473 -1.2629,-0.68232 1.07002,-1.98046 3.38633,-0.91439 -1.07571,-3.36226 z" id="path132521"/>
</g>`;

const TngPettyOfficer1stClassBorder: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:1.27689;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 86.671255,327.06801 37.848765,26.30097 1.97385,11.38044 -11.63655,16.74572 -10.99812,1.60609 -37.848761,-26.30101 z" id="path146349"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.567347px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.082511,329.35258 35.556519,24.70813 1.99554,10.48799 -10.58146,15.22738 -10.20158,1.32101 -35.55652,-24.70813 z" id="path146351"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 90.93378,333.51408 3.759237,2.61232 -3.740338,5.3825 2.445953,12.34199 -12.657591,2.35326 -3.443515,4.95535 -3.75921,-2.61228 4.096546,-5.89515 11.057496,-1.69151 -2.211367,-11.03865 z" id="path146353"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 98.964873,339.09489 3.759237,2.61229 -3.740307,5.38254 2.445957,12.34195 -12.657626,2.35329 -3.443484,4.95536 -3.759241,-2.61229 4.096549,-5.89518 11.057496,-1.69151 -2.211338,-11.03862 z" id="path146355"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 107.59404,345.09125 3.75924,2.61232 -3.74031,5.38254 2.44596,12.34193 -12.657625,2.35328 -3.443484,4.95536 -3.759244,-2.61226 4.096549,-5.89518 11.057494,-1.69151 -2.21133,-11.03868 z" id="path146357"/>
</g>`;

const TngPettyOfficer2ndClass: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#a1b7cc;stroke-width:0.400393;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 228.24801,242.35683 12.71512,6.86982 1.01368,3.47707 -3.03947,5.62565 -3.37082,0.88569 -12.71512,-6.86983 z" id="path148999"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.177902px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 228.45618,243.05431 11.94505,6.45377 0.98918,3.19822 -2.76388,5.11557 -3.1326,0.76896 -11.94505,-6.45377 z" id="path149001"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 229.80202,244.21616 1.2629,0.68234 -0.97698,1.80823 1.19447,3.76016 -3.86175,1.17664 -0.89945,1.66473 -1.26289,-0.68233 1.07002,-1.98045 3.38633,-0.91439 -1.07572,-3.36225 z" id="path149003"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 232.50003,245.67387 1.2629,0.68233 -0.97697,1.80824 1.19447,3.76015 -3.86176,1.17665 -0.89944,1.66473 -1.2629,-0.68233 1.07002,-1.98046 3.38633,-0.91439 -1.07571,-3.36224 z" id="path149005"/>
</g>`;

const TngPettyOfficer2ndClassBorder: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:1.27689;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 86.671255,327.06801 37.848765,26.30097 1.97385,11.38044 -11.63655,16.74572 -10.99812,1.60609 -37.848761,-26.30101 z" id="path149013"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.567347px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.082511,329.35258 35.556519,24.70813 1.99554,10.48799 -10.58146,15.22738 -10.20158,1.32101 -35.55652,-24.70813 z" id="path149015"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 90.93378,333.51408 3.759237,2.61232 -3.740338,5.3825 2.445953,12.34199 -12.657591,2.35326 -3.443515,4.95535 -3.75921,-2.61228 4.096546,-5.89515 11.057496,-1.69151 -2.211367,-11.03865 z" id="path149017"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 98.964873,339.09489 3.759237,2.61229 -3.740307,5.38254 2.445957,12.34195 -12.657626,2.35329 -3.443484,4.95536 -3.759241,-2.61229 4.096549,-5.89518 11.057496,-1.69151 -2.211338,-11.03862 z" id="path149019"/>
</g>`;

const TngPettyOfficer3rdClass: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#a1b7cc;stroke-width:0.400393;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 228.24801,242.35683 12.71512,6.86982 1.01368,3.47707 -3.03947,5.62565 -3.37082,0.88569 -12.71512,-6.86983 z" id="path149076"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.177902px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 228.45618,243.05431 11.94505,6.45377 0.98918,3.19822 -2.76388,5.11557 -3.1326,0.76896 -11.94505,-6.45377 z" id="path149078"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.19248px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 229.80202,244.21616 1.2629,0.68234 -0.97698,1.80823 1.19447,3.76016 -3.86175,1.17664 -0.89945,1.66473 -1.26289,-0.68233 1.07002,-1.98045 3.38633,-0.91439 -1.07572,-3.36225 z" id="path149080"/>
</g>`;

const TngPettyOfficer3rdClassBorder: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:1.27689;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 86.671255,327.06801 37.848765,26.30097 1.97385,11.38044 -11.63655,16.74572 -10.99812,1.60609 -37.848761,-26.30101 z" id="path149064"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.567347px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.082511,329.35258 35.556519,24.70813 1.99554,10.48799 -10.58146,15.22738 -10.20158,1.32101 -35.55652,-24.70813 z" id="path149066"/>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.613838px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 90.93378,333.51408 3.759237,2.61232 -3.740338,5.3825 2.445953,12.34199 -12.657591,2.35326 -3.443515,4.95535 -3.75921,-2.61228 4.096546,-5.89515 11.057496,-1.69151 -2.211367,-11.03865 z" id="path149068"/>
</g>`;

const TngCrewman1st: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#a1b7cc;stroke-width:0.400393;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 228.24801,242.35683 12.71512,6.86982 1.01368,3.47707 -3.03947,5.62565 -3.37082,0.88569 -12.71512,-6.86983 z" id="path132489"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.177902px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 228.45618,243.05431 11.94505,6.45377 0.98918,3.19822 -2.76388,5.11557 -3.1326,0.76896 -11.94505,-6.45377 z" id="path132497"/>
    <path id="path150722" style="display:inline;fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.189247px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 229.30227,251.75692 -1.21518,2.33462 -1.24048,-0.6731 1.05554,-1.9453 -0.37078,-5.63871 1.14732,-2.11447 1.24049,0.6731 -0.96375,1.77615 z"/>
    <path id="path150724" style="display:inline;fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.189247px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 231.65464,253.03333 -1.21518,2.33462 -1.24048,-0.67309 1.05554,-1.94531 -0.37078,-5.63871 1.14732,-2.11446 1.24049,0.6731 -0.96375,1.77614 z"/>
    <path id="path150726" style="display:inline;fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.189247px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 234.04688,254.33138 -1.21518,2.33462 -1.24048,-0.6731 1.05554,-1.9453 -0.37078,-5.63871 1.14732,-2.11446 1.24049,0.67309 -0.96375,1.77615 z"/>
</g>`;

const TngCrewman1stBorder: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:1.27689;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 86.671255,327.06801 37.848765,26.30097 1.97385,11.38044 -11.63655,16.74572 -10.99812,1.60609 -37.848761,-26.30101 z" id="path146349"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.567347px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.082511,329.35258 35.556519,24.70813 1.99554,10.48799 -10.58146,15.22738 -10.20158,1.32101 -35.55652,-24.70813 z" id="path146351"/>
    <path id="path150684" style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.596538px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.859195,357.93478 -4.611423,6.89663 -3.655036,-2.53617 3.977177,-5.73176 0.779918,-17.79545 4.323022,-6.23018 3.655036,2.53617 -3.631338,5.23335 z"/>
    <path id="path150686" style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.596538px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 94.790355,362.74421 -4.611423,6.89663 -3.655036,-2.53618 3.977177,-5.73175 0.779918,-17.79546 4.323022,-6.23017 3.655036,2.53617 -3.631339,5.23335 z"/>
    <path id="path150688" style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.596538px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 101.83899,367.63515 -4.611425,6.89662 -3.655035,-2.53617 3.977177,-5.73175 0.779917,-17.79546 4.323026,-6.23018 3.65503,2.53618 -3.63134,5.23334 z"/>
</g>`;

const TngCrewman2nd: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#a1b7cc;stroke-width:0.400393;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 228.24801,242.35683 12.71512,6.86982 1.01368,3.47707 -3.03947,5.62565 -3.37082,0.88569 -12.71512,-6.86983 z" id="path151529"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.177902px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 228.45618,243.05431 11.94505,6.45377 0.98918,3.19822 -2.76388,5.11557 -3.1326,0.76896 -11.94505,-6.45377 z" id="path151531"/>
    <path id="path151533" style="display:inline;fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.189247px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 229.30227,251.75692 -1.21518,2.33462 -1.24048,-0.6731 1.05554,-1.9453 -0.37078,-5.63871 1.14732,-2.11447 1.24049,0.6731 -0.96375,1.77615 z"/>
    <path id="path151535" style="display:inline;fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.189247px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 231.65464,253.03333 -1.21518,2.33462 -1.24048,-0.67309 1.05554,-1.94531 -0.37078,-5.63871 1.14732,-2.11446 1.24049,0.6731 -0.96375,1.77614 z"/>
</g>`;

const TngCrewman2ndBorder: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:1.27689;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 86.671255,327.06801 37.848765,26.30097 1.97385,11.38044 -11.63655,16.74572 -10.99812,1.60609 -37.848761,-26.30101 z" id="path151515"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.567347px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.082511,329.35258 35.556519,24.70813 1.99554,10.48799 -10.58146,15.22738 -10.20158,1.32101 -35.55652,-24.70813 z" id="path151517"/>
    <path id="path151519" style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.596538px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.859195,357.93478 -4.611423,6.89663 -3.655036,-2.53617 3.977177,-5.73176 0.779918,-17.79545 4.323022,-6.23018 3.655036,2.53617 -3.631338,5.23335 z"/>
    <path id="path151521" style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.596538px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 94.790355,362.74421 -4.611423,6.89663 -3.655036,-2.53618 3.977177,-5.73175 0.779918,-17.79546 4.323022,-6.23017 3.655036,2.53617 -3.631339,5.23335 z"/>
</g>`;

const TngCrewman3rd: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#a1b7cc;stroke-width:0.400393;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 228.24801,242.35683 12.71512,6.86982 1.01368,3.47707 -3.03947,5.62565 -3.37082,0.88569 -12.71512,-6.86983 z" id="path152318"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.177902px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 228.45618,243.05431 11.94505,6.45377 0.98918,3.19822 -2.76388,5.11557 -3.1326,0.76896 -11.94505,-6.45377 z" id="path152320"/>
    <path id="path152322" style="display:inline;fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.189247px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 229.30227,251.75692 -1.21518,2.33462 -1.24048,-0.6731 1.05554,-1.9453 -0.37078,-5.63871 1.14732,-2.11447 1.24049,0.6731 -0.96375,1.77615 z"/>
</g>`;

const TngCrewman3rdBorder: string = `<g>
    <path style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:1.27689;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 86.671255,327.06801 37.848765,26.30097 1.97385,11.38044 -11.63655,16.74572 -10.99812,1.60609 -37.848761,-26.30101 z" id="path152306"/>
    <path style="fill:#383838;fill-opacity:1;stroke:#000000;stroke-width:0.567347px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.082511,329.35258 35.556519,24.70813 1.99554,10.48799 -10.58146,15.22738 -10.20158,1.32101 -35.55652,-24.70813 z" id="path152308"/>
    <path id="path152310" style="fill:#a1b7cc;fill-opacity:1;stroke:#000000;stroke-width:0.596538px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 87.859195,357.93478 -4.611423,6.89663 -3.655036,-2.53617 3.977177,-5.73176 0.779918,-17.79545 4.323022,-6.23018 3.655036,2.53617 -3.631338,5.23335 z"/>
</g>`;


const CollarPips = {

    ensign: `<g>
        <path id="path21" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 241.32226,251.30101 c -0.13398,-0.001 -0.26949,0.008 -0.40625,0.0273 -1.45878,0.20681 -2.47243,1.55489 -2.26562,3.01367 0.2068,1.45879 1.55489,2.47438 3.01367,2.26758 1.45878,-0.20681 2.47438,-1.55684 2.26758,-3.01563 -0.18742,-1.32202 -1.31416,-2.27907 -2.60938,-2.29296 z" />
        <path id="path22" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 241.41013,251.02172 c -0.15204,-0.002 -0.30574,0.009 -0.46093,0.0312 -1.65452,0.23455 -2.80682,1.76541 -2.57227,3.41993 0.23467,1.65535 1.76736,2.80681 3.42188,2.57226 1.65535,-0.23467 2.80693,-1.76652 2.57226,-3.42188 -0.21256,-1.4994 -1.4911,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62304 c 1.12831,0.0122 2.1102,0.84658 2.27344,1.99805 0.18012,1.27058 -0.70404,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18013,-1.27059 0.70403,-2.44683 1.9746,-2.62695 0.11912,-0.0169 0.23679,-0.0247 0.35352,-0.0234 z" />
    </g>`,

    lieutenantJG: `<g>
        <path id="path23" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 233.88281,248.25999 c -0.13398,-10e-4 -0.26949,0.008 -0.40625,0.0273 -1.45879,0.2068 -2.47243,1.55489 -2.26563,3.01367 0.20681,1.45879 1.55684,2.47439 3.01563,2.26758 1.45878,-0.2068 2.47243,-1.55684 2.26562,-3.01563 -0.18741,-1.32202 -1.31415,-2.27907 -2.60937,-2.29296 z m 7.43945,3.04102 c -0.13398,-0.001 -0.26949,0.008 -0.40625,0.0273 -1.45878,0.20681 -2.47243,1.55489 -2.26562,3.01367 0.2068,1.45879 1.55489,2.47438 3.01367,2.26758 1.45878,-0.20681 2.47438,-1.55684 2.26758,-3.01563 -0.18742,-1.32202 -1.31416,-2.27907 -2.60938,-2.29296 z" />
        <path id="path24" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 233.97069,247.9807 c -0.15206,-0.002 -0.30575,0.009 -0.46094,0.0312 -1.65452,0.23455 -2.80681,1.7654 -2.57226,3.41992 0.23467,1.65535 1.76735,2.80682 3.42187,2.57226 1.65535,-0.23467 2.80694,-1.76652 2.57227,-3.42187 -0.21257,-1.49941 -1.49111,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62305 c 1.1283,0.0122 2.1102,0.84658 2.27343,1.99804 0.18013,1.27058 -0.70403,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18012,-1.27057 0.70402,-2.44682 1.97461,-2.62694 0.11912,-0.0169 0.2368,-0.0247 0.35352,-0.0234 z m 7.53124,2.41797 c -0.15204,-0.002 -0.30574,0.009 -0.46093,0.0312 -1.65452,0.23455 -2.80682,1.76541 -2.57227,3.41993 0.23467,1.65535 1.76736,2.80681 3.42188,2.57226 1.65535,-0.23467 2.80693,-1.76652 2.57226,-3.42188 -0.21256,-1.4994 -1.4911,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62304 c 1.12831,0.0122 2.1102,0.84658 2.27344,1.99805 0.18012,1.27058 -0.70404,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18013,-1.27059 0.70403,-2.44683 1.9746,-2.62695 0.11912,-0.0169 0.23679,-0.0247 0.35352,-0.0234 z" />
        <circle style="display:inline;fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:0.7;stroke-miterlimit:10" id="circle24" cx="233.8329" cy="250.94164" r="1.2"/>
    </g>`,

    lieutenant: `<g>
        <path id="path19" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 233.88281,248.25999 c -0.13398,-10e-4 -0.26949,0.008 -0.40625,0.0273 -1.45879,0.2068 -2.47243,1.55489 -2.26563,3.01367 0.20681,1.45879 1.55684,2.47439 3.01563,2.26758 1.45878,-0.2068 2.47243,-1.55684 2.26562,-3.01563 -0.18741,-1.32202 -1.31415,-2.27907 -2.60937,-2.29296 z m 7.43945,3.04102 c -0.13398,-0.001 -0.26949,0.008 -0.40625,0.0273 -1.45878,0.20681 -2.47243,1.55489 -2.26562,3.01367 0.2068,1.45879 1.55489,2.47438 3.01367,2.26758 1.45878,-0.20681 2.47438,-1.55684 2.26758,-3.01563 -0.18742,-1.32202 -1.31416,-2.27907 -2.60938,-2.29296 z" />
        <path id="path20" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 233.97069,247.9807 c -0.15206,-0.002 -0.30575,0.009 -0.46094,0.0312 -1.65452,0.23455 -2.80681,1.7654 -2.57226,3.41992 0.23467,1.65535 1.76735,2.80682 3.42187,2.57226 1.65535,-0.23467 2.80694,-1.76652 2.57227,-3.42187 -0.21257,-1.49941 -1.49111,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62305 c 1.1283,0.0122 2.1102,0.84658 2.27343,1.99804 0.18013,1.27058 -0.70403,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18012,-1.27057 0.70402,-2.44682 1.97461,-2.62694 0.11912,-0.0169 0.2368,-0.0247 0.35352,-0.0234 z m 7.53124,2.41797 c -0.15204,-0.002 -0.30574,0.009 -0.46093,0.0312 -1.65452,0.23455 -2.80682,1.76541 -2.57227,3.41993 0.23467,1.65535 1.76736,2.80681 3.42188,2.57226 1.65535,-0.23467 2.80693,-1.76652 2.57226,-3.42188 -0.21256,-1.4994 -1.4911,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62304 c 1.12831,0.0122 2.1102,0.84658 2.27344,1.99805 0.18012,1.27058 -0.70404,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18013,-1.27059 0.70403,-2.44683 1.9746,-2.62695 0.11912,-0.0169 0.23679,-0.0247 0.35352,-0.0234 z"/>
    </g>`,

    ltCommander: `<g>
        <path id="path16" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 226.8418,245.11742 c -0.13399,-0.001 -0.26949,0.006 -0.40625,0.0254 -1.45879,0.2068 -2.47243,1.55684 -2.26563,3.01563 0.20681,1.45878 1.55489,2.47242 3.01368,2.26562 1.45878,-0.20681 2.47438,-1.55489 2.26757,-3.01367 -0.18742,-1.32203 -1.31415,-2.27907 -2.60937,-2.29297 z m 7.04101,3.14257 c -0.13398,-10e-4 -0.26949,0.008 -0.40625,0.0273 -1.45879,0.2068 -2.47243,1.55489 -2.26563,3.01367 0.20681,1.45879 1.55684,2.47439 3.01563,2.26758 1.45878,-0.2068 2.47243,-1.55684 2.26562,-3.01563 -0.18741,-1.32202 -1.31415,-2.27907 -2.60937,-2.29296 z m 7.43945,3.04102 c -0.13398,-0.001 -0.26949,0.008 -0.40625,0.0273 -1.45878,0.20681 -2.47243,1.55489 -2.26562,3.01367 0.2068,1.45879 1.55489,2.47438 3.01367,2.26758 1.45878,-0.20681 2.47438,-1.55684 2.26758,-3.01563 -0.18742,-1.32202 -1.31416,-2.27907 -2.60938,-2.29296 z" />
        <path id="path17" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 226.92968,244.83812 c -0.15205,-0.002 -0.30575,0.007 -0.46094,0.0293 -1.65452,0.23455 -2.80681,1.76735 -2.57226,3.42187 0.23467,1.65535 1.76735,2.80682 3.42187,2.57227 1.65535,-0.23467 2.80694,-1.76653 2.57227,-3.42188 -0.21257,-1.49941 -1.49111,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62109 c 1.12831,0.0122 2.1102,0.84659 2.27344,1.99805 0.18012,1.27058 -0.70403,2.44878 -1.97461,2.6289 -1.27059,0.18013 -2.44879,-0.70597 -2.62891,-1.97655 -0.18012,-1.27058 0.70598,-2.44684 1.97657,-2.62696 0.11911,-0.0169 0.23679,-0.0247 0.35351,-0.0234 z m 7.13281,2.52149 c -0.15206,-0.002 -0.30575,0.009 -0.46094,0.0312 -1.65452,0.23455 -2.80681,1.7654 -2.57226,3.41992 0.23467,1.65535 1.76735,2.80682 3.42187,2.57226 1.65535,-0.23467 2.80694,-1.76652 2.57227,-3.42187 -0.21257,-1.49941 -1.49111,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62305 c 1.1283,0.0122 2.1102,0.84658 2.27343,1.99804 0.18013,1.27058 -0.70403,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18012,-1.27057 0.70402,-2.44682 1.97461,-2.62694 0.11912,-0.0169 0.2368,-0.0247 0.35352,-0.0234 z m 7.53124,2.41797 c -0.15204,-0.002 -0.30574,0.009 -0.46093,0.0312 -1.65452,0.23455 -2.80682,1.76541 -2.57227,3.41993 0.23467,1.65535 1.76736,2.80681 3.42188,2.57226 1.65535,-0.23467 2.80693,-1.76652 2.57226,-3.42188 -0.21256,-1.4994 -1.4911,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62304 c 1.12831,0.0122 2.1102,0.84658 2.27344,1.99805 0.18012,1.27058 -0.70404,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18013,-1.27059 0.70403,-2.44683 1.9746,-2.62695 0.11912,-0.0169 0.23679,-0.0247 0.35352,-0.0234 z" />
        <circle style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:0.7;stroke-miterlimit:10" id="path18" cx="226.76183" cy="247.85312" r="1.2"/>
    </g>`,

    commander: `<g>
        <path id="path5" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 226.8418,245.11742 c -0.13399,-0.001 -0.26949,0.006 -0.40625,0.0254 -1.45879,0.2068 -2.47243,1.55684 -2.26563,3.01563 0.20681,1.45878 1.55489,2.47242 3.01368,2.26562 1.45878,-0.20681 2.47438,-1.55489 2.26757,-3.01367 -0.18742,-1.32203 -1.31415,-2.27907 -2.60937,-2.29297 z m 7.04101,3.14257 c -0.13398,-10e-4 -0.26949,0.008 -0.40625,0.0273 -1.45879,0.2068 -2.47243,1.55489 -2.26563,3.01367 0.20681,1.45879 1.55684,2.47439 3.01563,2.26758 1.45878,-0.2068 2.47243,-1.55684 2.26562,-3.01563 -0.18741,-1.32202 -1.31415,-2.27907 -2.60937,-2.29296 z m 7.43945,3.04102 c -0.13398,-0.001 -0.26949,0.008 -0.40625,0.0273 -1.45878,0.20681 -2.47243,1.55489 -2.26562,3.01367 0.2068,1.45879 1.55489,2.47438 3.01367,2.26758 1.45878,-0.20681 2.47438,-1.55684 2.26758,-3.01563 -0.18742,-1.32202 -1.31416,-2.27907 -2.60938,-2.29296 z" />
        <path id="path13" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 226.92968,244.83812 c -0.15205,-0.002 -0.30575,0.007 -0.46094,0.0293 -1.65452,0.23455 -2.80681,1.76735 -2.57226,3.42187 0.23467,1.65535 1.76735,2.80682 3.42187,2.57227 1.65535,-0.23467 2.80694,-1.76653 2.57227,-3.42188 -0.21257,-1.49941 -1.49111,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62109 c 1.12831,0.0122 2.1102,0.84659 2.27344,1.99805 0.18012,1.27058 -0.70403,2.44878 -1.97461,2.6289 -1.27059,0.18013 -2.44879,-0.70597 -2.62891,-1.97655 -0.18012,-1.27058 0.70598,-2.44684 1.97657,-2.62696 0.11911,-0.0169 0.23679,-0.0247 0.35351,-0.0234 z m 7.13281,2.52149 c -0.15206,-0.002 -0.30575,0.009 -0.46094,0.0312 -1.65452,0.23455 -2.80681,1.7654 -2.57226,3.41992 0.23467,1.65535 1.76735,2.80682 3.42187,2.57226 1.65535,-0.23467 2.80694,-1.76652 2.57227,-3.42187 -0.21257,-1.49941 -1.49111,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62305 c 1.1283,0.0122 2.1102,0.84658 2.27343,1.99804 0.18013,1.27058 -0.70403,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18012,-1.27057 0.70402,-2.44682 1.97461,-2.62694 0.11912,-0.0169 0.2368,-0.0247 0.35352,-0.0234 z m 7.53124,2.41797 c -0.15204,-0.002 -0.30574,0.009 -0.46093,0.0312 -1.65452,0.23455 -2.80682,1.76541 -2.57227,3.41993 0.23467,1.65535 1.76736,2.80681 3.42188,2.57226 1.65535,-0.23467 2.80693,-1.76652 2.57226,-3.42188 -0.21256,-1.4994 -1.4911,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62304 c 1.12831,0.0122 2.1102,0.84658 2.27344,1.99805 0.18012,1.27058 -0.70404,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18013,-1.27059 0.70403,-2.44683 1.9746,-2.62695 0.11912,-0.0169 0.23679,-0.0247 0.35352,-0.0234 z" />
    </g>`,

    captain: `<g>
        <path id="path22601" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 220.08008,241.77952 c -0.13398,-0.001 -0.26949,0.008 -0.40625,0.0273 -1.45879,0.2068 -2.47439,1.55683 -2.26758,3.01562 0.2068,1.45878 1.55683,2.47243 3.01562,2.26563 1.45878,-0.20681 2.47243,-1.55685 2.26563,-3.01563 -0.18742,-1.32203 -1.31221,-2.27907 -2.60742,-2.29297 z m 6.76172,3.3379 c -0.13399,-0.001 -0.26949,0.006 -0.40625,0.0254 -1.45879,0.2068 -2.47243,1.55684 -2.26563,3.01563 0.20681,1.45878 1.55489,2.47242 3.01368,2.26562 1.45878,-0.20681 2.47438,-1.55489 2.26757,-3.01367 -0.18742,-1.32203 -1.31415,-2.27907 -2.60937,-2.29297 z m 7.04101,3.14257 c -0.13398,-10e-4 -0.26949,0.008 -0.40625,0.0273 -1.45879,0.2068 -2.47243,1.55489 -2.26563,3.01367 0.20681,1.45879 1.55684,2.47439 3.01563,2.26758 1.45878,-0.2068 2.47243,-1.55684 2.26562,-3.01563 -0.18741,-1.32202 -1.31415,-2.27907 -2.60937,-2.29296 z m 7.43945,3.04102 c -0.13398,-0.001 -0.26949,0.008 -0.40625,0.0273 -1.45878,0.20681 -2.47243,1.55489 -2.26562,3.01367 0.2068,1.45879 1.55489,2.47438 3.01367,2.26758 1.45878,-0.20681 2.47438,-1.55684 2.26758,-3.01563 -0.18742,-1.32202 -1.31416,-2.27907 -2.60938,-2.29296 z"/>
        <path id="path22605" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.84482" d="m 220.16797,241.50023 c -0.15205,-0.002 -0.3077,0.009 -0.46289,0.0313 -1.65452,0.23455 -2.80486,1.7654 -2.57031,3.41992 0.23467,1.65535 1.7654,2.80682 3.41992,2.57226 1.65534,-0.23467 2.80694,-1.76652 2.57227,-3.42187 -0.21257,-1.49941 -1.48916,-2.58573 -2.95899,-2.60156 z m -0.0918,0.62305 c 1.1283,0.0122 2.11019,0.84658 2.27343,1.99804 0.18012,1.27058 -0.70598,2.44683 -1.97656,2.62695 -1.27059,0.18013 -2.44683,-0.70403 -2.62696,-1.9746 -0.18012,-1.27058 0.70403,-2.44683 1.97461,-2.62695 0.11912,-0.0169 0.23876,-0.0247 0.35547,-0.0234 z m 6.85351,2.71484 c -0.15205,-0.002 -0.30575,0.007 -0.46094,0.0293 -1.65452,0.23455 -2.80681,1.76735 -2.57226,3.42187 0.23467,1.65535 1.76735,2.80682 3.42187,2.57227 1.65535,-0.23467 2.80694,-1.76653 2.57227,-3.42188 -0.21257,-1.49941 -1.49111,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62109 c 1.12831,0.0122 2.1102,0.84659 2.27344,1.99805 0.18012,1.27058 -0.70403,2.44878 -1.97461,2.6289 -1.27059,0.18013 -2.44879,-0.70597 -2.62891,-1.97655 -0.18012,-1.27058 0.70598,-2.44684 1.97657,-2.62696 0.11911,-0.0169 0.23679,-0.0247 0.35351,-0.0234 z m 7.13281,2.52149 c -0.15206,-0.002 -0.30575,0.009 -0.46094,0.0312 -1.65452,0.23455 -2.80681,1.7654 -2.57226,3.41992 0.23467,1.65535 1.76735,2.80682 3.42187,2.57226 1.65535,-0.23467 2.80694,-1.76652 2.57227,-3.42187 -0.21257,-1.49941 -1.49111,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62305 c 1.1283,0.0122 2.1102,0.84658 2.27343,1.99804 0.18013,1.27058 -0.70403,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18012,-1.27057 0.70402,-2.44682 1.97461,-2.62694 0.11912,-0.0169 0.2368,-0.0247 0.35352,-0.0234 z m 7.53124,2.41797 c -0.15204,-0.002 -0.30574,0.009 -0.46093,0.0312 -1.65452,0.23455 -2.80682,1.76541 -2.57227,3.41993 0.23467,1.65535 1.76736,2.80681 3.42188,2.57226 1.65535,-0.23467 2.80693,-1.76652 2.57226,-3.42188 -0.21256,-1.4994 -1.4911,-2.58573 -2.96094,-2.60156 z m -0.0918,0.62304 c 1.12831,0.0122 2.1102,0.84658 2.27344,1.99805 0.18012,1.27058 -0.70404,2.44683 -1.97461,2.62695 -1.27058,0.18013 -2.44683,-0.70403 -2.62695,-1.97461 -0.18013,-1.27059 0.70403,-2.44683 1.9746,-2.62695 0.11912,-0.0169 0.23679,-0.0247 0.35352,-0.0234 z"/>
    </g>`,

    admiral: `<g>
        <path id="rect1" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:0.7;stroke-miterlimit:40" d="m 217.48045,240.35996 29.81245,13.36375 -3.20155,7.14218 -29.81245,-13.36374 z"/>
        <path id="path27070" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.888834" d="m 219.32517,243.15242 c -1.33772,0.18272 -2.27337,1.4164 -2.09065,2.75412 0.18272,1.33771 1.41471,2.2736 2.75244,2.09088 1.33771,-0.18272 2.27528,-1.41495 2.09255,-2.75267 -0.18272,-1.33772 -1.41662,-2.27505 -2.75434,-2.09233 z m 7.23197,3.24349 c -1.33772,0.18272 -2.27337,1.41639 -2.09065,2.75412 0.18272,1.33772 1.41494,2.27528 2.75267,2.09256 1.33772,-0.18272 2.27505,-1.41662 2.09233,-2.75434 -0.18272,-1.33773 -1.41663,-2.27506 -2.75435,-2.09234 z m 7.40361,3.32111 c -1.33773,0.18273 -2.27505,1.41664 -2.09233,2.75435 0.18272,1.33773 1.41638,2.27338 2.75412,2.09065 1.33771,-0.18271 2.2736,-1.4147 2.09088,-2.75243 -0.18272,-1.33772 -1.41496,-2.27529 -2.75267,-2.09257 z m 7.71026,3.45912 c -1.33772,0.18272 -2.27338,1.41638 -2.09065,2.75412 0.18272,1.33772 1.41471,2.27359 2.75243,2.09087 1.33772,-0.18272 2.27529,-1.41493 2.09257,-2.75265 -0.18273,-1.33774 -1.41664,-2.27506 -2.75435,-2.09234 z"/>
    </g>`,

    viceAdmiral: `<g>
        <path id="path5" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:0.7;stroke-miterlimit:40;stroke-dasharray:none" d="m 224.64414,243.62787 22.56353,10.05494 -3.17407,7.11397 -22.50355,-10.37679 z" />
        <path id="path6" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.884636" d="m 226.55859,246.42578 c -1.33108,0.18417 -2.26229,1.41306 -2.07812,2.74414 0.18417,1.33109 1.41305,2.2623 2.74414,2.07813 1.33108,-0.18417 2.2623,-1.41306 2.07813,-2.74414 -0.2054,-1.48453 -1.58274,-2.23882 -2.74415,-2.07813 z m 7.37305,3.29297 c -1.33109,0.18417 -2.26229,1.41305 -2.07812,2.74414 0.18417,1.33108 1.41304,2.26035 2.74414,2.07617 1.33107,-0.18417 2.26229,-1.41305 2.07812,-2.74414 -0.20565,-1.4863 -1.58284,-2.23685 -2.74414,-2.07617 z m 7.67969,3.42968 c -1.33108,0.18418 -2.26035,1.41306 -2.07617,2.74415 0.18417,1.33108 1.41306,2.26034 2.74414,2.07617 1.33108,-0.18417 2.26034,-1.41306 2.07617,-2.74414 -0.20567,-1.48642 -1.58298,-2.23684 -2.74414,-2.07618 z" />
    </g>`,

    rearAdmiral: `<g>
        <path id="path18" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:0.706982;stroke-miterlimit:40;stroke-dasharray:none" d="m 231.96588,246.92001 15.3157,6.81286 -3.2181,7.09763 -15.38775,-6.88777 z" />
        <path id="path19" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.891843" d="m 234.12148,249.66381 c -0.0927,0.002 -0.1857,0.009 -0.28012,0.0216 -1.34288,0.17867 -2.28818,1.41225 -2.10951,2.75513 0.17868,1.34287 1.41421,2.28818 2.75709,2.10951 1.34287,-0.17867 2.28622,-1.41423 2.10754,-2.7571 -0.16192,-1.21698 -1.19134,-2.10602 -2.38229,-2.12913 -0.0308,-7.1e-4 -0.0618,-6.3e-4 -0.0927,-2e-5 z m 7.72568,3.49769 c -0.0927,0.002 -0.18569,0.009 -0.28011,0.0216 -1.34288,0.17867 -2.28818,1.41223 -2.10951,2.75512 0.17867,1.34288 1.41421,2.28819 2.75709,2.10952 1.34287,-0.17867 2.28621,-1.41225 2.10754,-2.75513 -0.16192,-1.21698 -1.19135,-2.10799 -2.38229,-2.1311 -0.0308,-7.1e-4 -0.0618,-6.3e-4 -0.0927,-2e-5 z"/>
    </g>`
}

const BorderIndicator = {
    admiral: `<g>
        <rect style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="rect34812" width="123.12957" height="30.247999" x="198.5629" y="222.34625" rx="0" ry="0" transform="rotate(34.627047)"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="path40811" cx="111.18644" cy="365.93219" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="use40813" cx="69.152542" cy="336.27118" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="use40815" cx="90.169495" cy="351.01694" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="use40817" cx="48.135593" cy="321.52542" r="8.8999996"/>
    </g>`,

    viceAdmiral: `<g>
        <rect style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="rect13" width="91.35611" height="30.045582" x="230.33636" y="222.54866" rx="0" ry="0" transform="rotate(34.627047)"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle13" cx="111.18644" cy="365.93219" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle14" cx="69.152542" cy="336.27118" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle15" cx="90.169495" cy="351.01694" r="8.8999996"/>
    </g>`,

    rearAdmiral: `<g>
        <rect style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="rect16" width="70.543617" height="30.446129" x="251.14888" y="222.14812" rx="0" ry="0" transform="rotate(34.627047)"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle16" cx="111.18644" cy="365.93219" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle18" cx="90.169495" cy="351.01694" r="8.8999996"/>
    </g>`,

    captain: `<g>
        <path id="path40811" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
        <path id="use40813" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 70.869008,340.34397 a 8.8999996,8.8999996 0 0 1 -9.661258,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067224,9.66126 z"/>
        <path id="use40815" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 90.478817,356.9152 a 8.8999996,8.8999996 0 0 1 -9.661257,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067223,9.66126 z"/>
        <path id="use40817" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 51.25919,323.77278 a 8.8999996,8.8999996 0 0 1 -9.661258,8.06722 8.8999996,8.8999996 0 0 1 -8.067223,-9.66126 8.8999996,8.8999996 0 0 1 9.661257,-8.06722 8.8999996,8.8999996 0 0 1 8.067224,9.66126 z"/>
    </g>`,

    commander: `<g>
        <path id="path1" style="display:inline;fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
        <path id="path2" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 70.869008,340.34397 a 8.8999996,8.8999996 0 0 1 -9.661258,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067224,9.66126 z"/>
        <path id="path3" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 90.478817,356.9152 a 8.8999996,8.8999996 0 0 1 -9.661257,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067223,9.66126 z"/>
    </g>`,

    ltCommander: `<g>
        <path id="path8" style="display:inline;fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
        <path id="path9" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 70.869008,340.34397 a 8.8999996,8.8999996 0 0 1 -9.661258,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067224,9.66126 z"/>
        <path id="path10" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 90.478817,356.9152 a 8.8999996,8.8999996 0 0 1 -9.661257,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067223,9.66126 z"/>
        <path id="path11" style="fill:#000000;fill-rule:evenodd;stroke:none;stroke-width:1.25436;stroke-miterlimit:40;fill-opacity:1" d="m 66.452333,339.94685 a 4.4655076,4.4655076 0 0 1 -4.847463,4.04767 4.4655076,4.4655076 0 0 1 -4.047669,-4.84747 4.4655076,4.4655076 0 0 1 4.847463,-4.04767 4.4655076,4.4655076 0 0 1 4.047669,4.84747 z"/>
    </g>`,

    lieutenant: `<g>
        <path id="path4" style="display:inline;fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
        <path id="path6" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 90.478817,356.9152 a 8.8999996,8.8999996 0 0 1 -9.661257,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067223,9.66126 z"/>
    </g>`,

    lieutenantJG: `<g>
        <path id="path12" style="display:inline;fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
        <path id="path14" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 90.478817,356.9152 a 8.8999996,8.8999996 0 0 1 -9.661257,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067223,9.66126 z"/>
        <path id="path15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25436;stroke-miterlimit:40" d="m 86.062143,356.51808 a 4.4655076,4.4655076 0 0 1 -4.847463,4.04767 4.4655076,4.4655076 0 0 1 -4.047669,-4.84747 4.4655076,4.4655076 0 0 1 4.847463,-4.04767 4.4655076,4.4655076 0 0 1 4.047669,4.84747 z"/>
    </g>`,

    ensign: `<g>
        <path id="path7" style="display:inline;fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
    </g>`

}


export abstract class BaseTngEraUniformPack extends BaseNeckProvider {

    readonly era: UniformEra;

    constructor(era: UniformEra) {
        super();
        this.era = era;
    }

    protected getEnlistedRankSwatches() {
        return [
            new Swatch(Rank.Crewman3rdClass, "Crewman 3rd Class", (token) => RankIndicatorCatalog.decorateSwatch(TngCrewman3rd, Rank.Crewman3rdClass, token), "Rank.crewman3rdClass.name"),
            new Swatch(Rank.Crewman2ndClass, "Crewman 2nd Class", (token) => RankIndicatorCatalog.decorateSwatch(TngCrewman2nd, Rank.Crewman2ndClass, token), "Rank.crewman2ndClass.name"),
            new Swatch(Rank.Crewman1stClass, "Crewman 1st Class", (token) => RankIndicatorCatalog.decorateSwatch(TngCrewman1st, Rank.Crewman1stClass, token), "Rank.crewman1stClass.name"),
            new Swatch(Rank.PettyOfficer3rdClass, "Petty Officer 3rd Class", (token) => RankIndicatorCatalog.decorateSwatch(TngPettyOfficer3rdClass, Rank.PettyOfficer3rdClass, token), "Rank.pettyOfficer3rdClass.name"),
            new Swatch(Rank.PettyOfficer2ndClass, "Petty Officer 2nd Class", (token) => RankIndicatorCatalog.decorateSwatch(TngPettyOfficer2ndClass, Rank.PettyOfficer2ndClass, token), "Rank.pettyOfficer2ndClass.name"),
            new Swatch(Rank.PettyOfficer1stClass, "Petty Officer 1st Class", (token) => RankIndicatorCatalog.decorateSwatch(TngPettyOfficer1stClass, Rank.PettyOfficer1stClass, token), "Rank.pettyOfficer1stClass.name"),
            new Swatch(Rank.ChiefPettyOfficer, "Chief Petty Officer", (token) => RankIndicatorCatalog.decorateSwatch(TngChiefPettyOfficer, Rank.ChiefPettyOfficer, token), "Rank.chiefPettyOfficer.name"),
            new Swatch(Rank.SeniorChiefPettyOfficer, "Senior Chief Petty Officer", (token) => RankIndicatorCatalog.decorateSwatch(TngSeniorChiefPettyOfficer, Rank.SeniorChiefPettyOfficer, token), "Rank.seniorChiefPettyOfficer.name"),
            new Swatch(Rank.MasterChiefPettyOfficer, "Master Chief Petty Officer", (token) => RankIndicatorCatalog.decorateSwatch(TngMasterChiefPettyOfficer, Rank.MasterChiefPettyOfficer, token), "Rank.masterChiefPettyOfficer.name")
        ]
    }

    protected getFlagOfficerRankSwatches() {
        return [
            new Swatch(Rank.RearAdmiral, "Rear Admiral", (token) => RankIndicatorCatalog.decorateSwatch(CollarPips.rearAdmiral, Rank.RearAdmiral, token), "Rank.rearAdmiral.name"),
            new Swatch(Rank.ViceAdmiral, "Vice Admiral", (token) => RankIndicatorCatalog.decorateSwatch(CollarPips.viceAdmiral, Rank.ViceAdmiral, token), "Rank.viceAdmiral.name"),
            new Swatch(Rank.Admiral, "Admiral", (token) => RankIndicatorCatalog.decorateSwatch(CollarPips.admiral, Rank.Admiral, token), "Rank.admiral.name"),
        ];
    }

    getRankSwatches() {
        let result = [
            new Swatch(Rank.None, "None", (token) => RankIndicatorCatalog.decorateSwatch("", Rank.None, token), "Rank.none.name"),
            new Swatch(Rank.Ensign, "Ensign", (token) => RankIndicatorCatalog.decorateSwatch(CollarPips.ensign, Rank.Ensign, token), "Rank.ensign.name"),
            new Swatch(Rank.LieutenantJG, "Lieutenant J.G.", (token) => RankIndicatorCatalog.decorateSwatch(CollarPips.lieutenantJG, Rank.LieutenantJG, token), "Rank.lieutenantJG.name"),
            new Swatch(Rank.Lieutenant, "Lieutenant", (token) => RankIndicatorCatalog.decorateSwatch(CollarPips.lieutenant, Rank.Lieutenant, token), "Rank.lieutenant.name"),
            new Swatch(Rank.LtCommander, "Lt. Commander", (token) => RankIndicatorCatalog.decorateSwatch(CollarPips.ltCommander, Rank.LtCommander, token), "Rank.ltCommander.name"),
            new Swatch(Rank.Commander, "Commander", (token) => RankIndicatorCatalog.decorateSwatch(CollarPips.commander, Rank.Commander, token), "Rank.commander.name"),
            new Swatch(Rank.Captain, "Captain", (token) => RankIndicatorCatalog.decorateSwatch(CollarPips.captain, Rank.Captain, token), "Rank.captain.name"),

        ];
        result.push(...this.getEnlistedRankSwatches());
        result.push(...this.getFlagOfficerRankSwatches());

        return result.filter(s => UniformVariantRestrictions.isRankSupported(s.id as Rank, this.era));
    }

    getRankBorderIndicator(token: Token) {
        switch (token.rankIndicator) {
            case Rank.Ensign:
                return BorderIndicator.ensign;
            case Rank.LieutenantJG:
                return BorderIndicator.lieutenantJG;
            case Rank.Lieutenant:
                return BorderIndicator.lieutenant;
            case Rank.LtCommander:
                return BorderIndicator.ltCommander;
            case Rank.Commander:
                return BorderIndicator.commander;
            case Rank.Captain:
                return BorderIndicator.captain;
            case Rank.RearAdmiral:
                return BorderIndicator.rearAdmiral;
            case Rank.ViceAdmiral:
                return BorderIndicator.viceAdmiral;
            case Rank.Admiral:
                return BorderIndicator.admiral;
            case Rank.Crewman3rdClass:
                return TngCrewman3rdBorder;
            case Rank.Crewman2ndClass:
                return TngCrewman2ndBorder;
            case Rank.Crewman1stClass:
                return TngCrewman1stBorder;
            case Rank.PettyOfficer3rdClass:
                return TngPettyOfficer3rdClassBorder;
            case Rank.PettyOfficer2ndClass:
                return TngPettyOfficer2ndClassBorder;
            case Rank.PettyOfficer1stClass:
                return TngPettyOfficer1stClassBorder;
            case Rank.ChiefPettyOfficer:
                return TngChiefPettyOfficerBorder;
            case Rank.SeniorChiefPettyOfficer:
                return TngSeniorChiefPettyOfficerBorder;
            case Rank.MasterChiefPettyOfficer:
                return TngMasterChiefPettyOfficerBorder;
            default:
                return "";
        }
    }

    getRankIndicator(token: Token): string {
        switch (token.rankIndicator) {
            case Rank.Ensign:
                return CollarPips.ensign;
            case Rank.LieutenantJG:
                return CollarPips.lieutenantJG;
            case Rank.Lieutenant:
                return CollarPips.lieutenant;
            case Rank.LtCommander:
                return CollarPips.ltCommander;
            case Rank.Commander:
                return CollarPips.commander;
            case Rank.Captain:
                return CollarPips.captain;
            case Rank.RearAdmiral:
                return CollarPips.rearAdmiral;
            case Rank.ViceAdmiral:
                return CollarPips.viceAdmiral;
            case Rank.Admiral:
                return CollarPips.admiral;

            case Rank.Crewman3rdClass:
                return TngCrewman3rd;
            case Rank.Crewman2ndClass:
                return TngCrewman2nd;
            case Rank.Crewman1stClass:
                return TngCrewman1st;
            case Rank.PettyOfficer3rdClass:
                return TngPettyOfficer3rdClass;
            case Rank.PettyOfficer2ndClass:
                return TngPettyOfficer2ndClass;
            case Rank.PettyOfficer1stClass:
                return TngPettyOfficer1stClass;
            case Rank.ChiefPettyOfficer:
                return TngChiefPettyOfficer;
            case Rank.SeniorChiefPettyOfficer:
                return TngSeniorChiefPettyOfficer;
            case Rank.MasterChiefPettyOfficer:
                return TngMasterChiefPettyOfficer;

            default:
                return "";
        }
    }

    isAdmiralty(token: Token) {
        switch (token.rankIndicator) {
            case Rank.Admiral:
            case Rank.ViceAdmiral:
            case Rank.RearAdmiral:
            case Rank.Commodore:
                return true;
            default:
                return false;
        }
    }

    getRankBorderDefinitions(token: Token, bordered: boolean) {
        return "";
    }


    getBorderColor(token: Token) {
        return token.divisionColor;
    }

    getBorderLogo(token: Token): string {
        return DominionWarCommbadge;
    }

    isDivisionColorSupported(token: Token): boolean {
        return true;
    }
}