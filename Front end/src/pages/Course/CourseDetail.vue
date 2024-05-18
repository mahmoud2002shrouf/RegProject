<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <div>
      <section>
        <base-card v-if="selectedCourse">
          <h3><u>course details</u></h3>
          <div>
            <p><label>Course Name : </label>{{ selectedCourse.name }}</p>
            <p>
              <label for="">Course Code :</label>{{ selectedCourse.courceCode }}
            </p>
            <p>
              <label for="">Course instructor :</label
              >{{ selectedCourse.instructorName }}
            </p>
            <p>
              <label for="">Course description :</label
              >{{ selectedCourse.description }}
            </p>
            <div v-if="selectedCourse.prerequisites.length !== 0">
              <p><label>prerequisites :</label></p>
              <ul>
                <router-link
                  v-for="prerequisite in selectedCourse.prerequisites"
                  :key="prerequisite"
                  :to="`/courses/${prerequisite.id}`"
                >
                  <li>
                    {{ prerequisite.name }}
                  </li>
                </router-link>
              </ul>
            </div>
          </div>
        </base-card>
        <base-card v-else>
          <p>There is no information about this course</p>
        </base-card>
      </section>

      <section v-if="selectedScedule">
        <base-card>
          <h3><u>course schedule</u></h3>

          <div>
            <p><label>Days :</label>{{ selectedScedule.days }}</p>
            <p>
              <label>Course Time :</label>{{ selectedScedule.start_time }} -
              {{ selectedScedule.end_time }}
            </p>
            <p><label>Room Number :</label>{{ selectedScedule.room_number }}</p>
            <p>
              <label>Number of registered students :</label
              >{{ selectedCourse.total_registered_students }}/{{
                selectedCourse.capacity
              }}
            </p>
          </div>
        </base-card>
      </section>
      <base-card v-show="!isSuper && isauth">
        <div class="button">
          <base-button mode="outline" link :to="'/courses'">Cancel</base-button>
          <base-button
            link
            @click="addCourceForStudant"
            :to="myCource"
            v-show="!isSuper && isauth"
            >Add</base-button
          >
        </div>
      </base-card>
      <base-card v-show="isSuper && isauth">
        <div
          class="table-container"
          v-if="selectedCourse.registered_students.length > 0">
          <h3><u>registered students</u></h3>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="student in selectedCourse.registered_students"
                :key="student.id"
              >
                <td>{{ student.id }}</td>
                <td>{{ student.username }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>no registered students</p>
        </div>
      </base-card>
    </div>
  </div>
</template>

<script>
import BaseCard from '../../components/ui/BaseCard.vue';
export default {
  components: { BaseCard },
  props: ['id'],
  data() {
    return {
      selectedCourse: null,
      selectedScedule: null,
      error: null,
    };
  },
  computed: {
    isSuper() {
      // console.log('suuuuper', this.$store.getters.issuber);
      return this.$store.getters.issuber;
    },
    isauth() {
      // console.log('suuuuper', this.$store.getters.isAuthenticated);
      console.log('thats', this.isSuper && this.$store.getters.isAuthenticated);
      return this.$store.getters.isAuthenticated;
    },
    myCource() {
      if (this.error !== null) {
        return '/' + 'MyCource';
      } else {
        return false;
      }
    },
  },
  watch: {
    id: 'getCourseData',
  },
  created() {
    this.getCourseData();
  },
  methods: {
    async loadCourse() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('schedule/fetchschedule');
        await this.$store.dispatch('course/getCourceByID', {
          courceID: this.id,
        });
      } catch (error) {
        //
      }
      return true;
    },

    async getCourseData() {
      const res = await this.loadCourse();
      if (res) {
        console.log('this...', this.$store.getters['schedule/schedules']);
        console.log('this...', this.$store.getters['course/courses']);

        console.log('Searching for course with ID:', this.id);
        this.selectedCourse = this.$store.getters['course/courses'].find(
          (course) => parseInt(course.id, 10) === parseInt(this.id, 10)
        );

        if (this.selectedCourse) {
          console.log('Course found:', this.selectedCourse);
          // البحث عن الجدول الزمني إذا كان الكورس موجودًا
          const id = this.selectedCourse.schedule;
          this.selectedScedule = this.$store.getters['schedule/schedules'].find(
            (sc) => parseInt(sc.id, 10) === parseInt(id, 10)
          );

          console.log('Schedule found:', this.selectedScedule);
        } else {
          console.log('Course not found with ID:', this.id);
          // إعادة تعيين القيم إلى null إذا لم يتم العثور على الكورس
          this.selectedCourse = null;
          this.selectedScedule = null;
        }
      }
    },
    async addCourceForStudant() {
      try {
        await this.$store.dispatch('course/addCourceForStudant', {
          student_id: localStorage.getItem('userId'),
          course_id: this.id,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
        console.log('eeeeeeeeeeeeeeeeeeee', this.error);
      }
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
div > p {
  padding: 10px;
}
label {
  font-size: 15px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 10px 10px 10px 0px;
}
.button {
  display: flex;
  justify-content: center;
}
.table-container {
  margin: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th,
td {
  border: 1px solid #dee2e6;
  padding: 12px 15px;
  text-align: left;
  font-family: 'Arial', sans-serif;
}

th {
  background-color: #007bff;
  color: white;
  font-size: 16px;
}

tbody tr:hover {
  background-color: #e9ecef;
}
</style>






