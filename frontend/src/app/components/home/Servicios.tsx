import Cards from "../Cards";

const Servicios = () => {
  return (
    <div className="grid grid-rows-2 grid-cols-2 md:grid-rows-1 md:grid-cols-4 gap-4 w-11/12 mx-auto my-10">
      <Cards imagen="https://i.ibb.co/pvL1BFK/auditoria.jpg" titulo="Auditorias" />
      <Cards imagen="https://i.ibb.co/HXpXS5Q/facturacion.jpg" titulo="Facturación" />
      <Cards imagen="https://i.ibb.co/0BNKkQv/declaraciones.jpg" titulo="Declaraciones" />
      <Cards imagen="https://i.ibb.co/7NF4M29/calculo.png" titulo="Nóminas" />
    </div>
  );
}

export default Servicios;