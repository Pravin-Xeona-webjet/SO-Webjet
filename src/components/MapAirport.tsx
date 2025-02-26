const MapAirport: React.FC<{ info: any }> = ({ info }) => {
  return (
    <div >
      <img src={info.src}/>
      <p>{info.name}</p>
      <p>{info.description}</p>

      <div>
        <p>Fly to {info.description} from $250 with
          <a href={`https://www.webjet.com.au/`}> Webjet deals</a>
        </p>
      </div>
    </div>
  );
};

export default MapAirport;
