import SpeciesOptions from "./speciesOptions";
import { Token } from "./token";

const DominionWarAverageBody = `<g id="g171234">
    <path d="m 275.46293,349.22293 c 75.85199,1.56934 89.45333,6.8 89.45333,6.8 l 5.232,6.27867 14.532,6.804 -0.87067,-26.57333 c -1.52533,-11.00267 -6.34267,-44.99867 -8.672,-52.57067 -2.78933,-9.06533 -4.292,-11.15866 -12.44533,-16.04 -8.15467,-4.88133 -35.08933,-19.29466 -45.54933,-21.61866 -10.46134,-2.32534 -26.816,-12.736 -37.04,-17.07867 l -7.53334,-1.63867 4.76934,8.012 -0.29867,2.28667 c 0,0 4.84133,12.76133 6.26133,16.736 1.42,3.976 -3.40666,11.07333 -3.40666,11.07333 l -5.67867,65.86933 -36.05867,-64.73333 -3.40666,-4.54266 c 0,0 -15.332,-8.51734 -37.47733,-27.54 -22.14667,-19.024 -15.724,-34.06934 -15.724,-34.06934 l -0.088,-0.68666 -0.77467,0.516 -6.27733,0.46533 -40.91334,21.15467 -38.587996,22.548 -11.855999,6.044 -6.741334,6.27733 -9.459999,6.824 -8.589333,6.69867 -29.041333,33.14 -14.396,83.48533 c 0,0 68.653332,-7.82534 102.133334,-36.59734 0,0 82.652,-8.89333 158.50533,-7.324" style="fill:#7d7d7d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path171958"/>
    <path d="m 384.67959,369.10547 1.01067,30.86133 H 13.6476 l 1.176,-6.82267 c 0,0 68.653331,-7.82533 102.13333,-36.59733 0,0 82.65333,-8.89333 158.50533,-7.324 75.85333,1.56933 89.45466,6.80133 89.45466,6.80133 l 5.23067,6.27734 z" style="fill:#2d2d2d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path171962"/>
    <path d="m 196.9892,241.882 c 22.14533,19.02267 37.47733,27.54 37.47733,27.54 l 3.408,4.54267 36.05733,64.73466 5.67867,-65.86933 c 0,0 4.82666,-7.09866 3.40666,-11.07333 -1.42,-3.97467 -6.26,-16.73733 -6.26,-16.73733 l 0.29734,-2.28534 -4.768,-8.012 -0.18534,0.152 -3.812,10.87334 -5.22533,2.25866 -2.824,2.82534 -3.672,-3.672 c -10.87333,-1.412 -25.98267,-10.59067 -35.02,-17.228 -9.03867,-6.63734 -21.46533,-31.49067 -21.46533,-31.49067 l 0.90133,-3.14133 -3.14666,-0.67467 -12.55334,9.764 -4.10666,2.73733 0.0893,0.68667 c 0,0 -6.42267,15.04667 15.72267,34.06933" style="fill:#d30000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path171966"/>
    <path d="m 196.9892,241.882 c 22.14533,19.02267 37.47733,27.54 37.47733,27.54 l 3.408,4.54267 36.05733,64.73466 5.67867,-65.86933 c 0,0 4.82666,-7.09866 3.40666,-11.07333 -1.42,-3.97467 -6.26,-16.73733 -6.26,-16.73733 l 0.29734,-2.28534 -4.768,-8.012 -0.18534,0.152 -3.812,10.87334 -5.22533,2.25866 -2.824,2.82534 -3.672,-3.672 c -10.87333,-1.412 -25.98267,-10.59067 -35.02,-17.228 -9.03867,-6.63734 -21.46533,-31.49067 -21.46533,-31.49067 l 0.90133,-3.14133 -3.14666,-0.67467 -12.55334,9.764 -4.10666,2.73733 0.0893,0.68667 c 0,0 -6.42267,15.04667 15.72267,34.06933 z" style="fill:none;stroke:#000000;stroke-width:1.08533;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" id="path171970"/>
    <path d="m 213.63253,151.29441 -13.54934,47.14666 c 0,0 12.42667,24.85333 21.464,31.49067 9.03734,6.636 24.148,15.816 35.02134,17.228 l 3.67066,3.67066 2.82534,-2.824 5.224,-2.25866 3.81333,-10.87467 18.428,-23.08667 z" style="fill:#cd976d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path171974"/>
    <path d="m 200.08306,198.44081 c 0,0 12.86667,21.57066 17.836,27.06399 4.96933,5.49334 32.696,1.83067 40.54267,4.18534 6.33866,1.90133 13.09866,2.66533 15.47066,2.89066 l 16.59734,-20.79333 -76.89734,-60.49333 z" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path171984"/>
    <path d="m 211.64493,149.52841 c -1.01067,4.99733 -6.2,23.82533 -7.36934,28.788 -0.956,4.064 -1.95733,8.11866 -3.072,12.14266 -0.516,1.85867 -1.07466,3.70267 -1.63333,5.54934 -0.18666,0.616 -0.95466,1.86266 -0.88133,2.47466 0.02,0.16934 0.80667,2.38267 1.11067,1.93733 3.68799,-5.38666 5.03733,-14.18666 7.12666,-20.38133 1.49067,-4.41866 7.06133,-22.68666 8.552,-27.104 0,0 -3.83333,-3.40666 -3.83333,-3.40666" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path171994"/>
    <path d="m 293.27599,213.31907 c -2.83733,2.044 -16.28266,19.912 -18.592,22.53067 -1.87866,2.13066 -4.41733,10.85066 -7.52933,10.948 -2.104,0.0653 -1.74133,-3.72534 -1.19333,-5.332 0.26266,-0.76934 21.288,-30.90934 21.288,-30.90934 0,0 6.02666,2.76267 6.02666,2.76267" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path171998"/>
    <path d="m 276.07346,242.23054 c 0.33067,0.75333 0.6,1.59333 0.68267,2.78933 0.224,3.21333 -1.1,3.24933 -2.696,5.944 -2.38667,4.032 -3.48134,9.40133 -4.94667,13.80933 -0.872,-2.21866 -1.20133,-3.37733 -1.008,-5.648 0.196,-2.31333 0.44933,-4.564 1.104,-6.844 0.46533,-1.62266 3.62267,-4.36666 4.41467,-5.74133 1.59866,-2.768 0.99466,-5.07867 0.372,-8.04267 0.23866,0.32 0.43733,0.32667 0.74,0.59334 0.36,1.30533 0.90133,2.14666 1.33733,3.14" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172002"/>
    <path d="m 367.95412,278.712 c 0,0 3.12934,28.84534 1.144,48.11334 0,0 3.30134,-23.672 0.824,-46.24134 z" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172006"/>
    <path d="m 124.20106,357.8324 c -0.84266,-6.028 -8.70533,-34.376 -17.78266,-49.22933 0,0 5.828,18.952 6.70133,33.92933 0,8.808 -1.90133,20.42533 -1.90133,20.42533 l 5.46666,-3.076 c 0,0 7.216,4.516 7.516,-2.04933" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172010"/>
    <path d="m 31.954133,310.00067 c 3.702666,-4.62933 26.915999,-31.832 34.897332,-39.31867 v 0.73867 c 6.189333,-7.92533 23.231999,3.50533 27.283999,9.068 0.306667,-1.03467 -0.156,-2.13067 -0.670666,-3.07867 -2.468,-4.544 -6.364,-7.99466 -10.761333,-10.62 -1.478667,-0.88133 -3.62,-1.56933 -4.656,-2.98133 -0.306667,-0.42 11.426666,-7.80133 12.474666,-8.19333 4.258667,-1.59734 19.498669,-10.412 37.142669,-20.61867 19.56666,-11.31733 41.744,-24.14533 46.17866,-25.328 2.17334,-0.58 3.62534,-0.84267 4.59467,-0.956 -0.42533,0.848 -0.73867,1.91333 -0.79333,3.28 -0.14667,3.67867 1.56266,8.51733 4.536,13.60933 3.57333,7.92134 11.02,17.74667 26.09333,28.12534 18.396,12.66666 24.63866,17.11733 26.708,18.66133 0.012,0.028 0.0253,0.0533 0.04,0.08 l 37.47866,69.27733 c 0.22267,0.412 0.61067,0.67867 1.04667,0.78667 h 0.80267 c 0.66,-0.17734 1.148,-0.74 1.20533,-1.428 0,0 4.80667,-66.512 4.80667,-66.512 3.024,-4.2 4.728,-11.44667 3.33733,-16.40533 -0.72267,-2.57334 -2.18133,-4.828 -3.324,-7.22 -0.50133,-1.04934 -2.34667,-4.01334 -2.02267,-5.224 0.12534,-0.46667 0.52,-0.88534 0.73867,-1.30534 1.3,-2.49333 -2.348,-5.728 -3.11733,-7.90533 -0.044,-0.124 -0.13334,-1.20267 0.148,-1.21467 3.54133,-0.148 7.58666,2.95734 11.07466,4.508 10.63467,4.73067 19.85867,12.18934 31.09467,15.81467 9.488,3.06 43.608,18.04267 50.50133,25.63067 5.132,5.64933 10.78133,42.52133 13.19067,61.26133 0.63866,5.392 1.27733,24.524 1.27733,24.524 l -12.82667,-9.07334 C 369.78479,342.678 368.68479,335.966 368.68479,335.966 c -1.2,9.90533 -2.17467,12.556 -3.6,16.4 l -88.50533,-6.15067 -156.47866,3.41734 c 0,0 -33.481335,26.564 -89.094667,39.81733 l -13.18,1.23467 c 1.510667,-11.19867 10.384,-76.004 14.128,-80.684 M 182.70613,208.78734 c 4.79067,-3.42534 11.59333,-9.21733 14.88,-12.06267 3.23333,9.932 22.35866,47.30667 58.756,51.628 l 2.75466,3.856 c 0.31067,0.43467 0.77734,0.68267 1.35067,0.68133 1.30133,-10e-4 1.33867,-1.26533 1.91333,-2.09333 0.77334,-1.11067 2.092,-1.78933 3.34134,-2.21067 1.2,-0.40533 2.524,-0.66533 3.42933,-1.552 1,-0.97866 1.46133,-2.60533 2.10267,-3.82933 0.33066,-0.632 0.67066,-1.25867 1.02,-1.87867 0.116,-0.20533 0.956,-1.32933 0.888,-1.51866 2.79733,7.71066 8.44666,16.42666 7.22,24.78933 -0.69467,4.732 -2.484,8.99067 -2.83467,13.83333 -0.312,4.30134 -0.624,8.604 -0.936,12.90534 -0.732,10.07066 -1.46267,20.14266 -2.19333,30.21333 -0.24934,3.44533 -0.5,6.89067 -0.74934,10.336 l -33.532,-56.844 c -4.14666,-9.572 -26.092,-22.796 -40.028,-33.548 -6.40666,-4.94133 -11.29866,-11.29867 -14.66266,-16.88533 -3.816,-8.26934 -3.06,-14.164 -2.72,-15.82 M 17.9128,395.258 c 0,0 53.706665,-3.13867 96.952,-32.43333 0,0 2.092,-5.232 6.62533,1.39466 3.20533,4.684 7.62667,24.516 9.94533,35.748 h 5.56 C 135.55413,387.714 132.4568,365.57 128.46613,361.08067 c -5.58,-6.27734 130.78,-8.37067 137.75466,-8.71867 6.97467,-0.34933 69.74933,2.092 97.30133,6.27733 0,0 0.82534,23.996 -0.464,41.328 h 5.57467 c 0.484,-9.216 1.59333,-30.13866 1.864,-33.656 0,0 7.276,2.904 11.80933,6.39067 0,0 0.67067,14.69467 0.45867,27.26533 h 4.792 l -2.30533,-57.43466 c -0.0733,-1.01867 -0.18934,-1.864 -0.332,-2.56134 -2.15734,-16.44933 -7.67867,-54.12133 -13.764,-60.81866 -7.536,-8.29867 -41.548,-23.284 -51.864,-26.612 -8.256,-2.66267 -15.86933,-7.012 -23.65067,-10.77467 -2.75733,-1.332 -5.524,-2.64533 -8.29866,-3.94 -2.576,-1.20133 -4.79734,-3.11333 -7.196,-4.62533 -1.40267,-0.87467 -3.832,-1.67733 -5.29334,-0.54 -1.98933,1.54667 -3.576,3.56533 -4.844,5.73067 -0.71733,1.224 -1.596,2.33733 -2.25333,3.58533 -0.66533,1.26667 -1.54933,2.36933 -2.76,3.156 -0.59467,0.38667 -1.16667,0.688 -1.872,0.684 -0.66933,-0.005 -1.10667,0.11733 -1.516,0.73067 l -1.232,1.84933 -1.804,-2.52667 c -0.272,-0.37866 -0.69067,-0.624 -1.15333,-0.67333 -40.28267,-4.272 -57.30534,-51.29333 -57.424,-51.75866 -0.14,-0.54934 -0.556,-0.98667 -1.09733,-1.15467 -0.54534,-0.168 -1.13334,-0.04 -1.55734,0.33467 -0.10133,0.0893 -9.60266,8.45999 -15.88933,13.05999 -1.17467,-0.48666 -3.412,-0.49866 -8.44667,0.844 -4.85066,1.29467 -26.26266,13.67867 -46.968,25.656 -16.79066,9.712 -32.650662,18.88534 -36.655996,20.388 -8.445333,3.16667 -13.134666,9.50667 -14.209333,11.1 -1.077333,0.63734 -5.047999,2.44534 -8.318666,4.68 -6.669333,4.09867 -34.214666,29.696 -38.655999,41.65467 -4.124,11.10267 -15.314666,81.23466 -16.894666,89.96666 h 5.630666 z" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172014"/>
    <path d="m 320.33559,374.954 c -0.003,-0.0453 0.48934,-0.84667 0.48934,-0.84667 l 7.64266,-0.33333 -0.33066,3.02533 -0.40134,-0.0307 c 0,0 -6.85066,0.43866 -7.152,0.136 -0.30133,-0.30267 -0.24533,-1.90534 -0.248,-1.95067 m -2.224,5.524 c 0.42134,0.76667 9.07067,1.86267 9.07067,1.86267 l 3.39467,-13.14667 c 0,0 -8.404,-0.11067 -9.60267,0.10933 -1.2,0.21867 -2.31867,1.752 -2.644,4.05334 -0.32667,2.30133 -0.63867,6.35466 -0.21867,7.12133" style="fill:#d9a14b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172018"/>
    <path d="m 348.58052,376.90493 c -0.228,0.30267 -6.48933,-0.136 -6.48933,-0.136 l -0.35867,0.0307 -0.74933,-3.02533 6.96267,0.33333 c 0,0 0.564,0.80133 0.568,0.84667 0.005,0.0453 0.29466,1.648 0.0667,1.95066 m 1.51067,-3.548 c -0.63733,-2.30133 -1.87867,-3.83466 -2.996,-4.05333 -1.11733,-0.22 -8.70267,-0.11067 -8.70267,-0.11067 l 5.02934,13.148 c 0,0 7.66,-1.096 7.92666,-1.86266 0.26534,-0.76667 -0.62,-4.82134 -1.25733,-7.12134" style="fill:#d9a14b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172022"/>
    <path d="m 325.07319,398.59747 c -0.16933,0 -0.344,-0.048 -0.50533,-0.144 -0.38,-0.228 -0.62933,-0.68534 -0.636,-1.172 -0.007,-0.49467 -0.14933,-12.216 1.86933,-20.72267 2.048,-8.62533 5.78934,-17.97333 7.144,-20.19067 0.19467,-0.316 0.51467,-0.49066 0.85733,-0.472 0.344,0.02 0.67067,0.232 0.87734,0.572 0.40933,0.67334 10.048,16.73067 12.68266,38.38267 0.0693,0.56933 -0.19733,1.092 -0.64666,1.272 -0.448,0.18133 -0.96667,-0.028 -1.25867,-0.508 -1.79333,-2.93733 -5.16,-7.21067 -6.788,-7.21067 -0.0213,0 -0.044,0 -0.0653,0.003 -1.82667,0.13467 -8.644,5.89067 -12.90133,9.93467 -0.17867,0.16933 -0.40134,0.256 -0.62934,0.256" style="fill:#d9a14b;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172026"/>
    <path d="m 333.80212,356.72613 c -0.108,0 -0.208,0.0587 -0.26933,0.15867 -1.33066,2.17733 -5.01733,11.40667 -7.04533,19.94933 -1.99467,8.39734 -1.852,20.00267 -1.84533,20.49334 0.003,0.16133 0.0853,0.31466 0.212,0.39066 0.12266,0.0733 0.27733,0.0587 0.37866,-0.0373 2.896,-2.752 10.92667,-9.93067 13.27733,-10.104 l 0.108,-0.004 c 2.27467,0 6.11734,5.48 7.40667,7.592 0.0973,0.16 0.26933,0.228 0.41733,0.17067 0.152,-0.0613 0.24134,-0.236 0.21734,-0.42534 -2.60934,-21.44933 -12.144,-37.32666 -12.548,-37.992 -0.0693,-0.11333 -0.17867,-0.18533 -0.292,-0.19066 -0.005,-0.001 -0.012,-0.001 -0.0173,-0.001 m -8.67733,42.70267 c -0.288,0 -0.57866,-0.0827 -0.84266,-0.24 -0.632,-0.38 -1.048,-1.14533 -1.06,-1.95333 -0.007,-0.49867 -0.152,-12.33334 1.89466,-20.952 2.06667,-8.70534 5.86267,-18.17467 7.24134,-20.42934 0.32266,-0.52666 0.85066,-0.82533 1.42666,-0.78933 0.57333,0.0333 1.12,0.38933 1.464,0.95467 0.41333,0.68 10.156,16.90533 12.816,38.77333 0.116,0.94667 -0.32667,1.81867 -1.076,2.11867 -0.748,0.30133 -1.612,-0.0453 -2.1,-0.84534 -2.14267,-3.51066 -5.14,-6.83066 -6.168,-6.83066 -1.47867,0.108 -7.67466,5.13733 -12.548,9.76666 -0.28933,0.27467 -0.66266,0.42667 -1.048,0.42667" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172030"/>
    <path d="m 333.90839,359.4808 c -1.61066,3.492 -4.41733,11.02 -6.05066,17.904 -1.372,5.77467 -1.70267,13.32933 -1.77734,17.30933 3.332,-3.04666 9.71733,-8.592 12.24,-8.77733 2.024,-0.152 4.45467,2.31333 6.27467,4.64 -2.58934,-15.004 -8.412,-26.85467 -10.68667,-31.076" style="fill:#999999;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172034"/>
    <path d="m 345.49786,382.88827 c 0,0 5.656,-0.876 6.16533,-1.75334 0.508,-0.876 -0.0187,-4.41733 -0.64667,-6.608 -0.62666,-2.192 -1.36933,-5.00533 -3.44533,-5.55333 -2.07733,-0.54667 -7.08667,-0.876 -7.08667,-0.876 l 0.70134,2.08133 c 0,0 6.06666,0.0227 6.89733,0.65734 0.96933,0.74133 1.65333,2.07066 1.972,3.944 0.30533,1.79866 1.096,4.492 0.904,5.14933 -0.192,0.65733 -6.216,1.20533 -6.216,1.20533 z" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172038"/>
    <path d="m 343.27919,376.3148 c 0,0 3.98667,0.21867 4.83067,0.21867 0.844,0 0.15333,-1.972 -0.52267,-1.972 -0.67467,0 -4.99867,-0.21867 -4.99867,-0.21867 l -0.0827,-0.876 c 0,0 4.84,0.31867 5.516,0.328 0.676,0.009 1.13333,2.19067 1.11066,2.84933 -0.0227,0.65734 -1.45733,0.65734 -2.21733,0.65734 -0.75867,0 -3.46933,-0.11067 -3.46933,-0.11067 z" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172042"/>
    <path d="m 324.97719,382.88827 c 0,0 -6.39733,-0.876 -7.10533,-1.75334 -0.70667,-0.876 -0.588,-4.44933 -0.256,-6.64 0.332,-2.192 0.97867,-4.848 3.184,-5.396 2.20533,-0.548 7.284,-1.00133 7.284,-1.00133 l -0.432,2.08133 c 0,0 -6.832,-0.15466 -7.51733,0.65734 -0.54134,0.64266 -1.34934,2.54 -1.61467,4.29333 -0.26667,1.75333 -0.388,4.14267 -0.068,4.8 0.32,0.65733 7.07067,1.20533 7.07067,1.20533 z" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172046"/>
    <path d="m 326.34773,376.3148 c 0,0 -4.372,0.21867 -5.30534,0.21867 -0.932,0 -0.49333,-1.972 0.25334,-1.972 0.74666,0 5.49066,-0.21867 5.49066,-0.21867 l -0.0533,-0.876 c 0,0 -5.29867,0.31867 -6.044,0.328 -0.74533,0.009 -0.892,2.19067 -0.75867,2.84933 0.13334,0.65734 1.72,0.65734 2.55867,0.65734 0.84,0 3.81867,-0.11067 3.81867,-0.11067 z" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172050"/>
    <path d="m 219.51133,258.96734 c -4.76,-3.34934 -14.796,-9.37067 -28.60533,-22.44 -13.80934,-13.07067 -10.85067,-27.12667 -10.85067,-27.12667 l 17.78267,-14.77466 2.24533,3.81466 c 0.0533,13.20667 7.13866,22.95733 15.48266,31.18133 7.41067,7.304 11.40134,14.18934 24.04267,17.34934 4.20667,1.052 3.568,11.54666 3.352,13.924 -0.216,2.37733 -9.3,8.028 -23.44933,-1.928" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172060"/>
    <path d="m 251.72759,333.67013 c -1.63466,-6.52399 -3.46533,-12.99466 -5.42266,-19.42799 -0.003,-0.007 -0.004,-0.012 -0.007,-0.0187 3.75467,7.66267 7.26933,14.83733 9.496,19.384 -1.34,0.0187 -2.704,0.0413 -4.06667,0.0627 m -13.75066,0.252 c -3.62667,-20.32666 -9.33734,-40.37599 -17.564,-59.33733 3.04133,1.94534 6.116,3.84667 9.24933,5.67867 0.31467,0.64 0.80667,1.64533 1.44533,2.948 6.568,16.79467 12.524,33.804 19.66667,50.47333 -4.18133,0.068 -8.45333,0.14667 -12.79733,0.23733 m -15.032,0.34134 c -1.01334,-4.668 -2.152,-9.30933 -3.28667,-13.95733 -1.45067,-5.968 -3.55067,-12.26134 -5.44267,-18.084 -5.38933,-16.51734 -12.50933,-32.576 -21.53066,-47.464 -0.10667,-0.20667 -0.232,-0.43467 -0.36933,-0.672 3.652,3.19733 7.49466,6.17333 11.37066,9.05466 3.516,2.57067 7.076,5.04934 10.66933,7.472 4.62134,9.72267 8.65734,19.73734 12.252,29.88267 3.92,11.02 7.476,22.17733 10.632,33.44133 -4.704,0.0987 -9.484,0.20933 -14.29466,0.32667 m 10.49333,-55.13867 -5.48,-3.79066 c -3.33333,-1.99467 -6.65467,-4.024 -9.94667,-6.104 l -6.35333,-4.11334 c -6.532,-4.34933 -12.87866,-8.972 -18.84266,-14.06133 -2.90667,-2.56533 -5.81067,-5.23067 -8.264,-8.24667 -0.068,-0.084 -0.13734,-0.168 -0.204,-0.252 -0.79467,-0.992 -1.54134,-2.02133 -2.21867,-3.1 -1.396,-2.212 -2.04533,-4.82266 -3.112,-7.26266 -1.25867,-3.428 -3.17067,-7.20134 -4.636,-11.04267 -1.10133,-3.75467 -2.32133,-10.73067 -0.404,-12.99733 l -1.744,0.17466 c 0,0 -3.31867,1.87334 -0.87467,8.95867 -2.98266,-1.41467 -6.11333,-2.484 -9.40533,-3.08133 l -1.16133,0.65066 c 2.064,0.54267 4.1,1.176 6.05866,2.00934 1.8,0.75866 3.508,1.68533 5.156,2.70933 1.31734,4.324 3.512,9.52533 5.00134,13.428 0.24666,0.61467 0.464,1.212 0.676,1.80667 -3.08934,-3.29734 -6.4,-6.384 -10.05067,-9.01334 -3.15867,-2.468 -6.844,-4.476 -10.56267,-5.97733 -1.044,-0.40267 -2.13333,-0.76 -3.24533,-1.05733 l -1.48533,0.83333 c 0.864,0.32667 2.25333,0.82667 3.01733,1.124 0.58267,0.232 2.576,1.364 3.108,1.604 13.408,7.70933 24.832,23.076 34.20533,40.05867 9.372,16.98133 16.69333,35.57733 21.89467,49.744 1.88533,4.83733 5.12266,15.03466 7.432,22.16133 -4.388,0.108 -8.796,0.22266 -13.204,0.34266 -0.8,-3.98399 -1.69734,-7.95066 -2.61867,-11.91599 -0.12,-0.51334 -0.244,-1.02667 -0.36533,-1.54 -1.368,-5.79067 -3.31334,-11.85467 -5.128,-17.516 -2.27467,-7.06934 -4.896,-14.04934 -7.888,-20.86267 -3.77867,-8.60667 -8.35067,-16.824 -13.15867,-24.87733 -1.712,-2.868 -5.94133,-8.59867 -8.048,-11.29867 -4.564,-5.852 -10.00533,-11.20667 -16.06666,-15.588 -3.024,-2.18533 -6.41334,-4.08533 -9.89867,-5.41867 -0.816,-0.31333 -1.66,-0.59466 -2.52,-0.83866 l -1.50533,0.844 c 0.83466,0.29866 1.932,0.72533 2.612,1 0.616,0.248 2.41466,1.236 2.972,1.52533 1.336,0.692 2.59466,1.56267 3.85866,2.44667 7.86134,5.488 14.90667,13.47466 21.15867,22.63733 2.79867,4.096 5.436,8.42533 7.916,12.87333 2.62933,4.716 5.08133,9.564 7.35867,14.404 1.11733,2.37867 2.668,5.78 3.692,8.13067 1.05866,2.42933 2.476,5.888 3.43466,8.23867 2.37067,5.79866 4.49067,11.65733 6.344,16.704 0.776,2.112 1.86267,5.256 2.924,8.508 1.18267,3.61733 2.72667,8.65466 3.952,12.56933 -4.40933,0.12 -8.80666,0.244 -13.17066,0.368 -0.70267,-3.84267 -1.504,-7.668 -2.348,-11.492 -0.10934,-0.49733 -0.22534,-0.99333 -0.34,-1.48933 -1.28667,-5.61467 -3.076,-11.448 -4.812,-16.94667 -2.16934,-6.84 -4.69067,-13.588 -7.60134,-20.15467 -3.67733,-8.3 -8.10133,-16.23066 -12.964,-23.864 -1.84266,-2.892 -5.77733,-8.028 -8.02,-10.72133 -4.38133,-5.26533 -9.46533,-10.15333 -15.15733,-14.088 -2.84133,-1.96533 -5.99333,-3.66533 -9.23467,-4.86133 -0.59466,-0.22 -1.20666,-0.41734 -1.82533,-0.60134 l -1.50533,0.844 c 0.748,0.27467 1.62133,0.62 2.21866,0.868 0.648,0.268 2.24,1.13334 2.836,1.44534 1.27334,0.66666 2.48267,1.47866 3.68934,2.312 7.62266,5.24266 14.38933,12.75333 20.35466,21.34266 2.704,3.884 5.24,7.988 7.616,12.20267 2.52667,4.47867 4.872,9.084 7.044,13.68533 0.89334,1.904 2.71067,5.85334 3.52934,7.73334 0.84666,1.944 2.472,5.97733 3.23866,7.85733 2.20267,5.36267 4.24667,11.132 5.95334,15.93333 0.732,2.06267 1.77733,5.14134 2.728,8.10934 0.91466,2.86133 2.43333,8.02133 3.60666,11.91466 -4.436,0.12667 -8.828,0.256 -13.14666,0.38267 -0.608,-3.70667 -1.31467,-7.39867 -2.08134,-11.088 -0.0987,-0.48 -0.20933,-0.95867 -0.316,-1.43733 -1.204,-5.43734 -2.83866,-11.04267 -4.49733,-16.37867 -2.06267,-6.60933 -4.48533,-13.12533 -7.31333,-19.44667 -3.576,-7.99333 -7.872,-15.628 -12.768,-22.84933 -1.97867,-2.916 -5.60667,-7.45867 -7.99334,-10.144 -4.17333,-4.69467 -8.928,-9.1 -14.248,-12.58933 -2.65866,-1.744 -5.57333,-3.244 -8.56933,-4.30267 -0.36933,-0.13067 -0.74267,-0.25467 -1.12133,-0.372 l -1.524,0.85467 c 0.63733,0.24266 1.31466,0.51333 1.83333,0.73333 0.68133,0.288 2.06667,1.032 2.7,1.36667 1.21067,0.63866 2.36933,1.39466 3.51867,2.17466 7.38666,5 13.87333,12.03467 19.55333,20.05067 2.608,3.672 5.04267,7.548 7.316,11.53067 2.42267,4.24266 4.66,8.604 6.72667,12.96666 0.66933,1.428 2.75466,5.92534 3.36933,7.336 0.63467,1.45867 2.464,6.06667 3.04267,7.476 2.02266,4.932 3.99866,10.60667 5.56133,15.164 0.68933,2.01334 1.69333,5.02534 2.53067,7.70934 0.66266,2.12533 2.15066,7.392 3.27333,11.27599 -4.476,0.132 -8.85867,0.26134 -13.132,0.388 -0.51333,-3.57333 -1.12667,-7.13466 -1.816,-10.68933 -0.0893,-0.464 -0.19333,-0.924 -0.292,-1.38666 -1.12133,-5.26134 -2.60133,-10.636 -4.18267,-15.81067 -1.956,-6.37867 -4.27866,-12.66267 -7.02533,-18.73733 -3.47467,-7.68667 -7.66,-15.01867 -12.57333,-21.83467 -2.11734,-2.93867 -5.42534,-6.89867 -7.96534,-9.56667 -3.94133,-4.14266 -8.39066,-8.048 -13.33866,-11.092 -2.47734,-1.52266 -5.15334,-2.82266 -7.90534,-3.744 -0.14266,-0.048 -0.29333,-0.0827 -0.43733,-0.128 l -1.524,0.85334 c 0.50667,0.19866 1.01733,0.408 1.45067,0.596 0.71333,0.308 1.892,0.92933 2.56533,1.288 1.148,0.60933 2.256,1.30933 3.348,2.03866 7.14933,4.75467 13.356,11.31334 18.74933,18.756 2.51334,3.46 4.848,7.11067 7.01734,10.86 2.31866,4.00534 4.45866,8.12 6.40933,12.248 0.44933,0.95067 2.79867,5.99867 3.208,6.93867 0.424,0.97333 2.46,6.156 2.84667,7.09467 1.84933,4.49733 3.752,10.08266 5.16933,14.39466 0.64667,1.96267 1.60933,4.908 2.33467,7.30934 0.424,1.40533 1.87466,6.76 2.94666,10.64133 -1.168,0.0347 -2.34533,0.0693 -3.49466,0.10266 -3.21067,0.0893 -6.41734,0.19467 -9.624,0.312 -0.42134,-3.44799 -0.94134,-6.88533 -1.556,-10.31733 -0.08,-0.44666 -0.17734,-0.88933 -0.26934,-1.33466 -1.03733,-5.084 -2.36266,-10.22934 -3.86666,-15.24134 -1.848,-6.14933 -4.072,-12.20133 -6.73734,-18.03066 -3.37333,-7.38 -7.45466,-14.404 -12.37733,-20.82 -2.26,-2.96134 -5.23467,-6.34534 -7.93867,-8.98934 -3.68933,-3.60666 -7.85466,-6.996 -12.42933,-9.592 -2.21067,-1.25466 -4.55467,-2.31333 -6.96267,-3.09066 l -1.565329,0.87733 c 0.369333,0.15067 0.738667,0.304 1.078667,0.45333 0.742662,0.33067 1.716002,0.828 2.428002,1.208 1.088,0.58 2.144,1.22667 3.17866,1.904 6.912,4.51067 12.83867,10.592 17.94534,17.46267 2.41866,3.248 4.652,6.67067 6.71866,10.188 2.21467,3.768 4.25067,7.63867 6.092,11.53067 0.22534,0.47466 2.84267,6.07066 3.04667,6.54133 0.212,0.48533 2.45733,6.244 2.652,6.71333 1.676,4.06134 3.49333,9.56 4.77733,13.62267 0.59867,1.916 1.524,4.792 2.13734,6.91067 0.20266,0.69866 1.61733,6.15466 2.63866,10.04399 -4.37066,0.16267 -8.74266,0.352 -13.12266,0.576 -0.35467,-3.37466 -0.828,-6.73999 -1.29734,-10.11599 -2.11733,-11.31867 -5.36133,-22.72 -10.24666,-33.27867 -4.884,-10.55867 -11.41067,-20.27333 -20.09334,-28.21733 -4.916,-4.38534 -10.733329,-8.36534 -17.094662,-10.40667 l -1.618667,0.90667 c 2.092,0.88933 4.104,1.98533 6.009333,3.20533 6.675996,4.268 12.321336,9.872 17.142666,16.16933 4.82133,6.29867 8.81867,13.28934 12.196,20.32934 l 2.88533,6.144 c 0,0 2.45467,6.332 2.45467,6.332 1.52667,3.61733 3.23467,9.03866 4.38667,12.85333 0.55066,1.868 1.53866,4.64933 1.94133,6.512 0,0 1.43733,5.808 2.37867,9.612 -2.128,0.11066 -4.26134,0.236 -6.39467,0.36266 -6.34,-19.56533 -13.984,-38.97466 -26.38267,-55.52799 -6.227996,-8.41334 -13.726662,-17.464 -23.783995,-20.992 l -0.541334,0.48666 c 5.982667,2.284 11.109333,6.552 15.268,11.44934 11.041329,12.776 19.043999,27.868 25.099999,43.56666 3.104,7.916 5.848,15.98534 8.18133,24.156 l 132.752,-3.064 0.60133,-0.012 -0.268,-0.53733 z" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172076"/>
    <path d="m 297.87946,330.05214 -0.34933,3.65866 c -2.392,-0.248 -4.78267,-0.49866 -7.17467,-0.73066 4.19067,-15.65334 3.54533,-35.212 -1.34133,-50.58934 0.0333,-0.20133 0.0573,-0.404 0.0907,-0.60666 0.35334,-1.63734 0.61734,-3.09867 1.336,-4.49734 1.51334,-2.26 2.39734,-5.34666 2.79334,-8.77066 1.43733,4.612 2.38933,9.38933 3.20266,14.14133 2.432,15.63067 2.576,31.64267 1.44267,47.39467 m -9.02267,2.78266 c -1.39333,-0.13333 -2.78666,-0.26933 -4.18,-0.404 0.82534,-14.64666 1.47734,-29.432 3.43067,-43.96933 0.11733,1.61333 0.23733,3.22667 0.344,4.84133 0.772,13.16134 1.04267,26.36267 0.40533,39.532 m 71.844,11.2 c 0,0 0.29733,0.0293 0.296,0.0293 0.001,0 0.0387,-0.29333 0.0387,-0.29333 3.08,-12.02 4.632,-25.336 5.308,-37.70533 0.32,-6.184 0.0413,-12.65733 -0.14934,-18.85467 -0.328,-4.63866 -1.668,-8.60933 -3.14266,-13.07066 -0.12267,-0.0733 -0.23334,-0.14267 -0.36,-0.21867 -0.14934,-0.0893 -0.31867,-0.188 -0.48,-0.284 1.40533,4.624 1.928,10.288 2.05333,15.05733 -0.28533,12.29734 -0.804,22.668 -2.228,34.88934 -0.63733,5.156 -1.92933,10.98666 -3.77333,16.90266 -1.57067,-0.19333 -3.13467,-0.38667 -4.728,-0.57867 1.28933,-5.192 2.43333,-10.41733 3.16266,-15.70799 1.09467,-6.67334 1.736,-13.40667 2.06534,-20.168 0.352,-10.144 0.26,-20.69734 -3.028,-30.476 -0.624,-1.73334 -1.444,-3.416 -2.49867,-4.94267 -0.50267,-0.272 -1.01733,-0.548 -1.54,-0.828 0.11067,0.13867 0.21867,0.27467 0.31733,0.40267 3.58934,6.17333 3.83467,13.67733 4.23734,20.65466 0.184,2.87067 0.0587,7.136 0.0693,10.052 -0.39733,13.68534 -1.792,27.34534 -3.54667,40.92267 -2.796,-0.33734 -5.624,-0.672 -8.47066,-1.00534 0.46133,-2.104 1.19733,-5.52266 1.48933,-6.83199 3.19733,-17.11334 4.45733,-34.956 1.51867,-52.19467 -1,-4.544 -2.248,-9.24133 -4.42934,-13.37733 -1.03733,-1.7 -2.22,-3.59067 -3.71333,-5.05067 -1.10267,-0.54267 -2.20533,-1.076 -3.30267,-1.59867 1.12534,0.61334 2.08534,1.6 2.90534,2.59334 3.224,4.336 4.66266,9.87333 5.612,15.12266 1.62933,8.87467 1.696,18.124 1.66533,27.14134 -0.188,4.85733 -0.38,11.492 -0.83733,16.336 -0.368,5.94 -1.05467,11.852 -1.71467,17.76666 -2.804,-0.32667 -5.61867,-0.65067 -8.44533,-0.972 0.588,-2.748 1.18133,-5.82133 1.63066,-7.97733 2.048,-11.62533 2.892,-23.79733 2.34934,-35.608 -0.14667,-3.89333 -0.70134,-8.112 -1.18,-11.96133 0,0 -1.20667,-5.936 -1.20667,-5.936 -1.456,-6.36134 -4.73466,-15.78267 -10.36266,-20.80934 -1.11067,-0.46133 -2.18267,-0.888 -3.2,-1.272 4.45066,3.416 6.88533,8.89867 8.63466,14.09867 0.29467,0.75333 0.68,2.04667 0.844,2.80933 0.38934,1.69334 1.09333,4.01334 1.33333,5.71867 l 0.96934,5.8 c 0,0 0.58266,5.85333 0.58266,5.85333 0.18134,1.46 0.37734,4.39467 0.392,5.86667 0.35867,5.484 0.292,12.164 0.21334,17.656 -0.25467,8.57867 -0.98,17.128 -1.80267,25.67066 -2.808,-0.31733 -5.61733,-0.632 -8.42533,-0.94266 0.66267,-3.51733 1.72933,-8.884 2.248,-12.336 2.41467,-20.14267 2.652,-41.45067 -4.95467,-60.60667 -1.916,-4.16266 -4.14133,-8.388 -7.26,-11.80266 -0.98133,-0.264 -1.99333,-0.57334 -3.052,-0.94934 0.368,0.40267 0.732,0.80934 1.07734,1.22267 13.77333,18.00667 13.212,53.16267 11.85733,75.16933 0,0 -0.44667,5.57067 -0.73867,9.212 -2.81333,-0.31067 -5.61866,-0.616 -8.408,-0.916 1.88,-9.05733 2.91067,-18.28933 3.40667,-27.52666 -0.0173,-5.336 0.15333,-11.95467 -0.47467,-17.25734 l -0.65466,-6.91066 c -0.544,-3.316 -1.31334,-6.96134 -1.93334,-10.28667 -0.716,-2.636 -1.66133,-5.804 -2.48933,-8.416 -0.73467,-1.82933 -1.88267,-4.732 -2.672,-6.53733 -0.55067,-1.124 -1.91733,-3.532 -2.53867,-4.684 -1.26133,-2.28934 -2.96,-4.548 -4.744,-6.60534 -1.58666,-0.756 -3.19333,-1.55333 -4.80666,-2.376 2.116,2.2 3.95466,4.72134 5.46666,7.30134 6.88,11.652 9.39334,25.52533 10.75467,38.86266 0.544,3.87334 0.63867,9.58534 0.83733,13.544 0.252,3.916 -0.0187,9.58934 -0.0293,13.58 0.0347,3.848 -0.57733,11.79867 -0.95467,17.22267 -2.836,-0.304 -5.64533,-0.60134 -8.432,-0.89334 1.21467,-6.27599 2.27467,-12.61599 2.676,-19.00133 0.24667,-3.66533 0.46667,-7.344 0.60534,-11.01866 -0.0493,-2.29734 -0.25067,-8.71734 -0.316,-11.07067 -0.256,-4.86 -1.04,-9.92133 -1.70667,-14.74 -1.54667,-7.26267 -3.27333,-14.716 -6.49067,-21.48933 0,0 -1.55333,-3.43734 -1.55333,-3.43734 -0.988,-1.99066 -2.736,-4.54933 -3.85733,-6.524 -1.696,-2.37466 -3.59467,-4.724 -5.696,-6.868 -2.28934,-1.19866 -4.49867,-2.34133 -6.56667,-3.35466 4.80667,4.06133 8.59733,9.34133 11.43333,14.93333 6.39334,12.36533 8.964,26.27867 10.57334,39.99867 0.212,3.27466 0.61866,9.40933 0.82933,12.66 0.0773,2.548 0.032,8.216 0.0533,10.88 0.13867,4.29333 -0.44533,13.14533 -0.77466,18.95066 -1.768,-0.18533 -3.53867,-0.37067 -5.27734,-0.54933 -0.74133,-0.0813 -1.484,-0.14934 -2.22666,-0.228 5.43733,-21.09733 4.88266,-48.82533 -5.61467,-67.53867 0.26533,-4.96 -0.33467,-10.016 -1.65867,-14.8 -1.08666,-3.928 -2.75333,-7.77333 -5.49066,-10.84266 -1.84267,-2.06534 -4.00134,-3.79867 -6.20667,-5.468 l -2.73333,-0.59467 c 0.57866,0.496 2.036,1.74667 2.036,1.74667 3.38266,2.88 6.05866,5.67466 8.01733,9.72266 1.91733,3.96267 2.88667,8.316 3.30133,12.68 0.516,5.42134 0.456,11.96 -2.596,16.71067 -1.11866,1.65067 -1.56933,3.70267 -2.03466,5.60267 -3.51734,17.948 -4.3,36.30533 -5.47734,54.51866 0,0 -0.02,0.36 -0.02,0.36 l 0.36,0.0373 z" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172096"/>
    <path d="m 93.776931,357.0352 c -0.333333,-2.62933 -0.506667,-5.28267 -0.505333,-7.92533 0.01067,-11.056 3.717333,-22.516 12.105332,-30.036 0.99067,-0.96133 2.072,-1.81867 3.18133,-2.64133 0.47467,1.06933 0.83467,0.88533 1.424,3.496 0.50267,2.22933 -1.04666,6.97466 -3.488,9.93866 -4.708,4.01067 -8.049329,14.396 -6.22133,23.428 -2.143999,1.28267 -4.309332,2.53333 -6.495999,3.74 m -13.130666,6.592 c -0.878667,-4.856 -1.146667,-9.83467 -0.878667,-14.75467 0.714667,-13.64266 6.549333,-26.90266 16.290666,-36.49333 2.558667,-2.54133 5.355996,-4.82933 8.291996,-6.93333 1.972,5.10267 1.62934,9.39733 1.39067,10.992 -14.171999,7.24267 -19.298665,26.796 -13.619999,41.49866 -3.76,2.02934 -7.582666,3.94 -11.474666,5.69067 m -11.661333,4.676 c -2.250667,-16.46 -2.994667,-33.832 2.768,-49.496 3.577333,-8.68933 11.043999,-15.11066 18.753332,-20.172 2.965334,-1.912 6.038667,-3.656 9.184,-5.26266 2.375996,5.39466 2.225336,9.30533 1.858666,11.28933 -2.706666,1.58267 -5.287999,3.41733 -7.703999,5.48533 -15.284,12.684 -21.257333,35.43333 -14.504,54.052 -3.4,1.49333 -6.850666,2.86667 -10.355999,4.104 m -1.252,0.44533 c -5.338667,1.90267 -10.696,3.76 -16.094667,5.47467 -0.748,-9.11067 -1.118666,-18.25733 -0.956,-27.392 0.437334,-10.78933 0.709334,-22.27466 5.761334,-32.03333 4.897333,-9.79733 11.458666,-18.876 20.533332,-25.18267 4.958667,-3.55733 10.338667,-6.43333 15.9,-8.94933 3.06,6.004 3.104,9.81467 2.632,11.90533 -11.477333,5.21867 -22.366666,12.92534 -27.459999,24.74 -5.952,16.51467 -4.645334,34.784 -0.217334,51.40267 -0.03333,0.0107 -0.06533,0.024 -0.09867,0.0347 m 48.004002,-32.604 c -0.692,0.436 -2.196,8.908 -5.18533,10.78267 -2.62,1.644 -5.492,3.44 -7.51067,4.68533 0.43467,-7.428 2.01333,-15.03733 6.5,-21.04133 0.80933,-1.10133 1.74,-2.14933 2.79867,-2.98666 l 0.55333,-0.28934 c 0,0 -0.55867,-1.79066 -6.04267,-18.24 -5.48266,-16.44933 -12.754666,-28.95333 -12.754666,-28.95333 l -2.128,-4.84133 -2.797334,-1.23067 c 1.776,2.32667 1.672,4.21333 1.217334,5.44933 -5.268,1.97867 -10.394667,4.432 -15.245333,7.57734 -9.777333,6.03333 -17.117333,15.836 -22.245333,25.892 -0.969333,1.82266 -1.992,4.20133 -2.584,6.28266 -2.664,8.92534 -2.992,18.38667 -2.776,27.544 0.28,9.36133 1.266667,18.63867 3.065333,27.77467 -3.14,0.984 -6.290666,1.92933 -9.469333,2.77066 -1.556,0.38934 -3.124,0.77467 -4.7,1.13467 -1.450666,-10.62267 -2.044,-21.37733 -1.646666,-32.084 0.576,-12.64267 2.462666,-25.63866 8.444,-36.92933 2.893333,-5.76267 7.442666,-10.22667 12.338666,-14.32133 9.670666,-8.31867 20.179999,-15.73467 31.719999,-21.23334 0.434667,-0.21333 0.877333,-0.408 1.313333,-0.616 -0.533333,-0.51333 -1.064,-0.99866 -1.581333,-1.44533 -6.252,2.49333 -12.356,5.34 -18.034666,9.036 -5.581333,3.396 -10.789333,7.34 -15.845333,11.428 -5.348,4.20533 -10.270666,9.20933 -13.42,15.26133 -10.617333,20.69734 -9.599999,48.352 -4.273333,71.12133 -3.270666,0.71867 -6.576,1.28934 -9.901333,1.468 -0.64,-4.08 -1.130667,-8.188 -1.466667,-12.30266 -0.733333,-9.70667 -0.88,-19.552 0.153334,-29.25067 l -3.348,19.41333 c 0.557333,7.47867 1.672,14.90934 3.478666,22.172 -1.28,0.032 -2.561333,0.0227 -3.844,-0.0827 -1.122666,-0.12 -2.254666,-0.32667 -3.327999,-0.67467 l -0.212,1.22533 c 32.881332,7.62134 99.842664,-33.74266 99.842664,-33.74266 l 0.216,-3.31734 z" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172112"/>
    <path d="m 77.248398,269.74067 c 1.352,-0.53467 2.713333,-1.048 4.077333,-1.55333 -0.86,-0.388 -1.757333,-0.76534 -2.614666,-1.10934 -5.558667,1.692 -11.013333,3.72534 -16.306667,6.20934 l -4.142666,3.23066 -5.454667,6.22534 c 7.344,-5.64267 15.865333,-9.56667 24.441333,-13.00267" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172128"/>
    <path d="m 29.220799,309.65907 -2.644,15.332 c 2.086667,-8.21067 5.333334,-16.18533 9.74,-23.43067 z" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172144"/>
    <path d="m 381.61786,356.58493 c -0.90267,-4.332 -3.40667,-15.60533 -6.80934,-24.83866 l -0.044,0.11067 c 0.144,-1.24534 0.356,-2.39734 0.66,-3.39067 0.16534,-0.54267 0.304,-1.244 0.42134,-2.052 1.396,6.02267 4.72933,20.90133 5.828,30.216 z m -5.784,-4.74266 c 0,0 -1.26267,-7.58267 -1.31334,-14.716 1.584,4.00933 4.62667,12.344 4.78934,17.56666 z m 8.17333,-3.29067 c -1.82933,-7.664 -4.608,-18.18 -7.78133,-26.37466 0.0893,-1.728 0.13466,-3.65867 0.14666,-5.708 1.248,2.47466 3.296,6.97066 5.35467,11.448 -0.32,-2.184 -0.656,-4.46 -1.00533,-6.77467 l -4.35867,-8.00533 c -0.0813,-7.884 -0.54267,-16.66134 -0.85333,-21.81734 -0.12934,-0.50933 -0.25467,-0.976 -0.37334,-1.35733 -0.20533,-0.66933 -0.404,-1.29067 -0.59866,-1.888 l -1.36934,0.81467 c 0,0 2.46134,34.24533 0.20534,41.628 -2.256,7.38133 0.40933,23.37599 0.40933,23.37599 l 10.25333,8.408 c 0,0 0.15467,-0.008 0.42,-0.0227 z" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172160"/>
    <path d="m 181.55026,206.67747 -0.0893,-0.68667 -7.05067,0.98134 -40.91333,21.15466 -38.589332,22.54934 -11.854667,6.044 -6.742666,6.276 -9.458667,6.824 -8.589333,6.69866 -29.041332,33.14 -14.397333,83.48533 -1.176,6.82267 h 33.339999 c -3.268,-83.98666 57.414661,-97.476 57.414661,-97.476 0,0 -0.69733,-9.068 6.97467,-11.85733 67.72267,-24.62667 100.31466,-25.05867 100.31466,-25.05867 0,0 -44.01599,-30.208 -30.14133,-58.89733" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172176"/>
    <path d="m 155.9916,353.1308 c -14.48934,1.07867 -25.88534,2.11867 -32.53334,2.76133 l -1.27066,2.224 c 0,0 8.308,20.30934 11.91733,41.85067 h 14.96 c 1.04,-22.69333 5.88533,-42.744 6.92667,-46.836" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172192"/>
    <path d="m 274.23093,271.50774 -2.432,16.08533 -2.21467,-18.408 0.26533,-7.68 c 1.02667,-1.524 4.72534,-6.69333 6.62667,-5.004 2.21867,1.97333 -2.24533,15.00667 -2.24533,15.00667 m -3.98667,27.788 c -0.29867,2.46 -1.39867,2.476 -1.788,-0.76667 -1.13467,-9.43467 -3.93067,-27.74533 -3.93067,-27.74533 0,0 2.65734,-0.432 3.66,-2.19867 l 2.74934,24.06667 c 0,0 -0.31067,3.52266 -0.69067,6.644 m 6.72533,-53.152 -8.428,3.94266 c 0,0 -3.37333,1.588 -0.92533,15.82934 -0.25067,0.58933 -0.488,1.06133 -0.69333,1.328 -0.384,0.49866 -2.19334,0.88933 -3.03334,1.19333 -3.256,-9.04667 0.77734,-19.536 1.536,-20.672 l -4.424,2.91733 c -0.60933,-0.11066 -2.86933,10.04934 -1.036,16.716 0.23067,0.83867 -0.24533,2.25867 -1.06666,2.164 -1.23067,-0.14266 -3.11467,0.27067 -3.24667,-0.524 -1.596,-9.62533 0.388,-17.56266 0.388,-17.56266 l -5.74667,-1.94 c 0,0 1.63734,1.93733 1.64134,2.86133 0.016,3.89467 -0.072,13.06533 0.0533,14.036 0.156,1.20267 -0.896,1.88267 -1.428,1.812 -2.976,-0.39733 -5.99867,-1.08933 -9.504,-1.85467 0,0 7.932,3.61867 11.868,4.21334 l 8.75867,47.128 3.11066,3.10266 -7.18666,-49.23466 3.45066,0.44266 c 0,0 4.288,25.796 6.404,44.24934 l -1.4,9.25866 8.19467,10.84933 5.35467,-63.57066 c 0,0 2.78266,-6.71067 2.78266,-10.16267 0,-3.452 -5.424,-16.52266 -5.424,-16.52266" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172208"/>
</g>`;

const DefaultRed = "#d30000";

class UniformCatalog {

    private static _instance: UniformCatalog;

    public static get instance() {
        if (UniformCatalog._instance == null) {
            UniformCatalog._instance = new UniformCatalog();
        }
        return UniformCatalog._instance;
    }

    getBody(token: Token) {
        return DominionWarAverageBody.replace(DefaultRed, token.divisionColor).replace(SpeciesOptions.DEFAULT_SKIN_COLOR, token.skinColor);
    }

}

export default UniformCatalog;