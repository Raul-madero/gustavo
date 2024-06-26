import Cards from "../Cards";

const Descripciones = () => {
    return (
        <div className="grid grid-rows-1 grid-cols-3 items-center w-3/4 mx-auto gap-8 -mt-16">
            <Cards imagen="https://i.ibb.co/pd7QcVD/profesional.jpg" titulo="Personal profesional y actualizado." />
            <Cards imagen="https://i.ibb.co/VMWs0LJ/precio.jpg" titulo="Un precio justo."/>
            <Cards imagen="https://i.ibb.co/jgpMkkR/contabilidad.jpg" titulo="Asesoria contable personalizada." />
        </div>
    );
}

export default Descripciones;