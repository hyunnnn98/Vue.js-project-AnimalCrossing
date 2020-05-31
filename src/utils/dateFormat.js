function dateFormat(now_date, date_info, type) {
  let past_date, result_date, result_hour;
  past_date = new Date(date_info);
  result_hour =
    (now_date.getTime() - past_date.getTime()) / (1000 * 60 * 60 * 24);

  if (result_hour > 1) {
    result_date = past_date.getMonth() + 1 + '월 ' + past_date.getDate() + '일';
  } else if (type == 'chat') {
    let halfString = '오전 ';
    if (past_date.getHours() > 11) halfString = '오후 ';
    result_date =
      halfString + past_date.getHours() + ':' + past_date.getMinutes();
  } else {
    console.log(past_date);
    console.log('지금 시간', now_date.getHours());
    let hour = now_date.getHours() - past_date.getHours();
    let minutes =
      now_date.getHours() * 60 +
      now_date.getMinutes() -
      (past_date.getHours() * 60 + past_date.getMinutes());
    hour > 0
      ? (result_date = hour + '시간전')
      : (result_date = minutes + '분전');
  }

  return result_date;
}

export { dateFormat };
