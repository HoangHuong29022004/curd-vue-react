<template>
    <div class="page-row">
        <div class="search-wrapper panel-heading float-right col-md-3">
            <input class="form-control" type="text" v-model="input" placeholder="Tìm kiếm..." />
        </div>
        <div class="float-left col-md-2">
            <button class="btn btn-primary ">
                <router-link class="text-white" to="/category/new"><i class="fa-solid fa-plus"></i> THÊM MỚI</router-link>
            </button>
        </div>
        <br><br><br>
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th @click="sort('categoryId')">Mã Loại</th>
                        <th @click="sort('categoryName')">Tên Loại</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in filteredCategories" :key="category._id">
                        <td>{{ category.categoryId }}</td>
                        <td>{{ category.categoryName }}</td>
                        <td>
                            <button @click.prevent="deleteCategory(category._id)" class="btn btn-danger"><i
                                    class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                    <br />

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
            categories: [],
            currentSort: 'categoryName',
            currentSortDir: 'asc',
            pageSize: 10,
            currentPage: 1
        }
    },
    methods: {
        deleteCategory(id) {
            let apiURL = `http://localhost:3000/api/category/${id}`;
            let indexOfArrayItem = this.categories.findIndex(i => i._id === id);
            if (window.confirm("Bạn muốn xóa loại sản phẩm nàt?")) {
                axios.delete(apiURL).then(() => {
                    this.categories.splice(indexOfArrayItem, 1);
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
            if ((this.currentPage * this.pageSize) < this.categories.length) this.currentPage++;
        },
        prevPage: function () {
            if (this.currentPage > 1) this.currentPage--;
        }
    },
    computed: {
        categoryStrings() {
            return this.categories.map((category) => {
                const { categoryId, categoryName } = category;
                return [categoryId, categoryName].join("");
            });
        },

        filteredCategories: function () {
            if (this.input) {
                return this.categories.filter((category, index) =>
                    this.categoryStrings[index].toLowerCase().includes(this.input)
                );
            }
            return this.categories.sort((a, b) => {
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
        let apiURL = 'http://localhost:3000/api/categories';
        axios.get(apiURL).then(res => {
            this.categories = res.data.categories
            // console.log(this.staffs = res.data.staffs)
        }).catch(error => {
            console.log(error)
        });
    },
}
</script>
