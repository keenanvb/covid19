import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	countryUpdate,
	getCountryData,
	getCountryInfo,
	getTimeSeriesData,
	getTimeSeriesDataCompare,
} from '../../actions';

const Dropdown = ({
	title,
	dropdownData,
	data: { selectedCountry, selectedCountryGraph, selectedCountryCompare },
	countryUpdate,
	getCountryData,
	getCountryInfo,
	type,
	getTimeSeriesData,
	getTimeSeriesDataCompare,
}) => {
	const [displayList, toggleDisplayList] = useState(false);
	const [data, getFilteredData] = useState(dropdownData);

	let displayFirstLetter = (list, item, index) => {
		let titles = list.map((item) => {
			return item.title[0];
		});

		let prevTitle = titles[index - 1];
		if (titles[index] === item.title[0]) {
			if (prevTitle !== item.title[0]) {
				return (
					<div key={index} className="dropdown-displayFirst">
						{item.title[0]}
					</div>
				);
			}
		} else {
			return null;
		}
	};

	// const getSearchText = _.debounce(() => {

	// }, 1000);

	const onChange = (e) => {
		let filterSearch = dropdownData.filter((val) => {
			let title = val.title;
			if (title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
				return val;
			}
		});
		toggleDisplayList(true);
		getFilteredData(filterSearch);
		if (type === 'landing') {
			countryUpdate({ prop: 'selectedCountry', value: e.target.value });
			countryUpdate({ prop: 'selectedCountryGraph', value: e.target.value });
		} else {
			countryUpdate({ prop: 'selectedCountryCompare', value: e.target.value });
		}
	};

	const handleFocus = (event) => event.target.select();

	return (
		<div className="dropdown-container">
			<div className="country-input">
				<span role="img" aria-label="">
					🗺️
				</span>
				<input
					className="search-country"
					placeholder={type === 'landing' ? 'Search' : 'Compare To'}
					autoComplete="on"
					type="text"
					value={type === 'landing' ? selectedCountry : selectedCountryCompare}
					name="search"
					onChange={(e) => {
						onChange(e);
					}}
					maxLength="20"
					onFocus={handleFocus}
				/>
				<div
					className="pulse"
					onClick={() => {
						toggleDisplayList(!displayList);
					}}
				>
					{displayList ? (
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path opacity=".87" fill="none" d="M24 24H0V0h24v24z" />
							<path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" />
						</svg>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path fill="none" d="M0 0h24v24H0V0z" />
							<path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z" />
						</svg>
					)}
				</div>
			</div>
			<div style={{ width: '300px', position: 'absoulte' }}>
				{displayList && (
					<ul
						className="dropdown-list"
						onClick={() => {
							toggleDisplayList(!displayList);
						}}
					>
						{data.map((country, index) => (
							<div>
								<div>{displayFirstLetter(data, country, index)}</div>
								<li
									key={`${country.id}`}
									onClick={() => {
										if (type === 'landing') {
											getCountryData(country.title);
											countryUpdate({ prop: 'selectedCountry', value: country.title });
											getCountryInfo(country.ISO_2);
											countryUpdate({ prop: 'selectedCountryGraph', value: country.title });
											countryUpdate({ prop: 'selectedCountryDisplay', value: country.title });
											getTimeSeriesData(country.title);
										} else {
											// countryUpdate({ prop: 'selectedCountryGraph', value: country.title })
											// getTimeSeriesData(country.title)
											countryUpdate({ prop: 'selectedCountryCompare', value: country.title });
											countryUpdate({
												prop: 'selectedCountryCompareDisplay',
												value: country.title,
											});
											getTimeSeriesDataCompare(country.title);
										}
										getFilteredData(dropdownData);
									}}
								>
									<div className="dropdown-list-row">
										<img
											style={{ marginRight: '8px' }}
											className="flag-image round"
											src={`${country.flag}`}
											alt="new"
										/>
										<div>{country.title}</div>
									</div>
								</li>
							</div>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		data: state.data,
	};
};

export default connect(mapStateToProps, {
	countryUpdate,
	getCountryData,
	getCountryInfo,
	getTimeSeriesData,
	getTimeSeriesDataCompare,
})(Dropdown);
