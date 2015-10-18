Parties = new Mongo.Collection("parties");
Parties.attachSchema(new SimpleSchema({
    party_name: {
        type: String,
        max: 50
    },
    invites: {
        type: [Object]
    },
    'invites.$._id': {
        type: String
    },
    'invites.$.username': {
        type: String
    },
    date: {
        type: Date,
        min: function() { return new Date(); }
    }
}));

if (Meteor.isServer) {
    Meteor.publish('parties', function() { return Parties.find(); });
} else {
    Meteor.subscribe('parties');
}

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
        },

        getDate: function() {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },

        parties: function() {
            return Parties.find();
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
        Meteor.defer(function() {
            usernames = [
                'Alice', 'Allison', 'Ally', 'Avery', 'Alex', 'Alexandra', 'Alexander', 'Arty', 'Aaron',
                'Bob', 'Bobby', 'Borat', 'Ben', 'Benjamin', 'Brett', 'Brad',
                'Charlie', 'Constance', 'Corey', 'Claudia', 'Candace',
                'Daphne', 'Dora', 'Dudemeister', 'Dan', 'Daniel',
                'Eileen', 'Egbert', 'Esther', 'Elliot', 'Earl', 'Esteban', 'Eric',
                'Fred', 'Freddy', 'Frank', 'Franny',
                'Gary', 'Gaston', 'Golbat', 'George',
                'Harry', 'Harrison', 'Harvy', 'Homer',
                'Ice Ice', 'Indy', 'Isabel',
                'Josh', 'Jared', 'Joline', 'John', 'Johnathan',
                'Karen', 'Kara', 'Konan',
                'Limon', 'Leslie', 'Lady',

            ];
            _.each(usernames, function(name) {
                Accounts.createUser({
                    username: name,
                    email: '',
                    password: 'bob',
                    profile: {}
                });
            });
        });
    });
}
