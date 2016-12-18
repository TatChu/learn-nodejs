<div id="mod-peoples" ng-controller="peopleCtrl">
    <div class="col-md-9">
        <div class="pull-right">
            <button class="btn btn-md btn-primary" ng-click="openForm();" role="button">Add new</button>
        </div>
        <div class="divider"></div>
        <table class="table table-hover table-bordered table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Division</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="item in peoples">
                    <td ng-bind="item.id"></td>
                    <td ng-bind="item.name"></td>
                    <td ng-bind="item.email"></td>
                    <td ng-bind="item.phone"></td>
                    <td ng-bind="item.division.name"></td>
                    <td>
                        <button class="btn btn-xs btn-primary" ng-click="editPeople(item);">Edit</button> |
                        <button class="btn btn-xs btn-warning" ng-click="delPeople(item);">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
           <!--  <ul class="pagination">
                <li><a href="" ng-click="pagination.prevPage()">&laquo;</a></li>
                  <li ng-repeat="n in peoples| range: pagination.numPages" ng-class="{active: n == pagination.page}">
                  <a href="" ng-click="pagination.toPageId(n)">{{n + 1}}</a>
                  </li>
                  <li><a href="" ng-click="pagination.nextPage()">&raquo;</a></li>
            </ul> -->
        <form ng-show="formShow" method="POST" class="form-horizontal" name="form" role="form">
            <div class="form-group">
                <legend>Add new</legend>
            </div>

            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" name="name" id="" ng-model="person.name" required placeholder="Name">
                <label class="red" ng-show="form.name.$error.required &&  form.name.$touched ">Vui lòng nhập tên</label>
            </div>

            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" required name="email" ng-model="person.email" id="" placeholder="Email">
                <label class="red" ng-show="(form.email.$error.required || form.email.$error.email) && form.email.$touched">Vui lòng nhập email</label>

            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" class="form-control" ng-model="person.phone" id="" placeholder="Phone">
            </div>
            <div class="form-group">
                <label>Division</label>
                <select ng-model="person.division"  required name="division" class="form-control">
                    <option ng-repeat="d in lsDivision" value="{{d.id}}">{{d.name}}</option>
                </select>
                 <label class="red" ng-show="(form.division.$error.required) && form.division.$touched">Vui lòng chọn một</label>

            </div>
            <div class="form-group">
                <div class="col-md-10 col-sm-offset-2">
                    <button type="button" ng-show="!edit" ng-disabled="!form.$valid" ng-click="addNewPeople(form)" class="btn btn-primary">Add</button> 
                    <button type="button" ng-show="edit" ng-click="Update(form)" ng-disabled="!form.$valid"  class="btn btn-primary">Update</button>
                </div>
            </div>
        </form>

    </div>

</div>