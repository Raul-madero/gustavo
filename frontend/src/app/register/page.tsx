import RegisterForm from "../components/formularios/RegisterForm"
import Titles from "../components/ui/Titles"


const Register = () => {
    return (
        <div className="mt-10">
            <Titles title='Registro de Usuario' />
            <RegisterForm />
        </div>
    )
}

export default Register