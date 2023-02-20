<template>
  <div class="d-flex">
    <button
      class="new btn base-button btn-primary btn-sm"
      v-b-popover.hover.bottom
      :title="TimeFormate(runningTime)"
      @click="toggleCheckInOut"
    >
      {{ buttonText }}
    </button>
    <p class="timer">
      {{ TimeFormate(total_day_seconds + runningTime) }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "check-in",

  data() {
    return {
      total_day_seconds: 0,
      checkedIn: false,
      checkin: null,
      checkout: null,
      runningTime: 0,
      isRunningTimePaused: false,
      intervalId: null,
      employe_id: ""
    };
  },
  methods: {
    TimeFormate(second) {
      const hours = Math.floor(second / 3600);
      const remainingSecondsAfterHours = second % 3600;
      const minutes = Math.floor(remainingSecondsAfterHours / 60);
      const seconds = Math.floor(remainingSecondsAfterHours % 60);
      return `${hours
        .toString()
        .padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    },
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
          this.runningTime = Math.floor((currentTime - checkinTime) / 1000);
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

          const newdate = new Date();
          const checkinDate = new Date(currentItem.checkin);

          const checkoutDate = new Date(currentItem.checkout);

          if (newdate.getDate() === checkoutDate.getDate()) {
            const timeDifference =
              checkoutDate.getTime() - checkinDate.getTime();

            totalTime += timeDifference;
            this.total_day_seconds = Math.floor(totalTime / 1000);
          }
        }
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
    this.getTotalTime();
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

.new {
  width: 90px;
  height: 40px;
}
</style>
