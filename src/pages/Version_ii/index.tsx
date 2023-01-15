import SimplePokemonGame from "../../components/SimplePokemonGame";
import banner from "../../assets/pkm_banner.jpeg"

export function Version_ii() {
  return (
    <>
      <div className="absolute -z-10 object-cover w-full h-full bg-center bg-cover opacity-70 "
        style={{ backgroundImage: `url(${banner})` }}
      />

      <div className="mt-10">
        <SimplePokemonGame />
      </div>
    </>
  );
}
