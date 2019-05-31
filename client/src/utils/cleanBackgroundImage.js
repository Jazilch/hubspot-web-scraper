'use es6';

export const cleanBackgroundImage = featuredImage => {
  if (featuredImage && featuredImage.includes('background-image')) {
    return featuredImage
      .replace('background-image:', '')
      .match(/\((.*?)\)/)[1]
      .replace(/('|")/g, '');
  }
  return featuredImage;
};
