<template>
  <v-row class="duration-picker" pa-2>
    <span class="label">{{label}}</span>
    <v-text-field label="00" hide-details flat solo type="number"></v-text-field>
    <span class="separator">:</span>
    <v-text-field label="00" hide-details flat solo type="number"></v-text-field>
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
.duration-picker {
  display: flex;
  flex-direction: row;
  padding: 10px 25px;
  .v-input {
    flex: 0.4;
    label {
      width: 100%;
    }
    input {
    }

    &:nth-child(2) {
      label,
      input {
        text-align: right;
      }
    }
    &:nth-child(4) {
      label,
      input {
        text-align: left;
      }
    }
  }
  .separator {
    font-size: 30px;
    text-align: center;
    padding: 0px 5px;
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