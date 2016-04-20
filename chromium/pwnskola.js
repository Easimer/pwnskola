// pwnskola.js
// (c) 2016 Daniel Meszaros

var pwnskola = {
	btn : undefined,
	/// Hozzáad egy gombot a ThatQuiz oldal aljára.
	init : function()
	{
		pwnskola.btn = document.createElement("button");
		pwnskola.btn.appendChild(document.createTextNode("Pwnskola"));
		pwnskola.btn.setAttribute("id", "pwnskolabtn");
		pwnskola.btn.setAttribute("style", "background-color: #cad5d3; width: 100px; margin-top: 10px;");
		pwnskola.btn.onclick = pwnskola.onclick;
		document.body.appendChild(pwnskola.btn);
	},

	//Ez csinálja a varázslatot
	magic : function()
	{
		if(quiz.idx > 0)
		{
			document.getElementById("pwnskolabtn").remove();
			alert("Már elkezdted a tesztet. Indítsd újra! (F5)");
			return;
		}
		if(quiz.idx === undefined)
		{
			alert("Még nem kezdted el a tesztet. Válassz ki egy felhasználót!");
			return;
		}
		for(i = 0; i < quiz.testDef.length - 1; i++)
		{
			multiplechoice.fz2(undefined);
		}
		quiz.wrong = -1;
		quiz.right = quiz.testDef.length;
		multiplechoice.fz2(undefined);
	},

	/// Kezeli a Pwnskola gomb kattintásának eseményét
	/// Beilleszti a pwnskola.magic függvényt és meghívását az oldalba.
	/// Erre azért van szükség, mert content scriptből nem lehet a weboldal
	/// váltóival babrálni.
	onclick : function()
	{
		var s = document.createElement("script");
		s.innerHTML = String(pwnskola.magic).replace("function", "function magic") + "magic();";
		document.body.appendChild(s);
	},
};

pwnskola.init();