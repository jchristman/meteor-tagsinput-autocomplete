Package.describe({
  name: 'jchristman:tagsinput-autocomplete',
  summary: 'A combination of the mizzao:autocomplete library and a tagsinput-like functionality',
  version: '1.0.1',
  git: 'https://github.com/jchristman/meteor-tagsinput-autocomplete'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  // Builtin meteor packages
  api.use('underscore');
  api.use('templating', 'client');
  api.use('jquery','client');
  api.use('mizzao:autocomplete@0.4.10');
  api.imply('mizzao:autocomplete@0.4.10');
  api.use('twbs:bootstrap@3.3.2');

  api.addFiles([
          'lib/tagsinput.html',
          'lib/tagsinput.js',
          'lib/tagsinput.css',
  ],['client','server']);
});
