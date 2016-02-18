
Devices = new Mongo.Collection("devices");

if (Meteor.isClient) {
//    Meteor.subscribe("devices");

    Template.registerHelper('objectValues', function (obj) {
        result = [];
        for (var k in obj)
            result.push(obj[k]);
        return result;
    });

    Template.body.helpers({
        devices: function () {
            return Devices.find({});
        }
    });

    Template.registerHelper('eq', function (val, cmpVal, str) {
        return val === cmpVal ? str : '';
    });

    Template.registerHelper('neq', function (val, cmpVal, str) {
        return val !== cmpVal ? str : '';
    });

    Template.body.events({
        "click #new-devices": function (event) {
            event.preventDefault();
            Devices.insert({
                name: "",
                mac: "",
                pins: [
                    {key: "0", name: "", type: "disable"},
                    {key: "1", name: "", type: "disable"},
                    {key: "2", name: "", type: "disable"}
                ]
            });
        },
        "click .showpins": function (event) {
            $(event.target).closest('form').find('.pins').collapse('show');
        },
        "change form": function (event) {
            var form = $(event.target.closest('form'));
            Devices.update(this._id, {$set: form.serializeJSON()});
            form.find('select[name^="pins["][name$="][type]"] option:selected[value="disable"]')
                .closest('.pins').collapse("hide");
        },
        "click .cancel": function (event) {
            event.preventDefault();
            Devices.remove(this._id);
        },
    });
}



if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}