let phones = [
    {
      id: 1,
      title: "Samsung Galaxy S8",
      url: "phones/galaxy S8.webp",
      price: 399.9,
      cartqte: 0,
    },
    {
      id: 2,
      title: "Google Pixel",
      url: "phones/Google pixel.png",
      price: 699.9,
      cartqte: 0,
    },
    {
      id: 3,
      title: "Xiaomi redmi note 8",
      url: "phones/redmi note 8.png",
      price: 199.9,
      cartqte: 0,
    },
    {
      id: 4,
      title: "Samsung Galaxy A10",
      url: "phones/samsung galaxy A10.png",
      price: 299.9,
      cartqte: 0,
    },
    {
      id: 5,
      title: "Samsung Galaxy J7",
      url: "phones/Samsung Galaxy J7.png",
      price: 449.9,
      cartqte: 0,
    },
    {
      id: 6,
      title: "Iphone 13 pro",
      url: "phones/iphone 13 pro.png",
      price: 769.9,
      cartqte: 0,
    },
    {
      id: 7,
      title: "Huawei P30 Pro",
      url: "phones/Huawei P30 Pro.png",
      price: 339.9,
      cartqte: 0,
    },
    {
      id: 8,
      title: "Iphone 7",
      url: "phones/iphone 7.png",
      price: 559.9,
      cartqte: 0,
    },
  ];

  function phoneToHtml(phone) {
    return `<article>
                    <div class="image">
                        <img src="${phone.url}" alt="">
                    </div>
                    <h3>${phone.title}</h3>
                    <div class="rate">
                        <span class="material-icons">star</span>
                        <span class="material-icons">star</span>
                        <span class="material-icons">star</span>
                        <span class="material-icons">star</span>
                    </div>
                    <a class="pointer" onclick="addPhonToCart(${phone.id})"><span class="price">$${phone.price}</span><span class="add">Add to cart</span></a>
                </article>`;
  }

  function updatePhones() {
    let textHtml = phones.map((phone) => phoneToHtml(phone)).join("");
    document.getElementById("articles").innerHTML = textHtml;
  }
  updatePhones();
  function addPhone() {
    let count = document.getElementById("circlenbr").innerText;
    document.getElementById("circlenbr").innerText = Number(count) + 1;
  }
  function removePhone(num = 1) {
    let count = document.getElementById("circlenbr").innerText;
    document.getElementById("circlenbr").innerText = Number(count) - num;
  }

  function phoneCartAsHtml(phoneSelected) {
    return `<div class="selectedarticle">
                    <img src="${phoneSelected.url}" alt="">
                    <div class="selectedinfo">
                        <h4>${phoneSelected.title}</h4>
                        <span class="price">$${phoneSelected.price}</span>
                        <a class="remove" onclick="removePhoneFromCart(${phoneSelected.id})">remove</a>
                    </div>
                    <div id="changeunite">
                        <a class="arrow" onclick="addPhoneNbre(${phoneSelected.id})"><span class="material-symbols-outlined">expand_less</span></a>
                        <div class="articlenumber" id="articlenumber${phoneSelected.id}">${phoneSelected.cartqte}</div>
                        <a class="arrow" onclick="reducePhoneNbre(${phoneSelected.id})"><span class="material-symbols-outlined">expand_more</span></a>
                    </div>
                </div>`;
  }

  let phonesInCart = [];
  function updateCart() {
    let textHtml = phonesInCart
      .map((phone) => phoneCartAsHtml(phone))
      .join("");
    document.getElementById("items").innerHTML = textHtml;
    if (phonesInCart.length == 0) {
      document.getElementById("items").innerHTML = `<div id="emptycart">
      Your Cart is empty, please select a product.
    </div>`;
    }
  }

  function addPhonToCart(idP) {
    let phoneSelected = phones.find((x) => x.id == idP);
    if (!phonesInCart.includes(phoneSelected)) {
      phoneSelected.cartqte = 1;
      phonesInCart.push(phoneSelected);
      updateCart();
      let phoneIdP = phones.find((phone) => phone.id == idP);
      addPriceToTotal(phoneIdP.price);
      addPhone();
    } else {
      addPhoneNbre(idP);
    }
  }

  function addPhoneNbre(idP) {
    let phoneNbre = document.getElementById(`articlenumber${idP}`);
    let phoneSelected = phones.find((x) => x.id == idP);
    phoneNbre.innerText = Number(phoneNbre.innerText) + 1;
    phoneSelected.cartqte += 1;
    addPriceToTotal(phoneSelected.price);
    addPhone();
  }
  function reducePhoneNbre(idP) {
    let phoneNbre = document.getElementById(`articlenumber${idP}`);
    let phoneSelected = phones.find((x) => x.id == idP);
    if (Number(phoneNbre.innerText) > 1) {
      phoneNbre.innerText = Number(phoneNbre.innerText) - 1;
      phoneSelected.cartqte -= 1;
      reducePriceFromTotal(phoneSelected.price);
      removePhone();
    }
  }

  function addPriceToTotal(price) {
    let total = document.getElementById("totalprice");
    let totalPrice = total.innerText.replace("$", "");
    totalPrice = Number(totalPrice) + price;
    total.innerText = `$${totalPrice.toFixed(2)}`;
  }
  function reducePriceFromTotal(price) {
    let total = document.getElementById("totalprice");
    let totalPrice = total.innerText.replace("$", "");
    totalPrice = Number(totalPrice) - price;
    total.innerText = `$${totalPrice.toFixed(2)}`;
  }

  function removePhoneFromCart(idP) {
    phonesInCart = phonesInCart.filter((phone) => phone.id != idP);
    let phoneCount = Number(
      document.getElementById(`articlenumber${idP}`).innerText
    );
    let phoneSelected = phones.find((x) => x.id == idP);
    let priceTotal = phoneSelected.price * phoneSelected.cartqte;
    phoneSelected.cartqte = 0;
    updateCart();
    removePhone(phoneCount);
    reducePriceFromTotal(priceTotal);
  }
  function clearCart() {
    document.getElementById("totalprice").innerText = "$0";
    document.getElementById("circlenbr").innerText = "0";
    phonesInCart = [];
    updateCart();
  }