<div id="mod-division" ng-controller="divisionCtrl" >
	<div class="col-md-9">
		<div class="pull-right">
			<a class="btn btn-md btn-primary" ui-sref="detailDivision()" role="button">Add new</a>
		</div>
		<div class="divider"></div>
		<table class="table table-hover table-bordered table-striped">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Quantity</th>
					<th>Note</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="d in lsDivision">
					<td ng-bind="d.id"></td>
					<td ng-bind="d.name"></td>
					<td ng-bind="d.people.length"></td>
					<td ng-bind="d.note"></td>
					
					<td>
						<a ui-sref="detailDivision({id: d.id})">Sửa</a>   |  
						<button  class="btn btn-link btn-red" ng-click="delete(d)">Xóa</button>
					</td>
				</tr>
				
			</tbody>
		</table>
	</div>
</div>