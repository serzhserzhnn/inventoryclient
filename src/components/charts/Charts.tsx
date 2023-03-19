import React, {useEffect, useState} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import CategoryService from "../../services/CategoryService";
import ICategoryData from "../../types/Category";
import ThingsDataService from "../../services/ThingsService";
import IThingsData from "../../types/Thing";
import randomColor from "randomcolor";

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts: React.FC = () => {
    const [things, setThings] = useState<Array<IThingsData>>([]);
    const [categories, setCategories] = useState<Array<ICategoryData>>([]);

    useEffect(() => {
        retrieveThings();
    }, []);

    const retrieveThings = () => {
        ThingsDataService.getAll()
            .then((response: any) => {
                setThings(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveCategories();
    }, []);

    const retrieveCategories = () => {
        CategoryService.getAll()
            .then((response: any) => {
                setCategories(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

//get category name with id
    const mapCategory = new Map<number, string>();
    categories.map((category, index) =>
        (mapCategory.set(category.id, category.name)));

    const arrCategoryAll: { key: string; value: number }[] = [];

    function logSetElementsC(value1: any, value2: any) {
        arrCategoryAll.push({key: value2, value: value1});
    }

    mapCategory.forEach(logSetElementsC)

// get category with things and set name
    const setCategory = new Set<number>();
    things.map((thing, index) =>
        (setCategory.add(thing.category)));

    const arrCategory: string [] = [];

    function logSetElements(value1: any) {
        arrCategory.push(mapCategory.get(value1) as string);
    }

    Array.from(setCategory).sort().forEach(logSetElements)

//get count Things by Category
    const thingsAll = things.map((thing, index) =>
        (thing.category));

    const countThingsByCategory = thingsAll.reduce((acc, el) => {
        // @ts-ignore
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, [])

    const arrCount: { key: number, value: number }[] = [];

    function logSetElementsCT(value1: any, value2: any) {
        arrCount.push({key: value2, value: value1});
    }

    countThingsByCategory.forEach(logSetElementsCT)

    const arrColor: string [] = []
    for (let i = 0; i < setCategory.size; i++) {
        arrColor.push(randomColor());
    }

    const data: ChartData<'pie', { key: number, value: number } []> = {
        labels: arrCategory,
        datasets: [{
            label: '# of Votes',
            data: arrCount,
            parsing: {
                xAxisKey: 'key',
                yAxisKey: 'value'
            },
            backgroundColor: arrColor,
            borderColor: arrColor,
            borderWidth: 1,
        }],
    };
//
//     const data = {
//         labels: thngs, //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [
//             {
//                 label: '# of Votes',
//                 data: [12, 19, undefined, undefined, undefined],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)',
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)',
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };
// // const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
//     //const labels = categories.map((category, index) => (category.name));


    return <Pie data={data}/>;
};
export default Charts;