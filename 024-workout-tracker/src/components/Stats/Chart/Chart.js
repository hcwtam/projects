import React from 'react';
import CanvasJSReact from '../../../canvasjs.react';
import styles from './Chart.module.css';
import Spinner from '../../UI/Spinner/Spinner';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Chart = (props) => {
	// console.log(props);
	let progressData, excercises = [], dataPoints = [[],[]];
	if (props.progressData) {
		progressData = props.progressData.reverse();
		// console.log(progressData);

		// data needed: for each: progressData[i].date, progressData[i].type[0].excercise, progressData[i].weights[0]
		
		// for legs
		for (let i in progressData) {
			const year = parseInt(progressData[i].date.slice(0,4));
			const month = parseInt(progressData[i].date.slice(5,7)) - 1;
			const day = parseInt(progressData[i].date.slice(8));
			const date = new Date(year,month,day);
			const excercise = progressData[i].type[0].excercise;
			if (!excercises.length ) excercises.push(excercise);
			if (excercise !== excercises[0] && excercises.length === 1) excercises.push(excercise);
			if (excercise === excercises[0]) dataPoints[0].push({x: date, y: progressData[i].weights[0]});
			if (excercise === excercises[1]) dataPoints[1].push({x: date, y: progressData[i].weights[0]});
		}
		// console.log(dataPoints);
	}

	const containerProps = {
		height: "100%"
	  };

	const options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: "light2", // "light1", "dark1", "dark2",
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		title:{
			fontFamily: 'Open Sans, sans-serif',
			fontWeight: 'bold',
			fontSize: 24,
			padding: 10,
			fontColor: '#2EACAC',
			text: `${props.title} Progression`
		},
		axisY: {
			title: "Weight",
			fontColor: 'rgb(47, 177, 177)',
			includeZero: false,
			suffix: "kg"
		},
		axisX: {
			title: "Date",
			valueFormatString: "DD-MMM"
		},
		data: [{
			type: "line",
			toolTipContent: `${excercises[0]} - {x}: {y}kg`,
			name: excercises[0],
			showInLegend: true,
			dataPoints: [
				...dataPoints[0]
			]
		}, dataPoints[1] &&
		{
			type: "line",
			toolTipContent: `${excercises[1]} on {x}: {y}kg`,
			name: excercises[1],
			showInLegend: true,
			dataPoints: [
				...dataPoints[1]
			]
		}]
		// , {
		// 	type: "line",
		// 	toolTipContent: "{x}: {y}kg",
		// 	name: 'bro',
		// 	showInLegend: true,
		// 	dataPoints: [
		// 		{ x: 1, y: 60 },
		// 		{ x: 2, y: 61 },
		// 		{ x: 3, y: 64 },
		// 		{ x: 4, y: 62 },
		// 		{ x: 5, y: 64 }
		// 	]
		// }]
	}
	return (
	<div className={styles.Chart}>
		{props.progressData ? <CanvasJSChart containerProps={containerProps} options = {options}
			/* onRef={ref => this.chart = ref} */
		/> : <Spinner color='var(--colorMainB)' />}
		{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
	</div>
	);
}
export default Chart;                              