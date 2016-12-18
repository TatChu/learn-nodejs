<div id="mod-header-menu" ng-controller="BaseCtrl as base">
	<div class="row">
            <div class="col-lg-9">
                <h1 class="text-center">The management employers</h1>
            </div>
             <div class="text-center" ng-show="base.loginHrefShow" class="col-lg-3">
               	<h4><a ui-sref="login()">Login</a></h4>
            </div>

            <div class="menu" ng-show="!base.loginHrefShow"  class="col-lg-3">
                <ul name="action"   >
                    <li><h4><a ui-sref="login()"  >{{base.user.name}}</a></h4></li>
                    <li><h4><a ng-click="base.logout();">Đăng xuất</a></h4></li>
                </ul>
            </div>
        </div>
</div>