import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductFeed from '../components/ProductFeed';
import { IProduct } from './interface/products';

const Home: NextPage<{products: IProduct[]}> = (props) => {

    return (
        <div className="bg-gray-100">
            <Head>
                <title>Amazon 2.0</title>
            </Head>

            <Header/>

            <main className="max-w-screen-2xl mx-auto">
                <Banner/>
                <ProductFeed products={props.products}/>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const products: IProduct[] = await res.json();

    return  { 
        props : {
            products,
        },
    }
}
    
export default Home;