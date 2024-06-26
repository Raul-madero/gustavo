const ContactoForm = () => {
    return (
        <div>
            <h1>Contacto</h1>
            <form>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="mensaje">Mensaje</label>
                <label htmlFor="telefono">Telefono</label>
                <input type="text" id="telefono" name="telefono" />
                <textarea id="mensaje" name="mensaje"></textarea>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default ContactoForm;