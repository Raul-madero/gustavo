import Image from "next/image";

const NosotrosPage = () => {
    return (
        <div className="flex flex-col items-center justify-start my-10">
            <Image src="https://i.ibb.co/Fwjwtm3/nosotros.jpg" alt="Nosotros" width={500} height={400} />
            <h1 className="text-4xl font-bold my-5 dark:text-slate-100">¿Quienes Somos?</h1>
            <div className="w-3/4">
                <p className="dark:text-slate-100">Somos un equipo de contadores con la vision de convertirnos en una alternativa eficiente, con respuestas ágiles y prácticas a las necesidades de nuestros clientes, siempre basados en el conocimiento profundo y en la aplicación de las leyes físcales.</p>
                <br />
                <p className="dark:text-slate-100">No pretendemos inventar formas mágicas para el cálculo de impuestos, más bien, el constante estudio de la legislación físcal es nuestra fortaleza para poder trabajar de la mano de nuestros clíentes para ayudarles a tener certidumbre y tranquilidad en el cumplimiento de las obligaciones fiscales vigentes.</p>
                <br />
                <p className="dark:text-slate-100">Buscamos siempre la cercania con el cliente para dar respuestas no solo en el pago de impuestos, sino, en la operación general de sus actividades, en el entendido de que nos enfocaremos en las áreas contable, físcal y financiera para que ustedes solo se preocupen por la operación de la empresa.</p>
            </div>
        </div>
    );
}

export default NosotrosPage;