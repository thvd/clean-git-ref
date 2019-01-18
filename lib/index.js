'use strict';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, search, replacement) {
  var s = search instanceof RegExp ? search : escapeRegExp(search);

  return str.replace(new RegExp(s, 'g'), replacement);
}

var CleanGitRef = {
  clean: function clean(value) {
    if (typeof value !== 'string') {
      throw new Error('Expected a string, received: ' + value);
    }

    value = replaceAll(value, './', '/');
    value = replaceAll(value, '..', '.');
    value = replaceAll(value, ' ', '-');
    value = replaceAll(value, /^[~^:?*\\\-]/, '');
    value = replaceAll(value, /[~^:?*\\]/, '-');
    value = replaceAll(value, /[~^:?*\\\-]$/, '');
    value = replaceAll(value, '@{', '-');
    value = replaceAll(value, /\.$/, '');
    value = replaceAll(value, /\/$/, '');
    value = replaceAll(value, /\.lock$/, '');
    return value;
  }
};

module.exports = CleanGitRef;