import axios from 'axios';
let cachedIp = null;
let isRequestPending = false;
const pendingRequests = [];

export default async function getIp() {
  if (cachedIp) {
    return cachedIp;
  }

  if (isRequestPending) {
    return new Promise((resolve) => {
      pendingRequests.push(resolve);
    });
  }

  try {
    isRequestPending = true;
    const { data } = await axios.get('/getIp');
    cachedIp = data.ip;
    return data.ip;
  } catch (error) {
    console.error('IP adresi alınırken hata oluştu:', error);
    throw error;
  } finally {
    isRequestPending = false;
    pendingRequests.forEach((resolve) => resolve(cachedIp));
    pendingRequests.length = 0;
  }
}
