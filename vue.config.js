module.exports = {
  devServer: {
    overlay: false,
  },

  pwa: {
    name: '거래해요 동물의숲',
    themeColor: '#76b767',
    msTileColor: '#FFFFFF',
    manifestOptions: {
      background_color: '#FFFFFF',
    },
    appleMobileWebAppCapable: 'no',
    appleMobileWebAppStatusBarStyle: 'default',
  },

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'anicro',
      overrideEndpoint: false,
      region: 'ap-northeast-2',
      bucket: 'web-build-animalcro-project',
      createBucket: false,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      pluginVersion: '4.0.0-rc3',
      uploadConcurrency: 5,
    },
  },
};
