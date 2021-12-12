import { createStore } from "vuex";

export default createStore({
  state: {
    AllTests: [
      {
        title: "РАНХиГС",
        category: "Другое",
        language: "Английский",
        words: {
          "be fond of": ["любит"],
          "be hooked on": ["зависать"],
          "be interested in": ["интересоваться"],
          "be keen on": ["сильно увлекаться"],
          enjoy: ["получать удовольствие от"],
          "look forward to": ["предвкушать"],
          dislike: ["не любить"],
          hate: ["ненавидеть"],
          "be aware of": ["знающий", "сведущий"],
          "keep up": ["быть в курсе"],
          browse: ["пролистывать", "просматривать"],
          "be glued to": ["быть приклеенным к"],
          disapprove: ["не одобрять", "осуждать"],
        },
      },
    ],
    Book: {},
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
    languages: ["Английский", "Испанский", "Немецкий", "Французкий"],
  },
  mutations: {
    addToLearn(state, title) {
      state.Book[title] = false;
    },
    deleteLesson(state, lesson) {
      delete state.Book[lesson.title];
    },
    pushToTests(state, test) {
      state.AllTests.push(test);
    },
  },
  actions: {},
  modules: {},
});
