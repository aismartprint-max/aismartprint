const SUPABASE_URL = "https://wrrpgmvurzyizzhrbtsp.supabase.co";
const SUPABASE_KEY = "sb_publishable_fwhpZvh9p_gjnCV0IAYCkQ_rq-P3pLt";

/* =========================================
   PRINTING RATES
   ========================================= */

const rates = {
  "Visiting Cards": {
    Colour: 1.5,
    "Black & White": 1
  },

  "Business Cards": {
    Colour: 1.5,
    "Black & White": 1
  },

  "Wedding Cards": {
    Colour: 8,
    "Black & White": 5
  },

  "Photo Printing": {
    Colour: 8,
    "Black & White": 3
  },

  "Stickers": {
    Colour: 4,
    "Black & White": 3
  },

  "Stickers & Labels": {
    Colour: 4,
    "Black & White": 3
  },

  "Flyers": {
    Colour: 5,
    "Black & White": 3
  },

  "Brochures": {
    Colour: 5,
    "Black & White": 3
  },

  "Flyers & Brochures": {
    Colour: 5,
    "Black & White": 3
  },

  "Posters": {
    Colour: 20,
    "Black & White": 12
  },

  "Posters & Banners": {
    Colour: 20,
    "Black & White": 12
  },

  "A4 Colour Print": {
    Colour: 5,
    "Black & White": 2
  },

  /* CUSTOM PRINT */
  "Custom Print": {
    Colour: 100,
    "Black & White": 100
  }
};

const UPI_ID = "nakshatradtp4@ybl";
const WHATSAPP_NUMBER = "919177361421";


/* =========================================
   CALCULATE TOTAL
   ========================================= */

function calculateTotal() {

  const productEl = document.getElementById("product");
  const printTypeEl = document.getElementById("printType");
  const qtyEl = document.getElementById("quantity");

  if (!productEl || !qtyEl) {
    return 0;
  }

  const product = productEl.value;
  const qty = Number(qtyEl.value) || 0;

  /* Custom Print = ₹100 */
  if (product === "Custom Print") {

    const total = qty > 0 ? 100 : 0;

    updatePriceDisplay(total);

    return total;
  }

  if (!printTypeEl) {
    return 0;
  }

  const printType = printTypeEl.value;

  if (
    !rates[product] ||
    !rates[product][printType]
  ) {
    updatePriceDisplay(0);
    return 0;
  }

  const rate = rates[product][printType];

  const total = Math.ceil(rate * qty);

  updatePriceDisplay(total);

  return total;
}


/* =========================================
   UPDATE ALL PRICE AREAS
   ========================================= */

function updatePriceDisplay(total) {

  const formatted =
    Number(total).toLocaleString("en-IN");

  const totalEl =
    document.getElementById("total");

  const heroPrice =
    document.getElementById("heroPrice");

  const paymentAmount =
    document.getElementById("paymentAmount");

  if (totalEl) {
    totalEl.textContent = formatted;
  }

  if (heroPrice) {
    heroPrice.textContent = formatted;
  }

  if (paymentAmount) {
    paymentAmount.textContent = formatted;
  }
}


/* =========================================
   OLD calc() SUPPORT
   ========================================= */

function calc() {
  calculateTotal();
}


/* =========================================
   PRODUCT QUICK SELECT
   ========================================= */

function choose(name) {

  const product =
    document.getElementById("product");

  if (!product) {
    return;
  }

  product.value = name;

  calculateTotal();
  updateUPIPayment();

  document
    .getElementById("order")
    ?.scrollIntoView({
      behavior: "smooth"
    });
}


/* =========================================
   COPY UPI
   ========================================= */

function copyUPI() {

  if (
    navigator.clipboard &&
    navigator.clipboard.writeText
  ) {

    navigator.clipboard
      .writeText(UPI_ID)
      .then(function () {

        alert(
          "UPI ID copied: " + UPI_ID
        );

      })
      .catch(function () {

        alert(
          "UPI ID: " + UPI_ID
        );

      });

  } else {

    alert(
      "UPI ID: " + UPI_ID
    );
  }
}


/* =========================================
   UPDATE UPI PAYMENT
   ========================================= */

function updateUPIPayment() {

  const product =
    document.getElementById("product");

  const quantity =
    document.getElementById("quantity");

  const paymentAmount =
    document.getElementById("paymentAmount");

  const upiPayButton =
    document.getElementById("upiPayButton");

  if (
    !product ||
    !quantity ||
    !paymentAmount
  ) {
    return;
  }

  const p = product.value;
  const q = Number(quantity.value) || 0;

  let amount = 0;

  /* Custom Print = fixed ₹100 */
  if (p === "Custom Print") {

    amount = q > 0 ? 100 : 0;

  } else {

    const printType =
      document.getElementById("printType");

    const t =
      printType ? printType.value : "";

    if (
      rates[p] &&
      rates[p][t]
    ) {

      amount =
        Math.ceil(
          rates[p][t] * q
        );
    }
  }

  paymentAmount.textContent =
    amount.toLocaleString("en-IN");


  /* Update UPI button */

  if (upiPayButton) {

    const upiLink =
      "upi://pay" +
      "?pa=" +
      encodeURIComponent(UPI_ID) +
      "&pn=" +
      encodeURIComponent("AISmartPrint") +
      "&am=" +
      encodeURIComponent(amount) +
      "&cu=INR";

    upiPayButton.href = upiLink;
  }
}


/* =========================================
   SHOW PAYMENT / NEXT STEP
   ========================================= */

function showNextStep() {

  /*
   * Try common payment section IDs/classes.
   * This makes the code work with the existing layout.
   */

  const paymentSection =
    document.getElementById("payment") ||
    document.getElementById("paymentSection") ||
    document.getElementById("payment-step") ||
    document.querySelector(".payment-section") ||
    document.querySelector(".payment-box") ||
    document.querySelector(".payment-card");

  if (paymentSection) {

    paymentSection.style.display = "block";

    paymentSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  } else {

    /*
     * If payment section already exists
     * but has hidden attribute
     */

    const allSections =
      document.querySelectorAll(
        "section, .step, .order-step"
      );

    allSections.forEach(function (section) {

      const text =
        section.textContent.toLowerCase();

      if (
        text.includes("payment") &&
        (
          text.includes("upi") ||
          text.includes("complete your order")
        )
      ) {

        section.style.display = "block";

        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });
  }

  updateUPIPayment();
}


/* =========================================
   WHATSAPP ORDER
   ========================================= */

function sendOrderToWhatsApp() {

  const name =
    document.getElementById("name")?.value || "";

  const phone =
    document.getElementById("phone")?.value || "";

  const product =
    document.getElementById("product")?.value || "";

  const qty =
    document.getElementById("quantity")?.value || "";

  const details =
    document.getElementById("details")?.value || "";

  const printType =
    document.getElementById("printType")?.value || "";

  const amount =
    document.getElementById("paymentAmount")?.textContent || "0";

  const message =
    "Hello AISmartPrint,%0A%0A" +

    "NEW PRINTING ORDER%0A%0A" +

    "Name: " +
    encodeURIComponent(name) +
    "%0A" +

    "Mobile: " +
    encodeURIComponent(phone) +
    "%0A" +

    "Product: " +
    encodeURIComponent(product) +
    "%0A" +

    "Print Type: " +
    encodeURIComponent(printType) +
    "%0A" +

    "Quantity: " +
    encodeURIComponent(qty) +
    "%0A" +

    "Estimated Amount: ₹" +
    encodeURIComponent(amount) +
    "%0A" +

    "Details: " +
    encodeURIComponent(details) +
    "%0A%0A" +

    "UPI ID: " +
    encodeURIComponent(UPI_ID) +
    "%0A%0A" +

    "I will send the design file and payment confirmation.";


  window.open(
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    message,
    "_blank"
  );
}


/* =========================================
   PAGE LOAD
   ========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const form =
      document.getElementById("orderForm");

    const product =
      document.getElementById("product");

    const quantity =
      document.getElementById("quantity");

    const printType =
      document.getElementById("printType");

    const designFile =
      document.getElementById("designFile");

    const fileName =
      document.getElementById("fileName");


    /* -------------------------------------
       PRODUCT CHANGE
       ------------------------------------- */

    if (product) {

      product.addEventListener(
        "change",
        function () {

          calculateTotal();
          updateUPIPayment();

        }
      );
    }


    /* -------------------------------------
       QUANTITY CHANGE
       ------------------------------------- */

    if (quantity) {

      quantity.addEventListener(
        "input",
        function () {

          calculateTotal();
          updateUPIPayment();

        }
      );
    }


    /* -------------------------------------
       PRINT TYPE CHANGE
       ------------------------------------- */

    if (printType) {

      printType.addEventListener(
        "change",
        function () {

          calculateTotal();
          updateUPIPayment();

        }
      );
    }


    /* -------------------------------------
       DESIGN FILE
       ------------------------------------- */

    if (designFile) {

      designFile.addEventListener(
        "change",
        function () {

          if (
            designFile.files &&
            designFile.files.length > 0
          ) {

            if (fileName) {

              fileName.textContent =
                "Selected: " +
                designFile.files[0].name;

            }

          } else {

            if (fileName) {

              fileName.textContent =
                "No design selected";

            }
          }

        }
      );
    }


    /* =====================================
       CONTINUE ORDER BUTTON
       ===================================== */

    if (form) {

      form.addEventListener(
        "submit",
        function (e) {

          e.preventDefault();

          /*
           * IMPORTANT:
           * Continue Order should NOT directly
           * open WhatsApp.
           *
           * First show Payment / Next Step.
           */

          calculateTotal();
          updateUPIPayment();
          showNextStep();

        }
      );
    }


    /* =====================================
       BUTTON TEXT FALLBACK
       ===================================== */

    const buttons =
      document.querySelectorAll(
        "button, input[type='submit'], a"
      );

    buttons.forEach(function (button) {

      const text =
        (
          button.textContent ||
          button.value ||
          ""
        )
        .trim()
        .toLowerCase();

      if (
        text === "continue order" ||
        text.includes("continue order")
      ) {

        button.addEventListener(
          "click",
          function (e) {

            /*
             * If it is a submit button,
             * form submit handler handles it.
             *
             * Otherwise manually show next step.
             */

            if (
              button.tagName.toLowerCase() !==
              "button" &&
              button.type !== "submit"
            ) {

              e.preventDefault();

              calculateTotal();
              updateUPIPayment();
              showNextStep();

            }

          }
        );
      }

    });


    /* =====================================
       INITIAL CALCULATION
       ===================================== */

    calculateTotal();
    updateUPIPayment();

  }
);
