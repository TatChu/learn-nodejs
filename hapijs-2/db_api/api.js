
var low = require('lowdb');

const db = low('./db_api/db.json');

db.defaults({ people: [], division: [] , message: [], config: {}})
.value();


module.exports = {

    getConfig : function(){
        var config = db.get('config').find({id: "config"}).value();
        return config;
    },
    
    
/////////////////////////DIVISION///////////////////////////////////
    division: {
        getAll : function(){
        var res = db.get('division')
            .value();
        for(var i in res){
        res[i].people = db.get('people').filter({division: {id: res[i].id}}).value();
        }
        return res;
        },

        getByID : function(id){
            var division = db.get('division')
                        .find({id: id})
                        .value();
            return division;
        },

        add : function(d){
            var config = db.get('config').find({id: "config"}).value();

            var set = db.get('config').find({id: "config"}).assign({
                people_current_id: config.people_current_id,
                division_current_id : config.division_current_id + 1,
                message_current_id: config.message_current_id
            });
            console.log(set);
            var new_division = {
                    id: config.division_current_id + "",
                    name: d.name,
                    note: d.note,
                    people: []
               };

            var res = db.get('division')
            .push(new_division)
            .value();
            return res;
        },

        delete : function(id){
            
            var res = db.get('division').id
            db.get('division')
                .remove({id: id})
                .value();
            db.get('people').remove({division: {id: id}}).value();

            return res;
        },

        update : function(id, d){

             var res = db.get('division').find({id: id}).assign(d).value();
            return res;
        }
    },
/////////////////////////PEOPLE///////////////////////////////////

    people: {
        getAll : function(){
        var res = db.get('people')
            .value();
        return res;
        },

        getByID : function(id){
            var people = db.get('people')
                        .find({id: id})
                        .value();
            return people;
        },

        add : function(p){

            var config = db.get('config').find({id: "config"}).value();

            var set = db.get('config').find({id: "config"}).assign({
                people_current_id: config.people_current_id + 1,
                division_current_id : config.division_current_id,
                message_current_id: config.message_current_id
            });
            var division = db.get('division')
                            .find({id: p.division})
                            .value();
            var new_people = {
                    id: config.people_current_id + "",
                    name: p.name,
                    email: p.email,
                    phone: p.phone,
                    division: division
               };

             var res = db.get('people')
                .push(new_people)
                .value();
            return res;
        },

        delete : function(id){
             var res = db.get('people')
                .remove({id: id})
                .value();
            return res;
        },

        update : function(id, p){
             var division =  db.get('division').find({id : p.division}).value();
            var person = db.get('people')
                    .find({id: p.id})
                    .value();
            person.name = p.name;
            person.email = p.email;
            person.phone = p.phone;
            person.division = division;

            var res = db.get('people').find({id: id}).assign(person).value();
            return res;
        }
    }
    


}