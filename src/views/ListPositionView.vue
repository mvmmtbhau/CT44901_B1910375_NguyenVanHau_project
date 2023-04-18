<template>
    <div class="pt-[25px] px-[25px] bg-[#F8F9FC] h-[90%]">
        <div>
            <div class="flex items-center justify-between">
                <h1 class="text-[#5a5c69] text-[28px] leading-[34px] font-normal">
                    Danh sách vị trí công việc
                </h1>
                <div id="actions" class="flex gap-1">
                    <span @click="isShowAddModal = true"
                        class="bg-green-500 hover:bg-green-700 h-[32px] rounded-md text-white flex gap-1 items-center justify-center px-3 cursor-pointer">
                        <font-awesome-icon :icon="['fas', 'plus']" /> Thêm mới
                    </span>
                    <div class="border rounded-md">
                        <select v-model="sortBy" class="px-4 text-center bg-[#4E73DF] text-white h-full outline-none">
                            <option value="0">Ngày thêm cũ nhất</option>
                            <option value="1">Ngày thêm mới nhất</option>
                            <option value="2">Tên vị trí A-Z</option>
                            <option value="3">Tên vị trí Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
            <form @submit.prevent="search" class="mt-[25px]">
                <input v-model="searchText" type="text" name="search" autocomplete="off" placeholder="Search room..."
                    class="w-[16rem] py-1 outline-none border rounded-tl-md rounded-bl-md bg-white px-2 text-[14px] leading-[24px]" />
                <button class="bg-[#4E73DF] h-[35px] px-2 cursor-pointer text-white rounded-tr-md rounded-br-md">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </button>
            </form>
            <div class="mt-[25px] h-[21rem]">
                <div class="relative overflow-x-auto border-b shadow-lg rounded-md">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr class="bg-[#4E73DF] text-white text-center">
                                <th scope="col" class="w-10 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Vị trí
                                </th>
                                <th scope="col" class="w-[18rem] py-3">
                                    Quản lý
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(position, index) in positions" :key="index" class="bg-white border-b text-center">
                                <td scope="row" class="w-10 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ (index + 1) + (5 * (page - 1)) }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ position.name }}
                                </td>
                                <td id="actions" class="flex gap-2 justify-center items-center py-4">
                                    <span @click="showViewModal(position)"
                                        class="bg-cyan-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-cyan-700">
                                        <font-awesome-icon :icon="['fas', 'eye']" /> Xem
                                    </span>
                                    <span @click="showEditModal(position)"
                                        class="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-700">
                                        <font-awesome-icon :icon="['fas', 'pen']" /> Chỉnh sửa
                                    </span>
                                    <span @click="deletePosition(position)"
                                        class="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-red-700">
                                        <font-awesome-icon :icon="['fas', 'trash']" /> Xóa
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-[25px]">
                <v-pagination v-model="page" :length="totalPage"></v-pagination>
            </div>
        </div>
        <div v-if="isShowAddModal" class="fixed z-20">
            <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.6] flex items-center justify-center"
                @click="hiddenAddModal()">
                <div class="bg-white w-[25rem] min-h-[25rem] flex flex-col rounded-[0.6rem]" @click.stop>
                    <div class="flex items-center justify-center border-b py-2 relative">
                        <span class="font-bold">Thêm vị trí mới</span>
                        <font-awesome-icon :icon="['fas', 'xmark']" class="absolute right-4 text-xl cursor-pointer"
                            @click="hiddenAddModal()" />
                    </div>
                    <Form :validation-schema="addForm" @submit="addNewPosition" autocomplete="off"
                        class="flex px-10 pt-4 py-6 gap-4">
                        <div class="flex flex-col gap-3 w-full">
                            <div class="flex flex-col w-full gap-2">
                                <label for="name" class=" basis-[50%] text-sm font-semibold">Tên vị trí:</label>
                                <div class="basis-[50%]">
                                    <Field v-model="name" type="text" name="name" id="name"
                                        class="px-2 py-1 w-full border rounded-md" />
                                    <ErrorMessage name="name" class="error-message" />
                                </div>
                            </div>
                            <div class="flex flex-col w-full gap-2">
                                <label for="salary" class=" basis-[50%] text-sm font-semibold">Lương tháng:</label>
                                <div class="basis-[50%] ">
                                    <Field v-model="salary" type="text" name="salary" id="salary"
                                        class="px-2 py-1 w-full border rounded-md" />
                                    <ErrorMessage name="salary" class="error-message" />
                                </div>
                            </div>
                            <div class="flex flex-col w-full gap-2">
                                <label for="overtime_salary" class=" basis-[50%] text-sm font-semibold">Lương tăng ca
                                    (/giờ):</label>
                                <div class="basis-[50%]">
                                    <Field v-model="overtime_salary" type="text" name="overtime_salary" id="overtime_salary"
                                        class="px-2 py-1 w-full border rounded-md" />
                                    <ErrorMessage name="overtime_salary" class="error-message" />
                                </div>
                            </div>
                            <div class="flex gap-2 mt-3 justify-center">
                                <button class="bg-green-500 hover:bg-green-600 text-white font-bold px-2 py-1 rounded-md">
                                    Thêm
                                </button>
                                <span @click="hiddenAddModal()"
                                    class="bg-gray-500 hover:bg-gray-600 cursor-pointer px-2 py-1 rounded-md">
                                    Hủy
                                </span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <div v-if="isShowEditModal" class="fixed z-20">
            <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.6] flex items-center justify-center"
                @click="hiddenEditModal()">
                <div class="bg-white w-[25rem] min-h-[25rem] flex flex-col rounded-[0.6rem]" @click.stop>
                    <div class="flex items-center justify-center border-b py-2 relative">
                        <span class="font-bold">Cập nhật thông tin vị trí công việc</span>
                        <font-awesome-icon :icon="['fas', 'xmark']" class="absolute right-4 text-xl cursor-pointer"
                            @click="hiddenEditModal()" />
                    </div>
                    <Form :validation-schema="addForm" @submit="updatePosition()" autocomplete="off"
                        class="flex px-10 pt-4 py-6 gap-4">
                        <div class="flex flex-col gap-3 w-full">
                            <div class="flex flex-col w-full gap-2">
                                <label for="name" class=" basis-[50%] text-sm font-semibold">Tên vị trí:</label>
                                <div class="basis-[50%]">
                                    <Field v-model="positionDetail.name" type="text" name="name" id="name"
                                        class="px-2 py-1 w-full border rounded-md" />
                                    <ErrorMessage name="name" class="error-message" />
                                </div>
                            </div>
                            <div class="flex flex-col w-full gap-2">
                                <label for="salary" class=" basis-[50%] text-sm font-semibold">Lương tháng:</label>
                                <div class="basis-[50%] ">
                                    <Field v-model="positionDetail.salary" type="text" name="salary" id="salary"
                                        class="px-2 py-1 w-full border rounded-md" />
                                    <ErrorMessage name="salary" class="error-message" />
                                </div>
                            </div>
                            <div class="flex flex-col w-full gap-2">
                                <label for="overtime_salary" class=" basis-[50%] text-sm font-semibold">Lương tăng ca
                                    (/giờ):</label>
                                <div class="basis-[50%]">
                                    <Field v-model="positionDetail.overtime_salary" type="text" name="overtime_salary"
                                        id="overtime_salary" class="px-2 py-1 w-full border rounded-md" />
                                    <ErrorMessage name="overtime_salary" class="error-message" />
                                </div>
                            </div>
                            <div class="flex gap-2 mt-3 justify-center">
                                <button class="bg-green-500 hover:bg-green-600 text-white font-bold px-2 py-1 rounded-md">
                                    Sửa
                                </button>
                                <span @click="hiddenEditModal()"
                                    class="bg-gray-500 hover:bg-gray-600 cursor-pointer px-2 py-1 rounded-md">
                                    Hủy
                                </span>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <div v-if="isShowViewModal" class="fixed z-20">
            <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.6] flex items-center justify-center"
                @click="hiddenViewModal()">
                <div class="bg-white w-[35rem] flex flex-col rounded-[0.6rem]" @click.stop>
                    <div class="flex items-center justify-center border-b py-2 relative">
                        <span class="font-bold">Xem chi tiết vị trí công việc</span>
                        <font-awesome-icon :icon="['fas', 'xmark']" class="absolute right-4 text-xl cursor-pointer"
                            @click="hiddenViewModal()" />
                    </div>
                    <div class="flex px-10 pt-4 py-6 gap-4">
                        <div class="basis-[50%] max-w-full flex flex-col gap-3 w-full border-r border-black">
                            <div class="flex w-full gap-2 items-center">
                                <span class="text-sm font-semibold">Tên vị trí:</span>
                                <div class="break-all">
                                    {{ positionDetail.name }}
                                </div>
                            </div>
                            <div class="flex w-full gap-2 items-center">
                                <span class="text-sm font-semibold">Lương tháng:</span>
                                <div class="break-all ">
                                    {{ '$' + positionDetail.salary }}
                                </div>
                            </div>
                            <div class="flex w-full gap-2 items-center">
                                <span class="text-sm font-semibold">
                                    Lương tăng ca (/giờ):
                                </span>
                                <div class="break-all">
                                    {{ '$' + positionDetail.overtime_salary }}
                                </div>
                            </div>
                        </div>
                        <div v-if="positionDetail.hasStaff && positionDetail.hasStaff.length"
                            class="basis-[50%] flex flex-col gap-3 w-full">
                            <span class="font-bold text-sm">Những người đảm nhận vị trí này:</span>
                            <div v-for="(staff, index) in positionDetail.hasStaff" :key="staff" class="flex gap-1">
                                <span>{{ index + 1 }}.</span>
                                <span @click="showStaffDetail(staff)"
                                    class="text-blue-400 hover:text-blue-700 cursor-pointer ">{{ staff.fullname }}</span>
                            </div>
                        </div>
                        <div v-else class="basis-[50%] flex flex-col gap-3 w-full">
                            <span class="font-bold text-sm">Chưa có ai đảm nhận vị trí này</span>
                        </div>
                    </div>
                    <div v-if="staffDetail" class="">
                        <div class="relative flex gap-10 border-t pt-10 px-4 py-4">
                            <span @click="staffDetail = ''" class="absolute top-2 cursor-pointer text-sm text-blue-400 hover:text-blue-700">
                                Rút gọn
                                <font-awesome-icon :icon="['fas', 'chevron-down']" />
                            </span>
                            <div :class="[staffDetail.avatar ? 'basis-[60%]' : 'basis-[50%]']"
                                class=" flex flex-col text-[15px]">
                                <span><b>Họ tên:</b> {{ staffDetail.fullname }}</span>
                                <span><b>Giới tính:</b> {{ staffDetail.gender == 0 ? 'Nữ' : 'Nam' }}</span>
                                <span><b>Ngày sinh:</b> {{ staffDetail.birthday.split('-').reverse().join('/') }}</span>
                                <span><b>Địa chỉ:</b> {{ staffDetail.address }}</span>
                                <div class="flex flex-col mt-[10px] border-t">
                                    <span class="mt-[10px]">Thông tin liên hệ:</span>
                                    <span><b>Số điện thoại:</b> {{ staffDetail.phone }}</span>
                                    <span><b>Email:</b> {{ staffDetail.email }}</span>
                                </div>
                            </div>
                            <div v-if="staffDetail.avatar" class="basis-[30%] flex flex-col gap-3">
                                <img :src="publicImage + staffDetail.avatar">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { onBeforeMount, ref, watch } from "vue";
import { publicImage } from "@/constants";

import positionService from "@/services/position.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const name = ref();
        const salary = ref();
        const overtime_salary = ref();

        const positions = ref();
        const page = ref(1);
        const per_page = 5;
        const sortBy = ref(0);
        const totalPage = ref();
        const searchText = ref('');

        const positionDetail = ref();
        const staffDetail = ref();

        const addForm = yup.object().shape({
            name: yup
                .string()
                .required("Xin nhập vào trường này"),
            salary: yup
                .number()
                .required("Xin nhập vào trường này"),
            overtime_salary: yup
                .number()
                .required("Xin nhập vào trường này"),
        });
        const isShowAddModal = ref(false);
        const isShowEditModal = ref(false);
        const isShowViewModal = ref(false);

        const hiddenAddModal = () => {
            if ((name.value || salary.value || overtime_salary.value) && confirm('Có dữ liệu đang nhập, bạn có muốn thoát không?')) {
                name.value = '',
                    salary.value = '';
                overtime_salary.value = '';
            }
            isShowAddModal.value = false;
        }

        const hiddenEditModal = () => {
            if (confirm('Bạn không muốn chỉnh sửa nữa?')) {
                positionDetail.value = ''
                isShowEditModal.value = false;
            }
        }

        const hiddenViewModal = () => {
            positionDetail.value = '';
            staffDetail.value = '';
            isShowViewModal.value = false;
        }

        const showEditModal = (position) => {
            positionDetail.value = position;
            isShowEditModal.value = true;
        }

        const showViewModal = (position) => {
            positionDetail.value = position;
            isShowViewModal.value = true;
        }

        const showStaffDetail = (staff) => {
            staffDetail.value = staff;
        }

        const addNewPosition = async () => {
            try {
                const data = {
                    name: name.value,
                    salary: salary.value,
                    overtime_salary: overtime_salary.value
                }

                const response = await positionService.addNew(data);
                if (response.status == 201) {
                    alert(response.data);
                    name.value = '';
                    salary.value = '';
                    overtime_salary.value = '';
                    isShowAddModal.value = false;
                    fetchAllPosition(page.value, per_page, sortBy.value, searchText.value);
                }
            } catch (err) {
                alert(err.response.data);
            }
        }

        const updatePosition = async () => {
            try {
                const data = {
                    name: positionDetail.value.name,
                    salary: positionDetail.value.salary,
                    overtime_salary: positionDetail.value.overtime_salary,
                }

                const response = await positionService.updateById(positionDetail.value._id, data);
                if (response.status == 200) {
                    alert(response.data);
                    positionDetail.value = '';
                    isShowEditModal.value = false;
                    fetchAllPosition(page.value, per_page, sortBy.value, searchText.value)
                }
            } catch (err) {
                if (err.response.status == 404) {
                    alert(err.response.data);
                    positionDetail.value = '';
                    isShowEditModal.value = false;
                    fetchAllPosition(page.value, per_page, sortBy.value, searchText.value)
                }
            }
        }

        const deletePosition = async (position) => {
            try {
                if (confirm(`Bạn có muốn xóa vị trí ${position.name}?`)) {
                    const response = await positionService.deletePositionById(position._id);

                    if (response.status == 200) {
                        alert(response.data);
                        fetchAllPosition(page.value, per_page, sortBy.value, searchText.value)
                    }
                }
            } catch (err) {
                if (err.response.status == 404) {
                    alert(err.response.data);
                    positionDetail.value = '';
                    isShowEditModal.value = false;
                    fetchAllPosition(page.value, per_page, sortBy.value, searchText.value)
                }
            }
        }

        const fetchAllPosition = async (page, per_page, sortBy, searchText) => {
            try {
                const response = await positionService.getAll(
                    page,
                    per_page,
                    sortBy,
                    searchText
                );

                if (response.status == 200) {
                    positions.value = response.data.positions;
                    totalPage.value = response.data.totalPage;
                }
            } catch (err) {
                console.log(err);
            }
        }

        const search = async () => {
            fetchAllPosition(page.value, per_page, sortBy, searchText.value);
        }

        onBeforeMount(() => {
            fetchAllPosition(page.value, per_page, sortBy.value, searchText.value)
        })

        watch(page, () => {
            fetchAllPosition(page.value, per_page, sortBy.value, searchText.value)
        })

        watch(sortBy, () => {
            fetchAllPosition(page.value, per_page, sortBy.value, searchText.value)
        })

        return {
            addNewPosition,
            updatePosition,
            deletePosition,
            hiddenAddModal,
            hiddenEditModal,
            hiddenViewModal,
            showEditModal,
            showViewModal,
            showStaffDetail,
            search,
            addForm,
            name,
            salary,
            overtime_salary,
            isShowAddModal,
            isShowEditModal,
            isShowViewModal,
            positions,
            totalPage,
            page,
            sortBy,
            searchText,
            positionDetail,
            staffDetail,
            publicImage,
        }
    }
}
</script>