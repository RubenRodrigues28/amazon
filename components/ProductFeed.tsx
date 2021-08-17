import IProduct from "../interface/product";
import Product from './Product';

type ProductFeedProps = {
    products: IProduct[];
};

function ProductFeed(props : ProductFeedProps) {

    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52">
            { props.products
            .slice(0, 4)
            .map( ({id, title, category, description, image, price, quantity=1}: IProduct) => {
                return(
                    <Product 
                        key={id}
                        id={id}
                        title={title}
                        category={category}
                        description={description}
                        image={image}
                        price={price}
                        quantity={quantity}
                    />
                );
            })}

            <img className="md:col-span-full" src="https://links.papareact.com/dyz" alt="" />

            <div className="md:col-span-2">
                { props.products
                .slice(4, 5)
                .map( ({id, title, category, description, image, price, quantity=1}: IProduct) => {
                    return(
                        <Product 
                            key={id}
                            id={id}
                            title={title}
                            category={category}
                            description={description}
                            image={image}
                            price={price}
                            quantity={quantity}
                        />
                    );
                })}
            </div>

            { props.products
                .slice(5, props.products.length)
                .map( ({id, title, category, description, image, price, quantity=1}: IProduct) => {
                    return(
                        <Product 
                            key={id}
                            id={id}
                            title={title}
                            category={category}
                            description={description}
                            image={image}
                            price={price}
                            quantity={quantity}
                        />
                    );
            })}
        </div>
    )
}

export default ProductFeed;
