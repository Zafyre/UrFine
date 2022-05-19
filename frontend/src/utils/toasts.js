import Swal from "sweetalert2";
const showToast = async (text, icon, timer = 1500) => {
  await Swal.fire({
    titleText: text,
    icon: icon,
    showConfirmButton: false,
    toast: true,
    position: "bottom-start",
    timer: timer,
    timerProgressBar: true,
  });
};

export { showToast };
