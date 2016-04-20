// index.js
// (c) 2016 Daniel Meszaros

var pageMod = require("sdk/page-mod");

pageMod.PageMod({
	include: "*.thatquiz.org",
	contentScriptFile: "./pwnskola.js"
});
