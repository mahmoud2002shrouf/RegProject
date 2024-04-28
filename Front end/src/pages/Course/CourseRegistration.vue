<template>
  <section>
    <base-card>
      <h2>Add New Cource!</h2>
      <CourseForm @save-data="saveData"></CourseForm>
    </base-card>
  </section>
</template>

<script>
import CourseForm from '../../components/Courses/CourseForm.vue';

export default {
  components: {
    CourseForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('course/registerCourses', data);
      this.$router.replace('/courses');
    }
  }
};
</script>