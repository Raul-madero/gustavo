import Swal from 'sweetalert2';


const useAlertError = (text: string) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: text
    })
}

export default useAlertError
