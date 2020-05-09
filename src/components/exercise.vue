<template>
  <v-col class="exercise">
    <div class="gxr-title">Exercise {{exercise.name}}</div>
    <v-text-field label="Name" outlined :value="exercise.name"></v-text-field>
    <v-text-field label="Desciption" outlined :value="exercise.description"></v-text-field>
    <v-row>
      <Duration
        label="Duration"
      />
      <Duration
        label="Recovery"
      />
      <NumberInput
        label="Repeat"
      />
    </v-row>
  </v-col>
</template>

<script>
import Duration from '../components/duration';
import NumberInput from '../components/number-input';

export default {
  components: {
    Duration,
    NumberInput,
  },
  props: ['exercise'],
}
</script>