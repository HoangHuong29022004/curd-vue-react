<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center text-danger">CẬP NHẬT SẢN PHẨM</h3>
            <form @submit.prevent="handleUpdateForm">
                <br />
                <div class="form-group">
                    <label>Mã sản phẩm:</label>
                    <input type="text" class="form-control" v-model="product.productId" required>
                </div>
                <div class="form-group">
                    <label>Tên sản phẩm:</label>
                    <input type="text" class="form-control" v-model="product.productName" required>
                </div>
                <div class="form-group">
                    <label>Loại:</label>
                    <select v-model="product.category" :required="true" class="browser-default custom-select">
                        <option v-for="category in categories" :value="category.categoryName">
                            {{ category.categoryName}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Giá:</label>
                    <input type="number" class="form-control" v-model="product.price" required>
                </div>
                <div class="form-group">
                    <label>Số lượng:</label>
                    <input type="number" class="form-control" v-model="product.quantity" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-danger btn-block"><i class="fa-regular fa-floppy-disk"></i> CẬP NHẬT</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            product: {},
            categories: []
        }
    },
    created() {
        let apiURL = `http://localhost:3000/api/product/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.product = res.data.product;
        })
    },
    mounted() {
        let apiURL = 'http://localhost:3000/api/categories';
        axios.get(apiURL).then(res => {
            this.categories = res.data.categories
        }).catch(error => {
            console.log(error)
        });
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/api/product/${this.$route.params.id}`;
            axios.put(apiURL, this.product).then((res) => {
                console.log(res)
                this.$router.push('/products')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>