<template>
    <div class="pt-[25px] px-[25px] bg-[#F8F9FC]">
        <div class="flex items-center justify-between">
            <h1 class="text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer">Dashboard</h1>
            <button
                class="bg-[#2E59D9] h-[32px] rounded-md text-white flex items-center justify-center px-[30px] cursor-pointer">
                Generate Report
            </button>
        </div>
        <div class="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
            <div
                class="h-[100px] rounded-lg bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] 
                                                                        cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
                <div class="">
                    <h2 class="text-[#8589DF] text-[11px] leading-[17px] font-bold">EARNINGS (MONTHLY)</h2>
                    <h1 class="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$40,000</h1>
                </div>
                <font-awesome-icon :icon="['far', 'calendar-minus']" class="text-[28px]" />
            </div>
            <div
                class="h-[100px] rounded-lg bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] 
                                                                        cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
                <div class="">
                    <h2 class="text-[#1cc88a] text-[11px] leading-[17px] font-bold">PENDING REQUEST</h2>
                    <h1 class="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$240,000</h1>
                </div>
                <font-awesome-icon :icon="['fas', 'calendar-minus']" class="text-[28px]" />
            </div>
            <div
                class="h-[100px] rounded-lg bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] 
                                                                        cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
                <div class="">
                    <h2 class="text-[#1cc88a] text-[11px] leading-[17px] font-bold">TASKS</h2>
                    <h1 class="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$40,000</h1>
                </div>
                <font-awesome-icon :icon="['fas', 'calendar-minus']" class="text-[28px]" />
            </div>
            <div
                class="h-[100px] rounded-lg bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] 
                                                                        cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out">
                <div class="">
                    <h2 class="text-[#8589DF] text-[11px] leading-[17px] font-bold">EARNINGS (ANNUAL)</h2>
                    <h1 class="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">$240,000</h1>
                </div>
                <font-awesome-icon :icon="['fas', 'calendar-minus']" class="text-[28px]" />
            </div>
        </div>
        <div id="chart" class="flex mt-[22px] w-full gap-[30px]">
            <div class="basis-[70%] shadow-md cursor-pointer">
                <apexchart type="line" height="350" :options="chartLineOptions" :series="seriesLine"></apexchart>
            </div>
            <div class="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
                <apexchart type="pie" width="380" :options="chartPieOptions" :series="seriesPie"></apexchart>
            </div>
        </div>
        <div id="chart" class="flex mt-[22px] w-full gap-[30px]">
            <div class="basis-[70%] shadow-md cursor-pointer">
                <apexchart type="line" height="350" :options="chartLineOptions" :series="seriesLine"></apexchart>
            </div>
            <div class="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
                <apexchart type="pie" width="380" :options="chartPieOptions" :series="seriesPie"></apexchart>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

import VueApexCharts from "vue3-apexcharts";

export default {
    name: 'DashboardView',
    components: {
        apexchart: VueApexCharts,
    },
    setup() {
        const seriesLine = ref([
            {
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }
        ]);

        const chartLineOptions = ref({
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        })

        const seriesPie = ref([44, 55, 13, 43, 22]);

        const chartPieOptions = ref(
            {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                title: {
                    text: 'Simple Pie Chart'
                },
                labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 1000
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                ]
            },
        );


        return {
            seriesLine,
            chartLineOptions,
            seriesPie,
            chartPieOptions,
        }
    }
}
</script>