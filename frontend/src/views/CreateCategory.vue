<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center text-danger">THÊM LOẠI SẢN PHẨM</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Mã loại:</label>
                    <input type="text" class="form-control" v-model="category.categoryId" required>
                </div>
                <div class="form-group">
                    <label>Tên loại sản phẩm:</label>
                    <input type="text" class="form-control" v-model="category.categoryName" required>
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
            category: {
                categoryId: '',
                categoryName: '',
            },
        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:3000/api/category/new';
            axios.post(apiURL, this.category).then(() => {
                this.$router.push('/categories')
                this.category = {
                    categoryId: '',
                    categoryName: '',
                }
                this.message = "Loại sản phẩm được thêm mới thành công.";
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>