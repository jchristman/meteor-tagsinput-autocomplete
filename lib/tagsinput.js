if (Meteor.isClient) {
    Template.tagsinput.created = function() {
        Session.setDefault('tagsinput_tags',[]);
    }

    Template.tagsinput.helpers({
        setup : function() {
            if (this.tagField == undefined) throw Meteor.Error(502, 'Must define the tagField context');
            if (this.tagClass == undefined) this.tagClass = 'label label-default';
            if (this.id == undefined) this.id = '';
            if (this.name == undefined) this.name = '';
            if (this.placeholder == undefined) this.placeholder = '';
            return this;
        }, 

        currentTags : function() {
            return Session.get('tagsinput_tags');
        },

        getField : function() {
            var field_name = Template.parentData(1).tagField;
            return this[field_name];
        },

        extended_settings : function() {
            _.each(this.autocompleteSettings.rules, function(rule) {
                _.extend(rule, { callback : function(doc, element) {
                    var current_tags = Session.get('tagsinput_tags');
                    var found = _.find(current_tags, function(tag) {
                        return tag._id == doc._id;
                    });
                    if (found == undefined) {
                        current_tags.push(doc);
                        Session.set('tagsinput_tags', current_tags);
                    }
                    element.val('');
                }});
            });
            return this.autocompleteSettings;
        }
    });

    Template.tagsinput.events({
        'focus .tagsinput input' : function(event, context) {
            $(event.target).closest('.tagsinput').addClass('focus');
        },
        
        'blur .tagsinput input' : function(event, context) {
            $(event.target).closest('.tagsinput').removeClass('focus');
        },

        'click .tagclose' : function(event, context) {
            var remove = $(event.target).data('id');
            var current_tags = Session.get('tagsinput_tags');
            current_tags = _.reject(current_tags, function(tag) {
                return tag._id == remove;
            });
            Session.set('tagsinput_tags', current_tags);
        }
    });
}
