/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Parser = require("./Parser");

class JavascriptModulesPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap("JavascriptModulesPlugin", (compilation, {
			normalModuleFactory
		}) => {
			const types = [
				"javascript/auto",
				"javascript/dynamic",
				"javascript/esm"
			];

			for(const type of types) {
				normalModuleFactory.hooks.createParser.for(type).tap("JavascriptModulesPlugin", options => {
					return new Parser(options, type);
				});
			}
		});
	}
}

module.exports = JavascriptModulesPlugin;
