'use es6';

export const cleanBackgroundImage = featuredImage => {
  return featuredImage
    .replace('background-image:', '')
    .match(/\((.*?)\)/)[1]
    .replace(/('|")/g, '');
};
