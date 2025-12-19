import { getProductById } from "@/app/lib/products";
import ProductCarousel from "../../../../components/ProductCarousel";
import CartAction from "../../../../components/CartAction";
import { Product } from "@/app/types/product";

export default async function productsDetail({params}:{params:Promise<{id: string}>}){
    const { id } = await params;
    const data: Product = await getProductById(Number(id));

    return (
        <div className="w-full min-h-[83vh] flex items-center"> 
            
            <section className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-16 py-8 lg:py-12 items-start">
                
                <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
                    <ProductCarousel images={data.images && data.images.length > 0 ? data.images : [{ id: 1, url: data.mainImageUrl, product: data, isMain: true, altText: data.name}]} />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-left">
                    <div>
                        <span className="text-blue-500 font-semibold uppercase tracking-wider text-sm">
                            {data.brand}: {data.category}
                        </span>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-white mt-2">
                            {data.name}
                        </h1>
                    </div>

                    <p className="text-zinc-400 leading-relaxed text-lg">
                        {data.description}
                    </p>

                    <div className="py-6">
                        <p className="text-3xl font-bold">${data.price.toFixed(2)}</p>
                        <p className={`text-sm mt-1 ${data.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {data.stock > 0 ? `In Stock (${data.stock})` : 'Out of Stock'}
                        </p>
                    </div>

                    <hr className="border-zinc-800" />
                    
                    <CartAction product={data}/>
                </div>
            </section>
        </div>
    );
}