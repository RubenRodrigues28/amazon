type CurrencyProps = {
    amount:number;
}

function Currency(props: CurrencyProps) {
    return (
        <div>
            {new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(props.amount)}
        </div>
    );
}

export default Currency;


