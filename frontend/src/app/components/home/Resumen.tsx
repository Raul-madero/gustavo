import Image from "next/image";

const Resumen = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center my-10 w-10/12 mx-auto bg-blue-600 dark:bg-slate-500 rounded-lg shadow-xl">
            <div className="rounded-lg">
                <Image className="overflow-hidden rounded-lg" src="https://i.ibb.co/7NdXqP9/quienes-Somos.jpg" alt="Imagen" width={450} height={500} />
            </div>
            <div className="md:w-1/2 p-4">
                <h2 className="text-2xl dark:text-slate-100 font-bold text-center">¿Quiénes Sómos?</h2>
                <p className="dark:text-slate-100">Somos un equipo de contadores con la visión de convertirnos en una alternativa eficiente y con respuestas agiles y practicas de acuerdo a las necesidades de nuestros clientes. Tenemos una gran vocación de servicio y el compromiso de satisfacer tus necesidades, siempre respetando los valores de nuestra profesion.</p>
            </div>
        </div>
    );
}

export default Resumen;