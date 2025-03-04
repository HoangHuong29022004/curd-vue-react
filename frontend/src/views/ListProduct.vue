<template>
    <div class="page-row">
        <div class="search-wrapper panel-heading float-right col-md-3">
            <input class="form-control" type="text" v-model="input" placeholder="Tìm kiếm..." />
        </div>
        <div class="float-left col-md-2">
            <button class="btn btn-primary">
                <router-link class="text-white" to="/product/new"><i class="fa-solid fa-plus"></i> THÊM MỚI</router-link>
            </button>
        </div>
        <br><br><br>
        <div class="col-md-12">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                <thead class="thead-dark">
                    <tr>
                        <th @click="sort('productId')">Mã sản phẩm</th>
                        <th @click="sort('productName')">Tên sản phẩm</th>
                        <th @click="sort('category')">Loại sản phẩm</th>
                        <th @click="sort('price')">Giá</th>
                        <th @click="sort('quantity')">Số lượng</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in filteredProducts" :key="product._id">
                        <td>{{ product.productId }}</td>
                        <td>{{ product.productName }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}}</td> 
                        <td>{{ product.quantity }}</td>
                        <td>
                            <router-link :to="{ name: 'editproduct', params: { id: product._id } }" class="btn btn-success"><i class="fa-regular fa-pen-to-square"></i></router-link>
                            <button @click.prevent="deleteProduct(product._id)" class="btn btn-danger"><i
                                    class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-center">
                <button @click="prevPage" class="btn ">Pre</button>
                <button class="btn">{{currentPage}}</button>
                <button @click="nextPage" class="btn">Next</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            input: "",
            products: [],
            currentSort: 'productName',
            currentSortDir: 'asc',
            pageSize: 15,
            currentPage: 1
        }
    },
    methods: {
        deleteProduct(id) {
            let apiURL = `http://localhost:3000/api/product/${id}`;
            let indexOfArrayItem = this.products.findIndex(i => i._id === id);
            if (window.confirm("Bạn muốn xóa sản phẩm này?")) {
                axios.delete(apiURL).then(() => {
                    this.products.splice(indexOfArrayItem, 1);
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
            if ((this.currentPage * this.pageSize) < this.products.length) this.currentPage++;
        },
        prevPage: function () {
            if (this.currentPage > 1) this.currentPage--;
        }
    },
    computed: {
        productStrings() {
            return this.products.map((product) => {
                const { productId, productName, category } = product;
                return [productId, productName, category].join("");
            });
        },

        filteredProducts: function () {
            if(this.input) {
                return this.products.filter((product, index) =>
                    this.productStrings[index].toLowerCase().includes(this.input)
                );
            }
            return this.products.sort((a, b) => {
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
        }
    },
    created() {
        let apiURL = 'http://localhost:3000/api/products';
        axios.get(apiURL).then(res => {
            this.products = res.data.products
        }).catch(error => {
            console.log(error)
        })
    },
}
</script>