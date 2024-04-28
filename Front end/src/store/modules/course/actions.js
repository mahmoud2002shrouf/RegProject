
export default {
  async registerCourses(context, data) {
    const userId = context.rootGetters.userId;
    const CourseData = {
      code: data.courceCode,
      name: data.name,
      description: data.description,
      instructor: data.instructorName,
      prerequisites: data.prerequisites,//ARRAY OF ID
      capacity: data.capacity,
      scheduleId: data.schedule// ID
    };
    console.log(CourseData);


    const response = await fetch(
      `http://127.0.0.1:8000/api/course/add/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(CourseData)
      }
    );

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

    const response = await fetch(
      `http://127.0.0.1:8000/api/course/all/`
    );
    const responseData = await response.json();


    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }
    console.log(responseData)

    const courses = [];

    for (const key in responseData) {
      const cource = {
      // ID
        id: key,
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
};
