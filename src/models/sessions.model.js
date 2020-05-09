
export const createSession = ({
  id = 1,
  name = 'Upper Body',
  description = 'Exercises of Arms, Shoulder, Chest',
  exercise_groups = [createGroup({})],
}) => {
  exercise_groups = exercise_groups.map(createExGroup);

  const total_duration = exercise_groups.reduce((accm, cur) => accm + cur.total_duration, 0);

  return {
    id,
    name,
    description,
    exercise_groups,
    total_duration,
  }
}
const getDurationObj = (duration = 1000) => {
  if (duration < 0) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }
  const minutes = Math.floor(duration / 60);
  const seconds = duration - (minutes * 60);
  return {
    minutes,
    seconds,
  }
}
const getExGroupTimerGetter = (session = createSession({})) => time => {
  let exercise = createExercise({});
  let group = createGroup({});
  let next_exercise = createExercise({});
  let next_exgroup = undefined;

  const { exercise_groups } = session;
  let current_exgroup;

  let group_state = getExeciseTimerState();
  let exercise_state = getExeciseTimerState();

  exercise_groups.reduce((accm, cur) => {

    if (time >= accm && time <= (accm + cur.total_duration) && !current_exgroup) {
      current_exgroup = cur;
      const current_time = time - accm;


      if (isGroup(current_exgroup)) {
        group = current_exgroup;
        const { lap_count, lap_duration } = group;
        group_state = getExeciseTimerState(group, current_time);

        const { exercises } = group;
        let group_cur_ex;

        [...Array(lap_count).keys()].map(lap => {


          exercises.reduce((accm, cur) => {
            if (current_time >= accm && current_time <= (accm + cur.total_duration) && !group_cur_ex) {
              group_cur_ex = cur;

              const ex_local_time = current_time - accm;

              exercise = group_cur_ex;
              exercise_state = getExeciseTimerState(exercise, ex_local_time);

            } else {
              if (group_cur_ex && !isValidExGroup(next_exercise)) {
                if (isValidExGroup(cur)) {
                  next_exercise = cur;
                  //console.log(next_exercise);
                }
              }
            }



            return accm + cur.total_duration;
          }, lap * lap_duration);


        })


      } else if (isExercise(current_exgroup) || isRest(current_exgroup)) {
        exercise = current_exgroup;

        exercise_state = getExeciseTimerState(exercise, current_time);
        // console.log("Log: ex_state", exercise_state)

      }
    } else {
      if (current_exgroup && !isValidExGroup(next_exercise)) {
        if (isExerciseOrRest(cur)) {
          next_exercise = cur;
        } else {
          next_exercise = cur.exercises?.[0];
        }
      }
    }



    return accm + cur.total_duration;
  }, 0);

  // console.log(current_exgroup);

  // if (exercise.id == 0) {
  //   return undefined;
  // }
  if (exercise.id == 0 && group.id == 0) {
    return undefined;
  }


  return {
    exercise,
    group,
    exercise_state,
    group_state,

    next_exercise,


    get groupInfo() {
      return 'Group:' + (group_state.id !== 0 ? `
      Name: ${group_state?.name}
      State: ${group_state?.lap_state}
      Lap:  ${group_state?.current_lap}/${group_state?.lap_count}
      Countdown: ${group_state?.active_time_left}

      ` : `None`);
    },
    get exerciseInfo() {
      return 'Exercise: ' + (exercise_state.id !== 0 ? `
      Name: ${exercise_state?.name}
      State:  ${exercise_state?.lap_state}
      Lap:  ${exercise_state?.current_lap}/${exercise_state?.lap_count}
      Countdown: ${exercise_state?.active_time_left}

      Active Progress: ${exercise_state?.active_time_total - exercise_state?.active_time_left}/${exercise_state?.active_time_total}
      Lap Progress: ${exercise_state?.lap_time}/${exercise_state?.lap_duration}
      Total Progress: ${exercise_state?.total_duration - exercise_state?.total_time_left}/${exercise_state?.total_duration}

      Next: ${next_exercise.id !== 0 ? next_exercise.name : 'None'}
      ` : `None`);
    },
  }
}



export const getExeciseTimerState = (exercise = createExercise({}), current_time = 0) => {
  const { lap_count, lap_duration, total_duration, duration, recovery } = exercise;
  const current_lap = Math.ceil(current_time / lap_duration);
  const total_time_left = total_duration - current_time;
  const lap_time_left = (Math.ceil(current_time / lap_duration) * lap_duration) - current_time;
  const lap_time = lap_duration - lap_time_left;
  const lap_state = lap_time > duration ? 'recovery' : 'exercise';

  const active_time_left = lap_time > duration ? lap_time_left : lap_time_left - recovery;
  const active_time_total = lap_time > duration ? recovery : duration;
  // const active_time_left = lap_time_left;

  return {
    ...exercise,
    current_lap,
    total_time_left,
    lap_time_left: lap_time_left + 1,
    lap_time,
    lap_state,
    active_time_left: active_time_left + 1,
    active_time_total,


    get lapCount() {
      return withPercent(current_lap, lap_count);
    },
    get activeProgress() {
      return withPercent(active_time_total - active_time_left, active_time_total);
    },
    get lapProgress() {
      return withPercent(lap_time, lap_duration);
    },
    get totalProgress() {
      return withPercent(total_duration - total_time_left, total_duration);
    },
  }
}

const withPercent = (value, max) => [value, max, (value / max) * 100];


export const createExGroup = (payload) => {
  const { type } = payload;
  if (type == 'group') {
    return createGroup(payload);
  } else if (type == 'exercise') {
    return createExercise(payload);
  } else if (type == 'rest') {
    return createRest(payload);
  }
}

export const isGroup = (payload = {}) => payload.type == 'group';
export const isExercise = (payload = {}) => payload.type == 'exercise';
export const isRest = (payload = {}) => payload.type == 'rest';
export const isExerciseOrRest = (payload = {}) => payload.type == 'exercise' || payload.type == 'rest';
export const isValidExGroup = ({ id = 0 } = {}) => id !== 0;

export const isExerciseActive = (lap_state) => lap_state == 'exercise';
export const isRecoveryActive = (lap_state) => lap_state == 'recovery';



export const SessionFuncs = {
  getDurationObj,
  getExGroupTimerGetter,
  isGroup,
  isExercise,
  isRest,
  isExerciseOrRest,
  isValidExGroup,

  isExerciseActive,
  isRecoveryActive,
}

export const createGroup = ({
  id = 0,
  name = 'GROUP',
  description = 'DESCRIPTION',
  recovery = 0,
  repeat = 0,
  exercises = [createExercise({})],
  type = 'group',
}) => {
  exercises = exercises.map(createExercise);
  const duration = exercises.reduce((accm, cur) => accm + cur.total_duration, 0);

  const lap_duration = duration + recovery;
  const lap_count = repeat + 1;

  const total_duration = lap_count * lap_duration;

  return {
    ...createExercise({
      id,
      name,
      description,
      recovery,
      repeat,
    }),
    exercises,
    duration,
    total_duration,
    lap_duration,
    lap_count,
    type
  }
}

export const createExercise = ({
  id = 0,
  name = 'EXERCISE',
  description = 'DESCRIPTION',
  duration = 0,
  recovery = 0,
  repeat = 0,
  type = 'exercise',
}) => {



  const lap_duration = duration + recovery;
  const lap_count = repeat + 1;
  const total_duration = lap_count * lap_duration;

  return {
    id,
    name,
    description,
    duration,
    recovery,
    repeat,
    type,
    total_duration,

    lap_duration,
    lap_count,
  }
}

export const REST_ID = Number.MAX_SAFE_INTEGER;
export const createRest = ({ duration = 10 }) => {
  return {
    ...createExercise({
      id: REST_ID,
      name: 'Rest',
      description: 'Rest',
      duration,
      recovery: 0,
      repeat: 0,
      type: 'rest',
    }),
  }
}


export const DEMO_SESSION_LIST = [
  createSession({
    id: 1,
    name: 'HIIT 10',
    description: 'HIIT Exercise for Full Body with 4 Exercise',
    exercise_groups: [
      createGroup({
        id: 1,
        name: 'Full Body',
        description: 'These exercises cover Full Body',
        recovery: 180,
        repeat: 3,
        exercises: [
          createExercise({
            id: 1,
            name: 'Mountain Climbing',
            duration: 60,
            recovery: 10,
          }),
          createExercise({
            id: 2,
            name: 'Lateral Hops',
            duration: 60,
            recovery: 10,
            repeat: 0,
          }),
          createExercise({
            id: 3,
            name: 'Side through Push ups',
            duration: 60,
            recovery: 10,
            repeat: 0,
          }),
          createExercise({
            id: 4,
            name: 'Lateral Hops',
            duration: 60,
            recovery: 10,
            repeat: 0,
          }),
          createExercise({
            id: 4,
            name: 'Pushup Burpee',
            duration: 60,
            recovery: 10,
            repeat: 0,
          }),
        ],
      }),
    ]
  }),
  createSession({
    id: 2,
    name: 'HIIT 15',
    description: 'HIIT Exercise for 15 for Intermediate Level. 7:30 for Beginner',
    exercise_groups: [
      createGroup({
        id: 1,
        name: 'Full Body',
        description: 'These exercises cover Full Body',
        recovery: 30,
        repeat: 0,
        exercises: [
          createExercise({
            id: 1,
            name: 'Split Squat Lateral Hop',
            duration: 25,
            recovery: 5,
          }),
          createExercise({
            id: 2,
            name: 'Rachet Squat',
            duration: 25,
            recovery: 5,
            repeat: 0,
          }),
          createExercise({
            id: 3,
            name: 'Prisoner Walk Ups',
            duration: 25,
            recovery: 5,
            repeat: 0,
          }),
          createExercise({
            id: 4,
            name: 'Sidewinders',
            duration: 25,
            recovery: 5,
            repeat: 0,
          }),
          createRest({ duration: 30 }),
          createExercise({
            id: 1,
            name: 'Hover Hops',
            duration: 25,
            recovery: 5,
          }),
          createExercise({
            id: 2,
            name: 'Step Through Push ups',
            duration: 25,
            recovery: 5,
            repeat: 0,
          }),
          createExercise({
            id: 3,
            name: 'Pushup toe touch',
            duration: 25,
            recovery: 5,
            repeat: 0,
          }),
          createExercise({
            id: 4,
            name: 'Hover pulse',
            duration: 25,
            recovery: 5,
            repeat: 0,
          }),
          createRest({ duration: 30 }),
          createExercise({
            id: 1,
            name: 'Twisting Piston',
            duration: 25,
            recovery: 5,
          }),
          createExercise({
            id: 2,
            name: 'Black widow knee slide',
            duration: 25,
            recovery: 5,
            repeat: 0,
          }),
          createExercise({
            id: 3,
            name: 'Lateral Mountain climbing',
            duration: 25,
            recovery: 5,
            repeat: 0,
          }),
          createExercise({
            id: 4,
            name: 'V Sit ups',
            duration: 25,
            recovery: 5,
            repeat: 0,
          }),
        ],
      }),
    ]
  }),
  createSession({
    id: 3,
    name: 'Quick HIIT',
    description: 'Extreme Quick HIIT Exercise',
    exercise_groups: [
      createExercise({
        id: 123,
        name: 'Push up',
        description: 'hard push up',
        duration: 2,
        recovery: 1,
        repeat: 0,
      }),
      createGroup({
        id: 1,
        name: 'UpBod',
        description: 'Upper Body',
        repeat: 2,
        recovery: 3,
        exercises: [
          createExercise({
            id: 1,
            name: 'BicCurl',
            description: 'Dumbell Bicep Curl',
            duration: 5,
            repeat: 1,
            recovery: 0
          }),
        ]
      }),
      createRest({ duration: 3 }),
      createGroup({
        id: 1,
        name: 'LowBod',
        description: 'Upper Body',
        repeat: 0,
        recovery: 2,
        exercises: [
          createExercise({
            id: 1,
            name: 'TricCurl',
            description: 'Dumbell Tricep Curl',
            duration: 3,
            repeat: 0,
            recovery: 0
          }),
          createRest({ duration: 3 }),
          createExercise({
            id: 1,
            name: 'DumbSquat',
            description: 'Squat with dumbells in hand',
            duration: 3,
            repeat: 0,
            recovery: 1
          }),
          createRest({ duration: 2 })
        ]
      }),
    ]
  })
]

console.log(DEMO_SESSION_LIST);
console.log(DEMO_SESSION_LIST.map(e => SessionFuncs.getDurationObj(e.total_duration)));