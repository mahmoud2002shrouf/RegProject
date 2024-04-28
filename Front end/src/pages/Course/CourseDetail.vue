<template>
  <div>
    <section>
      <base-card>
        <h3>{{selectedCourse.name}}</h3>
        <h3>{{selectedCourse.courceCode}}</h3>
        <h3>{{selectedCourse.description}}</h3>
        <h3>{{selectedCourse.name}}</h3>
        <h3>{{selectedCourse.schedule}}</h3>
        <h3>{{selectedScedule.days}}</h3>
        <h3>{{selectedScedule.start_time}}</h3> 
        <h3>{{selectedScedule.end_time}}</h3> 
        <h3>{{selectedScedule.room_number}}</h3> 
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCourse: null,
      selectedScedule:null
    };
  },

  created() {
    this.selectedCourse = this.$store.getters['course/courses'].find((course) =>course.id===this.id);
    console.log(this.selectedCourse)
    const id=this.selectedCourse.schedule
      this.selectedScedule = this.$store.getters['schedule/schedules'].find((sc) =>parseInt(sc.id, 10)===id);

  },
};
</script>