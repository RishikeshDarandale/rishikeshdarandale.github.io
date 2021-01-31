/* eslint-disable */

/**
 * @READ: https://nextjs.org/docs/api-reference/next.config.js/introduction
 * @READ: https://github.com/zeit/next.js/blob/canary/packages/next/next-server/server/config.ts#L12-L63
 *
 * Avoid using new JavaScript features not available in your target Node.js version.
 * next.config.js will not be parsed by Webpack, Babel or TypeScript.
 */
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins(
  [],
  {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      });
      return config;
    },
  }
);