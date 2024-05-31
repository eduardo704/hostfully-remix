import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";


export interface RaitingProps {
  raiting: number;
}

export function Raiting({ raiting }: RaitingProps) {
  const integerPart = Math.trunc(raiting);
  const fraction = parseFloat((raiting - integerPart).toFixed(2));

  const intArray = [...Array(integerPart).keys()];
  const halfArray = [];



  if (fraction >= 0.3 && fraction <= 0.7) {
    halfArray.push(1)
  }
  const totalStars = intArray.map((num) => <FaStar key={num} />);
  const halfStars = halfArray.map((_num, idx) => <FaStarHalfAlt key={idx} />);
  const emptyTotal = 5 - (intArray.length + halfStars.length);
  console.log(emptyTotal)
  const emptyStars =  [...Array(emptyTotal).keys()].map((_num, idx) => <FaRegStar key={idx} />);

  return (
    <div className="flex">
      {totalStars}
      {halfStars}
      {emptyStars}
    </div>
  );
}
