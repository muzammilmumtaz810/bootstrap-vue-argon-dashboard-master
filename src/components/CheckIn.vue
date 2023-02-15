<template>
  <div class="d-flex">
    <!-- <p class="timer">Check-in: {{ checkin }}</p>
    <p class="timer">Check-out: {{ checkout }}</p> -->
    <!-- <p class="timer" v-if="checkin && checkout">
      Time worked: {{ totalHours }} : {{ totalMinutes }} :
      {{ totalSeconds }}
    </p> -->
    <p class="timer popup" v-if="showDiv">
      {{ hours }} : {{ minutes }} : {{ seconds }}
    </p>
    <button
      class="new btn base-button btn-primary btn-sm"
      @mouseover="showDiv = true"
      @mouseleave="showDiv = false"
      @click="toggleCheckInOut"
    >
      {{ buttonText }}
    </button>

    <p class="timer">
      {{ totalTimeInHours }} : {{ totalTimeInMinutes }} :
      {{ totalTimeInSeconds }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "check-in",

  data() {
    return {
      totalTime: 0,
      showDiv: false,
      checkedIn: false,
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
    toggleCheckInOut() {
      if (this.checkedIn) {
        this.endCheckout();
      } else {
        this.startCheckin();
      }
    },
    startCheckin() {
      this.checkedIn = true;
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
      this.checkedIn = false;
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
        this.checkedIn = true;
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
                this.totalTime = totalTime;
              }
            }
          }
          if (
            !currentItem.hasOwnProperty("checkout") &&
            currentItem.hasOwnProperty("checkin")
          ) {
            this.totalTime = this.totalTime + 1000;
          }
        }

        const totalTimeInSeconds = Math.round(this.totalTime / 1000);

        this.totalTimeInHours = Math.floor(totalTimeInSeconds / 3600);
        this.totalTimeInMinutes = Math.floor((totalTimeInSeconds % 3600) / 60);
        this.totalTimeInSeconds = totalTimeInSeconds % 60;
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    buttonText() {
      return this.checkedIn ? "CHECK OUT" : "CHECK IN";
    }
  },
  mounted() {
    let userInfo = localStorage.getItem("user info");
    let parsedUserInfo = JSON.parse(userInfo);
    let userID = parsedUserInfo.id;
    this.employe_id = userID;
    this.getObject();

    setInterval(() => {
      this.getTotalTime();
    }, 1000);
  }
};
</script>

<style scoped>
.timer {
  color: white;
  font-size: 30px;
  font-weight: 1000;
}

.popup {
  position: absolute;

  padding: 50px;
}

.new {
  width: 90px;
  height: 40px;
}
</style>
