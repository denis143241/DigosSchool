<template>
  <div class="course-page">
    <app-preloader v-if="isLoading" />
    <main v-else>
      <courses-top-row>
        <template v-slot:search>
          <input
            v-model="searchingValue"
            type="text"
            class="search-bar"
            placeholder="Поиск по курсам"
          />
        </template>
      </courses-top-row>
      <course-card
        v-for="course in searchedCourses"
        :key="course._id"
        :course="course"
      />
    </main>
  </div>
</template>

<script>
import { useCourses } from "../use/courses";
import CoursesTopRow from "../components/coursesTopRow.vue";
import CourseCard from "../components/courseCard.vue";
import AppPreloader from "../components/appPreloader.vue";
import { computed, ref } from "@vue/reactivity";

export default {
  components: {
    CoursesTopRow,
    CourseCard,
    AppPreloader,
  },
  setup() {
    const { response: courses } = useCourses();
    const searchingValue = ref("");

    const isLoading = computed(() => {
      return !courses.value;
    });

    const searchedCourses = computed(() => {
      if (!searchingValue.value) {
        return courses.value;
      }

      return courses.value.filter((c) =>
        c.name.toLowerCase().includes(searchingValue.value.toLowerCase())
      );
    });

    return { courses, isLoading, searchingValue, searchedCourses };
  },
};
</script>
