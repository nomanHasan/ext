<template>
  <v-col class="group">
    <div class="gxr-title">Group {{group.name}}</div>
    <v-text-field label="Name" outlined v-model="group.name"></v-text-field>
    <v-text-field label="Desciption" outlined v-model="group.description"></v-text-field>
    <v-row>
      <!-- <Duration label="Duration" /> -->
      <Duration label="Recovery" />
      <NumberInput label="Repeat" />
    </v-row>
    <v-row v-for="exercise of group.exercises" :key="exercise.id">
      <ExerciseComponent v-if="exercise.type == 'exercise'" :exercise="exercise"></ExerciseComponent>
      <RestComponent v-if="exercise.type == 'rest'" v-bind="exercise"></RestComponent>
    </v-row>
  </v-col>
</template>

<script>
import Duration from "./duration";
import NumberInput from "./number-input";
import ExerciseComponent from "./exercise";
import RestComponent from "./rest";

export default {
  components: {
    Duration,
    NumberInput,
    ExerciseComponent,
    RestComponent
  },
  props: ["group"]
};
</script>