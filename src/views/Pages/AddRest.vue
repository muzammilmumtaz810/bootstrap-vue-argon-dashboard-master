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
            <b-form>
    
                <b-row align-v="center">
                    <b-col>
                        <h3 class="mb-5 mt-5 ml-4">ADD RESTAURANT</h3>
                    </b-col>
                </b-row>
    
                <div class="pl-lg-4">
                    <b-row>
                        <b-col lg="6">
                            <base-input type="text" label="NAME" placeholder="NAME" v-model="resturent.name">
                            </base-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="6">
                            <base-input type="text" label="ADDRESS" placeholder="ADDRESS " v-model="resturent.address">
                            </base-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="6">
                            <base-input type="text" label="CONTACT" placeholder="CONTACT" v-model="resturent.contect">
                            </base-input>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
    
                            <b-p>Add employee to your resturent from employee list</b-p> 
                        </b-col>
                        <b-col>
                            <b-select multiple v-model="selected" style="width:200px;border:none">
                    <option disabled value="">plz select employee</option>
                    <option v-for="item in employe" :key="item.id">{{item.name}}</option>
                </b-select>
                        </b-col>
                        <b-col>
                       <b-p>{{ selected }}</b-p> 
                        </b-col>
                        <b-col>
    
                            <button v-on:click="addresturent" class="btn btn-sm btn-primary">SAVE</button>
                        </b-col>
    
                    </b-row>
                </div>
            </b-form>
    
        </b-container>
    </div>
    </template>
    
    <script>

    import axios from 'axios'
    
    export default {
        data() {
            return {
                show:false,
                employe:[],
                selected:[],
                resturent: {
                    name: '',
                    address: '',
                    contect: '',
    
                }
            }
    
        },
        methods: {
           async addresturent() {
            const result = await axios.post("http://localhost:3000/resturent/", {
                name: this.resturent.name,
                address: this.resturent.address,
                contect: this.resturent.contect,
                employelist:this.selected
            });
            if (result.status == 201) {
                this.$router.push({
                    name: 'dashboard'
                });
            }
        },
        async employeloaddata() {
        let result = await axios.get("http://localhost:3000/employe");
         this.employe = result.data
        }
        }
        ,mounted(){
            this.employeloaddata()
        }
      
    }
    </script>
    