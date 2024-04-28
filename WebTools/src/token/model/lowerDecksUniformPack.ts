import { BaseTngEraUniformPack } from "./baseTngEraUniformPack";
import { BodyType } from "./bodyTypeEnum";
import SpeciesRestrictions from "./speciesRestrictions";
import Swatch from "./swatch";
import { Token } from "./token";
import UniformCatalog, { DefaultRed } from "./uniformCatalog";
import { UniformEra } from "./uniformEra";
import { IUniformPack } from "./uniformPack";

const LowerDeckUniforms = {
    averageMale: `<g>
        <path id="path171958" style="fill:#2d2d2d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="m 193.60179,196.48469 -8.0139,17.57723 -7.34095,4.16145 c -2.59874,0.19134 -41.97428,16.78563 -41.97428,16.78563 l -38.850355,17.6964 -14.169096,5.51664 -6.942852,4.77402 -10.418424,5.67289 c -11.834766,12.45088 -18.236587,26.45517 -24.011264,42.06344 l -14.60893,78.69588 c 0,0 0.502529,10.5717 6.644087,10.5717 h 42.386718 c 18.742349,0 32.553466,-21.75306 45.613286,-31.41016 0,0 77.47877,-4.76073 153.33203,-3.1914 75.85191,1.56934 91.18554,2.91601 91.18554,2.91601 l 3.25963,1.11809 15.59343,14.54342 -1.4761,-41.44276 c -1.52533,-11.00266 -6.3445,-45.00027 -8.67383,-52.57226 -2.78933,-9.06532 -4.29199,-11.15773 -12.44531,-16.03906 -8.97809,-4.51536 -33.96956,-14.36366 -46.09778,-19.78932 -9.78239,-4.37624 -31.49446,-13.79316 -41.71845,-18.13583 l -1.81173,1.05805 c -1.63186,2.11143 -3.49131,5.03341 -4.77439,8.69327 l -5.22461,2.25781 -2.74023,0.0293 -3.75586,-0.875 c -10.87332,-1.412 -25.98221,-10.5912 -35.01953,-17.22852 -9.03866,-6.63733 -24.78799,-29.0816 -24.78799,-29.0816 l -1.57805,-2.29133 z" />
        <path id="path171962" style="fill:#d30000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="m 194.5662,196.43735 c -3.54672,1.36125 -4.42966,3.83905 -4.82812,4.07812 l 4.0498,5.77229 13.93673,15.38607 15.77344,16.30859 16.20117,10.19336 14.48437,3.9707 6.71485,-0.10742 -1.57617,21.0918 -31.41016,25.03711 -26.09766,19.57422 -50.22656,31.10742 0.85547,17.10156 c -17.07363,0.39308 -29.82031,0.74805 -29.82031,0.74805 -14.19073,8.29846 -29.762191,24.25795 -45.634769,33.29687 l 308.701169,-0.0293 -0.85742,-17.8125 -14.98828,-12.26563 -3.25781,-1.11914 c 0,0 -15.19448,-3.14047 -91.06055,-3.85156 -44.4989,-0.41709 -87.42662,0.25642 -116.95117,0.89453 l -0.76563,-12.25977 39.30079,-25.33984 39.45312,-30.5 27.91992,-23.82227 0.45508,-22.15429 c 0,0 9.15641,-5.66173 9.55859,-6.37305 0.55517,-0.98191 1.25143,-7.07129 1.25143,-7.07129 l 0.18211,-3.89431 -4.45836,-1.96647 -0.70662,7.41799 -4.61426,5.81682 -4.63672,1.28125 -14.41015,-1.77539 -18.77735,-9.65626 -16.07307,-15.89217 -13.2074,-15.15991 z m -117.577919,203.55874 -39.6875,0.002 0.002,0.002 h 39.677735 c 0.0025,-10e-4 0.0053,-0.002 0.0078,-0.004 z m -39.6875,0.002 c -5.730227,-4.61293 -11.53125,-7.99414 -11.53125,-7.99414 L 25.664062,400 Z" />
        <path id="path4" style="fill:#ecfcfe;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 257.08203,364.37695 -98.41601,0.63477 0.71875,12.76367 52.63281,-0.52148 h 77.68164 l 76.82422,3.86132 18.88476,14.59375 0.42774,-11.16015 -18.45313,-16.73828 z M 124.67773,364.5918 75.585495,400 h 16.310547 l 32.781688,-22.10352 v -6.23242 l 0.64454,6.44727 28.02929,-0.27735 -0.97851,-12.78125 -27.69532,0.17969 z m -96.781053,16.95299 -2.360574,13.30513 4.715756,5.25738 L 44.068058,400 Z" />
        <path id="path172002" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="m 189.86255,199.66076 c -1.97612,4.78678 -4.40672,12.92503 -5.95655,14.88553 -5.00075,2.82862 -26.96009,11.03422 -57.68522,24.13431 -17.84295,7.6076 -32.203824,13.51044 -37.897917,15.9149 -8.309019,3.50868 -13.365388,4.90102 -14.440051,6.49434 -1.077328,0.63733 -5.047706,1.3845 -8.318359,3.61914 -9.855831,5.31259 -23.213026,30.63963 -28.861328,49.60547 C 31.054823,333.28028 24.036081,390.94615 23.314453,400 h 4.236328 l 1.353516,-13.88086 0.816406,-4.90234 c 1.510662,-11.19863 8.378273,-51.9178 11.955078,-66.44727 3.576808,-14.52944 17.955711,-37.87235 25.041016,-45.20898 7.085305,-7.33663 23.365985,5.3651 27.417969,10.92773 0.306663,-1.03467 -0.15526,-2.13012 -0.669922,-3.07812 -2.467992,-4.544 -6.364402,-7.99576 -10.761719,-10.6211 -1.478663,-0.88133 -4.202501,-1.76255 -5.238497,-3.17455 -0.306667,-0.42 7.439684,-3.94291 11.547954,-5.65547 6.704901,-2.79498 20.758358,-8.82355 39.513188,-16.80724 24.61128,-10.47671 49.77002,-20.37421 52.71226,-21.71098 0.5785,1.16675 1.18795,2.91564 4.31675,8.34397 4.97584,8.63286 10.72536,15.57978 22.80991,26.04645 9.63138,8.34193 19.5722,15.25651 29.2232,18.35821 8.05364,2.58834 12.90601,2.82467 17.18275,2.75476 0,0 -16.68185,14.25936 -27.53431,22.68079 -10.85245,8.42143 -37.11719,26.66406 -37.11719,26.66406 l -39.82031,24.72461 0.76562,13.6875 -23.88672,-0.0273 c -3.00164,-11.22285 -12.01426,-44.55406 -18.80273,-55.66211 0,0 7.84244,18.7113 9.92969,34.44726 1.61522,9.79321 2.7867,19.67505 3.71289,29.56055 0.96073,10.63383 1.95516,15.70989 1.26953,28.98047 h 6.7168 c 0.49001,-13.11166 -1.52209,-26.66923 -2.01953,-31.76953 -0.0393,-0.40272 9.85145,-0.55334 23.35546,-0.60156 L 153.14648,400 H 156.25 l -2.76562,-49.79688 38.02343,-23.83398 c 0,0 25.91685,-17.9872 37.23438,-26.74805 11.31754,-8.76086 31.88235,-27.18486 31.88235,-27.18486 0.50347,-8.25291 1.00781,-15.79484 1.36765,-23.68037 0.97107,-0.0793 2.08136,-0.25707 3.41406,-0.58398 1.37596,-0.33753 2.05279,-1.36248 2.95829,-2.24898 0.99983,-0.97883 1.27896,-1.96858 1.92004,-3.19272 1.19398,-2.27991 0.95043,-3.42599 1.07763,-4.32497 0.46818,-3.30891 -0.26039,-3.90579 0.68601,-5.35208 0.36631,-0.0155 1.25093,1.00586 1.33815,1.3389 0.57937,2.21218 0.66388,4.19696 0.0759,6.8118 -0.55392,2.46315 -1.43905,4.50818 -2.49985,5.77491 -1.68508,2.01221 -3.40195,2.92442 -6.21628,3.82009 l -0.11132,2.23047 -0.92969,19.88672 c 0,0 -20.50567,19.60426 -35.72852,30.79296 -15.22284,11.18871 -33.35479,25.33569 -50.75586,36.9668 -6.60172,4.41269 -20.32226,12.42969 -20.32226,12.42969 L 159.51953,400 h 3.55859 l -1.79882,-32.36328 c 39.34473,-0.0103 100.5778,0.68447 105.37109,0.44531 6.97464,-0.34933 69.99663,1.49307 98.94336,2.88867 0,0 -1.24584,11.66414 -2.53516,28.9961 h 5.57422 c 0.484,-9.21596 1.13754,-22.40067 1.40821,-25.91797 l 12.56836,10.33594 c 0,0 0.36824,3.01141 0.15624,15.58203 h 4.79102 l -2.30469,-57.4336 c -0.0733,-1.01867 -0.18937,-1.86516 -0.33203,-2.5625 -2.15734,-16.44925 -7.67838,-54.12103 -13.76367,-60.81836 -5.79763,-5.82836 -41.91346,-20.35442 -52.32269,-24.69 -10.80547,-4.50063 -21.97603,-8.64415 -32.51021,-13.5678 -2.576,-1.20133 -6.68909,-3.2113 -9.08775,-4.7233 -0.54478,-0.33972 -1.44923,-3.89397 -2.82821,-4.68535 -1.45677,-0.83602 -3.40922,-0.81006 -4.30297,-0.11446 -1.98933,1.54664 -0.88022,3.34795 -1.69789,6.25816 -0.38375,1.36582 -0.67177,2.96328 -1.3291,4.21128 -0.66533,1.26667 -0.89996,2.23965 -2.11063,3.02632 -2.35823,1.15467 -5.07336,1.35391 -7.54883,0.87903 -13.15399,-2.52338 -23.95321,-8.75836 -32.6858,-15.40986 -17.02715,-12.96938 -26.19721,-29.6094 -29.64622,-33.63234 -0.71022,-0.8284 -1.85032,-1.17551 -2.19486,-0.9301 0,0 -2.65383,1.25143 -3.02854,3.88684 z m 4.68466,-0.0642 c 2.94057,5.63293 13.22614,19.45867 27.80049,32.23739 8.72763,7.65235 19.75406,14.10679 33.13672,16.51954 1.2815,0.23104 1.81229,0.14739 3.18164,0.20117 l 0.0176,2.53125 c -5.43496,0.38004 -9.82557,-0.70319 -19.30859,-4.6543 -9.16516,-3.81868 -21.73757,-14.22967 -29.11536,-22.58417 -6.64614,-7.52603 -17.38366,-19.45026 -18.651,-21.81953 -0.14041,-1.78431 0.97324,-3.15796 1.71669,-3.30783 0.43815,-0.082 1.0814,0.60749 1.22181,0.87648 z m -4.10178,4.42612 c 1.9965,3.72083 11.36816,14.03799 17.93925,21.47905 7.53692,8.5347 20.02698,19.07096 30.02942,23.23846 9.22155,3.84217 14.66766,5.02901 20.36133,4.78907 l -1.67187,19.27539 -0.44922,0.35742 c -2.17221,0.0568 -8.94674,-0.9044 -12.43946,-1.91406 -15.1152,-4.36941 -27.33133,-13.59467 -42.26122,-27.05272 -6.00963,-5.41718 -10.09896,-11.7268 -13.55191,-17.25892 -2.69291,-4.31442 -3.46852,-6.86107 -3.12852,-8.51707 2.39605,-5.05742 4.00648,-9.17361 5.1722,-14.39662 z M 317.8336,257.5619 c 10.43411,4.56167 46.07893,18.59185 50.95941,23.70954 5.13196,5.64933 10.78207,42.5218 13.19141,61.26172 0.63862,5.392 0.82226,36.20703 0.82226,36.20703 L 370.13086,366.7832 c -0.64933,-15.30525 -1.44531,-30.8164 -1.44531,-30.8164 -1.2,9.90529 -1.74655,26.28882 -3.17188,30.13281 l -88.5039,-3.25391 -116.00586,-0.13476 c 0,0 -0.4972,-5.0385 -0.46289,-8.25391 4.76714,-2.75429 12.15351,-7.63428 18.0664,-11.69726 17.30297,-11.88957 35.65528,-25.89932 50.91016,-37.08008 15.25487,-11.18076 36.65234,-31.57227 36.65234,-31.57227 l 0.98828,-21.74023 c 0,0 3.98107,-2.51533 5.52508,-3.46169 -0.48118,0.61506 -0.34708,2.47473 -0.4854,2.95705 -0.65466,2.28 -0.85813,3.19203 -1.05413,5.50536 -0.19333,2.27067 0.13581,4.00644 1.00781,6.2251 1.46533,-4.408 0.29153,-9.4671 2.12826,-13.14328 1.39977,-2.80162 1.25449,-4.83149 1.97778,-7.81611 0.27009,-1.11453 0.41279,-2.10982 0.49781,-3.96514 1.58316,0.6562 6.60855,4.04202 13.47053,7.09405 6.86198,3.05203 16.78996,7.07 27.60766,11.79937 z" />
        <path d="m 367.95412,278.712 c 0,0 3.12934,28.84534 1.144,48.11334 0,0 3.30134,-23.672 0.824,-46.24134 z" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172006"/>
        <path d="m 191.51296,235.92038 c -13.39668,-13.49331 -8.18404,-18.65593 -8.18404,-18.65593 l 9.70038,-20.51049 2.88577,2.53378 c 3.52997,14.57904 11.30692,22.11026 19.65092,30.33426 7.41067,7.304 11.40134,14.18934 24.04267,17.34934 4.20667,1.052 3.568,11.54666 3.352,13.924 -0.216,2.37733 -6.74919,5.1998 -23.44933,-3.14192 -5.20686,-2.60083 -14.97718,-8.71792 -27.99837,-21.83304 z" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172060" />
        <path d="m 176.53742,219.19308 -40.14588,15.59531 -39.023341,17.39327 -13.862379,5.83236 -7.195525,4.98212 -10.226218,5.2889 -7.821782,8.23376 L 40.594354,313.84335 27.202663,391.62673 26.678065,400 h 29.32244 c 21.624703,-77.54889 34.366618,-92.52242 41.105648,-98.36756 6.739027,-5.84515 15.611687,-9.92638 23.283687,-12.71571 67.72267,-24.62667 97.21963,-26.98368 97.21963,-26.98368 0,0 -13.28497,-9.36682 -24.74781,-23.7328 -6.00556,-7.52656 -9.47002,-14.40962 -10.05305,-21.90251 z" style="display:inline;opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172176" />
        <path style="opacity:0.2;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.911631px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 368.9541,353.5484 c 0,0 6.16873,24.64853 6.43777,33.1715 0.26904,8.52297 0.42919,13.2801 0.42919,13.2801 H 366.379 Z" id="path2" />
        <path id="path3" style="color:#000000;fill:#000000;-inkscape-stroke:none" d="M 125.17443,362.94638 72.300359,400 h 6.404719 l 48.236332,-33.23828 z m 0.67713,12.59268 L 89.025391,400 h 5.294921 l 32.818358,-20.93359 z m -96.653724,4.11939 -1.958984,2.27148 L 43.226562,400 h 4.234376 z m -1.481904,13.003 -1.692494,4.60723 L 29.083721,400 h 5.225462 z" />
        <path id="path5" style="color:#000000;fill:#000000;-inkscape-stroke:none" d="m 235.51758,375.14648 c -18.0253,-0.0273 -49.99234,0.22518 -76.04102,0.45313 l 0.26953,3.99805 c 26.03986,-0.22752 57.41286,-0.0946 75.31041,0.15578 30.58614,0.42783 43.39624,0.26918 65.41811,0.79432 21.40058,0.51032 63.71625,2.56712 64.77734,2.63388 l 18.82617,14.53906 2.44532,-3.16601 -19.79883,-15.28907 -0.61133,-0.0391 c 0,0 -43.67808,-2.75503 -65.51367,-3.43554 -21.78217,-0.67887 -36.02636,-0.6005 -65.08203,-0.64454 z m -82.4336,0.50977 c -11.362,0.10276 -26.92382,0.24023 -26.92382,0.24023 l 0.0391,4 c 0,0 15.62083,-0.13834 27.11719,-0.24218 z" />
        <path d="m 153.36983,364.20779 c -14.48934,1.07867 -13.59443,-0.006 -20.24243,0.63698 l -7.42021,1.16182 c 0,0 1.7051,10.65724 3.58559,33.99341 h 19.88169 c -0.0222,-22.69333 1.33314,-26.38932 3.43666,-30.17784" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path172192" />
        <path style="color:#000000;fill:#000000;-inkscape-stroke:none" d="m 272.13492,260.0356 c -0.43568,1.86709 -1.32327,3.98541 -2.1176,5.13984 -0.76251,1.10819 -1.78318,2.54927 -3.03515,3.84255 -1.28722,1.32971 -2.28594,2.7849 -2.28594,2.7849 l 0.80257,2.07139 c 0,0 1.92823,-1.84932 3.10928,-3.34977 1.18106,-1.50045 2.42146,-3.69939 3.15833,-5.23491 0.73912,-1.5402 1.22544,-3.5742 1.62031,-6.08648 0.30647,-1.94984 -0.0949,-4.04936 -0.0949,-4.04936 0,0 -0.7212,3.01474 -1.15688,4.88184 z" id="path11" />
        <g id="g15">
            <path style="color:#000000;fill:#a6a6a6;stroke-width:0.913966;stroke-miterlimit:40;-inkscape-stroke:none" d="m 322.45991,394.18881 13.65899,-42.96978 15.15091,41.29461 c 0,0 -5.72514,-8.65272 -11.18302,-9.17301 -3.86588,-0.36852 -17.62688,10.84818 -17.62688,10.84818 z" id="path14" />
            <path style="color:#000000;fill:#000000;stroke-width:0.913966;stroke-miterlimit:40;-inkscape-stroke:none" d="m 336.09342,347.96428 -16.25172,49.34023 c 2.98367,-2.78441 6.3346,-5.05677 9.55348,-7.56396 3.25751,-2.5373 7.78274,-4.88311 10.72337,-4.83694 2.49538,0.0392 4.96571,2.01337 7.21484,4.30867 2.24914,2.29529 3.84303,4.5316 3.84303,4.5316 l 2.54996,3.21807 z m 0.20314,7.42215 11.65429,31.09162 c -2.35866,-2.37863 -4.69645,-4.12788 -7.90904,-4.43413 -2.90748,-0.27716 -7.72388,2.1453 -15.67803,8.45735 z" id="path15" />
        </g>
    </g>`,

    averageFemale: `<g>
        <path id="path283350" style="fill:#2d2d2d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="m 193.9401,200.47645 c -3.26592,5.30656 -3.86687,7.52052 -6.56272,13.19047 -3.22718,5.3122 -3.53337,7.27532 -5.56488,10.79597 -14.34652,6.44948 -26.45648,10.66799 -50.14844,24.25195 -16.34717,4.40719 -36.791883,9.01532 -54.478513,19.41797 -3.369327,1.98133 -12.234867,6.10028 -15.736328,8.22657 -9.936666,13.29954 -9.372148,20.97017 -15.105469,36.71679 -0.656341,2.91272 -1.567847,6.39777 -3.566406,12.57227 -4.402761,16.19092 -7.37106,25.52686 -8.900391,40.02148 -0.958665,5.632 -0.927688,10.68979 -1.84375,18.00196 -0.31846,4.11345 -0.340612,11.04731 -0.964844,14.3789 0.552134,0.0642 1.23003,0.87839 1.951172,1.94922 h 50.462891 c 3.704218,-1.52068 7.373483,-3.13398 10.964844,-4.92773 4.298661,-2.148 11.447034,-7.69372 15.484374,-10.34571 2.42665,-1.59467 8.65333,-10.53464 11.228,-10.8253 0.009,-10e-4 77.2308,-5.16981 153.07864,-3.60048 28.86837,0.13315 50.12357,1.80596 80.4336,3.70703 0,0 14.14131,-0.11406 22.84765,3.25 0.97066,-10.13864 3.42392,-26.38969 1.14258,-34.06836 -1.22133,-4.10531 -3.55415,-13.66092 -4.77149,-17.76757 -6.20398,-24.60529 -15.37622,-42.72444 -34.79101,-53.43555 -12.89138,-3.90462 -24.5865,-9.43601 -36.99219,-10.875 -5.24832,-0.67437 -13.24175,-7.73496 -17.09375,-9.26563 l -8.25586,-6.82617 -0.37734,-2.0694 -5.86427,-7.46576 -2.91365,9.11949 -4.30926,2.33409 -2.99251,0.52494 -3.73242,-0.30273 c -10.87331,-1.412 -25.98222,-10.59121 -35.01953,-17.22852 -10.19471,-8.2966 -21.0909,-18.16971 -27.60873,-29.45519 z" />
        <path id="path9" style="fill:#d30000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 193.78921,199.52782 -2.88551,5.39513 3.11914,5.37304 16.54943,17.08682 c 0,0 10.39919,10.22617 11.95898,10.7461 1.5598,0.51993 10.74414,6.23828 10.74414,6.23828 l 21.49023,6.93359 2.06055,0.0684 -0.32617,21.94141 -38.47461,31.02343 -36.39648,24.26368 -35.875,23.22265 8.83984,25.30274 9.18555,-0.86524 -7.62696,-21.83789 33.96875,-21.83789 34.31641,-24.43555 31.71484,-25.99609 7.79883,-9.18555 0.66211,-21.34179 0.72461,0.0234 8.14649,-5.19921 0.79017,-6.34268 -2.77343,-2.94727 -1.30971,4.61026 -3.4668,4.67969 -6.75977,0.69335 -10.74414,-1.90624 -17.85156,-7.2793 -14.79223,-10.58652 -15.44665,-16.0335 z" />
        <path d="m 31.482052,395.28734 c 0.446666,2.49334 1.180614,2.08466 1.540614,4.67933 h 20.166666 c 0.196,-3.43334 -0.168,-7.00134 -0.09067,-10.296 0.142667,-6.028 1.809568,-11.8813 2.717568,-17.83597 1.664043,-10.89316 4.390792,-21.53944 8.717099,-31.40937 5.682623,-10.91971 7.04473,-14.96286 12.227828,-24.25379 8.061621,-9.83474 8.681112,-10.66445 17.276729,-16.04664 9.830784,-5.05831 15.433984,-7.8084 26.708774,-12.5209 12.06134,-4.93733 26.01867,-8.93733 38.75867,-12.128 2.82667,-0.80533 5.532,-1.54666 8.11733,-2.22666 28.43467,-7.48134 48.85975,-10.78844 48.85975,-10.78844 0,0 -11.6028,-5.51607 -20.87346,-16.6534 -3.08933,-3.71334 -5.02725,-4.512 -7.25392,-8.99734 -2.228,-4.484 -3.54315,-5.33167 -8.02103,-10.32829 -6.75333,2.5483 -26.119,9.03784 -47.707,21.33251 -18.69995,5.86575 -35.845712,11.49837 -55.441672,20.31762 -6.939001,2.88838 -12.359196,4.7333 -15.263196,7.33997 -9.815593,11.6216 -13.675677,21.85662 -18.57202,40.35778 -3.949413,17.25627 -7.765364,34.88594 -9.352248,49.71932 -1.108,6.50533 -0.995824,8.39911 -2.471784,17.39312 0.117676,5.33145 -0.859554,8.65545 -0.283552,11.86611" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path283392" />
        <path d="m 383.91919,399.96653 c -0.144,-0.856 -0.384,-1.68666 -0.64133,-2.34666 -0.696,-1.77734 -2.25467,-3.46 -3.18534,-5.13067 -0.88666,-1.59467 -1.816,-3.20667 -2.61466,-4.83067 -1.45734,-2.968 -2.89867,-6.17733 -1.188,-9.324 l -4.61028,-3.63741 c -17.46003,-0.9856 -29.02072,-0.93838 -44.68407,-2.18062 -2.87733,-0.17734 -12.31788,-0.35067 -15.58455,-0.51467 -9.8,-0.49333 -23.19569,-1.6513 -37.41836,-1.94597 -75.85333,-1.56933 -154.23074,4.12032 -154.23074,4.12032 C 103.61678,385.47373 98.23261,392.09496 80.469944,400 Z" style="fill:#d30000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path283402" />
        <path d="m 185.98384,374.61422 c 4.165,0.11825 9.37049,-0.33021 13.63628,0.46587 5.35114,0.99893 11.1576,3.48471 16.46882,5.04406 4.78206,1.40428 9.8433,3.21797 14.70576,3.81087 5.31438,0.64975 9.52107,2.82334 14.73519,4.27857 8.86004,2.47375 17.57384,5.11811 26.38839,7.12639 8.8994,2.02671 15.32186,6.07193 23.5853,-0.0867 3.8796,-2.89107 7.55753,-6.47747 11.51138,-9.44646 4.63124,-3.47797 9.43718,-5.21695 14.92112,-6.87533 2.22129,-0.67189 4.4549,-1.30743 6.66518,-2.01433 0.88439,-0.28302 6.27602,-3.46082 7.11522,-3.27959 -7.42572,-1.59537 -31.31966,-1.93473 -39.13446,-3.26236 -9.80472,-1.66426 -18.98766,-1.78492 -28.94872,-1.84228 -11.48271,-0.0672 -22.97561,1.25782 -34.46783,1.47844 -11.79255,0.2281 -23.60484,-0.63412 -35.38747,-0.66185 -3.44381,-0.008 -9.12331,-0.76455 -11.68277,1.05955 -4.32659,3.08379 1.00405,3.77134 -0.11139,4.2052" style="opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path283492" />
        <path id="path3" style="fill:#ecfcfe;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 276.94922 367.07227 L 161.21484 369.09766 L 165.68945 381.1875 L 281.80273 379.20312 L 376.08398 385.0957 L 370.88477 372.27148 L 276.94922 367.07227 z M 119.23828 367.41797 L 97.574219 381.62891 L 66.376953 400 L 88.214844 400 L 119.06445 382.32227 L 119.13086 376.67969 L 119.58398 381.97656 L 156.14258 381.35156 L 151.4707 369.26758 L 119.21094 369.83203 L 119.23828 367.41797 z "/>
        <path d="m 371.32146,366.88627 c -3,-6.6 -2.29913,-15.55053 -3.72046,-22.6332 -1.616,-8.052 -2.56261,-17.8694 -3.73194,-26.01207 -1.67467,-11.66667 -6.91897,-34.14933 -7.3683,-35.172 -0.94533,-2.14667 -4.50854,-3.80279 -6.1952,-5.43213 3.7804,11.63467 6.86863,23.93613 9.1033,35.48946 1.26267,6.528 2.13347,13.71074 3.0308,20.32941 1.07867,7.948 1.6371,14.54643 1.61274,23.00523 2.072,8.768 12.31572,35.10796 14.59172,43.5053 h 5.984 c -1.748,-8.07734 -9.2323,-23.98064 -14.83096,-36.29797" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path283586" />
        <path d="m 199.85386,247.78521 c -2.956,-2.45467 -5.49586,-4.13921 -8.94786,-7.61521 -9.57334,-13.50887 -9.34583,-15.04355 -2.8718,-28.34578 3.66086,-7.52199 5.20108,-10.80481 5.20108,-10.80481 l 0.97584,1.78557 c 5.80024,13.03798 12.25575,19.18633 20.59975,27.41033 7.41067,7.304 12.15646,13.59603 24.79779,16.75603 4.20667,1.052 3.568,11.54666 3.352,13.924 -0.216,2.37733 -9.13063,10.73787 -23.27996,0.78187" style="display:inline;opacity:0.199997;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" id="path283456" />
        <path style="color:#000000;fill:#000000;fill-opacity:1;-inkscape-stroke:none" d="m 273.29708,260.57482 c -0.56721,2.13587 -2.36717,5.38928 -3.73067,7.19471 -1.32355,1.75253 -4.65235,3.81445 -4.65235,3.81445 l -0.0184,2.84527 c 0,0 4.47979,-3.08893 6.26642,-5.45464 1.74668,-2.3128 3.18139,-5.26437 3.46197,-7.97278 0.2617,-2.52614 -0.62056,-6.14923 -0.62056,-6.14923 0,0 -0.16388,3.67915 -0.70641,5.72222 z" id="path10" />
        <path id="path11" style="fill:#000000;fill-opacity:0.2;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 256.98438,246.81445 -2.81836,0.49024 -1.4502,25.83203 c 0,0 -28.16782,22.43797 -46.82324,35.5293 -18.65542,13.09131 -64.99024,42.28711 -64.99024,42.2871 l 7.66211,19.89258 c -12.1414,0.57384 -23.61745,-0.17728 -29.22656,0.39258 l 0.10742,1.98438 c 0,0 0.25597,4.72793 0.47266,26.77734 h 24.39844 c 0.78556,-18.04348 1.62546,-22.2444 5.38476,-26.19922 L 159.79297,400 h 2.59961 l -10.3125,-28.43555 c 0.36676,-0.32165 0.75007,-0.65371 1.15625,-1.00586 -0.49504,0.0387 -0.98969,0.0701 -1.48438,0.10352 l -6.51757,-17.97461 47.48632,-30.33008 28.59766,-20.62304 34.85156,-28.59766 z" />
        <path id="path283442" style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1.33333" d="m 192.51172,198.10742 c -0.26366,0.0623 -0.51022,0.19709 -0.71289,0.39844 -3.49637,8.38745 -5.92801,14.53505 -9.89063,23.34961 -0.531,1.18118 -4.56224,2.45161 -5.6289,3.09961 -1.47333,0.896 -4.02844,2.26358 -8.73438,4.4082 -4.70588,2.14462 -12.46309,6.3618 -21.5957,10.50195 -9.13261,4.1402 -17.97779,6.15144 -29.99024,10.17188 -12.01239,4.02044 -39.269561,15.33508 -51.14648,20.48633 -1.801454,1.21501 -3.931008,1.84123 -5.560547,3.04101 -15.771579,29.05 -24.623226,71.03074 -28.144531,97.73828 -1.286846,11.8077 -1.337818,18.41267 -1.617188,28.14063 -0.03067,0.17466 -0.07629,0.34877 -0.126953,0.52344 h 4.427735 c -0.464966,-3.51134 6.201488,-88.23435 29.824218,-121.20508 2.249766,-0.30739 10.651903,0.27721 15.021485,3.86133 3.130034,2.81099 8.891039,8.71814 11.429687,11.38476 -3.599324,-6.23419 -6.747702,-10.29858 -11.697265,-14.91601 -5.483177,-3.3559 -7.511425,-4.20862 -11.900391,-3.90821 6.410476,-3.26282 36.20189,-15.30403 43.25781,-17.86718 7.05597,-2.5632 20.61949,-5.91788 28.88086,-8.82032 8.26136,-2.90239 12.88737,-5.68053 18.28516,-8.47461 5.39775,-2.79402 12.36903,-6.38708 15.81836,-8.39257 3.44929,-2.00553 6.79756,-3.53584 8.02148,-4.13868 0.62847,0.85738 2.00201,3.31328 2.94531,4.73829 3.73657,5.64453 8.08255,11.16383 12.43165,15.91992 4.34904,4.75603 11.87998,9.70344 15.9746,12.52344 7.89657,5.55319 20.31193,9.46961 25.61719,10.52343 2.62612,0.78984 13.56129,2.4791 16.72852,2.34571 -2.86165,2.3266 -35.17439,28.56201 -50.08594,38.91796 -15.67646,10.88721 -30.40853,19.1883 -40.3418,25.62305 -6.56032,4.24978 -14.91216,9.55146 -20.75586,13.49805 l 5.91407,15.83594 c -8.571,0.27956 -17.14164,0.57138 -25.71289,0.76171 0,0 -4.50294,-18.8254 -5.74024,-21.71875 -1.2373,-2.89332 -3.353,-10.86995 -7.67383,-19.1914 -1.62365,-3.12928 -3.32539,-6.20459 -5.05664,-9.06446 -1.73275,-2.86098 -3.48925,-5.5069 -5.216794,-7.76757 0,0 1.962634,4.5119 4.289064,10.875 1.16395,3.18208 2.41191,6.82329 3.54297,10.59179 1.12973,3.76873 2.14262,7.66535 2.83008,11.35157 0.99185,7.65366 2.93936,20.13349 3.46874,23.51562 -5.41676,3.79926 -17.00482,11.86794 -23.494136,15.97266 C 81.362281,388.4566 60.792969,400 60.792969,400 h 8.927734 c 0,0 15.65284,-8.83773 23.392578,-13.68945 6.792627,-4.25805 16.882709,-11.10566 21.554689,-14.28711 0.38629,2.69211 0.86047,5.70422 1.38086,9.05664 -3.72678,2.40917 -10.54261,6.79824 -15.36719,9.7168 C 95.419528,393.9801 84.548828,400 84.548828,400 h 7.851563 c 0,0 7.090657,-3.89388 10.830079,-6.13672 4.23552,-2.54041 9.61453,-5.70808 13.4707,-7.97461 0.59681,4.53786 1.0816,9.30236 1.01367,14.11133 h 5.29297 c -0.14005,-4.7715 -0.23632,-11.00448 -0.33203,-16.11328 2.34963,-0.0801 16.12374,-0.51197 32.26563,-0.99219 L 161.33008,400 h 3.68359 l -17.26758,-47.58203 c 0.8676,-0.58449 8.55569,-5.77051 17.88868,-11.81641 9.78404,-6.33808 24.60728,-14.69598 40.41992,-25.67773 17.85439,-12.87253 35.03512,-26.66239 52.10937,-40.54688 l 0.33399,-25.86328 c 1.68477,0.0321 3.194,-0.21507 5.98242,-0.76758 4.26403,-0.84491 6.07368,-4.29686 6.52539,-8.09179 0.10183,-0.85552 1.15793,0.14889 2.19531,1.72851 -0.0416,0.43273 -0.0576,0.37685 -0.0937,0.88672 -0.12,1.69262 -1.37465,4.77267 -1.75976,5.15625 -0.64538,0.64281 -2.02553,1.97317 -3.59375,2.63672 -1.00262,0.42423 -3.26967,0.59208 -5.45257,0.8163 -0.0171,8.00904 -0.23959,19.70063 -0.60276,22.85981 -0.30439,0.37363 -3.33911,4.03714 -11.73178,11.42936 -9.57486,8.43347 -29.67625,24.36845 -45.45899,35.87695 -16.41763,11.63824 -33.29551,22.6261 -50.30469,33.37891 L 171.13867,400 h 2.82031 l -6.3457,-17.46094 c 36.58421,-1.03641 85.08958,-2.19731 110.33594,-1.68359 42.48008,0.86439 97.25781,5.88476 97.25781,5.88476 l 0.24805,-2.69726 c 2.20603,2.70722 2.63325,0.70799 2.47265,-0.57422 -0.55333,-4.432 0.90163,-8.86737 1.54297,-11.08203 1.44266,-4.98267 2.10133,-9.23405 2.36133,-14.49805 0.588,-11.89994 -1.70703,-21.89414 -4.20703,-33.46875 -0.57333,-2.65466 -1.24238,-5.28733 -2.01172,-7.88867 -2.724,-9.22127 -6.71754,-18.02427 -11.88281,-26.04687 -2.75932,-4.28569 -7.75657,-11.55379 -9.57813,-13.17383 -15.4335,-6.77411 -37.40393,-13.58585 -54.74609,-17.56446 -7.14602,-5.82464 -12.73919,-9.59987 -20.99805,-14.09961 -2.23387,-1.17021 -1.65189,-2.9827 -1.66406,-3.7207 -0.0754,-3.05964 -1.86884,-3.88732 -4.35547,-5.84961 -1.64843,-1.30084 -2.76491,-2.17746 -4.55273,-3.57617 0.0183,0.7426 -0.0633,1.25674 -0.10742,1.74609 -0.28213,3.12911 -0.50401,4.27155 -0.80664,6.00977 -0.46114,2.64849 -1.40231,3.80035 -3.52344,4.73828 -2.4215,1.07074 -6.19468,0.31545 -8.65039,0.0508 -34.7829,-6.32631 -60.24462,-44.34653 -60.03711,-44.82031 l 0.37304,-1.94727 c -0.86662,-0.0907 -1.417,-0.12618 -1.79296,-0.14062 z m 0.5332,4.91406 c 0,0 4.02149,5.53386 9.8418,12.21875 5.73383,6.58561 10.25918,11.4094 16.45117,16.51172 8.54948,7.04497 15.43792,10.33008 24.22852,13.55274 3.85279,1.41349 7.86984,2.32709 11.93359,2.89648 l -0.0195,1.5586 c -2.15467,-0.35966 -6.27735,-1.09379 -8.39063,-1.79102 -8.04431,-2.65408 -16.02306,-5.8201 -22.83593,-10.55273 -7.28674,-5.06182 -14.49226,-11.32483 -20.52735,-18.07813 -3.61789,-4.04847 -9.94648,-12.43719 -11.43359,-14.41406 0.20492,-0.5374 0.5834,-1.45122 0.75195,-1.90235 z m -1.85547,4.68946 c 1.62641,2.10847 7.0968,9.17696 10.70899,13.32422 6.07258,6.97212 12.96619,13.51321 20.64258,18.8457 7.19765,4.99992 15.4534,8.24658 23.60937,10.9375 2.75862,0.91015 7.31739,1.67604 9.29102,1.98437 l -0.25782,20.12696 c -0.0217,0.0177 -0.50849,0.40957 -0.56445,0.45508 -1.24728,-0.25029 -14.17123,-2.85621 -21.44726,-5.39258 -7.63044,-2.65996 -25.06945,-13.94238 -29.19532,-17.50781 -4.12588,-3.56541 -10.26108,-10.19472 -12.70508,-13.24805 -2.44398,-3.05196 -5.94171,-9.21606 -7.62304,-12.10938 2.38398,-4.5222 5.32881,-11.76059 7.54101,-17.41601 z m 88.66016,42.24023 c 0.31288,0.19006 4.92759,3.13141 7.94727,5.30274 3.12133,2.24441 7.50313,7.1096 10.50781,8.13671 16.65055,3.90377 26.9573,7.00348 42.03515,11.86329 7.90376,2.674 10.66778,4.65816 14.37696,9.11718 3.53976,4.2897 7.9378,12.971 11.8164,21.57227 3.29334,7.30527 5.71201,15.03104 7.13868,22.95898 1.14661,4.17067 2.12559,8.37328 2.93359,12.58789 0.048,0.25333 0.0909,0.50902 0.13086,0.76368 0.62934,4.01994 0.71003,8.15484 0.80469,12.21484 0.0427,1.83733 0.0668,3.67439 0.0508,5.51172 -0.0466,3.68898 -0.60493,7.34199 -1.55078,10.93359 -0.40666,1.48134 -0.97051,3.00511 -1.20118,4.53711 -0.31083,2.05399 -1.02417,5.05023 -0.23632,7.22266 -2.75567,-0.25087 -54.96835,-4.96984 -96.57227,-5.81641 -25.78933,-0.52475 -75.19844,0.66847 -111.85937,1.71485 l -2.60352,-7.16407 c 0.66879,-0.0169 1.35483,-0.0332 1.9043,-0.0527 34.14915,-1.2195 69.25855,-2.76156 104.50586,-1.5625 33.52234,1.14038 71.01925,5.21242 102.01562,7.10351 -1.18126,-6.07185 -0.41998,-4.0656 -2.25,-4.68359 -12.64116,-1.37501 -27.61492,-2.67005 -39.99219,-3.49805 -16.56121,-1.10667 -34.96792,-3.65258 -52.47851,-3.95312 -6.41005,-0.11002 -12.82073,-0.15668 -19.23047,-0.15234 -32.02402,0.0216 -64.04511,1.31669 -96.06641,2.42187 l -4.13281,-11.37305 c 1.73048,-1.09712 32.94119,-20.89405 48.43164,-32.18945 15.8467,-11.55516 35.92021,-27.63241 45.56619,-36.46929 1.78774,-1.63778 9.77842,-8.47353 13.19944,-12.7436 0.13818,-7.15979 0.363,-14.24935 0.58291,-21.20313 0,0 1.77135,-0.1795 2.90732,-0.66015 1.55768,-0.65908 4.53788,-3.43165 5.83385,-4.59047 -0.14819,0.8977 -1.57496,3.62837 -1.77916,4.34047 -0.65467,2.28 -0.29619,4.54214 -0.49219,6.85547 -0.19333,2.27066 0.13581,3.42978 1.00781,5.64843 1.46533,-4.40799 0.53489,-9.62037 2.71367,-14.14073 0.5454,-1.13158 0.96718,-2.50983 1.51154,-2.36944 0.54436,0.14038 2.24503,1.64609 2.52282,1.81483 z m -129.06641,121.81055 2.67774,7.16797 c -15.44209,0.4628 -28.53768,0.87735 -30.86719,0.95703 -0.006,-0.24467 -0.016,-0.83334 -0.0215,-1.04883 -0.11004,-4.34798 -0.1698,-2.27053 -0.25,-5.93359 7.8108,-0.60516 18.33001,-0.88562 28.46093,-1.14258 z" />
        <g id="g10">
            <path style="color:#000000;fill:#a6a6a6;stroke-width:0.913966;stroke-miterlimit:40;-inkscape-stroke:none" d="m 323.74498,394.67901 9.14268,-42.96978 19.49115,41.29461 c 0,0 -6.63457,-8.65272 -12.14714,-9.17301 -3.90461,-0.36852 -16.48669,10.84818 -16.48669,10.84818 z" id="path14" />
            <path style="color:#000000;fill:#000000;stroke-width:0.913966;stroke-miterlimit:40;-inkscape-stroke:none" d="m 332.5201,348.45448 -11.06586,49.34023 c 2.69102,-2.78441 5.80312,-5.05677 8.75848,-7.56396 2.99083,-2.5373 7.2695,-4.88311 10.21499,-4.83694 2.4995,0.0392 5.17732,2.01337 7.6677,4.30867 2.49038,2.29529 4.31932,4.5316 4.31932,4.5316 l 3.75474,3.91131 z m 0.98324,7.42215 14.92215,31.09162 c -2.60867,-2.37863 -5.13031,-4.12788 -8.37509,-4.43413 -2.93661,-0.27716 -7.4984,2.1453 -14.78913,8.45735 z" id="path15" />
        </g>
    </g>`,

    insignia: `<g>
        <path style="display:inline;fill:#767676;fill-opacity:1;stroke:none;stroke-width:2.202;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 308.09274,394.52491 c 0,0 8.91472,-43.14358 15.13287,-64.12536 6.99098,-23.58949 23.29498,-54.35265 23.29498,-54.35265 0,0 17.45937,30.51339 23.99867,49.58124 5.69379,16.60245 14.34789,53.29015 14.34789,53.29015 0,0 -19.36388,-20.10585 -29.08826,-20.45932 -12.25017,-0.44528 -47.68615,36.06594 -47.68615,36.06594 z" id="path1" />
        <path style="fill:#a6a6a6;fill-opacity:1;stroke:none;stroke-width:0.851215px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 314.37119,381.96337 c 0,0 7.52414,-34.67832 12.84186,-52.45525 5.97864,-19.98631 19.31075,-44.60946 19.31075,-44.60946 0,0 13.50982,25.37886 19.1022,41.53419 4.86931,14.06652 12.03335,39.22819 12.03335,39.22819 0,0 -13.00658,-11.34949 -21.32282,-11.64898 -10.47627,-0.37727 -41.96534,27.95131 -41.96534,27.95131 z" id="path2" />
        <path id="path6" style="fill:none;stroke:#ffffff;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:0.5" d="m 377.22811,364.77184 5.92217,10.77835 m -68.77909,6.41318 c 0,0 7.52414,-34.67832 12.84186,-52.45525 5.97864,-19.98631 19.31075,-44.60946 19.31075,-44.60946 0,0 13.50982,25.14198 19.1022,41.29731 4.86931,14.06652 12.03335,39.46507 12.03335,39.46507 0,0 -13.00658,-11.34949 -21.32282,-11.64898 -10.47627,-0.37727 -41.96534,27.95131 -41.96534,27.95131 z m 0.20039,-0.7279 -4.97462,10.42301 m 36.95433,-106.24368 0.11844,-7.69882" />
        <path style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:2.202;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1" d="m 308.09274,394.52491 c 0,0 8.45492,-43.52224 15.13287,-64.36224 7.93852,-24.77393 23.29498,-54.11577 23.29498,-54.11577 0,0 16.74871,30.98716 23.28801,50.05501 5.69379,16.60245 15.05855,52.81638 15.05855,52.81638 0,0 -19.36388,-20.10585 -29.08826,-20.45932 -12.25017,-0.44528 -47.68615,36.06594 -47.68615,36.06594 z" id="path7" />
    </g>`
}


export class LowerDecksUniformPack extends BaseTngEraUniformPack implements IUniformPack {

    getUniformSwatches() {
        return [
            new Swatch(BodyType.AverageMale, "Average Male", (token) => UniformCatalog.decorateSwatch(this.getNeck(BodyType.AverageMale, token.skinColor, undefined, UniformEra.LowerDecks) + LowerDeckUniforms.averageMale, BodyType.AverageMale, token), "BodyType.averageMale"),
            new Swatch(BodyType.AverageFemale, "Average Female", (token) => UniformCatalog.decorateSwatch(this.getNeck(BodyType.AverageFemale, token.skinColor, undefined, UniformEra.LowerDecks) + LowerDeckUniforms.averageFemale, BodyType.AverageFemale, token), "BodyType.averageFemale"),
        ];
    }

    getUniformVariantSwatches(token: Token) {
        return [];
    }

    getUniformAndVariantBody(token: Token) {
        if (token.bodyType === BodyType.AverageMale) {
            return this.getNeck(token.bodyType, token.skinColor, token.species, UniformEra.LowerDecks)
                + LowerDeckUniforms.averageMale.replace(DefaultRed, token.divisionColor).replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
        } else {
            return this.getNeck(token.bodyType, token.skinColor, token.species, UniformEra.LowerDecks)
                + LowerDeckUniforms.averageFemale.replace(DefaultRed, token.divisionColor).replace(SpeciesRestrictions.DEFAULT_SKIN_COLOR_REGEX, token.skinColor);
        }
    }

    getRankIndicator(token: Token) {
        let result = super.getRankIndicator(token);
        result = `<g transform="translate(3, 5)">` + result + `</g>`;
        return result;
    }

    getBorderLogo(token: Token): string {
        return LowerDeckUniforms.insignia;
    }
}