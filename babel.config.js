// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

const alias = {
  "@components": "./src/shared/components",
  "@constants": "./src/constants",
  "@navigation": "./src/navigation",
  "@redux": "./src/redux",
  "@screens": "./src/Screens",
  "@services": "./src/services",
  "@themes": "./src/themes",
  "@utils": "./src/shared/utils"
}

const commonPlugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['.'],
      alias,
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ...commonPlugins
    // 'react-native-reanimated/plugin',
  ]
};

