module.exports = {
	presets: ["module:@react-native/babel-preset"],
	plugins: [
		[
			"module-resolver",
			{
				root: ["./src"],
				alias: {
					"@theme": "./src/theme",
					"@component": "./src/component",
					"@components": "./src/components",
					"@features": "./src/features",
					src: "./src",
				},
			},
		],
		"react-native-reanimated/plugin",
	],
};
