import { Product } from "../../../../../types";
import { useProductList } from "./hooks";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

const ProductList = ({ onProductUpdate, products }:Props) => {

    const {         
        openProductIds,
        toggleProductAccordion,
        handleEditProduct,
        handleAllEdit,
        handleEditComplete,
        handleAddDiscount,
        handleRemoveDiscount,
        editingProduct,
        newDiscount,
        setNewDiscount  
    } = useProductList({ products, onProductUpdate });

    return (
        <div className="space-y-2">
        {products.map((product, index) => (
            <div key={product.id} data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
                <button
                    data-testid="toggle-button"
                    onClick={() => toggleProductAccordion(product.id)}
                    className="w-full text-left font-semibold"
                >
                    {product.name} - {product.price}원 (재고: {product.stock})
                </button>
                {openProductIds.has(product.id) && (
                    <div className="mt-2">
                        {editingProduct && editingProduct.id === product.id ? (
                            <div>
                                <div className="mb-4">
                                    <label className="block mb-1">상품명: </label>
                                    <input
                                        type="text"
                                        value={editingProduct.name}
                                        onChange={(e) => handleAllEdit('name', e.target.value)}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price-input" className="block mb-1">가격: </label>
                                    <input
                                        id="price-input"
                                        type="number"
                                        value={editingProduct.price}
                                        onChange={(e) => handleAllEdit('price', parseInt(e.target.value))}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">재고: </label>
                                    <input
                                        type="number"
                                        value={editingProduct.stock}
                                        onChange={(e) => handleAllEdit('stock', parseInt(e.target.value))}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                {/* 할인 정보 수정 부분 */}
                                <div>
                                    <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                                    {editingProduct.discounts.map((discount, index) => (
                                        <div key={index} className="flex justify-between items-center mb-2">
                                            <span>{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인</span>
                                            <button
                                                onClick={() => handleRemoveDiscount(product.id, index)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    ))}
                                    <div className="flex space-x-2">
                                        <input
                                            type="number"
                                            placeholder="수량"
                                            value={newDiscount.quantity}
                                            onChange={(e) => setNewDiscount({ ...newDiscount, quantity: parseInt(e.target.value) })}
                                            className="w-1/3 p-2 border rounded"
                                        />
                                        <input
                                            type="number"
                                            placeholder="할인율 (%)"
                                            value={newDiscount.rate * 100}
                                            onChange={(e) => setNewDiscount({ ...newDiscount, rate: parseInt(e.target.value) / 100 })}
                                            className="w-1/3 p-2 border rounded"
                                        />
                                        <button
                                            onClick={() => handleAddDiscount(product.id)}
                                            className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                        >
                                            할인 추가
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={handleEditComplete}
                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                                >
                                    수정 완료
                                </button>
                            </div>
                        ) : (
                            <div>
                                {product.discounts.map((discount, index) => (
                                    <div key={index} className="mb-2">
                                        <span>{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인</span>
                                    </div>
                                ))}
                                <button
                                    data-testid="modify-button"
                                    onClick={() => handleEditProduct(product)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                                >
                                    수정
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        ))}
    </div>
    )
}

export default ProductList;