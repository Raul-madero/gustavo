import Descripciones from "./components/home/Descripciones";
import Jumbotron from "./components/home/Jumbotron";
import Resumen from "./components/home/Resumen";
import Servicios from "./components/home/Servicios";

export default function Home() {
  return (
    <>
      <Jumbotron />
      <Descripciones />
      <Resumen />
      <Servicios />
    </>
  );
}
