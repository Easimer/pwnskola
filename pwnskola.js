var pwnskola = {
	bgwindow : undefined,
	init : function()
	{
		var tqbtn = document.createElement("button");
		tqbtn.appendChild(document.createTextNode("Pwnskola"));
		tqbtn.setAttribute("id", "pwnskolabtn");
		tqbtn.setAttribute("style", "border: none; background-color: red; font-weight: bold; left: 50%; width: 100px; height: 50px;");
		tqbtn.onclick = pwnskola.onClick;
		document.body.appendChild(tqbtn);
	},

	onClick : function()
	{
		var s = document.createElement("script");
		s.innerHTML = "\
		function ps_i(){\
			for(i = 0; i < quiz.testDef.length - 1; i++)\
			{\
				multiplechoice.fz2(undefined);\
			}\
			quiz.wrong = -1;\
			quiz.right = quiz.testDef.length;\
			multiplechoice.fz2(undefined);\
		}\
		ps_i();";
		document.body.appendChild(s);
	},
};

pwnskola.init();