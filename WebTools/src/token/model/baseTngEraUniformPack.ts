import { Rank } from '../../helpers/ranks';
import { BaseNeckProvider } from './baseNeckProvider';
import RankIndicatorCatalog from './rankIndicatorCatalog';
import Swatch from './swatch';
import { TokenModel } from './tokenModel';
import { UniformEra } from './uniformEra';
import UniformVariantRestrictions from './uniformVariantRestrictions';

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

export const CollarPips = {
  CadetFourthClass: `<g>
        <path style="baseline-shift:baseline;display:inline;overflow:visible;vector-effect:none;fill:#111111;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:20;enable-background:accumulate;stop-color:#000000" d="m 241.4375,250.57422 c -1.43276,0 -2.58594,1.15318 -2.58594,2.58594 v 5.63281 c 0,1.43276 1.15318,2.58594 2.58594,2.58594 1.43276,0 2.58594,-1.15318 2.58594,-2.58594 v -5.63281 c 0,-1.43276 -1.15318,-2.58594 -2.58594,-2.58594 z" />
        <path style="baseline-shift:baseline;display:inline;overflow:visible;vector-effect:none;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:20;enable-background:accumulate;stop-color:#000000" d="m 241.4375,250.17383 c -1.64744,0 -2.98633,1.33889 -2.98633,2.98633 v 5.63281 c 0,1.64744 1.48257,3.13001 3.13001,3.13001 1.64744,0 2.98633,-1.33889 2.98633,-2.98633 v -5.63281 c 0,-1.64744 -1.48257,-3.13001 -3.13001,-3.13001 z m 0,0.80078 c 1.21808,0 2.18555,0.96747 2.18555,2.18555 v 5.63281 c 0,1.21807 -0.96747,2.18555 -2.18555,2.18555 -1.21808,0 -2.1875,-0.96748 -2.1875,-2.18555 v -5.63281 c 0,-1.21808 0.96942,-2.18555 2.1875,-2.18555 z" />
    </g>`,

  CadetThirdClass: `<g>
        <path style="baseline-shift:baseline;display:inline;overflow:visible;vector-effect:none;fill:#111111;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:20;enable-background:accumulate;stop-color:#000000" d="m 234.89258,248.87305 c -1.43276,0 -2.58594,1.15317 -2.58594,2.58593 v 5.63282 c 0,1.43276 1.15318,2.58593 2.58594,2.58593 1.43276,0 2.58594,-1.15317 2.58594,-2.58593 v -5.63282 c 0,-1.43276 -1.15318,-2.58593 -2.58594,-2.58593 z m 6.54492,1.70117 c -1.43276,0 -2.58594,1.15318 -2.58594,2.58594 v 5.63281 c 0,1.43276 1.15318,2.58594 2.58594,2.58594 1.43276,0 2.58594,-1.15318 2.58594,-2.58594 v -5.63281 c 0,-1.43276 -1.15318,-2.58594 -2.58594,-2.58594 z" />
        <path style="baseline-shift:baseline;display:inline;overflow:visible;vector-effect:none;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:20;enable-background:accumulate;stop-color:#000000" d="m 234.89394,248.47181 c -1.64744,0 -2.98633,1.33889 -2.98633,2.98633 v 5.63281 c 0,1.64744 1.48257,3.13001 3.13001,3.13001 1.64744,0 2.98633,-1.33889 2.98633,-2.98633 v -5.63281 c 0,-1.64744 -1.48257,-3.13001 -3.13001,-3.13001 z m 0,0.80078 c 1.21808,0 2.18555,0.96747 2.18555,2.18555 v 5.63281 c 0,1.21807 -0.96747,2.18555 -2.18555,2.18555 -1.21808,0 -2.1875,-0.96748 -2.1875,-2.18555 v -5.63281 c 0,-1.21808 0.96942,-2.18555 2.1875,-2.18555 z m 6.54356,0.90124 c -1.64744,0 -2.98633,1.33889 -2.98633,2.98633 v 5.63281 c 0,1.64744 1.48257,3.13001 3.13001,3.13001 1.64744,0 2.98633,-1.33889 2.98633,-2.98633 v -5.63281 c 0,-1.64744 -1.48257,-3.13001 -3.13001,-3.13001 z m 0,0.80078 c 1.21808,0 2.18555,0.96747 2.18555,2.18555 v 5.63281 c 0,1.21807 -0.96747,2.18555 -2.18555,2.18555 -1.21808,0 -2.1875,-0.96748 -2.1875,-2.18555 v -5.63281 c 0,-1.21808 0.96942,-2.18555 2.1875,-2.18555 z" />
    </g>`,

  CadetSecondClass: `<g>
        <path style="baseline-shift:baseline;display:inline;overflow:visible;vector-effect:none;fill:#111111;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:20;enable-background:accumulate;stop-color:#000000" d="m 228.47266,246.92188 c -1.43276,0 -2.58594,1.15317 -2.58594,2.58593 v 5.63281 c 0,1.43277 1.15318,2.58594 2.58594,2.58594 1.43276,0 2.58593,-1.15317 2.58593,-2.58594 v -5.63281 c 0,-1.43276 -1.15317,-2.58593 -2.58593,-2.58593 z m 6.41992,1.95117 c -1.43276,0 -2.58594,1.15317 -2.58594,2.58593 v 5.63282 c 0,1.43276 1.15318,2.58593 2.58594,2.58593 1.43276,0 2.58594,-1.15317 2.58594,-2.58593 v -5.63282 c 0,-1.43276 -1.15318,-2.58593 -2.58594,-2.58593 z m 6.54492,1.70117 c -1.43276,0 -2.58594,1.15318 -2.58594,2.58594 v 5.63281 c 0,1.43276 1.15318,2.58594 2.58594,2.58594 1.43276,0 2.58594,-1.15318 2.58594,-2.58594 v -5.63281 c 0,-1.43276 -1.15318,-2.58594 -2.58594,-2.58594 z" />
        <path style="baseline-shift:baseline;display:inline;overflow:visible;vector-effect:none;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:20;enable-background:accumulate;stop-color:#000000" d="m 228.47309,246.52117 c -1.64744,0 -2.98633,1.33889 -2.98633,2.98633 v 5.63281 c 0,1.64744 1.48257,3.13001 3.13001,3.13001 1.64744,0 2.98633,-1.33889 2.98633,-2.98633 v -5.63281 c 0,-1.64744 -1.48257,-3.13001 -3.13001,-3.13001 z m 0,0.80078 c 1.21808,0 2.18555,0.96747 2.18555,2.18555 v 5.63281 c 0,1.21807 -0.96747,2.18555 -2.18555,2.18555 -1.21808,0 -2.1875,-0.96748 -2.1875,-2.18555 v -5.63281 c 0,-1.21808 0.96942,-2.18555 2.1875,-2.18555 z m 6.42085,1.14986 c -1.64744,0 -2.98633,1.33889 -2.98633,2.98633 v 5.63281 c 0,1.64744 1.48257,3.13001 3.13001,3.13001 1.64744,0 2.98633,-1.33889 2.98633,-2.98633 v -5.63281 c 0,-1.64744 -1.48257,-3.13001 -3.13001,-3.13001 z m 0,0.80078 c 1.21808,0 2.18555,0.96747 2.18555,2.18555 v 5.63281 c 0,1.21807 -0.96747,2.18555 -2.18555,2.18555 -1.21808,0 -2.1875,-0.96748 -2.1875,-2.18555 v -5.63281 c 0,-1.21808 0.96942,-2.18555 2.1875,-2.18555 z m 6.54356,0.90124 c -1.64744,0 -2.98633,1.33889 -2.98633,2.98633 v 5.63281 c 0,1.64744 1.48257,3.13001 3.13001,3.13001 1.64744,0 2.98633,-1.33889 2.98633,-2.98633 v -5.63281 c 0,-1.64744 -1.48257,-3.13001 -3.13001,-3.13001 z m 0,0.80078 c 1.21808,0 2.18555,0.96747 2.18555,2.18555 v 5.63281 c 0,1.21807 -0.96747,2.18555 -2.18555,2.18555 -1.21808,0 -2.1875,-0.96748 -2.1875,-2.18555 v -5.63281 c 0,-1.21808 0.96942,-2.18555 2.1875,-2.18555 z" />
    </g>`,

  CadetFirstClass: `<g>
        <path style="baseline-shift:baseline;display:inline;overflow:visible;vector-effect:none;fill:#111111;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:20;enable-background:accumulate;stop-color:#000000" d="M 222.13281 244.40234 C 220.70005 244.40234 219.54688 245.55552 219.54688 246.98828 L 219.54688 252.62109 C 219.54687 254.05385 220.70005 255.20703 222.13281 255.20703 C 223.56557 255.20703 224.71875 254.05385 224.71875 252.62109 L 224.71875 246.98828 C 224.71875 245.55552 223.56557 244.40234 222.13281 244.40234 z M 228.47266 246.92188 C 227.0399 246.92188 225.88672 248.07505 225.88672 249.50781 L 225.88672 255.14062 C 225.88672 256.57339 227.0399 257.72656 228.47266 257.72656 C 229.90542 257.72656 231.05859 256.57339 231.05859 255.14062 L 231.05859 249.50781 C 231.05859 248.07505 229.90542 246.92188 228.47266 246.92188 z M 234.89258 248.87305 C 233.45982 248.87305 232.30664 250.02622 232.30664 251.45898 L 232.30664 257.0918 C 232.30664 258.52456 233.45982 259.67773 234.89258 259.67773 C 236.32534 259.67773 237.47852 258.52456 237.47852 257.0918 L 237.47852 251.45898 C 237.47852 250.02622 236.32534 248.87305 234.89258 248.87305 z M 241.4375 250.57422 C 240.00474 250.57422 238.85156 251.7274 238.85156 253.16016 L 238.85156 258.79297 C 238.85156 260.22573 240.00474 261.37891 241.4375 261.37891 C 242.87026 261.37891 244.02344 260.22573 244.02344 258.79297 L 244.02344 253.16016 C 244.02344 251.7274 242.87026 250.57422 241.4375 250.57422 z "/>
        <path style="baseline-shift:baseline;display:inline;overflow:visible;vector-effect:none;fill-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:20;enable-background:accumulate;stop-color:#000000;fill:#111111;fill-opacity:1" d="m 222.13351,244.00159 c -1.64744,0 -2.98633,1.33889 -2.98633,2.98633 v 5.63281 c 0,1.64744 1.48257,3.13001 3.13001,3.13001 1.64744,0 2.98633,-1.33889 2.98633,-2.98633 v -5.63281 c 0,-1.64744 -1.48257,-3.13001 -3.13001,-3.13001 z m 0,0.80078 c 1.21808,0 2.18555,0.96747 2.18555,2.18555 v 5.63281 c 0,1.21807 -0.96747,2.18555 -2.18555,2.18555 -1.21808,0 -2.1875,-0.96748 -2.1875,-2.18555 v -5.63281 c 0,-1.21808 0.96942,-2.18555 2.1875,-2.18555 z m 6.33958,1.7188 c -1.64744,0 -2.98633,1.33889 -2.98633,2.98633 v 5.63281 c 0,1.64744 1.48257,3.13001 3.13001,3.13001 1.64744,0 2.98633,-1.33889 2.98633,-2.98633 v -5.63281 c 0,-1.64744 -1.48257,-3.13001 -3.13001,-3.13001 z m 0,0.80078 c 1.21808,0 2.18555,0.96747 2.18555,2.18555 v 5.63281 c 0,1.21807 -0.96747,2.18555 -2.18555,2.18555 -1.21808,0 -2.1875,-0.96748 -2.1875,-2.18555 v -5.63281 c 0,-1.21808 0.96942,-2.18555 2.1875,-2.18555 z m 6.42085,1.14986 c -1.64744,0 -2.98633,1.33889 -2.98633,2.98633 v 5.63281 c 0,1.64744 1.48257,3.13001 3.13001,3.13001 1.64744,0 2.98633,-1.33889 2.98633,-2.98633 v -5.63281 c 0,-1.64744 -1.48257,-3.13001 -3.13001,-3.13001 z m 0,0.80078 c 1.21808,0 2.18555,0.96747 2.18555,2.18555 v 5.63281 c 0,1.21807 -0.96747,2.18555 -2.18555,2.18555 -1.21808,0 -2.1875,-0.96748 -2.1875,-2.18555 v -5.63281 c 0,-1.21808 0.96942,-2.18555 2.1875,-2.18555 z m 6.54356,0.90124 c -1.64744,0 -2.98633,1.33889 -2.98633,2.98633 v 5.63281 c 0,1.64744 1.48257,3.13001 3.13001,3.13001 1.64744,0 2.98633,-1.33889 2.98633,-2.98633 v -5.63281 c 0,-1.64744 -1.48257,-3.13001 -3.13001,-3.13001 z m 0,0.80078 c 1.21808,0 2.18555,0.96747 2.18555,2.18555 v 5.63281 c 0,1.21807 -0.96747,2.18555 -2.18555,2.18555 -1.21808,0 -2.1875,-0.96748 -2.1875,-2.18555 v -5.63281 c 0,-1.21808 0.96942,-2.18555 2.1875,-2.18555 z"/>
    </g>`,

  ensign: `<g>
        <path id="path31" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="m 241.90119,250.5246 c -0.1588,-0.001 -0.31942,0.009 -0.48151,0.0324 -1.72906,0.24512 -2.93052,1.84297 -2.68539,3.57203 0.24512,1.72907 1.84297,2.93282 3.57203,2.68771 1.72905,-0.24514 2.93282,-1.84529 2.6877,-3.57436 -0.22214,-1.56696 -1.55764,-2.70132 -3.09283,-2.71779 z" />
        <path id="path32" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="m 242.00586,250.19336 c -0.18021,-0.002 -0.36294,0.0108 -0.54688,0.0371 -1.96106,0.27801 -3.32683,2.09166 -3.04882,4.05273 0.27814,1.96204 2.09558,3.32683 4.05664,3.04883 1.96206,-0.27816 3.32698,-2.09263 3.04882,-4.05469 -0.25193,-1.7772 -1.76759,-3.06522 -3.50976,-3.08398 z m -0.10938,0.73828 c 1.33735,0.0144 2.50183,1.00434 2.69532,2.36914 0.21349,1.50599 -0.83583,2.89979 -2.3418,3.11328 -1.50599,0.21351 -2.89979,-0.83384 -3.11328,-2.33984 -0.2135,-1.506 0.83387,-2.90174 2.33984,-3.11524 0.1412,-0.02 0.28155,-0.0287 0.41992,-0.0273 z" />
    </g>`,

  lieutenantJG: `<g>
        <path id="path27" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="m 233.08339,246.92014 c -0.1588,-0.001 -0.31942,0.009 -0.48152,0.0324 -1.72907,0.24512 -2.93051,1.84297 -2.68539,3.57203 0.24512,1.72906 1.84528,2.93283 3.57436,2.6877 1.72904,-0.24511 2.9305,-1.84527 2.68538,-3.57435 -0.22214,-1.56696 -1.55763,-2.70133 -3.09283,-2.71779 z m 8.8178,3.60446 c -0.1588,-0.001 -0.31942,0.009 -0.48151,0.0324 -1.72906,0.24512 -2.93052,1.84297 -2.68539,3.57203 0.24512,1.72907 1.84297,2.93282 3.57203,2.68771 1.72905,-0.24514 2.93282,-1.84529 2.6877,-3.57436 -0.22214,-1.56696 -1.55764,-2.70132 -3.09283,-2.71779 z" />
        <path id="path28" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="M 233.1875 246.58984 C 233.00727 246.58784 232.82457 246.60065 232.64062 246.62695 C 230.67956 246.90495 229.31379 248.71863 229.5918 250.67969 C 229.86994 252.64173 231.68738 254.00654 233.64844 253.72852 C 235.61049 253.45038 236.97543 251.63393 236.69727 249.67188 C 236.44532 247.89466 234.92966 246.60861 233.1875 246.58984 z M 233.07812 247.32812 C 234.41547 247.34252 235.57997 248.33051 235.77344 249.69531 C 235.98694 251.20129 234.93958 252.59509 233.43359 252.80859 C 231.9276 253.02209 230.53185 251.97473 230.31836 250.46875 C 230.10487 248.96277 231.15416 247.56896 232.66016 247.35547 C 232.80135 247.33547 232.93977 247.32663 233.07812 247.32812 z M 233.11133 248.67188 A 1.45 1.45 0 0 0 231.66016 250.12305 A 1.45 1.45 0 0 0 233.11133 251.57227 A 1.45 1.45 0 0 0 234.56055 250.12305 A 1.45 1.45 0 0 0 233.11133 248.67188 z M 242.00586 250.19336 C 241.82565 250.19136 241.64292 250.20417 241.45898 250.23047 C 239.49792 250.50848 238.13215 252.32213 238.41016 254.2832 C 238.6883 256.24524 240.50574 257.61003 242.4668 257.33203 C 244.42886 257.05387 245.79378 255.2394 245.51562 253.27734 C 245.26369 251.50014 243.74803 250.21212 242.00586 250.19336 z M 241.89648 250.93164 C 243.23383 250.94604 244.39831 251.93598 244.5918 253.30078 C 244.80529 254.80677 243.75597 256.20057 242.25 256.41406 C 240.74401 256.62757 239.35021 255.58022 239.13672 254.07422 C 238.92322 252.56822 239.97059 251.17248 241.47656 250.95898 C 241.61776 250.93898 241.75811 250.93024 241.89648 250.93164 z "/>
    </g>`,

  lieutenant: `<g>
        <path id="path29" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="m 233.08339,246.92014 c -0.1588,-0.001 -0.31942,0.009 -0.48152,0.0324 -1.72907,0.24512 -2.93051,1.84297 -2.68539,3.57203 0.24512,1.72906 1.84528,2.93283 3.57436,2.6877 1.72904,-0.24511 2.9305,-1.84527 2.68538,-3.57435 -0.22214,-1.56696 -1.55763,-2.70133 -3.09283,-2.71779 z m 8.8178,3.60446 c -0.1588,-0.001 -0.31942,0.009 -0.48151,0.0324 -1.72906,0.24512 -2.93052,1.84297 -2.68539,3.57203 0.24512,1.72907 1.84297,2.93282 3.57203,2.68771 1.72905,-0.24514 2.93282,-1.84529 2.6877,-3.57436 -0.22214,-1.56696 -1.55764,-2.70132 -3.09283,-2.71779 z" />
        <path id="path30" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="m 233.1875,246.58984 c -0.18023,-0.002 -0.36293,0.0108 -0.54688,0.0371 -1.96106,0.278 -3.32683,2.09168 -3.04882,4.05274 0.27814,1.96204 2.09558,3.32685 4.05664,3.04883 1.96205,-0.27814 3.32699,-2.09459 3.04883,-4.05664 -0.25195,-1.77722 -1.76761,-3.06327 -3.50977,-3.08204 z m -0.10938,0.73828 c 1.33735,0.0144 2.50185,1.00239 2.69532,2.36719 0.2135,1.50598 -0.83386,2.89978 -2.33985,3.11328 -1.50599,0.2135 -2.90174,-0.83386 -3.11523,-2.33984 -0.21349,-1.50598 0.8358,-2.89979 2.3418,-3.11328 0.14119,-0.02 0.27961,-0.0288 0.41796,-0.0273 z m 8.92774,2.86524 c -0.18021,-0.002 -0.36294,0.0108 -0.54688,0.0371 -1.96106,0.27801 -3.32683,2.09166 -3.04882,4.05273 0.27814,1.96204 2.09558,3.32683 4.05664,3.04883 1.96206,-0.27816 3.32698,-2.09263 3.04882,-4.05469 -0.25193,-1.7772 -1.76759,-3.06522 -3.50976,-3.08398 z m -0.10938,0.73828 c 1.33735,0.0144 2.50183,1.00434 2.69532,2.36914 0.21349,1.50599 -0.83583,2.89979 -2.3418,3.11328 -1.50599,0.21351 -2.89979,-0.83384 -3.11328,-2.33984 -0.2135,-1.506 0.83387,-2.90174 2.33984,-3.11524 0.1412,-0.02 0.28155,-0.0287 0.41992,-0.0273 z" />
    </g>`,

  ltCommander: `<g>
        <path id="path5" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="m 224.73785,243.19534 c -0.15882,-10e-4 -0.31941,0.007 -0.48152,0.0301 -1.72906,0.24511 -2.93051,1.84529 -2.68539,3.57436 0.24512,1.72905 1.84298,2.93049 3.57204,2.68538 1.72906,-0.24513 2.93282,-1.84297 2.6877,-3.57203 -0.22215,-1.56698 -1.55763,-2.70133 -3.09283,-2.7178 z m 8.34554,3.7248 c -0.1588,-0.001 -0.31942,0.009 -0.48152,0.0324 -1.72907,0.24512 -2.93051,1.84297 -2.68539,3.57203 0.24512,1.72906 1.84528,2.93283 3.57436,2.6877 1.72904,-0.24511 2.9305,-1.84527 2.68538,-3.57435 -0.22214,-1.56696 -1.55763,-2.70133 -3.09283,-2.71779 z m 8.8178,3.60446 c -0.1588,-0.001 -0.31942,0.009 -0.48151,0.0324 -1.72906,0.24512 -2.93052,1.84297 -2.68539,3.57203 0.24512,1.72907 1.84297,2.93282 3.57203,2.68771 1.72905,-0.24514 2.93282,-1.84529 2.6877,-3.57436 -0.22214,-1.56696 -1.55764,-2.70132 -3.09283,-2.71779 z" />
        <path id="path13" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="M 224.8418 242.86523 C 224.66158 242.86323 224.47887 242.87174 224.29492 242.89844 C 222.33387 243.17644 220.9681 244.99402 221.24609 246.95508 C 221.52425 248.91714 223.34166 250.28192 225.30273 250.00391 C 227.26477 249.72577 228.6297 247.90931 228.35156 245.94727 C 228.0996 244.17005 226.58396 242.88399 224.8418 242.86523 z M 224.73242 243.59961 C 226.06978 243.61401 227.23423 244.60395 227.42773 245.96875 C 227.64121 247.47473 226.59388 248.87049 225.08789 249.08398 C 223.5819 249.29749 222.18419 248.24817 221.9707 246.74219 C 221.75721 245.2362 222.80845 243.84239 224.31445 243.62891 C 224.45562 243.60891 224.59407 243.59811 224.73242 243.59961 z M 224.7207 244.9375 A 1.45 1.45 0 0 0 223.26953 246.38672 A 1.45 1.45 0 0 0 224.7207 247.83789 A 1.45 1.45 0 0 0 226.16992 246.38672 A 1.45 1.45 0 0 0 224.7207 244.9375 z M 233.1875 246.58984 C 233.00727 246.58784 232.82457 246.60065 232.64062 246.62695 C 230.67956 246.90495 229.31379 248.71863 229.5918 250.67969 C 229.86994 252.64173 231.68738 254.00654 233.64844 253.72852 C 235.61049 253.45038 236.97543 251.63392 236.69727 249.67188 C 236.44532 247.89466 234.92966 246.60861 233.1875 246.58984 z M 233.07812 247.32812 C 234.41547 247.34252 235.57997 248.33051 235.77344 249.69531 C 235.98694 251.20129 234.93958 252.59509 233.43359 252.80859 C 231.9276 253.02209 230.53185 251.97473 230.31836 250.46875 C 230.10487 248.96277 231.15416 247.56896 232.66016 247.35547 C 232.80135 247.33547 232.93977 247.32662 233.07812 247.32812 z M 242.00586 250.19336 C 241.82565 250.19136 241.64292 250.20417 241.45898 250.23047 C 239.49792 250.50848 238.13215 252.32213 238.41016 254.2832 C 238.6883 256.24524 240.50574 257.61003 242.4668 257.33203 C 244.42886 257.05387 245.79378 255.2394 245.51562 253.27734 C 245.26369 251.50014 243.74803 250.21212 242.00586 250.19336 z M 241.89648 250.93164 C 243.23383 250.94604 244.39831 251.93598 244.5918 253.30078 C 244.80529 254.80677 243.75597 256.20057 242.25 256.41406 C 240.74401 256.62757 239.35021 255.58022 239.13672 254.07422 C 238.92322 252.56822 239.97059 251.17248 241.47656 250.95898 C 241.61776 250.93898 241.75811 250.93024 241.89648 250.93164 z "/>
    </g>`,

  commander: `<g>
        <path id="path25" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="m 224.73785,243.19534 c -0.15882,-10e-4 -0.31941,0.007 -0.48152,0.0301 -1.72906,0.24511 -2.93051,1.84529 -2.68539,3.57436 0.24512,1.72905 1.84298,2.93049 3.57204,2.68538 1.72906,-0.24513 2.93282,-1.84297 2.6877,-3.57203 -0.22215,-1.56698 -1.55763,-2.70133 -3.09283,-2.7178 z m 8.34554,3.7248 c -0.1588,-0.001 -0.31942,0.009 -0.48152,0.0324 -1.72907,0.24512 -2.93051,1.84297 -2.68539,3.57203 0.24512,1.72906 1.84528,2.93283 3.57436,2.6877 1.72904,-0.24511 2.9305,-1.84527 2.68538,-3.57435 -0.22214,-1.56696 -1.55763,-2.70133 -3.09283,-2.71779 z m 8.8178,3.60446 c -0.1588,-0.001 -0.31942,0.009 -0.48151,0.0324 -1.72906,0.24512 -2.93052,1.84297 -2.68539,3.57203 0.24512,1.72907 1.84297,2.93282 3.57203,2.68771 1.72905,-0.24514 2.93282,-1.84529 2.6877,-3.57436 -0.22214,-1.56696 -1.55764,-2.70132 -3.09283,-2.71779 z" />
        <path id="path26" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="m 224.84201,242.86429 c -0.18022,-0.002 -0.36239,0.008 -0.54634,0.0347 -1.96105,0.278 -3.32683,2.09479 -3.04884,4.05585 0.27816,1.96206 2.0948,3.32686 4.05587,3.04885 1.96204,-0.27814 3.32699,-2.09382 3.04885,-4.05586 -0.25196,-1.77722 -1.76738,-3.06481 -3.50954,-3.08357 z m -0.1088,0.73616 c 1.33736,0.0144 2.50116,1.00344 2.69466,2.36824 0.21348,1.50598 -0.83448,2.90248 -2.34047,3.11597 -1.50599,0.21351 -2.90249,-0.83677 -3.11598,-2.34275 -0.21349,-1.50599 0.83678,-2.90019 2.34278,-3.11367 0.14117,-0.02 0.28066,-0.0293 0.41901,-0.0278 z m 8.45434,2.98866 c -0.18023,-0.002 -0.36239,0.0106 -0.54634,0.0369 -1.96106,0.278 -3.32684,2.09249 -3.04883,4.05355 0.27814,1.96204 2.09479,3.32685 4.05585,3.04883 1.96205,-0.27814 3.32701,-2.0938 3.04885,-4.05585 -0.25195,-1.77722 -1.76737,-3.0648 -3.50953,-3.08357 z m -0.1088,0.73849 c 1.33735,0.0144 2.50117,1.00343 2.69464,2.36823 0.2135,1.50598 -0.83447,2.90016 -2.34046,3.11366 -1.50599,0.2135 -2.90017,-0.83448 -3.11366,-2.34046 -0.21349,-1.50598 0.83446,-2.90016 2.34046,-3.11365 0.14119,-0.02 0.28067,-0.0293 0.41902,-0.0278 z m 8.92659,2.86596 c -0.18021,-0.002 -0.36239,0.0106 -0.54633,0.0369 -1.96106,0.27801 -3.32685,2.09249 -3.04884,4.05356 0.27814,1.96204 2.0948,3.32684 4.05586,3.04884 1.96206,-0.27816 3.32699,-2.09382 3.04884,-4.05588 -0.25194,-1.7772 -1.76736,-3.0648 -3.50953,-3.08356 z m -0.1088,0.73847 c 1.33735,0.0144 2.50116,1.00344 2.69465,2.36824 0.21349,1.50599 -0.83449,2.90017 -2.34046,3.11366 -1.50599,0.21351 -2.90017,-0.83446 -3.11366,-2.34046 -0.2135,-1.506 0.83447,-2.90016 2.34044,-3.11366 0.1412,-0.02 0.28066,-0.0292 0.41903,-0.0278 z" />
    </g>`,

  captain: `<g>
        <path id="path22601" style="fill:#fbb03b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="m 216.72335,239.239 c -0.1588,-0.001 -0.31942,0.009 -0.48152,0.0323 -1.72907,0.24511 -2.93283,1.84528 -2.6877,3.57434 0.24511,1.72906 1.84527,2.93051 3.57434,2.68539 1.72906,-0.24512 2.9305,-1.84529 2.68539,-3.57435 -0.22214,-1.56697 -1.55532,-2.70132 -3.09051,-2.71779 z m 8.0145,3.95634 c -0.15882,-10e-4 -0.31941,0.007 -0.48152,0.0301 -1.72906,0.24511 -2.93051,1.84529 -2.68539,3.57436 0.24512,1.72905 1.84298,2.93049 3.57204,2.68538 1.72906,-0.24513 2.93282,-1.84297 2.6877,-3.57203 -0.22215,-1.56698 -1.55763,-2.70133 -3.09283,-2.7178 z m 8.34554,3.7248 c -0.1588,-0.001 -0.31942,0.009 -0.48152,0.0324 -1.72907,0.24512 -2.93051,1.84297 -2.68539,3.57203 0.24512,1.72906 1.84528,2.93283 3.57436,2.6877 1.72904,-0.24511 2.9305,-1.84527 2.68538,-3.57435 -0.22214,-1.56696 -1.55763,-2.70133 -3.09283,-2.71779 z m 8.8178,3.60446 c -0.1588,-0.001 -0.31942,0.009 -0.48151,0.0324 -1.72906,0.24512 -2.93052,1.84297 -2.68539,3.57203 0.24512,1.72907 1.84297,2.93282 3.57203,2.68771 1.72905,-0.24514 2.93282,-1.84529 2.6877,-3.57436 -0.22214,-1.56696 -1.55764,-2.70132 -3.09283,-2.71779 z"/>
        <path id="path22605" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.00134" d="m 216.82752,238.90797 c -0.18021,-0.002 -0.36471,0.0106 -0.54865,0.037 -1.96106,0.27801 -3.32453,2.09249 -3.04652,4.05355 0.27815,1.96204 2.09248,3.32685 4.05355,3.04884 1.96202,-0.27815 3.32699,-2.09381 3.04885,-4.05586 -0.25196,-1.77721 -1.76507,-3.0648 -3.50723,-3.08356 z m -0.1088,0.73849 c 1.33735,0.0144 2.50115,1.00342 2.69464,2.36822 0.21349,1.50599 -0.83679,2.90017 -2.34277,3.11367 -1.506,0.21349 -2.90017,-0.83448 -3.11367,-2.34045 -0.21349,-1.50599 0.83447,-2.90017 2.34045,-3.11366 0.1412,-0.02 0.283,-0.0293 0.42134,-0.0278 z m 8.12329,3.21783 c -0.18022,-0.002 -0.36239,0.008 -0.54634,0.0347 -1.96105,0.278 -3.32683,2.09479 -3.04884,4.05585 0.27816,1.96206 2.0948,3.32686 4.05587,3.04885 1.96204,-0.27814 3.32699,-2.09382 3.04885,-4.05586 -0.25196,-1.77722 -1.76738,-3.06481 -3.50954,-3.08357 z m -0.1088,0.73616 c 1.33736,0.0144 2.50116,1.00344 2.69466,2.36824 0.21348,1.50598 -0.83448,2.90248 -2.34047,3.11597 -1.50599,0.21351 -2.90249,-0.83677 -3.11598,-2.34275 -0.21349,-1.50599 0.83678,-2.90019 2.34278,-3.11367 0.14117,-0.02 0.28066,-0.0293 0.41901,-0.0278 z m 8.45434,2.98866 c -0.18023,-0.002 -0.36239,0.0106 -0.54634,0.0369 -1.96106,0.278 -3.32684,2.09249 -3.04883,4.05355 0.27814,1.96204 2.09479,3.32685 4.05585,3.04883 1.96205,-0.27814 3.32701,-2.0938 3.04885,-4.05585 -0.25195,-1.77722 -1.76737,-3.0648 -3.50953,-3.08357 z m -0.1088,0.73849 c 1.33735,0.0144 2.50117,1.00343 2.69464,2.36823 0.2135,1.50598 -0.83447,2.90016 -2.34046,3.11366 -1.50599,0.2135 -2.90017,-0.83448 -3.11366,-2.34046 -0.21349,-1.50598 0.83446,-2.90016 2.34046,-3.11365 0.14119,-0.02 0.28067,-0.0293 0.41902,-0.0278 z m 8.92659,2.86596 c -0.18021,-0.002 -0.36239,0.0106 -0.54633,0.0369 -1.96106,0.27801 -3.32685,2.09249 -3.04884,4.05356 0.27814,1.96204 2.0948,3.32684 4.05586,3.04884 1.96206,-0.27816 3.32699,-2.09382 3.04884,-4.05588 -0.25194,-1.7772 -1.76736,-3.0648 -3.50953,-3.08356 z m -0.1088,0.73847 c 1.33735,0.0144 2.50116,1.00344 2.69465,2.36824 0.21349,1.50599 -0.83449,2.90017 -2.34046,3.11366 -1.50599,0.21351 -2.90017,-0.83446 -3.11366,-2.34046 -0.2135,-1.506 0.83447,-2.90016 2.34044,-3.11366 0.1412,-0.02 0.28066,-0.0292 0.41903,-0.0278 z"/>
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
    </g>`,
};

const BorderIndicator = {
  CadetFourthClass: `<g>
        <rect style="display:inline;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.8;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" id="rect48" width="17.011497" height="33.103447" x="157.04794" y="328.94186" ry="8.5057487" transform="rotate(10.105961)"/>
        <path id="path48" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 110.79703,355.80387 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <path id="path49" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 110.79703,355.80387 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
    </g>`,

  CadetThirdClass: `<g>
        <rect style="display:inline;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.8;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" id="rect43" width="17.011497" height="33.103447" x="157.04794" y="328.94186" ry="8.5057487" transform="rotate(10.105961)"/>
        <path id="path43" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 110.79703,355.80387 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <path id="path44" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 110.79703,355.80387 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <rect style="display:inline;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.8;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" id="rect44" width="17.011497" height="33.103447" x="137.75018" y="320.23898" ry="8.5057487" transform="rotate(10.105961)"/>
        <path id="path45" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 93.325766,343.84985 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <path id="path46" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 93.325766,343.84985 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
    </g>`,

  CadetSecondClass: `<g>
        <rect style="display:inline;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.8;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" id="rect35" width="17.011497" height="33.103447" x="157.04794" y="328.94186" ry="8.5057487" transform="rotate(10.105961)"/>
        <path id="path36" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 110.79703,355.80387 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <path id="path37" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 110.79703,355.80387 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <rect style="display:inline;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.8;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" id="rect37" width="17.011497" height="33.103447" x="137.75018" y="320.23898" ry="8.5057487" transform="rotate(10.105961)"/>
        <path id="path38" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 93.325766,343.84985 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <path id="path39" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 93.325766,343.84985 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <rect style="display:inline;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.8;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" id="rect39" width="17.011497" height="33.103447" x="118.78405" y="310.77646" ry="8.5057487" transform="rotate(10.105961)"/>
        <path id="path40" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 76.314272,331.20617 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <path id="path41" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 76.314272,331.20617 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
    </g>`,

  CadetFirstClass: `<g>
        <rect style="display:inline;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.8;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" id="rect18" width="17.011497" height="33.103447" x="157.04794" y="328.94186" ry="8.5057487" transform="rotate(10.105961)"/>
        <path id="rect22" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 110.79703,355.80387 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <path id="path23" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 110.79703,355.80387 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <rect style="display:inline;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.8;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" id="rect23" width="17.011497" height="33.103447" x="137.75018" y="320.23898" ry="8.5057487" transform="rotate(10.105961)"/>
        <path id="path24" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 93.325766,343.84985 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <path id="path25" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 93.325766,343.84985 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <rect style="display:inline;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.8;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" id="rect25" width="17.011497" height="33.103447" x="118.78405" y="310.77646" ry="8.5057487" transform="rotate(10.105961)"/>
        <path id="path26" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 76.314272,331.20617 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <path id="path27" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 76.314272,331.20617 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38485 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <rect style="display:inline;fill:#111111;fill-opacity:1;fill-rule:evenodd;stroke:#000000;stroke-width:0.8;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" id="rect27" width="17.011497" height="33.103447" x="98.986534" y="297.9595" ry="8.5057487" transform="rotate(10.105961)"/>
        <path id="path28" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 59.072893,315.11421 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38484 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
        <path id="path29" style="fill:#ffffff;fill-opacity:0.5;fill-rule:evenodd;stroke:none;stroke-width:0.821181;stroke-linejoin:round;stroke-miterlimit:20;stroke-dasharray:none;stroke-opacity:1" d="m 59.072893,315.11421 c 1.285,1.82319 1.86453,4.13603 1.43787,6.50863 l -2.91198,16.18876 c -0.85253,4.74069 -5.38854,7.87653 -10.171767,7.03158 -2.178603,-0.38484 -4.021997,-1.52764 -5.302363,-3.10563 1.282557,1.81973 3.267464,3.15459 5.656798,3.57666 4.783222,0.84495 9.321232,-2.29289 10.173772,-7.03356 l 2.90997,-16.18876 c 0.46422,-2.58146 -0.26157,-5.09113 -1.7923,-6.97768 z"/>
    </g>`,

  Admiral: `<g>
        <rect style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="rect34812" width="123.12957" height="30.247999" x="198.5629" y="222.34625" rx="0" ry="0" transform="rotate(34.627047)"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="path40811" cx="111.18644" cy="365.93219" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="use40813" cx="69.152542" cy="336.27118" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="use40815" cx="90.169495" cy="351.01694" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="use40817" cx="48.135593" cy="321.52542" r="8.8999996"/>
    </g>`,

  ViceAdmiral: `<g>
        <rect style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="rect13" width="91.35611" height="30.045582" x="230.33636" y="222.54866" rx="0" ry="0" transform="rotate(34.627047)"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle13" cx="111.18644" cy="365.93219" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle14" cx="69.152542" cy="336.27118" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle15" cx="90.169495" cy="351.01694" r="8.8999996"/>
    </g>`,

  RearAdmiral: `<g>
        <rect style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="rect16" width="70.543617" height="30.446129" x="251.14888" y="222.14812" rx="0" ry="0" transform="rotate(34.627047)"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle16" cx="111.18644" cy="365.93219" r="8.8999996"/>
        <circle style="fill:#fbb03b;fill-opacity:1;fill-rule:evenodd;stroke:#fbb03b;stroke-width:2;stroke-miterlimit:40;stroke-dasharray:none;stroke-opacity:1" id="circle18" cx="90.169495" cy="351.01694" r="8.8999996"/>
    </g>`,

  Captain: `<g>
        <path id="path40811" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
        <path id="use40813" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 70.869008,340.34397 a 8.8999996,8.8999996 0 0 1 -9.661258,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067224,9.66126 z"/>
        <path id="use40815" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 90.478817,356.9152 a 8.8999996,8.8999996 0 0 1 -9.661257,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067223,9.66126 z"/>
        <path id="use40817" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 51.25919,323.77278 a 8.8999996,8.8999996 0 0 1 -9.661258,8.06722 8.8999996,8.8999996 0 0 1 -8.067223,-9.66126 8.8999996,8.8999996 0 0 1 9.661257,-8.06722 8.8999996,8.8999996 0 0 1 8.067224,9.66126 z"/>
    </g>`,

  Commander: `<g>
        <path id="path1" style="display:inline;fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
        <path id="path2" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 70.869008,340.34397 a 8.8999996,8.8999996 0 0 1 -9.661258,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067224,9.66126 z"/>
        <path id="path3" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 90.478817,356.9152 a 8.8999996,8.8999996 0 0 1 -9.661257,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067223,9.66126 z"/>
    </g>`,

  LtCommander: `<g>
        <path id="path8" style="display:inline;fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
        <path id="path9" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 70.869008,340.34397 a 8.8999996,8.8999996 0 0 1 -9.661258,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067224,9.66126 z"/>
        <path id="path10" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 90.478817,356.9152 a 8.8999996,8.8999996 0 0 1 -9.661257,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067223,9.66126 z"/>
        <path id="path11" style="fill:#000000;fill-rule:evenodd;stroke:none;stroke-width:1.25436;stroke-miterlimit:40;fill-opacity:1" d="m 66.452333,339.94685 a 4.4655076,4.4655076 0 0 1 -4.847463,4.04767 4.4655076,4.4655076 0 0 1 -4.047669,-4.84747 4.4655076,4.4655076 0 0 1 4.847463,-4.04767 4.4655076,4.4655076 0 0 1 4.047669,4.84747 z"/>
    </g>`,

  Lieutenant: `<g>
        <path id="path4" style="display:inline;fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
        <path id="path6" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 90.478817,356.9152 a 8.8999996,8.8999996 0 0 1 -9.661257,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067223,9.66126 z"/>
    </g>`,

  LieutenantJG: `<g>
        <path id="path12" style="display:inline;fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
        <path id="path14" style="fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 90.478817,356.9152 a 8.8999996,8.8999996 0 0 1 -9.661257,8.06722 8.8999996,8.8999996 0 0 1 -8.067224,-9.66126 8.8999996,8.8999996 0 0 1 9.661258,-8.06722 8.8999996,8.8999996 0 0 1 8.067223,9.66126 z"/>
        <path id="path15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.25436;stroke-miterlimit:40" d="m 86.062143,356.51808 a 4.4655076,4.4655076 0 0 1 -4.847463,4.04767 4.4655076,4.4655076 0 0 1 -4.047669,-4.84747 4.4655076,4.4655076 0 0 1 4.847463,-4.04767 4.4655076,4.4655076 0 0 1 4.047669,4.84747 z"/>
    </g>`,

  Ensign: `<g>
        <path id="path7" style="display:inline;fill:#fbb03b;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-miterlimit:40" d="m 110.16301,373.54921 a 8.8999996,8.8999996 0 0 1 -9.66126,8.06722 8.8999996,8.8999996 0 0 1 -8.06722,-9.66126 8.8999996,8.8999996 0 0 1 9.66126,-8.06722 8.8999996,8.8999996 0 0 1 8.06722,9.66126 z"/>
    </g>`,
};

export abstract class BaseTngEraUniformPack extends BaseNeckProvider {
  readonly era: UniformEra;

  constructor(era: UniformEra) {
    super();
    this.era = era;
  }

  protected getEnlistedRankSwatches() {
    return [
      new Swatch(
        Rank.Crewman3rdClass,
        'Crewman 3rd Class',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            TngCrewman3rd,
            Rank.Crewman3rdClass,
            token,
          ),
        'Rank.crewman3rdClass.name',
      ),
      new Swatch(
        Rank.Crewman2ndClass,
        'Crewman 2nd Class',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            TngCrewman2nd,
            Rank.Crewman2ndClass,
            token,
          ),
        'Rank.crewman2ndClass.name',
      ),
      new Swatch(
        Rank.Crewman1stClass,
        'Crewman 1st Class',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            TngCrewman1st,
            Rank.Crewman1stClass,
            token,
          ),
        'Rank.crewman1stClass.name',
      ),
      new Swatch(
        Rank.PettyOfficer3rdClass,
        'Petty Officer 3rd Class',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            TngPettyOfficer3rdClass,
            Rank.PettyOfficer3rdClass,
            token,
          ),
        'Rank.pettyOfficer3rdClass.name',
      ),
      new Swatch(
        Rank.PettyOfficer2ndClass,
        'Petty Officer 2nd Class',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            TngPettyOfficer2ndClass,
            Rank.PettyOfficer2ndClass,
            token,
          ),
        'Rank.pettyOfficer2ndClass.name',
      ),
      new Swatch(
        Rank.PettyOfficer1stClass,
        'Petty Officer 1st Class',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            TngPettyOfficer1stClass,
            Rank.PettyOfficer1stClass,
            token,
          ),
        'Rank.pettyOfficer1stClass.name',
      ),
      new Swatch(
        Rank.ChiefPettyOfficer,
        'Chief Petty Officer',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            TngChiefPettyOfficer,
            Rank.ChiefPettyOfficer,
            token,
          ),
        'Rank.chiefPettyOfficer.name',
      ),
      new Swatch(
        Rank.SeniorChiefPettyOfficer,
        'Senior Chief Petty Officer',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            TngSeniorChiefPettyOfficer,
            Rank.SeniorChiefPettyOfficer,
            token,
          ),
        'Rank.seniorChiefPettyOfficer.name',
      ),
      new Swatch(
        Rank.MasterChiefPettyOfficer,
        'Master Chief Petty Officer',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            TngMasterChiefPettyOfficer,
            Rank.MasterChiefPettyOfficer,
            token,
          ),
        'Rank.masterChiefPettyOfficer.name',
      ),
    ];
  }

  protected getCadetRankSwatches() {
    return [
      new Swatch(
        Rank.CadetFourthClass,
        'Cadet 4th Class',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.CadetFourthClass,
            Rank.CadetFourthClass,
            token,
          ),
        'Rank.cadetFourthClass.name',
      ),
      new Swatch(
        Rank.CadetThirdClass,
        'Cadet 3rd Class',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.CadetThirdClass,
            Rank.CadetThirdClass,
            token,
          ),
        'Rank.cadetThirdClass.name',
      ),
      new Swatch(
        Rank.CadetSecondClass,
        'Cadet 4th Class',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.CadetSecondClass,
            Rank.CadetSecondClass,
            token,
          ),
        'Rank.cadetSecondClass.name',
      ),
      new Swatch(
        Rank.CadetFirstClass,
        'Cadet 4th Class',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.CadetFirstClass,
            Rank.CadetFirstClass,
            token,
          ),
        'Rank.cadetFirstClass.name',
      ),
    ];
  }

  protected getFlagOfficerRankSwatches() {
    return [
      new Swatch(
        Rank.RearAdmiral,
        'Rear Admiral',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.rearAdmiral,
            Rank.RearAdmiral,
            token,
          ),
        'Rank.rearAdmiral.name',
      ),
      new Swatch(
        Rank.ViceAdmiral,
        'Vice Admiral',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.viceAdmiral,
            Rank.ViceAdmiral,
            token,
          ),
        'Rank.viceAdmiral.name',
      ),
      new Swatch(
        Rank.Admiral,
        'Admiral',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.admiral,
            Rank.Admiral,
            token,
          ),
        'Rank.admiral.name',
      ),
    ];
  }

  getRankSwatches() {
    let result = [
      new Swatch(
        Rank.None,
        'None',
        (token) => RankIndicatorCatalog.decorateSwatch('', Rank.None, token),
        'Rank.none.name',
      ),
      new Swatch(
        Rank.Ensign,
        'Ensign',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.ensign,
            Rank.Ensign,
            token,
          ),
        'Rank.ensign.name',
      ),
      new Swatch(
        Rank.LieutenantJG,
        'Lieutenant J.G.',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.lieutenantJG,
            Rank.LieutenantJG,
            token,
          ),
        'Rank.lieutenantJG.name',
      ),
      new Swatch(
        Rank.Lieutenant,
        'Lieutenant',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.lieutenant,
            Rank.Lieutenant,
            token,
          ),
        'Rank.lieutenant.name',
      ),
      new Swatch(
        Rank.LtCommander,
        'Lt. Commander',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.ltCommander,
            Rank.LtCommander,
            token,
          ),
        'Rank.ltCommander.name',
      ),
      new Swatch(
        Rank.Commander,
        'Commander',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.commander,
            Rank.Commander,
            token,
          ),
        'Rank.commander.name',
      ),
      new Swatch(
        Rank.Captain,
        'Captain',
        (token) =>
          RankIndicatorCatalog.decorateSwatch(
            CollarPips.captain,
            Rank.Captain,
            token,
          ),
        'Rank.captain.name',
      ),
    ];
    result.push(...this.getCadetRankSwatches());
    result.push(...this.getEnlistedRankSwatches());
    result.push(...this.getFlagOfficerRankSwatches());

    return result.filter((s) =>
      UniformVariantRestrictions.isRankSupported(s.id as Rank, this.era),
    );
  }

  getRankBorderIndicator(token: TokenModel) {
    switch (token.rankIndicator) {
      case Rank.CadetFourthClass:
      case Rank.CadetThirdClass:
      case Rank.CadetSecondClass:
      case Rank.CadetFirstClass:
      case Rank.Ensign:
      case Rank.LieutenantJG:
      case Rank.Lieutenant:
      case Rank.LtCommander:
      case Rank.Commander:
      case Rank.Captain:
      case Rank.RearAdmiral:
      case Rank.ViceAdmiral:
      case Rank.Admiral: {
        const rankAsString = Rank[token.rankIndicator];
        return BorderIndicator[rankAsString];
      }
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
        return '';
    }
  }

  getRankIndicator(token: TokenModel): string {
    switch (token.rankIndicator) {
      case Rank.CadetFourthClass:
      case Rank.CadetThirdClass:
      case Rank.CadetSecondClass:
      case Rank.CadetFirstClass: {
        const rankAsString = Rank[token.rankIndicator];
        return CollarPips[rankAsString];
      }
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
        return '';
    }
  }

  isAdmiralty(token: TokenModel) {
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

  getRankBorderDefinitions(token: TokenModel, bordered: boolean) {
    return '';
  }

  getBorderColor(token: TokenModel) {
    return token.divisionColor;
  }

  getBorderLogo(token: TokenModel): string {
    return DominionWarCommbadge;
  }

  isDivisionColorSupported(token: TokenModel): boolean {
    return true;
  }

  getRankIndicatorExtra(token: TokenModel): string {
    return '';
  }
}
