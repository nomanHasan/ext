<template>
  <v-container class="fill-height home" fluid justify="start" @click="onHomeClick">
    <v-row>
      <v-col cols="12">
        <v-list flat>
          <v-list-item v-for="item in items" :key="item.key" @click="onSelectSession(item)">
            <v-list-item-action>
              <v-checkbox :input-value="item.id == selectedSessionId" color="primary" @click="onSelectSession(item)"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> {{item.name}} </v-list-item-title>
              <v-list-item-subtitle>{{item.description}}</v-list-item-subtitle>
            </v-list-item-content>
            <!-- <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>-->
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn
          x-large
          color="deep-purple accent-4"
          style="color: white; font-size: 24px; height: 70px; width: 140px"
          @click="onStartClick"
        >Start</v-btn>
      </v-col>
    </v-row>
    <v-row></v-row>
    <v-row>
      <v-col align="center">
        <v-btn x-medium color="deep-purple accent-4" outlined @click="onCreateSession">
          <v-icon dark>mdi-plus</v-icon>Create Session
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DEMO_SESSION_LIST } from "../models/sessions.model";
import { SELECT_SESSION } from '../store/index';
import { openFullscreen } from '../models';

// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data: function() {
    return {
      
    };
  },
  computed: {
    items: function() {
      return this.$store.getters.sessions;
    },
    selectedSessionId: function() {
      return this.$store.getters.selectedSessionId;
    },
  },
  methods: {
    onCreateSession: function() {
      this.$router.push({
        name: "session"
      });
    },
    onSelectSession: function(item) {
      if (this.selectedSessionId != item.id) {
        this.$store.dispatch(SELECT_SESSION, item.id);
      } else {
        this.$store.dispatch(SELECT_SESSION, null);
      }
    },
    onStartClick: function() {
      if (this.selectedSessionId) {
        this.$router.push({
          name: 'timer'
        });
      }
    },
    onHomeClick: function() {
      openFullscreen();
    }
    //MARK: Methods
  }
};
</script>
