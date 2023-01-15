/**
 * Page component responsible for displaying the pokemon game with a map
 * @url (http://localhost:3000/version-ii)
 */
//------------------------------------------------------------------------------

// components
import SimplePokemonGame from "../../components/SimplePokemonGame";
import banner from "../../assets/pkm_banner.jpeg"

// Component
export function Version_ii() {
  return (
    <>
      <div className="-z-10 object-cover w-screen h-screen bg-center bg-cover opacity-70 fixed top-0"
        style={{ backgroundImage: `url(${banner})` }}
      />
      <div className="pt-10 pb-20">
        <SimplePokemonGame />
      </div>
    </>
  );
}
