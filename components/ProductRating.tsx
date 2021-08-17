import { StarIcon } from '@heroicons/react/solid';

type ProductRatingProps = {
    rating?:number;
}

function ProductRating(props:ProductRatingProps) {
    return(
        <>
        {Array(props.rating)
        .fill(null)
        .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500"/>
        ))}
        </>
    );
    
}

export default ProductRating;