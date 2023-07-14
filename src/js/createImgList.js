import 'simplelightbox/dist/simple-lightbox.min.css';
import { slider } from './lightBox.js';


export function renderingImgList(arr, refs) {
  const gallery = document.querySelector('.gallery');
  const dataObj = arr.data.hits;

  for (const key in dataObj) {
    const {
      webformatURL,
      likes,
      views,
      comments,
      downloads,
      tags,
      largeImageURL,
    } = dataObj[key];

    const data = {
      url: webformatURL,
      tag: tags,
      totalLikes: likes,
      totalViews: views,
      totalComments: comments,
      totalDownloads: downloads,
      urlBig: largeImageURL,
    };

    const card = `<div class="photo-card">
         <a class="card-item" href="${data.urlBig}"><img class="card-img" src="${data.url}" alt="${data.tag}" data-parent="<b>Likes: </b>${data.totalLikes} <b>Comments: </b>${data.totalComments} <b>Downloads: </b>${data.totalDownloads} <b>Views: </b>${data.totalViews}" width="300" height="200"/></a>
       <div class="info">
     	  <p class="info-item">
     		<b>Likes</b> ${data.totalLikes}
     	  </p>
     	  <p class="info-item">
     		<b>Comments</b> ${data.totalComments}
     	  </p>
     	  <p class="info-item">
     		<b>Downloads</b> ${data.totalDownloads}
     	  </p>
        <p class="info-item">
     		<b>Views: </b>${data.totalViews}
     	  </p>
       </div>
       
     </div>
     `;

    refs.gallery.insertAdjacentHTML('beforeend', card);

    
    const imgSlider = slider[0].modalImg;
    imgSlider.refresh();
  }
}
