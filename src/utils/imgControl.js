// base64 이미지 => Blob 변경
function b64toBlob(b64Data, contentType, sliceSize) {
  // console.log('b64Data', b64Data);
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

// 이미지 타입 검사
function valideImageType(image) {
  const result =
    ['image/jpeg', 'image/png', 'image/jpg'].indexOf(image.type) > -1;
  return result;
}

export { b64toBlob, valideImageType };
