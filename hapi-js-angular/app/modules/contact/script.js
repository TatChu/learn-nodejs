(function() {
    var mod_contact = $("#mod-contact");

    var app =angular.module('bzApp');
    app.controller('ContactCtrl', ContactCtrl);

    function ContactCtrl($scope, peopleService){
    	contact = this;
      	peopleService.query(function(res) {
               contact.people = res;
        });

    }


})();