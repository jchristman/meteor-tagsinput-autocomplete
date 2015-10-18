Package.describe({
  name: 'jchristman:tagsinput-autocomplete',
  summary: 'A combination of the mizzao:autocomplete library and a tagsinput-like functionality',
  version: '1.1.0-PRE.2',
  git: 'https://github.com/jchristman/meteor-tagsinput-autocomplete'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  // Builtin meteor packages
  api.use('underscore');
  api.use('templating', 'client');
  api.use('jquery','client');
  api.use('reactive-dict','client');
  // mizzao libraries
  api.use('mizzao:autocomplete@0.5.1');
  api.imply('mizzao:autocomplete@0.5.1');
  api.use('twbs:bootstrap@3.3.5');
  api.use('aldeed:autoform@5.5.0');
  api.imply('aldeed:autoform@5.5.0');
  api.use('aldeed:collection2@2.5.0');
  api.imply('aldeed:collection2@2.5.0');

  api.addFiles([
          'lib/tagsinput.html',
          'lib/tagsinput.js',
          'lib/tagsinput.css',
          'lib/autoform.js',
  ],['client']);

  api.export([
          'TagsInput',
          'Tags'
  ],['client']);
});
