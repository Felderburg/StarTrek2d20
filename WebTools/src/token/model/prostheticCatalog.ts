import { Species } from "../../helpers/speciesEnum";
import { HairType } from "./hairTypeEnum";
import { KlingonForehead1, KlingonForehead2, KlingonForehead3 } from "./speciesOptionCatalog";
import { SpeciesOption } from "./speciesOptionEnum";
import SpeciesRestrictions from "./speciesRestrictions";
import { Token } from "./token";

const AndorianAntennaBack = `<g>
    <path d="m 337.97639,78.768141 c 0.68533,-1.314667 2.70533,-11.932 3.572,-16.897333 0.86667,-4.965333 1.97067,-14.424 1.34,-16.867999 -0.63067,-2.444 -1.49733,-15.134667 -1.576,-16.948 -0.08,-1.813333 0,-11.745333 -0.15867,-13.716 -0.15733,-1.970666 -3.78266,-0.236 -5.912,4.808 -2.128,5.045333 -2.364,17.421333 -2.04933,20.968 0.316,3.548 -1.65467,7.094666 -2.52267,10.247999 -0.752,2.736 -3.228,5.325334 -4.932,7.505334 -1.00666,1.286666 -2.03466,2.555999 -3.06,3.826666 -0.17466,0.216 -1.544,1.577333 -1.448,1.88 0.24667,-0.0053 3.4,-0.138667 3.35867,-0.273333 0.0227,0.07467 0,0.14 0.024,0.213333 0.54267,0.03467 1.1,-0.0093 1.644,0.024 -0.0173,0.526667 -0.312,0.993333 -0.22533,1.534667 0.64533,-0.141334 1.44266,-0.072 2.10666,-0.03733 0.0133,1.248 0.612,1.033334 1.65334,0.786667 -0.0333,0.429333 -0.22934,0.861333 -0.30934,1.3 0.428,-0.384 1.18267,-0.508 1.728,-0.593333 0.0587,0.588 -0.0947,1.196 -0.0507,1.8 0.27866,-0.186667 0.648,-0.388 0.912,-0.614667 0.37866,0.889333 -0.0147,2.121333 -0.0533,3.034667 0.636,-0.08 1.24934,-0.229334 1.868,-0.353334 0.624,0.712 -0.37066,1.412 -0.204,2.057333 0.19734,0.772 1.13867,0.064 1.564,0.449334 0.348,0.316 -0.096,1.017333 0.172,1.482666 0.22,0.38 0.96267,0.828 1.38934,0.981334 -0.0507,0.378666 -0.36934,0.693333 -0.38267,1.088 -0.0147,0.458666 1.42933,2.537333 1.552,2.313333" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4021"/>
    <path d="m 325.73746,57.868542 c -1.396,1.786667 -2.804,3.953333 -4.684,5.264 -0.54533,0.38 -0.876,0.488 -1.35733,1.008 -0.62667,0.674666 -1.736,0.733333 -2.26134,1.341333 0.68134,0.102667 0.97734,0.585333 1.42134,1.070667 0.636,0.696 1.16,0.673333 2.07866,0.444 0.74667,-0.188 1.46267,-0.261334 2.128,-0.553334 0.78267,-0.342666 1.368,-0.26 2.22934,-0.314666 1.14933,-0.07333 1.20933,-0.661334 2.052,-1.204 0.64266,-0.414667 1.72266,-0.210667 2.128,-1.024 0.13466,-0.270667 -0.036,-0.728 0.13066,-0.968 0.26,-0.374667 0.77067,-0.262667 1.1,-0.550667 0.31867,-0.278666 0.28134,-0.646666 0.47734,-0.982666 0.15733,-0.273334 0.464,-0.393334 0.588,-0.676 0.14,-0.322667 -0.028,-0.568 0.18266,-0.881334 0.18267,-0.272 0.58134,-0.153333 0.69334,-0.566666 0.0973,-0.356 -0.368,-0.670667 -0.228,-1.088 0.196,-0.586667 1.09066,-0.816 1.39733,-1.338667 -0.58133,-0.416 0.0213,-1.008 0.172,-1.437333 0.27067,-0.773334 -0.0693,-1.522667 -0.007,-2.289334 0.0453,-0.550666 0.38267,-0.996 0.456,-1.496 0.088,-0.605333 0.18667,-0.942666 0.17067,-1.542666 -0.008,-0.250667 -0.18133,-0.638667 -0.0573,-0.904 0.10533,-0.224 0.43466,-0.268 0.53866,-0.452 0.252,-0.448 0.0227,-0.986667 0.20134,-1.477333 0.10133,-0.284 0.48533,-0.482667 0.512,-0.793334 0.0227,-0.256 -0.25734,-0.422666 -0.32134,-0.661333 -0.156,-0.577333 0.104,-1.013333 0.084,-1.504 -0.0213,-0.541333 -0.29733,-0.746667 -0.0867,-1.337333 0.17866,-0.502667 0.33066,-0.457334 0.3,-1.085334 -0.028,-0.584 0.0947,-1.001333 0.17333,-1.497333 0.064,-0.402667 -0.056,-0.812 -0.13867,-1.364 -0.088,-0.593333 -0.032,-0.838667 0.13734,-1.382666 0.17466,-0.557334 0.19466,-0.865334 0.16133,-1.528 -0.06,-1.168 0.38,-2.129334 0.16133,-3.298667 -0.0693,-0.370667 -0.34266,-0.697333 -0.45733,-1.057333 -0.232,-0.732 -0.0293,-0.545334 0.24,-1.141334 0.37867,-0.836 0.544,-1.754666 1.09333,-2.530666 0.43734,0.09733 0.908,0.758666 1.37334,1.004 0.49333,0.26 0.98666,0.452 1.536,0.545333 0.17333,0.02933 0.97866,0.18 1.10266,0.133333 0.61067,-0.228 0.108,-6.905333 0.10667,-7.634666 -0.008,-2.58 0.0947,-5.202667 -0.112,-7.777333 -0.15733,-1.970667 -3.78267,-0.236 -5.912,4.808 -2.128,5.045333 -2.364,17.421333 -2.04933,20.967999 0.316,3.546667 -1.65467,7.094667 -2.52267,10.248 -0.752,2.736 -3.228,5.325333 -4.932,7.505333" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4031"/>
    <path d="m 321.23599,63.598542 c 0,0 12.036,-14.338666 11.24667,-25.926666 -0.60667,-8.933333 2.09333,-19.061333 3.13866,-23.769333 1.04667,-4.709333 5.75467,-9.6786662 7.324,-6.0159996 1.56934,3.6613336 0.524,10.4613326 -0.26133,13.8626666 -0.62,2.689333 -0.348,5.730666 -0.26267,8.46 0.112,3.566666 0.19867,7.269333 0.90267,10.758666 1.35867,6.724 1.364,13.682666 0.552,20.474666 -0.73067,6.108 -1.38133,13.216 -6.50533,17.341333 1.56133,-1.256 1.56266,-5.382667 1.864,-7.22 0.52666,-3.208 1.012,-6.421333 1.436,-9.644 0.74666,-5.681333 1.86133,-11.951999 0.96666,-17.677333 -1.308,-8.369333 -1.77333,-22.954666 -1.04533,-26.939999 0.72667,-3.986666 -2.09333,-7.585333 -2.87733,-4.708 -0.78534,2.877334 -4.52267,13.489333 -3.73334,25.077333 0.324,4.761333 -0.452,15.988 -12.74533,25.926666" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4041"/>
    <path d="m 340.27186,5.8404099 c -0.0467,0.032 -0.0933,0.065333 -0.14,0.1 -1.468,1.084 -2.01467,2.8093333 -2.67467,4.4360001 -0.74933,1.848 -0.824,3.948 -0.76,5.913333 0.11467,3.561333 1.60534,7 4.196,8.996 1.064,0.818666 2.26534,1.906666 3.43334,0.890666 1.14133,-0.993333 1.83866,-2.456 2.224,-3.912 0.788,-2.975999 1.33066,-6.055999 1.26933,-9.142666 -0.0507,-2.570667 -0.408,-5.9399998 -2.33733,-7.8519998 -0.76534,-0.7586666 -1.616,-0.8493333 -2.63467,-0.5733333 -0.912,0.2466667 -1.80267,0.6053333 -2.576,1.144" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4045"/>
    <path d="m 344.81426,19.538276 c 0.77867,-2.008 1.132,-3.942667 0.90133,-6.081333 -0.176,-1.628 0.0613,-3.7093334 -1.23466,-4.9933334 -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6786664 -1.11333,1.770667 -1.43733,3.873333 -1.37067,5.924 0.072,2.236 1.024,4.213333 2.304,5.945333 2.256,3.053334 3.408,-0.712 4.09067,-2.473333" style="opacity:0.5;fill:#c14242;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4055"/>
    <path d="m 344.48066,8.4629431 c -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6799999 -1.11333,1.770667 -1.43733,3.872 -1.37066,5.924 0.076,2.361333 1.048,4.292 2.63333,5.985333 0.33867,0.361333 0.72533,0.868 1.07333,1.142667 -0.548,-0.769334 -0.74666,-1.728 -0.91333,-2.622667 -0.416,-2.230666 -0.78933,-5.093333 0.10667,-7.256 0.30666,-0.741333 0.964,-1.653333 1.80666,-1.833333 1.14134,-0.245333 1.972,2.332 2.032,3.161333 0.15734,-0.717333 0.27467,-1.444 0.352,-2.174666 0.14534,-1.386667 0.024,-2.9626669 -1.02933,-4.0066669" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4071"/>
    <path d="m 340.47506,6.8446765 c -0.0427,0.029333 -0.084,0.058667 -0.12533,0.089333 -1.31734,0.972 -1.808,2.52 -2.4,3.9786665 -0.672,1.656 -0.74,3.54 -0.68267,5.302667 0.104,3.193333 1.44133,6.277333 3.76533,8.066666 0.95467,0.734667 2.03334,1.710667 3.08134,0.8 1.024,-0.890666 1.64933,-2.204 1.996,-3.509333 0.70666,-2.668 1.19333,-5.429333 1.13866,-8.198666 -0.0453,-2.305334 -0.36666,-5.3266672 -2.09733,-7.0413338 -0.688,-0.6813333 -1.44933,-0.7613333 -2.36533,-0.5133333 -0.81734,0.22 -1.616,0.5426666 -2.31067,1.0253333 m 4.20667,-3.9559999 c 0.128,0.061333 0.252,0.136 0.37066,0.216 1.04267,0.6973333 1.79867,1.7639999 2.3,2.9133333 2.24267,5.1386664 1.168,11.3733334 -0.36,16.5453334 -0.48,1.625333 -1.34666,3.26 -2.76666,4.369333 -1.452,1.133333 -2.948,-0.08133 -4.27067,-0.996 -3.224,-2.228 -5.07867,-6.066666 -5.22133,-10.044 -0.0867,-2.409333 0.0907,-4.8 1.08933,-6.9199999 0.724,-1.5373332 1.632,-3.8506665 3.172,-4.7506665 1.288,-0.7533333 2.916,-1.2373333 4.38267,-1.4533333 0.31066,-0.046667 0.63066,-0.08 0.93733,-0.010667 0.12667,0.028 0.24933,0.073333 0.36667,0.1306667" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4081"/>
</g>`;

const AndorianAntennaFront = `<g>
    <path d="m 263.87854,57.154474 c 1.12267,1.252 1.71389,1.470788 4.22727,4.085758 2.51338,2.614969 6.52187,6.539775 11.69545,10.142052 -6.62153,2.519125 -25.34314,8.994212 -29.43119,9.071099 -0.1,-0.185334 -0.036,-0.565334 -0.0627,-0.785334 -0.0293,-0.234666 -0.0613,-0.468 -0.0947,-0.702666 -0.0608,-4.814125 -2.89444,-17.183368 -4.47177,-20.864701 -3.13067,-7.306666 -4.668,-24.435999 -0.24534,-36.467999 4.424,-12.0319996 7.95334,-18.6159994 9.54534,-17.3773328 1.59333,1.2386667 4.91066,4.5266666 3.672,6.1186668 -1.23867,1.593333 -3.34534,10.198666 -4.81334,17.214666 -0.708,5.662667 1.53289,16.263116 3.59557,19.736445 2.04002,3.435997 3.71541,6.853346 6.38341,9.829346 z" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23605"/>
    <path d="m 249.45933,46.616409 c 0,0.352 -0.79867,0.761333 -0.84934,1.289333 -0.11333,1.197333 0.89734,1.817333 0.72667,3.108 0.352,0.272 0.116,0.164 0.348,0.524 0.096,0.01867 0.19067,0.03867 0.28667,0.05733 1.84,0.369334 1.03333,3.945334 0.99066,5.168 -0.052,1.528 0.82267,2.310667 1.496,3.534667 0.77067,1.404 0.968,1.485333 2.30534,2.466666 1.132,0.830667 1.12533,1.101334 2.57333,1.4 1.64933,0.341334 3.38933,0.690667 5.156,0.777334 1.60933,0.07867 3.98533,-0.238667 5.46667,0.317333 2.10266,0.789333 -0.21334,2.082667 -0.904,2.772 -1.364,1.361333 -1.512,3.296 -0.10267,4.74 -0.736,0.401333 -1.54133,-0.137333 -2.35067,0.210667 -0.54666,0.234666 -1.27333,1.225333 -1.51333,1.653333 -0.092,0 -0.22133,0.05333 -0.284,0.114666 -0.72,-1.121333 -1.572,-2.098666 -2.22,-3.269333 -0.48267,-0.873333 -0.892,-2.221333 -1.78267,-2.770666 -1.77466,-1.096 -4.35866,0.872 -5.46,2.109333 -0.51333,0.577333 -1.124,1.564 -1.02666,2.433333 0.18266,-0.06 0.43066,-0.02533 0.62,-0.14 -0.0907,0.478667 -0.69467,0.961333 -0.92,1.437333 -0.20934,0.444 -0.492,1.018667 -0.49734,1.501334 0.17334,-0.07333 0.428,-0.03333 0.616,-0.118667 0.124,1.856 -1.51466,3.808 -2.288,5.398667 0.19867,-0.410667 -0.24133,-1.770667 -0.33466,-2.221334 -0.13734,-0.673333 -0.23734,-1.129333 -0.096,-1.837333 -0.3,-0.02667 -0.58534,0.08533 -0.85334,0.218667 -0.009,-0.04533 -0.0173,-0.092 -0.0267,-0.137334 -0.0533,-0.01333 -0.17067,0.0093 -0.21467,-0.02533 -0.20133,-1.406667 0.72156,-2.33756 0.84823,-3.644227 0.23333,-2.434666 -0.2309,-4.941106 -0.6429,-7.305106 -0.50266,-2.876 -1.64,-5.608 -2.78533,-8.278666 -3.13067,-7.306667 -4.668,-24.434667 -0.244,-36.468 4.42267,-12.0319992 7.952,-18.6146657 9.544,-17.3759991 1.59333,1.2386666 4.91067,4.5253332 3.672,6.1186661 -1.66,2.133334 -2.12933,5.774667 -2.77333,8.312 -0.46667,1.834667 -1.21334,8.92 -4.57867,6.238667 -1.18267,-0.941334 -1.54133,-1.312 -2.596,0.376 -0.80133,1.281333 -1.25867,3.154666 -1.012,4.714666 0.0987,0.625334 0.77467,1.498667 0.82133,2.054667 0.0813,0.961333 -0.47333,1.482666 -0.66266,2.416 -0.35067,1.74 -0.33334,2.932 1.152,4.001333 -0.44934,0.574667 -0.892,1.177333 -0.94667,1.889333 0.096,0.02 0.192,0.03867 0.28933,0.05867 0.37334,0.912 -0.25466,1.676 -0.23866,2.592 0.003,0.225333 0.55466,0.756 0.624,1.04 0.0707,0.282667 -0.0747,0.976 -0.0307,1.324 0.072,0.565333 0.69867,0.574667 0.69867,1.224" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23615"/>
    <path d="m 254.53839,30.641209 c 1.56934,-16.215999 6.8,-21.9706659 6.8,-21.9706659 0,0 -4.708,-8.36933311 -9.93866,-3.1386666 -3.42219,3.4213223 -9.11358,18.4167135 -9.47716,33.1215825 -0.21244,8.592033 1.36225,13.044652 3.72249,22.599298 2.36024,9.554646 4.81243,18.474629 4.81243,18.474629 0,0 -1.21031,-13.19658 -3.53938,-21.6192 -2.32907,-8.42262 -5.19305,-23.586977 -0.76905,-35.618977 4.424,-12.031999 7.432,-18.5799991 9.024,-17.3413325 1.59333,1.2386667 4.24667,3.3626666 3.008,4.9546665 -1.23733,1.593333 -4.24667,13.270666 -4.95333,18.933333 -0.708,5.662666 0.92909,14.569321 5.32176,22.296874 4.39267,7.727554 16.76131,16.687092 16.76131,16.687092 -4.14448,-4.697312 -9.64742,-9.374657 -14.39954,-16.284439 -4.24497,-6.172379 -7.11331,-13.442589 -6.37287,-21.094194 z" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23625"/>
    <path d="m 254.22013,3.3252099 c -0.0467,0.032 -0.0933,0.065333 -0.14,0.1 -1.468,1.084 -2.01467,2.8093333 -2.67467,4.4359999 -0.74933,1.848 -0.824,3.9480002 -0.76,5.9133332 0.11467,3.561333 1.60533,7 4.196,8.996 1.064,0.818666 2.26533,1.906666 3.43333,0.890666 1.14134,-0.993333 1.83867,-2.456 2.224,-3.911999 0.788,-2.976 1.33067,-6.056 1.26934,-9.142667 -0.0507,-2.5706665 -0.408,-5.9399998 -2.33734,-7.8519997 -0.76533,-0.7586667 -1.616,-0.8493333 -2.63466,-0.5733334 -0.912,0.2466667 -1.80267,0.6053334 -2.576,1.144" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23629"/>
    <path d="m 258.42893,5.9477432 c -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6799999 -1.11333,1.7706667 -1.43733,3.8719999 -1.37067,5.9239999 0.076,2.361333 1.048,4.292 2.63334,5.985333 1.03733,1.106667 1.528,1.824 2.632,0.358667 2.06533,-2.74 1.70533,-6.562667 1.70266,-9.758667 -0.001,-1.5106662 0.31867,-2.9746662 -0.90666,-4.1893328" style="opacity:0.5;fill:#c14242;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23639"/>
    <path d="m 258.42893,5.9477432 c -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6799999 -1.11333,1.7706667 -1.43733,3.8719999 -1.37067,5.9239999 0.076,2.361333 1.048,4.292 2.63334,5.985333 0.33866,0.361334 0.72533,0.868 1.07333,1.142667 -0.548,-0.769333 -0.74667,-1.728 -0.91333,-2.622667 -0.416,-2.230666 -0.78934,-5.093333 0.10666,-7.256 0.30667,-0.741333 0.964,-1.6533329 1.80667,-1.8333329 1.14133,-0.2453333 1.972,2.3319999 2.032,3.1613329 0.15733,-0.717333 0.27467,-1.444 0.352,-2.1746662 0.14533,-1.3866667 0.024,-2.9626666 -1.02933,-4.0066666" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23655"/>
    <path d="m 254.42333,4.3294766 c -0.0427,0.029333 -0.084,0.058667 -0.12534,0.089333 -1.31733,0.972 -1.808,2.5199999 -2.4,3.9786666 -0.672,1.6559998 -0.74,3.5399998 -0.68266,5.3026668 0.104,3.193333 1.44133,6.277333 3.76533,8.066666 0.95467,0.734667 2.03333,1.710667 3.08133,0.8 1.024,-0.890666 1.64934,-2.204 1.996,-3.509333 0.70667,-2.668 1.19334,-5.429333 1.13867,-8.198666 -0.0453,-2.3053338 -0.36667,-5.3266671 -2.09733,-7.0413337 -0.688,-0.6813333 -1.44934,-0.7613333 -2.36534,-0.5133333 -0.81733,0.2199999 -1.616,0.5426666 -2.31066,1.0253333 m 4.20666,-3.95599994 c 0.128,0.0613333 0.252,0.13599999 0.37067,0.21599999 1.04267,0.69733335 1.79867,1.76399995 2.3,2.91333325 2.24267,5.1386666 1.168,11.3733334 -0.36,16.5453334 -0.48,1.625333 -1.34667,3.26 -2.76667,4.369333 -1.452,1.133333 -2.948,-0.08133 -4.27066,-0.996 -3.224,-2.228 -5.07867,-6.066666 -5.22134,-10.044 -0.0867,-2.409333 0.0907,-4.7999998 1.08934,-6.9199998 0.724,-1.5373333 1.632,-3.8506666 3.172,-4.7506665 1.288,-0.75333336 2.916,-1.23733335 4.38266,-1.45333334 0.31067,-0.0466667 0.63067,-0.08 0.93734,-0.0106667 0.12666,0.028 0.24933,0.0733333 0.36666,0.13066667" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path23665"/>
    <path style="color:#000000;fill:#000000;-inkscape-stroke:none" d="m 267.78216,75.142851 c -1.41782,0.850813 -4.14508,1.818965 -6.28711,2.453125 -2.24064,0.663354 -6.37936,1.240938 -6.37936,1.240938 0,0 4.37702,0.202364 6.686,-0.287813 2.24678,-0.476972 4.921,-1.551077 6.46289,-2.529297 3.22005,-2.042896 7.31634,-7.415584 7.31634,-7.415584 0,0 -4.8444,4.765756 -7.79876,6.538631 z" id="path1633"/>
</g>`;

const AndorianAntennaFrontCovered = `<g>
    <path id="path4885" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="M 254.54297 4.1113281 C 252.77933 4.299114 249.50534 10.728824 245.49609 21.632812 C 241.07344 33.6648 242.60957 50.794904 245.74023 58.101562 C 246.45066 59.75962 247.40972 63.195731 248.26172 66.894531 L 262.46484 55.408203 C 260.56983 52.874321 259.14838 50.107154 257.49609 47.324219 C 255.43342 43.850893 253.19239 33.250552 253.90039 27.587891 C 255.36839 20.571898 257.47422 11.966378 258.71289 10.373047 C 259.95155 8.7810483 256.63434 5.4945248 255.04102 4.2558594 C 254.89177 4.1397345 254.72541 4.091902 254.54297 4.1113281 z "/>
    <path id="path4887" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="M 254.54297 4.1132812 C 252.77934 4.3008618 249.50413 10.728824 245.49609 21.632812 C 241.0721 33.666133 242.60957 50.79295 245.74023 58.099609 C 246.88556 60.770273 248.02273 63.502909 248.52539 66.378906 C 248.54061 66.466233 248.55499 66.556826 248.57031 66.644531 L 254.03516 62.226562 C 253.32518 61.690246 253.05574 61.387598 252.45703 60.296875 C 251.7837 59.072876 250.91089 58.29167 250.96289 56.763672 C 251.00556 55.541007 251.8107 51.965037 249.9707 51.595703 C 249.8747 51.577043 249.78155 51.555779 249.68555 51.537109 C 249.45355 51.17711 249.68794 51.285672 249.33594 51.013672 C 249.50661 49.723006 248.49605 49.103582 248.60938 47.90625 C 248.66004 47.378251 249.45898 46.969187 249.45898 46.617188 C 249.45898 45.967855 248.83177 45.957911 248.75977 45.392578 C 248.71577 45.044578 248.86172 44.351026 248.79102 44.068359 C 248.72168 43.78436 248.17097 43.25463 248.16797 43.029297 C 248.15197 42.113298 248.77959 41.347546 248.40625 40.435547 C 248.30892 40.415547 248.21319 40.396953 248.11719 40.376953 C 248.17186 39.664954 248.61316 39.062948 249.0625 38.488281 C 247.57716 37.418949 247.56144 36.226326 247.91211 34.486328 C 248.10144 33.552995 248.65552 33.031645 248.57422 32.070312 C 248.52756 31.514313 247.85065 30.640958 247.75195 30.015625 C 247.50528 28.455627 247.96234 26.582113 248.76367 25.300781 C 249.81834 23.612783 250.17866 23.984448 251.36133 24.925781 C 254.72665 27.607112 255.47278 20.522165 255.93945 18.6875 C 256.58345 16.15017 257.05289 12.508332 258.71289 10.375 C 259.95156 8.7816687 256.63434 5.4945247 255.04102 4.2558594 C 254.89177 4.1397345 254.72541 4.0938764 254.54297 4.1132812 z "/>
    <path id="path4889" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="M 255.16016 3.8164062 C 253.98322 3.7673438 252.70805 4.2235847 251.40039 5.53125 C 247.9782 8.9525689 242.28545 23.949443 241.92188 38.654297 C 241.70944 47.246321 243.28429 51.697317 245.64453 61.251953 C 246.19413 63.476802 246.74599 65.643897 247.27344 67.695312 L 248.70508 66.537109 C 248.20843 63.619016 247.621 60.649806 246.91797 58.107422 C 244.5889 49.68481 241.72444 34.520269 246.14844 22.488281 C 250.57243 10.456294 253.58183 3.9097721 255.17383 5.1484375 C 256.76716 6.387103 259.42031 8.5115173 258.18164 10.103516 C 256.94431 11.696847 253.93517 23.372495 253.22852 29.035156 C 252.52052 34.697817 254.15616 43.604486 258.54883 51.332031 C 259.4011 52.831341 260.55715 54.376904 261.86133 55.894531 L 263.19727 54.814453 C 262.4233 53.832038 261.65729 52.819846 260.91211 51.736328 C 256.66714 45.563955 253.79862 38.292222 254.53906 30.640625 C 256.1084 14.424642 261.33789 8.6699219 261.33789 8.6699219 C 261.33789 8.6699219 258.69096 3.9635936 255.16016 3.8164062 z "/>
    <path d="m 254.22013,3.3252099 c -0.0467,0.032 -0.0933,0.065333 -0.14,0.1 -1.468,1.084 -2.01467,2.8093333 -2.67467,4.4359999 -0.74933,1.848 -0.824,3.9480002 -0.76,5.9133332 0.11467,3.561333 1.60533,7 4.196,8.996 1.064,0.818666 2.26533,1.906666 3.43333,0.890666 1.14134,-0.993333 1.83867,-2.456 2.224,-3.911999 0.788,-2.976 1.33067,-6.056 1.26934,-9.142667 -0.0507,-2.5706665 -0.408,-5.9399998 -2.33734,-7.8519997 -0.76533,-0.7586667 -1.616,-0.8493333 -2.63466,-0.5733334 -0.912,0.2466667 -1.80267,0.6053334 -2.576,1.144" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4891"/>
    <path d="m 258.42893,5.9477432 c -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6799999 -1.11333,1.7706667 -1.43733,3.8719999 -1.37067,5.9239999 0.076,2.361333 1.048,4.292 2.63334,5.985333 1.03733,1.106667 1.528,1.824 2.632,0.358667 2.06533,-2.74 1.70533,-6.562667 1.70266,-9.758667 -0.001,-1.5106662 0.31867,-2.9746662 -0.90666,-4.1893328" style="opacity:0.5;fill:#c14242;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4893"/>
    <path d="m 258.42893,5.9477432 c -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6799999 -1.11333,1.7706667 -1.43733,3.8719999 -1.37067,5.9239999 0.076,2.361333 1.048,4.292 2.63334,5.985333 0.33866,0.361334 0.72533,0.868 1.07333,1.142667 -0.548,-0.769333 -0.74667,-1.728 -0.91333,-2.622667 -0.416,-2.230666 -0.78934,-5.093333 0.10666,-7.256 0.30667,-0.741333 0.964,-1.6533329 1.80667,-1.8333329 1.14133,-0.2453333 1.972,2.3319999 2.032,3.1613329 0.15733,-0.717333 0.27467,-1.444 0.352,-2.1746662 0.14533,-1.3866667 0.024,-2.9626666 -1.02933,-4.0066666" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4895"/>
    <path d="m 254.42333,4.3294766 c -0.0427,0.029333 -0.084,0.058667 -0.12534,0.089333 -1.31733,0.972 -1.808,2.5199999 -2.4,3.9786666 -0.672,1.6559998 -0.74,3.5399998 -0.68266,5.3026668 0.104,3.193333 1.44133,6.277333 3.76533,8.066666 0.95467,0.734667 2.03333,1.710667 3.08133,0.8 1.024,-0.890666 1.64934,-2.204 1.996,-3.509333 0.70667,-2.668 1.19334,-5.429333 1.13867,-8.198666 -0.0453,-2.3053338 -0.36667,-5.3266671 -2.09733,-7.0413337 -0.688,-0.6813333 -1.44934,-0.7613333 -2.36534,-0.5133333 -0.81733,0.2199999 -1.616,0.5426666 -2.31066,1.0253333 m 4.20666,-3.95599994 c 0.128,0.0613333 0.252,0.13599999 0.37067,0.21599999 1.04267,0.69733335 1.79867,1.76399995 2.3,2.91333325 2.24267,5.1386666 1.168,11.3733334 -0.36,16.5453334 -0.48,1.625333 -1.34667,3.26 -2.76667,4.369333 -1.452,1.133333 -2.948,-0.08133 -4.27066,-0.996 -3.224,-2.228 -5.07867,-6.066666 -5.22134,-10.044 -0.0867,-2.409333 0.0907,-4.7999998 1.08934,-6.9199998 0.724,-1.5373333 1.632,-3.8506666 3.172,-4.7506665 1.288,-0.75333336 2.916,-1.23733335 4.38266,-1.45333334 0.31067,-0.0466667 0.63067,-0.08 0.93734,-0.0106667 0.12666,0.028 0.24933,0.0733333 0.36666,0.13066667" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4897"/>
    <path style="color:#000000;fill:#000000;-inkscape-stroke:none" d="m 255.06836,59.958984 c -3.46433,2.76497 -10.37695,9.929687 -10.37695,9.929687 0,0 7.63138,-6.456348 11.00195,-9.146484 3.37847,-2.696445 9.38965,-7.297851 9.38965,-7.297851 0,0 -6.55823,3.755989 -10.01465,6.514648 z" id="path4921"/>
</g>`;

const AndorianAntennaFrontCoveredMore = `<g>
    <path id="path4960" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="M 254.67773 4.109375 C 254.63415 4.1058081 254.58858 4.1064716 254.54297 4.1113281 C 252.77933 4.2991138 249.50534 10.728835 245.49609 21.632812 C 241.87304 31.489463 242.2511 44.759909 244.22656 53.255859 L 261.2168 53.611328 C 259.90023 51.59027 258.76568 49.462575 257.49609 47.324219 C 255.43343 43.850896 253.19239 33.250546 253.90039 27.587891 C 255.36839 20.571905 257.47422 11.966376 258.71289 10.373047 C 259.95155 8.7810498 256.63433 5.4945235 255.04102 4.2558594 C 254.92908 4.1687658 254.80849 4.1200758 254.67773 4.109375 z "/>
    <path id="path4962" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="M 254.67773 4.1113281 C 254.63415 4.1079433 254.58858 4.1084301 254.54297 4.1132812 C 252.77934 4.3008617 249.50413 10.728835 245.49609 21.632812 C 241.87167 31.491291 242.25043 44.76075 244.22656 53.255859 L 251.14453 53.400391 C 251.05921 52.50249 250.75883 51.753901 249.9707 51.595703 C 249.8747 51.577043 249.78155 51.555779 249.68555 51.537109 C 249.45355 51.177111 249.68794 51.285672 249.33594 51.013672 C 249.50661 49.723007 248.49605 49.103581 248.60938 47.90625 C 248.66003 47.378252 249.45898 46.969186 249.45898 46.617188 C 249.45898 45.967855 248.83177 45.957911 248.75977 45.392578 C 248.71577 45.044578 248.86172 44.351026 248.79102 44.068359 C 248.72168 43.784361 248.17097 43.25463 248.16797 43.029297 C 248.15197 42.113299 248.77959 41.347545 248.40625 40.435547 C 248.30892 40.415547 248.21319 40.396953 248.11719 40.376953 C 248.17186 39.664955 248.61316 39.062948 249.0625 38.488281 C 247.57716 37.41895 247.56144 36.226324 247.91211 34.486328 C 248.10144 33.552996 248.65552 33.031645 248.57422 32.070312 C 248.52756 31.514314 247.85065 30.640957 247.75195 30.015625 C 247.50528 28.455629 247.96234 26.582112 248.76367 25.300781 C 249.81834 23.612785 250.17866 23.984449 251.36133 24.925781 C 254.72664 27.60711 255.47278 20.522163 255.93945 18.6875 C 256.58345 16.150173 257.05289 12.50833 258.71289 10.375 C 259.95156 8.7816703 256.63433 5.4945234 255.04102 4.2558594 C 254.92908 4.1687658 254.80849 4.1214827 254.67773 4.1113281 z "/>
    <path id="path4964" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="M 255.16016 3.8164062 C 253.98322 3.7673439 252.70805 4.223586 251.40039 5.53125 C 247.9782 8.9525655 242.28544 23.949458 241.92188 38.654297 C 241.77863 44.447607 242.46 48.382235 243.63477 53.244141 L 245.73047 53.287109 C 243.83125 44.629141 242.47323 32.483773 246.14844 22.488281 C 250.57242 10.456306 253.58183 3.9097733 255.17383 5.1484375 C 256.76716 6.3871018 259.42031 8.5115185 258.18164 10.103516 C 256.94431 11.696845 253.93516 23.372501 253.22852 29.035156 C 252.52052 34.697812 254.15616 43.604494 258.54883 51.332031 C 258.97131 52.075253 259.46867 52.829022 260.02148 53.585938 L 262.28906 53.632812 C 261.82456 53.018749 261.36415 52.393611 260.91211 51.736328 C 256.66714 45.563961 253.79862 38.292214 254.53906 30.640625 C 256.1084 14.424658 261.33789 8.6699219 261.33789 8.6699219 C 261.33789 8.6699219 258.69095 3.9635935 255.16016 3.8164062 z "/>
    <path d="m 254.22013,3.3252099 c -0.0467,0.032 -0.0933,0.065333 -0.14,0.1 -1.468,1.084 -2.01467,2.8093333 -2.67467,4.4359999 -0.74933,1.848 -0.824,3.9480002 -0.76,5.9133332 0.11467,3.561333 1.60533,7 4.196,8.996 1.064,0.818666 2.26533,1.906666 3.43333,0.890666 1.14134,-0.993333 1.83867,-2.456 2.224,-3.911999 0.788,-2.976 1.33067,-6.056 1.26934,-9.142667 -0.0507,-2.5706665 -0.408,-5.9399998 -2.33734,-7.8519997 -0.76533,-0.7586667 -1.616,-0.8493333 -2.63466,-0.5733334 -0.912,0.2466667 -1.80267,0.6053334 -2.576,1.144" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4966"/>
    <path d="m 258.42893,5.9477432 c -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6799999 -1.11333,1.7706667 -1.43733,3.8719999 -1.37067,5.9239999 0.076,2.361333 1.048,4.292 2.63334,5.985333 1.03733,1.106667 1.528,1.824 2.632,0.358667 2.06533,-2.74 1.70533,-6.562667 1.70266,-9.758667 -0.001,-1.5106662 0.31867,-2.9746662 -0.90666,-4.1893328" style="opacity:0.5;fill:#c14242;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4968"/>
    <path d="m 258.42893,5.9477432 c -1.456,-1.444 -3.88,0.3893333 -4.69067,1.6799999 -1.11333,1.7706667 -1.43733,3.8719999 -1.37067,5.9239999 0.076,2.361333 1.048,4.292 2.63334,5.985333 0.33866,0.361334 0.72533,0.868 1.07333,1.142667 -0.548,-0.769333 -0.74667,-1.728 -0.91333,-2.622667 -0.416,-2.230666 -0.78934,-5.093333 0.10666,-7.256 0.30667,-0.741333 0.964,-1.6533329 1.80667,-1.8333329 1.14133,-0.2453333 1.972,2.3319999 2.032,3.1613329 0.15733,-0.717333 0.27467,-1.444 0.352,-2.1746662 0.14533,-1.3866667 0.024,-2.9626666 -1.02933,-4.0066666" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4970"/>
    <path d="m 254.42333,4.3294766 c -0.0427,0.029333 -0.084,0.058667 -0.12534,0.089333 -1.31733,0.972 -1.808,2.5199999 -2.4,3.9786666 -0.672,1.6559998 -0.74,3.5399998 -0.68266,5.3026668 0.104,3.193333 1.44133,6.277333 3.76533,8.066666 0.95467,0.734667 2.03333,1.710667 3.08133,0.8 1.024,-0.890666 1.64934,-2.204 1.996,-3.509333 0.70667,-2.668 1.19334,-5.429333 1.13867,-8.198666 -0.0453,-2.3053338 -0.36667,-5.3266671 -2.09733,-7.0413337 -0.688,-0.6813333 -1.44934,-0.7613333 -2.36534,-0.5133333 -0.81733,0.2199999 -1.616,0.5426666 -2.31066,1.0253333 m 4.20666,-3.95599994 c 0.128,0.0613333 0.252,0.13599999 0.37067,0.21599999 1.04267,0.69733335 1.79867,1.76399995 2.3,2.91333325 2.24267,5.1386666 1.168,11.3733334 -0.36,16.5453334 -0.48,1.625333 -1.34667,3.26 -2.76667,4.369333 -1.452,1.133333 -2.948,-0.08133 -4.27066,-0.996 -3.224,-2.228 -5.07867,-6.066666 -5.22134,-10.044 -0.0867,-2.409333 0.0907,-4.7999998 1.08934,-6.9199998 0.724,-1.5373333 1.632,-3.8506666 3.172,-4.7506665 1.288,-0.75333336 2.916,-1.23733335 4.38266,-1.45333334 0.31067,-0.0466667 0.63067,-0.08 0.93734,-0.0106667 0.12666,0.028 0.24933,0.0733333 0.36666,0.13066667" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path4972"/>
    <path style="color:#000000;fill:#000000;-inkscape-stroke:none" d="m 253.7665,52.553524 c -4.43205,-0.05927 -14.32053,1.09631 -14.32053,1.09631 0,0 9.99496,-0.152059 14.30706,-0.09439 4.32221,0.0578 11.88809,0.312406 11.88809,0.312406 0,0 -7.45268,-1.255191 -11.87462,-1.314328 z" id="path4974"/>
</g>`;

export enum ProstheticPlacement {
    VeryBack, BaseHead, VeryFront
}

class ProstheticCatalog {

    private static _instance: ProstheticCatalog;

    public static get instance() {
        if (ProstheticCatalog._instance == null) {
            ProstheticCatalog._instance = new ProstheticCatalog();
        }
        return ProstheticCatalog._instance;
    }

    getProsthetic(token: Token, placement: ProstheticPlacement) {
        if (token.species === Species.Andorian) {
            switch (placement) {
                case ProstheticPlacement.VeryBack:
                    return AndorianAntennaBack.replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
                case ProstheticPlacement.VeryFront:
                    switch (token.hairType) {
                        case HairType.BowlCutHair:
                        case HairType.MediumLengthFemaleSidePart:
                        case HairType.MediumMaleCenterPart:
                        case HairType.ShortTeasedOverEyeStyle:
                        case HairType.PinnedUpHairWithPart:
                            return AndorianAntennaFrontCovered.replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);

                        case HairType.FeminineDreadStyle:
                        case HairType.ShoulderLengthBob:
                        case HairType.ChinLengthCombBack:
                            return AndorianAntennaFrontCoveredMore.replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
                        default:
                            return AndorianAntennaFront.replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
                    }
                default:
                    return "";
            }
        } else if (token.species === Species.Klingon) {
            if (placement === ProstheticPlacement.BaseHead) {
                switch (token.speciesOption) {
                    case SpeciesOption.Option1:
                        return KlingonForehead1.replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
                    case SpeciesOption.Option2:
                        return KlingonForehead2.replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
                    case SpeciesOption.Option3:
                        return KlingonForehead3.replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
                    default:
                        return "";
                }
            }
        } else {
            return "";
        }
    }

}

export default ProstheticCatalog;