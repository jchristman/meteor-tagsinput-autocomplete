meteor-tagsinput-autocomplete
=============================

A combination of mizzao:autocomplete and a way of creating tags "in" the input box. There is a live example at [tagsautocomplete.meteor.com](http://tagsautocomplete.meteor.com).

Autoform Support
================

This library now supports autoform! Hooray! See the example until I have more time to update documentation

API
===

In short, you will call the tagsinput template with something like the following:

```html
{{> tagsinput autocompleteSettings=settings tagField='username' tagsVar='exampleTagsVar' id='example' name='example' placeholder='Type usernames'}}
```

In this example, the following is a description of the arguments:
 * autocompleteSettings (_optional_) - This settings object will be passed directly to an autocomplete field as defined at [mizzao:autocomplete](https://github.com/mizzao/meteor-autocomplete). You may NOT specify a callback field as this is used to generate tags.
 * tagField (__required__) - a string which tells which field to grab from the documents being added to the tags.
 * tagsVar (__required__) - the variable name for the Session variable used to store the tags. You specify this so that you can avoid conflicts and retrieve the data later.
 * id, name, class, and placeholder are directly tagged onto the input element

More Information
================

For an detailed example of how to set this up, checkout the [example](https://github.com/jchristman/meteor-tagsinput-autocomplete/tree/master/example).
