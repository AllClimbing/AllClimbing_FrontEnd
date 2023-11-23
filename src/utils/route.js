export const routeForAddReview = (router, id) => {
  router.push(`/review/${id}`)
}

export const routeForUpdateReview = (router, gymId, reviewNo) => {
  router.push(`/review/${gymId}/${reviewNo}`)
}

export const routeToDetail = (router, id) => {
  router.push(`/detail/${id}`)
}
