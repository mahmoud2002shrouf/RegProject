<template>
  <section>
    <base-card>
      <h2>Add New schedule!</h2>
      <SchedulingForm @save-data="saveData"></SchedulingForm>
    </base-card>
    <allScheduling></allScheduling>
  </section>
</template>

<script>
import SchedulingForm from '../../components/scheduling/SchedulingForm.vue';
import allScheduling from './allScheduling.vue';

export default {
  
  components: {
    SchedulingForm,
    allScheduling,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('schedule/addSchedule', data);
    },
  },

};
</script>