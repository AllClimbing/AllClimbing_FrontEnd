const convertVisitDate = (date) => {
  return `${date.substring(2, 4)}.${date.substring(5, 7)}.${date.substring(8, 10)} 방문`
}

const convertRegDate = (date) => {
  return `${date.substring(2, 4)}.${date.substring(5, 7)}.${date.substring(8, 10)} ${date.substring(
    11,
    13
  )}:${date.substring(14, 16)} 작성`
}

const getDistanceFormat = (dist) => {
  if (dist < 1000) return `${dist} M`
  return `${Math.round(dist / 100) / 10} KM`
}

export { convertRegDate, convertVisitDate, getDistanceFormat }
