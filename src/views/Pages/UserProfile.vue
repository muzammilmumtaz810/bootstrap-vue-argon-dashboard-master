<template>
<div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header" style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
        <b-container fluid>
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <b-container fluid class="align-items-center">

                <b-col >

                    <button class="btn btn-info" @click="toggleTimer">{{ timerRunning ? 'CHECK-OUT' : 'CHECK-IN' }}</button>
                   <div class="timer">{{ formattedTimer }}</div> 
                    

                </b-col>

                <b-row>

                    <b-col lg="7" md="10">
                        <h1 class="display-2 text-white">Hello {{ name }} <span>you are checked out....</span> </h1>
                        <p class="text-white mt-0 mb-5">This is your profile page. You can Edit update your</p>
                        <a href="#!" class="btn btn-info">Edit profile</a>
                    </b-col>
                </b-row>

            </b-container>
        </b-container>
    </div>

    <b-container fluid class="mt--6">
        <b-row>
            <b-col xl="4" class="order-xl-2 mb-5">
                <user-card></user-card>
            </b-col>
            <b-col xl="8" class="order-xl-1">
                <edit-profile-form></edit-profile-form>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import EditProfileForm from './UserProfile/EditProfileForm.vue';
import UserCard from './UserProfile/UserCard.vue';

export default {
    components: {
        EditProfileForm,
        UserCard
    },
    data() {
        return {
      timerRunning: false,
      interval: null,
      startTime: 0,
      elapsedTime: 0,
      formattedTimer: ''

        }
    },
    methods: {
        async loaddata() {
            let user = localStorage.getItem("user info");
            this.name = JSON.parse(user).name
        },

        toggleTimer() {
      if (this.timerRunning) {
        clearInterval(this.interval);
      } else {
        this.startTime = Date.now();
        this.interval = setInterval(() => {
          this.elapsedTime = (Date.now() - this.startTime) / 1000;
          this.formattedTimer = new Date(this.elapsedTime * 1000)
            .toISOString()
            .substr(14, 8);
        }, 100);
      }
      this.timerRunning = !this.timerRunning;
    }
    },
    mounted() {
        this.loaddata()
    }

};
</script>

<style scoped>
.timer{
  color:white;
  font-size: 30px;
  font-weight: 1000;
  margin-right: 20px;
}
</style>
