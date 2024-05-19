export default {
  async registerCourses(context, data) {
    const userId = context.rootGetters.userId;
    const CourseData = {
      code: data.courceCode,
      name: data.name,
      description: data.description,
      instructor: data.instructorName,
      prerequisites: data.prerequisites, //ARRAY OF ID
      capacity: data.capacity,
      scheduleId: data.schedule, // ID
    };
    console.log(CourseData);
    const token = localStorage.getItem('token');

    const response = await fetch(`http://127.0.0.1:8000/api/course/add/`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(CourseData),
    });

    if (!response.ok) {
      //
    }

    context.commit('registerCourse', {
      ...CourseData,
      id: userId,
    });
  },
  async loadCourses(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const token = localStorage.getItem('token');
    // تحويل القيمة إلى بوليان
    const is_superusers = localStorage.getItem('is_superuser') === 'true';
    
    console.log("super", is_superusers, "  token", token);
    
    let response;
    
    // الآن is_superusers سيكون true فقط إذا كانت القيمة المخزنة هي 'true'
    if (is_superusers || token === null) {
      response = await fetch(`http://127.0.0.1:8000/api/course/all/`);
    }else{
      response = await fetch(
        `http://127.0.0.1:8000/api/student/eligible_courses/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      );
    }
    

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }
    console.log(responseData);

    const courses = [];

    for (const key in responseData) {
      // console.log(key)
      // console.log()
      const cource = {
        // ID
        id: responseData[key].id,
        courceCode: responseData[key].code,
        name: responseData[key].name,
        description: responseData[key].description,
        instructorName: responseData[key].instructor,
        prerequisites: responseData[key].prerequisites,
        capacity: responseData[key].capacity,
        schedule: responseData[key].scheduleId,
      };

      courses.push(cource);
    }

    context.commit('setCourse', courses);
    context.commit('setFetchTimestamp');
  },
  async search(context,payload) {
  
    
     const response = await fetch(
        `http://127.0.0.1:8000/api/search/?query=${payload.searchContent}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    
    

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }
    console.log(responseData);

    const courses = [];

    for (const key in responseData) {
      const cource = {
        // ID
        id: responseData[key].id,
        courceCode: responseData[key].code,
        name: responseData[key].name,
        description: responseData[key].description,
        instructorName: responseData[key].instructor,
        prerequisites: responseData[key].prerequisites,
        capacity: responseData[key].capacity,
        schedule: responseData[key].scheduleId,
      };

      courses.push(cource);
    }

    context.commit('setCourse', courses);
    context.commit('setFetchTimestamp');
  },
  async myCource(context) {
  const token=localStorage.getItem('token')
    
    const response = await fetch(
       `http://127.0.0.1:8000/api/student/courses/`,
       {
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Token ${token}`,

         },
       }
     );
   
   

   const responseData = await response.json();

   if (!response.ok) {
     const error = new Error(responseData.message || 'Failed to fetch!');
     throw error;
   }
   console.log(responseData);

   const courses = [];

   for (const key in responseData) {
     const cource = {
       // ID
       id: responseData[key].id,
       courceCode: responseData[key].code,
       name: responseData[key].name,
       description: responseData[key].description,
       instructorName: responseData[key].instructor,
       prerequisites: responseData[key].prerequisites,
       capacity: responseData[key].capacity,
       schedule: responseData[key].scheduleId,
     };

     courses.push(cource);
   }

   context.commit('setCourse', courses);
   context.commit('setFetchTimestamp');
 },
 async addCourceForStudant(context,payload){
  const token=localStorage.getItem('token');
  const response = await fetch(`http://127.0.0.1:8000/api/register_course/`,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(payload),
  })
  console.log(response)
  if (response.ok) {
    // this.$router.push('/MyCource')
  }
  if (!response.ok) {
    const error = new Error(response.message ||"maybe you have already registered for this course or there is a scheduling conflict");
    // console.log(Error)
    throw error;
  }

 },
 async getCourceByID(context,payload){
  const response=await fetch(`http://localhost:8000/api/course/${payload.courceID}`,{
    method:'GET',
  })
  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(responseData.message || 'Failed to fetch!');
    throw error;
  }
  console.log(responseData);

  const courses = [];

  for (const key in responseData) {
    const cource = {
      // ID
      id: responseData[key].id,
      courceCode: responseData[key].code,
      name: responseData[key].name,
      description: responseData[key].description,
      instructorName: responseData[key].instructor,
      prerequisites: responseData[key].prerequisites,
      capacity: responseData[key].capacity,
      schedule: responseData[key].scheduleId,
      registered_students:responseData.registered_students,
      total_registered_students:responseData.total_registered_students
    };

    courses.push(cource);
  }
  console.log(courses)

  context.commit('setCourse', courses);
  context.commit('setFetchTimestamp'); }
};
