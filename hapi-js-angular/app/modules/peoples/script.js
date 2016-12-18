(function() {
    var app = angular.module('bzApp');
    app.controller('peopleCtrl', peopleCtrl);

    function peopleCtrl($scope, peopleService, divisionService, confirmService) {
        $scope.peoples = [];
        $scope.edit = 0;
        //value for select list
        $scope.divisionID = "1";
        getAll();
        $scope.lsDivision = [];
        divisionService.query(function(res) {
            $scope.lsDivision = res;
        });
        // divisionService.get(function(res) {
        //     $scope.lsDivision = res.results;
        // });

        $scope.formShow = 0;
        $scope.openForm  = openForm;
        function openForm(){
            $scope.formShow  = 1;
        }

        function getAll() {
            peopleService.query(function(res) {
                console.log('All people: ', res);
                // console.log(res)
                $scope.peoples = res;
                for(var i =0; i<= $scope.peoples.length - 1; i++)
                {
                    // console.log( $scope.peoples[i].division);
                    var temp = divisionService.get({ id: $scope.peoples[i].division });
                     $scope.peoples[i].division = temp;
                }
            });
        }



        $scope.person = { id: null, name: null, email: null, division: null, phone: null };

        $scope.addNewPeople = add;
        $scope.editPeople = edit;
        $scope.delPeople = del;
        $scope.Update = Update;
        function del(person) {
            var temp = peopleService.get({ id: person.id });
            if(confirmService.confirm("Are you sure want to delete " + person.name))     {
                console.log("Deleting ID: " + person.id) ;
                ///////////////////////////////
                ///Problem here
                /// Why list can't reload when call one time
                getAll();
               // getAll();
                // location.reload(); 
            }
            peopleService.delete({ id: person.id });

           
        };



        function add(form) {
            // $scope.temp = new peopleService();
            // $scope.temp.id = $scope.peoples.length + 1;
            // $scope.temp.id = "" + $scope.temp.id;
            // $scope.temp.name = $scope.person.name;
            // $scope.temp.email = $scope.person.email;
            // $scope.temp.phone = $scope.person.phone;
            // $scope.temp.division = $scope.divisionID;

           // $scope.temp.division = "" + $scope.temp.division ;

            peopleService.save($scope.person, function (res){
                $scope.peoples = res;
            }, function (err){
                console.log(err);
            });

            //getAll();
            $scope.person = {};
            // form.$setPristine();
            // form.$setUntouched();
            $scope.formShow = 0;
        }

        function edit(person) {
            $scope.edit = person.id;
            $scope.person = person;
             $scope.formShow = 1;
        }
        function Update (form){
            // peopleService.update($scope.person);


            // $scope.temp = new peopleService();
            // $scope.temp.id = $scope.edit;
            // $scope.temp.id = "" + $scope.temp.id;
            // $scope.temp.name = $scope.person.name;
            // $scope.temp.email = $scope.person.email;
            // $scope.temp.phone = $scope.person.phone;
            // $scope.temp.division =  $scope.person.division

            peopleService.update($scope.person);
            $scope.person = {};
            getAll();

            $scope.edit = 0;
            $scope.person = {};
            form.$setPristine();
            form.$setUntouched();
             $scope.formShow = 0;
        }

    }

})();