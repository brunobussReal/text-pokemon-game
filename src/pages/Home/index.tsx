/**
 * Page component responsible for displaying the text based pokemon game
 * @url (http://localhost:3000/home)
 */
//------------------------------------------------------------------------------

// components
import TextCommandPokemonGame from "../../components/TextCommandPokemonGame";
import banner from "../../assets/pkm_banner.jpeg"

// Component
export function Home() {
  return (
    <>
      <div className="-z-10 object-cover w-screen h-screen bg-center bg-cover opacity-70 fixed top-0"
        style={{ backgroundImage: `url(${banner})` }}
      />
      <div className="pt-10 pb-20">
        <TextCommandPokemonGame />
      </div>
    </>
  );
}
