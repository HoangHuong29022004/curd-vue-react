<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center text-danger">THÊM SẢN PHẨM</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Mã sản phẩm:</label>
                    <input type="text" class="form-control" v-model="product.productId" required>
                </div>
                <div class="form-group">
                    <label>Tên sản phẩm:</label>
                    <input type="text" class="form-control" v-model="product.productName" required>
                </div>
                <div class="form-group">
                    <label class="pr-3">Loại:</label>
                    <select v-model="product.category" :required="true" class="browser-default custom-select ">
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
                    <button class="btn btn-danger btn-block"><i class="fa-regular fa-floppy-disk"></i> THÊM MỚI</button>
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
            product: {
                productId: '',
                productName: '',
                category: '',
                price: '',
                quantity: '',
            },
            categories: []
        }
    },
    created() {
        let apiURL = 'http://localhost:3000/api/categories';
        axios.get(apiURL).then(res => {
            this.categories = res.data.categories
        }).catch(error => {
            console.log(error)
        });
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:3000/api/product/new';

            axios.post(apiURL, this.product).then(() => {
                this.$router.push('/products')
                this.product = {
                    productId: '',
                    productName: '',
                    category: '',
                    price: '',
                    quantity: '',
                }
                this.message = "Nhân viên được thêm mới thành công.";
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>