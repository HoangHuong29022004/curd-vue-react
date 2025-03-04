<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center text-danger">THÊM NHÂN VIÊN</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Mã nhân viên</label>
                    <input type="text" class="form-control" v-model="staff.staffId" required>
                </div>
                <div class="form-group">
                    <label>Tên</label>
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
                    <input type="radio" id="nam" value="Nam" v-model="staff.sex">
                    <label for="nam" class="pr-3">Nam</label>
                    <input type="radio" id="nữ" value="Nữ" v-model="staff.sex">
                    <label for="nữ">Nữ</label>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="staff.email" required>
                </div>
                <div class="form-group">
                    <label>SĐT</label>
                    <input type="number" class="form-control" v-model="staff.phone" required>
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
            staff: {
                staffId: '',
                name: '',
                role:'',
                sex: '',
                email: '',
                phone: '',
            },
            message: "",
        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:3000/api/staff/new';
            
            axios.post(apiURL, this.staff).then(() => {
              this.$router.push('/')
              this.staff = {
                  staffId: '',
                  name: '',
                  role: '',
                  sex: '',
                  email: '',
                  phone: '',
              }
                this.message = "Nhân viên được thêm mới thành công.";
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>