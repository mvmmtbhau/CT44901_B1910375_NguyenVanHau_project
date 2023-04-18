<template>
    <div class="pt-[25px] px-[25px] bg-[#F8F9FC] h-[90%]">
        <div v-if="this.$route.path == '/staffs'">
            <div class="flex items-center justify-between">
                <h1 class="text-[#5a5c69] text-[28px] leading-[34px] font-normal">
                    Danh sách nhân sự
                </h1>
                <div id="actions" class="flex gap-1">
                    <router-link to="/staffs/add"
                        class="bg-green-500 hover:bg-green-700 h-[32px] rounded-md text-white flex gap-1 items-center justify-center px-3 cursor-pointer">
                        <font-awesome-icon :icon="['fas', 'plus']" /> Thêm mới
                    </router-link>
                    <div class="border rounded-md">
                        <select v-model="sortBy" class="px-4 text-center bg-[#4E73DF] text-white h-full outline-none">
                            <option value="0">Ngày thêm cũ nhất</option>
                            <option value="1">Ngày thêm mới nhất</option>
                            <option value="2">Tên từ A-Z</option>
                            <option value="3">Tên từ Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
            <form class="mt-[25px]" @submit.prevent="search()">
                <input type="text" v-model="searchText" name="search" autocomplete="off" placeholder="Search room..."
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
                                    Họ tên
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
                            <tr v-for="(staff, index) in staffs" :key="index" class="bg-white border-b text-center">
                                <td scope="row" class="w-10 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ (index + 1) + (5 * (page - 1)) }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ staff.fullname }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ staff.position ? staff.position.name : 'Chưa có' }}
                                </td>
                                <td id="actions" class="flex gap-2 justify-center items-center py-4">
                                    <span @click="fetchDetailStaff(staff)"
                                        class="bg-cyan-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-cyan-700">
                                        <font-awesome-icon :icon="['fas', 'eye']" /> Xem
                                    </span>
                                    <router-link :to="{
                                        name: 'EditStaff',
                                        params: { id: staff._id }
                                    }"
                                        class="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-700">
                                        <font-awesome-icon :icon="['fas', 'pen']" /> Chỉnh sửa
                                    </router-link>
                                    <span @click="deleteStaff(staff)"
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
        <router-view />
        <div v-if="isShowDetailModal" class="fixed z-20">
            <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.6] flex items-center justify-center"
                @click="isShowDetailModal = false; staffDetail = ''">
                <div class="bg-white w-[50rem] min-h-[20rem] flex flex-col rounded-[0.6rem]" @click.stop>
                    <div class="flex items-center justify-center border-b py-2 relative">
                        <span class="font-bold">Xem Chi Tiết Nhân Viên</span>
                        <font-awesome-icon :icon="['fas', 'xmark']" class="absolute right-4 text-xl cursor-pointer"
                            @click="isShowDetailModal = false; staffDetail = ''" />
                    </div>
                    <div class="mt-[22px] bg-white px-10 py-6 flex flex-col gap-4 shadow-lg">
                        <div class="flex gap-10 border px-4 py-4">
                            <div v-if="staffDetail.avatar" class="basis-[30%] flex flex-col gap-3">
                                <img :src="publicImage + staffDetail.avatar">
                            </div>
                            <div :class="{ 'basis-[70%]': staffDetail.avatar }" class=" flex gap-2 w-full">
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
                                <div v-if="staffDetail.position" class="basis-auto flex flex-col gap-2 text-[15px] border-l border-black pl-2">
                                    <span><b>Vị trí công việc:</b> {{ staffDetail.position.name }}</span>
                                    <span><b>Lương tháng:</b> {{ '$' + staffDetail.position.salary }}</span>
                                    <span><b>Lương tăng ca (/giờ):</b> {{ '$' + staffDetail.position.overtime_salary
                                    }}</span>
                                </div>
                                <div v-else class="basis-auto flex flex-col gap-2 text-[15px] border-l border-black pl-2">
                                    <b>Chưa đảm nhận vị trí công việc nào</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onBeforeMount, ref, watch } from 'vue';

import staffService from "@/services/staff.service";

import { publicImage } from "@/constants";

export default {
    setup() {
        const staffs = ref();
        const page = ref(1);
        const per_page = 5;
        const sortBy = ref(0);
        const totalPage = ref();
        const searchText = ref('');

        const staffDetail = ref();
        const isShowDetailModal = ref(false);

        const fetchDetailStaff = async (staff) => {
            staffDetail.value = staff;
            isShowDetailModal.value = true;
        }

        const fetchAllStaff = async (page, per_page, sortBy, searchText) => {
            try {
                const response = await staffService.getAll(
                    page,
                    per_page,
                    sortBy,
                    searchText
                );

                if (response.status == 200) {
                    staffs.value = response.data.staffs;
                    totalPage.value = response.data.totalPage;
                }
            } catch (err) {
                console.log(err);
            }
        }

        const search = async () => {
            fetchAllStaff(page.value, per_page, sortBy, searchText.value);
        }

        const deleteStaff = async (staff) => {
            try {
                if (confirm(`Bạn có muốn xóa nhân viên ${staff.fullname}?`)) {
                    const response = await staffService.deleteStaff(staff._id);
                    if (response.status == 200) {
                        alert(response.data);
                        fetchAllStaff(page.value, per_page, sortBy, searchText.value);
                    }
                }
            } catch (err) {
                if (err.response.status == 404) {
                    alert(err.response.data)
                }
                fetchAllStaff(page.value, per_page, sortBy.value, searchText.value)


            }
        }

        onBeforeMount(() => {
            fetchAllStaff(page.value, per_page, sortBy.value, searchText.value)
        })

        watch(page, () => {
            fetchAllStaff(page.value, per_page, sortBy.value, searchText.value)
        })

        watch(sortBy, () => {
            fetchAllStaff(page.value, per_page, sortBy.value, searchText.value)
        })

        return {
            fetchDetailStaff,
            search,
            deleteStaff,
            isShowDetailModal,
            staffDetail,
            staffs,
            page,
            totalPage,
            searchText,
            publicImage,
            sortBy,
        }
    }
}
</script>