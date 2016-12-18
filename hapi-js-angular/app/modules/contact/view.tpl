<div id="mod-contact" class="" ng-controller="ContactCtrl as contact">
	<div class="col-md-9">
		<form action="/message" method="POST" class="form-horizontal" role="form">
				<div class="form-group">
					<legend>Send message to:
					<select class="people">
						<option  ng-repeat="p in contact.people"  value="{{p.id}}" ng-bind="p.name"></option>
					</select>
					</legend>
				</div>
				
					<div class="form-group">
						<label class="sr-only" for="">Subject</label>
						<input type="email" class="form-control" id="" placeholder="Title">
					</div>
				
					<div class="form-group">
						<label class="sr-only" for="">Message</label>
						<input type="email" class="form-control" id="" placeholder="Content">
					</div>
				
				
				<div class="form-group">
					<div class="col-md-10 col-sm-offset-2">
						<button type="submit" class="btn btn-primary">Send</button>
					</div>
				</div>
		</form>
	</div>
</div>