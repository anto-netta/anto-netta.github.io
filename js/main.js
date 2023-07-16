(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });
    
})(jQuery);

function checkPassword() {
    var password = document.getElementById("passwordInput").value;
  
    // Controlla la password
    if (password === "anto-netta") {
      document.getElementById("passwordForm").style.display = "none";
      document.getElementById("content1").style.display = "block";
    } else if (password === "ducati") {
      document.getElementById("passwordForm").style.display = "none";
      document.getElementById("content2").style.display = "block";
    } else {
      document.getElementById("errorMessage").textContent = "Password errata. Riprova.(è tutto minuscolo)";
    }
  }
  
  document.getElementById("rsvp-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    document.getElementById("rsvp-form").style.display = "none"; // Hide RSVP form
    document.getElementById("rsvp-title").style.display = "none"; // Hide RSVP title
    document.getElementById("thank-you-message").style.display = "block"; // Display thank you message
});

let codiciUsati = [];

function generaCodiceCasuale() {
    const lettere = "ABCDEFGHIJKLMNPQRSTUVWXYZ"; // Escludiamo la lettera 'O'
    const cifre = "123456789"; // Escludiamo il numero '0'

    let codice = "";
    for (let i = 0; i < 2; i++) {
        codice += lettere.charAt(Math.floor(Math.random() * lettere.length));
    }
    for (let i = 0; i < 2; i++) {
        codice += cifre.charAt(Math.floor(Math.random() * cifre.length));
    }

    return codice;
}

function codiceGiaUsato(codice) {
    return codiciUsati.includes(codice);
}

function mostraRisultato(event) {
    event.preventDefault();
    const form = event.target;
    const risultatoDiv = document.getElementById("risultato");
    const causaleP = document.getElementById("causale");

    let codiceCasuale;
    do {
        codiceCasuale = generaCodiceCasuale();
    } while (codiceGiaUsato(codiceCasuale));

    codiciUsati.push(codiceCasuale);

    causaleP.textContent = `Causale: "${codiceCasuale}_matrimonio_anto_netta"`;

    risultatoDiv.style.display = "block";
    form.style.display = "none";
}