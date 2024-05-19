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
      <h3 class="title">My Course</h3>
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
            :my="true"
          ></CourseItem>
        </ul>
        <h3 v-else>No courses found.</h3>
      </base-card>
    </section>
    <base-card>
      <h1>Course schedule</h1>
      <table>
        <thead>
          <tr>
            <th>week days</th>
            <th>Courses</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in weekSchedule" :key="day.day">
            <td>{{ day.day }}</td>
            <td>
              <div v-if="day.schedule.length">
                <div
                  v-for="lecture in day.schedule"
                  :key="lecture.id"
                  class="lecture-card"
                >
                  <p>Course name: {{ lecture.name }}</p>
                  <p>
                    Time: {{ lecture.start_time }} - {{ lecture.end_time }}
                  </p>
                  <p>Room: {{ lecture.room_number }}</p>
                </div>
              </div>
              <div v-else>
                <p>-------</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </base-card>
  </div>
</template>

<script>
import CourseItem from '../../components/Courses/CourseItem.vue';
import BaseCard from '../../components/ui/BaseCard.vue';

export default {
  components: {
    CourseItem,
    BaseCard,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      weekSchedule: [
        { day: 'SAT', schedule: [] },
        { day: 'SUN', schedule: [] },
        { day: 'MON', schedule: [] },
        { day: 'TUE', schedule: [] },
        { day: 'WEN', schedule: [] },
        { day: 'THU', schedule: [] },
        { day: 'FRI', schedule: [] },
      ],
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
    async loadCourse() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('course/myCource');

        await this.$store.dispatch('schedule/fetchschedule');
        await this.$store.dispatch('course/myCource');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
      const schedule = this.$store.getters['schedule/schedules'];
      const courses = this.$store.getters['course/courses'];
      const studantschedule = [];
      const courceName = [];
      for (var cource in courses) {
        studantschedule.push(courses[cource].schedule);
        courceName.push(courses[cource].name);
      }
      const scedulee = schedule.filter((s) => studantschedule.includes(s.id));

      this.organizeSchedule(scedulee, courceName);
    },
    handleError() {
      this.error = null;
    },

    organizeSchedule(lectures, courceName) {
      console.log(lectures)
      const scedule=[]
              let i=0;

     lectures. forEach((le)=>{

        scedule.push({...le,name:courceName[i]})
        i++
      })

      console.log("this",scedule)

      scedule.forEach((lecture) => {
        //0

        const days = lecture.days.split('-');
        days.forEach((day) => {
          const daySchedule = this.weekSchedule.find((d) => d.day === day);
          if (daySchedule) {
            daySchedule.schedule.push({
              id: lecture.id,
              start_time: lecture.start_time,
              end_time: lecture.end_time,
              room_number: lecture.room_number,
              name:lecture.name
            });
          }
        });
      });
      console.log('weeeeeeeeee', this.weekSchedule);
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
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f2f2f2;
}
.lecture-card {
  border: 1px solid #ddd;
  padding: 8px;
  margin-bottom: 8px;
}
.title{
  margin-left: 50px;
}
hr{
  width: 400px;
  margin-left: 10px;

}

</style>