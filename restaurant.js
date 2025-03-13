$(document).ready(function () {
  // Fungsi Read (Tampilkan Produk)
  function loadProducts() {
    $.get("http://restaurant-app.test/api/products", function (data) {
      $("#productList").html("");
      data.forEach(function (product) {
        $("#productList").append(`
          <div class="bg-white p-4 rounded shadow">
            <img src="${product.img}" alt="${product.name}" class="w-full h-48 object-cover mb-4">
            <h2 class="text-lg font-semibold">${product.name}</h2>
            <p class="text-gray-700">${product.description}</p>
            <p class="text-gray-700">Harga: ${product.price}</p>
            <button class="bg-blue-500 text-white px-4 py-2 rounded mt-2 edit-product" 
            data-id="${product.id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-img="${product.img}"
            data-description="${product.description}">Edit</button>
          </div>
        `);
      });
        
    });
  }
  loadProducts();

  // Fungsi Create (Tambah Produk)
  $(document).on("click", "#saveProduct", function () {
    let productId = $("#productId").val();
    let productData = {
      name: $("#productName").val(),
      price: $("#productPrice").val(),
      img: $("#productImage").val(),
      description: $("#productDesc").val(),
    };
    if (productId === "") {
      $.post("http://restaurant-app.test/api/products", productData, function (data) {
        alert("Produk berhasil ditambahkan");
        loadProducts();
      });

    } else {
      $.ajax({
        url: `http://restaurant-app.test/api/products/${productId}`,
        method: "PUT",
        data: JSON.stringify(productData),
        contentType: "application/json",
        success: function () {
          alert("Produk berhasil diperbarui");
          $("#productId").val("");
          $("#saveProduct").text("Simpan Produk");
          loadProducts();
        }
      });
    }
  });
  $(document).on("click", ".edit-product", function () {
    let id = $(this).data("id");
    let name = $(this).data("name");
    let price = $(this).data("price");
    let img = $(this).data("img");
    let description = $(this).data("description");
    $('#saveProduct').text("Update produk");

    $("#productId").val(id);
    $("#productName").val(name);
    $("#productPrice").val(price);
    $("#productImage").val(img);
    $("#productDesc").val(description);

    $("#saveProduct").text("Update Produk");
    });

});

