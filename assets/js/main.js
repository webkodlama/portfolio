$(document).ready(function () {

    // Add Active to Sidebar link when click
    $(".sidebar nav li a").click(function () {
        $(".sidebar nav li a").removeClass('active');
        $(this).addClass('active');
    });

    // Click on Get Started to scroll down
    $('.homepage .hero-section .get-started').click(function () {
        $('html,body').animate({
            scrollTop: $(".homepage .hero-section").innerHeight()
        }, '100')
    });

    $('.sidebar-toggle').click(function(){
        $(this).toggleClass('active');
        $('.homepage .sidebar').toggleClass('active')
    })

    // Initiate Typed js - Turkish
    new Typed('#typed', {
        strings: ['Front-End Geliştirici', 'UI Tasarımcısı', 'JavaScript Uzmanı'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true
    });

    // Init Image Filter
    var $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });

    var filterFns = {
        numberGreaterThan50: function () {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        ium: function () {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };

    // filter items on button click
    $('.filter-button-group').on('click', 'button', function () {
        $(this).addClass('active').siblings().removeClass('active')
        var filterValue = $(this).attr('data-filter');
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({ filter: filterValue });
    });

});

$(window).on('load',function(){
    $(".loading").addClass('endLoading').fadeOut(2000)
});

// ---------- Black the White --------------- //
