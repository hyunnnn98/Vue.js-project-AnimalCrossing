function dateFormat(now_date, date_info, type) {
  let result_date;
  let past_date = new Date(date_info);
  let now_hour = now_date.getHours();
  let past_hour = past_date.getHours();
  let past_minutes = past_date.getMinutes();
  let result_hour =
    (now_date.getTime() - past_date.getTime()) / (1000 * 60 * 60 * 24);

  if (result_hour > 1) {
    result_date = past_date.getMonth() + 1 + '월 ' + past_date.getDate() + '일';
  } else if (type == 'chat') {
    let halfString = '오전 ';
    if (past_hour > 11) halfString = '오후 ';
    if (past_minutes < 10) past_minutes = '0' + past_minutes;
    result_date = halfString + past_hour + ':' + past_minutes;
  } else {
    // 하루가 지났을 경우.
    if (now_hour < past_hour) now_hour += 24;

    let hour = now_hour - past_hour;
    let minutes =
      now_hour * 60 + now_date.getMinutes() - (past_hour * 60 + past_minutes);
    if (minutes < 10) minutes = '0' + minutes;
    hour > 0
      ? (result_date = hour + '시간전')
      : (result_date = minutes + '분전');
  }

  return result_date;
}

// 20XX년 0월 0일 replace
function review_Format(re_createdAt) {
  const date = new Date(re_createdAt);

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export { dateFormat, review_Format };
