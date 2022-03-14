import { createStore } from "vuex";

export default createStore({
  state: {
    categories: [
      { title: "Тело человека", picture: "self_improvement" },
      { title: "Животные", picture: "pets" },
      { title: "Семья", picture: "family_restroom" },
      { title: "Еда", picture: "restaurant" },
      { title: "Чувства", picture: "emoji_emotions" },
      { title: "Цвета", picture: "palette" },
      { title: "Время", picture: "watch_later" },
      { title: "Инструменты", picture: "build" },
      { title: "Размеры", picture: "photo_size_select_small" },
      { title: "Дом", picture: "cottage" },
      { title: "Кухня", picture: "soup_kitchen" },
      { title: "Здоровье", picture: "health_and_safety" },
      { title: "Город", picture: "apartment" },
      { title: "География", picture: "location_on" },
      { title: "Океан", picture: "sailing" },
      { title: "Природа", picture: "spa" },
      { title: "Погода", picture: "thermostat" },
      { title: "Птицы", picture: "flutter_dash" },
      { title: "Насекомые", picture: "pest_control" },
      { title: "Цветы", picture: "local_florist" },
      { title: "Транспорт", picture: "local_shipping" },
      { title: "Образование", picture: "school" },
      { title: "Космос", picture: "star_rate" },
      { title: "Другое", picture: "alt_route" },
      { title: "Мои уроки", picture: "account_circle" },
    ],
    languages: ["Английский", "Французский", "Немецкий", "Испанский"]
  },
  mutations: {},
  actions: {},
  modules: {},
});
