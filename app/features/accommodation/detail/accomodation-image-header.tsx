interface ImageProps {
    imageSrc: string;
  }
  

export function AccomodationImageHeader({ imageSrc }: ImageProps) {
  return (
    <div className="w-full h-[50vh] relative">
      <img src={imageSrc} className="object-cover w-full h-full" alt="edu" />
    </div>
  );
}
