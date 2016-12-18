<?php
list($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']) = explode(':', base64_decode(substr($_SERVER['HTTP_AUTHORIZATION'], 6)));
if (!isset($_SERVER['PHP_AUTH_USER'])) {
	header('WWW-Authenticate: Basic realm="Website Title"');
	header('HTTP/1.0 401 Unauthorized');
	exit;
} else {
	if ($_SERVER['PHP_AUTH_USER'] == 'username' && $_SERVER['PHP_AUTH_PW'] == 'password') {
	} else {
		header('WWW-Authenticate: Basic realm="Protected Page"');
		header('HTTP/1.0 401 Unauthorized');
		exit;
	}
}
?>