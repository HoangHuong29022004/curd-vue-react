<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center text-danger">CẬP NHẬT THÔNG TIN NHÂN VIÊN</h3>
            <form @submit.prevent="handleUpdateForm">
                <br/>
                <div class="form-group">
                    <label>Mã nhân viên:</label>
                    <input type="text" class="form-control" v-model="staff.staffId" required>
                </div>
                <div class="form-group">
                    <label>Tên:</label>
                    <input type="text" class="form-control" v-model="staff.name" required>
                </div>
                <div class="form-group">
                    <label class="pr-3">Chức vụ: </label>
                    <select v-model="staff.role" :required="true" class="browser-default custom-select">
                        <option>Quản lý</option>
                        <option>Nhân viên</option>
                        <option>Thu ngân</option>
                        <option>Shipper</option>
                        <option>Bảo vệ</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="pr-5">Giới tính:</label>
                    <input type="radio" id="nam" value="Nam" v-model="staff.sex" :required="true">
                    <label for="nam" class="pr-3" >Nam</label>
                    <input type="radio" id="nữ" value="Nữ" v-model="staff.sex" :required="true">
                    <label for="nữ" >Nữ</label>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" class="form-control" v-model="staff.email" required>
                </div>
                <div class="form-group">
                    <label>SĐT:</label>
                    <input type="number" class="form-control" v-model="staff.phone" required>
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
            staff: {}
        }
    },
    created() {
        let apiURL = `http://localhost:3000/api/staff/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.staff = res.data.staff;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/api/staff/${this.$route.params.id}`;
            axios.put(apiURL, this.staff).then((res) => {
                console.log(res)
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>