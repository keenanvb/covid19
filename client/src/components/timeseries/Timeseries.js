import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Legend, ResponsiveContainer } from 'recharts';
import Spinner from '../layout/Spinner';
import { isMobile } from '../../utils';
import moment from 'moment';

const Timeseries = ({ data: { timeseriesData, selectedCountryGraph } }) => {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname);
	}, []);

	let isMobileFlag = isMobile();

	let timeseriesHeight = 500;

	if (isMobileFlag) {
		timeseriesHeight = 300;
	}

	const formatXAxis = (tickItem) => {
		return moment(tickItem).format('DD-MM-YYYY');
	};

	return (
		<div className="timeseries-container">
			{timeseriesData.length > 0 ? (
				<>
					<h3
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						{selectedCountryGraph}
					</h3>
					<ResponsiveContainer width="100%" height={timeseriesHeight}>
						<AreaChart margin={{ top: 10, right: 10, left: 0, bottom: 10 }} data={timeseriesData}>
							<defs>
								<linearGradient id="confirmed" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#f39c12" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#f39c12" stopOpacity={0} />
								</linearGradient>
								<linearGradient id="recovered" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#27ae60" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#27ae60" stopOpacity={0} />
								</linearGradient>
								<linearGradient id="deaths" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#c0392b" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#c0392b" stopOpacity={0} />
								</linearGradient>
							</defs>
							<XAxis dataKey="date" tickFormatter={formatXAxis} />
							<YAxis />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip
								labelStyle={{ color: '#2c3e50' }}
								labelFormatter={function (value) {
									return `Date: ${moment(value).format('DD-MM-YYYY')}`;
								}}
							/>

							<Area
								type="monotone"
								dataKey="confirmed"
								stroke="#f39c12"
								fillOpacity={1}
								fill="url(#confirmed)"
								formatter={(value) => new Intl.NumberFormat('en').format(value)}
							/>
							<Area
								type="monotone"
								dataKey="recovered"
								stroke="#27ae60"
								fillOpacity={1}
								fill="url(#recovered)"
								formatter={(value) => new Intl.NumberFormat('en').format(value)}
							/>
							<Area
								type="monotone"
								dataKey="deaths"
								stroke="#c0392b"
								fillOpacity={1}
								fill="url(#deaths)"
								formatter={(value) => new Intl.NumberFormat('en').format(value)}
							/>
							<Legend style={{ marginTop: '60px' }} height={42} />
						</AreaChart>
					</ResponsiveContainer>
				</>
			) : (
				<Spinner />
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.data,
	};
};

export default connect(mapStateToProps, {})(Timeseries);
