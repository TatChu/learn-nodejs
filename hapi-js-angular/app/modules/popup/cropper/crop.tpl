<div>
	<input id="cropper-input-file" class="none" accept=".jpg,.png,.jpeg|images/*" type="file" onchange="angular.element(this).scope().setImage(this)" ng-model="fileSelected" />
	<div class="pop-top-controls">
		<button class="btn btn-primary btnSelectPic pull-left" ng-show="showButtonCrop" ng-click="fileTrigger()">Chọn ảnh khác</button>
		<button class="btn btn-primary btnSave pull-right" ng-disabled="!showButtonCrop" ng-click="getImage();ok(111)" ng-bind="popupScope.props.btnOk || 'Ok'"></button>
		<button class="btn btn-primary btnCancel pull-right" ng-click="cancel()" ng-bind="popupScope.props.btnCancel || 'Cancel'"></button>
		<div class="clearfix"></div>
	</div>
	<div class="pop-content">
		<div class="croper-zoom" ng-show="showButtonCrop">
			<span ng-click="zoom(-0.1)" class="cmd btnZoomOut"><img src="images/cropper-zoomout.png"></span>
			<span ng-click="zoom(0.1)" class="cmd btnZoomIn"><img src="images/cropper-zoomin.png"></span>
			<span ng-click="rotate()" class="cmd btnRotate"><img src="images/cropper-rotate.png"></span>
			<span ng-click="scale()" class="cmd btnScale"><img src="images/cropper-flip.png"></span>
		</div>
		<div class="cropper-browser" ng-hide="showButtonCrop" ng-click="fileTrigger()">
			<a ng-if="!loading"><span class="icon">+</span>Chọn ảnh</a>
		</div>
		<div class="loading-btn" ng-if="loading">
			<div class="circle"></div>
		</div>
		<div class="cropper-wrap" ng-show="showButtonCrop">
			<img id="cropper-img" class="img-responsive">
		</div>
	</div>
</div>