import type { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import ProductFeed from '../components/ProductFeed';
import IProduct from '../interface/product';

const Home: NextPage<{products: IProduct[], session: Session}> = (props) => {

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const res = await fetch('https://fakestoreapi.com/products');
    const products: IProduct[] = await res.json();

    return  { 
        props : {
            products,
            session
        },
    }
}
    
export default Home;