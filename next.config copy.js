/** @type {import('next').NextConfig} */
module.exports = {
  fastRefresh: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },

      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    domains:[
      'res.cloudinary.com',
      'i.ytimg.com'
    ]
  }
  // experimental: {
  //   appDir: false,
  //   modern: true,
  //   modularize: true,
  //   css: true
  // },
//   webpack(config) {
//     config.module.rules.push({
//         test: /\.js$/,
//         use: {
//             loader: '@swc/loader',
//             options: {
//                 jsc: {
//                     parser: {
//                         syntax: 'ecmascript',
//                         jsx: true
//                     },
//                     transform: {
//                         react: true
//                     }
//                 }
//             }
//         }
//     });
//     return config;
// }
}

// const nextConfig = {
//   images: {
//     domains:[
//       'res.cloudinary.com',
//       'i.ytimg.com'
//     ]
//   }
// }

// module.exports = nextConfig
