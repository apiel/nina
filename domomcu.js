
Devices = new Mongo.Collection("devices");

if (Meteor.isClient) {
//    Meteor.subscribe("devices");

    Template.registerHelper('objectValues', function (obj) {
        result = [];
        for (var k in obj)
            result.push(obj[k]);
        return result;
    });
    
    Template.container.helpers({  
      pageTemplate: function() {
        var activePage = Session.get('activePage');
        return activePage?activePage:'pageHome';
      }
    });    
        
    Template.pageDevice.helpers({
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
        'click .page-trigger': function (event, template) {
            event.preventDefault();
            var name = template.$(event.target).data('template');
            Session.set('activePage', name);
        },        
        "click #new-devices": function (event) {
            event.preventDefault();
            Devices.insert({
                name: "",
                mac: "",
                pins: [
                    {key: "0", name: "", type: "disable"},
                    {key: "1", name: "", type: "disable"},
                    {key: "2", name: "", type: "disable"},
                    {key: "3", name: "", type: "disable"},
                    {key: "4", name: "", type: "disable"},
                    {key: "5", name: "", type: "disable"},
                    {key: "6", name: "", type: "disable"},
                    {key: "7", name: "", type: "disable"},
                    {key: "8", name: "", type: "disable"},
                    {key: "9", name: "", type: "disable"},
                    {key: "10", name: "", type: "disable"},
                    {key: "11", name: "", type: "disable"},
                    {key: "A", name: "", type: "disable"}
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