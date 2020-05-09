<template>
  <div class="minute-view">
    <div class="minute">{{minutes}}</div>
    <div class="separator">:</div>
    <div class="second">{{seconds}}</div>
  </div>
</template>

<script>
import { SessionFuncs } from "../models/sessions.model";
export default {
  props: ["value"],
  computed: {
    durationObj() {
      // console.log(SessionFuncs.getDurationObj(this.value));
      return SessionFuncs.getDurationObj(this.value);
    },
    minutes() {
      return dual(this.durationObj.minutes + "");
    },
    seconds() {
      return dual(this.durationObj.seconds + "");
    }
  }
};

const dual = value => {
  if (value.length == 1) {
    return `0${value}`;
  } else if (value.length == 0) {
    return `00`;
  } else {
    return value;
  }
};
</script>

<style lang="scss">
  .minute-view {
    display: flex;
  }
</style>