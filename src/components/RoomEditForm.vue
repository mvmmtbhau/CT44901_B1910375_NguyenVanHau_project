<template>
    <div v-if="detailRoom">
        <h1 class="text-[#5a5c69] text-[28px] leading-[34px] font-normal text-center">
            Chỉnh sửa phòng
        </h1>
        <Form :validation-schema="editRoomForm" @submit="updateRoom" autocomplete="off"
            class="mt-[22px] bg-white w-[50%] px-10 py-6 flex flex-col gap-4 items-center ml-[25%] shadow-lg border">
            <div class="flex gap-10 w-full">
                <label for="roomname" class="basis-[30%] text-end">Tên phòng:</label>
                <div class="basis-[70%]">
                    <Field type="text" name="roomname" id="roomname" v-model="detailRoom.roomname"
                        class="bg-transparent border-2 w-full outline-none px-2 py-1 text-sm" />
                    <ErrorMessage name="roomname" class="error-message" />
                </div>
            </div>
            <div class="flex gap-10 w-full">
                <label for="price" class="basis-[30%] text-end">Giá:</label>
                <div class="basis-[70%]">
                    <Field type="text" name="price" id="price" v-model="detailRoom.price"
                        class="bg-transparent border-2 w-full  outline-none px-2 py-1 text-sm" />
                    <ErrorMessage name="price" class="error-message" />
                </div>
            </div>
            <div class="flex gap-10 w-full">
                <label for="quantity" class="basis-[30%] text-end">Số lượng:</label>
                <div class="basis-[70%]">
                    <Field type="text" name="quantity" id="quantity" v-model="detailRoom.quantity"
                        class="bg-transparent border-2 w-full outline-none px-2 py-1 text-sm" />
                    <ErrorMessage name="quantity" class="error-message" />
                </div>
            </div>
            <div class="flex gap-10 w-full">
                <label for="description" class="basis-[30%] text-end">Giới thiệu:</label>
                <div class=" basis-[70%]">
                    <Field as="textarea" name="description" id="description" v-model="detailRoom.description"
                        class="bg-transparent h-[5rem] border-2 w-full outline-none px-2 py-1 text-sm resize-none" />
                    <ErrorMessage name="description" class="error-message" />
                </div>
            </div>
            <div class="flex gap-10 w-full">
                <label for="" class="basis-[30%] text-end"></label>
                <div class="flex gap-2 basis-[70%]">
                    <button type="submit"
                        class="bg-green-500 hover:bg-green-700 px-2 py-1 text-white font-bold rounded-md">Sửa</button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import roomService from "@/services/room.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        const detailRoom = ref();

        const editRoomForm = yup.object().shape({
            roomname: yup
                .string()
                .required("Xin nhập vào trường này"),
            price: yup
                .number()
                .required("Xin nhập vào trường này"),
            quantity: yup
                .number()
                .required("Xin nhập vào trường này"),
            description: yup
                .string()
                .required("Xin nhập vào trường này")
                .max(150, "Tối đa 150 ký tự"),
        });

        const updateRoom = async () => {
            try {
                const roomId = detailRoom.value._id;
                const data = {
                    roomname: detailRoom.value.roomname,
                    price: detailRoom.value.price,
                    quantity: detailRoom.value.quantity,
                    description: detailRoom.value.description,
                }

                const response = await roomService.update(roomId, data);
                if(response.status == 200) {
                    alert(response.data);
                    router.push({
                        name: 'ListRoom',
                    })
                }

            } catch (err) {
                alert(err.response.data.message);
                router.push({
                    name: 'ListRoom',
                })
            }
        }

        const fetchDetailRoom = async (roomId) => {
            try {
                const response = await roomService.getById(roomId);
                if(response.status == 200) {
                    detailRoom.value = response.data[0];
                }
            } catch (err) {
                alert(err.response.data);
                router.push({
                    name: 'ListRoom'
                });
            }
        }

        onMounted(() => {
            fetchDetailRoom(route.params.id);
        })


        return {
            updateRoom,
            editRoomForm,
            detailRoom,
        }
    }
}
</script>