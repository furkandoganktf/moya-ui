let localhost = 'localhost:3000';
let localurl = '192.168.1.34:3000';
let currenturl = '';
let currentSetting = 0;

if (currentSetting === 1) currenturl = localurl;
else currenturl = localhost;

export const urlConstants = {
  BASE_URL: currenturl,
  REQUEST_URL: 'http://' + currenturl,
};
