<template>
  <div>
    <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card
            title="Total traffic"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body class="border-0">
            <div id="map-custom" class="map-canvas" style="height: 600px;">
              <b-form>
                <b-row align-v="center">
                  <b-col>
                    <h3 class="mb-5 mt-5 ml-4">ADD RESTAURANT</h3>
                  </b-col>
                </b-row>

                <div class="pl-lg-4">
                  <b-row>
                    <b-col lg="6">
                      <base-input
                        type="text"
                        label="NAME"
                        placeholder="NAME"
                        v-model="resturent.name"
                      >
                      </base-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="6">
                      <base-input
                        type="text"
                        label="ADDRESS"
                        placeholder="ADDRESS "
                        v-model="resturent.address"
                      >
                      </base-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col lg="6">
                      <base-input
                        type="text"
                        label="CONTACT"
                        placeholder="CONTACT"
                        v-model="resturent.contect"
                      >
                      </base-input>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <label class="form-control-label"
                        >ADD EMPLOYEE TO RESTAURANT</label
                      >
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-select v-model="selected" multiple>
                        <option v-for="item in employe" :key="item.id" :value="item">
                          {{ item.name }}
                        </option>
                      </b-form-select>
                    </b-col>
                    <b-col> </b-col>
                  </b-row>
                  <b-row>
                    <b-col class="mt-4">
                      <button
                        v-on:click="addresturent"
                        class="btn btn-sm btn-primary"
                      >
                        ADD RESTAURANT
                      </button>
                    </b-col>
                  </b-row>
                </div>
              </b-form>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      employe: [],
      selected: [],
      resturent: {
        name: "",
        address: "",
        contect: "",
        
      }
    };
  },
  methods: {
    async addresturent() {
      let user = localStorage.getItem("user info");
            this.name = JSON.parse(user).name
      
      const result = await axios.post("http://localhost:3000/resturent/", {
        name: this.resturent.name,
        address: this.resturent.address,
        contect: this.resturent.contect
      });

      for (let i = 0; i < this.selected.length; i++) {
       
        let result2 = await axios.put(
            "http://localhost:3000/employe/" + this.selected[i].id,
            {
                ...this.selected[i],
                resturent_id: result2.data.id
            }
        );
      }

      if (result.status == 201) {
        this.$router.push({
          name: "RESTAURANTS"
        });
      }
    },
    async employeloaddata() {
      let user = localStorage.getItem("user info");
            this.name = JSON.parse(user).name
      let result = await axios.get("http://localhost:3000/employe");
      this.employe = result.data;
    }
  },
  mounted() {
    this.employeloaddata();
  }
};
</script>
