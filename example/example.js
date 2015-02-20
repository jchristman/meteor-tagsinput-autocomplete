if (Meteor.isClient) {
    Template.example.helpers({
        settings: function() {
            return {
                position: 'below',
                limit: 10,
                rules: [
                {
                    collection: 'users',
                    subscription: 'usernameAutocompleteSubscription',
                    field: 'username',
                    options: '',
                    template: Template.userPill
                }
                ]
            }
        }
    });
}

if (Meteor.isServer) {
    Meteor.publish('usernameAutocompleteSubscription', function(selector, options, collName) {
        options.limit = Math.min(50, Math.abs(options.limit || 0));
        _.extend(options, {fields: {'_id':1,'username':1}, reactive: true});
        var users = Meteor.users.find(selector, options);
        Autocomplete.publishCursor(users, this);
        this.ready();
    });

    Meteor.startup(function() {
        if (Meteor.users.find().count() < 1000) {
            Meteor.defer(function() {
                function randString(x){
                    var s = "";
                    while(s.length<x&&x>0){
                        var r = Math.random();
                        s+= String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65));
                    }
                    return s;
                }

                for (var i = 0; i < 1000; i++) {
                    Accounts.createUser({
                        username: randString(4),
                        email: '',
                        password: 'bob',
                        profile: {}
                    });
                }
            });
        }
    });
}
