<template>
  <form @submit.prevent="submitForm">
    <!-- code -->
    <div class="form-control" :class="{ invalid: !courceCode.isValid }">
      <label for="cource code">Cource Code</label>
      <input
        type="text"
        id="cource_code"
        v-model.trim="courceCode.val"
        @blur="clearValidity('courceCode')"
      />
      <p v-if="!courceCode.isValid">Cource code must not be empty.</p>
    </div>
    <!-- name -->
    <div class="form-control" :class="{ invalid: !name.isValid }">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model.trim="name.val"
        @blur="clearValidity('name')"
      />
      <p v-if="!name.isValid">name\ must not be empty.</p>
    </div>
    <!-- des -->

    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <!-- instructor_name -->
    <div class="form-control" :class="{ invalid: !instructorName.isValid }">
      <label for="instructor_name">Instructor Name</label>
      <input
        type="text"
        id="instructor_name"
        v-model.trim="instructorName.val"
        @blur="clearValidity('instructorName')"
      />
      <p v-if="!instructorName.isValid">instructor name must not be empty.</p>
    </div>
    <!-- cap -->
    <div class="form-control" :class="{ invalid: !capacity.isValid }">
      <label for="capacity">Capacity</label>
      <input
        type="number"
        id="capacity"
        v-model.number="capacity.val"
        @blur="clearValidity('capacity')"
      />
      <p v-if="!capacity.isValid">capacity must not be empty.</p>
    </div>
    <!-- Prerequisites -->
    <div class="form-control" :class="{ invalid: !prerequisites.isValid }">
      <label for="prerequisites">Prerequisites</label>
      <select
        id="prerequisites"
        multiple
        v-model="prerequisites.val"
        @blur="clearValidity('prerequisites')"
      >
        <option v-for="co in getAllCource" :key="co" :value="co.id">
          Name : {{ co.name }} - code : {{ co.courceCode }} 
        </option>

      </select>
      <label for="schedule">schedule</label>

      <select
        id="schedule"
        
        v-model="schedule.val"
        @blur="clearValidity('schedule')"
      >
        <option v-for="co in getAllscheduling" :key="co" :value="co.id">
          days : {{ co.days }}, Start time :{{co.start_time}},End Time :{{co.end_time}},Room number :{{co.room_number}},
        </option>

      </select>
      <p v-if="!prerequisites.isValid">
        Please select at least one prerequisite.
      </p>
    </div>

    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Add</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      courceCode: {
        val: '',
        isValid: true,
      },
      name: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      instructorName: {
        val: '',
        isValid: true,
      },
      prerequisites: {
        val: [],
        isValid: true,
      },
      schedule: {
        val: null,
        isValid: true,
      },
      capacity: {
        val: null,
        isValid: true,
      },

      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.courceCode.val === '') {
        this.courceCode.isValid = false;
        this.formIsValid = false;
        console.log('1')
      }
      if (this.name.val === '') {
        this.name.isValid = false;
        this.formIsValid = false;
        console.log('2')

      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
        console.log('3')

      }
      if (this.instructorName.val === '') {
        this.instructorName.isValid = false;
        this.formIsValid = false;
        console.log('4')

      }

      if (this.capacity.val <= 0) {
        this.capacity.isValid = false;
        this.formIsValid = false;
        console.log('5')

      }
      if (this.prerequisites.val.length < 0) {
        this.prerequisites.isValid = false;
        this.formIsValid = false;
        console.log('6')

      }
      if (this.schedule.val.length < 0) {
        this.schedule.isValid = false;
        this.formIsValid = false;
      }
    },
    async loadCourse(refresh = false) {
      try {
        await this.$store.dispatch('course/loadCourses', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    async loadScheduling() {
      try {
        await this.$store.dispatch('schedule/fetchschedule');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        courceCode: this.courceCode.val,
        name: this.name.val,
        description: this.description.val,
        instructorName: this.instructorName.val,
        prerequisites: this.prerequisites.val,
        capacity: this.capacity.val,
        schedule: this.schedule.val,
      };
      this.$emit('save-data', formData);
    },
  },
  created() {
    this.loadCourse();
    this.loadScheduling();
  },
  computed: {
    getAllCource() {
      const coaches = this.$store.getters['course/courses'];
      // console.log(coaches[0].schedule.day);
      return coaches;
    },
    getAllscheduling() {
      const coaches = this.$store.getters['schedule/schedules'];
      return coaches;
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}
select {
  display: block;
  width: 100%;
  padding: 0.8rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font: inherit;
}

select:focus {
  background-color: #f0e6fd;
  border-color: #3d008d;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>