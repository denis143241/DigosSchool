<template>
  <div class="course-page">
    <app-preloader v-if="isLoading" />
    <main v-else>
      <courses-top-row />
      <course-card
        v-for="course in courses"
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
import { computed } from "@vue/reactivity";

export default {
  components: {
    CoursesTopRow,
    CourseCard,
    AppPreloader,
  },
  setup() {
    const { response: courses } = useCourses();
    const isLoading = computed(() => {
      return !courses.value;
    });
    return { courses, isLoading };
  },
};
</script>
