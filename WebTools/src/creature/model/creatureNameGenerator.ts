const type1Name = [["br","c","cr","dr","g","gh","gr","k","kh","kr","n","q","qh","sc","scr","str","st","t","tr","thr","v","vr","x","z","","","","",""],
	["ae","aa","ai","au","uu","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u"],
	["c","k","n","q","t","v","x","z","c","cc","cr","cz","dr","gr","gn","gm","gv","gz","k","kk","kn","kr","kt","kv","kz","lg","lk","lq","lx","lz","nc","ndr","nkr","ngr","nk","nq","nqr","nz","q","qr","qn","rc","rg","rk","rkr","rq","rqr","sc","sq","str","t","v","vr","x","z","q'","k'","rr","r'","t'","tt","vv","v'","x'","z'","","","","","","","","","","","","","","","","",""],
	["","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","oi","ie","ai","ei","eo","ui"],
	["d","ds","k","ks","l","ls","n","ns","ts","x"]
];

const type2Name = [["b","bh","ch","d","dh","f","h","l","m","n","ph","r","s","sh","th","v","y","z","","","","","","","","",""],
    ["ae","ai","ee","ei","ie","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u"],
    ["c","d","g","h","l","m","n","r","s","v","z","c","ch","d","dd","dh","g","gn","h","hl","hm","hn","hr","l","ld","ldr","lg","lgr","lk","ll","lm","ln","lph","lt","lv","lz","m","mm","mn","mh","mph","n","nd","nn","ng","nk","nph","nz","ph","phr","r","rn","rl","rz","s","ss","sl","sn","st","v","z","s'","l'","n'","m'","f'","h'"],
    ["a","e","i","o","u","a","e","i","o","u","oi","ie","ai","ea","ae"],
    ["","","","","d","ds","h","l","ll","n","ns","r","rs","s","t","th"]];

const type3Name = [["b","bh","br","c","ch","cr","d","dh","dr","f","g","gh","gr","h","k","kh","kr","l","m","n","q","qh","ph","r","s","sc","scr","sh","st","str","t","th","thr","tr","v","vr","y","x","z","","","","","","",""],
    ["ae","aa","ai","au","ee","ei","ie","uu","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u"],
    ["c","d","g","h","k","l","m","n","q","r","s","t","v","z","c","d","g","h","k","l","m","n","q","r","s","t","v","z","c","cc","ch","cr","cz","d","dd","dh","dr","g","gm","gn","gr","gv","gz","h","hl","hm","hn","hr","k","k'","kk","kn","kr","kt","kv","kz","l","ld","ldr","lg","lgr","lk","ll","lm","ln","lph","lq","lt","lv","lx","lz","m","mh","mm","mn","mph","n","nc","nd","ndr","ng","ngr","nk","nkr","nn","nph","nq","nqr","nz","ph","phr","q","q'","qn","qr","r","r'","rc","rg","rk","rkr","rl","rn","rq","rqr","rr","rz","s","sc","sl","sn","sq","ss","st","str","t","t'","tt","v","v'","vr","vv","x","x'","z","z'","","","","","","","","","","",""],
    ["","a","e","i","o","u","a","e","i","o","u","a","e","i","o","u","oi","ie","ai","ea","ae"],
    ["d","ds","k","ks","l","ll","ls","n","ns","r","rs","s","t","ts","th","x","","","",""]];

export const creatureNameGenerator = () => {

    const options = [type1Name, type2Name, type3Name];
	const nameParts = options[Math.floor(Math.random() * options.length)];

	let result = "";
	nameParts.forEach(a => {
		const index = Math.floor(Math.random() * a.length);
		result += a[index];
	});

    return result;
}