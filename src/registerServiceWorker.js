/* eslint-disable no-console */

import { register } from 'register-service-worker';

const _version = '1.0.0';
const cacheName = '1.0.0';

const log = msg => {
  console.log(`[ServiceWorker ${_version}] ${msg}`);
};

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      log('INSTALL');
    },
    registered() {
      log('서비스워커가 이미 등록되어있습니다..');
    },
    cached() {
      log('오프라인 사용을 위한 캐싱이 완료되었습니다.');
    },
    updatefound() {
      log('새로운 컨탠츠를 다운로드 중입니다...');
    },
    updated() {
      log('이제, 새로운 컨챈츠 사용이 가능합니다. 새로고침 해주세요.');
    },
    offline() {
      log('인터넷 연결을 할 수 없습니다. 오프라인 모드로 작동합니다.');
    },
    error(error) {
      log('서비스워커 에러 발생.. 잠시후 다시 시도해주세요.');
    },
  });
}
