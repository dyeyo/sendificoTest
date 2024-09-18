import https from 'https';

export const httpsAgent = new https.Agent({
  rejectUnauthorized: false, 
  keepAlive: true, 
  timeout: 5000
});
