const data={
    title: "Test1",
    price: 19.99,
    detail: `
    this is the detail description can be in html or text
    this is the detail description can be in html or text
    this is the detail description can be in html or text
    this is the detail description can be in html or text
    this is the detail description can be in html or text
    this is the detail description can be in html or text
    this is the detail description can be in html or text
    this is the detail description can be in html or text`,
    category: "category1",
    qty: 100

}

export default async function productsDetail({params}:{params:Promise<{id: string}>}){
    const resolvedParams = await params;
    const productID = Number(resolvedParams.id)
    return(
        <div className="max-w-7xl mx-auto  min-h-screen">
            <section className="grid lg:grid-cols-2 gid-cols-1 gap-10 mt-14">
                <div className="aspect-[5/4] w-full bg-zinc-900"></div>
                <div className="flex flex-col justify-center gap-y-4">
                    <h3 className="text-xl font-bold">{data.title}</h3>
                    <p>${data.price}</p>
                    <p>{data.detail}</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 max-w-[200px] rounded-full gradient-bg">
                        Add to Cart
                    </button>
                </div>
            </section>
        </div>
    );
}