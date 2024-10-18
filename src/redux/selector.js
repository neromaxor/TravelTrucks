// selector.js
export const selectCampersList = (state) => state.campers.campers; // Звернення до масиву camper'ів
export const selectCampersStatus = (state) => state.campers.loading; // Звернення до статусу завантаження
export const selectCampersError = (state) => state.campers.error; // Звернення до помилки
