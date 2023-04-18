<template>
    <div v-if="staff">
        <h1 class="text-[#5a5c69] text-[28px] leading-[34px] font-normal text-center">
            Cập nhật thông tin nhân viên
        </h1>
        <Form :validation-schema="editForm" @submit="updateStaff" autocomplete="off"
            class="mt-[22px] bg-white px-10 py-6 flex flex-col gap-4 shadow-lg border">
            <div class="flex">
                <div class="basis-[30%] flex flex-col gap-3">
                    <div class="flex flex-col gap-2 w-full">
                        <label for="fullname" class="">Họ và tên:</label>
                        <div class="flex flex-col gap-1">
                            <Field type="text" name="fullname" id="fullname" v-model="staff.fullname"
                                placeholder="Staff's fullname"
                                class="bg-transparent border-2 w-[80%] outline-none px-2 py-1 text-sm" />
                            <ErrorMessage name="fullname" class="error-message" />
                        </div>
                    </div>
                    <div class="flex flex-col w-full gap-2">
                        <label for="gender" class="">Giới tính:</label>
                        <div class="flex flex-col gap-1">
                            <div class="flex gap-2">
                                <Field v-model="staff.gender" name="gender" id="gender" type="radio"
                                    :value="staff.gender" /> Nữ
                                <Field v-model="staff.gender" name="gender" id="gender" type="radio"
                                    :value="staff.gender" /> Nam
                            </div>
                            <ErrorMessage name="gender" class="error-message" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label for="birthday" class="">Ngày sinh:</label>
                        <div class="flex flex-col gap-1">
                            <Field v-model="staff.birthday" type="date" name="birthday" id="birthday"
                                placeholder="Staff's fullname"
                                class="bg-transparent border-2 w-[80%] outline-none px-2 py-1 text-sm" />
                            <ErrorMessage name="birthday" class="error-message" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label for="phone" class="">Số điện thoại:</label>
                        <div class="flex flex-col gap-1">
                            <Field v-model="staff.phone" type="tel" name="phone" id="phone" placeholder="Staff's phone"
                                class="bg-transparent border-2 w-[80%] outline-none px-2 py-1 text-sm" />
                            <ErrorMessage name="phone" class="error-message" />
                        </div>
                    </div>
                </div>
                <div class="basis-[70%] flex gap-4">
                    <div class="basis-[35%] flex flex-col gap-2">
                        <div class="flex flex-col gap-2 w-full">
                            <label for="email" class="">Email:</label>
                            <div class="flex flex-col gap-1">
                                <Field v-model="staff.email" type="email" name="email" id="email"
                                    placeholder="Staff's email"
                                    class="bg-transparent border-2 w-full outline-none px-2 py-1 text-sm" />
                                <ErrorMessage name="email" class="error-message" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label for="address" class="">Địa chỉ:</label>
                            <div class="flex flex-col gap-1">
                                <Field v-model="staff.address" type="text" name="address" id="address"
                                    placeholder="Staff's address"
                                    class="bg-transparent border-2 w-full outline-none px-2 py-1 text-sm" />
                                <ErrorMessage name="address" class="error-message" />
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <label for="position" class="">Công việc đảm nhận:</label>
                            <div class="flex flex-col gap-1">
                                <Field v-model="position" as="select" name="position" id="position"
                                    class="bg-transparent border-2 w-full outline-none px-2 py-1 text-sm text-center">
                                    <option value="">---Chọn---</option>
                                    <!-- Positions -->
                                    <option v-for="job in positions" :key="job" :value="job._id">
                                        {{ job.name }}
                                    </option>
                                </Field>
                                <ErrorMessage name="position" class="error-message" />
                            </div>
                        </div>
                    </div>
                    <div class="basis-[35%]">
                        <div class="flex flex-col gap-2 w-full">
                            <label for="avatar" class="">Hình đại diện:</label>
                            <div class="flex flex-col gap-1">
                                <Field type="file" @change="showImage" v-model="staff.image" name="avatar" id="avatar"
                                    class="text-sm" />
                                <div id="showImage">
                                    <img v-if="staff.avatar" id="show_image" :src="publicImage + staff.avatar"
                                        class="h-full w-full object-cover">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex gap-4 items-center justify-center mt-10">
                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Sửa</button>
                <span @click="this.$router.push({ name: 'ListStaff' })"
                    class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer">Hủy</span>
            </div>
        </Form>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';

import { publicImage } from "@/constants";

import staffService from "@/services/staff.service";
import positionService from "@/services/position.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        const staff = ref();

        const positions = ref();
        const position = ref();

        const editForm = yup.object().shape({
            fullname: yup
                .string()
                .required("Xin nhập vào trường này"),
            gender: yup
                .string()
                .required("Xin chọn giới tính"),
            birthday: yup
                .string()
                .required("Xin chọn ngày sinh"),
            phone: yup
                .number()
                .required("Xin nhập vào trường này"),
            email: yup
                .string()
                .required("Xin nhập vào trường này"),
            address: yup
                .string()
                .required("Xin nhập vào trường này"),
            position: yup
                .string()
                .required("Xin chọn trường này"),
        });

        const fetchStaff = async (staffId) => {
            try {
                const response = await staffService.getById(staffId);
                if (response.status == 200) {
                    staff.value = response.data[0];
                    position.value = staff.value.position ? staff.value.position._id : '';
                }
            } catch (err) {
                alert('ID không hợp lệ');
                router.push({
                    name: 'ListStaff'
                })
            }
        }

        const updateStaff = async () => {
            try {
                const formData = new FormData();

                formData.append('fullname', staff.value.fullname);
                formData.append('gender', staff.value.gender);
                formData.append('birthday', staff.value.birthday);
                formData.append('phone', staff.value.phone);
                formData.append('email', staff.value.email);
                formData.append('address', staff.value.address);
                formData.append('position', position.value);
                formData.append('image', staff.value.image)

                const response = await staffService.updateStaff(staff.value._id, formData);
                if (response.status == 200) {
                    alert(response.data);
                    router.push({
                        name: 'ListStaff'
                    })
                }
            } catch (err) {
                if (err.response.status == 404) {
                    alert(err.response.data);
                }
            }
        }

        const showImage = (e) => {
            const imgEle = document.getElementById('show_image');
            if (imgEle) imgEle.remove();

            const divWrap = document.getElementById('showImage');

            let img = document.createElement('img');
            img.id = 'show_image';
            img.className = 'h-full w-full object-cover';
            img.src = URL.createObjectURL(e.target.files[0]);

            divWrap.append(img);
        }

        const fetchPositions = async () => {
            try {
                const response = await positionService.getPositions();
                if (response.status == 200) {
                    positions.value = response.data;
                }
            } catch (err) {
                console.log(err);
            }
        }

        onBeforeMount(() => {
            fetchPositions();
            fetchStaff(route.params.id);
        })

        return {
            updateStaff,
            showImage,
            publicImage,
            editForm,
            positions,
            position,
            staff,
        }
    }
}
</script>