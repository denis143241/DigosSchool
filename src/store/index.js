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
  },
  mutations: {},
  actions: {},
  modules: {},
});
