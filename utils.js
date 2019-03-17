'use es6';
const normalizeUrl = require('normalize-url');
const {
  URL
} = require('url');

const cleanSlug = (slug) => {
  if (slug) {
    slug = normalizeUrl(slug, {
      removeTrailingSlash: true
    });
    slug = new URL(slug);
    slug = slug.pathname;
    return slug;
  }
  return;
}

module.exports.cleanSlug = cleanSlug;