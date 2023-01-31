<template>
<b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
        <b-row>
            <b-col>
                <h3 class="mb-0">RESTAURANTS</h3>
            </b-col>
        </b-row>
    </template>

    

    <b-card-footer class="py-4 d-flex justify-content-end">

        <base-pagination v-model="currentPage" :per-page="1" :total="2"></base-pagination>
    </b-card-footer>

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
            currentPage: 1,
           

        }
    },

    methods: {
       
    },
   
}
</script>

<style>

</style>
