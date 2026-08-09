const SUPABASE_URL = "https://wrrpgmvurzyizzhrbtsp.supabase.co";
const SUPABASE_KEY = "sb_publishable_fwhpZvh9p_gjnCV0IAYCkQ_rq-P3pLt";
const rates = {
  "Visiting Cards": { Colour: 1.5, "Black & White": 1 },
  "Wedding Cards": { Colour: 8, "Black & White": 5 },
  "Photo Printing": { Colour: 8, "Black & White": 3 },
  "Stickers & Labels": { Colour: 4, "Black & White": 3 },
  "Flyers & Brochures": { Colour: 5, "Black & White": 3 },
  "Posters & Banners": { Colour: 20, "Black & White": 12 },
  "A4 Colour Print": { Colour: 5, "Black & White": 2 }
};

const UPI_ID = "nakshatradtp4@ybl";

function calc() {
  const productEl = document.getElementById("product");
  const printTypeEl = document.getElementById("printType");
  const qtyEl = document.getElementById("quantity");

  if (!productEl || !printTypeEl || !qtyEl) return;

  const product = productEl.value;
  const printType = printTypeEl.value;
  const qty = Number(qtyEl.value) || 0;

  if (!rates[product] || !rates[product][printType]) return;

  const rate = rates[product][printType];
  const total = Math.ceil(rate * qty);

  const totalEl = document.getElementById("total");
  const heroPrice = document.getElementById("heroPrice");
  const paymentAmount = document.getElementById("paymentAmount");

  if (totalEl) {
    totalEl.textContent = total.toLocaleString("en-IN");
  }

  if (heroPrice) {
    heroPrice.textContent = total.toLocaleString("en-IN");
  }

  if (paymentAmount) {
    paymentAmount.textContent = total.toLocaleString("en-IN");
  }
}

function choose(name) {
  const product = document.getElementById("product");

  if (product) {
    product.value = name;
    calc();
    document.getElementById("order")?.scrollIntoView({
      behavior: "smooth"
    });
  }
}

function copyUPI() {
  navigator.clipboard.writeText(UPI_ID).then(function () {
    alert("UPI ID copied: " + UPI_ID);
  });
}

function updateUPIPayment() {
  const product = document.getElementById("product");
  const quantity = document.getElementById("quantity");
  const printType = document.getElementById("printType");
  const paymentAmount = document.getElementById("paymentAmount");
  const upiPayButton = document.getElementById("upiPayButton");

  if (!product || !quantity || !printType || !paymentAmount || !upiPayButton) {
    return;
  }

  const p = product.value;
  const q = Number(quantity.value) || 0;
  const t = printType.value;

  if (!rates[p] || !rates[p][t]) {
    paymentAmount.textContent = "0";
    return;
  }

  const amount = Math.ceil(rates[p][t] * q);

  paymentAmount.textContent = amount.toLocaleString("en-IN");

  const upiLink =
    "upi://pay" +
    "?pa=" + encodeURIComponent(UPI_ID) +
    "&pn=" + encodeURIComponent("AISmartPrint") +
    "&am=" + encodeURIComponent(amount) +
    "&cu=INR";

  upiPayButton.href = upiLink;
}

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("orderForm");

  const product = document.getElementById("product");
  const quantity = document.getElementById("quantity");
  const printType = document.getElementById("printType");

  const designFile = document.getElementById("designFile");
  const fileName = document.getElementById("fileName");

  if (product) product.addEventListener("change", function () {
    calc();
    updateUPIPayment();
  });

  if (quantity) quantity.addEventListener("input", function () {
    calc();
    updateUPIPayment();
  });

  if (printType) printType.addEventListener("change", function () {
    calc();
    updateUPIPayment();
  });

  if (designFile) {
    designFile.addEventListener("change", function () {

      if (designFile.files.length > 0) {
        fileName.textContent =
          "Selected: " + designFile.files[0].name;
      } else {
        fileName.textContent = "No design selected";
      }

    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {

      e.preventDefault();

      const name = document.getElementById("name")?.value || "";
      const phone = document.getElementById("phone")?.value || "";
      const productValue = document.getElementById("product")?.value || "";
      const qty = document.getElementById("quantity")?.value || "";
      const details = document.getElementById("details")?.value || "";

      const selectedFile =
        designFile && designFile.files.length > 0
          ? designFile.files[0].name
          : "No design uploaded";

      const printTypeValue =
        document.getElementById("printType")?.value || "";

      const amountText =
        document.getElementById("paymentAmount")?.textContent || "0";

      const message =
        "Hello AISmartPrint,%0A%0A" +
        "NEW PRINTING ORDER%0A%0A" +
        "Name: " + encodeURIComponent(name) + "%0A" +
        "Mobile: " + encodeURIComponent(phone) + "%0A" +
        "Product: " + encodeURIComponent(productValue) + "%0A" +
        "Print Type: " + encodeURIComponent(printTypeValue) + "%0A" +
        "Quantity: " + encodeURIComponent(qty) + "%0A" +
        "Estimated Amount: ₹" + encodeURIComponent(amountText) + "%0A" +
        "Design: " + encodeURIComponent(selectedFile) + "%0A" +
        "Details: " + encodeURIComponent(details) + "%0A%0A" +
        "UPI ID: " + encodeURIComponent(UPI_ID) + "%0A%0A" +
        "I will send the design file and payment confirmation.";

      window.open(
        "https://wa.me/919177361421?text=" + message,
        "_blank"
      );
    });
  }

  calc();
  updateUPIPayment();
});
