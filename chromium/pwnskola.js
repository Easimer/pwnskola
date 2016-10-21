// pwnskola.js
// (c) 2016 Daniel Meszaros

var pwnskola = {
	rsecs : 0,
	/// Hozzáad egy gombot a ThatQuiz oldal aljára.
	init : function()
	{
		pwnskola.prc = document.createElement("input");
		pwnskola.prc.setAttribute("id", "pwnskolaprc");
		pwnskola.prc.setAttribute("type", "text");
		pwnskola.prc.setAttribute("placeholder", "Jó válaszok száma")
		pwnskola.prc.setAttribute("style", "background-color: #cad5d3; width: 175px; margin-top: 10px;")
		pwnskola.btn = document.createElement("button");
		pwnskola.btn.appendChild(document.createTextNode("Pwnskola"));
		pwnskola.btn.setAttribute("id", "pwnskolabtn");
		pwnskola.btn.setAttribute("style", "background-color: #cad5d3; width: 100px; margin-top: 10px;");
		pwnskola.btn.onclick = pwnskola.onclick;
		document.body.appendChild(pwnskola.prc);
		document.body.appendChild(pwnskola.btn);
	},

	//Ez csinálja a varázslatot
	magic : function()
	{
		// Figyelmeztetik a felhasználót dolgokról
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
		if(quiz.finished())
		{
			document.getElementById("pwnskolabtn").remove();
			alert("A teszt már véget ért.");
			return;
		}
		
		// Generál egy random teljesítési időt, ahol kérdésenként 30-40 másodperc telt el.
		quiz.rsecs = 0;
		for(i = 0; i < quiz.testDef.length; i++)
		{
			quiz.rsecs += Math.round((Math.random() * 10) + 30);
		}

		// Beállítja a quiz.seconds getterjét úgy, hogy a hamis időt adja vissza.
		quiz.__defineGetter__("seconds", function() {
			return quiz.rsecs;
		});

		var txt = document.getElementById("pwnskolaprc");

		if(txt.value.length == 0)
		{
			quiz.__perc = quiz.testDef.length;
		}
		else
		{
			quiz.__perc = parseInt(txt.value);
			if(quiz.__perc == NaN)
			{
				alert("Érvénytelen jó-válasz szám!");
				return;
			}
		}

		// A quiz.right mindig a kérdések számával fog visszatérni
		quiz.__defineGetter__("right", function() {
			return quiz.__perc;
		});

		// A quiz.wrong mindig nullával fog visszatérni
		quiz.__defineGetter__("wrong", function() {
			return quiz.testDef.length - quiz.__perc;
		});

		// Átállítja a quiz.incorrects getterjét úgy, hogy mindig üres tömböt adjon vissza.
		quiz.__defineGetter__("incorrects", function() {
			return [];
		});

		function stepq()
		{
			// Különböző típusú kérdésekhez.
			multiplechoice.fz2(undefined);
			multiplechoice.u76();
		}

		// Végiglépkedi a tesztet
		for(i = 0; i < quiz.testDef.length; i++)
		{
			stepq();
		}
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