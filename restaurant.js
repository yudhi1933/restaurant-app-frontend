$(document).ready(function () {
  function fetchProducts() {
    return $.get("http://restaurant-app.test/api/products")
      .done(function (data) {
        if(!Array.isArray(data)) {
          console.error("Response is not an array:", data);
          return [];
        }
        return data;
      })
      .fail(function () {
        console.error("Error :", error);
        alert("Terjadi kesalahan saat memuat produk");
        return [];
      });
  }

  function generateProductHTML(product) {
    return `
      <div class="bg-white p-4 rounded shadow">
        <img src="${product.img}" alt="${product.name}" class="w-full h-48 object-cover mb-4">
        <h2 class="text-lg font-semibold">${product.name}</h2>
        <p class="text-gray-700">${product.description}</p>
        <p class="text-gray-700">Harga: ${product.price}</p>
        <button class="bg-red-500 text-white px-4 py-2 rounded mt-2 delete-product" data-id="${product.id}">Hapus</button>
        <button class="bg-blue-500 text-white px-4 py-2 rounded mt-2 edit-product" 
          data-id="${product.id}"
          data-name="${encodeURIComponent(product.name)}"
          data-price="${product.price}"
          data-img="${product.img}"
          data-description="${encodeURIComponent(product.description)}"
        >Edit</button>
      </div>
    `;
  }

  function loadProducts() {
    fetchProducts().done(function (data) {
      let productListHTML = data.map(generateProductHTML).join(""); // Gabungkan HTML
      $("#productList").html(productListHTML);
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
      $.ajax({
        url: "http://restaurant-app.test/api/products",
        method: "POST",
        data: JSON.stringify(productData),
        contentType: "application/json",
        success: function () {
          alert("Produk berhasil ditambahkan");
          $("#productId").val("");
          $("#saveProduct").text("Simpan Produk");
          loadProducts();
        },
        error: function () {
          alert("Terjadi kesalahan saat menambahkan produk");
        }
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
        },
        error: function () {
          alert("Terjadi kesalahan saat memperbarui produk");
        }
      });
    }
  });
  $(document).on("click", ".delete-product", function () {
    let productId = $(this).data("id");
    $.ajax({
      url: `http://restaurant-app.test/api/products/${productId}`,
      method: "DELETE",
      success: function () {
        alert("Produk berhasil dihapus");
        loadProducts();
      },
      error: function () {
        alert("Terjadi kesalahan saat menghapus produk");
      }
    });
  });
  
  $(document).on("click", ".edit-product", function () {
    let id = $(this).data("id");
    let price = $(this).data("price");
    let name = decodeURIComponent($(this).data("name"));
    let img = ($(this).data("img"));
    let description = decodeURIComponent($(this).data("description"));
    

    $("#productId").val(id);
    $("#productName").val(name);
    $("#productPrice").val(price);
    $("#productImage").val(img);
    $("#productDesc").val(description);

    $("#saveProduct").text("Update Produk");
    });

});

