<template>
  <base-card>
    <h1>All Scheduling</h1>

    <ul >
          <ScheduleItem
            v-for="sc in schedule"
            :key="sc.id"
            :day="sc.days"
            :room="sc.room_number || sc.roomNo"
            :start="sc.start_time ||sc.startTime"
            :end="sc.end_time ||sc.endTime"
          
          ></ScheduleItem>
        </ul>
  </base-card>
</template>
<script>
import ScheduleItem from './ScheduleItem.vue';
export default {
  components: {
    ScheduleItem,
  },
  computed:{
    schedule(){
      const schedule = this.$store.getters['schedule/schedules'];
      return schedule;

    }
  },
 
  methods:{
    getScheduling(){
       this.$store.dispatch('schedule/fetchschedule');

    }
  },
  created(){
    this.getScheduling();
  }
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>