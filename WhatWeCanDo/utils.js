$(function () {
    var pages = window.location.href.split("/");
    var pageFulls = pages[pages.length - 1].split(".");
    if (!pageFulls[1].includes("#")) {
        var page = pageFulls[0];
        $("#" + page).addClass("active");
    } else {
        $("#" + pageFulls[1].split("#")[1]).addClass("active");
    } 
});