const CracoLessPlugin = require("craco-less");
// config options https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#722ed1",
              "@layout-body-background": "white",
              "@layout-header-background": "white",
              "@layout-header-height": "52px",
              "@layout-sider-background": "#001529",
              "@menu-dark-bg": "#001529",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
