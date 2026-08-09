const rates={
"Visiting Cards":{Colour:1.5,"Black & White":1},
"Wedding Cards":{Colour:8,"Black & White":5},
"Photo Printing":{Colour:8,"Black & White":3},
"Stickers & Labels":{Colour:4,"Black & White":3},
"Flyers & Brochures":{Colour:5,"Black & White":3},
"Posters & Banners":{Colour:20,"Black & White":12},
"A4 Colour Print":{Colour:5,"Black & White":2}
};
function calc(){
 const p=document.getElementById('product').value,t=document.getElementById('printType').value,q=Math.max(1,+document.getElementById('qty').value||1);
 const rate=rates[p]?.[t]||5,total=Math.ceil(rate*q);
 document.getElementById('total').textContent=total.toLocaleString('en-IN');
 document.getElementById('heroPrice').textContent=total.toLocaleString('en-IN');
 document.getElementById('summaryProduct').textContent=p;
 document.getElementById('summaryQty').textContent=q;
 document.getElementById('summaryPrint').textContent=t;
}
function choose(name){document.getElementById('product').value=name;document.getElementById('custom').scrollIntoView();calc()}
function fileName(){const f=document.getElementById('file').files[0];document.getElementById('fileName').textContent=f?f.name:'Choose JPG, PNG or PDF'}
function order(){
 function copyUPI() {
    const upi = "nakshatradtp4@ybl";

    navigator.clipboard.writeText(upi).then(function () {
        alert("UPI ID copied: " + upi);
    });
}
 calc();
 const p=document.getElementById('product').value,q=document.getElementById('qty').value,t=document.getElementById('printType').value,total=document.getElementById('total').textContent;
 const msg=`Hello AISmartPrint, I want to place an order.%0A%0AProduct: ${encodeURIComponent(p)}%0AQuantity: ${q}%0APrint: ${encodeURIComponent(t)}%0AEstimated Price: ₹${total}%0A%0AI will share/upload my design and complete UPI payment.`;
 window.open('https://wa.me/919177361421?text='+msg,'_blank');
}
calc();
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const product = document.getElementById("product").value;
  const quantity = document.getElementById("quantity").value;
  const details = document.getElementById("details").value;

  const message =
    "Hello AISmartPrint,%0A%0A" +
    "New Printing Order%0A" +
    "Name: " + encodeURIComponent(name) + "%0A" +
    "Mobile: " + encodeURIComponent(phone) + "%0A" +
    "Product: " + encodeURIComponent(product) + "%0A" +
    "Quantity: " + encodeURIComponent(quantity) + "%0A" +
    "Details: " + encodeURIComponent(details);

  window.open(
    "https://wa.me/919177361421?text=" + message,
    "_blank"
  );
});
