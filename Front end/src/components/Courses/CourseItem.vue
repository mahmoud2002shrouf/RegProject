<template>
  <li>
    <h3>{{ name }}</h3>
    <h4>{{ course_code }}</h4>
 
    <div class="actions">
      <base-button mode="outline" link :to="myCource">Add</base-button>
      <base-button link :to="courceDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'course_code', 'name'],
  computed: {
  

    myCource() {
      return this.$route.path + '/' + '/MyCource'; 
    },
    courceDetailsLink() {
      return this.$route.path + '/' + this.id; 
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
.schedule{
  display: flex;
  flex-direction: row;
  justify-content: start;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>