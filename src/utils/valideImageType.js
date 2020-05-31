function valideImageType(image) {
  const result =
    ['image/jpeg', 'image/png', 'image/jpg'].indexOf(image.type) > -1;
  return result;
}

export { valideImageType };
