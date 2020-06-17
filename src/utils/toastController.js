async function toastController(ionic, message, color, time) {
  const toast = await ionic.toastController.create({
    message,
    color,
    cssClass: 'ionic_toast',
    duration: time || 2000,
    position: 'top',
  });
  toast.present();
}

async function toastErrorController(ionic, err) {
  const message = await err.response.data.message;
  let toast;
  try {
    toast = await ionic.toastController.create({
      message,
      color: 'danger',
      cssClass: 'ionic_toast',
      duration: 2000,
      position: 'top',
    });
  } catch (error) {
    toast = await ionic.toastController.create({
      message: '[에러] 서버가 혼잡합니다.. 잠시 후 다시 시도해주세요.',
      color: 'danger',
      cssClass: 'ionic_toast',
      duration: 2000,
      position: 'top',
    });
  }

  toast.present();
}

export { toastController, toastErrorController };
