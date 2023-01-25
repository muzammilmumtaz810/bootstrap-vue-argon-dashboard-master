<template>
    
<b-card no-body>
    
    
    <b-card-header class="border-0">
        <!-- <router-link to="add"></router-link> -->
        <h3 class="mb-0">Restaurants</h3>
        
        
    </b-card-header>

    <v-table class="table-responsive table" :currentPage.sync="currentPage"
    :pageSize="5" @totalPagesChanged="totalPages = $event">
        <thead class="thead-dark">
        <tr>
           
            <td>NAME</td>
            <td>ADDRESS</td>
            <td>CONTECT</td>
            
        
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in resturent" :key="item.id">
            
            <td> {{item.name}} </td>
            <td> {{item.address}} </td>
            <td> {{item.contect}} </td>
            <!-- <td> <router-link :to="'/update/'+item.id">Update Restaurants</router-link> </td> -->
           
        </tr>
    </tbody>
    </v-table>
    <smart-pagination
    :currentPage.sync="currentPage"
    :totalPages="totalPages"
  />

     <b-card-footer class="py-4 d-flex justify-content-end">
    <base-pagination v-model="currentPage" :per-page="2" :total="10"></base-pagination> 
    </b-card-footer> 
</b-card>
</template>

<script>
import axios from 'axios'
export default {
    name: 'light-table',
    components: {

    },
    data() {
        return {
            currentPage: 1,
    totalPages: 0,

            currentPage: 1,
            resturent: [],
            
        };
    },
    methods: {
        async loaddata() {
            let user = localStorage.getItem("user info");
            this.name = JSON.parse(user).name
                if(!user){
                this.$router.push({name:'SignUp'})}
            let result = await axios.get("http://localhost:3000/resturent");

            this.resturent = result.data

        }
    },
    mounted() {
        this.loaddata()
    }

}
</script>
