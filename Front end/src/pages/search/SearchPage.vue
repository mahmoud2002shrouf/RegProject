<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <base-card>
    <h3 class="title">Research results</h3>
      <hr >
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="courses">
          <CourseItem
            v-for="course in courses"
            :key="course.id"
            :id="course.id"
            :course_code="course.courceCode"
            :name="course.name"
            :prerequisites="course.prerequisites"
            :schedule="course.schedule"

          ></CourseItem>
        </ul>
        <h3 v-else>No courses found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CourseItem from '../../components/Courses/CourseItem.vue';

export default {
  components: {
    CourseItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.issuber;
    },

    courses() {
      const courses = this.$store.getters['course/courses'];

      return courses;
    },
  
  },
  created() {
    this.loadCourse();
  },
  methods: {
    async loadCourse(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('schedule/fetchschedule');
        await this.$store.dispatch('course/loadCourses', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
.title{
  margin-left: 50px;
}
hr{
  width: 400px;
  margin-left: 10px;

}
</style>