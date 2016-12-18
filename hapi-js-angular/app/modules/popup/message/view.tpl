<div id="pop-message" class="bzPopup bzPopupAnimation">
	<div class="pop-head ng-cloak" ng-show="popupScope.title">
		<h3 ng-bind="popupScope.title"></h3>
	</div>
	<div class="pop-content">
		<p class="ng-cloak">{{popupScope.message}}</p>
	</div>
	<div class="pop-controls" ng-if="popupScope.props">
		<a class="btn btn-primary" ng-click="ok()" ng-bind="popupScope.props.btnOk || 'Ok'" ng-if="popupScope.props.btnOk"></a>
		<a class="btn btn-primary" ng-click="cancel()" ng-bind="popupScope.props.btnCancel || 'Cancel'" ng-if="popupScope.props.btnCancel"></a>
	</div>
</div>