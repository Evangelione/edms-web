// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'edms-web',
      dll: false,
      pwa: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  theme: './src/common/theme.js',
  // proxy: {
  //   '/sockjs-node/': {
  //     'target': 'http://127.0.0.1:8000/',
  //     'changeOrigin': true,
  //   },
  // },
}
