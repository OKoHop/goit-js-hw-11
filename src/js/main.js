import { getTrending } from './api.js';
import getRefs from './refs.js';
import { renderingImgList } from './createImgList.js';
import { onLoad, optionsScroll } from './intersection.js';
import { options } from './options.js';
import { showLoadingMessage, hideLoadingMessage } from './loader.js';
import { notifySuccessOrFail } from './notifications.js';
import { countOfPage } from './countOfPage.js';
import { clearGallery } from './clearGallery.js';
import './scroll.js';

const refs = getRefs();
const intersectionData = options[0];

refs.searchForm.addEventListener('submit', searchSubmit);

// Intersection observer of infinity scroll
let observer = new IntersectionObserver(onLoad, optionsScroll);

// Listening search(input) and rendering marup
async function searchSubmit(e) {
  e.preventDefault();

  //data form input form
  const inputData = e.target.elements.searchQuery.value;

  intersectionData.input = inputData;

  // default number of first page
  intersectionData.page = 1;

  try {
    showLoadingMessage(refs);

    // receiving object by our requested (inputData)
    const response = await getTrending(intersectionData.page, inputData, refs);

    // card that rendered with function renderingImgList()
    const photoCard = document.querySelector('.photo-card');

    // if markup exists in .gallery => remove all markup
    if (photoCard) {
      clearGallery(refs);
    }

    // notifying about unsuccessful search or success
    notifySuccessOrFail(response, refs);

    // call renderingImgList
    renderingImgList(response, refs);

    if (response) {
      hideLoadingMessage(refs);
    }

    if (response.code === 'ERR_BAD_REQUEST') {
      throw new Error(response.code);
    }

    // calculate total pages after receiving object
    countOfPage(response, intersectionData);

    // start observing page
    observer.observe(refs.targetScroll);
  } catch (error) {
    console.log(error);
  }
}
