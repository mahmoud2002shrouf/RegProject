<template>
  <li>
    <h3>{{day}}</h3>
    <h4>Room Number : {{room}}</h4>
    <div>
      <h5>Start Time : <time>{{start}}</time></h5>
      <h5>End Time : <time>{{end}}</time></h5>
    </div>
  </li>
</template>
<script>
export default {
  props:['day','room','start','end']
}
</script>
<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 0.5rem;
  list-style: none;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4,h5 {
  margin: 0.2rem 0;
}

div {
  margin: 0.2rem 0;
   display: flex;
  justify-content: start;
  gap: 10px;
}


</style>