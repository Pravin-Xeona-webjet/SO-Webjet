const MapHighlight: React.FC<{ image: any }> = ({ image }) => {
  return (
    <div>
      <img src={image.src}/>
      <p>{image.name}</p>
      <p>{image.description}</p>
      <a href={`/details/${image.id}`}>More Details</a>
    </div>
  );
};

export default MapHighlight;
