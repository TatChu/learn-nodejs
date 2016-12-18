<div id="mod-login" ng-controller="LoginCtrl">
	<div class="col-md-9">
		<div class="center-block">
		<form action="http://localhost:6868/api/login" method="POST" role="form">
				<legend>Login</legend>
			
				<div class="form-group">
					<label for="">Your email:</label>
					<input type="email" name="email" required ng-model="email" class="form-control" id="" placeholder="Enter your email here">
				</div>
			
				<button type="button" ng-click="login();" class="btn btn-primary">Login</button>
			</form>

		</div>
	</div>
</div>