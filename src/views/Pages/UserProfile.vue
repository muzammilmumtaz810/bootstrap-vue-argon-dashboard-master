<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;"
    >
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="align-items-center">
          <b-row>
            <b-col lg="7" md="10">
              <div>
                <p class="timer">Check-in: {{ checkin }}</p>
                <p class="timer">Check-out: {{ checkout }}</p>
                <p class="timer" v-if="checkin && checkout">
                  Time worked: {{ totalHours }} : {{ totalMinutes }} :
                  {{ totalSeconds }}
                </p>
                <p class="timer">{{ hours }} : {{ minutes }} : {{ seconds }}</p>
                <button
                  class="btn btn-info"
                  @click="startCheckin"
                  :disabled="checkin || !canCheckin"
                >
                  Check-in
                </button>
                <button
                  class="btn btn-info"
                  @click="endCheckout"
                  :disabled="!checkin || checkout"
                >
                  Check-out
                </button>
                <button
                  class="btn btn-info"
                  @click="
                    showdaytime = true;
                    getTotalTime();
                  "
                >
                  DAYWORK
                </button>
                <p class="timer" v-if="showdaytime">
                  Today worked : {{ totalTimeInHours }} :
                  {{ totalTimeInMinutes }} : {{ totalTimeInSeconds }}
                </p>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Hello {{ name }}</h1>
              <p class="text-white mt-0 mb-5">
                This is your profile page. You can Edit update your
              </p>
              <a href="#!" class="btn btn-info">Edit profile</a>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col xl="4" class="order-xl-2 mb-5">
          <!-- <user-card></user-card> -->
        </b-col>
        <b-col xl="8" class="order-xl-1">
          <edit-profile-form></edit-profile-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import UserCard from "./UserProfile/UserCard.vue";

export default {
  components: {
    EditProfileForm,
    UserCard
  },
  data() {
    return {
      totalTimeInHours: 0,
      totalTimeInMinutes: 0,
      totalTimeInSeconds: 0,
      showdaytime: false,
      checkin: null,
      checkout: null,
      runningTime: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalTime: null,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      isRunningTimePaused: false,
      intervalId: null,
      stoppedTime: 0,
      employe_id: ""
    };
  },
  methods: {
    loadtime() {},

    startCheckin() {
      this.checkin = new Date().toLocaleString();
      this.intervalId = setInterval(() => {
        if (!this.isRunningTimePaused) {
          let checkinTime = new Date(this.checkin).getTime();
          let currentTime = new Date().getTime();
          this.runningTime = (currentTime - checkinTime) / 1000;
          this.hours = Math.floor(this.runningTime / 3600);
          this.minutes = Math.floor((this.runningTime % 3600) / 60);
          this.seconds = Math.floor(this.runningTime % 60);
        }
      }, 1000);
      axios.post("http://localhost:3000/employetime", {
        checkin: this.checkin,
        employe_id: this.employe_id
      });
    },
    endCheckout() {
      clearInterval(this.intervalId);
      this.checkout = new Date().toLocaleString();
      this.totalTime =
        (new Date(this.checkout).getTime() - new Date(this.checkin).getTime()) /
          1000 -
        this.stoppedTime;
      this.totalHours = Math.floor(this.totalTime / 3600);
      this.totalMinutes = Math.floor((this.totalTime % 3600) / 60);
      this.totalSeconds = Math.floor(this.totalTime % 60);

      this.timesend();
    },

    async timesend() {
      let result = await axios.get("http://localhost:3000/employetime");
      const updatedObject = result.data.find(
        item =>
          item.employe_id === this.employe_id &&
          !item.hasOwnProperty("checkout")
      );
      if (updatedObject) {
        updatedObject.checkout = this.checkout;
        updatedObject.totalwork = this.totalTime;

        await axios.put(
          `http://localhost:3000/employetime/${updatedObject.id}`,
          updatedObject
        );
      }
    },

    async getObject() {
      const employe_id = this.employe_id;

      let result = await axios.get("http://localhost:3000/employetime");
      const filterdata = result.data.filter(item => {
        if (!item.hasOwnProperty("checkout")) {
          return item.employe_id == employe_id;
        }
        return false;
      });

      if (filterdata.length > 0) {
        this.checkin = filterdata[0].checkin;

        this.intervalId = setInterval(() => {
          if (!this.isRunningTimePaused) {
            let currentTime = new Date().getTime();
            let checkintime = new Date(this.checkin).getTime();
            this.runningTime = (currentTime - checkintime) / 1000;
            this.hours = Math.floor(this.runningTime / 3600);
            this.minutes = Math.floor((this.runningTime % 3600) / 60);
            this.seconds = Math.floor(this.runningTime % 60);
          }
        }, 1000);
      }
    },
    async getTotalTime() {
      try {
        const result = await axios.get("http://localhost:3000/employetime");
        const filteredData = result.data.filter(
          item => item.employe_id === this.employe_id
        );

        let totalTime = 0;

        for (let i = 0; i < filteredData.length; i++) {
          const currentItem = filteredData[i];

          if (currentItem.hasOwnProperty("checkin")) {
            let checkout = filteredData.every(currentItem =>
              currentItem.hasOwnProperty("checkout")
            );

            if (checkout) {
              const newdate = new Date();
              const checkinDate = new Date(currentItem.checkin);

              const checkoutDate = new Date(currentItem.checkout);

              if (newdate.getDate() === checkoutDate.getDate()) {
                const timeDifference =
                  checkoutDate.getTime() - checkinDate.getTime();

                totalTime += timeDifference;
              }
            }
          }
        }

        const totalTimeInSeconds = Math.round(totalTime / 1000);
        this.totalTimeInHours = Math.floor(totalTimeInSeconds / 3600);
        this.totalTimeInMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);
        this.totalTimeInSeconds = totalTimeInSeconds % 60;
      } catch (error) {
        console.error(error);
      }
    }
  },

  computed: {
    canCheckin() {
      if (!this.checkin) {
        return true;
      }

      let checkinTime = new Date(this.checkin);
      let currentTime = new Date();

      if (currentTime.getDate() > checkinTime.getDate()) {
        return true;
      }

      if (currentTime.getHours() >= 12) {
        return true;
      }

      return false;
    }
  },

  async mounted() {
    let userInfo = localStorage.getItem("user info");
    let parsedUserInfo = JSON.parse(userInfo);
    let userID = parsedUserInfo.id;
    this.employe_id = userID;

    this.getObject();
  }
};
</script>

<style scoped>
.timer {
  color: white;
  font-size: 30px;
  font-weight: 1000;
}
</style>
