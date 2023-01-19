<template>
<b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
        <b-row>
            <b-col>
                <h3 class="mb-0">RESTAURANTS</h3>
            </b-col>
            <b-col>
                <router-link to='/Addrest'><button class="btn btn-sm btn-primary">ADD RESTAURANT</button> </router-link></b-col>
            <b-col><router-link to='/add'><button class="btn btn-sm btn-primary">ADD EMPLOYEE</button> </router-link>

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
        <el-table-column label="EMPLOYES" min-width="90px" prop="employelist">
        </el-table-column>

        <el-table-column label="ACTIONS" min-width="150px" prop="">
            <template v-slot="{row}">

                <router-link :to="'/update/'+row.id"><button class="btn btn-sm btn-primary">update</button></router-link>

                <button v-on:click="deleteresturent(row.id)" class="btn btn-sm btn-primary">Delete</button>

            </template>
        </el-table-column>
    </el-table>

</b-card>
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

            employe: [],
            resturent: [],
            selected: [],

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

<style>

</style>
