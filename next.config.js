/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
//   experimental: {
//     modern: true,
//     modularize: true,
//     css: true
//   },
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

const nextConfig = {
  images: {
    domains:[
      'res.cloudinary.com'
    ]
  }
}

module.exports = nextConfig
