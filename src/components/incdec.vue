<template>
  <div class="incdec">
    <v-btn class="mx-2" small depressed color="default">
      <v-icon dark>mdi-minus</v-icon>
    </v-btn>
    <v-btn class="mx-2" small depressed color="default">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<style lang="scss">
  .incdec {
    padding-left: 10px;
    display: flex;
    button {
      margin-top: auto;
      margin-bottom: auto;
      max-width: 30px;
    }
  }
</style>