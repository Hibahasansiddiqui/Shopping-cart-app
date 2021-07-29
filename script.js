$('[data-role="price"]').html("$0");
$('[data-role="subtotal"]').html("$0");

function addItem(){
  var select = document.querySelector('#item').value;
  var unit = parseInt( document.querySelector('#quan').value);
​
  var pepsi = 150 * unit;
  var sting = 80 * unit;
  var mineral = 200 * unit;
  var slice = 300 * unit;
​
if (unit == '' || unit <= 0){
​
  alert ('Kindly Insert the Quantity ')
}
​
else if (select === 'p'){
    console.log(pepsi);
    document.querySelector('#list').innerHTML = 'Pepsi 1 litre' +  " " +" "+pepsi;
}
​
else if (select === 's'){
 console.log(sting);
 document.querySelector('#list').innerHTML = 'Sting 500ml' +  " " +" "+ sting;
}
else if (select === 'm'){
 console.log(mineral);
 document.querySelector('#list').innerHTML = 'Mineral water 1.5 litre' +  " " +" "+ mineral;
}  
​
else if (select === 'sj'){
 console.log(slice);
 document.querySelector('#list').innerHTML = 'Slice Juice bottle 1 litre ' +  " " +" "+ slice;
}
​
}

function populateProductsDdl(selector, items) {
  var options = [];

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    options.push($('<option />', {
      text: item.title,
      value: "$" + item.price
    }));
  }
  $(selector).html($options);
}

populateProductsDdl('[data-role="productsDdl"]', products);

//When a product is selected, populate the price
function populatePrice(selector, priceSelector) {
  var x = $('<p />', {
    text: $(selector).val()
  });
  $(priceSelector).html(x);
}

var qtyOptions = [];

//Set the quantity values in the qty dropdown.
function qtyDdlOptions(someArray, number) {

  for (i = 0; i < number; i++) {
    someArray.push([i]);
  }
}

qtyDdlOptions(qtyOptions, 100);

function populateQtyDdl(selector, items) {
  var $options = [];

  for (var i = 1; i < items.length; i++) {
    var item = [i];
    $options.push($('<option />', {
      text: item
    }));
  }
  $(selector).html($options);
}

populateQtyDdl('[data-role="qtyDdl"]', qtyOptions);

//I need to calc the subtotal based on price and qty. It works when hard coded, but not when I try to grab the price value.
function calcSubtotal() {
  value1 = $('[data-role="qtyDdl"] :selected').text();
  value2 = $('[data-role="price"]').text().slice(0);
  var x = value1 * value2;
  $('[data-role="subtotal"]').html("$" + x);
}

function calcTotal() {
  var x = $('[data-role="total"]').text();
  var value1 = $('[data-role="qtyDdl"] :selected').text();
  var value2 = $('[data-role="price"]').text().slice(0);
  var x = value1 * value2;
  $('[data-role="total"]').html("Total: $" + x);
}

$('[data-role="productsDdl"]').on("change", function() {

populatePrice('[data-role="productsDdl"]', '[data-role="price"]');
  
  
populateImage($('[data-role="productsDdl"] :selected'));
 
 
  //$('img').attr('src', "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=3024702");
  calcSubtotal();
})

$('[data-role="qtyDdl"]').on("change", function() {
  calcSubtotal();
})

//Changes the quantity in the cart and displays to customer
$('[data-role="addBtn"]').on("click", function() {
  var u = $('[data-role="productsDdl"] :selected').text();
  var x = $('[data-role="qtyDdl"] :selected').text();
  $('[data-role="qtyValue"]').html(x);

  var y = $('[data-role="productsDdl"] :selected').text();
  var z = $('[data-role="qtyDdl"] :selected').text();

  $('<li />', { 
    text: y + " was added to your cart. (Qty: " + z + ")"
  }).prependTo($('.cartList'));

  calcTotal();
})

//"Removes the product from the cart. 
$('[data-role="removeBtn"]').on("click", function() {
  $('[data-role="productsDdl"] :selected').text("Choose One");
  //$('[data-role="qtyDdl"] :selected').text("1");
  //$('[data-role="qtyValue"]').html(0);
  $('[data-role="subtotal"]').html("$0");
})

$('[data-role="cancel"]').on("click", function() {
  $('[data-role="qtyValue"]').html(0);
  $('.cartList').empty();
  $('[data-role="total"]').text("Total: $0");
})