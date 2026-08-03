import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';

export default {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        'Android >= 4.0',
        'iOS >= 7'
      ]
    }),
    pxtorem({
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: [':root']
    })
  ]
}