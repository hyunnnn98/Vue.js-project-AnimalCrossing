async function toastController(ionic, message, color) {
  const toast = await ionic.toastController.create({
    message,
    color,
    cssClass: 'ionic_toast',
    duration: 2000,
    position: 'top',
  });
  toast.present();
}

async function toastErrorController(ionic, err) {
  const message = await err.response.data.message;
  const toast = await ionic.toastController.create({
    message,
    color: 'danger',
    cssClass: 'ionic_toast',
    duration: 2000,
    position: 'top',
  });
  toast.present();
}

export { toastController, toastErrorController };
