let localhost = 'localhost:3000';
let localurl = '18.221.90.182:3000';
let currenturl = '';
let currentSetting = 1;

if (currentSetting === 1) currenturl = localurl;
else currenturl = localhost;

export const urlConstants = {
  BASE_URL: currenturl,
  REQUEST_URL: 'http://' + currenturl,
};
