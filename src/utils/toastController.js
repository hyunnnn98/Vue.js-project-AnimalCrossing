async function toastController(ionic, message, color) {
  const toast = await ionic.toastController.create({
    message,
    color,
    duration: 2000,
    position: 'top',
  });
  toast.present();
}

export { toastController };
