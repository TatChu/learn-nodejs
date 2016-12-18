<div id="mod-detail-division" ng-controller="DetailDivisionCtrl">
	<div class="col-md-9">
	<form  method="POST" name="form" name="form" role="form">
		<legend>Division</legend>
	
		<div class="form-group">
			<label for="">Name</label>
			<input type="text" class="form-control" ng-model="division.name" name="name"  required placeholder="Division's name">
			<label class="red" ng-show="form.name.$error.required &&  form.name.$touched ">Vui lòng nhập tên</label>
		</div>
	
		<div class="form-group">
			<label for="">Description / Note</label>
			<input type="text" class="form-control" ng-model="division.note" required name="descritption" placeholder="Description">
			<label class="red" ng-show="form.name.$error.required &&  form.name.$touched ">Vui lòng nhập mô tả</label>
		</div>
		<div class="form-group" ng-show="edit">
			<label for="">List employer:</label>
			<div ng-repeat="p in division.people">
				<a  ui-sref="detailPeople({id: p.id})">{{p.name}}</a>
				<br>
			</div>

			 <br>
		</div>
	
		<button type="button" ng-show="!edit" ng-click="addNewDivision()" ng-disabled="!form.$valid"  class="btn btn-primary">Add</button>
        <button type="button" ng-show="edit" ng-click="Update()"  ng-disabled="!form.$valid"  class="btn btn-primary">Update</button>
	</form>
	</div>
</div>