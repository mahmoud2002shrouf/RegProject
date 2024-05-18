<template>
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <li>
    <h3>{{ name }}</h3>
    <h4>{{ course_code }}</h4>

    <div class="actions">
      <base-button
        mode="outline"
        link
        @click="addCourceForStudant"
        :to="myCource"

        v-show="(!isSuper && isauth)&&myCources"
        >Add</base-button
      >
      <base-button link :to="courceDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'course_code', 'name','my'],
  computed: {
    myCource() {
      if(this.error!==null){
      return '/' + 'MyCource';

      }else{
        return false
      }

    },
    courceDetailsLink() {
      return 'courses' + '/' + this.id;
    },


    isSuper() {
      // console.log('suuuuper', this.$store.getters.issuber);
      return this.$store.getters.issuber;
    },
    isauth() {
      // console.log('suuuuper', this.$store.getters.isAuthenticated);
      console.log('thats',this.isSuper && this.$store.getters.isAuthenticated)
      return this.$store.getters.isAuthenticated;
    },
    myCources(){
      if(this.my===true){
        return !this.my
      }else{
        return true
      }
    }
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
   async addCourceForStudant() {
      try {
       await this.$store.dispatch('course/addCourceForStudant', {
          student_id: localStorage.getItem('userId'),
          course_id: this.id,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
        console.log("eeeeeeeeeeeeeeeeeeee",this.error)
      }
    },
     
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}
.schedule {
  display: flex;
  flex-direction: row;
  justify-content: start;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>