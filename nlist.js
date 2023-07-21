$("head").append('<style type="text/css"></style>');
var newStyleElement = $("head").children(":last");
newStyleElement.html(`
.naukri-avatar-64 {width: 192px; height: 192px}
.naukri-avatar-64 img {width: 180px; height: 180px}
`);
