let sites = [
    {
        id: 0,
        name: "Harvesters",
        desc: "Package and ship food to food banks",
        phone: "(785) 500 - 5000",
        email: "stuff@stuff.com",
        address: "4515 thing topeka ks",
        img: "./img/temp/untitled3.png"
    },
    {
        id: 2,
        name: "ers",
        desc: "Package and ship food to food banks",
        phone: "(785) 500 - 5000",
        email: "stuff@stuff.com",
        address: "4515 thing topeka ks",
        img: "./img/temp/untitled.png"
    }
];


function buildSites() {
    $.each(sites, function (key, site) {
        let base = $("<div>").addClass("col-auto border border-dark rounded bg-primary p-1 mr-1 mb-1");
        let link = $("<a>").attr("href", "./sites.html?site=" + site.id);
        let base2 = $("<div>").addClass("site align-items-center");
        let base3 = $("<div>").addClass("d-flex");
        let img = $("<img>").addClass("site-img");
        img.attr("width", "300");
        img.attr("height", "200");
        img.attr("src", site.img);
        let text = $("<p>").addClass("position-absolute mt-1 ml-2 img-text invisible");
        text.html("<b>" + site.name + "</b><br />" + site.desc);
        $("#sitesContent").append(base.append(link.append(base2.append(base3.append(img, text)))));
    })
}


function buildSite(id) {
    let site = sites.filter(s=>s.id == id)[0];
    let base = $("<div>").addClass("col");
    let name1 = $("<h1>").addClass("display-1 d-none d-md-block").html(site.name);
    let name2 = $("<h1>").addClass("display-4 d-sx-block d-md-none").html(site.name);
    let desc = $("<p>").html(site.desc);
    let phone = $("<p>").html("<b>Phone Number:</b> " + site.phone);
    let email = $("<p>").html("<b>Email Address:</b> " + site.email);
    let addr = $("<p>").html("<b>Address:</b> " + site.address);
    let backlink = $("<a>").addClass("btn btn-primary").attr("href", "./sites.html").html("Back to Sites");
    base.append(name1, name2, desc, "<hr />", phone, email, addr, "<hr />", backlink);
    let base2 = $("<div>").addClass("col-auto pt-3");
    let img1 = $("<img>").addClass("border border-dark rounded shadow-lg d-none d-lg-block").attr("width", "600").attr("height", "400").attr("src", site.img);
    let img2 = $("<img>").addClass("border border-dark rounded shadow-lg d-xs-block d-lg-none").attr("width", "300").attr("height", "200").attr("src", site.img);
    base2.append(img1, img2);
    $("#sitesContent").append(base, base2);
}

$(document).ready(function () {
    let id = (window.location.search.substr(1).split("=")[1])
    if (id != undefined) {
        buildSite(id);
        $("#title").empty();
    } else {
        buildSites();
        if ($(window).width() >= 1024) {
            $(".site").hover(
                function () {
                    $(this).find(".site-img").addClass("grayBlur");
                    $(this).find(".img-text").removeClass("invisible");
                },
                function () {
                    $(this).find(".site-img").removeClass("grayBlur");
                    $(this).find(".img-text").addClass("invisible");
                }
            );
        } else {
            $(".site-img").each(function () { $(this).addClass("grayBlur") });
            $(".img-text").each(function () { $(this).removeClass("invisible") });
        }
    }
});