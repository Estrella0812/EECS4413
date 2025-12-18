import { getProductById } from "@/app/lib/products";

export default async function productsDetail({params}:{params:Promise<{id: string}>}){
    const resolvedParams = await params;
    const productID = Number(resolvedParams.id)

    const data = await getProductById(productID);

    if(!data){
        return(
            <div className="min-h-[90vh] flex justify-center items-center">Failed to load items</div>
        )
    }

    return(
        <div className="max-w-7xl mx-auto  min-h-screen">
            <section className="grid lg:grid-cols-2 gid-cols-1 gap-10 mt-14">
                <div className="aspect-[5/4] w-full bg-zinc-900"></div>
                <div className="flex flex-col justify-center gap-y-2">
                    <h3 className="text-xl font-bold">{data.name}</h3>
                    <p>{data.description}</p>
                    <p>${data.price}</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 max-w-[200px] rounded-full gradient-bg">
                        Add to Cart
                    </button>
                </div>
            </section>
        </div>
    );
}