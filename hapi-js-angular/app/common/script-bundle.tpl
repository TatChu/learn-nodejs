<!-- build:js(.) scripts/vendor.js -->
<!-- bower:js -->
<script src="/bower_components/jquery/dist/jquery.js"></script>
<script src="/bower_components/gsap/src/uncompressed/TweenMax.js"></script>
<script src="/bower_components/jquery-mousewheel/jquery.mousewheel.js"></script>
<script src="/bower_components/jrespond/jRespond.js"></script>
<script src="/bower_components/magnific-popup/dist/jquery.magnific-popup.js"></script>
<script src="/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js"></script>
<script src="/bower_components/is_js/is.js"></script>
<script src="/bower_components/cropper/dist/cropper.js"></script>
<script src="/bower_components/jquery-ui/ui/minified/core.min.js"></script>
<script src="/bower_components/jquery-ui/ui/minified/widget.min.js"></script>
<script src="/bower_components/jquery-ui/ui/minified/mouse.min.js"></script>
<script src="/bower_components/jquery-ui/ui/minified/position.min.js"></script>
<script src="/bower_components/jquery-ui/ui/minified/draggable.min.js"></script>
<script src="/bower_components/jquery-ui/ui/minified/droppable.min.js"></script>
<script src="/bower_components/jquery-ui/ui/minified/resizable.min.js"></script>
<script src="/bower_components/jquery-ui/ui/minified/selectable.min.js"></script>
<script src="/bower_components/jquery-ui/ui/minified/sortable.min.js"></script>
<script src="/bower_components/jquery-ui/ui/minified/datepicker.min.js"></script>
<script src="/bower_components/angular/angular.js"></script>
<script src="/bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="/bower_components/slick/dist/slick.js"></script>
<script src="/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script src="/bower_components/angular-resource/angular-resource.js"></script>
<script src="/bower_components/angular-cookies/angular-cookies.js"></script>
<!-- endbower -->
<!-- endbuild -->
<script src="scripts/languages.js"></script>
<script src="scripts/variables.js"></script>
<!-- build:js({app,.tmp}) scripts/main.js -->
<!-- Libs -->
<script src="scripts/utils/plugins.js"></script>
<script src="scripts/utils/methods.js"></script>
<script src="scripts/utils/storage.js"></script>
<script src="scripts/utils/datetime.js"></script>
<script src="scripts/utils/prototypes.js"></script>
<script src="scripts/utils/sort.js"></script>
<script src="scripts/main.js"></script>
<script src="scripts/plugins.js"></script>

<!-- App Init -->
<script src="app.js"></script>
<!-- Modules -->
<script src="/modules/header-menu/script.js"></script>
<script src="/modules/login/script.js"></script>
<script src="/modules/detail-division/script.js"></script>
<script src="/modules/division/script.js"></script>
<script src="/modules/contact/script.js"></script>
<script src="/modules/peoples/script.js"></script>
<script src="/modules/home/script.js"></script>

<script src="/modules/division/services.js"></script>
<script src="/modules/peoples/services.js"></script>

<!-- Cropper -->
<script src="modules/popup/cropper/directive.js"></script>
<!-- Menu -->
<script src="modules/menu/script.js"></script>
<!-- endbuild -->
<!-- GA Tracking Code
<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	for (var i = 0; i < settingJs.google.ga.ids.length; i++) {
		ga('create', settingJs.google.ga.ids[i], 'auto', {'name': 'gaId'+i});
		ga('gaId'+i+'.send', 'pageview');
	};
</script> -->