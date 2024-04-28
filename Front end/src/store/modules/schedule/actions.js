export default {
  async addSchedule(context, payload) {
    const newSchedule= {
      days: payload.day,
      startTime: payload.startTime,
      endTime: payload.endTime,
      roomNo: payload.roomNumber,

    };
    const response = await fetch(
      `http://127.0.0.1:8000/api/course_schedule/add/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSchedule)
      }
    );
    

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }


    context.commit('addSchedule', newSchedule);
  },

  async fetchschedule(context) {
    
    const response = await fetch(
      `http://127.0.0.1:8000/api/course_schedule/all/`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch schedule.'
      );
      throw error;
    }

    const schedules = [];
    console.log(responseData)
  
    for (const key in responseData) {
      const schedule = {
        id: key,
        days: responseData[key].days,
        start_time: responseData[key].startTime,
        end_time: responseData[key].endTime,
        room_number: responseData[key].roomNo,
      };
      schedules.push(schedule);
    }
    console.log(schedules);

    context.commit('fetchschedule', schedules);
  }
};
