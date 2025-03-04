<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center text-danger">CẬP NHẬT CA LÀM</h3>
            <form @submit.prevent="handleUpdateForm">
                <br />
                <div class="form-group">
                    <label>Tên nhân viên:</label>
                    <input type="text" class="form-control" v-model="shift.staffName" required>
                </div>
                <div class="form-group">
                    <label class="pr-3">Ca làm: </label>
                    <select v-model="shift.shiftName" :required="true" class="browser-default custom-select">
                        <option>Sáng</option>
                        <option>Chiều</option>
                        <option>Tối</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Ngày:</label>
                    <input type="date" class="form-control" v-model="shift.datework" required>
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
            shift: {}
        }
    },
    created() {
        let apiURL = `http://localhost:3000/api/shift/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.shift = res.data.shift;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/api/shift/${this.$route.params.id}`;
            axios.put(apiURL, this.shift).then((res) => {
                console.log(res)
                this.$router.push('/shifts')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>