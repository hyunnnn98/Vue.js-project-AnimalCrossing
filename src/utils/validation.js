/*
  이메일 벨리데이션
  a@a.com 형식 유지.
*/
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/*
  비밀번호 벨리데이션
  영문, 숫자, 특수문자 허용 6 ~ 12자리 내 길이.
*/
function validatePassword(password) {
  // var re = /^[A-Za-z0-9]{6,16}$/;
  var re = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{6,16}$/;
  return re.test(String(password).toLowerCase());
}

/*
  이름 벨리데이션
  한글, 영문, 숫자, 공백 허용 0 ~ 10자리 내 길이.
*/
function validateName(name) {
  var re = /^[\s|가-힣|a-z|A-Z|0-9|\*]{1,10}$/;
  return re.test(String(name).toLowerCase());
}

/*
  친구코드 벨리데이션
  숫자 허용 12자리.
*/
function validateCode(code) {
  var re = /^[0-9]{12}$/;
  return re.test(code);
}

/*
  판매가격 벨리데이션
  숫자 허용 3자리.
*/
function validateCost(cost) {
  var re = /^[0-9]{1,3}$/g;
  return re.test(cost);
}

export {
  validateEmail,
  validatePassword,
  validateName,
  validateCode,
  validateCost,
};
