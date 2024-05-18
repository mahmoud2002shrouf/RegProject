<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !day.isValid }">
      <label for="day">Day</label>
      <input
        type="text"
        id="day"
        v-model.trim="day.val"
        @blur="clearValidity('day')"
      />
      <p v-if="!day.isValid">Day must not be empty.</p>
    </div>
    <div class="form">
      <div class="form-time" :class="{ invalid: !startTime.isValid }">
        <label for="datetime">Start Time</label>
        <input
          type="time"
          id="startTime"
          v-model="startTime.val"
          @blur="clearValidity('startTime')"
        />
        <p v-if="!startTime.isValid">Start time must not be empty.</p>
      </div>
      <div class="form-time" :class="{ invalid: !endTime.isValid }">
        <label for="endTime">End Time</label>
        <input
          type="time"
          id="endTime"
          v-model="endTime.val"
          @blur="clearValidity('endTime')"
        />
        <p v-if="!endTime.isValid">End time must not be empty.</p>
      </div>
    </div>
    <div class="form-control" :class="{ invalid: !roomNumber.isValid }">
      <label for="roomNumber">Room Number</label>
      <input
        type="text"
        id="roomNumber"
        v-model.trim="roomNumber.val"
        @blur="clearValidity('roomNumber')"
      />
      <p v-if="!roomNumber.isValid">Room number must not be empty.</p>
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
      day: {
        val: '',
        isValid: true,
      },
      startTime: {
        val: '',
        isValid: true,
      },
      endTime: {
        val: '',
        isValid: true,
      },
      roomNumber: {
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
      if (this.day.val === '') {
        this.day.isValid = false;
        this.formIsValid = false;
      }
      if (this.startTime.val === '') {
        this.startTime.isValid = false;
        this.formIsValid = false;
      }
      if (this.endTime.val === '') {
        this.endTime.isValid = false;
        this.formIsValid = false;
      }
      if (!this.roomNumber.val === '') {
        this.roomNumber.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        day: this.day.val,
        startTime: this.startTime.val,
        endTime: this.endTime.val,
        roomNumber: this.roomNumber.val,
      };
      this.$emit('save-data', formData);
      this.day.val = ' ';
      this.startTime.val = ' ';
      this.endTime.val = ' ';
      this.roomNumber.val = ' ';

   
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
  text-align: center;
}
.form {
  display: flex;
  justify-content: start;
  flex-direction: row;
  gap: 10px;
}
.form-time {
  width: 50%;
  font: inherit;
}
.form input {
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