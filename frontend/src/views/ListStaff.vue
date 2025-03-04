<template>
    <div class="page-row">
        <div class="search-wrapper panel-heading float-right col-md-3">
            <input class="form-control" type="text" v-model="input" placeholder="Tìm kiếm..." />
        </div>
        <div class="float-left col-md-2">
            <button class="btn btn-primary">
                <router-link class="text-white" to="/staff/new"><i class="fa-solid fa-plus"></i> THÊM MỚI</router-link>
            </button>
        </div>
        <br><br><br>
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th @click="sort('staffId')">Mã nhân viên</th>
                        <th @click="sort('name')">Tên</th>
                        <th @click="sort('role')">Chức vụ</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                        <th>SĐT</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="staff in filteredStaffs" :key="staff._id">
                        <td>{{ staff.staffId }}</td>
                        <td>{{ staff.name }}</td>
                        <td>{{ staff.role}}</td>
                        <td>{{ staff.sex }}</td>
                        <td>{{ staff.email }}</td>
                        <td>{{ staff.phone }}</td>
                        <td>
                            <router-link :to="{ name: 'editstaff', params: { id: staff._id }}" class="btn btn-success"><i class="fa-regular fa-pen-to-square"></i></router-link> 
                            <button @click.prevent="deleteStaff(staff._id)" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center">
            <button @click="prevPage" class="btn ">Pre</button>
            <button class="btn">{{currentPage}}</button>
            <button @click="nextPage" class="btn">Next</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            input: "",
            staffs: [],
            currentSort: 'name',
            currentSortDir: 'asc',
            pageSize: 7,
            currentPage: 1
        }
    },
    methods: {
        deleteStaff(id) {
            let apiURL = `http://localhost:3000/api/staff/${id}`;
            // staffs = JSON.parse(this.staffs);
            let indexOfArrayItem = this.staffs.findIndex(i => i._id === id);
            if (window.confirm("Bạn muốn xóa nhân viên này?")) {
                axios.delete(apiURL).then(() => {
                    this.staffs.splice(indexOfArrayItem, 1);
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        sort: function (s) {
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        },
        nextPage: function () {
            if ((this.currentPage * this.pageSize) < this.staffs.length) this.currentPage++;
        },
        prevPage: function () {
            if (this.currentPage > 1) this.currentPage--;
        }
    },
    computed: {
        staffStrings() {
            return this.staffs.map((staff) => {
                const { staffId, name, role } = staff;
                return [staffId, name, role].join("");
            });
        },

        filteredStaffs: function() {
            if (this.input) {
                return this.staffs.filter((staff, index) =>
                    this.staffStrings[index].toLowerCase().includes(this.input)
                );
            }
            return this.staffs.sort((a, b) => {
                let modifier = 1;
                if (this.currentSortDir === 'desc') modifier = -1;
                if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0;
            }).filter((row, index) => {
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;
            });
        },
    },
    created() {
        let apiURL = 'http://localhost:3000/api/staffs';
        axios.get(apiURL).then(res => {
            this.staffs = res.data.staffs
        }).catch(error => {
            console.log(error)
        });
    },
}
</script>
