<template>
  <v-col class="rest">
    <div class="gxr-title">Rest</div>
    <v-row>
      <Duration
        label="Duration"
      />
    </v-row>
  </v-col>
</template>

<script>
import Duration from '../components/duration';
export default {
  props: ['rest'],
  components: {
    Duration,
  }
}
</script>