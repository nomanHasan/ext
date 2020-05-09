<template functional>
  <div class="progress-bar" :class="props.id" v-if="props.progress">
    <v-progress-linear :value="props.progress[2]"></v-progress-linear>
    <div class="value">
      <Minute :value="props.progress[0]" />/
      <Minute :value="props.progress[1]" />
    </div>
  </div>
</template>

<style lang="scss">
  .progress-bar {
    display: flex;
    padding: 3px 0px;
    margin: 2px 0px;
    .v-progress-linear {
      margin-top: auto;
      margin-bottom: auto;
    }
    .value {
      display: flex;
      padding: 0px 0px 0px 15px;
    }
  }
</style>