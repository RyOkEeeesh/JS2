// URL解析
const url = new URL(location.href);
const pathParts = url.pathname.split("/");
// 最後の部分が 商品ID
const productId = pathParts.pop();
console.log("Product ID:", productId);

async function findProduct() {
    try {
        // ✅ 商品データを API から取得
        const res = await fetch(`/api/product/show/${productId}`);
        const product = await res.json();
        // 商品詳細レンダリング
        renderProductDetail(product);
    } catch (err) {
        console.error("API Fetch Error:", err);

        const detail = document.getElementById("product-detail");
        detail.innerHTML = `
            <p class="text-red-600 font-bold p-4 bg-red-100 rounded">
                商品情報を取得できませんでした
            </p>
        `;
    }
}

// 商品詳細
function renderProductDetail(p) {
    const detail = document.getElementById("product-detail");

    let tagHtml = "";
    if (p.tag) {
        tagHtml = `
                <span class="text-xs ${p.category === "men"
                ? "bg-pink-200 text-pink-800"
                : "bg-sky-200 text-sky-800"
            } px-2 py-1 rounded">${p.tag}</span>
            `;
    }

    detail.innerHTML = `
            <div class="w-1/2 rounded-lg overflow-hidden">
                <img src="/${p.image}" class="">
            </div>
            <div class="w-1/2 pl-6 flex flex-col justify-between">
                <div>
                    <div class="info p-3 space-y-3">
                        ${tagHtml}
                        <h3 class="name font-semibold text-2xl">${p.name}</h3>
                        <p class="note text-gray-500">${p.note}</p>
                        <p class="price font-bold text-2xl">&yen;${p.price.toLocaleString()}</p>
                    </div>
                </div>
                <div class="text-center border-t">
                    <button class="add-cart-btn text-white text-lg bg-sky-500 px-3 py-2 w-full rounded-lg">
                        Add Cart
                    </button>
                </div>
            </div>
        `;
}

findProduct();