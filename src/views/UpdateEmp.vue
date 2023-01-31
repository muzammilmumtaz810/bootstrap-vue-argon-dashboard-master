<template>
<div>
    <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
        <!-- Card stats -->
        <b-row>
            <b-col xl="3" md="6">
                <stats-card title="Total traffic" type="gradient-red" sub-title="350,897" icon="ni ni-active-40" class="mb-4">

                    <template slot="footer">
                        <span class="text-success mr-2">3.48%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>
            </b-col>
            <b-col xl="3" md="6">
                <stats-card title="Total traffic" type="gradient-orange" sub-title="2,356" icon="ni ni-chart-pie-35" class="mb-4">

                    <template slot="footer">
                        <span class="text-success mr-2">12.18%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>
            </b-col>
            <b-col xl="3" md="6">
                <stats-card title="Sales" type="gradient-green" sub-title="924" icon="ni ni-money-coins" class="mb-4">

                    <template slot="footer">
                        <span class="text-danger mr-2">5.72%</span>
                        <span class="text-nowrap">Since last month</span>
                    </template>
                </stats-card>

            </b-col>
            <b-col xl="3" md="6">
                <stats-card title="Performance" type="gradient-info" sub-title="49,65%" icon="ni ni-chart-bar-32" class="mb-4">

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
                        <b-form @submit.prevent="updateresturent">

                            <b-row align-v="center">
                                <b-col>
                                    <h3 class="mb-5 mt-5 ml-4">UPDATE EMPLOYEE</h3>
                                </b-col>
                            </b-row>

                            <div class="pl-lg-4">
                                <b-row>
                                    <b-col lg="6">
                                        <base-input type="text" label="NAME" placeholder="NAME" v-model="employe.name">
                                        </base-input>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col lg="6">
                                        <base-input type="text" label="ADDRESS" placeholder="ADDRESS " v-model="employe.address">
                                        </base-input>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col lg="6">
                                        <base-input type="text" label="CONTACT" placeholder="CONTACT" v-model="employe.contect">
                                        </base-input>
                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col class="mt-4">

                                        <button v-on:click="updateresturent" class="btn btn-sm btn-primary">UPDATE EMPLOYEE</button>
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
import axios from 'axios'

export default {
    neme: 'updateemp',
    data() {
        return {

            employe: {
                name: '',
                address: '',
                contect: '',

            }
        }

    },
    methods: {
        async updateresturent() {
            const result = await axios.put('http://localhost:3000/employe/' + this.$route.params.id, {
                name: this.employe.name,
                address: this.employe.address,
                contect: this.employe.contect,

            });
            if (result.status == 200) {

                this.$router.push({
                    name: 'EMPLOYEE'
                });
            }

        },
     
    },

    async mounted() {
        const result = await axios.get('http://localhost:3000/employe/' + this.$route.params.id)
        this.employe = result.data

       
    }
}
</script>
