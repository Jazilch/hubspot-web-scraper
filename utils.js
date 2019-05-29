'use es6';
const normalizeUrl = require('normalize-url');
const removeLeadingSlash = require('remove-leading-slash');
const {
  URL
} = require('url');

const createSlug = (slug, blogName) => {
  if (slug) {
    slug = normalizeUrl(slug, {
      removeTrailingSlash: true
    });
    slug = new URL(slug);
    slug = slug.pathname;
    slug = removeLeadingSlash(slug);
    if (!slug.includes(blogName)) {
      return `${blogName}/${slug}`
    }
    return slug;
  }
  return;
}

module.exports.createSlug = createSlug;