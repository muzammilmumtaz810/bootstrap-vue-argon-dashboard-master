<template>
<div>
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
                        <b-card body-class="p-0" header-class="border-0">
                            <template v-slot:header>
                                <b-row align-v="center">
                                    <b-col>
                                        <h3 class="mb-4 ml-4"></h3>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        <h3 class="mb-0">RESTAURANTS</h3>
                                    </b-col>
                                    <b-col></b-col>
                                    <b-col></b-col>
                                    <b-col></b-col>
                                    <b-col></b-col>
                                    <b-col>
                                        <router-link to="/Addrest"><button class="btn btn-sm btn-primary ">ADD RESTAURANTS</button></router-link>
                                    </b-col>
                                </b-row>
                            </template>

                            <el-table class="table-responsive table" :data="resturent" header-row-class-name="thead-light">

                                <el-table-column label="Resturent" min-width="90px" prop="id">
                                    <template v-slot="{row}">
                                        <div class="font-weight-600" min-width="90px">{{row.name}}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="ADDRESS" min-width="90px" prop="address">
                                </el-table-column>
                                <el-table-column label="CONTACT" min-width="90px" prop="contect">
                                </el-table-column>
                                <el-table-column label="EMPLOYES" min-width="90px" prop="">
                                    <template v-slot="{row}">
                                        {{row.employelist.join(', ') }}
                                    </template>
                                </el-table-column>

                                <el-table-column label="ACTIONS" min-width="150px" prop="">
                                    <template v-slot="{row}">

                                        <router-link :to="'/update/'+row.id"><button class="btn btn-sm btn-primary ">Update</button></router-link>

                                        <button v-on:click="deleteresturent(row.id)" class="btn btn-sm btn-primary ml-3">Delete</button>

                                    </template>
                                </el-table-column>
                            </el-table>

                            <b-card-footer class="py-4 d-flex justify-content-end">

                                <base-pagination v-model="currentPage" :per-page="1" :total="5"></base-pagination>
                            </b-card-footer>

                        </b-card>

                    </div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>

</div>
</template>

<script>
import axios from 'axios'
import {
    Table,
    TableColumn,
    DropdownMenu,
    DropdownItem,
    Dropdown
} from 'element-ui'
export default {
    name: 'page-visits-table',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Dropdown.name]: Dropdown,
        [DropdownItem.name]: DropdownItem,
        [DropdownMenu.name]: DropdownMenu,
    },
    data() {
        return {
            currentPage: 1,
            resturent: [],

        }
    },

    methods: {
        async loaddata() {
            let user = localStorage.getItem("user info");
            this.name = JSON.parse(user).name
            let result = await axios.get("http://localhost:3000/resturent");
            this.resturent = result.data

        },
        async deleteresturent(id) {
            let result = await axios.delete("http://localhost:3000/resturent/" + id);
            if (result.status == 200) {
                this.loaddata()
            }
        },
    },
    mounted() {
        this.loaddata()

    }
}
</script>
