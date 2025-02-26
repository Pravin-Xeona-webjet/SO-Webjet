const MapAttraction: React.FC<{ info: any }> = ({ info }) => {
  return (
    <div >
      <img src={info.src}/>
      <p>{info.name}</p>
      <p>{info.description}</p>

      <div>
        <p>Stay in {info.name} from $120 / day
          <a href={`https://www.webjet.com.au/`}> Webjet</a>
        </p>
      </div>

      <div>
        <p>Car reantals to {info.name} from $99 / day 
          <a href={`https://www.webjet.com.au/`}> Webjet</a>
        </p>
      </div>

    </div>
  );
};

export default MapAttraction;
