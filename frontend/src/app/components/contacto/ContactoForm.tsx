import InputGroup from "../formularios/InputGroup";
import BotonSimple from "../ui/BotonSimple";
import Titles from "../ui/Titles";

const ContactoForm = () => {
    return (
        <div className="w-3/4 mx-auto my-10 flex flex-col justify-center items-center">
            <Titles title="Contacto" />
            <form className="flex flex-col gap-4 my-10 w-full">
                <InputGroup name="Nombre" type="text"/>
                <InputGroup name="Email" type="email"/>
                <InputGroup name="Telefono" type="text"/>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="mensaje">Mensaje</label>
                <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="mensaje" name="mensaje"></textarea>
                <BotonSimple navegar="/register" texto="Enviar" />
            </form>
        </div>
    );
}

export default ContactoForm;