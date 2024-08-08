import Swal from 'sweetalert2';


const useAlertCorrect = (title: string) => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500
    });
}

export default useAlertCorrect;