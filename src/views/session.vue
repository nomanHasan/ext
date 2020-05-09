<template>
  <v-container class="fill-height session">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field 
          label="Name" 
          outlined 
          v-model="session.name"
        ></v-text-field>
        <v-text-field 
          label="Desciption" 
          outlined 
          v-model="session.description"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-for="exgroup of session.exercise_groups" :key="exgroup.id">
      <GroupComponent v-if="exgroup.type == 'group'" :group="exgroup"></GroupComponent>
      <ExerciseComponent v-if="exgroup.type == 'exercise'" :exercise="exgroup"></ExerciseComponent>
      <RestComponent v-if="exgroup.type == 'rest'" v-bind="exgroup"></RestComponent>
    </v-row>
  </v-container>
</template>

<script>
import { createSession, DEMO_SESSION_LIST } from "../models/sessions.model";
import GroupComponent from '../components/group';
import ExerciseComponent from '../components/exercise';
import RestComponent from '../components/rest';

export default {
  name: "Home",
  components: {
    GroupComponent,
    ExerciseComponent,
    RestComponent,
  },
  data: function() {
    return {
      session: createSession(DEMO_SESSION_LIST[1])
    };
  },
  methods: {
    onCreateSession: function() {}
    //MARK: Methods
  }
};
</script>


<style lang="scss">
  .gxr-title {
    margin: 0px 0px 10px 0px;
    background: var(--gxr-bc);
    color: white;
    text-align: center;
    font-size: 18px;
    padding: 5px;
    border-radius: 3px;
  }
  .group {
    --gxr-bc: var(--group-color);
  }
  .exercise {
    --gxr-bc: var(--exercise-color);
  }
  .rest {
    --gxr-bc: var(--rest-color);
  }

  .group,
  .exercise,
  .rest {
    margin: 5px 2px;
    border: 3px solid var(--gxr-bc);
    border-radius: 10px;
  }
</style>