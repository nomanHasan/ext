<template>
  <v-container class="fill-height timer" :class="timerClass">
    <audio ref="tick_sound" src="/alert00.mp3"></audio>
    <audio ref="start_sound" src="/alert01.mp3"></audio>

    <span class="ex-title txtov">{{currentExercise.name || 'Session : ' + selectedSession.name}}</span>
    <div class="clock">
      <div class="lap-panel-container">
        <div class="lap-panel">
          <transition name="slide-fade">
            <div
              class="current-exercise--lap"
              v-if="SessionFuncs.isValidExGroup(currentExercise) && currentExercise.lapCount[1] > 1"
            >
              <div class="value">Lap {{currentExercise.lapCount[0]}}/{{currentExercise.lapCount[1]}}</div>
            </div>
          </transition>
          <transition name="slide-fade">
            <div
              class="current-group--lap"
              v-if="SessionFuncs.isValidExGroup(currentGroup) && currentGroup.lapCount[1] > 1"
            >
              <div
                class="value"
                v-if="SessionFuncs.isValidExGroup(currentGroup) && currentGroup.lapCount[1] > 1"
              >Group {{currentGroup.lapCount[0]}}/{{currentGroup.lapCount[1]}}</div>
            </div>
          </transition>
        </div>
      </div>
      <div class="time">
        <v-progress-circular
          size="130"
          v-if="SessionFuncs.isValidExGroup(currentExercise)"
          :value="currentExercise.activeProgress[2]"
          rotate="270"
          width="7"
          color="blue lighten-1"
        ></v-progress-circular>
        <Minute :value="currentExerciseCountdown" />
      </div>
    </div>
    <div class="current-exercise" :class="cexClass">
      <transition name="up-fade">
        <div
          v-if="isWarmpupDone && isCountdownActive && nextExercise.id != currentExercise.id"
          class="next-exercise txtov"
        >Next Exercise - {{nextExercise.name}}</div>
      </transition>
      <template v-if="SessionFuncs.isValidExGroup(currentExercise)">
        <div class="exercise-name">
          {{currentExercise.name}}
          <span class="name-label">- Current Exericse</span>
        </div>
        <TimeProgress id="active" :progress="currentExercise.activeProgress" />
        <TimeProgress id="lap" :progress="currentExercise.lapProgress" />
        <TimeProgress id="total" :progress="currentExercise.totalProgress" />
      </template>
    </div>
    <div class="current-group" :class="cgrClass">
      <template v-if="SessionFuncs.isValidExGroup(currentGroup)">
        <div class="group-name">
          {{currentGroup.name}}
          <span class="name-label">- Current Group</span>
        </div>
        <TimeProgress id="active" :progress="currentGroup.activeProgress" />
        <TimeProgress id="lap" :progress="currentGroup.lapProgress" />
        <TimeProgress id="total" :progress="currentGroup.totalProgress" />
      </template>
    </div>
  </v-container>
</template>

<script>
import { createSession, SessionFuncs, isRest } from "../models/sessions.model";
import Minute from "../components/minute";
import TimeProgress from "../components/time-pg-bar";

export default {
  name: "Timer",
  components: {
    Minute,
    TimeProgress
  },
  data: function() {
    return {
      time: 0,
      getExGroup: SessionFuncs.getExGroupTimerGetter(this.selectedSession),
      exGroup: SessionFuncs.getExGroupTimerGetter(this.selectedSession)(0),
      clockInterval: null,
      warmupDuration: 5,
      warmpupCounter: 0,
      warmupInterval: null,
      SessionFuncs: SessionFuncs,

      countdownTime: 4
    };
  },
  mounted: function() {
    if (!this.$store.getters.selectedSession) {
      this.$router.back();
    }
    console.log(this.selectedSession);
    this.getExGroup = SessionFuncs.getExGroupTimerGetter(this.selectedSession);
    this.startWarmup();
  },
  destroyed: function() {
    this.stopTimer();
    this.stopWarmup();
  },
  computed: {
    selectedSession() {
      return this.$store.getters.selectedSession || createSession({});
    },
    timeLeft: function() {
      return SessionFuncs.getDurationObj(
        this.selectedSession.total_duration - this.time
      );
    },
    currentExercise() {
      return this.exGroup?.exercise_state || {};
    },
    currentGroup() {
      return this.exGroup?.group_state || {};
    },
    warmupLeft: function() {
      return this.warmupDuration - this.warmpupCounter;
    },
    currentExerciseCountdown() {
      return this.isWarmpupDone
        ? this.currentExercise?.active_time_left || -1
        : this.warmupLeft;
    },
    nextExercise() {
      return this.exGroup?.next_exercise || {};
    },
    timerClass: function() {
      // console.log(
      //   this.exGroup?.exercise_state?.lap_state,
      //   this.exGroup?.exercise_state?.lap_state == "recovery"
      // );
      return {
        a_rest:
          this.exGroup?.exercise_state?.lap_state == "recovery" ||
          this.exGroup?.group_state?.lap_state == "recovery" ||
          isRest(this.exGroup?.exercise_state),
        a_exercise:
          this.exGroup?.exercise_state?.lap_state == "exercise" &&
          !isRest(this.exGroup?.exercise_state)
      };
    },
    cgrClass: function() {
      return {
        hide: !SessionFuncs.isValidExGroup(this.currentGroup)
      };
    },
    cexClass: function() {
      return {
        hide: !SessionFuncs.isValidExGroup(this.currentExercise)
      };
    },
    isWarmpupDone: function() {
      return this.warmpupCounter >= this.warmupDuration;
    },
    isCountdownActive: function() {
      return (
        this.currentExerciseCountdown <= this.countdownTime &&
        this.currentExerciseCountdown > -1
      );
    }
  },
  methods: {
    startWarmup: function() {
      this.warmupInterval = setInterval(() => {
        this.tickWarmpup();
      }, 1000);
    },
    stopWarmup: function() {
      clearInterval(this.warmupInterval);
    },
    tickWarmpup: function() {
      this.warmpupCounter++;
      this.playTick();
      if (this.isWarmpupDone) {
        this.stopWarmup();
        this.startClock();
      }
    },
    startClock: function() {
      this.tickClock();
      this.clockInterval = setInterval(() => {
        this.tickClock();
      }, 1000);
    },
    playTick: function() {
      // console.log(this.currentExerciseCountdown, this.countdownTime, this.isCountdownActive);
      if (this.isCountdownActive) {
        if (this.currentExerciseCountdown == 1) {
          this.$refs["start_sound"].play();
        } else {
          this.$refs["tick_sound"].play();
        }
      }
    },
    tickClock: function() {
      this.time++;
      this.exGroup = this.getExGroup(this.time);

      this.playTick();

      if (!this.exGroup) {
        this.stopTimer();
      } else {
        // console.log(`
        // ${this.exGroup?.groupInfo}
        // ${this.exGroup?.exerciseInfo}
        // `);
      }

      // FREE
      if (this.time >= this.selectedSession.total_duration) {
        this.stopTimer();
      }
      // if (this.time >= 6) {
      //   this.stopTimer();
      // }
    },
    stopTimer: function() {
      clearInterval(this.clockInterval);
      this.$router.push({
        name: "home"
      });
    }
    //MARK: Methods
  }
};
</script>


<style lang="scss">
.timer {
  font-family: var(--font-3);

  width: 100vw;
  display: flex;
  flex-direction: column;

  padding: 0px;

  background: #fcffed;

  &.a_exercise {
    // background: var(--exercise-color-2);
  }
  &.a_rest {
    // background: var(--rest-color-2);
  }

  .ex-title {
    font-size: 36px;
    font-weight: 600;
  }

  .clock {
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .lap-panel-container {
      position: absolute;
      top: 54px;
      right: 10px;
    }
    .time {
      position: relative;

      .minute-view {
        font-size: 36px;
        width: 130px;
        display: flex;
        justify-content: center;
      }

      .v-progress-circular {
        width: 50px;
        height: 50px;
        position: absolute;
        top: -67%;
      }
    }

    .lap-panel {
      display: flex;
      flex-direction: column;
      text-align: center;

      .current-exercise--lap {
        font-size: 26px;
      }
    }
  }

  .current-exercise,
  .current-group {
    flex: 1;
    width: 100% - 5;
    min-height: 142px;
    padding: 10px;
    margin: 10px 0px;

    border-radius: 7px;

    --pg-color: #52bad4;

    transition: 200ms ease-out;

    opacity: 1;
    transform: translateX(0px);

    &.hide {
      opacity: 0;
      transform: translateX(-100px);
    }

    .name-label {
      // margin-left: 5px;
      font-size: 10px;
      font-style: italic;
    }
    .v-progress-linear {
      height: 10px !important;
      border-radius: 3px;
      .v-progress-linear__determinate {
        background-color: var(--pg-color) !important;
      }
    }

    .active {
      --pg-color: #52bad4;
    }
    .lap {
      --pg-color: #527fd4;
    }
    .total {
      --pg-color: #d4527d;
    }
  }

  .current-exercise {
    background: #f2ffed;
    box-shadow: 6px 6px 5px #e6f2e1, -6px -6px 5px #fefff9;

    .next-exercise {
      position: absolute;
      top: -42px;
      width: 100vw;
      text-align: center;
      left: 0px;
      color: rgb(47, 0, 255);

      font-size: 26px;
      font-weight: 600;
    }
  }

  .current-group {
    background: #fff5ed;
    box-shadow: 6px 6px 5px #f2e9e1, -6px -6px 5px #fffff9;
  }
}
</style>