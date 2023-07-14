import axios from 'axios';
import { options } from './options.js';
import { notifyError } from './notifications.js';
import { hideLoadingMessage } from './loader.js';

const totalPerPage = options[0].totalPerPage;

const API_KEY = '38051155-55c7a09781d6cf5219707538c';
const BASE_URL = 'https://pixabay.com/api/';

export async function getTrending(page = 1, inputData, refs) {
  const options = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${inputData}`,
    page: `${page}`,
    per_page: `${totalPerPage}`,
  });

  try {
    const getData = await axios.get(`${BASE_URL}?${options}`);
    return getData;
  } catch (error) {
    notifyError(error, refs);
    hideLoadingMessage(refs);
  }
}
