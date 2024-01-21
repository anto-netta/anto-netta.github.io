(function ($) {
  "use strict";

  // Navbar on scrolling
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".navbar").fadeIn("slow").css("display", "flex");
    } else {
      $(".navbar").fadeOut("slow").css("display", "none");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        "easeInOutExpo"
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $(".btn-play").click(function () {
      $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);

    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", $videoSrc);
    });
  });

  // Scroll to Bottom
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".scroll-to-bottom").fadeOut("slow");
    } else {
      $(".scroll-to-bottom").fadeIn("slow");
    }
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Gallery carousel
  $(".gallery-carousel").owlCarousel({
    autoplay: false,
    smartSpeed: 1000,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });
})(jQuery);

function checkPassword() {
  var password = document.getElementById("passwordInput").value;
  // Controlla la password
  if (password === "pizzifritti") {
    document.getElementById("passwordForm").style.display = "none";
    document.getElementById("content1").style.display = "block";
  } else if (password === "tiramisu") {
    document.getElementById("passwordForm").style.display = "none";
    document.getElementById("content2").style.display = "block";
  } else {
    document.getElementById("errorMessage").textContent =
      "Password errata. Riprova.(è tutto minuscolo senza accenti)";
  }
}

//ALTRO SHOW

function mostraCampoAltro(valoreSelezionato) {
  var altroInputWrapper = document.getElementById("altroInputWrapper");
  var altroInput = document.getElementById("altroInput_rsvp");

  if (valoreSelezionato === "Altro") {
    altroInputWrapper.style.display = "block"; // Mostra il campo "Specifica altro..."
    altroInput.setAttribute("required", ""); // Imposta il campo come obbligatorio
  } else {
    altroInputWrapper.style.display = "none"; // Nascondi il campo "Specifica altro..."
    altroInput.removeAttribute("required"); // Rimuovi l'attributo "required"
  }
}
//ALTRO SHOW END

//GENERATORE DI CODICI

let codiciUsati = [];
let codeiban = "AB34";
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
  codeiban = codiceCasuale;
}

//GOOGLE FORM IBAN

("use strict");
const Nome = document.querySelector("#Nome");
const Cognome = document.querySelector("#Cognome");
const email = document.querySelector("#email");
const comment = document.querySelector("#comment");
const button = document.querySelector("#button-iban");
const form = document.querySelector("#ibanform");
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfLS3m9FzMrWjWWujChSs4_TNAjxEYtfnpt7rvOmQZ24DHVEg/formResponse"; // your google form response URL e.g https://docs.google.com/forms/u/0/d/e/1FAIpQLSdfVQ2ycW2AROnbmCmVw8I8Uc7Z40BZtjleJ_-IQjgtznQ_4cJl/formResponse

const handleSubmit = async (event) => {
  event.preventDefault();
  const NomeValue = Nome.value;
  const CognomeValue = Cognome.value;
  const emailValue = email.value;
  const commentValue = comment.value;
  const formData = {
    "entry.1011907003": NomeValue,
    "entry.1702041382": CognomeValue,
    "entry.1194312101": emailValue,
    "entry.1997830250": codeiban,
    "entry.1399896089": commentValue,
  };
  const appendedFormData = newFormData({ ...formData });

  try {
    button.disabled = true;
    button.textContent = "processing...";
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: appendedFormData,
    });
    alert("Grazie, usa la causale che vedi scritta sotto");
  } catch (error) {
    alert("Something went wrong, please try again");
    console.log(error);
  } finally {
    button.disabled = false;
    button.textContent = "Invia";
  }
};

if (form != null) form.addEventListener("submit", handleSubmit);

// A helper function to help convert the data to FormData
const newFormData = (inputs) => {
  const formData = new FormData();
  const newArr = Object.entries(inputs);
  newArr.map((item) => {
    return formData.append(`${item[0]}`, item[1]);
  });
  return formData;
};

//GOOGLE FORM RSVP
("use strict");
const Nome_Cognome_rsvp = document.querySelector("#Nome_Cognome_rsvp");
const cena_rsvp = document.querySelector("#cena_rsvp");
const e_mail_rsvp = document.querySelector("#e_mail_rsvp");
const presenza_rsvp = document.querySelector("#presenza_rsvp");
const allergia_rsvp = document.querySelector("#allergia_rsvp");
const altro_rsvp = document.querySelector("#altroInput_rsvp"); // Correggi il nome della variabile
const commento_rsvp = document.querySelector("#commento_rsvp");
const Nome_Cognome_cake = document.querySelector("#Nome_Cognome_cake");
const cena_cake = document.querySelector("#cena_cake");
const e_mail_cake = document.querySelector("#e_mail_cake");
const presenza_cake = document.querySelector("#presenza_cake");
const allergia_cake = document.querySelector("#allergia_cake");
const altro_cake = document.querySelector("#altroInput_cake"); // Correggi il nome della variabile
const commento_cake = document.querySelector("#commento_cake");
const rsvpButton = document.querySelector("#rsvpButton");
const cakeButton = document.querySelector("#cakeButton");
const rsvpForm = document.querySelector("#rsvpform");
const cakeForm = document.querySelector("#cakeform");
const GOOGLE_questonario_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc4WtHCRT3p18zJJ4MrWjv1ARFcL8HcBZkErPJykaTcBSGPaw/formResponse";
const handlSubmit = async (event, form, button) => {
  event.preventDefault();
  // Seleziona i campi in base al modulo
  const Nome_CognomeValue =
    form === rsvpForm ? Nome_Cognome_rsvp.value : Nome_Cognome_cake.value;
  const cenaValue = form === rsvpForm ? cena_rsvp.value : cena_cake.value;
  const e_mailValue = form === rsvpForm ? e_mail_rsvp.value : e_mail_cake.value;
  const presenzaValue =
    form === rsvpForm ? presenza_rsvp.value : presenza_cake.value;
  const allergiaValue =
    form === rsvpForm ? allergia_rsvp.value : allergia_cake.value;
  const altroValue = form === rsvpForm ? altro_rsvp.value : altro_cake.value;
  const commentoValue =
    form === rsvpForm ? commento_rsvp.value : commento_cake.value;
  const dati = {
    "entry.1011907003": Nome_CognomeValue,
    "entry.1991254785": e_mailValue,
    "entry.1823152219": cenaValue,
    "entry.1194312101": presenzaValue,
    "entry.1997830250": allergiaValue,
    "entry.1093723934": altroValue,
    "entry.367979752": commentoValue,
  };
  const appendedDati = newFormDat({ ...dati });
  try {
    button.disabled = true;
    button.textContent = "processing...";
    const response = await fetch(GOOGLE_questonario_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: appendedDati,
    });
  } catch (error) {
    alert("Something went wrong, please try again");
    console.log(error);
  } finally {
    button.disabled = false;
    button.textContent = "Inviato";
    setTimeout(function () {
      if (form === cakeForm) {
        document.querySelector("#thank-you-message_cake").style.display =
          "block"; // Mostra il messaggio di ringraziamento
      } else {
        document.querySelector("#thank-you-message").style.display = "block"; // Mostra il messaggio di ringraziamento
      }
      form.style.display = "none";
    }, 1000);
  }
};

rsvpForm.addEventListener("submit", (event) =>
  handlSubmit(event, rsvpForm, rsvpButton)
);
cakeForm.addEventListener("submit", (event) =>
  handlSubmit(event, cakeForm, cakeButton)
);

const newFormDat = (inputs) => {
  const dati = new FormData();
  const newArr = Object.entries(inputs);
  newArr.map((item) => {
    return dati.append(`${item[0]}`, item[1]);
  });
  return dati;
};

//Visualizza libretto messa
// Ottieni la data corrente
var dataCorrente = new Date();

// Definisci la data specifica in cui desideri mostrare l'elemento
var dataDaConfrontare = new Date("2024-01-08");

// Confronta la data corrente con la data specifica
if (dataCorrente.toDateString() === dataDaConfrontare.toDateString()) {
  // Mostra l'elemento
  document.getElementById("elemento-da-mostrare").style.display = "block";
} else {
  // Nascondi l'elemento
  document.getElementById("elemento-da-mostrare").style.display = "none";
}
