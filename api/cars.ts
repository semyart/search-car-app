export const getCarData = (pageNumber: number) => {
    return {
        method: 'GET',
        url: 'https://car-data.p.rapidapi.com/cars',
        params: {
          limit: '16',
          page: `${pageNumber}`
        },
        headers: {
          'X-RapidAPI-Key': '54a5988a73msh4dfde0584f1fe8bp151596jsn26c5a231a832',
          'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
        }
    }
};