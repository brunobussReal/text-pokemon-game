import TextCommandPokemonGame from "../../components/TextCommandPokemonGame";
import banner from "../../assets/pkm_banner.jpeg"

export function Home() {
  return (
    <>
      <div className="absolute -z-10 object-cover w-full h-full bg-center bg-cover opacity-70 "
        style={{ backgroundImage: `url(${banner})` }}
      />

      <div className="mt-10" >
        <TextCommandPokemonGame />
      </div>
    </>
  );
}
