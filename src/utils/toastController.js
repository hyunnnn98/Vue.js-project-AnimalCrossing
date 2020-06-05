async function toastController(ionic, msg) {
  const toast = await ionic.toastController.create({
    message: msg,
  });
  toast.present();
}

export { toastController };
