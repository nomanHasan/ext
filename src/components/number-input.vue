<template>
  <v-row class="number-input" pa-2>
    <span class="label">{{label}}</span>
    <v-text-field label="0" hide-details flat solo type="number"></v-text-field>
    <Incdec
    />
  </v-row>
</template>

<script>
import Incdec from '../components/incdec';

export default {
  components: {
    Incdec,
  },
  props: ["label"]
};
</script>

<style lang="scss">
.number-input {
  display: flex;
  flex-direction: row;
  padding: 10px 25px;
  .v-input {
    flex: 0.4;
    label {
      width: 100%;
    }
  }
  .label {
    flex: 0.8;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .indec {
    flex: 0.5;
  }
}
</style>