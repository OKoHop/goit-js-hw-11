// Count total pages of received data
export function countOfPage(response, intersectionData) {
  let countImg = response.data.totalHits;
  intersectionData.totalHits = countImg;

  // totalPerPage - imported from /get-api.js
  intersectionData.totalPages = Math.round(
    intersectionData.totalHits / intersectionData.totalPerPage
  );
}
