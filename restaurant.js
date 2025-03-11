async function getData() {
  const res = await fetch("http://restaurant-app.test/api/products");
  const data = await res.json();

  const readProduk = $("#readProduk");
  data.forEach((product) => {
    const div = $("<div></div>");
    div.html(`
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <p>${product.price}</p>
    `);
    readProduk.append(div);
  });
}

getData();

