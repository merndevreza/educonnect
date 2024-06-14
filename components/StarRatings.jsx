import Image from "next/image";
import starIcon from "@/public/assets/images/star.svg"
const StarRatings = ({ratings}) => {
   const stars=new Array(ratings).fill(0)
   return (
      <>
         {stars.map((_star,index)=>(
            <Image key={index} src={starIcon} width={20} height={20} alt="Star Rating"/>
         ))}
      </>
   );
};

export default StarRatings;