function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  var re = /^[A-Za-z0-9]{6,16}$/;
  return re.test(String(password).toLowerCase());
}

function validateName(name) {
  //특수문자 검증 start
  var re = /^[\s|가-힣|a-z|A-Z|0-9|\*]{0,10}$/;
  return re.test(String(name).toLowerCase());
}

function validateCode(code) {
  //특수문자 검증 start
  var re = /^[0-9]{1,12}$/g;
  return re.test(code);
}

function validateCost(cost) {
  //가격 검증 start
  var re = /^[0-9]{1,5}$/g;
  return re.test(cost);
}

export {
  validateEmail,
  validatePassword,
  validateName,
  validateCode,
  validateCost,
};
