import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Dropdown from '../layout/Dropdown';
import { connect } from 'react-redux';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Legend, ResponsiveContainer } from 'recharts';
import Spinner from '../layout/Spinner';
import { isMobile } from '../../utils';
import { countryUpdate } from '../../actions';
import ReactGA from 'react-ga';
import moment from 'moment';

const Compare = ({
	data: {
		selectedCountry,
		selectedCountryCompare,
		timeseriesData,
		timeseriesDataCompare,
		loading,
		selectedCountryCompareDisplay,
		selectedCountryDisplay,
	},
	countries,
	countryUpdate,
}) => {
	const [timeSeriesData, setTimeSeriesData] = useState({
		countrylist: [],
	});

	const [selectSort, setSelectSort] = useState('confirmed');

	let filterList = ['confirmed', 'recovered', 'deaths'];

	useEffect(() => {
		setTimeSeriesData({
			countrylist: loading ? [] : compareArray(),
		});
		ReactGA.pageview(window.location.pathname);
	}, [timeseriesData, timeseriesDataCompare, selectedCountryCompare, loading, selectSort]);

	let compareArray = () => {
		let country = timeseriesData.map((data) => {
			let date = data.date;
			let selected = data[selectSort];
			return {
				date,
				country1: selected,
			};
		});

		let compareToCountry = timeseriesDataCompare.map((data) => {
			let date = data.date;
			let selected = data[selectSort];
			return {
				date,
				country2: selected,
			};
		});

		let newCountryList = [];
		for (let i = 0; i < country.length; i++) {
			for (let j = 0; j < compareToCountry.length; j++) {
				if (country[i].date == compareToCountry[j].date) {
					newCountryList.push({
						date: moment(country[i].date).format('DD-MM-YYYY'),
						[selectedCountryDisplay]: country[i].country1,
						[selectedCountryCompareDisplay]: compareToCountry[j].country2,
					});
				}
			}
		}

		return newCountryList;
	};

	let isMobileFlag = isMobile();

	let timeseriesHeight = 500;

	if (isMobileFlag) {
		timeseriesHeight = 300;
	}

	const { countrylist } = timeSeriesData;

	if (selectedCountryDisplay == '') {
		return <Redirect to="/" />;
	}

	// const formatXAxis = (tickItem) => {
	// 	return moment(tickItem).format('DD-MM-YYYY');
	// };

	return (
		<div className="container">
			{/* <h2>{selectedCountry == '' ? 'Country to be selected' : selectedCountry}</h2> */}
			<Dropdown
				dropdownData={countries.filter((country) => {
					return country.title !== selectedCountryDisplay;
				})}
				type="compare"
			/>
			<div className="compare-display">
				<h3>
					{selectedCountryDisplay == '' ? 'Country to be selected' : selectedCountryDisplay} vs{' '}
					{selectedCountryCompareDisplay == '' ? 'Country to be selected' : selectedCountryCompareDisplay}
				</h3>
			</div>
			<div className="timeseries-container">
				{selectedCountryDisplay != '' && selectedCountryCompareDisplay != '' && countrylist.length > 0 ? (
					<>
						<div className="dash-buttons">
							{filterList.map((filter, index) => {
								if (filter === selectSort) {
									return (
										<div
											onClick={() => {
												setSelectSort(`${filter}`);
											}}
											className={`btn btn-light activeFilter`}
										>
											{filter.toLowerCase()}
										</div>
									);
								} else {
									return (
										<div
											onClick={() => {
												setSelectSort(`${filter}`);
											}}
											className={`btn btn-light`}
										>
											{filter.toLowerCase()}
										</div>
									);
								}
							})}
						</div>
						<ResponsiveContainer width="100%" height={timeseriesHeight}>
							<AreaChart margin={{ top: 10, right: 10, left: 0, bottom: 10 }} data={countrylist}>
								<defs>
									<linearGradient id="country1" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
									</linearGradient>
									<linearGradient id="country2" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#e67e22" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#e67e22" stopOpacity={0} />
									</linearGradient>
									{/* <linearGradient id="deaths" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#c0392b" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#c0392b" stopOpacity={0} />
                                    </linearGradient> */}
								</defs>
								{/* <XAxis dataKey="date" tickFormatter={formatXAxis} /> */}
								<XAxis dataKey="date" />
								<YAxis />
								<CartesianGrid strokeDasharray="3 3" />
								<Tooltip
									labelStyle={{ color: '#2c3e50' }}
									// formatter={function (value, name) {
									//     return `${selectSort} ${value}`;
									// }}

									labelFormatter={function (value) {
										return `Date: ${value}`;
									}}
								/>
								<Area
									type="monotone"
									dataKey={selectedCountryDisplay}
									stroke="#2ecc71"
									fillOpacity={1}
									fill="url(#country1)"
									formatter={(value) => new Intl.NumberFormat('en').format(value)}
								/>
								<Area
									type="monotone"
									formatter={(value) => new Intl.NumberFormat('en').format(value)}
									dataKey={selectedCountryCompareDisplay}
									stroke="#e67e22"
									fillOpacity={1}
									fill="url(#country2)"
								/>
								{/* <Area type="monotone" dataKey="deaths" stroke="#c0392b" fillOpacity={1} fill="url(#deaths)" /> */}
								<Legend style={{ marginTop: '60px' }} height={42} />
							</AreaChart>
						</ResponsiveContainer>
					</>
				) : (
					<null />
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.data,
		countries: state.countries,
	};
};

export default connect(mapStateToProps, { countryUpdate })(Compare);
